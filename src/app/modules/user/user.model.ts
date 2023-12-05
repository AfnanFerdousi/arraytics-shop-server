import mongoose from "mongoose";
import { IUser, UserModel } from "./user.interface";
import bcrypt from "bcrypt";
import config from "../../../config";

const userSchema = new mongoose.Schema<IUser, UserModel>({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    created_by: {
        type: String,
        required: true
    }    
},
{
    timestamps: true, 
    versionKey: false,
    virtuals: true
}
)

userSchema.statics.isUserExist = async function (
    id: string
): Promise<Pick<IUser, "name" | "password" | "email" | "id"> | null> {
    return await User.findOne(
        { phoneNumber: id },
        { _id: 1, password: 1, role: 1, phoneNumber: 1 }
    );
};

userSchema.statics.isPasswordMatched = async function (
    givenPassword: string,
    savedPassword: string
): Promise<boolean> {
    return await bcrypt.compare(givenPassword, savedPassword);
};

userSchema.pre("save", async function (next) {
    const user = this;
    user.password = await bcrypt.hash(
        user.password,
        Number(config.bcrypt_salt_rounds)
    );
    next();
});

const User = mongoose.model<IUser, UserModel>("User", userSchema);

export default User;
