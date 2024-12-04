let StorageCountries = JSON.parse(localStorage.getItem('TotalCountries'))  || [];

const LastSearchValue = localStorage.getItem('SelectValue');
const LastCountriesShowed = JSON.parse(localStorage.getItem('FiltreredRegionCountries'));

const InputData = document.querySelector('#RegionSelect');

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

//funcion para que busque cuando el usuario cambia de opcion en el select
InputData.addEventListener('change', function(){
    SearchByRegion();
})

function SearchByRegion(){
        //guarda el la opciom que el usuario escogio, el valor por asi decirlo de esa opcion
    const RegionValue = InputData.value;

    localStorage.setItem('SelectValue', RegionValue);//guarda en el local storege el valor que ingrese el usuario para luego usarlo para mostrar lo utiomo buscado 

        //si el usuario no escoje nada, entonces el contenedor de los paises se pone en vacio, para no mostrar nada, y se elimia el valor en el local storage, para que la proxima vez que entre no cargue nada
    if (RegionValue === '') {
        localStorage.removeItem('FiltreredRegionCountries');
        CountriesList.innerHTML = '';
        return;
    }
    //filtra por cada país, los paises que contengan en su region, la region que el usuario escojio previamente
    const FilteredCountries = StorageCountries.filter(individualCountry => individualCountry.region.toLowerCase() === RegionValue.toLowerCase())

    localStorage.setItem('FiltreredRegionCountries', JSON.stringify(FilteredCountries));// guarda en el localstorage los paises que fueron mostrados la ultima vez

    CountriesList.innerHTML = '';

        //si la variable que contiene los paises que coincidan en nombre con el input es mayor a 0, entonces los muestra, de lo contrario da un mensaje de que no existen paises con ese nombre 
    if(FilteredCountries.length > 0){
        ShowCountries(FilteredCountries);
    }
}

