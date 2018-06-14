//load settings
chrome.storage.sync.get(["filenameConflictAction", "displaySaveAsDialog"], function(items) {
	if (typeof(items.filenameConflictAction) == "undefined") {
		filenameConflictAction = "uniquify";
		//since this value has never been set, it needs to be saved
		chrome.storage.sync.set({filenameConflictAction: "uniquify"});
	} else {
		filenameConflictAction = items.filenameConflictAction;
	}
	if (typeof(items.displaySaveAsDialog) == "undefined") {
		displaySaveAsDialog = false;
		//since this value has never been set, it needs to be saved
		chrome.storage.sync.set({displaySaveAsDialog: false});
	} else {
		displaySaveAsDialog = items.displaySaveAsDialog;
	}
});
//detect when settings are changed
chrome.storage.onChanged.addListener(function(changes, areaName) {
	if (typeof(changes.filenameConflictAction) != "undefined") {
		filenameConflictAction = changes.filenameConflictAction.newValue;
	}
	if (typeof(changes.displaySaveAsDialog) != "undefined") {
		displaySaveAsDialog = changes.displaySaveAsDialog.newValue;
	}
});