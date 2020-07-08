const Dev = require('../models/Dev');

module.exports = function checkLocation(location) {
    return Dev.find({ "location.coordinates": location })? [location[0] + 0.000100, location[1] + 0.000100] : location
}
