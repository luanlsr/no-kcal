import { UsersService } from './../users/user.service';
import { RankingService } from './../ranking/ranking.service';
import { Module } from '@nestjs/common';
import { PhysicalDataController } from './physical_data.controller';
import { PhysicalDataService } from './physical_data.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PhysicalDataSchema } from './schemas/physical.schema';
import { RankingSchema } from 'src/ranking/schemas/ranking.schema';
import { UsersSchema } from 'src/users/schemas/user.schema';
import { RankingDetailsSchema } from 'src/ranking-details/schemas/ranking-details.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      , { name: 'PhysicalData', schema: PhysicalDataSchema }
      , { name: 'Ranking', schema: RankingSchema }
      , { name: 'User', schema: UsersSchema }
      , { name: 'RankingDetails', schema: RankingDetailsSchema }
    ]),
  ],
  controllers: [PhysicalDataController],
  providers: [PhysicalDataService]
})
export class PhysicalDataModule { }
