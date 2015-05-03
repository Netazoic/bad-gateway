var arrTacticMap = {};
var newTacticNode = {
		tacticid: 1,
		mprecid:'NewTactic',
		pgcode:'NP1',
		pgtitle:'New Tactic',
		pgname:'New Tactic'}
arrTacticMap['NewTactic'] = newTacticNode;
var NEW_PAGE_ID = 'NewTactic';
var NEW_PAGE_CODE = 'NP1';
var tacticNodeTemplate;
var calendarID;
var flgNeedsSetup;
var flgMode;
var mapTacticTemplates;
var mapTemplates;
var rsoTactics;
var maxTacticLevels = 4;



function addTactic(pgID,subtacticCode,ilkCode){
	//add a new tactic as a child of tactic[pgID]
	var dmap;
	if(subtacticCode == NEW_PAGE_CODE) dmap = newTacticNode;
	else dmap = getTacticMap(subtacticCode);
	var pmap = cloneObj(dmap);
	if(ilkCode == undefined) ilkCode = null;
	if(ilkCode)
		pmap['ilkcode'] = ilkCode;
	//dmap.title = "Article Title goes here";
	//dmap.body = "Sample data: right click on this element for more options";
	var mprecID = createNewTactic(pgID,pmap);
	if(!mprecID){
		alert("Problem adding tactic. No new tactic created.");
		return;
	}
	var divP = document.getElementById(pgID);
	var PMap = arrTacticMap[pgID]; //parent map
	var pLvl = null; //parent level
	if(PMap) pLvl =	PMap.lvl;
	if(pLvl == null){
		//look in the DOM if not found in the map
		pLvl = divP.getAttribute('lvl');
	}
	pmap.mprecID = mprecID;
	pmap.lvl = pLvl - 0 + 1;
	//Put into the arrTacticMap array
	arrTacticMap[mprecID] = pmap;
	//divID = pgID
	pasteTactic(pgID,pmap);
	//editBlock(cID);
}

function approveRequest(calendarID,f){
	var calendarStatusCode = 'APPROVED';
	var dlgTitle = 'Approve Calendar Request';
	var msg = "Request has been approved";
	changeCalendarStatus(calendarID,calendarStatusCode,dlgTitle,f,msg);
}

function assignCalendar(calendarID,f){
	if(f){
		var fLoad = function(data){
			data = evalJSON(data);
			var calendarStatus = data.calendarStatusCode;
			updateSummaryStatus(calendarStatus);
			var cmName = data.cmName;
			updateSummaryCMName(cmName);
			
			alert("Calendar Specialist updated.");
			window.top.hidePopWin();
		}
		xhrSubmit(f,true,fLoad);
	}
	else{
		dlgAssignCalendar(calendarID);
	}
	
	function dlgAssignCalendar(calendarID){
		showPopWin('/cal?pAction=calendarAssign&calendarID='+calendarID, 500, 200, null,null,'Assign Calendar Specialist');
	}
}
function changeCalendarStatus(calendarID,calendarStatusCode,dlgTitle,f,alertMsg,w,h){
	if(!w) w = 700;
	if(!h) h = 400;
	if(!alertMsg) alertMsg = "Calendar status changed to " + calendarStatusCode;
	if(f){
		var fLoad = fLoadStatusChange;
		fAlertMsg(alertMsg,f);
		fStatusCode = calendarStatusCode;
		xhrSubmit(f,true,fLoad);
	}
	else{
		//dlgAcceptCalendar(calendarID);
		dlgChangeStatus(calendarID,calendarStatusCode,w,h,dlgTitle);
	}
}

