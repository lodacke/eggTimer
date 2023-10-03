import {wrapper} from "./startUp.js";

wrapper.setAttribute("id", "eggTimerWrapper");

export function eggTimer (info, time) {

    { } // destruct av info för att nå värdena att lägga in i choices: 

    wrapper.innerHTML = `
    <div class="choices"></div>

    <h1> Timer </h1>
    <div id="timerEgg">
        <div class="inner_circle">
        </div>
    <div class="Timer">
        <p></p>
    </div>
    </div>`

    let timerText = wrapper.querySelector("p");

    let count = 5; //time parametern
    let duration = count;
    let progress = 0; 
    let innerCircle = wrapper.querySelector(".inner_circle");

    const gradientStops = `rgba(250, 228, 118, 0) 0%, rgba(250, 228, 118, 0) 0%, rgba(250, 228, 118, 0.5) 0%, rgba(250, 228, 118, 0.5) 100%)`;

    innerCircle.style.background = `conic-gradient(${gradientStops}`;

    const timer = setInterval(function () {
        count--;
        progress = ((duration - count) / duration) * 100; 

        timerText.textContent = count;
        const updatedGradientStops = `rgba(250, 228, 118, 0) 0%, rgba(250, 228, 118, 0) ${progress}%, rgba(250, 228, 118, 0.5) ${progress}%, rgba(250, 228, 118, 0.5) 100%)`;
        innerCircle.style.background = `conic-gradient(${updatedGradientStops}`;

        if (count === 0) {
          clearInterval(timer);
           timerText.textContent = "Färdigt!";
          console.log("Time's up!");
        }
        }, 1000);

        
    wrapper.querySelector(".choices").innerHTML = `
    <div class="eggSize"> </div>
    <div class="typeOfEgg"> </div>
    <div class"waterType"> </div>`;


}