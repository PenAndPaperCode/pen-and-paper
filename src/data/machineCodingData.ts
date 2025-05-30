/**
 * @fileoverview Machine Coding data module
 * 
 * This file aggregates all Machine Coding topics and implementations.
 */

import { MachineCodingData } from '../types';

// Import Machine Coding data from existing files
import basics from './machinecoding/basics';
import advance from './machinecoding/advance';

/**
 * Complete collection of Machine Coding topics
 */
const machineCodingData: MachineCodingData = {
  "Basics": basics,
  "Advanced": advance
};

export default machineCodingData;