function changeCalendarType(calendarID,f){
	var calendarTypeCode;
	var dlgTitle = 'Change Calendar Emerge Option';
	if(f){
		var fLoad = function(data){
			data = evalJSON(data);
			var cmName = data.cmName;
			var calendarStatus = data.calendarStatusCode;
			var msg = "Emerge Option has been changed";
			alert(msg);
			window.top.hidePopWin();
			window.top.refreshPage();
			//goCalendarQueue();
		}
		xhrSubmit(f,false,fLoad);
	}else{
		dlgChangeType(calendarID,calendarTypeCode,720,450,dlgTitle);
	}	
}
function countProperties(obj) {
    var count = 0;

    for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
                ++count;
    }

    return count;
}
function copyBlock(divID){
	//closeContextMenu(divID);
	var bData = arrBlockData[divID];
	arrBlockData['clipboard'] = bData;
	//correct for some bug in dojo context menu
	//when the menu open event fires, the window scroll jumps to 0,0
	//or udefined/undefined in IE.  Need to return to the remembered
	//tactic offset.
	scroll2TacticOffset();
}

function createNewTactic(parentPgID,pmap){
	//Create a new calendar tactic under tactic specified by mprecID
	//Add it to the calendar
	// Return the mprecID
	var mprecID;
	var url = "/cal?pAction=calendarCreateCalendarTactic";
	url += "&calendarID=" + calendarID;
	url += "&parentPgID=" + parentPgID;
	url += "&pgCode=" + pmap.pgcode;
	url += "&pgTitle=" + pmap.pgtitle;
	url += "&ilkCode=" + pmap.ilkcode;
	var fLoad = function(data){
		data = evalJSON(data);
		mprecID = data.mprecID;
	}
	xhrGet(url,true,fLoad);
	pmap.mprecID = mprecID;
	return mprecID;
}

function createChildDiv(parentID,childID){
	//Create a child div in a repeatable block div
	var p = dojo.byId(parentID);
	var c = document.createElement('DIV');
	c.id = childID;
	c.className = "PSTRT";
	c.innerHTML = childID;
	p.appendChild(c);
	return c;
}
function createChildLI(p,childID){
	//Create a child LI
	if(typeof(p) == 'string') p = dojo.byId(p);
	var ul = dojo.query('ul',p);
	if(ul.length > 0) p = ul[0];
	else{
		ul = createChildUL(p);
		p = ul;
	}
	var c = document.createElement('LI');
	c.id = childID;
	c.className = "PSTRT";
	c.innerHTML = childID;
	p.appendChild(c);
	return c;
}

function createChildUL(p){
	if(typeof(p) == 'string') p = dojo.byId(p);
	var c = document.createElement('UL');
	p.appendChild(c);
	return c;
}


function deleteCalendar(calendarID){
	var pAction = "calendarDelete";
	var url = "/cal?pAction=" + pAction;
	url += "&calendarID=" +calendarID;
		 var conf =  confirm('Are you sure you want to delete this calendar?');
	 if(conf==true){
		 var fLoad = function(data){
			 data = evalJSON(data);
			 //alert("Calendar deleted.");
			 window.top.goCalendarQueue();
		 }
		 xhrGet(url,false,fLoad);
	 }
}
function denyRequest(calendarID,f){
	var calendarStatusCode = 'DENIED';
	var dlgTitle = 'Deny Calendar Request';
	var msg = "Request has been denied";
	changeCalendarStatus(calendarID,calendarStatusCode,dlgTitle,f,msg)
}

function delayRequest(calendarID,f){
	var calendarStatusCode = 'DELAYED';
	var dlgTitle = 'Delay Calendar Request';
	var msg = "Request has been delayed";
	changeCalendarStatus(calendarID,calendarStatusCode,dlgTitle,f,msg)
}



// Why is this version so different from above, and why doesn't it work?
function approveRequestOld(calendarID,f){
	var calendarStatusCode = 'APPROVED';
	var dlgTitle = 'Approve Calendar Request';
	if(f){
		var fLoad = function(data){
            data = evalJSON(data);
			var msg = "Calendar is now approved";
			updateSummaryStatus('APPROVED');			
			alert(msg);
			window.top.hidePopWin();
			window.top.refreshPage();
			//goCalendarQueue();
		}
		xhrSubmit(f,false,fLoad);
	}else{
		dlgChangeStatus(calendarID,calendarStatusCode,720,450,dlgTitle);
	}	
}

