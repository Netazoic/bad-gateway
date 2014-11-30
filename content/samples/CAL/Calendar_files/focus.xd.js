/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


window[(typeof (djConfig)!="undefined"&&djConfig.scopeMap&&djConfig.scopeMap[0][1])||"dojo"]._xdResourceLoaded(function(_1,_2,_3){return {depends:[["provide","dijit._base.focus"],["require","dojo.window"],["require","dijit._base.manager"]],defineResource:function(_4,_5,_6){if(!_4._hasResource["dijit._base.focus"]){_4._hasResource["dijit._base.focus"]=true;_4.provide("dijit._base.focus");_4.require("dojo.window");_4.require("dijit._base.manager");_4.mixin(_5,{_curFocus:null,_prevFocus:null,isCollapsed:function(){return _5.getBookmark().isCollapsed;},getBookmark:function(){var bm,rg,tg,_7=_4.doc.selection,cf=_5._curFocus;if(_4.global.getSelection){_7=_4.global.getSelection();if(_7){if(_7.isCollapsed){tg=cf?cf.tagName:"";if(tg){tg=tg.toLowerCase();if(tg=="textarea"||(tg=="input"&&(!cf.type||cf.type.toLowerCase()=="text"))){_7={start:cf.selectionStart,end:cf.selectionEnd,node:cf,pRange:true};return {isCollapsed:(_7.end<=_7.start),mark:_7};}}bm={isCollapsed:true};}else{rg=_7.getRangeAt(0);bm={isCollapsed:false,mark:rg.cloneRange()};}}}else{if(_7){tg=cf?cf.tagName:"";tg=tg.toLowerCase();if(cf&&tg&&(tg=="button"||tg=="textarea"||tg=="input")){if(_7.type&&_7.type.toLowerCase()=="none"){return {isCollapsed:true,mark:null};}else{rg=_7.createRange();return {isCollapsed:rg.text&&rg.text.length?false:true,mark:{range:rg,pRange:true}};}}bm={};try{rg=_7.createRange();bm.isCollapsed=!(_7.type=="Text"?rg.htmlText.length:rg.length);}catch(e){bm.isCollapsed=true;return bm;}if(_7.type.toUpperCase()=="CONTROL"){if(rg.length){bm.mark=[];var i=0,_8=rg.length;while(i<_8){bm.mark.push(rg.item(i++));}}else{bm.isCollapsed=true;bm.mark=null;}}else{bm.mark=rg.getBookmark();}}else{console.warn("No idea how to store the current selection for this browser!");}}return bm;},moveToBookmark:function(_9){var _a=_4.doc,_b=_9.mark;if(_b){if(_4.global.getSelection){var _c=_4.global.getSelection();if(_c&&_c.removeAllRanges){if(_b.pRange){var r=_b;var n=r.node;n.selectionStart=r.start;n.selectionEnd=r.end;}else{_c.removeAllRanges();_c.addRange(_b);}}else{console.warn("No idea how to restore selection for this browser!");}}else{if(_a.selection&&_b){var rg;if(_b.pRange){rg=_b.range;}else{if(_4.isArray(_b)){rg=_a.body.createControlRange();_4.forEach(_b,function(n){rg.addElement(n);});}else{rg=_a.body.createTextRange();rg.moveToBookmark(_b);}}rg.select();}}}},getFocus:function(_d,_e){var _f=!_5._curFocus||(_d&&_4.isDescendant(_5._curFocus,_d.domNode))?_5._prevFocus:_5._curFocus;return {node:_f,bookmark:(_f==_5._curFocus)&&_4.withGlobal(_e||_4.global,_5.getBookmark),openedForWindow:_e};},focus:function(_10){if(!_10){return;}var _11="node" in _10?_10.node:_10,_12=_10.bookmark,_13=_10.openedForWindow,_14=_12?_12.isCollapsed:false;if(_11){var _15=(_11.tagName.toLowerCase()=="iframe")?_11.contentWindow:_11;if(_15&&_15.focus){try{_15.focus();}catch(e){}}_5._onFocusNode(_11);}if(_12&&_4.withGlobal(_13||_4.global,_5.isCollapsed)&&!_14){if(_13){_13.focus();}try{_4.withGlobal(_13||_4.global,_5.moveToBookmark,null,[_12]);}catch(e2){}}},_activeStack:[],registerIframe:function(_16){return _5.registerWin(_16.contentWindow,_16);},unregisterIframe:function(_17){_5.unregisterWin(_17);},registerWin:function(_18,_19){var _1a=function(evt){_5._justMouseDowned=true;setTimeout(function(){_5._justMouseDowned=false;},0);if(_4.isIE&&evt&&evt.srcElement&&evt.srcElement.parentNode==null){return;}_5._onTouchNode(_19||evt.target||evt.srcElement,"mouse");};var doc=_4.isIE?_18.document.documentElement:_18.document;if(doc){if(_4.isIE){_18.document.body.attachEvent("onmousedown",_1a);var _1b=function(evt){if(evt.srcElement.tagName.toLowerCase()!="#document"&&_5.isTabNavigable(evt.srcElement)){_5._onFocusNode(_19||evt.srcElement);}else{_5._onTouchNode(_19||evt.srcElement);}};doc.attachEvent("onactivate",_1b);var _1c=function(evt){_5._onBlurNode(_19||evt.srcElement);};doc.attachEvent("ondeactivate",_1c);return function(){_18.document.detachEvent("onmousedown",_1a);doc.detachEvent("onactivate",_1b);doc.detachEvent("ondeactivate",_1c);doc=null;};}else{doc.body.addEventListener("mousedown",_1a,true);var _1d=function(evt){_5._onFocusNode(_19||evt.target);};doc.addEventListener("focus",_1d,true);var _1e=function(evt){_5._onBlurNode(_19||evt.target);};doc.addEventListener("blur",_1e,true);return function(){doc.body.removeEventListener("mousedown",_1a,true);doc.removeEventListener("focus",_1d,true);doc.removeEventListener("blur",_1e,true);doc=null;};}}},unregisterWin:function(_1f){_1f&&_1f();},_onBlurNode:function(_20){_5._prevFocus=_5._curFocus;_5._curFocus=null;if(_5._justMouseDowned){return;}if(_5._clearActiveWidgetsTimer){clearTimeout(_5._clearActiveWidgetsTimer);}_5._clearActiveWidgetsTimer=setTimeout(function(){delete _5._clearActiveWidgetsTimer;_5._setStack([]);_5._prevFocus=null;},100);},_onTouchNode:function(_21,by){if(_5._clearActiveWidgetsTimer){clearTimeout(_5._clearActiveWidgetsTimer);delete _5._clearActiveWidgetsTimer;}var _22=[];try{while(_21){var _23=_4.attr(_21,"dijitPopupParent");if(_23){_21=_5.byId(_23).domNode;}else{if(_21.tagName&&_21.tagName.toLowerCase()=="body"){if(_21===_4.body()){break;}_21=_4.window.get(_21.ownerDocument).frameElement;}else{var id=_21.getAttribute&&_21.getAttribute("widgetId"),_24=id&&_5.byId(id);if(_24&&!(by=="mouse"&&_24.get("disabled"))){_22.unshift(id);}_21=_21.parentNode;}}}}catch(e){}_5._setStack(_22,by);},_onFocusNode:function(_25){if(!_25){return;}if(_25.nodeType==9){return;}_5._onTouchNode(_25);if(_25==_5._curFocus){return;}if(_5._curFocus){_5._prevFocus=_5._curFocus;}_5._curFocus=_25;_4.publish("focusNode",[_25]);},_setStack:function(_26,by){var _27=_5._activeStack;_5._activeStack=_26;for(var _28=0;_28<Math.min(_27.length,_26.length);_28++){if(_27[_28]!=_26[_28]){break;}}var _29;for(var i=_27.length-1;i>=_28;i--){_29=_5.byId(_27[i]);if(_29){_29._focused=false;_29.set("focused",false);_29._hasBeenBlurred=true;if(_29._onBlur){_29._onBlur(by);}_4.publish("widgetBlur",[_29,by]);}}for(i=_28;i<_26.length;i++){_29=_5.byId(_26[i]);if(_29){_29._focused=true;_29.set("focused",true);if(_29._onFocus){_29._onFocus(by);}_4.publish("widgetFocus",[_29,by]);}}}});_4.addOnLoad(function(){var _2a=_5.registerWin(window);if(_4.isIE){_4.addOnWindowUnload(function(){_5.unregisterWin(_2a);_2a=null;});}});}}};});