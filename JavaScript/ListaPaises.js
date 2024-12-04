
let StorageCountries;
//vairiable que contendrá donde se iran poneindo los paises,esto necesario para poder hacer llamado a la funcion del archivo general, ya que lo ocupa
const CountriesList = document.querySelector('.CountryList');

//se trae la etiqueta del template
const TemplateCountry = document.getElementById('template-Country');


//funcion para realizar la peticion a la API de los paises
async function RequestCountriesAPI() {
    try {
        //guarda el resultado de la peticion de la API en una variable
        const Result = await fetch("https://restcountries.com/v3.1/all")
        const countries = await Result.json();// esta variable contendrá todos los paises 

        //se ingresa en el local storage los paises por completo
        localStorage.setItem("TotalCountries", JSON.stringify(countries));
    } catch (error) {
        console.log("Error en la peticion a la API", error);
    }

    StorageCountries = JSON.parse(localStorage.getItem("TotalCountries"));// se le agrega a la variable el valor de todos los paises que estén en el LocalStorage

    ShowCountries(StorageCountries);// llama a funcion pra miostrar los paises
}

RequestCountriesAPI();