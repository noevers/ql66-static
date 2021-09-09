"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * @Description: 二维码相关接口
 * @Creator: ferryvip
 * @Date: 2021-06-21 12:52:46
 */
const express_1 = require("express");
const typedi_1 = require("typedi");
const qrcode_1 = __importDefault(require("../services/qrcode"));
const route = express_1.Router();
exports.default = (app) => {
    app.use('/', route);
    route.get('/qrcode', async (req, res, next) => {
        const logger = typedi_1.Container.get('logger');
        try {
            const qrCodeService = typedi_1.Container.get(qrcode_1.default);
            const qrurl = await qrCodeService.qrcode();
            logger.info('🔥 qrurl: %o', qrurl);
            return res.send({ code: 200, data: qrurl });
        }
        catch (e) {
            logger.error('🔥 error: %o', e);
            return next(e);
        }
    });
    route.get('/status', async (req, res, next) => {
        const logger = typedi_1.Container.get('logger');
        try {
            const qrCodeService = typedi_1.Container.get(qrcode_1.default);
            const data = await qrCodeService.status();
            logger.info('🔥 data: %o', data);
            return res.send(data);
        }
        catch (e) {
            logger.error('🔥 error: %o', e);
            return next(e);
        }
    });
};
//# sourceMappingURL=qrcode.js.map