import { IUser } from "../user/user.interface";
import User from "../user/user.model";

const createUserService = async (body: IUser): Promise<IUser> => {
    const exist = await User.isUserExist(body.email);
    if(exist) {
        throw new Error("User already exist");
    }else{
        const user = await User.create(body);
        return user;
    }
};

export default {
    createUserService,
}