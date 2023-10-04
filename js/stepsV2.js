import { eggTimer } from "./timer.js";
import { startUp } from "./startUp.js";
import { main } from "./startUp.js";


// let info = {
//     size: "",
//     temp: "",
//     consistency: ""
// 
renderMainPage();

export function renderMainPage (){
    document.getElementById("cssSwitch").setAttribute("href", "css/steps.css");

    let main = document.querySelector("main"); //ska tas bort när appen ska köras från startPage

    main.setAttribute("id", "wrapper");

let info = {};
let time;

main.innerHTML = 
`
    <div class="category size">
        <h2>Vilken <span>storlek</span> är ägget?</h2>
        <div class="options size">
            <img id="S" src="./Media/eggTimerShape.png"></img>
            <img id="M" src="./Media/eggTimerShape.png"></img>
            <img id="L" src="./Media/eggTimerShape.png"></img>
        </div>
    </div>
   
    <div class="category consistency">
        <h2><span>Löskokt</span> eller <span>hårdkokt?</span></h2>
        <div class="options consistency">
            <button>Lös</button>
            <button>Mellan</button>
            <button>Hård</button>
        </div>
    </div>
    
    <div class="category temp">
        <h2>Kallt eller kokande <span>vatten</span>?</h2>
        <div class="options temp">
            <button>Kallt</button>
            <button>Kokande</button>
        </div>
    </div>

        <div>
            <h2 id="estimate">Beräknad tid:</h2>
            <h3 id="time"><span id="minute">6</span>:<span id="seconds">00</span></h3>
            <button id="start">Start</button>
        </div>
        `;


let categoryButtons = document.querySelectorAll(".options > *");
let minutes = document.getElementById("minute");
let seconds = document.getElementById("seconds");
let timeDOM = document.getElementById("time");



function datasetButtons (type, infoArray){ // add dataset to buttons
    document.querySelectorAll(`.options.${type} > *`).forEach((button, index) => {
        button.dataset.type = type;
        button.dataset.info = infoArray[index];
        })
    }
    // datasetButtons("size", [47, 57, 67]);
    datasetButtons("size", [0.8, 1.0, 1.2]);
    // datasetButtons("consistency", [65, 70, 77]);
    datasetButtons("consistency", [4, 6, 8]);
    // datasetButtons("temp", [16, 100]);
    datasetButtons("temp", ["Kallt", "Kokande"]);

    let avgCookTime = cookingTime({ size: 1.0, temp: "Kokande", consistency: 6 });
    timeDOM.dataset.time = JSON.stringify({full: avgCookTime,
                            minutes: Math.floor(avgCookTime / 60),
                            seconds: avgCookTime - Math.floor(avgCookTime / 60) * 60});

    categoryButtons.forEach(button => {
        button.addEventListener("click", e => {
            minutes.classList.remove("top");
            seconds.classList.remove("top");
            minutes.classList.remove("bottom");
            seconds.classList.remove("bottom");

        Array.from(categoryButtons).filter(button => button.dataset.type === e.target.dataset.type).forEach(button => {
            button.style.backgroundColor = "";
            button.style.fontFamily = "";
            button.classList.remove("clicked");
        })
        
        if (e.target.dataset.type === "size"){
            e.target.classList.add("clicked");
        } else {
            e.target.style.backgroundColor = "#BBC2E8";
            e.target.style.fontFamily = "Forma";
        }

            // adds to info obj
            let type = e.target.dataset.type;
            let information = e.target.dataset.info;
            info[type] = information;

            // changes time

        let formerTime = JSON.parse(timeDOM.dataset.time);
        time = cookingTime(info);
        let onlyMinutes = Math.floor(time / 60);
        let onlySeconds = time - onlyMinutes * 60;

        let timeDatasetBody = {full: time,
                            minutes: onlyMinutes,
                            seconds: onlySeconds};
        timeDOM.dataset.time = JSON.stringify(timeDatasetBody);
        if(!formerTime.full !== time){
            if (formerTime.minutes < onlyMinutes){ // checks minutes
                firstSlide(minutes, "bottom");
            } else if (formerTime.minutes > onlyMinutes){
                firstSlide(minutes, "top");
            }

            if (formerTime.seconds === 0 && time/60 % 1 === 0){
                
            } else if(formerTime.seconds < onlySeconds) { // checks seconds
                firstSlide(seconds, "bottom");
            } else if (formerTime.seconds > onlySeconds){
                firstSlide(seconds, "top");
            } 
        }

            setTimeout(() => {
                if (minutes.style.bottom) {
                    secondSlide(minutes, "bottom");
                } else if (minutes.style.top){
                    secondSlide(minutes, "top");
                }

                if (seconds.style.bottom) {
                    secondSlide(seconds, "bottom");
                } else if (seconds.style.top){
                    secondSlide(seconds, "top");
                }

                if(time/60 % 1 != 0){ // if result has decimal
                    let onlyMinutes = Math.floor(time / 60);

                    minutes.textContent = onlyMinutes;
                    seconds.textContent = time - onlyMinutes * 60;
                } else {
                    minutes.textContent = time/60;
                    seconds.textContent = "00";
                }
            }, 300)
        })
    })


    document.getElementById("start").addEventListener("click", () => {
        let neededKeys = ["size", "consistency", "temp"];

        if(!neededKeys.every(key => Object.keys(info).includes(key))){
            document.getElementById("start").textContent = "Välj i varje kategori";
            document.getElementById("start").style.backgroundColor = "#F58465";

        setTimeout(() => {
            document.getElementById("start").textContent = "Start";
            document.getElementById("start").style.backgroundColor = "";
        }, 1000);
    
    } else {
        let sizes = ["0.8", "1", "1.2"];
        let alteredSizes = ["Small", "Medium", "Large"];
        sizes.forEach((sizeValue, index) => {
            if (sizeValue === info.size) {
                info.size = alteredSizes[index];
            }
        });
        let consistencies = ["4", "6", "8"];
        let alteredConsistencies = ["Lös", "Medium", "Hård"];
        consistencies.forEach((consistencyValue, index) => {
            if (consistencyValue === info.consistency){
                info.consistency = alteredConsistencies[index];
            }
        })
    
        let whiteScreen = document.createElement("div");
        whiteScreen.id = "whiteScreen";
        document.querySelector("body").append(whiteScreen);
        setTimeout(() => {whiteScreen.style.opacity = "1";}, 300);
        setTimeout(() => {eggTimer(info, time)}, 1000);
        
        // eggTimer(info, time);
    }
})

}


function cookingTime(info) {
    let { size = 1.0, temp = "Kokande", consistency = 6 } = info;

    const boilingWaterFactor = temp === "Kokande" ? 1.0 : 1.5;
  
    const adjustmentFactor = size * boilingWaterFactor;
  
    // const cookingTime = consistency * adjustmentFactor;

    // Calculate the cooking time in seconds
    const cookingTime = Math.round(
        size * consistency * boilingWaterFactor * 60
    );
  
    return cookingTime;
  }

function firstSlide (type, way){
    type.classList.add(way); 
    if (way === "bottom"){
        setTimeout(() => type.style.bottom = "50px", 100);
        setTimeout(() => {type.style.transition = "0s"; type.style.bottom = "-50px"}, 300);
    } else if (way === "top"){
        setTimeout(() => type.style.top = "50px", 100);
        setTimeout(() => {type.style.transition = "0s"; type.style.top = "-50px"}, 300);
    }
}
function secondSlide (type, way){
    if (way === "bottom"){
        setTimeout(() => {type.style.transition = "0.3s"; type.style.bottom = ""}, 300);
    } else if (way === "top"){
        setTimeout(() => {type.style.transition = "0.3s"; type.style.top = ""}, 300);
    }
}






  