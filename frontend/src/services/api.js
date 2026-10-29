export const seniors = [
  { id: 1, name: 'Kamla Devi', age: 78, initials: 'KD', score: 86, level: 'Critical', baseline: 'BP usually 142/88', vitals: 'BP 158/96 · +16 systolic', medicine: '6 of 7 days missed', signal: 'Food intake down 40%', note: '“Dawai bhool gayi, bhookh kam lagti hai”', action: 'Call today · Review medicine · Check food and hydration', trend: [35, 42, 48, 58, 62, 74, 86], updated: '12 min ago' },
  { id: 2, name: 'Ramesh Gupta', age: 82, initials: 'RG', score: 74, level: 'High', baseline: 'Sleep usually 7 hrs', vitals: 'Sleep 4.2 hrs · 3-night trend', medicine: '2 of 3 doses missed', signal: 'Restlessness reported', note: '“Raat ko neend nahi aa rahi, kal bhi thoda ghabrahat”', action: 'Call this afternoon · Review sleep and medicines', trend: [38, 44, 51, 55, 60, 68, 74], updated: '28 min ago' },
  { id: 3, name: 'Suman Joshi', age: 75, initials: 'SJ', score: 68, level: 'High', baseline: 'Normal glucose 118 mg/dL', vitals: 'Glucose 172 · +54 mg/dL', medicine: '1 of 7 days missed', signal: 'Skipped 2 meals', note: '“No pain, but no appetite today”', action: 'Call today · Confirm glucose reading · Arrange meal check', trend: [28, 34, 40, 46, 52, 61, 68], updated: '36 min ago' },
  { id: 4, name: 'Harish Mehta', age: 81, initials: 'HM', score: 51, level: 'Watch', baseline: 'Steps usually 2,100/day', vitals: 'BP 146/90 · stable', medicine: 'All doses recorded', signal: 'Steps down 55%', note: '“No fall, back pain thoda badh gaya”', action: 'Follow up tomorrow · Ask about pain and activity', trend: [40, 42, 43, 47, 45, 49, 51], updated: '1 hr ago' },
  { id: 5, name: 'Anita Kapoor', age: 79, initials: 'AK', score: 47, level: 'Watch', baseline: 'Usual mood: calm', vitals: 'BP 136/84 · stable', medicine: '0 of 7 days missed', signal: 'Contact declined twice', note: '“Akele feel kar rahi hoon, lekin koi dard nahi”', action: 'Schedule call · Check family support and wellbeing', trend: [30, 32, 38, 40, 44, 46, 47], updated: '1 hr ago' },
  { id: 6, name: 'Mohan Singh', age: 84, initials: 'MS', score: 22, level: 'Stable', baseline: 'All personal baselines stable', vitals: 'BP 138/86 · stable', medicine: 'All doses recorded', signal: 'Normal activity', note: '“Sab theek hai, walk ki thi”', action: 'Routine monitoring', trend: [24, 23, 25, 22, 21, 23, 22], updated: '2 hrs ago' },
]

export async function fetchFamilyData() {
  await new Promise((resolve) => setTimeout(resolve, 700))
  return seniors[0]
}
