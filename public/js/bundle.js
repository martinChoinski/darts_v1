// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"alert.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeAlerts = exports.showAlert = exports.hideAlert = void 0;

//ignore alerts with "stay" class
var hideAlert = function hideAlert() {
  var alerts = document.querySelectorAll('.alert'); // console.dir(alerts);

  if (alerts) {
    alerts.forEach(function (alert) {
      if (!alert.className.split(' ').includes('stay')) alert.parentElement.removeChild(alert);
    });
  }
}; //add z-index=1080 to stay on top of bootstrap styles elements


exports.hideAlert = hideAlert;

var showAlert = function showAlert(type, msg) {
  var msecs = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 5000;
  hideAlert();
  var markUp = "<div class=\"alert alert-".concat(type, " alert-dismissible fade show\" style=\"z-index:1080\">\n        ").concat(msg, "\n        <button type=\"button\" class=\"btn-close\" data-bs-dismiss=\"alert\" aria-label=\"Close\"></button>\n    </div>");
  document.querySelector('.messages').insertAdjacentHTML('afterbegin', markUp);
  ;
  window.setTimeout(hideAlert, msecs);
};

exports.showAlert = showAlert;

var removeAlerts = function removeAlerts() {
  var msecs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1000;
  window.setTimeout(hideAlert, msecs);
};

exports.removeAlerts = removeAlerts;
},{}],"index.js":[function(require,module,exports) {
"use strict";

var _alert = require("./alert");

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

//store current darts
var darts = []; //clean up alerts whenever a page is re - loaded

window.addEventListener('load', function (e) {
  //reload count?
  var reload_count = localStorage.getItem("reload_count");

  if (reload_count === null) {
    reload_count = 1;
  } else {
    reload_count++;
  }

  console.log("page was reloaded ".concat(reload_count, " time").concat(reload_count > 1 ? 's' : ''));
  localStorage.setItem("reload_count", reload_count); // console.log('note alerts will be removed in 4 secs...');

  (0, _alert.removeAlerts)(4000);
}); //socket io for page refreshes after receiving and processing darts ... etc

var socket = io('http://localhost:8000');
socket.on("connect", function () {
  console.log("socket connection id = [".concat(socket.id, "]"));
  socket.emit("client message", "Hello i am client and connected with you");
}); //format for DB consumption

var formatDart = function formatDart(x, y, w, h, ts) {
  var x1 = (x - w / 2) * 451 / w; //calc mm using bullseye as origin

  var y1 = (-y + h / 2) * 451 / h;
  var dart = to_values(x1, y1); //get dart values [value, multiplier, radians, ...]

  var d = Math.sqrt(Math.pow(x1, 2) + Math.pow(y1, 2)); //use calc mm for 451 mm board

  var dp = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)); //use pixels from web page instead of camera

  var dg = Math.floor(dart[2] * 180 / Math.PI); //convert from randians 

  var rec = {
    timestamp: ts,
    value: dart[0],
    multiplier: dart[1],
    coOrdsMM: {
      x: x1,
      y: y1
    },
    coOrds: {
      x: x,
      y: y,
      w: w,
      h: h
    },
    vector: {
      degrees: dg,
      distancepixels: dp,
      distancemm: d
    },
    debug: {
      delta: '0',
      camera_intersection: null
    }
  };
  return rec;
};

var showDart = function showDart(x, y, w, h, i) {
  var parent = document.querySelector('.dartboard-content');
  var h_ratio = parent.offsetHeight / h;
  var w_ratio = parent.offsetWidth / w;
  var mark = document.createElement("div");
  mark.classList.add('mark');
  mark.inert = true;
  mark.style.left = Math.floor(x * w_ratio) + 'px';
  mark.style.top = Math.floor(y * h_ratio) + 'px';
  mark.dataset.index = i; // mark.style.backgroundImage=`url('/images/dartboard/dart${Math.floor(Math.random()*4)+1}.png')`;

  parent.appendChild(mark);
  var x1 = (x - w / 2) * 451 / w;
  var y1 = (-y + h / 2) * 451 / h; // console.log(`pixel x[${x-w/2}]; y[${-y+h/2}];; w[${w}]; ; h[${h}];`)
  // console.log(`mm x[${Math.round(x1*10**2)/10**2}]; y[${Math.round(y1*10**2)/10**2}];; w [${451}]; ; h[${451}];`)

  var dart = to_values(x1, y1); // console.log(`dartboard value[${dart[0]}]; mult[${dart[1]}]`);

  var list = document.querySelector('.dartboard-list');
  var item = document.createElement("li");
  item.classList.add('dartboard-list-item');
  var mult_desc = ['miss', 'single', 'double', 'triple'];
  item.style.color = ['red', 'black', 'blue', 'green'][dart[1]];
  item.textContent = "".concat(mult_desc[dart[1]], " ").concat(dart[0]);
  item.dataset.index = i;
  list.appendChild(item);
}; // const dartboard = document.querySelector('.dartboard-img');


var dartboard = document.querySelector('.dartboard-content');

