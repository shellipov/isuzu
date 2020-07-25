
const sum = document.querySelector(".sum");
const selected = document.querySelectorAll('.select')
const buttonSum = document.getElementById('buttonSum')
const smallImage = document.getElementById('smallImage')


let engine = selected[0].options[selected[0].selectedIndex].text;
let carcass = selected[1].options[selected[1].selectedIndex].text;
let transmission = selected[2].options[selected[2].selectedIndex].text;
let color = selected[3].options[selected[3].selectedIndex].text;



  buttonSum.addEventListener("click", async (event) => { 
    event.preventDefault();   
    let name = selected[0].options[selected[0].selectedIndex].text;
    let engine = selected[1].options[selected[1].selectedIndex].text;
    let carcass = selected[2].options[selected[2].selectedIndex].text;
    let transmission = selected[3].options[selected[3].selectedIndex].text;
    let color = selected[4].options[selected[4].selectedIndex].text;  
    const response = await fetch("/configurator/getSum", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        engine,
        carcass,
        transmission,
        color,
      }),
    });
    let responseObj = await response.json();

    sum.innerText = `Стоимость: ${responseObj.price} Руб.`;
    console.log(responseObj);
    smallImage.src = `${responseObj.image}`

    document.getElementById("total").value = responseObj.price
  });




// const engineImport = document.getElementById("engine");
// const carcassImport = document.getElementById("carcass");
// const transmittionImport = document.getElementById("transmission");
// const colorImport = document.getElementById("color");
// let engine = engineImport.options[engineImport.selectedIndex].text;
// let carcass = carcassImport.options[carcassImport.selectedIndex].text;
// let transmittion = transmittionImport.options[transmittionImport.selectedIndex].text;
// let color = colorImport.options[colorImport.selectedIndex].text;
// sum.innerText = `${engine + carcass + transmittion + color}`;




// document.getElementById("addoption").addEventListener("submit", (event) => {
//   event.preventDefault();
//   console.log(event);
// });
