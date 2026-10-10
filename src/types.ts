export type GradeLevel = 'SD' | 'SMP' | 'SMA';
export type Difficulty = 'Mudah' | 'Sedang' | 'Sulit';

export type DiagramType =
  | 'pythagoras'
  | 'circle_sector'
  | 'fraction_pie'
  | 'linear_function'
  | 'quadratic_function'
  | 'trigonometry_elevation'
  | 'probability_spinner'
  | 'scale_balance'
  | 'angle_geometry'
  | 'area_perimeter';

export interface DiagramParams {
  val1: number;
  val2: number;
  val3?: number;
  val4?: number;
  unit: string;
  label1?: string;
  label2?: string;
  label3?: string;
  label4?: string;
  caption: string;
  showProof?: boolean;
  activeItem?: string | number;
}

export interface MathProblem {
  id: string;
  title: string;
  gradeLevel: GradeLevel;
  topic: string;
  difficulty: Difficulty;
  questionText: string;
  diagramType: DiagramType;
  diagramParams: DiagramParams;
  simulationInstructions: string;
  options: string[];
  correctAnswerIndex: number;
  correctAnswerLabel: 'A' | 'B' | 'C' | 'D';
  explanation: string;
  keyFormula: string;
  tags?: string[];
  createdAt?: string;
}

export interface WorksheetSettings {
  schoolName: string;
  examTitle: string;
  subject: string;
  teacherName: string;
  supervisorName: string;
  supervisorTitle: string;
  classGrade: string;
  timeLimit: string;
  includeAnswerKey: boolean;
  includeExplanations: boolean;
}
