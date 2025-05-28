/**
 * @fileoverview Low Level Design (LLD) data module
 * 
 * This file aggregates all LLD design patterns and implementations.
 */

import { LLDData } from '../types';

// Import subtopics
import creationalPatterns from './lld/creationalPatterns';
import structuralPatterns from './lld/structuralPatterns';

/**
 * Complete collection of LLD topics with subtopics
 */
const lldData: LLDData = {
  "Design Patterns": {
    "Creational": creationalPatterns,
    "Structural": structuralPatterns
  }
};

export default lldData;
