
export const wrapper = document.querySelector("#wrapper");

export function startUp() {
 wrapper.setAttribute("id", "startUpWrapper");

    wrapper.innerHTML = `
    <div class="contentStartUp"> 
    <p> Egg Timer </p>
    <div class="imgStartUp"></div>
     </div>`

    setTimeout(() => {
        wrapper.innerHTML =``;
    }, 4000)   

}

startUp();