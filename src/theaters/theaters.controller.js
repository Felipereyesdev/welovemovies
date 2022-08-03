const service = require("./theaters.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res) {
  const { movieId } = req.params;
  if (movieId) {
    console.log("in movie id")
    const data = await service.moviesTheaters(movieId);
    res.json({ data });
    
  } else {
    const query = req.query.is_showing;
    const data = await service.list();

    res.json({
      data,
    });
  }
}

// async function moviesTheaters(req,res){
//   const {movieId} = req.params
//   if(movieId){
//     res.json({"hello": "world"})
//   }

// let data =[]
// if(req.params.movieId !== null){
//     data =  await service.moviesTheaters(req.params.movieId)
// }
// res.json({data})
// }

module.exports = {
  list: asyncErrorBoundary(list),
  // moviesTheaters: asyncErrorBoundary(moviesTheaters)
};
