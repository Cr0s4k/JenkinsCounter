/**
 * IndexController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    getChamps : async function(req, res){
        let champ = req.query.champ;
        let list = await sails.helpers.champSearcher(champ);
        res.send(list);
    },

    getAllChamps: async function(req, res){
        const axios = require('axios')

        versionJson = await axios.get("https://ddragon.leagueoflegends.com/realms/na.json")
        let version = versionJson.data.v
        let champsJson = await axios.get(`http://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion.json`)
        let result = Object.entries(champsJson.data.data).map(i => {
            return i[1].name
        })
        res.send(result)
    }

};

