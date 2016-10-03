/**
 * @author          Erwan
 * @description     TODO: Enter description here
 * @return          TODO: Enter return here
 */
var express = require('express');
var router = express.Router();
var Workman = require("../models/workman");
var updateObject = require("../lib/tools").updateObject;


/* ==================================================================================================================*/
// RESTful API
/* ==================================================================================================================*/




/**
 * This RESTful API is constituted of 5 HTTP Methods :
 * - GET
 * - DELETE
 * - PUT
 * - PATCH
 * - DELETE
 *
 * There is two ways of using this API :
 * - on a specific item, with the url /workmen/{workmenId}
 * - on the entire collection, with the url /workmen
 *
 * Every method is described above, and the return format is always JSON.
 */

/**
 * GET : Entire collection
 * @description Return the entire collection of workmen : an array of objects
 */
router.get('/', function (req, res, next) {
    Workman.find({}).then(function (workmen) {
        return res.status(200).json({result: workmen});
    });
});


/**
 * GET : specific item
 * @description Return the specific item object, or return a 404 error if the ID is invalid or if the item isn't found.
 */
router.get('/:id', function (req, res, next) {
    var params_id = req.params.id;
    Workman.findOne({id: params_id}).then(function (workman) {
        if (workman) {
            return res.status(200).json({result: workman, success: true});
        }
        else {
            return res.status(404).json({message: "not found", success: true});
        }
    });
});


/**
 * POST
 * @description create a workman from body parameters
 */
router.post('/', function (req, res, next) {
    var name = req.body.name;
    var surname = req.body.surname;
    var skills = req.body.skills;
    var description = req.body.description;
    var username = req.body.username;

    Workman.findOne({username: username})
        .then(function (workman) {
            if (workman) {
                console.log("Workman " + username + " already exists");
                return Promise.resolve(null);
            }
            var newWorkman = new Workman({
                name: name,
                surname: surname,
                skills: skills,
                description: description,
                username: username
            });

            return newWorkman.save(null);
        }).then(function (workman) {
        if (workman) {
            res.status(200).json({result: workman, message: "Created", success: true});
        }
        else {
            res.status(403).json({message: "Workman " + username + " already exists", success: false});
        }
    })
        .catch(function (err) {
            console.error(err);
            return next(err);
        });
});


router.delete('/:id', function (req, res, next) {
    var id = req.params.id;
    Workman.findOne({id: id})
        .then(function (workman) {
            if (!workman) {
                console.log("Workman " + id + " not found");
                return Promise.resolve(null);
            }
            return workman.delete();
        })
        .then(function (workman) {

            if (workman) {
                res.status(200).json({message: "Workman deleted", success: true});
            }
            else {
                res.status(404).json({message: "User not found", success: false});
            }
        })
        .catch(function (err) {
            console.error(err);
            return next(err);
        });
});


router.patch('/:id', function (req, res, next) {
    var id = req.params.id;
    var name = req.body.name;
    var surname = req.body.surname;
    var skills = req.body.skills;
    var description = req.body.description;
    var update = {name, surname, skills, description};
    console.log(update);

    Workman.findOne({id: id})
        .then(function (workman) {
            if (!workman) {
                console.log("Workman " + id + " not found");
                return Promise.resolve(null); //Workman not found ==> workman = null
            }
            updateObject(workman, update);
            console.log(workman);
            return workman.save({});
        })
        .then(function (workman) {
            //RESPONSE SECTION
            if (workman) {
                res.status(200).json({message: "Workman updated", result: workman, success: true});
            }
            else {
                res.status(404).json({message: "Not found", success: false});
            }
        })
        .catch(function (err) {
            console.error(err);
            return next(err);
        });
});


module.exports = router;