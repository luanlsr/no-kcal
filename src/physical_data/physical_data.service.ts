import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PhysicalData } from './schemas/physical.schema';
import { Ranking } from 'src/ranking/schemas/ranking.schema';
import { User } from 'src/users/schemas/user.schema';

@Injectable()
export class PhysicalDataService {
    constructor(
        @InjectModel(PhysicalData.name)
        private physicalDataModel: Model<PhysicalData>,
        @InjectModel(Ranking.name)
        private readonly rankingModel: Model<Ranking>,
        @InjectModel(User.name)
        private readonly userModel: Model<User>
    ) { }

    async getAll(): Promise<PhysicalData[]> {
        return this.physicalDataModel.find().exec();
    }

    async insertPhysicalDataAndCheckRanking(newPhysicalData: PhysicalData): Promise<PhysicalData> {
        let lastPhysicalData: PhysicalData = null;

        if (newPhysicalData) {
            newPhysicalData.date = new Date();

            lastPhysicalData = await this.physicalDataModel
                .findOne({ userId: newPhysicalData.userId })
                .sort({ date: -1 })
                .exec();

            if (lastPhysicalData) {
                const user = await this.userModel.findOne({ id: lastPhysicalData.userId }).exec();

                const difference: number = Number((newPhysicalData.gorduraPercentual - lastPhysicalData.gorduraPercentual).toFixed(2));
                console.log('diferença', difference)
                const pontosMensais: number = -difference * 100;
                console.log('pontos', pontosMensais)

                if (difference < 0) {
                    await this.updateRanking(lastPhysicalData.userId, pontosMensais, user?.name, user?.photo, 'Ganhou 10 pontos devido a uma redução de 0.1% de gordura.');
                } else if (difference > 0) {
                    await this.updateRanking(lastPhysicalData.userId, pontosMensais, user?.name, user?.photo, 'Perdeu 10 pontos devido a um aumento de 0.1% de gordura.');
                } else {
                    await this.updateRanking(lastPhysicalData.userId, 0, user?.name, user?.photo, 'Manteve a pontuação por ter mantido um percentual de gordura estável ou variando dentro da margem de erro.');
                }
            }
        }

        return await this.physicalDataModel.create(newPhysicalData);
    }

    private async updateRanking(userId: string, points: number, name: string, image: string, description: string): Promise<void> {
        const ranking = await this.rankingModel.findOne({ userId }).exec();


        if (ranking) {
            const lastRankingEntry = await this.rankingModel
                .findOne({ userId })
                .sort({ date: -1 })
                .exec();

            const currentMonth = lastRankingEntry ? lastRankingEntry.date.getMonth() : new Date().getMonth() + 1;
            const entryMonth = new Date().getMonth() + 3;

            console.log('Mês anterior', currentMonth)
            console.log('Mês de entrada', entryMonth)

            if (entryMonth > currentMonth) {
                ranking.monthlyPoints = 0;
                ranking.totalPoints += points;
                ranking.monthlyPoints += points;
            } else {
                ranking.totalPoints += points;
                ranking.monthlyPoints += points;
            }
            await ranking.save();


        } else {
            await this.rankingModel.create({
                userId,
                totalPoints: points,
                monthlyPoints: points,
                name,
                description,
                date: new Date(),
                image
            });
        }
    }

    async edit(PhysicalData: PhysicalData): Promise<PhysicalData> {
        const updatedPhysicalData = await this.physicalDataModel.findByIdAndUpdate(PhysicalData.id, PhysicalData, { new: true });
        if (!updatedPhysicalData) {
            throw new NotFoundException('PhysicalData não encontrado!');
        }
        return updatedPhysicalData;
    }

    async delete(id: number): Promise<void> {
        const result = await this.physicalDataModel.deleteOne({ id });
        if (result.deletedCount === 0) {
            throw new NotFoundException('PhysicalData não encontrado!');
        }
    }
}
