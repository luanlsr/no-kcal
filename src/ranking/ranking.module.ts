import { Module } from '@nestjs/common';
import { RankingController } from './ranking.controller';
import { RankingService } from './ranking.service';
import { MongooseModule } from '@nestjs/mongoose';
import { RankingSchema } from './schemas/ranking.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Ranking', schema: RankingSchema }])],
  controllers: [RankingController],
  providers: [RankingService]
})
export class RankingModule { }

