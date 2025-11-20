# Lux CEX

Institutional-grade Alternative Trading System (ATS) with CLOB matching engine, multi-protocol gateway, pre/post-trade compliance, and regulatory reporting.

## Features

- **CLOB Matching Engine** — Central limit order book with price-time priority
- **Multi-Protocol Gateway** — HTTP/REST, FIX 4.4, WebSocket, JSON-RPC, ZAP
- **Pre-Trade Compliance** — 30+ jurisdictions, sanctions, PEP/EDD, offering-type gating
- **Post-Trade Surveillance** — Wash trading, structuring, velocity, price spike detection
- **Regulatory Reporting** — FINRA OATS, ATS-N, CAT, MiFID II
- **Circuit Breakers** — Automated market halts on anomalous activity

## Architecture

```
              Clients
     +----+----+----+----+
     |    |    |    |    |
   HTTP  FIX  WS  RPC  ZAP
     |    |    |    |    |
     +----+----+----+----+
              |
         [Gateway :8080]
              |
      +-------+-------+
      |               |
 [Compliance]    [Engine]
  Pre-trade       CLOB
      |            |
      +-----+------+
            |
    [Surveillance]
     Post-trade
            |
    [Reporting]
     FINRA/SEC
```

## Quick Start

```bash
# Build
go build -o cexd ./cmd/cexd/

# Run
CEX_JWT_SECRET=your-secret ./cexd

# Dev mode (no auth)
./cexd
```

## API

### Markets
| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/v1/markets` | List active markets |
| `GET` | `/api/v1/markets/{symbol}` | Market details |
| `GET` | `/api/v1/markets/{symbol}/book` | Order book (`?depth=20`) |

### Orders
| Method | Path | Description |
|--------|------|-------------|
| `POST` | `/api/v1/accounts/{id}/orders` | Submit order (compliance-gated) |
| `GET` | `/api/v1/accounts/{id}/orders` | List orders |
| `GET` | `/api/v1/accounts/{id}/orders/{oid}` | Get order |
| `DELETE` | `/api/v1/accounts/{id}/orders/{oid}` | Cancel order |

### Accounts
| Method | Path | Description |
|--------|------|-------------|
| `POST` | `/api/v1/accounts/{id}/register` | Register with compliance |
| `GET` | `/api/v1/accounts/{id}/status` | Compliance status |

### Admin
| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/v1/admin/reports/finra` | FINRA OATS reports |
| `GET` | `/api/v1/admin/reports/ats` | ATS-N quarterly |
| `GET` | `/api/v1/admin/surveillance/alerts` | Surveillance alerts |
| `POST` | `/api/v1/admin/markets/{symbol}/halt` | Halt trading |
| `POST` | `/api/v1/admin/markets/{symbol}/resume` | Resume trading |

## Order Types

| Type | TIF | Description |
|------|-----|-------------|
| `limit` | GTC, IOC, FOK, DAY | Limit at specified price |
| `market` | IOC, FOK | Market at best available |

## Pre-Trade Compliance

Every order passes through before reaching the matcher:

1. Sanctions screening (blocked accounts)
2. PEP screening (EDD + source of funds)
3. Adverse media checks
4. FATF high-risk country (enhanced KYC level 3)
5. Per-jurisdiction, per-asset-class KYC minimums
6. Offering-type gating (Reg D, Reg S, Reg A+, Reg CF)
7. Per-account order size + daily limits
8. Market halt status

## Surveillance

| Detection | Method |
|-----------|--------|
| Wash trading | Circular trade pattern analysis |
| Large trades | Threshold-based alerts |
| Structuring | Just-below-threshold detection |
| Velocity | Rate-of-order monitoring |
| Price spikes | Second-derivative (parabolic crash) |

## Configuration

| Env Var | Default | Description |
|---------|---------|-------------|
| `CEX_ADDR` | `:8080` | Listen address |
| `CEX_JWT_SECRET` | (none) | JWT secret; empty = dev mode |
| `CEX_JWT_ISSUER` | `https://hanzo.id` | Expected JWT issuer |

## Docker

```bash
CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -ldflags="-w -s" -o cexd ./cmd/cexd/
docker build --platform linux/amd64 -t ghcr.io/luxfi/cex:latest .
```

## License

Copyright 2024-2026, Lux Partners Limited. All rights reserved.
