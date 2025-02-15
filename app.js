const colorInputEl = document.getElementById("color-input");
const selectInputEl = document.getElementById("select-input");
const colorButtonEl = document.getElementById("color-btn");
const mainContainerEl = document.getElementById("main-container");
let colorInput = colorInputEl.value.split("#").join("");
let userSchemeModSelection = selectInputEl.value;
let colorsArray = [];

colorButtonEl.addEventListener("click", function () {
  colorInput = colorInputEl.value.split("#").join("");
  userSchemeModSelection = selectInputEl.value;
  console.log(colorInput);
  console.log(userSchemeModSelection);

  fetchData();
});

mainContainerEl.addEventListener("click", function (e) {
  if(e.target.tagName === 'P'){
    const text = document.getElementById(e.target.id).textContent;
    console.log(text);

  navigator.clipboard
    .writeText(text)
    .then(() => {
      alert("Text copied to clipboard!");
    })
    .catch((err) => {
      console.error("Failed to copy text: ", err);
    });
  }
});

function fetchData() {
  fetch(
    `https://www.thecolorapi.com/scheme?hex=${colorInput}&mode=${userSchemeModSelection}&count=5`
  )
    .then((res) => res.json())
    .then((data) => {
      data.colors.forEach(function (color) {
        colorsArray.push(color.hex.value);
      });
      console.log(colorsArray);
      renderColorsTable(colorsArray);
      colorsArray = [];
    });
}

function print(arr) {
  for (let item of arr) {
    console.log(item);
  }
}

function renderColorsTable() {
  let htmlString = "";
  for (let i = 0; i < colorsArray.length; i++) {
    htmlString += `
        <div class="box">
          <div class="painted-box" id="painted-box${i}" style="background-color:${colorsArray[i]};"></div>
          <p id="${colorsArray[i]}">${colorsArray[i]}</p>
        </div>
    `;
  }

  mainContainerEl.innerHTML = htmlString;
}

