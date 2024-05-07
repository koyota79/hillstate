/*
=================================
img-touch-canvas - v0.1
http://github.com/rombdn/img-touch-canvas
 
(c) 2013 Romain BEAUDON
This code may be freely distributed under the MIT License
=================================
*/
 
 
(function() {
    var root = this; //global object
 
    var ImgTouchCanvas = function(options) {
        if( !options || !options.canvas || !options.path) {
            throw 'ImgZoom constructor: missing arguments canvas or path';
        }
 
        this.canvas         = options.canvas;
        this.canvas.width   = this.canvas.clientWidth;
        this.canvas.height  = this.canvas.clientHeight;
        this.context        = this.canvas.getContext('2d');
        this.divLayer       = options.dimLayer
        this.desktop        = options.desktop || false; //non touch events
        this.isActive       = options.isActive
 
        this.position = {
            x: 0,
            y: 0
        };
        this.scale = {
            x: 0.5,
            y: 0.5
        };
        this.mousePos = {x : 0 ,y : 0 ,easeValue : 0.03 ,startX : 0 ,startY : 0}
        this.calcPos  = {x : 0 ,y : 0}
        this.markerPos = {}
        this.touchPos = {x : 0 ,y : 0 ,tempPosX : 0 , tempPosY : 0 ,touchBetween : {x:0,y:0} ,rotationAngle : 0}
        this.sTime     = 0
        this.dragging = 0
        this.zoomCutLine = {s : 0.25 ,isTrue : true}
        this.calcSpeed = 0.0001
        this.easeSpeed = 0.05
        this.imgTexture = new Image();
        this.imgTexture.src = options.path;

        this.markerImage = new Image();
        this.markerImage.src = require("../assets/images/marker2.jpg");
        this.markerShow = null;
        
        this.lastZoomScale = null;
        this.lastX = null;
        this.lastY = null;
 
        this.mdown = false; //desktop drag
        this.fontSize = 30
        this.zoomFade = 0
        this.init = false;
        this.shopNmArryPos = options.shopNmPos
        this.shopIdPos = {}
        this.isPinch = false
        this.targetX = 0;  // 목표 x 좌표
        this.speed = 5;  // 이동 속도


        this.checkRequestAnimationFrame();
        requestAnimationFrame(this.animate.bind(this));
 
        this.setEventListeners();
    };
 
 
    ImgTouchCanvas.prototype = {
        animate: function(timestamp) {
            //set scale such as image cover all the canvas
            if(!this.init) {
                if(this.imgTexture.width) {
                    var scaleRatio = null;
                    if(this.canvas.clientWidth > this.canvas.clientHeight) {
                        scaleRatio = this.canvas.clientWidth / this.imgTexture.width;
                    }
                    else {
                        scaleRatio = this.canvas.clientHeight / this.imgTexture.height;
                    }
 
                    this.scale.x = scaleRatio;
                    this.scale.y = scaleRatio;
                    this.init = true;

                }
            }
 



            // let elapsed = 0
            // if(this.sTime === 0){
            //     this.sTime = timestamp
            // }


            //this.touchPos.rotationAngle = 45
            //this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.context.reset();
            // this.context.translate(this.position.x  , this.position.y);

            //this.doRotate()
            this.context.translate(this.position.x ,this.position.y);
            this.context.drawImage(
                this.imgTexture,
                0, 0,
                this.scale.x * this.imgTexture.width,
                this.scale.y * this.imgTexture.height);
            this.context.translate(-this.position.x ,-this.position.y);

       
       
            this.selectedShop()
            if(this.markerShow != null){
                this.markerDraw(this.markerShow)
            }
            this.setFillText()
              // this.touchPos.rotationAngle = this.touchPos.rotationAngle + 1
            // if (this.dragging > 1 ) {
                
            //     if(this.position.x >= 0){
            //         this.position.x = (this.position.x  + this.speed )
            //         if (this.position.x < this.targetX ) this.position.x = this.targetX ;
            //     }else{
            //         this.position.x =  -(Math.abs(this.position.x ) + this.speed )
            //         if (this.position.x > this.targetX ) this.position.x = this.targetX ;
            //     }
            // }
            requestAnimationFrame(this.animate.bind(this));
        },
        gesturePinchZoom: function(event) {
            var zoom = false;
  
            if( event.targetTouches.length >= 2 ) {
                var p1 = event.targetTouches[0];
                var p2 = event.targetTouches[1];
                var zoomScale = Math.sqrt(Math.pow(p2.pageX - p1.pageX, 2) + Math.pow(p2.pageY - p1.pageY, 2)); //euclidian distance
 
                if( this.lastZoomScale ) {
                    zoom = zoomScale - this.lastZoomScale;
                }
 
                this.lastZoomScale = zoomScale;
                this.touchPos.touchBetween.x = (p2.pageX - p1.pageX) / 2
                this.touchPos.touchBetween.y = (p2.pageY - p1.pageY) / 2
            }
 
            return zoom;
        },
 
        doZoom: function(zoom) {
            if(!zoom) return;
           // console.log('zoom = ' , this.scale.x)
            //new scale
            var currentScale = this.scale.x;
            var newScale = this.scale.x + zoom/400;
 
            //최소 줌 스케일
            if(newScale <= this.zoomCutLine.s -0.01 ){
                return
            }
            //some helpers
            var deltaScale      = newScale - currentScale;
            var currentWidth    = (this.imgTexture.width * this.scale.x);
            var currentHeight   = (this.imgTexture.height * this.scale.y);
            var deltaWidth      = this.imgTexture.width*deltaScale;
            var deltaHeight     = this.imgTexture.height*deltaScale;
 
 
            //by default scale doesnt change position and only add/remove pixel to right and bottom
            //so we must move the image to the left to keep the image centered
            //ex: coefX and coefY = 0.5 when image is centered <=> move image to the left 0.5x pixels added to the right
            var canvasmiddleX = this.canvas.clientWidth / 2;
            var canvasmiddleY = this.canvas.clientHeight / 2;
            var xonmap = (-this.position.x) + canvasmiddleX;
            var yonmap = (-this.position.y) + canvasmiddleY;
            var coefX = -xonmap / (currentWidth);
            var coefY = -yonmap / (currentHeight);
            var newPosX = this.position.x + deltaWidth*coefX;
            var newPosY = this.position.y + deltaHeight*coefY;
 
            //edges cases
            var newWidth = currentWidth + deltaWidth;
            var newHeight = currentHeight + deltaHeight;
 
			//console.log(newPosX  , newPosY)


            //if( newWidth < this.canvas.clientWidth ) return;
            // if( newPosX > 0 ) { newPosX = 0; }
            // if( newPosX + newWidth < this.canvas.clientWidth ) { newPosX = this.canvas.clientWidth - newWidth;}
 

            // if( newHeight < this.canvas.clientHeight ) return;
            // if( newPosY > 0 ) { newPosY = 0; }
            // if( newPosY + newHeight < this.canvas.clientHeight ) { newPosY = this.canvas.clientHeight - newHeight; }
 
 
            //finally affectations
            this.scale.x    = newScale;
            this.scale.y    = newScale;
            this.position.x = newPosX;
            this.position.y = newPosY;
        },
        doRotate : function() {
            if(this.touchPos.rotationAngle != 0 ){
           
                var canvasmiddleX = this.canvas.clientWidth / 2;
                var canvasmiddleY = this.canvas.clientHeight / 2;


                this.context.translate(this.position.x + canvasmiddleX , this.position.y + canvasmiddleY);
                this.context.rotate(this.touchPos.rotationAngle * (Math.PI/180));
                this.context.translate(- (this.position.x + canvasmiddleX) , - (this.position.y + canvasmiddleY) );
            }

        },
        doMove: function(relativeX, relativeY) {

            if(this.lastX && this.lastY) {
              var deltaX = (relativeX - this.lastX);
              var deltaY = (relativeY - this.lastY);
 
              this.position.x += deltaX;
              this.position.y += deltaY;
 
              var currentWidth    = (this.imgTexture.width * this.scale.x);
              var currentHeight   = (this.imgTexture.height * this.scale.y);
              var zoomWidth       = (this.canvas.width * this.scale.x)

            //   if( (this.position.x + currentWidth) < this.canvas.clientWidth ) {
                
            //       this.position.x = this.canvas.clientWidth - currentWidth;
            //       console.log('(this.position.x + currentWidth)' , this.position.x)
            //   }

            //   if( this.position.y + currentHeight < this.canvas.clientHeight ) {
            //     this.position.y = this.canvas.clientHeight - currentHeight;
            //   }
              //edge cases
            //   if( this.position.x > 0 ) {
            //     this.position.x = 0;
            //   }
            //   else if( this.position.x + currentWidth < this.canvas.clientWidth ) {
            //     this.position.x = this.canvas.clientWidth - currentWidth;
            //   }
            //   if( this.position.y > 0 ) {
            //     this.position.y = 0;
            //   }
            //   else if( this.position.y + currentHeight < this.canvas.clientHeight ) {
            //     this.position.y = this.canvas.clientHeight - currentHeight;
            //   }
            
            }
 
            this.lastX = relativeX;
            this.lastY = relativeY;
        },
        setFillText: function() {
            //this.context.fillText('test123',100,100)

            let tfontSize = this.fontSize * this.scale.x 
            this.context.font = tfontSize + "px NanumGothic";
            this.context.fillStyle = "black";
            const lineheight = 15;
            let floor = ''
            if(this.scale.x <=  this.zoomCutLine.s  ){
                this.context.globalAlpha = 0
               //this.zoomCutLine.isTrue = false
            }

            for(let i = 0; i < this.shopNmArryPos.length; i++){

                let item = this.shopNmArryPos[i]
                this.shopIdPos[item.shop_id] = {x : item.x ,y : item.y ,px :item.px ,py : item.py} //매장 위치좌표
                let lines = item.shop_nm.split('\n');
                let posX = (item.x * this.scale.x )
                let posY = (item.y * this.scale.y )
                for (let k = 0; k < lines.length; k++) {
                    this.context.fillText(lines[k], (posX + this.position.x), (posY + this.position.y) + (k * lineheight));
                }
                floor = item.position //층별
            }


            //상점명이 사라지기전에 층 호수 fade 시작하기 위해 0.07을 더한다
            if(this.scale.x <=  (this.zoomCutLine.s+0.07) ){
                this.zoomFade = 0
                //0부터 시작하기 위해 scale 값이 0.6이므로 차감하고 시작,4배수 
                this.zoomFade += ((( (1 - Math.abs(this.scale.x) )) -0.6).toFixed(2) * 4 ) 
                let alpha  = this.zoomFade >= 0.6 ? 1 : this.zoomFade
                this.context.globalAlpha =  alpha

                let tfontSize = 275 * this.scale.x 
                this.context.font = tfontSize + "px NanumGothic";

                let fx = (580 * this.scale.x) 
                let fy = (730 * this.scale.y) 
                this.context.fillText(floor +'F' , ( fx + this.position.x) ,( fy + this.position.y )) 
            }

        

        },
        selectedShop :function(){
            //console.log('this.zoomFade', this.zoomFade)
            for(let i=0; i < this.shopNmArryPos.length; i++){
                let item = this.shopNmArryPos[i]
                //this.shopIdPos[item.shop_id] = {x :item.px ,y : item.py} //매장 위치좌표
                let posX = (item.x * this.scale.x ) //parseInt(item.x * this.scale.x )
                let posY = ((item.y - this.fontSize) * this.scale.y) //parseInt(item.y * this.scale.y )
           
                let areaX1 = (posX + this.position.x) //- parseInt(item.mapW * this.scale.x ) 
                let areaX2 = (posX + this.position.x + (item.mapW * this.scale.x) )   //(posX + this.position.x) + parseInt(item.mapW * this.scale.x ) 
                let areaY1 = (posY + this.position.y) //- parseInt(item.mapH * this.scale.y )
                let areaY2 = (posY + this.position.y + (item.mapH * this.scale.y) )  //(posY + this.position.y) + parseInt(item.mapH * this.scale.y ) 

                let calcX = this.calcPos.x + this.position.x
                let calcY = this.calcPos.y + this.position.y

                //console.log('this.context.globalAlpha' , this.context.globalAlpha)

                if(this.scale.x <=  this.zoomCutLine.s ){//최소줌일경우
                    this.markerImage.width = 0
                    this.markerImage.height = 0
                }else{
                    this.markerImage.width = 80
                    this.markerImage.height = 80
                }


                //마커 위치
                this.markerPos[item.shop_id] = {'x': posX, 'y': posY - ((this.markerImage.height)* this.scale.y)  }

              //  console.log(areaX1 , 'selectedShop', areaY1)
                // this.context.beginPath()
                // this.context.moveTo(areaX1 , areaY1)
                // this.context.lineTo(areaX2 , areaY1)
                // this.context.lineTo(areaX2 , areaY2)
                // this.context.lineTo(areaX1 , areaY2)
                // this.context.stroke()

   
                if( (this.dragging == 0 && this.isPinch) &&  (areaX1 <= calcX && areaX2 >= calcX && 
                    areaY1 <= calcY && areaY2 >= calcY)  ){ //&& this.calcPos.x == calcX
                    this.divLayer.classList.remove('btn-close')
                    const layerShopNm = document.getElementById('layer-title')
                    layerShopNm.innerHTML = item.shop_nm
                    const layerShopDetail = document.getElementById('layer-cont')
                    let shopInfo = '위치 : ' + item.position +'층 (' +  item.position_nm + ') 구역 <br> 영업시간 : ' + item.open_time + ' ~ ' + item.close_time
                    layerShopDetail.innerHTML = shopInfo
                    this.dragging = 1 
                    this.markerShow  = null //이미지 마커
                    this.isActive.value = false //하단 메뉴 숨기기

                }
                
            }
        },
        imgMarker : function(id){
            console.log('shopPos' , this.markerPos[id])
            this.markerShow = id
            //console.log('this.touchPos.touchBetween' , this.touchPos.touchBetween)
           
        },
        markerDraw(id){
            let pos = this.markerPos[id]

            this.context.drawImage(
                this.markerImage,
                this.position.x + pos.x , this.position.y + pos.y ,
                this.scale.x * this.markerImage.width,
                this.scale.y * this.markerImage.height
            );  
        },
        menuClickShop: function(id) {
            console.log('this.shopIdPos[idx]' ,this.shopIdPos[id] )
            if(this.shopIdPos[id] === undefined || this.shopIdPos[id] === 'undefined')
                return

            this.markerImage.width = 80
            this.markerImage.height = 80

            this.scale.x  = 0.5
            this.scale.y  = 0.5
            this.position.x = this.shopIdPos[id].px
            this.position.y = this.shopIdPos[id].py
            this.imgMarker(id)

        },
        setEventListeners: function() {
            // touch
            this.canvas.addEventListener('touchstart', function(e) {
                this.lastX          = null;
                this.lastY          = null;
                this.lastZoomScale  = null;
                this.isPinch        = false
                this.dragging       = 0
                this.calcPos.x      = e.touches[0].clientX - (this.position.x + this.canvas.getBoundingClientRect().left)
                this.calcPos.y      = e.touches[0].clientY - (this.position.y + this.canvas.getBoundingClientRect().top)
                console.log(this.calcPos.x , ' this.calcPos.x ' , this.calcPos.y)


                if(e.targetTouches.length > 1) {
                    console.log('tyleof' ,typeof e.rotation)
                }
                //this.touchPos.startAngle = Math.atan2(e.touches[0].clientY - canvas.height / 2, e.touches[0].clientX - canvas.width / 2);
                
                //this.mousePos.easeValue = this.easeSpeed
            }.bind(this));
 
            this.canvas.addEventListener('touchmove', function(e) {
                e.preventDefault();
                 
                if(e.targetTouches.length == 2) { //pinch
                    this.isPinch = false
                    this.doZoom(this.gesturePinchZoom(e));
                    // this.touchPos.currentAngle = Math.atan2(e.touches[0].clientY - this.canvas.height / 2, e.touches[0].clientX - this.canvas.width / 2);
                    // this.touchPos.rotationAngle = (this.touchPos.currentAngle - this.touchPos.startAngle) ;
                }
                else if(e.targetTouches.length == 1) {
                    var relativeX = e.targetTouches[0].pageX - this.canvas.getBoundingClientRect().left;
                    var relativeY = e.targetTouches[0].pageY - this.canvas.getBoundingClientRect().top; 
                    let scaleSizeX = 0
                    let scaleSizeX2 = 0
                        scaleSizeX  = parseInt( (this.canvas.width * this.scale.x )) * 6
                        scaleSizeX2 = parseInt( ((this.canvas.width) * (this.scale.x * 2) )) 
                        console.log(scaleSizeX, 'scaleSizeX' , (scaleSizeX2 - 50) , '::position::' ,this.position.x )
                    if(this.position.x < -(this.position.x  +  scaleSizeX) ){
                       this.position.x = -(this.position.x  +  scaleSizeX) 
                    }else if(this.position.x >= (scaleSizeX2 - 50) ){
                        this.position.x = (scaleSizeX2 - 50)
               
                        
                    }

                    

                    this.doMove(relativeX, relativeY);
                }
                this.dragging = relativeX
            }.bind(this));
 
            this.canvas.addEventListener('touchend', function(e) {
                e.preventDefault();    
                this.targetX = (30 + Math.abs(this.position.x))
                this.isPinch  = true
            }.bind(this));


            if(this.desktop) {

                window.addEventListener('wheel', function(e) {
                    e.preventDefault();
                    if(e.deltaY < 0  ) { //+
                        this.doZoom(5);
                    } else {//-
                        this.doZoom(-5);
                    }
                }.bind(this) , { passive: false } );

                // keyboard+mouse
                window.addEventListener('keyup', function(e) {
                    if(e.keyCode == 187 || e.keyCode == 61) { //+
                        this.doZoom(5);
                    }
                    else if(e.keyCode == 54) {//-
                        this.doZoom(-5);
                    }
                }.bind(this));
 
                window.addEventListener('mousedown', function(e) {
                    this.mdown = true;
                    this.lastX = null;
                    this.lastY = null;
                    console.log(this.position.x ,'::::position::::' ,this.position.y)

                }.bind(this));
 
                window.addEventListener('mouseup', function(e) {
                    this.mdown = false;
                }.bind(this));
 
                window.addEventListener('mousemove', function(e) {
                    var relativeX = e.pageX - this.canvas.getBoundingClientRect().left;
                    var relativeY = e.pageY - this.canvas.getBoundingClientRect().top;
 
                    if(e.target == this.canvas && this.mdown) {
                        this.doMove(relativeX, relativeY);
                    }
 
                    if(relativeX <= 0 || relativeX >= this.canvas.clientWidth || relativeY <= 0 || relativeY >= this.canvas.clientHeight) {
                        this.mdown = false;
                    }
                }.bind(this));
            }
        },
 
        checkRequestAnimationFrame: function() {
            var lastTime = 0;
            var vendors = ['ms', 'moz', 'webkit', 'o'];
            for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
                window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
                window.cancelAnimationFrame =
                  window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
            }
 
            if (!window.requestAnimationFrame) {
                window.requestAnimationFrame = function(callback, element) {
                    var currTime = new Date().getTime();
                    var timeToCall = Math.max(0, 16 - (currTime - lastTime));
                    var id = window.setTimeout(function() { callback(currTime + timeToCall); },
                      timeToCall);
                    lastTime = currTime + timeToCall;
                    return id;
                };
            }
 
            if (!window.cancelAnimationFrame) {
                window.cancelAnimationFrame = function(id) {
                    clearTimeout(id);
                };
            }
        }
    };
 
    root.ImgTouchCanvas = ImgTouchCanvas;
}).call(this);