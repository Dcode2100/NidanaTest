import { Controller, Get, Param, Post, Delete, Query, UseGuards, Request } from '@nestjs/common';
import { SongsService } from './songs.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('songs')
export class SongsController {
  constructor(private songsService: SongsService) {}

  @Get()
  async getSongs() {
    return this.songsService.findAll();
  }

  @Get('search')
  async searchSongs(@Query('q') query: string) {
    return this.songsService.search(query);
  }

  // Move the favorites endpoint BEFORE the :id endpoint
  @UseGuards(JwtAuthGuard)
  @Get('favorites')
  async getFavorites(@Request() req: { user: { id: number } }) {
    return this.songsService.getUserFavorites(req.user.id);
  }

  @Get(':id')
  async getSong(@Param('id') id: string) {
    return this.songsService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/favorite')
  async addFavorite(@Request() req: { user: { id: number } }, @Param('id') id: string) {
    return this.songsService.addFavorite(req.user.id, +id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id/favorite')
  async removeFavorite(@Request() req: { user: { id: number } }, @Param('id') id: string) {
    return this.songsService.removeFavorite(req.user.id, +id);
  }
}