(this["webpackJsonptic-tac-toe"]=this["webpackJsonptic-tac-toe"]||[]).push([[0],{18:function(n,t,e){n.exports=e(29)},23:function(n,t,e){},26:function(n,t,e){n.exports=e.p+"static/media/wood-click-1.e816b758.wav"},27:function(n,t,e){n.exports=e.p+"static/media/StubbyCannon.9f81f3b2.svg"},28:function(n,t,e){n.exports=e.p+"static/media/vs-pop-1.fb07a03d.mp3"},29:function(n,t,e){"use strict";e.r(t);var r=e(0),a=e.n(r),c=e(14),o=e.n(c),i=(e(23),e(4)),u=e(3),l=e(10),f=e(5),d=e(1),s=e(2);function p(){var n=Object(d.a)(["\n    background-color: white;\n    width: 458px;\n    height: 458px;\n    margin: auto;\n"]);return p=function(){return n},n}function m(){var n=Object(d.a)(["\n    width: 450px;\n    height: 450px;\n    background-color: #05A8AA;\n    display: grid;\n    grid-template-columns: 150px 150px 150px;\n    grid-template-rows: 150px 150px 150px;\n    border-radius: 8px;\n    padding: 4px;\n"]);return m=function(){return n},n}var b=s.a.div(m()),g=s.a.div(p()),v=function(n){return a.a.createElement(g,null,a.a.createElement(b,{id:"board"},n.children))};function h(){var n=Object(d.a)(["\n    border: 1px solid #390040;\n    cursor: pointer;\n    border-radius: 8px;\n    margin: 4px;\n    background-color: #ffffff;\n"]);return h=function(){return n},n}var j=s.a.div(h()),O=function(n){return a.a.createElement(j,{className:"square",id:n.id,onClick:n.click},a.a.createElement("p",null,n.number),a.a.createElement("h1",null,n.value))},x=e(8),y=function(n,t){return Math.random()*(t-n)+n},E=function(n,t){return Math.floor(y(n,t))},w=function(){return 1===Math.round(Math.random())},k=function(n,t,e){var r=setTimeout((function(){console.log("delay: ",n),t(e)}),n);return function(){return clearTimeout(r)}};function z(){var n=Object(d.a)(["\n    position: absolute;\n    will-change: transform;\n    pointer-events: none;\n    "]);return z=function(){return n},n}var A=s.a.svg(z()),X=Object(x.a)(A),I=function(n){var t=n.size,e=n.color;return a.a.createElement("circle",{cx:"".concat(t/2),cy:"".concat(t/2),r:"".concat(t/2*.6),fill:e})},S=function(n){var t=n.size,e=n.color,r=w();return a.a.createElement("polygon",{points:"\n                ".concat(t/2,",\n                0 ").concat(t,",\n                ").concat(y(r?t/2:0,0)," 0,\n                ").concat(y(r?0:t/2,t)),fill:e})},C=function(n){var t=n.size,e=n.color,r=w();return a.a.createElement("rect",{height:"".concat(y(0,r?t:t/2)),width:"".concat(y(0,r?t/2:t)),fill:e})},T=function(n,t){var e,r=(e=[I,S,C])[E(0,e.length)];return a.a.createElement(r,{color:n,size:t})},R=function(n){var t=n.anchorRef,e=n.color,r=n.initialHorizontal,c=n.initialVertical,o=n.rotate,i=n.size,u=function(n){return null==n.current?{initialX:0,initialY:0}:{initialX:-220,initialY:-240}}(t),l=u.initialX,f=u.initialY,d=Object(x.d)({config:x.b.default,from:{horizontal:r,upwards:c,zIndex:1,opacity:80},to:{horizontal:0,upwards:0,zIndex:-1,opacity:0}}),s=d.horizontal,p=d.upwards,m=d.zIndex,b=d.opacity,g=0,v=0,h=(new Date).getTime()/1e3,j=h;return a.a.createElement(X,{style:{opacity:b,zIndex:m,transform:Object(x.c)([p,s],(function(n,t){var e=(new Date).getTime()/1e3,r=e-j;j=e;var a=f-(v+=n*r)+30*(e-h);return"translate3d(".concat(l+(g+=t*r),"px, ").concat(a,"px, 0) rotate(").concat(o,"deg)")}))}},T(e,i))},B=function(n){var t=n.anchorRef,e=n.colors,r=n.dotCount;return a.a.createElement(a.a.Fragment,null,new Array(r).fill().map((function(n,r){return a.a.createElement(R,{key:r,color:e[E(0,e.length)],anchorRef:t,initialHorizontal:y(-250,250),initialVertical:y(200,700),rotate:y(0,360),size:y(8,22)})})))};function M(){var n=Object(d.a)(["\n    width: auto;\n    height: 100px;\n    transition: all 1s;\n    opacity: ",";\n    margin: 10px auto;\n    color: #390040;\n"]);return M=function(){return n},n}function D(){var n=Object(d.a)(["\n    color: #390040;\n    font-weight: bold;\n    font-size: 16px;\n    margin-bottom: 20px; \n    border: 2px solid #390040;\n    padding: 10px 20px;\n    border-radius: 8px;\n    background-color: #F0EFF4;\n"]);return D=function(){return n},n}function F(){var n=Object(d.a)(["\n    margin: 0;\n    font-size: ",";\n    transition: all .4s;\n    color: ","\n    "]);return F=function(){return n},n}function Y(){var n=Object(d.a)(["\n    margin: 0;\n    height: 60px;\n    width: 100%;\n    display: flex;\n    align-content: center;\n    justify-content: center;\n"]);return Y=function(){return n},n}function H(){var n=Object(d.a)(["\n    text-align: center;\n    color: #390040;\n"]);return H=function(){return n},n}var J=s.a.div(H()),P=s.a.div(Y()),V=s.a.h5(F(),(function(n){return n.winner||n.draw?"30px":"20px"}),(function(n){return n.draw?"#390040":n.player?"#bd0000":"#4464AD"})),q=s.a.button(D()),N=s.a.img(M(),(function(n){return n.show?1:0})),G=e(26);var K=function(n){var t=Object(r.useState)("X"),c=Object(f.a)(t,2),o=c[0],d=c[1],s=Object(r.useState)(Object(l.a)({},Object(u.a)(Array(9)).map((function(){return null})))),p=Object(f.a)(s,2),m=p[0],b=p[1],g=Object(r.useState)([]),h=Object(f.a)(g,2),j=h[0],x=h[1],y=Object(r.useState)([]),E=Object(f.a)(y,2),w=E[0],z=E[1],A=Object(r.useState)(!1),X=Object(f.a)(A,2),I=X[0],S=X[1],C=Object(r.useState)(!1),T=Object(f.a)(C,2),R=T[0],M=T[1],D=Object(r.useState)([]),F=Object(f.a)(D,2),Y=F[0],H=F[1],K=Object(r.useState)(!1),L=Object(f.a)(K,2),Q=L[0],U=L[1],W=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];Object(r.useEffect)((function(){return _()?S(!0):j.length+w.length===9?M(!0):void d((function(n){return"X"===n?"O":"X"}))}),[m,j,w]);var Z=function(n,t){var e=document.getElementById(n);void 0!==t&&(e.volume=t),e.play()},$=function(n){var t=parseInt(n.target.id);null!==m[t]||I||(Z("clickAudio",.4),b(Object(l.a)({},m,Object(i.a)({},t,o))),"X"===o?x([].concat(Object(u.a)(j),[t])):z([].concat(Object(u.a)(w),[t])))},_=function(){var n="X"===o?j:w;if(n.length<3)return!1;for(var t=function(t){var e=n.filter((function(n){return W[t].includes(n)}));if(3===e.length)return function(n,t,e,r){t([].concat(Object(u.a)(e),[n]));var a="X"===r?"#bd0000":"#4464AD";n.map((function(n){return document.getElementById(n).style.backgroundColor=a}))}(e,H,Y,o),k(1050,Z,"popAudio"),k(1150,U,!Q),{v:!0}},e=0;e<W.length;e++){var r=t(e);if("object"===typeof r)return r.v}return!1},nn=Object(r.useRef)(),tn=Object(u.a)(Array(9)).map((function(n,t){return a.a.createElement(O,{id:t,key:t,number:t+1,value:m[t],click:$})}));return a.a.createElement(J,null,a.a.createElement("h1",null,"Tic Tac Toe"),a.a.createElement(P,null,a.a.createElement(V,{draw:R,winner:I,player:"X"===o},R?"The game is a draw, please restart":I?"Player ".concat(o," is the winner!"):"Current Player: ".concat(o))),a.a.createElement(q,{onClick:function(){d("X"),b(Object(l.a)({},Object(u.a)(Array(9)).map((function(){return null})))),x([]),z([]),S(!1),M(!1),Y[Y.length-1].map((function(n){return document.getElementById(n).style.backgroundColor="#ffffff"})),document.getElementById("board").style.opacity=1,U(!1)}},"Reset game"),a.a.createElement(v,null,tn,a.a.createElement("audio",{id:"clickAudio",preload:"auto"},a.a.createElement("source",{src:G}))),a.a.createElement(N,{show:I,src:e(27),alt:"confetti canon",ref:nn}),I&&Q&&a.a.createElement(B,{anchorRef:nn,dotCount:50,colors:["red","green","blue","yellow"]}),a.a.createElement("audio",{id:"popAudio",preload:"none"},a.a.createElement("source",{src:e(28)})))};o.a.render(a.a.createElement(a.a.StrictMode,null,a.a.createElement(K,null)),document.getElementById("root"))}},[[18,1,2]]]);
//# sourceMappingURL=main.9ebd290c.chunk.js.map