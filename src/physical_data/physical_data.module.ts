import { UsersService } from './../users/user.service';
import { RankingService } from './../ranking/ranking.service';
import { Module } from '@nestjs/common';
import { PhysicalDataController } from './physical_data.controller';
import { PhysicalDataService } from './physical_data.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PhysicalDataSchema } from './schemas/physical.schema';
import { RankingSchema } from 'src/ranking/schemas/ranking.schema';
import { UsersSchema } from 'src/users/schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      , { name: 'PhysicalData', schema: PhysicalDataSchema }
      , { name: 'Ranking', schema: RankingSchema }
      , { name: 'User', schema: UsersSchema }
    ]),
  ],
  controllers: [PhysicalDataController],
  providers: [PhysicalDataService]
})
export class PhysicalDataModule { }
