/*
   Cut the Shit
   Chris Lammert
   Zak Keener
*/

// google-analytics
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
			 m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-83539279-1', 'auto');
ga('set', 'checkProtocolTask', function(){});
ga('require', 'displayfeatures');
ga('send', 'pageview', '/popup.html');
ga('trackEvent');


// cut-the-sht
var allfrshits = [] // all of the f/t shit pairs
var alltoshits = []
var shitholder = ['allfromshits', 'alloftoshits']

window.onload = function() {
  console.log("sensed an opening");
  save_shits()
  console.log("INIT FRSHIT "+ allfrshits)
  console.log("INIT TOSHIT "+ alltoshits)
  generate_table()
}

function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

// show the shit in the table
document.getElementById("showShit").onclick = function() {
  ga('send', 'event', 'button', 'showShit', 'Popup Buttons')
  clear_table()
  generate_table();
}
// call function to save shit to storage
document.getElementById("saveShit").onclick = function() {
  ga('send', 'event', 'button', 'saveShit', 'Front Page')
  save_shits()

  // Usage!
  sleep(100).then(() => {
    clear_table()
    generate_table()
  })
}

// clear the shits from memory
document.getElementById("clearShit").onclick = function() {
  ga('send', 'event', 'button', 'clearShit', 'Front Page')

  var allfrshits = [""]
  var alltoshits = [""]

  // remove any fr/to shits
  chrome.storage.sync.remove(shitholder, function() {
    if (chrome.runtime.error) {
      console.log("could not clear: runtime error")
    } else {
      console.log("cleared shit successfully: " + allfrshits + " " + alltoshits)
    }
  })

  chrome.storage.sync.set({"allfromshits" : allfrshits}, function() {
    if (chrome.runtime.error) {
      console.log("runtime error")
    } else {
      console.log("saved allfrshits " + allfrshits)
  console.log("cleared shit successfully: " + allfrshits + " " + alltoshits)
    }
  })

  chrome.storage.sync.set({"alloftoshits" : alltoshits}, function() {
    if (chrome.runtime.error) {
      console.log("runtime error")
    } else {
      console.log("saved alltoshits " + alltoshits)
  console.log("cleared shit successfully: " + allfrshits + " " + alltoshits)
    }
  })
  console.log("cleared shit successfully: " + allfrshits + " " + alltoshits)

  clear_table()
}

// save the shits to chrome storage
// synced with account
function save_shits() {
  var frshit = document.getElementById("frshit").value;
  var toshit = document.getElementById("toshit").value;

  chrome.storage.sync.get(shitholder, function(items) {
    if (!chrome.runtime.error) {

      // update from shits
      allfrshits = items.allfromshits
      console.log("retrieved allfromshits " + allfrshits)

      frshit = frshit.replace(/[^A-Za-z0-9 ]/g, '')

      if (frshit.length > 0) {
        // add the from shit
        allfrshits.push(frshit)
        console.log("pushed a frshit " + allfrshits)
      }

      chrome.storage.sync.set({"allfromshits" : allfrshits}, function() {
        if (chrome.runtime.error) {
          console.log("runtime error")
        } else {
          console.log("saved allfrshits " + allfrshits)
        }
      })


      // update to shits
      alltoshits = items.alloftoshits
      console.log("retrieved alltoshits " + alltoshits)

      toshit = toshit.replace(/[^A-Za-z0-9 ]/g, '')

      if (toshit.length > 0) {
        // add the to shit
        alltoshits.push(toshit)
        console.log("pushed a frshit " + allfrshits)
      }

      chrome.storage.sync.set({"alloftoshits" : alltoshits}, function() {
        if (chrome.runtime.error) {
          console.log("runtime error")
        } else {
          console.log("saved alltoshits " + alltoshits)
        }
      })

    } else {
      console.log("runtime error")
    }
  })
  console.log('FROMSHITS ====> ' + allfrshits + " with length " + allfrshits.length)
  console.log('TOSHITS ====> ' + alltoshits)
}



