(this["webpackJsonptic-tac-toe"]=this["webpackJsonptic-tac-toe"]||[]).push([[0],{18:function(n,t,e){n.exports=e(29)},23:function(n,t,e){},26:function(n,t,e){n.exports=e.p+"static/media/wood-click-1.e816b758.wav"},27:function(n,t,e){n.exports=e.p+"static/media/StubbyCannon.9f81f3b2.svg"},28:function(n,t,e){n.exports=e.p+"static/media/vs-pop-1.fb07a03d.mp3"},29:function(n,t,e){"use strict";e.r(t);var r=e(0),a=e.n(r),c=e(14),o=e.n(c),i=(e(23),e(4)),u=e(3),l=e(10),f=e(5),d=e(1),s=e(2);function p(){var n=Object(d.a)(["\n    background-color: white;\n    width: 458px;\n    height: 458px;\n    margin: auto;\n"]);return p=function(){return n},n}function b(){var n=Object(d.a)(["\n    width: 450px;\n    height: 450px;\n    background-color: #05A8AA;\n    display: grid;\n    grid-template-columns: 150px 150px 150px;\n    grid-template-rows: 150px 150px 150px;\n    border-radius: 8px;\n    padding: 4px;\n"]);return b=function(){return n},n}var m=s.a.div(b()),g=s.a.div(p());function h(){var n=Object(d.a)(["\n    border: 1px solid #390040;\n    cursor: pointer;\n    border-radius: 8px;\n    margin: 4px;\n    background-color: #ffffff;\n"]);return h=function(){return n},n}var v=s.a.div(h()),j=function(n){return a.a.createElement(v,{className:"square",id:n.id,onClick:n.click},a.a.createElement("p",null,n.number),a.a.createElement("h1",null,n.value))},O=function(n){var t=Object(u.a)(Array(9)).map((function(t,e){return a.a.createElement(j,{id:e,key:e,number:e+1,value:n.board[e],click:n.handleClick})}));return a.a.createElement(g,null,a.a.createElement(m,{id:"board"},t))},x=e(8),E=function(n,t){return Math.random()*(t-n)+n},y=function(n,t){return Math.floor(E(n,t))},w=function(){return 1===Math.round(Math.random())},k=function(n,t,e){var r=setTimeout((function(){t(e)}),n);return function(){return clearTimeout(r)}};function z(){var n=Object(d.a)(["\n    position: absolute;\n    will-change: transform;\n    pointer-events: none;\n    "]);return z=function(){return n},n}var A=s.a.svg(z()),X=Object(x.a)(A),C=function(n){var t=n.size,e=n.color;return a.a.createElement("circle",{cx:"".concat(t/2),cy:"".concat(t/2),r:"".concat(t/2*.6),fill:e})},S=function(n){var t=n.size,e=n.color,r=w();return a.a.createElement("polygon",{points:"\n                ".concat(t/2,",\n                0 ").concat(t,",\n                ").concat(E(r?t/2:0,0)," 0,\n                ").concat(E(r?0:t/2,t)),fill:e})},I=function(n){var t=n.size,e=n.color,r=w();return a.a.createElement("rect",{height:"".concat(E(0,r?t:t/2)),width:"".concat(E(0,r?t/2:t)),fill:e})},T=function(n,t){var e,r=(e=[C,S,I])[y(0,e.length)];return a.a.createElement(r,{color:n,size:t})},R=function(n){var t=n.anchorRef,e=n.color,r=n.initialHorizontal,c=n.initialVertical,o=n.rotate,i=n.size,u=function(n){return null==n.current?{initialX:0,initialY:0}:{initialX:-220,initialY:-240}}(t),l=u.initialX,f=u.initialY,d=Object(x.d)({config:x.b.default,from:{horizontal:r,upwards:c,zIndex:1,opacity:80},to:{horizontal:0,upwards:0,zIndex:-1,opacity:0}}),s=d.horizontal,p=d.upwards,b=d.zIndex,m=d.opacity,g=0,h=0,v=(new Date).getTime()/1e3,j=v;return a.a.createElement(X,{style:{opacity:m,zIndex:b,transform:Object(x.c)([p,s],(function(n,t){var e=(new Date).getTime()/1e3,r=e-j;j=e;var a=f-(h+=n*r)+30*(e-v);return"translate3d(".concat(l+(g+=t*r),"px, ").concat(a,"px, 0) rotate(").concat(o,"deg)")}))}},T(e,i))},M=function(n){var t=n.anchorRef,e=n.colors,r=n.dotCount;return a.a.createElement(a.a.Fragment,null,new Array(r).fill().map((function(n,r){return a.a.createElement(R,{key:r,color:e[y(0,e.length)],anchorRef:t,initialHorizontal:E(-250,250),initialVertical:E(200,700),rotate:E(0,360),size:E(8,22)})})))};function B(){var n=Object(d.a)(["\n    width: auto;\n    height: 100px;\n    transition: all 1s;\n    opacity: ",";\n    margin: 10px auto;\n    color: #390040;\n"]);return B=function(){return n},n}function D(){var n=Object(d.a)(["\n    color: #390040;\n    font-weight: bold;\n    font-size: 16px;\n    margin-bottom: 20px; \n    border: 2px solid #390040;\n    padding: 10px 20px;\n    border-radius: 8px;\n    background-color: #F0EFF4;\n"]);return D=function(){return n},n}function F(){var n=Object(d.a)(["\n    margin: 0;\n    font-size: ",";\n    transition: all .4s;\n    color: ","\n    "]);return F=function(){return n},n}function Y(){var n=Object(d.a)(["\n    margin: 0;\n    height: 60px;\n    width: 100%;\n    display: flex;\n    align-content: center;\n    justify-content: center;\n"]);return Y=function(){return n},n}function H(){var n=Object(d.a)(["\n    text-align: center;\n    color: #390040;\n"]);return H=function(){return n},n}var J=s.a.div(H()),P=s.a.div(Y()),V=s.a.h5(F(),(function(n){return n.winner||n.draw?"30px":"20px"}),(function(n){return n.draw?"#390040":n.player?"#bd0000":"#4464AD"})),q=s.a.button(D()),N=s.a.img(B(),(function(n){return n.show?1:0})),G=e(26);var K=function(n){var t=Object(r.useState)("X"),c=Object(f.a)(t,2),o=c[0],d=c[1],s=Object(r.useState)(Object(l.a)({},Object(u.a)(Array(9)).map((function(){return null})))),p=Object(f.a)(s,2),b=p[0],m=p[1],g=Object(r.useState)([]),h=Object(f.a)(g,2),v=h[0],j=h[1],x=Object(r.useState)([]),E=Object(f.a)(x,2),y=E[0],w=E[1],z=Object(r.useState)(!1),A=Object(f.a)(z,2),X=A[0],C=A[1],S=Object(r.useState)(!1),I=Object(f.a)(S,2),T=I[0],R=I[1],B=Object(r.useState)([]),D=Object(f.a)(B,2),F=D[0],Y=D[1],H=Object(r.useState)(!1),K=Object(f.a)(H,2),L=K[0],Q=K[1],U=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];Object(r.useEffect)((function(){return Z()?C(!0):v.length+y.length===9?R(!0):void(v.length+y.length>=1&&d((function(n){return"X"===n?"O":"X"})))}),[b,v,y]);var W=function(n,t){var e=document.getElementById(n);void 0!==t&&(e.volume=t),e.play()},Z=function(){var n="X"===o?v:y;if(n.length<3)return!1;for(var t=function(t){var e=n.filter((function(n){return U[t].includes(n)}));if(3===e.length)return function(n,t,e,r){t([].concat(Object(u.a)(e),[n]));var a="X"===r?"#bd0000":"#4464AD";n.map((function(n){return document.getElementById(n).style.backgroundColor=a}))}(e,Y,F,o),k(1050,W,"popAudio"),k(1150,Q,!L),{v:!0}},e=0;e<U.length;e++){var r=t(e);if("object"===typeof r)return r.v}return!1},$=Object(r.useRef)();return a.a.createElement(J,null,a.a.createElement("h1",null,"Tic Tac Toe"),a.a.createElement(P,null,a.a.createElement(V,{draw:T,winner:X,player:"X"===o},T?"The game is a draw, please restart":X?"Player ".concat(o," is the winner!"):"Current Player: ".concat(o))),a.a.createElement(q,{onClick:function(){d("X"),m(Object(l.a)({},Object(u.a)(Array(9)).map((function(){return null})))),j([]),w([]),C(!1),R(!1),F[F.length-1].map((function(n){return document.getElementById(n).style.backgroundColor="#ffffff"})),Q(!1)}},"Reset game"),a.a.createElement(O,{handleClick:function(n){var t=parseInt(n.target.id);null!==b[t]||X||(W("clickAudio",.4),m(Object(l.a)({},b,Object(i.a)({},t,o))),"X"===o?j([].concat(Object(u.a)(v),[t])):w([].concat(Object(u.a)(y),[t])))},board:b}),a.a.createElement("audio",{id:"clickAudio",preload:"auto"},a.a.createElement("source",{src:G})),a.a.createElement(N,{show:X,src:e(27),alt:"confetti canon",ref:$}),X&&L&&a.a.createElement(M,{anchorRef:$,dotCount:50,colors:["red","green","blue","yellow"]}),a.a.createElement("audio",{id:"popAudio",preload:"none"},a.a.createElement("source",{src:e(28)})))};o.a.render(a.a.createElement(a.a.StrictMode,null,a.a.createElement(K,null)),document.getElementById("root"))}},[[18,1,2]]]);
//# sourceMappingURL=main.c46b6850.chunk.js.map