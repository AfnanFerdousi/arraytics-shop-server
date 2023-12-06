import mongoose from "mongoose";
import { IItem, ItemModel } from "./item.interface";

const itemSchema = new mongoose.Schema<IItem, ItemModel>({
    name: {
        type: String,
        required: true
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

itemSchema.statics.isItemExist = async function (
    id: string
) : Promise<Pick<IItem, "name" | "id" | "created_by"> | null> {
    return await Item.findOne(
        { id: id },
        { id: 1, name: 1, created_by: 1 }
    );
};

const Item = mongoose.model<IItem, ItemModel>("Item", itemSchema);

export default Item;