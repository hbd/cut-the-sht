// Perform a reload any time the user clicks "Save"
chrome.storage.onChanged.addListener(function(changes, namespace) {
  var numshits
  var shits = ["allfromshits", "alloftoshits"];
  console.log("CHANGED!!")

  chrome.storage.sync.get(shits, function(items) {
    if (!chrome.runtime.error) {
      console.log(items);
      console.log("change: " + items.allfromshits)
      console.log("change: " + items.alloftoshits)
    }
  });
});
