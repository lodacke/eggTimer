import {wrapper} from "./startUp.js";

wrapper.setAttribute("id", "eggTimerWrapper");

export function eggTimer (info, time) {

    { } // destruct av info för att nå värdena att lägga in i choices: 

    wrapper.innerHTML = `
    <div class="choices"></div>
    <h1> Timer </h1>
    <div id="timerEgg">
        <div class="Timer">
          <p></p></div>
    </div>`

    let timerText = wrapper.querySelector("p");

    let count = 60; //time parametern
    const timer = setInterval(function() { 
     count--; timerText.textContent = count; 
     if (count === 0) { 
            clearInterval(timer); 
            console.log("Time's up!"); 
        } 
    }, 1000); 

    wrapper.querySelector(".choices").innerHTML = `
    <div class="eggSize"> </div>
    <div class="typeOfEgg"> </div>
    <div class"waterType"> </div>`;


}