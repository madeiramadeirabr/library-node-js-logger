import { LoggerLevel } from './logger-level-enum';

export type LoggerConfigType = {
  level?: LoggerLevel;
  silent?: boolean;
  usePrettyPrint?: boolean;
  serviceName?: string;
};
