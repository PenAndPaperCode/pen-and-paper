/**
 * @fileoverview Low Level Design (LLD) data module
 * 
 * This file aggregates all LLD design patterns and implementations.
 */

import { LLDData } from '../types';

// Direct import from design patterns
import designPatterns from './lld/designPatterns';

/**
 * Complete collection of LLD topics
 * Only Design Patterns is currently active
 */
const lldData: LLDData = {
  "Design Patterns": designPatterns
};

export default lldData;
