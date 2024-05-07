import { Injectable } from '@nestjs/common';
import { UserService } from '../Users.service';
import { RegisterDTO } from '../dto/register.dto'
import { LoginDTO } from '../dto/login.dto';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async register(registerDTO: RegisterDTO) {
    return this.userService.register(registerDTO);
  }

  async login(loginDTO: LoginDTO) {
    return this.userService.login(loginDTO);
  }
}
