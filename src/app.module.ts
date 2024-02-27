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
    MongooseModule.forRoot(process.env.DB_URI || 'mongodb+srv://luanfswd:IyL3nqg0m0XsWnK5@cluster0.vrql7iw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'),
    UsersModule,
    PhysicalDataModule,
    RankingModule,
    RankingDetailsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
