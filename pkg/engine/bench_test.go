package engine

import (
	"context"
	"fmt"
	"math/rand"
	"testing"
	"time"

	"github.com/google/uuid"
	"github.com/rs/zerolog"

	"github.com/luxfi/cex/pkg/types"
)

func init() {
	// Suppress logging during benchmarks
	zerolog.SetGlobalLevel(zerolog.Disabled)
}

// ─── OrderBook micro-benchmarks ──────────────────────────────────────────

func BenchmarkOrderBookAddOrder(b *testing.B) {
	ob := NewOrderBook("BTC-USD")
	for i := 0; i < b.N; i++ {
		ob.AddOrder(&types.Order{
			ID:           fmt.Sprintf("o-%d", i),
			Side:         types.Buy,
			Price:        int64(5000000000 - (i % 100)), // spread across 100 price levels
			RemainingQty: 100000000,
		})
	}
}

func BenchmarkOrderBookAddOrderManyLevels(b *testing.B) {
	ob := NewOrderBook("BTC-USD")
	for i := 0; i < b.N; i++ {
		ob.AddOrder(&types.Order{
			ID:           fmt.Sprintf("o-%d", i),
			Side:         types.Buy,
			Price:        int64(5000000000 - i), // unique price per order
			RemainingQty: 100000000,
		})
	}
}

func BenchmarkOrderBookRemoveOrder(b *testing.B) {
	ob := NewOrderBook("BTC-USD")
	ids := make([]string, b.N)
	for i := 0; i < b.N; i++ {
		ids[i] = fmt.Sprintf("o-%d", i)
		ob.AddOrder(&types.Order{
			ID:           ids[i],
			Side:         types.Buy,
			Price:        int64(5000000000 - (i % 100)),
			RemainingQty: 100000000,
		})
	}
	b.ResetTimer()
	for i := 0; i < b.N; i++ {
		ob.RemoveOrder(ids[i])
	}
}

func BenchmarkOrderBookSnapshot(b *testing.B) {
	ob := NewOrderBook("BTC-USD")
	// Build a book with 200 levels each side
	for i := 0; i < 200; i++ {
		ob.AddOrder(&types.Order{
			ID: fmt.Sprintf("bid-%d", i), Side: types.Buy,
			Price: int64(5000000000 - int64(i)*100000), RemainingQty: 100000000,
		})
		ob.AddOrder(&types.Order{
			ID: fmt.Sprintf("ask-%d", i), Side: types.Sell,
			Price: int64(5000100000 + int64(i)*100000), RemainingQty: 100000000,
		})
	}
	b.ResetTimer()
	for i := 0; i < b.N; i++ {
		ob.Snapshot(20)
	}
}

func BenchmarkOrderBookCanFillFully(b *testing.B) {
	ob := NewOrderBook("BTC-USD")
	for i := 0; i < 100; i++ {
		ob.AddOrder(&types.Order{
			ID: fmt.Sprintf("ask-%d", i), Side: types.Sell,
			Price: int64(5000000000 + int64(i)*100000), RemainingQty: 100000000,
		})
	}
	b.ResetTimer()
	for i := 0; i < b.N; i++ {
		ob.CanFillFully(types.Buy, 5001000000, 50000000, false)
	}
}

// ─── Matcher benchmarks ─────────────────────────────────────────────────

func BenchmarkMatcherLimitMatch(b *testing.B) {
	// Benchmark matching a limit order against resting liquidity.
	// Each iteration: place an ask, then a crossing buy that fills it.
	m := NewMatcher()
	m.EnsureBook("BTC-USD")
	ctx := context.Background()

	b.ResetTimer()
	for i := 0; i < b.N; i++ {
		// Seed an ask
		ask := &types.Order{
			ID: fmt.Sprintf("a-%d", i), Symbol: "BTC-USD",
			Side: types.Sell, Type: types.OrderTypeLimit,
			LimitPrice: "50000.00", Qty: "1.0",
			TimeInForce: types.TIFGTC, AccountID: "seller",
		}
		m.Match(ctx, ask)

		// Cross with a buy
		buy := &types.Order{
			ID: fmt.Sprintf("b-%d", i), Symbol: "BTC-USD",
			Side: types.Buy, Type: types.OrderTypeLimit,
			LimitPrice: "50000.00", Qty: "1.0",
			TimeInForce: types.TIFGTC, AccountID: "buyer",
		}
		m.Match(ctx, buy)
	}
}

