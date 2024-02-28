import { Injectable } from '@nestjs/common';
import { RankingDetails } from './schemas/ranking-details.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PhysicalData } from 'src/physical_data/schemas/physical.schema';
import { Ranking } from 'src/ranking/schemas/ranking.schema';
import { User } from 'src/users/schemas/user.schema';

@Injectable()
export class RankingDetailsService {
    constructor(
        @InjectModel(RankingDetails.name)
        private rankingDetailsModel: Model<RankingDetails>,
        @InjectModel(PhysicalData.name)
        private physicalDataModel: Model<PhysicalData>,
        @InjectModel(Ranking.name)
        private readonly rankingModel: Model<Ranking>,
        @InjectModel(User.name)
        private readonly userModel: Model<User>
    ) { }

    async getAll(): Promise<any[]> {
        const rankingDetails = await this.rankingDetailsModel.find()
            .populate('user')
            .populate('physicalData')
            .populate('ranking')
            .exec();

        const formattedData = rankingDetails.map(detail => {
            return {
                users: [
                    {
                        _id: detail.user._id,
                        name: detail.user.name,
                        lastname: detail.user.lastname,
                        birthday: detail.user.birthday,
                        email: detail.user.email,
                        phone: detail.user.phone,
                        sector: detail.user.sector,
                        photo: detail.user.photo,
                        physicalData: {
                            _id: detail.physicalData._id,
                            userId: detail.physicalData.userId,
                            date: detail.physicalData.date,
                            peso: detail.physicalData.peso,
                            altura: detail.physicalData.altura,
                            IMC: detail.physicalData.IMC,
                            gorduraPercentual: detail.physicalData.gorduraPercentual,
                            pesoGordura: detail.physicalData.pesoGordura,
                            percentualMassaMuscularEsquelatica: detail.physicalData.percentualMassaMuscularEsquelatica,
                            pesoMassaMuscularEsquelatica: detail.physicalData.pesoMassaMuscularEsquelatica,
                            registroMassaMuscular: detail.physicalData.registroMassaMuscular,
                            pesoMassaMuscular: detail.physicalData.pesoMassaMuscular,
                            aguaPercentual: detail.physicalData.aguaPercentual,
                            pesoAgua: detail.physicalData.pesoAgua,
                            gorduraVisceral: detail.physicalData.gorduraVisceral,
                            ossos: detail.physicalData.ossos,
                            metabolismo: detail.physicalData.metabolismo,
                            proteinaPercentual: detail.physicalData.proteinaPercentual,
                            obesidadePercentual: detail.physicalData.obesidadePercentual,
                            idadeReal: detail.physicalData.idadeReal,
                            idadeCorporal: detail.physicalData.idadeCorporal,
                            LBM: detail.physicalData.LBM,
                        },
                        ranking: {
                            _id: detail.ranking._id,
                            userId: detail.ranking.userId,
                            date: detail.ranking.date,
                            monthlyPoints: detail.ranking.monthlyPoints,
                            totalPoints: detail.ranking.totalPoints,
                            name: detail.ranking.name,
                            lastName: detail.ranking.lastName,
                            description: detail.ranking.description,
                            image: detail.ranking.image,
                        }
                    }
                ]

            };
        });

        return formattedData;
    }
}
