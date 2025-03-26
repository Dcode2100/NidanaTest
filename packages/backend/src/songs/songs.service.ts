import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SongsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    // This line is fine as 'song' should be defined in your schema
    return this.prisma.song.findMany();
  }

  async findOne(id: number) {
    return this.prisma.song.findUnique({
      where: { id },
    });
  }

  async search(query: string) {
    return this.prisma.song.findMany({
      where: {
        OR: [
          { title: { contains: query, mode: 'insensitive' } },
          { artist: { contains: query, mode: 'insensitive' } },
          { album: { contains: query, mode: 'insensitive' } },
        ],
      },
    });
  }

  async addFavorite(userId: number, songId: number) {
    // Error is here - userFavorite needs to be defined in your schema
    return this.prisma.userFavorite.create({
      data: {
        userId,
        songId,
      },
    });
  }

  async removeFavorite(userId: number, songId: number) {
    return this.prisma.userFavorite.delete({
      where: {
        userId_songId: {
          userId,
          songId,
        },
      },
    });
  }

  async getUserFavorites(userId: number) {
    const favorites = await this.prisma.userFavorite.findMany({
      where: { userId },
      include: { song: true },
    });
    
    return favorites.map(favorite => favorite.song);
  }
}