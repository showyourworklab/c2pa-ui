var z=Object.defineProperty;var B=(e,t,n)=>t in e?z(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var y=(e,t,n)=>(B(e,typeof t!="symbol"?t+"":t,n),n);import{r as p,n as x,f as v,h as W,i as C,j as L,k as N,l as M,m as P,p as A,q as T,v as q,w as D}from"./scheduler.W2pu3yam.js";let $=!1;function H(){$=!0}function O(){$=!1}function R(e,t,n,i){for(;e<t;){const r=e+(t-e>>1);n(r)<=i?e=r+1:t=r}return e}function U(e){if(e.hydrate_init)return;e.hydrate_init=!0;let t=e.childNodes;if(e.nodeName==="HEAD"){const s=[];for(let l=0;l<t.length;l++){const f=t[l];f.claim_order!==void 0&&s.push(f)}t=s}const n=new Int32Array(t.length+1),i=new Int32Array(t.length);n[0]=-1;let r=0;for(let s=0;s<t.length;s++){const l=t[s].claim_order,f=(r>0&&t[n[r]].claim_order<=l?r+1:R(1,r,_=>t[n[_]].claim_order,l))-1;i[s]=n[f]+1;const u=f+1;n[u]=s,r=Math.max(u,r)}const o=[],a=[];let c=t.length-1;for(let s=n[r]+1;s!=0;s=i[s-1]){for(o.push(t[s-1]);c>=s;c--)a.push(t[c]);c--}for(;c>=0;c--)a.push(t[c]);o.reverse(),a.sort((s,l)=>s.claim_order-l.claim_order);for(let s=0,l=0;s<a.length;s++){for(;l<o.length&&a[s].claim_order>=o[l].claim_order;)l++;const f=l<o.length?o[l]:null;e.insertBefore(a[s],f)}}function V(e,t){e.appendChild(t)}function k(e,t){if($){for(U(e),(e.actual_end_child===void 0||e.actual_end_child!==null&&e.actual_end_child.parentNode!==e)&&(e.actual_end_child=e.firstChild);e.actual_end_child!==null&&e.actual_end_child.claim_order===void 0;)e.actual_end_child=e.actual_end_child.nextSibling;t!==e.actual_end_child?(t.claim_order!==void 0||t.parentNode!==e)&&e.insertBefore(t,e.actual_end_child):e.actual_end_child=t.nextSibling}else(t.parentNode!==e||t.nextSibling!==null)&&e.appendChild(t)}function re(e,t,n){$&&!n?k(e,t):(t.parentNode!==e||t.nextSibling!=n)&&e.insertBefore(t,n||null)}function E(e){e.parentNode&&e.parentNode.removeChild(e)}function se(e,t){for(let n=0;n<e.length;n+=1)e[n]&&e[n].d(t)}function I(e){return document.createElement(e)}function w(e){return document.createTextNode(e)}function ae(){return w(" ")}function le(){return w("")}function S(e,t,n,i){return e.addEventListener(t,n,i),()=>e.removeEventListener(t,n,i)}function oe(e,t,n){n==null?e.removeAttribute(t):e.getAttribute(t)!==n&&e.setAttribute(t,n)}function ce(e){return e.dataset.svelteH}function F(e){return Array.from(e.childNodes)}function G(e){e.claim_info===void 0&&(e.claim_info={last_index:0,total_claimed:0})}function j(e,t,n,i,r=!1){G(e);const o=(()=>{for(let a=e.claim_info.last_index;a<e.length;a++){const c=e[a];if(t(c)){const s=n(c);return s===void 0?e.splice(a,1):e[a]=s,r||(e.claim_info.last_index=a),c}}for(let a=e.claim_info.last_index-1;a>=0;a--){const c=e[a];if(t(c)){const s=n(c);return s===void 0?e.splice(a,1):e[a]=s,r?s===void 0&&e.claim_info.last_index--:e.claim_info.last_index=a,c}}return i()})();return o.claim_order=e.claim_info.total_claimed,e.claim_info.total_claimed+=1,o}function J(e,t,n,i){return j(e,r=>r.nodeName===t,r=>{const o=[];for(let a=0;a<r.attributes.length;a++){const c=r.attributes[a];n[c.name]||o.push(c.name)}o.forEach(a=>r.removeAttribute(a))},()=>i(t))}function ue(e,t,n){return J(e,t,n,I)}function K(e,t){return j(e,n=>n.nodeType===3,n=>{const i=""+t;if(n.data.startsWith(i)){if(n.data.length!==i.length)return n.splitText(i.length)}else n.data=i},()=>w(t),!0)}function fe(e){return K(e," ")}function de(e,t){t=""+t,e.data!==t&&(e.data=t)}function _e(e,t){e.value=t??""}function me(e,t,n,i){n==null?e.style.removeProperty(t):e.style.setProperty(t,n,"")}function he(e,t,n){for(let i=0;i<e.options.length;i+=1){const r=e.options[i];if(r.__value===t){r.selected=!0;return}}e.selectedIndex=-1}let m;function Q(){if(m===void 0){m=!1;try{typeof window<"u"&&window.parent&&window.parent.document}catch{m=!0}}return m}function pe(e,t){getComputedStyle(e).position==="static"&&(e.style.position="relative");const i=I("iframe");i.setAttribute("style","display: block; position: absolute; top: 0; left: 0; width: 100%; height: 100%; overflow: hidden; border: 0; opacity: 0; pointer-events: none; z-index: -1;"),i.setAttribute("aria-hidden","true"),i.tabIndex=-1;const r=Q();let o;return r?(i.src="data:text/html,<script>onresize=function(){parent.postMessage(0,'*')}<\/script>",o=S(window,"message",a=>{a.source===i.contentWindow&&t()})):(i.src="about:blank",i.onload=()=>{o=S(i.contentWindow,"resize",t),t()}),V(e,i),()=>{(r||o&&i.contentWindow)&&o(),E(i)}}function $e(e,t){return new e(t)}const h=new Set;let d;function ye(){d={r:0,c:[],p:d}}function xe(){d.r||p(d.c),d=d.p}function X(e,t){e&&e.i&&(h.delete(e),e.i(t))}function we(e,t,n,i){if(e&&e.o){if(h.has(e))return;h.add(e),d.c.push(()=>{h.delete(e),i&&(n&&e.d(1),i())}),e.o(t)}else i&&i()}function ge(e){e&&e.c()}function be(e,t){e&&e.l(t)}function Y(e,t,n){const{fragment:i,after_update:r}=e.$$;i&&i.m(t,n),N(()=>{const o=e.$$.on_mount.map(T).filter(C);e.$$.on_destroy?e.$$.on_destroy.push(...o):p(o),e.$$.on_mount=[]}),r.forEach(N)}function Z(e,t){const n=e.$$;n.fragment!==null&&(M(n.after_update),p(n.on_destroy),n.fragment&&n.fragment.d(t),n.on_destroy=n.fragment=null,n.ctx=[])}function ee(e,t){e.$$.dirty[0]===-1&&(q.push(e),D(),e.$$.dirty.fill(0)),e.$$.dirty[t/31|0]|=1<<t%31}function ve(e,t,n,i,r,o,a=null,c=[-1]){const s=P;A(e);const l=e.$$={fragment:null,ctx:[],props:o,update:x,not_equal:r,bound:v(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(t.context||(s?s.$$.context:[])),callbacks:v(),dirty:c,skip_bound:!1,root:t.target||s.$$.root};a&&a(l.root);let f=!1;if(l.ctx=n?n(e,t.props||{},(u,_,...g)=>{const b=g.length?g[0]:_;return l.ctx&&r(l.ctx[u],l.ctx[u]=b)&&(!l.skip_bound&&l.bound[u]&&l.bound[u](b),f&&ee(e,u)),_}):[],l.update(),f=!0,p(l.before_update),l.fragment=i?i(l.ctx):!1,t.target){if(t.hydrate){H();const u=F(t.target);l.fragment&&l.fragment.l(u),u.forEach(E)}else l.fragment&&l.fragment.c();t.intro&&X(e.$$.fragment),Y(e,t.target,t.anchor),O(),W()}A(s)}class Ne{constructor(){y(this,"$$");y(this,"$$set")}$destroy(){Z(this,1),this.$destroy=x}$on(t,n){if(!C(n))return x;const i=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return i.push(n),()=>{const r=i.indexOf(n);r!==-1&&i.splice(r,1)}}$set(t){this.$$set&&!L(t)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}const te="4";typeof window<"u"&&(window.__svelte||(window.__svelte={v:new Set})).v.add(te);export{me as A,ye as B,$e as C,pe as D,Ne as S,we as a,w as b,ue as c,F as d,I as e,K as f,E as g,fe as h,ve as i,re as j,k,de as l,ge as m,ce as n,be as o,oe as p,he as q,Y as r,ae as s,X as t,S as u,se as v,Z as w,_e as x,le as y,xe as z};
