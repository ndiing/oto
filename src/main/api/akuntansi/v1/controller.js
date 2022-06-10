const Model = require("./model");
const moment = require("moment");

class Controller {
    static async getReseller(req, res, next) {
        try {
            const options = Object.assign({ _start: 0, _end: 20 }, req.query);
            const result = await Model.getReseller(options);
            res.set({
                "X-Total-Count": result.recordsets?.[0]?.[0]?.[""] || 0,
                "Access-Control-Expose-Headers": "X-Total-Count",
            });
            res.json(result.recordsets?.[1] || []);
        } catch (error) {
            next(error);
        }
    }

    static async getIBanking(req, res, next) {
        try {
            const options = Object.assign({ _start: 0, _end: 20 }, req.query);
            const result = await Model.getIBanking(options);
            res.set({
                "X-Total-Count": result.recordsets?.[0]?.[0]?.[""] || 0,
                "Access-Control-Expose-Headers": "X-Total-Count",
            });
            res.json(result.recordsets?.[1] || []);
        } catch (error) {
            next(error);
        }
    }

    static async getModul(req, res, next) {
        try {
            const options = Object.assign({ _start: 0, _end: 20 }, req.query);
            const result = await Model.getModul(options);
            res.set({
                "X-Total-Count": result.recordsets?.[0]?.[0]?.[""] || 0,
                "Access-Control-Expose-Headers": "X-Total-Count",
            });
            res.json(result.recordsets?.[1] || []);
        } catch (error) {
            next(error);
        }
    }

    static async getAkun(req, res, next) {
        try {
            const options = Object.assign({ _start: 0, _end: 20 }, req.query);
            const result = await Model.getAkun(options);
            res.set({
                "X-Total-Count": result.recordsets?.[0]?.[0]?.[""] || 0,
                "Access-Control-Expose-Headers": "X-Total-Count",
            });
            res.json(result.recordsets?.[1] || []);
        } catch (error) {
            next(error);
        }
    }

    static async postJurnalUmum(req, res, next) {
        try {
            const options = Object.assign({}, req.body);
            const result = await Model.postJurnalUmum(options);
            res.json(result.recordsets?.[0]?.[0] || {});
        } catch (error) {
            next(error);
        }
    }
}

module.exports = Controller;
