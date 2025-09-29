export interface TrainingStep {
  day: string;
  title: string;
  description: string;
  details: string[];
}
export const trainingSteps: TrainingStep[] = [
  {
    day: 'Days 1-2',
    title: 'Shadowing & Observation',
    description: 'New staff shadows an experienced chef without cooking. The focus is on absorbing the workflow, station layout, and pace of the kitchen.',
    details: [
      'Observe the entire process from prep to plating.',
      'Ask questions during downtime.',
      'Understand the "why" behind each step in the Recipe Bible.',
    ],
  },
  {
    day: 'Day 3',
    title: 'Guided Practice',
    description: 'The trainee prepares one core dish (e.g., Upma) under the direct supervision of a senior chef, following the Recipe Bible precisely.',
    details: [
      'Follow the 14-point recipe template exactly.',
      'Supervisor provides real-time feedback and correction.',
      'Emphasis on technique and adherence to standards.',
    ],
  },
  {
    day: 'Ongoing',
    title: 'Repetition & Feedback',
    description: 'The trainee cooks the same dish multiple times. The Head Chef tastes each attempt, providing immediate feedback against the QC checkpoints.',
    details: [
      'Cook the assigned dish 5 times consecutively.',
      'Receive a formal taste test and review for each attempt.',
      'Focus on achieving consistency in taste, texture, and appearance.',
    ],
  },
  {
    day: 'Certification',
    title: 'Final Certification',
    description: 'A chef is "certified" on a dish only after producing it to the exact standard 3 times in a row without any supervision or corrections.',
    details: [
      'Demonstrate mastery of the recipe.',
      'Achieve perfect scores on all QC checkpoints.',
      'Certification is recorded, and the chef can move to the next dish.',
    ],
  },
];