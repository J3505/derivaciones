import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(
    @Body()
    body: CreateUserDto,
  ): Promise<{ message: string; user: any }> {
    return this.authService.register(body);
  }

  @Post('login')
  async login(@Body() body: LoginUserDto): Promise<any> {
    return await this.authService.login(body.email, body.password);
  }

  @Post('refresh-token')
  @UseGuards(JwtAuthGuard)
  async refreshToken(@Request() request: any) {
    return this.authService.refreshToken(request.user.id);
  }
}
