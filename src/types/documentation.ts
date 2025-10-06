export type ProcessingStatus = 
  | 'IDLE' 
  | 'ANALYZING' 
  | 'PROCESSING' 
  | 'GENERATING' 
  | 'FINALIZING' 
  | 'COMPLETE' 
  | 'ERROR';

export interface ProjectIntroduction {
  problemStatement: string;
  proposedSolution: string;
  goalsAndObjectives: string;
  scope: string;
  targetAudience: string;
}

export interface ProjectMethodology {
  developmentApproach: string;
  toolsAndTechnologies: string;
  requirementsAnalysis: string;
}

export interface SystemDesign {
  systemArchitecture: string;
  moduleDescriptions: string;
  databaseDesign: string;
  interfaceDesign: string;
  codeSamples: string;
}

export interface TestingAndResults {
  testingStrategy: string;
  testResults: string;
  projectAccomplishments: string;
}

export interface Conclusion {
  summaryOfAchievements: string;
  challengesAndLimitations: string;
  futureEnhancements: string;
}

export interface Appendix {
  codeRepository: string;
  references: string;
  glossary: string;
}

export interface DocumentationData {
  projectName: string;
  projectUrl: string;
  generationDate: string;
  executiveSummary: string;
  projectIntroduction: ProjectIntroduction;
  projectMethodology: ProjectMethodology;
  systemDesign: SystemDesign;
  testingAndResults: TestingAndResults;
  conclusion: Conclusion;
  appendix: Appendix;
}

export interface AnalysisHistoryItem {
  id: string;
  url: string;
  projectName: string;
  date: string;
}
