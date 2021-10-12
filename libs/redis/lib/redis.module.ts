import Redis, { RedisOptions } from 'ioredis';
import { DynamicModule, Module } from '@nestjs/common';
import { getConnectionToken } from './redis.utils';

interface RedisModuleAsyncOptions {
  imports: any[];
  useFactory: (...args: any[]) => RedisOptions;
  inject: any[];
}

@Module({})
export class RedisModule {
  static forRootAsync(
    keyOrAsyncConfig: string | RedisModuleAsyncOptions,
    asyncBullConfig?: RedisModuleAsyncOptions): DynamicModule {
    const [key, options] =
      typeof keyOrAsyncConfig === 'string'
        ? [keyOrAsyncConfig, asyncBullConfig]
        : [undefined, keyOrAsyncConfig];

    const providers = [
      {
        provide: getConnectionToken(key),
        useFactory: (options: RedisOptions) => {
          return new Redis(options);
        },
        inject: options.inject,
      }
    ]
    return {
      // global: true,
      module: RedisModule,
      imports: options.imports,
      providers,
      exports: providers,
    };
  }
}
