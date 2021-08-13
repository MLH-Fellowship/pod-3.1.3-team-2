// must be set to the deployed extension id
var extensionId = "kceigiddpaljlijiapkhhgglajgfnjgc";

// injected script. Will extract text and postmessage so content script can read
  document.addEventListener('mouseup', function(){
    let selection = window.getSelection().toString();
      if (selection){
      window.postMessage({type:"FROM_PAGE", selection});
      }
  });
  