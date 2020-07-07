const { Router } = require('express');
const axios = require('axios');
const Dev = require('./models/Dev');
const parseStringAsArray = require('./utils/parseStringAsArray');

const routes = Router();

routes.get('/devs', async (req, res) => {
    const devs = await Dev.find();

    return res.json(devs);
})

routes.post('/devs', async (req, res) => {
    const { github_username, techs, latitude, longitude } = req.body;

        let dev = await Dev.findOne({ github_username });

        if (!dev) {
            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);
            
            const { name = login, avatar_url, bio} = apiResponse.data;
            
            const techsArray = parseStringAsArray(techs);
            
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude],
            }
            
            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location,
            })
        } 
       
        return res.json(dev);
});

routes.get('/search', async (req, res) => {
    const { latitude, longitude, techs } = req.query;

        const techsArray = parseStringAsArray(techs);

        const devs = await Dev.find({
            techs: {
                $in: techsArray,
            },
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [longitude, latitude],
                    },
                    $maxDistance: 10000,
                },
            },
        });

        return res.json({ devs })
})

module.exports = routes;

// Métodos HTTP: get, post, put, delete

// Tipos de parâmetros:

//Query Params: request.query (Filtros, ordenação , ...) 
//Route Params: request.params (identificar um recurso na alteração, remoção)
// Body