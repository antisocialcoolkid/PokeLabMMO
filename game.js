/* =========================================================
   POKELAB MMO — GAME ENGINE
========================================================= */

let player = {

    name:"MAXI",

    level:12,

    coins:500,

    x:50,

    y:50,

    team:[],

    inventory:{

        pokeball:10,

        potion:5,

        superpotion:2,

        "rare-candy":1

    },

    pokedex:[],

    location:"RUTA NOVA"

};


let saveKey =
    "pokelab_mmo_save_v1";


/* =========================================================
   INIT
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    bootGame
);


function bootGame(){

    let progress = 0;

    const bar =
        document.getElementById(
            "loadingBar"
        );

    const text =
        document.getElementById(
            "loadingText"
        );

    const messages = [

        "INITIALIZING WORLD...",

        "LOADING KANTO REGION...",

        "CONNECTING TO WORLD 01...",

        "LOADING POKÉDEX...",

        "PREPARING ADVENTURE..."

    ];

    const interval =
        setInterval(()=>{

            progress += 20;

            bar.style.width =
                progress + "%";

            text.textContent =
                messages[
                    Math.min(
                        messages.length-1,
                        Math.floor(progress/20)-1
                    )
                ];

            if(progress >= 100){

                clearInterval(
                    interval
                );

                setTimeout(
                    startGame,
                    500
                );

            }

        },300);

}


/* =========================================================
   START
========================================================= */

function startGame(){

    loadGame();

    if(player.team.length === 0){

        player.team = [

            createPokemon(
                POKEMON[0],
                6
            ),

            createPokemon(
                POKEMON[3],
                5
            )

        ];

    }

    updateUI();

    document
        .getElementById("bootScreen")
        .classList.add("hidden");

    document
        .getElementById("app")
        .classList.remove("hidden");

    createMap();

}


/* =========================================================
   SAVE
========================================================= */

function saveGame(){

    localStorage.setItem(

        saveKey,

        JSON.stringify(player)

    );

}


/* =========================================================
   LOAD
========================================================= */

function loadGame(){

    const data =
        localStorage.getItem(
            saveKey
        );

    if(!data)
        return;

    try{

        player =
            JSON.parse(data);

    }
    catch(error){

        console.warn(
            "Save corrupto"
        );

    }

}


/* =========================================================
   UI
========================================================= */

function updateUI(){

    document.getElementById(
        "teamCount"
    ).textContent =
        `${player.team.length} / 6`;

    document.getElementById(
        "teamList"
    ).innerHTML =

        player.team.map(
            (pokemon,index)=>`

                <div class="team-card">

                    <img
                        src="${pokemon.sprite}"
                    >

                    <div>

                        <strong>
                            ${pokemon.name}
                            ${pokemon.shiny ? "✨":""}
                        </strong>

                        <small>
                            Nv. ${pokemon.level}
                        </small>

                        <small>
                            ❤️
                            ${pokemon.hp}
                            /
                            ${pokemon.maxHP}
                        </small>

                    </div>

                </div>

            `
        ).join("");

}


/* =========================================================
   MODALS
========================================================= */

function openModal(content){

    document.getElementById(
        "modalContent"
    ).innerHTML =
        content;

    document
        .getElementById("modal")
        .classList.remove("hidden");

}


function closeModal(){

    document
        .getElementById("modal")
        .classList.add("hidden");

}


function openPokedex(){

    openModal(`

        <h2 class="modal-title">
            📖 POKÉDEX
        </h2>

        <p class="modal-subtitle">
            Especies registradas:
            ${player.pokedex.length}
            /
            ${POKEMON.length}
        </p>

        <div class="dex-grid">

            ${POKEMON.map(
                pokemon=>`

                    <div class="dex-card">

                        <img
                            src="${pokemon.sprite ||
                            getSprite(pokemon.id)}"
                        >

                        <strong>
                            #${String(
                                pokemon.id
                            ).padStart(3,"0")}
                            ${pokemon.name}
                        </strong>

                        <small>
                            ${pokemon.type.join(" / ")}
                        </small>

                    </div>

                `
            ).join("")}

        </div>

    `);

}


