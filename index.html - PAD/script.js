// =====================
// 台北時間
// =====================

function updateTaipeiTime(){

    const now = new Date();


    document.getElementById("time").textContent =
    new Intl.DateTimeFormat(
        "zh-TW",
        {
            timeZone:"Asia/Taipei",
            hour:"2-digit",
            minute:"2-digit",
            second:"2-digit",
            hour12:false
        }
    ).format(now);



    document.getElementById("date").textContent =
    new Intl.DateTimeFormat(
        "zh-TW",
        {
            timeZone:"Asia/Taipei",
            year:"numeric",
            month:"long",
            day:"numeric",
            weekday:"long"
        }
    ).format(now);

}


updateTaipeiTime();

setInterval(updateTaipeiTime,1000);





// =====================
// 元件
// =====================


const card =
document.getElementById("clockCard");


const background =
document.getElementById("background");


const settingsBtn =
document.getElementById("settingsBtn");


const settingsPanel =
document.getElementById("settingsPanel");


const resizeHandle =
document.getElementById("resizeHandle");





// =====================
// 設定面板
// =====================


settingsBtn.onclick=function(e){

    e.stopPropagation();

    settingsPanel.classList.toggle("show");

};



document.addEventListener(
"pointerdown",
(e)=>{


    if(
        !settingsPanel.contains(e.target)
        &&
        !settingsBtn.contains(e.target)
    ){

        settingsPanel.classList.remove("show");

    }


});






// =====================
// 背景圖片
// =====================


const imageInput =
document.getElementById("imageInput");


const changeBackground =
document.getElementById("changeBackground");



let savedImage =
localStorage.getItem(
"taipeiWallpaper"
);



if(savedImage){

    background.style.backgroundImage =
    `url(${savedImage})`;

}



changeBackground.onclick=function(){

    imageInput.click();

};



imageInput.onchange=function(e){


    const file=e.target.files[0];


    if(!file)return;



    const reader=new FileReader();



    reader.onload=function(){


        background.style.backgroundImage =
        `url(${reader.result})`;



        localStorage.setItem(
            "taipeiWallpaper",
            reader.result
        );


    };



    reader.readAsDataURL(file);


};







// =====================
// 時間卡移動
// =====================


let moving=false;


let startX;
let startY;

let startLeft;
let startTop;



let savedPosition =
JSON.parse(
localStorage.getItem("clockPosition")
);



if(savedPosition){

    card.style.left =
    savedPosition.left+"px";


    card.style.top =
    savedPosition.top+"px";

}





card.addEventListener(
"pointerdown",
(e)=>{


    if(e.target===resizeHandle)
    return;



    moving=true;



    startX=e.clientX;

    startY=e.clientY;



    startLeft=card.offsetLeft;

    startTop=card.offsetTop;



});




document.addEventListener(
"pointermove",
(e)=>{


    if(!moving)
    return;



    card.style.left =
    startLeft+
    e.clientX-startX+
    "px";



    card.style.top =
    startTop+
    e.clientY-startY+
    "px";


});





document.addEventListener(
"pointerup",
()=>{


    if(moving){


        moving=false;



        localStorage.setItem(
            "clockPosition",
            JSON.stringify({

                left:card.offsetLeft,

                top:card.offsetTop

            })
        );

    }


});







// =====================
// 時間卡縮放
// =====================


let scale =
Number(
localStorage.getItem("clockScale")
)
||1;



function updateScale(){


    card.style.transform =
    `scale(${scale})`;


}



updateScale();



let resizing=false;


let resizeStartX;


let resizeStartScale;




resizeHandle.addEventListener(
"pointerdown",
(e)=>{


    resizing=true;


    resizeStartX=e.clientX;


    resizeStartScale=scale;


});





document.addEventListener(
"pointermove",
(e)=>{


    if(!resizing)
    return;



    scale =
    resizeStartScale+
    (e.clientX-resizeStartX)/200;



    scale=Math.max(
        .5,
        Math.min(
            2,
            scale
        )
    );



    updateScale();



});





document.addEventListener(
"pointerup",
()=>{


    if(resizing){


        resizing=false;



        localStorage.setItem(
            "clockScale",
            scale
        );


    }


});







// =====================
// 透明度
// =====================


opacitySlider.addEventListener(
"input",
function(){

    card.style.background =
    `rgba(255,255,255,${this.value})`;

    localStorage.setItem(
        "cardOpacity",
        this.value
    );

});





// =====================
// 模糊
// =====================



blurSlider.addEventListener(
"input",
function(){

    card.style.backdropFilter =
    `blur(${this.value}px)`;

    card.style.webkitBackdropFilter =
    `blur(${this.value}px)`;

    localStorage.setItem(
        "cardBlur",
        this.value
    );

});




// =====================
// 全螢幕
// =====================


const fullscreenBtn =
document.getElementById("fullscreen");


fullscreenBtn.onclick=function(){

    let elem=document.documentElement;


    if(
        !document.fullscreenElement &&
        !document.webkitFullscreenElement
    ){

        if(elem.requestFullscreen){

            elem.requestFullscreen();

        }
        else if(elem.webkitRequestFullscreen){

            elem.webkitRequestFullscreen();

        }

    }
    else{

        if(document.exitFullscreen){

            document.exitFullscreen();

        }
        else if(document.webkitExitFullscreen){

            document.webkitExitFullscreen();

        }

    }

};