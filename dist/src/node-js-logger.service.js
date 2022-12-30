"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodeJsLoggerService = void 0;
const winston_1 = require("winston");
const logger_level_enum_1 = require("./types/logger-level-enum");
class NodeJsLoggerService {
    constructor(config) {
        this.config = config;
    }
    getLogger() {
        if (!this.logger) {
            this.logger = this.createLogger();
        }
        return this.logger;
    }
    getNodeJsFormattersByEnv() {
        var _a;
        const formatters = [winston_1.format.timestamp(), winston_1.format.json()];
        if ((_a = this.config) === null || _a === void 0 ? void 0 : _a.usePrettyPrint) {
            return [
                ...formatters,
                winston_1.format.prettyPrint({
                    depth: 5,
                    colorize: true,
                }),
            ];
        }
        return formatters;
    }
    createLogger() {
        var _a, _b, _c, _d;
        return (0, winston_1.createLogger)({
            format: winston_1.format.combine(...this.getNodeJsFormattersByEnv()),
            transports: [new winston_1.transports.Console()],
            levels: {
                error: 1,
                warn: 2,
                info: 3,
                debug: 4,
            },
            level: this.makeLevel((_a = this.config) === null || _a === void 0 ? void 0 : _a.level),
            silent: (_c = (_b = this.config) === null || _b === void 0 ? void 0 : _b.silent) !== null && _c !== void 0 ? _c : false,
            defaultMeta: {
                service_name: (_d = this.config) === null || _d === void 0 ? void 0 : _d.serviceName,
            },
        });
    }
    makeLevel(level) {
        var _a;
        const mapLevel = { [logger_level_enum_1.LoggerLevel.debug]: 'debug' };
        return level ? (_a = mapLevel[level]) !== null && _a !== void 0 ? _a : level : 'info';
    }
    error(message, context) {
        const stack = context instanceof Error ? context.stack : undefined;
        this.getLogger().error({ message, context, stack });
    }
    info(message, context) {
        this.getLogger().info({ message, context });
    }
    warn(message, context) {
        this.getLogger().warn({ message, context });
    }
    debug(message, context) {
        this.getLogger().debug({ message, context });
    }
}
exports.NodeJsLoggerService = NodeJsLoggerService;
