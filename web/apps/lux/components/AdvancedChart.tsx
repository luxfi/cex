'use client'

// Temporary placeholder until @hanzo/ui/finance is properly published
export function AdvancedChart({ symbol }: { symbol?: string }) {
  return (
    <div className="w-full h-full bg-accent/30 flex items-center justify-center">
      <div className="text-center">
        <div className="text-2xl font-bold mb-2">{symbol || 'Chart'}</div>
        <div className="text-sm text-muted-1">
          Advanced Chart - Loading...
        </div>
      </div>
    </div>
  )
}