function dlgChangeStatus(calendarID,calendarStatusCode,w,h,title){
	if(!w) w= 720;
	if(!h) h=450;
	var url = '/cal?pAction=calendarChangeStatus';
	url +=  '&calendarID='+ calendarID;
	url += '&calendarStatusCode=' + calendarStatusCode;
	showPopWin(url, w, h, null,null,title);
}

function dlgChangeType(calendarID,calendarTypeCode,w,h,title){
	if(!w) w= 720;
	if(!h) h=450;
	var url = '/cal?pAction=calendarChangeType';
	url +=  '&calendarID='+ calendarID;
	url += '&calendarTypeCode=' + calendarTypeCode;
	showPopWin(url, w, h, null,null,title);
}

function fLoadStatusChange(data){
	data = evalJSON(data);
	var calendarStatus = data.calendarStatusCode;
	var calendarStatusName = data.calendarStatusName;
	var alertMsg = data.alertMsg;
	updateSummaryStatus(calendarStatus,calendarStatusName);
	alert(alertMsg);
	window.top.hidePopWin();
	window.top.refreshPage();
}
function fStatusCode(code,f){
	var e = f.calendarStatusCode;
	if(!e) createFormElement('calendarStatusCode',f);
	f.calendarStatusCode.value = code;
}
function getChildUL(el){
	var ul = dojo.query(ul,el);
	return ul;
}

function createMenu(divID,flgAddDisabled,flgDeleteDisabled,addLabel){
	//divID is administeredtacticID"
	pgID = divID;
	var divList = eval("[\"" + divID + "\"]");
	pMenu = new dijit.Menu({
		contextMenuForWindow: false,
		style: "box-shadow: 2px 3px 2px rgba(0,0,0,.50); -webkit-box-shadow: 2px 3px 2px rgba(0,0,0,.50); -moz-box-shadow: 2px 3px 2px rgba(0,0,0,.50);",
		//id: divID+"_ContextMenu",
		//don't assign ID, use randomly assigned dijit id's
		divID: divID,
		targetNodeIds: divList,
		onOpen: function() {rememberOffset();}
	});

	//add add/delete choices
	var flgDisabled = false;
	var mnuAdd = null;
	var mnuNoAdd = null;
	var mnu;
	if(flgAddDisabled==false){
		mnu = createMenuSubTactics(pgID);
	}else{
		mnu = createMenuAddDisabled(pgID,addLabel);
	}
	pMenu.addChild(new dijit.MenuItem({
		label: "Add",
		pgID: pgID,
		iconClass: "dijitEditorIcon dijitEditorIconAdd",
		disabled: flgDisabled,
		popup: mnu
	}));
	pMenu.addChild(new dijit.MenuItem({
		label: "Delete",
		divID: divID,
		iconClass: "dijitEditorIcon dijitEditorIconDelete",
		disabled: flgDeleteDisabled,
		onClick: function() {deleteTactic(this.divID);}
	}));
	//pMenu.addChild(new dijit.MenuSeparator());
	pMenu.startup()
}

function createMenuAddDisabled(divID,label){
	
	//Standard menu items
	if(!label) label="Tactics cannot be added at this time.";
	var mnu = new dijit.MenuItem({
		label: label,
		iconClass: "dijitIconEdit",
		onClick: function() { alert("The calendars system does not currently support adding more than four levels to your site hierarchy depth."); 
				//alert ('not actually editing divId#'+this.id+', just a test!');
				}
	});
	return mnu;
}

