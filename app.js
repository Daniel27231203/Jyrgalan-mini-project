// html
const home = document.querySelector("#home");
const tour = document.querySelector("#tour");
const admin = document.querySelector("#admin");
const homeA = document.querySelector(".a1");
const tourA = document.querySelector(".a2");
const adminA = document.querySelector(".a3");

tourA.addEventListener("click", () => {
  admin.style.display = "none";
  home.style.display = "none";
  tour.style.display = "block";
  tourA.style.color = "red";
  adminA.style.color = "white";
  homeA.style.color = "white";
});
adminA.addEventListener("click", () => {
  admin.style.display = "block";
  home.style.display = "none";
  tour.style.display = "none";

  adminA.style.color = "red";
  tourA.style.color = "white";
  homeA.style.color = "white";
});
homeA.addEventListener("click", () => {
  admin.style.display = "none";
  home.style.display = "block";
  tour.style.display = "none";

  homeA.style.color = "red";
  adminA.style.color = "white";
  tourA.style.color = "white";
});
// html

// admin

const inputImg = document.querySelector(".input1");
const inputName = document.querySelector(".input2");
const inputDes = document.querySelector(".input3");
const inputPrice = document.querySelector(".input4");
const createBtn = document.querySelector(".createBtn");
const saveBtn = document.querySelector(".saveBtn");
const inputs = document.querySelectorAll("input");
const cards = document.querySelector(".cards");
const tourCards = document.querySelector(".tour");

getTour();
getOrder();

createBtn.addEventListener("click", () => addTour());

function addTour() {
  if (
    inputImg.value !== "" &&
    inputName.value !== "" &&
    inputDes.value !== "" &&
    inputPrice.value !== ""
  ) {
    let obj = {
      img: inputImg.value,
      Name: inputName.value,
      description: inputDes.value,
      price: inputPrice.value,
    };
    const local = JSON.parse(localStorage.getItem("tours")) || [];
    local.push(obj);
    localStorage.setItem("tours", JSON.stringify(local));

    for (let i of inputs) {
      i.value = "";
    }
    getTour();
  }
}

function getTour() {
  cards.innerHTML = "";
  const local = JSON.parse(localStorage.getItem("tours")) || [];
  local.forEach((el, idx) => {
    const card = document.createElement("div");
    const imgHome = document.createElement("img");
    const block = document.createElement("div");
    const nameHome = document.createElement("h1");
    const desHome = document.createElement("p");
    const box = document.createElement("div");
    const priceHome = document.createElement("span");
    const dollar = document.createElement("h4");
    const btnBlock = document.createElement("div");
    const orderHome = document.createElement("button");
    const delHome = document.createElement("button");
    const EditHome = document.createElement("button");

    saveBtn.style.display = "none";
    createBtn.style.display = "block";

    card.classList = "card";
    box.classList = "box";
    block.classList = "block";
    btnBlock.classList = "btnBlock";
    EditHome.classList = "EditHome";

    imgHome.src = el.img;

    nameHome.innerHTML = el.Name;
    desHome.innerHTML = el.description;
    priceHome.innerHTML = el.price;
    orderHome.innerHTML = "to Tour";
    delHome.innerHTML = "delete Tour";
    EditHome.innerHTML = "Edit";
    dollar.innerText = "$";

    cards.appendChild(card);
    card.appendChild(imgHome);
    card.appendChild(block);
    block.appendChild(nameHome);
    block.appendChild(desHome);
    block.appendChild(box);
    box.appendChild(priceHome);
    box.appendChild(dollar);
    box.appendChild(btnBlock);
    btnBlock.appendChild(orderHome);
    btnBlock.appendChild(EditHome);
    btnBlock.appendChild(delHome);

    EditHome.addEventListener("click", () => EditData(idx));

    delHome.addEventListener("click", () => delTour(idx));

    orderHome.addEventListener("click", () => addOrder(idx));
  });
}
function EditData(indx) {
  const local = JSON.parse(localStorage.getItem("tours")) || [];
  let oneProduct = local.splice(indx, 1)[0];
  inputImg.value = oneProduct.img;
  inputName.value = oneProduct.Name;
  inputDes.value = oneProduct.description;
  inputPrice.value = oneProduct.price;

  saveBtn.style.display = "block";
  createBtn.style.display = "none";

  inputImg.setAttribute("id", indx);
  inputName.setAttribute("id", indx);
  inputDes.setAttribute("id", indx);
  inputPrice.setAttribute("id", indx);
}

