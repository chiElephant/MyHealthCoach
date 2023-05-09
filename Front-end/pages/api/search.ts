// @ts-nocheck
import axios from 'axios';
require('dotenv').config();

const appId = process.env.EDAMAM_APPLICATION_ID
const appKeys = process.env.EDAMAM_APPLICATION_KEYS
const baseUrl =`https://api.edamam.com/api/food-database/v2/parser`
const fullUrl = `https://api.edamam.com/api/food-database/v2/parser?app_id=${appId}&app_key=${appKeys}&ingr=apple`
export default function handleSearch (req, res) {
  if (req.query.ingr.length > 0) {
    axios({
      method: 'get',
      url: baseUrl,
      params: {
        app_id: appId,
        app_key: appKeys,
        ingr: req.query.ingr
      }
    }).then((data) => {
      console.log(data.data.hints.length);
      // res.send(data.data.hints.slice(0, 4));
      res.send(data.data.hints);
    })
  }
  // res.end();
}