function createMenuSubTactics(pgID){
	// Component submenu for tactic add options
	var pSubMenu = new dijit.Menu({
		'class': "mnuItem"
	});
	var pgMap = getSubTacticAddMap(pgID);  //get map of subtactics for pgID
	var idx; var subtacticCode; var m; var id; var label;
	var mnu;
	for(idx in pgMap){
		mnu = null;
		m = pgMap[idx];
		subtacticCode = m.pgcode;
		id= pgID + "_" + subtacticCode;
		label = m.pgname;
		label = label.replace("<","&lt;");
		label = label.replace(">","&gt;");
		var mapTemplates = validTemplates(subtacticCode);
		if(mapTemplates && countProperties(mapTemplates) > 1){
			mnu = createMenuTacticTemplates(pgID,subtacticCode);
			pSubMenu.addChild(new dijit.MenuItem({
				label: label,
				popup: mnu,
				pgID: pgID,
				subtacticCode: subtacticCode,
				tplCode: newTacticNode.ilkcode
			}));

		}else{
			pSubMenu.addChild(new dijit.MenuItem({
				label: label,
				pgID: pgID,
				subtacticCode: subtacticCode,
				tplCode: newTacticNode.ilkcode,
				onClick: function(){
					addTactic(this.pgID, this.subtacticCode,this.tplCode);
				//console.debug("You clicked on layout: " + this.loID);}
				}
			}));
		}
	}
	return pSubMenu;
}

function createMenuTacticTemplates(pgID,subtacticCode){
	//Get a submenu of ilk choices for tactics
	var mnuTemplates = new dijit.Menu({
		'class': "mnuItem"
	});
	var mapTemplates = validTemplates(subtacticCode);
	var idx; var tplCode; var tplID; var m; var id;  var label;
	var tplClass;
	for(idx in mapTemplates){
		m = mapTemplates[idx];
		if(!m.ilkcode) continue; //IE finding strange stuff in maps
		tplCode = m.ilkcode;
		tplID= pgID + "_" + subtacticCode + "_" + tplCode;
		tplClass = "tpl_" + tplID;
		label = m.ilkname;
		mnuTemplates.addChild(new dijit.MenuItem({
			tplID: tplID,
			label: label,
			tplCode: tplCode,
			subtacticCode: subtacticCode,
			pgID: pgID,
			'class': tplClass,
			onClick: function(){
					addTactic(this.pgID, this.subtacticCode,this.tplCode);
					//console.debug("You clicked on layout: " + this.loID);}
			}
		}));
	}
	return mnuTemplates;
}

function deleteTactic(mprecID){
	var div = dojo.byId(mprecID);
	var divP = div.parentNode;
	var conf = confirm("Delete this tactic?");
	if(!conf)return;
	//delete the record
	var url ="/cal?pAction=calendarDelCalendarTactic";
	url += "&calendarID=" + calendarID;
	url += "&mprecID=" + mprecID;
	xhrGet(url,true,fLoad);
	scroll2TacticOffset();
	
	function fLoad(data){
		data = evalJSON(data);
		//adjust the browser
		divP.removeChild(div);
	}
}
function editCalendarRecord(calendarID,flgPopUp){
	var url = "/cal?pAction=calendarEdit";
	url += "&calendarID=" + calendarID;
	url += "&flgMode=EDIT";
	ts = new Date().getTime();
	url += "&ts=" + ts;
	if(!flgPopUp){  //use main window
		document.location.href = url;
	}else{
		var h = 500;
		var w = 1000;
		var x = 200;
		var y = 100;
		var id = "calForm";
		var newWin = popUpWindowURL(url,id,h,w,x,y);
	}
}
function viewCalendarRecord(calendarID,flgPopUp){
	var url = "/cal?pAction=calendarEdit";
	url += "&calendarID=" + calendarID;
	url += "&flgMode=VIEW";
	ts = new Date().getTime();
	url += "&ts=" + ts;
	if(!flgPopUp){  //use main window
		document.location.href = url;
	}else{
		var h = 500;
		var w = 1000;
		var x = 200;
		var y = 100;
		var id = "calForm";
		var newWin = popUpWindowURL(url,id,h,w,x,y);
	}
}

function finishCalendar(calendarID,f){
	var conf = confirm("Set all STARTED forms to DONE?");
	if(!conf) return;
	var url = '/cal?pAction=calendarFinish&calendarID='+calendarID;
	var fLoad=function(data){
		data = evalJSON(data);
		alert("All forms are now finished. Hit refresh to see status coloring");
	}
	xhrGet(url,true,fLoad);

	function dlgFinishCalendar(){
		showPopWin('/cal?pAction=calendarFinish&calendarID='+calendarID, 500, 200, null,null,'Finish Calendar -- TESTING ONLY');
	}
}

