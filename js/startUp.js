import { renderMainPage } from "./stepsV2.js";

export const wrapper = document.querySelector("#wrapper");

export function startUp() {
 wrapper.setAttribute("id", "startUpWrapper");

    wrapper.innerHTML = `
    <div class="contentStartUp"> 
     </div>`

    setTimeout(() => {
       // wrapper.innerHTML =``;
       renderMainPage();
    }, 4000)   

}

//startUp();