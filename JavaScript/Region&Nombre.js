function ShowLastUserSearch(){
    if(LastSearchValue){// comprueba si existe un valor de busqueda previo que haya sido guardado, es como ver que no esté nulo o undefined
        InputData.value = LastSearchValue; // muestre e pantalla lo ultimo buscado por el usuario
        //verifica que lo ultimo mostradoq eu tenga la variabble no sea nulo o undefined, osea que tenga algo y que sea un arreglo con almenos un contenido
        if(LastCountriesShowed && LastCountriesShowed.length > 0){
            //LLamado a la funcion para mostrar en pantalla los paises 
            ShowCountries(LastCountriesShowed);
        }
    }
}

//funcion para inicializar la lista de los paises
async function InitializeCountries() {
    try {
        // se lamma a la funcion de opcional request que trae el resultado de la peticion al API y lo almacena en la variabble que se define en el otro script
        StorageCountries = await OptionalRequestAPI();
    } catch (error) {
        // lanza error si no se pudo inicializar
        console.log("Error al inicializar los países", error)
    }
}

// funcion para realizar la solicitud a la API de paises
async function OptionalRequestAPI() {
    try {
        //solicitud a la API
        const Result = await fetch("https://restcountries.com/v3.1/all");
        const Countries = await Result.json(); //se guarda el resultado de la API osea todos los paises dentro de variable

        localStorage.setItem('TotalCountries', JSON.stringify(Countries)); //Guarda en el localStorae los paises, el reusltado de la consulta a la API
        return Countries; //retorna los paises completos, que es lo que se le guarda a la variable de la funcion de arriba 
    } catch (error) {
        console.error("Error al obtener los datos de la API:", error);
        //devuelve un arreglo vacio como respaldo en caso de no relizar la peticion, o dar error 
        return [];
    }
}

