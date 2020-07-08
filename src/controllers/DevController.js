const axios = require('axios');
const Dev = require('../models/Dev');
const changeLocation = require('../utils/changeLocation');
const parseStringAsArray = require('../utils/parseStringAsArray');
const { findConnections, sendMessage } = require('../websocket');

// index, show, store, update, destroy

module.exports = {
    async index(request, response) {
        const devs = await Dev.find();

        return response.json(devs);
    },

    async store(req, res) {
        const { github_username, techs, latitude, longitude } = req.body;

        let coordinates = [longitude, latitude]

        let dev = await Dev.findOne({ github_username });
        let loc = await Dev.findOne({ "location.coordinates": coordinates })

        coordinates = loc? changeLocation(coordinates) : coordinates

        if (!dev) {
            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);

            const { name = login, avatar_url, bio} = apiResponse.data;

            const techsArray = parseStringAsArray(techs);

            const location = {
                type: 'Point',
                coordinates: coordinates,
            }

            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location,
            })

            const sendSocketMessageTo = findConnections(
                { latitude, longitude },
                techsArray,
            )

            sendMessage(sendSocketMessageTo, 'new-dev', dev);
        }

        res.json(dev)
    }
}