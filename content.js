
    // her might be the issue, function stops working here which means up to here we know that
    // function is stored in the HTML file.
    document.addEventListener('mouseup', function(event){
    console.log(event)
    let selection = "hello";
    // let selection = event.target.value.substring(event.target.selectionStart, event.target.selectionEnd);
    chrome.runtime.sendMessage({greeting: selection}, function(response) {
      console.log(response);
    });
});

