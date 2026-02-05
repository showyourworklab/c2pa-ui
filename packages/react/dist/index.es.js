import * as ri from "react";
import ur, { createContext as va, useContext as ga, useState as ct, useEffect as wt, useRef as Ft, useCallback as zn, useLayoutEffect as $w, useMemo as Aa, useId as Au } from "react";
const Wp = Symbol("transfer");
function Tw(n, r) {
  return {
    type: Wp,
    value: n,
    transfer: r ? Array.isArray(r) ? r : [r] : [n]
  };
}
function hu(n) {
  return !!(n && typeof n == "object" && Reflect.get(n, "type") === Wp);
}
function Np(n = "default") {
  return {
    createTx(r) {
      const i = /* @__PURE__ */ new Map(), o = r ?? self;
      return o.addEventListener("message", (l) => {
        const { data: d } = l;
        if (d.channelName !== n)
          return;
        const { id: p, result: g, error: v } = d, m = i.get(p);
        m && (v ? m.reject(v) : m.resolve(g), i.delete(p));
      }), new Proxy(
        {},
        {
          get(l, d) {
            return (...p) => {
              const g = Sw(), v = [], m = [];
              return p.forEach((y) => {
                hu(y) ? (v.push(y.value), m.push(...y.transfer)) : v.push(y);
              }), o.postMessage(
                { method: d, args: v, id: g, channelName: n },
                { transfer: m }
              ), new Promise((y, h) => {
                i.set(g, { resolve: y, reject: h });
              });
            };
          }
        }
      );
    },
    rx(r, i) {
      const o = i ?? self;
      o.addEventListener("message", async (l) => {
        const { data: d } = l;
        if (d.channelName !== n)
          return;
        const { method: p, args: g, id: v } = d;
        try {
          const m = await r[p](...g);
          hu(m) ? o.postMessage(
            { result: m.value, id: v, channelName: n },
            { transfer: m.transfer }
          ) : o.postMessage({ result: m, id: v, channelName: n });
        } catch (m) {
          o.postMessage({ error: m, id: v, channelName: n });
        }
      });
    }
  };
}
function Sw() {
  return new Array(4).fill(0).map(() => Math.floor(Math.random() * Number.MAX_SAFE_INTEGER).toString(16)).join("-");
}
const sa = (n) => {
  if (typeof n == "object" && n !== null) {
    if (typeof Object.getPrototypeOf == "function") {
      const r = Object.getPrototypeOf(n);
      return r === Object.prototype || r === null;
    }
    return Object.prototype.toString.call(n) === "[object Object]";
  }
  return !1;
}, Pt = (...n) => n.reduce((r, i) => {
  if (i === void 0)
    return r;
  if (Array.isArray(i))
    throw new TypeError("Arguments provided to ts-deepmerge must be objects, not arrays.");
  return Object.keys(i).forEach((o) => {
    ["__proto__", "constructor", "prototype"].includes(o) || (Array.isArray(r[o]) && Array.isArray(i[o]) ? r[o] = Pt.options.mergeArrays ? Pt.options.uniqueArrayItems ? Array.from(new Set(r[o].concat(i[o]))) : [...r[o], ...i[o]] : i[o] : sa(r[o]) && sa(i[o]) ? r[o] = Pt(r[o], i[o]) : !sa(r[o]) && sa(i[o]) ? r[o] = Pt(i[o], void 0) : r[o] = i[o] === void 0 ? Pt.options.allowUndefinedOverrides ? i[o] : r[o] : i[o]);
  }), r;
}, {}), sc = {
  allowUndefinedOverrides: !0,
  mergeArrays: !0,
  uniqueArrayItems: !0
};
Pt.options = sc;
Pt.withOptions = (n, ...r) => {
  Pt.options = Object.assign(Object.assign({}, sc), n);
  const i = Pt(...r);
  return Pt.options = sc, i;
};
const { createTx: Ow } = Np(), { rx: Pw } = Np("worker"), Up = '(function(){"use strict";let o;function S(n){const e=o.__externref_table_alloc();return o.__wbindgen_externrefs.set(e,n),e}const O=typeof FinalizationRegistry>"u"?{register:()=>{},unregister:()=>{}}:new FinalizationRegistry(n=>n.dtor(n.a,n.b));function j(n){const e=typeof n;if(e=="number"||e=="boolean"||n==null)return`${n}`;if(e=="string")return`"${n}"`;if(e=="symbol"){const _=n.description;return _==null?"Symbol":`Symbol(${_})`}if(e=="function"){const _=n.name;return typeof _=="string"&&_.length>0?`Function(${_})`:"Function"}if(Array.isArray(n)){const _=n.length;let c="[";_>0&&(c+=j(n[0]));for(let i=1;i<_;i++)c+=", "+j(n[i]);return c+="]",c}const t=/\\[object ([^\\]]+)\\]/.exec(toString.call(n));let r;if(t&&t.length>1)r=t[1];else return toString.call(n);if(r=="Object")try{return"Object("+JSON.stringify(n)+")"}catch{return"Object"}return n instanceof Error?`${n.name}: ${n.message}\n${n.stack}`:r}function v(n,e){return n=n>>>0,R().subarray(n/1,n/1+e)}let A=null;function m(){return(A===null||A.buffer.detached===!0||A.buffer.detached===void 0&&A.buffer!==o.memory.buffer)&&(A=new DataView(o.memory.buffer)),A}function y(n,e){return n=n>>>0,V(n,e)}let M=null;function R(){return(M===null||M.byteLength===0)&&(M=new Uint8Array(o.memory.buffer)),M}function d(n,e){try{return n.apply(this,e)}catch(t){const r=S(t);o.__wbindgen_exn_store(r)}}function w(n){return n==null}function N(n,e,t,r){const _={a:n,b:e,cnt:1,dtor:t},c=(...i)=>{_.cnt++;const s=_.a;_.a=0;try{return r(s,_.b,...i)}finally{_.a=s,c._wbg_cb_unref()}};return c._wbg_cb_unref=()=>{--_.cnt===0&&(_.dtor(_.a,_.b),_.a=0,O.unregister(_))},O.register(c,_,_),c}function u(n,e,t){if(t===void 0){const s=T.encode(n),b=e(s.length,1)>>>0;return R().subarray(b,b+s.length).set(s),a=s.length,b}let r=n.length,_=e(r,1)>>>0;const c=R();let i=0;for(;i<r;i++){const s=n.charCodeAt(i);if(s>127)break;c[_+i]=s}if(i!==r){i!==0&&(n=n.slice(i)),_=t(_,r,r=i+n.length*3,1)>>>0;const s=R().subarray(_+i,_+r),b=T.encodeInto(n,s);i+=b.written,_=t(_,r,i,1)>>>0}return a=i,_}function f(n){const e=o.__wbindgen_externrefs.get(n);return o.__externref_table_dealloc(n),e}let E=new TextDecoder("utf-8",{ignoreBOM:!0,fatal:!0});E.decode();const C=2146435072;let x=0;function V(n,e){return x+=e,x>=C&&(E=new TextDecoder("utf-8",{ignoreBOM:!0,fatal:!0}),E.decode(),x=e),E.decode(R().subarray(n,n+e))}const T=new TextEncoder;"encodeInto"in T||(T.encodeInto=function(n,e){const t=T.encode(n);return e.set(t),{read:n.length,written:t.length}});let a=0;function G(n,e,t){o.wasm_bindgen__convert__closures_____invoke__hfa979f81ae70afaa(n,e,t)}function P(n,e){o.wasm_bindgen__convert__closures_____invoke__h6743aa07e10cb0d4(n,e)}function $(n,e,t,r){o.wasm_bindgen__convert__closures_____invoke__h536d005b97d28fdb(n,e,t,r)}const J=["default","no-store","reload","no-cache","force-cache","only-if-cached"],H=["omit","same-origin","include"],X=["same-origin","no-cors","cors","navigate"],k=typeof FinalizationRegistry>"u"?{register:()=>{},unregister:()=>{}}:new FinalizationRegistry(n=>o.__wbg_wasmbuilder_free(n>>>0,1)),z=typeof FinalizationRegistry>"u"?{register:()=>{},unregister:()=>{}}:new FinalizationRegistry(n=>o.__wbg_wasmreader_free(n>>>0,1));typeof FinalizationRegistry>"u"||new FinalizationRegistry(n=>o.__wbg_wasmsigner_free(n>>>0,1));class h{static __wrap(e){e=e>>>0;const t=Object.create(h.prototype);return t.__wbg_ptr=e,k.register(t,t.__wbg_ptr,t),t}__destroy_into_raw(){const e=this.__wbg_ptr;return this.__wbg_ptr=0,k.unregister(this),e}free(){const e=this.__destroy_into_raw();o.__wbg_wasmbuilder_free(e,0)}addAction(e){const t=o.wasmbuilder_addAction(this.__wbg_ptr,e);if(t[1])throw f(t[0])}setIntent(e){const t=o.wasmbuilder_setIntent(this.__wbg_ptr,e);if(t[1])throw f(t[0])}toArchive(){const e=o.wasmbuilder_toArchive(this.__wbg_ptr);if(e[2])throw f(e[1]);return f(e[0])}static fromArchive(e,t){var r=w(t)?0:u(t,o.__wbindgen_malloc,o.__wbindgen_realloc),_=a;const c=o.wasmbuilder_fromArchive(e,r,_);if(c[2])throw f(c[1]);return h.__wrap(c[0])}setNoEmbed(e){o.wasmbuilder_setNoEmbed(this.__wbg_ptr,e)}addIngredient(e){const t=u(e,o.__wbindgen_malloc,o.__wbindgen_realloc),r=a,_=o.wasmbuilder_addIngredient(this.__wbg_ptr,t,r);if(_[1])throw f(_[0])}getDefinition(){const e=o.wasmbuilder_getDefinition(this.__wbg_ptr);if(e[2])throw f(e[1]);return f(e[0])}setRemoteUrl(e){const t=u(e,o.__wbindgen_malloc,o.__wbindgen_realloc),r=a;o.wasmbuilder_setRemoteUrl(this.__wbg_ptr,t,r)}addResourceFromBlob(e,t){const r=u(e,o.__wbindgen_malloc,o.__wbindgen_realloc),_=a,c=o.wasmbuilder_addResourceFromBlob(this.__wbg_ptr,r,_,t);if(c[1])throw f(c[0])}setThumbnailFromBlob(e,t){const r=u(e,o.__wbindgen_malloc,o.__wbindgen_realloc),_=a,c=o.wasmbuilder_setThumbnailFromBlob(this.__wbg_ptr,r,_,t);if(c[1])throw f(c[0])}addIngredientFromBlob(e,t,r){const _=u(e,o.__wbindgen_malloc,o.__wbindgen_realloc),c=a,i=u(t,o.__wbindgen_malloc,o.__wbindgen_realloc),s=a,b=o.wasmbuilder_addIngredientFromBlob(this.__wbg_ptr,_,c,i,s,r);if(b[1])throw f(b[0])}signAndGetManifestBytes(e,t,r){const _=u(t,o.__wbindgen_malloc,o.__wbindgen_realloc),c=a;return o.wasmbuilder_signAndGetManifestBytes(this.__wbg_ptr,e,_,c,r)}static new(e){var t=w(e)?0:u(e,o.__wbindgen_malloc,o.__wbindgen_realloc),r=a;const _=o.wasmbuilder_new(t,r);if(_[2])throw f(_[1]);return h.__wrap(_[0])}sign(e,t,r){const _=u(t,o.__wbindgen_malloc,o.__wbindgen_realloc),c=a;return o.wasmbuilder_sign(this.__wbg_ptr,e,_,c,r)}static fromJson(e,t){const r=u(e,o.__wbindgen_malloc,o.__wbindgen_realloc),_=a;var c=w(t)?0:u(t,o.__wbindgen_malloc,o.__wbindgen_realloc),i=a;const s=o.wasmbuilder_fromJson(r,_,c,i);if(s[2])throw f(s[1]);return h.__wrap(s[0])}}Symbol.dispose&&(h.prototype[Symbol.dispose]=h.prototype.free);class I{static __wrap(e){e=e>>>0;const t=Object.create(I.prototype);return t.__wbg_ptr=e,z.register(t,t.__wbg_ptr,t),t}__destroy_into_raw(){const e=this.__wbg_ptr;return this.__wbg_ptr=0,z.unregister(this),e}free(){const e=this.__destroy_into_raw();o.__wbg_wasmreader_free(e,0)}activeLabel(){const e=o.wasmreader_activeLabel(this.__wbg_ptr);let t;return e[0]!==0&&(t=y(e[0],e[1]).slice(),o.__wbindgen_free(e[0],e[1]*1,1)),t}manifestStore(){const e=o.wasmreader_manifestStore(this.__wbg_ptr);if(e[2])throw f(e[1]);return f(e[0])}activeManifest(){const e=o.wasmreader_activeManifest(this.__wbg_ptr);if(e[2])throw f(e[1]);return f(e[0])}resourceToBytes(e){const t=u(e,o.__wbindgen_malloc,o.__wbindgen_realloc),r=a,_=o.wasmreader_resourceToBytes(this.__wbg_ptr,t,r);if(_[2])throw f(_[1]);return f(_[0])}static fromBlobFragment(e,t,r,_){const c=u(e,o.__wbindgen_malloc,o.__wbindgen_realloc),i=a;var s=w(_)?0:u(_,o.__wbindgen_malloc,o.__wbindgen_realloc),b=a;return o.wasmreader_fromBlobFragment(c,i,t,r,s,b)}json(){let e,t;try{const r=o.wasmreader_json(this.__wbg_ptr);return e=r[0],t=r[1],y(r[0],r[1])}finally{o.__wbindgen_free(e,t,1)}}static fromBlob(e,t,r){const _=u(e,o.__wbindgen_malloc,o.__wbindgen_realloc),c=a;var i=w(r)?0:u(r,o.__wbindgen_malloc,o.__wbindgen_realloc),s=a;return o.wasmreader_fromBlob(_,c,t,i,s)}}Symbol.dispose&&(I.prototype[Symbol.dispose]=I.prototype.free);function Y(n){const e=u(n,o.__wbindgen_malloc,o.__wbindgen_realloc),t=a,r=o.loadSettings(e,t);if(r[1])throw f(r[0])}function K(){const n={};return n.wbg={},n.wbg.__wbg_Error_52673b7de5a0ca89=function(e,t){return Error(y(e,t))},n.wbg.__wbg_Number_2d1dcfcf4ec51736=function(e){return Number(e)},n.wbg.__wbg___wbindgen_bigint_get_as_i64_6e32f5e6aff02e1d=function(e,t){const r=t,_=typeof r=="bigint"?r:void 0;m().setBigInt64(e+8,w(_)?BigInt(0):_,!0),m().setInt32(e+0,!w(_),!0)},n.wbg.__wbg___wbindgen_boolean_get_dea25b33882b895b=function(e){const t=e,r=typeof t=="boolean"?t:void 0;return w(r)?16777215:r?1:0},n.wbg.__wbg___wbindgen_debug_string_adfb662ae34724b6=function(e,t){const r=j(t),_=u(r,o.__wbindgen_malloc,o.__wbindgen_realloc),c=a;m().setInt32(e+4,c,!0),m().setInt32(e+0,_,!0)},n.wbg.__wbg___wbindgen_in_0d3e1e8f0c669317=function(e,t){return e in t},n.wbg.__wbg___wbindgen_is_bigint_0e1a2e3f55cfae27=function(e){return typeof e=="bigint"},n.wbg.__wbg___wbindgen_is_function_8d400b8b1af978cd=function(e){return typeof e=="function"},n.wbg.__wbg___wbindgen_is_object_ce774f3490692386=function(e){const t=e;return typeof t=="object"&&t!==null},n.wbg.__wbg___wbindgen_is_string_704ef9c8fc131030=function(e){return typeof e=="string"},n.wbg.__wbg___wbindgen_is_undefined_f6b95eab589e0269=function(e){return e===void 0},n.wbg.__wbg___wbindgen_jsval_eq_b6101cc9cef1fe36=function(e,t){return e===t},n.wbg.__wbg___wbindgen_jsval_loose_eq_766057600fdd1b0d=function(e,t){return e==t},n.wbg.__wbg___wbindgen_number_get_9619185a74197f95=function(e,t){const r=t,_=typeof r=="number"?r:void 0;m().setFloat64(e+8,w(_)?0:_,!0),m().setInt32(e+0,!w(_),!0)},n.wbg.__wbg___wbindgen_string_get_a2a31e16edf96e42=function(e,t){const r=t,_=typeof r=="string"?r:void 0;var c=w(_)?0:u(_,o.__wbindgen_malloc,o.__wbindgen_realloc),i=a;m().setInt32(e+4,i,!0),m().setInt32(e+0,c,!0)},n.wbg.__wbg___wbindgen_throw_dd24417ed36fc46e=function(e,t){throw new Error(y(e,t))},n.wbg.__wbg__wbg_cb_unref_87dfb5aaa0cbcea7=function(e){e._wbg_cb_unref()},n.wbg.__wbg_abort_07646c894ebbf2bd=function(e){e.abort()},n.wbg.__wbg_abort_399ecbcfd6ef3c8e=function(e,t){e.abort(t)},n.wbg.__wbg_append_c5cbdf46455cc776=function(){return d(function(e,t,r,_,c){e.append(y(t,r),y(_,c))},arguments)},n.wbg.__wbg_arrayBuffer_c04af4fce566092d=function(){return d(function(e){return e.arrayBuffer()},arguments)},n.wbg.__wbg_byteLength_faa9938885bdeee6=function(e){return e.byteLength},n.wbg.__wbg_call_3020136f7a2d6e44=function(){return d(function(e,t,r){return e.call(t,r)},arguments)},n.wbg.__wbg_call_abb4ff46ce38be40=function(){return d(function(e,t){return e.call(t)},arguments)},n.wbg.__wbg_clearTimeout_7a42b49784aea641=function(e){return clearTimeout(e)},n.wbg.__wbg_crypto_574e78ad8b13b65f=function(e){return e.crypto},n.wbg.__wbg_done_62ea16af4ce34b24=function(e){return e.done},n.wbg.__wbg_entries_83c79938054e065f=function(e){return Object.entries(e)},n.wbg.__wbg_error_7534b8e9a36f1ab4=function(e,t){let r,_;try{r=e,_=t,console.error(y(e,t))}finally{o.__wbindgen_free(r,_,1)}},n.wbg.__wbg_fetch_74a3e84ebd2c9a0e=function(e){return fetch(e)},n.wbg.__wbg_fetch_90447c28cc0b095e=function(e,t){return e.fetch(t)},n.wbg.__wbg_from_29a8414a7a7cd19d=function(e){return Array.from(e)},n.wbg.__wbg_getRandomValues_1c61fac11405ffdc=function(){return d(function(e,t){globalThis.crypto.getRandomValues(v(e,t))},arguments)},n.wbg.__wbg_getRandomValues_38a1ff1ea09f6cc7=function(){return d(function(e,t){globalThis.crypto.getRandomValues(v(e,t))},arguments)},n.wbg.__wbg_getRandomValues_b8f5dbd5f3995a9e=function(){return d(function(e,t){e.getRandomValues(t)},arguments)},n.wbg.__wbg_getTime_ad1e9878a735af08=function(e){return e.getTime()},n.wbg.__wbg_get_6b7bd52aca3f9671=function(e,t){return e[t>>>0]},n.wbg.__wbg_get_af9dab7e9603ea93=function(){return d(function(e,t){return Reflect.get(e,t)},arguments)},n.wbg.__wbg_get_with_ref_key_1dc361bd10053bfe=function(e,t){return e[t]},n.wbg.__wbg_has_0e670569d65d3a45=function(){return d(function(e,t){return Reflect.has(e,t)},arguments)},n.wbg.__wbg_headers_654c30e1bcccc552=function(e){return e.headers},n.wbg.__wbg_instanceof_ArrayBuffer_f3320d2419cd0355=function(e){let t;try{t=e instanceof ArrayBuffer}catch{t=!1}return t},n.wbg.__wbg_instanceof_Map_084be8da74364158=function(e){let t;try{t=e instanceof Map}catch{t=!1}return t},n.wbg.__wbg_instanceof_Promise_eca6c43a2610558d=function(e){let t;try{t=e instanceof Promise}catch{t=!1}return t},n.wbg.__wbg_instanceof_Response_cd74d1c2ac92cb0b=function(e){let t;try{t=e instanceof Response}catch{t=!1}return t},n.wbg.__wbg_instanceof_Uint8Array_da54ccc9d3e09434=function(e){let t;try{t=e instanceof Uint8Array}catch{t=!1}return t},n.wbg.__wbg_isArray_51fd9e6422c0a395=function(e){return Array.isArray(e)},n.wbg.__wbg_isSafeInteger_ae7d3f054d55fa16=function(e){return Number.isSafeInteger(e)},n.wbg.__wbg_iterator_27b7c8b35ab3e86b=function(){return Symbol.iterator},n.wbg.__wbg_length_22ac23eaec9d8053=function(e){return e.length},n.wbg.__wbg_length_d45040a40c570362=function(e){return e.length},n.wbg.__wbg_msCrypto_a61aeb35a24c1329=function(e){return e.msCrypto},n.wbg.__wbg_new_0_23cedd11d9b40c9d=function(){return new Date},n.wbg.__wbg_new_1ba21ce319a06297=function(){return new Object},n.wbg.__wbg_new_25f239778d6112b9=function(){return new Array},n.wbg.__wbg_new_3c79b3bb1b32b7d3=function(){return d(function(){return new Headers},arguments)},n.wbg.__wbg_new_6421f6084cc5bc5a=function(e){return new Uint8Array(e)},n.wbg.__wbg_new_881a222c65f168fc=function(){return d(function(){return new AbortController},arguments)},n.wbg.__wbg_new_8a6f238a6ece86ea=function(){return new Error},n.wbg.__wbg_new_b546ae120718850e=function(){return new Map},n.wbg.__wbg_new_bd4ee84941f474fa=function(){return d(function(){return new FileReaderSync},arguments)},n.wbg.__wbg_new_df1173567d5ff028=function(e,t){return new Error(y(e,t))},n.wbg.__wbg_new_ff12d2b041fb48f1=function(e,t){try{var r={a:e,b:t},_=(i,s)=>{const b=r.a;r.a=0;try{return $(b,r.b,i,s)}finally{r.a=b}};return new Promise(_)}finally{r.a=r.b=0}},n.wbg.__wbg_new_from_slice_f9c22b9153b26992=function(e,t){return new Uint8Array(v(e,t))},n.wbg.__wbg_new_no_args_cb138f77cf6151ee=function(e,t){return new Function(y(e,t))},n.wbg.__wbg_new_with_length_aa5eaf41d35235e5=function(e){return new Uint8Array(e>>>0)},n.wbg.__wbg_new_with_str_and_init_c5748f76f5108934=function(){return d(function(e,t,r){return new Request(y(e,t),r)},arguments)},n.wbg.__wbg_next_138a17bbf04e926c=function(e){return e.next},n.wbg.__wbg_next_3cfe5c0fe2a4cc53=function(){return d(function(e){return e.next()},arguments)},n.wbg.__wbg_node_905d3e251edff8a2=function(e){return e.node},n.wbg.__wbg_now_69d776cd24f5215b=function(){return Date.now()},n.wbg.__wbg_process_dc0fbacc7c1c06f7=function(e){return e.process},n.wbg.__wbg_prototypesetcall_dfe9b766cdc1f1fd=function(e,t,r){Uint8Array.prototype.set.call(v(e,t),r)},n.wbg.__wbg_queueMicrotask_9b549dfce8865860=function(e){return e.queueMicrotask},n.wbg.__wbg_queueMicrotask_fca69f5bfad613a5=function(e){queueMicrotask(e)},n.wbg.__wbg_randomFillSync_ac0988aba3254290=function(){return d(function(e,t){e.randomFillSync(t)},arguments)},n.wbg.__wbg_readAsArrayBuffer_5a7ad12aa99daa2f=function(){return d(function(e,t){return e.readAsArrayBuffer(t)},arguments)},n.wbg.__wbg_require_60cc747a6bc5215a=function(){return d(function(){return module.require},arguments)},n.wbg.__wbg_resolve_fd5bfbaa4ce36e1e=function(e){return Promise.resolve(e)},n.wbg.__wbg_setTimeout_7bb3429662ab1e70=function(e,t){return setTimeout(e,t)},n.wbg.__wbg_set_169e13b608078b7b=function(e,t,r){e.set(v(t,r))},n.wbg.__wbg_set_3f1d0b984ed272ed=function(e,t,r){e[t]=r},n.wbg.__wbg_set_7df433eea03a5c14=function(e,t,r){e[t>>>0]=r},n.wbg.__wbg_set_body_8e743242d6076a4f=function(e,t){e.body=t},n.wbg.__wbg_set_cache_0e437c7c8e838b9b=function(e,t){e.cache=J[t]},n.wbg.__wbg_set_credentials_55ae7c3c106fd5be=function(e,t){e.credentials=H[t]},n.wbg.__wbg_set_efaaf145b9377369=function(e,t,r){return e.set(t,r)},n.wbg.__wbg_set_headers_5671cf088e114d2b=function(e,t){e.headers=t},n.wbg.__wbg_set_method_76c69e41b3570627=function(e,t,r){e.method=y(t,r)},n.wbg.__wbg_set_mode_611016a6818fc690=function(e,t){e.mode=X[t]},n.wbg.__wbg_set_signal_e89be862d0091009=function(e,t){e.signal=t},n.wbg.__wbg_signal_3c14fbdc89694b39=function(e){return e.signal},n.wbg.__wbg_size_82fbdb656de23326=function(e){return e.size},n.wbg.__wbg_slice_3518c924243cda3a=function(){return d(function(e,t,r){return e.slice(t,r)},arguments)},n.wbg.__wbg_stack_0ed75d68575b0f3c=function(e,t){const r=t.stack,_=u(r,o.__wbindgen_malloc,o.__wbindgen_realloc),c=a;m().setInt32(e+4,c,!0),m().setInt32(e+0,_,!0)},n.wbg.__wbg_static_accessor_GLOBAL_769e6b65d6557335=function(){const e=typeof global>"u"?null:global;return w(e)?0:S(e)},n.wbg.__wbg_static_accessor_GLOBAL_THIS_60cf02db4de8e1c1=function(){const e=typeof globalThis>"u"?null:globalThis;return w(e)?0:S(e)},n.wbg.__wbg_static_accessor_SELF_08f5a74c69739274=function(){const e=typeof self>"u"?null:self;return w(e)?0:S(e)},n.wbg.__wbg_static_accessor_WINDOW_a8924b26aa92d024=function(){const e=typeof window>"u"?null:window;return w(e)?0:S(e)},n.wbg.__wbg_status_9bfc680efca4bdfd=function(e){return e.status},n.wbg.__wbg_stringify_655a6390e1f5eb6b=function(){return d(function(e){return JSON.stringify(e)},arguments)},n.wbg.__wbg_subarray_845f2f5bce7d061a=function(e,t,r){return e.subarray(t>>>0,r>>>0)},n.wbg.__wbg_then_429f7caf1026411d=function(e,t,r){return e.then(t,r)},n.wbg.__wbg_then_4f95312d68691235=function(e,t){return e.then(t)},n.wbg.__wbg_url_b6d11838a4f95198=function(e,t){const r=t.url,_=u(r,o.__wbindgen_malloc,o.__wbindgen_realloc),c=a;m().setInt32(e+4,c,!0),m().setInt32(e+0,_,!0)},n.wbg.__wbg_valueOf_17c63ed1b225597a=function(e){return e.valueOf()},n.wbg.__wbg_value_57b7b035e117f7ee=function(e){return e.value},n.wbg.__wbg_versions_c01dfd4722a88165=function(e){return e.versions},n.wbg.__wbg_wasmreader_new=function(e){return I.__wrap(e)},n.wbg.__wbindgen_cast_0bcf4d5a20a2764c=function(e,t){return N(e,t,o.wasm_bindgen__closure__destroy__h9cd45bdf09c25ec5,P)},n.wbg.__wbindgen_cast_2241b6af4c4b2941=function(e,t){return y(e,t)},n.wbg.__wbindgen_cast_2ddd8a25ff58642a=function(e,t){return BigInt.asUintN(64,e)|t<<BigInt(64)},n.wbg.__wbindgen_cast_4625c577ab2ec9ee=function(e){return BigInt.asUintN(64,e)},n.wbg.__wbindgen_cast_77bc3e92745e9a35=function(e,t){var r=v(e,t).slice();return o.__wbindgen_free(e,t*1,1),r},n.wbg.__wbindgen_cast_815cc8b6fd6cc840=function(e,t){return N(e,t,o.wasm_bindgen__closure__destroy__h628fe959fcf32094,G)},n.wbg.__wbindgen_cast_9ae0607507abb057=function(e){return e},n.wbg.__wbindgen_cast_cb9088102bce6b30=function(e,t){return v(e,t)},n.wbg.__wbindgen_cast_d6cd19b81560fd6e=function(e){return e},n.wbg.__wbindgen_init_externref_table=function(){const e=o.__wbindgen_externrefs,t=e.grow(4);e.set(0,void 0),e.set(t+0,void 0),e.set(t+1,null),e.set(t+2,!0),e.set(t+3,!1)},n}function Q(n,e){return o=n.exports,A=null,M=null,o.__wbindgen_start(),o}function Z(n){if(o!==void 0)return o;typeof n<"u"&&(Object.getPrototypeOf(n)===Object.prototype?{module:n}=n:console.warn("using deprecated parameters for `initSync()`; pass a single object instead"));const e=K();n instanceof WebAssembly.Module||(n=new WebAssembly.Module(n));const t=new WebAssembly.Instance(n,e);return Q(t)}function D(){let n=0;const e=new Map;return{add(t){const r=n++;return e.set(r,t),r},get(t){const r=e.get(t);if(!r)throw new Error("Attempted to use an object that has been freed");return r},remove(t){return e.delete(t)}}}const L=Symbol("transfer");function F(n,e){return{type:L,value:n,transfer:e?Array.isArray(e)?e:[e]:[n]}}function U(n){return!!(n&&typeof n=="object"&&Reflect.get(n,"type")===L)}function q(n="default"){return{createTx(e){const t=new Map,r=e??self;return r.addEventListener("message",_=>{const{data:c}=_;if(c.channelName!==n)return;const{id:i,result:s,error:b}=c,l=t.get(i);l&&(b?l.reject(b):l.resolve(s),t.delete(i))}),new Proxy({},{get(_,c){return(...i)=>{const s=ee(),b=[],l=[];return i.forEach(B=>{U(B)?(b.push(B.value),l.push(...B.transfer)):b.push(B)}),r.postMessage({method:c,args:b,id:s,channelName:n},{transfer:l}),new Promise((B,re)=>{t.set(s,{resolve:B,reject:re})})}}})},rx(e,t){const r=t??self;r.addEventListener("message",async _=>{const{data:c}=_;if(c.channelName!==n)return;const{method:i,args:s,id:b}=c;try{const l=await e[i](...s);U(l)?r.postMessage({result:l.value,id:b,channelName:n},{transfer:l.transfer}):r.postMessage({result:l,id:b,channelName:n})}catch(l){r.postMessage({error:l,id:b,channelName:n})}})}}}function ee(){return new Array(4).fill(0).map(()=>Math.floor(Math.random()*Number.MAX_SAFE_INTEGER).toString(16)).join("-")}const{rx:te}=q(),{createTx:ne}=q("worker"),p=D(),g=D(),W=ne();te({async initWorker(n,e){Z({module:n}),e&&Y(e)},async reader_fromBlob(n,e,t){const r=await I.fromBlob(n,e,t);return p.add(r)},async reader_fromBlobFragment(n,e,t,r){const _=await I.fromBlobFragment(n,e,t,r);return p.add(_)},reader_activeLabel(n){return p.get(n).activeLabel()??null},reader_manifestStore(n){return p.get(n).manifestStore()},reader_activeManifest(n){return p.get(n).activeManifest()},reader_json(n){return p.get(n).json()},reader_resourceToBytes(n,e){const r=p.get(n).resourceToBytes(e);return F(r,r.buffer)},reader_free(n){p.get(n).free(),p.remove(n)},builder_new(n){const e=h.new(n);return g.add(e)},builder_fromJson(n,e){const t=h.fromJson(n,e);return g.add(t)},builder_fromArchive(n,e){const t=h.fromArchive(n,e);return g.add(t)},builder_setIntent(n,e){g.get(n).setIntent(e)},builder_addAction(n,e){g.get(n).addAction(e)},builder_setRemoteUrl(n,e){g.get(n).setRemoteUrl(e)},builder_setNoEmbed(n,e){g.get(n).setNoEmbed(e)},builder_setThumbnailFromBlob(n,e,t){g.get(n).setThumbnailFromBlob(e,t)},builder_addIngredient(n,e){g.get(n).addIngredient(e)},builder_addIngredientFromBlob(n,e,t,r){g.get(n).addIngredientFromBlob(e,t,r)},builder_addResourceFromBlob(n,e,t){g.get(n).addResourceFromBlob(e,t)},builder_getDefinition(n){return g.get(n).getDefinition()},builder_toArchive(n){const t=g.get(n).toArchive();return F(t,t.buffer)},async builder_sign(n,e,t,r,_){const i=await g.get(n).sign({reserveSize:t.reserveSize,alg:t.alg,sign:async s=>await W.sign(e,F(s,s.buffer),t.reserveSize)},r,_);return F(i,i.buffer)},async builder_signAndGetManifestBytes(n,e,t,r,_){const c=g.get(n),{manifest:i,asset:s}=await c.signAndGetManifestBytes({reserveSize:t.reserveSize,alg:t.alg,sign:async b=>await W.sign(e,F(b,b.buffer),t.reserveSize)},r,_);return F({manifest:i,asset:s},[i.buffer,s.buffer])},builder_free(n){g.get(n).free(),g.remove(n)}})})();\n', _u = typeof self < "u" && self.Blob && new Blob([Up], { type: "text/javascript;charset=utf-8" });
function Fw(n) {
  let r;
  try {
    if (r = _u && (self.URL || self.webkitURL).createObjectURL(_u), !r) throw "";
    const i = new Worker(r, {
      name: n == null ? void 0 : n.name
    });
    return i.addEventListener("error", () => {
      (self.URL || self.webkitURL).revokeObjectURL(r);
    }), i;
  } catch {
    return new Worker(
      "data:text/javascript;charset=utf-8," + encodeURIComponent(Up),
      {
        name: n == null ? void 0 : n.name
      }
    );
  } finally {
    r && (self.URL || self.webkitURL).revokeObjectURL(r);
  }
}
async function Mw(n) {
  const { wasm: r, settingsString: i } = n;
  let o = 0;
  const l = new Fw(), d = Ow(l), p = /* @__PURE__ */ new Map();
  Pw(
    {
      sign: async (v, m, y) => {
        const h = p.get(v);
        if (p.delete(v), !h)
          throw new Error("No signer registered for request");
        const R = await h(m, y);
        return Tw(R, R.buffer);
      }
    },
    l
  );
  function g(v) {
    const m = o++;
    return p.set(m, v), m;
  }
  return await d.initWorker(r, i), {
    tx: d,
    registerSignReceiver: g,
    terminate: () => l.terminate()
  };
}
class yu extends Error {
  constructor(r) {
    super(
      `The provided asset was too large. Size: ${r} bytes. Maximum: ${oc}.`
    ), this.name = "AssetTooLargeError";
  }
}
class bu extends Error {
  constructor(r) {
    super(`Unsupported format: ${r}.`), this.name = "UnsupportedFormatError";
  }
}
const Lw = [
  "jpg",
  "video/mp4",
  "image/heif",
  "video/x-msvideo",
  "pdf",
  "image/png",
  "application/c2pa",
  "video/quicktime",
  "video/avi",
  "image/gif",
  "application/xml",
  "text/xml",
  "application/xhtml+xml",
  "tiff",
  "audio/wave",
  "mp4",
  "image/avif",
  "image/dng",
  "png",
  "dng",
  "image/svg+xml",
  "image/heic",
  "application/mp4",
  "image/x-nikon-nef",
  "video/msvideo",
  "tif",
  "wav",
  "xml",
  "audio/vnd.wave",
  "xhtml",
  "gif",
  "application/x-troff-msvideo",
  "webp",
  "heic",
  "application/pdf",
  "audio/mpeg",
  "application/x-c2pa-manifest-store",
  "jpeg",
  "image/x-adobe-dng",
  "audio/wav",
  "mp3",
  "mov",
  "image/tiff",
  "audio/mp4",
  "application/svg+xml",
  "arw",
  "c2pa",
  "svg",
  "avi",
  "audio/x-wav",
  "m4a",
  "image/x-sony-arw",
  "image/jpeg",
  "avif",
  "image/webp",
  "nef",
  "heif"
];
function mu(n) {
  return Lw.includes(n);
}
const qp = {
  builder: {
    generateC2paArchive: !0
  }
};
async function ni(n) {
  const r = Pt(qp, n), i = [];
  return r.trust && i.push(da(r.trust)), r.cawgTrust && i.push(da(r.cawgTrust)), await Promise.all(i), JSON.stringify(yc(r));
}
async function zw(n) {
  const r = Pt(qp, n), i = [];
  return r.trust && i.push(da(r.trust)), r.cawgTrust && i.push(da(r.cawgTrust)), await Promise.all(i), JSON.stringify(yc(r));
}
function yc(n) {
  return Object.entries(n).reduce(
    (r, [i, o]) => (r[jw(i)] = typeof o == "object" ? yc(o) : o, r),
    {}
  );
}
function jw(n) {
  return n.replace(/[A-Z]/g, (r) => `_${r.toLowerCase()}`);
}
async function da(n) {
  try {
    const r = Object.entries(n).map(async ([i, o]) => {
      if (Array.isArray(o)) {
        const l = o.map(async (p) => {
          const g = await (await fetch(p)).text();
          if (wu(i) && !Cu(g))
            throw new Error(`Error parsing PEM file at: ${p}`);
          return g;
        }), d = (await Promise.all(l)).join("");
        n[i] = d;
      } else if (o && Bw(o)) {
        const l = await (await fetch(o)).text();
        if (wu(i) && !Cu(l))
          throw new Error(`Error parsing PEM file at: ${o}`);
        n[i] = l;
      } else
        return o;
    });
    await Promise.all(r);
  } catch (r) {
    throw new Error("Failed to resolve trust settings.", { cause: r });
  }
}
const wu = (n) => ["userAnchors", "trustAnchors"].includes(n), Cu = (n) => n.includes("-----BEGIN CERTIFICATE-----"), Bw = (n) => n.startsWith("http"), oc = 10 ** 9;
function Dw(n) {
  const { tx: r } = n, i = new FinalizationRegistry(async (o) => {
    await r.reader_free(o);
  });
  return {
    async fromBlob(o, l, d) {
      if (!mu(o))
        throw new bu(o);
      if (l.size > oc)
        throw new yu(l.size);
      try {
        const p = d ? await ni(d) : void 0, g = await r.reader_fromBlob(o, l, p), v = Ru(n, g, () => {
          i.unregister(v);
        });
        return i.register(v, g, v), v;
      } catch (p) {
        return xu(p);
      }
    },
    async fromBlobFragment(o, l, d, p) {
      if (!mu(o))
        throw new bu(o);
      if (l.size > oc)
        throw new yu(l.size);
      try {
        const g = p ? await ni(p) : void 0, v = await r.reader_fromBlobFragment(
          o,
          l,
          d,
          g
        ), m = Ru(n, v, () => {
          i.unregister(m);
        });
        return i.register(m, v, m), m;
      } catch (g) {
        return xu(g);
      }
    }
  };
}
function xu(n) {
  if (n instanceof Error && n.message === "C2pa(JumbfNotFound)")
    return null;
  throw n;
}
function Ru(n, r, i) {
  const { tx: o } = n;
  return {
    async activeLabel() {
      return await o.reader_activeLabel(r);
    },
    async manifestStore() {
      return await o.reader_manifestStore(r);
    },
    async activeManifest() {
      return await o.reader_activeManifest(r);
    },
    async json() {
      const l = await o.reader_json(r);
      return JSON.parse(l);
    },
    async resourceToBytes(l) {
      return await o.reader_resourceToBytes(r, l);
    },
    async free() {
      i(), await o.reader_free(r);
    }
  };
}
let bc;
typeof FinalizationRegistry > "u" || new FinalizationRegistry((n) => n.dtor(n.a, n.b));
let Ww = new TextDecoder("utf-8", { ignoreBOM: !0, fatal: !0 });
Ww.decode();
const no = new TextEncoder();
"encodeInto" in no || (no.encodeInto = function(n, r) {
  const i = no.encode(n);
  return r.set(i), {
    read: n.length,
    written: i.length
  };
});
typeof FinalizationRegistry > "u" || new FinalizationRegistry((n) => bc.__wbg_wasmbuilder_free(n >>> 0, 1));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((n) => bc.__wbg_wasmreader_free(n >>> 0, 1));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((n) => bc.__wbg_wasmsigner_free(n >>> 0, 1));
const Nw = "sha512-emM3xZBux5bBdEv6EFS+y5SmKnxnEVbNgsjbsOLnC/YYm55pviVrgdOxU8iQUisOISQvXrTj7H8vvsgYVlpeLg==";
async function ku(n) {
  const { alg: r } = n;
  return {
    reserveSize: await n.reserveSize(),
    alg: r
  };
}
function Uw(n) {
  const { tx: r } = n, i = new FinalizationRegistry((o) => {
    r.builder_free(o);
  });
  return {
    async new(o) {
      const l = o ? await ni(o) : void 0, d = await r.builder_new(l), p = ro(n, d, () => {
        i.unregister(p);
      });
      return i.register(p, d, p), p;
    },
    async fromDefinition(o, l) {
      const d = JSON.stringify(o), p = l ? await ni(l) : void 0, g = await r.builder_fromJson(d, p), v = ro(n, g, () => {
        i.unregister(v);
      });
      return i.register(v, g, v), v;
    },
    async fromArchive(o, l) {
      const d = l ? await ni(l) : void 0, p = await r.builder_fromArchive(o, d), g = ro(n, p, () => {
        i.unregister(g);
      });
      return i.register(g, p, g), g;
    }
  };
}
function ro(n, r, i) {
  const { tx: o } = n;
  return {
    async setIntent(l) {
      await o.builder_setIntent(r, l);
    },
    async addAction(l) {
      await o.builder_addAction(r, l);
    },
    async setRemoteUrl(l) {
      await o.builder_setRemoteUrl(r, l);
    },
    async setNoEmbed(l) {
      await o.builder_setNoEmbed(r, l);
    },
    async setThumbnailFromBlob(l, d) {
      await o.builder_setThumbnailFromBlob(r, l, d);
    },
    async addIngredient(l) {
      const d = JSON.stringify(l);
      await o.builder_addIngredient(r, d);
    },
    async addIngredientFromBlob(l, d, p) {
      const g = JSON.stringify(l);
      await o.builder_addIngredientFromBlob(r, g, d, p);
    },
    async addResourceFromBlob(l, d) {
      await o.builder_addResourceFromBlob(r, l, d);
    },
    async getDefinition() {
      return await o.builder_getDefinition(r);
    },
    async toArchive() {
      return await o.builder_toArchive(r);
    },
    async sign(l, d, p) {
      const g = await ku(l), v = n.registerSignReceiver(l.sign);
      return await o.builder_sign(
        r,
        v,
        g,
        d,
        p
      );
    },
    async signAndGetManifestBytes(l, d, p) {
      const g = await ku(l), v = n.registerSignReceiver(l.sign);
      return await o.builder_signAndGetManifestBytes(
        r,
        v,
        g,
        d,
        p
      );
    },
    async free() {
      i(), await o.builder_free(r);
    }
  };
}
async function qw(n) {
  const { wasmSrc: r, settings: i } = n, o = typeof r == "string" ? await Gw(r) : r, l = i ? await zw(i) : void 0, d = await Mw({ wasm: o, settingsString: l });
  return {
    reader: Dw(d),
    builder: Uw(d),
    dispose: d.terminate
  };
}
async function Gw(n) {
  const r = await fetch(n, { integrity: Nw });
  return await WebAssembly.compileStreaming(r);
}
/*!*************************************************************************
 * Copyright 2021 Adobe
 * All Rights Reserved.
 *
 * NOTICE: Adobe permits you to use, modify, and distribute this file in
 * accordance with the terms of the Adobe license agreement accompanying
 * it. 
 **************************************************************************/
var cn = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, cc = { exports: {} }, io, Eu;
function Hw() {
  if (Eu) return io;
  Eu = 1;
  var n = 1e3, r = n * 60, i = r * 60, o = i * 24, l = o * 7, d = o * 365.25;
  io = function(y, h) {
    h = h || {};
    var R = typeof y;
    if (R === "string" && y.length > 0)
      return p(y);
    if (R === "number" && isFinite(y))
      return h.long ? v(y) : g(y);
    throw new Error(
      "val is not a non-empty string or a valid number. val=" + JSON.stringify(y)
    );
  };
  function p(y) {
    if (y = String(y), !(y.length > 100)) {
      var h = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
        y
      );
      if (h) {
        var R = parseFloat(h[1]), P = (h[2] || "ms").toLowerCase();
        switch (P) {
          case "years":
          case "year":
          case "yrs":
          case "yr":
          case "y":
            return R * d;
          case "weeks":
          case "week":
          case "w":
            return R * l;
          case "days":
          case "day":
          case "d":
            return R * o;
          case "hours":
          case "hour":
          case "hrs":
          case "hr":
          case "h":
            return R * i;
          case "minutes":
          case "minute":
          case "mins":
          case "min":
          case "m":
            return R * r;
          case "seconds":
          case "second":
          case "secs":
          case "sec":
          case "s":
            return R * n;
          case "milliseconds":
          case "millisecond":
          case "msecs":
          case "msec":
          case "ms":
            return R;
          default:
            return;
        }
      }
    }
  }
  function g(y) {
    var h = Math.abs(y);
    return h >= o ? Math.round(y / o) + "d" : h >= i ? Math.round(y / i) + "h" : h >= r ? Math.round(y / r) + "m" : h >= n ? Math.round(y / n) + "s" : y + "ms";
  }
  function v(y) {
    var h = Math.abs(y);
    return h >= o ? m(y, h, o, "day") : h >= i ? m(y, h, i, "hour") : h >= r ? m(y, h, r, "minute") : h >= n ? m(y, h, n, "second") : y + " ms";
  }
  function m(y, h, R, P) {
    var $ = h >= R * 1.5;
    return Math.round(y / R) + " " + P + ($ ? "s" : "");
  }
  return io;
}
function Kw(n) {
  i.debug = i, i.default = i, i.coerce = v, i.disable = d, i.enable = l, i.enabled = p, i.humanize = Hw(), i.destroy = m, Object.keys(n).forEach((y) => {
    i[y] = n[y];
  }), i.names = [], i.skips = [], i.formatters = {};
  function r(y) {
    let h = 0;
    for (let R = 0; R < y.length; R++)
      h = (h << 5) - h + y.charCodeAt(R), h |= 0;
    return i.colors[Math.abs(h) % i.colors.length];
  }
  i.selectColor = r;
  function i(y) {
    let h, R = null, P, $;
    function M(...O) {
      if (!M.enabled)
        return;
      const F = M, L = Number(/* @__PURE__ */ new Date()), J = L - (h || L);
      F.diff = J, F.prev = h, F.curr = L, h = L, O[0] = i.coerce(O[0]), typeof O[0] != "string" && O.unshift("%O");
      let ne = 0;
      O[0] = O[0].replace(/%([a-zA-Z%])/g, (Ae, ve) => {
        if (Ae === "%%")
          return "%";
        ne++;
        const ce = i.formatters[ve];
        if (typeof ce == "function") {
          const we = O[ne];
          Ae = ce.call(F, we), O.splice(ne, 1), ne--;
        }
        return Ae;
      }), i.formatArgs.call(F, O), (F.log || i.log).apply(F, O);
    }
    return M.namespace = y, M.useColors = i.useColors(), M.color = i.selectColor(y), M.extend = o, M.destroy = i.destroy, Object.defineProperty(M, "enabled", {
      enumerable: !0,
      configurable: !1,
      get: () => R !== null ? R : (P !== i.namespaces && (P = i.namespaces, $ = i.enabled(y)), $),
      set: (O) => {
        R = O;
      }
    }), typeof i.init == "function" && i.init(M), M;
  }
  function o(y, h) {
    const R = i(this.namespace + (typeof h > "u" ? ":" : h) + y);
    return R.log = this.log, R;
  }
  function l(y) {
    i.save(y), i.namespaces = y, i.names = [], i.skips = [];
    let h;
    const R = (typeof y == "string" ? y : "").split(/[\s,]+/), P = R.length;
    for (h = 0; h < P; h++)
      R[h] && (y = R[h].replace(/\*/g, ".*?"), y[0] === "-" ? i.skips.push(new RegExp("^" + y.slice(1) + "$")) : i.names.push(new RegExp("^" + y + "$")));
  }
  function d() {
    const y = [
      ...i.names.map(g),
      ...i.skips.map(g).map((h) => "-" + h)
    ].join(",");
    return i.enable(""), y;
  }
  function p(y) {
    if (y[y.length - 1] === "*")
      return !0;
    let h, R;
    for (h = 0, R = i.skips.length; h < R; h++)
      if (i.skips[h].test(y))
        return !1;
    for (h = 0, R = i.names.length; h < R; h++)
      if (i.names[h].test(y))
        return !0;
    return !1;
  }
  function g(y) {
    return y.toString().substring(2, y.toString().length - 2).replace(/\.\*\?$/, "*");
  }
  function v(y) {
    return y instanceof Error ? y.stack || y.message : y;
  }
  function m() {
    console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
  }
  return i.enable(i.load()), i;
}
var Yw = Kw;
(function(n, r) {
  r.formatArgs = o, r.save = l, r.load = d, r.useColors = i, r.storage = p(), r.destroy = /* @__PURE__ */ (() => {
    let v = !1;
    return () => {
      v || (v = !0, console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."));
    };
  })(), r.colors = [
    "#0000CC",
    "#0000FF",
    "#0033CC",
    "#0033FF",
    "#0066CC",
    "#0066FF",
    "#0099CC",
    "#0099FF",
    "#00CC00",
    "#00CC33",
    "#00CC66",
    "#00CC99",
    "#00CCCC",
    "#00CCFF",
    "#3300CC",
    "#3300FF",
    "#3333CC",
    "#3333FF",
    "#3366CC",
    "#3366FF",
    "#3399CC",
    "#3399FF",
    "#33CC00",
    "#33CC33",
    "#33CC66",
    "#33CC99",
    "#33CCCC",
    "#33CCFF",
    "#6600CC",
    "#6600FF",
    "#6633CC",
    "#6633FF",
    "#66CC00",
    "#66CC33",
    "#9900CC",
    "#9900FF",
    "#9933CC",
    "#9933FF",
    "#99CC00",
    "#99CC33",
    "#CC0000",
    "#CC0033",
    "#CC0066",
    "#CC0099",
    "#CC00CC",
    "#CC00FF",
    "#CC3300",
    "#CC3333",
    "#CC3366",
    "#CC3399",
    "#CC33CC",
    "#CC33FF",
    "#CC6600",
    "#CC6633",
    "#CC9900",
    "#CC9933",
    "#CCCC00",
    "#CCCC33",
    "#FF0000",
    "#FF0033",
    "#FF0066",
    "#FF0099",
    "#FF00CC",
    "#FF00FF",
    "#FF3300",
    "#FF3333",
    "#FF3366",
    "#FF3399",
    "#FF33CC",
    "#FF33FF",
    "#FF6600",
    "#FF6633",
    "#FF9900",
    "#FF9933",
    "#FFCC00",
    "#FFCC33"
  ];
  function i() {
    return typeof window < "u" && window.process && (window.process.type === "renderer" || window.process.__nwjs) ? !0 : typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/) ? !1 : typeof document < "u" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // Is firebug? http://stackoverflow.com/a/398120/376773
    typeof window < "u" && window.console && (window.console.firebug || window.console.exception && window.console.table) || // Is firefox >= v31?
    // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
    typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || // Double check webkit in userAgent just in case we are in a worker
    typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
  }
  function o(v) {
    if (v[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + v[0] + (this.useColors ? "%c " : " ") + "+" + n.exports.humanize(this.diff), !this.useColors)
      return;
    const m = "color: " + this.color;
    v.splice(1, 0, m, "color: inherit");
    let y = 0, h = 0;
    v[0].replace(/%[a-zA-Z%]/g, (R) => {
      R !== "%%" && (y++, R === "%c" && (h = y));
    }), v.splice(h, 0, m);
  }
  r.log = console.debug || console.log || (() => {
  });
  function l(v) {
    try {
      v ? r.storage.setItem("debug", v) : r.storage.removeItem("debug");
    } catch {
    }
  }
  function d() {
    let v;
    try {
      v = r.storage.getItem("debug");
    } catch {
    }
    return !v && typeof process < "u" && "env" in process && (v = process.env.DEBUG), v;
  }
  function p() {
    try {
      return localStorage;
    } catch {
    }
  }
  n.exports = Yw(r);
  const { formatters: g } = n.exports;
  g.j = function(v) {
    try {
      return JSON.stringify(v);
    } catch (m) {
      return "[UnexpectedJSONParseError]: " + m.message;
    }
  };
})(cc, cc.exports);
var ln = cc.exports, Iu = { exports: {} };
/**
 * @license
 * Lodash <https://lodash.com/>
 * Copyright OpenJS Foundation and other contributors <https://openjsf.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */
(function(n, r) {
  (function() {
    var i, o = "4.17.21", l = 200, d = "Unsupported core-js use. Try https://npms.io/search?q=ponyfill.", p = "Expected a function", g = "Invalid `variable` option passed into `_.template`", v = "__lodash_hash_undefined__", m = 500, y = "__lodash_placeholder__", h = 1, R = 2, P = 4, $ = 1, M = 2, O = 1, F = 2, L = 4, J = 8, ne = 16, ye = 32, Ae = 64, ve = 128, ce = 256, we = 512, Se = 30, Ne = "...", V = 800, ae = 16, Ie = 1, He = 2, Lt = 3, Ue = 1 / 0, Qe = 9007199254740991, dn = 17976931348623157e292, Yt = NaN, et = 4294967295, xn = et - 1, qe = et >>> 1, Vt = [
      ["ary", ve],
      ["bind", O],
      ["bindKey", F],
      ["curry", J],
      ["curryRight", ne],
      ["flip", we],
      ["partial", ye],
      ["partialRight", Ae],
      ["rearg", ce]
    ], N = "[object Arguments]", z = "[object Array]", D = "[object AsyncFunction]", G = "[object Boolean]", X = "[object Date]", Oe = "[object DOMException]", Ke = "[object Error]", ze = "[object Function]", it = "[object GeneratorFunction]", tt = "[object Map]", Ct = "[object Number]", Rn = "[object Null]", xt = "[object Object]", wr = "[object Promise]", Un = "[object Proxy]", kn = "[object RegExp]", gt = "[object Set]", Zt = "[object String]", qn = "[object Symbol]", La = "[object Undefined]", un = "[object WeakMap]", vi = "[object WeakSet]", fn = "[object ArrayBuffer]", pn = "[object DataView]", Gn = "[object Float32Array]", Hn = "[object Float64Array]", Cr = "[object Int8Array]", xr = "[object Int16Array]", Rr = "[object Int32Array]", kr = "[object Uint8Array]", Er = "[object Uint8ClampedArray]", Ir = "[object Uint16Array]", $r = "[object Uint32Array]", Tr = /\b__p \+= '';/g, gi = /\b(__p \+=) '' \+/g, vn = /(__e\(.*?\)|\b__t\)) \+\n'';/g, Kn = /&(?:amp|lt|gt|quot|#39);/g, Yn = /[&<>"']/g, Ai = RegExp(Kn.source), za = RegExp(Yn.source), hi = /<%-([\s\S]+?)%>/g, ja = /<%([\s\S]+?)%>/g, Sr = /<%=([\s\S]+?)%>/g, _i = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, Ba = /^\w*$/, Da = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, Vn = /[\\^$.*+?()[\]{}|]/g, yi = RegExp(Vn.source), Or = /^\s+/, Wa = /\s/, Na = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/, Ua = /\{\n\/\* \[wrapped with (.+)\] \*/, _ = /,? & /, S = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g, B = /[()=,{}\[\]\/\s]/, Z = /\\(\\)?/g, pe = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g, he = /\w*$/, de = /^[-+]0x[0-9a-f]+$/i, oe = /^0b[01]+$/i, Ye = /^\[object .+?Constructor\]$/, $e = /^0o[0-7]+$/i, Pe = /^(?:0|[1-9]\d*)$/, lt = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g, zt = /($^)/, Jt = /['\n\r\u2028\u2029\\]/g, je = "\\ud800-\\udfff", Pr = "\\u0300-\\u036f", qa = "\\ufe20-\\ufe2f", Ga = "\\u20d0-\\u20ff", Gc = Pr + qa + Ga, Hc = "\\u2700-\\u27bf", Kc = "a-z\\xdf-\\xf6\\xf8-\\xff", Rg = "\\xac\\xb1\\xd7\\xf7", kg = "\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf", Eg = "\\u2000-\\u206f", Ig = " \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000", Yc = "A-Z\\xc0-\\xd6\\xd8-\\xde", Vc = "\\ufe0e\\ufe0f", Zc = Rg + kg + Eg + Ig, Ha = "['’]", $g = "[" + je + "]", Jc = "[" + Zc + "]", bi = "[" + Gc + "]", Xc = "\\d+", Tg = "[" + Hc + "]", Qc = "[" + Kc + "]", el = "[^" + je + Zc + Xc + Hc + Kc + Yc + "]", Ka = "\\ud83c[\\udffb-\\udfff]", Sg = "(?:" + bi + "|" + Ka + ")", tl = "[^" + je + "]", Ya = "(?:\\ud83c[\\udde6-\\uddff]){2}", Va = "[\\ud800-\\udbff][\\udc00-\\udfff]", Zn = "[" + Yc + "]", nl = "\\u200d", rl = "(?:" + Qc + "|" + el + ")", Og = "(?:" + Zn + "|" + el + ")", il = "(?:" + Ha + "(?:d|ll|m|re|s|t|ve))?", al = "(?:" + Ha + "(?:D|LL|M|RE|S|T|VE))?", sl = Sg + "?", ol = "[" + Vc + "]?", Pg = "(?:" + nl + "(?:" + [tl, Ya, Va].join("|") + ")" + ol + sl + ")*", Fg = "\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])", Mg = "\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])", cl = ol + sl + Pg, Lg = "(?:" + [Tg, Ya, Va].join("|") + ")" + cl, zg = "(?:" + [tl + bi + "?", bi, Ya, Va, $g].join("|") + ")", jg = RegExp(Ha, "g"), Bg = RegExp(bi, "g"), Za = RegExp(Ka + "(?=" + Ka + ")|" + zg + cl, "g"), Dg = RegExp([
      Zn + "?" + Qc + "+" + il + "(?=" + [Jc, Zn, "$"].join("|") + ")",
      Og + "+" + al + "(?=" + [Jc, Zn + rl, "$"].join("|") + ")",
      Zn + "?" + rl + "+" + il,
      Zn + "+" + al,
      Mg,
      Fg,
      Xc,
      Lg
    ].join("|"), "g"), Wg = RegExp("[" + nl + je + Gc + Vc + "]"), Ng = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/, Ug = [
      "Array",
      "Buffer",
      "DataView",
      "Date",
      "Error",
      "Float32Array",
      "Float64Array",
      "Function",
      "Int8Array",
      "Int16Array",
      "Int32Array",
      "Map",
      "Math",
      "Object",
      "Promise",
      "RegExp",
      "Set",
      "String",
      "Symbol",
      "TypeError",
      "Uint8Array",
      "Uint8ClampedArray",
      "Uint16Array",
      "Uint32Array",
      "WeakMap",
      "_",
      "clearTimeout",
      "isFinite",
      "parseInt",
      "setTimeout"
    ], qg = -1, Re = {};
    Re[Gn] = Re[Hn] = Re[Cr] = Re[xr] = Re[Rr] = Re[kr] = Re[Er] = Re[Ir] = Re[$r] = !0, Re[N] = Re[z] = Re[fn] = Re[G] = Re[pn] = Re[X] = Re[Ke] = Re[ze] = Re[tt] = Re[Ct] = Re[xt] = Re[kn] = Re[gt] = Re[Zt] = Re[un] = !1;
    var Ce = {};
    Ce[N] = Ce[z] = Ce[fn] = Ce[pn] = Ce[G] = Ce[X] = Ce[Gn] = Ce[Hn] = Ce[Cr] = Ce[xr] = Ce[Rr] = Ce[tt] = Ce[Ct] = Ce[xt] = Ce[kn] = Ce[gt] = Ce[Zt] = Ce[qn] = Ce[kr] = Ce[Er] = Ce[Ir] = Ce[$r] = !0, Ce[Ke] = Ce[ze] = Ce[un] = !1;
    var Gg = {
      // Latin-1 Supplement block.
      À: "A",
      Á: "A",
      Â: "A",
      Ã: "A",
      Ä: "A",
      Å: "A",
      à: "a",
      á: "a",
      â: "a",
      ã: "a",
      ä: "a",
      å: "a",
      Ç: "C",
      ç: "c",
      Ð: "D",
      ð: "d",
      È: "E",
      É: "E",
      Ê: "E",
      Ë: "E",
      è: "e",
      é: "e",
      ê: "e",
      ë: "e",
      Ì: "I",
      Í: "I",
      Î: "I",
      Ï: "I",
      ì: "i",
      í: "i",
      î: "i",
      ï: "i",
      Ñ: "N",
      ñ: "n",
      Ò: "O",
      Ó: "O",
      Ô: "O",
      Õ: "O",
      Ö: "O",
      Ø: "O",
      ò: "o",
      ó: "o",
      ô: "o",
      õ: "o",
      ö: "o",
      ø: "o",
      Ù: "U",
      Ú: "U",
      Û: "U",
      Ü: "U",
      ù: "u",
      ú: "u",
      û: "u",
      ü: "u",
      Ý: "Y",
      ý: "y",
      ÿ: "y",
      Æ: "Ae",
      æ: "ae",
      Þ: "Th",
      þ: "th",
      ß: "ss",
      // Latin Extended-A block.
      Ā: "A",
      Ă: "A",
      Ą: "A",
      ā: "a",
      ă: "a",
      ą: "a",
      Ć: "C",
      Ĉ: "C",
      Ċ: "C",
      Č: "C",
      ć: "c",
      ĉ: "c",
      ċ: "c",
      č: "c",
      Ď: "D",
      Đ: "D",
      ď: "d",
      đ: "d",
      Ē: "E",
      Ĕ: "E",
      Ė: "E",
      Ę: "E",
      Ě: "E",
      ē: "e",
      ĕ: "e",
      ė: "e",
      ę: "e",
      ě: "e",
      Ĝ: "G",
      Ğ: "G",
      Ġ: "G",
      Ģ: "G",
      ĝ: "g",
      ğ: "g",
      ġ: "g",
      ģ: "g",
      Ĥ: "H",
      Ħ: "H",
      ĥ: "h",
      ħ: "h",
      Ĩ: "I",
      Ī: "I",
      Ĭ: "I",
      Į: "I",
      İ: "I",
      ĩ: "i",
      ī: "i",
      ĭ: "i",
      į: "i",
      ı: "i",
      Ĵ: "J",
      ĵ: "j",
      Ķ: "K",
      ķ: "k",
      ĸ: "k",
      Ĺ: "L",
      Ļ: "L",
      Ľ: "L",
      Ŀ: "L",
      Ł: "L",
      ĺ: "l",
      ļ: "l",
      ľ: "l",
      ŀ: "l",
      ł: "l",
      Ń: "N",
      Ņ: "N",
      Ň: "N",
      Ŋ: "N",
      ń: "n",
      ņ: "n",
      ň: "n",
      ŋ: "n",
      Ō: "O",
      Ŏ: "O",
      Ő: "O",
      ō: "o",
      ŏ: "o",
      ő: "o",
      Ŕ: "R",
      Ŗ: "R",
      Ř: "R",
      ŕ: "r",
      ŗ: "r",
      ř: "r",
      Ś: "S",
      Ŝ: "S",
      Ş: "S",
      Š: "S",
      ś: "s",
      ŝ: "s",
      ş: "s",
      š: "s",
      Ţ: "T",
      Ť: "T",
      Ŧ: "T",
      ţ: "t",
      ť: "t",
      ŧ: "t",
      Ũ: "U",
      Ū: "U",
      Ŭ: "U",
      Ů: "U",
      Ű: "U",
      Ų: "U",
      ũ: "u",
      ū: "u",
      ŭ: "u",
      ů: "u",
      ű: "u",
      ų: "u",
      Ŵ: "W",
      ŵ: "w",
      Ŷ: "Y",
      ŷ: "y",
      Ÿ: "Y",
      Ź: "Z",
      Ż: "Z",
      Ž: "Z",
      ź: "z",
      ż: "z",
      ž: "z",
      Ĳ: "IJ",
      ĳ: "ij",
      Œ: "Oe",
      œ: "oe",
      ŉ: "'n",
      ſ: "s"
    }, Hg = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    }, Kg = {
      "&amp;": "&",
      "&lt;": "<",
      "&gt;": ">",
      "&quot;": '"',
      "&#39;": "'"
    }, Yg = {
      "\\": "\\",
      "'": "'",
      "\n": "n",
      "\r": "r",
      "\u2028": "u2028",
      "\u2029": "u2029"
    }, Vg = parseFloat, Zg = parseInt, ll = typeof cn == "object" && cn && cn.Object === Object && cn, Jg = typeof self == "object" && self && self.Object === Object && self, Ve = ll || Jg || Function("return this")(), Ja = r && !r.nodeType && r, En = Ja && !0 && n && !n.nodeType && n, dl = En && En.exports === Ja, Xa = dl && ll.process, Rt = (function() {
      try {
        var w = En && En.require && En.require("util").types;
        return w || Xa && Xa.binding && Xa.binding("util");
      } catch {
      }
    })(), ul = Rt && Rt.isArrayBuffer, fl = Rt && Rt.isDate, pl = Rt && Rt.isMap, vl = Rt && Rt.isRegExp, gl = Rt && Rt.isSet, Al = Rt && Rt.isTypedArray;
    function At(w, k, x) {
      switch (x.length) {
        case 0:
          return w.call(k);
        case 1:
          return w.call(k, x[0]);
        case 2:
          return w.call(k, x[0], x[1]);
        case 3:
          return w.call(k, x[0], x[1], x[2]);
      }
      return w.apply(k, x);
    }
    function Xg(w, k, x, W) {
      for (var Q = -1, ge = w == null ? 0 : w.length; ++Q < ge; ) {
        var Be = w[Q];
        k(W, Be, x(Be), w);
      }
      return W;
    }
    function kt(w, k) {
      for (var x = -1, W = w == null ? 0 : w.length; ++x < W && k(w[x], x, w) !== !1; )
        ;
      return w;
    }
    function Qg(w, k) {
      for (var x = w == null ? 0 : w.length; x-- && k(w[x], x, w) !== !1; )
        ;
      return w;
    }
    function hl(w, k) {
      for (var x = -1, W = w == null ? 0 : w.length; ++x < W; )
        if (!k(w[x], x, w))
          return !1;
      return !0;
    }
    function gn(w, k) {
      for (var x = -1, W = w == null ? 0 : w.length, Q = 0, ge = []; ++x < W; ) {
        var Be = w[x];
        k(Be, x, w) && (ge[Q++] = Be);
      }
      return ge;
    }
    function mi(w, k) {
      var x = w == null ? 0 : w.length;
      return !!x && Jn(w, k, 0) > -1;
    }
    function Qa(w, k, x) {
      for (var W = -1, Q = w == null ? 0 : w.length; ++W < Q; )
        if (x(k, w[W]))
          return !0;
      return !1;
    }
    function Ee(w, k) {
      for (var x = -1, W = w == null ? 0 : w.length, Q = Array(W); ++x < W; )
        Q[x] = k(w[x], x, w);
      return Q;
    }
    function An(w, k) {
      for (var x = -1, W = k.length, Q = w.length; ++x < W; )
        w[Q + x] = k[x];
      return w;
    }
    function es(w, k, x, W) {
      var Q = -1, ge = w == null ? 0 : w.length;
      for (W && ge && (x = w[++Q]); ++Q < ge; )
        x = k(x, w[Q], Q, w);
      return x;
    }
    function eA(w, k, x, W) {
      var Q = w == null ? 0 : w.length;
      for (W && Q && (x = w[--Q]); Q--; )
        x = k(x, w[Q], Q, w);
      return x;
    }
    function ts(w, k) {
      for (var x = -1, W = w == null ? 0 : w.length; ++x < W; )
        if (k(w[x], x, w))
          return !0;
      return !1;
    }
    var tA = ns("length");
    function nA(w) {
      return w.split("");
    }
    function rA(w) {
      return w.match(S) || [];
    }
    function _l(w, k, x) {
      var W;
      return x(w, function(Q, ge, Be) {
        if (k(Q, ge, Be))
          return W = ge, !1;
      }), W;
    }
    function wi(w, k, x, W) {
      for (var Q = w.length, ge = x + (W ? 1 : -1); W ? ge-- : ++ge < Q; )
        if (k(w[ge], ge, w))
          return ge;
      return -1;
    }
    function Jn(w, k, x) {
      return k === k ? gA(w, k, x) : wi(w, yl, x);
    }
    function iA(w, k, x, W) {
      for (var Q = x - 1, ge = w.length; ++Q < ge; )
        if (W(w[Q], k))
          return Q;
      return -1;
    }
    function yl(w) {
      return w !== w;
    }
    function bl(w, k) {
      var x = w == null ? 0 : w.length;
      return x ? is(w, k) / x : Yt;
    }
    function ns(w) {
      return function(k) {
        return k == null ? i : k[w];
      };
    }
    function rs(w) {
      return function(k) {
        return w == null ? i : w[k];
      };
    }
    function ml(w, k, x, W, Q) {
      return Q(w, function(ge, Be, me) {
        x = W ? (W = !1, ge) : k(x, ge, Be, me);
      }), x;
    }
    function aA(w, k) {
      var x = w.length;
      for (w.sort(k); x--; )
        w[x] = w[x].value;
      return w;
    }
    function is(w, k) {
      for (var x, W = -1, Q = w.length; ++W < Q; ) {
        var ge = k(w[W]);
        ge !== i && (x = x === i ? ge : x + ge);
      }
      return x;
    }
    function as(w, k) {
      for (var x = -1, W = Array(w); ++x < w; )
        W[x] = k(x);
      return W;
    }
    function sA(w, k) {
      return Ee(k, function(x) {
        return [x, w[x]];
      });
    }
    function wl(w) {
      return w && w.slice(0, kl(w) + 1).replace(Or, "");
    }
    function ht(w) {
      return function(k) {
        return w(k);
      };
    }
    function ss(w, k) {
      return Ee(k, function(x) {
        return w[x];
      });
    }
    function Fr(w, k) {
      return w.has(k);
    }
    function Cl(w, k) {
      for (var x = -1, W = w.length; ++x < W && Jn(k, w[x], 0) > -1; )
        ;
      return x;
    }
    function xl(w, k) {
      for (var x = w.length; x-- && Jn(k, w[x], 0) > -1; )
        ;
      return x;
    }
    function oA(w, k) {
      for (var x = w.length, W = 0; x--; )
        w[x] === k && ++W;
      return W;
    }
    var cA = rs(Gg), lA = rs(Hg);
    function dA(w) {
      return "\\" + Yg[w];
    }
    function uA(w, k) {
      return w == null ? i : w[k];
    }
    function Xn(w) {
      return Wg.test(w);
    }
    function fA(w) {
      return Ng.test(w);
    }
    function pA(w) {
      for (var k, x = []; !(k = w.next()).done; )
        x.push(k.value);
      return x;
    }
    function os(w) {
      var k = -1, x = Array(w.size);
      return w.forEach(function(W, Q) {
        x[++k] = [Q, W];
      }), x;
    }
    function Rl(w, k) {
      return function(x) {
        return w(k(x));
      };
    }
    function hn(w, k) {
      for (var x = -1, W = w.length, Q = 0, ge = []; ++x < W; ) {
        var Be = w[x];
        (Be === k || Be === y) && (w[x] = y, ge[Q++] = x);
      }
      return ge;
    }
    function Ci(w) {
      var k = -1, x = Array(w.size);
      return w.forEach(function(W) {
        x[++k] = W;
      }), x;
    }
    function vA(w) {
      var k = -1, x = Array(w.size);
      return w.forEach(function(W) {
        x[++k] = [W, W];
      }), x;
    }
    function gA(w, k, x) {
      for (var W = x - 1, Q = w.length; ++W < Q; )
        if (w[W] === k)
          return W;
      return -1;
    }
    function AA(w, k, x) {
      for (var W = x + 1; W--; )
        if (w[W] === k)
          return W;
      return W;
    }
    function Qn(w) {
      return Xn(w) ? _A(w) : tA(w);
    }
    function jt(w) {
      return Xn(w) ? yA(w) : nA(w);
    }
    function kl(w) {
      for (var k = w.length; k-- && Wa.test(w.charAt(k)); )
        ;
      return k;
    }
    var hA = rs(Kg);
    function _A(w) {
      for (var k = Za.lastIndex = 0; Za.test(w); )
        ++k;
      return k;
    }
    function yA(w) {
      return w.match(Za) || [];
    }
    function bA(w) {
      return w.match(Dg) || [];
    }
    var mA = (function w(k) {
      k = k == null ? Ve : er.defaults(Ve.Object(), k, er.pick(Ve, Ug));
      var x = k.Array, W = k.Date, Q = k.Error, ge = k.Function, Be = k.Math, me = k.Object, cs = k.RegExp, wA = k.String, Et = k.TypeError, xi = x.prototype, CA = ge.prototype, tr = me.prototype, Ri = k["__core-js_shared__"], ki = CA.toString, be = tr.hasOwnProperty, xA = 0, El = (function() {
        var e = /[^.]+$/.exec(Ri && Ri.keys && Ri.keys.IE_PROTO || "");
        return e ? "Symbol(src)_1." + e : "";
      })(), Ei = tr.toString, RA = ki.call(me), kA = Ve._, EA = cs(
        "^" + ki.call(be).replace(Vn, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
      ), Ii = dl ? k.Buffer : i, _n = k.Symbol, $i = k.Uint8Array, Il = Ii ? Ii.allocUnsafe : i, Ti = Rl(me.getPrototypeOf, me), $l = me.create, Tl = tr.propertyIsEnumerable, Si = xi.splice, Sl = _n ? _n.isConcatSpreadable : i, Mr = _n ? _n.iterator : i, In = _n ? _n.toStringTag : i, Oi = (function() {
        try {
          var e = Pn(me, "defineProperty");
          return e({}, "", {}), e;
        } catch {
        }
      })(), IA = k.clearTimeout !== Ve.clearTimeout && k.clearTimeout, $A = W && W.now !== Ve.Date.now && W.now, TA = k.setTimeout !== Ve.setTimeout && k.setTimeout, Pi = Be.ceil, Fi = Be.floor, ls = me.getOwnPropertySymbols, SA = Ii ? Ii.isBuffer : i, Ol = k.isFinite, OA = xi.join, PA = Rl(me.keys, me), De = Be.max, nt = Be.min, FA = W.now, MA = k.parseInt, Pl = Be.random, LA = xi.reverse, ds = Pn(k, "DataView"), Lr = Pn(k, "Map"), us = Pn(k, "Promise"), nr = Pn(k, "Set"), zr = Pn(k, "WeakMap"), jr = Pn(me, "create"), Mi = zr && new zr(), rr = {}, zA = Fn(ds), jA = Fn(Lr), BA = Fn(us), DA = Fn(nr), WA = Fn(zr), Li = _n ? _n.prototype : i, Br = Li ? Li.valueOf : i, Fl = Li ? Li.toString : i;
      function u(e) {
        if (Fe(e) && !ee(e) && !(e instanceof ue)) {
          if (e instanceof It)
            return e;
          if (be.call(e, "__wrapped__"))
            return Md(e);
        }
        return new It(e);
      }
      var ir = /* @__PURE__ */ (function() {
        function e() {
        }
        return function(t) {
          if (!Te(t))
            return {};
          if ($l)
            return $l(t);
          e.prototype = t;
          var a = new e();
          return e.prototype = i, a;
        };
      })();
      function zi() {
      }
      function It(e, t) {
        this.__wrapped__ = e, this.__actions__ = [], this.__chain__ = !!t, this.__index__ = 0, this.__values__ = i;
      }
      u.templateSettings = {
        /**
         * Used to detect `data` property values to be HTML-escaped.
         *
         * @memberOf _.templateSettings
         * @type {RegExp}
         */
        escape: hi,
        /**
         * Used to detect code to be evaluated.
         *
         * @memberOf _.templateSettings
         * @type {RegExp}
         */
        evaluate: ja,
        /**
         * Used to detect `data` property values to inject.
         *
         * @memberOf _.templateSettings
         * @type {RegExp}
         */
        interpolate: Sr,
        /**
         * Used to reference the data object in the template text.
         *
         * @memberOf _.templateSettings
         * @type {string}
         */
        variable: "",
        /**
         * Used to import variables into the compiled template.
         *
         * @memberOf _.templateSettings
         * @type {Object}
         */
        imports: {
          /**
           * A reference to the `lodash` function.
           *
           * @memberOf _.templateSettings.imports
           * @type {Function}
           */
          _: u
        }
      }, u.prototype = zi.prototype, u.prototype.constructor = u, It.prototype = ir(zi.prototype), It.prototype.constructor = It;
      function ue(e) {
        this.__wrapped__ = e, this.__actions__ = [], this.__dir__ = 1, this.__filtered__ = !1, this.__iteratees__ = [], this.__takeCount__ = et, this.__views__ = [];
      }
      function NA() {
        var e = new ue(this.__wrapped__);
        return e.__actions__ = dt(this.__actions__), e.__dir__ = this.__dir__, e.__filtered__ = this.__filtered__, e.__iteratees__ = dt(this.__iteratees__), e.__takeCount__ = this.__takeCount__, e.__views__ = dt(this.__views__), e;
      }
      function UA() {
        if (this.__filtered__) {
          var e = new ue(this);
          e.__dir__ = -1, e.__filtered__ = !0;
        } else
          e = this.clone(), e.__dir__ *= -1;
        return e;
      }
      function qA() {
        var e = this.__wrapped__.value(), t = this.__dir__, a = ee(e), s = t < 0, c = a ? e.length : 0, f = n_(0, c, this.__views__), A = f.start, b = f.end, C = b - A, E = s ? b : A - 1, I = this.__iteratees__, T = I.length, j = 0, q = nt(C, this.__takeCount__);
        if (!a || !s && c == C && q == C)
          return id(e, this.__actions__);
        var K = [];
        e:
          for (; C-- && j < q; ) {
            E += t;
            for (var ie = -1, Y = e[E]; ++ie < T; ) {
              var le = I[ie], fe = le.iteratee, bt = le.type, ot = fe(Y);
              if (bt == He)
                Y = ot;
              else if (!ot) {
                if (bt == Ie)
                  continue e;
                break e;
              }
            }
            K[j++] = Y;
          }
        return K;
      }
      ue.prototype = ir(zi.prototype), ue.prototype.constructor = ue;
      function $n(e) {
        var t = -1, a = e == null ? 0 : e.length;
        for (this.clear(); ++t < a; ) {
          var s = e[t];
          this.set(s[0], s[1]);
        }
      }
      function GA() {
        this.__data__ = jr ? jr(null) : {}, this.size = 0;
      }
      function HA(e) {
        var t = this.has(e) && delete this.__data__[e];
        return this.size -= t ? 1 : 0, t;
      }
      function KA(e) {
        var t = this.__data__;
        if (jr) {
          var a = t[e];
          return a === v ? i : a;
        }
        return be.call(t, e) ? t[e] : i;
      }
      function YA(e) {
        var t = this.__data__;
        return jr ? t[e] !== i : be.call(t, e);
      }
      function VA(e, t) {
        var a = this.__data__;
        return this.size += this.has(e) ? 0 : 1, a[e] = jr && t === i ? v : t, this;
      }
      $n.prototype.clear = GA, $n.prototype.delete = HA, $n.prototype.get = KA, $n.prototype.has = YA, $n.prototype.set = VA;
      function Xt(e) {
        var t = -1, a = e == null ? 0 : e.length;
        for (this.clear(); ++t < a; ) {
          var s = e[t];
          this.set(s[0], s[1]);
        }
      }
      function ZA() {
        this.__data__ = [], this.size = 0;
      }
      function JA(e) {
        var t = this.__data__, a = ji(t, e);
        if (a < 0)
          return !1;
        var s = t.length - 1;
        return a == s ? t.pop() : Si.call(t, a, 1), --this.size, !0;
      }
      function XA(e) {
        var t = this.__data__, a = ji(t, e);
        return a < 0 ? i : t[a][1];
      }
      function QA(e) {
        return ji(this.__data__, e) > -1;
      }
      function eh(e, t) {
        var a = this.__data__, s = ji(a, e);
        return s < 0 ? (++this.size, a.push([e, t])) : a[s][1] = t, this;
      }
      Xt.prototype.clear = ZA, Xt.prototype.delete = JA, Xt.prototype.get = XA, Xt.prototype.has = QA, Xt.prototype.set = eh;
      function Qt(e) {
        var t = -1, a = e == null ? 0 : e.length;
        for (this.clear(); ++t < a; ) {
          var s = e[t];
          this.set(s[0], s[1]);
        }
      }
      function th() {
        this.size = 0, this.__data__ = {
          hash: new $n(),
          map: new (Lr || Xt)(),
          string: new $n()
        };
      }
      function nh(e) {
        var t = Zi(this, e).delete(e);
        return this.size -= t ? 1 : 0, t;
      }
      function rh(e) {
        return Zi(this, e).get(e);
      }
      function ih(e) {
        return Zi(this, e).has(e);
      }
      function ah(e, t) {
        var a = Zi(this, e), s = a.size;
        return a.set(e, t), this.size += a.size == s ? 0 : 1, this;
      }
      Qt.prototype.clear = th, Qt.prototype.delete = nh, Qt.prototype.get = rh, Qt.prototype.has = ih, Qt.prototype.set = ah;
      function Tn(e) {
        var t = -1, a = e == null ? 0 : e.length;
        for (this.__data__ = new Qt(); ++t < a; )
          this.add(e[t]);
      }
      function sh(e) {
        return this.__data__.set(e, v), this;
      }
      function oh(e) {
        return this.__data__.has(e);
      }
      Tn.prototype.add = Tn.prototype.push = sh, Tn.prototype.has = oh;
      function Bt(e) {
        var t = this.__data__ = new Xt(e);
        this.size = t.size;
      }
      function ch() {
        this.__data__ = new Xt(), this.size = 0;
      }
      function lh(e) {
        var t = this.__data__, a = t.delete(e);
        return this.size = t.size, a;
      }
      function dh(e) {
        return this.__data__.get(e);
      }
      function uh(e) {
        return this.__data__.has(e);
      }
      function fh(e, t) {
        var a = this.__data__;
        if (a instanceof Xt) {
          var s = a.__data__;
          if (!Lr || s.length < l - 1)
            return s.push([e, t]), this.size = ++a.size, this;
          a = this.__data__ = new Qt(s);
        }
        return a.set(e, t), this.size = a.size, this;
      }
      Bt.prototype.clear = ch, Bt.prototype.delete = lh, Bt.prototype.get = dh, Bt.prototype.has = uh, Bt.prototype.set = fh;
      function Ml(e, t) {
        var a = ee(e), s = !a && Mn(e), c = !a && !s && Cn(e), f = !a && !s && !c && cr(e), A = a || s || c || f, b = A ? as(e.length, wA) : [], C = b.length;
        for (var E in e)
          (t || be.call(e, E)) && !(A && // Safari 9 has enumerable `arguments.length` in strict mode.
          (E == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
          c && (E == "offset" || E == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
          f && (E == "buffer" || E == "byteLength" || E == "byteOffset") || // Skip index properties.
          rn(E, C))) && b.push(E);
        return b;
      }
      function Ll(e) {
        var t = e.length;
        return t ? e[ws(0, t - 1)] : i;
      }
      function ph(e, t) {
        return Ji(dt(e), Sn(t, 0, e.length));
      }
      function vh(e) {
        return Ji(dt(e));
      }
      function fs(e, t, a) {
        (a !== i && !Dt(e[t], a) || a === i && !(t in e)) && en(e, t, a);
      }
      function Dr(e, t, a) {
        var s = e[t];
        (!(be.call(e, t) && Dt(s, a)) || a === i && !(t in e)) && en(e, t, a);
      }
      function ji(e, t) {
        for (var a = e.length; a--; )
          if (Dt(e[a][0], t))
            return a;
        return -1;
      }
      function gh(e, t, a, s) {
        return yn(e, function(c, f, A) {
          t(s, c, a(c), A);
        }), s;
      }
      function zl(e, t) {
        return e && qt(t, Ge(t), e);
      }
      function Ah(e, t) {
        return e && qt(t, ft(t), e);
      }
      function en(e, t, a) {
        t == "__proto__" && Oi ? Oi(e, t, {
          configurable: !0,
          enumerable: !0,
          value: a,
          writable: !0
        }) : e[t] = a;
      }
      function ps(e, t) {
        for (var a = -1, s = t.length, c = x(s), f = e == null; ++a < s; )
          c[a] = f ? i : Ks(e, t[a]);
        return c;
      }
      function Sn(e, t, a) {
        return e === e && (a !== i && (e = e <= a ? e : a), t !== i && (e = e >= t ? e : t)), e;
      }
      function $t(e, t, a, s, c, f) {
        var A, b = t & h, C = t & R, E = t & P;
        if (a && (A = c ? a(e, s, c, f) : a(e)), A !== i)
          return A;
        if (!Te(e))
          return e;
        var I = ee(e);
        if (I) {
          if (A = i_(e), !b)
            return dt(e, A);
        } else {
          var T = rt(e), j = T == ze || T == it;
          if (Cn(e))
            return od(e, b);
          if (T == xt || T == N || j && !c) {
            if (A = C || j ? {} : kd(e), !b)
              return C ? Kh(e, Ah(A, e)) : Hh(e, zl(A, e));
          } else {
            if (!Ce[T])
              return c ? e : {};
            A = a_(e, T, b);
          }
        }
        f || (f = new Bt());
        var q = f.get(e);
        if (q)
          return q;
        f.set(e, A), tu(e) ? e.forEach(function(Y) {
          A.add($t(Y, t, a, Y, e, f));
        }) : Qd(e) && e.forEach(function(Y, le) {
          A.set(le, $t(Y, t, a, le, e, f));
        });
        var K = E ? C ? Ps : Os : C ? ft : Ge, ie = I ? i : K(e);
        return kt(ie || e, function(Y, le) {
          ie && (le = Y, Y = e[le]), Dr(A, le, $t(Y, t, a, le, e, f));
        }), A;
      }
      function hh(e) {
        var t = Ge(e);
        return function(a) {
          return jl(a, e, t);
        };
      }
      function jl(e, t, a) {
        var s = a.length;
        if (e == null)
          return !s;
        for (e = me(e); s--; ) {
          var c = a[s], f = t[c], A = e[c];
          if (A === i && !(c in e) || !f(A))
            return !1;
        }
        return !0;
      }
      function Bl(e, t, a) {
        if (typeof e != "function")
          throw new Et(p);
        return Kr(function() {
          e.apply(i, a);
        }, t);
      }
      function Wr(e, t, a, s) {
        var c = -1, f = mi, A = !0, b = e.length, C = [], E = t.length;
        if (!b)
          return C;
        a && (t = Ee(t, ht(a))), s ? (f = Qa, A = !1) : t.length >= l && (f = Fr, A = !1, t = new Tn(t));
        e:
          for (; ++c < b; ) {
            var I = e[c], T = a == null ? I : a(I);
            if (I = s || I !== 0 ? I : 0, A && T === T) {
              for (var j = E; j--; )
                if (t[j] === T)
                  continue e;
              C.push(I);
            } else f(t, T, s) || C.push(I);
          }
        return C;
      }
      var yn = fd(Ut), Dl = fd(gs, !0);
      function _h(e, t) {
        var a = !0;
        return yn(e, function(s, c, f) {
          return a = !!t(s, c, f), a;
        }), a;
      }
      function Bi(e, t, a) {
        for (var s = -1, c = e.length; ++s < c; ) {
          var f = e[s], A = t(f);
          if (A != null && (b === i ? A === A && !yt(A) : a(A, b)))
            var b = A, C = f;
        }
        return C;
      }
      function yh(e, t, a, s) {
        var c = e.length;
        for (a = re(a), a < 0 && (a = -a > c ? 0 : c + a), s = s === i || s > c ? c : re(s), s < 0 && (s += c), s = a > s ? 0 : ru(s); a < s; )
          e[a++] = t;
        return e;
      }
      function Wl(e, t) {
        var a = [];
        return yn(e, function(s, c, f) {
          t(s, c, f) && a.push(s);
        }), a;
      }
      function Ze(e, t, a, s, c) {
        var f = -1, A = e.length;
        for (a || (a = o_), c || (c = []); ++f < A; ) {
          var b = e[f];
          t > 0 && a(b) ? t > 1 ? Ze(b, t - 1, a, s, c) : An(c, b) : s || (c[c.length] = b);
        }
        return c;
      }
      var vs = pd(), Nl = pd(!0);
      function Ut(e, t) {
        return e && vs(e, t, Ge);
      }
      function gs(e, t) {
        return e && Nl(e, t, Ge);
      }
      function Di(e, t) {
        return gn(t, function(a) {
          return an(e[a]);
        });
      }
      function On(e, t) {
        t = mn(t, e);
        for (var a = 0, s = t.length; e != null && a < s; )
          e = e[Gt(t[a++])];
        return a && a == s ? e : i;
      }
      function Ul(e, t, a) {
        var s = t(e);
        return ee(e) ? s : An(s, a(e));
      }
      function at(e) {
        return e == null ? e === i ? La : Rn : In && In in me(e) ? t_(e) : v_(e);
      }
      function As(e, t) {
        return e > t;
      }
      function bh(e, t) {
        return e != null && be.call(e, t);
      }
      function mh(e, t) {
        return e != null && t in me(e);
      }
      function wh(e, t, a) {
        return e >= nt(t, a) && e < De(t, a);
      }
      function hs(e, t, a) {
        for (var s = a ? Qa : mi, c = e[0].length, f = e.length, A = f, b = x(f), C = 1 / 0, E = []; A--; ) {
          var I = e[A];
          A && t && (I = Ee(I, ht(t))), C = nt(I.length, C), b[A] = !a && (t || c >= 120 && I.length >= 120) ? new Tn(A && I) : i;
        }
        I = e[0];
        var T = -1, j = b[0];
        e:
          for (; ++T < c && E.length < C; ) {
            var q = I[T], K = t ? t(q) : q;
            if (q = a || q !== 0 ? q : 0, !(j ? Fr(j, K) : s(E, K, a))) {
              for (A = f; --A; ) {
                var ie = b[A];
                if (!(ie ? Fr(ie, K) : s(e[A], K, a)))
                  continue e;
              }
              j && j.push(K), E.push(q);
            }
          }
        return E;
      }
      function Ch(e, t, a, s) {
        return Ut(e, function(c, f, A) {
          t(s, a(c), f, A);
        }), s;
      }
      function Nr(e, t, a) {
        t = mn(t, e), e = Td(e, t);
        var s = e == null ? e : e[Gt(St(t))];
        return s == null ? i : At(s, e, a);
      }
      function ql(e) {
        return Fe(e) && at(e) == N;
      }
      function xh(e) {
        return Fe(e) && at(e) == fn;
      }
      function Rh(e) {
        return Fe(e) && at(e) == X;
      }
      function Ur(e, t, a, s, c) {
        return e === t ? !0 : e == null || t == null || !Fe(e) && !Fe(t) ? e !== e && t !== t : kh(e, t, a, s, Ur, c);
      }
      function kh(e, t, a, s, c, f) {
        var A = ee(e), b = ee(t), C = A ? z : rt(e), E = b ? z : rt(t);
        C = C == N ? xt : C, E = E == N ? xt : E;
        var I = C == xt, T = E == xt, j = C == E;
        if (j && Cn(e)) {
          if (!Cn(t))
            return !1;
          A = !0, I = !1;
        }
        if (j && !I)
          return f || (f = new Bt()), A || cr(e) ? Cd(e, t, a, s, c, f) : Qh(e, t, C, a, s, c, f);
        if (!(a & $)) {
          var q = I && be.call(e, "__wrapped__"), K = T && be.call(t, "__wrapped__");
          if (q || K) {
            var ie = q ? e.value() : e, Y = K ? t.value() : t;
            return f || (f = new Bt()), c(ie, Y, a, s, f);
          }
        }
        return j ? (f || (f = new Bt()), e_(e, t, a, s, c, f)) : !1;
      }
      function Eh(e) {
        return Fe(e) && rt(e) == tt;
      }
      function _s(e, t, a, s) {
        var c = a.length, f = c, A = !s;
        if (e == null)
          return !f;
        for (e = me(e); c--; ) {
          var b = a[c];
          if (A && b[2] ? b[1] !== e[b[0]] : !(b[0] in e))
            return !1;
        }
        for (; ++c < f; ) {
          b = a[c];
          var C = b[0], E = e[C], I = b[1];
          if (A && b[2]) {
            if (E === i && !(C in e))
              return !1;
          } else {
            var T = new Bt();
            if (s)
              var j = s(E, I, C, e, t, T);
            if (!(j === i ? Ur(I, E, $ | M, s, T) : j))
              return !1;
          }
        }
        return !0;
      }
      function Gl(e) {
        if (!Te(e) || l_(e))
          return !1;
        var t = an(e) ? EA : Ye;
        return t.test(Fn(e));
      }
      function Ih(e) {
        return Fe(e) && at(e) == kn;
      }
      function $h(e) {
        return Fe(e) && rt(e) == gt;
      }
      function Th(e) {
        return Fe(e) && ra(e.length) && !!Re[at(e)];
      }
      function Hl(e) {
        return typeof e == "function" ? e : e == null ? pt : typeof e == "object" ? ee(e) ? Vl(e[0], e[1]) : Yl(e) : vu(e);
      }
      function ys(e) {
        if (!Hr(e))
          return PA(e);
        var t = [];
        for (var a in me(e))
          be.call(e, a) && a != "constructor" && t.push(a);
        return t;
      }
      function Sh(e) {
        if (!Te(e))
          return p_(e);
        var t = Hr(e), a = [];
        for (var s in e)
          s == "constructor" && (t || !be.call(e, s)) || a.push(s);
        return a;
      }
      function bs(e, t) {
        return e < t;
      }
      function Kl(e, t) {
        var a = -1, s = ut(e) ? x(e.length) : [];
        return yn(e, function(c, f, A) {
          s[++a] = t(c, f, A);
        }), s;
      }
      function Yl(e) {
        var t = Ms(e);
        return t.length == 1 && t[0][2] ? Id(t[0][0], t[0][1]) : function(a) {
          return a === e || _s(a, e, t);
        };
      }
      function Vl(e, t) {
        return zs(e) && Ed(t) ? Id(Gt(e), t) : function(a) {
          var s = Ks(a, e);
          return s === i && s === t ? Ys(a, e) : Ur(t, s, $ | M);
        };
      }
      function Wi(e, t, a, s, c) {
        e !== t && vs(t, function(f, A) {
          if (c || (c = new Bt()), Te(f))
            Oh(e, t, A, a, Wi, s, c);
          else {
            var b = s ? s(Bs(e, A), f, A + "", e, t, c) : i;
            b === i && (b = f), fs(e, A, b);
          }
        }, ft);
      }
      function Oh(e, t, a, s, c, f, A) {
        var b = Bs(e, a), C = Bs(t, a), E = A.get(C);
        if (E) {
          fs(e, a, E);
          return;
        }
        var I = f ? f(b, C, a + "", e, t, A) : i, T = I === i;
        if (T) {
          var j = ee(C), q = !j && Cn(C), K = !j && !q && cr(C);
          I = C, j || q || K ? ee(b) ? I = b : Me(b) ? I = dt(b) : q ? (T = !1, I = od(C, !0)) : K ? (T = !1, I = cd(C, !0)) : I = [] : Yr(C) || Mn(C) ? (I = b, Mn(b) ? I = iu(b) : (!Te(b) || an(b)) && (I = kd(C))) : T = !1;
        }
        T && (A.set(C, I), c(I, C, s, f, A), A.delete(C)), fs(e, a, I);
      }
      function Zl(e, t) {
        var a = e.length;
        if (a)
          return t += t < 0 ? a : 0, rn(t, a) ? e[t] : i;
      }
      function Jl(e, t, a) {
        t.length ? t = Ee(t, function(f) {
          return ee(f) ? function(A) {
            return On(A, f.length === 1 ? f[0] : f);
          } : f;
        }) : t = [pt];
        var s = -1;
        t = Ee(t, ht(H()));
        var c = Kl(e, function(f, A, b) {
          var C = Ee(t, function(E) {
            return E(f);
          });
          return { criteria: C, index: ++s, value: f };
        });
        return aA(c, function(f, A) {
          return Gh(f, A, a);
        });
      }
      function Ph(e, t) {
        return Xl(e, t, function(a, s) {
          return Ys(e, s);
        });
      }
      function Xl(e, t, a) {
        for (var s = -1, c = t.length, f = {}; ++s < c; ) {
          var A = t[s], b = On(e, A);
          a(b, A) && qr(f, mn(A, e), b);
        }
        return f;
      }
      function Fh(e) {
        return function(t) {
          return On(t, e);
        };
      }
      function ms(e, t, a, s) {
        var c = s ? iA : Jn, f = -1, A = t.length, b = e;
        for (e === t && (t = dt(t)), a && (b = Ee(e, ht(a))); ++f < A; )
          for (var C = 0, E = t[f], I = a ? a(E) : E; (C = c(b, I, C, s)) > -1; )
            b !== e && Si.call(b, C, 1), Si.call(e, C, 1);
        return e;
      }
      function Ql(e, t) {
        for (var a = e ? t.length : 0, s = a - 1; a--; ) {
          var c = t[a];
          if (a == s || c !== f) {
            var f = c;
            rn(c) ? Si.call(e, c, 1) : Rs(e, c);
          }
        }
        return e;
      }
      function ws(e, t) {
        return e + Fi(Pl() * (t - e + 1));
      }
      function Mh(e, t, a, s) {
        for (var c = -1, f = De(Pi((t - e) / (a || 1)), 0), A = x(f); f--; )
          A[s ? f : ++c] = e, e += a;
        return A;
      }
      function Cs(e, t) {
        var a = "";
        if (!e || t < 1 || t > Qe)
          return a;
        do
          t % 2 && (a += e), t = Fi(t / 2), t && (e += e);
        while (t);
        return a;
      }
      function se(e, t) {
        return Ds($d(e, t, pt), e + "");
      }
      function Lh(e) {
        return Ll(lr(e));
      }
      function zh(e, t) {
        var a = lr(e);
        return Ji(a, Sn(t, 0, a.length));
      }
      function qr(e, t, a, s) {
        if (!Te(e))
          return e;
        t = mn(t, e);
        for (var c = -1, f = t.length, A = f - 1, b = e; b != null && ++c < f; ) {
          var C = Gt(t[c]), E = a;
          if (C === "__proto__" || C === "constructor" || C === "prototype")
            return e;
          if (c != A) {
            var I = b[C];
            E = s ? s(I, C, b) : i, E === i && (E = Te(I) ? I : rn(t[c + 1]) ? [] : {});
          }
          Dr(b, C, E), b = b[C];
        }
        return e;
      }
      var ed = Mi ? function(e, t) {
        return Mi.set(e, t), e;
      } : pt, jh = Oi ? function(e, t) {
        return Oi(e, "toString", {
          configurable: !0,
          enumerable: !1,
          value: Zs(t),
          writable: !0
        });
      } : pt;
      function Bh(e) {
        return Ji(lr(e));
      }
      function Tt(e, t, a) {
        var s = -1, c = e.length;
        t < 0 && (t = -t > c ? 0 : c + t), a = a > c ? c : a, a < 0 && (a += c), c = t > a ? 0 : a - t >>> 0, t >>>= 0;
        for (var f = x(c); ++s < c; )
          f[s] = e[s + t];
        return f;
      }
      function Dh(e, t) {
        var a;
        return yn(e, function(s, c, f) {
          return a = t(s, c, f), !a;
        }), !!a;
      }
      function Ni(e, t, a) {
        var s = 0, c = e == null ? s : e.length;
        if (typeof t == "number" && t === t && c <= qe) {
          for (; s < c; ) {
            var f = s + c >>> 1, A = e[f];
            A !== null && !yt(A) && (a ? A <= t : A < t) ? s = f + 1 : c = f;
          }
          return c;
        }
        return xs(e, t, pt, a);
      }
      function xs(e, t, a, s) {
        var c = 0, f = e == null ? 0 : e.length;
        if (f === 0)
          return 0;
        t = a(t);
        for (var A = t !== t, b = t === null, C = yt(t), E = t === i; c < f; ) {
          var I = Fi((c + f) / 2), T = a(e[I]), j = T !== i, q = T === null, K = T === T, ie = yt(T);
          if (A)
            var Y = s || K;
          else E ? Y = K && (s || j) : b ? Y = K && j && (s || !q) : C ? Y = K && j && !q && (s || !ie) : q || ie ? Y = !1 : Y = s ? T <= t : T < t;
          Y ? c = I + 1 : f = I;
        }
        return nt(f, xn);
      }
      function td(e, t) {
        for (var a = -1, s = e.length, c = 0, f = []; ++a < s; ) {
          var A = e[a], b = t ? t(A) : A;
          if (!a || !Dt(b, C)) {
            var C = b;
            f[c++] = A === 0 ? 0 : A;
          }
        }
        return f;
      }
      function nd(e) {
        return typeof e == "number" ? e : yt(e) ? Yt : +e;
      }
      function _t(e) {
        if (typeof e == "string")
          return e;
        if (ee(e))
          return Ee(e, _t) + "";
        if (yt(e))
          return Fl ? Fl.call(e) : "";
        var t = e + "";
        return t == "0" && 1 / e == -Ue ? "-0" : t;
      }
      function bn(e, t, a) {
        var s = -1, c = mi, f = e.length, A = !0, b = [], C = b;
        if (a)
          A = !1, c = Qa;
        else if (f >= l) {
          var E = t ? null : Jh(e);
          if (E)
            return Ci(E);
          A = !1, c = Fr, C = new Tn();
        } else
          C = t ? [] : b;
        e:
          for (; ++s < f; ) {
            var I = e[s], T = t ? t(I) : I;
            if (I = a || I !== 0 ? I : 0, A && T === T) {
              for (var j = C.length; j--; )
                if (C[j] === T)
                  continue e;
              t && C.push(T), b.push(I);
            } else c(C, T, a) || (C !== b && C.push(T), b.push(I));
          }
        return b;
      }
      function Rs(e, t) {
        return t = mn(t, e), e = Td(e, t), e == null || delete e[Gt(St(t))];
      }
      function rd(e, t, a, s) {
        return qr(e, t, a(On(e, t)), s);
      }
      function Ui(e, t, a, s) {
        for (var c = e.length, f = s ? c : -1; (s ? f-- : ++f < c) && t(e[f], f, e); )
          ;
        return a ? Tt(e, s ? 0 : f, s ? f + 1 : c) : Tt(e, s ? f + 1 : 0, s ? c : f);
      }
      function id(e, t) {
        var a = e;
        return a instanceof ue && (a = a.value()), es(t, function(s, c) {
          return c.func.apply(c.thisArg, An([s], c.args));
        }, a);
      }
      function ks(e, t, a) {
        var s = e.length;
        if (s < 2)
          return s ? bn(e[0]) : [];
        for (var c = -1, f = x(s); ++c < s; )
          for (var A = e[c], b = -1; ++b < s; )
            b != c && (f[c] = Wr(f[c] || A, e[b], t, a));
        return bn(Ze(f, 1), t, a);
      }
      function ad(e, t, a) {
        for (var s = -1, c = e.length, f = t.length, A = {}; ++s < c; ) {
          var b = s < f ? t[s] : i;
          a(A, e[s], b);
        }
        return A;
      }
      function Es(e) {
        return Me(e) ? e : [];
      }
      function Is(e) {
        return typeof e == "function" ? e : pt;
      }
      function mn(e, t) {
        return ee(e) ? e : zs(e, t) ? [e] : Fd(_e(e));
      }
      var Wh = se;
      function wn(e, t, a) {
        var s = e.length;
        return a = a === i ? s : a, !t && a >= s ? e : Tt(e, t, a);
      }
      var sd = IA || function(e) {
        return Ve.clearTimeout(e);
      };
      function od(e, t) {
        if (t)
          return e.slice();
        var a = e.length, s = Il ? Il(a) : new e.constructor(a);
        return e.copy(s), s;
      }
      function $s(e) {
        var t = new e.constructor(e.byteLength);
        return new $i(t).set(new $i(e)), t;
      }
      function Nh(e, t) {
        var a = t ? $s(e.buffer) : e.buffer;
        return new e.constructor(a, e.byteOffset, e.byteLength);
      }
      function Uh(e) {
        var t = new e.constructor(e.source, he.exec(e));
        return t.lastIndex = e.lastIndex, t;
      }
      function qh(e) {
        return Br ? me(Br.call(e)) : {};
      }
      function cd(e, t) {
        var a = t ? $s(e.buffer) : e.buffer;
        return new e.constructor(a, e.byteOffset, e.length);
      }
      function ld(e, t) {
        if (e !== t) {
          var a = e !== i, s = e === null, c = e === e, f = yt(e), A = t !== i, b = t === null, C = t === t, E = yt(t);
          if (!b && !E && !f && e > t || f && A && C && !b && !E || s && A && C || !a && C || !c)
            return 1;
          if (!s && !f && !E && e < t || E && a && c && !s && !f || b && a && c || !A && c || !C)
            return -1;
        }
        return 0;
      }
      function Gh(e, t, a) {
        for (var s = -1, c = e.criteria, f = t.criteria, A = c.length, b = a.length; ++s < A; ) {
          var C = ld(c[s], f[s]);
          if (C) {
            if (s >= b)
              return C;
            var E = a[s];
            return C * (E == "desc" ? -1 : 1);
          }
        }
        return e.index - t.index;
      }
      function dd(e, t, a, s) {
        for (var c = -1, f = e.length, A = a.length, b = -1, C = t.length, E = De(f - A, 0), I = x(C + E), T = !s; ++b < C; )
          I[b] = t[b];
        for (; ++c < A; )
          (T || c < f) && (I[a[c]] = e[c]);
        for (; E--; )
          I[b++] = e[c++];
        return I;
      }
      function ud(e, t, a, s) {
        for (var c = -1, f = e.length, A = -1, b = a.length, C = -1, E = t.length, I = De(f - b, 0), T = x(I + E), j = !s; ++c < I; )
          T[c] = e[c];
        for (var q = c; ++C < E; )
          T[q + C] = t[C];
        for (; ++A < b; )
          (j || c < f) && (T[q + a[A]] = e[c++]);
        return T;
      }
      function dt(e, t) {
        var a = -1, s = e.length;
        for (t || (t = x(s)); ++a < s; )
          t[a] = e[a];
        return t;
      }
      function qt(e, t, a, s) {
        var c = !a;
        a || (a = {});
        for (var f = -1, A = t.length; ++f < A; ) {
          var b = t[f], C = s ? s(a[b], e[b], b, a, e) : i;
          C === i && (C = e[b]), c ? en(a, b, C) : Dr(a, b, C);
        }
        return a;
      }
      function Hh(e, t) {
        return qt(e, Ls(e), t);
      }
      function Kh(e, t) {
        return qt(e, xd(e), t);
      }
      function qi(e, t) {
        return function(a, s) {
          var c = ee(a) ? Xg : gh, f = t ? t() : {};
          return c(a, e, H(s, 2), f);
        };
      }
      function ar(e) {
        return se(function(t, a) {
          var s = -1, c = a.length, f = c > 1 ? a[c - 1] : i, A = c > 2 ? a[2] : i;
          for (f = e.length > 3 && typeof f == "function" ? (c--, f) : i, A && st(a[0], a[1], A) && (f = c < 3 ? i : f, c = 1), t = me(t); ++s < c; ) {
            var b = a[s];
            b && e(t, b, s, f);
          }
          return t;
        });
      }
      function fd(e, t) {
        return function(a, s) {
          if (a == null)
            return a;
          if (!ut(a))
            return e(a, s);
          for (var c = a.length, f = t ? c : -1, A = me(a); (t ? f-- : ++f < c) && s(A[f], f, A) !== !1; )
            ;
          return a;
        };
      }
      function pd(e) {
        return function(t, a, s) {
          for (var c = -1, f = me(t), A = s(t), b = A.length; b--; ) {
            var C = A[e ? b : ++c];
            if (a(f[C], C, f) === !1)
              break;
          }
          return t;
        };
      }
      function Yh(e, t, a) {
        var s = t & O, c = Gr(e);
        function f() {
          var A = this && this !== Ve && this instanceof f ? c : e;
          return A.apply(s ? a : this, arguments);
        }
        return f;
      }
      function vd(e) {
        return function(t) {
          t = _e(t);
          var a = Xn(t) ? jt(t) : i, s = a ? a[0] : t.charAt(0), c = a ? wn(a, 1).join("") : t.slice(1);
          return s[e]() + c;
        };
      }
      function sr(e) {
        return function(t) {
          return es(fu(uu(t).replace(jg, "")), e, "");
        };
      }
      function Gr(e) {
        return function() {
          var t = arguments;
          switch (t.length) {
            case 0:
              return new e();
            case 1:
              return new e(t[0]);
            case 2:
              return new e(t[0], t[1]);
            case 3:
              return new e(t[0], t[1], t[2]);
            case 4:
              return new e(t[0], t[1], t[2], t[3]);
            case 5:
              return new e(t[0], t[1], t[2], t[3], t[4]);
            case 6:
              return new e(t[0], t[1], t[2], t[3], t[4], t[5]);
            case 7:
              return new e(t[0], t[1], t[2], t[3], t[4], t[5], t[6]);
          }
          var a = ir(e.prototype), s = e.apply(a, t);
          return Te(s) ? s : a;
        };
      }
      function Vh(e, t, a) {
        var s = Gr(e);
        function c() {
          for (var f = arguments.length, A = x(f), b = f, C = or(c); b--; )
            A[b] = arguments[b];
          var E = f < 3 && A[0] !== C && A[f - 1] !== C ? [] : hn(A, C);
          if (f -= E.length, f < a)
            return yd(
              e,
              t,
              Gi,
              c.placeholder,
              i,
              A,
              E,
              i,
              i,
              a - f
            );
          var I = this && this !== Ve && this instanceof c ? s : e;
          return At(I, this, A);
        }
        return c;
      }
      function gd(e) {
        return function(t, a, s) {
          var c = me(t);
          if (!ut(t)) {
            var f = H(a, 3);
            t = Ge(t), a = function(b) {
              return f(c[b], b, c);
            };
          }
          var A = e(t, a, s);
          return A > -1 ? c[f ? t[A] : A] : i;
        };
      }
      function Ad(e) {
        return nn(function(t) {
          var a = t.length, s = a, c = It.prototype.thru;
          for (e && t.reverse(); s--; ) {
            var f = t[s];
            if (typeof f != "function")
              throw new Et(p);
            if (c && !A && Vi(f) == "wrapper")
              var A = new It([], !0);
          }
          for (s = A ? s : a; ++s < a; ) {
            f = t[s];
            var b = Vi(f), C = b == "wrapper" ? Fs(f) : i;
            C && js(C[0]) && C[1] == (ve | J | ye | ce) && !C[4].length && C[9] == 1 ? A = A[Vi(C[0])].apply(A, C[3]) : A = f.length == 1 && js(f) ? A[b]() : A.thru(f);
          }
          return function() {
            var E = arguments, I = E[0];
            if (A && E.length == 1 && ee(I))
              return A.plant(I).value();
            for (var T = 0, j = a ? t[T].apply(this, E) : I; ++T < a; )
              j = t[T].call(this, j);
            return j;
          };
        });
      }
      function Gi(e, t, a, s, c, f, A, b, C, E) {
        var I = t & ve, T = t & O, j = t & F, q = t & (J | ne), K = t & we, ie = j ? i : Gr(e);
        function Y() {
          for (var le = arguments.length, fe = x(le), bt = le; bt--; )
            fe[bt] = arguments[bt];
          if (q)
            var ot = or(Y), mt = oA(fe, ot);
          if (s && (fe = dd(fe, s, c, q)), f && (fe = ud(fe, f, A, q)), le -= mt, q && le < E) {
            var Le = hn(fe, ot);
            return yd(
              e,
              t,
              Gi,
              Y.placeholder,
              a,
              fe,
              Le,
              b,
              C,
              E - le
            );
          }
          var Wt = T ? a : this, on = j ? Wt[e] : e;
          return le = fe.length, b ? fe = g_(fe, b) : K && le > 1 && fe.reverse(), I && C < le && (fe.length = C), this && this !== Ve && this instanceof Y && (on = ie || Gr(on)), on.apply(Wt, fe);
        }
        return Y;
      }
      function hd(e, t) {
        return function(a, s) {
          return Ch(a, e, t(s), {});
        };
      }
      function Hi(e, t) {
        return function(a, s) {
          var c;
          if (a === i && s === i)
            return t;
          if (a !== i && (c = a), s !== i) {
            if (c === i)
              return s;
            typeof a == "string" || typeof s == "string" ? (a = _t(a), s = _t(s)) : (a = nd(a), s = nd(s)), c = e(a, s);
          }
          return c;
        };
      }
      function Ts(e) {
        return nn(function(t) {
          return t = Ee(t, ht(H())), se(function(a) {
            var s = this;
            return e(t, function(c) {
              return At(c, s, a);
            });
          });
        });
      }
      function Ki(e, t) {
        t = t === i ? " " : _t(t);
        var a = t.length;
        if (a < 2)
          return a ? Cs(t, e) : t;
        var s = Cs(t, Pi(e / Qn(t)));
        return Xn(t) ? wn(jt(s), 0, e).join("") : s.slice(0, e);
      }
      function Zh(e, t, a, s) {
        var c = t & O, f = Gr(e);
        function A() {
          for (var b = -1, C = arguments.length, E = -1, I = s.length, T = x(I + C), j = this && this !== Ve && this instanceof A ? f : e; ++E < I; )
            T[E] = s[E];
          for (; C--; )
            T[E++] = arguments[++b];
          return At(j, c ? a : this, T);
        }
        return A;
      }
      function _d(e) {
        return function(t, a, s) {
          return s && typeof s != "number" && st(t, a, s) && (a = s = i), t = sn(t), a === i ? (a = t, t = 0) : a = sn(a), s = s === i ? t < a ? 1 : -1 : sn(s), Mh(t, a, s, e);
        };
      }
      function Yi(e) {
        return function(t, a) {
          return typeof t == "string" && typeof a == "string" || (t = Ot(t), a = Ot(a)), e(t, a);
        };
      }
      function yd(e, t, a, s, c, f, A, b, C, E) {
        var I = t & J, T = I ? A : i, j = I ? i : A, q = I ? f : i, K = I ? i : f;
        t |= I ? ye : Ae, t &= ~(I ? Ae : ye), t & L || (t &= -4);
        var ie = [
          e,
          t,
          c,
          q,
          T,
          K,
          j,
          b,
          C,
          E
        ], Y = a.apply(i, ie);
        return js(e) && Sd(Y, ie), Y.placeholder = s, Od(Y, e, t);
      }
      function Ss(e) {
        var t = Be[e];
        return function(a, s) {
          if (a = Ot(a), s = s == null ? 0 : nt(re(s), 292), s && Ol(a)) {
            var c = (_e(a) + "e").split("e"), f = t(c[0] + "e" + (+c[1] + s));
            return c = (_e(f) + "e").split("e"), +(c[0] + "e" + (+c[1] - s));
          }
          return t(a);
        };
      }
      var Jh = nr && 1 / Ci(new nr([, -0]))[1] == Ue ? function(e) {
        return new nr(e);
      } : Qs;
      function bd(e) {
        return function(t) {
          var a = rt(t);
          return a == tt ? os(t) : a == gt ? vA(t) : sA(t, e(t));
        };
      }
      function tn(e, t, a, s, c, f, A, b) {
        var C = t & F;
        if (!C && typeof e != "function")
          throw new Et(p);
        var E = s ? s.length : 0;
        if (E || (t &= -97, s = c = i), A = A === i ? A : De(re(A), 0), b = b === i ? b : re(b), E -= c ? c.length : 0, t & Ae) {
          var I = s, T = c;
          s = c = i;
        }
        var j = C ? i : Fs(e), q = [
          e,
          t,
          a,
          s,
          c,
          I,
          T,
          f,
          A,
          b
        ];
        if (j && f_(q, j), e = q[0], t = q[1], a = q[2], s = q[3], c = q[4], b = q[9] = q[9] === i ? C ? 0 : e.length : De(q[9] - E, 0), !b && t & (J | ne) && (t &= -25), !t || t == O)
          var K = Yh(e, t, a);
        else t == J || t == ne ? K = Vh(e, t, b) : (t == ye || t == (O | ye)) && !c.length ? K = Zh(e, t, a, s) : K = Gi.apply(i, q);
        var ie = j ? ed : Sd;
        return Od(ie(K, q), e, t);
      }
      function md(e, t, a, s) {
        return e === i || Dt(e, tr[a]) && !be.call(s, a) ? t : e;
      }
      function wd(e, t, a, s, c, f) {
        return Te(e) && Te(t) && (f.set(t, e), Wi(e, t, i, wd, f), f.delete(t)), e;
      }
      function Xh(e) {
        return Yr(e) ? i : e;
      }
      function Cd(e, t, a, s, c, f) {
        var A = a & $, b = e.length, C = t.length;
        if (b != C && !(A && C > b))
          return !1;
        var E = f.get(e), I = f.get(t);
        if (E && I)
          return E == t && I == e;
        var T = -1, j = !0, q = a & M ? new Tn() : i;
        for (f.set(e, t), f.set(t, e); ++T < b; ) {
          var K = e[T], ie = t[T];
          if (s)
            var Y = A ? s(ie, K, T, t, e, f) : s(K, ie, T, e, t, f);
          if (Y !== i) {
            if (Y)
              continue;
            j = !1;
            break;
          }
          if (q) {
            if (!ts(t, function(le, fe) {
              if (!Fr(q, fe) && (K === le || c(K, le, a, s, f)))
                return q.push(fe);
            })) {
              j = !1;
              break;
            }
          } else if (!(K === ie || c(K, ie, a, s, f))) {
            j = !1;
            break;
          }
        }
        return f.delete(e), f.delete(t), j;
      }
      function Qh(e, t, a, s, c, f, A) {
        switch (a) {
          case pn:
            if (e.byteLength != t.byteLength || e.byteOffset != t.byteOffset)
              return !1;
            e = e.buffer, t = t.buffer;
          case fn:
            return !(e.byteLength != t.byteLength || !f(new $i(e), new $i(t)));
          case G:
          case X:
          case Ct:
            return Dt(+e, +t);
          case Ke:
            return e.name == t.name && e.message == t.message;
          case kn:
          case Zt:
            return e == t + "";
          case tt:
            var b = os;
          case gt:
            var C = s & $;
            if (b || (b = Ci), e.size != t.size && !C)
              return !1;
            var E = A.get(e);
            if (E)
              return E == t;
            s |= M, A.set(e, t);
            var I = Cd(b(e), b(t), s, c, f, A);
            return A.delete(e), I;
          case qn:
            if (Br)
              return Br.call(e) == Br.call(t);
        }
        return !1;
      }
      function e_(e, t, a, s, c, f) {
        var A = a & $, b = Os(e), C = b.length, E = Os(t), I = E.length;
        if (C != I && !A)
          return !1;
        for (var T = C; T--; ) {
          var j = b[T];
          if (!(A ? j in t : be.call(t, j)))
            return !1;
        }
        var q = f.get(e), K = f.get(t);
        if (q && K)
          return q == t && K == e;
        var ie = !0;
        f.set(e, t), f.set(t, e);
        for (var Y = A; ++T < C; ) {
          j = b[T];
          var le = e[j], fe = t[j];
          if (s)
            var bt = A ? s(fe, le, j, t, e, f) : s(le, fe, j, e, t, f);
          if (!(bt === i ? le === fe || c(le, fe, a, s, f) : bt)) {
            ie = !1;
            break;
          }
          Y || (Y = j == "constructor");
        }
        if (ie && !Y) {
          var ot = e.constructor, mt = t.constructor;
          ot != mt && "constructor" in e && "constructor" in t && !(typeof ot == "function" && ot instanceof ot && typeof mt == "function" && mt instanceof mt) && (ie = !1);
        }
        return f.delete(e), f.delete(t), ie;
      }
      function nn(e) {
        return Ds($d(e, i, jd), e + "");
      }
      function Os(e) {
        return Ul(e, Ge, Ls);
      }
      function Ps(e) {
        return Ul(e, ft, xd);
      }
      var Fs = Mi ? function(e) {
        return Mi.get(e);
      } : Qs;
      function Vi(e) {
        for (var t = e.name + "", a = rr[t], s = be.call(rr, t) ? a.length : 0; s--; ) {
          var c = a[s], f = c.func;
          if (f == null || f == e)
            return c.name;
        }
        return t;
      }
      function or(e) {
        var t = be.call(u, "placeholder") ? u : e;
        return t.placeholder;
      }
      function H() {
        var e = u.iteratee || Js;
        return e = e === Js ? Hl : e, arguments.length ? e(arguments[0], arguments[1]) : e;
      }
      function Zi(e, t) {
        var a = e.__data__;
        return c_(t) ? a[typeof t == "string" ? "string" : "hash"] : a.map;
      }
      function Ms(e) {
        for (var t = Ge(e), a = t.length; a--; ) {
          var s = t[a], c = e[s];
          t[a] = [s, c, Ed(c)];
        }
        return t;
      }
      function Pn(e, t) {
        var a = uA(e, t);
        return Gl(a) ? a : i;
      }
      function t_(e) {
        var t = be.call(e, In), a = e[In];
        try {
          e[In] = i;
          var s = !0;
        } catch {
        }
        var c = Ei.call(e);
        return s && (t ? e[In] = a : delete e[In]), c;
      }
      var Ls = ls ? function(e) {
        return e == null ? [] : (e = me(e), gn(ls(e), function(t) {
          return Tl.call(e, t);
        }));
      } : eo, xd = ls ? function(e) {
        for (var t = []; e; )
          An(t, Ls(e)), e = Ti(e);
        return t;
      } : eo, rt = at;
      (ds && rt(new ds(new ArrayBuffer(1))) != pn || Lr && rt(new Lr()) != tt || us && rt(us.resolve()) != wr || nr && rt(new nr()) != gt || zr && rt(new zr()) != un) && (rt = function(e) {
        var t = at(e), a = t == xt ? e.constructor : i, s = a ? Fn(a) : "";
        if (s)
          switch (s) {
            case zA:
              return pn;
            case jA:
              return tt;
            case BA:
              return wr;
            case DA:
              return gt;
            case WA:
              return un;
          }
        return t;
      });
      function n_(e, t, a) {
        for (var s = -1, c = a.length; ++s < c; ) {
          var f = a[s], A = f.size;
          switch (f.type) {
            case "drop":
              e += A;
              break;
            case "dropRight":
              t -= A;
              break;
            case "take":
              t = nt(t, e + A);
              break;
            case "takeRight":
              e = De(e, t - A);
              break;
          }
        }
        return { start: e, end: t };
      }
      function r_(e) {
        var t = e.match(Ua);
        return t ? t[1].split(_) : [];
      }
      function Rd(e, t, a) {
        t = mn(t, e);
        for (var s = -1, c = t.length, f = !1; ++s < c; ) {
          var A = Gt(t[s]);
          if (!(f = e != null && a(e, A)))
            break;
          e = e[A];
        }
        return f || ++s != c ? f : (c = e == null ? 0 : e.length, !!c && ra(c) && rn(A, c) && (ee(e) || Mn(e)));
      }
      function i_(e) {
        var t = e.length, a = new e.constructor(t);
        return t && typeof e[0] == "string" && be.call(e, "index") && (a.index = e.index, a.input = e.input), a;
      }
      function kd(e) {
        return typeof e.constructor == "function" && !Hr(e) ? ir(Ti(e)) : {};
      }
      function a_(e, t, a) {
        var s = e.constructor;
        switch (t) {
          case fn:
            return $s(e);
          case G:
          case X:
            return new s(+e);
          case pn:
            return Nh(e, a);
          case Gn:
          case Hn:
          case Cr:
          case xr:
          case Rr:
          case kr:
          case Er:
          case Ir:
          case $r:
            return cd(e, a);
          case tt:
            return new s();
          case Ct:
          case Zt:
            return new s(e);
          case kn:
            return Uh(e);
          case gt:
            return new s();
          case qn:
            return qh(e);
        }
      }
      function s_(e, t) {
        var a = t.length;
        if (!a)
          return e;
        var s = a - 1;
        return t[s] = (a > 1 ? "& " : "") + t[s], t = t.join(a > 2 ? ", " : " "), e.replace(Na, `{
/* [wrapped with ` + t + `] */
`);
      }
      function o_(e) {
        return ee(e) || Mn(e) || !!(Sl && e && e[Sl]);
      }
      function rn(e, t) {
        var a = typeof e;
        return t = t ?? Qe, !!t && (a == "number" || a != "symbol" && Pe.test(e)) && e > -1 && e % 1 == 0 && e < t;
      }
      function st(e, t, a) {
        if (!Te(a))
          return !1;
        var s = typeof t;
        return (s == "number" ? ut(a) && rn(t, a.length) : s == "string" && t in a) ? Dt(a[t], e) : !1;
      }
      function zs(e, t) {
        if (ee(e))
          return !1;
        var a = typeof e;
        return a == "number" || a == "symbol" || a == "boolean" || e == null || yt(e) ? !0 : Ba.test(e) || !_i.test(e) || t != null && e in me(t);
      }
      function c_(e) {
        var t = typeof e;
        return t == "string" || t == "number" || t == "symbol" || t == "boolean" ? e !== "__proto__" : e === null;
      }
      function js(e) {
        var t = Vi(e), a = u[t];
        if (typeof a != "function" || !(t in ue.prototype))
          return !1;
        if (e === a)
          return !0;
        var s = Fs(a);
        return !!s && e === s[0];
      }
      function l_(e) {
        return !!El && El in e;
      }
      var d_ = Ri ? an : to;
      function Hr(e) {
        var t = e && e.constructor, a = typeof t == "function" && t.prototype || tr;
        return e === a;
      }
      function Ed(e) {
        return e === e && !Te(e);
      }
      function Id(e, t) {
        return function(a) {
          return a == null ? !1 : a[e] === t && (t !== i || e in me(a));
        };
      }
      function u_(e) {
        var t = ta(e, function(s) {
          return a.size === m && a.clear(), s;
        }), a = t.cache;
        return t;
      }
      function f_(e, t) {
        var a = e[1], s = t[1], c = a | s, f = c < (O | F | ve), A = s == ve && a == J || s == ve && a == ce && e[7].length <= t[8] || s == (ve | ce) && t[7].length <= t[8] && a == J;
        if (!(f || A))
          return e;
        s & O && (e[2] = t[2], c |= a & O ? 0 : L);
        var b = t[3];
        if (b) {
          var C = e[3];
          e[3] = C ? dd(C, b, t[4]) : b, e[4] = C ? hn(e[3], y) : t[4];
        }
        return b = t[5], b && (C = e[5], e[5] = C ? ud(C, b, t[6]) : b, e[6] = C ? hn(e[5], y) : t[6]), b = t[7], b && (e[7] = b), s & ve && (e[8] = e[8] == null ? t[8] : nt(e[8], t[8])), e[9] == null && (e[9] = t[9]), e[0] = t[0], e[1] = c, e;
      }
      function p_(e) {
        var t = [];
        if (e != null)
          for (var a in me(e))
            t.push(a);
        return t;
      }
      function v_(e) {
        return Ei.call(e);
      }
      function $d(e, t, a) {
        return t = De(t === i ? e.length - 1 : t, 0), function() {
          for (var s = arguments, c = -1, f = De(s.length - t, 0), A = x(f); ++c < f; )
            A[c] = s[t + c];
          c = -1;
          for (var b = x(t + 1); ++c < t; )
            b[c] = s[c];
          return b[t] = a(A), At(e, this, b);
        };
      }
      function Td(e, t) {
        return t.length < 2 ? e : On(e, Tt(t, 0, -1));
      }
      function g_(e, t) {
        for (var a = e.length, s = nt(t.length, a), c = dt(e); s--; ) {
          var f = t[s];
          e[s] = rn(f, a) ? c[f] : i;
        }
        return e;
      }
      function Bs(e, t) {
        if (!(t === "constructor" && typeof e[t] == "function") && t != "__proto__")
          return e[t];
      }
      var Sd = Pd(ed), Kr = TA || function(e, t) {
        return Ve.setTimeout(e, t);
      }, Ds = Pd(jh);
      function Od(e, t, a) {
        var s = t + "";
        return Ds(e, s_(s, A_(r_(s), a)));
      }
      function Pd(e) {
        var t = 0, a = 0;
        return function() {
          var s = FA(), c = ae - (s - a);
          if (a = s, c > 0) {
            if (++t >= V)
              return arguments[0];
          } else
            t = 0;
          return e.apply(i, arguments);
        };
      }
      function Ji(e, t) {
        var a = -1, s = e.length, c = s - 1;
        for (t = t === i ? s : t; ++a < t; ) {
          var f = ws(a, c), A = e[f];
          e[f] = e[a], e[a] = A;
        }
        return e.length = t, e;
      }
      var Fd = u_(function(e) {
        var t = [];
        return e.charCodeAt(0) === 46 && t.push(""), e.replace(Da, function(a, s, c, f) {
          t.push(c ? f.replace(Z, "$1") : s || a);
        }), t;
      });
      function Gt(e) {
        if (typeof e == "string" || yt(e))
          return e;
        var t = e + "";
        return t == "0" && 1 / e == -Ue ? "-0" : t;
      }
      function Fn(e) {
        if (e != null) {
          try {
            return ki.call(e);
          } catch {
          }
          try {
            return e + "";
          } catch {
          }
        }
        return "";
      }
      function A_(e, t) {
        return kt(Vt, function(a) {
          var s = "_." + a[0];
          t & a[1] && !mi(e, s) && e.push(s);
        }), e.sort();
      }
      function Md(e) {
        if (e instanceof ue)
          return e.clone();
        var t = new It(e.__wrapped__, e.__chain__);
        return t.__actions__ = dt(e.__actions__), t.__index__ = e.__index__, t.__values__ = e.__values__, t;
      }
      function h_(e, t, a) {
        (a ? st(e, t, a) : t === i) ? t = 1 : t = De(re(t), 0);
        var s = e == null ? 0 : e.length;
        if (!s || t < 1)
          return [];
        for (var c = 0, f = 0, A = x(Pi(s / t)); c < s; )
          A[f++] = Tt(e, c, c += t);
        return A;
      }
      function __(e) {
        for (var t = -1, a = e == null ? 0 : e.length, s = 0, c = []; ++t < a; ) {
          var f = e[t];
          f && (c[s++] = f);
        }
        return c;
      }
      function y_() {
        var e = arguments.length;
        if (!e)
          return [];
        for (var t = x(e - 1), a = arguments[0], s = e; s--; )
          t[s - 1] = arguments[s];
        return An(ee(a) ? dt(a) : [a], Ze(t, 1));
      }
      var b_ = se(function(e, t) {
        return Me(e) ? Wr(e, Ze(t, 1, Me, !0)) : [];
      }), m_ = se(function(e, t) {
        var a = St(t);
        return Me(a) && (a = i), Me(e) ? Wr(e, Ze(t, 1, Me, !0), H(a, 2)) : [];
      }), w_ = se(function(e, t) {
        var a = St(t);
        return Me(a) && (a = i), Me(e) ? Wr(e, Ze(t, 1, Me, !0), i, a) : [];
      });
      function C_(e, t, a) {
        var s = e == null ? 0 : e.length;
        return s ? (t = a || t === i ? 1 : re(t), Tt(e, t < 0 ? 0 : t, s)) : [];
      }
      function x_(e, t, a) {
        var s = e == null ? 0 : e.length;
        return s ? (t = a || t === i ? 1 : re(t), t = s - t, Tt(e, 0, t < 0 ? 0 : t)) : [];
      }
      function R_(e, t) {
        return e && e.length ? Ui(e, H(t, 3), !0, !0) : [];
      }
      function k_(e, t) {
        return e && e.length ? Ui(e, H(t, 3), !0) : [];
      }
      function E_(e, t, a, s) {
        var c = e == null ? 0 : e.length;
        return c ? (a && typeof a != "number" && st(e, t, a) && (a = 0, s = c), yh(e, t, a, s)) : [];
      }
      function Ld(e, t, a) {
        var s = e == null ? 0 : e.length;
        if (!s)
          return -1;
        var c = a == null ? 0 : re(a);
        return c < 0 && (c = De(s + c, 0)), wi(e, H(t, 3), c);
      }
      function zd(e, t, a) {
        var s = e == null ? 0 : e.length;
        if (!s)
          return -1;
        var c = s - 1;
        return a !== i && (c = re(a), c = a < 0 ? De(s + c, 0) : nt(c, s - 1)), wi(e, H(t, 3), c, !0);
      }
      function jd(e) {
        var t = e == null ? 0 : e.length;
        return t ? Ze(e, 1) : [];
      }
      function I_(e) {
        var t = e == null ? 0 : e.length;
        return t ? Ze(e, Ue) : [];
      }
      function $_(e, t) {
        var a = e == null ? 0 : e.length;
        return a ? (t = t === i ? 1 : re(t), Ze(e, t)) : [];
      }
      function T_(e) {
        for (var t = -1, a = e == null ? 0 : e.length, s = {}; ++t < a; ) {
          var c = e[t];
          s[c[0]] = c[1];
        }
        return s;
      }
      function Bd(e) {
        return e && e.length ? e[0] : i;
      }
      function S_(e, t, a) {
        var s = e == null ? 0 : e.length;
        if (!s)
          return -1;
        var c = a == null ? 0 : re(a);
        return c < 0 && (c = De(s + c, 0)), Jn(e, t, c);
      }
      function O_(e) {
        var t = e == null ? 0 : e.length;
        return t ? Tt(e, 0, -1) : [];
      }
      var P_ = se(function(e) {
        var t = Ee(e, Es);
        return t.length && t[0] === e[0] ? hs(t) : [];
      }), F_ = se(function(e) {
        var t = St(e), a = Ee(e, Es);
        return t === St(a) ? t = i : a.pop(), a.length && a[0] === e[0] ? hs(a, H(t, 2)) : [];
      }), M_ = se(function(e) {
        var t = St(e), a = Ee(e, Es);
        return t = typeof t == "function" ? t : i, t && a.pop(), a.length && a[0] === e[0] ? hs(a, i, t) : [];
      });
      function L_(e, t) {
        return e == null ? "" : OA.call(e, t);
      }
      function St(e) {
        var t = e == null ? 0 : e.length;
        return t ? e[t - 1] : i;
      }
      function z_(e, t, a) {
        var s = e == null ? 0 : e.length;
        if (!s)
          return -1;
        var c = s;
        return a !== i && (c = re(a), c = c < 0 ? De(s + c, 0) : nt(c, s - 1)), t === t ? AA(e, t, c) : wi(e, yl, c, !0);
      }
      function j_(e, t) {
        return e && e.length ? Zl(e, re(t)) : i;
      }
      var B_ = se(Dd);
      function Dd(e, t) {
        return e && e.length && t && t.length ? ms(e, t) : e;
      }
      function D_(e, t, a) {
        return e && e.length && t && t.length ? ms(e, t, H(a, 2)) : e;
      }
      function W_(e, t, a) {
        return e && e.length && t && t.length ? ms(e, t, i, a) : e;
      }
      var N_ = nn(function(e, t) {
        var a = e == null ? 0 : e.length, s = ps(e, t);
        return Ql(e, Ee(t, function(c) {
          return rn(c, a) ? +c : c;
        }).sort(ld)), s;
      });
      function U_(e, t) {
        var a = [];
        if (!(e && e.length))
          return a;
        var s = -1, c = [], f = e.length;
        for (t = H(t, 3); ++s < f; ) {
          var A = e[s];
          t(A, s, e) && (a.push(A), c.push(s));
        }
        return Ql(e, c), a;
      }
      function Ws(e) {
        return e == null ? e : LA.call(e);
      }
      function q_(e, t, a) {
        var s = e == null ? 0 : e.length;
        return s ? (a && typeof a != "number" && st(e, t, a) ? (t = 0, a = s) : (t = t == null ? 0 : re(t), a = a === i ? s : re(a)), Tt(e, t, a)) : [];
      }
      function G_(e, t) {
        return Ni(e, t);
      }
      function H_(e, t, a) {
        return xs(e, t, H(a, 2));
      }
      function K_(e, t) {
        var a = e == null ? 0 : e.length;
        if (a) {
          var s = Ni(e, t);
          if (s < a && Dt(e[s], t))
            return s;
        }
        return -1;
      }
      function Y_(e, t) {
        return Ni(e, t, !0);
      }
      function V_(e, t, a) {
        return xs(e, t, H(a, 2), !0);
      }
      function Z_(e, t) {
        var a = e == null ? 0 : e.length;
        if (a) {
          var s = Ni(e, t, !0) - 1;
          if (Dt(e[s], t))
            return s;
        }
        return -1;
      }
      function J_(e) {
        return e && e.length ? td(e) : [];
      }
      function X_(e, t) {
        return e && e.length ? td(e, H(t, 2)) : [];
      }
      function Q_(e) {
        var t = e == null ? 0 : e.length;
        return t ? Tt(e, 1, t) : [];
      }
      function ey(e, t, a) {
        return e && e.length ? (t = a || t === i ? 1 : re(t), Tt(e, 0, t < 0 ? 0 : t)) : [];
      }
      function ty(e, t, a) {
        var s = e == null ? 0 : e.length;
        return s ? (t = a || t === i ? 1 : re(t), t = s - t, Tt(e, t < 0 ? 0 : t, s)) : [];
      }
      function ny(e, t) {
        return e && e.length ? Ui(e, H(t, 3), !1, !0) : [];
      }
      function ry(e, t) {
        return e && e.length ? Ui(e, H(t, 3)) : [];
      }
      var iy = se(function(e) {
        return bn(Ze(e, 1, Me, !0));
      }), ay = se(function(e) {
        var t = St(e);
        return Me(t) && (t = i), bn(Ze(e, 1, Me, !0), H(t, 2));
      }), sy = se(function(e) {
        var t = St(e);
        return t = typeof t == "function" ? t : i, bn(Ze(e, 1, Me, !0), i, t);
      });
      function oy(e) {
        return e && e.length ? bn(e) : [];
      }
      function cy(e, t) {
        return e && e.length ? bn(e, H(t, 2)) : [];
      }
      function ly(e, t) {
        return t = typeof t == "function" ? t : i, e && e.length ? bn(e, i, t) : [];
      }
      function Ns(e) {
        if (!(e && e.length))
          return [];
        var t = 0;
        return e = gn(e, function(a) {
          if (Me(a))
            return t = De(a.length, t), !0;
        }), as(t, function(a) {
          return Ee(e, ns(a));
        });
      }
      function Wd(e, t) {
        if (!(e && e.length))
          return [];
        var a = Ns(e);
        return t == null ? a : Ee(a, function(s) {
          return At(t, i, s);
        });
      }
      var dy = se(function(e, t) {
        return Me(e) ? Wr(e, t) : [];
      }), uy = se(function(e) {
        return ks(gn(e, Me));
      }), fy = se(function(e) {
        var t = St(e);
        return Me(t) && (t = i), ks(gn(e, Me), H(t, 2));
      }), py = se(function(e) {
        var t = St(e);
        return t = typeof t == "function" ? t : i, ks(gn(e, Me), i, t);
      }), vy = se(Ns);
      function gy(e, t) {
        return ad(e || [], t || [], Dr);
      }
      function Ay(e, t) {
        return ad(e || [], t || [], qr);
      }
      var hy = se(function(e) {
        var t = e.length, a = t > 1 ? e[t - 1] : i;
        return a = typeof a == "function" ? (e.pop(), a) : i, Wd(e, a);
      });
      function Nd(e) {
        var t = u(e);
        return t.__chain__ = !0, t;
      }
      function _y(e, t) {
        return t(e), e;
      }
      function Xi(e, t) {
        return t(e);
      }
      var yy = nn(function(e) {
        var t = e.length, a = t ? e[0] : 0, s = this.__wrapped__, c = function(f) {
          return ps(f, e);
        };
        return t > 1 || this.__actions__.length || !(s instanceof ue) || !rn(a) ? this.thru(c) : (s = s.slice(a, +a + (t ? 1 : 0)), s.__actions__.push({
          func: Xi,
          args: [c],
          thisArg: i
        }), new It(s, this.__chain__).thru(function(f) {
          return t && !f.length && f.push(i), f;
        }));
      });
      function by() {
        return Nd(this);
      }
      function my() {
        return new It(this.value(), this.__chain__);
      }
      function wy() {
        this.__values__ === i && (this.__values__ = nu(this.value()));
        var e = this.__index__ >= this.__values__.length, t = e ? i : this.__values__[this.__index__++];
        return { done: e, value: t };
      }
      function Cy() {
        return this;
      }
      function xy(e) {
        for (var t, a = this; a instanceof zi; ) {
          var s = Md(a);
          s.__index__ = 0, s.__values__ = i, t ? c.__wrapped__ = s : t = s;
          var c = s;
          a = a.__wrapped__;
        }
        return c.__wrapped__ = e, t;
      }
      function Ry() {
        var e = this.__wrapped__;
        if (e instanceof ue) {
          var t = e;
          return this.__actions__.length && (t = new ue(this)), t = t.reverse(), t.__actions__.push({
            func: Xi,
            args: [Ws],
            thisArg: i
          }), new It(t, this.__chain__);
        }
        return this.thru(Ws);
      }
      function ky() {
        return id(this.__wrapped__, this.__actions__);
      }
      var Ey = qi(function(e, t, a) {
        be.call(e, a) ? ++e[a] : en(e, a, 1);
      });
      function Iy(e, t, a) {
        var s = ee(e) ? hl : _h;
        return a && st(e, t, a) && (t = i), s(e, H(t, 3));
      }
      function $y(e, t) {
        var a = ee(e) ? gn : Wl;
        return a(e, H(t, 3));
      }
      var Ty = gd(Ld), Sy = gd(zd);
      function Oy(e, t) {
        return Ze(Qi(e, t), 1);
      }
      function Py(e, t) {
        return Ze(Qi(e, t), Ue);
      }
      function Fy(e, t, a) {
        return a = a === i ? 1 : re(a), Ze(Qi(e, t), a);
      }
      function Ud(e, t) {
        var a = ee(e) ? kt : yn;
        return a(e, H(t, 3));
      }
      function qd(e, t) {
        var a = ee(e) ? Qg : Dl;
        return a(e, H(t, 3));
      }
      var My = qi(function(e, t, a) {
        be.call(e, a) ? e[a].push(t) : en(e, a, [t]);
      });
      function Ly(e, t, a, s) {
        e = ut(e) ? e : lr(e), a = a && !s ? re(a) : 0;
        var c = e.length;
        return a < 0 && (a = De(c + a, 0)), ia(e) ? a <= c && e.indexOf(t, a) > -1 : !!c && Jn(e, t, a) > -1;
      }
      var zy = se(function(e, t, a) {
        var s = -1, c = typeof t == "function", f = ut(e) ? x(e.length) : [];
        return yn(e, function(A) {
          f[++s] = c ? At(t, A, a) : Nr(A, t, a);
        }), f;
      }), jy = qi(function(e, t, a) {
        en(e, a, t);
      });
      function Qi(e, t) {
        var a = ee(e) ? Ee : Kl;
        return a(e, H(t, 3));
      }
      function By(e, t, a, s) {
        return e == null ? [] : (ee(t) || (t = t == null ? [] : [t]), a = s ? i : a, ee(a) || (a = a == null ? [] : [a]), Jl(e, t, a));
      }
      var Dy = qi(function(e, t, a) {
        e[a ? 0 : 1].push(t);
      }, function() {
        return [[], []];
      });
      function Wy(e, t, a) {
        var s = ee(e) ? es : ml, c = arguments.length < 3;
        return s(e, H(t, 4), a, c, yn);
      }
      function Ny(e, t, a) {
        var s = ee(e) ? eA : ml, c = arguments.length < 3;
        return s(e, H(t, 4), a, c, Dl);
      }
      function Uy(e, t) {
        var a = ee(e) ? gn : Wl;
        return a(e, na(H(t, 3)));
      }
      function qy(e) {
        var t = ee(e) ? Ll : Lh;
        return t(e);
      }
      function Gy(e, t, a) {
        (a ? st(e, t, a) : t === i) ? t = 1 : t = re(t);
        var s = ee(e) ? ph : zh;
        return s(e, t);
      }
      function Hy(e) {
        var t = ee(e) ? vh : Bh;
        return t(e);
      }
      function Ky(e) {
        if (e == null)
          return 0;
        if (ut(e))
          return ia(e) ? Qn(e) : e.length;
        var t = rt(e);
        return t == tt || t == gt ? e.size : ys(e).length;
      }
      function Yy(e, t, a) {
        var s = ee(e) ? ts : Dh;
        return a && st(e, t, a) && (t = i), s(e, H(t, 3));
      }
      var Vy = se(function(e, t) {
        if (e == null)
          return [];
        var a = t.length;
        return a > 1 && st(e, t[0], t[1]) ? t = [] : a > 2 && st(t[0], t[1], t[2]) && (t = [t[0]]), Jl(e, Ze(t, 1), []);
      }), ea = $A || function() {
        return Ve.Date.now();
      };
      function Zy(e, t) {
        if (typeof t != "function")
          throw new Et(p);
        return e = re(e), function() {
          if (--e < 1)
            return t.apply(this, arguments);
        };
      }
      function Gd(e, t, a) {
        return t = a ? i : t, t = e && t == null ? e.length : t, tn(e, ve, i, i, i, i, t);
      }
      function Hd(e, t) {
        var a;
        if (typeof t != "function")
          throw new Et(p);
        return e = re(e), function() {
          return --e > 0 && (a = t.apply(this, arguments)), e <= 1 && (t = i), a;
        };
      }
      var Us = se(function(e, t, a) {
        var s = O;
        if (a.length) {
          var c = hn(a, or(Us));
          s |= ye;
        }
        return tn(e, s, t, a, c);
      }), Kd = se(function(e, t, a) {
        var s = O | F;
        if (a.length) {
          var c = hn(a, or(Kd));
          s |= ye;
        }
        return tn(t, s, e, a, c);
      });
      function Yd(e, t, a) {
        t = a ? i : t;
        var s = tn(e, J, i, i, i, i, i, t);
        return s.placeholder = Yd.placeholder, s;
      }
      function Vd(e, t, a) {
        t = a ? i : t;
        var s = tn(e, ne, i, i, i, i, i, t);
        return s.placeholder = Vd.placeholder, s;
      }
      function Zd(e, t, a) {
        var s, c, f, A, b, C, E = 0, I = !1, T = !1, j = !0;
        if (typeof e != "function")
          throw new Et(p);
        t = Ot(t) || 0, Te(a) && (I = !!a.leading, T = "maxWait" in a, f = T ? De(Ot(a.maxWait) || 0, t) : f, j = "trailing" in a ? !!a.trailing : j);
        function q(Le) {
          var Wt = s, on = c;
          return s = c = i, E = Le, A = e.apply(on, Wt), A;
        }
        function K(Le) {
          return E = Le, b = Kr(le, t), I ? q(Le) : A;
        }
        function ie(Le) {
          var Wt = Le - C, on = Le - E, gu = t - Wt;
          return T ? nt(gu, f - on) : gu;
        }
        function Y(Le) {
          var Wt = Le - C, on = Le - E;
          return C === i || Wt >= t || Wt < 0 || T && on >= f;
        }
        function le() {
          var Le = ea();
          if (Y(Le))
            return fe(Le);
          b = Kr(le, ie(Le));
        }
        function fe(Le) {
          return b = i, j && s ? q(Le) : (s = c = i, A);
        }
        function bt() {
          b !== i && sd(b), E = 0, s = C = c = b = i;
        }
        function ot() {
          return b === i ? A : fe(ea());
        }
        function mt() {
          var Le = ea(), Wt = Y(Le);
          if (s = arguments, c = this, C = Le, Wt) {
            if (b === i)
              return K(C);
            if (T)
              return sd(b), b = Kr(le, t), q(C);
          }
          return b === i && (b = Kr(le, t)), A;
        }
        return mt.cancel = bt, mt.flush = ot, mt;
      }
      var Jy = se(function(e, t) {
        return Bl(e, 1, t);
      }), Xy = se(function(e, t, a) {
        return Bl(e, Ot(t) || 0, a);
      });
      function Qy(e) {
        return tn(e, we);
      }
      function ta(e, t) {
        if (typeof e != "function" || t != null && typeof t != "function")
          throw new Et(p);
        var a = function() {
          var s = arguments, c = t ? t.apply(this, s) : s[0], f = a.cache;
          if (f.has(c))
            return f.get(c);
          var A = e.apply(this, s);
          return a.cache = f.set(c, A) || f, A;
        };
        return a.cache = new (ta.Cache || Qt)(), a;
      }
      ta.Cache = Qt;
      function na(e) {
        if (typeof e != "function")
          throw new Et(p);
        return function() {
          var t = arguments;
          switch (t.length) {
            case 0:
              return !e.call(this);
            case 1:
              return !e.call(this, t[0]);
            case 2:
              return !e.call(this, t[0], t[1]);
            case 3:
              return !e.call(this, t[0], t[1], t[2]);
          }
          return !e.apply(this, t);
        };
      }
      function eb(e) {
        return Hd(2, e);
      }
      var tb = Wh(function(e, t) {
        t = t.length == 1 && ee(t[0]) ? Ee(t[0], ht(H())) : Ee(Ze(t, 1), ht(H()));
        var a = t.length;
        return se(function(s) {
          for (var c = -1, f = nt(s.length, a); ++c < f; )
            s[c] = t[c].call(this, s[c]);
          return At(e, this, s);
        });
      }), qs = se(function(e, t) {
        var a = hn(t, or(qs));
        return tn(e, ye, i, t, a);
      }), Jd = se(function(e, t) {
        var a = hn(t, or(Jd));
        return tn(e, Ae, i, t, a);
      }), nb = nn(function(e, t) {
        return tn(e, ce, i, i, i, t);
      });
      function rb(e, t) {
        if (typeof e != "function")
          throw new Et(p);
        return t = t === i ? t : re(t), se(e, t);
      }
      function ib(e, t) {
        if (typeof e != "function")
          throw new Et(p);
        return t = t == null ? 0 : De(re(t), 0), se(function(a) {
          var s = a[t], c = wn(a, 0, t);
          return s && An(c, s), At(e, this, c);
        });
      }
      function ab(e, t, a) {
        var s = !0, c = !0;
        if (typeof e != "function")
          throw new Et(p);
        return Te(a) && (s = "leading" in a ? !!a.leading : s, c = "trailing" in a ? !!a.trailing : c), Zd(e, t, {
          leading: s,
          maxWait: t,
          trailing: c
        });
      }
      function sb(e) {
        return Gd(e, 1);
      }
      function ob(e, t) {
        return qs(Is(t), e);
      }
      function cb() {
        if (!arguments.length)
          return [];
        var e = arguments[0];
        return ee(e) ? e : [e];
      }
      function lb(e) {
        return $t(e, P);
      }
      function db(e, t) {
        return t = typeof t == "function" ? t : i, $t(e, P, t);
      }
      function ub(e) {
        return $t(e, h | P);
      }
      function fb(e, t) {
        return t = typeof t == "function" ? t : i, $t(e, h | P, t);
      }
      function pb(e, t) {
        return t == null || jl(e, t, Ge(t));
      }
      function Dt(e, t) {
        return e === t || e !== e && t !== t;
      }
      var vb = Yi(As), gb = Yi(function(e, t) {
        return e >= t;
      }), Mn = ql(/* @__PURE__ */ (function() {
        return arguments;
      })()) ? ql : function(e) {
        return Fe(e) && be.call(e, "callee") && !Tl.call(e, "callee");
      }, ee = x.isArray, Ab = ul ? ht(ul) : xh;
      function ut(e) {
        return e != null && ra(e.length) && !an(e);
      }
      function Me(e) {
        return Fe(e) && ut(e);
      }
      function hb(e) {
        return e === !0 || e === !1 || Fe(e) && at(e) == G;
      }
      var Cn = SA || to, _b = fl ? ht(fl) : Rh;
      function yb(e) {
        return Fe(e) && e.nodeType === 1 && !Yr(e);
      }
      function bb(e) {
        if (e == null)
          return !0;
        if (ut(e) && (ee(e) || typeof e == "string" || typeof e.splice == "function" || Cn(e) || cr(e) || Mn(e)))
          return !e.length;
        var t = rt(e);
        if (t == tt || t == gt)
          return !e.size;
        if (Hr(e))
          return !ys(e).length;
        for (var a in e)
          if (be.call(e, a))
            return !1;
        return !0;
      }
      function mb(e, t) {
        return Ur(e, t);
      }
      function wb(e, t, a) {
        a = typeof a == "function" ? a : i;
        var s = a ? a(e, t) : i;
        return s === i ? Ur(e, t, i, a) : !!s;
      }
      function Gs(e) {
        if (!Fe(e))
          return !1;
        var t = at(e);
        return t == Ke || t == Oe || typeof e.message == "string" && typeof e.name == "string" && !Yr(e);
      }
      function Cb(e) {
        return typeof e == "number" && Ol(e);
      }
      function an(e) {
        if (!Te(e))
          return !1;
        var t = at(e);
        return t == ze || t == it || t == D || t == Un;
      }
      function Xd(e) {
        return typeof e == "number" && e == re(e);
      }
      function ra(e) {
        return typeof e == "number" && e > -1 && e % 1 == 0 && e <= Qe;
      }
      function Te(e) {
        var t = typeof e;
        return e != null && (t == "object" || t == "function");
      }
      function Fe(e) {
        return e != null && typeof e == "object";
      }
      var Qd = pl ? ht(pl) : Eh;
      function xb(e, t) {
        return e === t || _s(e, t, Ms(t));
      }
      function Rb(e, t, a) {
        return a = typeof a == "function" ? a : i, _s(e, t, Ms(t), a);
      }
      function kb(e) {
        return eu(e) && e != +e;
      }
      function Eb(e) {
        if (d_(e))
          throw new Q(d);
        return Gl(e);
      }
      function Ib(e) {
        return e === null;
      }
      function $b(e) {
        return e == null;
      }
      function eu(e) {
        return typeof e == "number" || Fe(e) && at(e) == Ct;
      }
      function Yr(e) {
        if (!Fe(e) || at(e) != xt)
          return !1;
        var t = Ti(e);
        if (t === null)
          return !0;
        var a = be.call(t, "constructor") && t.constructor;
        return typeof a == "function" && a instanceof a && ki.call(a) == RA;
      }
      var Hs = vl ? ht(vl) : Ih;
      function Tb(e) {
        return Xd(e) && e >= -Qe && e <= Qe;
      }
      var tu = gl ? ht(gl) : $h;
      function ia(e) {
        return typeof e == "string" || !ee(e) && Fe(e) && at(e) == Zt;
      }
      function yt(e) {
        return typeof e == "symbol" || Fe(e) && at(e) == qn;
      }
      var cr = Al ? ht(Al) : Th;
      function Sb(e) {
        return e === i;
      }
      function Ob(e) {
        return Fe(e) && rt(e) == un;
      }
      function Pb(e) {
        return Fe(e) && at(e) == vi;
      }
      var Fb = Yi(bs), Mb = Yi(function(e, t) {
        return e <= t;
      });
      function nu(e) {
        if (!e)
          return [];
        if (ut(e))
          return ia(e) ? jt(e) : dt(e);
        if (Mr && e[Mr])
          return pA(e[Mr]());
        var t = rt(e), a = t == tt ? os : t == gt ? Ci : lr;
        return a(e);
      }
      function sn(e) {
        if (!e)
          return e === 0 ? e : 0;
        if (e = Ot(e), e === Ue || e === -Ue) {
          var t = e < 0 ? -1 : 1;
          return t * dn;
        }
        return e === e ? e : 0;
      }
      function re(e) {
        var t = sn(e), a = t % 1;
        return t === t ? a ? t - a : t : 0;
      }
      function ru(e) {
        return e ? Sn(re(e), 0, et) : 0;
      }
      function Ot(e) {
        if (typeof e == "number")
          return e;
        if (yt(e))
          return Yt;
        if (Te(e)) {
          var t = typeof e.valueOf == "function" ? e.valueOf() : e;
          e = Te(t) ? t + "" : t;
        }
        if (typeof e != "string")
          return e === 0 ? e : +e;
        e = wl(e);
        var a = oe.test(e);
        return a || $e.test(e) ? Zg(e.slice(2), a ? 2 : 8) : de.test(e) ? Yt : +e;
      }
      function iu(e) {
        return qt(e, ft(e));
      }
      function Lb(e) {
        return e ? Sn(re(e), -Qe, Qe) : e === 0 ? e : 0;
      }
      function _e(e) {
        return e == null ? "" : _t(e);
      }
      var zb = ar(function(e, t) {
        if (Hr(t) || ut(t)) {
          qt(t, Ge(t), e);
          return;
        }
        for (var a in t)
          be.call(t, a) && Dr(e, a, t[a]);
      }), au = ar(function(e, t) {
        qt(t, ft(t), e);
      }), aa = ar(function(e, t, a, s) {
        qt(t, ft(t), e, s);
      }), jb = ar(function(e, t, a, s) {
        qt(t, Ge(t), e, s);
      }), Bb = nn(ps);
      function Db(e, t) {
        var a = ir(e);
        return t == null ? a : zl(a, t);
      }
      var Wb = se(function(e, t) {
        e = me(e);
        var a = -1, s = t.length, c = s > 2 ? t[2] : i;
        for (c && st(t[0], t[1], c) && (s = 1); ++a < s; )
          for (var f = t[a], A = ft(f), b = -1, C = A.length; ++b < C; ) {
            var E = A[b], I = e[E];
            (I === i || Dt(I, tr[E]) && !be.call(e, E)) && (e[E] = f[E]);
          }
        return e;
      }), Nb = se(function(e) {
        return e.push(i, wd), At(su, i, e);
      });
      function Ub(e, t) {
        return _l(e, H(t, 3), Ut);
      }
      function qb(e, t) {
        return _l(e, H(t, 3), gs);
      }
      function Gb(e, t) {
        return e == null ? e : vs(e, H(t, 3), ft);
      }
      function Hb(e, t) {
        return e == null ? e : Nl(e, H(t, 3), ft);
      }
      function Kb(e, t) {
        return e && Ut(e, H(t, 3));
      }
      function Yb(e, t) {
        return e && gs(e, H(t, 3));
      }
      function Vb(e) {
        return e == null ? [] : Di(e, Ge(e));
      }
      function Zb(e) {
        return e == null ? [] : Di(e, ft(e));
      }
      function Ks(e, t, a) {
        var s = e == null ? i : On(e, t);
        return s === i ? a : s;
      }
      function Jb(e, t) {
        return e != null && Rd(e, t, bh);
      }
      function Ys(e, t) {
        return e != null && Rd(e, t, mh);
      }
      var Xb = hd(function(e, t, a) {
        t != null && typeof t.toString != "function" && (t = Ei.call(t)), e[t] = a;
      }, Zs(pt)), Qb = hd(function(e, t, a) {
        t != null && typeof t.toString != "function" && (t = Ei.call(t)), be.call(e, t) ? e[t].push(a) : e[t] = [a];
      }, H), em = se(Nr);
      function Ge(e) {
        return ut(e) ? Ml(e) : ys(e);
      }
      function ft(e) {
        return ut(e) ? Ml(e, !0) : Sh(e);
      }
      function tm(e, t) {
        var a = {};
        return t = H(t, 3), Ut(e, function(s, c, f) {
          en(a, t(s, c, f), s);
        }), a;
      }
      function nm(e, t) {
        var a = {};
        return t = H(t, 3), Ut(e, function(s, c, f) {
          en(a, c, t(s, c, f));
        }), a;
      }
      var rm = ar(function(e, t, a) {
        Wi(e, t, a);
      }), su = ar(function(e, t, a, s) {
        Wi(e, t, a, s);
      }), im = nn(function(e, t) {
        var a = {};
        if (e == null)
          return a;
        var s = !1;
        t = Ee(t, function(f) {
          return f = mn(f, e), s || (s = f.length > 1), f;
        }), qt(e, Ps(e), a), s && (a = $t(a, h | R | P, Xh));
        for (var c = t.length; c--; )
          Rs(a, t[c]);
        return a;
      });
      function am(e, t) {
        return ou(e, na(H(t)));
      }
      var sm = nn(function(e, t) {
        return e == null ? {} : Ph(e, t);
      });
      function ou(e, t) {
        if (e == null)
          return {};
        var a = Ee(Ps(e), function(s) {
          return [s];
        });
        return t = H(t), Xl(e, a, function(s, c) {
          return t(s, c[0]);
        });
      }
      function om(e, t, a) {
        t = mn(t, e);
        var s = -1, c = t.length;
        for (c || (c = 1, e = i); ++s < c; ) {
          var f = e == null ? i : e[Gt(t[s])];
          f === i && (s = c, f = a), e = an(f) ? f.call(e) : f;
        }
        return e;
      }
      function cm(e, t, a) {
        return e == null ? e : qr(e, t, a);
      }
      function lm(e, t, a, s) {
        return s = typeof s == "function" ? s : i, e == null ? e : qr(e, t, a, s);
      }
      var cu = bd(Ge), lu = bd(ft);
      function dm(e, t, a) {
        var s = ee(e), c = s || Cn(e) || cr(e);
        if (t = H(t, 4), a == null) {
          var f = e && e.constructor;
          c ? a = s ? new f() : [] : Te(e) ? a = an(f) ? ir(Ti(e)) : {} : a = {};
        }
        return (c ? kt : Ut)(e, function(A, b, C) {
          return t(a, A, b, C);
        }), a;
      }
      function um(e, t) {
        return e == null ? !0 : Rs(e, t);
      }
      function fm(e, t, a) {
        return e == null ? e : rd(e, t, Is(a));
      }
      function pm(e, t, a, s) {
        return s = typeof s == "function" ? s : i, e == null ? e : rd(e, t, Is(a), s);
      }
      function lr(e) {
        return e == null ? [] : ss(e, Ge(e));
      }
      function vm(e) {
        return e == null ? [] : ss(e, ft(e));
      }
      function gm(e, t, a) {
        return a === i && (a = t, t = i), a !== i && (a = Ot(a), a = a === a ? a : 0), t !== i && (t = Ot(t), t = t === t ? t : 0), Sn(Ot(e), t, a);
      }
      function Am(e, t, a) {
        return t = sn(t), a === i ? (a = t, t = 0) : a = sn(a), e = Ot(e), wh(e, t, a);
      }
      function hm(e, t, a) {
        if (a && typeof a != "boolean" && st(e, t, a) && (t = a = i), a === i && (typeof t == "boolean" ? (a = t, t = i) : typeof e == "boolean" && (a = e, e = i)), e === i && t === i ? (e = 0, t = 1) : (e = sn(e), t === i ? (t = e, e = 0) : t = sn(t)), e > t) {
          var s = e;
          e = t, t = s;
        }
        if (a || e % 1 || t % 1) {
          var c = Pl();
          return nt(e + c * (t - e + Vg("1e-" + ((c + "").length - 1))), t);
        }
        return ws(e, t);
      }
      var _m = sr(function(e, t, a) {
        return t = t.toLowerCase(), e + (a ? du(t) : t);
      });
      function du(e) {
        return Vs(_e(e).toLowerCase());
      }
      function uu(e) {
        return e = _e(e), e && e.replace(lt, cA).replace(Bg, "");
      }
      function ym(e, t, a) {
        e = _e(e), t = _t(t);
        var s = e.length;
        a = a === i ? s : Sn(re(a), 0, s);
        var c = a;
        return a -= t.length, a >= 0 && e.slice(a, c) == t;
      }
      function bm(e) {
        return e = _e(e), e && za.test(e) ? e.replace(Yn, lA) : e;
      }
      function mm(e) {
        return e = _e(e), e && yi.test(e) ? e.replace(Vn, "\\$&") : e;
      }
      var wm = sr(function(e, t, a) {
        return e + (a ? "-" : "") + t.toLowerCase();
      }), Cm = sr(function(e, t, a) {
        return e + (a ? " " : "") + t.toLowerCase();
      }), xm = vd("toLowerCase");
      function Rm(e, t, a) {
        e = _e(e), t = re(t);
        var s = t ? Qn(e) : 0;
        if (!t || s >= t)
          return e;
        var c = (t - s) / 2;
        return Ki(Fi(c), a) + e + Ki(Pi(c), a);
      }
      function km(e, t, a) {
        e = _e(e), t = re(t);
        var s = t ? Qn(e) : 0;
        return t && s < t ? e + Ki(t - s, a) : e;
      }
      function Em(e, t, a) {
        e = _e(e), t = re(t);
        var s = t ? Qn(e) : 0;
        return t && s < t ? Ki(t - s, a) + e : e;
      }
      function Im(e, t, a) {
        return a || t == null ? t = 0 : t && (t = +t), MA(_e(e).replace(Or, ""), t || 0);
      }
      function $m(e, t, a) {
        return (a ? st(e, t, a) : t === i) ? t = 1 : t = re(t), Cs(_e(e), t);
      }
      function Tm() {
        var e = arguments, t = _e(e[0]);
        return e.length < 3 ? t : t.replace(e[1], e[2]);
      }
      var Sm = sr(function(e, t, a) {
        return e + (a ? "_" : "") + t.toLowerCase();
      });
      function Om(e, t, a) {
        return a && typeof a != "number" && st(e, t, a) && (t = a = i), a = a === i ? et : a >>> 0, a ? (e = _e(e), e && (typeof t == "string" || t != null && !Hs(t)) && (t = _t(t), !t && Xn(e)) ? wn(jt(e), 0, a) : e.split(t, a)) : [];
      }
      var Pm = sr(function(e, t, a) {
        return e + (a ? " " : "") + Vs(t);
      });
      function Fm(e, t, a) {
        return e = _e(e), a = a == null ? 0 : Sn(re(a), 0, e.length), t = _t(t), e.slice(a, a + t.length) == t;
      }
      function Mm(e, t, a) {
        var s = u.templateSettings;
        a && st(e, t, a) && (t = i), e = _e(e), t = aa({}, t, s, md);
        var c = aa({}, t.imports, s.imports, md), f = Ge(c), A = ss(c, f), b, C, E = 0, I = t.interpolate || zt, T = "__p += '", j = cs(
          (t.escape || zt).source + "|" + I.source + "|" + (I === Sr ? pe : zt).source + "|" + (t.evaluate || zt).source + "|$",
          "g"
        ), q = "//# sourceURL=" + (be.call(t, "sourceURL") ? (t.sourceURL + "").replace(/\s/g, " ") : "lodash.templateSources[" + ++qg + "]") + `
`;
        e.replace(j, function(Y, le, fe, bt, ot, mt) {
          return fe || (fe = bt), T += e.slice(E, mt).replace(Jt, dA), le && (b = !0, T += `' +
__e(` + le + `) +
'`), ot && (C = !0, T += `';
` + ot + `;
__p += '`), fe && (T += `' +
((__t = (` + fe + `)) == null ? '' : __t) +
'`), E = mt + Y.length, Y;
        }), T += `';
`;
        var K = be.call(t, "variable") && t.variable;
        if (!K)
          T = `with (obj) {
` + T + `
}
`;
        else if (B.test(K))
          throw new Q(g);
        T = (C ? T.replace(Tr, "") : T).replace(gi, "$1").replace(vn, "$1;"), T = "function(" + (K || "obj") + `) {
` + (K ? "" : `obj || (obj = {});
`) + "var __t, __p = ''" + (b ? ", __e = _.escape" : "") + (C ? `, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
` : `;
`) + T + `return __p
}`;
        var ie = pu(function() {
          return ge(f, q + "return " + T).apply(i, A);
        });
        if (ie.source = T, Gs(ie))
          throw ie;
        return ie;
      }
      function Lm(e) {
        return _e(e).toLowerCase();
      }
      function zm(e) {
        return _e(e).toUpperCase();
      }
      function jm(e, t, a) {
        if (e = _e(e), e && (a || t === i))
          return wl(e);
        if (!e || !(t = _t(t)))
          return e;
        var s = jt(e), c = jt(t), f = Cl(s, c), A = xl(s, c) + 1;
        return wn(s, f, A).join("");
      }
      function Bm(e, t, a) {
        if (e = _e(e), e && (a || t === i))
          return e.slice(0, kl(e) + 1);
        if (!e || !(t = _t(t)))
          return e;
        var s = jt(e), c = xl(s, jt(t)) + 1;
        return wn(s, 0, c).join("");
      }
      function Dm(e, t, a) {
        if (e = _e(e), e && (a || t === i))
          return e.replace(Or, "");
        if (!e || !(t = _t(t)))
          return e;
        var s = jt(e), c = Cl(s, jt(t));
        return wn(s, c).join("");
      }
      function Wm(e, t) {
        var a = Se, s = Ne;
        if (Te(t)) {
          var c = "separator" in t ? t.separator : c;
          a = "length" in t ? re(t.length) : a, s = "omission" in t ? _t(t.omission) : s;
        }
        e = _e(e);
        var f = e.length;
        if (Xn(e)) {
          var A = jt(e);
          f = A.length;
        }
        if (a >= f)
          return e;
        var b = a - Qn(s);
        if (b < 1)
          return s;
        var C = A ? wn(A, 0, b).join("") : e.slice(0, b);
        if (c === i)
          return C + s;
        if (A && (b += C.length - b), Hs(c)) {
          if (e.slice(b).search(c)) {
            var E, I = C;
            for (c.global || (c = cs(c.source, _e(he.exec(c)) + "g")), c.lastIndex = 0; E = c.exec(I); )
              var T = E.index;
            C = C.slice(0, T === i ? b : T);
          }
        } else if (e.indexOf(_t(c), b) != b) {
          var j = C.lastIndexOf(c);
          j > -1 && (C = C.slice(0, j));
        }
        return C + s;
      }
      function Nm(e) {
        return e = _e(e), e && Ai.test(e) ? e.replace(Kn, hA) : e;
      }
      var Um = sr(function(e, t, a) {
        return e + (a ? " " : "") + t.toUpperCase();
      }), Vs = vd("toUpperCase");
      function fu(e, t, a) {
        return e = _e(e), t = a ? i : t, t === i ? fA(e) ? bA(e) : rA(e) : e.match(t) || [];
      }
      var pu = se(function(e, t) {
        try {
          return At(e, i, t);
        } catch (a) {
          return Gs(a) ? a : new Q(a);
        }
      }), qm = nn(function(e, t) {
        return kt(t, function(a) {
          a = Gt(a), en(e, a, Us(e[a], e));
        }), e;
      });
      function Gm(e) {
        var t = e == null ? 0 : e.length, a = H();
        return e = t ? Ee(e, function(s) {
          if (typeof s[1] != "function")
            throw new Et(p);
          return [a(s[0]), s[1]];
        }) : [], se(function(s) {
          for (var c = -1; ++c < t; ) {
            var f = e[c];
            if (At(f[0], this, s))
              return At(f[1], this, s);
          }
        });
      }
      function Hm(e) {
        return hh($t(e, h));
      }
      function Zs(e) {
        return function() {
          return e;
        };
      }
      function Km(e, t) {
        return e == null || e !== e ? t : e;
      }
      var Ym = Ad(), Vm = Ad(!0);
      function pt(e) {
        return e;
      }
      function Js(e) {
        return Hl(typeof e == "function" ? e : $t(e, h));
      }
      function Zm(e) {
        return Yl($t(e, h));
      }
      function Jm(e, t) {
        return Vl(e, $t(t, h));
      }
      var Xm = se(function(e, t) {
        return function(a) {
          return Nr(a, e, t);
        };
      }), Qm = se(function(e, t) {
        return function(a) {
          return Nr(e, a, t);
        };
      });
      function Xs(e, t, a) {
        var s = Ge(t), c = Di(t, s);
        a == null && !(Te(t) && (c.length || !s.length)) && (a = t, t = e, e = this, c = Di(t, Ge(t)));
        var f = !(Te(a) && "chain" in a) || !!a.chain, A = an(e);
        return kt(c, function(b) {
          var C = t[b];
          e[b] = C, A && (e.prototype[b] = function() {
            var E = this.__chain__;
            if (f || E) {
              var I = e(this.__wrapped__), T = I.__actions__ = dt(this.__actions__);
              return T.push({ func: C, args: arguments, thisArg: e }), I.__chain__ = E, I;
            }
            return C.apply(e, An([this.value()], arguments));
          });
        }), e;
      }
      function ew() {
        return Ve._ === this && (Ve._ = kA), this;
      }
      function Qs() {
      }
      function tw(e) {
        return e = re(e), se(function(t) {
          return Zl(t, e);
        });
      }
      var nw = Ts(Ee), rw = Ts(hl), iw = Ts(ts);
      function vu(e) {
        return zs(e) ? ns(Gt(e)) : Fh(e);
      }
      function aw(e) {
        return function(t) {
          return e == null ? i : On(e, t);
        };
      }
      var sw = _d(), ow = _d(!0);
      function eo() {
        return [];
      }
      function to() {
        return !1;
      }
      function cw() {
        return {};
      }
      function lw() {
        return "";
      }
      function dw() {
        return !0;
      }
      function uw(e, t) {
        if (e = re(e), e < 1 || e > Qe)
          return [];
        var a = et, s = nt(e, et);
        t = H(t), e -= et;
        for (var c = as(s, t); ++a < e; )
          t(a);
        return c;
      }
      function fw(e) {
        return ee(e) ? Ee(e, Gt) : yt(e) ? [e] : dt(Fd(_e(e)));
      }
      function pw(e) {
        var t = ++xA;
        return _e(e) + t;
      }
      var vw = Hi(function(e, t) {
        return e + t;
      }, 0), gw = Ss("ceil"), Aw = Hi(function(e, t) {
        return e / t;
      }, 1), hw = Ss("floor");
      function _w(e) {
        return e && e.length ? Bi(e, pt, As) : i;
      }
      function yw(e, t) {
        return e && e.length ? Bi(e, H(t, 2), As) : i;
      }
      function bw(e) {
        return bl(e, pt);
      }
      function mw(e, t) {
        return bl(e, H(t, 2));
      }
      function ww(e) {
        return e && e.length ? Bi(e, pt, bs) : i;
      }
      function Cw(e, t) {
        return e && e.length ? Bi(e, H(t, 2), bs) : i;
      }
      var xw = Hi(function(e, t) {
        return e * t;
      }, 1), Rw = Ss("round"), kw = Hi(function(e, t) {
        return e - t;
      }, 0);
      function Ew(e) {
        return e && e.length ? is(e, pt) : 0;
      }
      function Iw(e, t) {
        return e && e.length ? is(e, H(t, 2)) : 0;
      }
      return u.after = Zy, u.ary = Gd, u.assign = zb, u.assignIn = au, u.assignInWith = aa, u.assignWith = jb, u.at = Bb, u.before = Hd, u.bind = Us, u.bindAll = qm, u.bindKey = Kd, u.castArray = cb, u.chain = Nd, u.chunk = h_, u.compact = __, u.concat = y_, u.cond = Gm, u.conforms = Hm, u.constant = Zs, u.countBy = Ey, u.create = Db, u.curry = Yd, u.curryRight = Vd, u.debounce = Zd, u.defaults = Wb, u.defaultsDeep = Nb, u.defer = Jy, u.delay = Xy, u.difference = b_, u.differenceBy = m_, u.differenceWith = w_, u.drop = C_, u.dropRight = x_, u.dropRightWhile = R_, u.dropWhile = k_, u.fill = E_, u.filter = $y, u.flatMap = Oy, u.flatMapDeep = Py, u.flatMapDepth = Fy, u.flatten = jd, u.flattenDeep = I_, u.flattenDepth = $_, u.flip = Qy, u.flow = Ym, u.flowRight = Vm, u.fromPairs = T_, u.functions = Vb, u.functionsIn = Zb, u.groupBy = My, u.initial = O_, u.intersection = P_, u.intersectionBy = F_, u.intersectionWith = M_, u.invert = Xb, u.invertBy = Qb, u.invokeMap = zy, u.iteratee = Js, u.keyBy = jy, u.keys = Ge, u.keysIn = ft, u.map = Qi, u.mapKeys = tm, u.mapValues = nm, u.matches = Zm, u.matchesProperty = Jm, u.memoize = ta, u.merge = rm, u.mergeWith = su, u.method = Xm, u.methodOf = Qm, u.mixin = Xs, u.negate = na, u.nthArg = tw, u.omit = im, u.omitBy = am, u.once = eb, u.orderBy = By, u.over = nw, u.overArgs = tb, u.overEvery = rw, u.overSome = iw, u.partial = qs, u.partialRight = Jd, u.partition = Dy, u.pick = sm, u.pickBy = ou, u.property = vu, u.propertyOf = aw, u.pull = B_, u.pullAll = Dd, u.pullAllBy = D_, u.pullAllWith = W_, u.pullAt = N_, u.range = sw, u.rangeRight = ow, u.rearg = nb, u.reject = Uy, u.remove = U_, u.rest = rb, u.reverse = Ws, u.sampleSize = Gy, u.set = cm, u.setWith = lm, u.shuffle = Hy, u.slice = q_, u.sortBy = Vy, u.sortedUniq = J_, u.sortedUniqBy = X_, u.split = Om, u.spread = ib, u.tail = Q_, u.take = ey, u.takeRight = ty, u.takeRightWhile = ny, u.takeWhile = ry, u.tap = _y, u.throttle = ab, u.thru = Xi, u.toArray = nu, u.toPairs = cu, u.toPairsIn = lu, u.toPath = fw, u.toPlainObject = iu, u.transform = dm, u.unary = sb, u.union = iy, u.unionBy = ay, u.unionWith = sy, u.uniq = oy, u.uniqBy = cy, u.uniqWith = ly, u.unset = um, u.unzip = Ns, u.unzipWith = Wd, u.update = fm, u.updateWith = pm, u.values = lr, u.valuesIn = vm, u.without = dy, u.words = fu, u.wrap = ob, u.xor = uy, u.xorBy = fy, u.xorWith = py, u.zip = vy, u.zipObject = gy, u.zipObjectDeep = Ay, u.zipWith = hy, u.entries = cu, u.entriesIn = lu, u.extend = au, u.extendWith = aa, Xs(u, u), u.add = vw, u.attempt = pu, u.camelCase = _m, u.capitalize = du, u.ceil = gw, u.clamp = gm, u.clone = lb, u.cloneDeep = ub, u.cloneDeepWith = fb, u.cloneWith = db, u.conformsTo = pb, u.deburr = uu, u.defaultTo = Km, u.divide = Aw, u.endsWith = ym, u.eq = Dt, u.escape = bm, u.escapeRegExp = mm, u.every = Iy, u.find = Ty, u.findIndex = Ld, u.findKey = Ub, u.findLast = Sy, u.findLastIndex = zd, u.findLastKey = qb, u.floor = hw, u.forEach = Ud, u.forEachRight = qd, u.forIn = Gb, u.forInRight = Hb, u.forOwn = Kb, u.forOwnRight = Yb, u.get = Ks, u.gt = vb, u.gte = gb, u.has = Jb, u.hasIn = Ys, u.head = Bd, u.identity = pt, u.includes = Ly, u.indexOf = S_, u.inRange = Am, u.invoke = em, u.isArguments = Mn, u.isArray = ee, u.isArrayBuffer = Ab, u.isArrayLike = ut, u.isArrayLikeObject = Me, u.isBoolean = hb, u.isBuffer = Cn, u.isDate = _b, u.isElement = yb, u.isEmpty = bb, u.isEqual = mb, u.isEqualWith = wb, u.isError = Gs, u.isFinite = Cb, u.isFunction = an, u.isInteger = Xd, u.isLength = ra, u.isMap = Qd, u.isMatch = xb, u.isMatchWith = Rb, u.isNaN = kb, u.isNative = Eb, u.isNil = $b, u.isNull = Ib, u.isNumber = eu, u.isObject = Te, u.isObjectLike = Fe, u.isPlainObject = Yr, u.isRegExp = Hs, u.isSafeInteger = Tb, u.isSet = tu, u.isString = ia, u.isSymbol = yt, u.isTypedArray = cr, u.isUndefined = Sb, u.isWeakMap = Ob, u.isWeakSet = Pb, u.join = L_, u.kebabCase = wm, u.last = St, u.lastIndexOf = z_, u.lowerCase = Cm, u.lowerFirst = xm, u.lt = Fb, u.lte = Mb, u.max = _w, u.maxBy = yw, u.mean = bw, u.meanBy = mw, u.min = ww, u.minBy = Cw, u.stubArray = eo, u.stubFalse = to, u.stubObject = cw, u.stubString = lw, u.stubTrue = dw, u.multiply = xw, u.nth = j_, u.noConflict = ew, u.noop = Qs, u.now = ea, u.pad = Rm, u.padEnd = km, u.padStart = Em, u.parseInt = Im, u.random = hm, u.reduce = Wy, u.reduceRight = Ny, u.repeat = $m, u.replace = Tm, u.result = om, u.round = Rw, u.runInContext = w, u.sample = qy, u.size = Ky, u.snakeCase = Sm, u.some = Yy, u.sortedIndex = G_, u.sortedIndexBy = H_, u.sortedIndexOf = K_, u.sortedLastIndex = Y_, u.sortedLastIndexBy = V_, u.sortedLastIndexOf = Z_, u.startCase = Pm, u.startsWith = Fm, u.subtract = kw, u.sum = Ew, u.sumBy = Iw, u.template = Mm, u.times = uw, u.toFinite = sn, u.toInteger = re, u.toLength = ru, u.toLower = Lm, u.toNumber = Ot, u.toSafeInteger = Lb, u.toString = _e, u.toUpper = zm, u.trim = jm, u.trimEnd = Bm, u.trimStart = Dm, u.truncate = Wm, u.unescape = Nm, u.uniqueId = pw, u.upperCase = Um, u.upperFirst = Vs, u.each = Ud, u.eachRight = qd, u.first = Bd, Xs(u, (function() {
        var e = {};
        return Ut(u, function(t, a) {
          be.call(u.prototype, a) || (e[a] = t);
        }), e;
      })(), { chain: !1 }), u.VERSION = o, kt(["bind", "bindKey", "curry", "curryRight", "partial", "partialRight"], function(e) {
        u[e].placeholder = u;
      }), kt(["drop", "take"], function(e, t) {
        ue.prototype[e] = function(a) {
          a = a === i ? 1 : De(re(a), 0);
          var s = this.__filtered__ && !t ? new ue(this) : this.clone();
          return s.__filtered__ ? s.__takeCount__ = nt(a, s.__takeCount__) : s.__views__.push({
            size: nt(a, et),
            type: e + (s.__dir__ < 0 ? "Right" : "")
          }), s;
        }, ue.prototype[e + "Right"] = function(a) {
          return this.reverse()[e](a).reverse();
        };
      }), kt(["filter", "map", "takeWhile"], function(e, t) {
        var a = t + 1, s = a == Ie || a == Lt;
        ue.prototype[e] = function(c) {
          var f = this.clone();
          return f.__iteratees__.push({
            iteratee: H(c, 3),
            type: a
          }), f.__filtered__ = f.__filtered__ || s, f;
        };
      }), kt(["head", "last"], function(e, t) {
        var a = "take" + (t ? "Right" : "");
        ue.prototype[e] = function() {
          return this[a](1).value()[0];
        };
      }), kt(["initial", "tail"], function(e, t) {
        var a = "drop" + (t ? "" : "Right");
        ue.prototype[e] = function() {
          return this.__filtered__ ? new ue(this) : this[a](1);
        };
      }), ue.prototype.compact = function() {
        return this.filter(pt);
      }, ue.prototype.find = function(e) {
        return this.filter(e).head();
      }, ue.prototype.findLast = function(e) {
        return this.reverse().find(e);
      }, ue.prototype.invokeMap = se(function(e, t) {
        return typeof e == "function" ? new ue(this) : this.map(function(a) {
          return Nr(a, e, t);
        });
      }), ue.prototype.reject = function(e) {
        return this.filter(na(H(e)));
      }, ue.prototype.slice = function(e, t) {
        e = re(e);
        var a = this;
        return a.__filtered__ && (e > 0 || t < 0) ? new ue(a) : (e < 0 ? a = a.takeRight(-e) : e && (a = a.drop(e)), t !== i && (t = re(t), a = t < 0 ? a.dropRight(-t) : a.take(t - e)), a);
      }, ue.prototype.takeRightWhile = function(e) {
        return this.reverse().takeWhile(e).reverse();
      }, ue.prototype.toArray = function() {
        return this.take(et);
      }, Ut(ue.prototype, function(e, t) {
        var a = /^(?:filter|find|map|reject)|While$/.test(t), s = /^(?:head|last)$/.test(t), c = u[s ? "take" + (t == "last" ? "Right" : "") : t], f = s || /^find/.test(t);
        c && (u.prototype[t] = function() {
          var A = this.__wrapped__, b = s ? [1] : arguments, C = A instanceof ue, E = b[0], I = C || ee(A), T = function(le) {
            var fe = c.apply(u, An([le], b));
            return s && j ? fe[0] : fe;
          };
          I && a && typeof E == "function" && E.length != 1 && (C = I = !1);
          var j = this.__chain__, q = !!this.__actions__.length, K = f && !j, ie = C && !q;
          if (!f && I) {
            A = ie ? A : new ue(this);
            var Y = e.apply(A, b);
            return Y.__actions__.push({ func: Xi, args: [T], thisArg: i }), new It(Y, j);
          }
          return K && ie ? e.apply(this, b) : (Y = this.thru(T), K ? s ? Y.value()[0] : Y.value() : Y);
        });
      }), kt(["pop", "push", "shift", "sort", "splice", "unshift"], function(e) {
        var t = xi[e], a = /^(?:push|sort|unshift)$/.test(e) ? "tap" : "thru", s = /^(?:pop|shift)$/.test(e);
        u.prototype[e] = function() {
          var c = arguments;
          if (s && !this.__chain__) {
            var f = this.value();
            return t.apply(ee(f) ? f : [], c);
          }
          return this[a](function(A) {
            return t.apply(ee(A) ? A : [], c);
          });
        };
      }), Ut(ue.prototype, function(e, t) {
        var a = u[t];
        if (a) {
          var s = a.name + "";
          be.call(rr, s) || (rr[s] = []), rr[s].push({ name: t, func: a });
        }
      }), rr[Gi(i, F).name] = [{
        name: "wrapper",
        func: i
      }], ue.prototype.clone = NA, ue.prototype.reverse = UA, ue.prototype.value = qA, u.prototype.at = yy, u.prototype.chain = by, u.prototype.commit = my, u.prototype.next = wy, u.prototype.plant = xy, u.prototype.reverse = Ry, u.prototype.toJSON = u.prototype.valueOf = u.prototype.value = ky, u.prototype.first = u.prototype.head, Mr && (u.prototype[Mr] = Cy), u;
    }), er = mA();
    En ? ((En.exports = er)._ = er, Ja._ = er) : Ve._ = er;
  }).call(cn);
})(Iu, Iu.exports);
var jn = { exports: {} };
(function(n, r) {
  var i = typeof Reflect < "u" ? Reflect.construct : void 0, o = Object.defineProperty, l = Error.captureStackTrace;
  l === void 0 && (l = function(m) {
    var y = new Error();
    o(m, "stack", {
      configurable: !0,
      get: function() {
        var R = y.stack;
        return o(this, "stack", {
          configurable: !0,
          value: R,
          writable: !0
        }), R;
      },
      set: function(R) {
        o(m, "stack", {
          configurable: !0,
          value: R,
          writable: !0
        });
      }
    });
  });
  function d(v) {
    v !== void 0 && o(this, "message", {
      configurable: !0,
      value: v,
      writable: !0
    });
    var m = this.constructor.name;
    m !== void 0 && m !== this.name && o(this, "name", {
      configurable: !0,
      value: m,
      writable: !0
    }), l(this, this.constructor);
  }
  d.prototype = Object.create(Error.prototype, {
    // See: https://github.com/JsCommunity/make-error/issues/4
    constructor: {
      configurable: !0,
      value: d,
      writable: !0
    }
  });
  var p = (function() {
    function v(y, h) {
      return o(y, "name", {
        configurable: !0,
        value: h
      });
    }
    try {
      var m = function() {
      };
      if (v(m, "foo"), m.name === "foo")
        return v;
    } catch {
    }
  })();
  function g(v, m) {
    if (m == null || m === Error)
      m = d;
    else if (typeof m != "function")
      throw new TypeError("super_ should be a function");
    var y;
    if (typeof v == "string")
      y = v, v = i !== void 0 ? function() {
        return i(m, arguments, this.constructor);
      } : function() {
        m.apply(this, arguments);
      }, p !== void 0 && (p(v, y), y = void 0);
    else if (typeof v != "function")
      throw new TypeError("constructor should be either a string or a function");
    v.super_ = v.super = m;
    var h = {
      constructor: {
        configurable: !0,
        value: v,
        writable: !0
      }
    };
    return y !== void 0 && (h.name = {
      configurable: !0,
      value: y,
      writable: !0
    }), v.prototype = Object.create(m.prototype, h), v;
  }
  r = n.exports = g, r.BaseError = d;
})(jn, jn.exports);
class nz extends jn.exports.BaseError {
  constructor() {
    super("The browser you are using isn't compatible with this application, or HTTPS is not being used on a non-localhost domain.");
  }
}
class rz extends jn.exports.BaseError {
  constructor(r, i, o) {
    super(`Could not fetch web worker from ${r}`), this.url = r, this.response = i, this.originalError = o ?? null;
  }
}
class iz extends jn.exports.BaseError {
  constructor() {
    super("Invalid input passed");
  }
}
class az extends jn.exports.BaseError {
  constructor(r) {
    super("Invalid mime type found on asset"), this.mimeType = r;
  }
}
class sz extends jn.exports.BaseError {
  constructor(r, i, o) {
    super(`Could not fetch resource from ${r}`), this.url = r, this.response = i, this.originalError = o ?? null;
  }
}
ln("c2pa:Validator");
function Vw() {
  this.__data__ = [], this.size = 0;
}
var Zw = Vw;
function Jw(n, r) {
  return n === r || n !== n && r !== r;
}
var si = Jw, Xw = si;
function Qw(n, r) {
  for (var i = n.length; i--; )
    if (Xw(n[i][0], r))
      return i;
  return -1;
}
var ha = Qw, e2 = ha, t2 = Array.prototype, n2 = t2.splice;
function r2(n) {
  var r = this.__data__, i = e2(r, n);
  if (i < 0)
    return !1;
  var o = r.length - 1;
  return i == o ? r.pop() : n2.call(r, i, 1), --this.size, !0;
}
var i2 = r2, a2 = ha;
function s2(n) {
  var r = this.__data__, i = a2(r, n);
  return i < 0 ? void 0 : r[i][1];
}
var o2 = s2, c2 = ha;
function l2(n) {
  return c2(this.__data__, n) > -1;
}
var d2 = l2, u2 = ha;
function f2(n, r) {
  var i = this.__data__, o = u2(i, n);
  return o < 0 ? (++this.size, i.push([n, r])) : i[o][1] = r, this;
}
var p2 = f2, v2 = Zw, g2 = i2, A2 = o2, h2 = d2, _2 = p2;
function fr(n) {
  var r = -1, i = n == null ? 0 : n.length;
  for (this.clear(); ++r < i; ) {
    var o = n[r];
    this.set(o[0], o[1]);
  }
}
fr.prototype.clear = v2;
fr.prototype.delete = g2;
fr.prototype.get = A2;
fr.prototype.has = h2;
fr.prototype.set = _2;
var _a = fr, y2 = _a;
function b2() {
  this.__data__ = new y2(), this.size = 0;
}
var m2 = b2;
function w2(n) {
  var r = this.__data__, i = r.delete(n);
  return this.size = r.size, i;
}
var C2 = w2;
function x2(n) {
  return this.__data__.get(n);
}
var R2 = x2;
function k2(n) {
  return this.__data__.has(n);
}
var E2 = k2, I2 = typeof cn == "object" && cn && cn.Object === Object && cn, Gp = I2, $2 = Gp, T2 = typeof self == "object" && self && self.Object === Object && self, S2 = $2 || T2 || Function("return this")(), vt = S2, ao, $u;
function pr() {
  if ($u) return ao;
  $u = 1;
  var n = vt, r = n.Symbol;
  return ao = r, ao;
}
var Tu = pr(), Hp = Object.prototype, O2 = Hp.hasOwnProperty, P2 = Hp.toString, Vr = Tu ? Tu.toStringTag : void 0;
function F2(n) {
  var r = O2.call(n, Vr), i = n[Vr];
  try {
    n[Vr] = void 0;
    var o = !0;
  } catch {
  }
  var l = P2.call(n);
  return o && (r ? n[Vr] = i : delete n[Vr]), l;
}
var M2 = F2, L2 = Object.prototype, z2 = L2.toString;
function j2(n) {
  return z2.call(n);
}
var B2 = j2, Su = pr(), D2 = M2, W2 = B2, N2 = "[object Null]", U2 = "[object Undefined]", Ou = Su ? Su.toStringTag : void 0;
function q2(n) {
  return n == null ? n === void 0 ? U2 : N2 : Ou && Ou in Object(n) ? D2(n) : W2(n);
}
var Dn = q2;
function G2(n) {
  var r = typeof n;
  return n != null && (r == "object" || r == "function");
}
var Nt = G2, H2 = Dn, K2 = Nt, Y2 = "[object AsyncFunction]", V2 = "[object Function]", Z2 = "[object GeneratorFunction]", J2 = "[object Proxy]";
function X2(n) {
  if (!K2(n))
    return !1;
  var r = H2(n);
  return r == V2 || r == Z2 || r == Y2 || r == J2;
}
var ya = X2, Q2 = vt, e1 = Q2["__core-js_shared__"], t1 = e1, so = t1, Pu = (function() {
  var n = /[^.]+$/.exec(so && so.keys && so.keys.IE_PROTO || "");
  return n ? "Symbol(src)_1." + n : "";
})();
function n1(n) {
  return !!Pu && Pu in n;
}
var r1 = n1, i1 = Function.prototype, a1 = i1.toString;
function s1(n) {
  if (n != null) {
    try {
      return a1.call(n);
    } catch {
    }
    try {
      return n + "";
    } catch {
    }
  }
  return "";
}
var Kp = s1, o1 = ya, c1 = r1, l1 = Nt, d1 = Kp, u1 = /[\\^$.*+?()[\]{}|]/g, f1 = /^\[object .+?Constructor\]$/, p1 = Function.prototype, v1 = Object.prototype, g1 = p1.toString, A1 = v1.hasOwnProperty, h1 = RegExp(
  "^" + g1.call(A1).replace(u1, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function _1(n) {
  if (!l1(n) || c1(n))
    return !1;
  var r = o1(n) ? h1 : f1;
  return r.test(d1(n));
}
var y1 = _1;
function b1(n, r) {
  return n == null ? void 0 : n[r];
}
var m1 = b1, w1 = y1, C1 = m1;
function x1(n, r) {
  var i = C1(n, r);
  return w1(i) ? i : void 0;
}
var Wn = x1, R1 = Wn, k1 = vt, E1 = R1(k1, "Map"), mc = E1, I1 = Wn, $1 = I1(Object, "create"), ba = $1, Fu = ba;
function T1() {
  this.__data__ = Fu ? Fu(null) : {}, this.size = 0;
}
var S1 = T1;
function O1(n) {
  var r = this.has(n) && delete this.__data__[n];
  return this.size -= r ? 1 : 0, r;
}
var P1 = O1, F1 = ba, M1 = "__lodash_hash_undefined__", L1 = Object.prototype, z1 = L1.hasOwnProperty;
function j1(n) {
  var r = this.__data__;
  if (F1) {
    var i = r[n];
    return i === M1 ? void 0 : i;
  }
  return z1.call(r, n) ? r[n] : void 0;
}
var B1 = j1, D1 = ba, W1 = Object.prototype, N1 = W1.hasOwnProperty;
function U1(n) {
  var r = this.__data__;
  return D1 ? r[n] !== void 0 : N1.call(r, n);
}
var q1 = U1, G1 = ba, H1 = "__lodash_hash_undefined__";
function K1(n, r) {
  var i = this.__data__;
  return this.size += this.has(n) ? 0 : 1, i[n] = G1 && r === void 0 ? H1 : r, this;
}
var Y1 = K1, V1 = S1, Z1 = P1, J1 = B1, X1 = q1, Q1 = Y1;
function vr(n) {
  var r = -1, i = n == null ? 0 : n.length;
  for (this.clear(); ++r < i; ) {
    var o = n[r];
    this.set(o[0], o[1]);
  }
}
vr.prototype.clear = V1;
vr.prototype.delete = Z1;
vr.prototype.get = J1;
vr.prototype.has = X1;
vr.prototype.set = Q1;
var e0 = vr, Mu = e0, t0 = _a, n0 = mc;
function r0() {
  this.size = 0, this.__data__ = {
    hash: new Mu(),
    map: new (n0 || t0)(),
    string: new Mu()
  };
}
var i0 = r0;
function a0(n) {
  var r = typeof n;
  return r == "string" || r == "number" || r == "symbol" || r == "boolean" ? n !== "__proto__" : n === null;
}
var s0 = a0, o0 = s0;
function c0(n, r) {
  var i = n.__data__;
  return o0(r) ? i[typeof r == "string" ? "string" : "hash"] : i.map;
}
var ma = c0, l0 = ma;
function d0(n) {
  var r = l0(this, n).delete(n);
  return this.size -= r ? 1 : 0, r;
}
var u0 = d0, f0 = ma;
function p0(n) {
  return f0(this, n).get(n);
}
var v0 = p0, g0 = ma;
function A0(n) {
  return g0(this, n).has(n);
}
var h0 = A0, _0 = ma;
function y0(n, r) {
  var i = _0(this, n), o = i.size;
  return i.set(n, r), this.size += i.size == o ? 0 : 1, this;
}
var b0 = y0, m0 = i0, w0 = u0, C0 = v0, x0 = h0, R0 = b0;
function gr(n) {
  var r = -1, i = n == null ? 0 : n.length;
  for (this.clear(); ++r < i; ) {
    var o = n[r];
    this.set(o[0], o[1]);
  }
}
gr.prototype.clear = m0;
gr.prototype.delete = w0;
gr.prototype.get = C0;
gr.prototype.has = x0;
gr.prototype.set = R0;
var wc = gr, k0 = _a, E0 = mc, I0 = wc, $0 = 200;
function T0(n, r) {
  var i = this.__data__;
  if (i instanceof k0) {
    var o = i.__data__;
    if (!E0 || o.length < $0 - 1)
      return o.push([n, r]), this.size = ++i.size, this;
    i = this.__data__ = new I0(o);
  }
  return i.set(n, r), this.size = i.size, this;
}
var S0 = T0, O0 = _a, P0 = m2, F0 = C2, M0 = R2, L0 = E2, z0 = S0;
function Ar(n) {
  var r = this.__data__ = new O0(n);
  this.size = r.size;
}
Ar.prototype.clear = P0;
Ar.prototype.delete = F0;
Ar.prototype.get = M0;
Ar.prototype.has = L0;
Ar.prototype.set = z0;
var wa = Ar, j0 = Wn, B0 = (function() {
  try {
    var n = j0(Object, "defineProperty");
    return n({}, "", {}), n;
  } catch {
  }
})(), Yp = B0, Lu = Yp;
function D0(n, r, i) {
  r == "__proto__" && Lu ? Lu(n, r, {
    configurable: !0,
    enumerable: !0,
    value: i,
    writable: !0
  }) : n[r] = i;
}
var Ca = D0, W0 = Ca, N0 = si;
function U0(n, r, i) {
  (i !== void 0 && !N0(n[r], i) || i === void 0 && !(r in n)) && W0(n, r, i);
}
var Vp = U0;
function q0(n) {
  return function(r, i, o) {
    for (var l = -1, d = Object(r), p = o(r), g = p.length; g--; ) {
      var v = p[n ? g : ++l];
      if (i(d[v], v, d) === !1)
        break;
    }
    return r;
  };
}
var G0 = q0, H0 = G0, K0 = H0(), Zp = K0, ua = { exports: {} };
(function(n, r) {
  var i = vt, o = r && !r.nodeType && r, l = o && !0 && n && !n.nodeType && n, d = l && l.exports === o, p = d ? i.Buffer : void 0, g = p ? p.allocUnsafe : void 0;
  function v(m, y) {
    if (y)
      return m.slice();
    var h = m.length, R = g ? g(h) : new m.constructor(h);
    return m.copy(R), R;
  }
  n.exports = v;
})(ua, ua.exports);
var Y0 = vt, V0 = Y0.Uint8Array, Jp = V0, zu = Jp;
function Z0(n) {
  var r = new n.constructor(n.byteLength);
  return new zu(r).set(new zu(n)), r;
}
var Cc = Z0, J0 = Cc;
function X0(n, r) {
  var i = r ? J0(n.buffer) : n.buffer;
  return new n.constructor(i, n.byteOffset, n.length);
}
var Xp = X0;
function Q0(n, r) {
  var i = -1, o = n.length;
  for (r || (r = Array(o)); ++i < o; )
    r[i] = n[i];
  return r;
}
var oi = Q0, eC = Nt, ju = Object.create, tC = /* @__PURE__ */ (function() {
  function n() {
  }
  return function(r) {
    if (!eC(r))
      return {};
    if (ju)
      return ju(r);
    n.prototype = r;
    var i = new n();
    return n.prototype = void 0, i;
  };
})(), xa = tC;
function nC(n, r) {
  return function(i) {
    return n(r(i));
  };
}
var Qp = nC, rC = Qp, iC = rC(Object.getPrototypeOf, Object), xc = iC, aC = Object.prototype;
function sC(n) {
  var r = n && n.constructor, i = typeof r == "function" && r.prototype || aC;
  return n === i;
}
var Rc = sC, oC = xa, cC = xc, lC = Rc;
function dC(n) {
  return typeof n.constructor == "function" && !lC(n) ? oC(cC(n)) : {};
}
var ev = dC;
function uC(n) {
  return n != null && typeof n == "object";
}
var Mt = uC, fC = Dn, pC = Mt, vC = "[object Arguments]";
function gC(n) {
  return pC(n) && fC(n) == vC;
}
var AC = gC, Bu = AC, hC = Mt, tv = Object.prototype, _C = tv.hasOwnProperty, yC = tv.propertyIsEnumerable, bC = Bu(/* @__PURE__ */ (function() {
  return arguments;
})()) ? Bu : function(n) {
  return hC(n) && _C.call(n, "callee") && !yC.call(n, "callee");
}, Ra = bC, mC = Array.isArray, Xe = mC, wC = 9007199254740991;
function CC(n) {
  return typeof n == "number" && n > -1 && n % 1 == 0 && n <= wC;
}
var kc = CC, xC = ya, RC = kc;
function kC(n) {
  return n != null && RC(n.length) && !xC(n);
}
var hr = kC, EC = hr, IC = Mt;
function $C(n) {
  return IC(n) && EC(n);
}
var TC = $C, dr = { exports: {} };
function SC() {
  return !1;
}
var OC = SC;
(function(n, r) {
  var i = vt, o = OC, l = r && !r.nodeType && r, d = l && !0 && n && !n.nodeType && n, p = d && d.exports === l, g = p ? i.Buffer : void 0, v = g ? g.isBuffer : void 0, m = v || o;
  n.exports = m;
})(dr, dr.exports);
var PC = Dn, FC = xc, MC = Mt, LC = "[object Object]", zC = Function.prototype, jC = Object.prototype, nv = zC.toString, BC = jC.hasOwnProperty, DC = nv.call(Object);
function WC(n) {
  if (!MC(n) || PC(n) != LC)
    return !1;
  var r = FC(n);
  if (r === null)
    return !0;
  var i = BC.call(r, "constructor") && r.constructor;
  return typeof i == "function" && i instanceof i && nv.call(i) == DC;
}
var rv = WC, NC = Dn, UC = kc, qC = Mt, GC = "[object Arguments]", HC = "[object Array]", KC = "[object Boolean]", YC = "[object Date]", VC = "[object Error]", ZC = "[object Function]", JC = "[object Map]", XC = "[object Number]", QC = "[object Object]", ex = "[object RegExp]", tx = "[object Set]", nx = "[object String]", rx = "[object WeakMap]", ix = "[object ArrayBuffer]", ax = "[object DataView]", sx = "[object Float32Array]", ox = "[object Float64Array]", cx = "[object Int8Array]", lx = "[object Int16Array]", dx = "[object Int32Array]", ux = "[object Uint8Array]", fx = "[object Uint8ClampedArray]", px = "[object Uint16Array]", vx = "[object Uint32Array]", ke = {};
ke[sx] = ke[ox] = ke[cx] = ke[lx] = ke[dx] = ke[ux] = ke[fx] = ke[px] = ke[vx] = !0;
ke[GC] = ke[HC] = ke[ix] = ke[KC] = ke[ax] = ke[YC] = ke[VC] = ke[ZC] = ke[JC] = ke[XC] = ke[QC] = ke[ex] = ke[tx] = ke[nx] = ke[rx] = !1;
function gx(n) {
  return qC(n) && UC(n.length) && !!ke[NC(n)];
}
var Ax = gx, oo, Du;
function ka() {
  if (Du) return oo;
  Du = 1;
  function n(r) {
    return function(i) {
      return r(i);
    };
  }
  return oo = n, oo;
}
var ii = { exports: {} };
(function(n, r) {
  var i = Gp, o = r && !r.nodeType && r, l = o && !0 && n && !n.nodeType && n, d = l && l.exports === o, p = d && i.process, g = (function() {
    try {
      var v = l && l.require && l.require("util").types;
      return v || p && p.binding && p.binding("util");
    } catch {
    }
  })();
  n.exports = g;
})(ii, ii.exports);
var hx = Ax, _x = ka(), Wu = ii.exports, Nu = Wu && Wu.isTypedArray, yx = Nu ? _x(Nu) : hx, Ec = yx;
function bx(n, r) {
  if (!(r === "constructor" && typeof n[r] == "function") && r != "__proto__")
    return n[r];
}
var iv = bx, mx = Ca, wx = si, Cx = Object.prototype, xx = Cx.hasOwnProperty;
function Rx(n, r, i) {
  var o = n[r];
  (!(xx.call(n, r) && wx(o, i)) || i === void 0 && !(r in n)) && mx(n, r, i);
}
var av = Rx, kx = av, Ex = Ca;
function Ix(n, r, i, o) {
  var l = !i;
  i || (i = {});
  for (var d = -1, p = r.length; ++d < p; ) {
    var g = r[d], v = o ? o(i[g], n[g], g, i, n) : void 0;
    v === void 0 && (v = n[g]), l ? Ex(i, g, v) : kx(i, g, v);
  }
  return i;
}
var ci = Ix;
function $x(n, r) {
  for (var i = -1, o = Array(n); ++i < n; )
    o[i] = r(i);
  return o;
}
var Tx = $x, Sx = 9007199254740991, Ox = /^(?:0|[1-9]\d*)$/;
function Px(n, r) {
  var i = typeof n;
  return r = r ?? Sx, !!r && (i == "number" || i != "symbol" && Ox.test(n)) && n > -1 && n % 1 == 0 && n < r;
}
var Ea = Px, Fx = Tx, Mx = Ra, Lx = Xe, zx = dr.exports, jx = Ea, Bx = Ec, Dx = Object.prototype, Wx = Dx.hasOwnProperty;
function Nx(n, r) {
  var i = Lx(n), o = !i && Mx(n), l = !i && !o && zx(n), d = !i && !o && !l && Bx(n), p = i || o || l || d, g = p ? Fx(n.length, String) : [], v = g.length;
  for (var m in n)
    (r || Wx.call(n, m)) && !(p && // Safari 9 has enumerable `arguments.length` in strict mode.
    (m == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
    l && (m == "offset" || m == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    d && (m == "buffer" || m == "byteLength" || m == "byteOffset") || // Skip index properties.
    jx(m, v))) && g.push(m);
  return g;
}
var sv = Nx;
function Ux(n) {
  var r = [];
  if (n != null)
    for (var i in Object(n))
      r.push(i);
  return r;
}
var qx = Ux, Gx = Nt, Hx = Rc, Kx = qx, Yx = Object.prototype, Vx = Yx.hasOwnProperty;
function Zx(n) {
  if (!Gx(n))
    return Kx(n);
  var r = Hx(n), i = [];
  for (var o in n)
    o == "constructor" && (r || !Vx.call(n, o)) || i.push(o);
  return i;
}
var Jx = Zx, Xx = sv, Qx = Jx, eR = hr;
function tR(n) {
  return eR(n) ? Xx(n, !0) : Qx(n);
}
var li = tR, nR = ci, rR = li;
function iR(n) {
  return nR(n, rR(n));
}
var aR = iR, Uu = Vp, sR = ua.exports, oR = Xp, cR = oi, lR = ev, qu = Ra, Gu = Xe, dR = TC, uR = dr.exports, fR = ya, pR = Nt, vR = rv, gR = Ec, Hu = iv, AR = aR;
function hR(n, r, i, o, l, d, p) {
  var g = Hu(n, i), v = Hu(r, i), m = p.get(v);
  if (m) {
    Uu(n, i, m);
    return;
  }
  var y = d ? d(g, v, i + "", n, r, p) : void 0, h = y === void 0;
  if (h) {
    var R = Gu(v), P = !R && uR(v), $ = !R && !P && gR(v);
    y = v, R || P || $ ? Gu(g) ? y = g : dR(g) ? y = cR(g) : P ? (h = !1, y = sR(v, !0)) : $ ? (h = !1, y = oR(v, !0)) : y = [] : vR(v) || qu(v) ? (y = g, qu(g) ? y = AR(g) : (!pR(g) || fR(g)) && (y = lR(v))) : h = !1;
  }
  h && (p.set(v, y), l(y, v, o, d, p), p.delete(v)), Uu(n, i, y);
}
var _R = hR, yR = wa, bR = Vp, mR = Zp, wR = _R, CR = Nt, xR = li, RR = iv;
function ov(n, r, i, o, l) {
  n !== r && mR(r, function(d, p) {
    if (l || (l = new yR()), CR(d))
      wR(n, r, p, i, ov, o, l);
    else {
      var g = o ? o(RR(n, p), d, p + "", n, r, l) : void 0;
      g === void 0 && (g = d), bR(n, p, g);
    }
  }, xR);
}
var kR = ov;
function ER(n) {
  return n;
}
var _r = ER;
function IR(n, r, i) {
  switch (i.length) {
    case 0:
      return n.call(r);
    case 1:
      return n.call(r, i[0]);
    case 2:
      return n.call(r, i[0], i[1]);
    case 3:
      return n.call(r, i[0], i[1], i[2]);
  }
  return n.apply(r, i);
}
var Ic = IR, $R = Ic, Ku = Math.max;
function TR(n, r, i) {
  return r = Ku(r === void 0 ? n.length - 1 : r, 0), function() {
    for (var o = arguments, l = -1, d = Ku(o.length - r, 0), p = Array(d); ++l < d; )
      p[l] = o[r + l];
    l = -1;
    for (var g = Array(r + 1); ++l < r; )
      g[l] = o[l];
    return g[r] = i(p), $R(n, this, g);
  };
}
var cv = TR;
function SR(n) {
  return function() {
    return n;
  };
}
var OR = SR, PR = OR, Yu = Yp, FR = _r, MR = Yu ? function(n, r) {
  return Yu(n, "toString", {
    configurable: !0,
    enumerable: !1,
    value: PR(r),
    writable: !0
  });
} : FR, LR = MR, zR = 800, jR = 16, BR = Date.now;
function DR(n) {
  var r = 0, i = 0;
  return function() {
    var o = BR(), l = jR - (o - i);
    if (i = o, l > 0) {
      if (++r >= zR)
        return arguments[0];
    } else
      r = 0;
    return n.apply(void 0, arguments);
  };
}
var lv = DR, WR = LR, NR = lv, UR = NR(WR), $c = UR, qR = _r, GR = cv, HR = $c;
function KR(n, r) {
  return HR(GR(n, r, qR), n + "");
}
var dv = KR, YR = si, VR = hr, ZR = Ea, JR = Nt;
function XR(n, r, i) {
  if (!JR(i))
    return !1;
  var o = typeof r;
  return (o == "number" ? VR(i) && ZR(r, i.length) : o == "string" && r in i) ? YR(i[r], n) : !1;
}
var uv = XR, QR = dv, ek = uv;
function tk(n) {
  return QR(function(r, i) {
    var o = -1, l = i.length, d = l > 1 ? i[l - 1] : void 0, p = l > 2 ? i[2] : void 0;
    for (d = n.length > 3 && typeof d == "function" ? (l--, d) : void 0, p && ek(i[0], i[1], p) && (d = l < 3 ? void 0 : d, l = 1), r = Object(r); ++o < l; ) {
      var g = i[o];
      g && n(r, g, o, d);
    }
    return r;
  });
}
var nk = tk, rk = kR, ik = nk;
ik(function(n, r, i) {
  rk(n, r, i);
});
ln("c2pa:Downloader");
ln("c2pa:Downloader:Cache");
ln("c2pa:workers");
ln("c2pa:wasm");
function yr(n) {
  return Object.prototype.toString.call(n);
}
function ak(n) {
  return yr(n) === "[object Date]";
}
function sk(n) {
  return yr(n) === "[object RegExp]";
}
function ok(n) {
  return yr(n) === "[object Error]";
}
function ck(n) {
  return yr(n) === "[object Boolean]";
}
function lk(n) {
  return yr(n) === "[object Number]";
}
function dk(n) {
  return yr(n) === "[object String]";
}
var fv = Array.isArray || function(r) {
  return Object.prototype.toString.call(r) === "[object Array]";
};
function Ia(n, r) {
  if (n.forEach)
    return n.forEach(r);
  for (var i = 0; i < n.length; i++)
    r(n[i], i, n);
}
var $a = Object.keys || function(r) {
  var i = [];
  for (var o in r)
    i.push(o);
  return i;
}, Ta = Object.prototype.hasOwnProperty || function(n, r) {
  return r in n;
};
function pv(n) {
  if (typeof n == "object" && n !== null) {
    var r;
    if (fv(n))
      r = [];
    else if (ak(n))
      r = new Date(n.getTime ? n.getTime() : n);
    else if (sk(n))
      r = new RegExp(n);
    else if (ok(n))
      r = { message: n.message };
    else if (ck(n) || lk(n) || dk(n))
      r = Object(n);
    else if (Object.create && Object.getPrototypeOf)
      r = Object.create(Object.getPrototypeOf(n));
    else if (n.constructor === Object)
      r = {};
    else {
      var i = n.constructor && n.constructor.prototype || n.__proto__ || {}, o = function() {
      };
      o.prototype = i, r = new o();
    }
    return Ia($a(n), function(l) {
      r[l] = n[l];
    }), r;
  }
  return n;
}
function vv(n, r, i) {
  var o = [], l = [], d = !0;
  return (function p(g) {
    var v = i ? pv(g) : g, m = {}, y = !0, h = {
      node: v,
      node_: g,
      path: [].concat(o),
      parent: l[l.length - 1],
      parents: l,
      key: o[o.length - 1],
      isRoot: o.length === 0,
      level: o.length,
      circular: null,
      update: function($, M) {
        h.isRoot || (h.parent.node[h.key] = $), h.node = $, M && (y = !1);
      },
      delete: function($) {
        delete h.parent.node[h.key], $ && (y = !1);
      },
      remove: function($) {
        fv(h.parent.node) ? h.parent.node.splice(h.key, 1) : delete h.parent.node[h.key], $ && (y = !1);
      },
      keys: null,
      before: function($) {
        m.before = $;
      },
      after: function($) {
        m.after = $;
      },
      pre: function($) {
        m.pre = $;
      },
      post: function($) {
        m.post = $;
      },
      stop: function() {
        d = !1;
      },
      block: function() {
        y = !1;
      }
    };
    if (!d)
      return h;
    function R() {
      if (typeof h.node == "object" && h.node !== null) {
        (!h.keys || h.node_ !== h.node) && (h.keys = $a(h.node)), h.isLeaf = h.keys.length === 0;
        for (var $ = 0; $ < l.length; $++)
          if (l[$].node_ === g) {
            h.circular = l[$];
            break;
          }
      } else
        h.isLeaf = !0, h.keys = null;
      h.notLeaf = !h.isLeaf, h.notRoot = !h.isRoot;
    }
    R();
    var P = r.call(h, h.node);
    return P !== void 0 && h.update && h.update(P), m.before && m.before.call(h, h.node), y && (typeof h.node == "object" && h.node !== null && !h.circular && (l.push(h), R(), Ia(h.keys, function($, M) {
      o.push($), m.pre && m.pre.call(h, h.node[$], $);
      var O = p(h.node[$]);
      i && Ta.call(h.node, $) && (h.node[$] = O.node), O.isLast = M === h.keys.length - 1, O.isFirst = M === 0, m.post && m.post.call(h, O), o.pop();
    }), l.pop()), m.after && m.after.call(h, h.node)), h;
  })(n).node;
}
function Ht(n) {
  this.value = n;
}
Ht.prototype.get = function(n) {
  for (var r = this.value, i = 0; i < n.length; i++) {
    var o = n[i];
    if (!r || !Ta.call(r, o))
      return;
    r = r[o];
  }
  return r;
};
Ht.prototype.has = function(n) {
  for (var r = this.value, i = 0; i < n.length; i++) {
    var o = n[i];
    if (!r || !Ta.call(r, o))
      return !1;
    r = r[o];
  }
  return !0;
};
Ht.prototype.set = function(n, r) {
  for (var i = this.value, o = 0; o < n.length - 1; o++) {
    var l = n[o];
    Ta.call(i, l) || (i[l] = {}), i = i[l];
  }
  return i[n[o]] = r, r;
};
Ht.prototype.map = function(n) {
  return vv(this.value, n, !0);
};
Ht.prototype.forEach = function(n) {
  return this.value = vv(this.value, n, !1), this.value;
};
Ht.prototype.reduce = function(n, r) {
  var i = arguments.length === 1, o = i ? this.value : r;
  return this.forEach(function(l) {
    (!this.isRoot || !i) && (o = n.call(this, o, l));
  }), o;
};
Ht.prototype.paths = function() {
  var n = [];
  return this.forEach(function() {
    n.push(this.path);
  }), n;
};
Ht.prototype.nodes = function() {
  var n = [];
  return this.forEach(function() {
    n.push(this.node);
  }), n;
};
Ht.prototype.clone = function() {
  var n = [], r = [];
  return (function i(o) {
    for (var l = 0; l < n.length; l++)
      if (n[l] === o)
        return r[l];
    if (typeof o == "object" && o !== null) {
      var d = pv(o);
      return n.push(o), r.push(d), Ia($a(o), function(p) {
        d[p] = i(o[p]);
      }), n.pop(), r.pop(), d;
    }
    return o;
  })(this.value);
};
Ia($a(Ht.prototype), function(n) {
});
ln("c2pa:manifestStore");
ln("c2pa");
ln("c2pa:task");
var uk = { exports: {} };
function fk(n, r) {
  for (var i = -1, o = n == null ? 0 : n.length; ++i < o && r(n[i], i, n) !== !1; )
    ;
  return n;
}
var Sa = fk, pk = Qp, vk = pk(Object.keys, Object), gk = vk, Ak = Rc, hk = gk, _k = Object.prototype, yk = _k.hasOwnProperty;
function bk(n) {
  if (!Ak(n))
    return hk(n);
  var r = [];
  for (var i in Object(n))
    yk.call(n, i) && i != "constructor" && r.push(i);
  return r;
}
var gv = bk, mk = sv, wk = gv, Ck = hr;
function xk(n) {
  return Ck(n) ? mk(n) : wk(n);
}
var di = xk, Rk = Zp, kk = di;
function Ek(n, r) {
  return n && Rk(n, r, kk);
}
var Av = Ek, Ik = hr;
function $k(n, r) {
  return function(i, o) {
    if (i == null)
      return i;
    if (!Ik(i))
      return n(i, o);
    for (var l = i.length, d = r ? l : -1, p = Object(i); (r ? d-- : ++d < l) && o(p[d], d, p) !== !1; )
      ;
    return i;
  };
}
var Tk = $k, Sk = Av, Ok = Tk, Pk = Ok(Sk), hv = Pk, Fk = _r;
function Mk(n) {
  return typeof n == "function" ? n : Fk;
}
var Lk = Mk, zk = Sa, jk = hv, Bk = Lk, Dk = Xe;
function Wk(n, r) {
  var i = Dk(n) ? zk : jk;
  return i(n, Bk(r));
}
var Nk = Wk;
(function(n) {
  n.exports = Nk;
})(uk);
var _v = {};
(function(n) {
  n.aliasToReal = {
    // Lodash aliases.
    each: "forEach",
    eachRight: "forEachRight",
    entries: "toPairs",
    entriesIn: "toPairsIn",
    extend: "assignIn",
    extendAll: "assignInAll",
    extendAllWith: "assignInAllWith",
    extendWith: "assignInWith",
    first: "head",
    // Methods that are curried variants of others.
    conforms: "conformsTo",
    matches: "isMatch",
    property: "get",
    // Ramda aliases.
    __: "placeholder",
    F: "stubFalse",
    T: "stubTrue",
    all: "every",
    allPass: "overEvery",
    always: "constant",
    any: "some",
    anyPass: "overSome",
    apply: "spread",
    assoc: "set",
    assocPath: "set",
    complement: "negate",
    compose: "flowRight",
    contains: "includes",
    dissoc: "unset",
    dissocPath: "unset",
    dropLast: "dropRight",
    dropLastWhile: "dropRightWhile",
    equals: "isEqual",
    identical: "eq",
    indexBy: "keyBy",
    init: "initial",
    invertObj: "invert",
    juxt: "over",
    omitAll: "omit",
    nAry: "ary",
    path: "get",
    pathEq: "matchesProperty",
    pathOr: "getOr",
    paths: "at",
    pickAll: "pick",
    pipe: "flow",
    pluck: "map",
    prop: "get",
    propEq: "matchesProperty",
    propOr: "getOr",
    props: "at",
    symmetricDifference: "xor",
    symmetricDifferenceBy: "xorBy",
    symmetricDifferenceWith: "xorWith",
    takeLast: "takeRight",
    takeLastWhile: "takeRightWhile",
    unapply: "rest",
    unnest: "flatten",
    useWith: "overArgs",
    where: "conformsTo",
    whereEq: "isMatch",
    zipObj: "zipObject"
  }, n.aryMethod = {
    1: [
      "assignAll",
      "assignInAll",
      "attempt",
      "castArray",
      "ceil",
      "create",
      "curry",
      "curryRight",
      "defaultsAll",
      "defaultsDeepAll",
      "floor",
      "flow",
      "flowRight",
      "fromPairs",
      "invert",
      "iteratee",
      "memoize",
      "method",
      "mergeAll",
      "methodOf",
      "mixin",
      "nthArg",
      "over",
      "overEvery",
      "overSome",
      "rest",
      "reverse",
      "round",
      "runInContext",
      "spread",
      "template",
      "trim",
      "trimEnd",
      "trimStart",
      "uniqueId",
      "words",
      "zipAll"
    ],
    2: [
      "add",
      "after",
      "ary",
      "assign",
      "assignAllWith",
      "assignIn",
      "assignInAllWith",
      "at",
      "before",
      "bind",
      "bindAll",
      "bindKey",
      "chunk",
      "cloneDeepWith",
      "cloneWith",
      "concat",
      "conformsTo",
      "countBy",
      "curryN",
      "curryRightN",
      "debounce",
      "defaults",
      "defaultsDeep",
      "defaultTo",
      "delay",
      "difference",
      "divide",
      "drop",
      "dropRight",
      "dropRightWhile",
      "dropWhile",
      "endsWith",
      "eq",
      "every",
      "filter",
      "find",
      "findIndex",
      "findKey",
      "findLast",
      "findLastIndex",
      "findLastKey",
      "flatMap",
      "flatMapDeep",
      "flattenDepth",
      "forEach",
      "forEachRight",
      "forIn",
      "forInRight",
      "forOwn",
      "forOwnRight",
      "get",
      "groupBy",
      "gt",
      "gte",
      "has",
      "hasIn",
      "includes",
      "indexOf",
      "intersection",
      "invertBy",
      "invoke",
      "invokeMap",
      "isEqual",
      "isMatch",
      "join",
      "keyBy",
      "lastIndexOf",
      "lt",
      "lte",
      "map",
      "mapKeys",
      "mapValues",
      "matchesProperty",
      "maxBy",
      "meanBy",
      "merge",
      "mergeAllWith",
      "minBy",
      "multiply",
      "nth",
      "omit",
      "omitBy",
      "overArgs",
      "pad",
      "padEnd",
      "padStart",
      "parseInt",
      "partial",
      "partialRight",
      "partition",
      "pick",
      "pickBy",
      "propertyOf",
      "pull",
      "pullAll",
      "pullAt",
      "random",
      "range",
      "rangeRight",
      "rearg",
      "reject",
      "remove",
      "repeat",
      "restFrom",
      "result",
      "sampleSize",
      "some",
      "sortBy",
      "sortedIndex",
      "sortedIndexOf",
      "sortedLastIndex",
      "sortedLastIndexOf",
      "sortedUniqBy",
      "split",
      "spreadFrom",
      "startsWith",
      "subtract",
      "sumBy",
      "take",
      "takeRight",
      "takeRightWhile",
      "takeWhile",
      "tap",
      "throttle",
      "thru",
      "times",
      "trimChars",
      "trimCharsEnd",
      "trimCharsStart",
      "truncate",
      "union",
      "uniqBy",
      "uniqWith",
      "unset",
      "unzipWith",
      "without",
      "wrap",
      "xor",
      "zip",
      "zipObject",
      "zipObjectDeep"
    ],
    3: [
      "assignInWith",
      "assignWith",
      "clamp",
      "differenceBy",
      "differenceWith",
      "findFrom",
      "findIndexFrom",
      "findLastFrom",
      "findLastIndexFrom",
      "getOr",
      "includesFrom",
      "indexOfFrom",
      "inRange",
      "intersectionBy",
      "intersectionWith",
      "invokeArgs",
      "invokeArgsMap",
      "isEqualWith",
      "isMatchWith",
      "flatMapDepth",
      "lastIndexOfFrom",
      "mergeWith",
      "orderBy",
      "padChars",
      "padCharsEnd",
      "padCharsStart",
      "pullAllBy",
      "pullAllWith",
      "rangeStep",
      "rangeStepRight",
      "reduce",
      "reduceRight",
      "replace",
      "set",
      "slice",
      "sortedIndexBy",
      "sortedLastIndexBy",
      "transform",
      "unionBy",
      "unionWith",
      "update",
      "xorBy",
      "xorWith",
      "zipWith"
    ],
    4: [
      "fill",
      "setWith",
      "updateWith"
    ]
  }, n.aryRearg = {
    2: [1, 0],
    3: [2, 0, 1],
    4: [3, 2, 0, 1]
  }, n.iterateeAry = {
    dropRightWhile: 1,
    dropWhile: 1,
    every: 1,
    filter: 1,
    find: 1,
    findFrom: 1,
    findIndex: 1,
    findIndexFrom: 1,
    findKey: 1,
    findLast: 1,
    findLastFrom: 1,
    findLastIndex: 1,
    findLastIndexFrom: 1,
    findLastKey: 1,
    flatMap: 1,
    flatMapDeep: 1,
    flatMapDepth: 1,
    forEach: 1,
    forEachRight: 1,
    forIn: 1,
    forInRight: 1,
    forOwn: 1,
    forOwnRight: 1,
    map: 1,
    mapKeys: 1,
    mapValues: 1,
    partition: 1,
    reduce: 2,
    reduceRight: 2,
    reject: 1,
    remove: 1,
    some: 1,
    takeRightWhile: 1,
    takeWhile: 1,
    times: 1,
    transform: 2
  }, n.iterateeRearg = {
    mapKeys: [1],
    reduceRight: [1, 0]
  }, n.methodRearg = {
    assignInAllWith: [1, 0],
    assignInWith: [1, 2, 0],
    assignAllWith: [1, 0],
    assignWith: [1, 2, 0],
    differenceBy: [1, 2, 0],
    differenceWith: [1, 2, 0],
    getOr: [2, 1, 0],
    intersectionBy: [1, 2, 0],
    intersectionWith: [1, 2, 0],
    isEqualWith: [1, 2, 0],
    isMatchWith: [2, 1, 0],
    mergeAllWith: [1, 0],
    mergeWith: [1, 2, 0],
    padChars: [2, 1, 0],
    padCharsEnd: [2, 1, 0],
    padCharsStart: [2, 1, 0],
    pullAllBy: [2, 1, 0],
    pullAllWith: [2, 1, 0],
    rangeStep: [1, 2, 0],
    rangeStepRight: [1, 2, 0],
    setWith: [3, 1, 2, 0],
    sortedIndexBy: [2, 1, 0],
    sortedLastIndexBy: [2, 1, 0],
    unionBy: [1, 2, 0],
    unionWith: [1, 2, 0],
    updateWith: [3, 1, 2, 0],
    xorBy: [1, 2, 0],
    xorWith: [1, 2, 0],
    zipWith: [1, 2, 0]
  }, n.methodSpread = {
    assignAll: { start: 0 },
    assignAllWith: { start: 0 },
    assignInAll: { start: 0 },
    assignInAllWith: { start: 0 },
    defaultsAll: { start: 0 },
    defaultsDeepAll: { start: 0 },
    invokeArgs: { start: 2 },
    invokeArgsMap: { start: 2 },
    mergeAll: { start: 0 },
    mergeAllWith: { start: 0 },
    partial: { start: 1 },
    partialRight: { start: 1 },
    without: { start: 1 },
    zipAll: { start: 0 }
  }, n.mutate = {
    array: {
      fill: !0,
      pull: !0,
      pullAll: !0,
      pullAllBy: !0,
      pullAllWith: !0,
      pullAt: !0,
      remove: !0,
      reverse: !0
    },
    object: {
      assign: !0,
      assignAll: !0,
      assignAllWith: !0,
      assignIn: !0,
      assignInAll: !0,
      assignInAllWith: !0,
      assignInWith: !0,
      assignWith: !0,
      defaults: !0,
      defaultsAll: !0,
      defaultsDeep: !0,
      defaultsDeepAll: !0,
      merge: !0,
      mergeAll: !0,
      mergeAllWith: !0,
      mergeWith: !0
    },
    set: {
      set: !0,
      setWith: !0,
      unset: !0,
      update: !0,
      updateWith: !0
    }
  }, n.realToAlias = (function() {
    var r = Object.prototype.hasOwnProperty, i = n.aliasToReal, o = {};
    for (var l in i) {
      var d = i[l];
      r.call(o, d) ? o[d].push(l) : o[d] = [l];
    }
    return o;
  })(), n.remap = {
    assignAll: "assign",
    assignAllWith: "assignWith",
    assignInAll: "assignIn",
    assignInAllWith: "assignInWith",
    curryN: "curry",
    curryRightN: "curryRight",
    defaultsAll: "defaults",
    defaultsDeepAll: "defaultsDeep",
    findFrom: "find",
    findIndexFrom: "findIndex",
    findLastFrom: "findLast",
    findLastIndexFrom: "findLastIndex",
    getOr: "get",
    includesFrom: "includes",
    indexOfFrom: "indexOf",
    invokeArgs: "invoke",
    invokeArgsMap: "invokeMap",
    lastIndexOfFrom: "lastIndexOf",
    mergeAll: "merge",
    mergeAllWith: "mergeWith",
    padChars: "pad",
    padCharsEnd: "padEnd",
    padCharsStart: "padStart",
    propertyOf: "get",
    rangeStep: "range",
    rangeStepRight: "rangeRight",
    restFrom: "rest",
    spreadFrom: "spread",
    trimChars: "trim",
    trimCharsEnd: "trimEnd",
    trimCharsStart: "trimStart",
    zipAll: "zip"
  }, n.skipFixed = {
    castArray: !0,
    flow: !0,
    flowRight: !0,
    iteratee: !0,
    mixin: !0,
    rearg: !0,
    runInContext: !0
  }, n.skipRearg = {
    add: !0,
    assign: !0,
    assignIn: !0,
    bind: !0,
    bindKey: !0,
    concat: !0,
    difference: !0,
    divide: !0,
    eq: !0,
    gt: !0,
    gte: !0,
    isEqual: !0,
    lt: !0,
    lte: !0,
    matchesProperty: !0,
    merge: !0,
    multiply: !0,
    overArgs: !0,
    partial: !0,
    partialRight: !0,
    propertyOf: !0,
    random: !0,
    range: !0,
    rangeRight: !0,
    subtract: !0,
    zip: !0,
    zipObject: !0,
    zipObjectDeep: !0
  };
})(_v);
var co, Vu;
function ui() {
  return Vu || (Vu = 1, co = {}), co;
}
var We = _v, Uk = ui(), Zu = Array.prototype.push;
function qk(n, r) {
  return r == 2 ? function(i, o) {
    return n.apply(void 0, arguments);
  } : function(i) {
    return n.apply(void 0, arguments);
  };
}
function lo(n, r) {
  return r == 2 ? function(i, o) {
    return n(i, o);
  } : function(i) {
    return n(i);
  };
}
function Ju(n) {
  for (var r = n ? n.length : 0, i = Array(r); r--; )
    i[r] = n[r];
  return i;
}
function Gk(n) {
  return function(r) {
    return n({}, r);
  };
}
function Hk(n, r) {
  return function() {
    for (var i = arguments.length, o = i - 1, l = Array(i); i--; )
      l[i] = arguments[i];
    var d = l[r], p = l.slice(0, r);
    return d && Zu.apply(p, d), r != o && Zu.apply(p, l.slice(r + 1)), n.apply(this, p);
  };
}
function uo(n, r) {
  return function() {
    var i = arguments.length;
    if (i) {
      for (var o = Array(i); i--; )
        o[i] = arguments[i];
      var l = o[0] = r.apply(void 0, o);
      return n.apply(void 0, o), l;
    }
  };
}
function lc(n, r, i, o) {
  var l = typeof r == "function", d = r === Object(r);
  if (d && (o = i, i = r, r = void 0), i == null)
    throw new TypeError();
  o || (o = {});
  var p = {
    cap: "cap" in o ? o.cap : !0,
    curry: "curry" in o ? o.curry : !0,
    fixed: "fixed" in o ? o.fixed : !0,
    immutable: "immutable" in o ? o.immutable : !0,
    rearg: "rearg" in o ? o.rearg : !0
  }, g = l ? i : Uk, v = "curry" in o && o.curry, m = "fixed" in o && o.fixed, y = "rearg" in o && o.rearg, h = l ? i.runInContext() : void 0, R = l ? i : {
    ary: n.ary,
    assign: n.assign,
    clone: n.clone,
    curry: n.curry,
    forEach: n.forEach,
    isArray: n.isArray,
    isError: n.isError,
    isFunction: n.isFunction,
    isWeakMap: n.isWeakMap,
    iteratee: n.iteratee,
    keys: n.keys,
    rearg: n.rearg,
    toInteger: n.toInteger,
    toPath: n.toPath
  }, P = R.ary, $ = R.assign, M = R.clone, O = R.curry, F = R.forEach, L = R.isArray, J = R.isError, ne = R.isFunction, ye = R.isWeakMap, Ae = R.keys, ve = R.rearg, ce = R.toInteger, we = R.toPath, Se = Ae(We.aryMethod), Ne = {
    castArray: function(N) {
      return function() {
        var z = arguments[0];
        return L(z) ? N(Ju(z)) : N.apply(void 0, arguments);
      };
    },
    iteratee: function(N) {
      return function() {
        var z = arguments[0], D = arguments[1], G = N(z, D), X = G.length;
        return p.cap && typeof D == "number" ? (D = D > 2 ? D - 2 : 1, X && X <= D ? G : lo(G, D)) : G;
      };
    },
    mixin: function(N) {
      return function(z) {
        var D = this;
        if (!ne(D))
          return N(D, Object(z));
        var G = [];
        return F(Ae(z), function(X) {
          ne(z[X]) && G.push([X, D.prototype[X]]);
        }), N(D, Object(z)), F(G, function(X) {
          var Oe = X[1];
          ne(Oe) ? D.prototype[X[0]] = Oe : delete D.prototype[X[0]];
        }), D;
      };
    },
    nthArg: function(N) {
      return function(z) {
        var D = z < 0 ? 1 : ce(z) + 1;
        return O(N(z), D);
      };
    },
    rearg: function(N) {
      return function(z, D) {
        var G = D ? D.length : 0;
        return O(N(z, D), G);
      };
    },
    runInContext: function(N) {
      return function(z) {
        return lc(n, N(z), o);
      };
    }
  };
  function V(N, z) {
    if (p.cap) {
      var D = We.iterateeRearg[N];
      if (D)
        return Yt(z, D);
      var G = !l && We.iterateeAry[N];
      if (G)
        return dn(z, G);
    }
    return z;
  }
  function ae(N, z, D) {
    return v || p.curry && D > 1 ? O(z, D) : z;
  }
  function Ie(N, z, D) {
    if (p.fixed && (m || !We.skipFixed[N])) {
      var G = We.methodSpread[N], X = G && G.start;
      return X === void 0 ? P(z, D) : Hk(z, X);
    }
    return z;
  }
  function He(N, z, D) {
    return p.rearg && D > 1 && (y || !We.skipRearg[N]) ? ve(z, We.methodRearg[N] || We.aryRearg[D]) : z;
  }
  function Lt(N, z) {
    z = we(z);
    for (var D = -1, G = z.length, X = G - 1, Oe = M(Object(N)), Ke = Oe; Ke != null && ++D < G; ) {
      var ze = z[D], it = Ke[ze];
      it != null && !(ne(it) || J(it) || ye(it)) && (Ke[ze] = M(D == X ? it : Object(it))), Ke = Ke[ze];
    }
    return Oe;
  }
  function Ue(N) {
    return qe.runInContext.convert(N)(void 0);
  }
  function Qe(N, z) {
    var D = We.aliasToReal[N] || N, G = We.remap[D] || D, X = o;
    return function(Oe) {
      var Ke = l ? h : R, ze = l ? h[G] : z, it = $($({}, X), Oe);
      return lc(Ke, D, ze, it);
    };
  }
  function dn(N, z) {
    return et(N, function(D) {
      return typeof D == "function" ? lo(D, z) : D;
    });
  }
  function Yt(N, z) {
    return et(N, function(D) {
      var G = z.length;
      return qk(ve(lo(D, G), z), G);
    });
  }
  function et(N, z) {
    return function() {
      var D = arguments.length;
      if (!D)
        return N();
      for (var G = Array(D); D--; )
        G[D] = arguments[D];
      var X = p.rearg ? 0 : D - 1;
      return G[X] = z(G[X]), N.apply(void 0, G);
    };
  }
  function xn(N, z, D) {
    var G, X = We.aliasToReal[N] || N, Oe = z, Ke = Ne[X];
    return Ke ? Oe = Ke(z) : p.immutable && (We.mutate.array[X] ? Oe = uo(z, Ju) : We.mutate.object[X] ? Oe = uo(z, Gk(z)) : We.mutate.set[X] && (Oe = uo(z, Lt))), F(Se, function(ze) {
      return F(We.aryMethod[ze], function(it) {
        if (X == it) {
          var tt = We.methodSpread[X], Ct = tt && tt.afterRearg;
          return G = Ct ? Ie(X, He(X, Oe, ze), ze) : He(X, Ie(X, Oe, ze), ze), G = V(X, G), G = ae(X, G, ze), !1;
        }
      }), !G;
    }), G || (G = Oe), G == z && (G = v ? O(G, 1) : function() {
      return z.apply(this, arguments);
    }), G.convert = Qe(X, z), G.placeholder = z.placeholder = D, G;
  }
  if (!d)
    return xn(r, i, g);
  var qe = i, Vt = [];
  return F(Se, function(N) {
    F(We.aryMethod[N], function(z) {
      var D = qe[We.remap[z] || z];
      D && Vt.push([z, xn(z, D, qe)]);
    });
  }), F(Ae(qe), function(N) {
    var z = qe[N];
    if (typeof z == "function") {
      for (var D = Vt.length; D--; )
        if (Vt[D][0] == N)
          return;
      z.convert = Qe(N, z), Vt.push([N, z]);
    }
  }), F(Vt, function(N) {
    qe[N[0]] = N[1];
  }), qe.convert = Ue, qe.placeholder = qe, F(Ae(qe), function(N) {
    F(We.realToAlias[N] || [], function(z) {
      qe[z] = qe[N];
    });
  }), qe;
}
var Kk = lc, Yk = Wn, Vk = vt, Zk = Yk(Vk, "WeakMap"), yv = Zk, fo, Xu;
function bv() {
  if (Xu) return fo;
  Xu = 1;
  var n = yv, r = n && new n();
  return fo = r, fo;
}
var Jk = _r, Qu = bv(), Xk = Qu ? function(n, r) {
  return Qu.set(n, r), n;
} : Jk, mv = Xk, Qk = xa, eE = Nt;
function tE(n) {
  return function() {
    var r = arguments;
    switch (r.length) {
      case 0:
        return new n();
      case 1:
        return new n(r[0]);
      case 2:
        return new n(r[0], r[1]);
      case 3:
        return new n(r[0], r[1], r[2]);
      case 4:
        return new n(r[0], r[1], r[2], r[3]);
      case 5:
        return new n(r[0], r[1], r[2], r[3], r[4]);
      case 6:
        return new n(r[0], r[1], r[2], r[3], r[4], r[5]);
      case 7:
        return new n(r[0], r[1], r[2], r[3], r[4], r[5], r[6]);
    }
    var i = Qk(n.prototype), o = n.apply(i, r);
    return eE(o) ? o : i;
  };
}
var Oa = tE, nE = Oa, rE = vt, iE = 1;
function aE(n, r, i) {
  var o = r & iE, l = nE(n);
  function d() {
    var p = this && this !== rE && this instanceof d ? l : n;
    return p.apply(o ? i : this, arguments);
  }
  return d;
}
var sE = aE, oE = Math.max;
function cE(n, r, i, o) {
  for (var l = -1, d = n.length, p = i.length, g = -1, v = r.length, m = oE(d - p, 0), y = Array(v + m), h = !o; ++g < v; )
    y[g] = r[g];
  for (; ++l < p; )
    (h || l < d) && (y[i[l]] = n[l]);
  for (; m--; )
    y[g++] = n[l++];
  return y;
}
var wv = cE, lE = Math.max;
function dE(n, r, i, o) {
  for (var l = -1, d = n.length, p = -1, g = i.length, v = -1, m = r.length, y = lE(d - g, 0), h = Array(y + m), R = !o; ++l < y; )
    h[l] = n[l];
  for (var P = l; ++v < m; )
    h[P + v] = r[v];
  for (; ++p < g; )
    (R || l < d) && (h[P + i[p]] = n[l++]);
  return h;
}
var Cv = dE;
function uE(n, r) {
  for (var i = n.length, o = 0; i--; )
    n[i] === r && ++o;
  return o;
}
var fE = uE, po, ef;
function Tc() {
  if (ef) return po;
  ef = 1;
  function n() {
  }
  return po = n, po;
}
var vo, tf;
function Sc() {
  if (tf) return vo;
  tf = 1;
  var n = xa, r = Tc(), i = 4294967295;
  function o(l) {
    this.__wrapped__ = l, this.__actions__ = [], this.__dir__ = 1, this.__filtered__ = !1, this.__iteratees__ = [], this.__takeCount__ = i, this.__views__ = [];
  }
  return o.prototype = n(r.prototype), o.prototype.constructor = o, vo = o, vo;
}
var go, nf;
function xv() {
  if (nf) return go;
  nf = 1;
  function n() {
  }
  return go = n, go;
}
var Ao, rf;
function Oc() {
  if (rf) return Ao;
  rf = 1;
  var n = bv(), r = xv(), i = n ? function(o) {
    return n.get(o);
  } : r;
  return Ao = i, Ao;
}
var ho, af;
function pE() {
  if (af) return ho;
  af = 1;
  var n = {};
  return ho = n, ho;
}
var _o, sf;
function Rv() {
  if (sf) return _o;
  sf = 1;
  var n = pE(), r = Object.prototype, i = r.hasOwnProperty;
  function o(l) {
    for (var d = l.name + "", p = n[d], g = i.call(n, d) ? p.length : 0; g--; ) {
      var v = p[g], m = v.func;
      if (m == null || m == l)
        return v.name;
    }
    return d;
  }
  return _o = o, _o;
}
var yo, of;
function Pc() {
  if (of) return yo;
  of = 1;
  var n = xa, r = Tc();
  function i(o, l) {
    this.__wrapped__ = o, this.__actions__ = [], this.__chain__ = !!l, this.__index__ = 0, this.__values__ = void 0;
  }
  return i.prototype = n(r.prototype), i.prototype.constructor = i, yo = i, yo;
}
var bo, cf;
function vE() {
  if (cf) return bo;
  cf = 1;
  var n = Sc(), r = Pc(), i = oi;
  function o(l) {
    if (l instanceof n)
      return l.clone();
    var d = new r(l.__wrapped__, l.__chain__);
    return d.__actions__ = i(l.__actions__), d.__index__ = l.__index__, d.__values__ = l.__values__, d;
  }
  return bo = o, bo;
}
var mo, lf;
function gE() {
  if (lf) return mo;
  lf = 1;
  var n = Sc(), r = Pc(), i = Tc(), o = Xe, l = Mt, d = vE(), p = Object.prototype, g = p.hasOwnProperty;
  function v(m) {
    if (l(m) && !o(m) && !(m instanceof n)) {
      if (m instanceof r)
        return m;
      if (g.call(m, "__wrapped__"))
        return d(m);
    }
    return new r(m);
  }
  return v.prototype = i.prototype, v.prototype.constructor = v, mo = v, mo;
}
var wo, df;
function kv() {
  if (df) return wo;
  df = 1;
  var n = Sc(), r = Oc(), i = Rv(), o = gE();
  function l(d) {
    var p = i(d), g = o[p];
    if (typeof g != "function" || !(p in n.prototype))
      return !1;
    if (d === g)
      return !0;
    var v = r(g);
    return !!v && d === v[0];
  }
  return wo = l, wo;
}
var AE = mv, hE = lv, _E = hE(AE), Ev = _E, yE = /\{\n\/\* \[wrapped with (.+)\] \*/, bE = /,? & /;
function mE(n) {
  var r = n.match(yE);
  return r ? r[1].split(bE) : [];
}
var wE = mE, CE = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/;
function xE(n, r) {
  var i = r.length;
  if (!i)
    return n;
  var o = i - 1;
  return r[o] = (i > 1 ? "& " : "") + r[o], r = r.join(i > 2 ? ", " : " "), n.replace(CE, `{
/* [wrapped with ` + r + `] */
`);
}
var RE = xE, Co, uf;
function kE() {
  if (uf) return Co;
  uf = 1;
  function n(r, i, o, l) {
    for (var d = r.length, p = o + (l ? 1 : -1); l ? p-- : ++p < d; )
      if (i(r[p], p, r))
        return p;
    return -1;
  }
  return Co = n, Co;
}
var xo, ff;
function EE() {
  if (ff) return xo;
  ff = 1;
  function n(r) {
    return r !== r;
  }
  return xo = n, xo;
}
var Ro, pf;
function IE() {
  if (pf) return Ro;
  pf = 1;
  function n(r, i, o) {
    for (var l = o - 1, d = r.length; ++l < d; )
      if (r[l] === i)
        return l;
    return -1;
  }
  return Ro = n, Ro;
}
var ko, vf;
function $E() {
  if (vf) return ko;
  vf = 1;
  var n = kE(), r = EE(), i = IE();
  function o(l, d, p) {
    return d === d ? i(l, d, p) : n(l, r, p);
  }
  return ko = o, ko;
}
var Eo, gf;
function Iv() {
  if (gf) return Eo;
  gf = 1;
  var n = $E();
  function r(i, o) {
    var l = i == null ? 0 : i.length;
    return !!l && n(i, o, 0) > -1;
  }
  return Eo = r, Eo;
}
var TE = Sa, SE = Iv(), OE = 1, PE = 2, FE = 8, ME = 16, LE = 32, zE = 64, jE = 128, BE = 256, DE = 512, WE = [
  ["ary", jE],
  ["bind", OE],
  ["bindKey", PE],
  ["curry", FE],
  ["curryRight", ME],
  ["flip", DE],
  ["partial", LE],
  ["partialRight", zE],
  ["rearg", BE]
];
function NE(n, r) {
  return TE(WE, function(i) {
    var o = "_." + i[0];
    r & i[1] && !SE(n, o) && n.push(o);
  }), n.sort();
}
var UE = NE, qE = wE, GE = RE, HE = $c, KE = UE;
function YE(n, r, i) {
  var o = r + "";
  return HE(n, GE(o, KE(qE(o), i)));
}
var $v = YE, VE = kv(), ZE = Ev, JE = $v, XE = 4, QE = 8, Af = 32, hf = 64;
function eI(n, r, i, o, l, d, p, g, v, m) {
  var y = r & QE, h = y ? p : void 0, R = y ? void 0 : p, P = y ? d : void 0, $ = y ? void 0 : d;
  r |= y ? Af : hf, r &= ~(y ? hf : Af), r & XE || (r &= -4);
  var M = [
    n,
    r,
    l,
    P,
    h,
    $,
    R,
    g,
    v,
    m
  ], O = i.apply(void 0, M);
  return VE(n) && ZE(O, M), O.placeholder = o, JE(O, n, r);
}
var Tv = eI;
function tI(n) {
  var r = n;
  return r.placeholder;
}
var Sv = tI, nI = oi, rI = Ea, iI = Math.min;
function aI(n, r) {
  for (var i = n.length, o = iI(r.length, i), l = nI(n); o--; ) {
    var d = r[o];
    n[o] = rI(d, i) ? l[d] : void 0;
  }
  return n;
}
var sI = aI, _f = "__lodash_placeholder__";
function oI(n, r) {
  for (var i = -1, o = n.length, l = 0, d = []; ++i < o; ) {
    var p = n[i];
    (p === r || p === _f) && (n[i] = _f, d[l++] = i);
  }
  return d;
}
var Fc = oI, cI = wv, lI = Cv, dI = fE, yf = Oa, uI = Tv, fI = Sv, pI = sI, vI = Fc, gI = vt, AI = 1, hI = 2, _I = 8, yI = 16, bI = 128, mI = 512;
function Ov(n, r, i, o, l, d, p, g, v, m) {
  var y = r & bI, h = r & AI, R = r & hI, P = r & (_I | yI), $ = r & mI, M = R ? void 0 : yf(n);
  function O() {
    for (var F = arguments.length, L = Array(F), J = F; J--; )
      L[J] = arguments[J];
    if (P)
      var ne = fI(O), ye = dI(L, ne);
    if (o && (L = cI(L, o, l, P)), d && (L = lI(L, d, p, P)), F -= ye, P && F < m) {
      var Ae = vI(L, ne);
      return uI(
        n,
        r,
        Ov,
        O.placeholder,
        i,
        L,
        Ae,
        g,
        v,
        m - F
      );
    }
    var ve = h ? i : this, ce = R ? ve[n] : n;
    return F = L.length, g ? L = pI(L, g) : $ && F > 1 && L.reverse(), y && v < F && (L.length = v), this && this !== gI && this instanceof O && (ce = M || yf(ce)), ce.apply(ve, L);
  }
  return O;
}
var Pv = Ov, wI = Ic, CI = Oa, xI = Pv, RI = Tv, kI = Sv, EI = Fc, II = vt;
function $I(n, r, i) {
  var o = CI(n);
  function l() {
    for (var d = arguments.length, p = Array(d), g = d, v = kI(l); g--; )
      p[g] = arguments[g];
    var m = d < 3 && p[0] !== v && p[d - 1] !== v ? [] : EI(p, v);
    if (d -= m.length, d < i)
      return RI(
        n,
        r,
        xI,
        l.placeholder,
        void 0,
        p,
        m,
        void 0,
        void 0,
        i - d
      );
    var y = this && this !== II && this instanceof l ? o : n;
    return wI(y, this, p);
  }
  return l;
}
var TI = $I, SI = Ic, OI = Oa, PI = vt, FI = 1;
function MI(n, r, i, o) {
  var l = r & FI, d = OI(n);
  function p() {
    for (var g = -1, v = arguments.length, m = -1, y = o.length, h = Array(y + v), R = this && this !== PI && this instanceof p ? d : n; ++m < y; )
      h[m] = o[m];
    for (; v--; )
      h[m++] = arguments[++g];
    return SI(R, l ? i : this, h);
  }
  return p;
}
var LI = MI, zI = wv, jI = Cv, bf = Fc, mf = "__lodash_placeholder__", Io = 1, BI = 2, DI = 4, wf = 8, Zr = 128, Cf = 256, WI = Math.min;
function NI(n, r) {
  var i = n[1], o = r[1], l = i | o, d = l < (Io | BI | Zr), p = o == Zr && i == wf || o == Zr && i == Cf && n[7].length <= r[8] || o == (Zr | Cf) && r[7].length <= r[8] && i == wf;
  if (!(d || p))
    return n;
  o & Io && (n[2] = r[2], l |= i & Io ? 0 : DI);
  var g = r[3];
  if (g) {
    var v = n[3];
    n[3] = v ? zI(v, g, r[4]) : g, n[4] = v ? bf(n[3], mf) : r[4];
  }
  return g = r[5], g && (v = n[5], n[5] = v ? jI(v, g, r[6]) : g, n[6] = v ? bf(n[5], mf) : r[6]), g = r[7], g && (n[7] = g), o & Zr && (n[8] = n[8] == null ? r[8] : WI(n[8], r[8])), n[9] == null && (n[9] = r[9]), n[0] = r[0], n[1] = l, n;
}
var UI = NI, qI = /\s/;
function GI(n) {
  for (var r = n.length; r-- && qI.test(n.charAt(r)); )
    ;
  return r;
}
var HI = GI, KI = HI, YI = /^\s+/;
function VI(n) {
  return n && n.slice(0, KI(n) + 1).replace(YI, "");
}
var ZI = VI, JI = Dn, XI = Mt, QI = "[object Symbol]";
function e$(n) {
  return typeof n == "symbol" || XI(n) && JI(n) == QI;
}
var br = e$, t$ = ZI, xf = Nt, n$ = br, Rf = NaN, r$ = /^[-+]0x[0-9a-f]+$/i, i$ = /^0b[01]+$/i, a$ = /^0o[0-7]+$/i, s$ = parseInt;
function o$(n) {
  if (typeof n == "number")
    return n;
  if (n$(n))
    return Rf;
  if (xf(n)) {
    var r = typeof n.valueOf == "function" ? n.valueOf() : n;
    n = xf(r) ? r + "" : r;
  }
  if (typeof n != "string")
    return n === 0 ? n : +n;
  n = t$(n);
  var i = i$.test(n);
  return i || a$.test(n) ? s$(n.slice(2), i ? 2 : 8) : r$.test(n) ? Rf : +n;
}
var c$ = o$, l$ = c$, kf = 1 / 0, d$ = 17976931348623157e292;
function u$(n) {
  if (!n)
    return n === 0 ? n : 0;
  if (n = l$(n), n === kf || n === -kf) {
    var r = n < 0 ? -1 : 1;
    return r * d$;
  }
  return n === n ? n : 0;
}
var f$ = u$, p$ = f$;
function v$(n) {
  var r = p$(n), i = r % 1;
  return r === r ? i ? r - i : r : 0;
}
var Fv = v$, g$ = mv, A$ = sE, h$ = TI, _$ = Pv, y$ = LI, b$ = Oc(), m$ = UI, w$ = Ev, C$ = $v, Ef = Fv, x$ = "Expected a function", If = 1, R$ = 2, $f = 8, Tf = 16, Sf = 32, k$ = 64, Of = Math.max;
function E$(n, r, i, o, l, d, p, g) {
  var v = r & R$;
  if (!v && typeof n != "function")
    throw new TypeError(x$);
  var m = o ? o.length : 0;
  if (m || (r &= -97, o = l = void 0), p = p === void 0 ? p : Of(Ef(p), 0), g = g === void 0 ? g : Ef(g), m -= l ? l.length : 0, r & k$) {
    var y = o, h = l;
    o = l = void 0;
  }
  var R = v ? void 0 : b$(n), P = [
    n,
    r,
    i,
    o,
    l,
    y,
    h,
    d,
    p,
    g
  ];
  if (R && m$(P, R), n = P[0], r = P[1], i = P[2], o = P[3], l = P[4], g = P[9] = P[9] === void 0 ? v ? 0 : n.length : Of(P[9] - m, 0), !g && r & ($f | Tf) && (r &= -25), !r || r == If)
    var $ = A$(n, r, i);
  else r == $f || r == Tf ? $ = h$(n, r, g) : (r == Sf || r == (If | Sf)) && !l.length ? $ = y$(n, r, i, o) : $ = _$.apply(void 0, P);
  var M = R ? g$ : w$;
  return C$(M($, P), n, r);
}
var Mc = E$, I$ = Mc, $$ = 128;
function T$(n, r, i) {
  return r = i ? void 0 : r, r = n && r == null ? n.length : r, I$(n, $$, void 0, void 0, void 0, void 0, r);
}
var S$ = T$, O$ = ci, P$ = di;
function F$(n, r) {
  return n && O$(r, P$(r), n);
}
var Mv = F$, M$ = ci, L$ = li;
function z$(n, r) {
  return n && M$(r, L$(r), n);
}
var j$ = z$;
function B$(n, r) {
  for (var i = -1, o = n == null ? 0 : n.length, l = 0, d = []; ++i < o; ) {
    var p = n[i];
    r(p, i, n) && (d[l++] = p);
  }
  return d;
}
var D$ = B$;
function W$() {
  return [];
}
var Lv = W$, N$ = D$, U$ = Lv, q$ = Object.prototype, G$ = q$.propertyIsEnumerable, Pf = Object.getOwnPropertySymbols, H$ = Pf ? function(n) {
  return n == null ? [] : (n = Object(n), N$(Pf(n), function(r) {
    return G$.call(n, r);
  }));
} : U$, Lc = H$, K$ = ci, Y$ = Lc;
function V$(n, r) {
  return K$(n, Y$(n), r);
}
var Z$ = V$, $o, Ff;
function zc() {
  if (Ff) return $o;
  Ff = 1;
  function n(r, i) {
    for (var o = -1, l = i.length, d = r.length; ++o < l; )
      r[d + o] = i[o];
    return r;
  }
  return $o = n, $o;
}
var J$ = zc(), X$ = xc, Q$ = Lc, eT = Lv, tT = Object.getOwnPropertySymbols, nT = tT ? function(n) {
  for (var r = []; n; )
    J$(r, Q$(n)), n = X$(n);
  return r;
} : eT, zv = nT, rT = ci, iT = zv;
function aT(n, r) {
  return rT(n, iT(n), r);
}
var sT = aT, oT = zc(), cT = Xe;
function lT(n, r, i) {
  var o = r(n);
  return cT(n) ? o : oT(o, i(n));
}
var jv = lT, dT = jv, uT = Lc, fT = di;
function pT(n) {
  return dT(n, fT, uT);
}
var Bv = pT, vT = jv, gT = zv, AT = li;
function hT(n) {
  return vT(n, AT, gT);
}
var _T = hT, yT = Wn, bT = vt, mT = yT(bT, "DataView"), wT = mT, CT = Wn, xT = vt, RT = CT(xT, "Promise"), kT = RT, To, Mf;
function Dv() {
  if (Mf) return To;
  Mf = 1;
  var n = Wn, r = vt, i = n(r, "Set");
  return To = i, To;
}
var dc = wT, uc = mc, fc = kT, pc = Dv(), vc = yv, Wv = Dn, mr = Kp, Lf = "[object Map]", ET = "[object Object]", zf = "[object Promise]", jf = "[object Set]", Bf = "[object WeakMap]", Df = "[object DataView]", IT = mr(dc), $T = mr(uc), TT = mr(fc), ST = mr(pc), OT = mr(vc), Ln = Wv;
(dc && Ln(new dc(new ArrayBuffer(1))) != Df || uc && Ln(new uc()) != Lf || fc && Ln(fc.resolve()) != zf || pc && Ln(new pc()) != jf || vc && Ln(new vc()) != Bf) && (Ln = function(n) {
  var r = Wv(n), i = r == ET ? n.constructor : void 0, o = i ? mr(i) : "";
  if (o)
    switch (o) {
      case IT:
        return Df;
      case $T:
        return Lf;
      case TT:
        return zf;
      case ST:
        return jf;
      case OT:
        return Bf;
    }
  return r;
});
var fi = Ln, PT = Object.prototype, FT = PT.hasOwnProperty;
function MT(n) {
  var r = n.length, i = new n.constructor(r);
  return r && typeof n[0] == "string" && FT.call(n, "index") && (i.index = n.index, i.input = n.input), i;
}
var LT = MT, zT = Cc;
function jT(n, r) {
  var i = r ? zT(n.buffer) : n.buffer;
  return new n.constructor(i, n.byteOffset, n.byteLength);
}
var BT = jT, DT = /\w*$/;
function WT(n) {
  var r = new n.constructor(n.source, DT.exec(n));
  return r.lastIndex = n.lastIndex, r;
}
var NT = WT, Wf = pr(), Nf = Wf ? Wf.prototype : void 0, Uf = Nf ? Nf.valueOf : void 0;
function UT(n) {
  return Uf ? Object(Uf.call(n)) : {};
}
var qT = UT, GT = Cc, HT = BT, KT = NT, YT = qT, VT = Xp, ZT = "[object Boolean]", JT = "[object Date]", XT = "[object Map]", QT = "[object Number]", eS = "[object RegExp]", tS = "[object Set]", nS = "[object String]", rS = "[object Symbol]", iS = "[object ArrayBuffer]", aS = "[object DataView]", sS = "[object Float32Array]", oS = "[object Float64Array]", cS = "[object Int8Array]", lS = "[object Int16Array]", dS = "[object Int32Array]", uS = "[object Uint8Array]", fS = "[object Uint8ClampedArray]", pS = "[object Uint16Array]", vS = "[object Uint32Array]";
function gS(n, r, i) {
  var o = n.constructor;
  switch (r) {
    case iS:
      return GT(n);
    case ZT:
    case JT:
      return new o(+n);
    case aS:
      return HT(n, i);
    case sS:
    case oS:
    case cS:
    case lS:
    case dS:
    case uS:
    case fS:
    case pS:
    case vS:
      return VT(n, i);
    case XT:
      return new o();
    case QT:
    case nS:
      return new o(n);
    case eS:
      return KT(n);
    case tS:
      return new o();
    case rS:
      return YT(n);
  }
}
var AS = gS, hS = fi, _S = Mt, yS = "[object Map]";
function bS(n) {
  return _S(n) && hS(n) == yS;
}
var mS = bS, wS = mS, CS = ka(), qf = ii.exports, Gf = qf && qf.isMap, xS = Gf ? CS(Gf) : wS, RS = xS, kS = fi, ES = Mt, IS = "[object Set]";
function $S(n) {
  return ES(n) && kS(n) == IS;
}
var TS = $S, SS = TS, OS = ka(), Hf = ii.exports, Kf = Hf && Hf.isSet, PS = Kf ? OS(Kf) : SS, FS = PS, MS = wa, LS = Sa, zS = av, jS = Mv, BS = j$, DS = ua.exports, WS = oi, NS = Z$, US = sT, qS = Bv, GS = _T, HS = fi, KS = LT, YS = AS, VS = ev, ZS = Xe, JS = dr.exports, XS = RS, QS = Nt, eO = FS, tO = di, nO = li, rO = 1, iO = 2, aO = 4, Nv = "[object Arguments]", sO = "[object Array]", oO = "[object Boolean]", cO = "[object Date]", lO = "[object Error]", Uv = "[object Function]", dO = "[object GeneratorFunction]", uO = "[object Map]", fO = "[object Number]", qv = "[object Object]", pO = "[object RegExp]", vO = "[object Set]", gO = "[object String]", AO = "[object Symbol]", hO = "[object WeakMap]", _O = "[object ArrayBuffer]", yO = "[object DataView]", bO = "[object Float32Array]", mO = "[object Float64Array]", wO = "[object Int8Array]", CO = "[object Int16Array]", xO = "[object Int32Array]", RO = "[object Uint8Array]", kO = "[object Uint8ClampedArray]", EO = "[object Uint16Array]", IO = "[object Uint32Array]", xe = {};
xe[Nv] = xe[sO] = xe[_O] = xe[yO] = xe[oO] = xe[cO] = xe[bO] = xe[mO] = xe[wO] = xe[CO] = xe[xO] = xe[uO] = xe[fO] = xe[qv] = xe[pO] = xe[vO] = xe[gO] = xe[AO] = xe[RO] = xe[kO] = xe[EO] = xe[IO] = !0;
xe[lO] = xe[Uv] = xe[hO] = !1;
function la(n, r, i, o, l, d) {
  var p, g = r & rO, v = r & iO, m = r & aO;
  if (i && (p = l ? i(n, o, l, d) : i(n)), p !== void 0)
    return p;
  if (!QS(n))
    return n;
  var y = ZS(n);
  if (y) {
    if (p = KS(n), !g)
      return WS(n, p);
  } else {
    var h = HS(n), R = h == Uv || h == dO;
    if (JS(n))
      return DS(n, g);
    if (h == qv || h == Nv || R && !l) {
      if (p = v || R ? {} : VS(n), !g)
        return v ? US(n, BS(p, n)) : NS(n, jS(p, n));
    } else {
      if (!xe[h])
        return l ? n : {};
      p = YS(n, h, g);
    }
  }
  d || (d = new MS());
  var P = d.get(n);
  if (P)
    return P;
  d.set(n, p), eO(n) ? n.forEach(function(O) {
    p.add(la(O, r, i, O, n, d));
  }) : XS(n) && n.forEach(function(O, F) {
    p.set(F, la(O, r, i, F, n, d));
  });
  var $ = m ? v ? GS : qS : v ? nO : tO, M = y ? void 0 : $(n);
  return LS(M || n, function(O, F) {
    M && (F = O, O = n[F]), zS(p, F, la(O, r, i, F, n, d));
  }), p;
}
var Gv = la, $O = Gv, TO = 4;
function SO(n) {
  return $O(n, TO);
}
var OO = SO, PO = Mc, FO = 8;
function jc(n, r, i) {
  r = i ? void 0 : r;
  var o = PO(n, FO, void 0, void 0, void 0, void 0, void 0, r);
  return o.placeholder = jc.placeholder, o;
}
jc.placeholder = {};
var MO = jc, LO = Dn, zO = Mt, jO = rv, BO = "[object DOMException]", DO = "[object Error]";
function WO(n) {
  if (!zO(n))
    return !1;
  var r = LO(n);
  return r == DO || r == BO || typeof n.message == "string" && typeof n.name == "string" && !jO(n);
}
var NO = WO, UO = fi, qO = Mt, GO = "[object WeakMap]";
function HO(n) {
  return qO(n) && UO(n) == GO;
}
var KO = HO, So, Yf;
function YO() {
  if (Yf) return So;
  Yf = 1;
  var n = "__lodash_hash_undefined__";
  function r(i) {
    return this.__data__.set(i, n), this;
  }
  return So = r, So;
}
var Oo, Vf;
function VO() {
  if (Vf) return Oo;
  Vf = 1;
  function n(r) {
    return this.__data__.has(r);
  }
  return Oo = n, Oo;
}
var Po, Zf;
function Hv() {
  if (Zf) return Po;
  Zf = 1;
  var n = wc, r = YO(), i = VO();
  function o(l) {
    var d = -1, p = l == null ? 0 : l.length;
    for (this.__data__ = new n(); ++d < p; )
      this.add(l[d]);
  }
  return o.prototype.add = o.prototype.push = r, o.prototype.has = i, Po = o, Po;
}
function ZO(n, r) {
  for (var i = -1, o = n == null ? 0 : n.length; ++i < o; )
    if (r(n[i], i, n))
      return !0;
  return !1;
}
var JO = ZO, Fo, Jf;
function Kv() {
  if (Jf) return Fo;
  Jf = 1;
  function n(r, i) {
    return r.has(i);
  }
  return Fo = n, Fo;
}
var XO = Hv(), QO = JO, eP = Kv(), tP = 1, nP = 2;
function rP(n, r, i, o, l, d) {
  var p = i & tP, g = n.length, v = r.length;
  if (g != v && !(p && v > g))
    return !1;
  var m = d.get(n), y = d.get(r);
  if (m && y)
    return m == r && y == n;
  var h = -1, R = !0, P = i & nP ? new XO() : void 0;
  for (d.set(n, r), d.set(r, n); ++h < g; ) {
    var $ = n[h], M = r[h];
    if (o)
      var O = p ? o(M, $, h, r, n, d) : o($, M, h, n, r, d);
    if (O !== void 0) {
      if (O)
        continue;
      R = !1;
      break;
    }
    if (P) {
      if (!QO(r, function(F, L) {
        if (!eP(P, L) && ($ === F || l($, F, i, o, d)))
          return P.push(L);
      })) {
        R = !1;
        break;
      }
    } else if (!($ === M || l($, M, i, o, d))) {
      R = !1;
      break;
    }
  }
  return d.delete(n), d.delete(r), R;
}
var Yv = rP;
function iP(n) {
  var r = -1, i = Array(n.size);
  return n.forEach(function(o, l) {
    i[++r] = [l, o];
  }), i;
}
var aP = iP, Mo, Xf;
function Bc() {
  if (Xf) return Mo;
  Xf = 1;
  function n(r) {
    var i = -1, o = Array(r.size);
    return r.forEach(function(l) {
      o[++i] = l;
    }), o;
  }
  return Mo = n, Mo;
}
var Qf = pr(), ep = Jp, sP = si, oP = Yv, cP = aP, lP = Bc(), dP = 1, uP = 2, fP = "[object Boolean]", pP = "[object Date]", vP = "[object Error]", gP = "[object Map]", AP = "[object Number]", hP = "[object RegExp]", _P = "[object Set]", yP = "[object String]", bP = "[object Symbol]", mP = "[object ArrayBuffer]", wP = "[object DataView]", tp = Qf ? Qf.prototype : void 0, Lo = tp ? tp.valueOf : void 0;
function CP(n, r, i, o, l, d, p) {
  switch (i) {
    case wP:
      if (n.byteLength != r.byteLength || n.byteOffset != r.byteOffset)
        return !1;
      n = n.buffer, r = r.buffer;
    case mP:
      return !(n.byteLength != r.byteLength || !d(new ep(n), new ep(r)));
    case fP:
    case pP:
    case AP:
      return sP(+n, +r);
    case vP:
      return n.name == r.name && n.message == r.message;
    case hP:
    case yP:
      return n == r + "";
    case gP:
      var g = cP;
    case _P:
      var v = o & dP;
      if (g || (g = lP), n.size != r.size && !v)
        return !1;
      var m = p.get(n);
      if (m)
        return m == r;
      o |= uP, p.set(n, r);
      var y = oP(g(n), g(r), o, l, d, p);
      return p.delete(n), y;
    case bP:
      if (Lo)
        return Lo.call(n) == Lo.call(r);
  }
  return !1;
}
var xP = CP, np = Bv, RP = 1, kP = Object.prototype, EP = kP.hasOwnProperty;
function IP(n, r, i, o, l, d) {
  var p = i & RP, g = np(n), v = g.length, m = np(r), y = m.length;
  if (v != y && !p)
    return !1;
  for (var h = v; h--; ) {
    var R = g[h];
    if (!(p ? R in r : EP.call(r, R)))
      return !1;
  }
  var P = d.get(n), $ = d.get(r);
  if (P && $)
    return P == r && $ == n;
  var M = !0;
  d.set(n, r), d.set(r, n);
  for (var O = p; ++h < v; ) {
    R = g[h];
    var F = n[R], L = r[R];
    if (o)
      var J = p ? o(L, F, R, r, n, d) : o(F, L, R, n, r, d);
    if (!(J === void 0 ? F === L || l(F, L, i, o, d) : J)) {
      M = !1;
      break;
    }
    O || (O = R == "constructor");
  }
  if (M && !O) {
    var ne = n.constructor, ye = r.constructor;
    ne != ye && "constructor" in n && "constructor" in r && !(typeof ne == "function" && ne instanceof ne && typeof ye == "function" && ye instanceof ye) && (M = !1);
  }
  return d.delete(n), d.delete(r), M;
}
var $P = IP, zo = wa, TP = Yv, SP = xP, OP = $P, rp = fi, ip = Xe, ap = dr.exports, PP = Ec, FP = 1, sp = "[object Arguments]", op = "[object Array]", oa = "[object Object]", MP = Object.prototype, cp = MP.hasOwnProperty;
function LP(n, r, i, o, l, d) {
  var p = ip(n), g = ip(r), v = p ? op : rp(n), m = g ? op : rp(r);
  v = v == sp ? oa : v, m = m == sp ? oa : m;
  var y = v == oa, h = m == oa, R = v == m;
  if (R && ap(n)) {
    if (!ap(r))
      return !1;
    p = !0, y = !1;
  }
  if (R && !y)
    return d || (d = new zo()), p || PP(n) ? TP(n, r, i, o, l, d) : SP(n, r, v, i, o, l, d);
  if (!(i & FP)) {
    var P = y && cp.call(n, "__wrapped__"), $ = h && cp.call(r, "__wrapped__");
    if (P || $) {
      var M = P ? n.value() : n, O = $ ? r.value() : r;
      return d || (d = new zo()), l(M, O, i, o, d);
    }
  }
  return R ? (d || (d = new zo()), OP(n, r, i, o, l, d)) : !1;
}
var zP = LP, jP = zP, lp = Mt;
function Vv(n, r, i, o, l) {
  return n === r ? !0 : n == null || r == null || !lp(n) && !lp(r) ? n !== n && r !== r : jP(n, r, i, o, Vv, l);
}
var Zv = Vv, BP = wa, DP = Zv, WP = 1, NP = 2;
function UP(n, r, i, o) {
  var l = i.length, d = l, p = !o;
  if (n == null)
    return !d;
  for (n = Object(n); l--; ) {
    var g = i[l];
    if (p && g[2] ? g[1] !== n[g[0]] : !(g[0] in n))
      return !1;
  }
  for (; ++l < d; ) {
    g = i[l];
    var v = g[0], m = n[v], y = g[1];
    if (p && g[2]) {
      if (m === void 0 && !(v in n))
        return !1;
    } else {
      var h = new BP();
      if (o)
        var R = o(m, y, v, n, r, h);
      if (!(R === void 0 ? DP(y, m, WP | NP, o, h) : R))
        return !1;
    }
  }
  return !0;
}
var qP = UP, GP = Nt;
function HP(n) {
  return n === n && !GP(n);
}
var Jv = HP, KP = Jv, YP = di;
function VP(n) {
  for (var r = YP(n), i = r.length; i--; ) {
    var o = r[i], l = n[o];
    r[i] = [o, l, KP(l)];
  }
  return r;
}
var ZP = VP;
function JP(n, r) {
  return function(i) {
    return i == null ? !1 : i[n] === r && (r !== void 0 || n in Object(i));
  };
}
var Xv = JP, XP = qP, QP = ZP, eF = Xv;
function tF(n) {
  var r = QP(n);
  return r.length == 1 && r[0][2] ? eF(r[0][0], r[0][1]) : function(i) {
    return i === n || XP(i, n, r);
  };
}
var nF = tF, rF = Xe, iF = br, aF = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, sF = /^\w*$/;
function oF(n, r) {
  if (rF(n))
    return !1;
  var i = typeof n;
  return i == "number" || i == "symbol" || i == "boolean" || n == null || iF(n) ? !0 : sF.test(n) || !aF.test(n) || r != null && n in Object(r);
}
var Dc = oF, Qv = wc, cF = "Expected a function";
function Wc(n, r) {
  if (typeof n != "function" || r != null && typeof r != "function")
    throw new TypeError(cF);
  var i = function() {
    var o = arguments, l = r ? r.apply(this, o) : o[0], d = i.cache;
    if (d.has(l))
      return d.get(l);
    var p = n.apply(this, o);
    return i.cache = d.set(l, p) || d, p;
  };
  return i.cache = new (Wc.Cache || Qv)(), i;
}
Wc.Cache = Qv;
var lF = Wc, dF = lF, uF = 500;
function fF(n) {
  var r = dF(n, function(o) {
    return i.size === uF && i.clear(), o;
  }), i = r.cache;
  return r;
}
var pF = fF, vF = pF, gF = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, AF = /\\(\\)?/g, hF = vF(function(n) {
  var r = [];
  return n.charCodeAt(0) === 46 && r.push(""), n.replace(gF, function(i, o, l, d) {
    r.push(l ? d.replace(AF, "$1") : o || i);
  }), r;
}), eg = hF, jo, dp;
function Nc() {
  if (dp) return jo;
  dp = 1;
  function n(r, i) {
    for (var o = -1, l = r == null ? 0 : r.length, d = Array(l); ++o < l; )
      d[o] = i(r[o], o, r);
    return d;
  }
  return jo = n, jo;
}
var up = pr(), _F = Nc(), yF = Xe, bF = br, fp = up ? up.prototype : void 0, pp = fp ? fp.toString : void 0;
function tg(n) {
  if (typeof n == "string")
    return n;
  if (yF(n))
    return _F(n, tg) + "";
  if (bF(n))
    return pp ? pp.call(n) : "";
  var r = n + "";
  return r == "0" && 1 / n == -1 / 0 ? "-0" : r;
}
var mF = tg, wF = mF;
function CF(n) {
  return n == null ? "" : wF(n);
}
var ng = CF, xF = Xe, RF = Dc, kF = eg, EF = ng;
function IF(n, r) {
  return xF(n) ? n : RF(n, r) ? [n] : kF(EF(n));
}
var rg = IF, $F = br;
function TF(n) {
  if (typeof n == "string" || $F(n))
    return n;
  var r = n + "";
  return r == "0" && 1 / n == -1 / 0 ? "-0" : r;
}
var pi = TF, Bo, vp;
function Uc() {
  if (vp) return Bo;
  vp = 1;
  var n = rg, r = pi;
  function i(o, l) {
    l = n(l, o);
    for (var d = 0, p = l.length; o != null && d < p; )
      o = o[r(l[d++])];
    return d && d == p ? o : void 0;
  }
  return Bo = i, Bo;
}
var SF = Uc();
function OF(n, r, i) {
  var o = n == null ? void 0 : SF(n, r);
  return o === void 0 ? i : o;
}
var PF = OF;
function FF(n, r) {
  return n != null && r in Object(n);
}
var MF = FF, LF = rg, zF = Ra, jF = Xe, BF = Ea, DF = kc, WF = pi;
function NF(n, r, i) {
  r = LF(r, n);
  for (var o = -1, l = r.length, d = !1; ++o < l; ) {
    var p = WF(r[o]);
    if (!(d = n != null && i(n, p)))
      break;
    n = n[p];
  }
  return d || ++o != l ? d : (l = n == null ? 0 : n.length, !!l && DF(l) && BF(p, l) && (jF(n) || zF(n)));
}
var UF = NF, qF = MF, GF = UF;
function HF(n, r) {
  return n != null && GF(n, r, qF);
}
var KF = HF, YF = Zv, VF = PF, ZF = KF, JF = Dc, XF = Jv, QF = Xv, eM = pi, tM = 1, nM = 2;
function rM(n, r) {
  return JF(n) && XF(r) ? QF(eM(n), r) : function(i) {
    var o = VF(i, n);
    return o === void 0 && o === r ? ZF(i, n) : YF(r, o, tM | nM);
  };
}
var iM = rM;
function aM(n) {
  return function(r) {
    return r == null ? void 0 : r[n];
  };
}
var sM = aM, oM = Uc();
function cM(n) {
  return function(r) {
    return oM(r, n);
  };
}
var lM = cM, dM = sM, uM = lM, fM = Dc, pM = pi;
function vM(n) {
  return fM(n) ? dM(pM(n)) : uM(n);
}
var gM = vM, AM = nF, hM = iM, _M = _r, yM = Xe, bM = gM;
function mM(n) {
  return typeof n == "function" ? n : n == null ? _M : typeof n == "object" ? yM(n) ? hM(n[0], n[1]) : AM(n) : bM(n);
}
var Pa = mM, wM = Gv, CM = Pa, xM = 1;
function RM(n) {
  return CM(typeof n == "function" ? n : wM(n, xM));
}
var kM = RM, Do, gp;
function EM() {
  if (gp) return Do;
  gp = 1;
  var n = pr(), r = Ra, i = Xe, o = n ? n.isConcatSpreadable : void 0;
  function l(d) {
    return i(d) || r(d) || !!(o && d && d[o]);
  }
  return Do = l, Do;
}
var Wo, Ap;
function ig() {
  if (Ap) return Wo;
  Ap = 1;
  var n = zc(), r = EM();
  function i(o, l, d, p, g) {
    var v = -1, m = o.length;
    for (d || (d = r), g || (g = []); ++v < m; ) {
      var y = o[v];
      l > 0 && d(y) ? l > 1 ? i(y, l - 1, d, p, g) : n(g, y) : p || (g[g.length] = y);
    }
    return g;
  }
  return Wo = i, Wo;
}
var No, hp;
function IM() {
  if (hp) return No;
  hp = 1;
  var n = ig();
  function r(i) {
    var o = i == null ? 0 : i.length;
    return o ? n(i, 1) : [];
  }
  return No = r, No;
}
var Uo, _p;
function ag() {
  if (_p) return Uo;
  _p = 1;
  var n = IM(), r = cv, i = $c;
  function o(l) {
    return i(r(l, void 0, n), l + "");
  }
  return Uo = o, Uo;
}
var $M = Mc, TM = ag(), SM = 256, OM = TM(function(n, r) {
  return $M(n, SM, void 0, void 0, void 0, r);
}), PM = OM, FM = Nc(), MM = oi, LM = Xe, zM = br, jM = eg, BM = pi, DM = ng;
function WM(n) {
  return LM(n) ? FM(n, BM) : zM(n) ? [n] : MM(jM(DM(n)));
}
var NM = WM, UM = {
  ary: S$,
  assign: Mv,
  clone: OO,
  curry: MO,
  forEach: Sa,
  isArray: Xe,
  isError: NO,
  isFunction: ya,
  isWeakMap: KO,
  iteratee: kM,
  keys: gv,
  rearg: PM,
  toInteger: Fv,
  toPath: NM
}, qM = Kk, GM = UM;
function HM(n, r, i) {
  return qM(GM, n, r, i);
}
var Fa = HM, qo, yp;
function KM() {
  if (yp) return qo;
  yp = 1;
  function n(r) {
    for (var i = -1, o = r == null ? 0 : r.length, l = 0, d = []; ++i < o; ) {
      var p = r[i];
      p && (d[l++] = p);
    }
    return d;
  }
  return qo = n, qo;
}
var Go, bp;
function YM() {
  return bp || (bp = 1, Go = {
    cap: !1,
    curry: !1,
    fixed: !1,
    immutable: !1,
    rearg: !1
  }), Go;
}
var VM = Fa, sg = VM("compact", KM(), YM());
sg.placeholder = ui();
var ZM = sg, Ho, mp;
function JM() {
  if (mp) return Ho;
  mp = 1;
  var n = Pc(), r = ag(), i = Oc(), o = Rv(), l = Xe, d = kv(), p = "Expected a function", g = 8, v = 32, m = 128, y = 256;
  function h(R) {
    return r(function(P) {
      var $ = P.length, M = $, O = n.prototype.thru;
      for (R && P.reverse(); M--; ) {
        var F = P[M];
        if (typeof F != "function")
          throw new TypeError(p);
        if (O && !L && o(F) == "wrapper")
          var L = new n([], !0);
      }
      for (M = L ? M : $; ++M < $; ) {
        F = P[M];
        var J = o(F), ne = J == "wrapper" ? i(F) : void 0;
        ne && d(ne[0]) && ne[1] == (m | g | v | y) && !ne[4].length && ne[9] == 1 ? L = L[o(ne[0])].apply(L, ne[3]) : L = F.length == 1 && d(F) ? L[J]() : L.thru(F);
      }
      return function() {
        var ye = arguments, Ae = ye[0];
        if (L && ye.length == 1 && l(Ae))
          return L.plant(Ae).value();
        for (var ve = 0, ce = $ ? P[ve].apply(this, ye) : Ae; ++ve < $; )
          ce = P[ve].call(this, ce);
        return ce;
      };
    });
  }
  return Ho = h, Ho;
}
var Ko, wp;
function XM() {
  if (wp) return Ko;
  wp = 1;
  var n = JM(), r = n();
  return Ko = r, Ko;
}
var QM = Fa, og = QM("flow", XM());
og.placeholder = ui();
var eL = og, Yo, Cp;
function tL() {
  if (Cp) return Yo;
  Cp = 1;
  var n = hv, r = hr;
  function i(o, l) {
    var d = -1, p = r(o) ? Array(o.length) : [];
    return n(o, function(g, v, m) {
      p[++d] = l(g, v, m);
    }), p;
  }
  return Yo = i, Yo;
}
var Vo, xp;
function nL() {
  if (xp) return Vo;
  xp = 1;
  function n(r, i) {
    var o = r.length;
    for (r.sort(i); o--; )
      r[o] = r[o].value;
    return r;
  }
  return Vo = n, Vo;
}
var Zo, Rp;
function rL() {
  if (Rp) return Zo;
  Rp = 1;
  var n = br;
  function r(i, o) {
    if (i !== o) {
      var l = i !== void 0, d = i === null, p = i === i, g = n(i), v = o !== void 0, m = o === null, y = o === o, h = n(o);
      if (!m && !h && !g && i > o || g && v && y && !m && !h || d && v && y || !l && y || !p)
        return 1;
      if (!d && !g && !h && i < o || h && l && p && !d && !g || m && l && p || !v && p || !y)
        return -1;
    }
    return 0;
  }
  return Zo = r, Zo;
}
var Jo, kp;
function iL() {
  if (kp) return Jo;
  kp = 1;
  var n = rL();
  function r(i, o, l) {
    for (var d = -1, p = i.criteria, g = o.criteria, v = p.length, m = l.length; ++d < v; ) {
      var y = n(p[d], g[d]);
      if (y) {
        if (d >= m)
          return y;
        var h = l[d];
        return y * (h == "desc" ? -1 : 1);
      }
    }
    return i.index - o.index;
  }
  return Jo = r, Jo;
}
var Xo, Ep;
function aL() {
  if (Ep) return Xo;
  Ep = 1;
  var n = Nc(), r = Uc(), i = Pa, o = tL(), l = nL(), d = ka(), p = iL(), g = _r, v = Xe;
  function m(y, h, R) {
    h.length ? h = n(h, function(M) {
      return v(M) ? function(O) {
        return r(O, M.length === 1 ? M[0] : M);
      } : M;
    }) : h = [g];
    var P = -1;
    h = n(h, d(i));
    var $ = o(y, function(M, O, F) {
      var L = n(h, function(J) {
        return J(M);
      });
      return { criteria: L, index: ++P, value: M };
    });
    return l($, function(M, O) {
      return p(M, O, R);
    });
  }
  return Xo = m, Xo;
}
var Qo, Ip;
function sL() {
  if (Ip) return Qo;
  Ip = 1;
  var n = ig(), r = aL(), i = dv, o = uv, l = i(function(d, p) {
    if (d == null)
      return [];
    var g = p.length;
    return g > 1 && o(d, p[0], p[1]) ? p = [] : g > 2 && o(p[0], p[1], p[2]) && (p = [p[0]]), r(d, n(p, 1), []);
  });
  return Qo = l, Qo;
}
var oL = Fa, cg = oL("sortBy", sL());
cg.placeholder = ui();
var cL = cg, ec, $p;
function lL() {
  if ($p) return ec;
  $p = 1;
  function n(r, i, o) {
    for (var l = -1, d = r == null ? 0 : r.length; ++l < d; )
      if (o(i, r[l]))
        return !0;
    return !1;
  }
  return ec = n, ec;
}
var tc, Tp;
function dL() {
  if (Tp) return tc;
  Tp = 1;
  var n = Dv(), r = xv(), i = Bc(), o = 1 / 0, l = n && 1 / i(new n([, -0]))[1] == o ? function(d) {
    return new n(d);
  } : r;
  return tc = l, tc;
}
var nc, Sp;
function uL() {
  if (Sp) return nc;
  Sp = 1;
  var n = Hv(), r = Iv(), i = lL(), o = Kv(), l = dL(), d = Bc(), p = 200;
  function g(v, m, y) {
    var h = -1, R = r, P = v.length, $ = !0, M = [], O = M;
    if (y)
      $ = !1, R = i;
    else if (P >= p) {
      var F = m ? null : l(v);
      if (F)
        return d(F);
      $ = !1, R = o, O = new n();
    } else
      O = m ? [] : M;
    e:
      for (; ++h < P; ) {
        var L = v[h], J = m ? m(L) : L;
        if (L = y || L !== 0 ? L : 0, $ && J === J) {
          for (var ne = O.length; ne--; )
            if (O[ne] === J)
              continue e;
          m && O.push(J), M.push(L);
        } else R(O, J, y) || (O !== M && O.push(J), M.push(L));
      }
    return M;
  }
  return nc = g, nc;
}
var rc, Op;
function fL() {
  if (Op) return rc;
  Op = 1;
  var n = Pa, r = uL();
  function i(o, l) {
    return o && o.length ? r(o, n(l)) : [];
  }
  return rc = i, rc;
}
var pL = Fa, lg = pL("uniqBy", fL());
lg.placeholder = ui();
var vL = lg, gL = Ca, AL = Av, hL = Pa;
function _L(n, r) {
  var i = {};
  return r = hL(r), AL(n, function(o, l, d) {
    gL(i, r(o, l, d), o);
  }), i;
}
var yL = _L, bL = {
  "selectors.editsAndActivity.c2pa.color_adjustments.description": "Byly upraveny vlastnosti, jako je tón, sytost, křivky, stíny nebo světla",
  "selectors.editsAndActivity.c2pa.color_adjustments.label": "Úpravy barev nebo expozice",
  "selectors.editsAndActivity.c2pa.converted.description": "Formát datového zdroje byl změněn",
  "selectors.editsAndActivity.c2pa.converted.label": "Převedený datový zdroj",
  "selectors.editsAndActivity.c2pa.created.description": "Byl vytvořen nový soubor nebo obsah",
  "selectors.editsAndActivity.c2pa.created.label": "Vytvořeno",
  "selectors.editsAndActivity.c2pa.cropped.description": "Byly použity nástroje pro oříznutí, zmenšení nebo rozšíření viditelné oblasti obsahu",
  "selectors.editsAndActivity.c2pa.cropped.label": "Úpravy oříznutí",
  "selectors.editsAndActivity.c2pa.deleted.description": "Odstraněné vizuální oblasti nebo doby trvání obsahu",
  "selectors.editsAndActivity.c2pa.deleted.label": "Odstraněný obsah",
  "selectors.editsAndActivity.c2pa.drawing.description": "Byly použity nástroje, jako jsou tužky, štětce, gumy nebo nástroje tvar, cesta nebo pero",
  "selectors.editsAndActivity.c2pa.drawing.label": "Úpravy kresby",
  "selectors.editsAndActivity.c2pa.dubbed.description": "Nahrazený zvuk",
  "selectors.editsAndActivity.c2pa.dubbed.label": "Dublováno",
  "selectors.editsAndActivity.c2pa.edited.description": "Byly provedeny další změny",
  "selectors.editsAndActivity.c2pa.edited.label": "Další úpravy",
  "selectors.editsAndActivity.c2pa.filtered.description": "Byly použity nástroje, jako jsou filtry, styly nebo efekty, ke změně vzhledu",
  "selectors.editsAndActivity.c2pa.filtered.label": "Úpravy filtrů nebo stylů",
  "selectors.editsAndActivity.c2pa.opened.description": "Byl otevřen existující soubor",
  "selectors.editsAndActivity.c2pa.opened.label": "Otevřeno",
  "selectors.editsAndActivity.c2pa.orientation.description": "Byla změněna poloha nebo orientace (otočení, převrácení atd.)",
  "selectors.editsAndActivity.c2pa.orientation.label": "Orientace úpravy",
  "selectors.editsAndActivity.c2pa.placed.description": "Do tohoto souboru byl přidán existující obsah",
  "selectors.editsAndActivity.c2pa.placed.label": "Importováno",
  "selectors.editsAndActivity.c2pa.published.description": "Obdržený a distribuovaný obrázek",
  "selectors.editsAndActivity.c2pa.published.label": "Publikovaný obrázek",
  "selectors.editsAndActivity.c2pa.removed.description": "Ze souboru byl odstraněn jeden nebo více datových zdrojů",
  "selectors.editsAndActivity.c2pa.removed.label": "Datový zdroj byl odstraněn",
  "selectors.editsAndActivity.c2pa.repackaged.description": "Datový zdroj byl přebalen, aniž by byl zpracován",
  "selectors.editsAndActivity.c2pa.repackaged.label": "Přebalený datový zdroj",
  "selectors.editsAndActivity.c2pa.resized.description": "Byly změněny rozměry nebo velikost souboru",
  "selectors.editsAndActivity.c2pa.resized.label": "Změny velikosti",
  "selectors.editsAndActivity.c2pa.transcoded.description": "Zpracování nebo komprimace datového zdroje za účelem optimalizace pro zobrazení",
  "selectors.editsAndActivity.c2pa.transcoded.label": "Zpracovaný datový zdroj",
  "selectors.editsAndActivity.c2pa.translated.description": "Přeložený obsah",
  "selectors.editsAndActivity.c2pa.translated.label": "Přeloženo",
  "selectors.editsAndActivity.c2pa.unknown.description": "Byly provedeny další úpravy nebo aktivita, kterou nebylo možné rozpoznat",
  "selectors.editsAndActivity.c2pa.unknown.label": "Neznámé úpravy nebo aktivita",
  "selectors.editsAndActivity.c2pa.watermarked.description": "Byl použit neviditelný vodoznak, který zlepší trvanlivost údajů Content Credentials.",
  "selectors.editsAndActivity.c2pa.watermarked.label": "Vodoznak",
  "selectors.editsAndActivity.c2pa.edited.metadata.description": "Provedli změny v metadatech souboru",
  "selectors.editsAndActivity.c2pa.edited.metadata.label": "Změny metadat"
}, mL = {
  "selectors.editsAndActivity.c2pa.color_adjustments.description": "Justerede egenskaber såsom tone, mætning, kurver, skygger eller fremhævninger",
  "selectors.editsAndActivity.c2pa.color_adjustments.label": "Farve- eller eksponeringsredigeringer",
  "selectors.editsAndActivity.c2pa.converted.description": "Aktivets format blev ændret",
  "selectors.editsAndActivity.c2pa.converted.label": "Konverteret aktiv",
  "selectors.editsAndActivity.c2pa.created.description": "Oprettede en ny fil eller nyt indhold",
  "selectors.editsAndActivity.c2pa.created.label": "Oprettede",
  "selectors.editsAndActivity.c2pa.cropped.description": "Brugte beskæringsværktøjer til at reducere eller udvide synligt indholdsområde",
  "selectors.editsAndActivity.c2pa.cropped.label": "Beskæringsredigeringer",
  "selectors.editsAndActivity.c2pa.deleted.description": "Slettede visuelle områder eller varigheder af indhold",
  "selectors.editsAndActivity.c2pa.deleted.label": "Slettet indhold",
  "selectors.editsAndActivity.c2pa.drawing.description": "Brugte værktøjer såsom blyanter, pensler, viskelædere eller form-, sti- eller penneværktøjer",
  "selectors.editsAndActivity.c2pa.drawing.label": "Tegneredigeringer",
  "selectors.editsAndActivity.c2pa.dubbed.description": "Erstattet lyd",
  "selectors.editsAndActivity.c2pa.dubbed.label": "Tilnavn givet",
  "selectors.editsAndActivity.c2pa.edited.description": "Foretog andre ændringer",
  "selectors.editsAndActivity.c2pa.edited.label": "Andre redigeringer",
  "selectors.editsAndActivity.c2pa.filtered.description": "Brugte værktøjer såsom filtre, formater eller effekter til at ændre udseende",
  "selectors.editsAndActivity.c2pa.filtered.label": "Filter- eller formatredigeringer",
  "selectors.editsAndActivity.c2pa.opened.description": "Åbnede en allerede eksisterende fil",
  "selectors.editsAndActivity.c2pa.opened.label": "Åbnede",
  "selectors.editsAndActivity.c2pa.orientation.description": "Ændrede placering eller retning (roteret, vendt osv.)",
  "selectors.editsAndActivity.c2pa.orientation.label": "Retningsredigeringer",
  "selectors.editsAndActivity.c2pa.placed.description": "Føjede allerede eksisterende indhold til denne fil",
  "selectors.editsAndActivity.c2pa.placed.label": "Importerede",
  "selectors.editsAndActivity.c2pa.published.description": "Modtaget og distribueret billede",
  "selectors.editsAndActivity.c2pa.published.label": "Udgivet billede",
  "selectors.editsAndActivity.c2pa.removed.description": "Ét eller flere aktiver blev fjernet fra filen",
  "selectors.editsAndActivity.c2pa.removed.label": "Aktiv fjernet",
  "selectors.editsAndActivity.c2pa.repackaged.description": "Aktivet blev ompakket uden at blive behandlet",
  "selectors.editsAndActivity.c2pa.repackaged.label": "Ompakket aktiv",
  "selectors.editsAndActivity.c2pa.resized.description": "Ændrede dimensioner eller filstørrelse",
  "selectors.editsAndActivity.c2pa.resized.label": "Ændring af størrelse på redigeringer",
  "selectors.editsAndActivity.c2pa.transcoded.description": "Behandlede eller komprimerede et aktiv for at optimere til visning",
  "selectors.editsAndActivity.c2pa.transcoded.label": "Behandlet aktiv",
  "selectors.editsAndActivity.c2pa.translated.description": "Oversat indhold",
  "selectors.editsAndActivity.c2pa.translated.label": "Oversat",
  "selectors.editsAndActivity.c2pa.unknown.description": "Foretog andre redigeringer eller aktiviteter, der ikke kunne genkendes",
  "selectors.editsAndActivity.c2pa.unknown.label": "Ukendte redigeringer eller ukendt aktivitet",
  "selectors.editsAndActivity.c2pa.watermarked.description": "Et usynligt vandmærke er blevet anvendt for at forbedre varigheden af denne Content Credential",
  "selectors.editsAndActivity.c2pa.watermarked.label": "Med vandmærke",
  "selectors.editsAndActivity.c2pa.edited.metadata.description": "Foretog ændringer af filmetadata",
  "selectors.editsAndActivity.c2pa.edited.metadata.label": "Ændringer af metadata"
}, wL = {
  "selectors.editsAndActivity.c2pa.color_adjustments.description": "Angepasste Eigenschaften wie Farbton, Sättigung, Kurven, Schatten oder Glanzlichter",
  "selectors.editsAndActivity.c2pa.color_adjustments.label": "Änderung von Farbe oder Belichtung",
  "selectors.editsAndActivity.c2pa.converted.description": "Das Format des Assets wurde geändert",
  "selectors.editsAndActivity.c2pa.converted.label": "Konvertiertes Asset",
  "selectors.editsAndActivity.c2pa.created.description": "Neue Datei oder neuen Inhalt erstellt",
  "selectors.editsAndActivity.c2pa.created.label": "Erstellt",
  "selectors.editsAndActivity.c2pa.cropped.description": "Verwendete Zuschneidewerkzeuge, Verkleinerung oder Erweiterung des sichtbaren Inhaltsbereichs",
  "selectors.editsAndActivity.c2pa.cropped.label": "Zuschneiden von Änderungen",
  "selectors.editsAndActivity.c2pa.deleted.description": "Gelöschte visuelle Bereiche oder Inhaltsdauern",
  "selectors.editsAndActivity.c2pa.deleted.label": "Gelöschter Inhalt",
  "selectors.editsAndActivity.c2pa.drawing.description": "Verwendete Werkzeuge wie Stifte, Pinsel, Radierer oder Form-, Pfad- oder Zeichenstift-Werkzeuge",
  "selectors.editsAndActivity.c2pa.drawing.label": "Zeichnungsänderungen",
  "selectors.editsAndActivity.c2pa.dubbed.description": "Ersetztes Audio",
  "selectors.editsAndActivity.c2pa.dubbed.label": "Synchronisiert",
  "selectors.editsAndActivity.c2pa.edited.description": "Vorgenommene sonstige Änderungen",
  "selectors.editsAndActivity.c2pa.edited.label": "Sonstige Änderungen",
  "selectors.editsAndActivity.c2pa.filtered.description": "Verwendete Tools wie Filter, Stile, Formate oder Effekte, die das Erscheinungsbild ändern",
  "selectors.editsAndActivity.c2pa.filtered.label": "Änderungen filtern oder gestalten",
  "selectors.editsAndActivity.c2pa.opened.description": "Vorhandene Datei geöffnet",
  "selectors.editsAndActivity.c2pa.opened.label": "Geöffnet",
  "selectors.editsAndActivity.c2pa.orientation.description": "Position oder Ausrichtung geändert (gedreht, gespiegelt usw.)",
  "selectors.editsAndActivity.c2pa.orientation.label": "Ausrichtungsänderungen",
  "selectors.editsAndActivity.c2pa.placed.description": "Vorhandenen Inhalt zu dieser Datei hinzugefügt",
  "selectors.editsAndActivity.c2pa.placed.label": "Importiert",
  "selectors.editsAndActivity.c2pa.published.description": "Bild empfangen und weiterverteilt",
  "selectors.editsAndActivity.c2pa.published.label": "Bild veröffentlicht",
  "selectors.editsAndActivity.c2pa.removed.description": "Ein oder mehrere Assets wurden aus der Datei entfernt",
  "selectors.editsAndActivity.c2pa.removed.label": "Asset entfernt",
  "selectors.editsAndActivity.c2pa.repackaged.description": "Asset wurde unbearbeitet neu verpackt",
  "selectors.editsAndActivity.c2pa.repackaged.label": "Neu verpacktes Asset",
  "selectors.editsAndActivity.c2pa.resized.description": "Geänderte Abmessungen oder Dateigröße",
  "selectors.editsAndActivity.c2pa.resized.label": "Größenänderungen",
  "selectors.editsAndActivity.c2pa.transcoded.description": "Ein Asset wurde verarbeitet oder komprimiert, um es für die Anzeige zu optimieren",
  "selectors.editsAndActivity.c2pa.transcoded.label": "Verarbeitetes Asset",
  "selectors.editsAndActivity.c2pa.translated.description": "Übersetzter Inhalt",
  "selectors.editsAndActivity.c2pa.translated.label": "Übersetzt",
  "selectors.editsAndActivity.c2pa.unknown.description": "Andere Änderungen oder Aktivitäten durchgeführt, die nicht erkannt werden konnten",
  "selectors.editsAndActivity.c2pa.unknown.label": "Unbekannte Änderungen oder Aktivitäten",
  "selectors.editsAndActivity.c2pa.watermarked.description": "Es wurde ein unsichtbares Wasserzeichen angewendet, um die Beständigkeit dieses Content Credential zu verbessern.",
  "selectors.editsAndActivity.c2pa.watermarked.label": "Mit Wasserzeichen",
  "selectors.editsAndActivity.c2pa.edited.metadata.description": "Änderungen an den Dateimetadaten vorgenommen",
  "selectors.editsAndActivity.c2pa.edited.metadata.label": "Metadatenänderungen"
}, CL = {
  "selectors.editsAndActivity.c2pa.color_adjustments.description": "Adjusted properties like tone, saturation, curves, shadows, or highlights",
  "selectors.editsAndActivity.c2pa.color_adjustments.label": "Color or exposure edits",
  "selectors.editsAndActivity.c2pa.converted.description": "The format of the asset was changed",
  "selectors.editsAndActivity.c2pa.converted.label": "Converted asset",
  "selectors.editsAndActivity.c2pa.created.description": "Created a new file or content",
  "selectors.editsAndActivity.c2pa.created.label": "Created",
  "selectors.editsAndActivity.c2pa.cropped.description": "Used cropping tools, reducing or expanding visible content area",
  "selectors.editsAndActivity.c2pa.cropped.label": "Cropping edits",
  "selectors.editsAndActivity.c2pa.deleted.description": "Deleted visual areas or durations of content",
  "selectors.editsAndActivity.c2pa.deleted.label": "Deleted content",
  "selectors.editsAndActivity.c2pa.drawing.description": "Used tools like pencils, brushes, erasers, or shape, path, or pen tools",
  "selectors.editsAndActivity.c2pa.drawing.label": "Drawing edits",
  "selectors.editsAndActivity.c2pa.dubbed.description": "Replaced audio",
  "selectors.editsAndActivity.c2pa.dubbed.label": "Dubbed",
  "selectors.editsAndActivity.c2pa.edited.description": "Made other changes",
  "selectors.editsAndActivity.c2pa.edited.label": "Other edits",
  "selectors.editsAndActivity.c2pa.filtered.description": "Used tools like filters, styles, or effects to change appearance",
  "selectors.editsAndActivity.c2pa.filtered.label": "Filter or style edits",
  "selectors.editsAndActivity.c2pa.opened.description": "Opened a pre-existing file",
  "selectors.editsAndActivity.c2pa.opened.label": "Opened",
  "selectors.editsAndActivity.c2pa.orientation.description": "Changed position or orientation (rotated, flipped, etc.)",
  "selectors.editsAndActivity.c2pa.orientation.label": "Orientation edits",
  "selectors.editsAndActivity.c2pa.placed.description": "Added pre-existing content to this file",
  "selectors.editsAndActivity.c2pa.placed.label": "Imported",
  "selectors.editsAndActivity.c2pa.published.description": "Received and distributed image",
  "selectors.editsAndActivity.c2pa.published.label": "Published image",
  "selectors.editsAndActivity.c2pa.removed.description": "One or more assets were removed from the file",
  "selectors.editsAndActivity.c2pa.removed.label": "Asset removed",
  "selectors.editsAndActivity.c2pa.repackaged.description": "Asset was repackaged without being processed",
  "selectors.editsAndActivity.c2pa.repackaged.label": "Repackaged asset",
  "selectors.editsAndActivity.c2pa.resized.description": "Changed dimensions or file size",
  "selectors.editsAndActivity.c2pa.resized.label": "Resizing edits",
  "selectors.editsAndActivity.c2pa.transcoded.description": "Processed or compressed an asset to optimize for display",
  "selectors.editsAndActivity.c2pa.transcoded.label": "Processed asset",
  "selectors.editsAndActivity.c2pa.translated.description": "Translated content",
  "selectors.editsAndActivity.c2pa.translated.label": "Translated",
  "selectors.editsAndActivity.c2pa.unknown.description": "Performed other edits or activity that couldn't be recognized",
  "selectors.editsAndActivity.c2pa.unknown.label": "Unknown edits or activity",
  "selectors.editsAndActivity.c2pa.watermarked.description": "Applied an invisible watermark to improve this Content Credential's durability",
  "selectors.editsAndActivity.c2pa.watermarked.label": "Watermarked",
  "selectors.editsAndActivity.c2pa.edited.metadata.description": "Made changes to file metadata",
  "selectors.editsAndActivity.c2pa.edited.metadata.label": "Metadata changes"
}, xL = {
  "selectors.editsAndActivity.c2pa.color_adjustments.description": "Se han ajustado propiedades como el tono, la saturación, las curvas, las sombras o las luces",
  "selectors.editsAndActivity.c2pa.color_adjustments.label": "Ediciones de color o exposición",
  "selectors.editsAndActivity.c2pa.converted.description": "Se ha cambiado el formato del recurso",
  "selectors.editsAndActivity.c2pa.converted.label": "Recurso convertido",
  "selectors.editsAndActivity.c2pa.created.description": "Se ha creado un nuevo archivo o contenido",
  "selectors.editsAndActivity.c2pa.created.label": "Fecha de creación",
  "selectors.editsAndActivity.c2pa.cropped.description": "Se han usado herramientas de recorte, lo que reduce o expande el área de contenido visible",
  "selectors.editsAndActivity.c2pa.cropped.label": "Ediciones de recorte",
  "selectors.editsAndActivity.c2pa.deleted.description": "Áreas visuales o duraciones de contenido eliminadas",
  "selectors.editsAndActivity.c2pa.deleted.label": "Contenido eliminado",
  "selectors.editsAndActivity.c2pa.drawing.description": "Se han usado herramientas como lápices, pinceles, borradores o herramientas de formas, trazados o bolígrafos",
  "selectors.editsAndActivity.c2pa.drawing.label": "Ediciones de dibujo",
  "selectors.editsAndActivity.c2pa.dubbed.description": "Audio reemplazado",
  "selectors.editsAndActivity.c2pa.dubbed.label": "Doblado",
  "selectors.editsAndActivity.c2pa.edited.description": "Se han hecho otros cambios",
  "selectors.editsAndActivity.c2pa.edited.label": "Otras ediciones",
  "selectors.editsAndActivity.c2pa.filtered.description": "Se han usado herramientas como filtros, estilos o efectos para cambiar la apariencia",
  "selectors.editsAndActivity.c2pa.filtered.label": "Ediciones de filtro o estilo",
  "selectors.editsAndActivity.c2pa.opened.description": "Se ha abierto un archivo preexistente",
  "selectors.editsAndActivity.c2pa.opened.label": "Abierto",
  "selectors.editsAndActivity.c2pa.orientation.description": "Se ha cambiado la posición u orientación (girado, volteado, etc.)",
  "selectors.editsAndActivity.c2pa.orientation.label": "Ediciones de orientación",
  "selectors.editsAndActivity.c2pa.placed.description": "Se ha añadido contenido preexistente a este archivo",
  "selectors.editsAndActivity.c2pa.placed.label": "Importado",
  "selectors.editsAndActivity.c2pa.published.description": "Imagen recibida y distribuida",
  "selectors.editsAndActivity.c2pa.published.label": "Imagen publicada",
  "selectors.editsAndActivity.c2pa.removed.description": "Uno o más recursos se han eliminado del archivo",
  "selectors.editsAndActivity.c2pa.removed.label": "Recurso eliminado",
  "selectors.editsAndActivity.c2pa.repackaged.description": "El recurso se ha reempaquetado sin procesarse",
  "selectors.editsAndActivity.c2pa.repackaged.label": "Recurso reempaquetado",
  "selectors.editsAndActivity.c2pa.resized.description": "Se han modificado las dimensiones o el tamaño del archivo",
  "selectors.editsAndActivity.c2pa.resized.label": "Ediciones de cambio de tamaño",
  "selectors.editsAndActivity.c2pa.transcoded.description": "Se ha procesado o comprimido un recurso para optimizarlo para su visualización",
  "selectors.editsAndActivity.c2pa.transcoded.label": "Recurso procesado",
  "selectors.editsAndActivity.c2pa.translated.description": "Contenido traducido",
  "selectors.editsAndActivity.c2pa.translated.label": "Traducido",
  "selectors.editsAndActivity.c2pa.unknown.description": "Se han realizado otras ediciones o actividades que no se han podido reconocer",
  "selectors.editsAndActivity.c2pa.unknown.label": "Ediciones o actividad desconocidas",
  "selectors.editsAndActivity.c2pa.watermarked.description": "Se ha aplicado una marca de agua invisible para mejorar la durabilidad de esta Content Credential.",
  "selectors.editsAndActivity.c2pa.watermarked.label": "Con marca de agua",
  "selectors.editsAndActivity.c2pa.edited.metadata.description": "Se han hecho cambios en los metadatos del archivo",
  "selectors.editsAndActivity.c2pa.edited.metadata.label": "Cambios de metadatos"
}, RL = {
  "selectors.editsAndActivity.c2pa.color_adjustments.description": "Säädetty ominaisuuksia, kuten sävyä, kylläisyyttä, käyriä, varjoja tai kohokohtia",
  "selectors.editsAndActivity.c2pa.color_adjustments.label": "Väreihin tai valotukseen liittyvät muokkaukset",
  "selectors.editsAndActivity.c2pa.converted.description": "Resurssin muoto on muuttunut.",
  "selectors.editsAndActivity.c2pa.converted.label": "Resurssi muunnettu",
  "selectors.editsAndActivity.c2pa.created.description": "Luotu uusi tiedosto tai uutta sisältöä",
  "selectors.editsAndActivity.c2pa.created.label": "Luotu",
  "selectors.editsAndActivity.c2pa.cropped.description": "Käytetty rajaustyökaluja, vähennetty tai laajennettu näkyvää sisältöaluetta",
  "selectors.editsAndActivity.c2pa.cropped.label": "Rajaukseen liittyvät muokkaukset",
  "selectors.editsAndActivity.c2pa.deleted.description": "Sisällön visuaalisia alueita tai kestoja poistettu",
  "selectors.editsAndActivity.c2pa.deleted.label": "Sisältö poistettu",
  "selectors.editsAndActivity.c2pa.drawing.description": "Käytetty työkaluja, kuten kyniä, siveltimiä, pyyhekumeja tai muoto-, reitti- tai kynätyökaluja",
  "selectors.editsAndActivity.c2pa.drawing.label": "Piirtämiseen liittyvät muokkaukset",
  "selectors.editsAndActivity.c2pa.dubbed.description": "Ääni korvattu",
  "selectors.editsAndActivity.c2pa.dubbed.label": "Dubattu",
  "selectors.editsAndActivity.c2pa.edited.description": "Tehty muita muutoksia",
  "selectors.editsAndActivity.c2pa.edited.label": "Muut muokkaukset",
  "selectors.editsAndActivity.c2pa.filtered.description": "Käytetty työkaluja, kuten ulkoasun muuttamiseen tarkoitettuja suodattimia, tyylejä tai tehosteita",
  "selectors.editsAndActivity.c2pa.filtered.label": "Suodattimeen tai tyyliin liittyvät muokkaukset",
  "selectors.editsAndActivity.c2pa.opened.description": "Avattu olemassa oleva tiedosto",
  "selectors.editsAndActivity.c2pa.opened.label": "Avattu",
  "selectors.editsAndActivity.c2pa.orientation.description": "Muutettu paikkaa tai suuntaa (kierretty, käännetty jne.)",
  "selectors.editsAndActivity.c2pa.orientation.label": "Suuntaan liittyvät muokkaukset",
  "selectors.editsAndActivity.c2pa.placed.description": "Lisätty olemassa olevaa sisältöä tähän tiedostoon",
  "selectors.editsAndActivity.c2pa.placed.label": "Tuotu",
  "selectors.editsAndActivity.c2pa.published.description": "Vastaanotettu ja julkaistu kuva",
  "selectors.editsAndActivity.c2pa.published.label": "Julkaistu kuva",
  "selectors.editsAndActivity.c2pa.removed.description": "Yksi tai useampi resurssi poistettiin tiedostosta",
  "selectors.editsAndActivity.c2pa.removed.label": "Resurssi poistettu",
  "selectors.editsAndActivity.c2pa.repackaged.description": "Resurssi pakattiin uudelleen sitä käsittelemättä",
  "selectors.editsAndActivity.c2pa.repackaged.label": "Resurssi pakattu uudelleen",
  "selectors.editsAndActivity.c2pa.resized.description": "Muutettu mittasuhteita tai tiedostokokoa",
  "selectors.editsAndActivity.c2pa.resized.label": "Koon muuttamiseen liittyvät muokkaukset",
  "selectors.editsAndActivity.c2pa.transcoded.description": "Resurssi käsitelty tai pakattu sen optimoimiseksi näyttöä varten",
  "selectors.editsAndActivity.c2pa.transcoded.label": "Resurssi käsitelty",
  "selectors.editsAndActivity.c2pa.translated.description": "Sisältö käännetty",
  "selectors.editsAndActivity.c2pa.translated.label": "Käännetty",
  "selectors.editsAndActivity.c2pa.unknown.description": "Suoritettu muita muokkauksia tai toimintoja, joita ei tunnistettu",
  "selectors.editsAndActivity.c2pa.unknown.label": "Tuntemattomat muokkaukset tai tuntematon toiminta",
  "selectors.editsAndActivity.c2pa.watermarked.description": "Lisättiin näkymätön vesileima tämän Content Credentialin kestävyyden parantamiseksi",
  "selectors.editsAndActivity.c2pa.watermarked.label": "Merkitty vesileimalla",
  "selectors.editsAndActivity.c2pa.edited.metadata.description": "Tiedoston metatietoihin tehty muutoksia",
  "selectors.editsAndActivity.c2pa.edited.metadata.label": "Metatietojen muutokset"
}, kL = {
  "selectors.editsAndActivity.c2pa.color_adjustments.description": "Ajustement des propriétés, comme la tonalité, la saturation, les courbes, les ombres ou les tons clairs",
  "selectors.editsAndActivity.c2pa.color_adjustments.label": "Modifications de la couleur ou de l’exposition",
  "selectors.editsAndActivity.c2pa.converted.description": "Le format de la ressource a été modifié",
  "selectors.editsAndActivity.c2pa.converted.label": "Ressource convertie",
  "selectors.editsAndActivity.c2pa.created.description": "Création d’un fichier ou contenu",
  "selectors.editsAndActivity.c2pa.created.label": "Créé",
  "selectors.editsAndActivity.c2pa.cropped.description": "Utilisation d’outils de recadrage, réduisant ou élargissant la zone de contenu visible",
  "selectors.editsAndActivity.c2pa.cropped.label": "Modifications de recadrage",
  "selectors.editsAndActivity.c2pa.deleted.description": "Zones visuelles ou durées de contenu supprimées",
  "selectors.editsAndActivity.c2pa.deleted.label": "Contenu supprimé",
  "selectors.editsAndActivity.c2pa.drawing.description": "Utilisation d’outils, comme des crayons, des pinceaux, des gommes ou des outils de forme, de tracé ou de plume",
  "selectors.editsAndActivity.c2pa.drawing.label": "Modifications du dessin",
  "selectors.editsAndActivity.c2pa.dubbed.description": "Son remplacé",
  "selectors.editsAndActivity.c2pa.dubbed.label": "Doublé",
  "selectors.editsAndActivity.c2pa.edited.description": "Réalisation d’autres modifications",
  "selectors.editsAndActivity.c2pa.edited.label": "Autres modifications",
  "selectors.editsAndActivity.c2pa.filtered.description": "Utilisation d’outils tels que des filtres, des styles ou des effets pour modifier l’apparence",
  "selectors.editsAndActivity.c2pa.filtered.label": "Modifications du filtre ou du style",
  "selectors.editsAndActivity.c2pa.opened.description": "Ouverture d’un fichier préexistant",
  "selectors.editsAndActivity.c2pa.opened.label": "Ouvert",
  "selectors.editsAndActivity.c2pa.orientation.description": "Modifications de la position ou de l’orientation (rotation, renversement, etc.)",
  "selectors.editsAndActivity.c2pa.orientation.label": "Modifications de l’orientation",
  "selectors.editsAndActivity.c2pa.placed.description": "Ajout du contenu préexistant à ce fichier",
  "selectors.editsAndActivity.c2pa.placed.label": "Importé",
  "selectors.editsAndActivity.c2pa.published.description": "Réception et distribution d’une image",
  "selectors.editsAndActivity.c2pa.published.label": "Image publiée",
  "selectors.editsAndActivity.c2pa.removed.description": "Une ou plusieurs ressources ont été supprimées du fichier",
  "selectors.editsAndActivity.c2pa.removed.label": "Ressource supprimée",
  "selectors.editsAndActivity.c2pa.repackaged.description": "La ressource a été reconditionnée sans être traitée",
  "selectors.editsAndActivity.c2pa.repackaged.label": "Ressource reconditionnée",
  "selectors.editsAndActivity.c2pa.resized.description": "Modification des dimensions ou de la taille du fichier",
  "selectors.editsAndActivity.c2pa.resized.label": "Modifications du redimensionnement",
  "selectors.editsAndActivity.c2pa.transcoded.description": "Ressource traitée ou compressée pour optimiser pour l’affichage",
  "selectors.editsAndActivity.c2pa.transcoded.label": "Ressource traitée",
  "selectors.editsAndActivity.c2pa.translated.description": "Contenu traduit",
  "selectors.editsAndActivity.c2pa.translated.label": "Traduit",
  "selectors.editsAndActivity.c2pa.unknown.description": "Réalisation d’autres modifications ou activités qui n’ont pas pu être reconnues",
  "selectors.editsAndActivity.c2pa.unknown.label": "Modifications ou activité inconnues",
  "selectors.editsAndActivity.c2pa.watermarked.description": "Application d’un filigrane invisible pour améliorer la durabilité de ces Content Credentials",
  "selectors.editsAndActivity.c2pa.watermarked.label": "Filigrané",
  "selectors.editsAndActivity.c2pa.edited.metadata.description": "Modifications apportées aux métadonnées du fichier",
  "selectors.editsAndActivity.c2pa.edited.metadata.label": "Modifications des métadonnées"
}, EL = {
  "selectors.editsAndActivity.c2pa.color_adjustments.description": "Beállított olyan tulajdonságokat mint árnyalat, telítettség, görbék, árnyékok vagy csúcsfények",
  "selectors.editsAndActivity.c2pa.color_adjustments.label": "Szín vagy expozíció szerkesztése",
  "selectors.editsAndActivity.c2pa.converted.description": "A kellék formátuma módosítva",
  "selectors.editsAndActivity.c2pa.converted.label": "Konvertált kellék",
  "selectors.editsAndActivity.c2pa.created.description": "Létrehozott egy új fájlt vagy tartalmat",
  "selectors.editsAndActivity.c2pa.created.label": "Létrehozva",
  "selectors.editsAndActivity.c2pa.cropped.description": "Használt vágóeszközöket, amelyek csökkentik vagy bővítik a tartalom látható területét",
  "selectors.editsAndActivity.c2pa.cropped.label": "Vágást használó szerkesztések",
  "selectors.editsAndActivity.c2pa.deleted.description": "A tartalom vizuális területei vagy időtartama törölve",
  "selectors.editsAndActivity.c2pa.deleted.label": "Törölt tartalom",
  "selectors.editsAndActivity.c2pa.drawing.description": "Használt olyan eszközöket mint ceruzák, ecsetek, radírok vagy alakzat-, görbe- vagy tolleszközök",
  "selectors.editsAndActivity.c2pa.drawing.label": "Rajzolást használó szerkesztések",
  "selectors.editsAndActivity.c2pa.dubbed.description": "Hang lecserélve",
  "selectors.editsAndActivity.c2pa.dubbed.label": "Szinkronizálva",
  "selectors.editsAndActivity.c2pa.edited.description": "Egyéb módosítások végrehajtva",
  "selectors.editsAndActivity.c2pa.edited.label": "Egyéb szerkesztések",
  "selectors.editsAndActivity.c2pa.filtered.description": "Használt olyan eszközöket mint szűrők, stílusok vagy effektusok a megjelenés megváltoztatására",
  "selectors.editsAndActivity.c2pa.filtered.label": "Szűrőt vagy stílust használó szerkesztések",
  "selectors.editsAndActivity.c2pa.opened.description": "Megnyitott egy már létező fájlt",
  "selectors.editsAndActivity.c2pa.opened.label": "Megnyitva",
  "selectors.editsAndActivity.c2pa.orientation.description": "Módosította a pozíciót vagy tájolást (elforgatva, megfordítva stb.)",
  "selectors.editsAndActivity.c2pa.orientation.label": "Tájolási szerkesztések",
  "selectors.editsAndActivity.c2pa.placed.description": "Már létező tartalmat adott hozzá ehhez a fájlhoz",
  "selectors.editsAndActivity.c2pa.placed.label": "Importálva",
  "selectors.editsAndActivity.c2pa.published.description": "Kapott és terjesztett kép",
  "selectors.editsAndActivity.c2pa.published.label": "Közzétett kép",
  "selectors.editsAndActivity.c2pa.removed.description": "Egy vagy több kellék eltávolítva a fájlból",
  "selectors.editsAndActivity.c2pa.removed.label": "Kellék eltávolítva",
  "selectors.editsAndActivity.c2pa.repackaged.description": "Kellék feldolgozás nélkül újracsomagolva",
  "selectors.editsAndActivity.c2pa.repackaged.label": "Újracsomagolt kellék",
  "selectors.editsAndActivity.c2pa.resized.description": "A méretek vagy a fájl mérete módosult",
  "selectors.editsAndActivity.c2pa.resized.label": "Szerkesztések átméretezése",
  "selectors.editsAndActivity.c2pa.transcoded.description": "Egy kellék feldolgozva vagy tömörítve a megjelenítésre való optimalizáláshoz",
  "selectors.editsAndActivity.c2pa.transcoded.label": "Feldolgozott kellék",
  "selectors.editsAndActivity.c2pa.translated.description": "Lefordított tartalom",
  "selectors.editsAndActivity.c2pa.translated.label": "Lefordítva",
  "selectors.editsAndActivity.c2pa.unknown.description": "Más szerkesztéseket vagy műveleteket hajtott végre, amelyeket nem lehetett felismerni",
  "selectors.editsAndActivity.c2pa.unknown.label": "Ismeretlen szerkesztések vagy tevékenység",
  "selectors.editsAndActivity.c2pa.watermarked.description": "Láthatatlan vízjel alkalmazása a Content Credentials adatok tartósságának javítása érdekében",
  "selectors.editsAndActivity.c2pa.watermarked.label": "Vízjeles",
  "selectors.editsAndActivity.c2pa.edited.metadata.description": "Módosítások elvégezve a fájl metaadataiban",
  "selectors.editsAndActivity.c2pa.edited.metadata.label": "Metaadatok módosításai"
}, IL = {
  "selectors.editsAndActivity.c2pa.color_adjustments.description": "Menyesuaikan properti seperti nada, saturasi, lengkungan, bayangan, atau sorotan",
  "selectors.editsAndActivity.c2pa.color_adjustments.label": "Pengeditan warna atau eksposur",
  "selectors.editsAndActivity.c2pa.converted.description": "Format aset diubah",
  "selectors.editsAndActivity.c2pa.converted.label": "Mengonversi aset",
  "selectors.editsAndActivity.c2pa.created.description": "Membuat file atau konten baru",
  "selectors.editsAndActivity.c2pa.created.label": "Membuat",
  "selectors.editsAndActivity.c2pa.cropped.description": "Menggunakan alat pemangkasan, mengurangi atau memperluas area konten yang terlihat",
  "selectors.editsAndActivity.c2pa.cropped.label": "Pengeditan pemangkasan",
  "selectors.editsAndActivity.c2pa.deleted.description": "Menghapus area visual atau durasi konten",
  "selectors.editsAndActivity.c2pa.deleted.label": "Menghapus konten",
  "selectors.editsAndActivity.c2pa.drawing.description": "Menggunakan alat seperti pensil, kuas, penghapus, atau alat bentuk, jalur, atau pena",
  "selectors.editsAndActivity.c2pa.drawing.label": "Pengeditan gambar",
  "selectors.editsAndActivity.c2pa.dubbed.description": "Mengganti audio",
  "selectors.editsAndActivity.c2pa.dubbed.label": "Men-dubbing",
  "selectors.editsAndActivity.c2pa.edited.description": "Membuat perubahan lain",
  "selectors.editsAndActivity.c2pa.edited.label": "Pengeditan lainnya",
  "selectors.editsAndActivity.c2pa.filtered.description": "Menggunakan alat seperti filter, gaya, atau efek untuk mengubah tampilan",
  "selectors.editsAndActivity.c2pa.filtered.label": "Pengeditan filter atau gaya",
  "selectors.editsAndActivity.c2pa.opened.description": "Membuka file yang sudah ada",
  "selectors.editsAndActivity.c2pa.opened.label": "Membuka",
  "selectors.editsAndActivity.c2pa.orientation.description": "Mengubah posisi atau orientasi (diputar, dibalik, dll.)",
  "selectors.editsAndActivity.c2pa.orientation.label": "Pengeditan orientasi",
  "selectors.editsAndActivity.c2pa.placed.description": "Menambahkan konten yang sudah ada ke file ini",
  "selectors.editsAndActivity.c2pa.placed.label": "Mengimpor",
  "selectors.editsAndActivity.c2pa.published.description": "Menerima dan mendistribusikan citra",
  "selectors.editsAndActivity.c2pa.published.label": "Memublikasikan citra",
  "selectors.editsAndActivity.c2pa.removed.description": "Satu atau beberapa aset telah dihapus dari file",
  "selectors.editsAndActivity.c2pa.removed.label": "Aset yang dihapus",
  "selectors.editsAndActivity.c2pa.repackaged.description": "Aset dikemas ulang tanpa diproses",
  "selectors.editsAndActivity.c2pa.repackaged.label": "Mengemas ulang aset",
  "selectors.editsAndActivity.c2pa.resized.description": "Mengubah dimensi atau ukuran file",
  "selectors.editsAndActivity.c2pa.resized.label": "Pengeditan perubahan ukuran",
  "selectors.editsAndActivity.c2pa.transcoded.description": "Memproses atau mengompresi aset untuk mengoptimalkan tampilan",
  "selectors.editsAndActivity.c2pa.transcoded.label": "Memproses aset",
  "selectors.editsAndActivity.c2pa.translated.description": "Menerjemahkan konten",
  "selectors.editsAndActivity.c2pa.translated.label": "Menerjemahkan",
  "selectors.editsAndActivity.c2pa.unknown.description": "Melakukan pengeditan atau aktivitas lain yang tidak dapat dikenali",
  "selectors.editsAndActivity.c2pa.unknown.label": "Pengeditan atau aktivitas tidak diketahui",
  "selectors.editsAndActivity.c2pa.watermarked.description": "Menerapkan tanda air yang tidak terlihat untuk meningkatkan ketahanan Content Credentials ini",
  "selectors.editsAndActivity.c2pa.watermarked.label": "Bertanda air",
  "selectors.editsAndActivity.c2pa.edited.metadata.description": "Membuat perubahan pada metadata file",
  "selectors.editsAndActivity.c2pa.edited.metadata.label": "Perubahan metadata"
}, $L = {
  "selectors.editsAndActivity.c2pa.color_adjustments.description": "Proprietà regolate come tono, saturazione, curve, ombre o luci",
  "selectors.editsAndActivity.c2pa.color_adjustments.label": "Modifiche del colore o dell'esposizione",
  "selectors.editsAndActivity.c2pa.converted.description": "Il formato della risorsa è stato modificato",
  "selectors.editsAndActivity.c2pa.converted.label": "Risorsa convertita",
  "selectors.editsAndActivity.c2pa.created.description": "È stato creato un nuovo file o contenuto",
  "selectors.editsAndActivity.c2pa.created.label": "Creato",
  "selectors.editsAndActivity.c2pa.cropped.description": "Strumenti di ritaglio utilizzati, riducendo o espandendo l'area del contenuto visibile",
  "selectors.editsAndActivity.c2pa.cropped.label": "Modifiche di ritaglio",
  "selectors.editsAndActivity.c2pa.deleted.description": "Aree visive o durate dei contenuti eliminate",
  "selectors.editsAndActivity.c2pa.deleted.label": "Contenuto eliminato",
  "selectors.editsAndActivity.c2pa.drawing.description": "Strumenti usati come matite, pennelli, gomme o strumenti forma, tracciato o penna",
  "selectors.editsAndActivity.c2pa.drawing.label": "Modifiche del disegno",
  "selectors.editsAndActivity.c2pa.dubbed.description": "Audio sostituito",
  "selectors.editsAndActivity.c2pa.dubbed.label": "Doppiato",
  "selectors.editsAndActivity.c2pa.edited.description": "Sono state apportate altre modifiche",
  "selectors.editsAndActivity.c2pa.edited.label": "Altre modifiche",
  "selectors.editsAndActivity.c2pa.filtered.description": "Strumenti utilizzati come filtri, stili o effetti per modificare l'aspetto",
  "selectors.editsAndActivity.c2pa.filtered.label": "Modifiche di filtro o stile",
  "selectors.editsAndActivity.c2pa.opened.description": "È stato aperto un file preesistente",
  "selectors.editsAndActivity.c2pa.opened.label": "Aperto",
  "selectors.editsAndActivity.c2pa.orientation.description": "Posizione o orientamento modificati (ruotati, capovolti e così via)",
  "selectors.editsAndActivity.c2pa.orientation.label": "Orientamento modifiche",
  "selectors.editsAndActivity.c2pa.placed.description": "Aggiunto contenuto preesistente a questo file",
  "selectors.editsAndActivity.c2pa.placed.label": "Importato",
  "selectors.editsAndActivity.c2pa.published.description": "Immagine ricevuta e distribuita",
  "selectors.editsAndActivity.c2pa.published.label": "Immagine pubblicata",
  "selectors.editsAndActivity.c2pa.removed.description": "Una o più risorse sono state rimosse dal file",
  "selectors.editsAndActivity.c2pa.removed.label": "Risorsa rimossa",
  "selectors.editsAndActivity.c2pa.repackaged.description": "La risorsa è stata riprogettata senza essere elaborata",
  "selectors.editsAndActivity.c2pa.repackaged.label": "Risorsa riprogettata",
  "selectors.editsAndActivity.c2pa.resized.description": "Dimensioni o grandezza del file modificate",
  "selectors.editsAndActivity.c2pa.resized.label": "Modifiche del ridimensionamento",
  "selectors.editsAndActivity.c2pa.transcoded.description": "Una risorsa è stata elaborata o compressa per essere ottimizzata per la visualizzazione",
  "selectors.editsAndActivity.c2pa.transcoded.label": "Risorsa elaborata",
  "selectors.editsAndActivity.c2pa.translated.description": "Contenuto tradotto",
  "selectors.editsAndActivity.c2pa.translated.label": "Tradotto",
  "selectors.editsAndActivity.c2pa.unknown.description": "Sono state eseguite altre modifiche o attività che non è stato possibile riconoscere",
  "selectors.editsAndActivity.c2pa.unknown.label": "Modifiche o attività sconosciute",
  "selectors.editsAndActivity.c2pa.watermarked.description": "È stata applicata una filigrana invisibile per migliorare la durata di questa Content Credential",
  "selectors.editsAndActivity.c2pa.watermarked.label": "Con filigrana",
  "selectors.editsAndActivity.c2pa.edited.metadata.description": "Modifiche apportate ai metadati del file",
  "selectors.editsAndActivity.c2pa.edited.metadata.label": "Modifiche metadati"
}, TL = {
  "selectors.editsAndActivity.c2pa.color_adjustments.description": "トーン、彩度、カーブ、シャドウ、ハイライトなどのプロパティを調整",
  "selectors.editsAndActivity.c2pa.color_adjustments.label": "カラーまたは露出の編集",
  "selectors.editsAndActivity.c2pa.converted.description": "アセットの形式が変更されました",
  "selectors.editsAndActivity.c2pa.converted.label": "変換されたアセット",
  "selectors.editsAndActivity.c2pa.created.description": "新しいファイルまたはコンテンツを作成",
  "selectors.editsAndActivity.c2pa.created.label": "作成済み",
  "selectors.editsAndActivity.c2pa.cropped.description": "切り抜きツールを使用、表示されているコンテンツ領域の縮小または拡大",
  "selectors.editsAndActivity.c2pa.cropped.label": "切り抜きの編集",
  "selectors.editsAndActivity.c2pa.deleted.description": "削除された視覚領域またはコンテンツの継続時間",
  "selectors.editsAndActivity.c2pa.deleted.label": "削除されたコンテンツ",
  "selectors.editsAndActivity.c2pa.drawing.description": "鉛筆、ブラシ、消しゴム、シェイプ、パス、ペンツールなどのツールを使用",
  "selectors.editsAndActivity.c2pa.drawing.label": "描画の編集",
  "selectors.editsAndActivity.c2pa.dubbed.description": "オーディオを置換しました",
  "selectors.editsAndActivity.c2pa.dubbed.label": "吹き替え済み",
  "selectors.editsAndActivity.c2pa.edited.description": "その他の変更",
  "selectors.editsAndActivity.c2pa.edited.label": "その他の編集",
  "selectors.editsAndActivity.c2pa.filtered.description": "フィルター、スタイル、効果などのツールを使用して外観を変更",
  "selectors.editsAndActivity.c2pa.filtered.label": "フィルターまたはスタイルの編集",
  "selectors.editsAndActivity.c2pa.opened.description": "既存のファイルを開いた",
  "selectors.editsAndActivity.c2pa.opened.label": "開いた",
  "selectors.editsAndActivity.c2pa.orientation.description": "位置または方向を変更 (回転、反転など)",
  "selectors.editsAndActivity.c2pa.orientation.label": "画像方向編集",
  "selectors.editsAndActivity.c2pa.placed.description": "このファイルに既存のコンテンツを追加",
  "selectors.editsAndActivity.c2pa.placed.label": "読み込み済み",
  "selectors.editsAndActivity.c2pa.published.description": "受信および配信した画像",
  "selectors.editsAndActivity.c2pa.published.label": "公開した画像",
  "selectors.editsAndActivity.c2pa.removed.description": "1 つ以上のアセットがファイルから削除されました",
  "selectors.editsAndActivity.c2pa.removed.label": "アセットが削除されました",
  "selectors.editsAndActivity.c2pa.repackaged.description": "アセットは処理されずに再パッケージ化されました",
  "selectors.editsAndActivity.c2pa.repackaged.label": "再パッケージ化されたアセット",
  "selectors.editsAndActivity.c2pa.resized.description": "寸法またはファイルサイズを変更",
  "selectors.editsAndActivity.c2pa.resized.label": "サイズ変更の編集",
  "selectors.editsAndActivity.c2pa.transcoded.description": "表示を最適化するためにアセットを処理または圧縮しました",
  "selectors.editsAndActivity.c2pa.transcoded.label": "処理済みアセット",
  "selectors.editsAndActivity.c2pa.translated.description": "翻訳されたコンテンツ",
  "selectors.editsAndActivity.c2pa.translated.label": "翻訳済み",
  "selectors.editsAndActivity.c2pa.unknown.description": "認識できない他の編集またはアクティビティを実行",
  "selectors.editsAndActivity.c2pa.unknown.label": "不明な編集またはアクティビティ",
  "selectors.editsAndActivity.c2pa.watermarked.description": "この Content Credential の耐久性を向上させるために非表示の透かしを適用しました",
  "selectors.editsAndActivity.c2pa.watermarked.label": "透かし入り",
  "selectors.editsAndActivity.c2pa.edited.metadata.description": "ファイルのメタデータに変更を加えました",
  "selectors.editsAndActivity.c2pa.edited.metadata.label": "メタデータの変更"
}, SL = {
  "selectors.editsAndActivity.c2pa.color_adjustments.description": "톤, 채도, 곡선, 그림자 또는 하이라이트와 같은 조정된 속성",
  "selectors.editsAndActivity.c2pa.color_adjustments.label": "색상 또는 노출 편집",
  "selectors.editsAndActivity.c2pa.converted.description": "자산 포맷이 변경됨",
  "selectors.editsAndActivity.c2pa.converted.label": "변환된 자산",
  "selectors.editsAndActivity.c2pa.created.description": "새 파일 또는 콘텐츠 생성됨",
  "selectors.editsAndActivity.c2pa.created.label": "생성됨",
  "selectors.editsAndActivity.c2pa.cropped.description": "사용된 자르기 도구, 보이는 콘텐츠 영역 축소 또는 확장",
  "selectors.editsAndActivity.c2pa.cropped.label": "자르기 편집",
  "selectors.editsAndActivity.c2pa.deleted.description": "삭제된 시각적 영역 또는 콘텐츠의 기간",
  "selectors.editsAndActivity.c2pa.deleted.label": "삭제된 콘텐츠",
  "selectors.editsAndActivity.c2pa.drawing.description": "연필, 브러시, 지우개 또는 모양, 경로 또는 펜 도구와 같은 사용된 도구",
  "selectors.editsAndActivity.c2pa.drawing.label": "그리기 편집",
  "selectors.editsAndActivity.c2pa.dubbed.description": "교체된 오디오",
  "selectors.editsAndActivity.c2pa.dubbed.label": "더빙됨",
  "selectors.editsAndActivity.c2pa.edited.description": "기타 변경 사항 적용됨",
  "selectors.editsAndActivity.c2pa.edited.label": "기타 편집",
  "selectors.editsAndActivity.c2pa.filtered.description": "필터, 스타일 또는 효과와 같은 모양 변경에 사용된 도구",
  "selectors.editsAndActivity.c2pa.filtered.label": "필터 또는 스타일 편집",
  "selectors.editsAndActivity.c2pa.opened.description": "기존 파일 열림",
  "selectors.editsAndActivity.c2pa.opened.label": "열림",
  "selectors.editsAndActivity.c2pa.orientation.description": "변경된 위치 또는 방향 (회전, 반전 등)",
  "selectors.editsAndActivity.c2pa.orientation.label": "방향 편집",
  "selectors.editsAndActivity.c2pa.placed.description": "이 파일에 기존 콘텐츠 추가됨",
  "selectors.editsAndActivity.c2pa.placed.label": "가져옴",
  "selectors.editsAndActivity.c2pa.published.description": "접수 및 배포된 이미지",
  "selectors.editsAndActivity.c2pa.published.label": "게시된 이미지",
  "selectors.editsAndActivity.c2pa.removed.description": "하나 이상의 자산이 파일에서 제거됨",
  "selectors.editsAndActivity.c2pa.removed.label": "에셋 제거됨",
  "selectors.editsAndActivity.c2pa.repackaged.description": "자산이 처리되지 않고 다시 패키징됨",
  "selectors.editsAndActivity.c2pa.repackaged.label": "다시 패키징된 자산",
  "selectors.editsAndActivity.c2pa.resized.description": "변경된 치수 또는 파일 크기",
  "selectors.editsAndActivity.c2pa.resized.label": "크기 조정 편집",
  "selectors.editsAndActivity.c2pa.transcoded.description": "최적화된 표시를 위해 자산을 처리하거나 압축했습니다",
  "selectors.editsAndActivity.c2pa.transcoded.label": "처리된 자산",
  "selectors.editsAndActivity.c2pa.translated.description": "번역된 콘텐츠",
  "selectors.editsAndActivity.c2pa.translated.label": "번역됨",
  "selectors.editsAndActivity.c2pa.unknown.description": "수행되었으나 인식할 수 없는 기타 편집 또는 활동",
  "selectors.editsAndActivity.c2pa.unknown.label": "알 수 없는 편집 또는 활동",
  "selectors.editsAndActivity.c2pa.watermarked.description": "이 Content Credentials의 지속성을 개선하기 위해 보이지 않는 워터마크가 적용되었습니다.",
  "selectors.editsAndActivity.c2pa.watermarked.label": "워터마크 적용됨",
  "selectors.editsAndActivity.c2pa.edited.metadata.description": "파일 메타데이터가 변경됨",
  "selectors.editsAndActivity.c2pa.edited.metadata.label": "메타데이터 변경 사항"
}, OL = {
  "selectors.editsAndActivity.c2pa.color_adjustments.description": "Justerte egenskaper som tone, metning, kurver, skygger eller høylys",
  "selectors.editsAndActivity.c2pa.color_adjustments.label": "Farge- eller eksponeringsredigeringer",
  "selectors.editsAndActivity.c2pa.converted.description": "Formatet til ressursen ble endret",
  "selectors.editsAndActivity.c2pa.converted.label": "Konvertert ressurs",
  "selectors.editsAndActivity.c2pa.created.description": "Opprettet en ny fil eller nytt innhold",
  "selectors.editsAndActivity.c2pa.created.label": "Opprettet",
  "selectors.editsAndActivity.c2pa.cropped.description": "Brukte beskjæringsverktøy for å redusere eller utvide synlig innholdsområde",
  "selectors.editsAndActivity.c2pa.cropped.label": "Beskjæringsredigeringer",
  "selectors.editsAndActivity.c2pa.deleted.description": "Slettet visuelle områder eller innholdsvarighet",
  "selectors.editsAndActivity.c2pa.deleted.label": "Slettet innhold",
  "selectors.editsAndActivity.c2pa.drawing.description": "Brukte verktøy som blyanter, pensler, viskelær eller form-, bane- eller pennverktøy",
  "selectors.editsAndActivity.c2pa.drawing.label": "Tegneredigeringer",
  "selectors.editsAndActivity.c2pa.dubbed.description": "Erstattet lyd",
  "selectors.editsAndActivity.c2pa.dubbed.label": "Dubbet",
  "selectors.editsAndActivity.c2pa.edited.description": "Gjorde andre endringer",
  "selectors.editsAndActivity.c2pa.edited.label": "Andre redigeringer",
  "selectors.editsAndActivity.c2pa.filtered.description": "Brukte verktøy som filtre, stiler eller effekter for å endre utseende",
  "selectors.editsAndActivity.c2pa.filtered.label": "Filter- eller stilredigeringer",
  "selectors.editsAndActivity.c2pa.opened.description": "Åpnet en eksisterende fil",
  "selectors.editsAndActivity.c2pa.opened.label": "Åpnet",
  "selectors.editsAndActivity.c2pa.orientation.description": "Endret posisjon eller retning (rotert, snudd osv.)",
  "selectors.editsAndActivity.c2pa.orientation.label": "Retnings- redigeringer",
  "selectors.editsAndActivity.c2pa.placed.description": "La til eksisterende innhold i denne filen",
  "selectors.editsAndActivity.c2pa.placed.label": "Importert",
  "selectors.editsAndActivity.c2pa.published.description": "Mottatt og distribuert bilde",
  "selectors.editsAndActivity.c2pa.published.label": "Publisert bilde",
  "selectors.editsAndActivity.c2pa.removed.description": "Én eller flere ressurser ble fjernet fra filen",
  "selectors.editsAndActivity.c2pa.removed.label": "Ressursen er fjernet",
  "selectors.editsAndActivity.c2pa.repackaged.description": "Ressursen ble ompakket uten å bli behandlet",
  "selectors.editsAndActivity.c2pa.repackaged.label": "Ompakket ressurs",
  "selectors.editsAndActivity.c2pa.resized.description": "Endret dimensjoner eller filstørrelse",
  "selectors.editsAndActivity.c2pa.resized.label": "Størrelsesendringer",
  "selectors.editsAndActivity.c2pa.transcoded.description": "Behandlet eller komprimert en ressurs for å optimalisere for visning",
  "selectors.editsAndActivity.c2pa.transcoded.label": "Behandlet ressurs",
  "selectors.editsAndActivity.c2pa.translated.description": "Oversatt innhold",
  "selectors.editsAndActivity.c2pa.translated.label": "Oversatt",
  "selectors.editsAndActivity.c2pa.unknown.description": "Utførte andre redigeringer eller aktiviteter som ikke gjenkjennes",
  "selectors.editsAndActivity.c2pa.unknown.label": "Ukjent endring eller aktivitet",
  "selectors.editsAndActivity.c2pa.watermarked.description": "Brukte et usynlig vannmerke for å forbedre holdbarheten for foreliggende Content Credential",
  "selectors.editsAndActivity.c2pa.watermarked.label": "Vannmerket",
  "selectors.editsAndActivity.c2pa.edited.metadata.description": "Gjorde endringer i fil-metadata",
  "selectors.editsAndActivity.c2pa.edited.metadata.label": "Endringer i metadata"
}, PL = {
  "selectors.editsAndActivity.c2pa.color_adjustments.description": "Eigenschappen zoals tint, verzadiging, curven, schaduwen of hooglichten aangepast",
  "selectors.editsAndActivity.c2pa.color_adjustments.label": "Kleur- of belichtingsbewerkingen",
  "selectors.editsAndActivity.c2pa.converted.description": "De indeling van het asset is gewijzigd",
  "selectors.editsAndActivity.c2pa.converted.label": "Asset geconverteerd",
  "selectors.editsAndActivity.c2pa.created.description": "Een nieuw bestand of nieuwe content gemaakt",
  "selectors.editsAndActivity.c2pa.created.label": "Gemaakt",
  "selectors.editsAndActivity.c2pa.cropped.description": "Uitsnedegereedschappen gebruikt om het zichtbare deel van de content te beperken of uit te breiden",
  "selectors.editsAndActivity.c2pa.cropped.label": "Uitsnedebewerkingen",
  "selectors.editsAndActivity.c2pa.deleted.description": "Visuele delen of duur van content verwijderd",
  "selectors.editsAndActivity.c2pa.deleted.label": "Content verwijderd",
  "selectors.editsAndActivity.c2pa.drawing.description": "Gereedschappen gebruikt zoals potloden, penselen, gummetjes, pennen of vorm- of padgereedschappen",
  "selectors.editsAndActivity.c2pa.drawing.label": "Tekenbewerkingen",
  "selectors.editsAndActivity.c2pa.dubbed.description": "Audio vervangen",
  "selectors.editsAndActivity.c2pa.dubbed.label": "Nagesynchroniseerd",
  "selectors.editsAndActivity.c2pa.edited.description": "Andere wijzigingen aangebracht",
  "selectors.editsAndActivity.c2pa.edited.label": "Andere bewerkingen",
  "selectors.editsAndActivity.c2pa.filtered.description": "Gereedschappen zoals filters, stijlen of effecten gebruikt om het uiterlijk te veranderen",
  "selectors.editsAndActivity.c2pa.filtered.label": "Filter- of stijlbewerkingen",
  "selectors.editsAndActivity.c2pa.opened.description": "Een bestaand bestand geopend",
  "selectors.editsAndActivity.c2pa.opened.label": "Geopend",
  "selectors.editsAndActivity.c2pa.orientation.description": "Positie of stand gewijzigd (gedraaid, gespiegeld etc.)",
  "selectors.editsAndActivity.c2pa.orientation.label": "Bewerkingen in afdrukstand",
  "selectors.editsAndActivity.c2pa.placed.description": "Bestaande content aan dit bestand toegevoegd",
  "selectors.editsAndActivity.c2pa.placed.label": "Geïmporteerd",
  "selectors.editsAndActivity.c2pa.published.description": "Afbeelding ontvangen en verspreid",
  "selectors.editsAndActivity.c2pa.published.label": "Afbeelding gepubliceerd",
  "selectors.editsAndActivity.c2pa.removed.description": "Een of meer assets zijn uit het bestand verwijderd",
  "selectors.editsAndActivity.c2pa.removed.label": "Asset verwijderd",
  "selectors.editsAndActivity.c2pa.repackaged.description": "Nieuw pakket van asset gemaakt zonder verwerking",
  "selectors.editsAndActivity.c2pa.repackaged.label": "Nieuw pakket van asset gemaakt",
  "selectors.editsAndActivity.c2pa.resized.description": "Afmetingen of bestandsgrootte gewijzigd",
  "selectors.editsAndActivity.c2pa.resized.label": "Formaatbewerkingen",
  "selectors.editsAndActivity.c2pa.transcoded.description": "Een asset is verwerkt of gecomprimeerd om het te optimaliseren voor weergave",
  "selectors.editsAndActivity.c2pa.transcoded.label": "Asset verwerkt",
  "selectors.editsAndActivity.c2pa.translated.description": "Content vertaald",
  "selectors.editsAndActivity.c2pa.translated.label": "Vertaald",
  "selectors.editsAndActivity.c2pa.unknown.description": "Andere bewerkingen of activiteiten uitgevoerd die niet konden worden herkend",
  "selectors.editsAndActivity.c2pa.unknown.label": "Onbekende bewerkingen of activiteiten",
  "selectors.editsAndActivity.c2pa.watermarked.description": "Er is een onzichtbaar watermerk toegepast om de duurzaamheid van deze Content Credential te verbeteren",
  "selectors.editsAndActivity.c2pa.watermarked.label": "Met watermerk",
  "selectors.editsAndActivity.c2pa.edited.metadata.description": "Wijzigingen aangebracht in metadata van bestand",
  "selectors.editsAndActivity.c2pa.edited.metadata.label": "Wijzigingen in metadata"
}, FL = {
  "selectors.editsAndActivity.c2pa.color_adjustments.description": "Zmodyfikowano właściwości, takie jak tonacja, nasycenie, krzywe, cienie lub światła",
  "selectors.editsAndActivity.c2pa.color_adjustments.label": "Wprowadzono zmiany kolorów lub ekspozycji",
  "selectors.editsAndActivity.c2pa.converted.description": "Zmieniono format zasobu",
  "selectors.editsAndActivity.c2pa.converted.label": "Przekonwertowano zasób",
  "selectors.editsAndActivity.c2pa.created.description": "Utworzono nowy plik lub zawartość",
  "selectors.editsAndActivity.c2pa.created.label": "Utworzono",
  "selectors.editsAndActivity.c2pa.cropped.description": "Użyto narzędzi do kadrowania w celu zmniejszenia lub rozszerzenia widocznego obszaru zawartości",
  "selectors.editsAndActivity.c2pa.cropped.label": "Modyfikacje polegające na kadrowaniu",
  "selectors.editsAndActivity.c2pa.deleted.description": "Usunięte obszary wizualne lub czasy trwania treści",
  "selectors.editsAndActivity.c2pa.deleted.label": "Usunięto treść",
  "selectors.editsAndActivity.c2pa.drawing.description": "Użyto takich narzędzi, jak ołówki, pędzle i gumki albo narzędzi kształtów, ścieżek lub pióra",
  "selectors.editsAndActivity.c2pa.drawing.label": "Modyfikacje rysunkowe",
  "selectors.editsAndActivity.c2pa.dubbed.description": "Wymienione audio",
  "selectors.editsAndActivity.c2pa.dubbed.label": "Zdubbingowano",
  "selectors.editsAndActivity.c2pa.edited.description": "Wprowadzono inne zmiany",
  "selectors.editsAndActivity.c2pa.edited.label": "Inne modyfikacje",
  "selectors.editsAndActivity.c2pa.filtered.description": "Użyto narzędzi, takich jak filtry, style lub efekty, aby zmienić wygląd",
  "selectors.editsAndActivity.c2pa.filtered.label": "Edycje filtrów lub stylów",
  "selectors.editsAndActivity.c2pa.opened.description": "Otwarto wcześniej istniejący plik",
  "selectors.editsAndActivity.c2pa.opened.label": "Otwarto",
  "selectors.editsAndActivity.c2pa.orientation.description": "Zmieniono pozycję lub orientację (obrócono, odwrócono itp.)",
  "selectors.editsAndActivity.c2pa.orientation.label": "Orientacja modyfikacje",
  "selectors.editsAndActivity.c2pa.placed.description": "Dodano wcześniej istniejącą zawartość do tego pliku",
  "selectors.editsAndActivity.c2pa.placed.label": "Zaimportowano",
  "selectors.editsAndActivity.c2pa.published.description": "Otrzymano i rozpowszechniono obraz",
  "selectors.editsAndActivity.c2pa.published.label": "Opublikowano obraz",
  "selectors.editsAndActivity.c2pa.removed.description": "Z pliku usunięto co najmniej jeden zasób",
  "selectors.editsAndActivity.c2pa.removed.label": "Usunięto zasób",
  "selectors.editsAndActivity.c2pa.repackaged.description": "Zasób został przepakowany bez przetworzenia",
  "selectors.editsAndActivity.c2pa.repackaged.label": "Przepakowano zasób",
  "selectors.editsAndActivity.c2pa.resized.description": "Zmieniono wymiary lub rozmiar pliku",
  "selectors.editsAndActivity.c2pa.resized.label": "Modyfikacje polegające na zmianie rozmiaru",
  "selectors.editsAndActivity.c2pa.transcoded.description": "Przetworzono lub skompresowano zasób w celu optymalizacji pod kątem wyświetlania",
  "selectors.editsAndActivity.c2pa.transcoded.label": "Przetworzono zasób",
  "selectors.editsAndActivity.c2pa.translated.description": "Przetłumaczono treść",
  "selectors.editsAndActivity.c2pa.translated.label": "Przetłumaczono",
  "selectors.editsAndActivity.c2pa.unknown.description": "Dokonano innych zmian lub wykonano operacje, których nie można rozpoznać",
  "selectors.editsAndActivity.c2pa.unknown.label": "Nieznane zmiany lub operacje",
  "selectors.editsAndActivity.c2pa.watermarked.description": "Zastosowano niewidoczny znak wodny, który poprawia trwałość tego certyfikatu Content Credential",
  "selectors.editsAndActivity.c2pa.watermarked.label": "Podpis znakiem wodnym",
  "selectors.editsAndActivity.c2pa.edited.metadata.description": "Wprowadzono zmiany w metadanych pliku",
  "selectors.editsAndActivity.c2pa.edited.metadata.label": "Zmiany metadanych"
}, ML = {
  "selectors.editsAndActivity.c2pa.color_adjustments.description": "Propriedades como tom, saturação, curvas, sombras ou realces ajustadas",
  "selectors.editsAndActivity.c2pa.color_adjustments.label": "Edições de cor ou exposição",
  "selectors.editsAndActivity.c2pa.converted.description": "O formato do ativo foi alterado",
  "selectors.editsAndActivity.c2pa.converted.label": "Ativo convertido",
  "selectors.editsAndActivity.c2pa.created.description": "Arquivo ou conteúdo criado",
  "selectors.editsAndActivity.c2pa.created.label": "Criado",
  "selectors.editsAndActivity.c2pa.cropped.description": "Ferramentas de corte usadas, reduzindo ou expandindo a área de conteúdo visível",
  "selectors.editsAndActivity.c2pa.cropped.label": "Edições de corte",
  "selectors.editsAndActivity.c2pa.deleted.description": "Áreas visuais ou durações de conteúdo excluídas",
  "selectors.editsAndActivity.c2pa.deleted.label": "Conteúdo excluído",
  "selectors.editsAndActivity.c2pa.drawing.description": "Ferramentas como lápis, pincéis, borrachas ou ferramentas de forma, caminho ou caneta usadas",
  "selectors.editsAndActivity.c2pa.drawing.label": "Edições de desenho",
  "selectors.editsAndActivity.c2pa.dubbed.description": "Áudio substituído",
  "selectors.editsAndActivity.c2pa.dubbed.label": "Apelidado",
  "selectors.editsAndActivity.c2pa.edited.description": "Outras alterações feitas",
  "selectors.editsAndActivity.c2pa.edited.label": "Outras edições",
  "selectors.editsAndActivity.c2pa.filtered.description": "Ferramentas como filtros, estilos ou efeitos usadas para alterar a aparência",
  "selectors.editsAndActivity.c2pa.filtered.label": "Edições de filtro ou estilo",
  "selectors.editsAndActivity.c2pa.opened.description": "Arquivo pré-existente aberto",
  "selectors.editsAndActivity.c2pa.opened.label": "Aberto",
  "selectors.editsAndActivity.c2pa.orientation.description": "Posição ou orientação alterada (girado, invertido etc.)",
  "selectors.editsAndActivity.c2pa.orientation.label": "Edições de orientação",
  "selectors.editsAndActivity.c2pa.placed.description": "Conteúdo pré-existente adicionado a este arquivo",
  "selectors.editsAndActivity.c2pa.placed.label": "Importado",
  "selectors.editsAndActivity.c2pa.published.description": "Imagem recebida e distribuída",
  "selectors.editsAndActivity.c2pa.published.label": "Imagem publicada",
  "selectors.editsAndActivity.c2pa.removed.description": "Um ou mais ativos foram removidos do arquivo",
  "selectors.editsAndActivity.c2pa.removed.label": "Ativo removido",
  "selectors.editsAndActivity.c2pa.repackaged.description": "O ativo foi reempacotado sem ser processado",
  "selectors.editsAndActivity.c2pa.repackaged.label": "Ativo reempacotado",
  "selectors.editsAndActivity.c2pa.resized.description": "Dimensões ou tamanho do arquivo alterados",
  "selectors.editsAndActivity.c2pa.resized.label": "Edições de redimensionamento",
  "selectors.editsAndActivity.c2pa.transcoded.description": "Ativo processado ou compactado para otimizar a exibição",
  "selectors.editsAndActivity.c2pa.transcoded.label": "Ativo processado",
  "selectors.editsAndActivity.c2pa.translated.description": "Conteúdo traduzido",
  "selectors.editsAndActivity.c2pa.translated.label": "Traduzido",
  "selectors.editsAndActivity.c2pa.unknown.description": "Não foi possível reconhecer outras edições ou atividades realizadas",
  "selectors.editsAndActivity.c2pa.unknown.label": "Edições ou atividades desconhecidas",
  "selectors.editsAndActivity.c2pa.watermarked.description": "Aplicação de uma marca d'água invisível para melhorar a durabilidade dessa Content Credential",
  "selectors.editsAndActivity.c2pa.watermarked.label": "Adição de marca d'água",
  "selectors.editsAndActivity.c2pa.edited.metadata.description": "Alterações feitas nos metadados do arquivo",
  "selectors.editsAndActivity.c2pa.edited.metadata.label": "Alterações de metadados"
}, LL = {
  "selectors.editsAndActivity.c2pa.color_adjustments.description": "Измененные свойства, например тон, насыщенность, кривые, тени или блики.",
  "selectors.editsAndActivity.c2pa.color_adjustments.label": "Редактирование цвета или экспозиции",
  "selectors.editsAndActivity.c2pa.converted.description": "Формат ресурса изменен",
  "selectors.editsAndActivity.c2pa.converted.label": "Конвертированный ресурс",
  "selectors.editsAndActivity.c2pa.created.description": "Создан новый файл или контент",
  "selectors.editsAndActivity.c2pa.created.label": "Создано",
  "selectors.editsAndActivity.c2pa.cropped.description": "Используемые инструменты обрезки, уменьшение или расширение видимой области содержимого",
  "selectors.editsAndActivity.c2pa.cropped.label": "Редактирование обрезки",
  "selectors.editsAndActivity.c2pa.deleted.description": "Удалены визуальные области или продолжительность контента",
  "selectors.editsAndActivity.c2pa.deleted.label": "Удаленный контент",
  "selectors.editsAndActivity.c2pa.drawing.description": "Используемые инструменты, например карандаши, кисти, ластики или другие инструменты (форма, контур или перо)",
  "selectors.editsAndActivity.c2pa.drawing.label": "Редактирование чертежа",
  "selectors.editsAndActivity.c2pa.dubbed.description": "Заменено аудио",
  "selectors.editsAndActivity.c2pa.dubbed.label": "Дублированный",
  "selectors.editsAndActivity.c2pa.edited.description": "Внесены другие изменения",
  "selectors.editsAndActivity.c2pa.edited.label": "Другие изменения",
  "selectors.editsAndActivity.c2pa.filtered.description": "Используемые инструменты для изменения внешнего вида, например фильтры, стили или эффекты",
  "selectors.editsAndActivity.c2pa.filtered.label": "Редактирование фильтров или стилей",
  "selectors.editsAndActivity.c2pa.opened.description": "Открыт ранее созданный файл",
  "selectors.editsAndActivity.c2pa.opened.label": "Открыто",
  "selectors.editsAndActivity.c2pa.orientation.description": "Изменено положение или ориентация (повернуто, перевернуто и т. д.)",
  "selectors.editsAndActivity.c2pa.orientation.label": "Ориентация правки",
  "selectors.editsAndActivity.c2pa.placed.description": "В этот файл добавлен уже существующий контент",
  "selectors.editsAndActivity.c2pa.placed.label": "Импортировано",
  "selectors.editsAndActivity.c2pa.published.description": "Изображение, которое получено и распространено",
  "selectors.editsAndActivity.c2pa.published.label": "Опубликованное изображение",
  "selectors.editsAndActivity.c2pa.removed.description": "Один или несколько ресурсов удалены из файла",
  "selectors.editsAndActivity.c2pa.removed.label": "Ресурс удален",
  "selectors.editsAndActivity.c2pa.repackaged.description": "Ресурс переупакован без обработки",
  "selectors.editsAndActivity.c2pa.repackaged.label": "Переупакованный ресурс",
  "selectors.editsAndActivity.c2pa.resized.description": "Изменены размеры изображения или размер файла",
  "selectors.editsAndActivity.c2pa.resized.label": "Изменение размеров",
  "selectors.editsAndActivity.c2pa.transcoded.description": "Обработан или сжат ресурс для оптимизации при отображении",
  "selectors.editsAndActivity.c2pa.transcoded.label": "Обработанный ресурс",
  "selectors.editsAndActivity.c2pa.translated.description": "Переведенный контент",
  "selectors.editsAndActivity.c2pa.translated.label": "Переведенный",
  "selectors.editsAndActivity.c2pa.unknown.description": "Внесены другие правки или выполнены иные действия, которые не удалось распознать",
  "selectors.editsAndActivity.c2pa.unknown.label": "Неизвестные изменения или действия",
  "selectors.editsAndActivity.c2pa.watermarked.description": "Применен невидимый водяной знак для повышения долговечности Content Credentials",
  "selectors.editsAndActivity.c2pa.watermarked.label": "С водяными знаками",
  "selectors.editsAndActivity.c2pa.edited.metadata.description": "Внесены изменения в метаданные файла",
  "selectors.editsAndActivity.c2pa.edited.metadata.label": "Изменения метаданных"
}, zL = {
  "selectors.editsAndActivity.c2pa.color_adjustments.description": "Justerade egenskaper som ton, mättnad, kurvor, skuggor och högdagrar",
  "selectors.editsAndActivity.c2pa.color_adjustments.label": "Ändringar av färg eller exponering",
  "selectors.editsAndActivity.c2pa.converted.description": "Formatet på mediefilen ändrades",
  "selectors.editsAndActivity.c2pa.converted.label": "Konverterade mediefilen",
  "selectors.editsAndActivity.c2pa.created.description": "Skapade en ny fil eller nytt innehåll",
  "selectors.editsAndActivity.c2pa.created.label": "Skapat",
  "selectors.editsAndActivity.c2pa.cropped.description": "Använde beskärningsverktyg, minskade eller utökade synligt innehållsområde",
  "selectors.editsAndActivity.c2pa.cropped.label": "Beskärningsändringar",
  "selectors.editsAndActivity.c2pa.deleted.description": "Raderade visuella områden eller innehållets varaktighet",
  "selectors.editsAndActivity.c2pa.deleted.label": "Raderade innehåll",
  "selectors.editsAndActivity.c2pa.drawing.description": "Använde verktyg som pennor, penslar, suddgummin eller verktygen form, bana eller penna",
  "selectors.editsAndActivity.c2pa.drawing.label": "Teckningsändringar",
  "selectors.editsAndActivity.c2pa.dubbed.description": "Ersatte ljud",
  "selectors.editsAndActivity.c2pa.dubbed.label": "Dubbade",
  "selectors.editsAndActivity.c2pa.edited.description": "Gjorde andra ändringar",
  "selectors.editsAndActivity.c2pa.edited.label": "Andra ändringar",
  "selectors.editsAndActivity.c2pa.filtered.description": "Använde verktyg som filter, stilar eller effekter för att ändra utseende",
  "selectors.editsAndActivity.c2pa.filtered.label": "Redigering av filter eller stil",
  "selectors.editsAndActivity.c2pa.opened.description": "Öppnade en befintlig fil",
  "selectors.editsAndActivity.c2pa.opened.label": "Öppnat",
  "selectors.editsAndActivity.c2pa.orientation.description": "Ändrade placering eller orientering (roterad, vänd osv.)",
  "selectors.editsAndActivity.c2pa.orientation.label": "Orienteringsändringar",
  "selectors.editsAndActivity.c2pa.placed.description": "Lade till befintligt innehåll i den här filen",
  "selectors.editsAndActivity.c2pa.placed.label": "Importerat",
  "selectors.editsAndActivity.c2pa.published.description": "Mottagen och distribuerad bild",
  "selectors.editsAndActivity.c2pa.published.label": "Publicerade bild",
  "selectors.editsAndActivity.c2pa.removed.description": "En eller flera mediefiler togs bort från filen",
  "selectors.editsAndActivity.c2pa.removed.label": "Mediefilen togs bort",
  "selectors.editsAndActivity.c2pa.repackaged.description": "Mediefilen packades om utan att bearbetas",
  "selectors.editsAndActivity.c2pa.repackaged.label": "Paketerade om mediefilen",
  "selectors.editsAndActivity.c2pa.resized.description": "Ändrade mått eller filstorlek",
  "selectors.editsAndActivity.c2pa.resized.label": "Storleksändringar",
  "selectors.editsAndActivity.c2pa.transcoded.description": "Bearbetade eller komprimerade en mediefil för att optimera för visning",
  "selectors.editsAndActivity.c2pa.transcoded.label": "Bearbetade mediefilen",
  "selectors.editsAndActivity.c2pa.translated.description": "Översatte innehåll",
  "selectors.editsAndActivity.c2pa.translated.label": "Översatte",
  "selectors.editsAndActivity.c2pa.unknown.description": "Utförde andra redigeringar eller aktiviteter som inte kunde identifieras",
  "selectors.editsAndActivity.c2pa.unknown.label": "Okänd redigering eller aktivitet",
  "selectors.editsAndActivity.c2pa.watermarked.description": "En osynlig vattenstämpel har lagts in för att förbättra Content Credentials hållbarhet",
  "selectors.editsAndActivity.c2pa.watermarked.label": "Vattenstämplat",
  "selectors.editsAndActivity.c2pa.edited.metadata.description": "Ändrade i filmetadata",
  "selectors.editsAndActivity.c2pa.edited.metadata.label": "Metadataändringar"
}, jL = {
  "selectors.editsAndActivity.c2pa.color_adjustments.description": "Ton, doygunluk, eğriler, gölgeler veya vurgular gibi ayarlanmış özellikler",
  "selectors.editsAndActivity.c2pa.color_adjustments.label": "Renk veya pozlama düzenlemeleri",
  "selectors.editsAndActivity.c2pa.converted.description": "Varlığın formatı değiştirildi",
  "selectors.editsAndActivity.c2pa.converted.label": "Varlık dönüştürüldü",
  "selectors.editsAndActivity.c2pa.created.description": "Yeni bir dosya veya içerik oluşturuldu",
  "selectors.editsAndActivity.c2pa.created.label": "Oluşturuldu",
  "selectors.editsAndActivity.c2pa.cropped.description": "Kırpma araçları kullanılarak görünür içerik alanı küçültüldü veya genişletildi",
  "selectors.editsAndActivity.c2pa.cropped.label": "Kırpma düzenlemeleri",
  "selectors.editsAndActivity.c2pa.deleted.description": "İçeriğin görsel alanları veya süreleri silindi",
  "selectors.editsAndActivity.c2pa.deleted.label": "İçerik silindi",
  "selectors.editsAndActivity.c2pa.drawing.description": "Kurşun kalem, fırça, silgi veya şekil, yol ya da kalem araçları gibi araçlar kullanıldı",
  "selectors.editsAndActivity.c2pa.drawing.label": "Çizim düzenlemeleri",
  "selectors.editsAndActivity.c2pa.dubbed.description": "Ses içeriği değiştirildi",
  "selectors.editsAndActivity.c2pa.dubbed.label": "Dublajı yapıldı",
  "selectors.editsAndActivity.c2pa.edited.description": "Diğer değişiklikler yapıldı",
  "selectors.editsAndActivity.c2pa.edited.label": "Diğer düzenlemeler",
  "selectors.editsAndActivity.c2pa.filtered.description": "Görünümü değiştirmek için filtre, stil veya efekt gibi araçlar kullanıldı",
  "selectors.editsAndActivity.c2pa.filtered.label": "Filtre veya stil düzenlemeleri",
  "selectors.editsAndActivity.c2pa.opened.description": "Mevcut bir dosya açıldı",
  "selectors.editsAndActivity.c2pa.opened.label": "Açıldı",
  "selectors.editsAndActivity.c2pa.orientation.description": "Konum veya yönlendirme değiştirildi (döndürüldü, ters çevrildi vb.)",
  "selectors.editsAndActivity.c2pa.orientation.label": "Yönlendirme düzenlemeleri",
  "selectors.editsAndActivity.c2pa.placed.description": "Mevcut içerik bu dosyaya eklendi",
  "selectors.editsAndActivity.c2pa.placed.label": "İçe aktarıldı",
  "selectors.editsAndActivity.c2pa.published.description": "Görüntü alındı ve dağıtıldı",
  "selectors.editsAndActivity.c2pa.published.label": "Görüntü yayımlandığında",
  "selectors.editsAndActivity.c2pa.removed.description": "Dosyadan bir veya daha fazla varlık kaldırıldı",
  "selectors.editsAndActivity.c2pa.removed.label": "Varlık kaldırıldı",
  "selectors.editsAndActivity.c2pa.repackaged.description": "Varlık işlenmeden yeniden paketlendi",
  "selectors.editsAndActivity.c2pa.repackaged.label": "Varlık yeniden paketlendi",
  "selectors.editsAndActivity.c2pa.resized.description": "Boyutlar veya dosya boyutu değiştirildi",
  "selectors.editsAndActivity.c2pa.resized.label": "Yeniden boyutlandırma düzenlemeleri",
  "selectors.editsAndActivity.c2pa.transcoded.description": "Ekran için optimize etmek üzere varlık işlendi veya sıkıştırıldı",
  "selectors.editsAndActivity.c2pa.transcoded.label": "Varlık işlendi",
  "selectors.editsAndActivity.c2pa.translated.description": "İçerik çevrildi",
  "selectors.editsAndActivity.c2pa.translated.label": "Çevrildi",
  "selectors.editsAndActivity.c2pa.unknown.description": "Algılanamayan başka düzenlemeler veya etkinlikler gerçekleştirildi",
  "selectors.editsAndActivity.c2pa.unknown.label": "Bilinmeyen düzenlemeler veya etkinlikler",
  "selectors.editsAndActivity.c2pa.watermarked.description": "Bu Content Credentials'ın devamlılığını sağlamak için görünmez bir filigran uygulandı",
  "selectors.editsAndActivity.c2pa.watermarked.label": "Filigranlı",
  "selectors.editsAndActivity.c2pa.edited.metadata.description": "Dosya meta verilerinde değişiklikler yapıldı",
  "selectors.editsAndActivity.c2pa.edited.metadata.label": "Meta veri değişiklikleri"
}, BL = {
  "selectors.editsAndActivity.c2pa.color_adjustments.description": "Скориговано властивості, як-от тон, насиченість, криві, тіні або підсвічування",
  "selectors.editsAndActivity.c2pa.color_adjustments.label": "Зміни кольору або експозиції",
  "selectors.editsAndActivity.c2pa.converted.description": "Формат ресурсу змінено",
  "selectors.editsAndActivity.c2pa.converted.label": "Перетворений ресурс",
  "selectors.editsAndActivity.c2pa.created.description": "Створено новий файл або вміст",
  "selectors.editsAndActivity.c2pa.created.label": "Створено",
  "selectors.editsAndActivity.c2pa.cropped.description": "Використано інструменти кадрування, зменшення або розширення області видимого вмісту",
  "selectors.editsAndActivity.c2pa.cropped.label": "Зміни кадрування",
  "selectors.editsAndActivity.c2pa.deleted.description": "Видалено візуальні області або тривалість вмісту",
  "selectors.editsAndActivity.c2pa.deleted.label": "Видалений вміст",
  "selectors.editsAndActivity.c2pa.drawing.description": "Використано інструменти, як-от олівці, пензлі, гумки, або інструменти для форм, контурів або пера",
  "selectors.editsAndActivity.c2pa.drawing.label": "Зміни малювання",
  "selectors.editsAndActivity.c2pa.dubbed.description": "Замінене аудіо",
  "selectors.editsAndActivity.c2pa.dubbed.label": "Дубльовано",
  "selectors.editsAndActivity.c2pa.edited.description": "Внесено інші зміни",
  "selectors.editsAndActivity.c2pa.edited.label": "Інші зміни",
  "selectors.editsAndActivity.c2pa.filtered.description": "Використано інструменти, як-от фільтри, стилі чи ефекти для зміни вигляду",
  "selectors.editsAndActivity.c2pa.filtered.label": "Зміни фільтру або стилю",
  "selectors.editsAndActivity.c2pa.opened.description": "Відкрито вже існуючий файл",
  "selectors.editsAndActivity.c2pa.opened.label": "Відкрито",
  "selectors.editsAndActivity.c2pa.orientation.description": "Змінено положення або орієнтація (повернуто, віддзеркалено тощо)",
  "selectors.editsAndActivity.c2pa.orientation.label": "Зміни орієнтації",
  "selectors.editsAndActivity.c2pa.placed.description": "Додано вже існуючий вміст до цього файлу",
  "selectors.editsAndActivity.c2pa.placed.label": "Імпортовано",
  "selectors.editsAndActivity.c2pa.published.description": "Отримане й розповсюджене зображення",
  "selectors.editsAndActivity.c2pa.published.label": "Опубліковане зображення",
  "selectors.editsAndActivity.c2pa.removed.description": "Один або більше ресурсів видалено з файлу",
  "selectors.editsAndActivity.c2pa.removed.label": "Ресурс видалено",
  "selectors.editsAndActivity.c2pa.repackaged.description": "Ресурс було запаковано повторно без обробки",
  "selectors.editsAndActivity.c2pa.repackaged.label": "Повторно упакований ресурс",
  "selectors.editsAndActivity.c2pa.resized.description": "Змінено геометричні розміри або розмір файлу",
  "selectors.editsAndActivity.c2pa.resized.label": "Зміни розміру",
  "selectors.editsAndActivity.c2pa.transcoded.description": "Оброблений або стиснутий ресурс для оптимізації під час відображення",
  "selectors.editsAndActivity.c2pa.transcoded.label": "Оброблений ресурс",
  "selectors.editsAndActivity.c2pa.translated.description": "Перекладений вміст",
  "selectors.editsAndActivity.c2pa.translated.label": "Перекладено",
  "selectors.editsAndActivity.c2pa.unknown.description": "Виконано інші зміни або дії, які не вдалося розпізнати",
  "selectors.editsAndActivity.c2pa.unknown.label": "Невідомі зміни чи дії",
  "selectors.editsAndActivity.c2pa.watermarked.description": "Застосовано невидимий водяний знак для підвищення надійності цих Content Credentials",
  "selectors.editsAndActivity.c2pa.watermarked.label": "Позначено водяним знаком",
  "selectors.editsAndActivity.c2pa.edited.metadata.description": "Внесено зміни в метадані файлу",
  "selectors.editsAndActivity.c2pa.edited.metadata.label": "Зміни метаданих"
}, DL = {
  "selectors.editsAndActivity.c2pa.color_adjustments.description": "Đã chỉnh sửa các thuộc tính như tông màu, độ bão hòa, đường cong, bóng hoặc vùng sáng",
  "selectors.editsAndActivity.c2pa.color_adjustments.label": "Chỉnh sửa màu sắc hoặc độ phơi sáng",
  "selectors.editsAndActivity.c2pa.converted.description": "Định dạng của tài nguyên đã bị thay đổi",
  "selectors.editsAndActivity.c2pa.converted.label": "Đã chuyển đổi tài nguyên",
  "selectors.editsAndActivity.c2pa.created.description": "Đã tạo một tệp hoặc nội dung mới",
  "selectors.editsAndActivity.c2pa.created.label": "Đã tạo",
  "selectors.editsAndActivity.c2pa.cropped.description": "Đã sử dụng các công cụ cắt xén, giảm hoặc mở rộng vùng nội dung hiển thị",
  "selectors.editsAndActivity.c2pa.cropped.label": "Chỉnh sửa cắt xén",
  "selectors.editsAndActivity.c2pa.deleted.description": "Đã xóa các khu vực hình ảnh hoặc thời lượng nội dung",
  "selectors.editsAndActivity.c2pa.deleted.label": "Đã xóa nội dung",
  "selectors.editsAndActivity.c2pa.drawing.description": "Đã sử dụng các công cụ như bút chì, bút vẽ, tẩy hoặc công cụ hình dạng, đường dẫn hoặc bút",
  "selectors.editsAndActivity.c2pa.drawing.label": "Chỉnh sửa bản vẽ",
  "selectors.editsAndActivity.c2pa.dubbed.description": "Đã thay thế âm thanh",
  "selectors.editsAndActivity.c2pa.dubbed.label": "Đã lồng tiếng",
  "selectors.editsAndActivity.c2pa.edited.description": "Đã thực hiện các thay đổi khác",
  "selectors.editsAndActivity.c2pa.edited.label": "Các chỉnh sửa khác",
  "selectors.editsAndActivity.c2pa.filtered.description": "Đã sử dụng các công cụ như bộ lọc, kiểu hoặc hiệu ứng để thay đổi giao diện",
  "selectors.editsAndActivity.c2pa.filtered.label": "Chỉnh sửa bộ lọc hoặc kiểu",
  "selectors.editsAndActivity.c2pa.opened.description": "Đã mở một tệp có sẵn",
  "selectors.editsAndActivity.c2pa.opened.label": "Đã mở",
  "selectors.editsAndActivity.c2pa.orientation.description": "Đã thay đổi vị trí hoặc hướng (xoay, lật, v.v.)",
  "selectors.editsAndActivity.c2pa.orientation.label": "Chỉnh sửa hướng",
  "selectors.editsAndActivity.c2pa.placed.description": "Đã thêm nội dung có sẵn vào tệp này",
  "selectors.editsAndActivity.c2pa.placed.label": "Đã nhập",
  "selectors.editsAndActivity.c2pa.published.description": "Đã nhận được và phân phối hình ảnh",
  "selectors.editsAndActivity.c2pa.published.label": "Đã xuất bản hình ảnh",
  "selectors.editsAndActivity.c2pa.removed.description": "Một hoặc nhiều tài nguyên đã bị xóa khỏi tệp",
  "selectors.editsAndActivity.c2pa.removed.label": "Tài nguyên bị xóa",
  "selectors.editsAndActivity.c2pa.repackaged.description": "Tài nguyên đã được đóng gói lại mà không được xử lý",
  "selectors.editsAndActivity.c2pa.repackaged.label": "Đã đóng gói lại tài nguyên",
  "selectors.editsAndActivity.c2pa.resized.description": "Đã thay đổi kích thước hoặc kích thước tệp",
  "selectors.editsAndActivity.c2pa.resized.label": "Chỉnh sửa thay đổi kích thước",
  "selectors.editsAndActivity.c2pa.transcoded.description": "Đã xử lý hoặc nén một tài nguyên để tối ưu hóa cho hiển thị",
  "selectors.editsAndActivity.c2pa.transcoded.label": "Đã xử lý tài nguyên",
  "selectors.editsAndActivity.c2pa.translated.description": "Đã dịch nội dung",
  "selectors.editsAndActivity.c2pa.translated.label": "Đã dịch",
  "selectors.editsAndActivity.c2pa.unknown.description": "Đã thực hiện các chỉnh sửa hoặc hoạt động khác không nhận diện được",
  "selectors.editsAndActivity.c2pa.unknown.label": "Các chỉnh sửa hoặc hoạt động không xác định",
  "selectors.editsAndActivity.c2pa.watermarked.description": "Đã áp dụng hình mờ vô hình để cải thiện độ bền của Content Credential này",
  "selectors.editsAndActivity.c2pa.watermarked.label": "Đã áp dụng hình mờ",
  "selectors.editsAndActivity.c2pa.edited.metadata.description": "Đã thực hiện các thay đổi đối với siêu dữ liệu của tệp",
  "selectors.editsAndActivity.c2pa.edited.metadata.label": "Các thay đổi đối với siêu dữ liệu"
}, WL = {
  "selectors.editsAndActivity.c2pa.color_adjustments.description": "调整后的属性，如色调、饱和度、曲线、阴影或高光",
  "selectors.editsAndActivity.c2pa.color_adjustments.label": "颜色或曝光度编辑",
  "selectors.editsAndActivity.c2pa.converted.description": "资产格式已更改",
  "selectors.editsAndActivity.c2pa.converted.label": "已转换的资产",
  "selectors.editsAndActivity.c2pa.created.description": "已创建新文件或内容",
  "selectors.editsAndActivity.c2pa.created.label": "已创建",
  "selectors.editsAndActivity.c2pa.cropped.description": "已使用的裁切工具（用于减少或扩大可见内容区域）",
  "selectors.editsAndActivity.c2pa.cropped.label": "裁切编辑",
  "selectors.editsAndActivity.c2pa.deleted.description": "删除了可视区域或内容时长",
  "selectors.editsAndActivity.c2pa.deleted.label": "删除的内容",
  "selectors.editsAndActivity.c2pa.drawing.description": "已使用的工具，如铅笔、画笔、橡皮擦、形状、路径或钢笔工具",
  "selectors.editsAndActivity.c2pa.drawing.label": "绘图编辑",
  "selectors.editsAndActivity.c2pa.dubbed.description": "替换的音频",
  "selectors.editsAndActivity.c2pa.dubbed.label": "已配音",
  "selectors.editsAndActivity.c2pa.edited.description": "已执行其他更改",
  "selectors.editsAndActivity.c2pa.edited.label": "其他编辑",
  "selectors.editsAndActivity.c2pa.filtered.description": "已使用过滤器、样式或效果等工具来更改外观",
  "selectors.editsAndActivity.c2pa.filtered.label": "过滤器或样式编辑",
  "selectors.editsAndActivity.c2pa.opened.description": "已打开一个预先存在的文件",
  "selectors.editsAndActivity.c2pa.opened.label": "已打开",
  "selectors.editsAndActivity.c2pa.orientation.description": "已改变位置或方向（旋转、翻转等）",
  "selectors.editsAndActivity.c2pa.orientation.label": "方向编辑",
  "selectors.editsAndActivity.c2pa.placed.description": "已向此文件添加预先存在的内容",
  "selectors.editsAndActivity.c2pa.placed.label": "已导入",
  "selectors.editsAndActivity.c2pa.published.description": "收到和分发了图像",
  "selectors.editsAndActivity.c2pa.published.label": "发布了图像",
  "selectors.editsAndActivity.c2pa.removed.description": "已从文件中移除一个或多个资产",
  "selectors.editsAndActivity.c2pa.removed.label": "资产已移除",
  "selectors.editsAndActivity.c2pa.repackaged.description": "资产已在未经处理的情况下重新包装",
  "selectors.editsAndActivity.c2pa.repackaged.label": "重新包装的资产",
  "selectors.editsAndActivity.c2pa.resized.description": "已更改尺寸或文件大小",
  "selectors.editsAndActivity.c2pa.resized.label": "调整编辑大小",
  "selectors.editsAndActivity.c2pa.transcoded.description": "已处理或压缩资产，以优化显示",
  "selectors.editsAndActivity.c2pa.transcoded.label": "已处理的资产",
  "selectors.editsAndActivity.c2pa.translated.description": "翻译的内容",
  "selectors.editsAndActivity.c2pa.translated.label": "已翻译",
  "selectors.editsAndActivity.c2pa.unknown.description": "已执行其他无法识别的编辑或活动",
  "selectors.editsAndActivity.c2pa.unknown.label": "未知的编辑或活动",
  "selectors.editsAndActivity.c2pa.watermarked.description": "采用了不可见的水印来提高此 Content Credential 的持久性",
  "selectors.editsAndActivity.c2pa.watermarked.label": "已加水印",
  "selectors.editsAndActivity.c2pa.edited.metadata.description": "更改了文件元数据",
  "selectors.editsAndActivity.c2pa.edited.metadata.label": "元数据更改"
}, NL = {
  "selectors.editsAndActivity.c2pa.color_adjustments.description": "調整了屬性，如色調、飽和度、曲線、陰影或亮部",
  "selectors.editsAndActivity.c2pa.color_adjustments.label": "顏色或曝光編輯",
  "selectors.editsAndActivity.c2pa.converted.description": "資產的格式已變更",
  "selectors.editsAndActivity.c2pa.converted.label": "轉換了資產",
  "selectors.editsAndActivity.c2pa.created.description": "建立了新檔案或內容",
  "selectors.editsAndActivity.c2pa.created.label": "已建立",
  "selectors.editsAndActivity.c2pa.cropped.description": "使用了裁切工具，縮減或擴大可見內容區域",
  "selectors.editsAndActivity.c2pa.cropped.label": "裁切編輯",
  "selectors.editsAndActivity.c2pa.deleted.description": "刪除了內容的視覺區域或持續時間",
  "selectors.editsAndActivity.c2pa.deleted.label": "刪除了內容",
  "selectors.editsAndActivity.c2pa.drawing.description": "使用了鉛筆、筆刷、橡皮擦等工具，或是形狀、路徑或筆型工具",
  "selectors.editsAndActivity.c2pa.drawing.label": "繪圖編輯",
  "selectors.editsAndActivity.c2pa.dubbed.description": "取代了音訊",
  "selectors.editsAndActivity.c2pa.dubbed.label": "已配音",
  "selectors.editsAndActivity.c2pa.edited.description": "進行了其他變更",
  "selectors.editsAndActivity.c2pa.edited.label": "其他編輯",
  "selectors.editsAndActivity.c2pa.filtered.description": "使用了濾鏡、樣式或效果等工具來變更外觀",
  "selectors.editsAndActivity.c2pa.filtered.label": "濾鏡或風格編輯",
  "selectors.editsAndActivity.c2pa.opened.description": "開啟了已存在的檔案",
  "selectors.editsAndActivity.c2pa.opened.label": "已開啟",
  "selectors.editsAndActivity.c2pa.orientation.description": "變更了位置或方向 (旋轉、翻轉等)",
  "selectors.editsAndActivity.c2pa.orientation.label": "方向編輯",
  "selectors.editsAndActivity.c2pa.placed.description": "對此檔案新增了已存在的內容",
  "selectors.editsAndActivity.c2pa.placed.label": "已讀入",
  "selectors.editsAndActivity.c2pa.published.description": "接收和散發了影像",
  "selectors.editsAndActivity.c2pa.published.label": "發佈了影像",
  "selectors.editsAndActivity.c2pa.removed.description": "一項或多項資產已從檔案中移除",
  "selectors.editsAndActivity.c2pa.removed.label": "移除的資產",
  "selectors.editsAndActivity.c2pa.repackaged.description": "資產未經處理就重新封裝",
  "selectors.editsAndActivity.c2pa.repackaged.label": "重新封裝了資產",
  "selectors.editsAndActivity.c2pa.resized.description": "變更了尺寸或檔案大小",
  "selectors.editsAndActivity.c2pa.resized.label": "調整大小編輯",
  "selectors.editsAndActivity.c2pa.transcoded.description": "處理或壓縮了要最佳化顯示的資產",
  "selectors.editsAndActivity.c2pa.transcoded.label": "處理了資產",
  "selectors.editsAndActivity.c2pa.translated.description": "翻譯了內容",
  "selectors.editsAndActivity.c2pa.translated.label": "已翻譯",
  "selectors.editsAndActivity.c2pa.unknown.description": "執行了其他無法辨識的編輯或活動",
  "selectors.editsAndActivity.c2pa.unknown.label": "未知的編輯或活動",
  "selectors.editsAndActivity.c2pa.watermarked.description": "套用了隱形浮水印，以提高此 Content Credential 的持久性",
  "selectors.editsAndActivity.c2pa.watermarked.label": "已套用浮水印",
  "selectors.editsAndActivity.c2pa.edited.metadata.description": "對檔案中繼資料進行了變更",
  "selectors.editsAndActivity.c2pa.edited.metadata.label": "中繼資料變更"
}, UL = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  cs_CZ: bL,
  da_DK: mL,
  de_DE: wL,
  en_US: CL,
  es_ES: xL,
  fi_FI: RL,
  fr_FR: kL,
  hu_HU: EL,
  id_ID: IL,
  it_IT: $L,
  ja_JP: TL,
  ko_KR: SL,
  nb_NO: OL,
  nl_NL: PL,
  pl_PL: FL,
  pt_BR: ML,
  ru_RU: LL,
  sv_SE: zL,
  tr_TR: jL,
  uk_UA: BL,
  vi_VN: DL,
  zh_CN: WL,
  zh_TW: NL
});
ln("c2pa:selector:editsAndActivity");
yL(UL, (n, r) => r.replace("_", "-"));
eL(ZM, vL((n) => n.id), cL((n) => n.label));
const te = (...n) => n.filter((r) => r).map((r) => `Syw-${r}`).join(" "), dg = (n, r) => {
  (n.key === "Enter" || n.key === " ") && (n.preventDefault(), r && r(n));
}, qL = (n) => `https://verify.contentauthenticity.org/inspect?source=${n}`, Pp = "en", Bn = "en_US", ic = {
  en: "en_US",
  no: "no_NO",
  sv: "sv_SE"
}, GL = {
  producer: "Produced by",
  generator: "Produced with",
  signator: "Issued by",
  timestamp: "Timestamp",
  location: "Location",
  ingredients: "Ingredients",
  toggle_explain: "What is this?",
  toggle_explain_close: "Close",
  toggle_provenance: "View Image Origin",
  explainer_methods_pre: "Read about",
  explainer_methods_link: "our methods",
  explainer_methods_url: "#",
  verify_pre: "Verify on",
  verify_cc: "Content Credentials"
}, HL = {
  producer: "Produsent",
  generator: "Produsert med",
  signator: "Signert av",
  timestamp: "Tidsstempel",
  location: "Sted",
  ingredients: "Ingredienser",
  toggle_explain: "Hva er dette?",
  toggle_explain_close: "Lukke",
  toggle_provenance: "Se bildeopprinnelse",
  explainer_methods_pre: "Les om",
  explainer_methods_link: "våre metoder",
  explainer_methods_url: "#",
  verify_pre: "Verifiser på",
  verify_cc: "Content Credentials"
}, KL = {
  producer: "Producent",
  generator: "Producerad med",
  signator: "Undertecknad av",
  timestamp: "Tidsstämpel",
  location: "Plats",
  ingredients: "Ingredienser",
  toggle_explain: "Vad är det här?",
  toggle_explain_close: "Stäng",
  toggle_provenance: "Visa bildens ursprung",
  explainer_methods_pre: "Läs om",
  explainer_methods_link: "våra metoder",
  explainer_methods_url: "#",
  verify_pre: "Verifiera på",
  verify_cc: "Content Credentials"
}, gc = {
  en_US: GL,
  no_NO: HL,
  sv_SE: KL
}, YL = (n = Bn) => n.split("_")[0], VL = (n = Pp) => ic.hasOwnProperty(n) ? ic[n] : ic[Pp], ZL = (n = Bn) => {
  const r = YL(n);
  return VL(r);
}, ug = (n = Bn) => {
  let r;
  if (gc.hasOwnProperty(n))
    r = n;
  else {
    const i = ZL(n);
    gc.hasOwnProperty(i) ? r = i : r = Bn;
  }
  return r;
}, JL = (n = Bn) => {
  const r = ug(n);
  return gc[r];
}, XL = (n = Bn, ...r) => JL(n)[r.join("_")], fg = (n = Bn, r) => {
  const i = r ? new Date(r) : null;
  return i instanceof Date && isFinite(i.getTime()) ? i.toLocaleDateString(n.replace("_", "-"), {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  }) : null;
}, QL = "https://cdn.jsdelivr.net/npm/@contentauth/c2pa-web/dist/resources/c2pa_bg.wasm", e3 = (n = {}) => ({
  wasmSrc: n.wasmSrc || QL
}), t3 = async (n, r) => {
  const o = await (await fetch(r)).blob(), l = await n.reader.fromBlob(o.type, o);
  return { manifestStore: await l.manifestStore(), reader: l };
}, Qr = (n, r) => {
  var l, d;
  return ((d = (l = n == null ? void 0 : n.assertions) == null ? void 0 : l.find((p) => p.label === "stds.exif")) == null ? void 0 : d.data)[`exif:${r}`];
}, n3 = (n, r) => {
  var l, d;
  return ((d = (l = n == null ? void 0 : n.assertions) == null ? void 0 : l.find((p) => p.label.includes("stds.schema-org"))) == null ? void 0 : d.data)[r];
}, r3 = (n) => n == null ? void 0 : n.instance_id, i3 = (n) => n3(n, "author") ?? [], a3 = (n) => {
  var r;
  return n != null && n.claim_generator_info ? (r = n == null ? void 0 : n.claim_generator_info) == null ? void 0 : r.map(
    (i) => [i.name, i.version].filter((o) => o != null).join(" ")
  ).join(", ") : Qr(n, "Make") || Qr(n, "Model") ? (Qr(n, "Make"), [Qr(n, "Model")].join(" ")) : n != null && n.claim_generator ? n == null ? void 0 : n.claim_generator : null;
}, s3 = (n) => {
  var r;
  return (r = n == null ? void 0 : n.signature_info) == null ? void 0 : r.issuer;
}, o3 = (n, r) => {
  var i, o;
  if ((i = n == null ? void 0 : n.signature_info) != null && i.time)
    return new Date((o = n == null ? void 0 : n.signature_info) == null ? void 0 : o.time);
  {
    const d = Qr(n, "DateTimeOriginal").split(/\D/);
    return new Date(
      d[0],
      d[1] - 1,
      d[2],
      d[3],
      d[4],
      d[5]
    );
  }
}, c3 = async (n, r) => {
  const i = n == null ? void 0 : n.thumbnail;
  if (!i || !r) return null;
  try {
    const o = await r.resourceToBytes(i.identifier);
    if (o) {
      const l = new Blob([o], { type: i.format });
      return URL.createObjectURL(l);
    }
    return null;
  } catch (o) {
    return console.error("Failed to get thumbnail URL:", o), null;
  }
}, l3 = (n) => `https://verify.contentauthenticity.org/inspect?source=${n}`, d3 = async ({ src: n, locale: r, manifest: i, reader: o }) => (ug(r), {
  id: r3(i),
  producer: i3(i),
  generator: a3(i),
  signator: s3(i),
  timestamp: o3(i),
  // ingredients: getIngredients(manifest),
  thumbnail: await c3(i, o),
  // location: getLocation(manifest),
  verifyUrl: l3(n)
}), pg = va({
  c2pa: null
}), u3 = () => ga(pg), f3 = ({
  children: n
}) => {
  const [r, i] = ct(null);
  return wt(() => {
    (async () => {
      const l = await qw(e3());
      i(l);
    })();
  }, []), /* @__PURE__ */ ur.createElement(
    pg.Provider,
    {
      value: {
        c2pa: r
      }
    },
    n
  );
}, vg = va({
  src: null,
  alt: null,
  caption: null,
  byline: null,
  manifests: [],
  setManifests: () => !1
}), Ma = () => ga(vg), p3 = ({
  src: n,
  alt: r,
  caption: i,
  byline: o,
  children: l
}) => {
  const [d, p] = ct([]);
  return /* @__PURE__ */ ur.createElement(
    vg.Provider,
    {
      value: {
        src: n,
        alt: r,
        caption: i,
        byline: o,
        manifests: d,
        setManifests: p
      }
    },
    l
  );
}, gg = va({
  locale: null,
  setLocale: () => null,
  dictionary: !1,
  getText: () => null
}), Nn = () => ga(gg), v3 = ({
  locale: n,
  children: r
}) => {
  const i = (...o) => XL(n, ...o);
  return /* @__PURE__ */ ur.createElement(
    gg.Provider,
    {
      value: {
        locale: n,
        getText: i
      }
    },
    r
  );
}, Ag = "expand", g3 = [
  "producer",
  // 'producerSocials',
  "timestamp",
  "signator",
  // 'ingredients',
  "generator",
  // 'verify',
  "location"
], A3 = [
  "signator",
  "generator"
], hg = va({
  variant: Ag,
  elem: null,
  isHoverImage: !1,
  isShowProvenance: !1,
  isShowExplainer: !1,
  openManifests: {},
  compareImage: null,
  setElem: () => !1,
  hoverImage: () => !1,
  unhoverImage: () => !1,
  showProvenance: () => !1,
  hideProvenance: () => !1,
  showExplainer: () => !1,
  hideExplainer: () => !1,
  openManifest: () => !1,
  closeManifest: () => !1,
  addCompareImage: () => !1,
  removeCompareImage: () => !1,
  updateComparePosition: () => !1,
  eventHandler: null
}), Kt = () => ga(hg), h3 = ({
  variant: n = Ag,
  children: r
}) => {
  const [i, o] = ct(null), [l, d] = ct(!1), [p, g] = ct(!1), [v, m] = ct(!1), [y, h] = ct(null), [R, P] = ct(null), $ = Ft({}), M = Ft(null), O = (V, ae, ...Ie) => {
    var Ue;
    typeof (ae == null ? void 0 : ae.persist) == "function" && ae.persist();
    const He = M.current, Lt = (ae == null ? void 0 : ae.nativeEvent) ?? ((Ue = ae == null ? void 0 : ae.detail) == null ? void 0 : Ue.originalEvent) ?? ae;
    typeof He == "function" && He(V, Lt, ...Ie);
  }, F = (V) => {
    d(!0), O("image.hover", V);
  }, L = (V) => {
    d(!1), O("image.unhover", V);
  }, J = (V) => {
    g(!0), O("provenance.open", V);
  }, ne = (V) => {
    g(!1), O("provenance.close", V);
  }, ye = (V) => {
    m(!0), O("explainer.open", V);
  }, Ae = (V) => {
    m(!1), O("explainer.close", V);
  }, ve = (V, ae) => {
    const Ie = Object.assign($.current, {});
    Ie[ae.id] = ae, $.current = Ie, O("manifest.open", V, ae);
  }, ce = (V, ae) => {
    const Ie = Object.assign($.current, {});
    delete Ie[ae.id], $.current = Ie, O("manifest.close", V, ae);
  }, we = (V, ae) => {
    h(V), O("manifest.compareImage.add", ae);
  }, Se = (V) => {
    h(null), O("manifest.compareImage.remove", V);
  }, Ne = (V) => {
    P(V);
  };
  return /* @__PURE__ */ ur.createElement(
    hg.Provider,
    {
      value: {
        elem: i,
        variant: n,
        isHoverImage: l,
        isOpenProvenance: p,
        isOpenExplainer: v,
        openManifests: $.current,
        compareImage: y,
        comparePosition: R,
        setElem: o,
        hoverImage: F,
        unhoverImage: L,
        openProvenance: J,
        closeProvenance: ne,
        openExplainer: ye,
        closeExplainer: Ae,
        openManifest: ve,
        closeManifest: ce,
        addCompareImage: we,
        removeCompareImage: Se,
        updateComparePosition: Ne,
        eventHandler: M
      }
    },
    r
  );
}, _3 = (n) => {
  const { c2pa: r } = u3(), [i, o] = ct(null), [l, d] = ct(null);
  return wt(() => {
    if (!n || !r) return;
    let p = !1;
    return (async () => {
      try {
        const { manifestStore: v, reader: m } = await t3(r, n);
        p || (o(m), d({ manifestStore: v }));
      } catch (v) {
        console.error(v);
      }
    })(), () => {
      p = !0;
    };
  }, [n, r]), { reader: i, provenance: l };
};
var ca = { exports: {} }, Jr = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Fp;
function y3() {
  if (Fp) return Jr;
  Fp = 1;
  var n = ur, r = Symbol.for("react.element"), i = Symbol.for("react.fragment"), o = Object.prototype.hasOwnProperty, l = n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, d = { key: !0, ref: !0, __self: !0, __source: !0 };
  function p(g, v, m) {
    var y, h = {}, R = null, P = null;
    m !== void 0 && (R = "" + m), v.key !== void 0 && (R = "" + v.key), v.ref !== void 0 && (P = v.ref);
    for (y in v) o.call(v, y) && !d.hasOwnProperty(y) && (h[y] = v[y]);
    if (g && g.defaultProps) for (y in v = g.defaultProps, v) h[y] === void 0 && (h[y] = v[y]);
    return { $$typeof: r, type: g, key: R, ref: P, props: h, _owner: l.current };
  }
  return Jr.Fragment = i, Jr.jsx = p, Jr.jsxs = p, Jr;
}
var Xr = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Mp;
function b3() {
  return Mp || (Mp = 1, process.env.NODE_ENV !== "production" && (function() {
    var n = ur, r = Symbol.for("react.element"), i = Symbol.for("react.portal"), o = Symbol.for("react.fragment"), l = Symbol.for("react.strict_mode"), d = Symbol.for("react.profiler"), p = Symbol.for("react.provider"), g = Symbol.for("react.context"), v = Symbol.for("react.forward_ref"), m = Symbol.for("react.suspense"), y = Symbol.for("react.suspense_list"), h = Symbol.for("react.memo"), R = Symbol.for("react.lazy"), P = Symbol.for("react.offscreen"), $ = Symbol.iterator, M = "@@iterator";
    function O(_) {
      if (_ === null || typeof _ != "object")
        return null;
      var S = $ && _[$] || _[M];
      return typeof S == "function" ? S : null;
    }
    var F = n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function L(_) {
      {
        for (var S = arguments.length, B = new Array(S > 1 ? S - 1 : 0), Z = 1; Z < S; Z++)
          B[Z - 1] = arguments[Z];
        J("error", _, B);
      }
    }
    function J(_, S, B) {
      {
        var Z = F.ReactDebugCurrentFrame, pe = Z.getStackAddendum();
        pe !== "" && (S += "%s", B = B.concat([pe]));
        var he = B.map(function(de) {
          return String(de);
        });
        he.unshift("Warning: " + S), Function.prototype.apply.call(console[_], console, he);
      }
    }
    var ne = !1, ye = !1, Ae = !1, ve = !1, ce = !1, we;
    we = Symbol.for("react.module.reference");
    function Se(_) {
      return !!(typeof _ == "string" || typeof _ == "function" || _ === o || _ === d || ce || _ === l || _ === m || _ === y || ve || _ === P || ne || ye || Ae || typeof _ == "object" && _ !== null && (_.$$typeof === R || _.$$typeof === h || _.$$typeof === p || _.$$typeof === g || _.$$typeof === v || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      _.$$typeof === we || _.getModuleId !== void 0));
    }
    function Ne(_, S, B) {
      var Z = _.displayName;
      if (Z)
        return Z;
      var pe = S.displayName || S.name || "";
      return pe !== "" ? B + "(" + pe + ")" : B;
    }
    function V(_) {
      return _.displayName || "Context";
    }
    function ae(_) {
      if (_ == null)
        return null;
      if (typeof _.tag == "number" && L("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof _ == "function")
        return _.displayName || _.name || null;
      if (typeof _ == "string")
        return _;
      switch (_) {
        case o:
          return "Fragment";
        case i:
          return "Portal";
        case d:
          return "Profiler";
        case l:
          return "StrictMode";
        case m:
          return "Suspense";
        case y:
          return "SuspenseList";
      }
      if (typeof _ == "object")
        switch (_.$$typeof) {
          case g:
            var S = _;
            return V(S) + ".Consumer";
          case p:
            var B = _;
            return V(B._context) + ".Provider";
          case v:
            return Ne(_, _.render, "ForwardRef");
          case h:
            var Z = _.displayName || null;
            return Z !== null ? Z : ae(_.type) || "Memo";
          case R: {
            var pe = _, he = pe._payload, de = pe._init;
            try {
              return ae(de(he));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var Ie = Object.assign, He = 0, Lt, Ue, Qe, dn, Yt, et, xn;
    function qe() {
    }
    qe.__reactDisabledLog = !0;
    function Vt() {
      {
        if (He === 0) {
          Lt = console.log, Ue = console.info, Qe = console.warn, dn = console.error, Yt = console.group, et = console.groupCollapsed, xn = console.groupEnd;
          var _ = {
            configurable: !0,
            enumerable: !0,
            value: qe,
            writable: !0
          };
          Object.defineProperties(console, {
            info: _,
            log: _,
            warn: _,
            error: _,
            group: _,
            groupCollapsed: _,
            groupEnd: _
          });
        }
        He++;
      }
    }
    function N() {
      {
        if (He--, He === 0) {
          var _ = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: Ie({}, _, {
              value: Lt
            }),
            info: Ie({}, _, {
              value: Ue
            }),
            warn: Ie({}, _, {
              value: Qe
            }),
            error: Ie({}, _, {
              value: dn
            }),
            group: Ie({}, _, {
              value: Yt
            }),
            groupCollapsed: Ie({}, _, {
              value: et
            }),
            groupEnd: Ie({}, _, {
              value: xn
            })
          });
        }
        He < 0 && L("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var z = F.ReactCurrentDispatcher, D;
    function G(_, S, B) {
      {
        if (D === void 0)
          try {
            throw Error();
          } catch (pe) {
            var Z = pe.stack.trim().match(/\n( *(at )?)/);
            D = Z && Z[1] || "";
          }
        return `
` + D + _;
      }
    }
    var X = !1, Oe;
    {
      var Ke = typeof WeakMap == "function" ? WeakMap : Map;
      Oe = new Ke();
    }
    function ze(_, S) {
      if (!_ || X)
        return "";
      {
        var B = Oe.get(_);
        if (B !== void 0)
          return B;
      }
      var Z;
      X = !0;
      var pe = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var he;
      he = z.current, z.current = null, Vt();
      try {
        if (S) {
          var de = function() {
            throw Error();
          };
          if (Object.defineProperty(de.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(de, []);
            } catch (je) {
              Z = je;
            }
            Reflect.construct(_, [], de);
          } else {
            try {
              de.call();
            } catch (je) {
              Z = je;
            }
            _.call(de.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (je) {
            Z = je;
          }
          _();
        }
      } catch (je) {
        if (je && Z && typeof je.stack == "string") {
          for (var oe = je.stack.split(`
`), Ye = Z.stack.split(`
`), $e = oe.length - 1, Pe = Ye.length - 1; $e >= 1 && Pe >= 0 && oe[$e] !== Ye[Pe]; )
            Pe--;
          for (; $e >= 1 && Pe >= 0; $e--, Pe--)
            if (oe[$e] !== Ye[Pe]) {
              if ($e !== 1 || Pe !== 1)
                do
                  if ($e--, Pe--, Pe < 0 || oe[$e] !== Ye[Pe]) {
                    var lt = `
` + oe[$e].replace(" at new ", " at ");
                    return _.displayName && lt.includes("<anonymous>") && (lt = lt.replace("<anonymous>", _.displayName)), typeof _ == "function" && Oe.set(_, lt), lt;
                  }
                while ($e >= 1 && Pe >= 0);
              break;
            }
        }
      } finally {
        X = !1, z.current = he, N(), Error.prepareStackTrace = pe;
      }
      var zt = _ ? _.displayName || _.name : "", Jt = zt ? G(zt) : "";
      return typeof _ == "function" && Oe.set(_, Jt), Jt;
    }
    function it(_, S, B) {
      return ze(_, !1);
    }
    function tt(_) {
      var S = _.prototype;
      return !!(S && S.isReactComponent);
    }
    function Ct(_, S, B) {
      if (_ == null)
        return "";
      if (typeof _ == "function")
        return ze(_, tt(_));
      if (typeof _ == "string")
        return G(_);
      switch (_) {
        case m:
          return G("Suspense");
        case y:
          return G("SuspenseList");
      }
      if (typeof _ == "object")
        switch (_.$$typeof) {
          case v:
            return it(_.render);
          case h:
            return Ct(_.type, S, B);
          case R: {
            var Z = _, pe = Z._payload, he = Z._init;
            try {
              return Ct(he(pe), S, B);
            } catch {
            }
          }
        }
      return "";
    }
    var Rn = Object.prototype.hasOwnProperty, xt = {}, wr = F.ReactDebugCurrentFrame;
    function Un(_) {
      if (_) {
        var S = _._owner, B = Ct(_.type, _._source, S ? S.type : null);
        wr.setExtraStackFrame(B);
      } else
        wr.setExtraStackFrame(null);
    }
    function kn(_, S, B, Z, pe) {
      {
        var he = Function.call.bind(Rn);
        for (var de in _)
          if (he(_, de)) {
            var oe = void 0;
            try {
              if (typeof _[de] != "function") {
                var Ye = Error((Z || "React class") + ": " + B + " type `" + de + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof _[de] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw Ye.name = "Invariant Violation", Ye;
              }
              oe = _[de](S, de, Z, B, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch ($e) {
              oe = $e;
            }
            oe && !(oe instanceof Error) && (Un(pe), L("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", Z || "React class", B, de, typeof oe), Un(null)), oe instanceof Error && !(oe.message in xt) && (xt[oe.message] = !0, Un(pe), L("Failed %s type: %s", B, oe.message), Un(null));
          }
      }
    }
    var gt = Array.isArray;
    function Zt(_) {
      return gt(_);
    }
    function qn(_) {
      {
        var S = typeof Symbol == "function" && Symbol.toStringTag, B = S && _[Symbol.toStringTag] || _.constructor.name || "Object";
        return B;
      }
    }
    function La(_) {
      try {
        return un(_), !1;
      } catch {
        return !0;
      }
    }
    function un(_) {
      return "" + _;
    }
    function vi(_) {
      if (La(_))
        return L("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", qn(_)), un(_);
    }
    var fn = F.ReactCurrentOwner, pn = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, Gn, Hn;
    function Cr(_) {
      if (Rn.call(_, "ref")) {
        var S = Object.getOwnPropertyDescriptor(_, "ref").get;
        if (S && S.isReactWarning)
          return !1;
      }
      return _.ref !== void 0;
    }
    function xr(_) {
      if (Rn.call(_, "key")) {
        var S = Object.getOwnPropertyDescriptor(_, "key").get;
        if (S && S.isReactWarning)
          return !1;
      }
      return _.key !== void 0;
    }
    function Rr(_, S) {
      typeof _.ref == "string" && fn.current;
    }
    function kr(_, S) {
      {
        var B = function() {
          Gn || (Gn = !0, L("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", S));
        };
        B.isReactWarning = !0, Object.defineProperty(_, "key", {
          get: B,
          configurable: !0
        });
      }
    }
    function Er(_, S) {
      {
        var B = function() {
          Hn || (Hn = !0, L("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", S));
        };
        B.isReactWarning = !0, Object.defineProperty(_, "ref", {
          get: B,
          configurable: !0
        });
      }
    }
    var Ir = function(_, S, B, Z, pe, he, de) {
      var oe = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: r,
        // Built-in properties that belong on the element
        type: _,
        key: S,
        ref: B,
        props: de,
        // Record the component responsible for creating this element.
        _owner: he
      };
      return oe._store = {}, Object.defineProperty(oe._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(oe, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: Z
      }), Object.defineProperty(oe, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: pe
      }), Object.freeze && (Object.freeze(oe.props), Object.freeze(oe)), oe;
    };
    function $r(_, S, B, Z, pe) {
      {
        var he, de = {}, oe = null, Ye = null;
        B !== void 0 && (vi(B), oe = "" + B), xr(S) && (vi(S.key), oe = "" + S.key), Cr(S) && (Ye = S.ref, Rr(S, pe));
        for (he in S)
          Rn.call(S, he) && !pn.hasOwnProperty(he) && (de[he] = S[he]);
        if (_ && _.defaultProps) {
          var $e = _.defaultProps;
          for (he in $e)
            de[he] === void 0 && (de[he] = $e[he]);
        }
        if (oe || Ye) {
          var Pe = typeof _ == "function" ? _.displayName || _.name || "Unknown" : _;
          oe && kr(de, Pe), Ye && Er(de, Pe);
        }
        return Ir(_, oe, Ye, pe, Z, fn.current, de);
      }
    }
    var Tr = F.ReactCurrentOwner, gi = F.ReactDebugCurrentFrame;
    function vn(_) {
      if (_) {
        var S = _._owner, B = Ct(_.type, _._source, S ? S.type : null);
        gi.setExtraStackFrame(B);
      } else
        gi.setExtraStackFrame(null);
    }
    var Kn;
    Kn = !1;
    function Yn(_) {
      return typeof _ == "object" && _ !== null && _.$$typeof === r;
    }
    function Ai() {
      {
        if (Tr.current) {
          var _ = ae(Tr.current.type);
          if (_)
            return `

Check the render method of \`` + _ + "`.";
        }
        return "";
      }
    }
    function za(_) {
      return "";
    }
    var hi = {};
    function ja(_) {
      {
        var S = Ai();
        if (!S) {
          var B = typeof _ == "string" ? _ : _.displayName || _.name;
          B && (S = `

Check the top-level render call using <` + B + ">.");
        }
        return S;
      }
    }
    function Sr(_, S) {
      {
        if (!_._store || _._store.validated || _.key != null)
          return;
        _._store.validated = !0;
        var B = ja(S);
        if (hi[B])
          return;
        hi[B] = !0;
        var Z = "";
        _ && _._owner && _._owner !== Tr.current && (Z = " It was passed a child from " + ae(_._owner.type) + "."), vn(_), L('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', B, Z), vn(null);
      }
    }
    function _i(_, S) {
      {
        if (typeof _ != "object")
          return;
        if (Zt(_))
          for (var B = 0; B < _.length; B++) {
            var Z = _[B];
            Yn(Z) && Sr(Z, S);
          }
        else if (Yn(_))
          _._store && (_._store.validated = !0);
        else if (_) {
          var pe = O(_);
          if (typeof pe == "function" && pe !== _.entries)
            for (var he = pe.call(_), de; !(de = he.next()).done; )
              Yn(de.value) && Sr(de.value, S);
        }
      }
    }
    function Ba(_) {
      {
        var S = _.type;
        if (S == null || typeof S == "string")
          return;
        var B;
        if (typeof S == "function")
          B = S.propTypes;
        else if (typeof S == "object" && (S.$$typeof === v || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        S.$$typeof === h))
          B = S.propTypes;
        else
          return;
        if (B) {
          var Z = ae(S);
          kn(B, _.props, "prop", Z, _);
        } else if (S.PropTypes !== void 0 && !Kn) {
          Kn = !0;
          var pe = ae(S);
          L("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", pe || "Unknown");
        }
        typeof S.getDefaultProps == "function" && !S.getDefaultProps.isReactClassApproved && L("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function Da(_) {
      {
        for (var S = Object.keys(_.props), B = 0; B < S.length; B++) {
          var Z = S[B];
          if (Z !== "children" && Z !== "key") {
            vn(_), L("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", Z), vn(null);
            break;
          }
        }
        _.ref !== null && (vn(_), L("Invalid attribute `ref` supplied to `React.Fragment`."), vn(null));
      }
    }
    var Vn = {};
    function yi(_, S, B, Z, pe, he) {
      {
        var de = Se(_);
        if (!de) {
          var oe = "";
          (_ === void 0 || typeof _ == "object" && _ !== null && Object.keys(_).length === 0) && (oe += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var Ye = za();
          Ye ? oe += Ye : oe += Ai();
          var $e;
          _ === null ? $e = "null" : Zt(_) ? $e = "array" : _ !== void 0 && _.$$typeof === r ? ($e = "<" + (ae(_.type) || "Unknown") + " />", oe = " Did you accidentally export a JSX literal instead of a component?") : $e = typeof _, L("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", $e, oe);
        }
        var Pe = $r(_, S, B, pe, he);
        if (Pe == null)
          return Pe;
        if (de) {
          var lt = S.children;
          if (lt !== void 0)
            if (Z)
              if (Zt(lt)) {
                for (var zt = 0; zt < lt.length; zt++)
                  _i(lt[zt], _);
                Object.freeze && Object.freeze(lt);
              } else
                L("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              _i(lt, _);
        }
        if (Rn.call(S, "key")) {
          var Jt = ae(_), je = Object.keys(S).filter(function(Ga) {
            return Ga !== "key";
          }), Pr = je.length > 0 ? "{key: someKey, " + je.join(": ..., ") + ": ...}" : "{key: someKey}";
          if (!Vn[Jt + Pr]) {
            var qa = je.length > 0 ? "{" + je.join(": ..., ") + ": ...}" : "{}";
            L(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, Pr, Jt, qa, Jt), Vn[Jt + Pr] = !0;
          }
        }
        return _ === o ? Da(Pe) : Ba(Pe), Pe;
      }
    }
    function Or(_, S, B) {
      return yi(_, S, B, !0);
    }
    function Wa(_, S, B) {
      return yi(_, S, B, !1);
    }
    var Na = Wa, Ua = Or;
    Xr.Fragment = o, Xr.jsx = Na, Xr.jsxs = Ua;
  })()), Xr;
}
var Lp;
function m3() {
  return Lp || (Lp = 1, process.env.NODE_ENV === "production" ? ca.exports = y3() : ca.exports = b3()), ca.exports;
}
var _g = m3();
const U = _g.jsx, Je = _g.jsxs, w3 = ({
  children: n
}) => /* @__PURE__ */ U("figure", {
  className: te("Figure"),
  children: n
}), C3 = () => {
  const {
    src: n,
    alt: r
  } = Ma(), {
    hoverImage: i,
    unhoverImage: o,
    openProvenance: l,
    closeProvenance: d,
    isOpenProvenance: p
  } = Kt(), g = zn((h) => p ? d(h) : l(h), [l, d, p]), v = zn((h) => dg(h, p ? d : l), [l, d, p]), m = zn((h) => i(h), [i]), y = zn((h) => o(h), [o]);
  return /* @__PURE__ */ U("div", {
    className: te("Image"),
    onClick: g,
    onKeyDown: v,
    onMouseEnter: m,
    onMouseLeave: y,
    tabIndex: 0,
    children: /* @__PURE__ */ U("img", {
      src: n,
      alt: r,
      className: te("ImageImg")
    })
  });
}, x3 = () => {
  const {
    isOpenProvenance: n,
    openProvenance: r,
    closeProvenance: i
  } = Kt(), {
    getText: o
  } = Nn(), l = (d) => n ? i(d) : r(d);
  return /* @__PURE__ */ U("button", {
    "aria-pressed": n,
    className: te("ProvenanceToggle"),
    onClick: l,
    children: o("toggle", "provenance")
  });
}, yg = () => {
  const {
    variant: n,
    isOpenExplainer: r,
    openExplainer: i,
    closeExplainer: o,
    openProvenance: l
  } = Kt(), {
    getText: d
  } = Nn(), p = (g) => {
    r ? o(g) : i(g), n === "modal" && l(g);
  };
  return /* @__PURE__ */ U("button", {
    className: te("ExplainerToggle"),
    "aria-pressed": r,
    onClick: p,
    children: d("toggle", "explain")
  });
}, R3 = ({
  caption: n,
  byline: r
}) => /* @__PURE__ */ U("div", {
  className: te("Cutline"),
  children: /* @__PURE__ */ Je("div", {
    className: te("CutlineToggles"),
    children: [/* @__PURE__ */ U(x3, {}), /* @__PURE__ */ U(yg, {})]
  })
}), k3 = () => {
  const {
    caption: n,
    byline: r
  } = Ma();
  return n || r ? /* @__PURE__ */ U("figcaption", {
    className: te("Caption"),
    children: /* @__PURE__ */ Je("div", {
      className: te("CaptionInner"),
      children: [n, " ", /* @__PURE__ */ U("em", {
        className: te("CaptionByline"),
        children: r
      })]
    })
  }) : null;
};
var E3 = process.env.NODE_ENV === "production";
function I3(n, r) {
  if (!E3) {
    if (n)
      return;
    var i = "Warning: " + r;
    typeof console < "u" && console.warn(i);
    try {
      throw Error(i);
    } catch {
    }
  }
}
/**
  * react-collapsed v4.2.0
  *
  * Copyright (c) 2019-2024, Rogin Farrer
  *
  * This source code is licensed under the MIT license found in the
  * LICENSE.md file in the root directory of this source tree.
  *
  * @license MIT
  */
var $3 = class extends Error {
  constructor(n) {
    super(`react-collapsed: ${n}`);
  }
}, fa = (...n) => I3(n[0], `[react-collapsed] -- ${n[1]}`);
function bg(n) {
  const r = Ft(n);
  return wt(() => {
    r.current = n;
  }), zn((...i) => {
    var o;
    return (o = r.current) == null ? void 0 : o.call(r, ...i);
  }, []);
}
function T3(n, r, i) {
  const [o, l] = ct(r), d = Ft(typeof n < "u"), p = d.current ? n : o, g = bg(i), v = zn(
    (m) => {
      const h = typeof m == "function" ? m(p) : m;
      d.current || l(h), g == null || g(h);
    },
    [g, p]
  );
  return wt(() => {
    fa(
      !(d.current && n == null),
      "`isExpanded` state is changing from controlled to uncontrolled. useCollapse should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled collapse for the lifetime of the component. Check the `isExpanded` prop."
    ), fa(
      !(!d.current && n != null),
      "`isExpanded` state is changing from uncontrolled to controlled. useCollapse should not switch from uncontrolled to controlled (or vice versa). Decide between using a controlled or uncontrolled collapse for the lifetime of the component. Check the `isExpanded` prop."
    );
  }, [n]), [p, v];
}
var S3 = "(prefers-reduced-motion: reduce)";
function O3() {
  const [n, r] = ct(!1);
  return wt(() => {
    if (typeof window > "u" || typeof window.matchMedia != "function")
      return;
    const i = window.matchMedia(S3);
    r(i.matches);
    const o = (l) => {
      r(l.matches);
    };
    if (i.addEventListener)
      return i.addEventListener("change", o), () => {
        i.removeEventListener("change", o);
      };
    if (i.addListener)
      return i.addListener(o), () => {
        i.removeListener(o);
      };
  }, []), n;
}
var P3 = ri.useId || (() => {
});
function F3() {
  return P3() ?? "";
}
var M3 = typeof window < "u" ? ri.useLayoutEffect : ri.useEffect, ac = !1, L3 = 0, zp = () => ++L3;
function z3(n) {
  const r = n || (ac ? zp() : null), [i, o] = ri.useState(r);
  return M3(() => {
    i === null && o(zp());
  }, []), ri.useEffect(() => {
    ac === !1 && (ac = !0);
  }, []), i != null ? String(i) : void 0;
}
function j3(n) {
  const r = F3(), i = z3(n);
  return typeof n == "string" ? n : typeof r == "string" ? r : i;
}
function B3(n, r) {
  const i = performance.now(), o = {};
  function l() {
    o.id = requestAnimationFrame((d) => {
      d - i > r ? n() : l();
    });
  }
  return l(), o;
}
function jp(n) {
  n.id && cancelAnimationFrame(n.id);
}
function Bp(n) {
  return n != null && n.current ? n.current.scrollHeight : (fa(
    !0,
    "Was not able to find a ref to the collapse element via `getCollapseProps`. Ensure that the element exposes its `ref` prop. If it exposes the ref prop under a different name (like `innerRef`), use the `refKey` property to change it. Example:\n\nconst collapseProps = getCollapseProps({refKey: 'innerRef'})"
  ), 0);
}
function D3(n) {
  if (!n || typeof n == "string")
    return 0;
  const r = n / 36;
  return Math.round((4 + 15 * r ** 0.25 + r / 5) * 10);
}
function W3(n, r) {
  if (n != null)
    if (typeof n == "function")
      n(r);
    else
      try {
        n.current = r;
      } catch {
        throw new $3(`Cannot assign value "${r}" to ref "${n}"`);
      }
}
function Dp(...n) {
  return n.every((r) => r == null) ? null : (r) => {
    n.forEach((i) => {
      W3(i, r);
    });
  };
}
function N3(n) {
  let r = (i) => {
  };
  r = (i) => {
    if (!(i != null && i.current))
      return;
    const { paddingTop: o, paddingBottom: l } = window.getComputedStyle(i.current);
    fa(
      !(o && o !== "0px" || l && l !== "0px"),
      `Padding applied to the collapse element will cause the animation to break and not perform as expected. To fix, apply equivalent padding to the direct descendent of the collapse element. Example:

Before:   <div {...getCollapseProps({style: {padding: 10}})}>{children}</div>

After:   <div {...getCollapseProps()}>
             <div style={{padding: 10}}>
                 {children}
             </div>
          </div>`
    );
  }, wt(() => {
    r(n);
  }, [n]);
}
var U3 = typeof window > "u" ? wt : $w;
function q3({
  duration: n,
  easing: r = "cubic-bezier(0.4, 0, 0.2, 1)",
  onTransitionStateChange: i = () => {
  },
  isExpanded: o,
  defaultExpanded: l = !1,
  hasDisabledAnimation: d,
  id: p,
  ...g
} = {}) {
  const v = bg(i), m = j3(p ? `${p}` : void 0), [y, h] = T3(
    o,
    l
  ), R = Ft(y), [P, $] = ct(!1), M = O3(), O = d ?? M, F = Ft(), L = Ft(), J = Ft(null), [ne, ye] = ct(null);
  N3(J);
  const Ae = `${g.collapsedHeight || 0}px`;
  function ve(ce) {
    if (!J.current)
      return;
    const we = J.current;
    for (const Se in ce) {
      const Ne = ce[Se];
      Ne ? we.style[Se] = Ne : we.style.removeProperty(Se);
    }
  }
  return U3(() => {
    if (!J.current || y === R.current)
      return;
    R.current = y;
    function we(V) {
      return O ? 0 : n ?? D3(V);
    }
    const Se = (V) => `height ${we(V)}ms ${r}`, Ne = (V) => {
      function ae() {
        y ? (ve({
          height: "",
          overflow: "",
          transition: "",
          display: ""
        }), v("expandEnd")) : (ve({ transition: "" }), v("collapseEnd")), $(!1);
      }
      L.current && jp(L.current), L.current = B3(ae, V);
    };
    return $(!0), y ? F.current = requestAnimationFrame(() => {
      v("expandStart"), ve({
        display: "block",
        overflow: "hidden",
        height: Ae
      }), F.current = requestAnimationFrame(() => {
        v("expanding");
        const V = Bp(J);
        Ne(we(V)), J.current && (J.current.style.transition = Se(V), J.current.style.height = `${V}px`);
      });
    }) : F.current = requestAnimationFrame(() => {
      v("collapseStart");
      const V = Bp(J);
      Ne(we(V)), ve({
        transition: Se(V),
        height: `${V}px`
      }), F.current = requestAnimationFrame(() => {
        v("collapsing"), ve({
          height: Ae,
          overflow: "hidden"
        });
      });
    }), () => {
      F.current && cancelAnimationFrame(F.current), L.current && jp(L.current);
    };
  }, [
    y,
    Ae,
    O,
    n,
    r,
    v
  ]), {
    isExpanded: y,
    setExpanded: h,
    getToggleProps(ce) {
      const { disabled: we, onClick: Se, refKey: Ne, ...V } = {
        refKey: "ref",
        onClick() {
        },
        disabled: !1,
        ...ce
      }, ae = ne ? ne.tagName === "BUTTON" : void 0, Ie = ce == null ? void 0 : ce[Ne || "ref"], He = {
        id: `react-collapsed-toggle-${m}`,
        "aria-controls": `react-collapsed-panel-${m}`,
        "aria-expanded": y,
        onClick(Qe) {
          we || (Se == null || Se(Qe), h((dn) => !dn));
        },
        [Ne || "ref"]: Dp(Ie, ye)
      }, Lt = {
        type: "button",
        disabled: we ? !0 : void 0
      }, Ue = {
        "aria-disabled": we ? !0 : void 0,
        role: "button",
        tabIndex: we ? -1 : 0
      };
      return ae === !1 ? { ...He, ...Ue, ...V } : ae === !0 ? { ...He, ...Lt, ...V } : {
        ...He,
        ...Lt,
        ...Ue,
        ...V
      };
    },
    getCollapseProps(ce) {
      const { style: we, refKey: Se } = { refKey: "ref", style: {}, ...ce }, Ne = ce == null ? void 0 : ce[Se || "ref"];
      return {
        id: `react-collapsed-panel-${m}`,
        "aria-hidden": !y,
        "aria-labelledby": `react-collapsed-toggle-${m}`,
        role: "region",
        ...ce,
        [Se || "ref"]: Dp(J, Ne),
        style: {
          boxSizing: "border-box",
          ...!P && !y ? {
            // collapsed and not animating
            display: Ae === "0px" ? "none" : "block",
            height: Ae,
            overflow: "hidden"
          } : {},
          // additional styles passed, e.g. getCollapseProps({style: {}})
          ...we
        }
      };
    }
  };
}
const qc = ({
  open: n = !1,
  children: r
}) => {
  const {
    getCollapseProps: i
  } = q3({
    isExpanded: n,
    defaultExpanded: !1
  }), o = Aa(() => te("Collapse", n ? "Collapse_open" : !1), [n]);
  return /* @__PURE__ */ U("div", {
    ...i(),
    className: o,
    "aria-labelledby": null,
    id: null,
    children: /* @__PURE__ */ U("div", {
      className: te("CollapseInner"),
      children: r
    })
  });
}, mg = () => {
  const {
    getText: n
  } = Nn(), {
    isOpenExplainer: r,
    closeExplainer: i
  } = Kt(), o = i;
  return /* @__PURE__ */ U("div", {
    className: te("Explainer"),
    children: /* @__PURE__ */ U(qc, {
      open: r,
      children: /* @__PURE__ */ Je("div", {
        className: te("ExplainerInner"),
        children: [/* @__PURE__ */ U("button", {
          className: te("ExplainerClose"),
          "aria-pressed": r,
          onClick: o,
          children: n("toggle", "explain", "close")
        }), /* @__PURE__ */ U("div", {
          children: /* @__PURE__ */ U("strong", {
            children: "Consectetur adipiscing elit"
          })
        }), /* @__PURE__ */ U("p", {
          children: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris enim nibh, rhoncus vel enim ac, luctus efficitur risus. Quisque viverra tellus vitae arcu consectetur tincidunt. Ut vel pharetra tellus. Nam posuere suscipit maximus."
        }), /* @__PURE__ */ U("div", {
          children: /* @__PURE__ */ U("strong", {
            children: "Cras sagittis erat"
          })
        }), /* @__PURE__ */ U("p", {
          children: "Suspendisse a neque nulla. Cras sagittis erat sed elit tristique, a efficitur ante malesuada. Quisque dapibus pharetra dictum."
        }), /* @__PURE__ */ Je("div", {
          className: te("ExplainerMore"),
          children: [n("explainer", "methods", "pre"), " ", /* @__PURE__ */ U("a", {
            href: n("explainer", "methods", "url"),
            children: n("explainer", "methods", "link")
          })]
        })]
      })
    })
  });
};
function G3({
  manifest: n,
  toggled: r,
  onToggle: i,
  previewRef: o
}) {
  const {
    locale: l
  } = Nn(), {
    compareImage: d,
    addCompareImage: p,
    removeCompareImage: g,
    updateComparePosition: v
  } = Kt(), m = n == null ? void 0 : n.thumbnail, y = ($) => {
    dg($, i);
  }, h = ($) => {
    v($);
  }, R = ($) => {
    p(m, $);
  }, P = ($) => {
    g($);
  };
  return /* @__PURE__ */ Je("div", {
    ref: o,
    role: "button",
    tabIndex: 0,
    "aria-pressed": r,
    className: te("ManifestPreview"),
    onClick: i,
    onKeyDown: y,
    children: [/* @__PURE__ */ U("div", {
      className: te("ManifestPreviewCell", "ManifestPreviewCell_issuer"),
      children: A3.filter(($) => n[$]).map(($) => n[$]).join(" ")
    }), /* @__PURE__ */ U("div", {
      className: te("ManifestPreviewCell", "ManifestPreviewCell_time"),
      children: /* @__PURE__ */ U("span", {
        children: fg(l, n.timestamp)
      })
    }), /* @__PURE__ */ U("div", {
      className: te("ManifestPreviewCell", "ManifestPreviewCell_thumb", m === d ? "ManifestPreviewCell_thumb_hover" : null),
      onMouseMove: h,
      onMouseEnter: R,
      onMouseLeave: P,
      children: /* @__PURE__ */ U("img", {
        src: m
      })
    })]
  });
}
function H3({
  type: n,
  value: r
}) {
  const {
    locale: i,
    getText: o
  } = Nn(), l = Aa(() => {
    switch (n) {
      case "producer":
        return r.map((d) => d.name).join(", ");
      case "timestamp":
        return fg(i, r);
      case "location":
        return null;
      default:
        return r;
    }
  }, [n, r]);
  return /* @__PURE__ */ Je("li", {
    className: te("ManifestTableRow"),
    children: [/* @__PURE__ */ U("div", {
      className: te("ManifestTableRowLabel"),
      children: o(n)
    }), /* @__PURE__ */ U("div", {
      className: te("ManifestTableRowValue"),
      children: l
    })]
  });
}
function K3({
  manifest: n
}) {
  return /* @__PURE__ */ U("ul", {
    className: te("ManifestTable"),
    children: g3.map((r) => n[r] ? /* @__PURE__ */ U(H3, {
      type: r,
      value: n[r]
    }, r) : null)
  });
}
function Y3({
  manifest: n,
  previewRef: r
}) {
  const [i, o] = ct(!1), {
    isOpenProvenance: l,
    openManifests: d,
    openManifest: p,
    closeManifest: g,
    removeCompareImage: v
  } = Kt(), m = Aa(() => te("Manifest", i ? "Manifest_open" : null), [i]), y = zn((h) => {
    v(), o(!i), i ? g(h, n) : p(h, n);
  }, [i, n, p, g, d]);
  return wt(() => {
    l || o(!1);
  }, [l]), /* @__PURE__ */ U("li", {
    className: m,
    children: /* @__PURE__ */ Je("div", {
      className: te("ManifestRow"),
      children: [/* @__PURE__ */ U(G3, {
        manifest: n,
        toggled: i,
        onToggle: y,
        previewRef: r
      }), /* @__PURE__ */ U(qc, {
        open: i,
        children: /* @__PURE__ */ U("div", {
          className: te("ManifestContent"),
          children: /* @__PURE__ */ U(K3, {
            manifest: n
          })
        })
      })]
    })
  });
}
function wg() {
  const n = Ft(null), r = Ft(null), {
    getText: i
  } = Nn(), {
    src: o,
    manifests: l
  } = Ma(), {
    isOpenProvenance: d
  } = Kt(), p = qL(o);
  return wt(() => {
    var g;
    d && r.current && ((g = r.current) == null || g.focus());
  }, [r, d]), /* @__PURE__ */ Je("div", {
    ref: n,
    className: te("Provenance"),
    children: [/* @__PURE__ */ U("ul", {
      className: te("ProvenanceList"),
      children: l ? l.map((g, v) => /* @__PURE__ */ U(Y3, {
        manifest: g,
        previewRef: v === 0 ? r : null
      }, v)) : null
    }), /* @__PURE__ */ Je("div", {
      className: te("ProvenanceVerify"),
      children: [i("verify", "pre"), " ", /* @__PURE__ */ U("a", {
        href: p,
        target: "_blank",
        children: i("verify", "cc")
      })]
    })]
  });
}
let ai = null, ei = [], pa = null, Ac = null, ti = null, hc = null;
function V3(n, r) {
  ai = n, hc = r, Z3(), xg(!0);
}
function _c() {
  ai && (hc && hc(), typeof document < "u" && document.removeEventListener("keydown", Cg), ti && ti.focus && (ti.focus(), ti = null), ai = null, xg(!1));
}
function Cg(n) {
  if (ai) {
    if (n.key === "Escape")
      return _c();
    if (n.key === "Tab") {
      if (ei.length === 0) {
        n.preventDefault();
        return;
      }
      n.shiftKey ? typeof document < "u" && document.activeElement === pa && (Ac.focus(), n.preventDefault()) : typeof document < "u" && document.activeElement === Ac && (pa.focus(), n.preventDefault());
    }
  }
}
function Z3() {
  typeof document < "u" && (ti = document.activeElement), ei = Array.from(
    ai.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])')
  ).filter((n) => n.tabIndex !== -1), pa = ei[0], Ac = ei[ei.length - 1], pa.focus(), typeof document < "u" && document.addEventListener("keydown", Cg);
}
function xg(n) {
  typeof document < "u" && (document.body.style.overflow = n ? "hidden" : "");
}
const J3 = ({
  open: n = !1,
  title: r,
  description: i,
  onOpenChange: o,
  children: l,
  className: d
}) => {
  const p = Ft(), g = Au(), v = Au(), m = (y) => {
    o(!1, y);
  };
  return wt(() => (n ? V3(p.current, o) : _c(), () => {
    p.current && _c();
  }), [n, p]), /* @__PURE__ */ Je("div", {
    ref: p,
    className: te("Modal", n ? "Modal_open" : null, d),
    children: [/* @__PURE__ */ U("div", {
      className: te("ModalOverlay"),
      onClick: m
    }), /* @__PURE__ */ Je("div", {
      role: "dialog",
      "aria-modal": "true",
      "aria-labelledby": g,
      "aria-describedby": v,
      className: te("ModalContent"),
      children: [/* @__PURE__ */ Je("div", {
        className: te("ModalContentBox"),
        children: [r ? /* @__PURE__ */ Je("hgroup", {
          className: te("ModalContentHeader"),
          children: [r ? /* @__PURE__ */ U("h2", {
            id: g,
            children: r
          }) : null, i ? /* @__PURE__ */ U("p", {
            id: v,
            className: "syw-hidden",
            children: i
          }) : null]
        }) : null, l]
      }), /* @__PURE__ */ U("button", {
        onClick: m,
        className: te("ModalClose")
      })]
    })]
  });
}, X3 = () => {
  const {
    isOpenExplainer: n,
    isOpenProvenance: r,
    openProvenance: i,
    closeProvenance: o,
    closeExplainer: l
  } = Kt();
  return /* @__PURE__ */ Je(J3, {
    open: r,
    title: "Image Origin",
    description: "Explore the provenance of this image",
    onOpenChange: (p, g) => {
      const v = g;
      p ? i(v) : (o(v), l(v));
    },
    className: te("ProvenanceModal"),
    children: [/* @__PURE__ */ Je("div", {
      className: te("ProvenanceModalExplainer"),
      children: [n ? null : /* @__PURE__ */ U(yg, {}), /* @__PURE__ */ U(mg, {})]
    }), /* @__PURE__ */ U(wg, {})]
  });
}, Q3 = () => {
  const {
    compareImage: n,
    comparePosition: r
  } = Kt();
  return /* @__PURE__ */ U("div", {
    className: te("ImageCompare"),
    style: {
      left: `${r == null ? void 0 : r.clientX}px`,
      top: `${r == null ? void 0 : r.clientY}px`
    },
    children: /* @__PURE__ */ U("img", {
      src: n,
      alt: "",
      className: te("ImageCompareImg")
    })
  });
};
function ez({
  onEvent: n
}) {
  const r = Ft(null), {
    src: i,
    setManifests: o
  } = Ma(), {
    locale: l
  } = Nn(), {
    variant: d,
    compareImage: p,
    isHoverImage: g,
    isOpenProvenance: v,
    setElem: m,
    eventHandler: y
  } = Kt(), {
    reader: h,
    provenance: R
  } = _3(i), P = Aa(() => te("App", `App_${d}`, g ? "App_hovered" : !1, v ? "App_active" : !1), [d, g, v]);
  return wt(() => {
    m(r.current);
  }, [r]), wt(() => {
    (async () => {
      var O;
      const M = await Promise.all(Object.values(((O = R == null ? void 0 : R.manifestStore) == null ? void 0 : O.manifests) ?? {}).map((F) => d3({
        src: i,
        locale: l,
        manifest: F,
        reader: h
      })));
      o(M);
    })();
  }, [i, l, R, h]), wt(() => {
    y.current = n;
  }, [y, n]), /* @__PURE__ */ Je("div", {
    ref: r,
    className: P,
    children: [/* @__PURE__ */ Je(w3, {
      children: [/* @__PURE__ */ U(C3, {}), d === "expand" ? /* @__PURE__ */ U(mg, {}) : null, /* @__PURE__ */ U(R3, {}), /* @__PURE__ */ U(k3, {})]
    }), d === "expand" ? /* @__PURE__ */ U(qc, {
      open: v,
      className: te("ProvenanceModal"),
      children: /* @__PURE__ */ U(wg, {})
    }) : null, d === "modal" ? /* @__PURE__ */ U(X3, {}) : null, p ? /* @__PURE__ */ U(Q3, {}) : null]
  });
}
function oz({
  locale: n,
  src: r,
  alt: i,
  caption: o,
  byline: l,
  variant: d,
  ...p
}) {
  return /* @__PURE__ */ U(f3, {
    children: /* @__PURE__ */ U(v3, {
      locale: n,
      children: /* @__PURE__ */ U(p3, {
        src: r,
        alt: i,
        caption: o,
        byline: l,
        children: /* @__PURE__ */ U(h3, {
          variant: d,
          children: /* @__PURE__ */ U(ez, {
            ...p
          })
        })
      })
    })
  });
}
export {
  oz as default
};
