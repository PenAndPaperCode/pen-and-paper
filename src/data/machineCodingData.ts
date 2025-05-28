/**
 * @fileoverview Machine Coding data module
 * 
 * This file aggregates all machine coding components and implementations.
 */

import { MachineCodingData } from '../types';

// Import subtopics
import tokenBucket from './machinecoding/tokenBucket';
import leakyBucket from './machinecoding/leakyBucket';
import keyValue from './machinecoding/keyValue';
import documentBased from './machinecoding/documentBased';

/**
 * Complete collection of machine coding topics with subtopics
 */
const machineCodingData: MachineCodingData = {
  "Rate Limiter": {
    "Token Bucket": tokenBucket,
    "Leaky Bucket": leakyBucket
  },
  "In-Memory DB": {
    "Key-Value Store": keyValue,
    "Document Store": documentBased
  }
};

export default machineCodingData;
