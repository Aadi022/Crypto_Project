const express= require("express");
const router= express.Router();
router.use(express.json());

const statsRouter= require("../controller/stats.js");
const centraltendencyRouter= require("../controller/deviation.js");

router.use("/cryptostats",statsRouter);
router.use("/centraltendency",centraltendencyRouter);

module.exports= router;