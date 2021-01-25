const fetch = require('node-fetch')
require('dotenv').config()

const API_ENDPOINT = `https://api.openweathermap.org/data/2.5/weather?q=${searchQuery}&appid=${process.env.API_KEY}`

exports.handler = async function (event, context, callback) {
  let apiData
  try {
    const data = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${event.queryStringParameters.searchQuery}&appid=${process.env.API_KEY}`
    )
    const response = await data.json()
    apiData = response
  } catch (err) {
    return {
      statusCode: err.statusCode || 500,
      body: JSON.stringify({
        error: err.message,
      }),
    }
  }
  return {
    statusCode: 200,
    body: JSON.stringify(apiData),
  }
}
