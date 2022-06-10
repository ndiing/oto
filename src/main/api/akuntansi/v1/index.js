const express = require("express");
const Controller = require("./controller");

const router = express.Router();

router.get("/reseller", Controller.getReseller);
router.get("/i-banking", Controller.getIBanking);
router.get("/modul", Controller.getModul);
router.post("/init", Controller.init);
router.post("/mutasi", Controller.getMutasi);
router.get("/akun", Controller.getAkun);
router.post("/jurnal-umum", Controller.postJurnalUmum);
router.get("/buku-besar", Controller.getBukuBesar);
router.get("/buku-besar-pembantu", Controller.getBukuBesarPembantu);

module.exports = router;
