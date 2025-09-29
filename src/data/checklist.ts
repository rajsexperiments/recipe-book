import type { ChecklistWeek } from '@/types';
export const initialChecklistData: ChecklistWeek[] = [
  {
    week: 1,
    title: 'Setup',
    tasks: [
      { id: 'w1-t1', title: 'Procure all equipment and ingredients', description: 'Finalize supplier contracts and receive initial inventory.' },
      { id: 'w1-t2', title: 'Set up kitchen stations as per SOPs', description: 'Organize prep, cooking, and plating stations for optimal workflow.' },
      { id: 'w1-t3', title: 'Conduct first test run of all 18 recipes', description: 'Cook one portion of each recipe to validate methods and timings.' },
      { id: 'w1-t4', title: 'Finalize ingredient costing', description: 'Update recipe bible with costs based on actual purchase prices.' },
    ],
  },
  {
    week: 2,
    title: 'Internal Tasting',
    tasks: [
      { id: 'w2-t1', title: 'Train core team on 5 "Core" recipes', description: 'Certify the head chef and one other staff member on key breakfast & lunch items.' },
      { id: 'w2-t2', title: 'Conduct internal tasting and scoring', description: 'Team members score the 5 core recipes using the official scoring sheet.' },
      { id: 'w2-t3', title: 'Adjust recipes in the Bible', description: 'Make necessary tweaks to recipes based on internal feedback.' },
    ],
  },
  {
    week: 3,
    title: 'External Pilot',
    tasks: [
      { id: 'w3-t1', title: 'Run limited pilot for friends & family', description: 'Serve a curated menu to a select group of pilot tasters.' },
      { id: 'w3-t2', title: 'Distribute "Golden Feedback Form"', description: 'Collect detailed qualitative and quantitative feedback.' },
      { id: 'w3-t3', title: 'Collect and analyze all external feedback', description: 'Enter all scoring data into the feedback spreadsheet for review.' },
    ],
  },
  {
    week: 4,
    title: 'Refinement',
    tasks: [
      { id: 'w4-t1', title: 'Make final adjustments to recipes & pricing', description: 'Incorporate external feedback into final portion sizes, taste profiles, and pricing.' },
      { id: 'w4-t2', title: '"Lock" the Recipe Bible Version 1.0', description: 'Finalize the master document for the official launch.' },
      { id: 'w4-t3', title: 'Plan Month 2 menu additions', description: 'Schedule the introduction of "Special" and "Experimental" dishes.' },
    ],
  },
];