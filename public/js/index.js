import { showAlert, removeAlerts } from './alert';

//store current darts
const darts = [];

//clean up alerts whenever a page is re - loaded
window.addEventListener('load', e => {
    //reload count?
    let reload_count = localStorage.getItem("reload_count");
    if(reload_count === null) {
        reload_count = 1;
    } else {
        reload_count++;
    }
    console.log(`page was reloaded ${reload_count} time${reload_count>1?'s':''}`)
    localStorage.setItem(`reload_count`, reload_count);

    // console.log('note alerts will be removed in 4 secs...');
    removeAlerts(4000);
});


//socket io for page refreshes after receiving and processing darts ... etc
const socket = io('http://localhost:8000');
socket.on("connect", () => {
    console.log(`socket connection id = [${socket.id}]`);
    socket.emit("client message", "Hello i am client and connected with you");
});


//format for DB consumption
const formatDart = (x, y, w, h, ts) => {
    const x1 = (x-w/2)*451/w;  //calc mm using bullseye as origin
    const y1 = (-y+h/2)*451/h;
    
    const dart = to_values(x1, y1); //get dart values [value, multiplier, radians, ...]

    const d = Math.sqrt(x1**2 + y1**2); //use calc mm for 451 mm board
    const dp = Math.sqrt(x**2 + y**2); //use pixels from web page instead of camera
    const dg = Math.floor(dart[2] * 180 / Math.PI); //convert from randians 
    
    const rec = {
        timestamp : ts,
        value : dart[0],
        multiplier: dart[1],
        coOrdsMM : { x : x1, y : y1 },
        coOrds: { x, y, w, h },
        vector: {
            degrees:  dg,
            distancepixels: dp,
            distancemm: d
        },
        debug: { delta: '0', camera_intersection: null }
    };

    return rec;
}

const showDart = (x, y, w, h, i) => {
    const parent = document.querySelector('.dartboard-content');
    const h_ratio = parent.offsetHeight / h;
    const w_ratio = parent.offsetWidth / w;
    const mark = document.createElement("div");
    mark.classList.add('mark');
    mark.inert=true;
    mark.style.left = Math.floor(x * w_ratio) + 'px';
    mark.style.top = Math.floor(y * h_ratio) + 'px';
    mark.dataset.index = i;
    // mark.style.backgroundImage=`url('/images/dartboard/dart${Math.floor(Math.random()*4)+1}.png')`;
    parent.appendChild(mark);

    const x1 = (x-w/2)*451/w;
    const y1 = (-y+h/2)*451/h;
    // console.log(`pixel x[${x-w/2}]; y[${-y+h/2}];; w[${w}]; ; h[${h}];`)
    // console.log(`mm x[${Math.round(x1*10**2)/10**2}]; y[${Math.round(y1*10**2)/10**2}];; w [${451}]; ; h[${451}];`)

    const dart = to_values(x1, y1);
    // console.log(`dartboard value[${dart[0]}]; mult[${dart[1]}]`);

    const list = document.querySelector('.dartboard-list');
    const item = document.createElement("li");
    item.classList.add('dartboard-list-item');
    const mult_desc = ['miss','single','double', 'triple'];
    item.style.color = ['red','black','blue','green'][dart[1]];
    item.textContent = `${mult_desc[dart[1]]} ${dart[0]}`;
    item.dataset.index = i;
    list.appendChild(item);
}

// const dartboard = document.querySelector('.dartboard-img');
const dartboard = document.querySelector('.dartboard-content');
if(dartboard) {
    console.log(`adding handler for dartboard image click ... `);
    dartboard.addEventListener('click', e => {
        //display new dart
        const xAdj = e.target.offsetLeft != 0 ? e.target.offsetLeft : 0;
        const yAdj = e.target.offsetTop != 0 ? e.target.offsetTop - e.target.offsetHeight : 0;
        const x = e.offsetX + xAdj;
        const y = e.offsetY + yAdj;
        const h = e.currentTarget.offsetHeight;  //bubble to container
        const w = e.currentTarget.offsetWidth;
        showDart(x,y,w,h, darts.length);

        //store new dart with web worker
        darts.push({x,y,w,h,ts:Number(new Date())});
        let stored_nuts = localStorage.getItem("stored_nuts");
        stored_nuts = JSON.stringify(darts);
        localStorage.setItem(`stored_nuts`, stored_nuts);

        //tell server of new dart
        const recs = darts.map(el => formatDart(el.x,el.y,el.w,el.h,el.ts));
        console.log(`socket io -- respond darts`);
        // console.dir(recs);
        socket.emit("received darts", recs);
    });
}

