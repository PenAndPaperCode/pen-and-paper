/**
 * @fileoverview Main DSA (Data Structures and Algorithms) data module
 * 
 * This file serves as the central aggregator for all DSA categories.
 * It imports all category-specific data modules and exports a unified 
 * data structure for use in the application.
 */

import { DSAData } from '../types';

// Import category data
import graphData from './dsa/graphData';
import recursionData from './dsa/recursionData';

/**
 * Complete collection of DSA topics organized by category
 * Only Graph and Recursion are currently active
 */
const dsaData: DSAData = {
  Graph: graphData,
  Recursion: recursionData
};

export default dsaData;
