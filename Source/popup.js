/*
   Cut the Shit
   Chris Lammert
   Zak Keener
*/

var allfrshits = [] // all of the f/t shit pairs
var alltoshits = []

window.onload = function() {
  console.log("sensed an opening");

  generate_table()
}

document.getElementById("close").onclick = function() {
  console.log("close");
  window.close();
}

document.getElementById("saveshit").onclick = function() {

  var shitholder = ['allfromshits', 'alloftoshits']
  var frshit = document.getElementById("frshit").value;
  var toshit = document.getElementById("toshit").value;

  chrome.storage.sync.get(shitholder, function(items) {
    if (!chrome.runtime.error) {

      // update from shits
      allfrshits = items.allfromshits
      console.log("retrieved allfromshits " + allfrshits)
      // add the from shit
      allfrshits.push(frshit)
      console.log("pushed a frshit " + allfrshits)

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
      // add the to shit
      alltoshits.push(toshit)
      console.log("pushed a frshit " + allfrshits)

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
  console.log('FROMSHITS ====> ' + allfrshits)
  console.log('TOSHITS ====> ' + alltoshits)


  generate_table()
}

function generate_table() {

  // get the reference for the body
  var body = document.getElementsByTagName("body")[0];

  // creates a <table> element and a <tbody> element
  /* var tbl     = document.createElement("table");
   * var tblBody = document.createElement("tbody");*/
  var shittable = document.getElementById('shittable')
  var shittablebody = document.getElementById('shittablebody')

  // clear the table
  while(shittable.rows.length > 1) {
    shittable.deleteRow(1);
  }

  // creating all cells
  for (var i = 0; i < allfrshits.length; i++) {
    // creates a table row
    var row = document.createElement("tr");

    for (var j = 0; j < 2; j++) {
      if (j%2 === 0) {
        // Create a <td> element and a text node, make the text
        // node the contents of the <td>, and put the <td> at
        // the end of the table row
        var cell = document.createElement("td");
        var cellText = document.createTextNode(allfrshits[i].toString());
        cell.appendChild(cellText);
        row.appendChild(cell);
      } else {
        // Create a <td> element and a text node, make the text
        // node the contents of the <td>, and put the <td> at
        // the end of the table row
        var cell = document.createElement("td");
        var cellText = document.createTextNode(alltoshits[i].toString());
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
  shittable.setAttribute("border", "2");
}



/* /* var body = document.getElementsByTagName('body');
 *  * var el = document.getElementById('ids')
 *  * el.innerHTML = '<p><a id="clickme" href="#">Click me</a></p>';
 *  * document.getElementById('clickme').onclick = function (e) {
 *  *   e.preventDefault();
 *  *   document.body.innerHTML +='<div> YO!!!!! </div>';
 *    * }
 * 
 * var shittable = document.getElementById('shittable')
 * while (shittable.rows[0]) shittable.deleteRow(0);
 * 
 * 
 * for (var i = 0; i < frshit.length; i++) {
 *   console.log('<<< FRSHITS ====> ' + allfrshits)
 *   console.log('<<< TOSHITS ====> ' + alltoshits)
 * 
 *   // draw the table
 *   var row = document.getElementById('shittable').insertRow();
 * 
 *   console.log('i before: ' + i)
 *   // Insert a cell in the row at index 0
 *   var firstcell  = row.insertCell(i);
 *   // Append a text node to the cell
 *   var frshittext = allfrshits[i]
 *   frshittext  = document.createTextNode(frshittext.toString());
 *   firstcell.appendChild(frshittext)
 * 
 *   console.log('i after: ' + i)
 * 
 *   // Insert a cell in the row at index 0
 *   var secondcell  = row.insertCell(i);
 *   // Append a text node to the cell
 *   var toshittext = alltoshits[i+1]
 *   toshittext  = document.createTextNode(toshittext.toString());
 *   secondcell.appendChild(toshittext)
 * }
   // get the current number of shits submitted
   chrome.storage.sync.get("numberofshits", function(items) {
   console.log(items)

   if (!chrome.runtime.error) {
   if (items.numberofshits == null) {
   console.log("numshits undefined")
   numshits = 1
   } else {

   // increment the numshits value
   numshits = (items.numberofshits).valueOf()
   numshits = numshits + 1;
   console.log('added 1 to numshits: ' + numshits)

   // store the new value in memory
   chrome.storage.sync.set({ "numberofshits" : numshits}, function() {
   if (chrome.runtime.error) {
   console.log("Runtime error.")
   } else {
   console.log("saved numshits " + numshits)
   }
   })

   // display new number of shits
   document.getElementById("numshitsspan").textContent=numshits;
   }

   console.log("retrieved numshits: " + numshits)
   } else {
   console.log("error getting numshits")
   }
   })




 * */
