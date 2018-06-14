//Determining Filename
chrome.downloads.onDeterminingFilename.addListener(function(item, __suggest) {
  function suggest(filename, conflictAction) {
    __suggest({filename: filename,
               conflictAction: conflictAction,
               conflict_action: conflictAction});
    }
  var rules = localStorage.rules;
  try {
    rules = JSON.parse(rules);
  } catch (e) {
    localStorage.rules = JSON.stringify([]);
  }
  for (var index = 0; index < rules.length; ++index) {
    var rule = rules[index];
    if (rule.enabled && matches(rule, item)) {
      if (rule.action == 'overwrite') {
        suggest(item.filename, 'overwrite');
      } else if (rule.action == 'prompt') {
        suggest(item.filename, 'prompt');
      } else if (rule.action == 'js') {
        eval(rule.action_js);
      }
      break;
    }
  }
});
