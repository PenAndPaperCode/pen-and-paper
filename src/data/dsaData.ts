/**
 * @fileoverview Main DSA (Data Structures and Algorithms) data module
 * 
 * This file serves as the central aggregator for all DSA categories.
 * It imports all category-specific data modules and exports a unified 
 * data structure for use in the application.
 */

import { DSAData } from '../types';

// Import category data
import arrayData from './dsa/arrayData';
import binarySearchData from './dsa/binarySearchData';
import binarySearchTreeData from './dsa/binarySearchTreeData';
import binaryTreeData from './dsa/binaryTreeData';
import bitManipulationData from './dsa/bitManipulationData';
import divideAndConquerData from './dsa/divideAndConquerData';
import dynamicProgrammingData from './dsa/dynamicProgrammingData';
import graphData from './dsa/graphData';
import greedyData from './dsa/greedyData';
import hashMapPrefixData from './dsa/hashMapPrefixData';
import heapData from './dsa/heapData';
import linkedListData from './dsa/linkedListData';
import mergeIntervalsData from './dsa/mergeIntervalsData';
import prefixSumData from './dsa/prefixSumData';
import queueData from './dsa/queueData';
import recursionData from './dsa/recursionData';
import stackData from './dsa/stackData';
import stringData from './dsa/stringData';
import trieData from './dsa/trieData';
import twoPointerData from './dsa/twoPointerData';

/**
 * Complete collection of DSA topics organized by category in lexicographical order
 */
const dsaData: DSAData = {
  "Binary Search": binarySearchData,
  "Two Pointer": twoPointerData,
  "Recursion": recursionData,
  "Graph": graphData,
  "Stack": stackData,
  "Divide and Conquer": divideAndConquerData,
  "Array": arrayData,
  "Binary Search Tree": binarySearchTreeData,
  "Binary Tree": binaryTreeData,
  "Bit Manipulation": bitManipulationData,
  "Dynamic Programming": dynamicProgrammingData,
  "Greedy": greedyData,
  "HashMap + Prefix Patterns": hashMapPrefixData,
  "Heap": heapData,
  "Linked List": linkedListData,
  "Merge Intervals": mergeIntervalsData,
  "Prefix Sum": prefixSumData,
  "Queue": queueData,
  "String": stringData,
  "Trie": trieData,
};

export default dsaData;
