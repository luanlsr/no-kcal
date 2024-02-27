import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UsersService } from './user.service';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Get()
    async getAllUsers(): Promise<User[]> {
        return this.usersService.getAll();
    }

    @Post()
    async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
        return this.usersService.create(createUserDto);
    }

    @Get(':id')
    async getById(@Param('id') id): Promise<User> {
        return this.usersService.getById(id);
    }

    @Put()
    async edit(@Body() user): Promise<User> {
        return this.usersService.edit(user);
    }

    @Delete(':id')
    async remove(@Param('id') id: number): Promise<any> {
        return this.usersService.delete(id);
    }
}
