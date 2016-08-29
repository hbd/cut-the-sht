// Perform a reload any time the user clicks "Save"
chrome.storage.onChanged.addListener(function(changes, namespace) {
  var shits = ["fromshit", "toshit"];
  console.log("CHANGED!!")
  chrome.storage.sync.get(shits, function(items) {
    if (!chrome.runtime.error) {
      console.log(items);
      console.log("change: " + items.fromshit)
      console.log("change: " + items.toshit)
    }
  });
});


chrome.browserAction.onClicked.addListener(function(tab) {
  var shits = ["fromshit", "toshit"];
  chrome.storage.sync.get(shits, function(items) {
    if (!chrome.runtime.error) {
      console.log("items: "+ items);
      /* document.getElementById("data").innerText = items.data;*/
    }
  })
})

