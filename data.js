/* =========================================================
   POKELAB MMO — DATA
========================================================= */

const POKEMON = [

    {
        id:1,
        name:"Bulbasaur",
        type:["Planta","Veneno"],
        baseHP:45,
        attack:49,
        defense:49,
        moves:["Tackle","Vine Whip"]
    },

    {
        id:4,
        name:"Charmander",
        type:["Fuego"],
        baseHP:39,
        attack:52,
        defense:43,
        moves:["Scratch","Ember"]
    },

    {
        id:7,
        name:"Squirtle",
        type:["Agua"],
        baseHP:44,
        attack:48,
        defense:65,
        moves:["Tackle","Water Gun"]
    },

    {
        id:25,
        name:"Pikachu",
        type:["Eléctrico"],
        baseHP:35,
        attack:55,
        defense:40,
        moves:["Quick Attack","Thunder Shock"]
    },

    {
        id:39,
        name:"Jigglypuff",
        type:["Normal","Hada"],
        baseHP:115,
        attack:45,
        defense:20,
        moves:["Pound"]
    },

    {
        id:52,
        name:"Meowth",
        type:["Normal"],
        baseHP:40,
        attack:45,
        defense:35,
        moves:["Scratch"]
    },

    {
        id:54,
        name:"Psyduck",
        type:["Agua"],
        baseHP:50,
        attack:52,
        defense:48,
        moves:["Water Gun"]
    },

    {
        id:59,
        name:"Arcanine",
        type:["Fuego"],
        baseHP:90,
        attack:110,
        defense:80,
        moves:["Ember"]
    },

    {
        id:94,
        name:"Gengar",
        type:["Fantasma","Veneno"],
        baseHP:60,
        attack:65,
        defense:60,
        moves:["Shadow Ball"]
    },

    {
        id:133,
        name:"Eevee",
        type:["Normal"],
        baseHP:55,
        attack:55,
        defense:50,
        moves:["Tackle"]
    },

    {
        id:143,
        name:"Snorlax",
        type:["Normal"],
        baseHP:160,
        attack:110,
        defense:65,
        moves:["Tackle"]
    },

    {
        id:149,
        name:"Dragonite",
        type:["Dragón","Volador"],
        baseHP:91,
        attack:134,
        defense:95,
        moves:["Dragon Claw"]
    },

    {
        id:150,
        name:"Mewtwo",
        type:["Psíquico"],
        baseHP:106,
        attack:110,
        defense:90,
        moves:["Psychic"]
    },

    {
        id:151,
        name:"Mew",
        type:["Psíquico"],
        baseHP:100,
        attack:100,
        defense:100,
        moves:["Psychic"]
    }

];


/* =========================================================
   SPRITES
========================================================= */

function getSprite(id){

    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

}


/* =========================================================
   CREATE POKEMON
========================================================= */

function createPokemon(data,level=5){

    const maxHP =
        data.baseHP +
        level * 2;

    return {

        id:data.id,

        name:data.name,

        type:[...data.type],

        level:level,

        xp:0,

        maxHP:maxHP,

        hp:maxHP,

        attack:
            data.attack +
            level,

        defense:
            data.defense +
            level,

        moves:[
            ...data.moves
        ],

        shiny:
            Math.random() < 0.01,

        sprite:
            getSprite(data.id)

    };

}


/* =========================================================
   STARTERS
========================================================= */

const STARTERS = [

    POKEMON[0],

    POKEMON[1],

    POKEMON[2]

];


/* =========================================================
   ITEMS
========================================================= */

const ITEMS = [

    {
        id:"pokeball",
        name:"Poké Ball",
        icon:"🔴"
    },

    {
        id:"potion",
        name:"Poción",
        icon:"🧪"
    },

    {
        id:"superpotion",
        name:"Superpoción",
        icon:"🧴"
    },

    {
        id:"rare-candy",
        name:"Caramelo Raro",
        icon:"🍬"
    }

];
