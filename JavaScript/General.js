

//Evento para Abrir/cerrar el sidenav con la "X" ademas de inicializar el nav y sidenav de materialze
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar el sidenav
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems);

    document.querySelector('.close-sidenav').addEventListener('click', function(event) {
        event.preventDefault();
        var instance = M.Sidenav.getInstance(document.querySelector('.sidenav'));
        instance.close();
    });
});

document.addEventListener('DOMContentLoaded', function(){
    M.AutoInit();
});

function ShowInfoCountry(country){

    //se abre el modal con el codigo de inicializar de materialize
    const modal = document.querySelector("#CountryModalDetails");
    const modalInstance = M.Modal.init(modal);
    modalInstance.open();

    //Traer cada contenedor por su ID, contenedores de la informacion que se va mostrar en el modal, para luego asignarles valor
    const CountryName = document.querySelector('#CountryName');
    const CountryFlag = document.querySelector('#Flag')
    const CountryCapital = document.querySelector('#CountryCapital');
    const CountryPopulation = document.querySelector('#CountryPopulation');
    const CountryLenguague = document.querySelector('#CountryLenguague');
    const CountryRegion = document.querySelector('#CountryRegion');
    const CountryArea = document.querySelector('#CountryArea');
    const CountryContinent = document.querySelector('#CountryContinent');

    //para ponerle el 2 arriba de la "M" representando kilometros cuadrados
    const SquareKilometers = "Km\u00B2";


    //se valida que la propiedad currencies del objeto country no esté undefined, y muestra los valores 
    if(country.currencies != undefined){
        let Currencies = Object.values(country.currencies); //convierte los valores en un arreglo 
        CountryCoin.textContent = Currencies[0].name; // se accede al nombre de la moneda a travez del indice
        CountryCoinSymbol.textContent = Currencies[0].symbol; // se accede al simbolo a traves del indice

    }
    else{
        //si la propiedad currencies es indefined significa que no contiene moneda ni simbolo, por lo que se muestran mensajes en los lugares definidos
        CountryCoin.textContent = "El país no tiene una moneda definida";
        CountryCoinSymbol.textContent = "El país no tiene un simbolo definido";
    }
        // se le asigna valor a cada lugar del modal, contenedor del modal, con al infirmacion del país que se quiera mostrar
        CountryFlag.src = country.flags.png;
        CountryName.textContent = country.name.common;
        CountryPopulation.textContent = country.population.toLocaleString('es-ES'); //esto es par darle formato a los numeros, para ponerle puntos y comas segun se necesite
        CountryRegion.textContent = country.region;
        CountryArea.textContent = `${country.area.toLocaleString('es-ES')} ${SquareKilometers}`;
        CountryContinent.textContent = country.continents;
        
        // estas validaciones es para verificar si la capital, o idioma del pais es undefined entonces se muetra un mensaje de que ese pais no conteine ya sea capital o idioma
        CountryCapital.textContent = (country.capital !== undefined && country.capital !== null) ? country.capital : "Capital: El país no tiene Capital";
        
        CountryLenguague.textContent = (country.languages !== undefined && country.languages !== null) ? Object.values(country.languages).join(', ') : "Lenguajes: El país no contiene lenguaje definido";
};


//funcion para mostrar las tarjetas o los paises de forma dinamica
function ShowCountries(Countries){

    // se itera por cada pais 
    Countries.forEach(IndividualCountry => {
        const CardClone = TemplateCountry.content.cloneNode(true); // se genera un clone de todo lo que contenga el template por dentro

        // se extraen los contenedores para asignarles un valor, con el DOM
        const SeeDetails = CardClone.querySelector('.SeeMore');

        const CountryName = CardClone.querySelector('.CountryName');

        const CountryCapital = CardClone.querySelector('.CountryCapital');

        //Asignacion del valor con respecto a cada pais
        CountryName.textContent = IndividualCountry.name.common;
        CountryCapital.textContent = IndividualCountry.capital;
        
        // se agrega dinamicamente al HTML la carta del pais 
        CountriesList.appendChild(CardClone);
        // se le asigna al boton la funcion de abrir el mdodal
        SeeDetails.addEventListener('click', function(){
            ShowInfoCountry(IndividualCountry);
        }); 
    });
}
