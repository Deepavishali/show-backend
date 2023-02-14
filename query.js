import {client} from './index.js';
import bcrypt from "bcrypt";

export async function getMovieId(id) {
    return await client
        .db("show")
        .collection("movie")
        .findOne({ id: id });
}
export async function PostMovie(newMovie) {
    return await client
        .db("show")
        .collection("movie")
        .insertMany(newMovie);
}
export async function getMovie(req) {
    return await client
        .db("show")
        .collection("movie")
        .find(req.query).toArray();
}
export async function UpdateMovie(id, updateMovie) {
    return await client
        .db("show")
        .collection("movie")
        .updateOne({ id: id }, { $set: updateMovie });
}

export async function deleteMovie(id){
    return await client
    .db("show")
    .collection("movie")
    .deleteOne({id:id});
}

//generating password

export async function genPassword(password) {
    const salt = await bcrypt.genSalt(10);  //bcrypt.genSalt(no.of.rounds)
    console.log(salt)
    const hashedPassword = await bcrypt.hash(password, salt)
    console.log(hashedPassword);
    return hashedPassword;
}

//creating user

export async function createUser(username, hashedPassword) {
    return await client
        .db("b41wd2")
        .collection("users")
        .insertOne({ username: username, password: hashedPassword });
}

//validating username

export async function getUserByName(username){
    return await client
        .db("b41wd2")
        .collection("users")
        .findOne({username:username});
}