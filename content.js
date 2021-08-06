var s = document.createElement('script');
s.src = chrome.runtime.getURL('script.js');
(document.head||document.documentElement).appendChild(s);
s.onload = function() {
    console.log("pushed script");
};

window.addEventListener("message", function(event){
    if (event.data.type && (event.data.type == "FROM_PAGE") && typeof chrome.app.isInstalled !== 'undefined'){
        console.log(event.data)
        chrome.runtime.sendMessage({selection: event.data.selection})
    }
}, false);