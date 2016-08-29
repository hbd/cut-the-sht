walk(document.body);

function walk(node)
{
	// I stole this function from here:
	// http://is.gd/mwZp7E

	var child, next;

	switch ( node.nodeType )
	{
		case 1:  // Element
		case 9:  // Document
		case 11: // Document fragment
			child = node.firstChild;
			while ( child )
			{
				next = child.nextSibling;
				walk(child);
				child = next;
			}
			break;

		case 3: // Text node
			handleText(node);
			break;
	}
}

function handleText(textNode)
{
  var v = textNode.nodeValue;
  var frshit = "";
  var toshit = "";
  var shits = ["fromshit", "toshit"];

  console.log("CHANGED!!")
  chrome.storage.sync.get(shits, function(items) {
    if (!chrome.runtime.error) {
      console.log(items);
      console.log("frshit: " + items.fromshit)
      console.log("toshit: " + items.toshit)
      frshit = items.fromshit;
      toshit = items.toshit;
 }

    console.log("!!!!! CONTENT")

    /* var b = textNode.nodeValue;*/
    var reg = new RegExp(frshit, 'gi') // i: case-insensitive
//    var reg = /\bThe Cloud\b/gi
//    var reg = new RegExp("[\s\S]*") // i: case-insensitive
//    v = v.replace(reg, "dick dick");

    console.log("REPLACING "+ reg +" with "+ toshit)
//    console.log("REPLACING "+ reg2 +" with "+ toshit)
    v = v.replace(reg, toshit);
    /* b = b.replace(reg2, "dick dick");*/
    v = v.replace(/\hello\b/gi, toshit);  //check all occurances of whole phrase (not just "the" or "cloud")
    v = v.replace('/\b'+frshit+'\b/g', "dick");
    v = v.replace(/\bthe cloud\b/g, "dick dick");

    textNode.nodeValue = v;
    /* textNode.nodeValue = b;*/
    console.log("!!!!! CONTENT 2 !!!!!")
  });
}


