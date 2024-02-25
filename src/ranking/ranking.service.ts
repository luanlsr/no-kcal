import { Injectable, NotFoundException } from '@nestjs/common';
import { Ranking } from './schemas/ranking.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class RankingService {
    constructor(
        @InjectModel(Ranking.name)
        private rankingModel: Model<Ranking>
    ) { }

    async getAll(): Promise<Ranking[]> {
        return this.rankingModel.find().exec();
    }

    async create(Ranking: Ranking): Promise<Ranking> {
        return this.rankingModel.create(Ranking);
    }

    async edit(Ranking: Ranking): Promise<Ranking> {
        const updatedRanking = await this.rankingModel.findByIdAndUpdate(Ranking.id, Ranking, { new: true });
        if (!updatedRanking) {
            throw new NotFoundException('Ranking não encontrado!');
        }
        return updatedRanking;
    }

    async delete(id: number): Promise<void> {
        const result = await this.rankingModel.deleteOne({ id });
        if (result.deletedCount === 0) {
            throw new NotFoundException('Ranking não encontrado!');
        }
    }
}