func BenchmarkMatcherMarketMatch(b *testing.B) {
	m := NewMatcher()
	m.EnsureBook("BTC-USD")
	ctx := context.Background()

	b.ResetTimer()
	for i := 0; i < b.N; i++ {
		ask := &types.Order{
			ID: fmt.Sprintf("a-%d", i), Symbol: "BTC-USD",
			Side: types.Sell, Type: types.OrderTypeLimit,
			LimitPrice: "50000.00", Qty: "1.0",
			TimeInForce: types.TIFGTC, AccountID: "seller",
		}
		m.Match(ctx, ask)

		buy := &types.Order{
			ID: fmt.Sprintf("b-%d", i), Symbol: "BTC-USD",
			Side: types.Buy, Type: types.OrderTypeMarket,
			Qty: "1.0", AccountID: "buyer",
		}
		m.Match(ctx, buy)
	}
}

func BenchmarkMatcherDeepBook(b *testing.B) {
	// Benchmark matching against a pre-loaded book with 1000 price levels.
	m := NewMatcher()
	m.EnsureBook("BTC-USD")
	ctx := context.Background()

	// Pre-load 1000 ask levels
	for i := 0; i < 1000; i++ {
		price := fmt.Sprintf("%.2f", 50000.0+float64(i)*0.01)
		ask := &types.Order{
			ID: fmt.Sprintf("seed-%d", i), Symbol: "BTC-USD",
			Side: types.Sell, Type: types.OrderTypeLimit,
			LimitPrice: price, Qty: "10.0",
			TimeInForce: types.TIFGTC, AccountID: "mm",
		}
		m.Match(ctx, ask)
	}

	b.ResetTimer()
	for i := 0; i < b.N; i++ {
		buy := &types.Order{
			ID: uuid.New().String(), Symbol: "BTC-USD",
			Side: types.Buy, Type: types.OrderTypeLimit,
			LimitPrice: "50000.00", Qty: "10.0",
			TimeInForce: types.TIFGTC, AccountID: "buyer",
		}
		m.Match(ctx, buy)

		// Replenish the consumed level
		ask := &types.Order{
			ID: uuid.New().String(), Symbol: "BTC-USD",
			Side: types.Sell, Type: types.OrderTypeLimit,
			LimitPrice: "50000.00", Qty: "10.0",
			TimeInForce: types.TIFGTC, AccountID: "mm",
		}
		m.Match(ctx, ask)
	}
}

func BenchmarkMatcherPartialFill(b *testing.B) {
	m := NewMatcher()
	m.EnsureBook("BTC-USD")
	ctx := context.Background()

	b.ResetTimer()
	for i := 0; i < b.N; i++ {
		// Large ask
		ask := &types.Order{
			ID: fmt.Sprintf("a-%d", i), Symbol: "BTC-USD",
			Side: types.Sell, Type: types.OrderTypeLimit,
			LimitPrice: "50000.00", Qty: "100.0",
			TimeInForce: types.TIFGTC, AccountID: "mm",
		}
		m.Match(ctx, ask)

		// Small buy — partial fill
		buy := &types.Order{
			ID: fmt.Sprintf("b-%d", i), Symbol: "BTC-USD",
			Side: types.Buy, Type: types.OrderTypeLimit,
			LimitPrice: "50000.00", Qty: "1.0",
			TimeInForce: types.TIFGTC, AccountID: "buyer",
		}
		m.Match(ctx, buy)

		// Cancel the remaining ask to keep the book clean
		m.CancelFromBook(ask)
	}
}

func BenchmarkMatcherMultiLevelSweep(b *testing.B) {
	// Large market order sweeping across multiple price levels
	m := NewMatcher()
	m.EnsureBook("BTC-USD")
	ctx := context.Background()

	b.ResetTimer()
	for i := 0; i < b.N; i++ {
		// Seed 10 ask levels
		for j := 0; j < 10; j++ {
			price := fmt.Sprintf("%.2f", 50000.0+float64(j)*0.01)
			ask := &types.Order{
				ID: fmt.Sprintf("a-%d-%d", i, j), Symbol: "BTC-USD",
				Side: types.Sell, Type: types.OrderTypeLimit,
				LimitPrice: price, Qty: "1.0",
				TimeInForce: types.TIFGTC, AccountID: "mm",
			}
			m.Match(ctx, ask)
		}

		// Market buy sweeps all 10 levels
		buy := &types.Order{
			ID: fmt.Sprintf("sweep-%d", i), Symbol: "BTC-USD",
			Side: types.Buy, Type: types.OrderTypeMarket,
			Qty: "10.0", AccountID: "buyer",
		}
		m.Match(ctx, buy)
	}
}

