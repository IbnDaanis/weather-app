import fetch from 'node-fetch'
import { searchQuery } from '../scripts/app'
const API_ENDPOINT = `https://api.openweathermap.org/data/2.5/weather?q=${searchQuery}&appid=${process.env.API_KEY}`

exports.handler = async function () {
  let apiData
  try {
    const city = 'London'
    const data = await fetch(API_ENDPOINT)
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
