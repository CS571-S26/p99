export const RED_FLAGS = [
  {
    id: 'no_salary',
    label: 'No salary range listed',
    description: 'Legitimate postings typically disclose compensation. Omitting it can signal the role is exploratory or collecting market data.',
    weight: 20,
  },
  {
    id: 'vague_description',
    label: 'Vague or generic job description',
    description: 'Copy-paste descriptions with no specifics about the team or tech stack suggest the role may not be real.',
    weight: 15,
  },
  {
    id: 'urgently_hiring',
    label: '"Urgently hiring" language used',
    description: 'Urgency language is a common recruiting hook. Genuine urgent roles are filled quietly, not broadcast.',
    weight: 12,
  },
  {
    id: 'experience_mismatch',
    label: 'Entry-level title but requires 3+ years experience',
    description: 'Impossible requirements keep a role perpetually unfilled — a known ghost job pattern.',
    weight: 18,
  },
  {
    id: 'no_contact',
    label: 'No named recruiter or contact person',
    description: 'Real open roles typically have a human attached. Anonymous postings are harder to follow up on.',
    weight: 10,
  },
  {
    id: 'reposted',
    label: 'Job appears reposted or has been listed a long time',
    description: 'A posting that keeps refreshing without being filled is a strong ghost job signal.',
    weight: 13,
  },
  {
    id: 'no_team_structure',
    label: 'No mention of team structure or reporting relationship',
    description: 'Authentic roles describe who you will work with. Omitting this suggests the role was not thought through.',
    weight: 12,
  },
]

/**
 * Props:
 *   checked  – Set<string>  controlled set of checked flag ids
 *   onChange – (newChecked: Set<string>) => void
 *   disabled – boolean  true after form submission
 */
export default function GhostChecklist({ checked, onChange, disabled }) {
  function toggle(id) {
    if (disabled) return
    const next = new Set(checked)
    if (next.has(id)) {
      next.delete(id)
    } else {
      next.add(id)
    }
    onChange(next)
  }

  const score = RED_FLAGS
    .filter(f => checked.has(f.id))
    .reduce((sum, f) => sum + f.weight, 0)

  return (
    <div className="ghost-checklist">
      <div className="ghost-checklist-header">
        <span className="form-label fw-semibold mb-0">Ghost Job Red Flags</span>
        <span className="ghost-checklist-score">
          Score: <strong>{score}</strong> / 100
        </span>
      </div>
      <p className="ghost-checklist-hint">
        Check each red flag that applies to this posting.
      </p>

      <div className="ghost-checklist-items">
        {RED_FLAGS.map(flag => (
          <label
            key={flag.id}
            className={[
              'ghost-checklist-item',
              disabled ? 'ghost-checklist-item--disabled' : '',
              checked.has(flag.id) ? 'ghost-checklist-item--checked' : '',
            ].join(' ')}
          >
            <input
              type="checkbox"
              className="form-check-input ghost-checklist-checkbox"
              checked={checked.has(flag.id)}
              onChange={() => toggle(flag.id)}
              disabled={disabled}
            />
            <span className="ghost-checklist-label">{flag.label}</span>
            <span className="ghost-checklist-weight">+{flag.weight} pts</span>
            <span className="ghost-checklist-desc">{flag.description}</span>
          </label>
        ))}
      </div>
    </div>
  )
}
