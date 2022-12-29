import { Format } from 'logform';
import { createLogger, format, transports, Logger as NodeJsLogger } from 'winston';
import { Logger } from './logger';
import { LoggerConfigType } from './types/logger-config-type';
import { LoggerLevel } from './types/logger-level-enum';

export class NodeJsLoggerService implements Logger {
  private logger: NodeJsLogger;

  constructor(private readonly config?: LoggerConfigType) {}

  private getLogger(): NodeJsLogger {
    if (!this.logger) {
      this.logger = this.createLogger();
    }
    return this.logger;
  }

  private getNodeJsFormattersByEnv(): Format[] {
    const formatters: Format[] = [format.timestamp(), format.json()];

    if (this.config?.usePrettyPrint) {
      return [
        ...formatters,
        format.prettyPrint({
          depth: 5,
          colorize: true,
        }),
      ];
    }

    return formatters;
  }

  private createLogger() {
    return createLogger({
      format: format.combine(...this.getNodeJsFormattersByEnv()),
      transports: [new transports.Console()],
      levels: {
        error: 1,
        warn: 2,
        info: 3,
        debug: 4,
      },
      level: this.makeLevel(this.config?.level),
      silent: this.config?.silent ?? false,
      defaultMeta: {
        service_name: this.config?.serviceName,
      },
    });
  }

  private makeLevel(level: LoggerLevel) {
    const mapLevel = { [LoggerLevel.debug]: 'debug' };
    return level ? mapLevel[level] ?? level : 'info';
  }

  public error(message: string, context?: any): void {
    const stack = context instanceof Error ? context.stack : undefined;
    this.getLogger().error({ message, context, stack });
  }
  public info(message: string, context?: any): void {
    this.getLogger().info({ message, context });
  }
  public warn(message: string, context?: any): void {
    this.getLogger().warn({ message, context });
  }
  public debug(message: string, context?: any): void {
    this.getLogger().debug({ message, context });
  }
}
