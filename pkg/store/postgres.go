package store

import (
	"context"
	"fmt"
	"time"

	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"

	"github.com/luxfi/cex/pkg/types"
)

// PostgresStore implements Store backed by PostgreSQL.
type PostgresStore struct {
	pool *pgxpool.Pool
}

func NewPostgres(ctx context.Context, dsn string) (*PostgresStore, error) {
	pool, err := pgxpool.New(ctx, dsn)
	if err != nil {
		return nil, fmt.Errorf("connect to postgres: %w", err)
	}
	if err := pool.Ping(ctx); err != nil {
		return nil, fmt.Errorf("ping postgres: %w", err)
	}
	return &PostgresStore{pool: pool}, nil
}

func (s *PostgresStore) Close() error {
	s.pool.Close()
	return nil
}

// AutoMigrate creates tables if they don't exist.
func (s *PostgresStore) AutoMigrate(ctx context.Context) error {
	for _, ddl := range migrations {
		if _, err := s.pool.Exec(ctx, ddl); err != nil {
			return fmt.Errorf("migration failed: %w", err)
		}
	}
	return nil
}

var migrations = []string{
	`CREATE TABLE IF NOT EXISTS cex_markets (
		symbol        TEXT PRIMARY KEY,
		asset_class   TEXT NOT NULL DEFAULT 'us_equity',
		base_currency TEXT NOT NULL DEFAULT '',
		quote_currency TEXT NOT NULL DEFAULT 'USD',
		status        TEXT NOT NULL DEFAULT 'active',
		min_order_size TEXT NOT NULL DEFAULT '',
		max_order_size TEXT NOT NULL DEFAULT '',
		tick_size     TEXT NOT NULL DEFAULT '0.01',
		lot_size      TEXT NOT NULL DEFAULT '1',
		maker_fee     TEXT NOT NULL DEFAULT '0.001',
		taker_fee     TEXT NOT NULL DEFAULT '0.002',
		tradable      BOOLEAN NOT NULL DEFAULT true,
		fractionable  BOOLEAN NOT NULL DEFAULT false,
		requires_kyc  BOOLEAN NOT NULL DEFAULT false,
		requires_accred BOOLEAN NOT NULL DEFAULT false
	)`,
	`CREATE TABLE IF NOT EXISTS cex_orders (
		id              TEXT PRIMARY KEY,
		account_id      TEXT NOT NULL,
		user_id         TEXT NOT NULL DEFAULT '',
		org_id          TEXT NOT NULL DEFAULT '',
		symbol          TEXT NOT NULL,
		asset_class     TEXT NOT NULL DEFAULT '',
		side            TEXT NOT NULL,
		type            TEXT NOT NULL,
		time_in_force   TEXT NOT NULL DEFAULT 'day',
		qty             TEXT NOT NULL DEFAULT '',
		notional        TEXT NOT NULL DEFAULT '',
		limit_price     TEXT NOT NULL DEFAULT '',
		stop_price      TEXT NOT NULL DEFAULT '',
		status          TEXT NOT NULL DEFAULT 'new',
		filled_qty      TEXT NOT NULL DEFAULT '',
		filled_avg_price TEXT NOT NULL DEFAULT '',
		compliance_id   TEXT NOT NULL DEFAULT '',
		execution_venue TEXT NOT NULL DEFAULT '',
		reported_ats    BOOLEAN NOT NULL DEFAULT false,
		reported_finra  BOOLEAN NOT NULL DEFAULT false,
		created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
		updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
		filled_at       TIMESTAMPTZ,
		cancelled_at    TIMESTAMPTZ
	)`,
	`CREATE INDEX IF NOT EXISTS idx_cex_orders_account ON cex_orders(account_id)`,
	`CREATE INDEX IF NOT EXISTS idx_cex_orders_symbol ON cex_orders(symbol)`,
	`CREATE INDEX IF NOT EXISTS idx_cex_orders_status ON cex_orders(status)`,
	`CREATE INDEX IF NOT EXISTS idx_cex_orders_created ON cex_orders(created_at)`,
	`CREATE TABLE IF NOT EXISTS cex_trades (
		id              TEXT PRIMARY KEY,
		order_id        TEXT NOT NULL REFERENCES cex_orders(id),
		account_id      TEXT NOT NULL,
		symbol          TEXT NOT NULL,
		side            TEXT NOT NULL,
		price           TEXT NOT NULL,
		qty             TEXT NOT NULL,
		fee             TEXT NOT NULL DEFAULT '',
		venue           TEXT NOT NULL DEFAULT '',
		timestamp       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
		settled_at      TIMESTAMPTZ,
		trade_report_id TEXT NOT NULL DEFAULT '',
		ats_report_id   TEXT NOT NULL DEFAULT ''
	)`,
	`CREATE INDEX IF NOT EXISTS idx_cex_trades_account ON cex_trades(account_id)`,
	`CREATE INDEX IF NOT EXISTS idx_cex_trades_symbol ON cex_trades(symbol)`,
	`CREATE INDEX IF NOT EXISTS idx_cex_trades_order ON cex_trades(order_id)`,
	`CREATE INDEX IF NOT EXISTS idx_cex_trades_ts ON cex_trades(timestamp)`,
}

