/**
 * @fileoverview MultiThreading data module
 * 
 * This file aggregates all MultiThreading topics and implementations.
 */

import { MultithreadingData } from '../types';

// Import MultiThreading data from existing files
import basics from './multithreading/basics';
import advance from './multithreading/advance';

/**
 * Complete collection of MultiThreading topics
 */
const multithreadingData: MultithreadingData = {
  "Basics": basics,
  "Advanced": advance
};

export default multithreadingData;
