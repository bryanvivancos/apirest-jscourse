const API = "https://api.thecatapi.com/v1/images/search?limit=2&api_key=live_IY9QRJ4Y1JKrAHB11Cw8XQlHeRtHT2cS8gQXwY8j6YHuMtmORFFVJ44uhT5A2IDb"

const API_URL_FAVORITES = "http://api.thecatapi.com/v1/favourites?api_key=live_IY9QRJ4Y1JKrAHB11Cw8XQlHeRtHT2cS8gQXwY8j6YHuMtmORFFVJ44uhT5A2IDb"

API_KEY = "api_key=live_IY9QRJ4Y1JKrAHB11Cw8XQlHeRtHT2cS8gQXwY8j6YHuMtmORFFVJ44uhT5A2IDb"

const btn = document.querySelector("#refresh")
const imageContainer = null|| document.getElementById("imgs")
const spanError = document.getElementById("span-error")
//window.onload = fetchRandomAnimal();

btn.addEventListener("click", fetchRandomAnimal);

async function fetchRandomAnimal() {
    try {
        const response = await fetch (API)
        const data = await response.json()
        console.log("random")
        console.log(data)

        if (response.status !== 200){
            spanError.innerHTML = "Hubo un error" + response.status + ": " + data.message
        }else{
            // Genera el HTML para las imágenes
        let view = `
        ${data.map( data =>`
            <img src="${(data.url)}" width="280" alt="Random Animal">
            <button>Add to favorite</button>`).join("")}`
        
        imageContainer.innerHTML = view
        }
    } catch (error) {
        console.log(error);
    }
}

async function loadFavoriteAnimal() {
        const response = await fetch (API_URL_FAVORITES)
        const data = await response.json()
        console.log("favorites")
        console.log(data)

        console.log(response.status)
        if (response.status !== 200){
            const errorMessage = "Error desconocido";
            spanError.innerHTML = "Hubo un error: " + response.status + " " + errorMessage;;
        }
        

        // Genera el HTML para las imágenes
        // let view = `
        // ${data.map( data =>`
        //     <img src="${(data.url)}" width="280" alt="Random Animal">
        //     <button>Add to favorite</button>`).join("")}`
        
        // imageContainer.innerHTML = view
    }

fetchRandomAnimal()
loadFavoriteAnimal()