// --- Orders ---

func (s *PostgresStore) SaveOrder(ctx context.Context, o *types.Order) error {
	_, err := s.pool.Exec(ctx, `
		INSERT INTO cex_orders (
			id, account_id, user_id, org_id, symbol, asset_class,
			side, type, time_in_force, qty, notional, limit_price, stop_price,
			status, filled_qty, filled_avg_price,
			compliance_id, execution_venue, reported_ats, reported_finra,
			created_at, updated_at, filled_at, cancelled_at
		) VALUES (
			$1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24
		) ON CONFLICT (id) DO UPDATE SET
			status=EXCLUDED.status, filled_qty=EXCLUDED.filled_qty,
			filled_avg_price=EXCLUDED.filled_avg_price,
			execution_venue=EXCLUDED.execution_venue,
			reported_ats=EXCLUDED.reported_ats, reported_finra=EXCLUDED.reported_finra,
			updated_at=EXCLUDED.updated_at, filled_at=EXCLUDED.filled_at,
			cancelled_at=EXCLUDED.cancelled_at`,
		o.ID, o.AccountID, o.UserID, o.OrgID, o.Symbol, string(o.AssetClass),
		string(o.Side), string(o.Type), string(o.TimeInForce),
		o.Qty, o.Notional, o.LimitPrice, o.StopPrice,
		string(o.Status), o.FilledQty, o.FilledAvgPrice,
		o.ComplianceID, o.ExecutionVenue, o.ReportedToATS, o.ReportedFINRA,
		o.CreatedAt, o.UpdatedAt, o.FilledAt, o.CancelledAt,
	)
	return err
}

func (s *PostgresStore) GetOrder(ctx context.Context, id string) (*types.Order, error) {
	row := s.pool.QueryRow(ctx, `
		SELECT id, account_id, user_id, org_id, symbol, asset_class,
			side, type, time_in_force, qty, notional, limit_price, stop_price,
			status, filled_qty, filled_avg_price,
			compliance_id, execution_venue, reported_ats, reported_finra,
			created_at, updated_at, filled_at, cancelled_at
		FROM cex_orders WHERE id=$1`, id)
	return scanOrder(row)
}

func (s *PostgresStore) ListOrders(ctx context.Context, accountID string, limit, offset int) ([]*types.Order, error) {
	if limit <= 0 {
		limit = 100
	}
	rows, err := s.pool.Query(ctx, `
		SELECT id, account_id, user_id, org_id, symbol, asset_class,
			side, type, time_in_force, qty, notional, limit_price, stop_price,
			status, filled_qty, filled_avg_price,
			compliance_id, execution_venue, reported_ats, reported_finra,
			created_at, updated_at, filled_at, cancelled_at
		FROM cex_orders WHERE account_id=$1
		ORDER BY created_at DESC LIMIT $2 OFFSET $3`, accountID, limit, offset)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var out []*types.Order
	for rows.Next() {
		o, err := scanOrder(rows)
		if err != nil {
			return nil, err
		}
		out = append(out, o)
	}
	return out, rows.Err()
}

func (s *PostgresStore) UpdateOrderStatus(ctx context.Context, id string, status types.OrderStatus) error {
	_, err := s.pool.Exec(ctx, `UPDATE cex_orders SET status=$1, updated_at=$2 WHERE id=$3`,
		string(status), time.Now().UTC(), id)
	return err
}

// --- Trades ---

func (s *PostgresStore) SaveTrade(ctx context.Context, t *types.Trade) error {
	_, err := s.pool.Exec(ctx, `
		INSERT INTO cex_trades (
			id, order_id, account_id, symbol, side, price, qty, fee, venue,
			timestamp, settled_at, trade_report_id, ats_report_id
		) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)
		ON CONFLICT (id) DO NOTHING`,
		t.ID, t.OrderID, t.AccountID, t.Symbol, string(t.Side),
		t.Price, t.Qty, t.Fee, t.Venue,
		t.Timestamp, t.SettledAt, t.TradeReportID, t.ATSReportID,
	)
	return err
}

func (s *PostgresStore) GetTrade(ctx context.Context, id string) (*types.Trade, error) {
	row := s.pool.QueryRow(ctx, `
		SELECT id, order_id, account_id, symbol, side, price, qty, fee, venue,
			timestamp, settled_at, trade_report_id, ats_report_id
		FROM cex_trades WHERE id=$1`, id)
	return scanTrade(row)
}

