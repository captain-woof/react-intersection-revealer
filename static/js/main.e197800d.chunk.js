(this["webpackJsonpreact-intersection-revealer-example"]=this["webpackJsonpreact-intersection-revealer-example"]||[]).push([[0],{12:function(e,n,t){e.exports=t(19)},19:function(e,n,t){"use strict";t.r(n);var i,r,o,a,c,l,s,u,d,h,b=t(0),f=t.n(b),g=t(8),m=t.n(g),w=t(3),p=function(e){if(!e)return!1;var n=e.getBoundingClientRect();return n.top<window.innerHeight&&n.left<window.innerWidth&&n.bottom>=0},v=function(e){if(!e)return 0;var n=e.getBoundingClientRect();return p(e)?n.right<=window.innerWidth&&n.right>=0&&n.left<=window.innerWidth&&n.left>=0?1:Math.min((window.innerWidth-n.left)/n.width,n.right/n.width):0},x=function(e){if(!e)return 0;var n=e.getBoundingClientRect();return p(e)?n.bottom<=window.innerHeight&&n.bottom>=0&&n.top<=window.innerHeight&&n.top>=0?1:Math.min((window.innerHeight-n.top)/n.height,n.bottom/n.height):0},j=function(e){var n=e.getBoundingClientRect();return{height:n.height,width:n.width,heightVisible:x(e)*n.height,widthVisible:v(e)*n.width}},E=function(e){var n=Object(b.useState)(p(e.current)),t=n[0],i=n[1],r=Object(b.useState)(v(e.current)),o=r[0],a=r[1],c=Object(b.useState)(x(e.current)),l=c[0],s=c[1],u=Object(b.useState)(),d=u[0],h=u[1],f=Object(b.useState)(),g=f[0],m=f[1],w=Object(b.useState)(),E=w[0],O=w[1],k=Object(b.useState)(),y=k[0],V=k[1];Object(b.useEffect)((function(){i(p(e.current)),a(v(e.current)),s(x(e.current));var n=j(e.current),t=n.height,r=n.heightVisible,o=n.width,c=n.widthVisible;h(t),m(o),O(r),V(c)}),[e.current]);var S=Object(b.useCallback)((function(){!function(e,n,t,i,r,o,a,c){n(p(e.current)),t(v(e.current)),i(x(e.current));var l=j(e.current),s=l.height,u=l.heightVisible,d=l.width,h=l.widthVisible;r(s),o(d),a(u),c(h)}(e,i,a,s,h,m,O,V)}),[e]);return Object(b.useEffect)((function(){return window.addEventListener("scroll",S),function(){window.removeEventListener("scroll",S)}}),[]),{inView:t,visibleFractionX:o,visibleFractionY:l,height:d,width:g,heightVisible:E,widthVisible:y}},O=t(1),k=t(2),y=k.c.div(i||(i=Object(O.a)(["\n    background-color: yellow;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    min-height: 140vh;\n    width: 100%;\n"]))),V=k.c.h1(r||(r=Object(O.a)(["\n    font-size: 2.5rem;\n    color: black;\n    font-weight: 400;\n    background-color: transparent;\n    position: fixed;\n    top: calc(50vh);\n    left: 32px;\n    width: 300px;\n    display: flex;\n    flex-direction: column;\n"]))),S=k.c.div(o||(o=Object(O.a)(["\n    height: 280px;\n    width: 280px;\n    background-color: black;\n    transform: translate(0px, 60vh);\n"]))),L=Object(k.a)(a||(a=Object(O.a)(["\n    body {\n        margin: 0;\n        padding: 0;\n        -webkit-font-smoothing: antialiased;\n        -moz-osx-font-smoothing: grayscale;\n        text-rendering: optimizeLegibility;\n        font-size: 16px;\n        font-family: 'Lato', sans-serif;\n        user-select: none;\n        cursor: none;\n    }\n"]))),M=k.c.div(c||(c=Object(O.a)(["\n    color: black;\n    font-size: 1.2rem;\n    font-weight: 400;\n    font-style: italic;\n    align-self: center;\n    border-bottom: 2px solid black;\n    margin-right: 2rem;\n"]))),z=k.c.div(l||(l=Object(O.a)(["\n    display: flex;\n    flex-direction: row;\n    color: black;\n    font-size: 1rem;    \n    flex-grow: 1;\n    text-align: end;\n    justify-content: flex-end;\n    margin-right: 3rem;\n"]))),C=k.c.a(s||(s=Object(O.a)(["    \n    border-radius: 4px;\n    padding: 4px 8px;\n    border: 2px solid transparent;\n    height: fit-content;\n    width: fit-content;\n    margin-right: 0.5rem;\n    transition: all 0.3s linear;\n    text-decoration: none;\n    color: black;\n    cursor: none;\n    opacity: 1;\n    &:hover {\n        border: 2px solid black;\n    }\n"]))),R=k.c.div(u||(u=Object(O.a)(["\n    background-color: transparent;\n    position: fixed;\n    top: 0;\n    left: 0;\n    width: 100vw;\n    height: max-content;\n    display: flex;\n    flex-direction: row;\n    z-index: 99;\n    margin: 12px;\n"]))),B=k.c.div(d||(d=Object(O.a)(["\n    background-color: transparent;\n    height: 32px;\n    width: 32px;\n    border-radius: 50%;\n    border: 2px solid black;\n    transform: translate(-50%, -50%);\n    position: absolute;\n    pointer-events: none;\n    opacity: 1;\n    transition: opacity 0.3s linear;\n    ","\n    @media (max-width: 600px){\n        display: none;\n    }\n"])),(function(e){return e.vanish&&Object(k.b)(h||(h=Object(O.a)(["\n        opacity: 0;\n    "])))}));function H(e){var n=e.vanish,t=Object(b.useState)(window.innerWidth/2),i=Object(w.a)(t,2),r=i[0],o=i[1],a=Object(b.useState)(window.innerHeight/2),c=Object(w.a)(a,2),l=c[0],s=c[1],u=Object(b.useCallback)((function(e){o(e.pageX),s(e.pageY)}),[]);return Object(b.useEffect)((function(){return document.addEventListener("mousemove",u),function(){document.removeEventListener("mousemove",u)}}),[u]),f.a.createElement(B,{vanish:n,style:{top:l,left:r}})}function W(){var e=Object(b.useRef)(),n=E(e),t=n.inView,i=n.heightVisible,r=Object(b.useState)(!1),o=Object(w.a)(r,2),a=o[0],c=o[1],l=Object(b.useCallback)((function(){c(!0)}),[]);Object(b.useEffect)((function(){return window.addEventListener("scroll",l),function(){window.removeEventListener("scroll",l)}}),[l]);var s=Object(b.useState)(!1),u=Object(w.a)(s,2),d=u[0],h=u[1];return f.a.createElement(f.a.Fragment,null,f.a.createElement(L,null),f.a.createElement(H,{vanish:d}),f.a.createElement(R,null,f.a.createElement(M,null,"react-intersection-revealer"),f.a.createElement(z,null,f.a.createElement(C,{onMouseEnter:function(){h(!0)},onMouseLeave:function(){h(!1)},href:"https://github.com/captain-woof/react-intersection-revealer",target:"_blank"},"Github"),f.a.createElement(C,{onMouseEnter:function(){h(!0)},onMouseLeave:function(){h(!1)},href:"https://github.com/captain-woof/react-intersection-revealer/blob/master/README.md",target:"_blank"},"README"))),f.a.createElement(V,null,a?f.a.createElement(f.a.Fragment,null,f.a.createElement("div",null,"Visible: ".concat(t)),f.a.createElement("div",null,"Visible height: ".concat(Math.round(i),"px"))):f.a.createElement("div",null,"Scroll to see the black box's visibility stats")),f.a.createElement(y,null,f.a.createElement(S,{ref:e})),f.a.createElement(y,null))}m.a.render(f.a.createElement(W,null),document.getElementById("root"))}},[[12,1,2]]]);
//# sourceMappingURL=main.e197800d.chunk.js.map