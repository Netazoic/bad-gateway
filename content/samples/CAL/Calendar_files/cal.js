var CALENDAR_COMM 	= "/cal?pAction=calendarComm";
var FORM_QUEUE 		= "/cal?pAction=formQueue&pSearchMode=PerformSearch";
var CALENDAR_QUEUE 	= "/cal?pAction=calendarQueue&pSearchMode=PerformSearch&pSortOrder=selectedHotelFirstSort";
var RETURN_CALENDAR_QUEUE = "/cal?pAction=calendarQueue&pSearchMode=GetResults";
var CALENDAR_MANAGER 	= "/cal?pAction=calendarMgr";
var CALENDAR_SETUP	= "/cal?pAction=calendarSetup";
var CALENDAR_STATS	= "/cal?pAction=calendarStats";
var HR_HOME 		= "/cal?pAction=Home";
var VIS_EDITOR 		= "/cal?pAction=visEdit";
var CALENDAR_WIZARD_STEP3 = "/cal?pAction=Wizard&Step=3";
var arrowUp = "/images/ECP/arrow_up.png";
var arrowDown = "/images/ECP/arrow_down.png";
var returnVal;	//used by subCalendaral script


function cancelSetup(calendarID){
	var conf = confirm("Cancel setup and return to the Calendar Manager?");
	if(!conf) return;
	goCalendarMgr(calendarID);
}

function claimCalendar(calendarID,f){
	if(f){
		var fLoad = function(data){
			data = evalJSON(data);
			var cmName = data.cmName;
			var calendarStatus = data.calendarStatusCode;
			updateSummaryStatus(calendarStatus);
                        alert("You are now the Calendar Specialist for this calendar.");
			window.top.hidePopWin();
			refreshPage();
		}
		xhrSubmit(f,true,fLoad);
	}else{
		dlgClaimCalendar(calendarID);
	}
	function dlgClaimCalendar(calendarID){
		showPopWin('/cal?pAction=calendarClaim&calendarID='+calendarID, 500, 200, null,null,'Claim Calendar');
	}
}
function closeDialog(flgCallBack){
	window.top.hidePopWin(flgCallBack)
}

function calendarSetupSubmit(requestedStep) {
	var form = document.forms['frmCalendarSetup'];
	if(!validateForm(form))return;
	form.pRequestedStep.value = requestedStep;
	form.submit();
}

function calendarSetupFinish(form,calendarID){
	if(!validateForm(form))return;
	form.pRequestedStep.value = 'finish';
	var flgSync = true;
	var fLoad = function(data){
		goCalendarMgr(calendarID);
	}
	xhrSubmit(form,flgSync,fLoad);
}

function createFormElement(id,f){
	var e = document.createElement('INPUT');
	e.id = id;
	e.name = id;
	e.style.display = "none";
	f.appendChild(e);
	return e;
}



function deleteCalendar(f){
	var url = "/cal?pAction=calendarDelete";
	url += "&calendarID=" + f.calendarID.value;
	if(!validateForm(f)) return;
	var fLoad = function(data){
		data = evalJSON(data);
		calendarID = data.calendarID;
		alert("Calendar has been deleted.");
		goCalendarMgr(null);
	}
	xhrGet(url,true,fLoad);
}

function dlgHelp(dlg,title){
	var url ="/cal?pAction=dlg&dlgName=" + dlg;
	showPopWin(url, 500, 300, null,null,title);
}

/*
//function editForm(formCode,calendarID){
//see cal_form.js
//}
*/



function editRequestForm(calendarID,flgPopUp){
	var url = "/cal?pAction=calendarReqEdit";
	url += "&calendarID=" + calendarID;
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


function fAlertMsg(msg,f){
	var am = f.alertMsg;
	if(!am) createFormElement('alertMsg',f);
	f.alertMsg.value = msg;
}

function fsToggle(fsID,fsOpen,titleText,icon) {
	var fsContent=dojo.byId(fsID+'Content');
	var fsTitle=dojo.byId(fsID +'Title');
	if (fsOpen)
	  {
	    fsContent.style.display='none';
		/* commented out for the time being.  --AD
		dojo.animateProperty({
	        node: dojo.byId('fsContent'),
	        duration: 500,
	        properties: {
	          backgroundColor: { start: "white", end: "green" },
	          height: { start: "250px", end: "5px" },
			},
	      }).play();
		  */

	    titleText += "  -- click to open";
		fsTitle.innerHTML=titleText;
		fsOpen = false;
		if(icon) icon.src = arrowUp;
	  }
	else
	  {
	  fsContent.style.display='block'
	  fsTitle.innerHTML=titleText;
	  fsOpen = true;
	  if(icon) icon.src = arrowDown;
	  }
	}


function goCalendarQueue(hotelID){
	var url = GO_CALENDAR_QUEUE ;
	if(hotelID) url+="&pHotelID=" + hotelID;
	document.location = url
}

function returnCalendarQueue(filter){
	var url = RETURN_CALENDAR_QUEUE ;
	if(filter) url+="&pPredefinedFilter=" + filter;
	document.location = url
}

function goQueue(filter){
	var url = CALENDAR_QUEUE ;
	if(filter) url+="&pPredefinedFilter=" + filter;
	document.location = url
	
}

function goCalendarQueue(hotelID,filter){
	var url = CALENDAR_QUEUE ;
	if(hotelID) url +="&pHotelID=" + hotelID;
	if(filter) url+="&pPredefinedFilter=" + filter;
	document.location = url
}

function goFormQueue(formCode,filter){
	var url = FORM_QUEUE ;
	if(formCode) url+="&formCode=" + formCode;
	if(filter) url+="&pPredefinedFilter=" + filter;
	document.location = url
}
function goHRHome(){	document.location = HR_HOME;}

function goCalendarComm(calendarID){
	var url = CALENDAR_COMM;
	url += "&calendarueID=" + calendarID;
	document.location = url;
}
function goCalendarSetup(calendarID){
	var url = CALENDAR_SETUP;
	url += "&calendarID=" + calendarID;
	document.location= url;
}


function goCalendarMgr(id, filt){
	var url = CALENDAR_MANAGER;
	if(typeof(id)=='object') id = id.value;
	if(id) url += "&calendarID=" + id;
	if(filt) url += "&pPredefinedFilter=" + filt;
	document.location=url;
}

function goCalendarStats(){
	var url = CALENDAR_STATS;
	document.location=url;
}


function goVisEditor(mprecID,pgCode){
	var url = VIS_EDITOR + "&mprecID="+mprecID+"&pageCode=" +pgCode;
	document.location=url;
	}




function refreshPage(){
	document.location = document.location;
}

function requestNewCalendar(f){
	var url = "/cal?pAction=calendarReq";
	var atID;
	if(!f){
		//If no form, show the new calendar dialog

		showPopWin(url, 800, 400, editRequestForm,null,'Request a Calendar');
		//var id = 'calForm';
		//var newWin = popUpWindowURL(url,id,200,600,200,200);
	}
	else{
		if(!validateForm(f)) return;
		var fLoad = function(data){
			data = evalJSON(data);
			atID = data.atID;
			var calendarID = data.calendarID;
			var formCode = data.formCode;
			gReturnVal = calendarID;
		}
		xhrSubmit(f,true,fLoad);
		closeDialog(true);	//the close function fires the subCalendaral callback defined above
	}
}




function setupCalendar(calendarID){
	var url = "/cal?pAction=calendarSetup&calendarID=" + calendarID;
	document.location = url;
}


function showECPHelp(){
	dlgHelp('HelpECP','ECP Help');
}
function showCalendarHelp(){
	dlgHelp('HelpCalendar','Calendar Help');
}
function showCalendarQueueHelp(){
	dlgHelp('HelpCalendarQueue','Calendar Queue Help');
}
function showCalendarSetupHelp(){
	dlgHelp('HelpCalendarSetup','Calendar Setup Help');
}


function showVisualEditorHelp(){
	dlgHelp('HelpVisualEditor','Visual Tactic Editor Help');
}

function showTacticNotes(){
	var div= document.getElementById('divMPN');
	div.style.display = "block";
}



function validateSetupForm(f){
	var flgErr = false;
	var type;
	var inputs = f.getElementsByTagName('input');
	for(var idx in inputs){
		var i = inputs[idx];
		if(i.required){
			type=i.type;
			if(type=='checkbox' && !i.checked){
				flgErr = true;
			}else if(i.value == null){
				flgErr = true;
			}
		}
	}
	if(flgErr){
		return confirm("One or more required/recommended pages is not selected. Would you like to continue with the current page list? \n" +
				"Click 'Ok' to continue with the currently selected set of pages. Click 'Cancel' to change your selections.");
	}
	else{
		return true;
	}
}


function updateSummaryCMName(cmName){
	var statusDiv = dojo.byId('spanCMName');
	statusDiv.innerHTML = cmName;
}
function updateSummaryHRName(hrName){
	var statusDiv = dojo.byId('spanHRName');
	statusDiv.innerHTML = hrName;
}
function updateSummaryStatus(calendarStatus,calendarStatusName){
	if(!calendarStatusName)calendarStatusName = calendarStatus;
	var statusDiv = dojo.byId('spanCalendarStatus');
	statusDiv.innerHTML = calendarStatusName;
	statusDiv.setAttribute("class", calendarStatus);
}

function viewRequestForm(calendarID,flgPopUp){
	var url = "/cal?pAction=calendarReqView";
	url += "&calendarID=" + calendarID;
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


function toggleSelection(checkbox_id, text_id) {
  if (dojo.byId(checkbox_id).checked) {
    dojo.byId(checkbox_id).checked=false
  } else {
    dojo.byId(checkbox_id).checked=true
  }
  updateSelectionStyling(checkbox_id, text_id);
}

// ***** UTIL *****
function basicWipeinSetup() {
	  //Function linked to the button to trigger the wipe.
	    function wipeItIn() {
	      dojo.style("basicWipeNode", "display", "none");
	        var wipeArgs = {
	          node: "basicWipeNode"
	        };
	        dojo.fx.wipeIn(wipeArgs).play();
			dojo.byId("basicWipeinButton").style.backgroundPosition="0px -87px";
	      }
	      dojo.connect(dojo.byId("basicWipeinButton"), "onclick", wipeItIn);
	    }

function basicWipeoutSetup() {
	  //Function linked to the button to trigger the wipe.
	    function wipeItOut() {
	      dojo.style("basicWipeNode", "display", "block");
	        var wipeArgs = {
	          node: "basicWipeNode"
	        };
	        dojo.fx.wipeOut(wipeArgs).play();
			dojo.byId("basicWipeinButton").style.backgroundPosition="0px -51px";
	      }
	      dojo.connect(dojo.byId('basicWipeoutButton'), 'onclick', wipeItOut);
	    }

function updateSelectionStyling(checkbox_id, text_id) {
  if (dojo.byId(checkbox_id).checked) {
    dojo.byId(checkbox_id).className = 'pageSelected';
    dojo.byId(text_id).className = 'pageSelected';
  } else {
    dojo.byId(checkbox_id).className = 'pageDeselected';
    dojo.byId(text_id).className = 'pageDeselected';
  }
}
	
