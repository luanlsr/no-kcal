import { Module } from '@nestjs/common';
import { RankingDetailsService } from './ranking-details.service';
import { RankingDetailsController } from './ranking-details.controller';
import { RankingDetailsSchema } from './schemas/ranking-details.schema';
import { RankingSchema } from 'src/ranking/schemas/ranking.schema';
import { UsersSchema } from 'src/users/schemas/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { PhysicalDataSchema } from 'src/physical_data/schemas/physical.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      , { name: 'RankingDetails', schema: RankingDetailsSchema }
      , { name: 'Ranking', schema: RankingSchema }
      , { name: 'PhysicalData', schema: PhysicalDataSchema }
      , { name: 'User', schema: UsersSchema }
    ]),
  ],
  controllers: [RankingDetailsController],
  providers: [RankingDetailsService]
})
export class RankingDetailsModule { }
