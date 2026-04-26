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
  // Suppress if vague-but-intentional compensation language is present
  const salaryPattern = /\$[\d,]+|\bpay range\b|\bwage\b|\bhourly\b|\b\d+k\s*[-–]\s*\d+k\b|\b\d{2,3},\d{3}\b/
  const vagueCompPattern = /\bsalary\b|\bcompensation\b|\bcommensurate\b|\bcompetitive (pay|salary|compensation)\b|\bbased on experience\b|\bdoe\b/
  if (!salaryPattern.test(text) && !vagueCompPattern.test(text)) {
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

  // vague_description: heavy use of generic filler phrases with no specifics
  const fillerPhrases = [
    /fast[\s-]paced environment/,
    /self[\s-]starter/,
    /team player/,
    /go[\s-]getter/,
    /results[\s-]driven/,
    /dynamic (individual|professional|candidate)/,
    /excellent (communication|interpersonal) skills/,
    /strong work ethic/,
    /detail[\s-]oriented/,
    /passionate about (making a difference|our mission|success)/,
    /various duties as assigned/,
    /other duties as assigned/,
    /wear many hats/,
    /hit the ground running/,
  ]
  const fillerCount = fillerPhrases.filter(p => p.test(text)).length
  // Flag if 3+ filler phrases and no specific tech/tool mentions (no version numbers, no named tools)
  const hasSpecifics = /\b(react|python|sql|java|node|aws|docker|kubernetes|typescript|figma|salesforce|v\d+\.\d+|\d+\.\d+\.\d+)\b/.test(text)
  if (fillerCount >= 3 && !hasSpecifics) {
    detected.add('vague_description')
  }

  // reposted: cannot be detected from description text alone — skipped

  return detected
}
