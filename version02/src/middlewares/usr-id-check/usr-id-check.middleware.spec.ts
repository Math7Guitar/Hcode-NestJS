import { UsrIdCheckMiddleware } from './usr-id-check.middleware';

describe('UsrIdCheckMiddleware', () => {
  it('should be defined', () => {
    expect(new UsrIdCheckMiddleware()).toBeDefined();
  });
});
