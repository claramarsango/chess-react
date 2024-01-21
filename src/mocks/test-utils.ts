import { jest } from '@jest/globals';

export const cryptoMock = Object.defineProperty(window, 'crypto', {
  value: { randomUUID: jest.fn().mockReturnValue('mockUUID') },
});
