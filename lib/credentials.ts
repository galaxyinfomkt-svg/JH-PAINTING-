/**
 * credentials.ts - what the business can actually prove.
 *
 * THE RULE THIS FILE ENFORCES
 * A credential renders on the site ONLY when its number is filled in here.
 * An empty string means the page says nothing about it. That is deliberate:
 * a license number is a legal claim, and publishing an unverified or wrong
 * one is worse than publishing none. The old schema declared a "Massachusetts
 * Painting Contractor License", a credential the Commonwealth does not issue.
 *
 * WHY IT IS NOT "EPA LEAD-SAFE CERTIFIED" IN MASSACHUSETTS
 * On 9 July 2010 the Massachusetts Department of Labor Standards received EPA
 * authorization to administer its own Lead-Safe Renovation program in lieu
 * of the federal RRP rule. Work performed in Massachusetts is governed by a
 * DLS Lead-Safe Renovation Contractor license, not by an EPA firm
 * certification. Naming the federal one on a Massachusetts site is the wrong
 * credential, even when the company is genuinely qualified.
 *
 * HOW TO PUBLISH ONE
 * Paste the number, redeploy. Nothing else to change.
 */

export interface Credential {
  /** Exact legal name of the credential. Do not paraphrase. */
  name: string
  /** Who issues it. */
  issuer: string
  /** Registration or license number. EMPTY = not published anywhere. */
  number: string
  /** Public verification page, when the issuer has one. */
  verifyUrl?: string
  /** One line a homeowner would understand. */
  plain: string
}

export const credentials: Credential[] = [
  {
    name: 'Home Improvement Contractor Registration',
    issuer: 'Massachusetts Office of Consumer Affairs and Business Regulation',
    number: '',
    verifyUrl: 'https://contractorhub.mass.gov/s/hic-contractor-search',
    plain:
      'Required in Massachusetts for residential work on owner-occupied homes of one to four units. It is what gives you access to the state Guaranty Fund and arbitration program if a job goes wrong.',
  },
  {
    name: 'Lead-Safe Renovation Contractor License',
    issuer: 'Massachusetts Department of Labor Standards',
    number: '',
    verifyUrl: 'https://www.mass.gov/info-details/lead-safe-renovation-for-contractors',
    plain:
      'Required for any renovation, repair or painting that disturbs paint in housing built before 1978. Massachusetts runs this program itself, so the state license is the one that counts here.',
  },
  {
    name: 'General Liability Insurance',
    issuer: '',
    number: '',
    plain:
      'Covers damage to your property caused by our work. Ask for the certificate before any contractor starts.',
  },
  {
    name: 'Workers Compensation Insurance',
    issuer: '',
    number: '',
    plain:
      'Covers our crew if someone is hurt on your property, so the liability does not land on your homeowner policy.',
  },
]

/** Only credentials we can actually evidence. */
export const publishedCredentials = () => credentials.filter((c) => c.number.trim().length > 0)

/** True when nothing has been filled in yet. */
export const hasPublishedCredentials = () => publishedCredentials().length > 0

/**
 * Founder name.
 *
 * NOTE: the site has used "Jafet Henrique"; a third-party directory lists
 * "Jafet Oliveira". Those may be two parts of one full name, but the site
 * should print whatever appears on the business registration. Confirm before
 * changing.
 */
export const founder = {
  name: 'Jafet Henrique',
  role: 'Owner and lead painter',
  since: 2018,
}
