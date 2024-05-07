import { Body, Controller, Post } from '@nestjs/common';
import { RegisterDTO } from '../dto/register.dto'
import { LoginDTO } from '../dto/login.dto';
import { UserService } from '../Users.service'; 
@Controller('auth')
export class AuthController {
  constructor(private userService: UserService) {}

  @Post('register')
  async register(@Body() registerDTO: RegisterDTO) {
    return this.userService.register(registerDTO);
  }

  @Post('login')
  async login(@Body() loginDTO: LoginDTO) {
    return this.userService.login(loginDTO);
  }
}
