const newPadBtn = document.querySelector(".new-pad");
const randomColorBtn = document.querySelector(".random-colors");
const selectedColor = document.querySelector("#color-picker");
const greyScaleBtn = document.querySelector(".grey-scale");
const border = document.querySelector(".border");

let blocksPerSide = 16;
let totalBlocks = blocksPerSide * blocksPerSide;
let pad = null;
let block = null;
let color = "default";

function draw(block, a) {
  const blockStyle = block.target.style;
  if (color === "default") {
    blockStyle.background = "black";
  } else if (color === "random") {
    const r = Math.floor(Math.random() * 255) + 1;
    const g = Math.floor(Math.random() * 255) + 1;
    const b = Math.floor(Math.random() * 255) + 1;
    const randomColor = `rgb(${r}, ${g}, ${b})`;
    if (blockStyle.background === "white") {
      blockStyle.background = randomColor;
    }
  } else if (color === "greyScale") {
    blockStyle.background = `rgb(0, 0,0, ${a})`;
  } else {
    blockStyle.background = color;
  }
  blockStyle.transition = "1.5s";
}

function createBlocks(blocksPerSide) {
  pad = document.createElement("div");
  pad.classList.add("pad");
  border.append(pad);
  for (let i = 0; i < totalBlocks; i++) {
    block = document.createElement("div");
    block.setAttribute(
      "style",
      `width: calc(300px / ${blocksPerSide}); 
      height: calc(300px/${blocksPerSide}); 
      background:white;`
    );
    block.setAttribute("id", "block");
    let a = 0;
    block.addEventListener(
      "mouseover",
      (e) => {
        a = a + 0.1;
        draw(e, a);
      },
      { once: false }
    );
    pad.appendChild(block);
  }
}

window.addEventListener("keydown", (e) => {
  e.preventDefault();
});

function makeDrawable() {
  document.querySelectorAll("#block").forEach((block) =>
    block.addEventListener(
      "mouseover",
      (e) => {
        draw(e);
      },
      { once: false }
    )
  );
}

createBlocks(blocksPerSide);

newPadBtn.addEventListener("click", (e) => {
  blocksPerSide = parseInt(
    window.prompt(
      "Please enter a number from 0 to 100 to generate number of blocks per side!"
    )
  );
  totalBlocks = blocksPerSide * blocksPerSide;
  border.lastElementChild.remove();
  createBlocks(blocksPerSide);
});

randomColorBtn.addEventListener("click", (e) => {
  color = "random";
});

selectedColor.addEventListener("change", (e) => (color = e.target.value));

greyScaleBtn.addEventListener("click", (e) => {
  color = "greyScale";
});
