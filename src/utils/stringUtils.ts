import type { IFootnoteReference } from '@/types/dataShelf'

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
    separator = '',
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

export function generateFootnote(reference: IFootnoteReference): string {
  let footnote = ''

  // نویسنده (اگر وجود دارد)
  if (reference.author)
    footnote += `${reference.author}, `

  // عنوان کتاب
  footnote += `"${reference.bookTitle}"`

  // شماره جلد (اگر وجود دارد)
  if (reference.volumeNumber)
    footnote += `, جلد. ${reference.volumeNumber}`

  // شماره صفحه (اگر وجود دارد)
  if (reference.pageNumber)
    footnote += `, صفحه. ${reference.pageNumber}`

  // اطلاعات انتشار (اگر وجود دارد)
  const publicationInfo = []
  if (reference.edition)
    publicationInfo.push(`${reference.edition} ed.`)
  if (reference.publisher)
    publicationInfo.push(reference.publisher)
  if (reference.year)
    publicationInfo.push(reference.year)
  if (reference.city)
    publicationInfo.unshift(reference.city)

  if (publicationInfo.length > 0)
    footnote += ` (${publicationInfo.join(', ')})`

  return footnote
}
