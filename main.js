const container = document.querySelector('.container');
let chosenCountries = [];
let chosenCountryNames = [];
let chosenCountryContainer = '';
let allData = [];
///////////////////////////Call data//////////////////////////
Promise.all([
  fetch('https://api.tradingeconomics.com/ratings/all?c=guest:guest&format=json')
]).then(([ratings]) => {
  processRates(ratings.json());
}).catch(error => console.log(`Error in promises ${error}`))

let processRates = promise => {
  promise.then(data => {
    allData = data;
    if(localStorage.length > 0) {
      for(let i = 0; i < localStorage.length; i++) {
        let getStoredItem = localStorage.getItem(localStorage.key(i));
        chosenCountries.push(JSON.parse(getStoredItem));
        chosenCountryNames.push(JSON.parse(getStoredItem).Country)
      }
    } else {
      allData.forEach((country, i) => {
        if(country.Country == 'United States ' ||
        country.Country == 'China' ||
        country.Country == 'Japan' ||
        country.Country == 'Germany' ||
        country.Country == 'United Kingdom') {
          chosenCountries.push(country);
          chosenCountryNames.push(country.Country);
          localStorage.setItem(`${country.Country}`, JSON.stringify(country));
        }
      });
    }
    renderCountries();
  })
}

const inputCountry = document.querySelector('.inputCountry');
const inputList = document.querySelector('.inputList');
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
const flashCountry = () => {
  chosenCountryContainer.style.backgroundColor = 'rgba(255,255,255, 0.9)';
  chosenCountryContainer.style.color = 'navy';
  setTimeout(function(){
    chosenCountryContainer.style.backgroundColor = 'transparent';
    chosenCountryContainer.style.color = 'white';
    chosenCountryContainer.style.transition = 'all 250ms ease-in-out';
  }, 250);
  chosenCountryContainer.style.transition = 'none';
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
          if(chosenCountryNames.includes(countryBtn.innerHTML)) {
            chosenCountryContainer = document.querySelector(`#${country.Country}`);
            console.log(`#${country.Country}`)
            flashCountry();
            clearList();
            inputCountry.value = '';
          } else {
            chosenCountries.push(country);
            chosenCountryNames.push(countryBtn.innerHTML);
            renderCountries();
            localStorage.setItem(`${country.Country}`, JSON.stringify(country));
          }
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
  clearList();
  inputCountry.value = '';
  chosenCountries.forEach((country, i) => {
    let countryContainer = document.createElement('div');
    countryContainer.className = 'countryContaner text';
    countryContainer.id = country.Country;

    let removeBtn = document.createElement('button');
    removeBtn.className = 'removeBtn text';
    removeBtn.innerHTML = '&#10005;';
    removeBtn.value = country.Country;
    removeBtn.addEventListener('click', e = () => {
      const findRemoveCountry = element => element.Country == removeBtn.value;
      const removeIndex = chosenCountries.findIndex(findRemoveCountry);
      chosenCountries.splice(removeIndex, 1);
      chosenCountryNames.splice(removeIndex, 1);
      renderCountries();
      localStorage.removeItem(localStorage.key(removeIndex));
    })

    let countryName = document.createElement('h2');
    countryName.textContent = country.Country;
    countryName.className = 'countryName';

    let ratingSection = document.createElement('div');
    ratingSection.className = 'ratingSection';

    let spRating = document.createElement('div');
    spRating.innerHTML = "<h3>S&P</h3><h5>" + country.SP + '</h5><h6>' + country.SP_Outlook + '</h6>';
    spRating.className = 'spRating rating';

    let fitchRating = document.createElement('div');
    fitchRating.innerHTML = "<h3>Fitch</h3><h5>" + country.Fitch + '</h5><h6>' + country.Fitch_Outlook + '</h6>';
    fitchRating.className = 'fitchRating rating';

    let moodysRating = document.createElement('div');
    moodysRating.innerHTML = "<h3>Moodys</h3><h5>" + country.Moodys + '</h5><h6>' + country.Moodys_Outlook + '</h6>';
    moodysRating.className = 'moodysRating rating';

    container.appendChild(countryContainer);
    countryContainer.appendChild(removeBtn);
    countryContainer.appendChild(countryName);
    countryContainer.appendChild(ratingSection);

    ratingSection.appendChild(fitchRating);
    ratingSection.appendChild(spRating);
    ratingSection.appendChild(moodysRating);
  });
}





















///////////////////////////Animations//////////////////////////
