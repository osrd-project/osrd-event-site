/*
 * anime.js v3.2.1
 * (c) 2020 Julian Garnier
 * Released under the MIT license
 * animejs.com
 */// Defaults
var e,t,n={update:null,begin:null,loopBegin:null,changeBegin:null,change:null,changeComplete:null,loopComplete:null,complete:null,loop:1,direction:"normal",autoplay:!0,timelineOffset:0},r={duration:1e3,delay:0,endDelay:0,easing:"easeOutElastic(1, .5)",round:0},o=["translateX","translateY","translateZ","rotate","rotateX","rotateY","rotateZ","scale","scaleX","scaleY","scaleZ","skew","skewX","skewY","perspective","matrix","matrix3d"],a={CSS:{},springs:{}};// Utils
function i(e,t,n){return Math.min(Math.max(e,t),n)}function u(e,t){return e.indexOf(t)>-1}function s(e,t){return e.apply(null,t)}var l={arr:function(e){return Array.isArray(e)},obj:function(e){return u(Object.prototype.toString.call(e),"Object")},pth:function(e){return l.obj(e)&&e.hasOwnProperty("totalLength")},svg:function(e){return e instanceof SVGElement},inp:function(e){return e instanceof HTMLInputElement},dom:function(e){return e.nodeType||l.svg(e)},str:function(e){return"string"==typeof e},fnc:function(e){return"function"==typeof e},und:function(e){return void 0===e},nil:function(e){return l.und(e)||null===e},hex:function(e){return/(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(e)},rgb:function(e){return/^rgb/.test(e)},hsl:function(e){return/^hsl/.test(e)},col:function(e){return l.hex(e)||l.rgb(e)||l.hsl(e)},key:function(e){return!n.hasOwnProperty(e)&&!r.hasOwnProperty(e)&&"targets"!==e&&"keyframes"!==e}};// Easings
function c(e){var t=/\(([^)]+)\)/.exec(e);return t?t[1].split(",").map(function(e){return parseFloat(e)}):[]}// Spring solver inspired by Webkit Copyright © 2016 Apple Inc. All rights reserved. https://webkit.org/demos/spring/spring.js
function d(e,t){var n=c(e),r=i(l.und(n[0])?1:n[0],.1,100),o=i(l.und(n[1])?100:n[1],.1,100),u=i(l.und(n[2])?10:n[2],.1,100),s=i(l.und(n[3])?0:n[3],.1,100),d=Math.sqrt(o/r),f=u/(2*Math.sqrt(o*r)),h=f<1?d*Math.sqrt(1-f*f):0,p=f<1?(f*d+-s)/h:-s+d;function m(e){var n=t?t*e/1e3:e;return(n=f<1?Math.exp(-n*f*d)*(1*Math.cos(h*n)+p*Math.sin(h*n)):(1+p*n)*Math.exp(-n*d),0===e||1===e)?e:1-n}return t?m:function(){var t=a.springs[e];if(t)return t;for(var n=1/6,r=0,o=0;;)if(1===m(r+=n)){if(++o>=16)break}else o=0;var i=r*n*1e3;return a.springs[e]=i,i}}// Basic steps easing implementation https://developer.mozilla.org/fr/docs/Web/CSS/transition-timing-function
function f(e){return void 0===e&&(e=10),function(t){return Math.ceil(i(t,1e-6,1)*e)*(1/e)}}// BezierEasing https://github.com/gre/bezier-easing
var h=function(){function e(e,t,n){return(((1-3*n+3*t)*e+(3*n-6*t))*e+3*t)*e}function t(e,t,n){return 3*(1-3*n+3*t)*e*e+2*(3*n-6*t)*e+3*t}return function(n,r,o,a){if(0<=n&&n<=1&&0<=o&&o<=1){var i=new Float32Array(11);if(n!==r||o!==a)for(var u=0;u<11;++u)i[u]=e(.1*u,n,o);return function(u){return n===r&&o===a||0===u||1===u?u:e(function(r){for(var a=0,u=1;10!==u&&i[u]<=r;++u)a+=.1;var s=a+(r-i[--u])/(i[u+1]-i[u])*.1,l=t(s,n,o);return l>=.001?function(n,r,o,a){for(var i=0;i<4;++i){var u=t(r,o,a);if(0===u)break;var s=e(r,o,a)-n;r-=s/u}return r}(r,s,n,o):0===l?s:function(t,n,r,o,a){var i,u,s=0;do(i=e(u=n+(r-n)/2,o,a)-t)>0?r=u:n=u;while(Math.abs(i)>1e-7&&++s<10)return u}(r,a,a+.1,n,o)}(u),r,a)}}}}(),p=(e={linear:function(){return function(e){return e}}},t={Sine:function(){return function(e){return 1-Math.cos(e*Math.PI/2)}},Circ:function(){return function(e){return 1-Math.sqrt(1-e*e)}},Back:function(){return function(e){return e*e*(3*e-2)}},Bounce:function(){return function(e){for(var t,n=4;e<((t=Math.pow(2,--n))-1)/11;);return 1/Math.pow(4,3-n)-7.5625*Math.pow((3*t-2)/22-e,2)}},Elastic:function(e,t){void 0===e&&(e=1),void 0===t&&(t=.5);var n=i(e,1,10),r=i(t,.1,2);return function(e){return 0===e||1===e?e:-n*Math.pow(2,10*(e-1))*Math.sin((e-1-r/(2*Math.PI)*Math.asin(1/n))*(2*Math.PI)/r)}}},["Quad","Cubic","Quart","Quint","Expo"].forEach(function(e,n){t[e]=function(){return function(e){return Math.pow(e,n+2)}}}),Object.keys(t).forEach(function(n){var r=t[n];e["easeIn"+n]=r,e["easeOut"+n]=function(e,t){return function(n){return 1-r(e,t)(1-n)}},e["easeInOut"+n]=function(e,t){return function(n){return n<.5?r(e,t)(2*n)/2:1-r(e,t)(-2*n+2)/2}},e["easeOutIn"+n]=function(e,t){return function(n){return n<.5?(1-r(e,t)(1-2*n))/2:(r(e,t)(2*n-1)+1)/2}}}),e);function m(e,t){if(l.fnc(e))return e;var n=e.split("(")[0],r=p[n],o=c(e);switch(n){case"spring":return d(e,t);case"cubicBezier":return s(h,o);case"steps":return s(f,o);default:return s(r,o)}}// Strings
function g(e){try{return document.querySelectorAll(e)}catch(e){return}}// Arrays
function v(e,t){for(var n=e.length,r=arguments.length>=2?arguments[1]:void 0,o=[],a=0;a<n;a++)if(a in e){var i=e[a];t.call(r,i,a,e)&&o.push(i)}return o}function y(e){return e.reduce(function(e,t){return e.concat(l.arr(t)?y(t):t)},[])}function w(e){return l.arr(e)?e:(l.str(e)&&(e=g(e)||e),e instanceof NodeList||e instanceof HTMLCollection)?[].slice.call(e):[e]}function b(e,t){return e.some(function(e){return e===t})}// Objects
function M(e){var t={};for(var n in e)t[n]=e[n];return t}function x(e,t){var n=M(e);for(var r in e)n[r]=t.hasOwnProperty(r)?t[r]:e[r];return n}function E(e,t){var n=M(e);for(var r in t)n[r]=l.und(e[r])?t[r]:e[r];return n}// Units
function I(e){var t=/[+-]?\d*\.?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?(%|px|pt|em|rem|in|cm|mm|ex|ch|pc|vw|vh|vmin|vmax|deg|rad|turn)?$/.exec(e);if(t)return t[1]}// Values
function L(e,t){return l.fnc(e)?e(t.target,t.id,t.total):e}function k(e,t){return e.getAttribute(t)}function C(e,t,n){if(b([n,"deg","rad","turn"],I(t)))return t;var r=a.CSS[t+n];if(!l.und(r))return r;var o=document.createElement(e.tagName),i=e.parentNode&&e.parentNode!==document?e.parentNode:document.body;i.appendChild(o),o.style.position="absolute",o.style.width=100+n;var u=100/o.offsetWidth;i.removeChild(o);var s=u*parseFloat(t);return a.CSS[t+n]=s,s}function D(e,t,n){if(t in e.style){var r=t.replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase(),o=e.style[t]||getComputedStyle(e).getPropertyValue(r)||"0";return n?C(e,o,n):o}}function O(e,t){return l.dom(e)&&!l.inp(e)&&(!l.nil(k(e,t))||l.svg(e)&&e[t])?"attribute":l.dom(e)&&b(o,t)?"transform":l.dom(e)&&"transform"!==t&&D(e,t)?"css":null!=e[t]?"object":void 0}function T(e){if(l.dom(e)){for(var t,n=e.style.transform||"",r=/(\w+)\(([^)]*)\)/g,o=new Map;t=r.exec(n);)o.set(t[1],t[2]);return o}}function B(e,t,n,r){switch(O(e,t)){case"transform":var o,a;return o=u(t,"scale")?1:0+(u(t,"translate")||"perspective"===t?"px":u(t,"rotate")||u(t,"skew")?"deg":void 0),a=T(e).get(t)||o,r&&(r.transforms.list.set(t,a),r.transforms.last=t),n?C(e,a,n):a;case"css":return D(e,t,n);case"attribute":return k(e,t);default:return e[t]||0}}function S(e,t){var n=/^(\*=|\+=|-=)/.exec(e);if(!n)return e;var r=I(e)||0,o=parseFloat(t),a=parseFloat(e.replace(n[0],""));switch(n[0][0]){case"+":return o+a+r;case"-":return o-a+r;case"*":return o*a+r}}function P(e,t){if(l.col(e)){var n,r,o,a;return n=e,l.rgb(n)?(r=/rgb\((\d+,\s*[\d]+,\s*[\d]+)\)/g.exec(n))?"rgba("+r[1]+",1)":n:l.hex(n)?(o=n.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i,function(e,t,n,r){return t+t+n+n+r+r}),"rgba("+parseInt((a=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(o))[1],16)+","+parseInt(a[2],16)+","+parseInt(a[3],16)+",1)"):l.hsl(n)?function(e){var t,n,r,o=/hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g.exec(e)||/hsla\((\d+),\s*([\d.]+)%,\s*([\d.]+)%,\s*([\d.]+)\)/g.exec(e),a=parseInt(o[1],10)/360,i=parseInt(o[2],10)/100,u=parseInt(o[3],10)/100,s=o[4]||1;function l(e,t,n){return(n<0&&(n+=1),n>1&&(n-=1),n<1/6)?e+(t-e)*6*n:n<.5?t:n<2/3?e+(t-e)*(2/3-n)*6:e}if(0==i)t=n=r=u;else{var c=u<.5?u*(1+i):u+i-u*i,d=2*u-c;t=l(d,c,a+1/3),n=l(d,c,a),r=l(d,c,a-1/3)}return"rgba("+255*t+","+255*n+","+255*r+","+s+")"}(n):void 0}if(/\s/g.test(e))return e;var i=I(e),u=i?e.substr(0,e.length-i.length):e;return t?u+t:u}// getTotalLength() equivalent for circle, rect, polyline, polygon and line shapes
// adapted from https://gist.github.com/SebLambla/3e0550c496c236709744
function H(e,t){return Math.sqrt(Math.pow(t.x-e.x,2)+Math.pow(t.y-e.y,2))}function q(e){for(var t,n=e.points,r=0,o=0;o<n.numberOfItems;o++){var a=n.getItem(o);o>0&&(r+=H(t,a)),t=a}return r}// Path animation
function A(e){var t;if(e.getTotalLength)return e.getTotalLength();switch(e.tagName.toLowerCase()){case"circle":return 2*Math.PI*k(e,"r");case"rect":return 2*k(e,"width")+2*k(e,"height");case"line":return H({x:k(e,"x1"),y:k(e,"y1")},{x:k(e,"x2"),y:k(e,"y2")});case"polyline":return q(e);case"polygon":return t=e.points,q(e)+H(t.getItem(t.numberOfItems-1),t.getItem(0))}}function F(e,t){var n=t||{},r=n.el||// Motion path
function(e){for(var t=e.parentNode;l.svg(t)&&l.svg(t.parentNode);)t=t.parentNode;return t}(e),o=r.getBoundingClientRect(),a=k(r,"viewBox"),i=o.width,u=o.height,s=n.viewBox||(a?a.split(" "):[0,0,i,u]);return{el:r,viewBox:s,x:s[0]/1,y:s[1]/1,w:i,h:u,vW:s[2],vH:s[3]}}// Decompose value
function N(e,t){// const rgx = /-?\d*\.?\d+/g; // handles basic numbers
// const rgx = /[+-]?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?/g; // handles exponents notation
var n=/[+-]?\d*\.?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?/g,r=P(l.pth(e)?e.totalLength:e,t)+"";// handles exponents notation
return{original:r,numbers:r.match(n)?r.match(n).map(Number):[0],strings:l.str(e)||t?r.split(n):[]}}// Animatables
function V(e){return v(e?y(l.arr(e)?e.map(w):w(e)):[],function(e,t,n){return n.indexOf(e)===t})}function $(e){var t=V(e);return t.map(function(e,n){return{target:e,id:n,total:t.length,transforms:{list:T(e)}}})}// Tween progress
var j={css:function(e,t,n){return e.style[t]=n},attribute:function(e,t,n){return e.setAttribute(t,n)},object:function(e,t,n){return e[t]=n},transform:function(e,t,n,r,o){if(r.list.set(t,n),t===r.last||o){var a="";r.list.forEach(function(e,t){a+=t+"("+e+") "}),e.style.transform=a}}};// Set Value helper
function Y(e,t){$(e).forEach(function(e){for(var n in t){var r=L(t[n],e),o=e.target,a=I(r),i=B(o,n,a,e),u=S(P(r,a||I(i)),i);j[O(o,n)](o,n,u,e.transforms,!0)}})}// Create Instance
function W(e,t){var n=e.length,r=function(e){return e.timelineOffset?e.timelineOffset:0},o={};return o.duration=n?Math.max.apply(Math,e.map(function(e){return r(e)+e.duration})):t.duration,o.delay=n?Math.min.apply(Math,e.map(function(e){return r(e)+e.delay})):t.delay,o.endDelay=n?o.duration-Math.max.apply(Math,e.map(function(e){return r(e)+e.duration-e.endDelay})):t.endDelay,o}var Q=0,X=[],Z=function(){var e;function t(n){for(// memo on algorithm issue:
// dangerous iteration over mutable `activeInstances`
// (that collection may be updated from within callbacks of `tick`-ed animation instances)
var r=X.length,o=0;o<r;){var a=X[o];a.paused?(X.splice(o,1),r--):(a.tick(n),o++)}e=o>0?requestAnimationFrame(t):void 0}return"undefined"!=typeof document&&document.addEventListener("visibilitychange",function(){U.suspendWhenDocumentHidden&&(G()?e=cancelAnimationFrame(e):(// first adjust animations to consider the time that ticks were suspended
X.forEach(function(e){return e._onDocumentVisibility()}),Z()))}),function(){e||G()&&U.suspendWhenDocumentHidden||!(X.length>0)||(e=requestAnimationFrame(t))}}();function G(){return!!document&&document.hidden}// Public Instance
function U(e){void 0===e&&(e={});var t,o,a,u,s,c,f,h,p,g=0,w=0,b=0,k=0,C=null;function D(e){var t=window.Promise&&new Promise(function(e){return C=e});return e.finished=t,t}var T=(o=x(n,t=e),u=function(e,t){var n=[],r=t.keyframes;for(var o in r&&(t=E(function(e){for(var t=v(y(e.map(function(e){return Object.keys(e)})),function(e){return l.key(e)}).reduce(function(e,t){return 0>e.indexOf(t)&&e.push(t),e},[]),n={},r=0;r<t.length;r++)!function(r){var o=t[r];n[o]=e.map(function(e){var t={};for(var n in e)l.key(n)?n==o&&(t.value=e[n]):t[n]=e[n];return t})}(r);return n}(r),t)),t)l.key(o)&&n.push({name:o,tweens:// Properties
function(e,t){var n=M(t);if(/^spring/.test(n.easing)&&(n.duration=d(n.easing)),l.arr(e)){var r=e.length;2!==r||l.obj(e[0])?l.fnc(t.duration)||(n.duration=t.duration/r):e={value:e}}var o=l.arr(e)?e:[e];return o.map(function(e,n){var r=l.obj(e)&&!l.pth(e)?e:{value:e};return l.und(r.delay)&&(r.delay=n?0:t.delay),l.und(r.endDelay)&&(r.endDelay=n===o.length-1?t.endDelay:0),r}).map(function(e){return E(e,n)})}(t[o],e)});return n}(a=x(r,t),t),f=W(c=v(y((s=$(t.targets)).map(function(e){return u.map(function(t){return(// Animations
function(e,t){var n=O(e.target,t.name);if(n){var r,o=t.tweens.map(function(n){var o=// Tweens
function(e,t){var n={};for(var r in e){var o=L(e[r],t);l.arr(o)&&1===(o=o.map(function(e){return L(e,t)})).length&&(o=o[0]),n[r]=o}return n.duration=parseFloat(n.duration),n.delay=parseFloat(n.delay),n}(n,e),a=o.value,i=l.arr(a)?a[1]:a,u=I(i),s=B(e.target,t.name,u,e),c=r?r.to.original:s,d=l.arr(a)?a[0]:c,f=I(d)||I(s),h=u||f;return l.und(i)&&(i=c),o.from=N(d,h),o.to=N(S(i,d),h),o.start=r?r.end:0,o.end=o.start+o.delay+o.duration+o.endDelay,o.easing=m(o.easing,o.duration),o.isPath=l.pth(a),o.isPathTargetInsideSVG=o.isPath&&l.svg(e.target),o.isColor=l.col(o.from.original),o.isColor&&(o.round=1),r=o,o}),a=o[o.length-1];return{type:n,property:t.name,animatable:e,tweens:o,duration:a.end,delay:o[0].delay,endDelay:a.endDelay}}}(e,t))})})),function(e){return!l.und(e)}),a),h=Q,Q++,E(o,{id:h,children:[],animatables:s,animations:c,duration:f.duration,delay:f.delay,endDelay:f.endDelay}));function P(){var e=T.direction;"alternate"!==e&&(T.direction="normal"!==e?"normal":"reverse"),T.reversed=!T.reversed,p.forEach(function(e){return e.reversed=T.reversed})}function H(e){return T.reversed?T.duration-e:e}function q(){g=0,w=H(T.currentTime)*(1/U.speed)}function A(e,t){t&&t.seek(e-t.timelineOffset)}function G(e){for(var t=0,n=T.animations,r=n.length;t<r;){var o=n[t],a=o.animatable,u=o.tweens,s=u.length-1,l=u[s];s&&(l=v(u,function(t){return e<t.end})[0]||l);for(var c=i(e-l.start-l.delay,0,l.duration)/l.duration,d=isNaN(c)?1:l.easing(c),f=l.to.strings,h=l.round,p=[],m=l.to.numbers.length,g=void 0,y=0;y<m;y++){var w=void 0,b=l.to.numbers[y],M=l.from.numbers[y]||0;w=l.isPath?function(e,t,n){function r(n){void 0===n&&(n=0);var r=t+n>=1?t+n:0;return e.el.getPointAtLength(r)}var o=F(e.el,e.svg),a=r(),i=r(-1),u=r(1),s=n?1:o.w/o.vW,l=n?1:o.h/o.vH;switch(e.property){case"x":return(a.x-o.x)*s;case"y":return(a.y-o.y)*l;case"angle":return 180*Math.atan2(u.y-i.y,u.x-i.x)/Math.PI}}(l.value,d*b,l.isPathTargetInsideSVG):M+d*(b-M),h&&!(l.isColor&&y>2)&&(w=Math.round(w*h)/h),p.push(w)}var x=f.length;if(x){g=f[0];for(var E=0;E<x;E++){f[E];var I=f[E+1],L=p[E];isNaN(L)||(I?g+=L+I:g+=L+" ")}}else g=p[0];j[o.type](a.target,o.property,g,a.transforms),o.currentValue=g,t++}}function R(e){T[e]&&!T.passThrough&&T[e](T)}function J(e){var t=T.duration,n=T.delay,r=t-T.endDelay,o=H(e);T.progress=i(o/t*100,0,100),T.reversePlayback=o<T.currentTime,p&&function(e){if(T.reversePlayback)for(var t=k;t--;)A(e,p[t]);else for(var n=0;n<k;n++)A(e,p[n])}(o),!T.began&&T.currentTime>0&&(T.began=!0,R("begin")),!T.loopBegan&&T.currentTime>0&&(T.loopBegan=!0,R("loopBegin")),o<=n&&0!==T.currentTime&&G(0),(o>=r&&T.currentTime!==t||!t)&&G(t),o>n&&o<r?(T.changeBegan||(T.changeBegan=!0,T.changeCompleted=!1,R("changeBegin")),R("change"),G(o)):T.changeBegan&&(T.changeCompleted=!0,T.changeBegan=!1,R("changeComplete")),T.currentTime=i(o,0,t),T.began&&R("update"),e>=t&&(w=0,T.remaining&&!0!==T.remaining&&T.remaining--,T.remaining?(g=b,R("loopComplete"),T.loopBegan=!1,"alternate"===T.direction&&P()):(T.paused=!0,!T.completed&&(T.completed=!0,R("loopComplete"),R("complete"),!T.passThrough&&"Promise"in window&&(C(),D(T)))))}return D(T),T.reset=function(){var e=T.direction;T.passThrough=!1,T.currentTime=0,T.progress=0,T.paused=!0,T.began=!1,T.loopBegan=!1,T.changeBegan=!1,T.completed=!1,T.changeCompleted=!1,T.reversePlayback=!1,T.reversed="reverse"===e,T.remaining=T.loop,k=(p=T.children).length;for(var t=k;t--;)T.children[t].reset();(T.reversed&&!0!==T.loop||"alternate"===e&&1===T.loop)&&T.remaining++,G(T.reversed?T.duration:0)},// internal method (for engine) to adjust animation timings before restoring engine ticks (rAF)
T._onDocumentVisibility=q,// Set Value helper
T.set=function(e,t){return Y(e,t),T},T.tick=function(e){b=e,g||(g=b),J((b+(w-g))*U.speed)},T.seek=function(e){J(H(e))},T.pause=function(){T.paused=!0,q()},T.play=function(){T.paused&&(T.completed&&T.reset(),T.paused=!1,X.push(T),q(),Z())},T.reverse=function(){P(),T.completed=!T.reversed,q()},T.restart=function(){T.reset(),T.play()},T.remove=function(e){z(V(e),T)},T.reset(),T.autoplay&&T.play(),T}// Remove targets from animation
function R(e,t){for(var n=t.length;n--;)b(e,t[n].animatable.target)&&t.splice(n,1)}function z(e,t){var n=t.animations,r=t.children;R(e,n);for(var o=r.length;o--;){var a=r[o],i=a.animations;R(e,i),i.length||a.children.length||r.splice(o,1)}n.length||r.length||t.pause()}U.version="3.2.1",U.speed=1,// TODO:#review: naming, documentation
U.suspendWhenDocumentHidden=!0,U.running=X,U.remove=function(e){for(var t=V(e),n=X.length;n--;)z(t,X[n])},U.get=B,U.set=Y,U.convertPx=C,U.path=function(e,t){var n=l.str(e)?g(e)[0]:e,r=t||100;return function(e){return{property:e,el:n,svg:F(n),totalLength:A(n)*(r/100)}}},U.setDashoffset=function(e){var t=A(e);return e.setAttribute("stroke-dasharray",t),t},U.stagger=// Stagger helpers
function(e,t){void 0===t&&(t={});var n=t.direction||"normal",r=t.easing?m(t.easing):null,o=t.grid,a=t.axis,i=t.from||0,u="first"===i,s="center"===i,c="last"===i,d=l.arr(e),f=d?parseFloat(e[0]):parseFloat(e),h=d?parseFloat(e[1]):0,p=I(d?e[1]:e)||0,g=t.start||0+(d?f:0),v=[],y=0;return function(e,t,l){if(u&&(i=0),s&&(i=(l-1)/2),c&&(i=l-1),!v.length){for(var m=0;m<l;m++){if(o){var w=s?(o[0]-1)/2:i%o[0],b=s?(o[1]-1)/2:Math.floor(i/o[0]),M=m%o[0],x=Math.floor(m/o[0]),E=w-M,I=b-x,L=Math.sqrt(E*E+I*I);"x"===a&&(L=-E),"y"===a&&(L=-I),v.push(L)}else v.push(Math.abs(i-m));y=Math.max.apply(Math,v)}r&&(v=v.map(function(e){return r(e/y)*y})),"reverse"===n&&(v=v.map(function(e){return a?e<0?-1*e:-e:Math.abs(y-e)}))}return g+(d?(h-f)/y:f)*(Math.round(100*v[t])/100)+p}},U.timeline=// Timeline
function(e){void 0===e&&(e={});var t=U(e);return t.duration=0,t.add=function(n,o){var a=X.indexOf(t),i=t.children;function u(e){e.passThrough=!0}a>-1&&X.splice(a,1);for(var s=0;s<i.length;s++)u(i[s]);var c=E(n,x(r,e));c.targets=c.targets||e.targets;var d=t.duration;c.autoplay=!1,c.direction=t.direction,c.timelineOffset=l.und(o)?d:S(o,d),u(t),t.seek(c.timelineOffset);var f=U(c);u(f),i.push(f);var h=W(i,e);return t.delay=h.delay,t.endDelay=h.endDelay,t.duration=h.duration,t.seek(0),t.reset(),t.autoplay&&t.play(),t},t},U.easing=m,U.penner=p,U.random=function(e,t){return Math.floor(Math.random()*(t-e+1))+e};var J=U;let _=1;function K(){let e=window.innerHeight||document.documentElement.clientHeight;_=Math.round((window.scrollY||document.body.scrollTop+(document.documentElement&&document.documentElement.scrollTop||0))/e)+1}K(),document.addEventListener("scroll",function(){console.log("current section",_)}),J({targets:["#logo-path1"],strokeDashoffset:[J.setDashoffset,0],easing:"easeInOutSine",duration:1e3,loop:!1,delay:500}),J({targets:["#logo-path2"],strokeDashoffset:[J.setDashoffset,0],easing:"easeInOutSine",duration:1e3,loop:!1,delay:500}),J({targets:["#logo-path3"],strokeDashoffset:[J.setDashoffset,0],easing:"easeInOutSine",duration:1e3,loop:!1,delay:500}),J({targets:["#logo-path4"],strokeDashoffset:[J.setDashoffset,0],easing:"easeInOutSine",duration:1e3,loop:!1,delay:500}),J({targets:["#logo-path5"],strokeDashoffset:[J.setDashoffset,0],easing:"easeInOutSine",duration:1e3,loop:!1,delay:500}),J({targets:"#first-ornament-svg",opacity:1,duration:1e4,loop:!1,delay:1e3}),J({targets:"#second-ornament-svg",opacity:1,duration:1e4,loop:!1,delay:1e3}),J({targets:"#circle",opacity:1,delay:2e3,duration:1e4}),J({targets:"#titre",opacity:1,delay:2200,duration:1e4}),J({targets:"#date",opacity:1,delay:2500,duration:1e4}),J({targets:"#line",opacity:1,delay:2e3,duration:5e3}),J({targets:".center",opacity:1,delay:3300,duration:5e3}),J({targets:".st1",fill:"#fff",delay:1200,duration:7e3}),J({targets:"#first-text-container",opacity:1,delay:2600,duration:4e3}),J({targets:"#second-text",opacity:1,duration:4e3,delay:2800}),J({targets:"#line-container",x:"0%",rotate:"360deg",duration:2e3,easing:"easeOutQuart",delay:500});// Scrolling behavior
const ee=document.getElementById("arrow-up"),et=document.getElementById("arrow-down"),en=document.getElementById("section-one"),er=document.getElementById("section-two"),eo=document.getElementById("section-three"),ea=document.getElementById("section-four"),ei=document.querySelector(".arrow-container");document.addEventListener("DOMContentLoaded",function(){0===window.scrollY&&ei.removeChild(ee.parentElement),// Add the scroll event listener after the initial check
window.addEventListener("scroll",function(){0===window.scrollY?ei.removeChild(ee.parentElement):ei.appendChild(ee.parentElement),_>=3.9?ei.removeChild(et.parentElement):ei.appendChild(et.parentElement)})}),ee.addEventListener("mouseenter",function(){ee.style.opacity=.5}),ee.addEventListener("mouseleave",function(){ee.style.opacity=1}),et.addEventListener("mouseenter",function(){et.style.opacity=.5}),et.addEventListener("mouseleave",function(){et.style.opacity=1}),document.addEventListener("scroll",function(){K()}),et.addEventListener("click",function(){_>=1&&_<2?er.scrollIntoView({behavior:"smooth"}):_>=2&&_<3?eo.scrollIntoView({behavior:"smooth"}):_>=3&&_<4&&ea.scrollIntoView({behavior:"smooth"})}),ee.addEventListener("click",function(){_>=1&&_<=2?en.scrollIntoView({behavior:"smooth"}):_>=2&&_<=3?er.scrollIntoView({behavior:"smooth"}):_>=3&&_<=4&&eo.scrollIntoView({behavior:"smooth"})});// footer
let eu=document.querySelector(".footer");function es(){let e=window.scrollY||document.documentElement.scrollTop;document.documentElement.scrollHeight,0===e||4===_?eu.classList.add("show"):eu.classList.remove("show")}es(),document.addEventListener("scroll",function(){es()});// Rebours
let el=new Date;const ec=new Date(2023,11,13);let ed=ec.getTime()-el.getTime(),ef=Math.floor(ed/864e5),eh=Math.floor(ed%864e5/36e5),ep=Math.floor(ed%36e5/6e4),em=Math.floor(ed%6e4/1e3);const eg=e=>(e<10?"0":"")+e;let ev=eg(eh),ey=eg(ep),ew=eg(em),eb=`${ev}:${ey}:${ew}`.toUpperCase().split(""),eM=`${ef} JOURS`.toUpperCase().split("");// Mettez à jour le compte à rebours toutes les secondes
setInterval(// A-Z, 0-9, spaces only
function(){},1e3);let ex=eb.length>=eM.length?eb.length:eM.length,eE=document.querySelector(".center"),eI="";for(let e=0;e<ex;e++)eI+='<div class=splitflap><div class="top"></div><div class="bottom"></div><div class="nextHalf"></div><div class="nextFull"></div></div>';eE.innerHTML=eI;// Set up more stuff ///////////////////////////////////////
const eL=document.querySelectorAll(".top"),ek=document.querySelectorAll(".bottom"),eC=document.querySelectorAll(".nextFull"),eD=document.querySelectorAll(".nextHalf");for(let e=0;e<eL.length;e++)ek[e].style.animationDuration="0.1s",eD[e].style.animationDuration="0.1s";// And even more ///////////////////////////////////////////
const eO=["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","1","2","3","4","5","6","7","8","9","0"," ",":"];let eT=[],eB=[],eS=!0;for(let e=0;e<ex;e++)if(eb.length!=ex)for(let e=0;e<ex-eb.length;e++)eb.push(" ");else if(eM.length!=ex)for(let e=0;e<ex-eM.length;e++)eM.push(" ");for(let e=0;e<ex;e++)eT[e]=eO.indexOf(eb[e]),eB[e]=!1,eS=!0;// Flip them flaps /////////////////////////////////////////
setInterval(function(){for(let n=0;n<ex;n++){var e,t;eC[n].innerHTML==eM[n]?(eB[e=n]=!0,ek[e].classList.remove("flip2"),ek[e].style.backgroundColor="#3BB6eB",eD[e].style.backgroundColor="#3BB6eB",eL[e].innerHTML=eO[0==eT[e]?eO.length-1:eT[e]-1],ek[e].innerHTML=eO[0==eT[e]?eO.length-1:eT[e]-1]):(eL[t=n].innerHTML=eO[0==eT[t]?eO.length-1:eT[t]-1],ek[t].innerHTML=eO[0==eT[t]?eO.length-1:eT[t]-1],eC[t].innerHTML=eO[eT[t]],eD[t].innerHTML=eO[eT[t]],ek[t].classList.remove("flip1"),ek[t].offsetWidth,ek[t].classList.add("flip1"),eD[t].classList.remove("flip2"),eD[t].offsetWidth,eD[t].classList.add("flip2"),eT[t]>eO.length-2?eT[t]=0:eT[t]++),eB.every(function(e){return e})&&eS&&(eS=!1,setTimeout(function(){eB.fill(!1),eS=!0;var e=eM.slice();eM=eb.slice(),eb=e.slice()},3e3))}},100);const eP=new IntersectionObserver(e=>{e.forEach(e=>{e.isIntersecting&&(e.target.classList.add("show"),eP.unobserve(e.target))})}),eH=document.querySelectorAll(".hidden");eH.forEach(e=>eP.observe(e)),window.addEventListener("scroll",function(){// Calcul de la position du défilement
var e=window.pageYOffset||document.documentElement.scrollTop,t=window.innerHeight,n=document.querySelector(".section-one"),r=document.querySelector(".section-two .part-one"),o=document.querySelector(".section-three"),a=document.querySelector(".section-four"),i=e/t,u=(e-t)/t,s=(e-2*t)/t;// Fixer une limite pour le pourcentage de défilement entre 0 et 1 pour chaque transition
i=Math.min(1,Math.max(0,i)),u=Math.min(1,Math.max(0,u)),s=Math.min(1,Math.max(0,s)),// Transition de la section 1 à la section 2 (part-one)
n.style.backgroundColor="rgba(120, 106, 191,"+i+")",r.style.backgroundColor="rgba(120, 106, 191,"+i+")",e>=2*t&&(// Commence la transition après que la section 2 dépasse
o.style.backgroundColor="rgba(120, 106, 191,"+(1-s)+")",a.style.backgroundColor="rgba(120, 106, 191,"+(1-s)+")")});//# sourceMappingURL=index.4968ee55.js.map

//# sourceMappingURL=index.4968ee55.js.map
