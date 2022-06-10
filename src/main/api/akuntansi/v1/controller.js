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

    static async init(req, res, next) {
        try {
            const options = Object.assign({}, req.body);
            const result = await Model.init(options);
            res.json(result.rowsAffected || []);
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

    static async getMutasi(req, res, next) {
        try {
            const options = Object.assign({}, req.query);
            const result = Model.getMutasi(options);
            res.json(result);
        } catch (error) {
            next(error);
        }
    }

    static async getBukuBesar(req, res, next) {
        try {
            const options = Object.assign(
                {
                    _start: 0,
                    _end: 20,
                    kode_akun: '',
                    tanggal_between: [moment().startOf("month").toISOString(), moment().endOf("month").toISOString()].join(","),
                },
                req.query
            );
            const result = await Model.getBukuBesar(options);
            res.set({
                "X-Total-Count": result.recordsets?.[0]?.[0]?.[""] || 0,
                "Access-Control-Expose-Headers": "X-Total-Count",
            });
            res.json(result.recordsets?.[1] || []);
        } catch (error) {
            next(error);
        }
    }

    static async getBukuBesarPembantu(req, res, next) {
        try {
            const options = Object.assign(
                {
                    _start: 0,
                    _end: 20,
                    kode_akun: '',
                    id_pelanggan: '',
                    tanggal_between: [moment().startOf("month").toISOString(), moment().endOf("month").toISOString()].join(","),
                },
                req.query
            );
            const result = await Model.getBukuBesarPembantu(options);
            res.set({
                "X-Total-Count": result.recordsets?.[0]?.[0]?.[""] || 0,
                "Access-Control-Expose-Headers": "X-Total-Count",
            });
            res.json(result.recordsets?.[1] || []);
        } catch (error) {
            next(error);
        }
    }

    static async getNeracaSaldo(req, res, next) {
        try {
            const options = Object.assign(
                {
                    _start: 0,
                    _end: 20,
                },
                req.query
            );
            const result = await Model.getNeracaSaldo(options);
            // res.set({
            //     "X-Total-Count": result.recordsets?.[0]?.[0]?.[""] || 0,
            //     "Access-Control-Expose-Headers": "X-Total-Count",
            // });
            // res.json(result.recordsets?.[1] || []);
            res.json(result.recordset || []);
        } catch (error) {
            next(error);
        }
    }

    static async getLabaRugi(req, res, next) {
        try {
            const options = Object.assign(
                {
                    _start: 0,
                    _end: 20,
                },
                req.query
            );
            const result = await Model.getLabaRugi(options);
            // res.set({
            //     "X-Total-Count": result.recordsets?.[0]?.[0]?.[""] || 0,
            //     "Access-Control-Expose-Headers": "X-Total-Count",
            // });
            // res.json(result.recordsets?.[1] || []);
            res.json(result.recordset || []);
        } catch (error) {
            next(error);
        }
    }

    static async getNeraca(req, res, next) {
        try {
            const options = Object.assign(
                {
                    _start: 0,
                    _end: 20,
                },
                req.query
            );
            const result = await Model.getNeraca(options);
            // res.set({
            //     "X-Total-Count": result.recordsets?.[0]?.[0]?.[""] || 0,
            //     "Access-Control-Expose-Headers": "X-Total-Count",
            // });
            // res.json(result.recordsets?.[1] || []);
            res.json(result.recordset || []);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = Controller;
