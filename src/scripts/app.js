const getDataFromAPI = async () => {
  console.log(process.env.API_KEY)
  console.log(process.env.PRODUCTION)
  console.log(process.env.PRODUCTION_API)
  console.log(process.env.DEVELOPMENT_API)
  try {
    const apiURL =
      process.env.PRODUCTION === 'true'
        ? process.env.PRODUCTION_API
        : process.env.DEVELOPMENT_API
    const fetchData = await fetch(apiURL)
    const response = await fetchData.json()

    console.log(response)
  } catch (error) {
    console.error(error)
  }
}

getDataFromAPI()
