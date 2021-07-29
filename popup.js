//loading buttons
var searchTextArea = document.getElementById('search');
var add = document.getElementById("add");
var save = document.getElementById("download");
var clear = document.getElementById('clear');
var textarea = document.getElementById('textarea');
var index = 0;
var buttons = `<button class="tooltip tilebutton" onclick='searchTile(this)'><img src="https://img.icons8.com/material-outlined/15/000000/search--v2.png"/></a>
<span class="tooltiptext">search</span></button>
<button class="tooltip tilebutton" onclick='deleteTile(this)'><img src="https://img.icons8.com/material-rounded/15/000000/delete.png"/></a>
<span class="tooltiptext">delete</span></button>`;


//restoring localStorage
var saved = localStorage.getItem('listItems');
var note = localStorage.getItem('note');

if (saved) {
	list.innerHTML = saved;
}
if (note){
  textarea.innerHTML = note;
}

//add written note to list
add.addEventListener('click', function (event) { 
  addItemToList();
});

//search what is written on the web
searchTextArea.addEventListener('click', function(event) {
    search(document.getElementById("textarea").value);
});


//donwload list as an html file
save.addEventListener('click', function(){
  downloadToFile();
});

//clear list
clear.addEventListener('click', function(){
  clearList();
});


//functions below
function addItemToList() {
  var item = document.getElementById("textarea").value;
  var list = document.getElementById('list');
  var d = new Date();
  var date = "<div id='date'>"+ d.getHours() + ':' + d.getMinutes() + ' '+ d.getDate() + '/' + d.getMonth() + '/' + d.getFullYear() +"</div>";
  // var buttons = <div>
  var listItem = "<li id='tile" + index + "'><p contentEditable='true'>" + item + "</p>" + date + buttons + "</li>";
  index += 1;
  if(item != "")
    list.innerHTML = listItem + list.innerHTML;
  document.getElementById("textarea").value = "";
  localStorage.setItem('listItems', list.innerHTML);
}

function downloadToFile() {
  var list = document.getElementById('list');
  const textToBLOB = new Blob([list.innerHTML], { type: 'text/plain' });
  const fileName = 'List.html';	   // The file to save the data.

  let newLink = document.createElement("a");
  newLink.download = fileName;
  if (window.webkitURL != null) {
    newLink.href = window.webkitURL.createObjectURL(textToBLOB);
  }
  else {
    newLink.href = window.URL.createObjectURL(textToBLOB);
    newLink.style.display = "none";
    document.body.appendChild(newLink);
  }
newLink.click();
}

function search(input){
  var query = 'https://www.google.com/search?q=' + encodeURIComponent(input);
  if (input!=""){
    localStorage.setItem('note', input);
    window.open(query);
  }
}

function clearList() {
  localStorage.clear();
  list.innerHTML = "";
}

//limited to tiles function (they are being called on the html onclick attribute)
function searchTile(event){
  search(event.parentNode.innerText);
}

function deleteTile(event) {
  localStorage.clear();
  event.parentNode.outerHTML = "";
  var list = document.getElementById('list');
  localStorage.setItem('listItems', list.innerHTML);
}

