let wrapper = document.getElementById("wrapper");

// let info = {
//     size: "",
//     temp: "",
//     boiltype: ""
// }
let info = {};
let time;

wrapper.innerHTML = 
`
    <div class="category">
        <h2>Vilken <span>storlek</span> är ägget?</h2>
        <div class="options size">
            <button>S</button>
            <button>M</button>
            <button>L</button>
        </div>
    </div>
   
    <div class="category boiltype">
        <h2><span>Löskokt</span> eller <span>hårdkokt?</span></h2>
        <div class="options boiltype">
            <button>Lös</button>
            <button>Mellan</button>
            <button>Hård</button>
        </div>
    </div>
    
    <div class="category temp">
        <h2>Kallt eller kokande <span>vatten</span>?</h2>
        <div class="options temp">
            <button>Kall</button>
            <button>Kokande</button>
        </div>
    </div>

    <div>
        <h2>Estimated time:</h2>
        <h3 id="time"><span id="minute">0</span>:<span id="seconds">00</span></h3>
        <button>Start</button>
    </div>
`;

// document.querySelectorAll(".options").forEach((optionContainer, index) => {
//     let types = ["size", "boiltype", "temp"];
//     optionContainer.dataset.type = types[index];
// })

let categoryButtons = document.querySelectorAll(".category button");
let minutes = document.getElementById("minute");
let seconds = document.getElementById("seconds");

function datasetButtons (type, infoArray){ // add dataset to buttons
    document.querySelectorAll(`.options.${type} button`).forEach((button, index) => {
        button.dataset.type = type;
        button.dataset.info = infoArray[index];
    })
}
// datasetButtons("size", [47, 57, 67]);
datasetButtons("size", [0.8, 1.0, 1.2]);
// datasetButtons("boiltype", [65, 70, 77]);
datasetButtons("boiltype", [4, 6, 8]);
// datasetButtons("temp", [16, 100]);
datasetButtons("temp", ["cold", "boil"]);

categoryButtons.forEach(button => {
    button.addEventListener("click", e => {
        Array.from(categoryButtons).filter(button => button.dataset.type === e.target.dataset.type).forEach(button => {
            button.style.backgroundColor = "";
            button.style.fontFamily = "";
        })

        e.target.style.backgroundColor = "#CFD4EE";
        e.target.style.fontFamily = "Forma";

        // adds to info obj
        let type = e.target.dataset.type;
        let information = e.target.dataset.info;
        info[type] = information;
        console.log(info);

        // changes time
        time = cookingTime(info);
        if(time/60 % 1 != 0){ // if result has decimal
            let onlyMinutes = Math.floor(time / 60);

            minutes.textContent = onlyMinutes;
            seconds.textContent = time - onlyMinutes * 60;
        } else {
            minutes.textContent = time/60;
            seconds.textContent = "00";
        }
    })
})

function cookingTime(info) {
    let { size = 1.0, temp = "boil", boiltype = 6 } = info;

    const boilingWaterFactor = temp === "boil" ? 1.0 : 1.5;
  
    const adjustmentFactor = size * boilingWaterFactor;
  
    // const cookingTime = boiltype * adjustmentFactor;

    // Calculate the cooking time in seconds
    const cookingTime = Math.round(
        size * boiltype * boilingWaterFactor * 60
    );
  
    return cookingTime;
  }




  