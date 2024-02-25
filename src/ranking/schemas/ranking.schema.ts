import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema({
    timestamps: true
})
export class Ranking extends Document {

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
    userId: string;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'PhysicalData' })
    physicalId: string;

    @Prop()
    date: Date;

    @Prop()
    monthlyPoints: number; // Pontos mensais

    @Prop()
    totalPoints: number; // Pontos totais

    @Prop()
    name: string;

    @Prop()
    lastName: string;

    @Prop()
    description: string;

    @Prop()
    image: string;
}

export const RankingSchema = SchemaFactory.createForClass(Ranking);
