import { Inject } from "@nestjs/common";
import { getConnectionToken } from "./redis.utils";

export function InjectRedis(connection?: string) {
  return Inject(getConnectionToken(connection));
}
