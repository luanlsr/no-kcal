import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema } from 'mongoose';
import { PhysicalData } from "src/physical_data/schemas/physical.schema";
import { Ranking } from "src/ranking/schemas/ranking.schema";
import { User } from "src/users/schemas/user.schema";

@Schema({
    timestamps: true
})
export class RankingDetails extends Document {

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
    user: User;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'PhysicalData' })
    physicalData: PhysicalData;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Ranking' })
    ranking: Ranking;
}

export const RankingDetailsSchema = SchemaFactory.createForClass(RankingDetails);
