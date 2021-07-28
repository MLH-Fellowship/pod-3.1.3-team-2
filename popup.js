
function gettext() {
  var ele = document.getElementById("textarea").value;
  var lists = document.getElementById('list');
  if(ele!="")
    lists.innerHTML += "<li>" + ele + "</li>";
}

document.addEventListener('DOMContentLoaded', function() {
  var link = document.getElementById('link');
  // onClick's logic below:
  link.addEventListener('click', function() {

      //there is no need to declare a new function here.

      var one = document.getElementById("textarea").value;
      var two = 'https://www.google.com/search?q=' + encodeURIComponent(one);
      if (one!="")
        window.open(two);
  });
});

document.getElementById("save").addEventListener('click', function (event) { 
  gettext();// Add code - for you call function 
});