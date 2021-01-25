import '../styles/styles.scss'

const dataToDOM = data => {
  const weatherEl = document.querySelector('.weather')
  const cityEl = document.querySelector('.city')
  const tempEl = document.querySelector('.temp')
  const descriptionEl = document.querySelector('.description')
  const celsius = document.querySelector('#celsius')
  const fahrenheit = document.querySelector('#fahrenheit')
  const icon = document.querySelector('.icon')
  icon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`
  icon.alt = data.weather[0].description
  cityEl.textContent = `${data.name}, ${data.sys.country}`
  tempEl.textContent = `${Math.round(data.main.temp)}°C`
  descriptionEl.textContent = data.weather[0].description

  celsius.onclick = () => {
    fahrenheit.classList.remove('active')
    celsius.classList.add('active')
    tempEl.textContent = `${Math.round(data.main.temp)}°C`
  }
  fahrenheit.onclick = () => {
    celsius.classList.remove('active')
    fahrenheit.classList.add('active')
    tempEl.textContent = `${Math.round((data.main.temp * 9) / 5 + 32)}°F`
  }
}

const getDataFromAPI = async searchQuery => {
  try {
    const apiURL =
      process.env.PRODUCTION === 'true'
        ? `/.netlify/functions/fetchDataFromAPI?search=${searchQuery}`
        : `https://api.openweathermap.org/data/2.5/weather?q=${searchQuery}&units=metric&appid=${process.env.API_KEY}`
    const fetchData = await fetch(apiURL)
    const response = await fetchData.json()
    dataToDOM(response)
  } catch (error) {
    console.error(error)
    const errorMessage = document.querySelector('.error-message')
    errorMessage.textContent = 'The city you searched for cannot be found'
    errorMessage.classList.add('unhide')
    setTimeout(() => {
      errorMessage.classList.remove('unhide')
    }, 5000)
  }
}
const searchWeatherForm = document.querySelector('#searchWeatherForm')
const searchInput = searchWeatherForm.querySelector('input')

searchWeatherForm.onsubmit = e => {
  e.preventDefault()
  getDataFromAPI(searchInput.value)
  searchInput.value = ''
}
