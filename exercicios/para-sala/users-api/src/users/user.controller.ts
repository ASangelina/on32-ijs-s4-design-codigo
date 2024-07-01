import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { User } from './user.entity';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  createUser(
    @Body()
    createUserDto: CreateUserDto,
  ) {
    const user = new User(
      createUserDto.name,
      createUserDto.email,
      createUserDto.password,
      createUserDto.cpf,
      createUserDto.userType,
      undefined, // id será definido no serviço
      undefined, // employeeCode será definido no serviço
      createUserDto.superPassword,
    );

    return this.userService.createUser(user);
  }

  @Get(':id')
  getUserById(@Param('id') id: string) {
    return this.userService.getUserById(id);
  }

  @Get()
  listUsers() {
    return this.userService.listUsers();
  }

  @Put(':id')
  updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const userToUpdate: User = {
      id,
      name: updateUserDto.name,
      email: updateUserDto.email,
      password: updateUserDto.password,
      cpf: updateUserDto.cpf,
      userType: updateUserDto.userType,
      superPassword: updateUserDto.superPassword,
    };
    return this.userService.updateUser(userToUpdate);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }
}
