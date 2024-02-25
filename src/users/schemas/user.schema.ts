import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

@Schema({
    timestamps: true
})
export class User extends Document {

    @Prop()
    name: string;

    @Prop()
    lastname: string;

    @Prop()
    birthday: Date;

    @Prop()
    email: string;

    @Prop()
    phone: string;

    @Prop()
    sector: string;

    @Prop()
    photo: string;
}

export const UsersSchema = SchemaFactory.createForClass(User);
