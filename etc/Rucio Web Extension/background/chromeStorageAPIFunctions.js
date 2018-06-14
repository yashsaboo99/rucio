var allLinks = [];
var visibleLinks = [];
var zip = new JSZip();
var data1=[];
var dataFrame=[];
var FolderName ='Rucio/'+new Date().toLocaleDateString().replace('/','_').replace('/','_');
var TitleName='';
var arrOptions = [];// this is to load the Check box values
var defaultOptions = []; // this is to load the check box options
var fileOption;
chrome.storage.sync.get('fileOption',function(data){fileOption = data.fileOption;});

 $(function(){
 $("#divOptions").append('Loading....');
 $("a").each(function(index){
 $("#divOptions").append($("a").text());
 });

 });
 
 function loadFileName(titleName){
 titleName = titleName.substring(titleName.lastIndexOf('/') + 1);
 if(titleName.lastIndexOf('?') > 0)
 titleName = titleName.substring(0,titleName.lastIndexOf('?'));
 return titleName;
 }
 
 /*chrome.extension.onRequest.addListener(function(links) {
  for (var index in links) {
    allLinks.push(links[index]);
  }
  allLinks.sort();
  visibleLinks = allLinks;
  
});
// showLinks();
});*/

chrome.extension.onMessage.addListener(function(data){
dataFrame = dataFrame.concat(data)
data = dataFrame;
//console.log('onMessage.addListener' + data);

$("#divOptions").text("");
if(data.length <= 0){
//console.log('onMessage.addListener Inside IF');

$(".hideme").hide();
$("#message").show();
}

//console.log('data.length' + data.length);
for (var i = 0; i < data.length; i++) {
 //$("#divOptions").append(data);
 //$("#divOptions").append('<br/>');
var allLinks = new Array();
allLinks.push('false');
allLinks.push(data[i].name);
allLinks.push(data[i].link);
   visibleLinks = allLinks;
//chrome.downloads.download({url:data[i]});
    data1.push(allLinks);

}

 

//$("#example").text(visibleLinks);
 $('#example').handsontable({
  data: data1,
  minSpareRows: 0,
  contextMenu:false,
  colHeaders: ["<b>Select</b>","<b>File Path</b>","<b>Name</b> <i> if present</i>"],
  columns:[
  {type:"checkbox",readOnly:false},
  {data:2,readOnly:true},
  {data:1,readOnly:true}
  
  ]
});
});


$(document).ready(chrome.windows.getCurrent(function (currentWindow) {
//console.log('document.ready');

   chrome.tabs.query({active: true, windowId: currentWindow.id},
                      function(activeTabs) { chrome.tabs.executeScript(activeTabs[0].id, {file: 'jquery.min.js', allFrames: true}),
      chrome.tabs.executeScript(
        activeTabs[0].id, {file: 'select_links.js', allFrames: true});
    });
  }));
  
  $(document).ready(
 function(){
 $("#btnDownload").click(
 function(){
$("#example").find("input:checkbox").each(function(index){

if($(this).is(':checked') == true){
var titleName = data1[index][2];
chrome.downloads.download({url:titleName,filename:FolderName+"/"+loadFileName(titleName),saveAs:Boolean(parseInt(fileOption))})


}

}
)

 }
 )
 }

  );
  $(document).ready(function(){
  
  $('#option').click(function () {
    chrome.tabs.create({ url: 'options.html'});
  });
  });
  
  $(document).ready(function(){
/**
Check whether already saved
If Not Saved, load default options

If Saved, load options saved by End user
**/

chrome.storage.sync.get('SavedData',function(data){
if(data.SavedData != 'true')
{
// This is time when user did not save anything in the options.
fileOption = 1;
arrOptions = ['jpg','pdf','docx','zip','xls','xlsx'];

chrome.storage.sync.set({'extnOptns':arrOptions});
chrome.storage.sync.set({'fileOption':fileOption});


}

})
});



