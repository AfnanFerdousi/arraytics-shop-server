
import { Request, Response } from 'express';
import catchAsync from './../../../shared/catchAsync';
import httpStatus from 'http-status';
import sendResponse from './../../../shared/sendResponse';
import itemService from './item.service';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constant/pagination';
import { IItem } from './item.interface';

const createItem = catchAsync(async (req: Request, res: Response) => {
    const data = req.body;
    const result = await itemService.createItemService(data);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Successfully created item',
        data: result
    })
})


const getItems = catchAsync(async (req: Request, res: Response) => {
    const itemSearchableFields = ["searchText","name"];
    const filters = pick(req.query, itemSearchableFields);
    const paginationOptions = pick(req.query, paginationFields);
    const result = await itemService.getAllItemService(
        paginationOptions,
        filters
    );

    sendResponse<IItem[]>(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Successfully found items",
        data: result.data,
        meta: result.meta,
    });
})

const updateItem = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    const data = req.body;
    const result = await itemService.updateItemService(id, data);

    sendResponse<IItem>(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Successfully updated item',
        data: result
    })
})


const deleteItem = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;
    const result = await itemService.deleteItemService(id);

    sendResponse<any>(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Successfully deleted item',
        data: result
    })
})

export default {
    createItem,
    getItems,
    updateItem,
    deleteItem
}