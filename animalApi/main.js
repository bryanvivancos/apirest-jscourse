const API = "https://api.thecatapi.com/v1/images/search?limit=2&api_key=live_IY9QRJ4Y1JKrAHB11Cw8XQlHeRtHT2cS8gQXwY8j6YHuMtmORFFVJ44uhT5A2IDb"

const API_URL_FAVORITES = "https://api.thecatapi.com/v1/favourites"

const API_UPLOAD_PHOTO = "https://api.thecatapi.com/v1/images/upload"

API_KEY = "live_IY9QRJ4Y1JKrAHB11Cw8XQlHeRtHT2cS8gQXwY8j6YHuMtmORFFVJ44uhT5A2IDb"

const btn = document.querySelector("#refresh")
const imageContainer = null|| document.getElementById("imgs")
const uploadedContainer = null || document.getElementById("uploadedPhotos")
const spanError = document.getElementById("span-error")
const favImages = document.getElementById("favImages")
//window.onload = fetchRandomAnimal();

btn.addEventListener("click", fetchRandomAnimal);


// LOAD RANDOM ANIMAL FROM API

async function fetchRandomAnimal() {
    try {
        const response = await fetch (API)
        const data = await response.json()
        console.log("random")
        console.log(data)

        // Genera el HTML para las imágenes    
        let view = `
        ${data.map( item =>`
            <img src="${item.url}" width="280" alt="Random Animal">
            <button class= "imageBtn" data-id= "${item.id}">
                Add to favorite ${item.id}
            </button>
            `).join("")}`
        
        imageContainer.innerHTML = view

        // Asocia los eventos a los botones
        const buttons = document.querySelectorAll(".imageBtn")
        buttons.forEach(button => {
            button.addEventListener("click", () => {
                const imgId = button.getAttribute("data-id")
                saveFavoriteAnimal(imgId)
                loadFavoriteAnimal()

            })
        })
        
    } catch (error) {
        console.log(error);
        const errorMessage = error || "Error desconocido";
        spanError.innerHTML = "Hubo un error: " + errorMessage
    }
}


// LOAD FAVORITE  ANIMAL FROM API

async function loadFavoriteAnimal() {

    try {
        
        const response = await fetch (API_URL_FAVORITES,{
                headers: {
                    'x-api-key': API_KEY
                },
            })
        const favs = await response.json()
        console.log("favorites")
        console.log(favs)

        // Genera el HTML para las imágenes
        let view = `
        ${favs.map( favs =>`
            <img src="${(favs.image.url)}" width="280" alt="Favorite Animal">
            <button class= "delBtn" image-id= "${favs.id}" >
                Delete from Favorite ${favs.id}
            </button>`).join("")}`
        
        favImages.innerHTML = view

        // Asocia los eventos a los botones
        const buttons = document.querySelectorAll(".delBtn")
        buttons.forEach(button => {
            button.addEventListener("click", () => {
                const imgId = button.getAttribute("image-id")
                delFavoriteAnimal(imgId)
            })
        })

    } catch (error) {
        console.log(error);
        const errorMessage = error || "Error desconocido";
        spanError.innerHTML = "Hubo un error: " + errorMessage
    }
}


// SAVE RANDOM ANIMAL TO FAVORITES 

async function saveFavoriteAnimal(imgId) {

    try {
        const response = await fetch (API_URL_FAVORITES, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'x-api-key': API_KEY
            },
            body: JSON.stringify({
                "image_id": imgId
              }),
        })
        console.log("Saved")

    } catch (error) {
        console.log(error);
        const errorMessage = error || "Error desconocido";
        spanError.innerHTML = "Hubo un error: " + errorMessage
    }
}


// DELETE FAVORITE ANIMAL FROM FAVORITES IN API 

async function delFavoriteAnimal(imgId) {

    try {
        const response = await fetch (`${API_URL_FAVORITES}/${imgId}`, {
            method: "DELETE",
            headers: {
                'x-api-key': API_KEY
            },
        })
        console.log("Deleted")
        loadFavoriteAnimal()

    } catch (error) {
        console.log(error);
        const errorMessage = error || "Error desconocido";
        spanError.innerHTML = "Hubo un error: " + errorMessage
    }
}


//UPLOAD A PHOTO TO API

async function uploadPhoto(){
    try {
        const form = document.getElementById("uploadPhoto")
        const formData = new FormData(form)

        console.log(formData.get("file"))

        const response = await fetch(API_UPLOAD_PHOTO,{
            method: "POST",
            headers: {
                'x-api-key': API_KEY
            },
            body: formData
        })

        console.log("Photo uploaded")


    } catch (error) {
        console.log(error);
        const errorMessage = error || "Error desconocido";
        spanError.innerHTML = "Hubo un error: " + errorMessage
    }
}


// THUMBNAIL UPLOAD PHOTO

async function thumbail() {
    const form = document.getElementById("uploadPhoto")
    const formData = new FormData(form)
    //usamos el FileReader para sacar la información del archivo del formData
    const reader = new FileReader();
    //Este código es para borrar la miniatura anterior al actualizar el form.
    if (form.children.length === 3) {
        const preview = document.getElementById("preview")
        form.removeChild(preview)
    }
        //aquí sucede la magia, el reader lee los datos del form.
    reader.readAsDataURL(formData.get('file'))

    //Éste código es para cuando termine de leer la info de la form, cree una imagen miniatura de lo que leyó el form.
        reader.onload = () => {
            const previewImage = document.createElement('img')
            previewImage.id = "preview"
            previewImage.width = 50
            previewImage.src = reader.result
            form.insertBefore(previewImage,form.children[0]);
        }
}


//LOAD UPLOADED PHOTOS

async function uploadedPhotos() {

    try {
        
        const response = await fetch ("https://api.thecatapi.com/v1/images/",{
                headers: {
                    'x-api-key': API_KEY
                },
            })
        const uploads = await response.json()
        console.log("uploads")
        console.log(uploads)

        // Genera el HTML para las imágenes
        let view = `
        ${uploads.map( ups =>`
            <img src="${(ups.url)}" width="280" alt="Favorite Animal">
            `).join("")}`
        
        uploadedContainer.innerHTML = view

    } catch (error) {
        console.log(error);
        const errorMessage = error || "Error desconocido";
        spanError.innerHTML = "Hubo un error: " + errorMessage
    }
}

fetchRandomAnimal()
loadFavoriteAnimal()
uploadedPhotos()