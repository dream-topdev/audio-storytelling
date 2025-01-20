type LogLevel = 'info' | 'warn' | 'error' | 'debug';

const isDevelopment = process.env.NODE_ENV === 'development';

export const logger = {
  info: (message: string, ...args: any[]) => {
    if (isDevelopment) {
      console.log(`[INFO] ${message}`, ...args);
    }
  },
  
  warn: (message: string, ...args: any[]) => {
    if (isDevelopment) {
      console.warn(`[WARN] ${message}`, ...args);
    }
  },
  
  error: (message: string, error?: Error, ...args: any[]) => {
    console.error(`[ERROR] ${message}`, error, ...args);
  },
  
  debug: (message: string, ...args: any[]) => {
    if (isDevelopment) {
      console.debug(`[DEBUG] ${message}`, ...args);
    }
  }
}; 