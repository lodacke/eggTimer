import { renderMainPage } from "./stepsV2.js";

export const main = document.querySelector("main");

export function startUp() {
   document.getElementById("cssSwitch").setAttribute("href", "css/startUp.css");
   main.setAttribute("id", "startUpWrapper");

    main.innerHTML = `
    <div class="contentStartUp"> 
     </div>`

    setTimeout(() => {
      let whiteScreen = document.getElementById("whiteScreen");
      whiteScreen.style.display = "block";
      setTimeout(() => {whiteScreen.style.opacity = "1";}, 100);
      setTimeout(renderMainPage, 400);
    }, 4000)   

}

startUp();