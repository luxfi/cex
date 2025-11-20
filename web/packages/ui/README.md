# @luxats/ui

Shared UI components for the Lux Exchange ecosystem, built on top of @hanzo/ui.

## Overview

This package provides brand-specific UI components and wrappers around the powerful @hanzo/ui component library. It ensures consistency across all Lux Exchange applications while allowing for brand customization.

## Features

- **Built on @hanzo/ui**: Leverages the comprehensive Hanzo UI library (based on shadcn/ui with Radix UI primitives)
- **Brand-specific components**: Custom Header, Footer, and Logo components for Lux Exchange branding
- **Multi-brand support**: Site definitions for BAV (Lux Exchange Ventures) and LUX (Lux Exchange)
- **Responsive design**: Mobile and desktop optimized components
- **Theme support**: Dark/light mode with next-themes integration
- **Type-safe**: Full TypeScript support with exported types

## Installation

This package is part of the Lux Exchange monorepo and is automatically available to all apps.

```typescript
import { Header, Footer, Logo } from '@luxats/ui'
import { bavSiteDef, luxSiteDef } from '@luxats/ui/site-def'
```

## Usage

### Site Definition

Each app should use its appropriate site definition:

```typescript
// apps/bav (Lux Exchange Ventures)
import { bavSiteDef } from '@luxats/ui/site-def'

// apps/lux (Lux Exchange)
import { luxSiteDef } from '@luxats/ui/site-def'
```

### Header Component

```typescript
import { Header } from '@luxats/ui'
import { bavSiteDef } from '@luxats/ui/site-def'

export default function RootLayout({ children }) {
  return (
    <>
      <Header siteDef={bavSiteDef} />
      {children}
    </>
  )
}
```

### Footer Component

```typescript
import { Footer } from '@luxats/ui'
import { bavSiteDef } from '@luxats/ui/site-def'

export default function AppFooter() {
  return <Footer siteDef={bavSiteDef} />
}
```

### Logo Component

```typescript
import { Logo } from '@luxats/ui'

// Default (BAV branding)
<Logo />

// Custom branding
<Logo 
  companyName="LUX"
  brandColor="#10B981"
  size="lg"
/>
```

### Using @hanzo/ui Components

All @hanzo/ui components are re-exported for convenience:

```typescript
import { 
  Button, 
  Card, 
  Dialog,
  Input,
  cn 
} from '@luxats/ui'

// Use them like regular components
<Button variant="default">Click me</Button>
<Card className={cn('p-4', customClass)}>Content</Card>
```

## Available Components

### Lux Exchange Components
- `Header` - Responsive header with navigation (desktop + mobile)
- `Footer` - Footer with navigation links and copyright
- `Logo` - Brand logo component with customization options

### Re-exported @hanzo/ui Components
All components from @hanzo/ui/primitives and @hanzo/ui/components are available, including:
- Layout: Card, Separator, Tabs, etc.
- Forms: Input, Button, Select, Checkbox, etc.
- Overlays: Dialog, Popover, Tooltip, etc.
- Navigation: NavigationMenu, NavItems, etc.
- Data: Table, Calendar, etc.
- And many more...

## Customization

### Site Definition

Create a new site definition for additional brands:

```typescript
export const customSiteDef: SiteDef = {
  currentAs: '',
  companyName: 'Your Company',
  brandColor: '#YOURCOLOR',
  nav: {
    common: [
      { href: '/', title: 'Home' },
      // ... more links
    ]
  },
  footer: [
    // ... footer link groups
  ],
  aboveCopyright: legal
}
```

### Theme

This package integrates with Tailwind CSS and next-themes for dark/light mode support. Make sure your app's layout includes the ThemeProvider from next-themes.

## Development

```bash
# Build the package
pnpm build

# Watch mode
pnpm dev

# Type checking
pnpm lint
```

## Dependencies

### Peer Dependencies
- `@hanzo/ui` - Base UI component library
- `next` - Next.js framework
- `react` & `react-dom` - React
- `next-themes` - Theme management
- `lucide-react` - Icon library
- `mobx` & `mobx-react-lite` - State management

### Direct Dependencies
- `framer-motion` - Animations
- `react-social-icons` - Social media icons

## Learn More

- [@hanzo/ui Documentation](https://github.com/hanzoai/react-sdk/tree/main/pkg/ui)
- [Radix UI](https://www.radix-ui.com/)
- [shadcn/ui](https://ui.shadcn.com/)
