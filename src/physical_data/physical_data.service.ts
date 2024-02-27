import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PhysicalData } from './schemas/physical.schema';
import { Ranking } from 'src/ranking/schemas/ranking.schema';
import { User } from 'src/users/schemas/user.schema';
import { RankingDetails } from 'src/ranking-details/schemas/ranking-details.schema';
import { IUser } from 'src/users/dto/create-user.dto';

@Injectable()
export class PhysicalDataService {
    constructor(
        @InjectModel(PhysicalData.name)
        private physicalDataModel: Model<PhysicalData>,
        @InjectModel(Ranking.name)
        private readonly rankingModel: Model<Ranking>,
        @InjectModel(User.name)
        private readonly userModel: Model<User>,
        @InjectModel(RankingDetails.name)
        private readonly rankingDetailsModel: Model<RankingDetails>
    ) { }

    async getAll(): Promise<PhysicalData[]> {
        return this.physicalDataModel.find().exec();
    }

    async insertPhysicalDataAndCheckRanking(newPhysicalData: PhysicalData): Promise<PhysicalData> {
        let ranking: Ranking = null;

        const user = await this.userModel.findById(newPhysicalData.userId).exec();
        if (user) {
            if (newPhysicalData) {
                newPhysicalData.date = new Date();

                const lastPhysicalData = await this.physicalDataModel
                    .findOne({ userId: newPhysicalData.userId })
                    .sort({ date: -1 })
                    .exec();

                if (lastPhysicalData) {
                    const difference: number = Number((newPhysicalData.gorduraPercentual - lastPhysicalData.gorduraPercentual).toFixed(2));
                    const pontosMensais: number = -difference * 100;
                    console.log('lastPhysicalData', lastPhysicalData)

                    if (difference < 0) {
                        ranking = await this.updateRanking(user._id, pontosMensais, 'Ganhou 10 pontos devido a uma redução de 0.1% de gordura.');
                    } else if (difference > 0) {
                        ranking = await this.updateRanking(user._id, pontosMensais, 'Perdeu 10 pontos devido a um aumento de 0.1% de gordura.');
                    } else {
                        ranking = await this.updateRanking(user._id, 0, 'Manteve a pontuação por ter mantido um percentual de gordura estável ou variando dentro da margem de erro.');
                    }

                    const rankingDetails = await this.rankingDetailsModel.findOne({ user: user._id });
                    console.log(rankingDetails);

                    if (!rankingDetails)
                        await this.rankingDetailsModel.create({ user, ranking, physicalData: lastPhysicalData })

                    await this.rankingDetailsModel.findByIdAndUpdate(rankingDetails._id, rankingDetails, { new: true })
                }
            }

            return await this.physicalDataModel.create(newPhysicalData);
        } else {
            console.error('Usuário não encontrado:');
        }
    }

    private async updateRanking(userId: string, points: number, description: string): Promise<Ranking> {
        const user = await this.userModel.findOne({ _id: userId }).exec();
        if (user) {
            const ranking = await this.rankingModel.findOne({ userId }).exec();

            if (ranking) {
                const lastRankingEntry = await this.rankingModel
                    .findOne({ userId: userId })
                    .sort({ date: -1 })
                    .exec();

                const currentMonth = lastRankingEntry.date.getMonth() + 1;

                const entryDate = new Date();
                // const nextMonthDate = new Date(entryDate);
                // nextMonthDate.setMonth(nextMonthDate.getMonth() + 1);
                const entryMonth = entryDate.getMonth() + 1

                if (currentMonth < entryMonth) {
                    ranking.monthlyPoints = 0;
                    ranking.totalPoints += points;
                    ranking.monthlyPoints += points;
                    ranking.date = entryDate
                } else {
                    ranking.totalPoints += points;
                    ranking.monthlyPoints += points;
                }
                await ranking.save();
                return ranking;

            } else {
                const createdRanking = await this.rankingModel.create({
                    userId: user._id,
                    totalPoints: points,
                    monthlyPoints: points,
                    name: user.name,
                    lastName: user.lastname,
                    description,
                    date: new Date(),
                    image: user.photo
                });

                return createdRanking;
            }
        } else {
            // Tratar o caso em que o usuário não existe
            console.error('Usuário não encontrado:', user._id);
        }
    }

    async edit(physicalData: PhysicalData): Promise<PhysicalData> {
        const updatedPhysicalData = await this.physicalDataModel.findByIdAndUpdate(physicalData._id, physicalData, { new: true });
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
