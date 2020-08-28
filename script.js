const draggable_list = document.getElementById("draggable-list");
const check = document.getElementById("check");

const richestPeople = [
  "Jeff Bezos",
  "Bill Gates",
  "Mark Zuckerberg",
  "Bernard Arnault",
  "Mukesh Ambani",
  "Steve Ballmer",
  "Warren Buffett",
  "Larry Page",
  "Elon Musk",
  "Sergey Brin",
];
//Store listitems
const listItems = [];

let dragStartIndex;

createList();

//Insert list item into DOM
function createList() {
  [...richestPeople]
    .map((a) => ({ value: a, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .forEach((person, index) => {
      const listItem = document.createElement("li");

      listItem.setAttribute("data-index", index);
      listItem.innerHTML = `
        <span class="number">${index + 1}</span>
        <div class="draggable" draggable="true">
        <p class="person-name">${person.value}</p>
        <i class="fas fa-grip-lines"></i>
        </div>        
        `;
      listItems.push(listItem);
      draggable_list.append(listItem);
    });
  addEventListener();
}
function dragStart() {
  dragStartIndex = +this.closest("li").getAttribute("data-index");
}
function dragOver(e) {
  e.preventDefault();
}
function dragDrop() {
  const dragEndIndex = +this.getAttribute("data-index");
  swapItems(dragStartIndex, dragEndIndex);
  this.classList.remove("over");
}

function swapItems(dragStartIndex, dragEndIndex) {
  const itemOne = listItems[dragStartIndex].querySelector(".draggable");
  const itemTwo = listItems[dragEndIndex].querySelector(".draggable");

  listItems[dragStartIndex].appendChild(itemTwo);
  listItems[dragEndIndex].appendChild(itemOne);
}

function dragEnter() {
  this.classList.add("over");
}
function dragLeave() {
  this.classList.remove("over");
}

//check the order of list items
function checkOrder() {
  listItems.forEach((listItem, index) => {
    const personName = listItem.querySelector(".draggable").innerText.trim();
    if (personName !== richestPeople[index]) {
      listItem.classList.add("wrong");
    } else {
      listItem.classList.remove("wrong");
      listItem.classList.add("right");
    }
  });
}

//main
function addEventListener() {
  const draggables = document.querySelectorAll(".draggable");
  const dragListItems = document.querySelectorAll(".draggable-list li");
  draggables.forEach((draggable) => {
    draggable.addEventListener("dragstart", dragStart);
  });
  dragListItems.forEach((item) => {
    item.addEventListener("dragover", dragOver);
    item.addEventListener("drop", dragDrop);
    item.addEventListener("dragenter", dragEnter);
    item.addEventListener("dragleave", dragLeave);
  });
}

check.addEventListener("click", checkOrder);
