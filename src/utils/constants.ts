export const SUBJECTS = {
  PHYSICS: 'physics',
  CHEMISTRY: 'chemistry',
  BIOLOGY: 'biology',
} as const;

export type Subject = typeof SUBJECTS[keyof typeof SUBJECTS];

export interface Experiment {
  id: string;
  title: string;
  subject: Subject;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  duration: string;
  objectives: string[];
  apparatus: string[];
  isCompleted?: boolean;
  isAssigned?: boolean;
}

export const EXPERIMENTS: Experiment[] = [
  {
    id: 'ohms-law',
    title: "Ohm's Law Verification",
    subject: SUBJECTS.PHYSICS,
    description: 'Verify the relationship between voltage, current, and resistance using a simple circuit.',
    difficulty: 'easy',
    duration: '30 min',
    objectives: [
      'Understand the relationship V = IR',
      'Measure voltage and current accurately',
      'Plot V-I characteristics graph',
    ],
    apparatus: ['Battery', 'Ammeter', 'Voltmeter', 'Resistor', 'Rheostat', 'Connecting wires'],
  },
  {
    id: 'pendulum',
    title: 'Simple Pendulum',
    subject: SUBJECTS.PHYSICS,
    description: 'Study the time period of a simple pendulum and verify T = 2π√(L/g).',
    difficulty: 'easy',
    duration: '25 min',
    objectives: [
      'Understand simple harmonic motion',
      'Measure time period for different lengths',
      'Calculate acceleration due to gravity',
    ],
    apparatus: ['Pendulum bob', 'Thread', 'Clamp stand', 'Stopwatch', 'Meter scale'],
  },
  {
    id: 'acid-base-titration',
    title: 'Acid-Base Titration',
    subject: SUBJECTS.CHEMISTRY,
    description: 'Determine the concentration of an unknown acid using a standard base solution.',
    difficulty: 'medium',
    duration: '45 min',
    objectives: [
      'Understand neutralization reactions',
      'Use burette and pipette correctly',
      'Calculate molarity of unknown solution',
    ],
    apparatus: ['Burette', 'Pipette', 'Conical flask', 'Indicator', 'Standard NaOH', 'Unknown HCl'],
  },
  {
    id: 'ph-testing',
    title: 'pH Testing of Solutions',
    subject: SUBJECTS.CHEMISTRY,
    description: 'Test and classify various solutions as acidic, basic, or neutral using pH indicators.',
    difficulty: 'easy',
    duration: '20 min',
    objectives: [
      'Understand pH scale',
      'Use universal indicator',
      'Classify common household solutions',
    ],
    apparatus: ['pH paper', 'Universal indicator', 'Test tubes', 'Sample solutions'],
  },
  {
    id: 'microscope-observation',
    title: 'Microscope Cell Observation',
    subject: SUBJECTS.BIOLOGY,
    description: 'Observe plant and animal cells under a microscope and identify key structures.',
    difficulty: 'easy',
    duration: '35 min',
    objectives: [
      'Learn microscope operation',
      'Identify cell structures',
      'Compare plant and animal cells',
    ],
    apparatus: ['Compound microscope', 'Glass slides', 'Cover slips', 'Stain', 'Onion cells', 'Cheek cells'],
  },
  {
    id: 'photosynthesis',
    title: 'Photosynthesis Experiment',
    subject: SUBJECTS.BIOLOGY,
    description: 'Demonstrate oxygen production during photosynthesis using aquatic plants.',
    difficulty: 'medium',
    duration: '40 min',
    objectives: [
      'Understand photosynthesis process',
      'Measure oxygen bubble production',
      'Analyze effect of light intensity',
    ],
    apparatus: ['Aquatic plant', 'Beaker', 'Funnel', 'Test tube', 'Light source', 'Sodium bicarbonate'],
  },
  {
    id: 'projectile-motion',
    title: 'Projectile Motion',
    subject: SUBJECTS.PHYSICS,
    description: 'Study the motion of projectiles and analyze trajectory, range, maximum height, and time of flight.',
    difficulty: 'medium',
    duration: '45 min',
    objectives: [
      'Understand projectile motion equations',
      'Analyze the effect of launch angle on range',
      'Calculate maximum height and time of flight',
      'Visualize trajectory in 2D and 3D',
    ],
    apparatus: ['Projectile launcher', 'Measuring tape', 'Protractor', 'Stopwatch', 'Target board', 'Safety goggles'],
  },
];

export const getSubjectColor = (subject: Subject): string => {
  switch (subject) {
    case SUBJECTS.PHYSICS:
      return 'physics';
    case SUBJECTS.CHEMISTRY:
      return 'chemistry';
    case SUBJECTS.BIOLOGY:
      return 'biology';
    default:
      return 'primary';
  }
};

export const getSubjectGradient = (subject: Subject): string => {
  switch (subject) {
    case SUBJECTS.PHYSICS:
      return 'from-physics to-primary';
    case SUBJECTS.CHEMISTRY:
      return 'from-chemistry to-accent';
    case SUBJECTS.BIOLOGY:
      return 'from-biology to-secondary';
    default:
      return 'from-primary to-secondary';
  }
};
