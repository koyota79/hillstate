

const objShopMap = [{
        shopNmPos     : [
            {'shop_id' : 'B1001' ,'x': 30 ,'y': 180  , 'px' : 159 ,'py' : 118},
            {'shop_id' : 'B1002' ,'x': 450 ,'y': 380 , 'px' : -9 ,'py' : 45},
            {'shop_id' : 'B1003' ,'x': 950 ,'y': 400 , 'px' : -210 ,'py' : 50},

        ] ,
    } //B1
    ,{ //1층
        shopNmPos     : [
            {'shop_id' : '1001' ,'x': 30 ,'y': 180  , 'px' : 159 ,'py' : 118},
            {'shop_id' : '1002' ,'x': 450 ,'y': 380 , 'px' : -9 ,'py' : 45},
            {'shop_id' : '1003' ,'x': 950 ,'y': 400 , 'px' : -210 ,'py' : 50},
            {'shop_id' : '1004' ,'x': 650 ,'y': 200 , 'px' : -210 ,'py' : 50},

        ] ,
    },
    //2층
    {
        shopNmPos     : [
            {'shop_id' : '2001' ,'x': 20  ,'y': 180 , 'px' : 159  ,'py' : 118 ,'mapW' : 85 ,'mapH' : 25},
            {'shop_id' : '2002' ,'x': 450 ,'y': 380 , 'px' : -9   ,'py' : 45  ,'mapW' : 45 ,'mapH' : 25 },
            {'shop_id' : '2003' ,'x': 963 ,'y': 400 , 'px' : -210 ,'py' : 50  ,'mapW' : 65 ,'mapH' : 25},

        ] ,              
    } ,
    //3층
    {
        shopNmPos     : [
            {'shop_id' : '3001' ,'x': 30 ,'y': 180  , 'px' : 159 ,'py' : 118},
            // {'shop_id' : '3002' ,'x': 450 ,'y': 380 , 'px' : -9 ,'py' : 45},
            // {'shop_id' : '3003' ,'x': 950 ,'y': 400 , 'px' : -210 ,'py' : 50},

        ] ,  
    }
]

const fnFillText  =  (txt , x ,y ,ctxObj) => {
    let fontSize = 20    * ctxObj.start.zoomX
    ctxObj.font = fontSize + "px NanumGothic";
    ctxObj.fillStyle = "black";
    const lineheight = 12;
    const lines = txt.split('\n');

    let posX = (x * ctxObj.start.zoomX)
    let posY = (y * ctxObj.start.zoomY)
    for (let i = 0; i < lines.length; i++) {
        ctxObj.fillText(lines[i], (posX + ctxObj.start.tempX), (posY + ctxObj.start.tempY) + (i * lineheight));
    }
}
 
export { objShopMap ,fnFillText}  