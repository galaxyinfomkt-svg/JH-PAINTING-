/**
 * scheduling.ts - capacity notices.
 *
 * ONE switch. When Jafet's exterior calendar opens up again, set
 * `bookedOut: []` (or delete the entry) and the notice disappears from every
 * page on the next deploy. Nothing else needs touching.
 *
 * WHY THIS LIVES IN CODE AND NOT IN THE FORM
 * The estimate form is a LeadConnector iframe served from another origin, so
 * the site cannot add, remove or relabel a field inside it. Changing the
 * form's own service list has to be done in the GHL panel. What the site can
 * do is state the situation next to the form, which is what this drives.
 *
 * WHY THE LEAD IS STILL CAPTURED
 * The business decision is to keep taking exterior enquiries and call them
 * back when a slot opens, rather than turn them away. A homeowner asking for
 * an exterior quote in August is usually flexible about the start date; the
 * one thing that loses them for good is silence.
 */

export interface CapacityNotice {
  /** Service slugs that are not being booked right now. */
  bookedOut: string[]
  /**
   * When we expect to start booking again, in plain words, e.g.
   * "early October". Leave empty if there is no honest answer yet - the copy
   * reads correctly without it and an invented date is worse than none.
   */
  nextOpening?: string
}

export const capacity: CapacityNotice = {
  bookedOut: ['exterior-painting'],
  nextOpening: '',
}

/** Human labels for the notice copy. */
/* Stored lowercase: these labels appear mid-sentence far more often than at
   the start of one. Use sentenceCase() at the two places a sentence opens. */
const LABEL: Record<string, string> = {
  'exterior-painting': 'exterior painting',
  'interior-painting': 'interior painting',
  'commercial-painting': 'commercial painting',
  'residential-painting': 'residential painting',
  'cabinet-painting': 'cabinet refinishing',
  carpentry: 'carpentry',
  'power-washing': 'power washing',
}

export const sentenceCase = (s: string): string =>
  s.length === 0 ? s : s[0].toUpperCase() + s.slice(1)

/** Services still running on a normal schedule, for the reassurance line. */
const ALL = [
  'interior-painting',
  'exterior-painting',
  'cabinet-painting',
  'carpentry',
  'power-washing',
  'commercial-painting',
  'residential-painting',
]

export const isBookedOut = (slug?: string): boolean =>
  !!slug && capacity.bookedOut.includes(slug)

export const hasCapacityNotice = (): boolean => capacity.bookedOut.length > 0

export function bookedOutLabels(): string[] {
  return capacity.bookedOut.map((s) => LABEL[s] ?? s)
}

/** The services that ARE available, so the notice never reads as "we are closed". */
export function availableLabels(): string[] {
  const open = ALL.filter((s) => !capacity.bookedOut.includes(s))
  // Commercial and residential overlap with the others in customer language;
  // listing every slug reads like a sitemap, so keep the four people search for.
  const shown = open.filter((s) =>
    ['interior-painting', 'cabinet-painting', 'carpentry', 'power-washing'].includes(s)
  )
  return shown.map((s) => LABEL[s] ?? s)
}

export function joinNatural(items: string[]): string {
  if (items.length === 0) return ''
  if (items.length === 1) return items[0]
  return `${items.slice(0, -1).join(', ')} and ${items[items.length - 1]}`
}