func BenchmarkMatcherCancelOrder(b *testing.B) {
	m := NewMatcher()
	m.EnsureBook("BTC-USD")
	ctx := context.Background()

	orders := make([]*types.Order, b.N)
	for i := 0; i < b.N; i++ {
		orders[i] = &types.Order{
			ID: fmt.Sprintf("o-%d", i), Symbol: "BTC-USD",
			Side: types.Buy, Type: types.OrderTypeLimit,
			LimitPrice: fmt.Sprintf("%.2f", 49000.0+float64(i%1000)*0.01), Qty: "1.0",
			TimeInForce: types.TIFGTC, AccountID: "mm",
		}
		m.Match(ctx, orders[i])
	}

	b.ResetTimer()
	for i := 0; i < b.N; i++ {
		m.CancelFromBook(orders[i])
	}
}

func BenchmarkMatcherGetSnapshot(b *testing.B) {
	m := NewMatcher()
	m.EnsureBook("BTC-USD")
	ctx := context.Background()

	// Build a thick book
	for i := 0; i < 500; i++ {
		m.Match(ctx, &types.Order{
			ID: fmt.Sprintf("bid-%d", i), Symbol: "BTC-USD",
			Side: types.Buy, Type: types.OrderTypeLimit,
			LimitPrice: fmt.Sprintf("%.2f", 49500.0+float64(i)*0.01), Qty: "5.0",
			TimeInForce: types.TIFGTC, AccountID: "mm",
		})
		m.Match(ctx, &types.Order{
			ID: fmt.Sprintf("ask-%d", i), Symbol: "BTC-USD",
			Side: types.Sell, Type: types.OrderTypeLimit,
			LimitPrice: fmt.Sprintf("%.2f", 50000.0+float64(i)*0.01), Qty: "5.0",
			TimeInForce: types.TIFGTC, AccountID: "mm",
		})
	}

	b.ResetTimer()
	for i := 0; i < b.N; i++ {
		m.GetSnapshot("BTC-USD", 20)
	}
}

// ─── MatchEngine (lx/dex-backed) benchmarks ─────────────────────────────

func BenchmarkMatchEngineLimitMatch(b *testing.B) {
	me := NewMatchEngine()
	ctx := context.Background()

	b.ResetTimer()
	for i := 0; i < b.N; i++ {
		ask := &types.Order{
			ID: fmt.Sprintf("a-%d", i), Symbol: "BTC-USD",
			Side: types.SideSell, Type: types.OrderTypeLimit,
			LimitPrice: "50000.00", Qty: "1.0",
			TimeInForce: types.TIFGTC, AccountID: "seller", UserID: "seller",
		}
		me.Match(ctx, ask)

		buy := &types.Order{
			ID: fmt.Sprintf("b-%d", i), Symbol: "BTC-USD",
			Side: types.SideBuy, Type: types.OrderTypeLimit,
			LimitPrice: "50000.00", Qty: "1.0",
			TimeInForce: types.TIFGTC, AccountID: "buyer", UserID: "buyer",
		}
		me.Match(ctx, buy)
	}
}

func BenchmarkMatchEngineMarketMatch(b *testing.B) {
	me := NewMatchEngine()
	ctx := context.Background()

	b.ResetTimer()
	for i := 0; i < b.N; i++ {
		ask := &types.Order{
			ID: fmt.Sprintf("a-%d", i), Symbol: "BTC-USD",
			Side: types.SideSell, Type: types.OrderTypeLimit,
			LimitPrice: "50000.00", Qty: "1.0",
			TimeInForce: types.TIFGTC, AccountID: "seller", UserID: "seller",
		}
		me.Match(ctx, ask)

		buy := &types.Order{
			ID: fmt.Sprintf("b-%d", i), Symbol: "BTC-USD",
			Side: types.SideBuy, Type: types.OrderTypeMarket,
			Qty: "1.0", AccountID: "buyer", UserID: "buyer",
		}
		me.Match(ctx, buy)
	}
}