function getTacticMap(pgCode){
	for (idx in rsoTactics.items){
		map = rsoTactics.items[idx];
		if(map.pgcode == pgCode){
			return map;
		}
	}
	return null;
}

function getSubTacticMap(pgID){
	//Return subtactics for pgID
	var flgFoundIt = false;
	var subTacticMap = {};
	var map;
	for (idx in rsoTactics.items){
		map = rsoTactics.items[idx];
		if(map.parenttacticid == pgID){
			subTacticMap[idx] = map;
		}
	}
	return subTacticMap;
}
function getSubTacticAddMap(pgID){
	//Return subtactics that can be added to pgID
	// tactic NP1 applies to all pagse
	var flgFoundIt = false;
	var subTacticMap = {};
	var map,pgCode;
	subTacticMap[NEW_PAGE_CODE] = newTacticNode;
	for (idx in rsoTactics.items){
		map = rsoTactics.items[idx];
		pgCode = map.pgcode;
		if (subTacticMap[pgCode]) continue;
		if(map.parenttacticid == pgID){
			if(map.pgallowmultiple==1){
				subTacticMap[pgCode] = map;
			}
		}
	}
	return subTacticMap;
}

function hilightSetup(){
	var b = dojo.byId('btnCalendarSetup');
	if(!b) return;
	b.style.border = "1px solid green";
	b.style.color = "green";
}


function overrideCalendarStatus(calendarID,f){
	var calendarStatusCode = 'OVERRIDE';
	var dlgTitle = "Override Calendar Status";
	changeCalendarStatus(calendarID,calendarStatusCode,dlgTitle);
}

function tacticSetup(){
	//console.debug(dojo.query(".editableDiv").forEach(function(node){
	//	  console.debug(node.id);}));

	pageAlert("Please wait while the tactic map is loading . . .");
	pageActivity();
	while(document.body == null){
		 setTimeout('return;',200);
	}
	
	// create Menus for all tactic Nodes

	var targetList = null;
	var flgAddDisabled = false;
	var flgDeleteDisabled = false;
	var label = null;
	//targetList = getNodeIDs(".tacticNode");
	//Nodes 3 or less levels deep
	//targetList = getNodeIDs(".tacticNode[lvl=\"0\"], .tacticNode[lvl=\"1\"], .tacticNode[lvl=\"2\"], .tacticNode[lvl=\"3\"]") ;
	targetList = getNodeIDs(".tacticNode") ;
	targetList = eval("[" + targetList + "]");
	flgAddDisabled = flgMode!='EDIT';
	flgDeleteDisabled = flgMode!='EDIT';
	var divID;
	for(idx in targetList){
		divID = targetList[idx];
		if(typeof(divID) != 'string') continue; //IE finding strange stuff
		createMenu(divID,flgAddDisabled,flgDeleteDisabled);
	}
	//Nodes at level 4 
	targetList = getNodeIDs(".tacticNode[lvl=\""+maxTacticLevels+"\"]") ;
	targetList = eval("[" + targetList + "]");
	flgAddDisabled = true;
	flgDeleteDisabled = flgMode!='EDIT';
	label = "Maximum number of sub-levels reached.";
	for(idx in targetList){
		divID = targetList[idx];
		if(typeof(divID) != 'string') continue; //IE finding strange stuff
		createMenu(divID,flgAddDisabled,flgDeleteDisabled,label);
	}

	setTacticNodeTemplate();
	if(flgNeedsSetup) hilightSetup();
	
	//Close alerts
	pageAlertClose();
	pageActivityClose();
}


