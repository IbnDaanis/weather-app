const getDataFromAPI = async () => {
  try {
    const apiURL = `http://api.openweathermap.org/data/2.5/weather?q=London&appid=${process.env.API_KEY}`
    const fetchData = await fetch(apiURL)
    const response = await fetchData.json()
    console.log(process.env.API_KEY)
    console.log(process.env.PRODUCTION)
    console.log(response)
  } catch (error) {
    console.error(error)
  }
}

getDataFromAPI()
