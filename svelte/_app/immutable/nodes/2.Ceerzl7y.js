import{s as H,n as U}from"../chunks/scheduler.W2pu3yam.js";import{S as V,i as F,e as d,s as x,m as M,c as v,d as b,n as S,h as A,g as E,o as R,p as T,j as D,k as r,q as y,r as B,u as G,t as J,a as K,v as Q,w as W,b as X,f as Y,x as Z}from"../chunks/index.C_mrKHUx.js";import{e as w,A as ee,I as te,D as ae,L as se}from"../chunks/App.B40VKa9B.js";function N(i,e,l){const c=i.slice();return c[3]=e[l],c}function j(i){let e,l=i[3]+"",c,m;return{c(){e=d("option"),c=X(l),m=x(),this.h()},l(o){e=v(o,"OPTION",{});var p=b(e);c=Y(p,l),m=A(p),p.forEach(E),this.h()},h(){e.__value=i[3],Z(e,e.__value)},m(o,p){D(o,e,p),r(e,c),r(e,m)},p:U,d(o){o&&E(e)}}}function ne(i){let e,l,c="c2pa-ui/svelte",m,o,p="A Svelte component that wraps a C2PA-compliant image in a UI to expose its provenance.",I,u,z,f,g,k="Image with C2PA data from Leica camera",O,_,L,P,q,C=w(i[1]),a=[];for(let t=0;t<C.length;t+=1)a[t]=j(N(i,C,t));return _=new ee({props:{locale:i[0],src:te,caption:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum quis est ut enim imperdiet lacinia. Etiam vitae volutpat eros. Cras sagittis condimentum lacus, sit amet mattis mauris convallis id.",byline:"Lectus Vitae / Tristique Imperdiet"}}),{c(){e=d("main"),l=d("h1"),l.textContent=c,m=x(),o=d("p"),o.textContent=p,I=x(),u=d("select");for(let t=0;t<a.length;t+=1)a[t].c();z=x(),f=d("section"),g=d("h2"),g.textContent=k,O=x(),M(_.$$.fragment),this.h()},l(t){e=v(t,"MAIN",{class:!0});var n=b(e);l=v(n,"H1",{"data-svelte-h":!0}),S(l)!=="svelte-1hd8nrb"&&(l.textContent=c),m=A(n),o=v(n,"P",{"data-svelte-h":!0}),S(o)!=="svelte-i0jn7i"&&(o.textContent=p),I=A(n),u=v(n,"SELECT",{class:!0});var h=b(u);for(let $=0;$<a.length;$+=1)a[$].l(h);h.forEach(E),z=A(n),f=v(n,"SECTION",{class:!0});var s=b(f);g=v(s,"H2",{"data-svelte-h":!0}),S(g)!=="svelte-1cdtsqy"&&(g.textContent=k),O=A(s),R(_.$$.fragment,s),s.forEach(E),n.forEach(E),this.h()},h(){T(u,"class","svelte-7zs4fz"),T(f,"class","svelte-7zs4fz"),T(e,"class","svelte-7zs4fz")},m(t,n){D(t,e,n),r(e,l),r(e,m),r(e,o),r(e,I),r(e,u);for(let h=0;h<a.length;h+=1)a[h]&&a[h].m(u,null);y(u,i[0]),r(e,z),r(e,f),r(f,g),r(f,O),B(_,f,null),L=!0,P||(q=G(u,"change",i[2]),P=!0)},p(t,[n]){if(n&2){C=w(t[1]);let s;for(s=0;s<C.length;s+=1){const $=N(t,C,s);a[s]?a[s].p($,n):(a[s]=j($),a[s].c(),a[s].m(u,null))}for(;s<a.length;s+=1)a[s].d(1);a.length=C.length}(!L||n&3)&&y(u,t[0]);const h={};n&1&&(h.locale=t[0]),_.$set(h)},i(t){L||(J(_.$$.fragment,t),L=!0)},o(t){K(_.$$.fragment,t),L=!1},d(t){t&&E(e),Q(a,t),W(_),P=!1,q()}}}function le(i,e,l){const c=Object.keys(ae);let m=se;return[m,c,p=>{const{value:I}=p.target;l(0,m=I)}]}class oe extends V{constructor(e){super(),F(this,e,le,ne,H,{})}}const me=oe;export{me as component};