function pasteTactic(divID,pmap){
	var el = dojo.byId(divID);
	// el is the parent node
	var divP = el;
	var divC;
	var pgID = pmap.mprecID;
	pmap.pgStatusCode = 'PSTRT';
	//Put into the arrTacticMap array
	arrTacticMap[pgID] = pmap;
	//create the new LI element
	//if(dojo.isIE){
		//fooey
		//refreshPage();
		//return;
	//}
	divC = createChildLI(divID,pgID)
	divC.className = "tacticNode";
	divC.innerHTML = transformTacticDisplay(pmap);
	divC.id = pgID;
	//hook  up the context menu
	//actually set the flags intelligently
	//If tactic lvl >= maxTacticLevels, then flgAddDisabled is true
	var flgEdit = true;
	var flgAddDisabled = false;
	if(pmap.lvl >=maxTacticLevels) flgAddDisabled = true;
	var flgDeleteDisabled = false;
	var label;
	if(flgAddDisabled) label = "Maximum number of sub-levels reached.";
	createMenu(pgID,flgAddDisabled,flgDeleteDisabled,label);
	scroll2TacticOffset();

}
function previewCalendar(calendarID,f){
	var url = "/cal?pAction=calendarPreview&calendarID="+calendarID;
	var fLoad  = function(data){
		rec = evalJSON(data);
		url = rec.previewURL;
		var ww = $(window).width();
		var wh = $(window).height();
		var w = ww>=1100?1000:ww*.92;
		var h = wh>=1100?1000:wh*.92;
		var posX = 100;
		var posY = 100;
		var win = $("#winCalendarPreview");
		/*
		if(win){
			w = win.width();
			h = win.height();
		}*/
		//document.location = url;
		popUpWindowURL(url,'winCalendarPreview',h,w,posX,posY);
		//showPopWin(url,720,750,null,null,"Calendar Preview");
		/*
		opts = {height:600,width:800,resizeable:true,modal:true};
		$.ajax({type:"GET",url:url,success:function(data){
			$("#divPreview").html(data).dialog(opts);}
		});
		*/
	}
	xhrGet(url,true,fLoad);
}

function publishCalendar(calendarID,f){
	//Turning this into a rubber knob
	var flgPRE = false;
	if(flgPRE){
		alert("Calendar has been published");
		return;
	}

	if(f){
		var fLoad  = function(data){
			rec = evalJSON(data);
			url = rec.publishURL;
			window.top.hidePopWin();

			if(confirm("Calendar has been published. View the live calendar page?")){
				viewPublishedCalendar(url);
			}
			else{
				window.top.refreshPage();
			}
		}
		xhrSubmit(f,true,fLoad);
	}
	else{
		var w= 720;
		var h=450;
		var url = "/cal?pAction=calendarPublish&calendarID="+calendarID;
		title = "Publish Calendar";
		showPopWin(url, w, h, null,null,title);
	}
}



function refreshPage(){
	document.location = document.location;
}

function retireCalendar(calendarID,f){
	if(!confirm("Retire this calendar?  Calendar will be immediately removed from the Marriott calendars website.")) return;
	var fLoad  = function(data){
			rec = evalJSON(data);
			url = rec.publishURL;
			window.top.hidePopWin();
			alert("Calendar has been retired");
			window.top.refreshPage();
		}

   var url = "/cal?pAction=calendarRetire&calendarID="+calendarID;
   xhrGet(url,true,fLoad);
}


function returnCalendar(calendarID,f){
	var calendarStatusCode = "RETURNED";
	var dlgTitle = 'Return Calendar';
	var msg = "The calendar has been returned to the HR.";

	if(f){

		changeCalendarStatus(calendarID,calendarStatusCode,dlgTitle,f,msg)

	}else{
		dlgReturnCalendar(calendarID);
	}	
	function dlgReturnCalendar(calendarID){
		showPopWin('/cal?pAction=calendarReturn&calendarID='+calendarID, 720, 450, null,null,"Return Calendar");
	}
}


function requestCalendar(calendarID,f){
	var calendarStatusCode = "REQUESTED";
	var alertMsg = "The calendar has been requested.";
	if(f){
		if(!validateForm(f))return false;
		f.pAction.value = "calendarReqSubmit";
		var fLoad = function(data){
			data = evalJSON(data);
			calendarID = data.calendarID;
			var statusCode = data.calendarStatusCode;
			var msg = "Calendar has been requested.";
			alert(msg);
			goCalendarQueue();
		}
		xhrSubmit(f,true,fLoad);
	}
	else{
		dlgSubmitCalendar(calendarID);
	}
	function dlgSubmitCalendar(calendarID){
		showPopWin('/cal?pAction=calendarReqSubmit&calendarID='+calendarID, 500, 200, null,null,'Request Calendar');
	}
}

