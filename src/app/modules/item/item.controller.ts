
import { Request, Response } from 'express';
import catchAsync from './../../../shared/catchAsync';
import httpStatus from 'http-status';
import sendResponse from './../../../shared/sendResponse';
import itemService from './item.service';

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

export default {
    createItem
}