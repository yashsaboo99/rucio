var maxDownloadsAtATime = 10; //Maximum downloads at a time

var numDownloading = 0; //Number of downloads currently happening
var numFinished = 0; //Number of downloads finished
var downloadIds = []; //Array of download IDs
var queue = [];

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.message == "getStats") {
      sendStats();
    }
    if (request.message == "addToQueue") {
      queue = queue.concat(request.urls);
      processQueue();
    }
    if (request.message == "clearDownloads") {
      numDownloading = 0;
      numFinished = 0;
      downloadIds = [];
      queue = [];
      sendStats();
    }
  }
);

function sendStats() {
  chrome.runtime.sendMessage({ "message": "statics", "numDownloading": numDownloading, "numQueued": queue.length, "numFinished": numFinished });
}

function processQueue() {
  while (queue.length > 0 && numDownloading < maxDownloadsAtATime) {
    var url = queue.pop();
    numDownloading++;
    chrome.downloads.download({ "url": url }, function (downloadId) {
      downloadIds.push(downloadId);
    });
  }
  sendStats();
}

chrome.downloads.onChanged.addListener(function (downloadDelta) {
  console.log(downloadDelta);
  if (downloadIds.indexOf(downloadDelta.id) >= 0) {
    if (downloadDelta.state != undefined && downloadDelta.state.current != "in_progress") {
      downloadIds.splice(downloadIds.indexOf(downloadDelta.id), 1);
      numDownloading--;
      numFinished++;
      processQueue();
    }
  }
  sendStats();
});
