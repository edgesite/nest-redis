const DEFAULT_CONNECTION_NAME = 'redis.default';

export function getConnectionToken(connection?: string) {
  return connection ? `redis.${connection}` : DEFAULT_CONNECTION_NAME;
}
