
var img, frame, slide;
var frameCt = 0;
var timerID;
var flgDebug = 1;


var slidesA = null;
/*
 * Example
 slidesA = {
              
           'black':{code:'BLACK',caption:'',src:'/images/slide_black.png'},
           'c_once':{code:'OAUT',caption:'Once Upon a Time',src:'/images/slide_once_upon_a_time.png'},
           'universum':{code:'UNIV',caption:'Universum',src:'/images/slide_001_universum.png'},
           'c_age_of_discovery':{code:'AOD',caption:'The Age of Discovery',src:'/images/slide_age_of_discovery.png'},
           'c_mystery_replaced':{code:'AOD',caption:'Mystery replaced',src:'/images/slide_mystery_replaced.png'},
           'c_mystery_never_lost':{code:'AOD',caption:'Mystery never really lost',src:'/images/slide_mystery_never_lost.png'},
           'universum_stars':{code:'UNIVS',caption:'Mystery never really lost',src:'/images/slide_universum_stars.png'},
           'stars2':{code:'STARS2',caption:'Starfield 2',src:'/images/slide_stars2.png'},
           'stars3':{code:'STARS3',caption:'Starfield 3',src:'/images/slide_stars3.png'},
           'neta_white':{code:'NETAW',caption:'Netazoic',src:'/images/slide_netazoic_white.png'},
           'neta_trans':{code:'NETATR',caption:'Netazoic',src:'/images/slide_netazoic_trans.png'}
};
*/


var frames = null;
/*
 * Example:
 frames = [
          {id: 'frame1', img: 'black',opacity:1,duration:100,scale:1.0,x:0,y:0 },
          {id: 'frame2', img: 'c_once',opacity:1,duration:300,scale:1.0,x:0,y:0, class:'caption',delay:200 },
          {id: 'frame3',img: 'universum',opacity:1,duration:200,scale:1.1,x:0,y:0 },
          {id: 'frame4',img: 'universum',opacity:1,duration:400,scale:1.1,x:10,y:10, delay:300},
          {id: 'frame4.1', img: 'c_once',opacity:0,duration:200,scale:1.0,delay:10 },
          {id: 'frame5.0',img: 'c_age_of_discovery',opacity:1,duration:400,scale:1,x:0,y:0, class:'caption',delay:20 },
          {id: 'frame5.1',img: 'universum',opacity:1,duration:400,scale:1.2,x:40,y:40},
          {id: 'frame5.2',img: 'c_age_of_discovery',opacity:0,duration:200,scale:1,x:0,y:0, class:'caption',delay:10 },
          {id: 'frame5.4',img: 'c_mystery_replaced',opacity:1,duration:200,scale:1,x:0,y:0, class:'caption' },
          {id: 'frame5.1',img: 'c_mystery_replaced',opacity:0,duration:200,scale:1,delay:180},   
          {id: 'frame7.2',img: 'universum',opacity:0,duration:10,scale:1,x:0,y:0  },
          {id: 'frame5.1.1',img: 'universum_stars',opacity:0,duration:1,scale:1.1},
          {id: 'frame5.1.1',img: 'universum_stars',opacity:1,duration:400,scale:1,delay:40},
          {id: 'frame5.2',img: 'c_mystery_never_lost',opacity:1,duration:300,scale:1,class:'caption'},
         {id: 'frame6',img: 'stars3',opacity:1,duration:400,scale:1.1,x:0,y:0,delay:20 },
          {id: 'frame5.2',img: 'c_mystery_never_lost',opacity:0,duration:300,scale:1,class:'caption',delay:10},
          {id: 'frame6.1',img: 'neta_white',opacity:1,duration:400,scale:1.1,x:0,y:0, class:'caption' },
          {id: 'frame6.1',img: 'neta_white',opacity:0,duration:400,scale:1.1,x:0,y:0,delay:300 },
          {id: 'frame7.1',img: 'neta_white',opacity:1,duration:100,scale:.4,x:100,y:100, class:'caption' },

          {id: 'frame7.2',img: 'stars3',opacity:0,duration:400,scale:1,x:0,y:0 },
          {id: 'frame77.3',img: 'black',opacity:1,duration:400,scale:1,x:0,y:0 }
              ];
*/

