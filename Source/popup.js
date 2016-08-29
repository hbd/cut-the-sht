
window.onload = function() {
  console.log("sensed an opening");
}

document.getElementById("close").onclick = function() {
  console.log("close");
  window.close();
}


document.getElementById("saveshit").onclick = function() {
  console.log("saving shit")
  var frshit = document.getElementById("frshit").value;
  var toshit = document.getElementById("toshit").value;

  chrome.storage.sync.set({ "fromshit" : frshit }, function() {
    if (chrome.runtime.error) {
      console.log("Runtime error.")
    } else {
      console.log("saved frshit " + frshit)
    }
  })

  chrome.storage.sync.set({ "toshit" : toshit }, function() {
    if (chrome.runtime.error) {
      console.log("Runtime error.")
    } else {
      console.log("saved toshit " + toshit)
    }
  })
}

/* document.body.onload = function() {
 *   console.log("hit me!")
 *   chrome.storage.sync.get("oldfrshit", function(items) {
 *     console.log("hit me 1!")
 *     if (!chrome.runtime.error) {
 *       console.log(items);
 *       console.log("!!! error "+ items)
 *       document.getElementById("oldfrshit").innerText = items.data;
 *     } else {
 *       console.log("!!! "+ items)
 *     }
 *   })
 * 
 *   chrome.storage.sync.get("oldtoshit", function(items) {
 *     console.log("hit me 2!")
 *     if (!chrome.runtime.error) {
 *       console.log(items);
 *       console.log("!!! error "+ items)
 *       document.getElementById("oldtoshit").innerText = items.data;
 *     } else {
 *       console.log("!!! "+ items)
 *     }
 *   })
 * }
 * */



