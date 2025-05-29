/**
 * @fileoverview Machine Coding data module
 * 
 * This file aggregates all machine coding components and implementations.
 */

import { MachineCodingData } from '../types';

// Direct imports for main categories
import rateLimiter from './machinecoding/rateLimiter';
import inMemoryDB from './machinecoding/inMemoryDB';

/**
 * Complete collection of machine coding topics organized by category
 * Only Rate Limiter and In-Memory DB are currently active
 */
const machineCodingData: MachineCodingData = {
  "Rate Limiter": rateLimiter,
  "In-Memory DB": inMemoryDB
};

export default machineCodingData;
