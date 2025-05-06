export interface JoinWithDotsOptions {
  separator?: string
  maxItems?: number
  ellipsisText?: string
}

export function joinWithDots(
  parts: (string | null | undefined)[],
  options?: JoinWithDotsOptions,
): string {
  const {
    separator = ' ... ',
    maxItems,
    ellipsisText = ' [...]',
  } = options || {}

  const cleaned = parts
    .filter(Boolean)
    .map(p => (p ?? '').replace('...', '').trim())
    .filter(p => p.length > 0)

  const limited
      = typeof maxItems === 'number' && cleaned.length > maxItems
        ? cleaned.slice(0, maxItems).concat(ellipsisText)
        : cleaned

  return limited.join(separator)
}
