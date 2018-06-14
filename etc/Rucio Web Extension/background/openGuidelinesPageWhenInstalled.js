//This will open an HTML page or a file which will have guidelines to use this extension.
chrome.runtime.onInstalled.addListener(function(details){
  if(details.reason == "install"){
      chrome.tabs.create({url:'howToUse.html'});
  }
})