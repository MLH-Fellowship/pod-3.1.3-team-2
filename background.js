chrome.runtime.onInstalled.addListener(() => {
    
});

//lists items that should be added to list when popup opens
let itemsToAdd = [];

//listener for highlight and popup open
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
    if (request.text == "popup opened") {
        console.log("sent retrievable items")
        chrome.runtime.sendMessage({retrieve: "retrieve", itemsToAdd: itemsToAdd});
    } else {
        console.log("adding items to list");
        itemsToAdd.push(request.selection);
        console.log(itemsToAdd);
    }
});