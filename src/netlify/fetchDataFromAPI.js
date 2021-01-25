const fetch = require('node-fetch')
require('dotenv').config()

const API_ENDPOINT = process.env.API_URL

exports.handler = async function () {
  let apiData
  try {
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
