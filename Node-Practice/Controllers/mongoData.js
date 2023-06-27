import { client } from '../db.js'
import { ObjectId } from 'mongodb'


export function getAllUsers(query){
    return client
        .db('guvi_task')
        .collection('users')
        .find(query)
        .toArray()
}
export function getUserByID(id){
    return client
        .db('guvi_task')
        .collection('users')
        .findOne({_id:new ObjectId(id)})
}
export function addNewUser(user){
    return client
    .db('guvi_task')
    .collection('users')
    .insertOne(user)
}
export function editUser(name,updatedUser){
    return client
    .db('guvi_task')
    .collection('users')
    .updateOne({name},{$set:updatedUser})
}
export function deleteUser(id){
    return client
    .db('guvi_task')
    .collection('users')
    .deleteOne({_id: new ObjectId(id)})
}