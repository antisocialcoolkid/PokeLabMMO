/* =========================================================
   POKELAB MMO — BATTLE SYSTEM
========================================================= */

let currentBattle = null;


/* =========================================================
   START
========================================================= */

function startBattle(enemy){

    currentBattle = {

        enemy:enemy,

        active:true

    };

    document
        .getElementById(
            "battleScreen"
        )
        .classList.remove(
            "hidden"
        );

    renderBattle();

}


/* =========================================================
   RENDER
========================================================= */

function renderBattle(){

    if(!currentBattle)
        return;

    const enemy =
        currentBattle.enemy;

    const playerPokemon =
        player.team[0];


    /*
       ENEMY
    */

    document.getElementById(
        "enemyName"
    ).textContent =
        enemy.name;

    document.getElementById(
        "enemyLevel"
    ).textContent =
        `Lv. ${enemy.level}`;


    document.getElementById(
        "enemyPokemon"
    ).innerHTML = `

        <img
            src="${enemy.sprite}"
            style="
                width:220px;
                max-width:35vw;
                animation:battleFloat 2.5s infinite;
                filter:drop-shadow(0 20px 15px #0008);
            "
        >

    `;


    /*
       PLAYER
    */

    document.getElementById(
        "playerName"
    ).textContent =
        playerPokemon.name;

    document.getElementById(
        "playerLevel"
    ).textContent =
        `Lv. ${playerPokemon.level}`;


    document.getElementById(
        "playerPokemon"
    ).innerHTML = `

        <img
            src="${playerPokemon.sprite}"
            style="
                width:240px;
                max-width:35vw;
                transform:scaleX(-1);
                animation:battleFloat 2.5s infinite;
                filter:drop-shadow(0 20px 15px #0008);
            "
        >

    `;


    updateBattleHP();

}


/* =========================================================
   HP
========================================================= */

function updateBattleHP(){

    const enemy =
        currentBattle.enemy;

    const playerPokemon =
        player.team[0];


    const enemyPercent =
        Math.max(
            0,
            enemy.hp /
            enemy.maxHP *
            100
        );

    const playerPercent =
        Math.max(
            0,
            playerPokemon.hp /
            playerPokemon.maxHP *
            100
        );


    document.getElementById(
        "enemyHPBar"
    ).style.width =
        enemyPercent+"%";


    document.getElementById(
        "playerHPBar"
    ).style.width =
        playerPercent+"%";


    document.getElementById(
        "enemyHPText"
    ).textContent =
        `${enemy.hp} / ${enemy.maxHP}`;


    document.getElementById(
        "playerHPText"
    ).textContent =
        `${playerPokemon.hp} / ${playerPokemon.maxHP}`;

}


/* =========================================================
   ATTACK
========================================================= */

function battleAttack(){

    if(
        !currentBattle ||
        !currentBattle.active
    )
        return;


    const enemy =
        currentBattle.enemy;

    const attacker =
        player.team[0];


    const damage =
        Math.max(
            1,
            Math.floor(
                attacker.attack *
                (.5 + Math.random()*.5)
            )
        );


    enemy.hp -= damage;


    if(
        enemy.hp < 0
    )
        enemy.hp = 0;


    document.getElementById(
        "battleText"
    ).textContent =

        `${attacker.name} hizo ${damage} de daño.`;


    updateBattleHP();


    if(
        enemy.hp <= 0
    ){

        setTimeout(
            winBattle,
            700
        );

        return;

    }


    setTimeout(
        enemyAttack,
        800
    );

}


/* =========================================================
   ENEMY ATTACK
========================================================= */

function enemyAttack(){

    if(
        !currentBattle ||
        !currentBattle.active
    )
        return;


    const enemy =
        currentBattle.enemy;

    const attacker =
        player.team[0];


    const damage =
        Math.max(
            1,
            Math.floor(
                enemy.attack *
                (.4 + Math.random()*.5)
            )
        );


    attacker.hp -= damage;


    if(
        attacker.hp < 0
    )
        attacker.hp = 0;


    document.getElementById(
        "battleText"
    ).textContent =

        `${enemy.name} hizo ${damage} de daño.`;


    updateBattleHP();

    updateUI();


    if(
        attacker.hp <= 0
    ){

        document.getElementById(
            "battleText"
        ).textContent =
            `${attacker.name} se debilitó.`;

        setTimeout(
            ()=>{
                closeBattle();

                healTeam();

            },
            1000
        );

    }

}


/* =========================================================
   CAPTURE
========================================================= */

function battleCapture(){

    if(
        player.inventory.pokeball <= 0
    ){

        document.getElementById(
            "battleText"
        ).textContent =
            "¡No tienes Poké Balls!";

        return;

    }


    player.inventory.pokeball--;


    const enemy =
        currentBattle.enemy;


    /*
       Más posibilidades
       si el Pokémon está débil.
    */

    const hpRatio =
        enemy.hp /
        enemy.maxHP;


    const chance =
        .2 +
        (1-hpRatio)*.6;


    if(
        Math.random() <
        chance
    ){

        const captured =
            createPokemon(
                POKEMON.find(
                    p =>
                    p.id === enemy.id
                ),
                enemy.level
            );


        if(
            addPokemon(
                captured
            )
        ){

            document.getElementById(
                "battleText"
            ).textContent =
                `¡${enemy.name} fue capturado!`;

            setTimeout(
                closeBattle,
                1000
            );

        }

    }
    else{

        document.getElementById(
            "battleText"
        ).textContent =
            "¡El Pokémon escapó de la Poké Ball!";

        setTimeout(
            enemyAttack,
            700
        );

    }


    saveGame();

    updateUI();

}


/* =========================================================
   RUN
========================================================= */

function runBattle(){

    if(!currentBattle)
        return;

    document.getElementById(
        "battleText"
    ).textContent =
        "¡Escapaste!";

    setTimeout(
        closeBattle,
        600
    );

}


/* =========================================================
   WIN
========================================================= */

function winBattle(){

    const enemy =
        currentBattle.enemy;

    const attacker =
        player.team[0];


    const reward =
        50 +
        enemy.level*10;


    player.coins +=
        reward;


    attacker.xp +=
        enemy.level*20;


    document.getElementById(
        "battleText"
    ).textContent =
        `¡${enemy.name} fue derrotado! +₽${reward}`;


    saveGame();


    setTimeout(
        closeBattle,
        1000
    );

}


/* =========================================================
   CLOSE
========================================================= */

function closeBattle(){

    currentBattle = null;

    document
        .getElementById(
            "battleScreen"
        )
        .classList.add(
            "hidden"
        );

    updateUI();

}
