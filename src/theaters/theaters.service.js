
const { where } = require("../db/connection");
const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");
const reduceProperties = require("../utils/reduce-properties");

const addMovies = reduceProperties("theater_id", {
  movie_id: ["movies", null, "movie_id"],
  title: ["movies", null, "title"],
  runtime_in_minutes: ["movies", null, "runtime_in_minutes"],
  rating: ["movies", null, "rating"],
  description: ["movies", null, "description"],
  image_url: ["movies", null, "image_url"],
  is_showing: ["movies", null, "is_showing"],
});

function list() {
  return knex("theaters as t")
    .join("movies_theaters as mt", "t.theater_id", "mt.theater_id")
    .join("movies as m", "mt.movie_id", "m.movie_id")
    .select("*")
    .then((data) => addMovies(data, null));
}


function moviesTheaters(movieId){
    return knex("theaters as t")
     .join("movies_theaters as mt", "t.theater_id", "mt.theater_id")
     .join("movies as m", "mt.movie_id", "m.movie_id")
    .select("t.*","mt.is_showing", "m.movie_id")
    .where({ "mt.movie_id": movieId })

}
module.exports = {
  list,
  moviesTheaters
}