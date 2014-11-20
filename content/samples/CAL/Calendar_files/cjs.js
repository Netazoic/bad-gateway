//Java Script utility functions
//John Moore
//Claresco Corp
//Berkeley CA

//MM functions from MacroMedia
//P7 functions from P7
//Cookie scripts from http://techpatterns.com/downloads/javascript_cookies.php

/* Many thanks to the json genuiuses at http://www.json.org/fatfree.html */

//alert("scripts");
var classEven = "even";
var classOdd = "odd";

String.prototype.supplant = function(o) {
	return this.replace(/{([^{}]*)}/g, function(a, b) {
		var r = o[b];
		return r == null ? a : r;
		// return typeof r === 'string' ?
			// r : a;
		});
};
/*
Object.prototype.clone = function() {
	//thanks to http://my.opera.com/GreyWyvern/blog/show.dml/1725165
	  var newObj = (this instanceof Array) ? [] : {};
	  for (i in this) {
	    if (i == 'clone') continue;
	    if (this[i] && typeof this[i] == "object") {
	      newObj[i] = this[i].clone();
	    } else newObj[i] = this[i]
	  } return newObj;
	};
*/
//http://stackoverflow.com/questions/143847/best-way-to-find-an-item-in-a-javascript-array
if (!Array.prototype.indexOf) {
  Array.prototype.indexOf = function (obj, fromIndex) {
    if (fromIndex == null) {
        fromIndex = 0;
    } else if (fromIndex < 0) {
        fromIndex = Math.max(0, this.length + fromIndex);
    }
    for (var i = fromIndex, j = this.length; i < j; i++) {
        if (this[i] === obj)
            return i;
    }
    return -1;
  };
}

function cloneObj(obj){
	  var newObj = (obj instanceof Array) ? [] : {};
	  for (i in obj) {
	    if (i == 'clone') continue;
	    if (obj[i] && typeof obj[i] == "object") {
	      newObj[i] = obj[i].clone();
	    } else newObj[i] = obj[i]
	  } return newObj;
}

function redraw(el){
		el.style.display="none";
		var redrawFix = el.offsetHeight;
		el.style.display="block";
		//el.className = el.className;
	    //var n = document.createTextNode(' ');
	    //el.appendChild(n);
	    //n.parentNode.removeChild(n);
	    //return el;
	  };

function supplant(str, o) {
	return str.replace(/{([^{}]*)}/g, function(a, b) {
		var r = o[b];
		return r == null ? '' : r;
		// return r == null ? a : r;
			// return typeof r === 'string' ?
			// r : a;
		});
}

//http://aymanh.com/9-javascript-tips-you-may-not-know/#assertion
function assert(exp, message) {
  if (!exp) {
    throw new AssertException(message);
  }
}

function AssertException(message) { this.message = message; }
AssertException.prototype.toString = function () {
  return 'AssertException: ' + this.message;
}

// ==========================================================================
// Custom formatters
// ==========================================================================
formatMoney = function(inDatum) {
	if (inDatum == "?" || inDatum == null || inDatum == "")
		return;
	// pattern = /^\$/;
	// if(pattern.exec(inDatum)) inDatum = inDatum.substr(1);
	// above regex/modification seems to put a null value into the grid, even
	// though
	// cosmetically it appears to work correctly
	return isNaN(inDatum) ? 'Please enter a number' : '$' + parseFloat(inDatum)
			.toFixed(2);
}
formatFloat = function(inDatum) {
	return isNaN(inDatum) ? 'Please enter a number' : parseFloat(inDatum)
			.toFixed(2);
}
formatLength = function(inDatum) {
	if (inDatum == null)
		return;
	/*
	 * DEPRECATED *? use editor iMaxLength instead
	 */
	// console.debug(this.constraint);
	return inDatum
}

formatInt = function(inDatum) {
	if (inDatum == "?" || inDatum == null || inDatum == "")
		return;
	return isNaN(inDatum) ? 'Please enter a number' : parseInt(inDatum);
}
formatError = function(inDatum) {
	if (inDatum == "?" || inDatum == null || inDatum == "")
		return "No error.";
	return inDatum;
}
formatHowMuch = function(inDatum) {
	if (inDatum == "?" || inDatum == null || inDatum == "")
		return;
	// pattern = /^\$/;
	// if(pattern.exec(inDatum)) inDatum = inDatum.substr(1);
	// above regex/modification seems to put a null value into the grid, even
	// though
	// cosmetically it appears to work correctly
	return isNaN(inDatum) ? 'E' : '$' + commaFormatted(parseFloat(inDatum)
			.toFixed(2));
}

formatPercent = function(inDatum) {
	if (inDatum == "?" || inDatum == null || inDatum == "")
		return;
	if ((isNaN(inDatum)) || (inDatum < 0.00) || (inDatum > 100.00))
		return ("Please enter a number between 1 and 100");
	// console.debug("formatPercent: " + inDatum);
	return inDatum;
}
formatPercent2 = function(inDatum) {
	if (inDatum == "?" || inDatum == null || inDatum == "")
		return;
	if ((isNaN(inDatum)) || (inDatum < 0.00) || (inDatum > 100.00))
		return ("Please enter a number between 1 and 100");
	// console.debug("formatPercent2: " + inDatum);
	return parseFloat(inDatum).toFixed(2);
}
formatDate = function(inDatum) {
	// var pattern = /[^0-9\/]/;
	// if(pattern.exec(inDatum)) return ("Please enter a date in the format
	// 'mm/dd/yyyy'");
	if (inDatum == "?")
		return;
	if (inDatum == null)
		return;
	if (inDatum == "")
		return;
	if (inDatum == '...')
		return;

	// pattern1 = /[0-9]{13}/;
	// pattern2 = /[0-9]{1,2}\/[0-9]{1,2}\/[0-9]{2,4}/;
	// pattern3 = /[a-zA-Z]{3-8}\s[0-9]{1,2}\,\s[0-9]{2,4}/;
	// if((pattern1.exec(inDatum) == null) &&(pattern2.exec(inDatum) == null)
	// && (pattern3.exec(inDatum) == null)) {
	// //alert(pattern3.exec(inDatum));
	// return ("Please enter a date in the format 'mm/dd/yyyy'");
	// }
	return dojo.date.locale.format(new Date(inDatum), this.constraint);
	// return dojo.date.stamp.toISOString(new Date(inDatum), this.constraint);
}

function addTableRow(json, mTable,tmpltIdx,tgtIdx) {
	// Create an HTML table from json data and a template
	// the normal pattern is:
	// tbody[0] is header
	// tbody[1] is template
	// tbody[2] is target
	// This can be overridden by specifying tmpltIdx and tgtIdx as parameters
	var tmp = null;
	var oRow = null, oCell = null;
	// tBodies[0] is the header section
	if(tmpltIdx==null) tmpltIdx = 1;
	if(tgtIdx == null) tgtIdx = 2;
	var mTemplate = mTable.tBodies[tmpltIdx]; // template defined in the table
	var tRowBody = mTable.tBodies[tgtIdx]; // target
	var j = tRowBody.rows.length; // number of existing rows in target
	var rowData = null;
	var tObj;
	if (typeof (json) == 'object')
		tObj = json;
	else
		tObj = evalJSON(json);
	var items = tObj.items;
	var row = null;
	var strHTML = '';
	for (i = 0; i < items.length; i++) {
		rowData = items[i];
		// console.debug(rowData);
		rowData.i = i + j + 1;
		// Translate cell data
		var newNode = mTemplate.rows[0].cloneNode(true);
		transformCol(rowData, rowData);
		transformObj(newNode, rowData);
		transformAttr(newNode,rowData);
		// console.debug(newNode.innerHTML);
		// alert(newNode.innerHTML);
		tRowBody.appendChild(newNode);
	}
	return (i);
}
function closeAllInputs(f) {
	// close all inputs
	// var myDiv = document.getElementById( divID);
	// var inputArr = document.getElementsByTagName( "input" );
	if (f == null)
		return;
	var inputArr = f.elements;
	for ( var i = 0; i < inputArr.length; i++) {
		var elem = inputArr[i];
		var type = elem.type;
		switch (type) {
		case "text":
			elem.disabled = "disabled";
			break;
		case "radio":
			elem.disabled = true;
			break;
		case "checkbox":
			elem.disabled = true;
			break;
		case "hidden":
			// noop
			break;
		case "select-one":
			elem.disabled = "true";
			break;
		case "textarea":
			elem.disabled = "true";
			break;
		default:
			elem.disabled = "true";
			break;
		}
	}
}
function commaFormatted(amount) {
	var delimiter = ","; // replace comma if desired
	var a = amount.split('.', 2)
	var d = a[1];
	var i = parseInt(a[0]);
	if (isNaN(i)) {
		return '';
	}
	var minus = '';
	if (i < 0) {
		minus = '-';
	}
	i = Math.abs(i);
	var n = new String(i);
	var a = [];
	while (n.length > 3) {
		var nn = n.substr(n.length - 3);
		a.unshift(nn);
		n = n.substr(0, n.length - 3);
	}
	if (n.length > 0) {
		a.unshift(n);
	}
	n = a.join(delimiter);
	if (d.length < 1) {
		amount = n;
	} else {
		amount = n + '.' + d;
	}
	amount = minus + amount;
	return amount;
}

