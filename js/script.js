let body = document.querySelector("body");
let mode = document.querySelector(".mode");
let localMode = localStorage.getItem(`mode`);
let loader = document.querySelector(`.loader`)
if (localMode) {
  body.classList.add(`active`);
  mode.innerHTML = `<i class="fa-regular fa-sun"></i>`;
}
mode.addEventListener(`click`, () => {
  if (body.classList.contains(`active`)) {
    body.classList.remove(`active`);
    localStorage.setItem(`mode`, ``);
    mode.innerHTML = `<i class="fa-regular fa-moon"></i>`;
  } else {
    body.classList.add(`active`);
    localStorage.setItem(`mode`, `active`);
    mode.innerHTML = `<i class="fa-regular fa-sun"></i>`;
  }
});
let API = `https://restcountries.com/v3.1/all`;
let getData = async (api) => {
  let req = await fetch(api);
  let data = await req.json();
  writeData(data);
};
getData(API);
let countries = document.querySelector(".countries");
let writeData = (data) => {
  countries.innerHTML = ``;
  data.forEach((item) => {
    countries.innerHTML += `<div class="card">
                <img src="${item.flags.svg}" alt="">
            <div class="countriesInfo">
                <h3 class="countryName">${item.name.common}</h3>
                <p><b>Population: </b><span>${item.population.toLocaleString("en")}</span></p>
                <p><b>Region: </b><span class="countryRegion">${item.continents}</span></p>
                <p><b>Capital: </b>${item.capital}</p>
            </div>
        </div>`;
  });
}
let select = document.querySelector(`select`);
let input = document.querySelector(`input`)
input.addEventListener(`input`, () => {
  let cardList = document.querySelectorAll(`.card`)
  cardList.forEach((card) => {
    if(!card.querySelector(`.countryName`).textContent.toLocaleLowerCase().includes(input.value.toLocaleLowerCase())){
      card.classList.add(`delete`)
    }else{
      card.classList.remove(`delete`)
    }
  })
})
select.addEventListener('change', () => {
  let cardList = document.querySelectorAll('.card');
  cardList.forEach((card) => {
    if (select.value.toLocaleLowerCase() === 'all' || card.querySelector('.countryRegion').textContent.toLowerCase() === select.value.toLocaleLowerCase()) {
      card.classList.remove('delete');
    } else {
      card.classList.add('delete');
    }
  });
});