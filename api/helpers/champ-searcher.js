module.exports = {
  inputs: {
    name: {
      type: 'string',
      required: true
    }
  },
  exits: {
    success: {
      description: 'All done.',
    },
  },
  fn: async function (inputs) {
    const cheerio = require("cheerio") 
    const axios = require("axios")
    let cleanChampName = inputs.name.toLowerCase().trim().replace(/\W/g, '');
    let website = await axios.get(`https://www.leagueofgraphs.com/champions/counters/${cleanChampName}`)
    const $ = cheerio.load(website.data)
    let tbbody = $("table.data_table.sortable_table > tbody").eq(2)
    let trArray = tbbody.find("tr")
    let res = []
    trArray.slice(1, trArray.length - 1).each((i, tr) => {
      let winRate = $(tr).find("span.percentage").html()
      res.push({
        urlImage: $(tr).find("img").attr("src"),
        name : $(tr).find("img").attr("title"),
        winRate: 50 + parseInt(winRate.substring(0, winRate.length - 1))
      })
    });

    versionJson = await axios.get("https://ddragon.leagueoflegends.com/realms/na.json")
    let version = versionJson.data.v
    let champsJson = await axios.get(`http://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion.json`)
    let jsonData = Object.entries(champsJson.data.data)
    return res.map(r => {
      let path = jsonData.find(i => i[1].name == r.name)[1].image.full;
      return {
        urlImage : `https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${path}`,
        name: r.name,
        winRate : r.winRate
      }
    })
  }


};