// add social media icons to the popup
function add_icons() {
  // get the reference for the body
  var body = document.getElementsByTagName("body")[0];

  var aInsta = document.createElement("a")
  var instaIconURL = chrome.extension.getURL("/images/instagram_icon.png")
  var instagramPageURL = "https://instagram.com/cutthesht"
  var instaIcon = document.createElement("img")

  aInsta.href = instagramPageURL
  aInsta.target = "_blank"

  instaIcon.src = instaIconURL
  instaIcon.alt = "Share on Instagram!"
  instaIconURL.align = "left"

  aInsta.appendChild(instaIcon)
  body.appendChild(aInsta)

  var aTwit = document.createElement("a")
  var twitIconURL = chrome.extension.getURL("/images/twitter_icon.png")
  var twitPageURL = "https://twitter.com/cutthesht"
  var twitIcon = document.createElement("img")

  twitIcon.src = twitIconURL
  twitIcon.alt = "Share on Twitter!"
  twitIcon.align = "right"

  aTwit.href = twitPageURL
  aTwit.target = "_blank"

  aTwit.appendChild(twitIcon)
  body.appendChild(aTwit)

}

// remove icons from the popup
function remove_icons() {
  $('img').replaceWith(function() {
    return this.innerHTML;
  })
}


// clear the table
function clear_table() {
  console.log("CLEARING TABLE")
  var shittable = document.getElementById('shittable')

  // clear the table
  while(shittable.rows.length > 1) {
    shittable.deleteRow(1);
  }
}

function generate_table() {

  console.log("MAKING TABLE")

  console.log("TABLE FRSHIT "+ allfrshits)
  console.log("TABLE TOSHIT "+ alltoshits)

  chrome.storage.sync.get(shitholder, function(items) {
    console.log('GETTING SHITS IN TABLE')
    if (!chrome.runtime.error) {

      // update from shits
      allfrshits = items.allfromshits
      console.log("retrieved allfromshits " + allfrshits)

      // update to shits
      alltoshits = items.alloftoshits
      console.log("retrieved alltoshits " + alltoshits)


      // get the reference for the body
      var body = document.getElementsByTagName("body")[0];

      // creates a <table> element and a <tbody> element
      var shittable = document.getElementById('shittable')
      var shittablebody = document.getElementById('shittablebody')

      // creating all cells
      for (var i = 0; i < allfrshits.length; i++) {
	if (allfrshits[i] === " " || alltoshits[i] === " ") {
	  continue;
	}

	// creates a table row
	var row = document.createElement("tr");

	for (var j = 0; j < 2; j++) {
	  if (j%2 === 0) {
            // Create a <td> element and a text node, make the text
            // node the contents of the <td>, and put the <td> at
            // the end of the table row
            var cell = document.createElement("td");
            var cellText = document.createTextNode(allfrshits[i].toString());
            console.log("ADDING CELL " + cellText)
            cell.appendChild(cellText);
            row.appendChild(cell);
	  } else {
            // Create a <td> element and a text node, make the text
            // node the contents of the <td>, and put the <td> at
            // the end of the table row
            var cell = document.createElement("td");
            var cellText = document.createTextNode(alltoshits[i].toString());
            console.log("ADDING CELL " + cellText)
            cell.appendChild(cellText);
            row.appendChild(cell);
	  }
	}

	// add the row to the end of the table body
	shittablebody.appendChild(row);
      }

      // put the <tbody> in the <table>
      shittable.appendChild(shittablebody);
      // appends <table> into <body>
      body.appendChild(shittable);
      // sets the border attribute of shittable to 2;
      /* shittable.setAttribute("border", "1");
       */
      // clear the icons before redrawing new ones
      remove_icons()
      // draw new ones
      add_icons()
    } else {
      console.log("runtime error")
    }
  })

}
