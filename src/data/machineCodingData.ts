/**
 * @fileoverview Machine Coding data module
 * 
 * This file aggregates all machine coding components and implementations.
 */

import { MachineCodingData } from '../types';

// Direct imports for system components
import ratelimiter from './machinecoding/systemcomponents/ratelimiter';
import inmemorydb from './machinecoding/systemcomponents/inmemorydb';

/**
 * Complete collection of machine coding topics organized by category
 * Only Rate Limiter and In-Memory DB are currently active
 */
const machineCodingData: MachineCodingData = {
  "Rate Limiter": ratelimiter,
  "In-Memory DB": inmemorydb
};

export default machineCodingData;
