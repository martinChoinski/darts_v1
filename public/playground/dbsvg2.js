const logContainer = document.querySelector("#log");
const log = (string) => { logContainer.prepend(`${string}<br/>`) }

const svg = document.querySelector('#dartboard1');
svg.addEventListener('click', onHandleClick);

// let value = 501;
// document.querySelector('#value').innerHTML = value;
// // .html(value);

// function subtract(diff) {
//   console.log('subtract', diff);
//   value -= diff;
//   document.querySelector('#value').innerHTML = value;
// }

function onHandleClick(event) {
  console.log(event);
  const target = event.target;
  
  const x = event.clientX;
  const y = event.clientY;
  
  const rec = svg.getBoundingClientRect();
  const width = rec.width;
  const height = rec.height;
  
  const middle = [width/2, height/2];
  
  const id = target.getAttribute('id');
  console.log(id);
  if(id == 'outer-1') {
    console.log('!')
    subtract(1);
  }
}