const express = require('express');
const router = express.Router();
const controller = require("../controllers/seriesControllers")

router.get("/series", controller.All) //Retornar todas as séries
router.get("/series/:id", controller.By) //Retornar apenas uma série específica
router.post("/series",controller.All) //Cadastrar nova série   
router.put("/series/:id",controller.All) //Atualizar uma série específica
router.delete("/series/:id",controller.All)  //Deletar uma série específica 
router.patch("/series/:id/liked",controller.patchAll) 

module.exports = router