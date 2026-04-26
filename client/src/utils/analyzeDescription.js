/**
 * Analyzes a job description string and returns a Set of red flag IDs
 * that were detected via keyword/pattern matching.
 *
 * @param {string} description
 * @returns {Set<string>}
 */
export function detectFlags(description) {
  const text = description.toLowerCase()
  const detected = new Set()

  // no_salary: no salary/compensation indicators found
  const salaryPattern = /\$[\d,]+|\bsalary\b|\bcompensation\b|\bpay range\b|\bwage\b|\bhourly\b|\b\d+k\s*[-–]\s*\d+k\b|\b\d{2,3},\d{3}\b/
  if (!salaryPattern.test(text)) {
    detected.add('no_salary')
  }

  // urgently_hiring: urgency language
  const urgencyPattern = /urgently?\s+hiring|urgently?\s+needed|immediate(ly)?\s+(opening|hire|start)|as\s+soon\s+as\s+possible|asap|fill\s+(this\s+)?position\s+immediately/
  if (urgencyPattern.test(text)) {
    detected.add('urgently_hiring')
  }

  // experience_mismatch: entry-level language + high experience requirement
  const entryPattern = /entry[\s-]?level|junior|associate\s+(developer|engineer|analyst)/
  const highExpPattern = /[3-9]\+?\s*years?\s*(of\s+)?(experience|exp\b)/
  if (entryPattern.test(text) && highExpPattern.test(text)) {
    detected.add('experience_mismatch')
  }

  // no_contact: no email address, recruiter name, or contact instruction
  const contactPattern = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}|\brecruiter\b|\bhiring\s+manager\b|\bcontact\s+\w+|\breach\s+out\s+to\b/
  if (!contactPattern.test(text)) {
    detected.add('no_contact')
  }

  // no_team_structure: no mention of team, reporting, or collaboration
  const teamPattern = /\bteam\b|\breports?\s+to\b|\bcollaborate\b|\bcollaboration\b|\bmanager\b|\bcolleagues?\b|\bdepartment\b|\bdirect\s+report/
  if (!teamPattern.test(text)) {
    detected.add('no_team_structure')
  }

  // vague_description: description is very short
  if (description.trim().length < 200) {
    detected.add('vague_description')
  }

  // reposted: cannot be detected from description text alone — skipped

  return detected
}
