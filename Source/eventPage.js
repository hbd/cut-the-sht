chrome.runtime.onInstalled.addListener(function() {
  var numshits = 0
  console.log('INSTALLED!')
  chrome.storage.sync.set({ "numberofshits" : numshits}, function() {
    if (chrome.runtime.error) {
      console.log("Runtime error.")
    } else {
      console.log("initial saved numshits " + numshits)
    }
  })

  var firstfrshit = ["terrorist"]
  var firsttoshit = ["scum"]

  console.log("changing shits upon install")

  chrome.storage.sync.set({ "allfromshits" : firstfrshit}, function() {
    if (chrome.runtime.error) {
      console.log("Runtime error.")
    } else {
      console.log("set the first value of allfrshits " + firstfrshit)
    }
  })

  chrome.storage.sync.set({ "alloftoshits" : firsttoshit}, function() {
    if (chrome.runtime.error) {
      console.log("Runtime error.")
    } else {
      console.log("set the first value of alltoshits " + firsttoshit)
    }
  })
})