func (s *PostgresStore) ListTrades(ctx context.Context, accountID string, limit, offset int) ([]*types.Trade, error) {
	if limit <= 0 {
		limit = 100
	}
	rows, err := s.pool.Query(ctx, `
		SELECT id, order_id, account_id, symbol, side, price, qty, fee, venue,
			timestamp, settled_at, trade_report_id, ats_report_id
		FROM cex_trades WHERE account_id=$1
		ORDER BY timestamp DESC LIMIT $2 OFFSET $3`, accountID, limit, offset)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var out []*types.Trade
	for rows.Next() {
		t, err := scanTrade(rows)
		if err != nil {
			return nil, err
		}
		out = append(out, t)
	}
	return out, rows.Err()
}

// --- Markets ---

func (s *PostgresStore) SaveMarket(ctx context.Context, m *types.Market) error {
	_, err := s.pool.Exec(ctx, `
		INSERT INTO cex_markets (
			symbol, asset_class, base_currency, quote_currency, status,
			min_order_size, max_order_size, tick_size, lot_size,
			maker_fee, taker_fee, tradable, fractionable, requires_kyc, requires_accred
		) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15)
		ON CONFLICT (symbol) DO UPDATE SET
			status=EXCLUDED.status, tradable=EXCLUDED.tradable,
			maker_fee=EXCLUDED.maker_fee, taker_fee=EXCLUDED.taker_fee`,
		m.Symbol, string(m.AssetClass), m.BaseCurrency, m.QuoteCurrency, m.Status,
		m.MinOrderSize, m.MaxOrderSize, m.TickSize, m.LotSize,
		m.MakerFee, m.TakerFee, m.Tradable, m.Fractionable, m.RequiresKYC, m.RequiresAccred,
	)
	return err
}

func (s *PostgresStore) ListMarkets(ctx context.Context) ([]*types.Market, error) {
	rows, err := s.pool.Query(ctx, `
		SELECT symbol, asset_class, base_currency, quote_currency, status,
			min_order_size, max_order_size, tick_size, lot_size,
			maker_fee, taker_fee, tradable, fractionable, requires_kyc, requires_accred
		FROM cex_markets ORDER BY symbol`)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var out []*types.Market
	for rows.Next() {
		m := &types.Market{}
		var ac string
		if err := rows.Scan(
			&m.Symbol, &ac, &m.BaseCurrency, &m.QuoteCurrency, &m.Status,
			&m.MinOrderSize, &m.MaxOrderSize, &m.TickSize, &m.LotSize,
			&m.MakerFee, &m.TakerFee, &m.Tradable, &m.Fractionable, &m.RequiresKYC, &m.RequiresAccred,
		); err != nil {
			return nil, err
		}
		m.AssetClass = types.AssetClass(ac)
		out = append(out, m)
	}
	return out, rows.Err()
}

// --- Scan helpers ---

type scannable interface {
	Scan(dest ...interface{}) error
}

func scanOrder(row scannable) (*types.Order, error) {
	o := &types.Order{}
	var ac, side, otype, tif, status string
	err := row.Scan(
		&o.ID, &o.AccountID, &o.UserID, &o.OrgID, &o.Symbol, &ac,
		&side, &otype, &tif, &o.Qty, &o.Notional, &o.LimitPrice, &o.StopPrice,
		&status, &o.FilledQty, &o.FilledAvgPrice,
		&o.ComplianceID, &o.ExecutionVenue, &o.ReportedToATS, &o.ReportedFINRA,
		&o.CreatedAt, &o.UpdatedAt, &o.FilledAt, &o.CancelledAt,
	)
	if err != nil {
		if err == pgx.ErrNoRows {
			return nil, fmt.Errorf("not found")
		}
		return nil, err
	}
	o.AssetClass = types.AssetClass(ac)
	o.Side = types.Side(side)
	o.Type = types.OrderType(otype)
	o.TimeInForce = types.TimeInForce(tif)
	o.Status = types.OrderStatus(status)
	return o, nil
}

func scanTrade(row scannable) (*types.Trade, error) {
	t := &types.Trade{}
	var side string
	err := row.Scan(
		&t.ID, &t.OrderID, &t.AccountID, &t.Symbol, &side,
		&t.Price, &t.Qty, &t.Fee, &t.Venue,
		&t.Timestamp, &t.SettledAt, &t.TradeReportID, &t.ATSReportID,
	)
	if err != nil {
		if err == pgx.ErrNoRows {
			return nil, fmt.Errorf("not found")
		}
		return nil, err
	}
	t.Side = types.Side(side)
	return t, nil
}
