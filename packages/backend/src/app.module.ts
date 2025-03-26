import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SongsModule } from './songs/songs.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes ConfigModule available globally
      envFilePath: '.env', // Loads the .env file with DATABASE_URL
    }),
    PrismaModule, // Provides PrismaService globally
    SongsModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService], // Remove PrismaService from here
})
export class AppModule {}