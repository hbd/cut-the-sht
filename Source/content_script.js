walk(document.body);

function walk(node)
{
  console.log("WALKING")
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
  var shitholder = ['allfromshits', 'alloftoshits']

  console.log("IN CONTENT SCRIPT")
  chrome.storage.sync.get(shitholder, function(items) {
    if (!chrome.runtime.error) {
      console.log(items);
      console.log("frshit: " + items.allfromshits)
      console.log("toshit: " + items.alloftoshits)
      var allfrshits = items.allfromshits
      var alltoshits = items.alloftoshits

      for (var i = 0; i < allfrshits.length; i++) {
        var reg = new RegExp(allfrshits[i], 'gi') // i: case-insensitive

        console.log("REPLACING "+ reg +" with "+ alltoshits[i])
        v = v.replace(reg, alltoshits[i]);

        textNode.nodeValue = v;
      }
    }
  });
}


