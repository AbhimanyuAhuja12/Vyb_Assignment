import fs from 'fs';
import { logger } from './logger.js';

/**
 * Write JSON data to file
 * @param {Object} data - Data to write
 * @param {string} filename - Output filename
 */
export async function writeOutputJson(data, filename) {
  try {
    const jsonData = JSON.stringify(data, null, 2);
    fs.writeFileSync(filename, jsonData);
    logger.info(`Successfully wrote output to ${filename}`);
    return true;
  } catch (error) {
    logger.error(`Error writing to ${filename}:`, error);
    return false;
  }
}

/**
 * Read JSON data from file
 * @param {string} filename - Input filename
 * @returns {Object} Parsed JSON data
 */
export async function readInputJson(filename) {
  try {
    const data = fs.readFileSync(filename, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    logger.error(`Error reading ${filename}:`, error);
    return null;
  }
}

/**
 * Write to debug log file
 * @param {string} content - Content to write
 */
export function writeToDebugLog(content) {
  try {
    const timestamp = new Date().toISOString();
    const logEntry = `[${timestamp}] ${content}\n`;
    
    // Create debug-log.txt if it doesn't exist
    if (!fs.existsSync('debug-log.txt')) {
      fs.writeFileSync('debug-log.txt', '');
    }
    
    // Append to the log file
    fs.appendFileSync('debug-log.txt', logEntry);
  } catch (error) {
    console.error('Error writing to debug log:', error);
  }
}