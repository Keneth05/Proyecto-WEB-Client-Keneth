
let StorageCountries = JSON.parse(localStorage.getItem('TotalCountries'));

//variables de local storage con los valores utimso buscados y mostrados
const LastSearchValue = localStorage.getItem('SearchValue');
const LastCountriesShowed = JSON.parse(localStorage.getItem('FilteredCountries'));

const InputData = document.querySelector('#search');
const NameButton = document.querySelector('.Search');

const CountriesList = document.querySelector('.CountryList');
const TemplateCountry = document.getElementById('template-Country');

//verifica si la variable es valida o si la liongitud es igual a 0, entonces llama a fuincion que contiene llamado a otra funcion que hace de nuevo la peticion a la API
if(!StorageCountries || StorageCountries.length === 0){
    console.log("Local Vacío, se generarán de nuevo los países");
    InitializeCountries();
}
else{
    // en caso de si tener valor la variable,entonces usa los daots del local storage y llama a funcion que muestra los ultimos resultados
    console.log("Datos Cargados desde el Local");
    ShowLastUserSearch();
}

//funcion para que busque cuando el uusario va escribiendo inmediatamente
InputData.addEventListener('input', function () {
    SearchByCountryName();
});


function SearchByCountryName(){
    //guarda el valor ingresado por el usuario, quitandole espacios para que se pueda usar
    const SearchValue = InputData.value.trim().toLowerCase();

    localStorage.setItem('SearchValue', SearchValue); //guarda en el local storege el valor que ingrese el usuario para luego usarlo para mostrar lo utiomo buscado 


    //si el usuario no ingresa nada, entonces el contenedor de los paises se pone en vacio, para no mostrar nada, y se elimia el valor en el local storage, para que la proxima vez que entre no cargue nada
    if (SearchValue === '') {
        CountriesList.innerHTML = '';
        localStorage.removeItem('FilteredCountries');
        return;
    }

    //filtra por cada país, los paises que contengan lo que ingrese el usuario en su nombre
    const FilteredCountries = StorageCountries.filter(individualCountry => individualCountry.name.common.toLowerCase().includes(SearchValue));
    
    localStorage.setItem('FilteredCountries', JSON.stringify(FilteredCountries));// guarda en el localstorage los paises que fueron mostrados la ultima vez

    CountriesList.innerHTML = '';

    //si la variable que contiene los paises que coincidan en nombre con el input es mayor a 0, entonces los muestra, de lo contrario da un mensaje de que no existen paises con ese nombre 
    if(FilteredCountries.length > 0){
        ShowCountries(FilteredCountries);
    }
    else{
        CountriesList.innerHTML = '<p class="Warning">No se encontró un País con ese Nombre</p>';
    }
}
