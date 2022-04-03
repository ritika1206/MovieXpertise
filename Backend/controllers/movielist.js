const HttpError = require('../models/http-error');
const Movielist = require('../models/movielist');

const create = async () => {
    const { name } = req.body;
    const createdMovielist = new Movielist({
        name,
    });

    try {
        await createdMovielist.save();
    }
    catch {
        const error = new HttpError(
            'Movielist creation failed, please try again.',
            500
        );
        return next(error);
    }

}
const getList = async () => {
    Movielist.findById()
}

const addMovie = () => {

}

const removeMovie = () => {

}

const deleteList = () => {
    Movielist.findByIdAndDelete()
}

exports.create = create;
exports.getList = getList;
exports.addMovie = addMovie;
exports.removeMovie = removeMovie;
exports.deleteList = deleteList;

