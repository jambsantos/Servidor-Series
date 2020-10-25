const express = require('express');
const router = express.Router();
const controller = require("../controllers/seriesControllers")

router.get("/", controller.getAll) //Retornar todas as séries
router.get("/:id", controller.getById) //Retornar apenas uma série específica
router.post("/",controller.createSeries) //Cadastrar nova série   
router.put("/:id",controller.updateSeries) //Atualizar uma série específica
router.delete("/:id",controller.deleteSeries)  //Deletar uma série específica 
router.patch("/:id/liked",controller.updateLikedStatus) 

//Rotas para trabalhar com  temporadas e episódios
router.post("/:id/season", controller.postSeriesSeason) 
// router.post("/series/:id/season/:seasonId/episode",controller.postSeriesEpisode) 
// router.delete("/series/:id/season/:seasonId",controller.deleteSeriesSeason) 
// router.delete("/series/:id/season/:seasonId/episode/:episodeId",controller.deleteSeriesEpisode)  
// router.patch("/series/:id/season/:seasonId/episode/:episodeId/watched",controller.updateWatchedStatus) 


module.exports = router