func BenchmarkMatchEngineDeepBook(b *testing.B) {
	me := NewMatchEngine()
	ctx := context.Background()

	for i := 0; i < 1000; i++ {
		price := fmt.Sprintf("%.2f", 50000.0+float64(i)*0.01)
		me.Match(ctx, &types.Order{
			ID: fmt.Sprintf("seed-%d", i), Symbol: "BTC-USD",
			Side: types.SideSell, Type: types.OrderTypeLimit,
			LimitPrice: price, Qty: "10.0",
			TimeInForce: types.TIFGTC, AccountID: "mm", UserID: "mm",
		})
	}

	b.ResetTimer()
	for i := 0; i < b.N; i++ {
		buy := &types.Order{
			ID: uuid.New().String(), Symbol: "BTC-USD",
			Side: types.SideBuy, Type: types.OrderTypeLimit,
			LimitPrice: "50000.00", Qty: "10.0",
			TimeInForce: types.TIFGTC, AccountID: "buyer", UserID: "buyer",
		}
		me.Match(ctx, buy)

		me.Match(ctx, &types.Order{
			ID: uuid.New().String(), Symbol: "BTC-USD",
			Side: types.SideSell, Type: types.OrderTypeLimit,
			LimitPrice: "50000.00", Qty: "10.0",
			TimeInForce: types.TIFGTC, AccountID: "mm", UserID: "mm",
		})
	}
}

func BenchmarkMatchEngineGetSnapshot(b *testing.B) {
	me := NewMatchEngine()
	ctx := context.Background()

	for i := 0; i < 500; i++ {
		me.Match(ctx, &types.Order{
			ID: fmt.Sprintf("bid-%d", i), Symbol: "BTC-USD",
			Side: types.SideBuy, Type: types.OrderTypeLimit,
			LimitPrice: fmt.Sprintf("%.2f", 49500.0+float64(i)*0.01), Qty: "5.0",
			TimeInForce: types.TIFGTC, AccountID: "mm", UserID: "mm",
		})
		me.Match(ctx, &types.Order{
			ID: fmt.Sprintf("ask-%d", i), Symbol: "BTC-USD",
			Side: types.SideSell, Type: types.OrderTypeLimit,
			LimitPrice: fmt.Sprintf("%.2f", 50000.0+float64(i)*0.01), Qty: "5.0",
			TimeInForce: types.TIFGTC, AccountID: "mm", UserID: "mm",
		})
	}

	b.ResetTimer()
	for i := 0; i < b.N; i++ {
		me.GetSnapshot("BTC-USD")
	}
}

// ─── Full engine pipeline benchmarks ─────────────────────────────────────

func BenchmarkFullPipelineSubmitOrder(b *testing.B) {
	// Full engine pipeline: validation → compliance → matching → post-trade hooks
	matchFn := func(_ context.Context, order *types.Order) ([]*types.Trade, error) {
		return []*types.Trade{{
			ID: "t1", OrderID: order.ID, Symbol: order.Symbol,
			Side: order.Side, Price: "50000.00", Qty: order.Qty,
			Venue: "bench", Timestamp: time.Now(),
		}}, nil
	}
	eng := New(matchFn)
	eng.RegisterMarket(&types.Market{
		Symbol: "BTC-USD", AssetClass: types.AssetClassCrypto,
		Status: "active", Tradable: true,
	})

	ctx := context.Background()
	b.ResetTimer()
	for i := 0; i < b.N; i++ {
		eng.SubmitOrder(ctx, "acct1", "user1", "org1", &types.SubmitOrderRequest{
			Symbol: "BTC-USD", Side: types.Buy, Type: types.OrderTypeLimit,
			TimeInForce: types.TIFGTC, Qty: "1.0", LimitPrice: "50000.00",
		})
	}
}

// ─── Throughput benchmark (realistic mixed workload) ─────────────────────

