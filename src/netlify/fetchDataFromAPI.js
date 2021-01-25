const fetch = require('node-fetch')
require('dotenv').config()

const API_ENDPOINT = process.env.API_URL

exports.handler = async function () {
  let response
  try {
    response = await fetch(API_ENDPOINT)
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
    body: JSON.stringify({ response }),
  }
}
