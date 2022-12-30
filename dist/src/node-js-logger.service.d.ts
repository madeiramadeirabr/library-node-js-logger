import { Logger } from './logger';
import { LoggerConfigType } from './types/logger-config-type';
export declare class NodeJsLoggerService implements Logger {
    private readonly config?;
    private logger;
    constructor(config?: LoggerConfigType);
    private getLogger;
    private getNodeJsFormattersByEnv;
    private createLogger;
    private makeLevel;
    error(message: string, context?: any): void;
    info(message: string, context?: any): void;
    warn(message: string, context?: any): void;
    debug(message: string, context?: any): void;
}