func BenchmarkMatcherThroughputMixed(b *testing.B) {
	// Simulates realistic mixed workload:
	// 40% limit buy, 40% limit sell, 10% market buy, 10% cancel
	m := NewMatcher()
	m.EnsureBook("BTC-USD")
	ctx := context.Background()
	rng := rand.New(rand.NewSource(42))

	// Pre-seed some liquidity
	for i := 0; i < 100; i++ {
		m.Match(ctx, &types.Order{
			ID: fmt.Sprintf("seed-bid-%d", i), Symbol: "BTC-USD",
			Side: types.Buy, Type: types.OrderTypeLimit,
			LimitPrice: fmt.Sprintf("%.2f", 49900.0+float64(i)*0.01), Qty: "5.0",
			TimeInForce: types.TIFGTC, AccountID: "mm",
		})
		m.Match(ctx, &types.Order{
			ID: fmt.Sprintf("seed-ask-%d", i), Symbol: "BTC-USD",
			Side: types.Sell, Type: types.OrderTypeLimit,
			LimitPrice: fmt.Sprintf("%.2f", 50000.0+float64(i)*0.01), Qty: "5.0",
			TimeInForce: types.TIFGTC, AccountID: "mm",
		})
	}

	var restingOrders []*types.Order

	b.ResetTimer()
	for i := 0; i < b.N; i++ {
		r := rng.Float64()
		switch {
		case r < 0.4:
			// Limit buy (may or may not cross)
			price := fmt.Sprintf("%.2f", 49950.0+rng.Float64()*100.0)
			o := &types.Order{
				ID: fmt.Sprintf("lb-%d", i), Symbol: "BTC-USD",
				Side: types.Buy, Type: types.OrderTypeLimit,
				LimitPrice: price, Qty: "1.0",
				TimeInForce: types.TIFGTC, AccountID: "trader",
			}
			m.Match(ctx, o)
			restingOrders = append(restingOrders, o)

		case r < 0.8:
			// Limit sell
			price := fmt.Sprintf("%.2f", 49950.0+rng.Float64()*100.0)
			o := &types.Order{
				ID: fmt.Sprintf("ls-%d", i), Symbol: "BTC-USD",
				Side: types.Sell, Type: types.OrderTypeLimit,
				LimitPrice: price, Qty: "1.0",
				TimeInForce: types.TIFGTC, AccountID: "trader",
			}
			m.Match(ctx, o)
			restingOrders = append(restingOrders, o)

		case r < 0.9:
			// Market buy
			m.Match(ctx, &types.Order{
				ID: fmt.Sprintf("mb-%d", i), Symbol: "BTC-USD",
				Side: types.Buy, Type: types.OrderTypeMarket,
				Qty: "0.5", AccountID: "taker",
			})

		default:
			// Cancel a random resting order
			if len(restingOrders) > 0 {
				idx := rng.Intn(len(restingOrders))
				m.CancelFromBook(restingOrders[idx])
				restingOrders[idx] = restingOrders[len(restingOrders)-1]
				restingOrders = restingOrders[:len(restingOrders)-1]
			}
		}
	}
}

// ─── Parallel benchmark ──────────────────────────────────────────────────

func BenchmarkMatcherParallel(b *testing.B) {
	m := NewMatcher()
	m.EnsureBook("BTC-USD")
	ctx := context.Background()

	// Pre-seed
	for i := 0; i < 500; i++ {
		m.Match(ctx, &types.Order{
			ID: fmt.Sprintf("seed-%d", i), Symbol: "BTC-USD",
			Side: types.Sell, Type: types.OrderTypeLimit,
			LimitPrice: fmt.Sprintf("%.2f", 50000.0+float64(i)*0.01), Qty: "100.0",
			TimeInForce: types.TIFGTC, AccountID: "mm",
		})
	}

	b.ResetTimer()
	b.RunParallel(func(pb *testing.PB) {
		i := 0
		for pb.Next() {
			m.Match(ctx, &types.Order{
				ID: uuid.New().String(), Symbol: "BTC-USD",
				Side: types.Buy, Type: types.OrderTypeLimit,
				LimitPrice: "50000.00", Qty: "0.01",
				TimeInForce: types.TIFGTC, AccountID: "buyer",
			})
			// Replenish
			m.Match(ctx, &types.Order{
				ID: uuid.New().String(), Symbol: "BTC-USD",
				Side: types.Sell, Type: types.OrderTypeLimit,
				LimitPrice: "50000.00", Qty: "0.01",
				TimeInForce: types.TIFGTC, AccountID: "mm",
			})
			i++
		}
	})
}
