export const WinstonLoggerMock = {
  error: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  debug: jest.fn(),
};

export const WinstonLoggerFormatMock = {
  colorize: jest.fn(),
  combine: jest.fn(),
  label: jest.fn(),
  timestamp: jest.fn(),
  printf: jest.fn(),
  json: jest.fn(),
  prettyPrint: jest.fn(),
};

export const WinstonCreateLoggerMock = jest
  .fn()
  .mockReturnValue(WinstonLoggerMock);
