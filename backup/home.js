let listElement = document.querySelector("#Carrosel");

function filmeApp() {
    fetch(
        "https://api.themoviedb.org/3/movie/popular?api_key=df85c4be593e70ae32d1595288534f7a&language=pt-BR"
    )
    .then((r) => r.json())
    .then((json) => {
        let post = json.results;

        
        post.slice(0, 10).forEach((item, index) => {
            
            let slideElement = document.createElement("div");
            
            slideElement.classList.add("slide");

            
            if (index === 0) {
                slideElement.classList.add("first");
            }
            
            
            let imgElement = document.createElement("img");
            imgElement.src = `https://image.tmdb.org/t/p/w500/${item.poster_path}`;

            
            slideElement.appendChild(imgElement);

            
            listElement.appendChild(slideElement);
        });
    })
    .catch((error) => {
        console.error("Deu algum erro ao buscar os filmes:", error);
    });
}

filmeApp();