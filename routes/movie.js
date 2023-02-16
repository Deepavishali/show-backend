import express from "express";
import { getMovieId, PostMovie, UpdateMovie, deleteMovie, getMovie } from '../query.js';
import { auth } from "../middleware/auth.js";


const router = express.Router();

//movie/id
router.get("/:id", async (req, res) => {
    const { id } = req.params;
    console.log(id);
    const movie = await getMovieId(id);
    //to display error message //
    movie ? res.send(movie) : res.status(404).send({ message: "movie not found" })
});

router.post("/", async (req, res) => {
    const newMovie = req.body;
    console.log(newMovie);
    const result = await PostMovie(newMovie);
    res.send(result);
    console.log(result);
}
);

//To get  rating //

router.get("/", async (req, res) => {
    const { rating, name } = req.query;
    console.log(req.query, rating);
    console.log(req.query, name);
    if (req.query.rating) {
        req.query.rating = +req.query.rating
    }
    console.log(req.rating)
    const movie = await getMovie(req);
    res.send(movie);
});

//To update movie//

router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const updateMovie = req.body;
    console.log(updateMovie);
    const result = await UpdateMovie(id, updateMovie);
    res.send(result);
    console.log(result);
});



//To delete movie//

router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    const movie = await deleteMovie(id);
    console.log(movie);
    movie ? res.send(movie) : res.status(404).send({ message: "Not found" });
});

export const movierouter = router;