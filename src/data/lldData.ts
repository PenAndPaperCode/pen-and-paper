/**
 * @fileoverview Low Level Design (LLD) data module
 * 
 * This file aggregates all LLD design patterns and implementations.
 */

import { LLDData } from '../types';

// Direct imports from design patterns
import creationalPatterns from './lld/designPatterns/creationalPatterns';
import structuralPatterns from './lld/designPatterns/structuralPatterns';

/**
 * Complete collection of LLD topics
 * Only Creational and Structural patterns are currently active
 */
const lldData: LLDData = {
  "Creational Patterns": creationalPatterns,
  "Structural Patterns": structuralPatterns
};

export default lldData;
