import {
  WinstonCreateLoggerMock,
  WinstonLoggerFormatMock,
  WinstonLoggerMock,
} from '../mock/winston-logger-mock';
import { WinstonLogger } from '../../libs/src/node-js-logger.service';
import { LoggerLevel } from '../../libs/src/types/logger-level-enum';

jest.mock('winston', () => ({
  format: WinstonLoggerFormatMock,
  createLogger: WinstonCreateLoggerMock,
  transports: {
    Console: jest.fn(),
  },
}));


describe('WinstonLogger', () => {
  const logger = new WinstonLogger();

  const cases = [
    { method: 'error', libMethod: 'error' },
    { method: 'info', libMethod: 'info' },
    { method: 'warn', libMethod: 'warn' },
    { method: 'debug', libMethod: 'debug' },
  ];

  describe.each(cases)('$method', ({ method, libMethod }) => {
    it(`should call the ${method} method with the correct parameters`, () => {
      logger[method]('foo', { foz: 'baz' });
      expect(WinstonLoggerMock[libMethod]).toBeCalledWith({
        message: 'foo',
        context: { foz: 'baz' },
      });
    });

    it(`should call the ${method} method with the correct parameters without context`, () => {
      logger[method]('foo');
      expect(WinstonLoggerMock[libMethod]).toBeCalledWith({ message: 'foo' });
    });
  });

  describe('prettyPrint', () => {
    const loggerPrettyPrint = new WinstonLogger({ usePrettyPrint: true });
    it('should call prettyPrint method', () => {
      loggerPrettyPrint.info('foo');
      expect(WinstonLoggerFormatMock.prettyPrint).toBeCalled();
    });
  });

  describe('makeLevel', () => {
    it('should return the correct level for debug', () => {
      const loggerMakeLevel = new WinstonLogger({
        level: LoggerLevel.debug,
      });
      loggerMakeLevel.info('foo');
      expect(WinstonCreateLoggerMock).toBeCalledWith(
        expect.objectContaining({ level: 'debug' }),
      );
    });

    it('should return the level received if it is not mapped', () => {
      const loggerMakeLevel = new WinstonLogger({
        level: 'bar' as any,
      });
      loggerMakeLevel.info('foo');
      expect(WinstonCreateLoggerMock).toBeCalledWith(
        expect.objectContaining({ level: 'bar' }),
      );
    });

    it('should return the correct default level', () => {
      const loggerMakeLevel = new WinstonLogger();
      loggerMakeLevel.info('foo');
      expect(WinstonCreateLoggerMock).toBeCalledWith(
        expect.objectContaining({ level: 'info' }),
      );
    });
  });

  describe('error', () => {
    it('should call the error method with the correct parameters with error stack', () => {
      const error = new Error('bar');
      logger.error('foo', error);
      expect(WinstonLoggerMock.error).toBeCalledWith({
        message: 'foo',
        context: error,
        stack: error.stack,
      });
    });
  });
});
