import { renderMainPage } from "./stepsV2.js";

export const main = document.querySelector("main");

export function startUp() {
   document.getElementById("cssSwitch").setAttribute("href", "css/startUp.css");
 main.setAttribute("id", "startUpWrapper");

    main.innerHTML = `
    <div class="contentStartUp"> 
     </div>`

    setTimeout(() => {
       // wrapper.innerHTML =``;
       renderMainPage();
    }, 4000)   

}

startUp();