import '../styles/styles.scss'

const domNodes = {
  weatherEl: document.querySelector('.weather'),
  cityEl: document.querySelector('.city'),
  tempEl: document.querySelector('.temp'),
  descriptionEl: document.querySelector('.description'),
  celsiusEl: document.querySelector('#celsius'),
  fahrenheitEl: document.querySelector('#fahrenheit'),
  iconEl: document.querySelector('.icon'),
  loaderEl: document.querySelector('.loader'),
  errorMessageEl: document.querySelector('.error-message'),
  searchWeatherForm: document.querySelector('#searchWeatherForm'),
  searchInput: document.querySelector('input'),
}

const {
  weatherEl,
  cityEl,
  tempEl,
  descriptionEl,
  celsiusEl,
  fahrenheitEl,
  iconEl,
  loaderEl,
  searchWeatherForm,
  errorMessageEl,
  searchInput,
} = domNodes

const dataToDOM = data => {
  weatherEl.classList.add('unhide')
  iconEl.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`
  iconEl.alt = data.weather[0].description
  cityEl.textContent = `${data.name}, ${data.sys.country}`
  tempEl.textContent = `${Math.round(data.main.temp)}°C`
  descriptionEl.textContent = data.weather[0].description
  loaderEl.classList.remove('unhide')
  celsiusEl.onclick = () => {
    fahrenheitEl.classList.remove('active')
    celsiusEl.classList.add('active')
    tempEl.textContent = `${Math.round(data.main.temp)}°C`
  }
  fahrenheitEl.onclick = () => {
    celsiusEl.classList.remove('active')
    fahrenheitEl.classList.add('active')
    tempEl.textContent = `${Math.round((data.main.temp * 9) / 5 + 32)}°F`
  }
}

const getDataFromAPI = async searchQuery => {
  try {
    loaderEl.classList.add('unhide')
    weatherEl.classList.remove('unhide')
    const apiURL =
      process.env.PRODUCTION === 'true'
        ? `/.netlify/functions/fetchDataFromAPI?search=${searchQuery}`
        : `https://api.openweathermap.org/data/2.5/weather?q=${searchQuery}&units=metric&appid=${process.env.API_KEY}`
    const fetchData = await fetch(apiURL)
    const response = await fetchData.json()
    console.log(response)
    dataToDOM(response)
  } catch (error) {
    console.error(error)
    weatherEl.classList.remove('unhide')
    loaderEl.classList.remove('unhide')
    errorMessageEl.textContent = 'The city you searched for cannot be found'
    errorMessageEl.classList.add('unhide')
    setTimeout(() => {
      errorMessageEl.classList.remove('unhide')
    }, 5000)
  }
}

searchWeatherForm.onsubmit = e => {
  e.preventDefault()
  getDataFromAPI(searchInput.value)
  document.activeElement.blur()
  searchInput.value = ''
}
