import {wrapper} from "./startUp.js";
import { renderMainPage } from "./stepsV2.js";

export function eggTimer (info, time) {

    wrapper.removeAttribute("id", "wrapper");
    wrapper.setAttribute("id", "eggTimerWrapper");

    wrapper.innerHTML = `
    <div class="topOfBox">
        <p> Ditt Ägg </p>
        <div class="choices">
        </div>
    </div>
    <div class="timerEgg">
        <div class="inner_circle">
        </div>
        <div class="Timer">
            <p></p>
        </div>
    </div>
    <div class="backButton">
        <img src="../Media/arrow.png" alt="arrow-image" height="13px" width="13px">
       <p>tillbaka</p></div>
`

    let timerText = wrapper.querySelector(".Timer p");
    let eggTimerContainer = wrapper.querySelector(".timerEgg");
    let backButton = wrapper.querySelector(".backButton");

    backButton.addEventListener("click" , renderMainPage)

    let count = time; 
    let duration = count;
    let progress = 0; 
    let innerCircle = wrapper.querySelector(".inner_circle");

    const gradientStops = `rgba(248, 189, 99, 0.8) 0%, rgba(248, 189, 99, 0.8) 0%, rgba(248, 189, 99, 0.8) 0%, rgba(248, 189, 99, 0.8) 100%)`;

    innerCircle.style.background = `conic-gradient(${gradientStops}`;

    const timer = setInterval(function () {
    
        count--;
        progress = ((duration - count) / duration) * 100; 

        const minutes = Math.floor(count / 60);
        const seconds = count % 60;

       
        timerText.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

        const updatedGradientStops = `rgba(250, 228, 118, 0) 0%, rgba(250, 228, 118, 0) ${progress}%, rgba(250, 228, 118, 0.5) ${progress}%, rgba(250, 228, 118, 0.5) 100%)`;
        innerCircle.style.background = `conic-gradient(${updatedGradientStops}`;

        if (count === 0) {
            eggTimerContainer.classList.add("timerDone");
            timerText.textContent = "";
            timerText.classList.add("pauseButton");
            timerText.addEventListener("click", stopTimer)
          clearInterval(timer);

          console.log("Time's up!");
        }
        }, 1000);

    let { size, consistency, temp } = info;
        
    wrapper.querySelector(".choices").innerHTML = `
    <p class="eggSize">  ${size} <b> -storlek  </b></p>
    <p class="typeOfEgg"> ${consistency} <b> -kokt</b> </p>
    <p class"waterType"> ${temp}<b> -vatten </b> </p>`;

    function stopTimer (){
        eggTimerContainer.classList.remove("timerDone")
        timerText.classList.remove("pauseButton");
        timerText.textContent = "";
        renderMainPage();
    }
}

