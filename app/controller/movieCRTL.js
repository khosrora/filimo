const Movie = require('../model/movie');



const movieCTRL = {
    getAllMovies: async (req, res) => {
        try {
            const allMovies = await Movie.find().sort({ createdAt: -1 })
            res.json({
                allMovies,
                result: allMovies.length
            })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    createMovie: async (req, res) => {
        try {
            const body = { ...req.body }
            // !VALIDATION
            const value = await Movie.movieValidate(body);
            if (value.error) {
                return res.status(400).json({ msg: value.error.details[0].context.label })
            }
            const { name } = req.body;
            const oldMovie = await Movie.findOne({ name });
            if (oldMovie) return res.status(400).send({ msg: "این فیلم قبلا ثبت شده است" })

            // !CREATE MOVIE
            const newMovie = Movie({
                ...body, slug: slugRegex(name)
            })
            // !SAVE MOVIE
            await newMovie.save();

            res.json({ msg: ` با موفقیت ثبت شد  ${newMovie.name} فیلم` })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    getMovie: async (req, res) => {
        try {
            const slug = req.params.slug;
            const oneMovie = await Movie.findOne({ slug })
            res.json({ oneMovie })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    deleteMovie: async (req, res) => {
        try {
            const id = req.params.id;
            const oneMovie = await Movie.findOneAndRemove(id)
            res.json({ msg: "فیلم مورد نظر حذف شد" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    } 
}

const slugRegex = (name) => {
    return name.replace(/([^۰-۹آ-یa-z0-9]|-)+/g, "-")
}


module.exports = movieCTRL;