const API = "https://api.thecatapi.com/v1/images/search?limit=6"
const APIURL = "https://dog.ceo/api/breeds/image/random/2"

const btn = document.querySelector("#refresh")
const imageContainer = null|| document.getElementById("imgs")

window.onload = fetchImg();
btn.addEventListener("click", fetchImg);

async function fetchImg() {
    try {
        const response = await fetch (APIURL)
        const data = await response.json()
        const urlImg = data.message
        console.log(urlImg)

        // Genera el HTML para las imágenes
        let view = urlImg.map(url => `
        <img src="${url}" width="300" alt="Random Animal">`
        ).join("");

        imageContainer.innerHTML = view

    } catch (error) {
        console.log(error);
    }
}