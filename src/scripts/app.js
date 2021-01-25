const getDataFromAPI = async searchQuery => {
  try {
    const apiURL =
      process.env.PRODUCTION === 'true'
        ? `/.netlify/functions/fetchDataFromAPI?search=${searchQuery}`
        : `https://api.openweathermap.org/data/2.5/weather?q=${searchQuery}&units=metric&appid=${process.env.API_KEY}`
    const fetchData = await fetch(apiURL)
    const response = await fetchData.json()

    console.log(response)
    const cityEl = document.querySelector('.city')
    const tempEl = document.querySelector('.temp')
    cityEl.textContent = response.name
    tempEl.textContent = `${Math.round(response.main.temp)}°C`
  } catch (error) {
    console.error(error)
  }
}
const searchWeatherForm = document.querySelector('#searchWeatherForm')
const searchInput = searchWeatherForm.querySelector('input')

searchWeatherForm.onsubmit = e => {
  e.preventDefault()
  getDataFromAPI(searchInput.value)
  searchInput.value = ''
}
