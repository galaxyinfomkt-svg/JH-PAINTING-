import {
  capacity,
  isBookedOut,
  hasCapacityNotice,
  bookedOutLabels,
  availableLabels,
  joinNatural,
  sentenceCase,
} from '@/lib/scheduling'

/**
 * Capacity notice, rendered next to the estimate form.
 *
 * Two weights on purpose. The owner asked for this on every page that carries
 * a form, and a full-size warning on a cabinet-refinishing page would suppress
 * a booking we can actually take. So:
 *
 *   - On a page about the booked-out service: the full block. The visitor came
 *     for that exact job and deserves the situation stated plainly.
 *   - Everywhere else: one quiet line that names what is closed AND what is
 *     open, so nobody reads it as "this company is not taking work".
 *
 * Renders nothing when lib/scheduling.ts has an empty `bookedOut`.
 */
export default function CapacityNotice({ service }: { service?: string }) {
  if (!hasCapacityNotice()) return null

  const closed = joinNatural(bookedOutLabels())
  const open = joinNatural(availableLabels())
  const onAffectedPage = isBookedOut(service)

  if (!onAffectedPage) {
    return (
      <p className="capnote-line">
        <span className="capnote-dot" aria-hidden="true" />
        {`${sentenceCase(closed)} is fully booked at the moment. ${sentenceCase(open)} are booking as normal.`}
      </p>
    )
  }

  /* Built as one string, not JSX children: an interpolation split across lines
     puts a space before the full stop ("current run ."). */
  const crewLine =
    'Our exterior crews are committed for the current run' +
    (capacity.nextOpening ? `, and we expect to open bookings again in ${capacity.nextOpening}` : '') +
    '. Send your details anyway. We work the waiting list in the order it comes in and call as soon ' +
    'as a slot frees up, so you keep your place instead of starting over later.'

  return (
    <aside className="capnote" aria-label="Scheduling notice">
      <p className="capnote-brow">Scheduling</p>
      <h3 className="capnote-h">{`${sentenceCase(closed)} is fully booked right now`}</h3>
      <p className="capnote-body">{crewLine}</p>
      <p className="capnote-body capnote-alt">
        {`${sentenceCase(open)} are on a normal schedule and can usually be walked in a few days.`}
      </p>
    </aside>
  )
}
