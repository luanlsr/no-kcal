import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema({ timestamps: true })
export class PhysicalData extends Document {

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
    userId: string;

    @Prop()
    date: Date;

    @Prop()
    peso: number;

    @Prop()
    altura: number;

    @Prop()
    IMC: number;

    @Prop()
    gorduraPercentual: number;

    @Prop()
    pesoGordura: number;

    @Prop()
    percentualMassaMuscularEsquelatica: number;

    @Prop()
    pesoMassaMuscularEsquelatica: number;

    @Prop()
    registroMassaMuscular: number;

    @Prop()
    pesoMassaMuscular: number;

    @Prop()
    aguaPercentual: number;

    @Prop()
    pesoAgua: number;

    @Prop()
    gorduraVisceral: number;

    @Prop()
    ossos: number;

    @Prop()
    metabolismo: number;

    @Prop()
    proteinaPercentual: number;

    @Prop()
    obesidadePercentual: number;

    @Prop()
    idadeReal: number;

    @Prop()
    idadeCorporal: number;

    @Prop()
    LBM: number;
}

export const PhysicalDataSchema = SchemaFactory.createForClass(PhysicalData);
