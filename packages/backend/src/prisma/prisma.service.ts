import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    super({
      datasources: {
        db: {
          url: process.env.DATABASE_URL, // Pulled from .env
        },
      },
    });
  }

  async onModuleInit() {
    await this.$connect(); // Connect to the database when the module initializes
  }

  async onModuleDestroy() {
    await this.$disconnect(); // Disconnect when the module is destroyed
  }
}