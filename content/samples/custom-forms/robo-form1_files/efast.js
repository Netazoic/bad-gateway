function showTaskList(dpID){
	  	var now = new Date();
	  	// many thanks to the fantastic script from Steven Levithan
	  	// see js/cjs/dateFormat.js
	  	var tz = dateFormat('Z');
		//console.debug("TZ: " + tz);

		var url = "/taskadmin?pAction=tasklist" +"&tz=" + tz;
		if(dpID) url += "&DataPartitionID="+ dpID;
		document.location = url;
		}

	
	//*** UTIL
	function basicWipeinSetup(nodeID,btnID) {
		  //Function linked to the button to trigger the wipe.
		// -90 gives a small - button
		// -55 gives a small + button
		// We don't really want to toggle this at all though, just leave with the standard X icon
		// as set by the "close-widget" class definition in mi_base.css

		if(!nodeID) nodeID = 'basicWipeNode';
		if(!btnID) btnID = 'basicWipeinButton';
			function wipeInOut(){
				var node = dojo.byId(nodeID);
				var disp = node.style.display;
				if(disp=="none") wipeItIn();
				else wipeItOut();
			}
		    function wipeItIn() {	    	
		      dojo.style(nodeID, "display", "none");
		        var wipeArgs = {
		          node: nodeID
		        };
		        dojo.fx.wipeIn(wipeArgs).play();
				//dojo.byId(btnID).style.backgroundPosition="0px -55px";
		      }
		    function wipeItOut() {
			      dojo.style(nodeID, "display", "block");
			        var wipeArgs = {
			          node: nodeID
			        };
			        dojo.fx.wipeOut(wipeArgs).play();
					//dojo.byId(btnID).style.backgroundPosition="0px -55px";
			      }
		      dojo.connect(dojo.byId(btnID), "onclick", wipeInOut);
		    }

	function basicWipeoutSetup(nodeID,btnID) {
		  //Function linked to the button to trigger the wipe.
		
		// -90 gives a small - button
		// -55 gives a small + button
		// We don't really want to toggle this at all though, just leave with the standard X icon
		// as set by the "close-widget" class definition in mi_base.css
		if(!nodeID) nodeID = 'basicWipeNode';
		if(!btnID) btnID = 'basicWipeoutButton';
		    function wipeItOut() {
		      dojo.style(nodeID, "display", "block");
		        var wipeArgs = {
		          node: nodeID
		        };
		        dojo.fx.wipeOut(wipeArgs).play();
				//dojo.byId(btnID).style.backgroundPosition="0px -55px";
		      }
		      dojo.connect(dojo.byId(btnID), 'onclick', wipeItOut);
		    }
