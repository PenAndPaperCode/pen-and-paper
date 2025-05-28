/**
 * @fileoverview High Level Design (HLD) data module
 * 
 * This file aggregates all HLD system designs and architectures.
 */

import { HLDData } from '../types';

// Import HLD data from existing files
import scalability from './hld/scalability';
import dataStorage from './hld/dataStorage';

/**
 * Complete collection of HLD topics
 * Only Scalability and Data Storage are currently active
 */
const hldData: HLDData = {
  "Scalability": scalability,
  "Data Storage": dataStorage
};

export default hldData;
