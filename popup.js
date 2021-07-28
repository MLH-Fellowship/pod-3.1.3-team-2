
//load buttons
function addItemToList() {
  var item = document.getElementById("textarea").value;
  var list = document.getElementById('list');
  if(item != ""){
    list.innerHTML += "<li>" + item + "</li>";
  }
  chrome.storage.local.set({'user_list': list.innerHTML}, function(){
    console.log(list.innerHTML)
  });
}

function deleteList() {
  var list = document.getElementById("list");
    list.innerHTML = "";
}

function saveList(data, filename, type){
  var file = new Blob([data], {type: type});
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
        var a = document.createElement("a"),
                url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);  
        }, 0); 
    }
}

function restoreList() {
  chrome.storage.local.get(['user_list'], function(data){
    var list = document.getElementById('list');
    list.value = data.list;
    console.log("list restored: "+ data.list);
  });
};

//
document.addEventListener('DOMContentLoaded', function() {
  restoreList();
});

var search = document.getElementById('search');
var add = document.getElementById("add");
var save = document.getElementById("save");
var del = document.getElementById('delete');

add.addEventListener('click', function (event) { 
  addItemToList();// Add code - for you call function 
});

  // onClick's logic below:
search.addEventListener('click', function() {
    //there is no need to declare a new function here.
    var input = document.getElementById("textarea").value;
    var query = 'https://www.google.com/search?q=' + encodeURIComponent(input);
    if (input!="")
      window.open(query);
});

save.addEventListener('click', function(){
  var list = document.getElementById("list").value;
  saveList(list, 'list.txt', 'text/plain');
})

del.addEventListener('click', function (){
  deleteList();
})


//for debugging, prints when changes in storage happen.
//it seems like when we close tab local storage is gone.
//i dont understand what's going on. pls help
chrome.storage.onChanged.addListener(function (changes, namespace) {
  console.log(changes, namespace);
})