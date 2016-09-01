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

    var reg = new RegExp(frshit, 'gi') // i: case-insensitive

    console.log("REPLACING "+ reg +" with "+ toshit)
    v = v.replace(reg, toshit);

    textNode.nodeValue = v;
  });
}