function convRow2Template(row) {
	// convert a DOM row element to a HTML template string
	var t = null;
	var attr = row.attributes;
	t = "<tr ";
	for (i = 0; i < attr.length; i++) {
		t += attr[i].name + "=\"" + attr[i].value + "\" ";
	}
	t += ">";
	t += row.innerHTML;
	t += "</tr>";
	return t;
}

function createList(jsL) {
	// Create a UL list from json item string
	if (jsL == null || jsL == "")
		return null;
	// console.debug(jsL);
	var oL = evalJSON(jsL);
	// alert("ol: " + oL);
	if (oL == null)
		return;
	var lItems = oL.items;
	var sL = "";
	// get rid of null entries
	// ??
	for (i = 0; i < lItems.length; i++) {
		l = lItems[i];
		if (l == null)
			lItems[i] = null;
	}
	for (i = 0; i < lItems.length; i++) {
		l = lItems[i];
		if (l == null)
			continue;
		sL += "<li><a href='" + l.url + "'>" + l.display + "</a>";
		sL += "</li>\n";
	}
	sL += "";
	// console.debug(sL);
	return (sL);
}

function createMessages(jsonMsgs, tblID, wrapperID) {
	// Create messages from the advice table and message templates
	if (wrapperID == null)
		wrapperID = "msgsWrapper";
	var mTable = document.getElementById(tblID);
	var wrapper = document.getElementById(wrapperID);
	var i = cjsTable(jsonMsgs, tblID);

	if (i == 0) {
		var oRow = mTable.insertRow(mTable.rows.length);
		var oCell = oRow.insertCell(-1)
		oCell.innerHTML = "<span class='bodyCopy' style='padding-left:25px;'>No messages at this time.</span>";
	}
	// dynamically size the msgsWrapper div
	if (wrapper != null) {
		if (i == 0) {
			wrapper.style.height = "0px";
		}
		if (i > 1) {
			wrapper.style.height = (i * 25) + 50 + "px";
		}
		if (i > 4) {
			wrapper.style.height = "225px";
		}
	}
	// alert(i);
	// alert(document.getElementById("msgsWrapper").style.height);
}
// Changes the cursor to progress bar
function cursorProgress() {
	document.body.style.cursor = "progress";
}
// Changes the cursor to an hourglass
function cursorWait(e) {
	if (e == null)
		e = document.body;
	e.style.cursor = 'wait';
}

// Returns the cursor to the default pointer
function cursorClear(e) {
	if (e == null)
		e = document.body;
	e.style.cursor = 'default';
}

function datestring(myDate) {
	// for backwards compat
	return (dateString(myDate));
}

function dateString(myDate) {
	if (myDate == null)
		myDate = new Date();
	return (myDate.getMonth() + 1 + "/" + myDate.getDate() + "/" + myDate
			.getFullYear());
}

// this deletes the cookie when called
function delCookie(name, path, domain) {
	if (getCookie(name))
		document.cookie = name + "=" + ((path) ? ";path=" + path : "")
				+ ((domain) ? ";domain=" + domain : "")
				+ ";expires=Thu, 01-Jan-1970 00:00:01 GMT";
}

function deleteDiv(div) {
	// remove a div from the document
	if (typeof (div) == 'string')
		div = document.getElementById(div);
	var pNode = div.parentNode;
	pNode.removeChild(div);
}

// thanks to http://www.mredkj.com/tutorials/tabledeleterow.js
// If there isn't an element with an onclick event in your row, then this
// function can't be used.
function deleteCurrentRow(obj) {
	// Pass this thing a table row
	// var delRow = obj.parentNode.parentNode;
	var delRow = obj;
	while(delRow.nodeName != 'TR')delRow = delRow.parentNode;
	var tbl = delRow.parentNode;
	while(tbl.nodeName != 'TABLE') tbl = tbl.parentNode;

	var rIndex = delRow.sectionRowIndex;
	var rowArray = new Array(delRow);
	deleteRows(rowArray);
	// reorderRows(tbl, rIndex);
}

// thanks to http://www.mredkj.com/tutorials/tabledeleterow.js
function deleteRows(rowObjArray) {

	for ( var i = 0; i < rowObjArray.length; i++) {
		var rIndex = rowObjArray[i].sectionRowIndex;
		rowObjArray[i].parentNode.deleteRow(rIndex);
	}

}

var errHandler = function(err) {
	var msg = '';
	var errObj=null;
	var msgObj = null;
	var status;
	var body;
	if (typeof (err) == 'object') {
		// console.dir(err);
		status = err.status;
		try{msgObj = evalJSON(err.responseText);}catch(ex){}
		if(msgObj!=null &&(typeof(msgObj)=='object')){
			msg = msgObj.msg;
			status = msgObj.statusCode;
			body = msgObj.body;
		}else{
			msg = err.responseText;
		}
		if (msg == null)
			msg = err.message;
		if (status == 401) {
			if(err.responseText){
				if(err.responseText.indexOf('You do not have permission')>-1){
					alert("Permission denied. You are not permitted to access this function.");
					return;
				}
				else{
					alert(err.message);
					return;
				}
			}
			else{
				// session timed out
				alert("Your session has timed out. Please log back into the application.");
				/*
				 * flgReUp = confirm("Your session has timed out. Log back into the
				 * application?"); if(flgReUp){ var url = document.location; //var
				 * url = "/home"; if(url.search!=null){ document.location=url +
				 * "&pLogin=yes"; } else{ document.location=url+"?pLogin=yes"; }
				 * return; // End this page now } else{ document.location =
				 * "/home?pLogout=yes"; return; // End this page now }
				 */
			}
		} else {
			alert(msg);
		}
	} else {
		try{errObj = evalJSON(err);}catch(ex){}
		if(errObj != null && typeof(errObj)=='object'){
			msg = errObj.msg;
			status = errObj.statusCode;
			body = errObj.body;
		}else{
			msg = err;
		}
		alert(msg);
	}
}

function evalJSON(json) {
	// surrounds a json string with parentheses to prevent the
	// infamous "invalid label" error. Then evaluates and returns object
	if (json == null || json == "")
		return null;
	if(typeof(json) == 'Object')return json;
	// alert("json: "+ json);
	var myJSONObject = eval('(' + json + ')');
	obj = myJSONObject;
	return obj;
}

