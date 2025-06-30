// Base interface for learning resources
export interface LearningResource {
  youtube: string;
  platform: string;
  github: string;
}

// Data structure types for DSA
export interface DSAData {
  [topic: string]: {
    [subtopic: string]: {
      [problemName: string]: LearningResource;
    };
  };
}

// Data structure types for HLD
export interface HLDData {
  [topic: string]: {
    [subtopic: string]: {
      [problemName: string]: LearningResource;
    };
  };
}

// Data structure types for LLD
export interface LLDData {
  [topic: string]: {
    [subtopic: string]: {
      [implementationName: string]: LearningResource;
    };
  };
}

// Data structure types for Machine Coding
export interface MachineCodingData {
  [topic: string]: {
    [subtopic: string]: {
      [componentName: string]: LearningResource;
    };
  };
}

// Data structure types for MultiThreading
export interface MultithreadingData {
  [topic: string]: {
    [subtopic: string]: {
      [problemName: string]: LearningResource;
    };
  };
}

// Data structure types for Revision Sheet
export interface RevisionSheetData {
  problems: {
    [problemName: string]: LearningResource;
  };
}

// Combined data type for the application
export interface AppData {
  DSA: DSAData;
  LLD: LLDData;
  HLD: HLDData;
  "Machine Coding": MachineCodingData;
  "MultiThreading": MultithreadingData;
  "DSA Countdown: Final 15 Days": RevisionSheetData;
  "ALL DSA Patterns You must know": RevisionSheetData;
}

// Type for tracking completion status
export interface DoneStatusType {
  [key: string]: boolean;
}
