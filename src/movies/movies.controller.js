const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")


// this function gets the service function which gets all the movies
// async function list(req,res,){
//     const data = await service.list();
//     res.json({data})
// }

async function list(req, res) {

    const query = req.query.is_showing;
    const data = query ? await service.listIsShowing() : await service.list();
    
      res.json({
         data
      });
    }


async function read(req,res){
    const { movie: data } = res.locals;
  res.json({ data });

}
// this function validates if the movie exists
async function movieExists(req, res, next) {
    const movie = await service.read(req.params.movieId);
    if (movie) {
      res.locals.movie = movie;
      return next();
    }
    next({ status: 404, message: "Movie cannot be found."  });
  }


  //this function returns the theater of an especific movie

  

module.exports ={
    list: asyncErrorBoundary(list),
    read: [asyncErrorBoundary(movieExists),asyncErrorBoundary(read) ],
    movieExists
}