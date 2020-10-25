const series = require("../models/series.json");
const fs = require("fs");

const getAll = (req, res) => {
  console.log(req.url);
  res.status(200).send(series);
};

const getById = (req, res) => {
  const serieId = req.params.id;
  const serieFound = series.find((serie) => serie.id == serieId);
  if (serieFound) {
    res.status(200).send(serieFound);
  } else {
    res.status(404).send({ message: "Serie não encontrada" });
  }
};

const writeSerie = () => {
  return fs.writeFile(
    "./src/models/series.json",
    JSON.stringify(series),
    "utf8",
    function (err) {
      if (err) {
        return res.status(424).send({ message: err });
      }
      console.log("File updated successfully!");
    }
  );
};

const createSeries = (req, res) => {
  const { id, name, genre, synopsis, liked, seasons } = req.body;
  series.push({ id, name, genre, synopsis, liked, seasons });
  writeSerie();
  res.status(200).send(series);
};

const updateSeries = (req, res) => {
  const serieId = req.params.id;
  const serieToUpdate = req.body;

  const serieFound = series.find((serie) => serie.id == serieId);
  const serieIndex = series.indexOf(serieFound);

  if (serieIndex >= 0) {
    series.splice(serieIndex, 1, serieToUpdate);
    writeSerie();
  } else {
    res
      .status(404)
      .send({ message: "Série não encontrado para ser atualizada!" });
  }
  res.status(200).send(series);
};

const deleteSeries = (req, res) => {
  const serieId = req.params.id;
  const serieFound = series.find((serie) => serie.id == serieId);
  const serieIndex = series.indexOf(serieFound);
  if (serieIndex >= 0) {
    series.splice(serieIndex, 1);
    writeSerie();
  } else {
    res.status(400).send({ message: "Serie não encontrada para deletar" });
  }
};

const updateLikedStatus = (req, res) => {
  const serieId = req.params.id;
  const newLiked = req.body.liked;

  const serieToUpdate = series.find((serie) => serie.id == serieId);
  const serieIndex = series.indexOf(serieToUpdate);

  if (serieIndex >= 0) {
    serieToUpdate.liked = newLiked;
    series.splice(serieIndex, 1, serieToUpdate);
    writeSerie();
  } else {
    res.status(400).send({ message: "Serie não encontrada" });
  }
  res.status(200).send(series);
};

const postSeriesSeason = (req, res) => {
  const serieId = req.params.id;
  const serieFound = series.find((serie) => serie.id == serieId);

  const { id, code, episodes } = req.body;
  serieFound.seasons.push({ id, code, episodes });
  writeSerie();
  res.status(200).send(series);
};

const postSeriesEpisode = (req, res) => {
  const serieId = req.params.id;
  const seasonId = req.params.seasonId;

  const serieFound = series.find((serie) => serie.id == serieId);
  const seasonFound = serieFound.seasons.find(
    (season) => season.id == seasonId
  );

  const { id, code, name, watched } = req.body;
  seasonFound.episodes.push({ id, code, name, watched });
  writeSerie();
  res.status(200).send(series);
};

const deleteSeriesSeason = (req, res) => {
  const serieId = req.params.id;
  const seasonId = req.params.seasonId;
  const serieFound = series.find((serie) => serie.id == serieId);
  const seasonFound = serieFound.seasons.find(
    (season) => season.id == seasonId
  );

  const seasonIndex = serieFound.indexOf(seasonFound);
  console.log(serieFound);
  console.log(seasonFound);
  console.log(seasonIndex);

  if (seasonIndex >= 0) {
    series.seasons.splice(seasonIndex, 1);
    writeSerie();
  } else {
    res.status(400).send({ message: "Serie não encontrada para deletar" });
  }
};

module.exports = {
  getAll,
  getById,
  createSeries,
  updateSeries,
  deleteSeries,
  updateLikedStatus,
  postSeriesSeason,
  postSeriesEpisode,
  deleteSeriesSeason,
};
