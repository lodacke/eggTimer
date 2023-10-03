import {wrapper} from "./startUp.js";

export function eggTimer (info, time) {
    console.log(time);

    wrapper.removeAttribute("id", "wrapper");
    wrapper.setAttribute("id", "eggTimerWrapper");

    wrapper.innerHTML = `
    <div class="choices"></div>
    <div id="timerEgg">
        <div class="inner_circle">
        </div>
    <div class="Timer">
        <p></p>
    </div>
    </div>`

    let timerText = wrapper.querySelector("p");

    let count = time; //time parametern

    let duration = count;
    let progress = 0; 
    let innerCircle = wrapper.querySelector(".inner_circle");

    const gradientStops = `rgba(248, 189, 99, 0) 0%, rgba(248, 189, 99, 0) 0%, rgba(248, 189, 99, 0.5) 0%, rgba(248, 189, 99, 0.5) 100%)`;

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
          clearInterval(timer);
           timerText.textContent = "Färdigt!";
          console.log("Time's up!");
        }
        }, 1000);

    let { size, consistency, temp } = info;
        
    wrapper.querySelector(".choices").innerHTML = `
    <div class="eggSize"> ${size} </div>
    <div class="typeOfEgg"> ${consistency} </div>
    <div class"waterType"> ${temp} </div>`;


}