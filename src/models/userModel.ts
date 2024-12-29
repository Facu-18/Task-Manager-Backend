import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
    email: string
    password: string 
}

const userSchmea = new Schema({
    email: {
       type: String,
       required: true,
       trim: true,
       unique: true,
       lowercase: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
})

const User = mongoose.model<IUser>('User', userSchmea);
export default User