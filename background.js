chrome.runtime.onInstalled.addListener(() => {
    
});

let itemsToAdd = [];
//listener for highlight
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
    if (request.text == "popup opened") {
        console.log("sent retrievable items")
        chrome.runtime.sendMessage({retrieve: "retrieve", itemsToAdd: itemsToAdd});
    } else {
        console.log("adding items to list")
        itemsToAdd.push(request.selection);
        console.log(itemsToAdd);
    }
});