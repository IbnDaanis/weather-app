import '../styles/styles.scss'

const getDataFromAPI = async searchQuery => {
  try {
    const apiURL =
      process.env.PRODUCTION === 'true'
        ? `/.netlify/functions/fetchDataFromAPI?search=${searchQuery}`
        : `https://api.openweathermap.org/data/2.5/weather?q=${searchQuery}&units=metric&appid=${process.env.API_KEY}`
    const fetchData = await fetch(apiURL)
    const response = await fetchData.json()

    console.log(response)
    const weatherEl = document.querySelector('.weather')
    const cityEl = document.querySelector('.city')
    const tempEl = document.querySelector('.temp')
    const descriptionEl = document.querySelector('.description')
    const icon = document.querySelector('.icon')
    icon.src = `http://openweathermap.org/img/wn/${response.weather[0].icon}.png`
    icon.alt = response.weather[0].description
    cityEl.textContent = `${response.name}, ${response.sys.country}`
    tempEl.textContent = `${Math.round(response.main.temp)}°C`
    descriptionEl.textContent = response.weather[0].description
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
