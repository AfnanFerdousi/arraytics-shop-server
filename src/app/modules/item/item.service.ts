import { IItem } from "./item.interface";
import Item from "./item.model";


const createItemService = async (data: IItem) => {
    const item = await Item.isItemExist(data.id as unknown as string);
    if (item) {
        throw new Error("Item already exists");
    }else {
        return await Item.create(data);
    }
}

export default {
    createItemService
}