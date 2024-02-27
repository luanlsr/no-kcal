import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/user.module';
import { RankingModule } from './ranking/ranking.module';
import { PhysicalDataModule } from './physical_data/physical_data.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RankingDetailsModule } from './ranking-details/ranking-details.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    UsersModule,
    PhysicalDataModule,
    RankingModule,
    RankingDetailsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
