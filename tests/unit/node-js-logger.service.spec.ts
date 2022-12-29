import {
  NodeJsCreateLoggerMock,
  NodeJsLoggerFormatMock,
  NodeJsLoggerMock,
} from '../mock/nodejs-logger-mock';
import { NodeJsLoggerService } from '../../libs/src/node-js-logger.service';
import { LoggerLevel } from '../../libs/src/types/logger-level-enum';

jest.mock('winston', () => ({
  format: NodeJsLoggerFormatMock,
  createLogger: NodeJsCreateLoggerMock,
  transports: {
    Console: jest.fn(),
  },
}));


describe('NodeJsLoggerService', () => {
  const logger = new NodeJsLoggerService();

  const cases = [
    { method: 'error', libMethod: 'error' },
    { method: 'info', libMethod: 'info' },
    { method: 'warn', libMethod: 'warn' },
    { method: 'debug', libMethod: 'debug' },
  ];

  describe.each(cases)('$method', ({ method, libMethod }) => {
    it(`should call the ${method} method with the correct parameters`, () => {
      logger[method]('foo', { foz: 'baz' });
      expect(NodeJsLoggerMock[libMethod]).toBeCalledWith({
        message: 'foo',
        context: { foz: 'baz' },
      });
    });

    it(`should call the ${method} method with the correct parameters without context`, () => {
      logger[method]('foo');
      expect(NodeJsLoggerMock[libMethod]).toBeCalledWith({ message: 'foo' });
    });
  });

  describe('prettyPrint', () => {
    const loggerPrettyPrint = new NodeJsLoggerService({ usePrettyPrint: true });
    it('should call prettyPrint method', () => {
      loggerPrettyPrint.info('foo');
      expect(NodeJsLoggerFormatMock.prettyPrint).toBeCalled();
    });
  });

  describe('makeLevel', () => {
    it('should return the correct level for debug', () => {
      const loggerMakeLevel = new NodeJsLoggerService({
        level: LoggerLevel.debug,
      });
      loggerMakeLevel.info('foo');
      expect(NodeJsCreateLoggerMock).toBeCalledWith(
        expect.objectContaining({ level: 'debug' }),
      );
    });

    it('should return the level received if it is not mapped', () => {
      const loggerMakeLevel = new NodeJsLoggerService({
        level: 'bar' as any,
      });
      loggerMakeLevel.info('foo');
      expect(NodeJsCreateLoggerMock).toBeCalledWith(
        expect.objectContaining({ level: 'bar' }),
      );
    });

    it('should return the correct default level', () => {
      const loggerMakeLevel = new NodeJsLoggerService();
      loggerMakeLevel.info('foo');
      expect(NodeJsCreateLoggerMock).toBeCalledWith(
        expect.objectContaining({ level: 'info' }),
      );
    });
  });

  describe('error', () => {
    it('should call the error method with the correct parameters with error stack', () => {
      const error = new Error('bar');
      logger.error('foo', error);
      expect(NodeJsLoggerMock.error).toBeCalledWith({
        message: 'foo',
        context: error,
        stack: error.stack,
      });
    });
  });
});