function expireCookie(name){
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

function fullScreen(btn) {
	var gifFullScreen = "/images/fullScreen.gif";
	var gifReduced = "/images/smallScreen.gif";
	var leftNav = document.getElementById('leftNav');
	var lnbgimg = "url(/images/leftNavVertBackground.jpg)";
	var lnwidth = "160px";
	// var lnstyle = 'width:160px; min-width:160px;
	// background-image:url(/images/leftNavVertBackground.jpg);
	// background-repeat:repeat-x; padding-top:10px';
	// var lnstyle2 = 'width:0px; min-width:0px; padding-top:10px;
	// display:none;';
	// debugger;

	showHideElement(leftNav);

	if (btn.alt == "Reduced view") {
		// Contract
		btn.src = gifFullScreen;
		btn.alt = "Full screen view";
		leftNav.style.width = lnwidth;
		leftNav.setAttribute("width", lnwidth);
		// leftNav.style.background-image=lnbgimg;
		// leftNav.setAttribute("style",lnstyle);
	} else {
		btn.src = gifReduced;
		btn.alt = "Reduced view";
		leftNav.style.width = "1px";
		leftNav.setAttribute("width", "1px");
		leftNav.style.display = "none";
		// leftNav.setAttribute("style",lnstyle2);

	}

}

function fullScreenOld(btn, divID, expandoSize, retractoSize) {
	var grid = document.getElementById(divID);
	var gifFullScreen = "/images/fullScreen.gif";
	var gifReduced = "/images/smallScreen.gif";
	var leftNav = document.getElementById('leftNav');
	if (expandoSize == null)
		expandoSize = '100%';
	if (retractoSize == null)
		retractoSize = '800px';
	var lnbgimg = "url(/images/leftNavVertBackground.jpg)";
	var lnwidth = "160px";
	// var lnstyle = 'width:160px; min-width:160px;
	// background-image:url(/images/leftNavVertBackground.jpg);
	// background-repeat:repeat-x; padding-top:10px';
	// var lnstyle2 = 'width:0px; min-width:0px; padding-top:10px;
	// display:none;';
	// debugger;

	showHideElement(leftNav);

	if (btn.alt == "Reduced view") {
		// Contract
		grid.style.width = retractoSize;
		// grid.setAttribute("style", "position:relative; left:0px; top:0px;
		// width:"+retractoSize+"; height:450px; z-index:1; overflow: auto");
		btn.src = gifFullScreen;
		btn.alt = "Full screen view";
		leftNav.style.width = lnwidth;
		leftNav.setAttribute("width", lnwidth);
		// leftNav.style.background-image=lnbgimg;
		// leftNav.setAttribute("style",lnstyle);
	} else {
		// grid.setAttribute("width", "100%");
		grid.style.width = expandoSize;
		// grid.setAttribute("style", "position:relative; left:0px; top:0px;
		// width:"+expandoSize+"; height:450px; z-index:1; overflow: auto");
		btn.src = gifReduced;
		btn.alt = "Reduced view";
		leftNav.style.width = "1px";
		leftNav.setAttribute("width", "1px");
		leftNav.style.display = "none";
		// leftNav.setAttribute("style",lnstyle2);

	}

}
//alias for parseQueryArgs
function getArgs(){
	return parseQueryArgs();
}

//return the value of the radio button that is checked
//return an empty string if none are checked, or
//there are no radio buttons
function getCheckedValue(radioObj) {
	if(!radioObj)
		return "";
	var radioLength = radioObj.length;
	if(radioLength == undefined)
		if(radioObj.checked)
			return radioObj.value;
		else
			return "";
	for(var i = 0; i < radioLength; i++) {
		if(radioObj[i].checked) {
			return radioObj[i].value;
		}
	}
	return "";
}

function getCursor() {
	var cursor = document.layers ? document.cursor
			: document.all ? document.all.cursor
					: document.body.style ? document.body.style.cursor
							: document.getElementById ? document
									.getElementById('cursor') : null;
	return cursor;
}

function getData(myURL, flgSync, fLoad) {

	if (fLoad == null)
		fLoad = function(data) {
			// console.debug(data);
			return (data);
		}
	dojo.xhrGet( {
		url :myURL,
		handleAs :"text",
		sync :flgSync,
		load :fLoad,
		error : function(err) {
			console.debug(err);
		}
	});
}

function getExtension(filename){
	return filename.split('.').pop();
}

function getPosition(el){
    var T= 0,L= 0;
    while(el){
        L+= el.offsetLeft;
        T+= el.offsetTop;
        el= el.offsetParent;
    }
    return [L,T];    
}
function getQueryParam(ji) {
	hu = window.location.search.substring(1);
	gy = hu.split("&");
	for (i = 0; i < gy.length; i++) {
		ft = gy[i].split("=");
		if (ft[0] == ji) {
			return ft[1];
		}
	}
}

function getTZOffset() {
	var today = new Date();
	var offset = -(today.getTimezoneOffset() / 60);
	return offset;
}

function getTZName() {
	// NOT USED
	// See the cjs/dateFormat.js script
	//
	// var today = Date();
	// var tz = today.substr(23,25);
	// return tz;

}
function hideElement(e) {
	try {
		if (!e.style) {
			e = dojo.byId(e);
		}
	} catch (err) {
		console.debug(err);
	}
	if (!e)
		return;
	e.style.display = "none";
}

function include(filename) {
	// http://kevin.vanzonneveld.net
	// + original by: mdsjack (http://www.mdsjack.bo.it)
	// + improved by: Legaev Andrey
	// + improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	// + improved by: Michael White (http://crestidg.com)
	// % note 1: Force Javascript execution to pause until the file is loaded.
	// Usually causes failure if the file never loads. ( Use sparingly! )
	// * example 1: include('/pj_test_supportfile_2.js');
	// * returns 1: 1

	var js = document.createElement('script');
	js.setAttribute('type', 'text/javascript');
	js.setAttribute('src', filename);
	js.setAttribute('defer', 'defer');
	document.getElementsByTagName('HEAD')[0].appendChild(js);

	// save include state for reference by include_once
	var cur_file = {};
	cur_file[window.location.href] = 1;

	if (!window.php_js)
		window.php_js = {};
	if (!window.php_js.includes)
		window.php_js.includes = cur_file;
	if (!window.php_js.includes[filename]) {
		window.php_js.includes[filename] = 1;
	} else {
		window.php_js.includes[filename]++;
	}

	return window.php_js.includes[filename];
}

function include_once(filename) {
	// http://kevin.vanzonneveld.net
	// + original by: Legaev Andrey
	// + improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	// + improved by: Michael White (http://crestidg.com)
	// - depends on: include
	// * example 1: include_once('/pj_test_supportfile_2.js');
	// * returns 1: true

	var cur_file = {};
	cur_file[window.location.href] = 1;

	if (!window.php_js)
		window.php_js = {};
	if (!window.php_js.includes)
		window.php_js.includes = cur_file;
	if (!window.php_js.includes[filename]) {
		if (include(filename)) {
			return true;
		}
	} else {
		return true;
	}
}

function instructionText(e, i) {
	// Show/hide the message text
	// relies on <a id="hider<n>" > and
	// <div id="msgTxt<n>" . . .>
	var hider = e;
	var instructTxt = dojo.byId('instructTxt');
	var display = instructTxt.getAttribute('displayed');

	if (display == 'on') {
		// fadeOutAnim.play(msgTxt);
		dojo.style(instructTxt, "display", "none");
		dojo.fadeOut( {
			node :instructTxt,
			duration :1000,
			onEnd : function() {
				dojo.style(instructTxt, "display", "none");
			}
		});
		// change the button image
		// hider.setAttribute("src","http:/www.clarescimages.com/media/images/show-suggestion.gif");
		hider.innerHTML = "[more]";
		display = 'off';
	} else {
		// fadeInAnim.play(msgTxt);
		dojo.style(instructTxt, "display", "block")
		dojo.fadeIn( {
			node :instructTxt,
			duration :1000,
			beforeBegin : function() {
				dojo.style(instructTxt, "display", "block");
			}
		});
		// change the button image back
		// hider.setAttribute("src","http://www.clarescimages.com/media/images/hide-suggestion.gif");
		hider.innerHTML = "[hide]";
		display = 'on';
	}
	// remember the toggle state
	instructTxt.setAttribute('displayed', display);
}

function limitText(e, limitNum) {
	// link to the onKeyUp and onKeyDown methods of an input field
	var len = e.value.length;
	// alert(len);
	if (len > limitNum) {
		alert("Reached maximum of " + limitNum + " characters for this field.");
		e.value = e.value.substring(0, limitNum);
	}
}

function programMgrText(e, i) {
	// Show/hide the message text
	// relies on <a id="hider<n>" > and
	// <div id="msgTxt<n>" . . .>
	var hider = e;
	var idGridTxt = "gridTxt";
	if (i != null)
		idGridTxt += i;
	var gridTxt = dojo.byId(idGridTxt);
	var display = gridTxt.getAttribute('displayed');

	if (display == 'on') {
		// fadeOutAnim.play(msgTxt);
		dojo.style(gridTxt, "display", "none");
		dojo.fadeOut( {
			node :gridTxt,
			duration :1000,
			onEnd : function() {
				dojo.style(gridTxt, "display", "none");
			}
		});
		// change the button image
		// hider.setAttribute("src","http:/www.clarescimages.com/media/images/show-suggestion.gif");
		hider.innerHTML = "[instructions]";
		display = 'off';
	} else {
		// fadeInAnim.play(msgTxt);
		dojo.style(gridTxt, "display", "block")
		dojo.fadeIn( {
			node :gridTxt,
			duration :1000,
			beforeBegin : function() {
				dojo.style(gridTxt, "display", "block");
			}
		});
		// change the button image back
		// hider.setAttribute("src","http://www.clarescimages.com/media/images/hide-suggestion.gif");
		hider.innerHTML = "[hide]";
		display = 'on';
	}
	// remember the toggle state
	gridTxt.setAttribute('displayed', display);
}



/*
 * // /////////////////////////// // isdefined v1.0 // // Check if a javascript
 * variable has been defined. // // Author : Jehiah Czebotar // Website:
 * http://www.jehiah.com // Usage : alert(isdefined('myvar')); //
 * ///////////////////////////
 */
function isDefined(variable) {
	return (typeof (window[variable]) == "undefined") ? false : true;
}

function getCookie(check_name) {
	// first we'll split this cookie up into name/value pairs
	// note: document.cookie only returns name=value, not the other components
	var a_all_cookies = document.cookie.split(';');
	var a_temp_cookie = '';
	var cookie_name = '';
	var cookie_value = '';
	var b_cookie_found = false; // set boolean t/f default f

	for (i = 0; i < a_all_cookies.length; i++) {
		// now we'll split apart each name=value pair
		a_temp_cookie = a_all_cookies[i].split('=');

		// and trim left/right whitespace while we're at it
		cookie_name = a_temp_cookie[0].replace(/^\s+|\s+$/g, '');

		// if the extracted name matches passed check_name
		if (cookie_name == check_name) {
			b_cookie_found = true;
			// we need to handle case where cookie has no value but exists (no =
			// sign, that is):
			if (a_temp_cookie.length > 1) {
				cookie_value = unescape(a_temp_cookie[1].replace(/^\s+|\s+$/g,
						''));
			}
			// note that in cases where cookie is initialized but no value, null
			// is returned
			return cookie_value;
			break;
		}
		a_temp_cookie = null;
		cookie_name = '';
	}
	if (!b_cookie_found) {
		return null;
	}
}

function getPos(obj) {
	var rtn = [ obj.offsetLeft, obj.offsetTop ];
	while (obj.offsetParent != null) {
		var objp = obj.offsetParent;
		var objpName = objp.nodeName;
		if(objpName != 'BODY'){ //ie @#$@#
			rtn[0] += objp.offsetLeft - objp.scrollLeft;
			rtn[1] += objp.offsetTop - objp.scrollTop;
		}
		obj = objp;
	}
	//rtn[1] += objp.offsetHeight;
	return rtn;
}

function getTimeStamp(){
	var ts = Math.round(new Date().getTime() / 1000);
	return ts;
}

function isIE() {
	var msie = 0;
    var ua = window.navigator.userAgent
    var msie = ua.indexOf ( "MSIE " )
    if ( msie > 0 )      // If Internet Explorer, return version number
         return parseInt (ua.substring (msie+5, ua.indexOf (".", msie )))
    else                 // If another browser, return 0
         return 0
}



function loadSelect(id, rso, valFld, txtFld,opt0,sval) {

	var slc = document.getElementById(id);
	if(typeof(rso) == "string") rso = evalJSON(rso);
	var opts = slc.options;
	var key, val;
	// if(opts && opts.length > 0) for(i in opts) opts[i] = null;
//	if (slc.length > 0)
//		for (i = 0; i < slc.length; i++)
//			slc.remove(i);
	while(opts.length){opts[opts.length-1] = null;}
	//if(opts && opts.length > 0) opts.length = 0;
	if(opt0) opts[0] = new Option(opt0,null);
	for (idx in rso.items) {
		itm = rso.items[idx];
		txt = itm[txtFld];
		val = itm[valFld];
		var opt = new Option(txt, val);
		if(sval && val == sval) opt.selected = true;
		opts[opts.length] = opt;
	}
}
function MM_findObj(n, d) { //v4.01
	  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
	    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
	  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
	  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
	  if(!x && d.getElementById) x=d.getElementById(n); return x;
	}

function MM_showHideLayers() { //v3.0
	var i,p,v,obj,args=MM_showHideLayers.arguments;
	for (i=0; i<(args.length-2); i+=3) if ((obj=MM_findObj(args[i]))!=null) { v=args[i+2];
	if (obj.style) { obj=obj.style; v=(v=='show')?'visible':(v='hide')?'hidden':v; }
	obj.visibility=v; }
	}

function myvoid() {
	;
}// do nothing


function openAllInputs(f) {
	// open all form inputs
	// var myDiv = document.getElementById( divID);
	// var inputArr = document.getElementsByTagName( "input" );
	var inputArr = f.elements;
	for ( var i = 0; i < inputArr.length; i++) {
		var elem = inputArr[i];
		var type = elem.type;
		switch (type) {
		case "text":
			elem.disabled = null;
			break;
		case "radio":
			elem.disabled = false;
			break;
		case "checkbox":
			elem.disabled = false;
			break;
		case "hidden":
			// noop
			break;
		case "file":
			elem.disabled = false;
			break;
		case "select-one":
			elem.disabled = false;
			break;
		case "textarea":
			elem.disabled = false;
			break;
		default:
			elem.disabled = false;
			break;
		}
	}
}

function P7_swapClass() { // v1.4 by PVII
	var i, x, tB, j = 0, tA = new Array(), arg = P7_swapClass.arguments;
	if (document.getElementsByTagName) {
		for (i = 4; i < arg.length; i++) {
			tB = document.getElementsByTagName(arg[i]);
			for (x = 0; x < tB.length; x++) {
				tA[j] = tB[x];
				j++;
			}
		}
		for (i = 0; i < tA.length; i++) {
			if (tA[i].className) {
				if (tA[i].id == arg[1]) {
					if (arg[0] == 1) {
						tA[i].className = (tA[i].className == arg[3]) ? arg[2]
								: arg[3];
					} else {
						tA[i].className = arg[2];
					}
				} else if (arg[0] == 1 && arg[1] == 'none') {
					if (tA[i].className == arg[2] || tA[i].className == arg[3]) {
						tA[i].className = (tA[i].className == arg[3]) ? arg[2]
								: arg[3];
					}
				} else if (tA[i].className == arg[2]) {
					tA[i].className = arg[3];
				}
			}
		}
	}
}

function PLOPText(e, i) {
	// Show/hide the message text
	// relies on <a id="hider<n>" > and
	// <div id="msgTxt<n>" . . .>
	var hider = e;
	var idPLOPTxt = "PLOPTxt";
	if (i != null)
		idPLOPTxt += i;
	var PLOPTxt = dojo.byId(idPLOPTxt);
	var display = PLOPTxt.getAttribute('displayed');

	if (display == 'on') {
		// fadeOutAnim.play(msgTxt);
		dojo.style(PLOPTxt, "display", "none");
		dojo.fadeOut( {
			node :PLOPTxt,
			duration :1000,
			onEnd : function() {
				dojo.style(PLOPTxt, "display", "none");
			}
		});
		// change the button image
		// hider.setAttribute("src","http:/www.clarescimages.com/media/images/show-suggestion.gif");
		hider.innerHTML = "[more]";
		display = 'off';
	} else {
		// fadeInAnim.play(msgTxt);
		dojo.style(PLOPTxt, "display", "block")
		dojo.fadeIn( {
			node :PLOPTxt,
			duration :1000,
			beforeBegin : function() {
				dojo.style(PLOPTxt, "display", "block");
			}
		});
		// change the button image back
		// hider.setAttribute("src","http://www.clarescimages.com/media/images/hide-suggestion.gif");
		hider.innerHTML = "[hide]";
		display = 'on';
	}
	// remember the toggle state
	PLOPTxt.setAttribute('displayed', display);
}

function popDiv(div,el,pos){
	if(typeof(div)=="string") div = document.getElementById(div);
	if(!pos) pos = getPos(el);
	var left = pos[0];
	var top = pos[1];
	var x = 0;
	var y = 0;
	
	div.style.left = left + x +"px";
	div.style.top =top + y + "px";
	div.style.position = "absolute";

	div.style.display="block";
	//scroll into view
	//divEdit.scrollIntoView();
	//window.scrollBy(0,-50);
}
function popUpWindow(ptext) {
	day = new Date();
	id = day.getTime();
	var pageID = "page" + id;
	var s = "window.open('about:blank', '"
			+ id
			+ "', 'toolbar=0,scrollbars=0,location=0,statusbar=0,menubar=0,resizable=1,width=300,height=300,left = 570,top = 300');";
	var doc = eval(s);
	doc.document.body.innerHTML = ptext;
	doc.focus();
	return doc;
}

function popUpWindowURL(url, id, h, w, screenX, screenY, location, statusbar) {
	day = new Date();
	if (id == null) {
		id = day.getTime();
	}
	pageID = "page" + id;
	var s = "window.open(url, '"
			+ id
			+ "', 'toolbar=0,scrollbars=1,location=0,statusbar=0,menubar=0,resizable=1,titlebar=1"
			+ ",width=" + w + ",height=" + h + ",left=" + screenX + ",top="
			+ screenY + "');";
	// console.debug(s);
	// eval(pageID + " = " + s);
	var newWin = eval(s);
	if(!newWin){
		//alert("Could not open a new window. Please allow your browser to open pop-up windows for this website.");
		return false;
	}
	newWin.focus();
	return newWin;

}

function parseQueryArgs() {
	var args = new Object();
	var query = location.search.substring(1);
	// console.debug("initPage: " + query);
	var pairs = query.split("&");
	for ( var i = 0; i < pairs.length; i++) {
		var pos = pairs[i].indexOf('=');
		if (pos == -1)
			continue;
		var key = pairs[i].substring(0, pos);
		var val = pairs[i].substring(pos + 1);
		args[key] = unescape(val);
	}
	return args;
}

function resetForm(f){
	f.reset();
	var id = f.id;
	try{
		var dijF = dijit.byId(id);
		if(dijF) dijF.reset();
	}catch(err){
		
	}
	var el;
	for(i=0;i<f.length;i++){
		   el = f[i];
		   if(el.nodeName != 'INPUT' && el.nodeName != "SELECT") continue;
		   if(el.type == "hidden") continue;
		   el.value = null;
	}
	var q = "form#" + id;
	dojo.query(q+" input").forEach(function(node) { 
	    var id = node.id; 
	    if(id.indexOf("widget_") ==0) id = id.substring(7);
	    el = dijit.byId(id);
	    if(el) el.set('value',null);
	}); 
}

function return2Previous() {
	// return to previous page
	var referrer = document.referrer;
	document.location = referrer;
}
function doNothing() {
	// console.debug('not actually doing anything, just a test!');
}

function setCheckedValue(radioObj, newValue) {
	if(!radioObj)
		return;
	var radioLength = radioObj.length;
	if(radioLength == undefined) {
		radioObj.checked = (radioObj.value == newValue.toString());
		return;
	}
	for(var i = 0; i < radioLength; i++) {
		radioObj[i].checked = false;
		if(radioObj[i].value == newValue.toString()) {
			radioObj[i].checked = true;
		}
	}
}
function ts2DateString(/* TimeStamp*/ts){
	// create a new javascript Date object based on the timestamp
	var date = new Date(ts);
	// hours part from the timestamp
	var mo = date.getMonth() + 1;
	if(mo < 10) mo = "0" + mo;
	// minutes part from the timestamp
	var day = date.getDate();
	if(day<10) day = "0" + day;
	// seconds part from the timestamp
	var year = date.getYear() + 1900;

	// hours part from the timestamp
	var hours = date.getHours();
	// minutes part from the timestamp
	var minutes = date.getMinutes();
	// seconds part from the timestamp
	var seconds = date.getSeconds();

	// will display time in 10:30:23 format
	var formattedTime = mo + "/" + day + "/" + year + " " + hours + ':' + minutes + ':' + seconds;
	return formattedTime;
}
function ts2TimeString(/* hms portion of TimeStamp */ts) {
	// create a new javascript Date object based on the timestamp
	// multiplied by 1000 so that the argument is in milliseconds, not seconds
	var date = new Date(ts * 1000);
	// hours part from the timestamp
	var hours = date.getHours();
	// minutes part from the timestamp
	var minutes = date.getMinutes();
	// seconds part from the timestamp
	var seconds = date.getSeconds();

	// will display time in 10:30:23 format
	var formattedTime = hours + ':' + minutes + ':' + seconds;
	return formattedTime;

}
function ds2Date(/* String */ds) {
	/*
	 * convert a postgres datestring to a javascript Date convert 12/03/1963 to
	 * equivalent date
	 */
	if (ds == null)
		return;
	try {
		// SimpleDateFormat myDF1 = new SimpleDateFormat("yyyy-MM-dd");
		// SimpleDateFormat myDF2 = new SimpleDateFormat("MM/dd/yyyy");
		var vals = ds.match(/\d+/g); // returns [mm,dd,yyyy]
		var yr = vals[2];
		var mo = vals[0] - 1; // 0 based
		var dy = vals[1];
		var d = new Date(yr, mo, dy);
		return d;
	} catch (pex) {
		throw ("ds2Date: Error parsing date string: " + ds);
	}
}

function cjsCreateSel(target, jsOpts, sval, size, fname, fval, flgAllowNull) {
	var root = document.getElementById(target);
	// while(root.hasChildNodes()){ //removes all childs if any
	// root.removeChild(root.childNodes[0])
	// }
	root.options.length = 0;
	if (size)
		root.size = size;
	if (fname == null)
		fname = 'name';
	if (fval == null)
		fval = 'value';
	var oOpts = evalJSON(jsOpts);
	var items = oOpts.items;
	if (flgAllowNull)
		root.options[0] = new Option('--Please Select --', '', false, false);
	for ( var i = 0; i < items.length; i++) { // creates and appends the
												// options
		// elements
		opt = items[i];
		val = opt[fval];
		key = opt[fname];
		var z = root.options.length;
		root.options[z] = new Option(key, val, false, false);
		if (val == sval) {
			// If this option is the currently selected plan, change selected
			// value to true.
			// For some reason, not working to set the selected flag in the new
			// Option statement;
			// that is creating a very strange off by one error in the selected
			// option.
			// window.status="ding: " + i;
			root.options[z].selected = true;
			// varSelected = root.options[z].selected;
			// window.status=root.options[z].text + ": " + varSelected;
		}
	}
}

function cjsDiv(json, mDiv, mTmplt, mTgt, idx, flgClearAll, classEven, classOdd) {
	// Create an HTML div collection from json data and a template
	// mDiv is the container div
	// child[0] is the target
	// child[1] is the template
	var tmp = null;
	var oDiv = null, oCell = null;
	if (typeof (mDiv) == 'string')
		mDiv = document.getElementById(mDiv);
	if (typeof (json) == 'string')
		json = evalJSON(json);
	var childs = mDiv.children;
	// children[1] is the template section
	// children[0] is the target section
	var mTemplate, tDiv;
	mTmplt ? mTemplate == document.getElementById(mTmplt)
			: mTemplate = mDiv.children[1];
	mTgt ? tDiv = document.getElementById(mTgt) : tDiv = mDiv.children[0];
	var divClass = null;
	if (classOdd == null)
		classOdd = "odd";
	if (classEven == null)
		classEven = "even";
	if (flgClearAll == null)
		flgClearAll = true;
	var tdivs = mTemplate.childNodes;
	var tObj = json;
	var items = tObj.items;
	var div = null;
	var strHTML = '';
	if (flgClearAll) {
		// clear the target divs
		while (tDiv.childNodes.length > 0) {
			tDiv.removeChild(tDiv.firstChild);
		}
	}
	for (i = 0; i < items.length; i++) {
		if (i % 2)
			rowClass = classEven;
		else
			rowClass = classOdd; // odd even
		divData = items[i];
		// console.debug(rowData);
		idx ? divData.i = idx : divData.i = i;
		divData.divClass = divClass;
		// Translate cell data
		var newNode = mTemplate.children[0].cloneNode(true);
		transformCol(divData, divData);
		transformAttr(newNode, divData);
		transformObj(newNode, divData);
		// console.debug(newNode.innerHTML);
		// alert(newNode.innerHTML);
		tDiv.appendChild(newNode);
		// oRow = tbody.insertRow(-1);

		// alert(tbody.rows.length);
	}

	return (i);

}

function cjsSetSelected(target, sval) {
	// set the selected value for a select
	var root = document.getElementById(target);
	for ( var i = 0; i < root.options.length; i++) {
		var val = root.options[i].value;
		if (val == sval)
			root.options[i].selected = true;
	}
}

function cjsSelect(sname, jsOpts, sval, nval, nkey, size, id, onchange) {
	// generate an html select object
	var s = ("<select name='" + sname + "'");
	s += " style='z-index:5;'";
	if (id)
		s += " id='" + id + "'";
	if (size) {
		s += (" multiple size=" + size)
	}
	;
	if (onchange)
		s += " onchange='" + onchange + "'";
	s += (" >\n");
	s += (cjsSelectOptions(jsOpts, sval, nval, nkey));
	s += ("</select>\n");
	return s;
}
function cjsSelectOptions(jsOpts, sval, nval, nkey) {
	// Take a json object string and convert items collection to select options
	// Each item must have "name" and "value" parameters.
	// opts = eval(opts); //make sure it is an associative array/object
	var oOpts;
	if(typeof(jsOpts)=='object')oOpts = jsOpts;
	else oOpts = evalJSON(jsOpts);
	items = oOpts.items;
	s = "";
	if (nval) {
		s += "<option value='" + nval + "'>" + nkey + "</option>\n";
	}
	for (idx in items) {
		opt = items[idx];
		if (!opt)
			continue; // may be null entries in the hash map
		s += ("<option value='" + opt.value + "'");
		if (sval == opt.value)
			s += (" selected");
		s += (">");
		s += (opt.name);
		s += ("</option>\n");
	}
	return (s);
}
function cjsTable(json, tblID, rowName, classEven, classOdd, divID) {
	// Create an HTML table from json data and a template
	// tbody[0] is header
	// tbody[1] is template
	// tbody[2] is target
	var tmp = null;
	var oRow = null, oCell = null;
	var mTable = document.getElementById(tblID);
	// tBodies[0] is the header section
	var mTemplate = mTable.tBodies[1]; // template defined in the table
	var tRowBody = mTable.tBodies[2]; // target
	var flgDeleteTmp = false;
	var rowClass = null;
	if (classOdd == null)
		classOdd = "odd";
	if (classEven == null)
		classEven = "even";
	if (rowName == null)
		rowName = "data";

	var trows = mTemplate.rows;
	// Delete the templates
	// mTable.deleteRow(2);
	// mTable.deleteRow(1);
	var tObj = null;
	if(typeof(json) == 'string') tObj = evalJSON(json);
	else tObj = json;
	var items = tObj.items;
	var row = null;
	var strHTML = '';
	// clear the target rows
	while (tRowBody.rows.length > 0) {
		tRowBody.deleteRow(tRowBody.rows.length - 1);
	}
	for (i = 0; i < items.length; i++) {
		if (i % 2)
			rowClass = classEven;
		else
			rowClass = classOdd; // odd even
		rowData = items[i];
		// console.debug(rowData);
		rowData.i = i;
		rowData.rowClass = rowClass;
		// Translate cell data
		var newNode = mTemplate.rows[0].cloneNode(true);
		transformCol(rowData, rowData);
		transformObj(newNode, rowData);
		// console.debug(newNode.innerHTML);
		// alert(newNode.innerHTML);
		tRowBody.appendChild(newNode);
		// oRow = tbody.insertRow(-1);

		// alert(tbody.rows.length);
	}

	/*
	 * if(i == 0){ oRow = mTable.insertRow(mTable.rows.length); oCell =
	 * oRow.insertCell(-1) oCell.innerHTML = "No "+rowName+" at this time."; }
	 */
	if (flgDeleteTmp) {
		mTemplate.deleteRow(0);
	}
	if (divID)
		showElement(divID);
	// console.debug(tRowBody);

	return (i);

}



function setCookie(name, value, expires, path, domain, secure) {
	// set time, it's in milliseconds
	var today = new Date();
	today.setTime(today.getTime());

	/*
	 * if the expires variable is set, make the correct expires time, the
	 * current script below will set it for x number of days, to make it for
	 * hours, delete * 24, for minutes, delete * 60 * 24
	 */
	if (expires) {
		expires = expires * 1000 * 60 * 60 * 24;
	}
	var expires_date = new Date(today.getTime() + (expires));

	document.cookie = name + "=" + escape(value)
			+ ((expires) ? ";expires=" + expires_date.toGMTString() : "")
			+ ((path) ? ";path=" + path : "")
			+ ((domain) ? ";domain=" + domain : "")
			+ ((secure) ? ";secure" : "");
}

function setTZCookie() {
	var tz_offset = (new Date()).getTimezoneOffset();
	//convert to milliseconds
	//tz_offset = tz_offset * 60 * 1000
	setCookie("TZ_OFFSET", tz_offset);
}

function showElement(e) {
	if (e.nodeType == null)
		e = document.getElementById(e);
	flgShow = e.style.display;
	e.style.display = 'block';
}

function showHideElement(e, m) {
	// alert("showHideElement:e:m: " + e +":" + m);
	if (e.nodeType == null)
		e = document.getElementById(e);
	if (m) {
		// adjust positioning
		/*
		 * e.style.position = "absolute"; e.style.top = m.clientY ; e.style.left =
		 * m.clientX ; alert(e.style);
		 */
	}
	flgShow = e.style.display;
	if (flgShow == 'none') {
		e.style.display = 'block';
	} else {
		e.style.display = 'none';
	}

}

function showHideMessage(e, i) {
	// Show/hide the message text
	// relies on <a id="hider<n>" > and
	// <div id="msgTxt<n>" . . .>
	var hider = e;
	if (i == null)
		i = hider.id.substring(hider.id.length - 1);
	var lbl = 'msgTxt' + i;
	var msgTxt = dojo.byId(lbl);

	var display = msgTxt.getAttribute('displayed');

	if (display == 'on') {
		// fadeOutAnim.play(msgTxt);
		dojo.style(msgTxt, "display", "none");
		dojo.fadeOut( {
			node :msgTxt,
			duration :1000,
			onEnd : function() {
				dojo.style(msgTxt, "display", "none");
			}
		});
		// change the button image
		// hider.setAttribute("src","http:/www.clarescimages.com/media/images/show-suggestion.gif");
		hider.innerHTML = "[more]";
		display = 'off';
	} else {
		// fadeInAnim.play(msgTxt);
		dojo.style(msgTxt, "display", "block")
		dojo.fadeIn( {
			node :msgTxt,
			duration :1000,
			beforeBegin : function() {
				dojo.style(msgTxt, "display", "block");
			}
		});
		// change the button image back
		// hider.setAttribute("src","http://www.clarescimages.com/media/images/hide-suggestion.gif");
		hider.innerHTML = "[less]";
		display = 'on';
	}
	// remember the toggle state
	msgTxt.setAttribute('displayed', display);
}

function showHideText(e, id, lblOn, lblOff) {
	// Show/hide a div with a toggling controller button
	var hider = e;
	var msgTxt = dojo.byId(id);
	if (lblOn == null)
		lblOn = "[more]";
	if (lblOff == null)
		lblOff = "[hide]";

	var display = msgTxt.getAttribute('displayed');

	if (display == 'on') {
		// fadeOutAnim.play(msgTxt);
		dojo.style(msgTxt, "display", "none");
		dojo.fadeOut( {
			node :msgTxt,
			duration :1000,
			onEnd : function() {
				dojo.style(msgTxt, "display", "none");
			}
		});
		// change the button image
		// hider.setAttribute("src","http:/www.clarescimages.com/media/images/show-suggestion.gif");
		hider.innerHTML = lblOn;
		display = 'off';
	} else {
		// fadeInAnim.play(msgTxt);
		dojo.style(msgTxt, "display", "block")
		dojo.fadeIn( {
			node :msgTxt,
			duration :1000,
			beforeBegin : function() {
				dojo.style(msgTxt, "display", "block");
			}
		});
		// change the button image back
		// hider.setAttribute("src","http://www.clarescimages.com/media/images/hide-suggestion.gif");
		hider.innerHTML = lblOff;
		display = 'on';
	}
	// remember the toggle state
	msgTxt.setAttribute('displayed', display);
}

function stripDomain(val){
	//fix src attributes auto-mangled by IE
	// <#$%@$#$@$>
	val = val.replace("%7B", "{");
	val = val.replace("%7D", "}");
	// </@#@#$@#>
	//replace everything up to first bracket with just bracket
	val = val.replace(/http:\/\/.*{/,"{");
	return val;
}

function stripHTML(strHTML)
{
   var tmp = document.createElement("DIV");
   tmp.innerHTML = strHTML;
   return tmp.textContent||tmp.innerText;
}

function toggleEditing(f, b) {
	/*
	 * Toggle a flip/flop editing/display form for use with ajax form updates in
	 * conjuction with CTP
	 * 
	 * Needs a form with inputs and display divs with the following format:
	 * 
	 * <form> . . . <td> <div id='display_<blah>'>&*blah;</div> <input
	 * type=foo id="<blah>" name="<blah>" value="&*blah;">
	 * 
	 * as you can see, there is a whole lot of <blah> going on here. the
	 * important point is that the div id MUST be "display_<blah>" for this to
	 * work.
	 * 
	 * f = form b = button
	 */
	lblEdit = '[edit]';
	lblUpdate = '[update]';
	lblCancel = '[cancel]';
	btnCancel = f.btnCancel;
	btnEdit = f.btnEdit;
	var elems = f.elements;
	var j = 0;
	var inputs = {};
	var divs = {};

	for (i = 0; i < f.elements.length; i++) {
		e = f.elements[i];
		if (e.id == null)
			continue;
		if (e.type == "text" || e.type == "textarea") {
			// alert(e.id +":" + e.type);
			var id = e.id;
			divs[id] = dojo.byId('display_' + id);
			if (divs[id] != null)
				inputs[j++] = e;
		}
	}
	function showInputs(elems) {
		for (e in elems) {
			e = elems[e];
			if (e.id == null)
				continue;
			if (e.type == "text" || e.type == "textarea") {
				e.style.display = "block";
				divs[e.id].style.display = "none";
			}
		}
	}
	function hideInputs(elems) {
		for (e in elems) {
			e = elems[e];
			if (e.id == null)
				continue;
			if (e.type == "text" || e.type == "textarea") {
				e.style.display = "none";
				divs[e.id].style.display = "block";
			}
		}
	}

	function updateInputs(elems) {
		for (e in elems) {
			e = elems[e];
			if (e.id == null)
				continue;
			if (e.type == "text" || e.type == "textarea") {
				divs[e.id].innerHTML = e.value;
			}
		}
	}

	function revertInputs(elems) {
		for (e in elems) {
			e = elems[e];
			if (e.id == null)
				continue;
			if (e.type == "text" || e.type == "textarea") {
				e.value = divs[e.id].innerHTML;
			}
		}
	}

	switch (b.value) {
	case lblEdit:
		showInputs(inputs);
		btnEdit.value = lblUpdate;
		btnCancel.value = lblCancel;
		btnCancel.style.display = "block";
		f.flgCommit.value = 1;
		break;
	case lblUpdate:
		xhrSubmit(f);
		updateInputs(inputs);
		btnEdit.value = lblEdit;
		showHideElement(btnCancel);
		hideInputs(inputs);
		f.flgCommit.value = 0; // don't re-submit the form
		break;
	case lblCancel:
		btnEdit.value = lblEdit;
		hideInputs(inputs);
		showHideElement(btnCancel);
		// revert values
		revertInputs(inputs);
		f.flgCommit.value = 0;
		break;
	}
}

function cjs_toJson(it, prettyPrint, _indentStr) {
	// modification of the dojo.toJson method
	// one line added to prevent infinite recursion on _S collections
	// (which seem to be in everything that dojo.Grid creates).
	if (it === undefined) {
		return "undefined";
	}

	var objtype = typeof it;
	if (objtype == "number" || objtype == "boolean") {
		return it + "";
	}
	if (it === null) {
		return "null";
	}
	if (dojo.isString(it)) {
		return dojo._escapeString(it);
	}
	if (it.nodeType && it.cloneNode) { // isNode
		return ""; // FIXME: would something like outerHTML be better here?
	}
	// recurse
	var recurse = arguments.callee;
	// short-circuit for objects that support "json" serialization
	// if they return "self" then just pass-through...
	var newObj;
	_indentStr = _indentStr || "";
	var nextIndent = prettyPrint ? _indentStr + dojo.toJsonIndentStr : "";
	if (typeof it.__json__ == "function") {
		newObj = it.__json__();
		if (it !== newObj) {
			return recurse(newObj, prettyPrint, nextIndent);
		}
	}
	if (typeof it.json == "function") {
		newObj = it.json();
		if (it !== newObj) {
			return recurse(newObj, prettyPrint, nextIndent);
		}
	}

	var sep = prettyPrint ? " " : "";
	var newLine = prettyPrint ? "\n" : "";

	// array
	if (dojo.isArray(it)) {
		var res = dojo.map(it, function(obj) {
			var val = recurse(obj, prettyPrint, nextIndent);
			if (typeof val != "string") {
				val = "undefined";
			}
			return newLine + nextIndent + val;
		});
		return "[" + res.join("," + sep) + newLine + _indentStr + "]";
	}
	/*
	 * // look in the registry try { window.o = it; newObj =
	 * dojo.json.jsonRegistry.match(it); return recurse(newObj, prettyPrint,
	 * nextIndent); }catch(e){ // console.debug(e); } // it's a function with no
	 * adapter, skip it
	 */
	if (objtype == "function") {
		return null; // null
	}
	// generic object code path
	var output = [];
	for ( var key in it) {
		var keyStr;
		if (typeof key == "number") {
			keyStr = '"' + key + '"';
		} else if (typeof key == "string") {
			if (key.indexOf("_") == 0)
				continue; // HERE IS THE MOD (JM)
			keyStr = dojo._escapeString(key);
		} else {
			// skip non-string or number keys
			continue;
		}
		val = recurse(it[key], prettyPrint, nextIndent);
		if (typeof val != "string") {
			// skip non-serializable values
			continue;
		}
		// FIXME: use += on Moz!!
		// MOW NOTE: using += is a pain because you have to account for the
		// dangling comma...
		output.push(newLine + nextIndent + keyStr + ":" + sep + val);
	}
	return "{" + output.join("," + sep) + newLine + _indentStr + "}"; // String
}

function transformAttr(itm, d) {
	// transform item attributes
	var attr;
	var nodeName;
	var nodeVal;
	for ( var idx in itm.attributes) {
		// only concerned with numbered attributes
		// Jomo 11.11.2010: Why?
		//if (!idx.match(/\d+/))
		//	continue;
		attr = itm.attributes[idx];
		if(!attr) continue;
		nodeName = attr.nodeName;
		nodeVal = attr.value; 
		if(!nodeVal || nodeVal == "null" || nodeVal == "false" || nodeVal == "0" ) continue;
		if (nodeVal) {
			if (typeof (nodeVal) == 'string') {
				if (nodeVal.match(/{([^{}]*)}/)) {
					// debugger;
					nodeVal = supplant(nodeVal, d);
					attr.value =  nodeVal + "";
				}
			}
		}
	}
}

function transformCol(col, d) {
	for ( var n in col) {
		val = col[n];
		if (val) {
			if (typeof (val) == 'string') {
				if (val.match(/{([^{}]*)}/)) {
					// debugger;
					val = supplant(val, d);
					col[n] = val;
				}
			}
		}
	}

}

function transformObj(obj, d) {
	// Transform template object using rowdata d
	var flgIE = isIE();
	var i = 0; // childNode iterator
	var j = 0; // attribute iterator
	var c = null;
	var attr = null;
	for (i = 0; i < obj.childNodes.length; i++) {
		c = obj.childNodes[i];
		if (c.attributes != null) {
			for (j = 0; j < c.attributes.length; j++) {
				attr = obj.childNodes[i].attributes[j];
				// transformObj(attr,d);
				var val = attr.value;
				if(flgIE){ try{
					//fix the helpful auto-mangling of src attributes by IE
					if(attr.name == 'src') val = stripDomain(val);
				}catch(err){
					val = attr.value;
				}}
				if (val) {
					if (val.match(/{([^{}]*)}/)) {
						// debugger;
						val = supplant(val, d);
						if (typeof(val) == 'string') val = val + "";
						c.setAttribute(attr.name, val);
					}
				}
			}
		}
		if (c.firstChild) {
			transformObj(c, d);
		}
		if (c.nodeType == 3) {
			c.nodeValue = supplant(c.nodeValue, d);
		}/*
			 * if(obj.nodeType==2){ obj.nodeValue= c.nodeValue; }
			 */
	}
	return obj;

}

function trim(str) {
	//http://blog.stevenlevithan.com/archives/faster-trim-javascript
	var	str = str.replace(/^\s\s*/, ''),
		ws = /\s/,
		i = str.length;
	while (ws.test(str.charAt(--i)));
	return str.slice(0, i + 1);
}

function pg2unixds(/* String */ds) {
	/*
	 * convert a postgres datestring to yyyy-mm-dd format convert 12/03/1963 to
	 * 1963-12-03
	 */
	if (ds == null)
		return;
	var ret = lookBackFrom.match(/^\d{1,2}\/\d{1,2}\// )
	if (ret == null)
		return ds;

	try {
		// SimpleDateFormat myDF1 = new SimpleDateFormat("yyyy-MM-dd");
		// SimpleDateFormat myDF2 = new SimpleDateFormat("MM/dd/yyyy");
		var vals = ds.match(/\d+/g); // returns [mm,dd,yyyy]
		var yr = vals[2];
		var mo = vals[0];
		var dy = vals[1];
		var unixDate = yr + "-" + mo + "-" + dy;
		return unixDate;
	} catch (pex) {
		throw ("pg2unixds: Error parsing date: " + ds);
	}
}

function unix2pgds(/* String */ds) {
	/*
	 * convert a unix datestring to mm/dd/yyyy format convert 1963-12-03 to
	 * 12/03/1963
	 */
	if (ds == null)
		return null;
	try {
		// SimpleDateFormat myDF1 = new SimpleDateFormat("yyyy-MM-dd");
		// SimpleDateFormat myDF2 = new SimpleDateFormat("MM/dd/yyyy");
		var vals = ds.match(/\d+/g); // returns [yyyy,mm,dd]
		// alert(vals);
		var yr = vals[0];
		var mo = vals[1];
		var dy = vals[2];
		var pgDate = mo + "/" + dy + "/" + yr;
		return pgDate;
	} catch (pex) {
		throw ("unix2pgds: Error parsing date: " + ds);
	}
}

function unescapeHTML(html) {
	// Thanks to http://erlend.oftedal.no/blog/?blogid=14
	var htmlNode = document.createElement("divHTML");
	htmlNode.innerHTML = html;
	if (htmlNode.innerText)
		return htmlNode.innerText; // IE
	return htmlNode.textContent; // FF
}

function unsetAlert(e) {
	var clear_gif = "/images/clear.gif";
	//var imgE = document.getElementById("e_" + e.id);
	var imgE = MM_findObj("e_" + e.id);
	if (imgE)
		imgE.src = clear_gif;
}

function setAlert(e, alt) {
	try {
		var alert_gif = "/images/errorFlag.gif";
		var errMsg = alt;
		var imgID = null;
		var firstLetter = e.id.substring(0,1);
		var secondLetter = e.id.substring(1,2);
		//Watch out for params with name of form p<param_name>
		if((firstLetter == 'p') && (secondLetter == secondLetter.toUpperCase())) imgID = 'e' + e.id.substring(1); 
		else imgID = "e_" + e.id;
		var imgE = document.getElementById(imgID);
		if (imgE) {
			imgErr = imgE.attributes['errMsg'];
			errMsg = imgErr ? imgErr.value : errMsg;
		}
		if (!imgE) {
			imgE = document.createElement("img")// create img element
			var node = e.parentNode;
			var firstChild = node.firstChild;
			node.insertBefore(imgE, firstChild);
			// node.appendChild(imgE)//append to body

		}
		imgE.id = imgID;
		imgE.src = alert_gif // src of img attribute
		imgE.alt = errMsg;
		imgE.title = errMsg;

	} catch (err) {
		console.debug(err);
		// error image not present
	}
}


function validateEmail(email) { 
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
} 

function validateForm(f) {
	var msg;
	var empty_fields = "";
	var errors = "";
	var i = 0;
	var e = null;
	var vr = null
	var vrval = null;
	var vinv = null;
	var alreadySeen = new Array();

	// Unset all error flags
	for (i = 0; i < f.length; i++) {
		e = f.elements[i];
		unsetAlert(e);
	}
	// loop through the form, make sure all required fields have values
	for (i = 0; i < f.length; i++) {
		e = f.elements[i];
		vrval = null;
		vr = (e.required && e.required!=false);	//attribute just needs to be present
		if (!vr) {
			// textarea and some CTP elements to not support e.required
			vr = e.attributes['required'];
			// legacy CTP valreqd parameter
			if(!vr)	vr = e.attributes['valreqd'];
			if (vr){
					vrval = vr.nodeValue;
					vr = (vrval == 't' || vrval == 'true' || vrval == 'yes' || vrval == '1');
			}
		}
		if (!vr && e.className.match(/.*dijitReset.*/)){
			//search for dojo settings in a dijit
			try {
				vinv = e.attributes['aria-invalid'];
				if (vinv && vinv.value == "true") {
					// dijit errors
					// alert("Problems with one or more values on this form");
					errMsg = e.errMsg ? e.errMsg
							: "Problem with the value in this field.";
					errors+= "\n   " +errMsg; 
					setAlert(e, errMsg);
					continue;
				}
				vr = e.attributes['aria-required']=="true";
			} catch (err) {
			}
		}
		//Good ol' IE
		if(!vr){
			vr = e.getAttribute("required");
		}

		if (vr){ //found a required element
			if (((e.type == "text") || e.type == "select-one" | e.type == "password")) {
				if ((e.value == null) || (e.value == "")) {
					empty_fields += "\n          " + e.id;
					errMsg = e.errMsg ? e.errMsg : "This is a required field";
					setAlert(e, errMsg);
					// console.debug("required field no value: " + e.id);
					// console.debug("required: " + e.required);
					continue;
				}
			} else if (e.type == "textarea") {
				// This has custom coding for the NewsServlet implementation
				// of the tinyMCE text editor. tinyMCE inserts an iframe into
				// the classed textarea and does its business in a separate html
				// document inside the iframe. The iframe has id <text_area>.id
				// + "_ifr".
				var taVal = null;
				var idoc = document.getElementById(e.id + "_ifr");
				// if(e.className=="mceAdvanced"){
				if (idoc) {
					if (idoc.contentDocument) {
						// W3C standard contentDocument, Mozilla
						taVal = idoc.contentDocument.body.innerHTML;
					} else {
						// no contentDocument, IE
						var fr = document.frames[e.id + "_ifr"];
						var fd = fr.document;
						taVal = fd.body.innerHTML;
					}
				} else {
					taVal = e.value;
				}
				if ((taVal == null) || (taVal == "")
					|| (taVal.match(/^<p><br.*><\/p>$/))) {
					empty_fields += "\n          " + e.id;
					setAlert(e, "This is a required field");
					// console.debug("required field no value: " + e.id);
					// console.debug("required: " + e.required);
					continue;
				}
			}

			else if ((e.type == "radio" || e.type == "checkbox")) {
				if (alreadySeen && alreadySeen[e.name])
					continue;
				var eArray = dojo.query("[name^=" + e.name + "]");
				alreadySeen[e.name] = true;
				var flgChecked = false;
				for ( var j = 0; j < eArray.length; j++) {
					if (eArray[j].checked)
						flgChecked = true;
				}
				if (!flgChecked) {
					empty_fields += "\n         " + e.name;
					setAlert(e, "This is a required field");
					continue;
				}
			}
		}
		//Check for special types
		if(!e.attributes.valtype) continue;
		if(e.attributes.valtype.value == "percent"){
			try{
			val = e.value;
			assert(val < 100,"Incorrect field value for type percent.");
			}catch(err){
				errors+= "\n   " +err; 
				setAlert(e,"This must be a numeric value less than 100.");
				continue;
			}
		}
	}
	if (!empty_fields && !errors)
		return true;
	msg = "This form was not submitted because of one or more errors.  "
			+ "Please see the alert images on the form.\n";
	msg += " \n";
	/*
	 * if(empty_fields){ msg+= "- The following required fields are empty: " +
	 * empty_fields + "\n"; if(errors) msg += "\n"; }
	 */
	//msg += errors;
	alert(msg);
	return false;
}

function xhrGet(myURL, flgSync, fLoad, fErr) {

	if (fLoad == null)
		fLoad = function(data) {
			// console.debug(data);
			return (data);
		}
	if (fErr == null)
		fErr = errHandler;
	dojo.xhrGet( {
		url :myURL,
		handleAs :"text",
		sync :flgSync,
		headers : {
			"X-Requested-With" :"XMLHttpRequest"
		},
		load :fLoad,
		error :fErr
	});
}
function xhrSubmit(f, flgSync, fLoad, fErr) {
	// submit a form using dojo.xhrPost
	// optionally define a load callback with fLoad
	// sweet!
	if (flgSync == null)
		flgSync = false;
	if (fLoad == null)
		fLoad = function(data) {
			// console.debug(data);
		}
	if (fErr == null)
		fErr = errHandler;
	// set the xhr flag
	if (f.xhr != null)
		f.xhr.value = true;

	dojo.xhrPost( {
		url :f.action,
		form :f,
		sync :flgSync,
		load :fLoad,
		headers : {
			"X-Requested-With" :"XMLHttpRequest"
		},
		error :fErr
	});
}

function MM_openBrWindow(theURL, winName, features) {
       window.open(theURL, winName, features);
 }