function setCalendarHR(calendarID,f){
	if(f){
		var fLoad = function(data){
			data = evalJSON(data);
			var calendarStatus = data.calendarStatusCode;
			updateSummaryStatus(calendarStatus);
			var hrName = data.ownerWebuserName;
			updateSummaryHRName(hrName);
			
			alert("Calendar Owner updated.");
			window.top.hidePopWin();
		}
		xhrSubmit(f,true,fLoad);
	}
	else{
		dlgChangeHR(calendarID);
	}
	
	function dlgChangeHR(calendarID){
		showPopWin('/cal?pAction=calendarSetHR&calendarID='+calendarID, 500, 200, null,null,'Change Calendar Owner');
	}
}

function setTacticNodeTemplate(){
	var div = dojo.byId('divTacticNodeTemplate');
	tacticNodeTemplate = div.innerHTML;
	/* Put the following somewhere on the calling tactic:
	 * 	<div id="divBlockDisplayTemplate" style="display:none;">
	 *		<CTP _INCLUDE path="/ECP/include/BlockTemplateDisplay.ctp"/>
	 *	</div> 
	 */
}

function shareCalendar(calendarID,f){
	var dlgTitle = 'Share Calendar';
		w= 720;
		h=450;
		var url = '/cal?pAction=calendarShare';
		url +=  '&calendarID='+ calendarID;
		showPopWin(url, w, h, null,null,dlgTitle);
}

function submitCalendar(calendarID,f){
	var calendarStatusCode = "SUBMITTED";
	var alertMsg = "The calendar has been submitted.";
	if(f){
		var fLoad = fLoadStatusChange;
		fAlertMsg(alertMsg,f);
		fStatusCode = calendarStatusCode;
		xhrSubmit(f,true,fLoad);
	}
	else{
		dlgSubmitCalendar(calendarID);
	}
	function dlgSubmitCalendar(calendarID){
		showPopWin('/cal?pAction=calendarSubmit&calendarID='+calendarID, 500, 200, null,null,'Submit Calendar');
	}
}

function transformTacticDisplay(pmap){
	tmpl = tacticNodeTemplate;
	var trans = supplant(tmpl,pmap);
	return trans;
}

function updateCalendar(f){
	f.pAction.value ="calendarUpdate";
	f.flgUpdate.value = "true";
	if(!validateForm(f)) return;
	var fLoad = function(data){
		data = evalJSON(data);
		calendarID = data.calendarID;
		var statusCode = data.calendarStatusCode;
		var msg = "Calendar has been updated.";
		if(statusCode == "STARTED")
			msg += "\r\nYou must select 'Request Calendar' to submit your calendar request for processing.";
		alert(msg);
		goCalendarMgr(calendarID);
	}
	xhrSubmit(f,true,fLoad);
}

function validTemplates(pgCode){
	/*return valid ilks for a given pgcode */
	//component-layout idx = cmpID + "_" + layout_code
	var tmap = mapTacticTemplates[pgCode];
	var vT = new Array();
	if(!tmap) return null;
	var t = tmap.ilks;
	t = t.replace(/ /g,''); // strip spaces
	t = t.split(",");
	for(idx in t){
		var id = t[idx];
		if(typeof(id) != 'string') continue; //IE finding strange stuff
		var m = mapTemplates[id];
		vT[id]=m;
	}
	return vT;
}

function viewPublishedCalendar(url){
	var ww = $(window).width();
	var wh = $(window).height();
	var w = ww>=1100?1000:ww*.92;
	var h = wh>=1100?1000:wh*.92;
	var posX = 100;
	var posY = 100;
	//var win = $("#winCalendarPublish");
	var win = "winCalendarPublish";
	popUpWindowURL(url,win,h,w,posX,posY);
}