const removeDart = item => {

    const index = item.dataset.index;
    console.log(`removeDart -- item[${index}]`);
     
    const marks = Array.from(document.querySelectorAll('.mark'));
    const mark = marks.find(el => el.dataset.index == index);
    console.log(`removeDart -- item[${index}] mark[${mark.dataset.index}]`);
    if(!mark) {
        console.log(`removeDart -- item[${index}] not found`);
        return;
    }

    //remove visuals
    console.log(`removeDart -- item[${index}] visual elements removed`);
    mark.remove();
    item.remove();

    //remove from array and local storage
    console.log(`removeDart -- item[${index}] removed from storage`);
    darts.splice(index, 1);
    const stored_nuts = JSON.stringify(darts);
    localStorage.setItem(`stored_nuts`, stored_nuts);

    //update server of removed dart
    const recs = darts.map(el => formatDart(el.x,el.y,el.w,el.h,el.ts));
    // console.dir(recs);
    socket.emit("received darts", recs);
    console.log(`socket io -- respond darts`);
}


//remove one of the darts via its dblclick on dartboard list
const dartboardList = document.querySelector('.dartboard-list');
if(dartboardList) {
    console.log(`added double click handler to remove a dart...`);
    dartboardList.addEventListener('dblclick', e => {
        
        const item = e.target; 
        console.log(`item tagName [${item.tagName}] was double clicked...`);
        if(item.tagName !== "LI") return;
        
        removeDart(item);
    });
}

//empty array and remove visuals
const clearDartBoard = () => {
    darts.splice(0);
    const marks = document.querySelectorAll('.mark');
    for(let mark of marks) {
        mark.remove();
    }
    const listItems = document.querySelectorAll('.dartboard-list-item');
    for(let item of listItems) {
        item.remove();
    }
}

//use browser storage to store darts?
const showDarts = () => {
    if(!dartboardList) return;

    let stored_nuts = localStorage.getItem("stored_nuts");
    if(!stored_nuts) return;

    clearDartBoard();

    stored_nuts = JSON.parse(stored_nuts);
    let i = 0;
    for(let nut of stored_nuts) {
        darts.push(nut);
        showDart(nut.x, nut.y, nut.w, nut.h, i);
        i++;
    } 
}

//when the window loads or changes reload dart visuals...
['load','resize'].forEach(el => window.addEventListener(el, showDarts));

//remove darts from local and db storage ...
const dartboardClear = document.querySelector('.dartboard-clear-btn');
if(dartboardClear) {
    dartboardClear.addEventListener('click', e => {
        
        //clean up visuals elements
        clearDartBoard();

        //update local storage
        let stored_nuts = localStorage.getItem("stored_nuts");
        stored_nuts = JSON.stringify(darts);
        localStorage.setItem(`stored_nuts`, stored_nuts);

        //tell server of removed dart
        console.log(`socket io -- clear board`);
        socket.emit("received darts", []);
    });
}

//inverse func of to_coords
//assume x and y is in mm from standard 451mm dart board
const to_values = (x, y) => {
    //dart board sector - anti-clockwise starting sector 0 at 6
    const nums = [6, 13, 4, 18, 1, 20, 5, 12, 9, 14, 11, 8, 16, 7, 19, 3, 17, 2, 15, 10];
    const radians = Math.atan2(y,x) + Math.PI / 20;
    const ix = Math.floor(radians * 10 / Math.PI + (radians < 0 ? 20 : 0)); //which sector 
    let value = nums[ix];
    
    //from center radius in mm
    const inner_bull = [0, 12.7 / 2];
    const outer_bull = [12.7 / 2, 31.8 / 2];
    const double = [162, 170];
    const treble = [99, 107];

    //single = center to inner treble or from outer treble to inner double
    const radius = Math.sqrt(x*x + y*y);
    let mult = 0;
    if(radius >= inner_bull[0] && radius <= inner_bull[1] ) {
        value = 50;
        mult = 1;
    } else if(radius >= outer_bull[0] && radius <= outer_bull[1] ) {
        value = 25;
        mult = 1;
    } else if((radius > outer_bull[1] && radius < treble[0] ) ||
              (radius > treble[1] && radius < double[0]) ) {
        mult = 1;
    } else if(radius >= double[0] && radius <= double[1] ) {
        mult = 2;
    } else if(radius >= treble[0] && radius <= treble[1] ) {
        mult = 3;
    }     

    return [value, mult, radians, radius, ix];
}

