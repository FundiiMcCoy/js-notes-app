//Declare variables
const notesContainer = document.querySelector(".notes-container");
const createBtn = document.querySelector(".btn");
let notes = document.querySelectorAll(".input-box");


//function to check local storage /show notes
function showNotes() {
  notesContainer.innerHTML = localStorage.getItem("notes");
}
showNotes();
//function to update local storage
function updateStorage() {
  localStorage.setItem("notes", notesContainer.innerHTML);
}

//function to create note
createBtn.addEventListener("click", () => {
  let inputBox = document.createElement("p");
  let img = document.createElement("img");
  inputBox.className = "input-box";
  inputBox.setAttribute("contenteditable", "true");
  img.src = "images/delete.png";
  notesContainer.appendChild(inputBox).appendChild(img);
})
//function to delete note when clicking on delete img
notesContainer.addEventListener("click", function (e) {
  if (e.target.tagName === "IMG") {
    e.target.parentElement.remove();
    updateStorage()
  }
  //condition that if something is being typed in the P tag then local storage will get updated for each letter
  else if (e.target.tagName === "P") {
    notes = document.querySelectorAll(".input-box");
    notes.forEach(nt => {
      nt.onkeyup = function () {
        updateStorage();
      }
    })
  }
})
//function to insert linebreak in the inputbox and prevent default of the enter key
document.addEventListener("keydown", event => {
  if (event.key === "Enter") {
    // Insert a line break
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    const br = document.createElement("br");
    range.deleteContents();
    range.insertNode(br);
    range.setStartAfter(br);
    range.collapse(true);
    selection.removeAllRanges();
    selection.addRange(range);
    event.preventDefault();
  }
});