function openInventory(){

    openModal(`

        <h2 class="modal-title">
            🎒 MOCHILA
        </h2>

        <p>
            🔴 Poké Ball ×
            ${player.inventory.pokeball}
        </p>

        <p>
            🧪 Poción ×
            ${player.inventory.potion}
        </p>

        <p>
            🧴 Superpoción ×
            ${player.inventory.superpotion}
        </p>

        <p>
            🍬 Caramelo Raro ×
            ${player.inventory["rare-candy"]}
        </p>

    `);

}


function openProfile(){

    openModal(`

        <h2 class="modal-title">
            🏅 ENTRENADOR
        </h2>

        <p>
            <strong>
                ${player.name}
            </strong>
        </p>

        <br>

        <p>
            ⭐ Nivel:
            ${player.level}
        </p>

        <p>
            🐾 Pokémon:
            ${player.team.length}/6
        </p>

        <p>
            📖 Pokédex:
            ${player.pokedex.length}
            /
            ${POKEMON.length}
        </p>

        <p>
            💰 Dinero:
            ₽ ${player.coins}
        </p>

        <p>
            📍 ${player.location}
        </p>

    `);

}


function openCollection(){

    openModal(`

        <h2 class="modal-title">
            ✨ COLECCIÓN
        </h2>

        <p class="modal-subtitle">
            Tus Pokémon especiales
        </p>

        ${
            player.team
                .filter(p=>p.shiny)
                .map(p=>`

                    <div class="team-card">

                        <img
                            src="${p.sprite}"
                        >

                        <div>

                            <strong>
                                ✨ ${p.name}
                            </strong>

                            <small>
                                Nv. ${p.level}
                            </small>

                        </div>

                    </div>

                `)
                .join("")
            ||
            "<p>No tienes Pokémon shiny todavía.</p>"
        }

    `);

}


function openSettings(){

    openModal(`

        <h2 class="modal-title">
            ⚙ AJUSTES
        </h2>

        <button
            onclick="resetGame()"
        >
            🗑️ BORRAR PARTIDA
        </button>

        <br><br>

        <p>
            PokeLab MMO V0.1
        </p>

    `);

}


/* =========================================================
   HEAL
========================================================= */

function healTeam(){

    player.team.forEach(
        pokemon=>{

            pokemon.hp =
                pokemon.maxHP;

        }
    );

    saveGame();

    updateUI();

    showWorldMessage(
        "🏥 ¡Tu equipo fue curado!"
    );

}


/* =========================================================
   RESET
========================================================= */

function resetGame(){

    if(
        !confirm(
            "¿Seguro que quieres borrar tu partida?"
        )
    )
        return;

    localStorage.removeItem(
        saveKey
    );

    location.reload();

}


/* =========================================================
   ADD POKEMON
========================================================= */

function addPokemon(pokemon){

    if(
        player.team.length >= 6
    ){

        showWorldMessage(
            "Tu equipo está lleno."
        );

        return false;

    }

    player.team.push(
        pokemon
    );

    if(
        !player.pokedex.includes(
            pokemon.id
        )
    ){

        player.pokedex.push(
            pokemon.id
        );

    }

    saveGame();

    updateUI();

    return true;

}


/* =========================================================
   MESSAGE
========================================================= */

function showWorldMessage(message){

    const box =
        document.getElementById(
            "worldMessage"
        );

    box.textContent =
        message;

    box.classList.add(
        "show"
    );

    setTimeout(
        ()=>{
            box.classList.remove(
                "show"
            );
        },
        2500
    );

}


/* =========================================================
   EXPLORE
========================================================= */

function exploreArea(){

    const pokemon =
        POKEMON[
            Math.floor(
                Math.random() *
                POKEMON.length
            )
        ];

    const level =
        Math.floor(
            Math.random()*8
        )+3;

    const wild =
        createPokemon(
            pokemon,
            level
        );

    if(
        !player.pokedex.includes(
            wild.id
        )
    ){

        player.pokedex.push(
            wild.id
        );

    }

    startBattle(
        wild
    );

}


/* =========================================================
   SAVE EVERY 10 SEC
========================================================= */

setInterval(
    saveGame,
    10000
);
