document.getElementById("initialPartition").style.backgroundColor =
  randomBackgroundColor();

const randomBackgroundColor = () => {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
};

const splitPartition = (direction, partition) => {
  const first = document.createElement("div");
  const second = document.createElement("div");

  first.classList.add("partition");
  second.classList.add("partition");

  first.style.backgroundColor = randomBackgroundColor();
  second.style.backgroundColor = randomBackgroundColor();

  if (direction === "V") {
    partition.style.flexDirection = "row";
    first.style.width = "50%";
    first.style.height = "100%";
    second.style.width = "50%";
    second.style.height = "100%";
  } else {
    partition.style.flexDirection = "column";
    first.style.width = "100%";
    first.style.height = "50%";
    second.style.width = "100%";
    second.style.height = "50%";
  }

  partition.innerHTML = ""; // Clear existing content
  partition.appendChild(first);
  partition.appendChild(second);
  addResizer(first, direction);
  addResizer(second, direction);

  addControls(first);
  addControls(second);
};

const addControls = (partition) => {
  const btnControl = document.createElement("div");
  btnControl.classList.add("partition-btns");

  const buttonV = document.createElement("button");
  buttonV.textContent = "V";
  buttonV.onclick = () => splitPartition("V", partition);

  const buttonH = document.createElement("button");
  buttonH.textContent = "H";
  buttonH.onclick = () => splitPartition("H", partition);

  const buttonRemove = document.createElement("button");
  buttonRemove.textContent = "-";
  buttonRemove.onclick = () => removePartition(partition);

  btnControl.appendChild(buttonV);
  btnControl.appendChild(buttonH);
  btnControl.appendChild(buttonRemove);

  partition.appendChild(btnControl);
};

const addResizer = (partition, direction) => {
  const resizer = document.createElement("div");
  resizer.classList.add(
    "resizer",
    direction === "V" ? "vertical" : "horizontal"
  );
  resizer.addEventListener("mousedown", initResize);
  partition.appendChild(resizer);
};

const initResize = (e) => {
  const resizer = e.target;
  const isVertical = resizer.classList.contains("vertical");
  const partition = resizer.parentElement;

  let startX = e.clientX;
  let startY = e.clientY;
  let initialWidth = partition.offsetWidth;
  let initialHeight = partition.offsetHeight;

  const mouseMoveHandler = (e) => {
    if (isVertical) {
      let deltaX = e.clientX - startX;
      partition.style.width = initialWidth + deltaX + "px";
    } else {
      let deltaY = e.clientY - startY;
      partition.style.height = initialHeight + deltaY + "px";
    }
  };

  const mouseUpHandler = () => {
    window.removeEventListener("mousemove", mouseMoveHandler);
    window.removeEventListener("mouseup", mouseUpHandler);
  };

  window.addEventListener("mousemove", mouseMoveHandler);
  window.addEventListener("mouseup", mouseUpHandler);
};

function removePartition(partition) {
  const parent = partition.parentElement;
  parent.removeChild(partition);

  if (parent.children.length === 0) {
    const btnControl = document.createElement("div");
    btnControl.classList.add("partition-btns");

    const buttonV = document.createElement("button");
    buttonV.textContent = "V";
    buttonV.onclick = () => splitPartition("V", parent);

    const buttonH = document.createElement("button");
    buttonH.textContent = "H";
    buttonH.onclick = () => splitPartition("H", parent);

    btnControl.appendChild(buttonV);
    btnControl.appendChild(buttonH);

    parent.appendChild(btnControl);
  }
}