function setSlideControls(){
	$("#btnPauseSlides").click(function(){
		pauseSlide();
	});
	$("#nextSlide").click(function(){
		nextSlide();
	});
	$("prevSlide").click(function(){
		previousSlide();
	});
	$("btnStartSlides").click(function(){
		conosle.debug("click");
		startSlides();
	});
	$("#btnRestartSlides").click(function(){
		restartSlides();
	});
	
	$("#panel").hover(showSlideControls,hideSlideControls);

};




function runFrames(idx,delay){
	//loop through the slides and kenburns them using jQuery queue
	if(idx==null) idx = 0;
	if(idx > frames.length){
		return; //stop at end
	}
	frame = frames[idx];
	idx++;
	slide = slidesA[frame.img];
	img = $("#" + frame.img);
	if(!img[0]){ 
		img = $('<img id="' + frame.img+ '">'); 
		img.attr('src', slide.src);
		img.appendTo('#slideshow');
	}
		
	var fLoad = function(){
		var delay = frame.delay *10;
		if(!delay) delay = frame.duration*10;  //delay is current frame duration
		runFrames(idx,delay);
	};
	frameInfo(frame);
	runSlide(img,frame.duration,frame.scale,frame.opacity, frame.x,frame.y,frame.z,fLoad,delay);
	if(frame.class) img.addClass(frame.class);

}


function frameInfo(frm){
	if(!flgDebug) return;
	var info = frm.id +", "; 
	info +=	frm.img + ", ";
	info +=	frm.img + ", ";
	info +=	frm.duration + ", ";
	info +=	frm.opacity + ", ";
	info +=	frm.x + ", ";
	info +=	frm.y + ", ";
	info +=	frm.z + ", ";
	console.debug("frame: " + info );
}



function pauseSlide(){
	if(!img) return;
	console.debug("Stopping slide show");
	img.velocity("stop");
}

function nextSlide(){
	/*Next slide not really working
	// problems with trying to understand
	// the current state of the jquery Queue
	// For now, just making this a restart button
	*/
	restartSlides();
	/*
	runFrames(frameCt);
	frameCt++;
	*/
}

function startSlides(){
	//start at 0
	pauseSlide();
	$("#slideshow img").velocity({opacity:0});
	frameCt=0;
	runFrames(frameCt);
}

function restartSlides(){
	//for now restart at 0
	pauseSlide();
	$("#slideshow img").velocity({opacity:0});
	frameCt=0;
	runFrames(frameCt);
}

function previousSlide(){
	frameCt--;
	pauseSlide();
	runFrames(frameCt);
}

function runSlide(slide, duration, scale, opc, x,y,z, callBack,delay) {
    $(slide)

    .velocity({
      translateX: x,
      translateY: y,
      translateZ: z,
      rotateZ: '0deg',
      scale: scale,
      opacity: opc
    },{ duration:duration,
    	complete:callBack,
    	delay: delay});
}

var fadeSlide = function (slide, duration, opc) {
    $(slide)
      .velocity({
        translateZ: 0,
        rotateZ: '0deg',
        scale: 1,
        opacity: opc
      }, duration);
  }

var scaleSlide = function (slide, duration, scale, opc) {
	if(!opc) opc = $(slide).css("opacity");
    $(slide)
      .velocity({
        translateZ: 0,
        rotateZ: '0deg',
        scale: scale,
        opacity:opc
      }, duration);
  }

function showSlideControls(){

	var foo = $("#slideshow-controls");
	foo.show(400);
	//foo.velocity({opacity:1,duration:200});
}
function hideSlideControls(){
	var foo = $("#slideshow-controls");
	foo.hide(400);
	//foo.velocity({opacity:0,duration:200});
}

var zoom = function (slide, duration, scale, opc) {
	if(!opc) opc = $(slide).css("opacity");
    $(slide)
      .velocity({
        translateZ: 0,
        rotateZ: '0deg',
        scale: scale,
        opacity:opc
      }, duration);
  }

var zoomOut = function (slide, duration) {
    $(slide)
      .velocity({
        rotateZ: '0deg',
        scale: '1.1',
        opacity: 1
      }, 0)
      .velocity({
        translateZ: 0,
        rotateZ: '0deg',
        scale: '1',
        opacity: 0
      }, duration);
  }

var zoomIn = function (slide, duration) {
    $(slide)
      .velocity({
        rotateZ: '0deg',
        scale: '1',
        opacity:0
      }, 0)
      .velocity({
        translateZ: 0,
        rotateZ: '0deg',
        scale: '1.1',
        opacity:1
      }, duration);
  }
