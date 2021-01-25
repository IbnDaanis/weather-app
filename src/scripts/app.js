const getDataFromAPI = async () => {
  try {
    const apiURL =
      process.env.PRODUCTION === 'true'
        ? process.env.PRODUCTION_API
        : process.env.API_URL
    const fetchData = await fetch(apiURL)
    const response = await fetchData.json()

    console.log(response)
  } catch (error) {
    console.error(error)
  }
}

getDataFromAPI()