saveBtn.addEventListener("click", () => saveData());

function saveData() {
  let imgINpId = inputImg.id;
  let nameInpId = inputName.id;
  let desINpId = inputDes.id;
  let priceINpId = inputPrice.id;
  // for (let el of inputs) {
  //   let inputId = el.id;
  // }
  let newObj = {
    img: inputImg.value,
    Name: inputName.value,
    description: inputDes.value,
    price: inputPrice.value,
  };
  const local = JSON.parse(localStorage.getItem("tours")) || [];
  local.splice(imgINpId, 1, newObj);
  localStorage.setItem("tours", JSON.stringify(local));
  const a = JSON.parse(localStorage.getItem("tours")) || [];
  a.splice(nameInpId, 1, newObj);
  localStorage.setItem("tours", JSON.stringify(a));
  const b = JSON.parse(localStorage.getItem("tours")) || [];
  b.splice(desINpId, 1, newObj);
  localStorage.setItem("tours", JSON.stringify(b));
  const c = JSON.parse(localStorage.getItem("tours")) || [];
  c.splice(priceINpId, 1, newObj);
  localStorage.setItem("tours", JSON.stringify(c));

  saveBtn.style.display = "none";
  createBtn.style.display = "block";

  for (let i of inputs) {
    i.value = "";
  }

  getTour();
}

function delTour(idn) {
  const local = JSON.parse(localStorage.getItem("tours")) || [];
  local.splice(idn, 1);
  localStorage.setItem("tours", JSON.stringify(local));
  getTour();
  // getOrder();
}

function addOrder(index) {
  const local = JSON.parse(localStorage.getItem("tours")) || [];
  let res = local.splice(index, 1)[0];
  const orderLocal = JSON.parse(localStorage.getItem("order")) || [];
  orderLocal.push(res);
  localStorage.setItem("order", JSON.stringify(orderLocal));

  getOrder();
}

function getOrder() {
  tourCards.innerHTML = "";
  const orderLocal = JSON.parse(localStorage.getItem("order")) || [];
  orderLocal.forEach((el, index) => {
    const tourCard = document.createElement("div");
    const imgOrder = document.createElement("img");
    const nameOrder = document.createElement("h1");
    const desOrder = document.createElement("p");
    const priceOrder = document.createElement("span");
    const delOrder = document.createElement("button");
    const boxInOrder = document.createElement("div");

    tourCard.classList = "tourCard";
    imgOrder.classList = "imgOrder";
    boxInOrder.classList = "boxInOrder";

    imgOrder.src = el.img;
    nameOrder.innerHTML = el.Name;
    priceOrder.innerHTML = el.price;
    desOrder.innerHTML = "$";
    delOrder.innerHTML = "DELETE";

    delOrder.addEventListener("click", () => {
      const orderLocal = JSON.parse(localStorage.getItem("order")) || [];
      orderLocal.splice(index, 1);
      console.log(orderLocal);
      localStorage.setItem("order", JSON.stringify(orderLocal));
      getOrder();
      // getTour();
    });

    tourCards.appendChild(tourCard);
    tourCard.appendChild(imgOrder);
    tourCard.appendChild(nameOrder);
    tourCard.append(boxInOrder);
    boxInOrder.appendChild(priceOrder);
    boxInOrder.appendChild(desOrder);
    boxInOrder.appendChild(delOrder);
  });
  console.log(orderLocal);
}

// admin
