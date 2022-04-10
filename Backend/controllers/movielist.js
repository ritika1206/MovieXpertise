const { json } = require('express');
const HttpError = require('../models/http-error');
const Movielist = require('../models/movielist');

const create = async (req, res, next) => {

    const { movies, name, visibility, userId } = req.body;
    let movielist;
    const createdMovielist = new Movielist({
        name,
        visibility,
        movies,
        userId,
    });

    try {
        movielist = await createdMovielist.save();
        console.log("here is the created movie list");
        console.log(movielist);
    }
    catch {
        const error = new HttpError(
            'Movielist creation failed, please try again.',
            500
        );
        return next(error);
    }

    res
        .status(201)
        .json(createdMovielist);

};

const getList = async (req, res, next) => {
    let movieList;
    try{
        movieList = await Movielist.findById(req.query.movielistId);
    }
    catch {
        const error = new HttpError(
            'Search failed, please try again.',
            500
        );
        return next(error);
    }
    if(!movieList) {
        const error = new HttpError(
            'Movielist does not exist',
            500
        );
        return next(error);
    }
    else {
        res
        .status(201)
        .json(JSON.parse(movieList));
    }
};

const addMovie = async (req, res, next) => {
    const movie = req.body;
    
    let movieList;
    let getlist;
    try {
        getlist = await Movielist.findById(req.params.movielistId);
        movieList = await Movielist.findByIdAndUpdate(req.params.movielistId, {
            movies: [...getlist.movies, movie],
        });
    }
    catch {
        const error = new HttpError(
            'Movie addition failed, please try again.',
            500
        );
        return next(error);
    }

    res
    .status(201)
    .json(movieList);
};

const removeMovie = async (req, res, next) => {
    const movieId = req.query.movieId;
    
    let movieList;
    try {
        movieList = await Movielist.findByIdAndUpdate(req.query.movielistId, {
            movies: movieList.movies.filter(movie => movie.id === movieId),
        });
    }
    catch {
        const error = new HttpError(
            'Movie addition failed, please try again.',
            500
        );
        return next(error);
    }

    res
    .status(201)
    .json(JSON.parse(movieList));
};

const deleteList = async (req, res, next) => {

    let movieList;
    try {
        movieList = await Movielist.findByIdAndDelete(req.query.movieListId);
    }
    catch {
        const error = new HttpError(
            'Movielist deletion failed, please try again.',
            500
        );
        return next(error);
    }

    res
    .status(201)
    .json(JSON.parse(movieList));    
};

const getPublicMovielists = async (req, res, next) => {
    let movieLists;
    try {
        movieLists = await Movielist.findOne({ visibility: "public" }).exec();
    }
    catch {
        const error = new HttpError(
            'Some error has occureed, try again later',
            500
        );
        return next(error);
    }

    if(movieLists) {
        res
        .status(201)
        .json(JSON.parse(movieList));    
    }
    else {
        const error = new HttpError(
            'No public movies exist.',
            500
        );
        return next(error);
    }
}

exports.create = create;
exports.getList = getList;
exports.addMovie = addMovie;
exports.removeMovie = removeMovie;
exports.deleteList = deleteList;
exports.getPublicMovielists = getPublicMovielists;

