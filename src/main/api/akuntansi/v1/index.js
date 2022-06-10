const express = require("express");
const Controller = require("./controller");

const router = express.Router();

router.get("/reseller", Controller.getReseller);
router.get("/i-banking", Controller.getIBanking);
router.get("/modul", Controller.getModul);
router.post("/init", Controller.init);
router.get("/akun", Controller.getAkun);
router.post("/jurnal-umum", Controller.postJurnalUmum);

module.exports = router;
