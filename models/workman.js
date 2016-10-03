/**
 * @author          Erwan
 * @description     Workman model
 * @return          a mongoose model, describing the workman entity
 */

/* ==================================================================================================================*/
// PACKAGES
/* ==================================================================================================================*/
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var shortid = require('shortid');
var Promise = require('bluebird');

// Our workman mongodb schema
var workmanSchema = new Schema({
    //id is the chosen way of identify a workman
    id : {
        type: String,
        default : shortid.generate, //generaded by the shortid plugin
        unique : true
    },
    username : {
        type : String,
        required : true,
        index: true, // index + both == no duplicates
        unique: true
    },
    name: {
        type : String,
        required : true
    },
    surname:{
        type : String,
        required : true
    },
    city : String,
    skills : [String],
    age : String,
    description : String,
    created_at: Date,
    updated_at : Date
});

/*
    PRE-SAVE HOOK
    Before every modification ( or creation ) of any workman, we can execute this function on the workman to save.
    This function update the updated_at/created_at dates of the workman.
 */
workmanSchema.pre('save', function(next) {
    // get the current date
    var currentDate = new Date();

    // change the updated_at field to current date
    this.updated_at = currentDate;

    // if created_at doesn't exist, add to that field
    if (!this.created_at)
        this.created_at = currentDate;

    next();
});
//creating model from schema
var Workman = mongoose.model('Workman', workmanSchema);


/* ==================================================================================================================*/
// EXPORT -- Workman : mongoose.model
/* ==================================================================================================================*/
module.exports = Workman;
