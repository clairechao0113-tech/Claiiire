
// =====================
// 台北時間
// =====================

function updateTaipeiTime(){

    const now = new Date();


    const time = new Intl.DateTimeFormat(
        "zh-TW",
        {
            timeZone:"Asia/Taipei",
            hour:"2-digit",
            minute:"2-digit",
            second:"2-digit",
            hour12:false
        }
    ).format(now);



    const date = new Intl.DateTimeFormat(
        "zh-TW",
        {
            timeZone:"Asia/Taipei",
            year:"numeric",
            month:"long",
            day:"numeric",
            weekday:"long"
        }
    ).format(now);



    document.getElementById("time").textContent = time;

    document.getElementById("date").textContent = date;

}


updateTaipeiTime();

setInterval(updateTaipeiTime,1000);




// =====================
// 背景圖片
// =====================

const background =
document.getElementById("background");


const imageInput =
document.getElementById("imageInput");



const savedImage =
localStorage.getItem("taipeiWallpaper");



if(savedImage){

    background.style.backgroundImage =
    `url(${savedImage})`;

}



document
.getElementById("changeBackground")
.onclick=function(){

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
// 時間卡拖曳
// Pointer Events
// =====================

const card =
document.getElementById("clockCard");


let dragging=false;

let startX=0;
let startY=0;


let startLeft=0;
let startTop=0;



// 載入之前的位置

const savedPosition =
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
function(e){

    dragging=true;


    card.setPointerCapture(
        e.pointerId
    );


    startX=e.clientX;

    startY=e.clientY;


    startLeft=card.offsetLeft;

    startTop=card.offsetTop;



    card.style.transition="none";

});





card.addEventListener(
"pointermove",
function(e){

    if(!dragging)return;


    let newLeft =
    startLeft + 
    (e.clientX-startX);



    let newTop =
    startTop +
    (e.clientY-startY);



    // 限制不要拖出畫面

    newLeft=Math.max(
        0,
        Math.min(
            window.innerWidth-card.offsetWidth,
            newLeft
        )
    );


    newTop=Math.max(
        0,
        Math.min(
            window.innerHeight-card.offsetHeight,
            newTop
        )
    );



    card.style.left =
    newLeft+"px";


    card.style.top =
    newTop+"px";

});






card.addEventListener(
"pointerup",
function(){

    dragging=false;


    card.style.transition=
    "transform .2s ease";



    localStorage.setItem(
        "clockPosition",
        JSON.stringify({

            left:card.offsetLeft,

            top:card.offsetTop

        })
    );

});




// =====================
// 鎖定位置
// =====================

let locked=false;


document
.getElementById("lockPosition")
.onclick=function(){


    locked=!locked;



    this.textContent =
    locked
    ? "🔒 已鎖定"
    : "🔓 鎖定位置";



    if(locked){

        card.style.pointerEvents="none";

    }
    else{

        card.style.pointerEvents="auto";

    }

};


