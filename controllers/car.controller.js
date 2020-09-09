/* In this file, you will create all the code needed to perform CRUD operations using Mongoose. */
const Car = require('../models/car.model.js');
const mongoose = require('mongoose');

exports.post = function(req, res) {
    // Post and Save a new Car
    const data = req.body;
    const carModel = new Car(data);
    
    carModel.save(function(err, result) {
        if (err) {
            console.log(err);
            res.status(500).send({ message: "Some error occurred while creating the car." });
        } else {
            console.log(result);
            res.send({message: 'New car has been added to server', body: result});
        }
    });
    
};

exports.findAll = function(req, res) {
    Car.find(function(err, cars) {
        if (err) {
            console.log(err);
            res.status(500).send({ message: "Some error occurred while retrieving cars." });
        } else {
            res.send(cars);
        }
    });
}

exports.findByQuery = function(req, res) {
    let query = { model: {$lte: 2015} }
    Car.find(query, function(err, cars) {
        if (err) {
            console.log(err);
            res.status(500).send({ message: "Some error occurred while retrieving cars." });
        } else {
            res.send(cars);
        }
    });
}

exports.updateByID = function(req, res) {
    const id = req.body._id;
    const owner = req.body.owner;

    console.log(id);
    console.log(owner)

    Car.findOneAndUpdate({_id:id}, {owner:owner}, { new: true }, function(err, doc) {
        if (err) {
            console.log("Something wrong when updating data!");
            res.send("ERROR: Not Updated. " + err);
        }
        res.send(doc);
    });
}

exports.updateManyByQuery = function(req, res) {
    let query = { color: 'White' };
    Car.updateMany(query, {$set: {color: 'Silver'}}, function(err, doc) {
        if (err) {
            console.log("Something wrong when updating data!");
            res.send("ERROR: Not Updated. " + err);
        }
        res.send("Updated");
    
    });
}

exports.deleteByID = function(req, res) {

    const data = req.body;

    Car.findOneAndRemove( data , function(err) {
        if (err) {
            console.log("ERROR: car NOT removed. " + err);
            res.send("ERROR: car NOT removed. " + err);
        }
        res.send("car removed");
    });
}