/**
 * @fileoverview High Level Design (HLD) data module
 * 
 * This file aggregates all HLD system designs and architectures.
 */

import { HLDData } from '../types';

// Import subtopics
import loadBalancing from './hld/loadBalancing';
import scaling from './hld/scaling';
import sqlNoSql from './hld/sqlNoSql';
import indexing from './hld/indexing';

/**
 * Complete collection of HLD topics with subtopics
 */
const hldData: HLDData = {
  "Scalability": {
    "Load Balancing": loadBalancing,
    "Scaling Strategies": scaling
  },
  "Data Storage": {
    "SQL vs NoSQL": sqlNoSql,
    "Database Indexing": indexing
  }
};

export default hldData;
