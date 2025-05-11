const logLevels = {
    error: 0,
    warn: 1,
    info: 2,
    debug: 3
  };
  
  // Set the current log level (can be changed)
  let currentLogLevel = logLevels.info;
  
  // Create logger object
  export const logger = {
    error: (message, ...args) => {
      if (currentLogLevel >= logLevels.error) {
        console.error(`[ERROR] ${message}`, ...args);
        // Also write to debug log
        writeToDebugLog('ERROR', message, args);
      }
    },
    
    warn: (message, ...args) => {
      if (currentLogLevel >= logLevels.warn) {
        console.warn(`[WARN] ${message}`, ...args);
        writeToDebugLog('WARN', message, args);
      }
    },
    
    info: (message, ...args) => {
      if (currentLogLevel >= logLevels.info) {
        console.log(`[INFO] ${message}`, ...args);
        writeToDebugLog('INFO', message, args);
      }
    },
    
    debug: (message, ...args) => {
      if (currentLogLevel >= logLevels.debug) {
        console.debug(`[DEBUG] ${message}`, ...args);
        writeToDebugLog('DEBUG', message, args);
      }
    },
    
    // Set the log level
    setLogLevel: (level) => {
      if (logLevels[level] !== undefined) {
        currentLogLevel = logLevels[level];
        console.log(`Log level set to ${level}`);
      } else {
        console.error(`Invalid log level: ${level}`);
      }
    }
  };
  
  /**
   * Write to debug log file (in a real application)
   */
  function writeToDebugLog(level, message, args) {
    // In a real implementation, this would write to a file
    // For now, we'll just store in memory
    const logEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      args: args && args.length > 0 ? args : null
    };
    
    // In a real app, append to file:
    // fs.appendFileSync('debug-log.txt', JSON.stringify(logEntry) + '\n');
  }