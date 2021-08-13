var searchTextArea = document.getElementById("search");
var add = document.getElementById("add");
var download = document.getElementById("download");
var clear = document.getElementById("clear");
var textarea = document.getElementById("textarea");
var saved = localStorage.getItem('listItems');
var list = document.getElementById('list');
var dbsave = document.getElementById('save');
var dbretrieve = document.getElementById('retrieve');
var server = 'http://172.104.215.22:3000/';
var username = 'lucas';
var index = 0;
var highlightButton = document.getElementById("highlightButton");
highlightButton.id = localStorage.getItem("color");


if (saved) {
	list.innerHTML = saved;
  assignButton();
}

// tells background.js that it opened
chrome.runtime.sendMessage({text: "popup opened"});
highlightButton.addEventListener("click", function() {
    if (highlightToggle) {
        highlightToggle = false;
        highlightButton.id = 'highlightOff';
        localStorage.setItem("state", highlightToggle);
        localStorage.setItem("color", highlightButton.id);
        console.log("Off");
    }
    else {
        highlightToggle = true;
        highlightButton.id = 'highlightOn';
        localStorage.setItem("state", highlightToggle);
        localStorage.setItem("color", highlightButton.id);
        console.log("On");
    }
    
});


//add written note to list
add.addEventListener("click", function () {
    addItemToList(document.getElementById('textarea').value);
});

//search what is written on the web
searchTextArea.addEventListener("click", function () {
    search(document.getElementById("textarea").value);
});

//donwload list as an html file
download.addEventListener("click", function () {
    downloadToFile();
});

//clear list
clear.addEventListener("click", function () {
    clearList();
});

//donwload list as an html file
dbsave.addEventListener("click", function () {
    saveDB();
});

//clear list
dbretrieve.addEventListener("click", function () {
    retrieveDB();
});

if (highlightToggle) {
// retrieves items stored in background.js
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
        if (request.retrieve == "retrieve") {
            console.log("received retrievable items")
            request.itemsToAdd.forEach(function(item){
                addItemToList(item);
            })
        }
    });
}

function addItemToList(item) {
    // Button 1
    var button1 = document.createElement("button");
    button1.classList.add("tooltip", "tilebutton", "searchTile");
    var spans = document.createElement("span");
    spans.classList.add("tooltiptext");
    spans.appendChild(document.createTextNode("Search Note"));
    button1.appendChild(spans);

    // Button 2
    var button2 = document.createElement("button");
    button2.classList.add("tooltip", "tilebutton", "deleteTile");
    var spans = document.createElement("span");
    spans.classList.add("tooltiptext");
    spans.appendChild(document.createTextNode("Delete Note"));
    button2.appendChild(spans);

    var texts = document.createElement("p");
    texts.contentEditable = true;
    texts.classList.add("editable");
    texts.innerHTML = item;
    var entry = document.createElement("li");
    entry.appendChild(texts);
    entry.setAttribute("id", "item" + index);
    var d = new Date();
    var date =
        "<div id='date'>" +
        d.getHours() +
        ":" +
        d.getMinutes() +
        " " +
        d.getDate() +
        "/" +
        d.getMonth() +
        "/" +
        d.getFullYear() +
        "</div>";
    var dates = document.createElement("p");
    dates.innerHTML = date;
    entry.appendChild(dates);
    // entry.appendChild(document.createTextNode(texts));

    // Button 1
    var searchimg = document.createElement("img");
    searchimg.src = "/images/search.png";
    entry.appendChild(button1);
    button1.appendChild(searchimg);

    // Button 2
    var deleteimg = document.createElement("img");
    deleteimg.src = "/images/delete.png";
    entry.appendChild(button2);
    button2.appendChild(deleteimg);

    if (item != "") list.appendChild(entry);
    document.getElementById("textarea").value = "";
    localStorage.setItem("listItems", list.innerHTML);
    index += 1;

    assignButton();   
}

function assignButton() {
  document.querySelectorAll(".searchTile").forEach((button) => {
    button.addEventListener("click", function (event) {
        search(event.target.parentNode.parentNode.firstElementChild.innerHTML);
    });
  });

  document.querySelectorAll(".deleteTile").forEach((button) => {
    button.addEventListener("click", function (event) {
        event.target.parentNode.parentNode.remove();
        localStorage.setItem("listItems", list.innerHTML);
    });
  });
  document.querySelectorAll(".editable").forEach((text) => {
    text.addEventListener("input", function () {
      localStorage.setItem("listItems", list.innerHTML); 
    });
  });
}

function downloadToFile() {
    var list = document.getElementById("list");
    const textToBLOB = new Blob([list.innerHTML], { type: "text/plain" });
    const fileName = "List.html"; // The file to save the data.

    let newLink = document.createElement("a");
    newLink.download = fileName;
    if (window.webkitURL != null) {
        newLink.href = window.webkitURL.createObjectURL(textToBLOB);
    } else {
        newLink.href = window.URL.createObjectURL(textToBLOB);
        newLink.style.display = "none";
        document.body.appendChild(newLink);
    }
    newLink.click();
}

function search(input) {
    var query = "https://www.google.com/search?q=" + encodeURIComponent(input);
    if (input != "") {
        window.open(query);
    }
}

function clearList() {
    localStorage.clear();
    list.innerHTML = "";
}

//database build

function saveDB(){
    list = document.getElementById('list');
    fetch(server, { method: 'PUT', body: {username: username, list: list}}).then(function(response){
        console.log(response)
    })
}

async function retrieveDB(){
    let retrieved = await fetch(server, { method: 'GET'}).then(function(response){
        return response.json()
    })
    console.log(retrieved.db_response[0].list)
    document.getElementById('list').innerHTML = retrieved.db_response[0].list;
}


