import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(200)
  async login(@Body() loginDto: { email: string; password: string }) {
    const user = await this.authService.validateUser(
      loginDto.email,
      loginDto.password,
    );
    
    if (!user) {
      return { success: false, message: 'Invalid credentials' };
    }
    
    return this.authService.login(user);
  }

  @Post('signup')
  async signup(@Body() signupDto: { name: string; email: string; password: string }) {
    return this.authService.signup(signupDto);
  }
}
