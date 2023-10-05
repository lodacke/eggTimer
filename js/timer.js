import {main} from "./startUp.js";
import { renderMainPage } from "./stepsV2.js";

export function eggTimer (info, time) {
    document.getElementById("cssSwitch").setAttribute("href", "css/EggTimer.css");
    let whiteScreen = document.getElementById("whiteScreen");
    whiteScreen.style.opacity = "0"; // transition
    document.querySelector("#whiteScreen").style.opacity = "0"; 
    setTimeout(() => whiteScreen.style.display = "none", 300); 

    main.removeAttribute("id", "wrapper");
    main.setAttribute("id", "eggTimerWrapper");

    main.innerHTML = `
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

    let timerText = main.querySelector(".Timer p");
    let eggTimerContainer = main.querySelector(".timerEgg");
    let backButton = main.querySelector(".backButton");

    backButton.addEventListener("click" , () => {
        whiteScreen.style.display = "block";
        setTimeout(() => {whiteScreen.style.opacity = "1";}, 300);
        setTimeout(renderMainPage, 1000);
        })

    let count = time; 
    let duration = count;
    let progress = 0; 
    let innerCircle = main.querySelector(".inner_circle");

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

        }
    }, 1000);

    let { size, consistency, temp } = info;
        
    main.querySelector(".choices").innerHTML = `
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

