//loading buttons
var searchTextArea = document.getElementById('search');
var add = document.getElementById("add");
var save = document.getElementById("download");
var clear = document.getElementById('clear');
var textarea = document.getElementById('textarea');
var index = 0;
var searchimg = new Image();
// searchimg.src = 'https://img.icons8.com/material-outlined/15/000000/search--v2.png';
//var deleteimg = new Image();
//deleteimg.src = 'https://img.icons8.com/material-rounded/15/000000/delete.png';

//add written note to list
add.addEventListener('click', function() { 
  addItemToList();
});

//search what is written on the web
searchTextArea.addEventListener('click', function() {
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

var list = document.getElementById('list');
//functions below
function addItemToList() {

  var button1 = document.createElement('button');
  button1.classList.add("tooltip", "tilebutton", "searchTile");
  //button1.setAttribute('class','tooltip tilebutton searchTile');
 // button1.setAttribute('img',searchimg);
  // var spans = document.createElement('span');
  // spans.setAttribute('class', 'tooltiptext');
  // spans.appendChild(document.createTextNode('soon!'));
  // button1.appendChild(spans);

  //var button2 = document.createElement('button');
  // button2.setAttribute('class','tooltip tilebutton deleteTile');
  // button2.setAttribute('img',deleteimg);
  // button2.appendChild(spans);

  var texts = document.createElement('p');
  var item = document.getElementById("textarea").value;
  texts.innerHTML = item;
  var entry = document.createElement('li');
  entry.appendChild(texts);
  entry.setAttribute('id', 'item'+index);
  var d = new Date();
  var date = "<div id='date'>"+ d.getHours() + ':' + d.getMinutes() + ' '+ d.getDate() + '/' + d.getMonth() + '/' + d.getFullYear() +"</div>";
  var dates = document.createElement('p');
  dates.innerHTML = date;
  entry.appendChild(dates);
  // entry.appendChild(document.createTextNode(texts));
 
 // button1.setAttribute('onclick', 'searchTile("' +'item'+ index +'")');
  // button2.setAttribute('onclick', 'deleteTile("' +'item'+ index +'")');
  entry.appendChild(button1);
  // entry.appendChild(button2);
  
  if (item != "")
    list.appendChild(entry);
  document.getElementById("textarea").value = "";
  localStorage.setItem('listItems', list.innerHTML);
  index += 1;

const buttons = document.querySelectorAll(".searchTile").forEach((button) => {
  button.addEventListener("click", function (event) {
    console.log(event.target);
  });
});

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
    window.open(query);
  }
}

function clearList() {
  localStorage.clear();
  list.innerHTML = "";
  remove = document.getElementsByClassName('deleteTile'); 
}
function searchTile (itemid) {
  var item = document.getElementById(itemid);
  // search(item.getElementsByTagName('p')[0].innerHTML);
  search(item.innerHTML);
}

function deleteTile(itemid) {
  var item = document.getElementById(itemid);
  list.removeChild(item);
}