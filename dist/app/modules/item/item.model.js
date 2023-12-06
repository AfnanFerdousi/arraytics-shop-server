"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const itemSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true
    },
    created_by: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
    versionKey: false,
    virtuals: true
});
itemSchema.statics.isItemExist = function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield Item.findOne({ _id: id }, { _id: 1, name: 1, created_by: 1 });
    });
};
const Item = mongoose_1.default.model("Item", itemSchema);
exports.default = Item;
