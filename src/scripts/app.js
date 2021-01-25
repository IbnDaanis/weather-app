const getDataFromAPI = async searchQuery => {
  try {
    const apiURL =
      process.env.PRODUCTION === 'true'
        ? process.env.PRODUCTION_API
        : `https://api.openweathermap.org/data/2.5/weather?q=${searchQuery}&appid=${process.env.API_KEY}`
    const fetchData = await fetch(apiURL)
    const response = await fetchData.json()

    console.log(response)
  } catch (error) {
    console.error(error)
  }
}
export const searchQuery = 'New York'
getDataFromAPI(searchQuery)
