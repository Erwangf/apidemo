/**
 * @author          Erwan
 * @description     TODO: Enter description here
 * @return          TODO: Enter return here
 */
/* ==================================================================================================================*/
// UTILITY FUNCTIONS
/* ==================================================================================================================*/
/**
 * Update Object
 * @description Update the main object with the update object. The main object will be updated by the properties of update.
 * @param main : Object - A javascript object, who will be updated.
 * @param update : Object - The javascript object who will be used to update the main object.
 */
var updateObject = function (main, update) {
    for (var p in update) {
        if (update[p] != null && main[p] != update[p]) {
            main[p] = update[p];
        }
    }
};


module.exports = {
    updateObject
};