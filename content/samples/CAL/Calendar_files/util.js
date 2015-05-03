

var DIV_PAGE_ACTIVITY 			= "pageActivity";
var DIV_PAGE_ACTIVITY_TXT 		= "pageActivityTxt";
var DIV_PAGE_ACTIVITY_CLOSER 	= "pageActivityCloser";

var DIV_PAGE_ALERT 				= "pageAlert";
var DIV_PAGE_ALERT_TXT 			= "pageAlertTxt";
var DIV_PAGE_ALERT_CLOSER 		= "pageAlertCloser";

var CLASS_ACTIVITY 				= "pgActivity";

var pagePos;		//memory for page offset

function getNodeIDs(sel){
	var list = "";
	dojo.query(sel).forEach(function(node){list += "\""+ node.id + "\",";});
	list = list.substring(0,list.length-1);
	return list;
}

function getPageOffset(){
	var x,y;
	if(typeof(window.pageYOffset)=='number') {
	    //Netscape compliant
		x = window.pageXOffset;
		y = window.pageYOffset;
     }
     else if(document.body && ( document.body.scrollLeft || document.body.scrollTop )) {
   	    //DOM compliant
    	x=document.body.scrollLeft;
        y=document.body.scrollTop;
     }
     else if(document.documentElement && ( document.documentElement.scrollLeft || document.documentElement.scrollTop)){
  	    //IE6 standards compliant mode
    	 x = document.documentElement.scrollLeft;
    	 y = document.documentElement.scrollTop;
     }
	console.debug("x/y:" + x +"/"+y);
	var pos = [x,y];
	return pos;
}

function pageActivity(el){
	var d = dojo.byId(DIV_PAGE_ACTIVITY);
	if(!d)	d=pageActivityCreateDiv();
	d.style.display="block";
}
function pageActivityCreateDiv(){
	var d = document.createElement('DIV');
	d.id = DIV_PAGE_ACTIVITY;
	d.style.display = "none";
	d.className = CLASS_ACTIVITY + " " + d.className;
	document.body.appendChild(d);
	var d1 = document.createElement('DIV');
	var d2 = document.createElement('DIV');
	d1.id = DIV_PAGE_ACTIVITY_TXT;
	d2.id = DIV_PAGE_ACTIVITY_CLOSER;
	d2.innerHTML="<a href='javascript:pageActivityClose();'>x</a>";
	d.appendChild(d2);
	d.appendChild(d1);
	return d;
}
function pageActivityClose(){
	console.debug("pageActivityClose");
	var div = dojo.byId(DIV_PAGE_ACTIVITY);
	if(!div) return;
	div.style.display = "none";
}

function pageAlert(msg){
	var d = dojo.byId(DIV_PAGE_ALERT);
	var d1; var d2;
	if(!d)	d=pageAlertCreateDiv();
	d1 = dojo.byId(DIV_PAGE_ALERT_TXT);
	d1.innerHTML = msg;
	d.style.display="block";
}


function pageAlertClose(){
	var divAlert = dojo.byId(DIV_PAGE_ALERT);
	if(! divAlert) return; //no div to work with ??
	divAlert.style.display = "none";
}
function pageAlertCreateDiv(){
	var d = document.createElement('DIV');
	d.id = DIV_PAGE_ALERT;
	d.style.display = "none";
	document.body.appendChild(d);
	var d1 = document.createElement('DIV');
	var d2 = document.createElement('DIV');
	d1.id = DIV_PAGE_ALERT_TXT;
	d2.id = DIV_PAGE_ALERT_CLOSER;
	d2.innerHTML="<a href='javascript:pageAlertClose();'>x</a>";
	d.appendChild(d2);
	d.appendChild(d1);
	return d;
}




function rememberOffset(){
	pagePos = getPageOffset();
}

function scroll2PageOffset(){
	//solve for dijit bug that keeps popping us to the top of the screen
	// uses pagePos memory variable set on contextMenu openMenu();
	var pos = getPageOffset();
	var y = pos[1];
	if(typeof(y)=='undefined' || y==0){
		pos = pagePos;
		window.scrollBy(0,pos[1]);
	}
}