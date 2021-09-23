const container = document.querySelector('.container');
let allData = '';
///////////////////////////Call data//////////////////////////
Promise.all([
  fetch('https://api.tradingeconomics.com/ratings/all?c=guest:guest&format=json')
]).then(([ratings]) => {
  processRates(ratings.json());
}).catch(error => console.log(`Error in promises ${error}`))

let processRates = promise => {
  promise.then(data => {
    allData = data;
  })
}


const inputCountry = document.querySelector('.inputCountry');
const inputList = document.querySelector('.inputList');
const chosenCountries = [];
const filterCountries = country => {
  const inputCountries = new RegExp('^' + inputCountry.value, 'i');
  return inputCountries.test(country.Country);
}
const clearList = () => {
  inputList.innerHTML = '';
}
const clearContainer = () => {
  container.innerHTML = '';
}

const searchCountries = () => {
  inputCountry.addEventListener('keyup', e = () => {
    clearList();
    if(inputCountry.value.length > 0) {
      const searchedCountries = allData.filter(filterCountries);
      searchedCountries.forEach((country, i) => {
        const countryBtn = document.createElement('li');
        countryBtn.className = 'countryBtn';
        countryBtn.textContent = country.Country;
        inputList.appendChild(countryBtn);

        countryBtn.addEventListener('click', e = () => {
          chosenCountries.push(country);
          renderCountries();
        })
      });
    } else {
      clearList();
    }
  })
}
searchCountries();

const renderCountries = () => {
  clearContainer();
  chosenCountries.forEach((country, i) => {
    let countryContainer = document.createElement('div');
    countryContainer.className = 'countryContaner';

    let countryName = document.createElement('h2');
    countryName.textContent = country.Country;
    countryName.className = 'countryName';

    let countryData = document.createElement('div');
    countryData.className = 'countryData';

    let ratingSection = document.createElement('div');
    ratingSection.className = 'ratingSection';

    let spRating = document.createElement('h4');
    spRating.innerHTML = "S&P: <br>" + country.SP + '<br>' + country.SP_Outlook + ' outlook';
    spRating.className = 'spRating';
    let fitchRating = document.createElement('h4');
    fitchRating.innerHTML = "Fitch: <br>" + country.Fitch + '<br>' + country.Fitch_Outlook + ' outlook';
    fitchRating.className = 'fitchRating';
    let moodysRating = document.createElement('h4');
    moodysRating.innerHTML = "Moodys: <br>" + country.Moodys + '<br>' + country.Moodys_Outlook + ' outlook';
    moodysRating.className = 'fitchRating';

    container.appendChild(countryContainer);
    countryContainer.appendChild(countryName);
    countryContainer.appendChild(countryData);
    countryData.appendChild(ratingSection);

    ratingSection.appendChild(spRating);
    ratingSection.appendChild(fitchRating);
    ratingSection.appendChild(moodysRating);
  });

}





























///////////////////////////Animations//////////////////////////
