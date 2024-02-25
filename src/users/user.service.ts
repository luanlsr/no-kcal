import { CreateUserDto } from './dto/create-user.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name)
        private userModel: Model<User>
    ) { }

    async getAll(): Promise<User[]> {
        return this.userModel.find().exec();
    }

    async create(createUserDto: CreateUserDto): Promise<User> {

        try {
            return await this.userModel.create(createUserDto);
        } catch (error) {
            console.error(error);
            throw new Error('Erro ao criar usuário.');
        }
    }

    async getById(id: number): Promise<User> {
        const updatedUser = await this.userModel.findById(id);
        if (!updatedUser) {
            throw new NotFoundException('Usuário não encontrado!');
        }
        return updatedUser;
    }

    async edit(user: User): Promise<User> {
        const updatedUser = await this.userModel.findByIdAndUpdate(user.id, user, {
            new: true,
            runValidators: true
        });
        if (!updatedUser) {
            throw new NotFoundException('Usuário não encontrado!');
        }
        return updatedUser;
    }

    async delete(id: number): Promise<User> {
        const result = await this.userModel.findByIdAndDelete(id);
        if (result == null) {
            throw new NotFoundException('Usuário não encontrado!');
        }
        return result
    }
}