if (dartboard) {
  console.log("adding handler for dartboard image click ... ");
  dartboard.addEventListener('click', function (e) {
    //display new dart
    var xAdj = e.target.offsetLeft != 0 ? e.target.offsetLeft : 0;
    var yAdj = e.target.offsetTop != 0 ? e.target.offsetTop - e.target.offsetHeight : 0;
    var x = e.offsetX + xAdj;
    var y = e.offsetY + yAdj;
    var h = e.currentTarget.offsetHeight; //bubble to container

    var w = e.currentTarget.offsetWidth;
    showDart(x, y, w, h, darts.length); //store new dart with web worker

    darts.push({
      x: x,
      y: y,
      w: w,
      h: h,
      ts: Number(new Date())
    });
    var stored_nuts = localStorage.getItem("stored_nuts");
    stored_nuts = JSON.stringify(darts);
    localStorage.setItem("stored_nuts", stored_nuts); //tell server of new dart

    var recs = darts.map(function (el) {
      return formatDart(el.x, el.y, el.w, el.h, el.ts);
    });
    console.log("socket io -- respond darts"); // console.dir(recs);

    socket.emit("received darts", recs);
  });
}

var removeDart = function removeDart(item) {
  var index = item.dataset.index;
  console.log("removeDart -- item[".concat(index, "]"));
  var marks = Array.from(document.querySelectorAll('.mark'));
  var mark = marks.find(function (el) {
    return el.dataset.index == index;
  });
  console.log("removeDart -- item[".concat(index, "] mark[").concat(mark.dataset.index, "]"));

  if (!mark) {
    console.log("removeDart -- item[".concat(index, "] not found"));
    return;
  } //remove visuals


  console.log("removeDart -- item[".concat(index, "] visual elements removed"));
  mark.remove();
  item.remove(); //remove from array and local storage

  console.log("removeDart -- item[".concat(index, "] removed from storage"));
  darts.splice(index, 1);
  var stored_nuts = JSON.stringify(darts);
  localStorage.setItem("stored_nuts", stored_nuts); //update server of removed dart

  var recs = darts.map(function (el) {
    return formatDart(el.x, el.y, el.w, el.h, el.ts);
  }); // console.dir(recs);

  socket.emit("received darts", recs);
  console.log("socket io -- respond darts");
}; //remove one of the darts via its dblclick on dartboard list


var dartboardList = document.querySelector('.dartboard-list');

if (dartboardList) {
  console.log("added double click handler to remove a dart...");
  dartboardList.addEventListener('dblclick', function (e) {
    var item = e.target;
    console.log("item tagName [".concat(item.tagName, "] was double clicked..."));
    if (item.tagName !== "LI") return;
    removeDart(item);
  });
} //empty array and remove visuals


var clearDartBoard = function clearDartBoard() {
  darts.splice(0);
  var marks = document.querySelectorAll('.mark');

  var _iterator = _createForOfIteratorHelper(marks),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var mark = _step.value;
      mark.remove();
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  var listItems = document.querySelectorAll('.dartboard-list-item');

  var _iterator2 = _createForOfIteratorHelper(listItems),
      _step2;

  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var item = _step2.value;
      item.remove();
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }
}; //use browser storage to store darts?


var showDarts = function showDarts() {
  if (!dartboardList) return;
  var stored_nuts = localStorage.getItem("stored_nuts");
  if (!stored_nuts) return;
  clearDartBoard();
  stored_nuts = JSON.parse(stored_nuts);
  var i = 0;

  var _iterator3 = _createForOfIteratorHelper(stored_nuts),
      _step3;

  try {
    for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
      var nut = _step3.value;
      darts.push(nut);
      showDart(nut.x, nut.y, nut.w, nut.h, i);
      i++;
    }
  } catch (err) {
    _iterator3.e(err);
  } finally {
    _iterator3.f();
  }
}; //when the window loads or changes reload dart visuals...


['load', 'resize'].forEach(function (el) {
  return window.addEventListener(el, showDarts);
}); //remove darts from local and db storage ...

var dartboardClear = document.querySelector('.dartboard-clear-btn');

if (dartboardClear) {
  dartboardClear.addEventListener('click', function (e) {
    //clean up visuals elements
    clearDartBoard(); //update local storage

    var stored_nuts = localStorage.getItem("stored_nuts");
    stored_nuts = JSON.stringify(darts);
    localStorage.setItem("stored_nuts", stored_nuts); //tell server of removed dart

    console.log("socket io -- clear board");
    socket.emit("received darts", []);
  });
} //inverse func of to_coords
//assume x and y is in mm from standard 451mm dart board


var to_values = function to_values(x, y) {
  //dart board sector - anti-clockwise starting sector 0 at 6
  var nums = [6, 13, 4, 18, 1, 20, 5, 12, 9, 14, 11, 8, 16, 7, 19, 3, 17, 2, 15, 10];
  var radians = Math.atan2(y, x) + Math.PI / 20;
  var ix = Math.floor(radians * 10 / Math.PI + (radians < 0 ? 20 : 0)); //which sector 

  var value = nums[ix]; //from center radius in mm

  var inner_bull = [0, 12.7 / 2];
  var outer_bull = [12.7 / 2, 31.8 / 2];
  var double = [162, 170];
  var treble = [99, 107]; //single = center to inner treble or from outer treble to inner double

  var radius = Math.sqrt(x * x + y * y);
  var mult = 0;

  if (radius >= inner_bull[0] && radius <= inner_bull[1]) {
    value = 50;
    mult = 1;
  } else if (radius >= outer_bull[0] && radius <= outer_bull[1]) {
    value = 25;
    mult = 1;
  } else if (radius > outer_bull[1] && radius < treble[0] || radius > treble[1] && radius < double[0]) {
    mult = 1;
  } else if (radius >= double[0] && radius <= double[1]) {
    mult = 2;
  } else if (radius >= treble[0] && radius <= treble[1]) {
    mult = 3;
  }

  return [value, mult, radians, radius, ix];
};
},{"./alert":"alert.js"}],"../../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "64453" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)