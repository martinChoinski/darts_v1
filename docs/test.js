const dartboard = [
    {
      value: '8',
      multiplier: '1',
      timestamp: '1865832921',
      coOrds: { x: '299', y: '757' },
      coOrdsMM: { x: '-127.689177006483', y: '43.8112425506115' },
      vector: {
        degrees: '251.083587646484',
        distancepixels: '360.127624511719',
        distancemm: '134.851608276367'
      },
      debug: { delta: '0', camera_intersection: [Object] }
    },
    {
      value: '16',
      multiplier: '1',
      timestamp: '1866163812',
      coOrds: { x: '336', y: '852' },
      coOrdsMM: { x: '-113.834339618683', y: '79.3844736814499' },
      vector: {
        degrees: '235.080596923828',
        distancepixels: '371.132995605469',
        distancemm: '138.972625732422'
      },
      debug: { delta: '0', camera_intersection: [Object] }
    },
    {
      value: '8',
      multiplier: '1',
      timestamp: '1865833125',
      coOrds: { x: '299', y: '757' },
      coOrdsMM: { x: '-127.689177006483', y: '43.8112425506115' },
      vector: {
        degrees: '251.083587646484',
        distancepixels: '360.127624511719',
        distancemm: '134.851608276367'
      },
      debug: { delta: '0', camera_intersection: [Object] }
    },
    {
      value: '8',
      multiplier: '1',
      timestamp: '1865833281',
      coOrds: { x: '299', y: '757' },
      coOrdsMM: { x: '-127.689177006483', y: '43.8112425506115' },
      vector: {
        degrees: '251.083587646484',
        distancepixels: '360.127624511719',
        distancemm: '134.851608276367'
      },
      debug: { delta: '0', camera_intersection: [Object] }
    }
  ];

const comp = (a, b) => {
    return (
        a.coOrds.x === b.coOrds.x && a.coOrds.y === b.coOrds.y ? 0 :
        a.timestamp < b.timestamp ? -1 : 
        a.timestamp > b.timestamp ? 1  :
        a.value * a.multiplier > b.value * b.multiplier ? -1 :
        a.value * a.multiplier < b.value * b.multiplier ? 1 :
        a.value > b.value ? -1 :
        a.value < b.value ? 1 : 0 
    )
};




const darts = dartboard
  .sort((a,b) => comp(a,b))
  .filter((x,i,a) => i === 0 || comp(a[i-1], x) !== 0);



  
f = (a, b) => {
    a.coOrds.x === b.coOrds.x && a.coOrds.y === b.coOrds.y ? 0 :
    a.timestamp < b.timestamp ? -1 : 
    a.timestamp > b.timestamp ? 1  :
    a.value * a.multiplier > b.value * b.multiplier ? -1 :
    a.value * a.multiplier < b.value * b.multiplier ? 1 :
    a.value > b.value ? -1 :
    a.value < b.value ? 1 : 0 
};

let arr = [], a = dartboard;
for(let i = 0; i < a.length; i++) {
    if(i === 0) {
        arr.push(a[i]);
        continue;
    } 
    if(a[i-1].coOrds.x === a[i].coOrds.x  && a[i-1].coOrds.y === a[i].coOrds.y) continue;
}

  