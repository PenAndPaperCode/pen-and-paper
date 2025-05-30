/**
 * @fileoverview High Level Design (HLD) data module
 * 
 * This file aggregates all HLD topics and implementations.
 */

import { HLDData } from '../types';

// Import HLD data from existing files
import basics from './hld/basics';
import advance from './hld/advance';

/**
 * Complete collection of HLD topics
 */
const hldData: HLDData = {
  "Basics": basics,
  "Advanced": advance
};

export default hldData;
