var quantidade = document.getElementById("quantidade");
quantidade.addEventListener('keyup',()=>{
    pegaPokemons(quantidade.value)
    if(quantidade.value > 0){
    document.querySelector('p').style.display = 'none'
    }
})

function pegaPokemons(quantidade){
// quantidade = 5    

fetch('https://pokeapi.co/api/v2/pokemon?limit='+quantidade)
.then(response => response.json())
.then(allpokemon => {

    var pokemons = [];

    allpokemon.results.map((val)=>{
       

    fetch(val.url)
    .then(response => response.json())
    .then(pokemonSingle => {
        console.log(pokemonSingle);

        pokemons.push({nome:val.name,imagem:pokemonSingle.sprites.front_default,peso:pokemonSingle.weight,altura:pokemonSingle.height/10,tipo1:pokemonSingle.types[0].type.name});

        if(pokemons.length == quantidade){
            pokemonBoxes = document.querySelector('.pokemon-boxes');
            pokemonBoxes.innerHTML = '';

            pokemons.map((val)=>{
                // console.log(val.name);
                pokemonBoxes.innerHTML += `
                
            <div class="pokemon-box">
                <img src="`+ val.imagem +`" alt="">
                <p>`+ val.nome + `</p>
                <p>Peso: `+ val.peso + `KG</p>
                <p>Altura: `+ val.altura + ` m</p>
                <p>Tipo: `+ val.tipo1 +` </p>
            </div><!--pokemon-box-->

            `
            })
        }
    })

    })

})


            
 }