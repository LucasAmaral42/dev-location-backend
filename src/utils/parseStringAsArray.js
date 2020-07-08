module.exports = function parseStringAsArray(arrayAsString){
    return arrayAsString.split(',').map(tech => tech.trim().toLowerCase().replace(/^\w/, (c) => c.toUpperCase()))
}