import { CreateUserDto } from './dto/create-user.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { RankingDetails } from 'src/ranking-details/schemas/ranking-details.schema';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name)
        private userModel: Model<User>,
        @InjectModel(RankingDetails.name)
        private rankingDetailsModel: Model<RankingDetails>,
    ) { }

    async getAll(): Promise<User[]> {
        return this.userModel.find().exec();
    }

    async create(createUserDto: CreateUserDto): Promise<User> {

        try {
            const newUser = await this.userModel.create(createUserDto);

            // await this.rankingDetailsModel.create({
            //     user: newUser,
            // });
            return newUser;

        } catch (error) {
            console.error(error);
            throw new Error('Erro ao criar usuário.');
        }
    }

    async getById(id: string): Promise<User> {
        console.log('id: ', id);
        const updatedUser = await this.userModel.findById(id);

        if (!updatedUser) {
            throw new NotFoundException('Usuário não encontrado!');
        }
        return updatedUser;
    }

    async edit(user: User): Promise<User> {
        const updatedUser = await this.userModel.findByIdAndUpdate(user._id, user, {
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
