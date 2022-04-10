const User = require("../models/user");
const Movielist = require("../models/movielist");
const { json } = require("express");
const HttpError = require('../models/http-error');

const getMovieLists = async (req, res, next) => {
    let movielists;
    try {
        movielists = await Movielist.find({userId: req.params.userId});
        console.log(movielists);
    }
    catch {
        const error = new HttpError(
            'Some error has occured, please try again later.',
            500
          );
          return next(error);
    }

    res
       .status(201)
       .json(movielists); 
}

const getUser = async (req, res, next) => {
    let user;
    console.log(req.params.userId)
    try {
        user = await User.findById(req.params.userId);
        console.log(user);
    }
    catch {
        const error = new HttpError(
            'Some error has occured, please try again later.',
            500
          );
          return next(error);
    }

    let email = user.email;
    let uname = user.uname;
    let movielists = user.movielists;
    let toSend = {
        email,
        uname,
        movielists,
    }
    
    if(user){
       res
       .status(201)
       .json(toSend); 
    }
    else {
        const error = new HttpError(
            'No such user exist.',
            500
          );
          return next(error);
    }
}

const editProfile = async (req, res, next) => {
    let user;
    try {
        user = await User.findByIdAndUpdate(req.query.userId, user);
    }
    catch {
        const error = new HttpError(
            'Some error has occured, please try again later.',
            500
          );
          return next(error);
    }

    if(user){
       res
       .status(201)
       .json(JSON.parse(user)); 
    }
    else {
        const error = new HttpError(
            'No such user exist.',
            500
          );
          return next(error);
    }   
}

const deleteProfile = async (req, res, next) => {
    let user;
    try {
        user = await User.findByIdAndDelete(req.query.userId);
    }
    catch {
        const error = new HttpError(
            'Some error has occured, please try again later.',
            500
          );
          return next(error);
    }

    if(user){
       res
       .status(201)
       .json(JSON.parse(user)); 
    }
    else {
        const error = new HttpError(
            'No such user exist.',
            500
          );
          return next(error);
    }
}

exports.getMovieLists = getMovieLists;
exports.getUser = getUser;
exports.editProfile = editProfile;
exports.deleteProfile = deleteProfile;

