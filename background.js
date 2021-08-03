chrome.runtime.onInstalled.addListener(() => {

});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
    console.log(sender.tab ?
        "from a content script:" + sender.tab.url :
        "from the extension");
        addItemToList(request.greeting);
})

//working on highlight
getTab().then(function(tab){
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: inject,
  })
  });
  
  //get active tab
  async function getTab(){
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    return tab
  }
  
  //function to inject
  function inject(){
      // her might be the issue, function stops working here which means up to here we know that
      // function is stored in the HTML file.
    
      document.addEventListener('mouseup', function(event){
      console.log(event)
      let selection = event.target.value.substring(event.target.selectionStart, event.target.selectionEnd);
      chrome.runtime.sendMessage({greeting: selection}, function(response) {
        console.log(response);
      });
  });
}
