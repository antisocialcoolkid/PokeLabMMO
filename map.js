/* =========================================================
   POKELAB MMO — MAP
========================================================= */

let mapElements = [];


/* =========================================================
   CREATE MAP
========================================================= */

function createMap(){

    const map =
        document.getElementById(
            "mapLayer"
        );

    map.innerHTML = "";

    /*
       CAMINO PRINCIPAL
    */

    const road =
        document.createElement(
            "div"
        );

    road.className =
        "road horizontal";

    map.appendChild(
        road
    );


    const road2 =
        document.createElement(
            "div"
        );

    road2.className =
        "road vertical";

    map.appendChild(
        road2
    );


    /*
       CASAS
    */

    const houses = [

        [15,20],
        [72,20],
        [12,67],
        [75,70]

    ];

    houses.forEach(
        position=>{

            const house =
                document.createElement(
                    "div"
                );

            house.className =
                "house";

            house.style.left =
                position[0]+"%";

            house.style.top =
                position[1]+"%";

            map.appendChild(
                house
            );

        }
    );


    /*
       ÁRBOLES
    */

    for(
        let i=0;
        i<45;
        i++
    ){

        const tree =
            document.createElement(
                "div"
            );

        tree.textContent =
            Math.random()>.5
                ? "🌳"
                : "🌲";

        tree.style.position =
            "absolute";

        tree.style.left =
            Math.random()*95+"%";

        tree.style.top =
            Math.random()*90+"%";

        tree.style.fontSize =
            "34px";

        tree.style.zIndex =
            "2";

        map.appendChild(
            tree
        );

    }


    /*
       OTROS JUGADORES
    */

    const entities =
        document.getElementById(
            "entitiesLayer"
        );

    entities.innerHTML = "";

    const names = [
        "ALEX",
        "DIEGO",
        "ASH",
        "LUNA",
        "MAX"
    ];

    names.forEach(
        (name,index)=>{

            const npc =
                document.createElement(
                    "div"
                );

            npc.style.position =
                "absolute";

            npc.style.left =
                (20 + Math.random()*65)
                +"%";

            npc.style.top =
                (20 + Math.random()*60)
                +"%";

            npc.style.zIndex =
                "7";

            npc.style.textAlign =
                "center";

            npc.innerHTML = `

                <div
                    style="
                    font-size:34px;
                    animation:playerIdle 2s infinite;
                    "
                >
                    🧑
                </div>

                <small
                    style="
                    background:#07100dcc;
                    padding:3px 6px;
                    border-radius:5px;
                    font-size:7px;
                    "
                >
                    ${name}
                </small>

            `;

            entities.appendChild(
                npc
            );

        }
    );

}


/* =========================================================
   PLAYER MOVEMENT
========================================================= */

const movementKeys = {

    ArrowUp:[0,-2],

    ArrowDown:[0,2],

    ArrowLeft:[-2,0],

    ArrowRight:[2,0],

    w:[0,-2],

    s:[0,2],

    a:[-2,0],

    d:[2,0]

};


document.addEventListener(
    "keydown",
    event=>{

        const move =
            movementKeys[
                event.key
            ];

        if(!move)
            return;

        player.x += move[0];

        player.y += move[1];

        player.x =
            Math.max(
                5,
                Math.min(
                    95,
                    player.x
                )
            );

        player.y =
            Math.max(
                5,
                Math.min(
                    95,
                    player.y
                )
            );

        updatePlayerPosition();

        /*
           ENCUENTRO ALEATORIO
        */

        if(
            Math.random()<0.06
        ){

            setTimeout(
                exploreArea,
                150
            );

        }

    }
);


/* =========================================================
   UPDATE POSITION
========================================================= */

function updatePlayerPosition(){

    const element =
        document.getElementById(
            "player"
        );

    element.style.left =
        player.x+"%";

    element.style.top =
        player.y+"%";

}


/* =========================================================
   MOBILE CONTROLS
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    ()=>{

        document
            .querySelectorAll(
                ".mobile-controls button"
            )
            .forEach(
                button=>{

                    button.addEventListener(
                        "click",
                        ()=>{

                            const event =
                                new KeyboardEvent(
                                    "keydown",
                                    {
                                        key:
                                            button.dataset.key
                                    }
                                );

                            document.dispatchEvent(
                                event
                            );

                        }
                    );

                }
            );

    }
);
