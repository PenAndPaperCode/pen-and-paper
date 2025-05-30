/**
 * @fileoverview Low Level Design (LLD) data module
 * 
 * This file aggregates all LLD topics and implementations.
 */

import { LLDData } from '../types';

// Import LLD data from existing files
import basics from './lld/basics';
import advance from './lld/advance';

/**
 * Complete collection of LLD topics
 */
const lldData: LLDData = {
  "Basics": basics,
  "Advanced": advance
};

export default lldData;
