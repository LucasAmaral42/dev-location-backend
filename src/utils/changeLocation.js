const Dev = require('../models/Dev');

module.exports = function changeLocation(location) {
    return Math.random() < 0.5 ? 
    [location[0] + ((Math.random()*0.000100) + 0.000050), location[1] + ((Math.random()*0.000100) + 0.000050)]
    : [location[0] - ((Math.random()*0.000100) + 0.000050), location[1] - ((Math.random()*0.000100) + 0.000050)]
}
