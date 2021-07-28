// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function(modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
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

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this,
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x) {
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
  newRequire.register = function(id, exports) {
    modules[id] = [
      function(require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function() {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function() {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"bfhYt":[function(require,module,exports) {
var HMR_HOST = null;
var HMR_PORT = 1234;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d751713988987e9331980363e24189ce";
module.bundle.HMR_BUNDLE_ID = "c116b9839bf336f69c0f348a14f8169a"; // @flow
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: mixed;
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
*/ var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData,
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {
            });
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData = undefined;
}
module.bundle.Module = Module;
var checkedAssets/*: {|[string]: boolean|} */ , acceptedAssets/*: {|[string]: boolean|} */ , assetsToAccept/*: Array<[ParcelRequire, string]> */ ;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
}
function getPort() {
    return HMR_PORT || location.port;
}
// eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == 'https:' && !/localhost|127.0.0.1|0.0.0.0/.test(hostname) ? 'wss' : 'ws';
    var ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/');
    // $FlowFixMe
    ws.onmessage = function(event/*: {data: string, ...} */ ) {
        checkedAssets = {
        };
        acceptedAssets = {
        };
        assetsToAccept = [];
        var data = JSON.parse(event.data);
        if (data.type === 'update') {
            // Remove error overlay if there is one
            removeErrorOverlay();
            let assets = data.assets.filter((asset)=>asset.envHash === HMR_ENV_HASH
            );
            // Handle HMR Update
            var handled = false;
            assets.forEach((asset)=>{
                var didAccept = asset.type === 'css' || asset.type === 'js' && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
                if (didAccept) handled = true;
            });
            if (handled) {
                console.clear();
                assets.forEach(function(asset) {
                    hmrApply(module.bundle.root, asset);
                });
                for(var i = 0; i < assetsToAccept.length; i++){
                    var id = assetsToAccept[i][1];
                    if (!acceptedAssets[id]) hmrAcceptRun(assetsToAccept[i][0], id);
                }
            } else window.location.reload();
        }
        if (data.type === 'error') {
            // Log parcel errors to console
            for (let ansiDiagnostic of data.diagnostics.ansi){
                let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                console.error('🚨 [parcel]: ' + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
            }
            // Render the fancy html overlay
            removeErrorOverlay();
            var overlay = createErrorOverlay(data.diagnostics.html);
            // $FlowFixMe
            document.body.appendChild(overlay);
        }
    };
    ws.onerror = function(e) {
        console.error(e.message);
    };
    ws.onclose = function(e) {
        console.warn('[parcel] 🚨 Connection to the HMR server was lost');
    };
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log('[parcel] ✨ Error resolved');
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement('div');
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.codeframe ? diagnostic.codeframe : diagnostic.stack;
        errorHTML += `\n      <div>\n        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">\n          🚨 ${diagnostic.message}\n        </div>\n        <pre>\n          ${stack}\n        </pre>\n        <div>\n          ${diagnostic.hints.map((hint)=>'<div>' + hint + '</div>'
        ).join('')}\n        </div>\n      </div>\n    `;
    }
    errorHTML += '</div>';
    overlay.innerHTML = errorHTML;
    return overlay;
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute('href', // $FlowFixMe
    link.getAttribute('href').split('?')[0] + '?' + Date.now());
    // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href = links[i].getAttribute('href');
            var hostname = getHostname();
            var servedFromHMRServer = hostname === 'localhost' ? new RegExp('^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):' + getPort()).test(href) : href.indexOf(hostname + ':' + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(window.location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrApply(bundle/*: ParcelRequire */ , asset/*:  HMRAsset */ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === 'css') {
        reloadCSS();
        return;
    }
    let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
    if (deps) {
        var fn = new Function('require', 'module', 'exports', asset.output);
        modules[asset.id] = [
            fn,
            deps
        ];
    } else if (bundle.parent) hmrApply(bundle.parent, asset);
}
function hmrAcceptCheck(bundle/*: ParcelRequire */ , id/*: string */ , depsByBundle/*: ?{ [string]: { [string]: string } }*/ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToAccept.push([
        bundle,
        id
    ]);
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) return true;
    return getParents(module.bundle.root, id).some(function(v) {
        return hmrAcceptCheck(v[0], v[1], null);
    });
}
function hmrAcceptRun(bundle/*: ParcelRequire */ , id/*: string */ ) {
    var cached = bundle.cache[id];
    bundle.hotData = {
    };
    if (cached && cached.hot) cached.hot.data = bundle.hotData;
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData);
    });
    delete bundle.cache[id];
    bundle(id);
    cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
    });
    acceptedAssets[id] = true;
}

},{}],"4ivAA":[function(require,module,exports) {
var _alert = require("./alert");
const { v4: uuidv4  } = require('uuid');
//console.log(uuidv4());
//store current darts
const darts = [];
//clean up alerts whenever a page is re - loaded
window.addEventListener('load', (e)=>{
    //reload count?
    let reload_count = localStorage.getItem("reload_count");
    if (reload_count === null) reload_count = 1;
    else reload_count++;
    console.log(`page was reloaded ${reload_count} time${reload_count > 1 ? 's' : ''}`);
    localStorage.setItem(`reload_count`, reload_count);
    // console.log('note alerts will be removed in 4 secs...');
    _alert.removeAlerts(4000);
});
//socket io for page refreshes after receiving and processing darts ... etc
const socket = io(`http://${"localhost"}:${"8000"}`);
socket.on("connect", ()=>{
    console.log(`socket connection id = [${socket.id}]`);
    socket.emit("client message", "Hello i am client and connected with you");
    _alert.showAlert('info', 'hello i am alert');
});
//format for DB consumption
const formatDart = (x, y, w, h, ts)=>{
    const x1 = (x - w / 2) * 451 / w; //calc mm using bullseye as origin
    const y1 = (-y + h / 2) * 451 / h;
    const dart = to_values(x1, y1); //get dart values [value, multiplier, radians, ...]
    const d = Math.sqrt(x1 ** 2 + y1 ** 2); //use calc mm for 451 mm board
    const dp = Math.sqrt(x ** 2 + y ** 2); //use pixels from web page instead of camera
    const dg = Math.floor(dart[2] * 180 / Math.PI); //convert from randians 
    const rec = {
        timestamp: ts,
        value: dart[0],
        multiplier: dart[1],
        coOrdsMM: {
            x: x1,
            y: y1
        },
        coOrds: {
            x,
            y,
            w,
            h
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
const showDart = (x, y, w, h, id)=>{
    const parent = document.querySelector('.dartboard-content');
    const h_ratio = parent.offsetHeight / h;
    const w_ratio = parent.offsetWidth / w;
    const mark = document.createElement("div");
    mark.classList.add('mark');
    mark.style.left = Math.floor(x * w_ratio) + 'px';
    mark.style.top = Math.floor(y * h_ratio) + 'px';
    mark.dataset.id = id;
    // mark.style.backgroundImage=`url('/images/dartboard/dart${Math.floor(Math.random()*4)+1}.png')`;
    parent.appendChild(mark);
    const x1 = (x - w / 2) * 451 / w;
    const y1 = (-y + h / 2) * 451 / h;
    console.log(`x mm[${x1}], y mm[${y1}], x px[${x}], y px[${y}]`);
    const d = Math.sqrt(x1 ** 2 + y1 ** 2); //use calc mm for 451 mm board
    const dp = Math.sqrt(x ** 2 + y ** 2); //use pixels from web page instead of camera
    console.log(`x d mm[${d}], y d px[${dp}]`);
    const dart = to_values(x1, y1);
    const list = document.querySelector('.dartboard-list');
    const item = document.createElement("li");
    item.classList.add('dartboard-list-item');
    const mult_desc = [
        'miss',
        'single',
        'double',
        'triple'
    ];
    item.style.color = [
        'red',
        'black',
        'blue',
        'green'
    ][dart[1]];
    item.textContent = `${mult_desc[dart[1]]} ${dart[0]}`;
    item.dataset.id = id;
    list.appendChild(item);
};
// add a dart
const dartboard = document.querySelector('.dartboard-content');
if (dartboard) {
    console.log(`adding handler for dartboard image click ... `);
    dartboard.addEventListener('click', (e)=>{
        //display new dart
        const id = uuidv4();
        const xAdj = e.target.offsetLeft != 0 ? e.target.offsetLeft : 0;
        const yAdj = e.target.offsetTop != 0 ? e.target.offsetTop - e.target.offsetHeight : 0;
        const x = e.offsetX + xAdj;
        const y = e.offsetY + yAdj;
        const h = e.currentTarget.offsetHeight; //bubble to container
        const w = e.currentTarget.offsetWidth;
        showDart(x, y, w, h, id);
        //store new dart with web worker
        darts.push({
            x,
            y,
            w,
            h,
            id,
            ts: Number(new Date())
        });
        let stored_nuts = localStorage.getItem("stored_nuts");
        stored_nuts = JSON.stringify(darts);
        localStorage.setItem(`stored_nuts`, stored_nuts);
        //tell server of new dart
        const recs = darts.map((el)=>formatDart(el.x, el.y, el.w, el.h, el.ts)
        );
        console.log(`socket io -- respond darts`);
        // console.dir(recs);
        socket.emit("received darts", recs);
    });
}
const removeDart = (item)=>{
    const id = item.dataset.id;
    console.log(`removeDart -- item[${id}]`);
    const marks = Array.from(document.querySelectorAll('.mark'));
    const mark = marks.find((el)=>el.dataset.id === id
    );
    console.log(`removeDart -- item[${id}] mark[${mark.dataset.id}]`);
    if (!mark) {
        console.log(`removeDart -- item[${id}] not found`);
        return;
    }
    //remove visuals
    console.log(`removeDart -- item[${id}] visual elements removed`);
    mark.remove();
    item.remove();
    //remove from array and local storage
    console.log(`removeDart -- item[${id}] removed from storage`);
    const ix = darts.findIndex((el)=>el.id === id
    );
    darts.splice(ix, 1);
    const stored_nuts = JSON.stringify(darts);
    localStorage.setItem(`stored_nuts`, stored_nuts);
    //update server of removed dart
    const recs = darts.map((el)=>formatDart(el.x, el.y, el.w, el.h, el.ts)
    );
    // console.dir(recs);
    socket.emit("received darts", recs);
    console.log(`socket io -- respond darts`);
};
//remove one of the darts via its dblclick on dartboard list
const dartboardList = document.querySelector('.dartboard-list');
if (dartboardList) {
    console.log(`added double click handler to remove a dart...`);
    dartboardList.addEventListener('dblclick', (e)=>{
        const item = e.target;
        console.log(`item tagName [${item.tagName}] was double clicked...`);
        if (item.tagName !== "LI") return;
        removeDart(item);
    });
}
//empty array and remove visuals
const clearDartBoard = ()=>{
    darts.splice(0);
    const marks = document.querySelectorAll('.mark');
    for (let mark of marks)mark.remove();
    const listItems = document.querySelectorAll('.dartboard-list-item');
    for (let item of listItems)item.remove();
};
//use browser storage to store darts?
const showDarts = ()=>{
    if (!dartboardList) return;
    let stored_nuts = localStorage.getItem("stored_nuts");
    if (!stored_nuts) return;
    clearDartBoard();
    stored_nuts = JSON.parse(stored_nuts);
    for (let nut of stored_nuts){
        darts.push(nut);
        showDart(nut.x, nut.y, nut.w, nut.h, nut.id);
    }
    console.log(`# nuts[${stored_nuts.length}]; # darts[${darts.length}]`);
};
//when the window loads or changes reload dart visuals...
[
    'load',
    'resize'
].forEach((el)=>window.addEventListener(el, showDarts)
);
//remove darts from local and db storage ...
const dartboardClear = document.querySelector('.dartboard-clear-btn');
if (dartboardClear) dartboardClear.addEventListener('click', (e)=>{
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
//inverse func of to_coords
//assume x and y is in mm from standard 451mm dart board
const to_values = (x, y)=>{
    //dart board sector - anti-clockwise starting sector 0 at 6
    const nums = [
        6,
        13,
        4,
        18,
        1,
        20,
        5,
        12,
        9,
        14,
        11,
        8,
        16,
        7,
        19,
        3,
        17,
        2,
        15,
        10
    ];
    const radians = Math.atan2(y, x) + Math.PI / 20;
    const ix = Math.floor(radians * 10 / Math.PI + (radians < 0 ? 20 : 0)); //which sector 
    let value = nums[ix];
    //from center radius in mm
    const inner_bull = [
        0,
        6.35
    ];
    const outer_bull = [
        6.35,
        15.9
    ];
    const treble = [
        99,
        107
    ];
    const double = [
        162,
        170
    ];
    //single = center to inner treble or from outer treble to inner double
    const radius = Math.sqrt(x * x + y * y);
    let mult = 0;
    if (radius >= inner_bull[0] && radius <= inner_bull[1]) {
        value = 50;
        mult = 1;
    } else if (radius >= outer_bull[0] && radius <= outer_bull[1]) {
        value = 25;
        mult = 1;
    } else if (radius > outer_bull[1] && radius < treble[0] || radius > treble[1] && radius < double[0]) mult = 1;
    else if (radius >= double[0] && radius <= double[1]) mult = 2;
    else if (radius >= treble[0] && radius <= treble[1]) mult = 3;
    return [
        value,
        mult,
        radians,
        radius,
        ix
    ];
};

},{"./alert":"2vsBX","uuid":"7dtvm"}],"2vsBX":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "hideAlert", ()=>hideAlert
);
parcelHelpers.export(exports, "showAlert", ()=>showAlert
);
parcelHelpers.export(exports, "removeAlerts", ()=>removeAlerts
);
const hideAlert = ()=>{
    const alerts = document.querySelectorAll('.alert');
    // console.dir(alerts);
    if (alerts) alerts.forEach((alert)=>{
        if (!alert.className.split(' ').includes('stay')) alert.parentElement.removeChild(alert);
    });
};
const showAlert = (type, msg, msecs = 5000)=>{
    hideAlert();
    const markUp = `<div class="alert alert-${type} alert-dismissible fade show" style="z-index:1080">\n        ${msg}\n        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>\n    </div>`;
    document.querySelector('.messages').insertAdjacentHTML('afterbegin', markUp);
    window.setTimeout(hideAlert, msecs);
};
const removeAlerts = (msecs = 1000)=>{
    window.setTimeout(hideAlert, msecs);
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"4gGoX"}],"4gGoX":[function(require,module,exports) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, '__esModule', {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === 'default' || key === '__esModule') return;
        // Skip duplicate re-exports when they have the same value.
        if (key in dest && dest[key] === source[key]) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}],"7dtvm":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "v1", {
    enumerable: true,
    get: function() {
        return _v.default;
    }
});
Object.defineProperty(exports, "v3", {
    enumerable: true,
    get: function() {
        return _v2.default;
    }
});
Object.defineProperty(exports, "v4", {
    enumerable: true,
    get: function() {
        return _v3.default;
    }
});
Object.defineProperty(exports, "v5", {
    enumerable: true,
    get: function() {
        return _v4.default;
    }
});
Object.defineProperty(exports, "NIL", {
    enumerable: true,
    get: function() {
        return _nil.default;
    }
});
Object.defineProperty(exports, "version", {
    enumerable: true,
    get: function() {
        return _version.default;
    }
});
Object.defineProperty(exports, "validate", {
    enumerable: true,
    get: function() {
        return _validate.default;
    }
});
Object.defineProperty(exports, "stringify", {
    enumerable: true,
    get: function() {
        return _stringify.default;
    }
});
Object.defineProperty(exports, "parse", {
    enumerable: true,
    get: function() {
        return _parse.default;
    }
});
var _v = _interopRequireDefault(require("./v1.js"));
var _v2 = _interopRequireDefault(require("./v3.js"));
var _v3 = _interopRequireDefault(require("./v4.js"));
var _v4 = _interopRequireDefault(require("./v5.js"));
var _nil = _interopRequireDefault(require("./nil.js"));
var _version = _interopRequireDefault(require("./version.js"));
var _validate = _interopRequireDefault(require("./validate.js"));
var _stringify = _interopRequireDefault(require("./stringify.js"));
var _parse = _interopRequireDefault(require("./parse.js"));
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}

},{"./v1.js":"2m67E","./v3.js":"7zBxm","./v4.js":"3SJEo","./v5.js":"6IDpy","./nil.js":"2Bnk7","./version.js":"51Zy6","./validate.js":"6BOPh","./stringify.js":"4ATB7","./parse.js":"32Zlh"}],"2m67E":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = void 0;
var _rng = _interopRequireDefault(require("./rng.js"));
var _stringify = _interopRequireDefault(require("./stringify.js"));
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
// **`v1()` - Generate time-based UUID**
//
// Inspired by https://github.com/LiosK/UUID.js
// and http://docs.python.org/library/uuid.html
let _nodeId;
let _clockseq; // Previous uuid creation time
let _lastMSecs = 0;
let _lastNSecs = 0; // See https://github.com/uuidjs/uuid for API details
function v1(options, buf, offset) {
    let i = buf && offset || 0;
    const b = buf || new Array(16);
    options = options || {
    };
    let node = options.node || _nodeId;
    let clockseq = options.clockseq !== undefined ? options.clockseq : _clockseq; // node and clockseq need to be initialized to random values if they're not
    // specified.  We do this lazily to minimize issues related to insufficient
    // system entropy.  See #189
    if (node == null || clockseq == null) {
        const seedBytes = options.random || (options.rng || _rng.default)();
        if (node == null) // Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)
        node = _nodeId = [
            seedBytes[0] | 1,
            seedBytes[1],
            seedBytes[2],
            seedBytes[3],
            seedBytes[4],
            seedBytes[5]
        ];
        if (clockseq == null) // Per 4.2.2, randomize (14 bit) clockseq
        clockseq = _clockseq = (seedBytes[6] << 8 | seedBytes[7]) & 16383;
    } // UUID timestamps are 100 nano-second units since the Gregorian epoch,
    // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so
    // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'
    // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.
    let msecs = options.msecs !== undefined ? options.msecs : Date.now(); // Per 4.2.1.2, use count of uuid's generated during the current clock
    // cycle to simulate higher resolution clock
    let nsecs = options.nsecs !== undefined ? options.nsecs : _lastNSecs + 1; // Time since last uuid creation (in msecs)
    const dt = msecs - _lastMSecs + (nsecs - _lastNSecs) / 10000; // Per 4.2.1.2, Bump clockseq on clock regression
    if (dt < 0 && options.clockseq === undefined) clockseq = clockseq + 1 & 16383;
     // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
    // time interval
    if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === undefined) nsecs = 0;
     // Per 4.2.1.2 Throw error if too many uuids are requested
    if (nsecs >= 10000) throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
    _lastMSecs = msecs;
    _lastNSecs = nsecs;
    _clockseq = clockseq; // Per 4.1.4 - Convert from unix epoch to Gregorian epoch
    msecs += 12219292800000; // `time_low`
    const tl = ((msecs & 268435455) * 10000 + nsecs) % 4294967296;
    b[i++] = tl >>> 24 & 255;
    b[i++] = tl >>> 16 & 255;
    b[i++] = tl >>> 8 & 255;
    b[i++] = tl & 255; // `time_mid`
    const tmh = msecs / 4294967296 * 10000 & 268435455;
    b[i++] = tmh >>> 8 & 255;
    b[i++] = tmh & 255; // `time_high_and_version`
    b[i++] = tmh >>> 24 & 15 | 16; // include version
    b[i++] = tmh >>> 16 & 255; // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)
    b[i++] = clockseq >>> 8 | 128; // `clock_seq_low`
    b[i++] = clockseq & 255; // `node`
    for(let n = 0; n < 6; ++n)b[i + n] = node[n];
    return buf || _stringify.default(b);
}
var _default = v1;
exports.default = _default;

},{"./rng.js":"2Vwy2","./stringify.js":"4ATB7"}],"2Vwy2":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = rng;
// Unique ID creation requires a high quality random # generator. In the browser we therefore
// require the crypto API and do not support built-in fallback to lower quality random number
// generators (like Math.random()).
let getRandomValues;
const rnds8 = new Uint8Array(16);
function rng() {
    // lazy load so that environments that need to polyfill have a chance to do so
    if (!getRandomValues) {
        // getRandomValues needs to be invoked in a context where "this" is a Crypto implementation. Also,
        // find the complete implementation of crypto (msCrypto) on IE11.
        getRandomValues = typeof crypto !== 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof msCrypto !== 'undefined' && typeof msCrypto.getRandomValues === 'function' && msCrypto.getRandomValues.bind(msCrypto);
        if (!getRandomValues) throw new Error('crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported');
    }
    return getRandomValues(rnds8);
}

},{}],"4ATB7":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = void 0;
var _validate = _interopRequireDefault(require("./validate.js"));
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */ const byteToHex = [];
for(let i = 0; i < 256; ++i)byteToHex.push((i + 256).toString(16).substr(1));
function stringify(arr, offset = 0) {
    // Note: Be careful editing this code!  It's been tuned for performance
    // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434
    const uuid = (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase(); // Consistency check for valid UUID.  If this throws, it's likely due to one
    // of the following:
    // - One or more input array values don't map to a hex octet (leading to
    // "undefined" in the uuid)
    // - Invalid input values for the RFC `version` or `variant` fields
    if (!_validate.default(uuid)) throw TypeError('Stringified UUID is invalid');
    return uuid;
}
var _default = stringify;
exports.default = _default;

},{"./validate.js":"6BOPh"}],"6BOPh":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = void 0;
var _regex = _interopRequireDefault(require("./regex.js"));
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function validate(uuid) {
    return typeof uuid === 'string' && _regex.default.test(uuid);
}
var _default = validate;
exports.default = _default;

},{"./regex.js":"sBEZo"}],"sBEZo":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = void 0;
var _default = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;
exports.default = _default;

},{}],"7zBxm":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = void 0;
var _v = _interopRequireDefault(require("./v35.js"));
var _md = _interopRequireDefault(require("./md5.js"));
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const v3 = _v.default('v3', 48, _md.default);
var _default = v3;
exports.default = _default;

},{"./v35.js":"Fu2ze","./md5.js":"1uBOx"}],"Fu2ze":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = _default;
exports.URL = exports.DNS = void 0;
var _stringify = _interopRequireDefault(require("./stringify.js"));
var _parse = _interopRequireDefault(require("./parse.js"));
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function stringToBytes(str) {
    str = unescape(encodeURIComponent(str)); // UTF8 escape
    const bytes = [];
    for(let i = 0; i < str.length; ++i)bytes.push(str.charCodeAt(i));
    return bytes;
}
const DNS = '6ba7b810-9dad-11d1-80b4-00c04fd430c8';
exports.DNS = DNS;
const URL1 = '6ba7b811-9dad-11d1-80b4-00c04fd430c8';
exports.URL = URL1;
function _default(name, version, hashfunc) {
    function generateUUID(value, namespace, buf, offset) {
        if (typeof value === 'string') value = stringToBytes(value);
        if (typeof namespace === 'string') namespace = _parse.default(namespace);
        if (namespace.length !== 16) throw TypeError('Namespace must be array-like (16 iterable integer values, 0-255)');
         // Compute hash of namespace and value, Per 4.3
        // Future: Use spread syntax when supported on all platforms, e.g. `bytes =
        // hashfunc([...namespace, ... value])`
        let bytes = new Uint8Array(16 + value.length);
        bytes.set(namespace);
        bytes.set(value, namespace.length);
        bytes = hashfunc(bytes);
        bytes[6] = bytes[6] & 15 | version;
        bytes[8] = bytes[8] & 63 | 128;
        if (buf) {
            offset = offset || 0;
            for(let i = 0; i < 16; ++i)buf[offset + i] = bytes[i];
            return buf;
        }
        return _stringify.default(bytes);
    } // Function#name is not settable on some platforms (#270)
    try {
        generateUUID.name = name; // eslint-disable-next-line no-empty
    } catch (err) {
    } // For CommonJS default export support
    generateUUID.DNS = DNS;
    generateUUID.URL = URL1;
    return generateUUID;
}

},{"./stringify.js":"4ATB7","./parse.js":"32Zlh"}],"32Zlh":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = void 0;
var _validate = _interopRequireDefault(require("./validate.js"));
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function parse(uuid) {
    if (!_validate.default(uuid)) throw TypeError('Invalid UUID');
    let v;
    const arr = new Uint8Array(16); // Parse ########-....-....-....-............
    arr[0] = (v = parseInt(uuid.slice(0, 8), 16)) >>> 24;
    arr[1] = v >>> 16 & 255;
    arr[2] = v >>> 8 & 255;
    arr[3] = v & 255; // Parse ........-####-....-....-............
    arr[4] = (v = parseInt(uuid.slice(9, 13), 16)) >>> 8;
    arr[5] = v & 255; // Parse ........-....-####-....-............
    arr[6] = (v = parseInt(uuid.slice(14, 18), 16)) >>> 8;
    arr[7] = v & 255; // Parse ........-....-....-####-............
    arr[8] = (v = parseInt(uuid.slice(19, 23), 16)) >>> 8;
    arr[9] = v & 255; // Parse ........-....-....-....-############
    // (Use "/" to avoid 32-bit truncation when bit-shifting high-order bytes)
    arr[10] = (v = parseInt(uuid.slice(24, 36), 16)) / 1099511627776 & 255;
    arr[11] = v / 4294967296 & 255;
    arr[12] = v >>> 24 & 255;
    arr[13] = v >>> 16 & 255;
    arr[14] = v >>> 8 & 255;
    arr[15] = v & 255;
    return arr;
}
var _default = parse;
exports.default = _default;

},{"./validate.js":"6BOPh"}],"1uBOx":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = void 0;
/*
 * Browser-compatible JavaScript MD5
 *
 * Modification of JavaScript MD5
 * https://github.com/blueimp/JavaScript-MD5
 *
 * Copyright 2011, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * https://opensource.org/licenses/MIT
 *
 * Based on
 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
 * Digest Algorithm, as defined in RFC 1321.
 * Version 2.2 Copyright (C) Paul Johnston 1999 - 2009
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for more info.
 */ function md5(bytes) {
    if (typeof bytes === 'string') {
        const msg = unescape(encodeURIComponent(bytes)); // UTF8 escape
        bytes = new Uint8Array(msg.length);
        for(let i = 0; i < msg.length; ++i)bytes[i] = msg.charCodeAt(i);
    }
    return md5ToHexEncodedArray(wordsToMd5(bytesToWords(bytes), bytes.length * 8));
}
/*
 * Convert an array of little-endian words to an array of bytes
 */ function md5ToHexEncodedArray(input) {
    const output = [];
    const length32 = input.length * 32;
    const hexTab = '0123456789abcdef';
    for(let i = 0; i < length32; i += 8){
        const x = input[i >> 5] >>> i % 32 & 255;
        const hex = parseInt(hexTab.charAt(x >>> 4 & 15) + hexTab.charAt(x & 15), 16);
        output.push(hex);
    }
    return output;
}
/**
 * Calculate output length with padding and bit length
 */ function getOutputLength(inputLength8) {
    return (inputLength8 + 64 >>> 9 << 4) + 14 + 1;
}
/*
 * Calculate the MD5 of an array of little-endian words, and a bit length.
 */ function wordsToMd5(x, len) {
    /* append padding */ x[len >> 5] |= 128 << len % 32;
    x[getOutputLength(len) - 1] = len;
    let a = 1732584193;
    let b = -271733879;
    let c = -1732584194;
    let d = 271733878;
    for(let i = 0; i < x.length; i += 16){
        const olda = a;
        const oldb = b;
        const oldc = c;
        const oldd = d;
        a = md5ff(a, b, c, d, x[i], 7, -680876936);
        d = md5ff(d, a, b, c, x[i + 1], 12, -389564586);
        c = md5ff(c, d, a, b, x[i + 2], 17, 606105819);
        b = md5ff(b, c, d, a, x[i + 3], 22, -1044525330);
        a = md5ff(a, b, c, d, x[i + 4], 7, -176418897);
        d = md5ff(d, a, b, c, x[i + 5], 12, 1200080426);
        c = md5ff(c, d, a, b, x[i + 6], 17, -1473231341);
        b = md5ff(b, c, d, a, x[i + 7], 22, -45705983);
        a = md5ff(a, b, c, d, x[i + 8], 7, 1770035416);
        d = md5ff(d, a, b, c, x[i + 9], 12, -1958414417);
        c = md5ff(c, d, a, b, x[i + 10], 17, -42063);
        b = md5ff(b, c, d, a, x[i + 11], 22, -1990404162);
        a = md5ff(a, b, c, d, x[i + 12], 7, 1804603682);
        d = md5ff(d, a, b, c, x[i + 13], 12, -40341101);
        c = md5ff(c, d, a, b, x[i + 14], 17, -1502002290);
        b = md5ff(b, c, d, a, x[i + 15], 22, 1236535329);
        a = md5gg(a, b, c, d, x[i + 1], 5, -165796510);
        d = md5gg(d, a, b, c, x[i + 6], 9, -1069501632);
        c = md5gg(c, d, a, b, x[i + 11], 14, 643717713);
        b = md5gg(b, c, d, a, x[i], 20, -373897302);
        a = md5gg(a, b, c, d, x[i + 5], 5, -701558691);
        d = md5gg(d, a, b, c, x[i + 10], 9, 38016083);
        c = md5gg(c, d, a, b, x[i + 15], 14, -660478335);
        b = md5gg(b, c, d, a, x[i + 4], 20, -405537848);
        a = md5gg(a, b, c, d, x[i + 9], 5, 568446438);
        d = md5gg(d, a, b, c, x[i + 14], 9, -1019803690);
        c = md5gg(c, d, a, b, x[i + 3], 14, -187363961);
        b = md5gg(b, c, d, a, x[i + 8], 20, 1163531501);
        a = md5gg(a, b, c, d, x[i + 13], 5, -1444681467);
        d = md5gg(d, a, b, c, x[i + 2], 9, -51403784);
        c = md5gg(c, d, a, b, x[i + 7], 14, 1735328473);
        b = md5gg(b, c, d, a, x[i + 12], 20, -1926607734);
        a = md5hh(a, b, c, d, x[i + 5], 4, -378558);
        d = md5hh(d, a, b, c, x[i + 8], 11, -2022574463);
        c = md5hh(c, d, a, b, x[i + 11], 16, 1839030562);
        b = md5hh(b, c, d, a, x[i + 14], 23, -35309556);
        a = md5hh(a, b, c, d, x[i + 1], 4, -1530992060);
        d = md5hh(d, a, b, c, x[i + 4], 11, 1272893353);
        c = md5hh(c, d, a, b, x[i + 7], 16, -155497632);
        b = md5hh(b, c, d, a, x[i + 10], 23, -1094730640);
        a = md5hh(a, b, c, d, x[i + 13], 4, 681279174);
        d = md5hh(d, a, b, c, x[i], 11, -358537222);
        c = md5hh(c, d, a, b, x[i + 3], 16, -722521979);
        b = md5hh(b, c, d, a, x[i + 6], 23, 76029189);
        a = md5hh(a, b, c, d, x[i + 9], 4, -640364487);
        d = md5hh(d, a, b, c, x[i + 12], 11, -421815835);
        c = md5hh(c, d, a, b, x[i + 15], 16, 530742520);
        b = md5hh(b, c, d, a, x[i + 2], 23, -995338651);
        a = md5ii(a, b, c, d, x[i], 6, -198630844);
        d = md5ii(d, a, b, c, x[i + 7], 10, 1126891415);
        c = md5ii(c, d, a, b, x[i + 14], 15, -1416354905);
        b = md5ii(b, c, d, a, x[i + 5], 21, -57434055);
        a = md5ii(a, b, c, d, x[i + 12], 6, 1700485571);
        d = md5ii(d, a, b, c, x[i + 3], 10, -1894986606);
        c = md5ii(c, d, a, b, x[i + 10], 15, -1051523);
        b = md5ii(b, c, d, a, x[i + 1], 21, -2054922799);
        a = md5ii(a, b, c, d, x[i + 8], 6, 1873313359);
        d = md5ii(d, a, b, c, x[i + 15], 10, -30611744);
        c = md5ii(c, d, a, b, x[i + 6], 15, -1560198380);
        b = md5ii(b, c, d, a, x[i + 13], 21, 1309151649);
        a = md5ii(a, b, c, d, x[i + 4], 6, -145523070);
        d = md5ii(d, a, b, c, x[i + 11], 10, -1120210379);
        c = md5ii(c, d, a, b, x[i + 2], 15, 718787259);
        b = md5ii(b, c, d, a, x[i + 9], 21, -343485551);
        a = safeAdd(a, olda);
        b = safeAdd(b, oldb);
        c = safeAdd(c, oldc);
        d = safeAdd(d, oldd);
    }
    return [
        a,
        b,
        c,
        d
    ];
}
/*
 * Convert an array bytes to an array of little-endian words
 * Characters >255 have their high-byte silently ignored.
 */ function bytesToWords(input) {
    if (input.length === 0) return [];
    const length8 = input.length * 8;
    const output = new Uint32Array(getOutputLength(length8));
    for(let i = 0; i < length8; i += 8)output[i >> 5] |= (input[i / 8] & 255) << i % 32;
    return output;
}
/*
 * Add integers, wrapping at 2^32. This uses 16-bit operations internally
 * to work around bugs in some JS interpreters.
 */ function safeAdd(x, y) {
    const lsw = (x & 65535) + (y & 65535);
    const msw = (x >> 16) + (y >> 16) + (lsw >> 16);
    return msw << 16 | lsw & 65535;
}
/*
 * Bitwise rotate a 32-bit number to the left.
 */ function bitRotateLeft(num, cnt) {
    return num << cnt | num >>> 32 - cnt;
}
/*
 * These functions implement the four basic operations the algorithm uses.
 */ function md5cmn(q, a, b, x, s, t) {
    return safeAdd(bitRotateLeft(safeAdd(safeAdd(a, q), safeAdd(x, t)), s), b);
}
function md5ff(a, b, c, d, x, s, t) {
    return md5cmn(b & c | ~b & d, a, b, x, s, t);
}
function md5gg(a, b, c, d, x, s, t) {
    return md5cmn(b & d | c & ~d, a, b, x, s, t);
}
function md5hh(a, b, c, d, x, s, t) {
    return md5cmn(b ^ c ^ d, a, b, x, s, t);
}
function md5ii(a, b, c, d, x, s, t) {
    return md5cmn(c ^ (b | ~d), a, b, x, s, t);
}
var _default = md5;
exports.default = _default;

},{}],"3SJEo":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = void 0;
var _rng = _interopRequireDefault(require("./rng.js"));
var _stringify = _interopRequireDefault(require("./stringify.js"));
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function v4(options, buf, offset) {
    options = options || {
    };
    const rnds = options.random || (options.rng || _rng.default)(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
    rnds[6] = rnds[6] & 15 | 64;
    rnds[8] = rnds[8] & 63 | 128; // Copy bytes to buffer, if provided
    if (buf) {
        offset = offset || 0;
        for(let i = 0; i < 16; ++i)buf[offset + i] = rnds[i];
        return buf;
    }
    return _stringify.default(rnds);
}
var _default = v4;
exports.default = _default;

},{"./rng.js":"2Vwy2","./stringify.js":"4ATB7"}],"6IDpy":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = void 0;
var _v = _interopRequireDefault(require("./v35.js"));
var _sha = _interopRequireDefault(require("./sha1.js"));
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const v5 = _v.default('v5', 80, _sha.default);
var _default = v5;
exports.default = _default;

},{"./v35.js":"Fu2ze","./sha1.js":"6po2z"}],"6po2z":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = void 0;
// Adapted from Chris Veness' SHA1 code at
// http://www.movable-type.co.uk/scripts/sha1.html
function f(s, x, y, z) {
    switch(s){
        case 0:
            return x & y ^ ~x & z;
        case 1:
            return x ^ y ^ z;
        case 2:
            return x & y ^ x & z ^ y & z;
        case 3:
            return x ^ y ^ z;
    }
}
function ROTL(x, n) {
    return x << n | x >>> 32 - n;
}
function sha1(bytes) {
    const K = [
        1518500249,
        1859775393,
        2400959708,
        3395469782
    ];
    const H = [
        1732584193,
        4023233417,
        2562383102,
        271733878,
        3285377520
    ];
    if (typeof bytes === 'string') {
        const msg = unescape(encodeURIComponent(bytes)); // UTF8 escape
        bytes = [];
        for(let i = 0; i < msg.length; ++i)bytes.push(msg.charCodeAt(i));
    } else if (!Array.isArray(bytes)) // Convert Array-like to Array
    bytes = Array.prototype.slice.call(bytes);
    bytes.push(128);
    const l = bytes.length / 4 + 2;
    const N = Math.ceil(l / 16);
    const M = new Array(N);
    for(let i = 0; i < N; ++i){
        const arr = new Uint32Array(16);
        for(let j = 0; j < 16; ++j)arr[j] = bytes[i * 64 + j * 4] << 24 | bytes[i * 64 + j * 4 + 1] << 16 | bytes[i * 64 + j * 4 + 2] << 8 | bytes[i * 64 + j * 4 + 3];
        M[i] = arr;
    }
    M[N - 1][14] = (bytes.length - 1) * 8 / Math.pow(2, 32);
    M[N - 1][14] = Math.floor(M[N - 1][14]);
    M[N - 1][15] = (bytes.length - 1) * 8 & 4294967295;
    for(let i1 = 0; i1 < N; ++i1){
        const W = new Uint32Array(80);
        for(let t = 0; t < 16; ++t)W[t] = M[i1][t];
        for(let t1 = 16; t1 < 80; ++t1)W[t1] = ROTL(W[t1 - 3] ^ W[t1 - 8] ^ W[t1 - 14] ^ W[t1 - 16], 1);
        let a = H[0];
        let b = H[1];
        let c = H[2];
        let d = H[3];
        let e = H[4];
        for(let t2 = 0; t2 < 80; ++t2){
            const s = Math.floor(t2 / 20);
            const T = ROTL(a, 5) + f(s, b, c, d) + e + K[s] + W[t2] >>> 0;
            e = d;
            d = c;
            c = ROTL(b, 30) >>> 0;
            b = a;
            a = T;
        }
        H[0] = H[0] + a >>> 0;
        H[1] = H[1] + b >>> 0;
        H[2] = H[2] + c >>> 0;
        H[3] = H[3] + d >>> 0;
        H[4] = H[4] + e >>> 0;
    }
    return [
        H[0] >> 24 & 255,
        H[0] >> 16 & 255,
        H[0] >> 8 & 255,
        H[0] & 255,
        H[1] >> 24 & 255,
        H[1] >> 16 & 255,
        H[1] >> 8 & 255,
        H[1] & 255,
        H[2] >> 24 & 255,
        H[2] >> 16 & 255,
        H[2] >> 8 & 255,
        H[2] & 255,
        H[3] >> 24 & 255,
        H[3] >> 16 & 255,
        H[3] >> 8 & 255,
        H[3] & 255,
        H[4] >> 24 & 255,
        H[4] >> 16 & 255,
        H[4] >> 8 & 255,
        H[4] & 255
    ];
}
var _default = sha1;
exports.default = _default;

},{}],"2Bnk7":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = void 0;
var _default = '00000000-0000-0000-0000-000000000000';
exports.default = _default;

},{}],"51Zy6":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = void 0;
var _validate = _interopRequireDefault(require("./validate.js"));
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function version(uuid) {
    if (!_validate.default(uuid)) throw TypeError('Invalid UUID');
    return parseInt(uuid.substr(14, 1), 16);
}
var _default = version;
exports.default = _default;

},{"./validate.js":"6BOPh"}]},["bfhYt","4ivAA"], "4ivAA", "parcelRequire8b12")

