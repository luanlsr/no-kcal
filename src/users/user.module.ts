import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UsersController } from "./user.controller";
import { UsersService } from "./user.service";
import { UsersSchema } from "./schemas/user.schema";
import { RankingDetailsSchema } from "src/ranking-details/schemas/ranking-details.schema";

@Module({
  imports: [MongooseModule.forFeature([
    { name: 'User', schema: UsersSchema },
    { name: 'RankingDetails', schema: RankingDetailsSchema }
  ])],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule { }
