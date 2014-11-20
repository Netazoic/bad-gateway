/**
 * COMMON DHTML FUNCTIONS
 * These are handy functions I use all the time.
 *
 * By Seth Banks (webmaster at subimage dot com)
 * http://www.subimage.com/
 *
 * Up to date code can be found at http://www.subimage.com/dhtml/
 *
 * This code is free for you to use anywhere, just keep this comment block.
 */

/**
 * X-browser event handler attachment and detachment
 * TH: Switched first true to false per http://www.onlinetools.org/articles/unobtrusivejavascript/chapter4.html
 *
 * @argument obj - the object to attach event to
 * @argument evType - name of the event - DONT ADD "on", pass only "mouseover", etc
 * @argument fn - function to call
 */
function addEvent(obj, evType, fn){
 if (obj.addEventListener){
    obj.addEventListener(evType, fn, false);
    return true;
 } else if (obj.attachEvent){
    var r = obj.attachEvent("on"+evType, fn);
    return r;
 } else {
    return false;
 }
}
function removeEvent(obj, evType, fn, useCapture){
  if (obj.removeEventListener){
    obj.removeEventListener(evType, fn, useCapture);
    return true;
  } else if (obj.detachEvent){
    var r = obj.detachEvent("on"+evType, fn);
    return r;
  } else {
    alert("Handler could not be removed");
  }
}
/**
 * common dreamweaver scripts
 */

function MM_reloadPage(init) {  //reloads the window if Nav4 resized
  if (init==true) with (navigator) {if ((appName=="Netscape")&&(parseInt(appVersion)==4)) {
    document.MM_pgW=innerWidth; document.MM_pgH=innerHeight; onresize=MM_reloadPage; }}
  else if (innerWidth!=document.MM_pgW || innerHeight!=document.MM_pgH) location.reload();
}
MM_reloadPage(true);

function MM_findObj(n, d) { //v4.01
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
  if(!x && d.getElementById) x=d.getElementById(n); return x;
}

function P7_Snap() { //v2.67 by PVII
 var g,x,y,ox,bx,oy,p,tx,a,b,k,d,da,e,el,tw,q0,xx,yy,w1,pa='px',args=P7_Snap.arguments;a=parseInt(a);
 if(document.layers||window.opera){pa='';}for(k=0;k<(args.length);k+=4){
 if((g=MM_findObj(args[k]))!=null){if((el=MM_findObj(args[k+1]))!=null){
 a=parseInt(args[k+2]);b=parseInt(args[k+3]);x=0;y=0;ox=0;oy=0;p="";tx=1;
 da="document.all['"+args[k]+"']";if(document.getElementById){
 d="document.getElementsByName('"+args[k]+"')[0]";if(!eval(d)){
 d="document.getElementById('"+args[k]+"')";if(!eval(d)){d=da;}}
 }else if(document.all){d=da;}if(document.all||document.getElementById){while(tx==1){
 p+=".offsetParent";if(eval(d+p)){x+=parseInt(eval(d+p+".offsetLeft"));y+=parseInt(eval(d+p+".offsetTop"));
 }else{tx=0;}}ox=parseInt(g.offsetLeft);oy=parseInt(g.offsetTop);tw=x+ox+y+oy;
 if(tw==0||(navigator.appVersion.indexOf("MSIE 4")>-1&&navigator.appVersion.indexOf("Mac")>-1)){
  ox=0;oy=0;if(g.style.left){x=parseInt(g.style.left);y=parseInt(g.style.top);}else{
  w1=parseInt(el.style.width);bx=(a<0)?-5-w1:-10;a=(Math.abs(a)<1000)?0:a;b=(Math.abs(b)<1000)?0:b;
  x=document.body.scrollLeft+event.clientX+bx;y=document.body.scrollTop+event.clientY;}}
 }else if(document.layers){x=g.x;y=g.y;q0=document.layers,dd="";for(var s=0;s<q0.length;s++){
  dd='document.'+q0[s].name;if(eval(dd+'.document.'+args[k])){x+=eval(dd+'.left');y+=eval(dd+'.top');
  break;}}}e=(document.layers)?el:el.style;xx=parseInt(x+ox+a),yy=parseInt(y+oy+b);
 if(navigator.appVersion.indexOf("MSIE 5")>-1 && navigator.appVersion.indexOf("Mac")>-1){
  xx+=parseInt(document.body.leftMargin);yy+=parseInt(document.body.topMargin);}
 e.left=xx+pa;e.top=yy+pa;}}}
}

function MM_showHideLayers() { //v6.0
  var i,p,v,obj,args=MM_showHideLayers.arguments;
  for (i=0; i<(args.length-2); i+=3) if ((obj=MM_findObj(args[i]))!=null) { v=args[i+2];
    if (obj.style) { obj=obj.style; v=(v=='show')?'visible':(v=='hide')?'hidden':v; }
    obj.visibility=v; }
}

function MM_preloadImages() { //v3.0
  var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
    var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)
    if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
}

function MM_swapImage() { //v3.0
  var i,j=0,x,a=MM_swapImage.arguments; document.MM_sr=new Array; for(i=0;i<(a.length-2);i+=3)
   if ((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}
}

function MM_openBrWindow(theURL,winName,features) { //v2.0
  window.open(theURL,winName,features);
}

/**
 * Code below taken from - http://www.evolt.org/article/document_body_doctype_switching_and_more/17/30655/
 *
 * Modified 4/22/04 to work with Opera/Moz (by webmaster at subimage dot com)
 *
 * Gets the full width/height because it's different for most browsers.
 */
function getViewportHeight() {
	if (window.innerHeight!=window.undefined) return window.innerHeight;
	if (document.compatMode=='CSS1Compat') return document.documentElement.clientHeight;
	if (document.body) return document.body.clientHeight; 

	return window.undefined; 
}
function getViewportWidth() {
	var offset = 17;
	var width = null;
	if (window.innerWidth!=window.undefined) return window.innerWidth; 
	if (document.compatMode=='CSS1Compat') return document.documentElement.clientWidth; 
	if (document.body) return document.body.clientWidth; 
}

/**
 * Gets the real scroll top
 */
function getScrollTop() {
	if (self.pageYOffset) // all except Explorer
	{
		return self.pageYOffset;
	}
	else if (document.documentElement && document.documentElement.scrollTop)
		// Explorer 6 Strict
	{
		return document.documentElement.scrollTop;
	}
	else if (document.body) // all other Explorers
	{
		return document.body.scrollTop;
	}
}
function getScrollLeft() {
	if (self.pageXOffset) // all except Explorer
	{
		return self.pageXOffset;
	}
	else if (document.documentElement && document.documentElement.scrollLeft)
		// Explorer 6 Strict
	{
		return document.documentElement.scrollLeft;
	}
	else if (document.body) // all other Explorers
	{
		return document.body.scrollLeft;
	}
}
