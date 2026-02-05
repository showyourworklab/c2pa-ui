import * as ai from "react";
import fr, { createContext as ha, useContext as _a, useState as ct, useEffect as wt, useRef as Mt, useCallback as jn, useLayoutEffect as Bw, useMemo as ya, useId as Cu } from "react";
const Xp = Symbol("transfer");
function Dw(n, r) {
  return {
    type: Xp,
    value: n,
    transfer: r ? Array.isArray(r) ? r : [r] : [n]
  };
}
function xu(n) {
  return !!(n && typeof n == "object" && Reflect.get(n, "type") === Xp);
}
function Qp(n = "default") {
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
              const g = Ww(), v = [], m = [];
              return p.forEach((y) => {
                xu(y) ? (v.push(y.value), m.push(...y.transfer)) : v.push(y);
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
          xu(m) ? o.postMessage(
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
function Ww() {
  return new Array(4).fill(0).map(() => Math.floor(Math.random() * Number.MAX_SAFE_INTEGER).toString(16)).join("-");
}
const ca = (n) => {
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
    ["__proto__", "constructor", "prototype"].includes(o) || (Array.isArray(r[o]) && Array.isArray(i[o]) ? r[o] = Pt.options.mergeArrays ? Pt.options.uniqueArrayItems ? Array.from(new Set(r[o].concat(i[o]))) : [...r[o], ...i[o]] : i[o] : ca(r[o]) && ca(i[o]) ? r[o] = Pt(r[o], i[o]) : !ca(r[o]) && ca(i[o]) ? r[o] = Pt(i[o], void 0) : r[o] = i[o] === void 0 ? Pt.options.allowUndefinedOverrides ? i[o] : r[o] : i[o]);
  }), r;
}, {}), pc = {
  allowUndefinedOverrides: !0,
  mergeArrays: !0,
  uniqueArrayItems: !0
};
Pt.options = pc;
Pt.withOptions = (n, ...r) => {
  Pt.options = Object.assign(Object.assign({}, pc), n);
  const i = Pt(...r);
  return Pt.options = pc, i;
};
const { createTx: Nw } = Qp(), { rx: Uw } = Qp("worker"), ev = '(function(){"use strict";let o;function S(n){const e=o.__externref_table_alloc();return o.__wbindgen_externrefs.set(e,n),e}const O=typeof FinalizationRegistry>"u"?{register:()=>{},unregister:()=>{}}:new FinalizationRegistry(n=>n.dtor(n.a,n.b));function j(n){const e=typeof n;if(e=="number"||e=="boolean"||n==null)return`${n}`;if(e=="string")return`"${n}"`;if(e=="symbol"){const _=n.description;return _==null?"Symbol":`Symbol(${_})`}if(e=="function"){const _=n.name;return typeof _=="string"&&_.length>0?`Function(${_})`:"Function"}if(Array.isArray(n)){const _=n.length;let c="[";_>0&&(c+=j(n[0]));for(let i=1;i<_;i++)c+=", "+j(n[i]);return c+="]",c}const t=/\\[object ([^\\]]+)\\]/.exec(toString.call(n));let r;if(t&&t.length>1)r=t[1];else return toString.call(n);if(r=="Object")try{return"Object("+JSON.stringify(n)+")"}catch{return"Object"}return n instanceof Error?`${n.name}: ${n.message}\n${n.stack}`:r}function v(n,e){return n=n>>>0,R().subarray(n/1,n/1+e)}let A=null;function m(){return(A===null||A.buffer.detached===!0||A.buffer.detached===void 0&&A.buffer!==o.memory.buffer)&&(A=new DataView(o.memory.buffer)),A}function y(n,e){return n=n>>>0,V(n,e)}let M=null;function R(){return(M===null||M.byteLength===0)&&(M=new Uint8Array(o.memory.buffer)),M}function d(n,e){try{return n.apply(this,e)}catch(t){const r=S(t);o.__wbindgen_exn_store(r)}}function w(n){return n==null}function N(n,e,t,r){const _={a:n,b:e,cnt:1,dtor:t},c=(...i)=>{_.cnt++;const s=_.a;_.a=0;try{return r(s,_.b,...i)}finally{_.a=s,c._wbg_cb_unref()}};return c._wbg_cb_unref=()=>{--_.cnt===0&&(_.dtor(_.a,_.b),_.a=0,O.unregister(_))},O.register(c,_,_),c}function u(n,e,t){if(t===void 0){const s=T.encode(n),b=e(s.length,1)>>>0;return R().subarray(b,b+s.length).set(s),a=s.length,b}let r=n.length,_=e(r,1)>>>0;const c=R();let i=0;for(;i<r;i++){const s=n.charCodeAt(i);if(s>127)break;c[_+i]=s}if(i!==r){i!==0&&(n=n.slice(i)),_=t(_,r,r=i+n.length*3,1)>>>0;const s=R().subarray(_+i,_+r),b=T.encodeInto(n,s);i+=b.written,_=t(_,r,i,1)>>>0}return a=i,_}function f(n){const e=o.__wbindgen_externrefs.get(n);return o.__externref_table_dealloc(n),e}let E=new TextDecoder("utf-8",{ignoreBOM:!0,fatal:!0});E.decode();const C=2146435072;let x=0;function V(n,e){return x+=e,x>=C&&(E=new TextDecoder("utf-8",{ignoreBOM:!0,fatal:!0}),E.decode(),x=e),E.decode(R().subarray(n,n+e))}const T=new TextEncoder;"encodeInto"in T||(T.encodeInto=function(n,e){const t=T.encode(n);return e.set(t),{read:n.length,written:t.length}});let a=0;function G(n,e,t){o.wasm_bindgen__convert__closures_____invoke__hfa979f81ae70afaa(n,e,t)}function P(n,e){o.wasm_bindgen__convert__closures_____invoke__h6743aa07e10cb0d4(n,e)}function $(n,e,t,r){o.wasm_bindgen__convert__closures_____invoke__h536d005b97d28fdb(n,e,t,r)}const J=["default","no-store","reload","no-cache","force-cache","only-if-cached"],H=["omit","same-origin","include"],X=["same-origin","no-cors","cors","navigate"],k=typeof FinalizationRegistry>"u"?{register:()=>{},unregister:()=>{}}:new FinalizationRegistry(n=>o.__wbg_wasmbuilder_free(n>>>0,1)),z=typeof FinalizationRegistry>"u"?{register:()=>{},unregister:()=>{}}:new FinalizationRegistry(n=>o.__wbg_wasmreader_free(n>>>0,1));typeof FinalizationRegistry>"u"||new FinalizationRegistry(n=>o.__wbg_wasmsigner_free(n>>>0,1));class h{static __wrap(e){e=e>>>0;const t=Object.create(h.prototype);return t.__wbg_ptr=e,k.register(t,t.__wbg_ptr,t),t}__destroy_into_raw(){const e=this.__wbg_ptr;return this.__wbg_ptr=0,k.unregister(this),e}free(){const e=this.__destroy_into_raw();o.__wbg_wasmbuilder_free(e,0)}addAction(e){const t=o.wasmbuilder_addAction(this.__wbg_ptr,e);if(t[1])throw f(t[0])}setIntent(e){const t=o.wasmbuilder_setIntent(this.__wbg_ptr,e);if(t[1])throw f(t[0])}toArchive(){const e=o.wasmbuilder_toArchive(this.__wbg_ptr);if(e[2])throw f(e[1]);return f(e[0])}static fromArchive(e,t){var r=w(t)?0:u(t,o.__wbindgen_malloc,o.__wbindgen_realloc),_=a;const c=o.wasmbuilder_fromArchive(e,r,_);if(c[2])throw f(c[1]);return h.__wrap(c[0])}setNoEmbed(e){o.wasmbuilder_setNoEmbed(this.__wbg_ptr,e)}addIngredient(e){const t=u(e,o.__wbindgen_malloc,o.__wbindgen_realloc),r=a,_=o.wasmbuilder_addIngredient(this.__wbg_ptr,t,r);if(_[1])throw f(_[0])}getDefinition(){const e=o.wasmbuilder_getDefinition(this.__wbg_ptr);if(e[2])throw f(e[1]);return f(e[0])}setRemoteUrl(e){const t=u(e,o.__wbindgen_malloc,o.__wbindgen_realloc),r=a;o.wasmbuilder_setRemoteUrl(this.__wbg_ptr,t,r)}addResourceFromBlob(e,t){const r=u(e,o.__wbindgen_malloc,o.__wbindgen_realloc),_=a,c=o.wasmbuilder_addResourceFromBlob(this.__wbg_ptr,r,_,t);if(c[1])throw f(c[0])}setThumbnailFromBlob(e,t){const r=u(e,o.__wbindgen_malloc,o.__wbindgen_realloc),_=a,c=o.wasmbuilder_setThumbnailFromBlob(this.__wbg_ptr,r,_,t);if(c[1])throw f(c[0])}addIngredientFromBlob(e,t,r){const _=u(e,o.__wbindgen_malloc,o.__wbindgen_realloc),c=a,i=u(t,o.__wbindgen_malloc,o.__wbindgen_realloc),s=a,b=o.wasmbuilder_addIngredientFromBlob(this.__wbg_ptr,_,c,i,s,r);if(b[1])throw f(b[0])}signAndGetManifestBytes(e,t,r){const _=u(t,o.__wbindgen_malloc,o.__wbindgen_realloc),c=a;return o.wasmbuilder_signAndGetManifestBytes(this.__wbg_ptr,e,_,c,r)}static new(e){var t=w(e)?0:u(e,o.__wbindgen_malloc,o.__wbindgen_realloc),r=a;const _=o.wasmbuilder_new(t,r);if(_[2])throw f(_[1]);return h.__wrap(_[0])}sign(e,t,r){const _=u(t,o.__wbindgen_malloc,o.__wbindgen_realloc),c=a;return o.wasmbuilder_sign(this.__wbg_ptr,e,_,c,r)}static fromJson(e,t){const r=u(e,o.__wbindgen_malloc,o.__wbindgen_realloc),_=a;var c=w(t)?0:u(t,o.__wbindgen_malloc,o.__wbindgen_realloc),i=a;const s=o.wasmbuilder_fromJson(r,_,c,i);if(s[2])throw f(s[1]);return h.__wrap(s[0])}}Symbol.dispose&&(h.prototype[Symbol.dispose]=h.prototype.free);class I{static __wrap(e){e=e>>>0;const t=Object.create(I.prototype);return t.__wbg_ptr=e,z.register(t,t.__wbg_ptr,t),t}__destroy_into_raw(){const e=this.__wbg_ptr;return this.__wbg_ptr=0,z.unregister(this),e}free(){const e=this.__destroy_into_raw();o.__wbg_wasmreader_free(e,0)}activeLabel(){const e=o.wasmreader_activeLabel(this.__wbg_ptr);let t;return e[0]!==0&&(t=y(e[0],e[1]).slice(),o.__wbindgen_free(e[0],e[1]*1,1)),t}manifestStore(){const e=o.wasmreader_manifestStore(this.__wbg_ptr);if(e[2])throw f(e[1]);return f(e[0])}activeManifest(){const e=o.wasmreader_activeManifest(this.__wbg_ptr);if(e[2])throw f(e[1]);return f(e[0])}resourceToBytes(e){const t=u(e,o.__wbindgen_malloc,o.__wbindgen_realloc),r=a,_=o.wasmreader_resourceToBytes(this.__wbg_ptr,t,r);if(_[2])throw f(_[1]);return f(_[0])}static fromBlobFragment(e,t,r,_){const c=u(e,o.__wbindgen_malloc,o.__wbindgen_realloc),i=a;var s=w(_)?0:u(_,o.__wbindgen_malloc,o.__wbindgen_realloc),b=a;return o.wasmreader_fromBlobFragment(c,i,t,r,s,b)}json(){let e,t;try{const r=o.wasmreader_json(this.__wbg_ptr);return e=r[0],t=r[1],y(r[0],r[1])}finally{o.__wbindgen_free(e,t,1)}}static fromBlob(e,t,r){const _=u(e,o.__wbindgen_malloc,o.__wbindgen_realloc),c=a;var i=w(r)?0:u(r,o.__wbindgen_malloc,o.__wbindgen_realloc),s=a;return o.wasmreader_fromBlob(_,c,t,i,s)}}Symbol.dispose&&(I.prototype[Symbol.dispose]=I.prototype.free);function Y(n){const e=u(n,o.__wbindgen_malloc,o.__wbindgen_realloc),t=a,r=o.loadSettings(e,t);if(r[1])throw f(r[0])}function K(){const n={};return n.wbg={},n.wbg.__wbg_Error_52673b7de5a0ca89=function(e,t){return Error(y(e,t))},n.wbg.__wbg_Number_2d1dcfcf4ec51736=function(e){return Number(e)},n.wbg.__wbg___wbindgen_bigint_get_as_i64_6e32f5e6aff02e1d=function(e,t){const r=t,_=typeof r=="bigint"?r:void 0;m().setBigInt64(e+8,w(_)?BigInt(0):_,!0),m().setInt32(e+0,!w(_),!0)},n.wbg.__wbg___wbindgen_boolean_get_dea25b33882b895b=function(e){const t=e,r=typeof t=="boolean"?t:void 0;return w(r)?16777215:r?1:0},n.wbg.__wbg___wbindgen_debug_string_adfb662ae34724b6=function(e,t){const r=j(t),_=u(r,o.__wbindgen_malloc,o.__wbindgen_realloc),c=a;m().setInt32(e+4,c,!0),m().setInt32(e+0,_,!0)},n.wbg.__wbg___wbindgen_in_0d3e1e8f0c669317=function(e,t){return e in t},n.wbg.__wbg___wbindgen_is_bigint_0e1a2e3f55cfae27=function(e){return typeof e=="bigint"},n.wbg.__wbg___wbindgen_is_function_8d400b8b1af978cd=function(e){return typeof e=="function"},n.wbg.__wbg___wbindgen_is_object_ce774f3490692386=function(e){const t=e;return typeof t=="object"&&t!==null},n.wbg.__wbg___wbindgen_is_string_704ef9c8fc131030=function(e){return typeof e=="string"},n.wbg.__wbg___wbindgen_is_undefined_f6b95eab589e0269=function(e){return e===void 0},n.wbg.__wbg___wbindgen_jsval_eq_b6101cc9cef1fe36=function(e,t){return e===t},n.wbg.__wbg___wbindgen_jsval_loose_eq_766057600fdd1b0d=function(e,t){return e==t},n.wbg.__wbg___wbindgen_number_get_9619185a74197f95=function(e,t){const r=t,_=typeof r=="number"?r:void 0;m().setFloat64(e+8,w(_)?0:_,!0),m().setInt32(e+0,!w(_),!0)},n.wbg.__wbg___wbindgen_string_get_a2a31e16edf96e42=function(e,t){const r=t,_=typeof r=="string"?r:void 0;var c=w(_)?0:u(_,o.__wbindgen_malloc,o.__wbindgen_realloc),i=a;m().setInt32(e+4,i,!0),m().setInt32(e+0,c,!0)},n.wbg.__wbg___wbindgen_throw_dd24417ed36fc46e=function(e,t){throw new Error(y(e,t))},n.wbg.__wbg__wbg_cb_unref_87dfb5aaa0cbcea7=function(e){e._wbg_cb_unref()},n.wbg.__wbg_abort_07646c894ebbf2bd=function(e){e.abort()},n.wbg.__wbg_abort_399ecbcfd6ef3c8e=function(e,t){e.abort(t)},n.wbg.__wbg_append_c5cbdf46455cc776=function(){return d(function(e,t,r,_,c){e.append(y(t,r),y(_,c))},arguments)},n.wbg.__wbg_arrayBuffer_c04af4fce566092d=function(){return d(function(e){return e.arrayBuffer()},arguments)},n.wbg.__wbg_byteLength_faa9938885bdeee6=function(e){return e.byteLength},n.wbg.__wbg_call_3020136f7a2d6e44=function(){return d(function(e,t,r){return e.call(t,r)},arguments)},n.wbg.__wbg_call_abb4ff46ce38be40=function(){return d(function(e,t){return e.call(t)},arguments)},n.wbg.__wbg_clearTimeout_7a42b49784aea641=function(e){return clearTimeout(e)},n.wbg.__wbg_crypto_574e78ad8b13b65f=function(e){return e.crypto},n.wbg.__wbg_done_62ea16af4ce34b24=function(e){return e.done},n.wbg.__wbg_entries_83c79938054e065f=function(e){return Object.entries(e)},n.wbg.__wbg_error_7534b8e9a36f1ab4=function(e,t){let r,_;try{r=e,_=t,console.error(y(e,t))}finally{o.__wbindgen_free(r,_,1)}},n.wbg.__wbg_fetch_74a3e84ebd2c9a0e=function(e){return fetch(e)},n.wbg.__wbg_fetch_90447c28cc0b095e=function(e,t){return e.fetch(t)},n.wbg.__wbg_from_29a8414a7a7cd19d=function(e){return Array.from(e)},n.wbg.__wbg_getRandomValues_1c61fac11405ffdc=function(){return d(function(e,t){globalThis.crypto.getRandomValues(v(e,t))},arguments)},n.wbg.__wbg_getRandomValues_38a1ff1ea09f6cc7=function(){return d(function(e,t){globalThis.crypto.getRandomValues(v(e,t))},arguments)},n.wbg.__wbg_getRandomValues_b8f5dbd5f3995a9e=function(){return d(function(e,t){e.getRandomValues(t)},arguments)},n.wbg.__wbg_getTime_ad1e9878a735af08=function(e){return e.getTime()},n.wbg.__wbg_get_6b7bd52aca3f9671=function(e,t){return e[t>>>0]},n.wbg.__wbg_get_af9dab7e9603ea93=function(){return d(function(e,t){return Reflect.get(e,t)},arguments)},n.wbg.__wbg_get_with_ref_key_1dc361bd10053bfe=function(e,t){return e[t]},n.wbg.__wbg_has_0e670569d65d3a45=function(){return d(function(e,t){return Reflect.has(e,t)},arguments)},n.wbg.__wbg_headers_654c30e1bcccc552=function(e){return e.headers},n.wbg.__wbg_instanceof_ArrayBuffer_f3320d2419cd0355=function(e){let t;try{t=e instanceof ArrayBuffer}catch{t=!1}return t},n.wbg.__wbg_instanceof_Map_084be8da74364158=function(e){let t;try{t=e instanceof Map}catch{t=!1}return t},n.wbg.__wbg_instanceof_Promise_eca6c43a2610558d=function(e){let t;try{t=e instanceof Promise}catch{t=!1}return t},n.wbg.__wbg_instanceof_Response_cd74d1c2ac92cb0b=function(e){let t;try{t=e instanceof Response}catch{t=!1}return t},n.wbg.__wbg_instanceof_Uint8Array_da54ccc9d3e09434=function(e){let t;try{t=e instanceof Uint8Array}catch{t=!1}return t},n.wbg.__wbg_isArray_51fd9e6422c0a395=function(e){return Array.isArray(e)},n.wbg.__wbg_isSafeInteger_ae7d3f054d55fa16=function(e){return Number.isSafeInteger(e)},n.wbg.__wbg_iterator_27b7c8b35ab3e86b=function(){return Symbol.iterator},n.wbg.__wbg_length_22ac23eaec9d8053=function(e){return e.length},n.wbg.__wbg_length_d45040a40c570362=function(e){return e.length},n.wbg.__wbg_msCrypto_a61aeb35a24c1329=function(e){return e.msCrypto},n.wbg.__wbg_new_0_23cedd11d9b40c9d=function(){return new Date},n.wbg.__wbg_new_1ba21ce319a06297=function(){return new Object},n.wbg.__wbg_new_25f239778d6112b9=function(){return new Array},n.wbg.__wbg_new_3c79b3bb1b32b7d3=function(){return d(function(){return new Headers},arguments)},n.wbg.__wbg_new_6421f6084cc5bc5a=function(e){return new Uint8Array(e)},n.wbg.__wbg_new_881a222c65f168fc=function(){return d(function(){return new AbortController},arguments)},n.wbg.__wbg_new_8a6f238a6ece86ea=function(){return new Error},n.wbg.__wbg_new_b546ae120718850e=function(){return new Map},n.wbg.__wbg_new_bd4ee84941f474fa=function(){return d(function(){return new FileReaderSync},arguments)},n.wbg.__wbg_new_df1173567d5ff028=function(e,t){return new Error(y(e,t))},n.wbg.__wbg_new_ff12d2b041fb48f1=function(e,t){try{var r={a:e,b:t},_=(i,s)=>{const b=r.a;r.a=0;try{return $(b,r.b,i,s)}finally{r.a=b}};return new Promise(_)}finally{r.a=r.b=0}},n.wbg.__wbg_new_from_slice_f9c22b9153b26992=function(e,t){return new Uint8Array(v(e,t))},n.wbg.__wbg_new_no_args_cb138f77cf6151ee=function(e,t){return new Function(y(e,t))},n.wbg.__wbg_new_with_length_aa5eaf41d35235e5=function(e){return new Uint8Array(e>>>0)},n.wbg.__wbg_new_with_str_and_init_c5748f76f5108934=function(){return d(function(e,t,r){return new Request(y(e,t),r)},arguments)},n.wbg.__wbg_next_138a17bbf04e926c=function(e){return e.next},n.wbg.__wbg_next_3cfe5c0fe2a4cc53=function(){return d(function(e){return e.next()},arguments)},n.wbg.__wbg_node_905d3e251edff8a2=function(e){return e.node},n.wbg.__wbg_now_69d776cd24f5215b=function(){return Date.now()},n.wbg.__wbg_process_dc0fbacc7c1c06f7=function(e){return e.process},n.wbg.__wbg_prototypesetcall_dfe9b766cdc1f1fd=function(e,t,r){Uint8Array.prototype.set.call(v(e,t),r)},n.wbg.__wbg_queueMicrotask_9b549dfce8865860=function(e){return e.queueMicrotask},n.wbg.__wbg_queueMicrotask_fca69f5bfad613a5=function(e){queueMicrotask(e)},n.wbg.__wbg_randomFillSync_ac0988aba3254290=function(){return d(function(e,t){e.randomFillSync(t)},arguments)},n.wbg.__wbg_readAsArrayBuffer_5a7ad12aa99daa2f=function(){return d(function(e,t){return e.readAsArrayBuffer(t)},arguments)},n.wbg.__wbg_require_60cc747a6bc5215a=function(){return d(function(){return module.require},arguments)},n.wbg.__wbg_resolve_fd5bfbaa4ce36e1e=function(e){return Promise.resolve(e)},n.wbg.__wbg_setTimeout_7bb3429662ab1e70=function(e,t){return setTimeout(e,t)},n.wbg.__wbg_set_169e13b608078b7b=function(e,t,r){e.set(v(t,r))},n.wbg.__wbg_set_3f1d0b984ed272ed=function(e,t,r){e[t]=r},n.wbg.__wbg_set_7df433eea03a5c14=function(e,t,r){e[t>>>0]=r},n.wbg.__wbg_set_body_8e743242d6076a4f=function(e,t){e.body=t},n.wbg.__wbg_set_cache_0e437c7c8e838b9b=function(e,t){e.cache=J[t]},n.wbg.__wbg_set_credentials_55ae7c3c106fd5be=function(e,t){e.credentials=H[t]},n.wbg.__wbg_set_efaaf145b9377369=function(e,t,r){return e.set(t,r)},n.wbg.__wbg_set_headers_5671cf088e114d2b=function(e,t){e.headers=t},n.wbg.__wbg_set_method_76c69e41b3570627=function(e,t,r){e.method=y(t,r)},n.wbg.__wbg_set_mode_611016a6818fc690=function(e,t){e.mode=X[t]},n.wbg.__wbg_set_signal_e89be862d0091009=function(e,t){e.signal=t},n.wbg.__wbg_signal_3c14fbdc89694b39=function(e){return e.signal},n.wbg.__wbg_size_82fbdb656de23326=function(e){return e.size},n.wbg.__wbg_slice_3518c924243cda3a=function(){return d(function(e,t,r){return e.slice(t,r)},arguments)},n.wbg.__wbg_stack_0ed75d68575b0f3c=function(e,t){const r=t.stack,_=u(r,o.__wbindgen_malloc,o.__wbindgen_realloc),c=a;m().setInt32(e+4,c,!0),m().setInt32(e+0,_,!0)},n.wbg.__wbg_static_accessor_GLOBAL_769e6b65d6557335=function(){const e=typeof global>"u"?null:global;return w(e)?0:S(e)},n.wbg.__wbg_static_accessor_GLOBAL_THIS_60cf02db4de8e1c1=function(){const e=typeof globalThis>"u"?null:globalThis;return w(e)?0:S(e)},n.wbg.__wbg_static_accessor_SELF_08f5a74c69739274=function(){const e=typeof self>"u"?null:self;return w(e)?0:S(e)},n.wbg.__wbg_static_accessor_WINDOW_a8924b26aa92d024=function(){const e=typeof window>"u"?null:window;return w(e)?0:S(e)},n.wbg.__wbg_status_9bfc680efca4bdfd=function(e){return e.status},n.wbg.__wbg_stringify_655a6390e1f5eb6b=function(){return d(function(e){return JSON.stringify(e)},arguments)},n.wbg.__wbg_subarray_845f2f5bce7d061a=function(e,t,r){return e.subarray(t>>>0,r>>>0)},n.wbg.__wbg_then_429f7caf1026411d=function(e,t,r){return e.then(t,r)},n.wbg.__wbg_then_4f95312d68691235=function(e,t){return e.then(t)},n.wbg.__wbg_url_b6d11838a4f95198=function(e,t){const r=t.url,_=u(r,o.__wbindgen_malloc,o.__wbindgen_realloc),c=a;m().setInt32(e+4,c,!0),m().setInt32(e+0,_,!0)},n.wbg.__wbg_valueOf_17c63ed1b225597a=function(e){return e.valueOf()},n.wbg.__wbg_value_57b7b035e117f7ee=function(e){return e.value},n.wbg.__wbg_versions_c01dfd4722a88165=function(e){return e.versions},n.wbg.__wbg_wasmreader_new=function(e){return I.__wrap(e)},n.wbg.__wbindgen_cast_0bcf4d5a20a2764c=function(e,t){return N(e,t,o.wasm_bindgen__closure__destroy__h9cd45bdf09c25ec5,P)},n.wbg.__wbindgen_cast_2241b6af4c4b2941=function(e,t){return y(e,t)},n.wbg.__wbindgen_cast_2ddd8a25ff58642a=function(e,t){return BigInt.asUintN(64,e)|t<<BigInt(64)},n.wbg.__wbindgen_cast_4625c577ab2ec9ee=function(e){return BigInt.asUintN(64,e)},n.wbg.__wbindgen_cast_77bc3e92745e9a35=function(e,t){var r=v(e,t).slice();return o.__wbindgen_free(e,t*1,1),r},n.wbg.__wbindgen_cast_815cc8b6fd6cc840=function(e,t){return N(e,t,o.wasm_bindgen__closure__destroy__h628fe959fcf32094,G)},n.wbg.__wbindgen_cast_9ae0607507abb057=function(e){return e},n.wbg.__wbindgen_cast_cb9088102bce6b30=function(e,t){return v(e,t)},n.wbg.__wbindgen_cast_d6cd19b81560fd6e=function(e){return e},n.wbg.__wbindgen_init_externref_table=function(){const e=o.__wbindgen_externrefs,t=e.grow(4);e.set(0,void 0),e.set(t+0,void 0),e.set(t+1,null),e.set(t+2,!0),e.set(t+3,!1)},n}function Q(n,e){return o=n.exports,A=null,M=null,o.__wbindgen_start(),o}function Z(n){if(o!==void 0)return o;typeof n<"u"&&(Object.getPrototypeOf(n)===Object.prototype?{module:n}=n:console.warn("using deprecated parameters for `initSync()`; pass a single object instead"));const e=K();n instanceof WebAssembly.Module||(n=new WebAssembly.Module(n));const t=new WebAssembly.Instance(n,e);return Q(t)}function D(){let n=0;const e=new Map;return{add(t){const r=n++;return e.set(r,t),r},get(t){const r=e.get(t);if(!r)throw new Error("Attempted to use an object that has been freed");return r},remove(t){return e.delete(t)}}}const L=Symbol("transfer");function F(n,e){return{type:L,value:n,transfer:e?Array.isArray(e)?e:[e]:[n]}}function U(n){return!!(n&&typeof n=="object"&&Reflect.get(n,"type")===L)}function q(n="default"){return{createTx(e){const t=new Map,r=e??self;return r.addEventListener("message",_=>{const{data:c}=_;if(c.channelName!==n)return;const{id:i,result:s,error:b}=c,l=t.get(i);l&&(b?l.reject(b):l.resolve(s),t.delete(i))}),new Proxy({},{get(_,c){return(...i)=>{const s=ee(),b=[],l=[];return i.forEach(B=>{U(B)?(b.push(B.value),l.push(...B.transfer)):b.push(B)}),r.postMessage({method:c,args:b,id:s,channelName:n},{transfer:l}),new Promise((B,re)=>{t.set(s,{resolve:B,reject:re})})}}})},rx(e,t){const r=t??self;r.addEventListener("message",async _=>{const{data:c}=_;if(c.channelName!==n)return;const{method:i,args:s,id:b}=c;try{const l=await e[i](...s);U(l)?r.postMessage({result:l.value,id:b,channelName:n},{transfer:l.transfer}):r.postMessage({result:l,id:b,channelName:n})}catch(l){r.postMessage({error:l,id:b,channelName:n})}})}}}function ee(){return new Array(4).fill(0).map(()=>Math.floor(Math.random()*Number.MAX_SAFE_INTEGER).toString(16)).join("-")}const{rx:te}=q(),{createTx:ne}=q("worker"),p=D(),g=D(),W=ne();te({async initWorker(n,e){Z({module:n}),e&&Y(e)},async reader_fromBlob(n,e,t){const r=await I.fromBlob(n,e,t);return p.add(r)},async reader_fromBlobFragment(n,e,t,r){const _=await I.fromBlobFragment(n,e,t,r);return p.add(_)},reader_activeLabel(n){return p.get(n).activeLabel()??null},reader_manifestStore(n){return p.get(n).manifestStore()},reader_activeManifest(n){return p.get(n).activeManifest()},reader_json(n){return p.get(n).json()},reader_resourceToBytes(n,e){const r=p.get(n).resourceToBytes(e);return F(r,r.buffer)},reader_free(n){p.get(n).free(),p.remove(n)},builder_new(n){const e=h.new(n);return g.add(e)},builder_fromJson(n,e){const t=h.fromJson(n,e);return g.add(t)},builder_fromArchive(n,e){const t=h.fromArchive(n,e);return g.add(t)},builder_setIntent(n,e){g.get(n).setIntent(e)},builder_addAction(n,e){g.get(n).addAction(e)},builder_setRemoteUrl(n,e){g.get(n).setRemoteUrl(e)},builder_setNoEmbed(n,e){g.get(n).setNoEmbed(e)},builder_setThumbnailFromBlob(n,e,t){g.get(n).setThumbnailFromBlob(e,t)},builder_addIngredient(n,e){g.get(n).addIngredient(e)},builder_addIngredientFromBlob(n,e,t,r){g.get(n).addIngredientFromBlob(e,t,r)},builder_addResourceFromBlob(n,e,t){g.get(n).addResourceFromBlob(e,t)},builder_getDefinition(n){return g.get(n).getDefinition()},builder_toArchive(n){const t=g.get(n).toArchive();return F(t,t.buffer)},async builder_sign(n,e,t,r,_){const i=await g.get(n).sign({reserveSize:t.reserveSize,alg:t.alg,sign:async s=>await W.sign(e,F(s,s.buffer),t.reserveSize)},r,_);return F(i,i.buffer)},async builder_signAndGetManifestBytes(n,e,t,r,_){const c=g.get(n),{manifest:i,asset:s}=await c.signAndGetManifestBytes({reserveSize:t.reserveSize,alg:t.alg,sign:async b=>await W.sign(e,F(b,b.buffer),t.reserveSize)},r,_);return F({manifest:i,asset:s},[i.buffer,s.buffer])},builder_free(n){g.get(n).free(),g.remove(n)}})})();\n', Ru = typeof self < "u" && self.Blob && new Blob([ev], { type: "text/javascript;charset=utf-8" });
function qw(n) {
  let r;
  try {
    if (r = Ru && (self.URL || self.webkitURL).createObjectURL(Ru), !r) throw "";
    const i = new Worker(r, {
      name: n == null ? void 0 : n.name
    });
    return i.addEventListener("error", () => {
      (self.URL || self.webkitURL).revokeObjectURL(r);
    }), i;
  } catch {
    return new Worker(
      "data:text/javascript;charset=utf-8," + encodeURIComponent(ev),
      {
        name: n == null ? void 0 : n.name
      }
    );
  } finally {
    r && (self.URL || self.webkitURL).revokeObjectURL(r);
  }
}
async function Gw(n) {
  const { wasm: r, settingsString: i } = n;
  let o = 0;
  const l = new qw(), d = Nw(l), p = /* @__PURE__ */ new Map();
  Uw(
    {
      sign: async (v, m, y) => {
        const h = p.get(v);
        if (p.delete(v), !h)
          throw new Error("No signer registered for request");
        const R = await h(m, y);
        return Dw(R, R.buffer);
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
class Eu extends Error {
  constructor(r) {
    super(
      `The provided asset was too large. Size: ${r} bytes. Maximum: ${vc}.`
    ), this.name = "AssetTooLargeError";
  }
}
class ku extends Error {
  constructor(r) {
    super(`Unsupported format: ${r}.`), this.name = "UnsupportedFormatError";
  }
}
const Hw = [
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
function Su(n) {
  return Hw.includes(n);
}
const tv = {
  builder: {
    generateC2paArchive: !0
  }
};
async function ii(n) {
  const r = Pt(tv, n), i = [];
  return r.trust && i.push(pa(r.trust)), r.cawgTrust && i.push(pa(r.cawgTrust)), await Promise.all(i), JSON.stringify(Ec(r));
}
async function Kw(n) {
  const r = Pt(tv, n), i = [];
  return r.trust && i.push(pa(r.trust)), r.cawgTrust && i.push(pa(r.cawgTrust)), await Promise.all(i), JSON.stringify(Ec(r));
}
function Ec(n) {
  return Object.entries(n).reduce(
    (r, [i, o]) => (r[Yw(i)] = typeof o == "object" ? Ec(o) : o, r),
    {}
  );
}
function Yw(n) {
  return n.replace(/[A-Z]/g, (r) => `_${r.toLowerCase()}`);
}
async function pa(n) {
  try {
    const r = Object.entries(n).map(async ([i, o]) => {
      if (Array.isArray(o)) {
        const l = o.map(async (p) => {
          const g = await (await fetch(p)).text();
          if ($u(i) && !Iu(g))
            throw new Error(`Error parsing PEM file at: ${p}`);
          return g;
        }), d = (await Promise.all(l)).join("");
        n[i] = d;
      } else if (o && Vw(o)) {
        const l = await (await fetch(o)).text();
        if ($u(i) && !Iu(l))
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
const $u = (n) => ["userAnchors", "trustAnchors"].includes(n), Iu = (n) => n.includes("-----BEGIN CERTIFICATE-----"), Vw = (n) => n.startsWith("http"), vc = 10 ** 9;
function Zw(n) {
  const { tx: r } = n, i = new FinalizationRegistry(async (o) => {
    await r.reader_free(o);
  });
  return {
    async fromBlob(o, l, d) {
      if (!Su(o))
        throw new ku(o);
      if (l.size > vc)
        throw new Eu(l.size);
      try {
        const p = d ? await ii(d) : void 0, g = await r.reader_fromBlob(o, l, p), v = Ou(n, g, () => {
          i.unregister(v);
        });
        return i.register(v, g, v), v;
      } catch (p) {
        return Tu(p);
      }
    },
    async fromBlobFragment(o, l, d, p) {
      if (!Su(o))
        throw new ku(o);
      if (l.size > vc)
        throw new Eu(l.size);
      try {
        const g = p ? await ii(p) : void 0, v = await r.reader_fromBlobFragment(
          o,
          l,
          d,
          g
        ), m = Ou(n, v, () => {
          i.unregister(m);
        });
        return i.register(m, v, m), m;
      } catch (g) {
        return Tu(g);
      }
    }
  };
}
function Tu(n) {
  if (n instanceof Error && n.message === "C2pa(JumbfNotFound)")
    return null;
  throw n;
}
function Ou(n, r, i) {
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
let kc;
typeof FinalizationRegistry > "u" || new FinalizationRegistry((n) => n.dtor(n.a, n.b));
let Jw = new TextDecoder("utf-8", { ignoreBOM: !0, fatal: !0 });
Jw.decode();
const so = new TextEncoder();
"encodeInto" in so || (so.encodeInto = function(n, r) {
  const i = so.encode(n);
  return r.set(i), {
    read: n.length,
    written: i.length
  };
});
typeof FinalizationRegistry > "u" || new FinalizationRegistry((n) => kc.__wbg_wasmbuilder_free(n >>> 0, 1));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((n) => kc.__wbg_wasmreader_free(n >>> 0, 1));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((n) => kc.__wbg_wasmsigner_free(n >>> 0, 1));
const Xw = "sha512-emM3xZBux5bBdEv6EFS+y5SmKnxnEVbNgsjbsOLnC/YYm55pviVrgdOxU8iQUisOISQvXrTj7H8vvsgYVlpeLg==";
async function Pu(n) {
  const { alg: r } = n;
  return {
    reserveSize: await n.reserveSize(),
    alg: r
  };
}
function Qw(n) {
  const { tx: r } = n, i = new FinalizationRegistry((o) => {
    r.builder_free(o);
  });
  return {
    async new(o) {
      const l = o ? await ii(o) : void 0, d = await r.builder_new(l), p = oo(n, d, () => {
        i.unregister(p);
      });
      return i.register(p, d, p), p;
    },
    async fromDefinition(o, l) {
      const d = JSON.stringify(o), p = l ? await ii(l) : void 0, g = await r.builder_fromJson(d, p), v = oo(n, g, () => {
        i.unregister(v);
      });
      return i.register(v, g, v), v;
    },
    async fromArchive(o, l) {
      const d = l ? await ii(l) : void 0, p = await r.builder_fromArchive(o, d), g = oo(n, p, () => {
        i.unregister(g);
      });
      return i.register(g, p, g), g;
    }
  };
}
function oo(n, r, i) {
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
      const g = await Pu(l), v = n.registerSignReceiver(l.sign);
      return await o.builder_sign(
        r,
        v,
        g,
        d,
        p
      );
    },
    async signAndGetManifestBytes(l, d, p) {
      const g = await Pu(l), v = n.registerSignReceiver(l.sign);
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
async function e2(n) {
  const { wasmSrc: r, settings: i } = n, o = typeof r == "string" ? await t2(r) : r, l = i ? await Kw(i) : void 0, d = await Gw({ wasm: o, settingsString: l });
  return {
    reader: Zw(d),
    builder: Qw(d),
    dispose: d.terminate
  };
}
async function t2(n) {
  const r = await fetch(n, { integrity: Xw });
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
var cn = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, gc = { exports: {} }, co, Mu;
function n2() {
  if (Mu) return co;
  Mu = 1;
  var n = 1e3, r = n * 60, i = r * 60, o = i * 24, l = o * 7, d = o * 365.25;
  co = function(y, h) {
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
  return co;
}
function r2(n) {
  i.debug = i, i.default = i, i.coerce = v, i.disable = d, i.enable = l, i.enabled = p, i.humanize = n2(), i.destroy = m, Object.keys(n).forEach((y) => {
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
    function F(...O) {
      if (!F.enabled)
        return;
      const M = F, L = Number(/* @__PURE__ */ new Date()), J = L - (h || L);
      M.diff = J, M.prev = h, M.curr = L, h = L, O[0] = i.coerce(O[0]), typeof O[0] != "string" && O.unshift("%O");
      let te = 0;
      O[0] = O[0].replace(/%([a-zA-Z%])/g, (ge, pe) => {
        if (ge === "%%")
          return "%";
        te++;
        const oe = i.formatters[pe];
        if (typeof oe == "function") {
          const me = O[te];
          ge = oe.call(M, me), O.splice(te, 1), te--;
        }
        return ge;
      }), i.formatArgs.call(M, O), (M.log || i.log).apply(M, O);
    }
    return F.namespace = y, F.useColors = i.useColors(), F.color = i.selectColor(y), F.extend = o, F.destroy = i.destroy, Object.defineProperty(F, "enabled", {
      enumerable: !0,
      configurable: !1,
      get: () => R !== null ? R : (P !== i.namespaces && (P = i.namespaces, $ = i.enabled(y)), $),
      set: (O) => {
        R = O;
      }
    }), typeof i.init == "function" && i.init(F), F;
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
var i2 = r2;
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
  n.exports = i2(r);
  const { formatters: g } = n.exports;
  g.j = function(v) {
    try {
      return JSON.stringify(v);
    } catch (m) {
      return "[UnexpectedJSONParseError]: " + m.message;
    }
  };
})(gc, gc.exports);
var ln = gc.exports, Fu = { exports: {} };
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
    var i, o = "4.17.21", l = 200, d = "Unsupported core-js use. Try https://npms.io/search?q=ponyfill.", p = "Expected a function", g = "Invalid `variable` option passed into `_.template`", v = "__lodash_hash_undefined__", m = 500, y = "__lodash_placeholder__", h = 1, R = 2, P = 4, $ = 1, F = 2, O = 1, M = 2, L = 4, J = 8, te = 16, _e = 32, ge = 64, pe = 128, oe = 256, me = 512, Ie = 30, We = "...", V = 800, ie = 16, ke = 1, Ge = 2, Lt = 3, Ne = 1 / 0, Xe = 9007199254740991, dn = 17976931348623157e292, Yt = NaN, Qe = 4294967295, xn = Qe - 1, Ue = Qe >>> 1, Vt = [
      ["ary", pe],
      ["bind", O],
      ["bindKey", M],
      ["curry", J],
      ["curryRight", te],
      ["flip", me],
      ["partial", _e],
      ["partialRight", ge],
      ["rearg", oe]
    ], N = "[object Arguments]", z = "[object Array]", D = "[object AsyncFunction]", G = "[object Boolean]", X = "[object Date]", Te = "[object DOMException]", He = "[object Error]", Le = "[object Function]", it = "[object GeneratorFunction]", et = "[object Map]", Ct = "[object Number]", Rn = "[object Null]", xt = "[object Object]", Cr = "[object Promise]", qn = "[object Proxy]", En = "[object RegExp]", gt = "[object Set]", Zt = "[object String]", Gn = "[object Symbol]", Da = "[object Undefined]", un = "[object WeakMap]", Ai = "[object WeakSet]", fn = "[object ArrayBuffer]", pn = "[object DataView]", Hn = "[object Float32Array]", Kn = "[object Float64Array]", xr = "[object Int8Array]", Rr = "[object Int16Array]", Er = "[object Int32Array]", kr = "[object Uint8Array]", Sr = "[object Uint8ClampedArray]", $r = "[object Uint16Array]", Ir = "[object Uint32Array]", Tr = /\b__p \+= '';/g, hi = /\b(__p \+=) '' \+/g, vn = /(__e\(.*?\)|\b__t\)) \+\n'';/g, Yn = /&(?:amp|lt|gt|quot|#39);/g, Vn = /[&<>"']/g, _i = RegExp(Yn.source), Wa = RegExp(Vn.source), yi = /<%-([\s\S]+?)%>/g, Na = /<%([\s\S]+?)%>/g, Or = /<%=([\s\S]+?)%>/g, bi = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, Ua = /^\w*$/, qa = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, Zn = /[\\^$.*+?()[\]{}|]/g, mi = RegExp(Zn.source), Pr = /^\s+/, Ga = /\s/, Ha = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/, Ka = /\{\n\/\* \[wrapped with (.+)\] \*/, _ = /,? & /, T = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g, B = /[()=,{}\[\]\/\s]/, Z = /\\(\\)?/g, fe = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g, Ae = /\w*$/, le = /^[-+]0x[0-9a-f]+$/i, se = /^0b[01]+$/i, Ke = /^\[object .+?Constructor\]$/, Se = /^0o[0-7]+$/i, Oe = /^(?:0|[1-9]\d*)$/, lt = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g, zt = /($^)/, Jt = /['\n\r\u2028\u2029\\]/g, ze = "\\ud800-\\udfff", Mr = "\\u0300-\\u036f", Ya = "\\ufe20-\\ufe2f", Va = "\\u20d0-\\u20ff", Xc = Mr + Ya + Va, Qc = "\\u2700-\\u27bf", el = "a-z\\xdf-\\xf6\\xf8-\\xff", Fg = "\\xac\\xb1\\xd7\\xf7", Lg = "\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf", zg = "\\u2000-\\u206f", jg = " \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000", tl = "A-Z\\xc0-\\xd6\\xd8-\\xde", nl = "\\ufe0e\\ufe0f", rl = Fg + Lg + zg + jg, Za = "['’]", Bg = "[" + ze + "]", il = "[" + rl + "]", wi = "[" + Xc + "]", al = "\\d+", Dg = "[" + Qc + "]", sl = "[" + el + "]", ol = "[^" + ze + rl + al + Qc + el + tl + "]", Ja = "\\ud83c[\\udffb-\\udfff]", Wg = "(?:" + wi + "|" + Ja + ")", cl = "[^" + ze + "]", Xa = "(?:\\ud83c[\\udde6-\\uddff]){2}", Qa = "[\\ud800-\\udbff][\\udc00-\\udfff]", Jn = "[" + tl + "]", ll = "\\u200d", dl = "(?:" + sl + "|" + ol + ")", Ng = "(?:" + Jn + "|" + ol + ")", ul = "(?:" + Za + "(?:d|ll|m|re|s|t|ve))?", fl = "(?:" + Za + "(?:D|LL|M|RE|S|T|VE))?", pl = Wg + "?", vl = "[" + nl + "]?", Ug = "(?:" + ll + "(?:" + [cl, Xa, Qa].join("|") + ")" + vl + pl + ")*", qg = "\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])", Gg = "\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])", gl = vl + pl + Ug, Hg = "(?:" + [Dg, Xa, Qa].join("|") + ")" + gl, Kg = "(?:" + [cl + wi + "?", wi, Xa, Qa, Bg].join("|") + ")", Yg = RegExp(Za, "g"), Vg = RegExp(wi, "g"), es = RegExp(Ja + "(?=" + Ja + ")|" + Kg + gl, "g"), Zg = RegExp([
      Jn + "?" + sl + "+" + ul + "(?=" + [il, Jn, "$"].join("|") + ")",
      Ng + "+" + fl + "(?=" + [il, Jn + dl, "$"].join("|") + ")",
      Jn + "?" + dl + "+" + ul,
      Jn + "+" + fl,
      Gg,
      qg,
      al,
      Hg
    ].join("|"), "g"), Jg = RegExp("[" + ll + ze + Xc + nl + "]"), Xg = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/, Qg = [
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
    ], eA = -1, xe = {};
    xe[Hn] = xe[Kn] = xe[xr] = xe[Rr] = xe[Er] = xe[kr] = xe[Sr] = xe[$r] = xe[Ir] = !0, xe[N] = xe[z] = xe[fn] = xe[G] = xe[pn] = xe[X] = xe[He] = xe[Le] = xe[et] = xe[Ct] = xe[xt] = xe[En] = xe[gt] = xe[Zt] = xe[un] = !1;
    var we = {};
    we[N] = we[z] = we[fn] = we[pn] = we[G] = we[X] = we[Hn] = we[Kn] = we[xr] = we[Rr] = we[Er] = we[et] = we[Ct] = we[xt] = we[En] = we[gt] = we[Zt] = we[Gn] = we[kr] = we[Sr] = we[$r] = we[Ir] = !0, we[He] = we[Le] = we[un] = !1;
    var tA = {
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
    }, nA = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    }, rA = {
      "&amp;": "&",
      "&lt;": "<",
      "&gt;": ">",
      "&quot;": '"',
      "&#39;": "'"
    }, iA = {
      "\\": "\\",
      "'": "'",
      "\n": "n",
      "\r": "r",
      "\u2028": "u2028",
      "\u2029": "u2029"
    }, aA = parseFloat, sA = parseInt, Al = typeof cn == "object" && cn && cn.Object === Object && cn, oA = typeof self == "object" && self && self.Object === Object && self, Ye = Al || oA || Function("return this")(), ts = r && !r.nodeType && r, kn = ts && !0 && n && !n.nodeType && n, hl = kn && kn.exports === ts, ns = hl && Al.process, Rt = (function() {
      try {
        var w = kn && kn.require && kn.require("util").types;
        return w || ns && ns.binding && ns.binding("util");
      } catch {
      }
    })(), _l = Rt && Rt.isArrayBuffer, yl = Rt && Rt.isDate, bl = Rt && Rt.isMap, ml = Rt && Rt.isRegExp, wl = Rt && Rt.isSet, Cl = Rt && Rt.isTypedArray;
    function At(w, E, x) {
      switch (x.length) {
        case 0:
          return w.call(E);
        case 1:
          return w.call(E, x[0]);
        case 2:
          return w.call(E, x[0], x[1]);
        case 3:
          return w.call(E, x[0], x[1], x[2]);
      }
      return w.apply(E, x);
    }
    function cA(w, E, x, W) {
      for (var Q = -1, ve = w == null ? 0 : w.length; ++Q < ve; ) {
        var je = w[Q];
        E(W, je, x(je), w);
      }
      return W;
    }
    function Et(w, E) {
      for (var x = -1, W = w == null ? 0 : w.length; ++x < W && E(w[x], x, w) !== !1; )
        ;
      return w;
    }
    function lA(w, E) {
      for (var x = w == null ? 0 : w.length; x-- && E(w[x], x, w) !== !1; )
        ;
      return w;
    }
    function xl(w, E) {
      for (var x = -1, W = w == null ? 0 : w.length; ++x < W; )
        if (!E(w[x], x, w))
          return !1;
      return !0;
    }
    function gn(w, E) {
      for (var x = -1, W = w == null ? 0 : w.length, Q = 0, ve = []; ++x < W; ) {
        var je = w[x];
        E(je, x, w) && (ve[Q++] = je);
      }
      return ve;
    }
    function Ci(w, E) {
      var x = w == null ? 0 : w.length;
      return !!x && Xn(w, E, 0) > -1;
    }
    function rs(w, E, x) {
      for (var W = -1, Q = w == null ? 0 : w.length; ++W < Q; )
        if (x(E, w[W]))
          return !0;
      return !1;
    }
    function Ee(w, E) {
      for (var x = -1, W = w == null ? 0 : w.length, Q = Array(W); ++x < W; )
        Q[x] = E(w[x], x, w);
      return Q;
    }
    function An(w, E) {
      for (var x = -1, W = E.length, Q = w.length; ++x < W; )
        w[Q + x] = E[x];
      return w;
    }
    function is(w, E, x, W) {
      var Q = -1, ve = w == null ? 0 : w.length;
      for (W && ve && (x = w[++Q]); ++Q < ve; )
        x = E(x, w[Q], Q, w);
      return x;
    }
    function dA(w, E, x, W) {
      var Q = w == null ? 0 : w.length;
      for (W && Q && (x = w[--Q]); Q--; )
        x = E(x, w[Q], Q, w);
      return x;
    }
    function as(w, E) {
      for (var x = -1, W = w == null ? 0 : w.length; ++x < W; )
        if (E(w[x], x, w))
          return !0;
      return !1;
    }
    var uA = ss("length");
    function fA(w) {
      return w.split("");
    }
    function pA(w) {
      return w.match(T) || [];
    }
    function Rl(w, E, x) {
      var W;
      return x(w, function(Q, ve, je) {
        if (E(Q, ve, je))
          return W = ve, !1;
      }), W;
    }
    function xi(w, E, x, W) {
      for (var Q = w.length, ve = x + (W ? 1 : -1); W ? ve-- : ++ve < Q; )
        if (E(w[ve], ve, w))
          return ve;
      return -1;
    }
    function Xn(w, E, x) {
      return E === E ? RA(w, E, x) : xi(w, El, x);
    }
    function vA(w, E, x, W) {
      for (var Q = x - 1, ve = w.length; ++Q < ve; )
        if (W(w[Q], E))
          return Q;
      return -1;
    }
    function El(w) {
      return w !== w;
    }
    function kl(w, E) {
      var x = w == null ? 0 : w.length;
      return x ? cs(w, E) / x : Yt;
    }
    function ss(w) {
      return function(E) {
        return E == null ? i : E[w];
      };
    }
    function os(w) {
      return function(E) {
        return w == null ? i : w[E];
      };
    }
    function Sl(w, E, x, W, Q) {
      return Q(w, function(ve, je, be) {
        x = W ? (W = !1, ve) : E(x, ve, je, be);
      }), x;
    }
    function gA(w, E) {
      var x = w.length;
      for (w.sort(E); x--; )
        w[x] = w[x].value;
      return w;
    }
    function cs(w, E) {
      for (var x, W = -1, Q = w.length; ++W < Q; ) {
        var ve = E(w[W]);
        ve !== i && (x = x === i ? ve : x + ve);
      }
      return x;
    }
    function ls(w, E) {
      for (var x = -1, W = Array(w); ++x < w; )
        W[x] = E(x);
      return W;
    }
    function AA(w, E) {
      return Ee(E, function(x) {
        return [x, w[x]];
      });
    }
    function $l(w) {
      return w && w.slice(0, Pl(w) + 1).replace(Pr, "");
    }
    function ht(w) {
      return function(E) {
        return w(E);
      };
    }
    function ds(w, E) {
      return Ee(E, function(x) {
        return w[x];
      });
    }
    function Fr(w, E) {
      return w.has(E);
    }
    function Il(w, E) {
      for (var x = -1, W = w.length; ++x < W && Xn(E, w[x], 0) > -1; )
        ;
      return x;
    }
    function Tl(w, E) {
      for (var x = w.length; x-- && Xn(E, w[x], 0) > -1; )
        ;
      return x;
    }
    function hA(w, E) {
      for (var x = w.length, W = 0; x--; )
        w[x] === E && ++W;
      return W;
    }
    var _A = os(tA), yA = os(nA);
    function bA(w) {
      return "\\" + iA[w];
    }
    function mA(w, E) {
      return w == null ? i : w[E];
    }
    function Qn(w) {
      return Jg.test(w);
    }
    function wA(w) {
      return Xg.test(w);
    }
    function CA(w) {
      for (var E, x = []; !(E = w.next()).done; )
        x.push(E.value);
      return x;
    }
    function us(w) {
      var E = -1, x = Array(w.size);
      return w.forEach(function(W, Q) {
        x[++E] = [Q, W];
      }), x;
    }
    function Ol(w, E) {
      return function(x) {
        return w(E(x));
      };
    }
    function hn(w, E) {
      for (var x = -1, W = w.length, Q = 0, ve = []; ++x < W; ) {
        var je = w[x];
        (je === E || je === y) && (w[x] = y, ve[Q++] = x);
      }
      return ve;
    }
    function Ri(w) {
      var E = -1, x = Array(w.size);
      return w.forEach(function(W) {
        x[++E] = W;
      }), x;
    }
    function xA(w) {
      var E = -1, x = Array(w.size);
      return w.forEach(function(W) {
        x[++E] = [W, W];
      }), x;
    }
    function RA(w, E, x) {
      for (var W = x - 1, Q = w.length; ++W < Q; )
        if (w[W] === E)
          return W;
      return -1;
    }
    function EA(w, E, x) {
      for (var W = x + 1; W--; )
        if (w[W] === E)
          return W;
      return W;
    }
    function er(w) {
      return Qn(w) ? SA(w) : uA(w);
    }
    function jt(w) {
      return Qn(w) ? $A(w) : fA(w);
    }
    function Pl(w) {
      for (var E = w.length; E-- && Ga.test(w.charAt(E)); )
        ;
      return E;
    }
    var kA = os(rA);
    function SA(w) {
      for (var E = es.lastIndex = 0; es.test(w); )
        ++E;
      return E;
    }
    function $A(w) {
      return w.match(es) || [];
    }
    function IA(w) {
      return w.match(Zg) || [];
    }
    var TA = (function w(E) {
      E = E == null ? Ye : tr.defaults(Ye.Object(), E, tr.pick(Ye, Qg));
      var x = E.Array, W = E.Date, Q = E.Error, ve = E.Function, je = E.Math, be = E.Object, fs = E.RegExp, OA = E.String, kt = E.TypeError, Ei = x.prototype, PA = ve.prototype, nr = be.prototype, ki = E["__core-js_shared__"], Si = PA.toString, ye = nr.hasOwnProperty, MA = 0, Ml = (function() {
        var e = /[^.]+$/.exec(ki && ki.keys && ki.keys.IE_PROTO || "");
        return e ? "Symbol(src)_1." + e : "";
      })(), $i = nr.toString, FA = Si.call(be), LA = Ye._, zA = fs(
        "^" + Si.call(ye).replace(Zn, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
      ), Ii = hl ? E.Buffer : i, _n = E.Symbol, Ti = E.Uint8Array, Fl = Ii ? Ii.allocUnsafe : i, Oi = Ol(be.getPrototypeOf, be), Ll = be.create, zl = nr.propertyIsEnumerable, Pi = Ei.splice, jl = _n ? _n.isConcatSpreadable : i, Lr = _n ? _n.iterator : i, Sn = _n ? _n.toStringTag : i, Mi = (function() {
        try {
          var e = Pn(be, "defineProperty");
          return e({}, "", {}), e;
        } catch {
        }
      })(), jA = E.clearTimeout !== Ye.clearTimeout && E.clearTimeout, BA = W && W.now !== Ye.Date.now && W.now, DA = E.setTimeout !== Ye.setTimeout && E.setTimeout, Fi = je.ceil, Li = je.floor, ps = be.getOwnPropertySymbols, WA = Ii ? Ii.isBuffer : i, Bl = E.isFinite, NA = Ei.join, UA = Ol(be.keys, be), Be = je.max, tt = je.min, qA = W.now, GA = E.parseInt, Dl = je.random, HA = Ei.reverse, vs = Pn(E, "DataView"), zr = Pn(E, "Map"), gs = Pn(E, "Promise"), rr = Pn(E, "Set"), jr = Pn(E, "WeakMap"), Br = Pn(be, "create"), zi = jr && new jr(), ir = {}, KA = Mn(vs), YA = Mn(zr), VA = Mn(gs), ZA = Mn(rr), JA = Mn(jr), ji = _n ? _n.prototype : i, Dr = ji ? ji.valueOf : i, Wl = ji ? ji.toString : i;
      function u(e) {
        if (Pe(e) && !ee(e) && !(e instanceof de)) {
          if (e instanceof St)
            return e;
          if (ye.call(e, "__wrapped__"))
            return Nd(e);
        }
        return new St(e);
      }
      var ar = /* @__PURE__ */ (function() {
        function e() {
        }
        return function(t) {
          if (!$e(t))
            return {};
          if (Ll)
            return Ll(t);
          e.prototype = t;
          var a = new e();
          return e.prototype = i, a;
        };
      })();
      function Bi() {
      }
      function St(e, t) {
        this.__wrapped__ = e, this.__actions__ = [], this.__chain__ = !!t, this.__index__ = 0, this.__values__ = i;
      }
      u.templateSettings = {
        /**
         * Used to detect `data` property values to be HTML-escaped.
         *
         * @memberOf _.templateSettings
         * @type {RegExp}
         */
        escape: yi,
        /**
         * Used to detect code to be evaluated.
         *
         * @memberOf _.templateSettings
         * @type {RegExp}
         */
        evaluate: Na,
        /**
         * Used to detect `data` property values to inject.
         *
         * @memberOf _.templateSettings
         * @type {RegExp}
         */
        interpolate: Or,
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
      }, u.prototype = Bi.prototype, u.prototype.constructor = u, St.prototype = ar(Bi.prototype), St.prototype.constructor = St;
      function de(e) {
        this.__wrapped__ = e, this.__actions__ = [], this.__dir__ = 1, this.__filtered__ = !1, this.__iteratees__ = [], this.__takeCount__ = Qe, this.__views__ = [];
      }
      function XA() {
        var e = new de(this.__wrapped__);
        return e.__actions__ = dt(this.__actions__), e.__dir__ = this.__dir__, e.__filtered__ = this.__filtered__, e.__iteratees__ = dt(this.__iteratees__), e.__takeCount__ = this.__takeCount__, e.__views__ = dt(this.__views__), e;
      }
      function QA() {
        if (this.__filtered__) {
          var e = new de(this);
          e.__dir__ = -1, e.__filtered__ = !0;
        } else
          e = this.clone(), e.__dir__ *= -1;
        return e;
      }
      function eh() {
        var e = this.__wrapped__.value(), t = this.__dir__, a = ee(e), s = t < 0, c = a ? e.length : 0, f = f_(0, c, this.__views__), A = f.start, b = f.end, C = b - A, k = s ? b : A - 1, S = this.__iteratees__, I = S.length, j = 0, q = tt(C, this.__takeCount__);
        if (!a || !s && c == C && q == C)
          return ud(e, this.__actions__);
        var K = [];
        e:
          for (; C-- && j < q; ) {
            k += t;
            for (var re = -1, Y = e[k]; ++re < I; ) {
              var ce = S[re], ue = ce.iteratee, bt = ce.type, ot = ue(Y);
              if (bt == Ge)
                Y = ot;
              else if (!ot) {
                if (bt == ke)
                  continue e;
                break e;
              }
            }
            K[j++] = Y;
          }
        return K;
      }
      de.prototype = ar(Bi.prototype), de.prototype.constructor = de;
      function $n(e) {
        var t = -1, a = e == null ? 0 : e.length;
        for (this.clear(); ++t < a; ) {
          var s = e[t];
          this.set(s[0], s[1]);
        }
      }
      function th() {
        this.__data__ = Br ? Br(null) : {}, this.size = 0;
      }
      function nh(e) {
        var t = this.has(e) && delete this.__data__[e];
        return this.size -= t ? 1 : 0, t;
      }
      function rh(e) {
        var t = this.__data__;
        if (Br) {
          var a = t[e];
          return a === v ? i : a;
        }
        return ye.call(t, e) ? t[e] : i;
      }
      function ih(e) {
        var t = this.__data__;
        return Br ? t[e] !== i : ye.call(t, e);
      }
      function ah(e, t) {
        var a = this.__data__;
        return this.size += this.has(e) ? 0 : 1, a[e] = Br && t === i ? v : t, this;
      }
      $n.prototype.clear = th, $n.prototype.delete = nh, $n.prototype.get = rh, $n.prototype.has = ih, $n.prototype.set = ah;
      function Xt(e) {
        var t = -1, a = e == null ? 0 : e.length;
        for (this.clear(); ++t < a; ) {
          var s = e[t];
          this.set(s[0], s[1]);
        }
      }
      function sh() {
        this.__data__ = [], this.size = 0;
      }
      function oh(e) {
        var t = this.__data__, a = Di(t, e);
        if (a < 0)
          return !1;
        var s = t.length - 1;
        return a == s ? t.pop() : Pi.call(t, a, 1), --this.size, !0;
      }
      function ch(e) {
        var t = this.__data__, a = Di(t, e);
        return a < 0 ? i : t[a][1];
      }
      function lh(e) {
        return Di(this.__data__, e) > -1;
      }
      function dh(e, t) {
        var a = this.__data__, s = Di(a, e);
        return s < 0 ? (++this.size, a.push([e, t])) : a[s][1] = t, this;
      }
      Xt.prototype.clear = sh, Xt.prototype.delete = oh, Xt.prototype.get = ch, Xt.prototype.has = lh, Xt.prototype.set = dh;
      function Qt(e) {
        var t = -1, a = e == null ? 0 : e.length;
        for (this.clear(); ++t < a; ) {
          var s = e[t];
          this.set(s[0], s[1]);
        }
      }
      function uh() {
        this.size = 0, this.__data__ = {
          hash: new $n(),
          map: new (zr || Xt)(),
          string: new $n()
        };
      }
      function fh(e) {
        var t = Xi(this, e).delete(e);
        return this.size -= t ? 1 : 0, t;
      }
      function ph(e) {
        return Xi(this, e).get(e);
      }
      function vh(e) {
        return Xi(this, e).has(e);
      }
      function gh(e, t) {
        var a = Xi(this, e), s = a.size;
        return a.set(e, t), this.size += a.size == s ? 0 : 1, this;
      }
      Qt.prototype.clear = uh, Qt.prototype.delete = fh, Qt.prototype.get = ph, Qt.prototype.has = vh, Qt.prototype.set = gh;
      function In(e) {
        var t = -1, a = e == null ? 0 : e.length;
        for (this.__data__ = new Qt(); ++t < a; )
          this.add(e[t]);
      }
      function Ah(e) {
        return this.__data__.set(e, v), this;
      }
      function hh(e) {
        return this.__data__.has(e);
      }
      In.prototype.add = In.prototype.push = Ah, In.prototype.has = hh;
      function Bt(e) {
        var t = this.__data__ = new Xt(e);
        this.size = t.size;
      }
      function _h() {
        this.__data__ = new Xt(), this.size = 0;
      }
      function yh(e) {
        var t = this.__data__, a = t.delete(e);
        return this.size = t.size, a;
      }
      function bh(e) {
        return this.__data__.get(e);
      }
      function mh(e) {
        return this.__data__.has(e);
      }
      function wh(e, t) {
        var a = this.__data__;
        if (a instanceof Xt) {
          var s = a.__data__;
          if (!zr || s.length < l - 1)
            return s.push([e, t]), this.size = ++a.size, this;
          a = this.__data__ = new Qt(s);
        }
        return a.set(e, t), this.size = a.size, this;
      }
      Bt.prototype.clear = _h, Bt.prototype.delete = yh, Bt.prototype.get = bh, Bt.prototype.has = mh, Bt.prototype.set = wh;
      function Nl(e, t) {
        var a = ee(e), s = !a && Fn(e), c = !a && !s && Cn(e), f = !a && !s && !c && lr(e), A = a || s || c || f, b = A ? ls(e.length, OA) : [], C = b.length;
        for (var k in e)
          (t || ye.call(e, k)) && !(A && // Safari 9 has enumerable `arguments.length` in strict mode.
          (k == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
          c && (k == "offset" || k == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
          f && (k == "buffer" || k == "byteLength" || k == "byteOffset") || // Skip index properties.
          rn(k, C))) && b.push(k);
        return b;
      }
      function Ul(e) {
        var t = e.length;
        return t ? e[Es(0, t - 1)] : i;
      }
      function Ch(e, t) {
        return Qi(dt(e), Tn(t, 0, e.length));
      }
      function xh(e) {
        return Qi(dt(e));
      }
      function As(e, t, a) {
        (a !== i && !Dt(e[t], a) || a === i && !(t in e)) && en(e, t, a);
      }
      function Wr(e, t, a) {
        var s = e[t];
        (!(ye.call(e, t) && Dt(s, a)) || a === i && !(t in e)) && en(e, t, a);
      }
      function Di(e, t) {
        for (var a = e.length; a--; )
          if (Dt(e[a][0], t))
            return a;
        return -1;
      }
      function Rh(e, t, a, s) {
        return yn(e, function(c, f, A) {
          t(s, c, a(c), A);
        }), s;
      }
      function ql(e, t) {
        return e && qt(t, qe(t), e);
      }
      function Eh(e, t) {
        return e && qt(t, ft(t), e);
      }
      function en(e, t, a) {
        t == "__proto__" && Mi ? Mi(e, t, {
          configurable: !0,
          enumerable: !0,
          value: a,
          writable: !0
        }) : e[t] = a;
      }
      function hs(e, t) {
        for (var a = -1, s = t.length, c = x(s), f = e == null; ++a < s; )
          c[a] = f ? i : Js(e, t[a]);
        return c;
      }
      function Tn(e, t, a) {
        return e === e && (a !== i && (e = e <= a ? e : a), t !== i && (e = e >= t ? e : t)), e;
      }
      function $t(e, t, a, s, c, f) {
        var A, b = t & h, C = t & R, k = t & P;
        if (a && (A = c ? a(e, s, c, f) : a(e)), A !== i)
          return A;
        if (!$e(e))
          return e;
        var S = ee(e);
        if (S) {
          if (A = v_(e), !b)
            return dt(e, A);
        } else {
          var I = nt(e), j = I == Le || I == it;
          if (Cn(e))
            return vd(e, b);
          if (I == xt || I == N || j && !c) {
            if (A = C || j ? {} : Pd(e), !b)
              return C ? r_(e, Eh(A, e)) : n_(e, ql(A, e));
          } else {
            if (!we[I])
              return c ? e : {};
            A = g_(e, I, b);
          }
        }
        f || (f = new Bt());
        var q = f.get(e);
        if (q)
          return q;
        f.set(e, A), cu(e) ? e.forEach(function(Y) {
          A.add($t(Y, t, a, Y, e, f));
        }) : su(e) && e.forEach(function(Y, ce) {
          A.set(ce, $t(Y, t, a, ce, e, f));
        });
        var K = k ? C ? zs : Ls : C ? ft : qe, re = S ? i : K(e);
        return Et(re || e, function(Y, ce) {
          re && (ce = Y, Y = e[ce]), Wr(A, ce, $t(Y, t, a, ce, e, f));
        }), A;
      }
      function kh(e) {
        var t = qe(e);
        return function(a) {
          return Gl(a, e, t);
        };
      }
      function Gl(e, t, a) {
        var s = a.length;
        if (e == null)
          return !s;
        for (e = be(e); s--; ) {
          var c = a[s], f = t[c], A = e[c];
          if (A === i && !(c in e) || !f(A))
            return !1;
        }
        return !0;
      }
      function Hl(e, t, a) {
        if (typeof e != "function")
          throw new kt(p);
        return Yr(function() {
          e.apply(i, a);
        }, t);
      }
      function Nr(e, t, a, s) {
        var c = -1, f = Ci, A = !0, b = e.length, C = [], k = t.length;
        if (!b)
          return C;
        a && (t = Ee(t, ht(a))), s ? (f = rs, A = !1) : t.length >= l && (f = Fr, A = !1, t = new In(t));
        e:
          for (; ++c < b; ) {
            var S = e[c], I = a == null ? S : a(S);
            if (S = s || S !== 0 ? S : 0, A && I === I) {
              for (var j = k; j--; )
                if (t[j] === I)
                  continue e;
              C.push(S);
            } else f(t, I, s) || C.push(S);
          }
        return C;
      }
      var yn = yd(Ut), Kl = yd(ys, !0);
      function Sh(e, t) {
        var a = !0;
        return yn(e, function(s, c, f) {
          return a = !!t(s, c, f), a;
        }), a;
      }
      function Wi(e, t, a) {
        for (var s = -1, c = e.length; ++s < c; ) {
          var f = e[s], A = t(f);
          if (A != null && (b === i ? A === A && !yt(A) : a(A, b)))
            var b = A, C = f;
        }
        return C;
      }
      function $h(e, t, a, s) {
        var c = e.length;
        for (a = ne(a), a < 0 && (a = -a > c ? 0 : c + a), s = s === i || s > c ? c : ne(s), s < 0 && (s += c), s = a > s ? 0 : du(s); a < s; )
          e[a++] = t;
        return e;
      }
      function Yl(e, t) {
        var a = [];
        return yn(e, function(s, c, f) {
          t(s, c, f) && a.push(s);
        }), a;
      }
      function Ve(e, t, a, s, c) {
        var f = -1, A = e.length;
        for (a || (a = h_), c || (c = []); ++f < A; ) {
          var b = e[f];
          t > 0 && a(b) ? t > 1 ? Ve(b, t - 1, a, s, c) : An(c, b) : s || (c[c.length] = b);
        }
        return c;
      }
      var _s = bd(), Vl = bd(!0);
      function Ut(e, t) {
        return e && _s(e, t, qe);
      }
      function ys(e, t) {
        return e && Vl(e, t, qe);
      }
      function Ni(e, t) {
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
      function Zl(e, t, a) {
        var s = t(e);
        return ee(e) ? s : An(s, a(e));
      }
      function at(e) {
        return e == null ? e === i ? Da : Rn : Sn && Sn in be(e) ? u_(e) : x_(e);
      }
      function bs(e, t) {
        return e > t;
      }
      function Ih(e, t) {
        return e != null && ye.call(e, t);
      }
      function Th(e, t) {
        return e != null && t in be(e);
      }
      function Oh(e, t, a) {
        return e >= tt(t, a) && e < Be(t, a);
      }
      function ms(e, t, a) {
        for (var s = a ? rs : Ci, c = e[0].length, f = e.length, A = f, b = x(f), C = 1 / 0, k = []; A--; ) {
          var S = e[A];
          A && t && (S = Ee(S, ht(t))), C = tt(S.length, C), b[A] = !a && (t || c >= 120 && S.length >= 120) ? new In(A && S) : i;
        }
        S = e[0];
        var I = -1, j = b[0];
        e:
          for (; ++I < c && k.length < C; ) {
            var q = S[I], K = t ? t(q) : q;
            if (q = a || q !== 0 ? q : 0, !(j ? Fr(j, K) : s(k, K, a))) {
              for (A = f; --A; ) {
                var re = b[A];
                if (!(re ? Fr(re, K) : s(e[A], K, a)))
                  continue e;
              }
              j && j.push(K), k.push(q);
            }
          }
        return k;
      }
      function Ph(e, t, a, s) {
        return Ut(e, function(c, f, A) {
          t(s, a(c), f, A);
        }), s;
      }
      function Ur(e, t, a) {
        t = mn(t, e), e = zd(e, t);
        var s = e == null ? e : e[Gt(Tt(t))];
        return s == null ? i : At(s, e, a);
      }
      function Jl(e) {
        return Pe(e) && at(e) == N;
      }
      function Mh(e) {
        return Pe(e) && at(e) == fn;
      }
      function Fh(e) {
        return Pe(e) && at(e) == X;
      }
      function qr(e, t, a, s, c) {
        return e === t ? !0 : e == null || t == null || !Pe(e) && !Pe(t) ? e !== e && t !== t : Lh(e, t, a, s, qr, c);
      }
      function Lh(e, t, a, s, c, f) {
        var A = ee(e), b = ee(t), C = A ? z : nt(e), k = b ? z : nt(t);
        C = C == N ? xt : C, k = k == N ? xt : k;
        var S = C == xt, I = k == xt, j = C == k;
        if (j && Cn(e)) {
          if (!Cn(t))
            return !1;
          A = !0, S = !1;
        }
        if (j && !S)
          return f || (f = new Bt()), A || lr(e) ? Id(e, t, a, s, c, f) : l_(e, t, C, a, s, c, f);
        if (!(a & $)) {
          var q = S && ye.call(e, "__wrapped__"), K = I && ye.call(t, "__wrapped__");
          if (q || K) {
            var re = q ? e.value() : e, Y = K ? t.value() : t;
            return f || (f = new Bt()), c(re, Y, a, s, f);
          }
        }
        return j ? (f || (f = new Bt()), d_(e, t, a, s, c, f)) : !1;
      }
      function zh(e) {
        return Pe(e) && nt(e) == et;
      }
      function ws(e, t, a, s) {
        var c = a.length, f = c, A = !s;
        if (e == null)
          return !f;
        for (e = be(e); c--; ) {
          var b = a[c];
          if (A && b[2] ? b[1] !== e[b[0]] : !(b[0] in e))
            return !1;
        }
        for (; ++c < f; ) {
          b = a[c];
          var C = b[0], k = e[C], S = b[1];
          if (A && b[2]) {
            if (k === i && !(C in e))
              return !1;
          } else {
            var I = new Bt();
            if (s)
              var j = s(k, S, C, e, t, I);
            if (!(j === i ? qr(S, k, $ | F, s, I) : j))
              return !1;
          }
        }
        return !0;
      }
      function Xl(e) {
        if (!$e(e) || y_(e))
          return !1;
        var t = an(e) ? zA : Ke;
        return t.test(Mn(e));
      }
      function jh(e) {
        return Pe(e) && at(e) == En;
      }
      function Bh(e) {
        return Pe(e) && nt(e) == gt;
      }
      function Dh(e) {
        return Pe(e) && aa(e.length) && !!xe[at(e)];
      }
      function Ql(e) {
        return typeof e == "function" ? e : e == null ? pt : typeof e == "object" ? ee(e) ? nd(e[0], e[1]) : td(e) : mu(e);
      }
      function Cs(e) {
        if (!Kr(e))
          return UA(e);
        var t = [];
        for (var a in be(e))
          ye.call(e, a) && a != "constructor" && t.push(a);
        return t;
      }
      function Wh(e) {
        if (!$e(e))
          return C_(e);
        var t = Kr(e), a = [];
        for (var s in e)
          s == "constructor" && (t || !ye.call(e, s)) || a.push(s);
        return a;
      }
      function xs(e, t) {
        return e < t;
      }
      function ed(e, t) {
        var a = -1, s = ut(e) ? x(e.length) : [];
        return yn(e, function(c, f, A) {
          s[++a] = t(c, f, A);
        }), s;
      }
      function td(e) {
        var t = Bs(e);
        return t.length == 1 && t[0][2] ? Fd(t[0][0], t[0][1]) : function(a) {
          return a === e || ws(a, e, t);
        };
      }
      function nd(e, t) {
        return Ws(e) && Md(t) ? Fd(Gt(e), t) : function(a) {
          var s = Js(a, e);
          return s === i && s === t ? Xs(a, e) : qr(t, s, $ | F);
        };
      }
      function Ui(e, t, a, s, c) {
        e !== t && _s(t, function(f, A) {
          if (c || (c = new Bt()), $e(f))
            Nh(e, t, A, a, Ui, s, c);
          else {
            var b = s ? s(Us(e, A), f, A + "", e, t, c) : i;
            b === i && (b = f), As(e, A, b);
          }
        }, ft);
      }
      function Nh(e, t, a, s, c, f, A) {
        var b = Us(e, a), C = Us(t, a), k = A.get(C);
        if (k) {
          As(e, a, k);
          return;
        }
        var S = f ? f(b, C, a + "", e, t, A) : i, I = S === i;
        if (I) {
          var j = ee(C), q = !j && Cn(C), K = !j && !q && lr(C);
          S = C, j || q || K ? ee(b) ? S = b : Me(b) ? S = dt(b) : q ? (I = !1, S = vd(C, !0)) : K ? (I = !1, S = gd(C, !0)) : S = [] : Vr(C) || Fn(C) ? (S = b, Fn(b) ? S = uu(b) : (!$e(b) || an(b)) && (S = Pd(C))) : I = !1;
        }
        I && (A.set(C, S), c(S, C, s, f, A), A.delete(C)), As(e, a, S);
      }
      function rd(e, t) {
        var a = e.length;
        if (a)
          return t += t < 0 ? a : 0, rn(t, a) ? e[t] : i;
      }
      function id(e, t, a) {
        t.length ? t = Ee(t, function(f) {
          return ee(f) ? function(A) {
            return On(A, f.length === 1 ? f[0] : f);
          } : f;
        }) : t = [pt];
        var s = -1;
        t = Ee(t, ht(H()));
        var c = ed(e, function(f, A, b) {
          var C = Ee(t, function(k) {
            return k(f);
          });
          return { criteria: C, index: ++s, value: f };
        });
        return gA(c, function(f, A) {
          return t_(f, A, a);
        });
      }
      function Uh(e, t) {
        return ad(e, t, function(a, s) {
          return Xs(e, s);
        });
      }
      function ad(e, t, a) {
        for (var s = -1, c = t.length, f = {}; ++s < c; ) {
          var A = t[s], b = On(e, A);
          a(b, A) && Gr(f, mn(A, e), b);
        }
        return f;
      }
      function qh(e) {
        return function(t) {
          return On(t, e);
        };
      }
      function Rs(e, t, a, s) {
        var c = s ? vA : Xn, f = -1, A = t.length, b = e;
        for (e === t && (t = dt(t)), a && (b = Ee(e, ht(a))); ++f < A; )
          for (var C = 0, k = t[f], S = a ? a(k) : k; (C = c(b, S, C, s)) > -1; )
            b !== e && Pi.call(b, C, 1), Pi.call(e, C, 1);
        return e;
      }
      function sd(e, t) {
        for (var a = e ? t.length : 0, s = a - 1; a--; ) {
          var c = t[a];
          if (a == s || c !== f) {
            var f = c;
            rn(c) ? Pi.call(e, c, 1) : $s(e, c);
          }
        }
        return e;
      }
      function Es(e, t) {
        return e + Li(Dl() * (t - e + 1));
      }
      function Gh(e, t, a, s) {
        for (var c = -1, f = Be(Fi((t - e) / (a || 1)), 0), A = x(f); f--; )
          A[s ? f : ++c] = e, e += a;
        return A;
      }
      function ks(e, t) {
        var a = "";
        if (!e || t < 1 || t > Xe)
          return a;
        do
          t % 2 && (a += e), t = Li(t / 2), t && (e += e);
        while (t);
        return a;
      }
      function ae(e, t) {
        return qs(Ld(e, t, pt), e + "");
      }
      function Hh(e) {
        return Ul(dr(e));
      }
      function Kh(e, t) {
        var a = dr(e);
        return Qi(a, Tn(t, 0, a.length));
      }
      function Gr(e, t, a, s) {
        if (!$e(e))
          return e;
        t = mn(t, e);
        for (var c = -1, f = t.length, A = f - 1, b = e; b != null && ++c < f; ) {
          var C = Gt(t[c]), k = a;
          if (C === "__proto__" || C === "constructor" || C === "prototype")
            return e;
          if (c != A) {
            var S = b[C];
            k = s ? s(S, C, b) : i, k === i && (k = $e(S) ? S : rn(t[c + 1]) ? [] : {});
          }
          Wr(b, C, k), b = b[C];
        }
        return e;
      }
      var od = zi ? function(e, t) {
        return zi.set(e, t), e;
      } : pt, Yh = Mi ? function(e, t) {
        return Mi(e, "toString", {
          configurable: !0,
          enumerable: !1,
          value: eo(t),
          writable: !0
        });
      } : pt;
      function Vh(e) {
        return Qi(dr(e));
      }
      function It(e, t, a) {
        var s = -1, c = e.length;
        t < 0 && (t = -t > c ? 0 : c + t), a = a > c ? c : a, a < 0 && (a += c), c = t > a ? 0 : a - t >>> 0, t >>>= 0;
        for (var f = x(c); ++s < c; )
          f[s] = e[s + t];
        return f;
      }
      function Zh(e, t) {
        var a;
        return yn(e, function(s, c, f) {
          return a = t(s, c, f), !a;
        }), !!a;
      }
      function qi(e, t, a) {
        var s = 0, c = e == null ? s : e.length;
        if (typeof t == "number" && t === t && c <= Ue) {
          for (; s < c; ) {
            var f = s + c >>> 1, A = e[f];
            A !== null && !yt(A) && (a ? A <= t : A < t) ? s = f + 1 : c = f;
          }
          return c;
        }
        return Ss(e, t, pt, a);
      }
      function Ss(e, t, a, s) {
        var c = 0, f = e == null ? 0 : e.length;
        if (f === 0)
          return 0;
        t = a(t);
        for (var A = t !== t, b = t === null, C = yt(t), k = t === i; c < f; ) {
          var S = Li((c + f) / 2), I = a(e[S]), j = I !== i, q = I === null, K = I === I, re = yt(I);
          if (A)
            var Y = s || K;
          else k ? Y = K && (s || j) : b ? Y = K && j && (s || !q) : C ? Y = K && j && !q && (s || !re) : q || re ? Y = !1 : Y = s ? I <= t : I < t;
          Y ? c = S + 1 : f = S;
        }
        return tt(f, xn);
      }
      function cd(e, t) {
        for (var a = -1, s = e.length, c = 0, f = []; ++a < s; ) {
          var A = e[a], b = t ? t(A) : A;
          if (!a || !Dt(b, C)) {
            var C = b;
            f[c++] = A === 0 ? 0 : A;
          }
        }
        return f;
      }
      function ld(e) {
        return typeof e == "number" ? e : yt(e) ? Yt : +e;
      }
      function _t(e) {
        if (typeof e == "string")
          return e;
        if (ee(e))
          return Ee(e, _t) + "";
        if (yt(e))
          return Wl ? Wl.call(e) : "";
        var t = e + "";
        return t == "0" && 1 / e == -Ne ? "-0" : t;
      }
      function bn(e, t, a) {
        var s = -1, c = Ci, f = e.length, A = !0, b = [], C = b;
        if (a)
          A = !1, c = rs;
        else if (f >= l) {
          var k = t ? null : o_(e);
          if (k)
            return Ri(k);
          A = !1, c = Fr, C = new In();
        } else
          C = t ? [] : b;
        e:
          for (; ++s < f; ) {
            var S = e[s], I = t ? t(S) : S;
            if (S = a || S !== 0 ? S : 0, A && I === I) {
              for (var j = C.length; j--; )
                if (C[j] === I)
                  continue e;
              t && C.push(I), b.push(S);
            } else c(C, I, a) || (C !== b && C.push(I), b.push(S));
          }
        return b;
      }
      function $s(e, t) {
        return t = mn(t, e), e = zd(e, t), e == null || delete e[Gt(Tt(t))];
      }
      function dd(e, t, a, s) {
        return Gr(e, t, a(On(e, t)), s);
      }
      function Gi(e, t, a, s) {
        for (var c = e.length, f = s ? c : -1; (s ? f-- : ++f < c) && t(e[f], f, e); )
          ;
        return a ? It(e, s ? 0 : f, s ? f + 1 : c) : It(e, s ? f + 1 : 0, s ? c : f);
      }
      function ud(e, t) {
        var a = e;
        return a instanceof de && (a = a.value()), is(t, function(s, c) {
          return c.func.apply(c.thisArg, An([s], c.args));
        }, a);
      }
      function Is(e, t, a) {
        var s = e.length;
        if (s < 2)
          return s ? bn(e[0]) : [];
        for (var c = -1, f = x(s); ++c < s; )
          for (var A = e[c], b = -1; ++b < s; )
            b != c && (f[c] = Nr(f[c] || A, e[b], t, a));
        return bn(Ve(f, 1), t, a);
      }
      function fd(e, t, a) {
        for (var s = -1, c = e.length, f = t.length, A = {}; ++s < c; ) {
          var b = s < f ? t[s] : i;
          a(A, e[s], b);
        }
        return A;
      }
      function Ts(e) {
        return Me(e) ? e : [];
      }
      function Os(e) {
        return typeof e == "function" ? e : pt;
      }
      function mn(e, t) {
        return ee(e) ? e : Ws(e, t) ? [e] : Wd(he(e));
      }
      var Jh = ae;
      function wn(e, t, a) {
        var s = e.length;
        return a = a === i ? s : a, !t && a >= s ? e : It(e, t, a);
      }
      var pd = jA || function(e) {
        return Ye.clearTimeout(e);
      };
      function vd(e, t) {
        if (t)
          return e.slice();
        var a = e.length, s = Fl ? Fl(a) : new e.constructor(a);
        return e.copy(s), s;
      }
      function Ps(e) {
        var t = new e.constructor(e.byteLength);
        return new Ti(t).set(new Ti(e)), t;
      }
      function Xh(e, t) {
        var a = t ? Ps(e.buffer) : e.buffer;
        return new e.constructor(a, e.byteOffset, e.byteLength);
      }
      function Qh(e) {
        var t = new e.constructor(e.source, Ae.exec(e));
        return t.lastIndex = e.lastIndex, t;
      }
      function e_(e) {
        return Dr ? be(Dr.call(e)) : {};
      }
      function gd(e, t) {
        var a = t ? Ps(e.buffer) : e.buffer;
        return new e.constructor(a, e.byteOffset, e.length);
      }
      function Ad(e, t) {
        if (e !== t) {
          var a = e !== i, s = e === null, c = e === e, f = yt(e), A = t !== i, b = t === null, C = t === t, k = yt(t);
          if (!b && !k && !f && e > t || f && A && C && !b && !k || s && A && C || !a && C || !c)
            return 1;
          if (!s && !f && !k && e < t || k && a && c && !s && !f || b && a && c || !A && c || !C)
            return -1;
        }
        return 0;
      }
      function t_(e, t, a) {
        for (var s = -1, c = e.criteria, f = t.criteria, A = c.length, b = a.length; ++s < A; ) {
          var C = Ad(c[s], f[s]);
          if (C) {
            if (s >= b)
              return C;
            var k = a[s];
            return C * (k == "desc" ? -1 : 1);
          }
        }
        return e.index - t.index;
      }
      function hd(e, t, a, s) {
        for (var c = -1, f = e.length, A = a.length, b = -1, C = t.length, k = Be(f - A, 0), S = x(C + k), I = !s; ++b < C; )
          S[b] = t[b];
        for (; ++c < A; )
          (I || c < f) && (S[a[c]] = e[c]);
        for (; k--; )
          S[b++] = e[c++];
        return S;
      }
      function _d(e, t, a, s) {
        for (var c = -1, f = e.length, A = -1, b = a.length, C = -1, k = t.length, S = Be(f - b, 0), I = x(S + k), j = !s; ++c < S; )
          I[c] = e[c];
        for (var q = c; ++C < k; )
          I[q + C] = t[C];
        for (; ++A < b; )
          (j || c < f) && (I[q + a[A]] = e[c++]);
        return I;
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
          C === i && (C = e[b]), c ? en(a, b, C) : Wr(a, b, C);
        }
        return a;
      }
      function n_(e, t) {
        return qt(e, Ds(e), t);
      }
      function r_(e, t) {
        return qt(e, Td(e), t);
      }
      function Hi(e, t) {
        return function(a, s) {
          var c = ee(a) ? cA : Rh, f = t ? t() : {};
          return c(a, e, H(s, 2), f);
        };
      }
      function sr(e) {
        return ae(function(t, a) {
          var s = -1, c = a.length, f = c > 1 ? a[c - 1] : i, A = c > 2 ? a[2] : i;
          for (f = e.length > 3 && typeof f == "function" ? (c--, f) : i, A && st(a[0], a[1], A) && (f = c < 3 ? i : f, c = 1), t = be(t); ++s < c; ) {
            var b = a[s];
            b && e(t, b, s, f);
          }
          return t;
        });
      }
      function yd(e, t) {
        return function(a, s) {
          if (a == null)
            return a;
          if (!ut(a))
            return e(a, s);
          for (var c = a.length, f = t ? c : -1, A = be(a); (t ? f-- : ++f < c) && s(A[f], f, A) !== !1; )
            ;
          return a;
        };
      }
      function bd(e) {
        return function(t, a, s) {
          for (var c = -1, f = be(t), A = s(t), b = A.length; b--; ) {
            var C = A[e ? b : ++c];
            if (a(f[C], C, f) === !1)
              break;
          }
          return t;
        };
      }
      function i_(e, t, a) {
        var s = t & O, c = Hr(e);
        function f() {
          var A = this && this !== Ye && this instanceof f ? c : e;
          return A.apply(s ? a : this, arguments);
        }
        return f;
      }
      function md(e) {
        return function(t) {
          t = he(t);
          var a = Qn(t) ? jt(t) : i, s = a ? a[0] : t.charAt(0), c = a ? wn(a, 1).join("") : t.slice(1);
          return s[e]() + c;
        };
      }
      function or(e) {
        return function(t) {
          return is(yu(_u(t).replace(Yg, "")), e, "");
        };
      }
      function Hr(e) {
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
          var a = ar(e.prototype), s = e.apply(a, t);
          return $e(s) ? s : a;
        };
      }
      function a_(e, t, a) {
        var s = Hr(e);
        function c() {
          for (var f = arguments.length, A = x(f), b = f, C = cr(c); b--; )
            A[b] = arguments[b];
          var k = f < 3 && A[0] !== C && A[f - 1] !== C ? [] : hn(A, C);
          if (f -= k.length, f < a)
            return Ed(
              e,
              t,
              Ki,
              c.placeholder,
              i,
              A,
              k,
              i,
              i,
              a - f
            );
          var S = this && this !== Ye && this instanceof c ? s : e;
          return At(S, this, A);
        }
        return c;
      }
      function wd(e) {
        return function(t, a, s) {
          var c = be(t);
          if (!ut(t)) {
            var f = H(a, 3);
            t = qe(t), a = function(b) {
              return f(c[b], b, c);
            };
          }
          var A = e(t, a, s);
          return A > -1 ? c[f ? t[A] : A] : i;
        };
      }
      function Cd(e) {
        return nn(function(t) {
          var a = t.length, s = a, c = St.prototype.thru;
          for (e && t.reverse(); s--; ) {
            var f = t[s];
            if (typeof f != "function")
              throw new kt(p);
            if (c && !A && Ji(f) == "wrapper")
              var A = new St([], !0);
          }
          for (s = A ? s : a; ++s < a; ) {
            f = t[s];
            var b = Ji(f), C = b == "wrapper" ? js(f) : i;
            C && Ns(C[0]) && C[1] == (pe | J | _e | oe) && !C[4].length && C[9] == 1 ? A = A[Ji(C[0])].apply(A, C[3]) : A = f.length == 1 && Ns(f) ? A[b]() : A.thru(f);
          }
          return function() {
            var k = arguments, S = k[0];
            if (A && k.length == 1 && ee(S))
              return A.plant(S).value();
            for (var I = 0, j = a ? t[I].apply(this, k) : S; ++I < a; )
              j = t[I].call(this, j);
            return j;
          };
        });
      }
      function Ki(e, t, a, s, c, f, A, b, C, k) {
        var S = t & pe, I = t & O, j = t & M, q = t & (J | te), K = t & me, re = j ? i : Hr(e);
        function Y() {
          for (var ce = arguments.length, ue = x(ce), bt = ce; bt--; )
            ue[bt] = arguments[bt];
          if (q)
            var ot = cr(Y), mt = hA(ue, ot);
          if (s && (ue = hd(ue, s, c, q)), f && (ue = _d(ue, f, A, q)), ce -= mt, q && ce < k) {
            var Fe = hn(ue, ot);
            return Ed(
              e,
              t,
              Ki,
              Y.placeholder,
              a,
              ue,
              Fe,
              b,
              C,
              k - ce
            );
          }
          var Wt = I ? a : this, on = j ? Wt[e] : e;
          return ce = ue.length, b ? ue = R_(ue, b) : K && ce > 1 && ue.reverse(), S && C < ce && (ue.length = C), this && this !== Ye && this instanceof Y && (on = re || Hr(on)), on.apply(Wt, ue);
        }
        return Y;
      }
      function xd(e, t) {
        return function(a, s) {
          return Ph(a, e, t(s), {});
        };
      }
      function Yi(e, t) {
        return function(a, s) {
          var c;
          if (a === i && s === i)
            return t;
          if (a !== i && (c = a), s !== i) {
            if (c === i)
              return s;
            typeof a == "string" || typeof s == "string" ? (a = _t(a), s = _t(s)) : (a = ld(a), s = ld(s)), c = e(a, s);
          }
          return c;
        };
      }
      function Ms(e) {
        return nn(function(t) {
          return t = Ee(t, ht(H())), ae(function(a) {
            var s = this;
            return e(t, function(c) {
              return At(c, s, a);
            });
          });
        });
      }
      function Vi(e, t) {
        t = t === i ? " " : _t(t);
        var a = t.length;
        if (a < 2)
          return a ? ks(t, e) : t;
        var s = ks(t, Fi(e / er(t)));
        return Qn(t) ? wn(jt(s), 0, e).join("") : s.slice(0, e);
      }
      function s_(e, t, a, s) {
        var c = t & O, f = Hr(e);
        function A() {
          for (var b = -1, C = arguments.length, k = -1, S = s.length, I = x(S + C), j = this && this !== Ye && this instanceof A ? f : e; ++k < S; )
            I[k] = s[k];
          for (; C--; )
            I[k++] = arguments[++b];
          return At(j, c ? a : this, I);
        }
        return A;
      }
      function Rd(e) {
        return function(t, a, s) {
          return s && typeof s != "number" && st(t, a, s) && (a = s = i), t = sn(t), a === i ? (a = t, t = 0) : a = sn(a), s = s === i ? t < a ? 1 : -1 : sn(s), Gh(t, a, s, e);
        };
      }
      function Zi(e) {
        return function(t, a) {
          return typeof t == "string" && typeof a == "string" || (t = Ot(t), a = Ot(a)), e(t, a);
        };
      }
      function Ed(e, t, a, s, c, f, A, b, C, k) {
        var S = t & J, I = S ? A : i, j = S ? i : A, q = S ? f : i, K = S ? i : f;
        t |= S ? _e : ge, t &= ~(S ? ge : _e), t & L || (t &= -4);
        var re = [
          e,
          t,
          c,
          q,
          I,
          K,
          j,
          b,
          C,
          k
        ], Y = a.apply(i, re);
        return Ns(e) && jd(Y, re), Y.placeholder = s, Bd(Y, e, t);
      }
      function Fs(e) {
        var t = je[e];
        return function(a, s) {
          if (a = Ot(a), s = s == null ? 0 : tt(ne(s), 292), s && Bl(a)) {
            var c = (he(a) + "e").split("e"), f = t(c[0] + "e" + (+c[1] + s));
            return c = (he(f) + "e").split("e"), +(c[0] + "e" + (+c[1] - s));
          }
          return t(a);
        };
      }
      var o_ = rr && 1 / Ri(new rr([, -0]))[1] == Ne ? function(e) {
        return new rr(e);
      } : ro;
      function kd(e) {
        return function(t) {
          var a = nt(t);
          return a == et ? us(t) : a == gt ? xA(t) : AA(t, e(t));
        };
      }
      function tn(e, t, a, s, c, f, A, b) {
        var C = t & M;
        if (!C && typeof e != "function")
          throw new kt(p);
        var k = s ? s.length : 0;
        if (k || (t &= -97, s = c = i), A = A === i ? A : Be(ne(A), 0), b = b === i ? b : ne(b), k -= c ? c.length : 0, t & ge) {
          var S = s, I = c;
          s = c = i;
        }
        var j = C ? i : js(e), q = [
          e,
          t,
          a,
          s,
          c,
          S,
          I,
          f,
          A,
          b
        ];
        if (j && w_(q, j), e = q[0], t = q[1], a = q[2], s = q[3], c = q[4], b = q[9] = q[9] === i ? C ? 0 : e.length : Be(q[9] - k, 0), !b && t & (J | te) && (t &= -25), !t || t == O)
          var K = i_(e, t, a);
        else t == J || t == te ? K = a_(e, t, b) : (t == _e || t == (O | _e)) && !c.length ? K = s_(e, t, a, s) : K = Ki.apply(i, q);
        var re = j ? od : jd;
        return Bd(re(K, q), e, t);
      }
      function Sd(e, t, a, s) {
        return e === i || Dt(e, nr[a]) && !ye.call(s, a) ? t : e;
      }
      function $d(e, t, a, s, c, f) {
        return $e(e) && $e(t) && (f.set(t, e), Ui(e, t, i, $d, f), f.delete(t)), e;
      }
      function c_(e) {
        return Vr(e) ? i : e;
      }
      function Id(e, t, a, s, c, f) {
        var A = a & $, b = e.length, C = t.length;
        if (b != C && !(A && C > b))
          return !1;
        var k = f.get(e), S = f.get(t);
        if (k && S)
          return k == t && S == e;
        var I = -1, j = !0, q = a & F ? new In() : i;
        for (f.set(e, t), f.set(t, e); ++I < b; ) {
          var K = e[I], re = t[I];
          if (s)
            var Y = A ? s(re, K, I, t, e, f) : s(K, re, I, e, t, f);
          if (Y !== i) {
            if (Y)
              continue;
            j = !1;
            break;
          }
          if (q) {
            if (!as(t, function(ce, ue) {
              if (!Fr(q, ue) && (K === ce || c(K, ce, a, s, f)))
                return q.push(ue);
            })) {
              j = !1;
              break;
            }
          } else if (!(K === re || c(K, re, a, s, f))) {
            j = !1;
            break;
          }
        }
        return f.delete(e), f.delete(t), j;
      }
      function l_(e, t, a, s, c, f, A) {
        switch (a) {
          case pn:
            if (e.byteLength != t.byteLength || e.byteOffset != t.byteOffset)
              return !1;
            e = e.buffer, t = t.buffer;
          case fn:
            return !(e.byteLength != t.byteLength || !f(new Ti(e), new Ti(t)));
          case G:
          case X:
          case Ct:
            return Dt(+e, +t);
          case He:
            return e.name == t.name && e.message == t.message;
          case En:
          case Zt:
            return e == t + "";
          case et:
            var b = us;
          case gt:
            var C = s & $;
            if (b || (b = Ri), e.size != t.size && !C)
              return !1;
            var k = A.get(e);
            if (k)
              return k == t;
            s |= F, A.set(e, t);
            var S = Id(b(e), b(t), s, c, f, A);
            return A.delete(e), S;
          case Gn:
            if (Dr)
              return Dr.call(e) == Dr.call(t);
        }
        return !1;
      }
      function d_(e, t, a, s, c, f) {
        var A = a & $, b = Ls(e), C = b.length, k = Ls(t), S = k.length;
        if (C != S && !A)
          return !1;
        for (var I = C; I--; ) {
          var j = b[I];
          if (!(A ? j in t : ye.call(t, j)))
            return !1;
        }
        var q = f.get(e), K = f.get(t);
        if (q && K)
          return q == t && K == e;
        var re = !0;
        f.set(e, t), f.set(t, e);
        for (var Y = A; ++I < C; ) {
          j = b[I];
          var ce = e[j], ue = t[j];
          if (s)
            var bt = A ? s(ue, ce, j, t, e, f) : s(ce, ue, j, e, t, f);
          if (!(bt === i ? ce === ue || c(ce, ue, a, s, f) : bt)) {
            re = !1;
            break;
          }
          Y || (Y = j == "constructor");
        }
        if (re && !Y) {
          var ot = e.constructor, mt = t.constructor;
          ot != mt && "constructor" in e && "constructor" in t && !(typeof ot == "function" && ot instanceof ot && typeof mt == "function" && mt instanceof mt) && (re = !1);
        }
        return f.delete(e), f.delete(t), re;
      }
      function nn(e) {
        return qs(Ld(e, i, Gd), e + "");
      }
      function Ls(e) {
        return Zl(e, qe, Ds);
      }
      function zs(e) {
        return Zl(e, ft, Td);
      }
      var js = zi ? function(e) {
        return zi.get(e);
      } : ro;
      function Ji(e) {
        for (var t = e.name + "", a = ir[t], s = ye.call(ir, t) ? a.length : 0; s--; ) {
          var c = a[s], f = c.func;
          if (f == null || f == e)
            return c.name;
        }
        return t;
      }
      function cr(e) {
        var t = ye.call(u, "placeholder") ? u : e;
        return t.placeholder;
      }
      function H() {
        var e = u.iteratee || to;
        return e = e === to ? Ql : e, arguments.length ? e(arguments[0], arguments[1]) : e;
      }
      function Xi(e, t) {
        var a = e.__data__;
        return __(t) ? a[typeof t == "string" ? "string" : "hash"] : a.map;
      }
      function Bs(e) {
        for (var t = qe(e), a = t.length; a--; ) {
          var s = t[a], c = e[s];
          t[a] = [s, c, Md(c)];
        }
        return t;
      }
      function Pn(e, t) {
        var a = mA(e, t);
        return Xl(a) ? a : i;
      }
      function u_(e) {
        var t = ye.call(e, Sn), a = e[Sn];
        try {
          e[Sn] = i;
          var s = !0;
        } catch {
        }
        var c = $i.call(e);
        return s && (t ? e[Sn] = a : delete e[Sn]), c;
      }
      var Ds = ps ? function(e) {
        return e == null ? [] : (e = be(e), gn(ps(e), function(t) {
          return zl.call(e, t);
        }));
      } : io, Td = ps ? function(e) {
        for (var t = []; e; )
          An(t, Ds(e)), e = Oi(e);
        return t;
      } : io, nt = at;
      (vs && nt(new vs(new ArrayBuffer(1))) != pn || zr && nt(new zr()) != et || gs && nt(gs.resolve()) != Cr || rr && nt(new rr()) != gt || jr && nt(new jr()) != un) && (nt = function(e) {
        var t = at(e), a = t == xt ? e.constructor : i, s = a ? Mn(a) : "";
        if (s)
          switch (s) {
            case KA:
              return pn;
            case YA:
              return et;
            case VA:
              return Cr;
            case ZA:
              return gt;
            case JA:
              return un;
          }
        return t;
      });
      function f_(e, t, a) {
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
              t = tt(t, e + A);
              break;
            case "takeRight":
              e = Be(e, t - A);
              break;
          }
        }
        return { start: e, end: t };
      }
      function p_(e) {
        var t = e.match(Ka);
        return t ? t[1].split(_) : [];
      }
      function Od(e, t, a) {
        t = mn(t, e);
        for (var s = -1, c = t.length, f = !1; ++s < c; ) {
          var A = Gt(t[s]);
          if (!(f = e != null && a(e, A)))
            break;
          e = e[A];
        }
        return f || ++s != c ? f : (c = e == null ? 0 : e.length, !!c && aa(c) && rn(A, c) && (ee(e) || Fn(e)));
      }
      function v_(e) {
        var t = e.length, a = new e.constructor(t);
        return t && typeof e[0] == "string" && ye.call(e, "index") && (a.index = e.index, a.input = e.input), a;
      }
      function Pd(e) {
        return typeof e.constructor == "function" && !Kr(e) ? ar(Oi(e)) : {};
      }
      function g_(e, t, a) {
        var s = e.constructor;
        switch (t) {
          case fn:
            return Ps(e);
          case G:
          case X:
            return new s(+e);
          case pn:
            return Xh(e, a);
          case Hn:
          case Kn:
          case xr:
          case Rr:
          case Er:
          case kr:
          case Sr:
          case $r:
          case Ir:
            return gd(e, a);
          case et:
            return new s();
          case Ct:
          case Zt:
            return new s(e);
          case En:
            return Qh(e);
          case gt:
            return new s();
          case Gn:
            return e_(e);
        }
      }
      function A_(e, t) {
        var a = t.length;
        if (!a)
          return e;
        var s = a - 1;
        return t[s] = (a > 1 ? "& " : "") + t[s], t = t.join(a > 2 ? ", " : " "), e.replace(Ha, `{
/* [wrapped with ` + t + `] */
`);
      }
      function h_(e) {
        return ee(e) || Fn(e) || !!(jl && e && e[jl]);
      }
      function rn(e, t) {
        var a = typeof e;
        return t = t ?? Xe, !!t && (a == "number" || a != "symbol" && Oe.test(e)) && e > -1 && e % 1 == 0 && e < t;
      }
      function st(e, t, a) {
        if (!$e(a))
          return !1;
        var s = typeof t;
        return (s == "number" ? ut(a) && rn(t, a.length) : s == "string" && t in a) ? Dt(a[t], e) : !1;
      }
      function Ws(e, t) {
        if (ee(e))
          return !1;
        var a = typeof e;
        return a == "number" || a == "symbol" || a == "boolean" || e == null || yt(e) ? !0 : Ua.test(e) || !bi.test(e) || t != null && e in be(t);
      }
      function __(e) {
        var t = typeof e;
        return t == "string" || t == "number" || t == "symbol" || t == "boolean" ? e !== "__proto__" : e === null;
      }
      function Ns(e) {
        var t = Ji(e), a = u[t];
        if (typeof a != "function" || !(t in de.prototype))
          return !1;
        if (e === a)
          return !0;
        var s = js(a);
        return !!s && e === s[0];
      }
      function y_(e) {
        return !!Ml && Ml in e;
      }
      var b_ = ki ? an : ao;
      function Kr(e) {
        var t = e && e.constructor, a = typeof t == "function" && t.prototype || nr;
        return e === a;
      }
      function Md(e) {
        return e === e && !$e(e);
      }
      function Fd(e, t) {
        return function(a) {
          return a == null ? !1 : a[e] === t && (t !== i || e in be(a));
        };
      }
      function m_(e) {
        var t = ra(e, function(s) {
          return a.size === m && a.clear(), s;
        }), a = t.cache;
        return t;
      }
      function w_(e, t) {
        var a = e[1], s = t[1], c = a | s, f = c < (O | M | pe), A = s == pe && a == J || s == pe && a == oe && e[7].length <= t[8] || s == (pe | oe) && t[7].length <= t[8] && a == J;
        if (!(f || A))
          return e;
        s & O && (e[2] = t[2], c |= a & O ? 0 : L);
        var b = t[3];
        if (b) {
          var C = e[3];
          e[3] = C ? hd(C, b, t[4]) : b, e[4] = C ? hn(e[3], y) : t[4];
        }
        return b = t[5], b && (C = e[5], e[5] = C ? _d(C, b, t[6]) : b, e[6] = C ? hn(e[5], y) : t[6]), b = t[7], b && (e[7] = b), s & pe && (e[8] = e[8] == null ? t[8] : tt(e[8], t[8])), e[9] == null && (e[9] = t[9]), e[0] = t[0], e[1] = c, e;
      }
      function C_(e) {
        var t = [];
        if (e != null)
          for (var a in be(e))
            t.push(a);
        return t;
      }
      function x_(e) {
        return $i.call(e);
      }
      function Ld(e, t, a) {
        return t = Be(t === i ? e.length - 1 : t, 0), function() {
          for (var s = arguments, c = -1, f = Be(s.length - t, 0), A = x(f); ++c < f; )
            A[c] = s[t + c];
          c = -1;
          for (var b = x(t + 1); ++c < t; )
            b[c] = s[c];
          return b[t] = a(A), At(e, this, b);
        };
      }
      function zd(e, t) {
        return t.length < 2 ? e : On(e, It(t, 0, -1));
      }
      function R_(e, t) {
        for (var a = e.length, s = tt(t.length, a), c = dt(e); s--; ) {
          var f = t[s];
          e[s] = rn(f, a) ? c[f] : i;
        }
        return e;
      }
      function Us(e, t) {
        if (!(t === "constructor" && typeof e[t] == "function") && t != "__proto__")
          return e[t];
      }
      var jd = Dd(od), Yr = DA || function(e, t) {
        return Ye.setTimeout(e, t);
      }, qs = Dd(Yh);
      function Bd(e, t, a) {
        var s = t + "";
        return qs(e, A_(s, E_(p_(s), a)));
      }
      function Dd(e) {
        var t = 0, a = 0;
        return function() {
          var s = qA(), c = ie - (s - a);
          if (a = s, c > 0) {
            if (++t >= V)
              return arguments[0];
          } else
            t = 0;
          return e.apply(i, arguments);
        };
      }
      function Qi(e, t) {
        var a = -1, s = e.length, c = s - 1;
        for (t = t === i ? s : t; ++a < t; ) {
          var f = Es(a, c), A = e[f];
          e[f] = e[a], e[a] = A;
        }
        return e.length = t, e;
      }
      var Wd = m_(function(e) {
        var t = [];
        return e.charCodeAt(0) === 46 && t.push(""), e.replace(qa, function(a, s, c, f) {
          t.push(c ? f.replace(Z, "$1") : s || a);
        }), t;
      });
      function Gt(e) {
        if (typeof e == "string" || yt(e))
          return e;
        var t = e + "";
        return t == "0" && 1 / e == -Ne ? "-0" : t;
      }
      function Mn(e) {
        if (e != null) {
          try {
            return Si.call(e);
          } catch {
          }
          try {
            return e + "";
          } catch {
          }
        }
        return "";
      }
      function E_(e, t) {
        return Et(Vt, function(a) {
          var s = "_." + a[0];
          t & a[1] && !Ci(e, s) && e.push(s);
        }), e.sort();
      }
      function Nd(e) {
        if (e instanceof de)
          return e.clone();
        var t = new St(e.__wrapped__, e.__chain__);
        return t.__actions__ = dt(e.__actions__), t.__index__ = e.__index__, t.__values__ = e.__values__, t;
      }
      function k_(e, t, a) {
        (a ? st(e, t, a) : t === i) ? t = 1 : t = Be(ne(t), 0);
        var s = e == null ? 0 : e.length;
        if (!s || t < 1)
          return [];
        for (var c = 0, f = 0, A = x(Fi(s / t)); c < s; )
          A[f++] = It(e, c, c += t);
        return A;
      }
      function S_(e) {
        for (var t = -1, a = e == null ? 0 : e.length, s = 0, c = []; ++t < a; ) {
          var f = e[t];
          f && (c[s++] = f);
        }
        return c;
      }
      function $_() {
        var e = arguments.length;
        if (!e)
          return [];
        for (var t = x(e - 1), a = arguments[0], s = e; s--; )
          t[s - 1] = arguments[s];
        return An(ee(a) ? dt(a) : [a], Ve(t, 1));
      }
      var I_ = ae(function(e, t) {
        return Me(e) ? Nr(e, Ve(t, 1, Me, !0)) : [];
      }), T_ = ae(function(e, t) {
        var a = Tt(t);
        return Me(a) && (a = i), Me(e) ? Nr(e, Ve(t, 1, Me, !0), H(a, 2)) : [];
      }), O_ = ae(function(e, t) {
        var a = Tt(t);
        return Me(a) && (a = i), Me(e) ? Nr(e, Ve(t, 1, Me, !0), i, a) : [];
      });
      function P_(e, t, a) {
        var s = e == null ? 0 : e.length;
        return s ? (t = a || t === i ? 1 : ne(t), It(e, t < 0 ? 0 : t, s)) : [];
      }
      function M_(e, t, a) {
        var s = e == null ? 0 : e.length;
        return s ? (t = a || t === i ? 1 : ne(t), t = s - t, It(e, 0, t < 0 ? 0 : t)) : [];
      }
      function F_(e, t) {
        return e && e.length ? Gi(e, H(t, 3), !0, !0) : [];
      }
      function L_(e, t) {
        return e && e.length ? Gi(e, H(t, 3), !0) : [];
      }
      function z_(e, t, a, s) {
        var c = e == null ? 0 : e.length;
        return c ? (a && typeof a != "number" && st(e, t, a) && (a = 0, s = c), $h(e, t, a, s)) : [];
      }
      function Ud(e, t, a) {
        var s = e == null ? 0 : e.length;
        if (!s)
          return -1;
        var c = a == null ? 0 : ne(a);
        return c < 0 && (c = Be(s + c, 0)), xi(e, H(t, 3), c);
      }
      function qd(e, t, a) {
        var s = e == null ? 0 : e.length;
        if (!s)
          return -1;
        var c = s - 1;
        return a !== i && (c = ne(a), c = a < 0 ? Be(s + c, 0) : tt(c, s - 1)), xi(e, H(t, 3), c, !0);
      }
      function Gd(e) {
        var t = e == null ? 0 : e.length;
        return t ? Ve(e, 1) : [];
      }
      function j_(e) {
        var t = e == null ? 0 : e.length;
        return t ? Ve(e, Ne) : [];
      }
      function B_(e, t) {
        var a = e == null ? 0 : e.length;
        return a ? (t = t === i ? 1 : ne(t), Ve(e, t)) : [];
      }
      function D_(e) {
        for (var t = -1, a = e == null ? 0 : e.length, s = {}; ++t < a; ) {
          var c = e[t];
          s[c[0]] = c[1];
        }
        return s;
      }
      function Hd(e) {
        return e && e.length ? e[0] : i;
      }
      function W_(e, t, a) {
        var s = e == null ? 0 : e.length;
        if (!s)
          return -1;
        var c = a == null ? 0 : ne(a);
        return c < 0 && (c = Be(s + c, 0)), Xn(e, t, c);
      }
      function N_(e) {
        var t = e == null ? 0 : e.length;
        return t ? It(e, 0, -1) : [];
      }
      var U_ = ae(function(e) {
        var t = Ee(e, Ts);
        return t.length && t[0] === e[0] ? ms(t) : [];
      }), q_ = ae(function(e) {
        var t = Tt(e), a = Ee(e, Ts);
        return t === Tt(a) ? t = i : a.pop(), a.length && a[0] === e[0] ? ms(a, H(t, 2)) : [];
      }), G_ = ae(function(e) {
        var t = Tt(e), a = Ee(e, Ts);
        return t = typeof t == "function" ? t : i, t && a.pop(), a.length && a[0] === e[0] ? ms(a, i, t) : [];
      });
      function H_(e, t) {
        return e == null ? "" : NA.call(e, t);
      }
      function Tt(e) {
        var t = e == null ? 0 : e.length;
        return t ? e[t - 1] : i;
      }
      function K_(e, t, a) {
        var s = e == null ? 0 : e.length;
        if (!s)
          return -1;
        var c = s;
        return a !== i && (c = ne(a), c = c < 0 ? Be(s + c, 0) : tt(c, s - 1)), t === t ? EA(e, t, c) : xi(e, El, c, !0);
      }
      function Y_(e, t) {
        return e && e.length ? rd(e, ne(t)) : i;
      }
      var V_ = ae(Kd);
      function Kd(e, t) {
        return e && e.length && t && t.length ? Rs(e, t) : e;
      }
      function Z_(e, t, a) {
        return e && e.length && t && t.length ? Rs(e, t, H(a, 2)) : e;
      }
      function J_(e, t, a) {
        return e && e.length && t && t.length ? Rs(e, t, i, a) : e;
      }
      var X_ = nn(function(e, t) {
        var a = e == null ? 0 : e.length, s = hs(e, t);
        return sd(e, Ee(t, function(c) {
          return rn(c, a) ? +c : c;
        }).sort(Ad)), s;
      });
      function Q_(e, t) {
        var a = [];
        if (!(e && e.length))
          return a;
        var s = -1, c = [], f = e.length;
        for (t = H(t, 3); ++s < f; ) {
          var A = e[s];
          t(A, s, e) && (a.push(A), c.push(s));
        }
        return sd(e, c), a;
      }
      function Gs(e) {
        return e == null ? e : HA.call(e);
      }
      function ey(e, t, a) {
        var s = e == null ? 0 : e.length;
        return s ? (a && typeof a != "number" && st(e, t, a) ? (t = 0, a = s) : (t = t == null ? 0 : ne(t), a = a === i ? s : ne(a)), It(e, t, a)) : [];
      }
      function ty(e, t) {
        return qi(e, t);
      }
      function ny(e, t, a) {
        return Ss(e, t, H(a, 2));
      }
      function ry(e, t) {
        var a = e == null ? 0 : e.length;
        if (a) {
          var s = qi(e, t);
          if (s < a && Dt(e[s], t))
            return s;
        }
        return -1;
      }
      function iy(e, t) {
        return qi(e, t, !0);
      }
      function ay(e, t, a) {
        return Ss(e, t, H(a, 2), !0);
      }
      function sy(e, t) {
        var a = e == null ? 0 : e.length;
        if (a) {
          var s = qi(e, t, !0) - 1;
          if (Dt(e[s], t))
            return s;
        }
        return -1;
      }
      function oy(e) {
        return e && e.length ? cd(e) : [];
      }
      function cy(e, t) {
        return e && e.length ? cd(e, H(t, 2)) : [];
      }
      function ly(e) {
        var t = e == null ? 0 : e.length;
        return t ? It(e, 1, t) : [];
      }
      function dy(e, t, a) {
        return e && e.length ? (t = a || t === i ? 1 : ne(t), It(e, 0, t < 0 ? 0 : t)) : [];
      }
      function uy(e, t, a) {
        var s = e == null ? 0 : e.length;
        return s ? (t = a || t === i ? 1 : ne(t), t = s - t, It(e, t < 0 ? 0 : t, s)) : [];
      }
      function fy(e, t) {
        return e && e.length ? Gi(e, H(t, 3), !1, !0) : [];
      }
      function py(e, t) {
        return e && e.length ? Gi(e, H(t, 3)) : [];
      }
      var vy = ae(function(e) {
        return bn(Ve(e, 1, Me, !0));
      }), gy = ae(function(e) {
        var t = Tt(e);
        return Me(t) && (t = i), bn(Ve(e, 1, Me, !0), H(t, 2));
      }), Ay = ae(function(e) {
        var t = Tt(e);
        return t = typeof t == "function" ? t : i, bn(Ve(e, 1, Me, !0), i, t);
      });
      function hy(e) {
        return e && e.length ? bn(e) : [];
      }
      function _y(e, t) {
        return e && e.length ? bn(e, H(t, 2)) : [];
      }
      function yy(e, t) {
        return t = typeof t == "function" ? t : i, e && e.length ? bn(e, i, t) : [];
      }
      function Hs(e) {
        if (!(e && e.length))
          return [];
        var t = 0;
        return e = gn(e, function(a) {
          if (Me(a))
            return t = Be(a.length, t), !0;
        }), ls(t, function(a) {
          return Ee(e, ss(a));
        });
      }
      function Yd(e, t) {
        if (!(e && e.length))
          return [];
        var a = Hs(e);
        return t == null ? a : Ee(a, function(s) {
          return At(t, i, s);
        });
      }
      var by = ae(function(e, t) {
        return Me(e) ? Nr(e, t) : [];
      }), my = ae(function(e) {
        return Is(gn(e, Me));
      }), wy = ae(function(e) {
        var t = Tt(e);
        return Me(t) && (t = i), Is(gn(e, Me), H(t, 2));
      }), Cy = ae(function(e) {
        var t = Tt(e);
        return t = typeof t == "function" ? t : i, Is(gn(e, Me), i, t);
      }), xy = ae(Hs);
      function Ry(e, t) {
        return fd(e || [], t || [], Wr);
      }
      function Ey(e, t) {
        return fd(e || [], t || [], Gr);
      }
      var ky = ae(function(e) {
        var t = e.length, a = t > 1 ? e[t - 1] : i;
        return a = typeof a == "function" ? (e.pop(), a) : i, Yd(e, a);
      });
      function Vd(e) {
        var t = u(e);
        return t.__chain__ = !0, t;
      }
      function Sy(e, t) {
        return t(e), e;
      }
      function ea(e, t) {
        return t(e);
      }
      var $y = nn(function(e) {
        var t = e.length, a = t ? e[0] : 0, s = this.__wrapped__, c = function(f) {
          return hs(f, e);
        };
        return t > 1 || this.__actions__.length || !(s instanceof de) || !rn(a) ? this.thru(c) : (s = s.slice(a, +a + (t ? 1 : 0)), s.__actions__.push({
          func: ea,
          args: [c],
          thisArg: i
        }), new St(s, this.__chain__).thru(function(f) {
          return t && !f.length && f.push(i), f;
        }));
      });
      function Iy() {
        return Vd(this);
      }
      function Ty() {
        return new St(this.value(), this.__chain__);
      }
      function Oy() {
        this.__values__ === i && (this.__values__ = lu(this.value()));
        var e = this.__index__ >= this.__values__.length, t = e ? i : this.__values__[this.__index__++];
        return { done: e, value: t };
      }
      function Py() {
        return this;
      }
      function My(e) {
        for (var t, a = this; a instanceof Bi; ) {
          var s = Nd(a);
          s.__index__ = 0, s.__values__ = i, t ? c.__wrapped__ = s : t = s;
          var c = s;
          a = a.__wrapped__;
        }
        return c.__wrapped__ = e, t;
      }
      function Fy() {
        var e = this.__wrapped__;
        if (e instanceof de) {
          var t = e;
          return this.__actions__.length && (t = new de(this)), t = t.reverse(), t.__actions__.push({
            func: ea,
            args: [Gs],
            thisArg: i
          }), new St(t, this.__chain__);
        }
        return this.thru(Gs);
      }
      function Ly() {
        return ud(this.__wrapped__, this.__actions__);
      }
      var zy = Hi(function(e, t, a) {
        ye.call(e, a) ? ++e[a] : en(e, a, 1);
      });
      function jy(e, t, a) {
        var s = ee(e) ? xl : Sh;
        return a && st(e, t, a) && (t = i), s(e, H(t, 3));
      }
      function By(e, t) {
        var a = ee(e) ? gn : Yl;
        return a(e, H(t, 3));
      }
      var Dy = wd(Ud), Wy = wd(qd);
      function Ny(e, t) {
        return Ve(ta(e, t), 1);
      }
      function Uy(e, t) {
        return Ve(ta(e, t), Ne);
      }
      function qy(e, t, a) {
        return a = a === i ? 1 : ne(a), Ve(ta(e, t), a);
      }
      function Zd(e, t) {
        var a = ee(e) ? Et : yn;
        return a(e, H(t, 3));
      }
      function Jd(e, t) {
        var a = ee(e) ? lA : Kl;
        return a(e, H(t, 3));
      }
      var Gy = Hi(function(e, t, a) {
        ye.call(e, a) ? e[a].push(t) : en(e, a, [t]);
      });
      function Hy(e, t, a, s) {
        e = ut(e) ? e : dr(e), a = a && !s ? ne(a) : 0;
        var c = e.length;
        return a < 0 && (a = Be(c + a, 0)), sa(e) ? a <= c && e.indexOf(t, a) > -1 : !!c && Xn(e, t, a) > -1;
      }
      var Ky = ae(function(e, t, a) {
        var s = -1, c = typeof t == "function", f = ut(e) ? x(e.length) : [];
        return yn(e, function(A) {
          f[++s] = c ? At(t, A, a) : Ur(A, t, a);
        }), f;
      }), Yy = Hi(function(e, t, a) {
        en(e, a, t);
      });
      function ta(e, t) {
        var a = ee(e) ? Ee : ed;
        return a(e, H(t, 3));
      }
      function Vy(e, t, a, s) {
        return e == null ? [] : (ee(t) || (t = t == null ? [] : [t]), a = s ? i : a, ee(a) || (a = a == null ? [] : [a]), id(e, t, a));
      }
      var Zy = Hi(function(e, t, a) {
        e[a ? 0 : 1].push(t);
      }, function() {
        return [[], []];
      });
      function Jy(e, t, a) {
        var s = ee(e) ? is : Sl, c = arguments.length < 3;
        return s(e, H(t, 4), a, c, yn);
      }
      function Xy(e, t, a) {
        var s = ee(e) ? dA : Sl, c = arguments.length < 3;
        return s(e, H(t, 4), a, c, Kl);
      }
      function Qy(e, t) {
        var a = ee(e) ? gn : Yl;
        return a(e, ia(H(t, 3)));
      }
      function eb(e) {
        var t = ee(e) ? Ul : Hh;
        return t(e);
      }
      function tb(e, t, a) {
        (a ? st(e, t, a) : t === i) ? t = 1 : t = ne(t);
        var s = ee(e) ? Ch : Kh;
        return s(e, t);
      }
      function nb(e) {
        var t = ee(e) ? xh : Vh;
        return t(e);
      }
      function rb(e) {
        if (e == null)
          return 0;
        if (ut(e))
          return sa(e) ? er(e) : e.length;
        var t = nt(e);
        return t == et || t == gt ? e.size : Cs(e).length;
      }
      function ib(e, t, a) {
        var s = ee(e) ? as : Zh;
        return a && st(e, t, a) && (t = i), s(e, H(t, 3));
      }
      var ab = ae(function(e, t) {
        if (e == null)
          return [];
        var a = t.length;
        return a > 1 && st(e, t[0], t[1]) ? t = [] : a > 2 && st(t[0], t[1], t[2]) && (t = [t[0]]), id(e, Ve(t, 1), []);
      }), na = BA || function() {
        return Ye.Date.now();
      };
      function sb(e, t) {
        if (typeof t != "function")
          throw new kt(p);
        return e = ne(e), function() {
          if (--e < 1)
            return t.apply(this, arguments);
        };
      }
      function Xd(e, t, a) {
        return t = a ? i : t, t = e && t == null ? e.length : t, tn(e, pe, i, i, i, i, t);
      }
      function Qd(e, t) {
        var a;
        if (typeof t != "function")
          throw new kt(p);
        return e = ne(e), function() {
          return --e > 0 && (a = t.apply(this, arguments)), e <= 1 && (t = i), a;
        };
      }
      var Ks = ae(function(e, t, a) {
        var s = O;
        if (a.length) {
          var c = hn(a, cr(Ks));
          s |= _e;
        }
        return tn(e, s, t, a, c);
      }), eu = ae(function(e, t, a) {
        var s = O | M;
        if (a.length) {
          var c = hn(a, cr(eu));
          s |= _e;
        }
        return tn(t, s, e, a, c);
      });
      function tu(e, t, a) {
        t = a ? i : t;
        var s = tn(e, J, i, i, i, i, i, t);
        return s.placeholder = tu.placeholder, s;
      }
      function nu(e, t, a) {
        t = a ? i : t;
        var s = tn(e, te, i, i, i, i, i, t);
        return s.placeholder = nu.placeholder, s;
      }
      function ru(e, t, a) {
        var s, c, f, A, b, C, k = 0, S = !1, I = !1, j = !0;
        if (typeof e != "function")
          throw new kt(p);
        t = Ot(t) || 0, $e(a) && (S = !!a.leading, I = "maxWait" in a, f = I ? Be(Ot(a.maxWait) || 0, t) : f, j = "trailing" in a ? !!a.trailing : j);
        function q(Fe) {
          var Wt = s, on = c;
          return s = c = i, k = Fe, A = e.apply(on, Wt), A;
        }
        function K(Fe) {
          return k = Fe, b = Yr(ce, t), S ? q(Fe) : A;
        }
        function re(Fe) {
          var Wt = Fe - C, on = Fe - k, wu = t - Wt;
          return I ? tt(wu, f - on) : wu;
        }
        function Y(Fe) {
          var Wt = Fe - C, on = Fe - k;
          return C === i || Wt >= t || Wt < 0 || I && on >= f;
        }
        function ce() {
          var Fe = na();
          if (Y(Fe))
            return ue(Fe);
          b = Yr(ce, re(Fe));
        }
        function ue(Fe) {
          return b = i, j && s ? q(Fe) : (s = c = i, A);
        }
        function bt() {
          b !== i && pd(b), k = 0, s = C = c = b = i;
        }
        function ot() {
          return b === i ? A : ue(na());
        }
        function mt() {
          var Fe = na(), Wt = Y(Fe);
          if (s = arguments, c = this, C = Fe, Wt) {
            if (b === i)
              return K(C);
            if (I)
              return pd(b), b = Yr(ce, t), q(C);
          }
          return b === i && (b = Yr(ce, t)), A;
        }
        return mt.cancel = bt, mt.flush = ot, mt;
      }
      var ob = ae(function(e, t) {
        return Hl(e, 1, t);
      }), cb = ae(function(e, t, a) {
        return Hl(e, Ot(t) || 0, a);
      });
      function lb(e) {
        return tn(e, me);
      }
      function ra(e, t) {
        if (typeof e != "function" || t != null && typeof t != "function")
          throw new kt(p);
        var a = function() {
          var s = arguments, c = t ? t.apply(this, s) : s[0], f = a.cache;
          if (f.has(c))
            return f.get(c);
          var A = e.apply(this, s);
          return a.cache = f.set(c, A) || f, A;
        };
        return a.cache = new (ra.Cache || Qt)(), a;
      }
      ra.Cache = Qt;
      function ia(e) {
        if (typeof e != "function")
          throw new kt(p);
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
      function db(e) {
        return Qd(2, e);
      }
      var ub = Jh(function(e, t) {
        t = t.length == 1 && ee(t[0]) ? Ee(t[0], ht(H())) : Ee(Ve(t, 1), ht(H()));
        var a = t.length;
        return ae(function(s) {
          for (var c = -1, f = tt(s.length, a); ++c < f; )
            s[c] = t[c].call(this, s[c]);
          return At(e, this, s);
        });
      }), Ys = ae(function(e, t) {
        var a = hn(t, cr(Ys));
        return tn(e, _e, i, t, a);
      }), iu = ae(function(e, t) {
        var a = hn(t, cr(iu));
        return tn(e, ge, i, t, a);
      }), fb = nn(function(e, t) {
        return tn(e, oe, i, i, i, t);
      });
      function pb(e, t) {
        if (typeof e != "function")
          throw new kt(p);
        return t = t === i ? t : ne(t), ae(e, t);
      }
      function vb(e, t) {
        if (typeof e != "function")
          throw new kt(p);
        return t = t == null ? 0 : Be(ne(t), 0), ae(function(a) {
          var s = a[t], c = wn(a, 0, t);
          return s && An(c, s), At(e, this, c);
        });
      }
      function gb(e, t, a) {
        var s = !0, c = !0;
        if (typeof e != "function")
          throw new kt(p);
        return $e(a) && (s = "leading" in a ? !!a.leading : s, c = "trailing" in a ? !!a.trailing : c), ru(e, t, {
          leading: s,
          maxWait: t,
          trailing: c
        });
      }
      function Ab(e) {
        return Xd(e, 1);
      }
      function hb(e, t) {
        return Ys(Os(t), e);
      }
      function _b() {
        if (!arguments.length)
          return [];
        var e = arguments[0];
        return ee(e) ? e : [e];
      }
      function yb(e) {
        return $t(e, P);
      }
      function bb(e, t) {
        return t = typeof t == "function" ? t : i, $t(e, P, t);
      }
      function mb(e) {
        return $t(e, h | P);
      }
      function wb(e, t) {
        return t = typeof t == "function" ? t : i, $t(e, h | P, t);
      }
      function Cb(e, t) {
        return t == null || Gl(e, t, qe(t));
      }
      function Dt(e, t) {
        return e === t || e !== e && t !== t;
      }
      var xb = Zi(bs), Rb = Zi(function(e, t) {
        return e >= t;
      }), Fn = Jl(/* @__PURE__ */ (function() {
        return arguments;
      })()) ? Jl : function(e) {
        return Pe(e) && ye.call(e, "callee") && !zl.call(e, "callee");
      }, ee = x.isArray, Eb = _l ? ht(_l) : Mh;
      function ut(e) {
        return e != null && aa(e.length) && !an(e);
      }
      function Me(e) {
        return Pe(e) && ut(e);
      }
      function kb(e) {
        return e === !0 || e === !1 || Pe(e) && at(e) == G;
      }
      var Cn = WA || ao, Sb = yl ? ht(yl) : Fh;
      function $b(e) {
        return Pe(e) && e.nodeType === 1 && !Vr(e);
      }
      function Ib(e) {
        if (e == null)
          return !0;
        if (ut(e) && (ee(e) || typeof e == "string" || typeof e.splice == "function" || Cn(e) || lr(e) || Fn(e)))
          return !e.length;
        var t = nt(e);
        if (t == et || t == gt)
          return !e.size;
        if (Kr(e))
          return !Cs(e).length;
        for (var a in e)
          if (ye.call(e, a))
            return !1;
        return !0;
      }
      function Tb(e, t) {
        return qr(e, t);
      }
      function Ob(e, t, a) {
        a = typeof a == "function" ? a : i;
        var s = a ? a(e, t) : i;
        return s === i ? qr(e, t, i, a) : !!s;
      }
      function Vs(e) {
        if (!Pe(e))
          return !1;
        var t = at(e);
        return t == He || t == Te || typeof e.message == "string" && typeof e.name == "string" && !Vr(e);
      }
      function Pb(e) {
        return typeof e == "number" && Bl(e);
      }
      function an(e) {
        if (!$e(e))
          return !1;
        var t = at(e);
        return t == Le || t == it || t == D || t == qn;
      }
      function au(e) {
        return typeof e == "number" && e == ne(e);
      }
      function aa(e) {
        return typeof e == "number" && e > -1 && e % 1 == 0 && e <= Xe;
      }
      function $e(e) {
        var t = typeof e;
        return e != null && (t == "object" || t == "function");
      }
      function Pe(e) {
        return e != null && typeof e == "object";
      }
      var su = bl ? ht(bl) : zh;
      function Mb(e, t) {
        return e === t || ws(e, t, Bs(t));
      }
      function Fb(e, t, a) {
        return a = typeof a == "function" ? a : i, ws(e, t, Bs(t), a);
      }
      function Lb(e) {
        return ou(e) && e != +e;
      }
      function zb(e) {
        if (b_(e))
          throw new Q(d);
        return Xl(e);
      }
      function jb(e) {
        return e === null;
      }
      function Bb(e) {
        return e == null;
      }
      function ou(e) {
        return typeof e == "number" || Pe(e) && at(e) == Ct;
      }
      function Vr(e) {
        if (!Pe(e) || at(e) != xt)
          return !1;
        var t = Oi(e);
        if (t === null)
          return !0;
        var a = ye.call(t, "constructor") && t.constructor;
        return typeof a == "function" && a instanceof a && Si.call(a) == FA;
      }
      var Zs = ml ? ht(ml) : jh;
      function Db(e) {
        return au(e) && e >= -Xe && e <= Xe;
      }
      var cu = wl ? ht(wl) : Bh;
      function sa(e) {
        return typeof e == "string" || !ee(e) && Pe(e) && at(e) == Zt;
      }
      function yt(e) {
        return typeof e == "symbol" || Pe(e) && at(e) == Gn;
      }
      var lr = Cl ? ht(Cl) : Dh;
      function Wb(e) {
        return e === i;
      }
      function Nb(e) {
        return Pe(e) && nt(e) == un;
      }
      function Ub(e) {
        return Pe(e) && at(e) == Ai;
      }
      var qb = Zi(xs), Gb = Zi(function(e, t) {
        return e <= t;
      });
      function lu(e) {
        if (!e)
          return [];
        if (ut(e))
          return sa(e) ? jt(e) : dt(e);
        if (Lr && e[Lr])
          return CA(e[Lr]());
        var t = nt(e), a = t == et ? us : t == gt ? Ri : dr;
        return a(e);
      }
      function sn(e) {
        if (!e)
          return e === 0 ? e : 0;
        if (e = Ot(e), e === Ne || e === -Ne) {
          var t = e < 0 ? -1 : 1;
          return t * dn;
        }
        return e === e ? e : 0;
      }
      function ne(e) {
        var t = sn(e), a = t % 1;
        return t === t ? a ? t - a : t : 0;
      }
      function du(e) {
        return e ? Tn(ne(e), 0, Qe) : 0;
      }
      function Ot(e) {
        if (typeof e == "number")
          return e;
        if (yt(e))
          return Yt;
        if ($e(e)) {
          var t = typeof e.valueOf == "function" ? e.valueOf() : e;
          e = $e(t) ? t + "" : t;
        }
        if (typeof e != "string")
          return e === 0 ? e : +e;
        e = $l(e);
        var a = se.test(e);
        return a || Se.test(e) ? sA(e.slice(2), a ? 2 : 8) : le.test(e) ? Yt : +e;
      }
      function uu(e) {
        return qt(e, ft(e));
      }
      function Hb(e) {
        return e ? Tn(ne(e), -Xe, Xe) : e === 0 ? e : 0;
      }
      function he(e) {
        return e == null ? "" : _t(e);
      }
      var Kb = sr(function(e, t) {
        if (Kr(t) || ut(t)) {
          qt(t, qe(t), e);
          return;
        }
        for (var a in t)
          ye.call(t, a) && Wr(e, a, t[a]);
      }), fu = sr(function(e, t) {
        qt(t, ft(t), e);
      }), oa = sr(function(e, t, a, s) {
        qt(t, ft(t), e, s);
      }), Yb = sr(function(e, t, a, s) {
        qt(t, qe(t), e, s);
      }), Vb = nn(hs);
      function Zb(e, t) {
        var a = ar(e);
        return t == null ? a : ql(a, t);
      }
      var Jb = ae(function(e, t) {
        e = be(e);
        var a = -1, s = t.length, c = s > 2 ? t[2] : i;
        for (c && st(t[0], t[1], c) && (s = 1); ++a < s; )
          for (var f = t[a], A = ft(f), b = -1, C = A.length; ++b < C; ) {
            var k = A[b], S = e[k];
            (S === i || Dt(S, nr[k]) && !ye.call(e, k)) && (e[k] = f[k]);
          }
        return e;
      }), Xb = ae(function(e) {
        return e.push(i, $d), At(pu, i, e);
      });
      function Qb(e, t) {
        return Rl(e, H(t, 3), Ut);
      }
      function em(e, t) {
        return Rl(e, H(t, 3), ys);
      }
      function tm(e, t) {
        return e == null ? e : _s(e, H(t, 3), ft);
      }
      function nm(e, t) {
        return e == null ? e : Vl(e, H(t, 3), ft);
      }
      function rm(e, t) {
        return e && Ut(e, H(t, 3));
      }
      function im(e, t) {
        return e && ys(e, H(t, 3));
      }
      function am(e) {
        return e == null ? [] : Ni(e, qe(e));
      }
      function sm(e) {
        return e == null ? [] : Ni(e, ft(e));
      }
      function Js(e, t, a) {
        var s = e == null ? i : On(e, t);
        return s === i ? a : s;
      }
      function om(e, t) {
        return e != null && Od(e, t, Ih);
      }
      function Xs(e, t) {
        return e != null && Od(e, t, Th);
      }
      var cm = xd(function(e, t, a) {
        t != null && typeof t.toString != "function" && (t = $i.call(t)), e[t] = a;
      }, eo(pt)), lm = xd(function(e, t, a) {
        t != null && typeof t.toString != "function" && (t = $i.call(t)), ye.call(e, t) ? e[t].push(a) : e[t] = [a];
      }, H), dm = ae(Ur);
      function qe(e) {
        return ut(e) ? Nl(e) : Cs(e);
      }
      function ft(e) {
        return ut(e) ? Nl(e, !0) : Wh(e);
      }
      function um(e, t) {
        var a = {};
        return t = H(t, 3), Ut(e, function(s, c, f) {
          en(a, t(s, c, f), s);
        }), a;
      }
      function fm(e, t) {
        var a = {};
        return t = H(t, 3), Ut(e, function(s, c, f) {
          en(a, c, t(s, c, f));
        }), a;
      }
      var pm = sr(function(e, t, a) {
        Ui(e, t, a);
      }), pu = sr(function(e, t, a, s) {
        Ui(e, t, a, s);
      }), vm = nn(function(e, t) {
        var a = {};
        if (e == null)
          return a;
        var s = !1;
        t = Ee(t, function(f) {
          return f = mn(f, e), s || (s = f.length > 1), f;
        }), qt(e, zs(e), a), s && (a = $t(a, h | R | P, c_));
        for (var c = t.length; c--; )
          $s(a, t[c]);
        return a;
      });
      function gm(e, t) {
        return vu(e, ia(H(t)));
      }
      var Am = nn(function(e, t) {
        return e == null ? {} : Uh(e, t);
      });
      function vu(e, t) {
        if (e == null)
          return {};
        var a = Ee(zs(e), function(s) {
          return [s];
        });
        return t = H(t), ad(e, a, function(s, c) {
          return t(s, c[0]);
        });
      }
      function hm(e, t, a) {
        t = mn(t, e);
        var s = -1, c = t.length;
        for (c || (c = 1, e = i); ++s < c; ) {
          var f = e == null ? i : e[Gt(t[s])];
          f === i && (s = c, f = a), e = an(f) ? f.call(e) : f;
        }
        return e;
      }
      function _m(e, t, a) {
        return e == null ? e : Gr(e, t, a);
      }
      function ym(e, t, a, s) {
        return s = typeof s == "function" ? s : i, e == null ? e : Gr(e, t, a, s);
      }
      var gu = kd(qe), Au = kd(ft);
      function bm(e, t, a) {
        var s = ee(e), c = s || Cn(e) || lr(e);
        if (t = H(t, 4), a == null) {
          var f = e && e.constructor;
          c ? a = s ? new f() : [] : $e(e) ? a = an(f) ? ar(Oi(e)) : {} : a = {};
        }
        return (c ? Et : Ut)(e, function(A, b, C) {
          return t(a, A, b, C);
        }), a;
      }
      function mm(e, t) {
        return e == null ? !0 : $s(e, t);
      }
      function wm(e, t, a) {
        return e == null ? e : dd(e, t, Os(a));
      }
      function Cm(e, t, a, s) {
        return s = typeof s == "function" ? s : i, e == null ? e : dd(e, t, Os(a), s);
      }
      function dr(e) {
        return e == null ? [] : ds(e, qe(e));
      }
      function xm(e) {
        return e == null ? [] : ds(e, ft(e));
      }
      function Rm(e, t, a) {
        return a === i && (a = t, t = i), a !== i && (a = Ot(a), a = a === a ? a : 0), t !== i && (t = Ot(t), t = t === t ? t : 0), Tn(Ot(e), t, a);
      }
      function Em(e, t, a) {
        return t = sn(t), a === i ? (a = t, t = 0) : a = sn(a), e = Ot(e), Oh(e, t, a);
      }
      function km(e, t, a) {
        if (a && typeof a != "boolean" && st(e, t, a) && (t = a = i), a === i && (typeof t == "boolean" ? (a = t, t = i) : typeof e == "boolean" && (a = e, e = i)), e === i && t === i ? (e = 0, t = 1) : (e = sn(e), t === i ? (t = e, e = 0) : t = sn(t)), e > t) {
          var s = e;
          e = t, t = s;
        }
        if (a || e % 1 || t % 1) {
          var c = Dl();
          return tt(e + c * (t - e + aA("1e-" + ((c + "").length - 1))), t);
        }
        return Es(e, t);
      }
      var Sm = or(function(e, t, a) {
        return t = t.toLowerCase(), e + (a ? hu(t) : t);
      });
      function hu(e) {
        return Qs(he(e).toLowerCase());
      }
      function _u(e) {
        return e = he(e), e && e.replace(lt, _A).replace(Vg, "");
      }
      function $m(e, t, a) {
        e = he(e), t = _t(t);
        var s = e.length;
        a = a === i ? s : Tn(ne(a), 0, s);
        var c = a;
        return a -= t.length, a >= 0 && e.slice(a, c) == t;
      }
      function Im(e) {
        return e = he(e), e && Wa.test(e) ? e.replace(Vn, yA) : e;
      }
      function Tm(e) {
        return e = he(e), e && mi.test(e) ? e.replace(Zn, "\\$&") : e;
      }
      var Om = or(function(e, t, a) {
        return e + (a ? "-" : "") + t.toLowerCase();
      }), Pm = or(function(e, t, a) {
        return e + (a ? " " : "") + t.toLowerCase();
      }), Mm = md("toLowerCase");
      function Fm(e, t, a) {
        e = he(e), t = ne(t);
        var s = t ? er(e) : 0;
        if (!t || s >= t)
          return e;
        var c = (t - s) / 2;
        return Vi(Li(c), a) + e + Vi(Fi(c), a);
      }
      function Lm(e, t, a) {
        e = he(e), t = ne(t);
        var s = t ? er(e) : 0;
        return t && s < t ? e + Vi(t - s, a) : e;
      }
      function zm(e, t, a) {
        e = he(e), t = ne(t);
        var s = t ? er(e) : 0;
        return t && s < t ? Vi(t - s, a) + e : e;
      }
      function jm(e, t, a) {
        return a || t == null ? t = 0 : t && (t = +t), GA(he(e).replace(Pr, ""), t || 0);
      }
      function Bm(e, t, a) {
        return (a ? st(e, t, a) : t === i) ? t = 1 : t = ne(t), ks(he(e), t);
      }
      function Dm() {
        var e = arguments, t = he(e[0]);
        return e.length < 3 ? t : t.replace(e[1], e[2]);
      }
      var Wm = or(function(e, t, a) {
        return e + (a ? "_" : "") + t.toLowerCase();
      });
      function Nm(e, t, a) {
        return a && typeof a != "number" && st(e, t, a) && (t = a = i), a = a === i ? Qe : a >>> 0, a ? (e = he(e), e && (typeof t == "string" || t != null && !Zs(t)) && (t = _t(t), !t && Qn(e)) ? wn(jt(e), 0, a) : e.split(t, a)) : [];
      }
      var Um = or(function(e, t, a) {
        return e + (a ? " " : "") + Qs(t);
      });
      function qm(e, t, a) {
        return e = he(e), a = a == null ? 0 : Tn(ne(a), 0, e.length), t = _t(t), e.slice(a, a + t.length) == t;
      }
      function Gm(e, t, a) {
        var s = u.templateSettings;
        a && st(e, t, a) && (t = i), e = he(e), t = oa({}, t, s, Sd);
        var c = oa({}, t.imports, s.imports, Sd), f = qe(c), A = ds(c, f), b, C, k = 0, S = t.interpolate || zt, I = "__p += '", j = fs(
          (t.escape || zt).source + "|" + S.source + "|" + (S === Or ? fe : zt).source + "|" + (t.evaluate || zt).source + "|$",
          "g"
        ), q = "//# sourceURL=" + (ye.call(t, "sourceURL") ? (t.sourceURL + "").replace(/\s/g, " ") : "lodash.templateSources[" + ++eA + "]") + `
`;
        e.replace(j, function(Y, ce, ue, bt, ot, mt) {
          return ue || (ue = bt), I += e.slice(k, mt).replace(Jt, bA), ce && (b = !0, I += `' +
__e(` + ce + `) +
'`), ot && (C = !0, I += `';
` + ot + `;
__p += '`), ue && (I += `' +
((__t = (` + ue + `)) == null ? '' : __t) +
'`), k = mt + Y.length, Y;
        }), I += `';
`;
        var K = ye.call(t, "variable") && t.variable;
        if (!K)
          I = `with (obj) {
` + I + `
}
`;
        else if (B.test(K))
          throw new Q(g);
        I = (C ? I.replace(Tr, "") : I).replace(hi, "$1").replace(vn, "$1;"), I = "function(" + (K || "obj") + `) {
` + (K ? "" : `obj || (obj = {});
`) + "var __t, __p = ''" + (b ? ", __e = _.escape" : "") + (C ? `, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
` : `;
`) + I + `return __p
}`;
        var re = bu(function() {
          return ve(f, q + "return " + I).apply(i, A);
        });
        if (re.source = I, Vs(re))
          throw re;
        return re;
      }
      function Hm(e) {
        return he(e).toLowerCase();
      }
      function Km(e) {
        return he(e).toUpperCase();
      }
      function Ym(e, t, a) {
        if (e = he(e), e && (a || t === i))
          return $l(e);
        if (!e || !(t = _t(t)))
          return e;
        var s = jt(e), c = jt(t), f = Il(s, c), A = Tl(s, c) + 1;
        return wn(s, f, A).join("");
      }
      function Vm(e, t, a) {
        if (e = he(e), e && (a || t === i))
          return e.slice(0, Pl(e) + 1);
        if (!e || !(t = _t(t)))
          return e;
        var s = jt(e), c = Tl(s, jt(t)) + 1;
        return wn(s, 0, c).join("");
      }
      function Zm(e, t, a) {
        if (e = he(e), e && (a || t === i))
          return e.replace(Pr, "");
        if (!e || !(t = _t(t)))
          return e;
        var s = jt(e), c = Il(s, jt(t));
        return wn(s, c).join("");
      }
      function Jm(e, t) {
        var a = Ie, s = We;
        if ($e(t)) {
          var c = "separator" in t ? t.separator : c;
          a = "length" in t ? ne(t.length) : a, s = "omission" in t ? _t(t.omission) : s;
        }
        e = he(e);
        var f = e.length;
        if (Qn(e)) {
          var A = jt(e);
          f = A.length;
        }
        if (a >= f)
          return e;
        var b = a - er(s);
        if (b < 1)
          return s;
        var C = A ? wn(A, 0, b).join("") : e.slice(0, b);
        if (c === i)
          return C + s;
        if (A && (b += C.length - b), Zs(c)) {
          if (e.slice(b).search(c)) {
            var k, S = C;
            for (c.global || (c = fs(c.source, he(Ae.exec(c)) + "g")), c.lastIndex = 0; k = c.exec(S); )
              var I = k.index;
            C = C.slice(0, I === i ? b : I);
          }
        } else if (e.indexOf(_t(c), b) != b) {
          var j = C.lastIndexOf(c);
          j > -1 && (C = C.slice(0, j));
        }
        return C + s;
      }
      function Xm(e) {
        return e = he(e), e && _i.test(e) ? e.replace(Yn, kA) : e;
      }
      var Qm = or(function(e, t, a) {
        return e + (a ? " " : "") + t.toUpperCase();
      }), Qs = md("toUpperCase");
      function yu(e, t, a) {
        return e = he(e), t = a ? i : t, t === i ? wA(e) ? IA(e) : pA(e) : e.match(t) || [];
      }
      var bu = ae(function(e, t) {
        try {
          return At(e, i, t);
        } catch (a) {
          return Vs(a) ? a : new Q(a);
        }
      }), ew = nn(function(e, t) {
        return Et(t, function(a) {
          a = Gt(a), en(e, a, Ks(e[a], e));
        }), e;
      });
      function tw(e) {
        var t = e == null ? 0 : e.length, a = H();
        return e = t ? Ee(e, function(s) {
          if (typeof s[1] != "function")
            throw new kt(p);
          return [a(s[0]), s[1]];
        }) : [], ae(function(s) {
          for (var c = -1; ++c < t; ) {
            var f = e[c];
            if (At(f[0], this, s))
              return At(f[1], this, s);
          }
        });
      }
      function nw(e) {
        return kh($t(e, h));
      }
      function eo(e) {
        return function() {
          return e;
        };
      }
      function rw(e, t) {
        return e == null || e !== e ? t : e;
      }
      var iw = Cd(), aw = Cd(!0);
      function pt(e) {
        return e;
      }
      function to(e) {
        return Ql(typeof e == "function" ? e : $t(e, h));
      }
      function sw(e) {
        return td($t(e, h));
      }
      function ow(e, t) {
        return nd(e, $t(t, h));
      }
      var cw = ae(function(e, t) {
        return function(a) {
          return Ur(a, e, t);
        };
      }), lw = ae(function(e, t) {
        return function(a) {
          return Ur(e, a, t);
        };
      });
      function no(e, t, a) {
        var s = qe(t), c = Ni(t, s);
        a == null && !($e(t) && (c.length || !s.length)) && (a = t, t = e, e = this, c = Ni(t, qe(t)));
        var f = !($e(a) && "chain" in a) || !!a.chain, A = an(e);
        return Et(c, function(b) {
          var C = t[b];
          e[b] = C, A && (e.prototype[b] = function() {
            var k = this.__chain__;
            if (f || k) {
              var S = e(this.__wrapped__), I = S.__actions__ = dt(this.__actions__);
              return I.push({ func: C, args: arguments, thisArg: e }), S.__chain__ = k, S;
            }
            return C.apply(e, An([this.value()], arguments));
          });
        }), e;
      }
      function dw() {
        return Ye._ === this && (Ye._ = LA), this;
      }
      function ro() {
      }
      function uw(e) {
        return e = ne(e), ae(function(t) {
          return rd(t, e);
        });
      }
      var fw = Ms(Ee), pw = Ms(xl), vw = Ms(as);
      function mu(e) {
        return Ws(e) ? ss(Gt(e)) : qh(e);
      }
      function gw(e) {
        return function(t) {
          return e == null ? i : On(e, t);
        };
      }
      var Aw = Rd(), hw = Rd(!0);
      function io() {
        return [];
      }
      function ao() {
        return !1;
      }
      function _w() {
        return {};
      }
      function yw() {
        return "";
      }
      function bw() {
        return !0;
      }
      function mw(e, t) {
        if (e = ne(e), e < 1 || e > Xe)
          return [];
        var a = Qe, s = tt(e, Qe);
        t = H(t), e -= Qe;
        for (var c = ls(s, t); ++a < e; )
          t(a);
        return c;
      }
      function ww(e) {
        return ee(e) ? Ee(e, Gt) : yt(e) ? [e] : dt(Wd(he(e)));
      }
      function Cw(e) {
        var t = ++MA;
        return he(e) + t;
      }
      var xw = Yi(function(e, t) {
        return e + t;
      }, 0), Rw = Fs("ceil"), Ew = Yi(function(e, t) {
        return e / t;
      }, 1), kw = Fs("floor");
      function Sw(e) {
        return e && e.length ? Wi(e, pt, bs) : i;
      }
      function $w(e, t) {
        return e && e.length ? Wi(e, H(t, 2), bs) : i;
      }
      function Iw(e) {
        return kl(e, pt);
      }
      function Tw(e, t) {
        return kl(e, H(t, 2));
      }
      function Ow(e) {
        return e && e.length ? Wi(e, pt, xs) : i;
      }
      function Pw(e, t) {
        return e && e.length ? Wi(e, H(t, 2), xs) : i;
      }
      var Mw = Yi(function(e, t) {
        return e * t;
      }, 1), Fw = Fs("round"), Lw = Yi(function(e, t) {
        return e - t;
      }, 0);
      function zw(e) {
        return e && e.length ? cs(e, pt) : 0;
      }
      function jw(e, t) {
        return e && e.length ? cs(e, H(t, 2)) : 0;
      }
      return u.after = sb, u.ary = Xd, u.assign = Kb, u.assignIn = fu, u.assignInWith = oa, u.assignWith = Yb, u.at = Vb, u.before = Qd, u.bind = Ks, u.bindAll = ew, u.bindKey = eu, u.castArray = _b, u.chain = Vd, u.chunk = k_, u.compact = S_, u.concat = $_, u.cond = tw, u.conforms = nw, u.constant = eo, u.countBy = zy, u.create = Zb, u.curry = tu, u.curryRight = nu, u.debounce = ru, u.defaults = Jb, u.defaultsDeep = Xb, u.defer = ob, u.delay = cb, u.difference = I_, u.differenceBy = T_, u.differenceWith = O_, u.drop = P_, u.dropRight = M_, u.dropRightWhile = F_, u.dropWhile = L_, u.fill = z_, u.filter = By, u.flatMap = Ny, u.flatMapDeep = Uy, u.flatMapDepth = qy, u.flatten = Gd, u.flattenDeep = j_, u.flattenDepth = B_, u.flip = lb, u.flow = iw, u.flowRight = aw, u.fromPairs = D_, u.functions = am, u.functionsIn = sm, u.groupBy = Gy, u.initial = N_, u.intersection = U_, u.intersectionBy = q_, u.intersectionWith = G_, u.invert = cm, u.invertBy = lm, u.invokeMap = Ky, u.iteratee = to, u.keyBy = Yy, u.keys = qe, u.keysIn = ft, u.map = ta, u.mapKeys = um, u.mapValues = fm, u.matches = sw, u.matchesProperty = ow, u.memoize = ra, u.merge = pm, u.mergeWith = pu, u.method = cw, u.methodOf = lw, u.mixin = no, u.negate = ia, u.nthArg = uw, u.omit = vm, u.omitBy = gm, u.once = db, u.orderBy = Vy, u.over = fw, u.overArgs = ub, u.overEvery = pw, u.overSome = vw, u.partial = Ys, u.partialRight = iu, u.partition = Zy, u.pick = Am, u.pickBy = vu, u.property = mu, u.propertyOf = gw, u.pull = V_, u.pullAll = Kd, u.pullAllBy = Z_, u.pullAllWith = J_, u.pullAt = X_, u.range = Aw, u.rangeRight = hw, u.rearg = fb, u.reject = Qy, u.remove = Q_, u.rest = pb, u.reverse = Gs, u.sampleSize = tb, u.set = _m, u.setWith = ym, u.shuffle = nb, u.slice = ey, u.sortBy = ab, u.sortedUniq = oy, u.sortedUniqBy = cy, u.split = Nm, u.spread = vb, u.tail = ly, u.take = dy, u.takeRight = uy, u.takeRightWhile = fy, u.takeWhile = py, u.tap = Sy, u.throttle = gb, u.thru = ea, u.toArray = lu, u.toPairs = gu, u.toPairsIn = Au, u.toPath = ww, u.toPlainObject = uu, u.transform = bm, u.unary = Ab, u.union = vy, u.unionBy = gy, u.unionWith = Ay, u.uniq = hy, u.uniqBy = _y, u.uniqWith = yy, u.unset = mm, u.unzip = Hs, u.unzipWith = Yd, u.update = wm, u.updateWith = Cm, u.values = dr, u.valuesIn = xm, u.without = by, u.words = yu, u.wrap = hb, u.xor = my, u.xorBy = wy, u.xorWith = Cy, u.zip = xy, u.zipObject = Ry, u.zipObjectDeep = Ey, u.zipWith = ky, u.entries = gu, u.entriesIn = Au, u.extend = fu, u.extendWith = oa, no(u, u), u.add = xw, u.attempt = bu, u.camelCase = Sm, u.capitalize = hu, u.ceil = Rw, u.clamp = Rm, u.clone = yb, u.cloneDeep = mb, u.cloneDeepWith = wb, u.cloneWith = bb, u.conformsTo = Cb, u.deburr = _u, u.defaultTo = rw, u.divide = Ew, u.endsWith = $m, u.eq = Dt, u.escape = Im, u.escapeRegExp = Tm, u.every = jy, u.find = Dy, u.findIndex = Ud, u.findKey = Qb, u.findLast = Wy, u.findLastIndex = qd, u.findLastKey = em, u.floor = kw, u.forEach = Zd, u.forEachRight = Jd, u.forIn = tm, u.forInRight = nm, u.forOwn = rm, u.forOwnRight = im, u.get = Js, u.gt = xb, u.gte = Rb, u.has = om, u.hasIn = Xs, u.head = Hd, u.identity = pt, u.includes = Hy, u.indexOf = W_, u.inRange = Em, u.invoke = dm, u.isArguments = Fn, u.isArray = ee, u.isArrayBuffer = Eb, u.isArrayLike = ut, u.isArrayLikeObject = Me, u.isBoolean = kb, u.isBuffer = Cn, u.isDate = Sb, u.isElement = $b, u.isEmpty = Ib, u.isEqual = Tb, u.isEqualWith = Ob, u.isError = Vs, u.isFinite = Pb, u.isFunction = an, u.isInteger = au, u.isLength = aa, u.isMap = su, u.isMatch = Mb, u.isMatchWith = Fb, u.isNaN = Lb, u.isNative = zb, u.isNil = Bb, u.isNull = jb, u.isNumber = ou, u.isObject = $e, u.isObjectLike = Pe, u.isPlainObject = Vr, u.isRegExp = Zs, u.isSafeInteger = Db, u.isSet = cu, u.isString = sa, u.isSymbol = yt, u.isTypedArray = lr, u.isUndefined = Wb, u.isWeakMap = Nb, u.isWeakSet = Ub, u.join = H_, u.kebabCase = Om, u.last = Tt, u.lastIndexOf = K_, u.lowerCase = Pm, u.lowerFirst = Mm, u.lt = qb, u.lte = Gb, u.max = Sw, u.maxBy = $w, u.mean = Iw, u.meanBy = Tw, u.min = Ow, u.minBy = Pw, u.stubArray = io, u.stubFalse = ao, u.stubObject = _w, u.stubString = yw, u.stubTrue = bw, u.multiply = Mw, u.nth = Y_, u.noConflict = dw, u.noop = ro, u.now = na, u.pad = Fm, u.padEnd = Lm, u.padStart = zm, u.parseInt = jm, u.random = km, u.reduce = Jy, u.reduceRight = Xy, u.repeat = Bm, u.replace = Dm, u.result = hm, u.round = Fw, u.runInContext = w, u.sample = eb, u.size = rb, u.snakeCase = Wm, u.some = ib, u.sortedIndex = ty, u.sortedIndexBy = ny, u.sortedIndexOf = ry, u.sortedLastIndex = iy, u.sortedLastIndexBy = ay, u.sortedLastIndexOf = sy, u.startCase = Um, u.startsWith = qm, u.subtract = Lw, u.sum = zw, u.sumBy = jw, u.template = Gm, u.times = mw, u.toFinite = sn, u.toInteger = ne, u.toLength = du, u.toLower = Hm, u.toNumber = Ot, u.toSafeInteger = Hb, u.toString = he, u.toUpper = Km, u.trim = Ym, u.trimEnd = Vm, u.trimStart = Zm, u.truncate = Jm, u.unescape = Xm, u.uniqueId = Cw, u.upperCase = Qm, u.upperFirst = Qs, u.each = Zd, u.eachRight = Jd, u.first = Hd, no(u, (function() {
        var e = {};
        return Ut(u, function(t, a) {
          ye.call(u.prototype, a) || (e[a] = t);
        }), e;
      })(), { chain: !1 }), u.VERSION = o, Et(["bind", "bindKey", "curry", "curryRight", "partial", "partialRight"], function(e) {
        u[e].placeholder = u;
      }), Et(["drop", "take"], function(e, t) {
        de.prototype[e] = function(a) {
          a = a === i ? 1 : Be(ne(a), 0);
          var s = this.__filtered__ && !t ? new de(this) : this.clone();
          return s.__filtered__ ? s.__takeCount__ = tt(a, s.__takeCount__) : s.__views__.push({
            size: tt(a, Qe),
            type: e + (s.__dir__ < 0 ? "Right" : "")
          }), s;
        }, de.prototype[e + "Right"] = function(a) {
          return this.reverse()[e](a).reverse();
        };
      }), Et(["filter", "map", "takeWhile"], function(e, t) {
        var a = t + 1, s = a == ke || a == Lt;
        de.prototype[e] = function(c) {
          var f = this.clone();
          return f.__iteratees__.push({
            iteratee: H(c, 3),
            type: a
          }), f.__filtered__ = f.__filtered__ || s, f;
        };
      }), Et(["head", "last"], function(e, t) {
        var a = "take" + (t ? "Right" : "");
        de.prototype[e] = function() {
          return this[a](1).value()[0];
        };
      }), Et(["initial", "tail"], function(e, t) {
        var a = "drop" + (t ? "" : "Right");
        de.prototype[e] = function() {
          return this.__filtered__ ? new de(this) : this[a](1);
        };
      }), de.prototype.compact = function() {
        return this.filter(pt);
      }, de.prototype.find = function(e) {
        return this.filter(e).head();
      }, de.prototype.findLast = function(e) {
        return this.reverse().find(e);
      }, de.prototype.invokeMap = ae(function(e, t) {
        return typeof e == "function" ? new de(this) : this.map(function(a) {
          return Ur(a, e, t);
        });
      }), de.prototype.reject = function(e) {
        return this.filter(ia(H(e)));
      }, de.prototype.slice = function(e, t) {
        e = ne(e);
        var a = this;
        return a.__filtered__ && (e > 0 || t < 0) ? new de(a) : (e < 0 ? a = a.takeRight(-e) : e && (a = a.drop(e)), t !== i && (t = ne(t), a = t < 0 ? a.dropRight(-t) : a.take(t - e)), a);
      }, de.prototype.takeRightWhile = function(e) {
        return this.reverse().takeWhile(e).reverse();
      }, de.prototype.toArray = function() {
        return this.take(Qe);
      }, Ut(de.prototype, function(e, t) {
        var a = /^(?:filter|find|map|reject)|While$/.test(t), s = /^(?:head|last)$/.test(t), c = u[s ? "take" + (t == "last" ? "Right" : "") : t], f = s || /^find/.test(t);
        c && (u.prototype[t] = function() {
          var A = this.__wrapped__, b = s ? [1] : arguments, C = A instanceof de, k = b[0], S = C || ee(A), I = function(ce) {
            var ue = c.apply(u, An([ce], b));
            return s && j ? ue[0] : ue;
          };
          S && a && typeof k == "function" && k.length != 1 && (C = S = !1);
          var j = this.__chain__, q = !!this.__actions__.length, K = f && !j, re = C && !q;
          if (!f && S) {
            A = re ? A : new de(this);
            var Y = e.apply(A, b);
            return Y.__actions__.push({ func: ea, args: [I], thisArg: i }), new St(Y, j);
          }
          return K && re ? e.apply(this, b) : (Y = this.thru(I), K ? s ? Y.value()[0] : Y.value() : Y);
        });
      }), Et(["pop", "push", "shift", "sort", "splice", "unshift"], function(e) {
        var t = Ei[e], a = /^(?:push|sort|unshift)$/.test(e) ? "tap" : "thru", s = /^(?:pop|shift)$/.test(e);
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
      }), Ut(de.prototype, function(e, t) {
        var a = u[t];
        if (a) {
          var s = a.name + "";
          ye.call(ir, s) || (ir[s] = []), ir[s].push({ name: t, func: a });
        }
      }), ir[Ki(i, M).name] = [{
        name: "wrapper",
        func: i
      }], de.prototype.clone = XA, de.prototype.reverse = QA, de.prototype.value = eh, u.prototype.at = $y, u.prototype.chain = Iy, u.prototype.commit = Ty, u.prototype.next = Oy, u.prototype.plant = My, u.prototype.reverse = Fy, u.prototype.toJSON = u.prototype.valueOf = u.prototype.value = Ly, u.prototype.first = u.prototype.head, Lr && (u.prototype[Lr] = Py), u;
    }), tr = TA();
    kn ? ((kn.exports = tr)._ = tr, ts._ = tr) : Ye._ = tr;
  }).call(cn);
})(Fu, Fu.exports);
var Bn = { exports: {} };
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
})(Bn, Bn.exports);
class uj extends Bn.exports.BaseError {
  constructor() {
    super("The browser you are using isn't compatible with this application, or HTTPS is not being used on a non-localhost domain.");
  }
}
class fj extends Bn.exports.BaseError {
  constructor(r, i, o) {
    super(`Could not fetch web worker from ${r}`), this.url = r, this.response = i, this.originalError = o ?? null;
  }
}
class pj extends Bn.exports.BaseError {
  constructor() {
    super("Invalid input passed");
  }
}
class vj extends Bn.exports.BaseError {
  constructor(r) {
    super("Invalid mime type found on asset"), this.mimeType = r;
  }
}
class gj extends Bn.exports.BaseError {
  constructor(r, i, o) {
    super(`Could not fetch resource from ${r}`), this.url = r, this.response = i, this.originalError = o ?? null;
  }
}
ln("c2pa:Validator");
function a2() {
  this.__data__ = [], this.size = 0;
}
var s2 = a2;
function o2(n, r) {
  return n === r || n !== n && r !== r;
}
var ci = o2, c2 = ci;
function l2(n, r) {
  for (var i = n.length; i--; )
    if (c2(n[i][0], r))
      return i;
  return -1;
}
var ba = l2, d2 = ba, u2 = Array.prototype, f2 = u2.splice;
function p2(n) {
  var r = this.__data__, i = d2(r, n);
  if (i < 0)
    return !1;
  var o = r.length - 1;
  return i == o ? r.pop() : f2.call(r, i, 1), --this.size, !0;
}
var v2 = p2, g2 = ba;
function A2(n) {
  var r = this.__data__, i = g2(r, n);
  return i < 0 ? void 0 : r[i][1];
}
var h2 = A2, _2 = ba;
function y2(n) {
  return _2(this.__data__, n) > -1;
}
var b2 = y2, m2 = ba;
function w2(n, r) {
  var i = this.__data__, o = m2(i, n);
  return o < 0 ? (++this.size, i.push([n, r])) : i[o][1] = r, this;
}
var C2 = w2, x2 = s2, R2 = v2, E2 = h2, k2 = b2, S2 = C2;
function pr(n) {
  var r = -1, i = n == null ? 0 : n.length;
  for (this.clear(); ++r < i; ) {
    var o = n[r];
    this.set(o[0], o[1]);
  }
}
pr.prototype.clear = x2;
pr.prototype.delete = R2;
pr.prototype.get = E2;
pr.prototype.has = k2;
pr.prototype.set = S2;
var ma = pr, $2 = ma;
function I2() {
  this.__data__ = new $2(), this.size = 0;
}
var T2 = I2;
function O2(n) {
  var r = this.__data__, i = r.delete(n);
  return this.size = r.size, i;
}
var P2 = O2;
function M2(n) {
  return this.__data__.get(n);
}
var F2 = M2;
function L2(n) {
  return this.__data__.has(n);
}
var z2 = L2, j2 = typeof cn == "object" && cn && cn.Object === Object && cn, nv = j2, B2 = nv, D2 = typeof self == "object" && self && self.Object === Object && self, W2 = B2 || D2 || Function("return this")(), vt = W2, lo, Lu;
function vr() {
  if (Lu) return lo;
  Lu = 1;
  var n = vt, r = n.Symbol;
  return lo = r, lo;
}
var zu = vr(), rv = Object.prototype, N2 = rv.hasOwnProperty, U2 = rv.toString, Zr = zu ? zu.toStringTag : void 0;
function q2(n) {
  var r = N2.call(n, Zr), i = n[Zr];
  try {
    n[Zr] = void 0;
    var o = !0;
  } catch {
  }
  var l = U2.call(n);
  return o && (r ? n[Zr] = i : delete n[Zr]), l;
}
var G2 = q2, H2 = Object.prototype, K2 = H2.toString;
function Y2(n) {
  return K2.call(n);
}
var V2 = Y2, ju = vr(), Z2 = G2, J2 = V2, X2 = "[object Null]", Q2 = "[object Undefined]", Bu = ju ? ju.toStringTag : void 0;
function e1(n) {
  return n == null ? n === void 0 ? Q2 : X2 : Bu && Bu in Object(n) ? Z2(n) : J2(n);
}
var Wn = e1;
function t1(n) {
  var r = typeof n;
  return n != null && (r == "object" || r == "function");
}
var Nt = t1, n1 = Wn, r1 = Nt, i1 = "[object AsyncFunction]", a1 = "[object Function]", s1 = "[object GeneratorFunction]", o1 = "[object Proxy]";
function c1(n) {
  if (!r1(n))
    return !1;
  var r = n1(n);
  return r == a1 || r == s1 || r == i1 || r == o1;
}
var wa = c1, l1 = vt, d1 = l1["__core-js_shared__"], u1 = d1, uo = u1, Du = (function() {
  var n = /[^.]+$/.exec(uo && uo.keys && uo.keys.IE_PROTO || "");
  return n ? "Symbol(src)_1." + n : "";
})();
function f1(n) {
  return !!Du && Du in n;
}
var p1 = f1, v1 = Function.prototype, g1 = v1.toString;
function A1(n) {
  if (n != null) {
    try {
      return g1.call(n);
    } catch {
    }
    try {
      return n + "";
    } catch {
    }
  }
  return "";
}
var iv = A1, h1 = wa, _1 = p1, y1 = Nt, b1 = iv, m1 = /[\\^$.*+?()[\]{}|]/g, w1 = /^\[object .+?Constructor\]$/, C1 = Function.prototype, x1 = Object.prototype, R1 = C1.toString, E1 = x1.hasOwnProperty, k1 = RegExp(
  "^" + R1.call(E1).replace(m1, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function S1(n) {
  if (!y1(n) || _1(n))
    return !1;
  var r = h1(n) ? k1 : w1;
  return r.test(b1(n));
}
var $1 = S1;
function I1(n, r) {
  return n == null ? void 0 : n[r];
}
var T1 = I1, O1 = $1, P1 = T1;
function M1(n, r) {
  var i = P1(n, r);
  return O1(i) ? i : void 0;
}
var Nn = M1, F1 = Nn, L1 = vt, z1 = F1(L1, "Map"), Sc = z1, j1 = Nn, B1 = j1(Object, "create"), Ca = B1, Wu = Ca;
function D1() {
  this.__data__ = Wu ? Wu(null) : {}, this.size = 0;
}
var W1 = D1;
function N1(n) {
  var r = this.has(n) && delete this.__data__[n];
  return this.size -= r ? 1 : 0, r;
}
var U1 = N1, q1 = Ca, G1 = "__lodash_hash_undefined__", H1 = Object.prototype, K1 = H1.hasOwnProperty;
function Y1(n) {
  var r = this.__data__;
  if (q1) {
    var i = r[n];
    return i === G1 ? void 0 : i;
  }
  return K1.call(r, n) ? r[n] : void 0;
}
var V1 = Y1, Z1 = Ca, J1 = Object.prototype, X1 = J1.hasOwnProperty;
function Q1(n) {
  var r = this.__data__;
  return Z1 ? r[n] !== void 0 : X1.call(r, n);
}
var e0 = Q1, t0 = Ca, n0 = "__lodash_hash_undefined__";
function r0(n, r) {
  var i = this.__data__;
  return this.size += this.has(n) ? 0 : 1, i[n] = t0 && r === void 0 ? n0 : r, this;
}
var i0 = r0, a0 = W1, s0 = U1, o0 = V1, c0 = e0, l0 = i0;
function gr(n) {
  var r = -1, i = n == null ? 0 : n.length;
  for (this.clear(); ++r < i; ) {
    var o = n[r];
    this.set(o[0], o[1]);
  }
}
gr.prototype.clear = a0;
gr.prototype.delete = s0;
gr.prototype.get = o0;
gr.prototype.has = c0;
gr.prototype.set = l0;
var d0 = gr, Nu = d0, u0 = ma, f0 = Sc;
function p0() {
  this.size = 0, this.__data__ = {
    hash: new Nu(),
    map: new (f0 || u0)(),
    string: new Nu()
  };
}
var v0 = p0;
function g0(n) {
  var r = typeof n;
  return r == "string" || r == "number" || r == "symbol" || r == "boolean" ? n !== "__proto__" : n === null;
}
var A0 = g0, h0 = A0;
function _0(n, r) {
  var i = n.__data__;
  return h0(r) ? i[typeof r == "string" ? "string" : "hash"] : i.map;
}
var xa = _0, y0 = xa;
function b0(n) {
  var r = y0(this, n).delete(n);
  return this.size -= r ? 1 : 0, r;
}
var m0 = b0, w0 = xa;
function C0(n) {
  return w0(this, n).get(n);
}
var x0 = C0, R0 = xa;
function E0(n) {
  return R0(this, n).has(n);
}
var k0 = E0, S0 = xa;
function $0(n, r) {
  var i = S0(this, n), o = i.size;
  return i.set(n, r), this.size += i.size == o ? 0 : 1, this;
}
var I0 = $0, T0 = v0, O0 = m0, P0 = x0, M0 = k0, F0 = I0;
function Ar(n) {
  var r = -1, i = n == null ? 0 : n.length;
  for (this.clear(); ++r < i; ) {
    var o = n[r];
    this.set(o[0], o[1]);
  }
}
Ar.prototype.clear = T0;
Ar.prototype.delete = O0;
Ar.prototype.get = P0;
Ar.prototype.has = M0;
Ar.prototype.set = F0;
var $c = Ar, L0 = ma, z0 = Sc, j0 = $c, B0 = 200;
function D0(n, r) {
  var i = this.__data__;
  if (i instanceof L0) {
    var o = i.__data__;
    if (!z0 || o.length < B0 - 1)
      return o.push([n, r]), this.size = ++i.size, this;
    i = this.__data__ = new j0(o);
  }
  return i.set(n, r), this.size = i.size, this;
}
var W0 = D0, N0 = ma, U0 = T2, q0 = P2, G0 = F2, H0 = z2, K0 = W0;
function hr(n) {
  var r = this.__data__ = new N0(n);
  this.size = r.size;
}
hr.prototype.clear = U0;
hr.prototype.delete = q0;
hr.prototype.get = G0;
hr.prototype.has = H0;
hr.prototype.set = K0;
var Ra = hr, Y0 = Nn, V0 = (function() {
  try {
    var n = Y0(Object, "defineProperty");
    return n({}, "", {}), n;
  } catch {
  }
})(), av = V0, Uu = av;
function Z0(n, r, i) {
  r == "__proto__" && Uu ? Uu(n, r, {
    configurable: !0,
    enumerable: !0,
    value: i,
    writable: !0
  }) : n[r] = i;
}
var Ea = Z0, J0 = Ea, X0 = ci;
function Q0(n, r, i) {
  (i !== void 0 && !X0(n[r], i) || i === void 0 && !(r in n)) && J0(n, r, i);
}
var sv = Q0;
function eC(n) {
  return function(r, i, o) {
    for (var l = -1, d = Object(r), p = o(r), g = p.length; g--; ) {
      var v = p[n ? g : ++l];
      if (i(d[v], v, d) === !1)
        break;
    }
    return r;
  };
}
var tC = eC, nC = tC, rC = nC(), ov = rC, va = { exports: {} };
(function(n, r) {
  var i = vt, o = r && !r.nodeType && r, l = o && !0 && n && !n.nodeType && n, d = l && l.exports === o, p = d ? i.Buffer : void 0, g = p ? p.allocUnsafe : void 0;
  function v(m, y) {
    if (y)
      return m.slice();
    var h = m.length, R = g ? g(h) : new m.constructor(h);
    return m.copy(R), R;
  }
  n.exports = v;
})(va, va.exports);
var iC = vt, aC = iC.Uint8Array, cv = aC, qu = cv;
function sC(n) {
  var r = new n.constructor(n.byteLength);
  return new qu(r).set(new qu(n)), r;
}
var Ic = sC, oC = Ic;
function cC(n, r) {
  var i = r ? oC(n.buffer) : n.buffer;
  return new n.constructor(i, n.byteOffset, n.length);
}
var lv = cC;
function lC(n, r) {
  var i = -1, o = n.length;
  for (r || (r = Array(o)); ++i < o; )
    r[i] = n[i];
  return r;
}
var li = lC, dC = Nt, Gu = Object.create, uC = /* @__PURE__ */ (function() {
  function n() {
  }
  return function(r) {
    if (!dC(r))
      return {};
    if (Gu)
      return Gu(r);
    n.prototype = r;
    var i = new n();
    return n.prototype = void 0, i;
  };
})(), ka = uC;
function fC(n, r) {
  return function(i) {
    return n(r(i));
  };
}
var dv = fC, pC = dv, vC = pC(Object.getPrototypeOf, Object), Tc = vC, gC = Object.prototype;
function AC(n) {
  var r = n && n.constructor, i = typeof r == "function" && r.prototype || gC;
  return n === i;
}
var Oc = AC, hC = ka, _C = Tc, yC = Oc;
function bC(n) {
  return typeof n.constructor == "function" && !yC(n) ? hC(_C(n)) : {};
}
var uv = bC;
function mC(n) {
  return n != null && typeof n == "object";
}
var Ft = mC, wC = Wn, CC = Ft, xC = "[object Arguments]";
function RC(n) {
  return CC(n) && wC(n) == xC;
}
var EC = RC, Hu = EC, kC = Ft, fv = Object.prototype, SC = fv.hasOwnProperty, $C = fv.propertyIsEnumerable, IC = Hu(/* @__PURE__ */ (function() {
  return arguments;
})()) ? Hu : function(n) {
  return kC(n) && SC.call(n, "callee") && !$C.call(n, "callee");
}, Sa = IC, TC = Array.isArray, Je = TC, OC = 9007199254740991;
function PC(n) {
  return typeof n == "number" && n > -1 && n % 1 == 0 && n <= OC;
}
var Pc = PC, MC = wa, FC = Pc;
function LC(n) {
  return n != null && FC(n.length) && !MC(n);
}
var _r = LC, zC = _r, jC = Ft;
function BC(n) {
  return jC(n) && zC(n);
}
var DC = BC, ur = { exports: {} };
function WC() {
  return !1;
}
var NC = WC;
(function(n, r) {
  var i = vt, o = NC, l = r && !r.nodeType && r, d = l && !0 && n && !n.nodeType && n, p = d && d.exports === l, g = p ? i.Buffer : void 0, v = g ? g.isBuffer : void 0, m = v || o;
  n.exports = m;
})(ur, ur.exports);
var UC = Wn, qC = Tc, GC = Ft, HC = "[object Object]", KC = Function.prototype, YC = Object.prototype, pv = KC.toString, VC = YC.hasOwnProperty, ZC = pv.call(Object);
function JC(n) {
  if (!GC(n) || UC(n) != HC)
    return !1;
  var r = qC(n);
  if (r === null)
    return !0;
  var i = VC.call(r, "constructor") && r.constructor;
  return typeof i == "function" && i instanceof i && pv.call(i) == ZC;
}
var vv = JC, XC = Wn, QC = Pc, ex = Ft, tx = "[object Arguments]", nx = "[object Array]", rx = "[object Boolean]", ix = "[object Date]", ax = "[object Error]", sx = "[object Function]", ox = "[object Map]", cx = "[object Number]", lx = "[object Object]", dx = "[object RegExp]", ux = "[object Set]", fx = "[object String]", px = "[object WeakMap]", vx = "[object ArrayBuffer]", gx = "[object DataView]", Ax = "[object Float32Array]", hx = "[object Float64Array]", _x = "[object Int8Array]", yx = "[object Int16Array]", bx = "[object Int32Array]", mx = "[object Uint8Array]", wx = "[object Uint8ClampedArray]", Cx = "[object Uint16Array]", xx = "[object Uint32Array]", Re = {};
Re[Ax] = Re[hx] = Re[_x] = Re[yx] = Re[bx] = Re[mx] = Re[wx] = Re[Cx] = Re[xx] = !0;
Re[tx] = Re[nx] = Re[vx] = Re[rx] = Re[gx] = Re[ix] = Re[ax] = Re[sx] = Re[ox] = Re[cx] = Re[lx] = Re[dx] = Re[ux] = Re[fx] = Re[px] = !1;
function Rx(n) {
  return ex(n) && QC(n.length) && !!Re[XC(n)];
}
var Ex = Rx, fo, Ku;
function $a() {
  if (Ku) return fo;
  Ku = 1;
  function n(r) {
    return function(i) {
      return r(i);
    };
  }
  return fo = n, fo;
}
var si = { exports: {} };
(function(n, r) {
  var i = nv, o = r && !r.nodeType && r, l = o && !0 && n && !n.nodeType && n, d = l && l.exports === o, p = d && i.process, g = (function() {
    try {
      var v = l && l.require && l.require("util").types;
      return v || p && p.binding && p.binding("util");
    } catch {
    }
  })();
  n.exports = g;
})(si, si.exports);
var kx = Ex, Sx = $a(), Yu = si.exports, Vu = Yu && Yu.isTypedArray, $x = Vu ? Sx(Vu) : kx, Mc = $x;
function Ix(n, r) {
  if (!(r === "constructor" && typeof n[r] == "function") && r != "__proto__")
    return n[r];
}
var gv = Ix, Tx = Ea, Ox = ci, Px = Object.prototype, Mx = Px.hasOwnProperty;
function Fx(n, r, i) {
  var o = n[r];
  (!(Mx.call(n, r) && Ox(o, i)) || i === void 0 && !(r in n)) && Tx(n, r, i);
}
var Av = Fx, Lx = Av, zx = Ea;
function jx(n, r, i, o) {
  var l = !i;
  i || (i = {});
  for (var d = -1, p = r.length; ++d < p; ) {
    var g = r[d], v = o ? o(i[g], n[g], g, i, n) : void 0;
    v === void 0 && (v = n[g]), l ? zx(i, g, v) : Lx(i, g, v);
  }
  return i;
}
var di = jx;
function Bx(n, r) {
  for (var i = -1, o = Array(n); ++i < n; )
    o[i] = r(i);
  return o;
}
var Dx = Bx, Wx = 9007199254740991, Nx = /^(?:0|[1-9]\d*)$/;
function Ux(n, r) {
  var i = typeof n;
  return r = r ?? Wx, !!r && (i == "number" || i != "symbol" && Nx.test(n)) && n > -1 && n % 1 == 0 && n < r;
}
var Ia = Ux, qx = Dx, Gx = Sa, Hx = Je, Kx = ur.exports, Yx = Ia, Vx = Mc, Zx = Object.prototype, Jx = Zx.hasOwnProperty;
function Xx(n, r) {
  var i = Hx(n), o = !i && Gx(n), l = !i && !o && Kx(n), d = !i && !o && !l && Vx(n), p = i || o || l || d, g = p ? qx(n.length, String) : [], v = g.length;
  for (var m in n)
    (r || Jx.call(n, m)) && !(p && // Safari 9 has enumerable `arguments.length` in strict mode.
    (m == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
    l && (m == "offset" || m == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    d && (m == "buffer" || m == "byteLength" || m == "byteOffset") || // Skip index properties.
    Yx(m, v))) && g.push(m);
  return g;
}
var hv = Xx;
function Qx(n) {
  var r = [];
  if (n != null)
    for (var i in Object(n))
      r.push(i);
  return r;
}
var eR = Qx, tR = Nt, nR = Oc, rR = eR, iR = Object.prototype, aR = iR.hasOwnProperty;
function sR(n) {
  if (!tR(n))
    return rR(n);
  var r = nR(n), i = [];
  for (var o in n)
    o == "constructor" && (r || !aR.call(n, o)) || i.push(o);
  return i;
}
var oR = sR, cR = hv, lR = oR, dR = _r;
function uR(n) {
  return dR(n) ? cR(n, !0) : lR(n);
}
var ui = uR, fR = di, pR = ui;
function vR(n) {
  return fR(n, pR(n));
}
var gR = vR, Zu = sv, AR = va.exports, hR = lv, _R = li, yR = uv, Ju = Sa, Xu = Je, bR = DC, mR = ur.exports, wR = wa, CR = Nt, xR = vv, RR = Mc, Qu = gv, ER = gR;
function kR(n, r, i, o, l, d, p) {
  var g = Qu(n, i), v = Qu(r, i), m = p.get(v);
  if (m) {
    Zu(n, i, m);
    return;
  }
  var y = d ? d(g, v, i + "", n, r, p) : void 0, h = y === void 0;
  if (h) {
    var R = Xu(v), P = !R && mR(v), $ = !R && !P && RR(v);
    y = v, R || P || $ ? Xu(g) ? y = g : bR(g) ? y = _R(g) : P ? (h = !1, y = AR(v, !0)) : $ ? (h = !1, y = hR(v, !0)) : y = [] : xR(v) || Ju(v) ? (y = g, Ju(g) ? y = ER(g) : (!CR(g) || wR(g)) && (y = yR(v))) : h = !1;
  }
  h && (p.set(v, y), l(y, v, o, d, p), p.delete(v)), Zu(n, i, y);
}
var SR = kR, $R = Ra, IR = sv, TR = ov, OR = SR, PR = Nt, MR = ui, FR = gv;
function _v(n, r, i, o, l) {
  n !== r && TR(r, function(d, p) {
    if (l || (l = new $R()), PR(d))
      OR(n, r, p, i, _v, o, l);
    else {
      var g = o ? o(FR(n, p), d, p + "", n, r, l) : void 0;
      g === void 0 && (g = d), IR(n, p, g);
    }
  }, MR);
}
var LR = _v;
function zR(n) {
  return n;
}
var yr = zR;
function jR(n, r, i) {
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
var Fc = jR, BR = Fc, ef = Math.max;
function DR(n, r, i) {
  return r = ef(r === void 0 ? n.length - 1 : r, 0), function() {
    for (var o = arguments, l = -1, d = ef(o.length - r, 0), p = Array(d); ++l < d; )
      p[l] = o[r + l];
    l = -1;
    for (var g = Array(r + 1); ++l < r; )
      g[l] = o[l];
    return g[r] = i(p), BR(n, this, g);
  };
}
var yv = DR;
function WR(n) {
  return function() {
    return n;
  };
}
var NR = WR, UR = NR, tf = av, qR = yr, GR = tf ? function(n, r) {
  return tf(n, "toString", {
    configurable: !0,
    enumerable: !1,
    value: UR(r),
    writable: !0
  });
} : qR, HR = GR, KR = 800, YR = 16, VR = Date.now;
function ZR(n) {
  var r = 0, i = 0;
  return function() {
    var o = VR(), l = YR - (o - i);
    if (i = o, l > 0) {
      if (++r >= KR)
        return arguments[0];
    } else
      r = 0;
    return n.apply(void 0, arguments);
  };
}
var bv = ZR, JR = HR, XR = bv, QR = XR(JR), Lc = QR, eE = yr, tE = yv, nE = Lc;
function rE(n, r) {
  return nE(tE(n, r, eE), n + "");
}
var mv = rE, iE = ci, aE = _r, sE = Ia, oE = Nt;
function cE(n, r, i) {
  if (!oE(i))
    return !1;
  var o = typeof r;
  return (o == "number" ? aE(i) && sE(r, i.length) : o == "string" && r in i) ? iE(i[r], n) : !1;
}
var wv = cE, lE = mv, dE = wv;
function uE(n) {
  return lE(function(r, i) {
    var o = -1, l = i.length, d = l > 1 ? i[l - 1] : void 0, p = l > 2 ? i[2] : void 0;
    for (d = n.length > 3 && typeof d == "function" ? (l--, d) : void 0, p && dE(i[0], i[1], p) && (d = l < 3 ? void 0 : d, l = 1), r = Object(r); ++o < l; ) {
      var g = i[o];
      g && n(r, g, o, d);
    }
    return r;
  });
}
var fE = uE, pE = LR, vE = fE;
vE(function(n, r, i) {
  pE(n, r, i);
});
ln("c2pa:Downloader");
ln("c2pa:Downloader:Cache");
ln("c2pa:workers");
ln("c2pa:wasm");
function br(n) {
  return Object.prototype.toString.call(n);
}
function gE(n) {
  return br(n) === "[object Date]";
}
function AE(n) {
  return br(n) === "[object RegExp]";
}
function hE(n) {
  return br(n) === "[object Error]";
}
function _E(n) {
  return br(n) === "[object Boolean]";
}
function yE(n) {
  return br(n) === "[object Number]";
}
function bE(n) {
  return br(n) === "[object String]";
}
var Cv = Array.isArray || function(r) {
  return Object.prototype.toString.call(r) === "[object Array]";
};
function Ta(n, r) {
  if (n.forEach)
    return n.forEach(r);
  for (var i = 0; i < n.length; i++)
    r(n[i], i, n);
}
var Oa = Object.keys || function(r) {
  var i = [];
  for (var o in r)
    i.push(o);
  return i;
}, Pa = Object.prototype.hasOwnProperty || function(n, r) {
  return r in n;
};
function xv(n) {
  if (typeof n == "object" && n !== null) {
    var r;
    if (Cv(n))
      r = [];
    else if (gE(n))
      r = new Date(n.getTime ? n.getTime() : n);
    else if (AE(n))
      r = new RegExp(n);
    else if (hE(n))
      r = { message: n.message };
    else if (_E(n) || yE(n) || bE(n))
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
    return Ta(Oa(n), function(l) {
      r[l] = n[l];
    }), r;
  }
  return n;
}
function Rv(n, r, i) {
  var o = [], l = [], d = !0;
  return (function p(g) {
    var v = i ? xv(g) : g, m = {}, y = !0, h = {
      node: v,
      node_: g,
      path: [].concat(o),
      parent: l[l.length - 1],
      parents: l,
      key: o[o.length - 1],
      isRoot: o.length === 0,
      level: o.length,
      circular: null,
      update: function($, F) {
        h.isRoot || (h.parent.node[h.key] = $), h.node = $, F && (y = !1);
      },
      delete: function($) {
        delete h.parent.node[h.key], $ && (y = !1);
      },
      remove: function($) {
        Cv(h.parent.node) ? h.parent.node.splice(h.key, 1) : delete h.parent.node[h.key], $ && (y = !1);
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
        (!h.keys || h.node_ !== h.node) && (h.keys = Oa(h.node)), h.isLeaf = h.keys.length === 0;
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
    return P !== void 0 && h.update && h.update(P), m.before && m.before.call(h, h.node), y && (typeof h.node == "object" && h.node !== null && !h.circular && (l.push(h), R(), Ta(h.keys, function($, F) {
      o.push($), m.pre && m.pre.call(h, h.node[$], $);
      var O = p(h.node[$]);
      i && Pa.call(h.node, $) && (h.node[$] = O.node), O.isLast = F === h.keys.length - 1, O.isFirst = F === 0, m.post && m.post.call(h, O), o.pop();
    }), l.pop()), m.after && m.after.call(h, h.node)), h;
  })(n).node;
}
function Ht(n) {
  this.value = n;
}
Ht.prototype.get = function(n) {
  for (var r = this.value, i = 0; i < n.length; i++) {
    var o = n[i];
    if (!r || !Pa.call(r, o))
      return;
    r = r[o];
  }
  return r;
};
Ht.prototype.has = function(n) {
  for (var r = this.value, i = 0; i < n.length; i++) {
    var o = n[i];
    if (!r || !Pa.call(r, o))
      return !1;
    r = r[o];
  }
  return !0;
};
Ht.prototype.set = function(n, r) {
  for (var i = this.value, o = 0; o < n.length - 1; o++) {
    var l = n[o];
    Pa.call(i, l) || (i[l] = {}), i = i[l];
  }
  return i[n[o]] = r, r;
};
Ht.prototype.map = function(n) {
  return Rv(this.value, n, !0);
};
Ht.prototype.forEach = function(n) {
  return this.value = Rv(this.value, n, !1), this.value;
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
      var d = xv(o);
      return n.push(o), r.push(d), Ta(Oa(o), function(p) {
        d[p] = i(o[p]);
      }), n.pop(), r.pop(), d;
    }
    return o;
  })(this.value);
};
Ta(Oa(Ht.prototype), function(n) {
});
ln("c2pa:manifestStore");
ln("c2pa");
ln("c2pa:task");
var mE = { exports: {} };
function wE(n, r) {
  for (var i = -1, o = n == null ? 0 : n.length; ++i < o && r(n[i], i, n) !== !1; )
    ;
  return n;
}
var Ma = wE, CE = dv, xE = CE(Object.keys, Object), RE = xE, EE = Oc, kE = RE, SE = Object.prototype, $E = SE.hasOwnProperty;
function IE(n) {
  if (!EE(n))
    return kE(n);
  var r = [];
  for (var i in Object(n))
    $E.call(n, i) && i != "constructor" && r.push(i);
  return r;
}
var Ev = IE, TE = hv, OE = Ev, PE = _r;
function ME(n) {
  return PE(n) ? TE(n) : OE(n);
}
var fi = ME, FE = ov, LE = fi;
function zE(n, r) {
  return n && FE(n, r, LE);
}
var kv = zE, jE = _r;
function BE(n, r) {
  return function(i, o) {
    if (i == null)
      return i;
    if (!jE(i))
      return n(i, o);
    for (var l = i.length, d = r ? l : -1, p = Object(i); (r ? d-- : ++d < l) && o(p[d], d, p) !== !1; )
      ;
    return i;
  };
}
var DE = BE, WE = kv, NE = DE, UE = NE(WE), Sv = UE, qE = yr;
function GE(n) {
  return typeof n == "function" ? n : qE;
}
var HE = GE, KE = Ma, YE = Sv, VE = HE, ZE = Je;
function JE(n, r) {
  var i = ZE(n) ? KE : YE;
  return i(n, VE(r));
}
var XE = JE;
(function(n) {
  n.exports = XE;
})(mE);
var $v = {};
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
})($v);
var po, nf;
function pi() {
  return nf || (nf = 1, po = {}), po;
}
var De = $v, QE = pi(), rf = Array.prototype.push;
function ek(n, r) {
  return r == 2 ? function(i, o) {
    return n.apply(void 0, arguments);
  } : function(i) {
    return n.apply(void 0, arguments);
  };
}
function vo(n, r) {
  return r == 2 ? function(i, o) {
    return n(i, o);
  } : function(i) {
    return n(i);
  };
}
function af(n) {
  for (var r = n ? n.length : 0, i = Array(r); r--; )
    i[r] = n[r];
  return i;
}
function tk(n) {
  return function(r) {
    return n({}, r);
  };
}
function nk(n, r) {
  return function() {
    for (var i = arguments.length, o = i - 1, l = Array(i); i--; )
      l[i] = arguments[i];
    var d = l[r], p = l.slice(0, r);
    return d && rf.apply(p, d), r != o && rf.apply(p, l.slice(r + 1)), n.apply(this, p);
  };
}
function go(n, r) {
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
function Ac(n, r, i, o) {
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
  }, g = l ? i : QE, v = "curry" in o && o.curry, m = "fixed" in o && o.fixed, y = "rearg" in o && o.rearg, h = l ? i.runInContext() : void 0, R = l ? i : {
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
  }, P = R.ary, $ = R.assign, F = R.clone, O = R.curry, M = R.forEach, L = R.isArray, J = R.isError, te = R.isFunction, _e = R.isWeakMap, ge = R.keys, pe = R.rearg, oe = R.toInteger, me = R.toPath, Ie = ge(De.aryMethod), We = {
    castArray: function(N) {
      return function() {
        var z = arguments[0];
        return L(z) ? N(af(z)) : N.apply(void 0, arguments);
      };
    },
    iteratee: function(N) {
      return function() {
        var z = arguments[0], D = arguments[1], G = N(z, D), X = G.length;
        return p.cap && typeof D == "number" ? (D = D > 2 ? D - 2 : 1, X && X <= D ? G : vo(G, D)) : G;
      };
    },
    mixin: function(N) {
      return function(z) {
        var D = this;
        if (!te(D))
          return N(D, Object(z));
        var G = [];
        return M(ge(z), function(X) {
          te(z[X]) && G.push([X, D.prototype[X]]);
        }), N(D, Object(z)), M(G, function(X) {
          var Te = X[1];
          te(Te) ? D.prototype[X[0]] = Te : delete D.prototype[X[0]];
        }), D;
      };
    },
    nthArg: function(N) {
      return function(z) {
        var D = z < 0 ? 1 : oe(z) + 1;
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
        return Ac(n, N(z), o);
      };
    }
  };
  function V(N, z) {
    if (p.cap) {
      var D = De.iterateeRearg[N];
      if (D)
        return Yt(z, D);
      var G = !l && De.iterateeAry[N];
      if (G)
        return dn(z, G);
    }
    return z;
  }
  function ie(N, z, D) {
    return v || p.curry && D > 1 ? O(z, D) : z;
  }
  function ke(N, z, D) {
    if (p.fixed && (m || !De.skipFixed[N])) {
      var G = De.methodSpread[N], X = G && G.start;
      return X === void 0 ? P(z, D) : nk(z, X);
    }
    return z;
  }
  function Ge(N, z, D) {
    return p.rearg && D > 1 && (y || !De.skipRearg[N]) ? pe(z, De.methodRearg[N] || De.aryRearg[D]) : z;
  }
  function Lt(N, z) {
    z = me(z);
    for (var D = -1, G = z.length, X = G - 1, Te = F(Object(N)), He = Te; He != null && ++D < G; ) {
      var Le = z[D], it = He[Le];
      it != null && !(te(it) || J(it) || _e(it)) && (He[Le] = F(D == X ? it : Object(it))), He = He[Le];
    }
    return Te;
  }
  function Ne(N) {
    return Ue.runInContext.convert(N)(void 0);
  }
  function Xe(N, z) {
    var D = De.aliasToReal[N] || N, G = De.remap[D] || D, X = o;
    return function(Te) {
      var He = l ? h : R, Le = l ? h[G] : z, it = $($({}, X), Te);
      return Ac(He, D, Le, it);
    };
  }
  function dn(N, z) {
    return Qe(N, function(D) {
      return typeof D == "function" ? vo(D, z) : D;
    });
  }
  function Yt(N, z) {
    return Qe(N, function(D) {
      var G = z.length;
      return ek(pe(vo(D, G), z), G);
    });
  }
  function Qe(N, z) {
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
    var G, X = De.aliasToReal[N] || N, Te = z, He = We[X];
    return He ? Te = He(z) : p.immutable && (De.mutate.array[X] ? Te = go(z, af) : De.mutate.object[X] ? Te = go(z, tk(z)) : De.mutate.set[X] && (Te = go(z, Lt))), M(Ie, function(Le) {
      return M(De.aryMethod[Le], function(it) {
        if (X == it) {
          var et = De.methodSpread[X], Ct = et && et.afterRearg;
          return G = Ct ? ke(X, Ge(X, Te, Le), Le) : Ge(X, ke(X, Te, Le), Le), G = V(X, G), G = ie(X, G, Le), !1;
        }
      }), !G;
    }), G || (G = Te), G == z && (G = v ? O(G, 1) : function() {
      return z.apply(this, arguments);
    }), G.convert = Xe(X, z), G.placeholder = z.placeholder = D, G;
  }
  if (!d)
    return xn(r, i, g);
  var Ue = i, Vt = [];
  return M(Ie, function(N) {
    M(De.aryMethod[N], function(z) {
      var D = Ue[De.remap[z] || z];
      D && Vt.push([z, xn(z, D, Ue)]);
    });
  }), M(ge(Ue), function(N) {
    var z = Ue[N];
    if (typeof z == "function") {
      for (var D = Vt.length; D--; )
        if (Vt[D][0] == N)
          return;
      z.convert = Xe(N, z), Vt.push([N, z]);
    }
  }), M(Vt, function(N) {
    Ue[N[0]] = N[1];
  }), Ue.convert = Ne, Ue.placeholder = Ue, M(ge(Ue), function(N) {
    M(De.realToAlias[N] || [], function(z) {
      Ue[z] = Ue[N];
    });
  }), Ue;
}
var rk = Ac, ik = Nn, ak = vt, sk = ik(ak, "WeakMap"), Iv = sk, Ao, sf;
function Tv() {
  if (sf) return Ao;
  sf = 1;
  var n = Iv, r = n && new n();
  return Ao = r, Ao;
}
var ok = yr, of = Tv(), ck = of ? function(n, r) {
  return of.set(n, r), n;
} : ok, Ov = ck, lk = ka, dk = Nt;
function uk(n) {
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
    var i = lk(n.prototype), o = n.apply(i, r);
    return dk(o) ? o : i;
  };
}
var Fa = uk, fk = Fa, pk = vt, vk = 1;
function gk(n, r, i) {
  var o = r & vk, l = fk(n);
  function d() {
    var p = this && this !== pk && this instanceof d ? l : n;
    return p.apply(o ? i : this, arguments);
  }
  return d;
}
var Ak = gk, hk = Math.max;
function _k(n, r, i, o) {
  for (var l = -1, d = n.length, p = i.length, g = -1, v = r.length, m = hk(d - p, 0), y = Array(v + m), h = !o; ++g < v; )
    y[g] = r[g];
  for (; ++l < p; )
    (h || l < d) && (y[i[l]] = n[l]);
  for (; m--; )
    y[g++] = n[l++];
  return y;
}
var Pv = _k, yk = Math.max;
function bk(n, r, i, o) {
  for (var l = -1, d = n.length, p = -1, g = i.length, v = -1, m = r.length, y = yk(d - g, 0), h = Array(y + m), R = !o; ++l < y; )
    h[l] = n[l];
  for (var P = l; ++v < m; )
    h[P + v] = r[v];
  for (; ++p < g; )
    (R || l < d) && (h[P + i[p]] = n[l++]);
  return h;
}
var Mv = bk;
function mk(n, r) {
  for (var i = n.length, o = 0; i--; )
    n[i] === r && ++o;
  return o;
}
var wk = mk, ho, cf;
function zc() {
  if (cf) return ho;
  cf = 1;
  function n() {
  }
  return ho = n, ho;
}
var _o, lf;
function jc() {
  if (lf) return _o;
  lf = 1;
  var n = ka, r = zc(), i = 4294967295;
  function o(l) {
    this.__wrapped__ = l, this.__actions__ = [], this.__dir__ = 1, this.__filtered__ = !1, this.__iteratees__ = [], this.__takeCount__ = i, this.__views__ = [];
  }
  return o.prototype = n(r.prototype), o.prototype.constructor = o, _o = o, _o;
}
var yo, df;
function Fv() {
  if (df) return yo;
  df = 1;
  function n() {
  }
  return yo = n, yo;
}
var bo, uf;
function Bc() {
  if (uf) return bo;
  uf = 1;
  var n = Tv(), r = Fv(), i = n ? function(o) {
    return n.get(o);
  } : r;
  return bo = i, bo;
}
var mo, ff;
function Ck() {
  if (ff) return mo;
  ff = 1;
  var n = {};
  return mo = n, mo;
}
var wo, pf;
function Lv() {
  if (pf) return wo;
  pf = 1;
  var n = Ck(), r = Object.prototype, i = r.hasOwnProperty;
  function o(l) {
    for (var d = l.name + "", p = n[d], g = i.call(n, d) ? p.length : 0; g--; ) {
      var v = p[g], m = v.func;
      if (m == null || m == l)
        return v.name;
    }
    return d;
  }
  return wo = o, wo;
}
var Co, vf;
function Dc() {
  if (vf) return Co;
  vf = 1;
  var n = ka, r = zc();
  function i(o, l) {
    this.__wrapped__ = o, this.__actions__ = [], this.__chain__ = !!l, this.__index__ = 0, this.__values__ = void 0;
  }
  return i.prototype = n(r.prototype), i.prototype.constructor = i, Co = i, Co;
}
var xo, gf;
function xk() {
  if (gf) return xo;
  gf = 1;
  var n = jc(), r = Dc(), i = li;
  function o(l) {
    if (l instanceof n)
      return l.clone();
    var d = new r(l.__wrapped__, l.__chain__);
    return d.__actions__ = i(l.__actions__), d.__index__ = l.__index__, d.__values__ = l.__values__, d;
  }
  return xo = o, xo;
}
var Ro, Af;
function Rk() {
  if (Af) return Ro;
  Af = 1;
  var n = jc(), r = Dc(), i = zc(), o = Je, l = Ft, d = xk(), p = Object.prototype, g = p.hasOwnProperty;
  function v(m) {
    if (l(m) && !o(m) && !(m instanceof n)) {
      if (m instanceof r)
        return m;
      if (g.call(m, "__wrapped__"))
        return d(m);
    }
    return new r(m);
  }
  return v.prototype = i.prototype, v.prototype.constructor = v, Ro = v, Ro;
}
var Eo, hf;
function zv() {
  if (hf) return Eo;
  hf = 1;
  var n = jc(), r = Bc(), i = Lv(), o = Rk();
  function l(d) {
    var p = i(d), g = o[p];
    if (typeof g != "function" || !(p in n.prototype))
      return !1;
    if (d === g)
      return !0;
    var v = r(g);
    return !!v && d === v[0];
  }
  return Eo = l, Eo;
}
var Ek = Ov, kk = bv, Sk = kk(Ek), jv = Sk, $k = /\{\n\/\* \[wrapped with (.+)\] \*/, Ik = /,? & /;
function Tk(n) {
  var r = n.match($k);
  return r ? r[1].split(Ik) : [];
}
var Ok = Tk, Pk = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/;
function Mk(n, r) {
  var i = r.length;
  if (!i)
    return n;
  var o = i - 1;
  return r[o] = (i > 1 ? "& " : "") + r[o], r = r.join(i > 2 ? ", " : " "), n.replace(Pk, `{
/* [wrapped with ` + r + `] */
`);
}
var Fk = Mk, ko, _f;
function Lk() {
  if (_f) return ko;
  _f = 1;
  function n(r, i, o, l) {
    for (var d = r.length, p = o + (l ? 1 : -1); l ? p-- : ++p < d; )
      if (i(r[p], p, r))
        return p;
    return -1;
  }
  return ko = n, ko;
}
var So, yf;
function zk() {
  if (yf) return So;
  yf = 1;
  function n(r) {
    return r !== r;
  }
  return So = n, So;
}
var $o, bf;
function jk() {
  if (bf) return $o;
  bf = 1;
  function n(r, i, o) {
    for (var l = o - 1, d = r.length; ++l < d; )
      if (r[l] === i)
        return l;
    return -1;
  }
  return $o = n, $o;
}
var Io, mf;
function Bk() {
  if (mf) return Io;
  mf = 1;
  var n = Lk(), r = zk(), i = jk();
  function o(l, d, p) {
    return d === d ? i(l, d, p) : n(l, r, p);
  }
  return Io = o, Io;
}
var To, wf;
function Bv() {
  if (wf) return To;
  wf = 1;
  var n = Bk();
  function r(i, o) {
    var l = i == null ? 0 : i.length;
    return !!l && n(i, o, 0) > -1;
  }
  return To = r, To;
}
var Dk = Ma, Wk = Bv(), Nk = 1, Uk = 2, qk = 8, Gk = 16, Hk = 32, Kk = 64, Yk = 128, Vk = 256, Zk = 512, Jk = [
  ["ary", Yk],
  ["bind", Nk],
  ["bindKey", Uk],
  ["curry", qk],
  ["curryRight", Gk],
  ["flip", Zk],
  ["partial", Hk],
  ["partialRight", Kk],
  ["rearg", Vk]
];
function Xk(n, r) {
  return Dk(Jk, function(i) {
    var o = "_." + i[0];
    r & i[1] && !Wk(n, o) && n.push(o);
  }), n.sort();
}
var Qk = Xk, eS = Ok, tS = Fk, nS = Lc, rS = Qk;
function iS(n, r, i) {
  var o = r + "";
  return nS(n, tS(o, rS(eS(o), i)));
}
var Dv = iS, aS = zv(), sS = jv, oS = Dv, cS = 4, lS = 8, Cf = 32, xf = 64;
function dS(n, r, i, o, l, d, p, g, v, m) {
  var y = r & lS, h = y ? p : void 0, R = y ? void 0 : p, P = y ? d : void 0, $ = y ? void 0 : d;
  r |= y ? Cf : xf, r &= ~(y ? xf : Cf), r & cS || (r &= -4);
  var F = [
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
  ], O = i.apply(void 0, F);
  return aS(n) && sS(O, F), O.placeholder = o, oS(O, n, r);
}
var Wv = dS;
function uS(n) {
  var r = n;
  return r.placeholder;
}
var Nv = uS, fS = li, pS = Ia, vS = Math.min;
function gS(n, r) {
  for (var i = n.length, o = vS(r.length, i), l = fS(n); o--; ) {
    var d = r[o];
    n[o] = pS(d, i) ? l[d] : void 0;
  }
  return n;
}
var AS = gS, Rf = "__lodash_placeholder__";
function hS(n, r) {
  for (var i = -1, o = n.length, l = 0, d = []; ++i < o; ) {
    var p = n[i];
    (p === r || p === Rf) && (n[i] = Rf, d[l++] = i);
  }
  return d;
}
var Wc = hS, _S = Pv, yS = Mv, bS = wk, Ef = Fa, mS = Wv, wS = Nv, CS = AS, xS = Wc, RS = vt, ES = 1, kS = 2, SS = 8, $S = 16, IS = 128, TS = 512;
function Uv(n, r, i, o, l, d, p, g, v, m) {
  var y = r & IS, h = r & ES, R = r & kS, P = r & (SS | $S), $ = r & TS, F = R ? void 0 : Ef(n);
  function O() {
    for (var M = arguments.length, L = Array(M), J = M; J--; )
      L[J] = arguments[J];
    if (P)
      var te = wS(O), _e = bS(L, te);
    if (o && (L = _S(L, o, l, P)), d && (L = yS(L, d, p, P)), M -= _e, P && M < m) {
      var ge = xS(L, te);
      return mS(
        n,
        r,
        Uv,
        O.placeholder,
        i,
        L,
        ge,
        g,
        v,
        m - M
      );
    }
    var pe = h ? i : this, oe = R ? pe[n] : n;
    return M = L.length, g ? L = CS(L, g) : $ && M > 1 && L.reverse(), y && v < M && (L.length = v), this && this !== RS && this instanceof O && (oe = F || Ef(oe)), oe.apply(pe, L);
  }
  return O;
}
var qv = Uv, OS = Fc, PS = Fa, MS = qv, FS = Wv, LS = Nv, zS = Wc, jS = vt;
function BS(n, r, i) {
  var o = PS(n);
  function l() {
    for (var d = arguments.length, p = Array(d), g = d, v = LS(l); g--; )
      p[g] = arguments[g];
    var m = d < 3 && p[0] !== v && p[d - 1] !== v ? [] : zS(p, v);
    if (d -= m.length, d < i)
      return FS(
        n,
        r,
        MS,
        l.placeholder,
        void 0,
        p,
        m,
        void 0,
        void 0,
        i - d
      );
    var y = this && this !== jS && this instanceof l ? o : n;
    return OS(y, this, p);
  }
  return l;
}
var DS = BS, WS = Fc, NS = Fa, US = vt, qS = 1;
function GS(n, r, i, o) {
  var l = r & qS, d = NS(n);
  function p() {
    for (var g = -1, v = arguments.length, m = -1, y = o.length, h = Array(y + v), R = this && this !== US && this instanceof p ? d : n; ++m < y; )
      h[m] = o[m];
    for (; v--; )
      h[m++] = arguments[++g];
    return WS(R, l ? i : this, h);
  }
  return p;
}
var HS = GS, KS = Pv, YS = Mv, kf = Wc, Sf = "__lodash_placeholder__", Oo = 1, VS = 2, ZS = 4, $f = 8, Jr = 128, If = 256, JS = Math.min;
function XS(n, r) {
  var i = n[1], o = r[1], l = i | o, d = l < (Oo | VS | Jr), p = o == Jr && i == $f || o == Jr && i == If && n[7].length <= r[8] || o == (Jr | If) && r[7].length <= r[8] && i == $f;
  if (!(d || p))
    return n;
  o & Oo && (n[2] = r[2], l |= i & Oo ? 0 : ZS);
  var g = r[3];
  if (g) {
    var v = n[3];
    n[3] = v ? KS(v, g, r[4]) : g, n[4] = v ? kf(n[3], Sf) : r[4];
  }
  return g = r[5], g && (v = n[5], n[5] = v ? YS(v, g, r[6]) : g, n[6] = v ? kf(n[5], Sf) : r[6]), g = r[7], g && (n[7] = g), o & Jr && (n[8] = n[8] == null ? r[8] : JS(n[8], r[8])), n[9] == null && (n[9] = r[9]), n[0] = r[0], n[1] = l, n;
}
var QS = XS, e$ = /\s/;
function t$(n) {
  for (var r = n.length; r-- && e$.test(n.charAt(r)); )
    ;
  return r;
}
var n$ = t$, r$ = n$, i$ = /^\s+/;
function a$(n) {
  return n && n.slice(0, r$(n) + 1).replace(i$, "");
}
var s$ = a$, o$ = Wn, c$ = Ft, l$ = "[object Symbol]";
function d$(n) {
  return typeof n == "symbol" || c$(n) && o$(n) == l$;
}
var mr = d$, u$ = s$, Tf = Nt, f$ = mr, Of = NaN, p$ = /^[-+]0x[0-9a-f]+$/i, v$ = /^0b[01]+$/i, g$ = /^0o[0-7]+$/i, A$ = parseInt;
function h$(n) {
  if (typeof n == "number")
    return n;
  if (f$(n))
    return Of;
  if (Tf(n)) {
    var r = typeof n.valueOf == "function" ? n.valueOf() : n;
    n = Tf(r) ? r + "" : r;
  }
  if (typeof n != "string")
    return n === 0 ? n : +n;
  n = u$(n);
  var i = v$.test(n);
  return i || g$.test(n) ? A$(n.slice(2), i ? 2 : 8) : p$.test(n) ? Of : +n;
}
var _$ = h$, y$ = _$, Pf = 1 / 0, b$ = 17976931348623157e292;
function m$(n) {
  if (!n)
    return n === 0 ? n : 0;
  if (n = y$(n), n === Pf || n === -Pf) {
    var r = n < 0 ? -1 : 1;
    return r * b$;
  }
  return n === n ? n : 0;
}
var w$ = m$, C$ = w$;
function x$(n) {
  var r = C$(n), i = r % 1;
  return r === r ? i ? r - i : r : 0;
}
var Gv = x$, R$ = Ov, E$ = Ak, k$ = DS, S$ = qv, $$ = HS, I$ = Bc(), T$ = QS, O$ = jv, P$ = Dv, Mf = Gv, M$ = "Expected a function", Ff = 1, F$ = 2, Lf = 8, zf = 16, jf = 32, L$ = 64, Bf = Math.max;
function z$(n, r, i, o, l, d, p, g) {
  var v = r & F$;
  if (!v && typeof n != "function")
    throw new TypeError(M$);
  var m = o ? o.length : 0;
  if (m || (r &= -97, o = l = void 0), p = p === void 0 ? p : Bf(Mf(p), 0), g = g === void 0 ? g : Mf(g), m -= l ? l.length : 0, r & L$) {
    var y = o, h = l;
    o = l = void 0;
  }
  var R = v ? void 0 : I$(n), P = [
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
  if (R && T$(P, R), n = P[0], r = P[1], i = P[2], o = P[3], l = P[4], g = P[9] = P[9] === void 0 ? v ? 0 : n.length : Bf(P[9] - m, 0), !g && r & (Lf | zf) && (r &= -25), !r || r == Ff)
    var $ = E$(n, r, i);
  else r == Lf || r == zf ? $ = k$(n, r, g) : (r == jf || r == (Ff | jf)) && !l.length ? $ = $$(n, r, i, o) : $ = S$.apply(void 0, P);
  var F = R ? R$ : O$;
  return P$(F($, P), n, r);
}
var Nc = z$, j$ = Nc, B$ = 128;
function D$(n, r, i) {
  return r = i ? void 0 : r, r = n && r == null ? n.length : r, j$(n, B$, void 0, void 0, void 0, void 0, r);
}
var W$ = D$, N$ = di, U$ = fi;
function q$(n, r) {
  return n && N$(r, U$(r), n);
}
var Hv = q$, G$ = di, H$ = ui;
function K$(n, r) {
  return n && G$(r, H$(r), n);
}
var Y$ = K$;
function V$(n, r) {
  for (var i = -1, o = n == null ? 0 : n.length, l = 0, d = []; ++i < o; ) {
    var p = n[i];
    r(p, i, n) && (d[l++] = p);
  }
  return d;
}
var Z$ = V$;
function J$() {
  return [];
}
var Kv = J$, X$ = Z$, Q$ = Kv, eI = Object.prototype, tI = eI.propertyIsEnumerable, Df = Object.getOwnPropertySymbols, nI = Df ? function(n) {
  return n == null ? [] : (n = Object(n), X$(Df(n), function(r) {
    return tI.call(n, r);
  }));
} : Q$, Uc = nI, rI = di, iI = Uc;
function aI(n, r) {
  return rI(n, iI(n), r);
}
var sI = aI, Po, Wf;
function qc() {
  if (Wf) return Po;
  Wf = 1;
  function n(r, i) {
    for (var o = -1, l = i.length, d = r.length; ++o < l; )
      r[d + o] = i[o];
    return r;
  }
  return Po = n, Po;
}
var oI = qc(), cI = Tc, lI = Uc, dI = Kv, uI = Object.getOwnPropertySymbols, fI = uI ? function(n) {
  for (var r = []; n; )
    oI(r, lI(n)), n = cI(n);
  return r;
} : dI, Yv = fI, pI = di, vI = Yv;
function gI(n, r) {
  return pI(n, vI(n), r);
}
var AI = gI, hI = qc(), _I = Je;
function yI(n, r, i) {
  var o = r(n);
  return _I(n) ? o : hI(o, i(n));
}
var Vv = yI, bI = Vv, mI = Uc, wI = fi;
function CI(n) {
  return bI(n, wI, mI);
}
var Zv = CI, xI = Vv, RI = Yv, EI = ui;
function kI(n) {
  return xI(n, EI, RI);
}
var SI = kI, $I = Nn, II = vt, TI = $I(II, "DataView"), OI = TI, PI = Nn, MI = vt, FI = PI(MI, "Promise"), LI = FI, Mo, Nf;
function Jv() {
  if (Nf) return Mo;
  Nf = 1;
  var n = Nn, r = vt, i = n(r, "Set");
  return Mo = i, Mo;
}
var hc = OI, _c = Sc, yc = LI, bc = Jv(), mc = Iv, Xv = Wn, wr = iv, Uf = "[object Map]", zI = "[object Object]", qf = "[object Promise]", Gf = "[object Set]", Hf = "[object WeakMap]", Kf = "[object DataView]", jI = wr(hc), BI = wr(_c), DI = wr(yc), WI = wr(bc), NI = wr(mc), zn = Xv;
(hc && zn(new hc(new ArrayBuffer(1))) != Kf || _c && zn(new _c()) != Uf || yc && zn(yc.resolve()) != qf || bc && zn(new bc()) != Gf || mc && zn(new mc()) != Hf) && (zn = function(n) {
  var r = Xv(n), i = r == zI ? n.constructor : void 0, o = i ? wr(i) : "";
  if (o)
    switch (o) {
      case jI:
        return Kf;
      case BI:
        return Uf;
      case DI:
        return qf;
      case WI:
        return Gf;
      case NI:
        return Hf;
    }
  return r;
});
var vi = zn, UI = Object.prototype, qI = UI.hasOwnProperty;
function GI(n) {
  var r = n.length, i = new n.constructor(r);
  return r && typeof n[0] == "string" && qI.call(n, "index") && (i.index = n.index, i.input = n.input), i;
}
var HI = GI, KI = Ic;
function YI(n, r) {
  var i = r ? KI(n.buffer) : n.buffer;
  return new n.constructor(i, n.byteOffset, n.byteLength);
}
var VI = YI, ZI = /\w*$/;
function JI(n) {
  var r = new n.constructor(n.source, ZI.exec(n));
  return r.lastIndex = n.lastIndex, r;
}
var XI = JI, Yf = vr(), Vf = Yf ? Yf.prototype : void 0, Zf = Vf ? Vf.valueOf : void 0;
function QI(n) {
  return Zf ? Object(Zf.call(n)) : {};
}
var eT = QI, tT = Ic, nT = VI, rT = XI, iT = eT, aT = lv, sT = "[object Boolean]", oT = "[object Date]", cT = "[object Map]", lT = "[object Number]", dT = "[object RegExp]", uT = "[object Set]", fT = "[object String]", pT = "[object Symbol]", vT = "[object ArrayBuffer]", gT = "[object DataView]", AT = "[object Float32Array]", hT = "[object Float64Array]", _T = "[object Int8Array]", yT = "[object Int16Array]", bT = "[object Int32Array]", mT = "[object Uint8Array]", wT = "[object Uint8ClampedArray]", CT = "[object Uint16Array]", xT = "[object Uint32Array]";
function RT(n, r, i) {
  var o = n.constructor;
  switch (r) {
    case vT:
      return tT(n);
    case sT:
    case oT:
      return new o(+n);
    case gT:
      return nT(n, i);
    case AT:
    case hT:
    case _T:
    case yT:
    case bT:
    case mT:
    case wT:
    case CT:
    case xT:
      return aT(n, i);
    case cT:
      return new o();
    case lT:
    case fT:
      return new o(n);
    case dT:
      return rT(n);
    case uT:
      return new o();
    case pT:
      return iT(n);
  }
}
var ET = RT, kT = vi, ST = Ft, $T = "[object Map]";
function IT(n) {
  return ST(n) && kT(n) == $T;
}
var TT = IT, OT = TT, PT = $a(), Jf = si.exports, Xf = Jf && Jf.isMap, MT = Xf ? PT(Xf) : OT, FT = MT, LT = vi, zT = Ft, jT = "[object Set]";
function BT(n) {
  return zT(n) && LT(n) == jT;
}
var DT = BT, WT = DT, NT = $a(), Qf = si.exports, ep = Qf && Qf.isSet, UT = ep ? NT(ep) : WT, qT = UT, GT = Ra, HT = Ma, KT = Av, YT = Hv, VT = Y$, ZT = va.exports, JT = li, XT = sI, QT = AI, eO = Zv, tO = SI, nO = vi, rO = HI, iO = ET, aO = uv, sO = Je, oO = ur.exports, cO = FT, lO = Nt, dO = qT, uO = fi, fO = ui, pO = 1, vO = 2, gO = 4, Qv = "[object Arguments]", AO = "[object Array]", hO = "[object Boolean]", _O = "[object Date]", yO = "[object Error]", eg = "[object Function]", bO = "[object GeneratorFunction]", mO = "[object Map]", wO = "[object Number]", tg = "[object Object]", CO = "[object RegExp]", xO = "[object Set]", RO = "[object String]", EO = "[object Symbol]", kO = "[object WeakMap]", SO = "[object ArrayBuffer]", $O = "[object DataView]", IO = "[object Float32Array]", TO = "[object Float64Array]", OO = "[object Int8Array]", PO = "[object Int16Array]", MO = "[object Int32Array]", FO = "[object Uint8Array]", LO = "[object Uint8ClampedArray]", zO = "[object Uint16Array]", jO = "[object Uint32Array]", Ce = {};
Ce[Qv] = Ce[AO] = Ce[SO] = Ce[$O] = Ce[hO] = Ce[_O] = Ce[IO] = Ce[TO] = Ce[OO] = Ce[PO] = Ce[MO] = Ce[mO] = Ce[wO] = Ce[tg] = Ce[CO] = Ce[xO] = Ce[RO] = Ce[EO] = Ce[FO] = Ce[LO] = Ce[zO] = Ce[jO] = !0;
Ce[yO] = Ce[eg] = Ce[kO] = !1;
function fa(n, r, i, o, l, d) {
  var p, g = r & pO, v = r & vO, m = r & gO;
  if (i && (p = l ? i(n, o, l, d) : i(n)), p !== void 0)
    return p;
  if (!lO(n))
    return n;
  var y = sO(n);
  if (y) {
    if (p = rO(n), !g)
      return JT(n, p);
  } else {
    var h = nO(n), R = h == eg || h == bO;
    if (oO(n))
      return ZT(n, g);
    if (h == tg || h == Qv || R && !l) {
      if (p = v || R ? {} : aO(n), !g)
        return v ? QT(n, VT(p, n)) : XT(n, YT(p, n));
    } else {
      if (!Ce[h])
        return l ? n : {};
      p = iO(n, h, g);
    }
  }
  d || (d = new GT());
  var P = d.get(n);
  if (P)
    return P;
  d.set(n, p), dO(n) ? n.forEach(function(O) {
    p.add(fa(O, r, i, O, n, d));
  }) : cO(n) && n.forEach(function(O, M) {
    p.set(M, fa(O, r, i, M, n, d));
  });
  var $ = m ? v ? tO : eO : v ? fO : uO, F = y ? void 0 : $(n);
  return HT(F || n, function(O, M) {
    F && (M = O, O = n[M]), KT(p, M, fa(O, r, i, M, n, d));
  }), p;
}
var ng = fa, BO = ng, DO = 4;
function WO(n) {
  return BO(n, DO);
}
var NO = WO, UO = Nc, qO = 8;
function Gc(n, r, i) {
  r = i ? void 0 : r;
  var o = UO(n, qO, void 0, void 0, void 0, void 0, void 0, r);
  return o.placeholder = Gc.placeholder, o;
}
Gc.placeholder = {};
var GO = Gc, HO = Wn, KO = Ft, YO = vv, VO = "[object DOMException]", ZO = "[object Error]";
function JO(n) {
  if (!KO(n))
    return !1;
  var r = HO(n);
  return r == ZO || r == VO || typeof n.message == "string" && typeof n.name == "string" && !YO(n);
}
var XO = JO, QO = vi, eP = Ft, tP = "[object WeakMap]";
function nP(n) {
  return eP(n) && QO(n) == tP;
}
var rP = nP, Fo, tp;
function iP() {
  if (tp) return Fo;
  tp = 1;
  var n = "__lodash_hash_undefined__";
  function r(i) {
    return this.__data__.set(i, n), this;
  }
  return Fo = r, Fo;
}
var Lo, np;
function aP() {
  if (np) return Lo;
  np = 1;
  function n(r) {
    return this.__data__.has(r);
  }
  return Lo = n, Lo;
}
var zo, rp;
function rg() {
  if (rp) return zo;
  rp = 1;
  var n = $c, r = iP(), i = aP();
  function o(l) {
    var d = -1, p = l == null ? 0 : l.length;
    for (this.__data__ = new n(); ++d < p; )
      this.add(l[d]);
  }
  return o.prototype.add = o.prototype.push = r, o.prototype.has = i, zo = o, zo;
}
function sP(n, r) {
  for (var i = -1, o = n == null ? 0 : n.length; ++i < o; )
    if (r(n[i], i, n))
      return !0;
  return !1;
}
var oP = sP, jo, ip;
function ig() {
  if (ip) return jo;
  ip = 1;
  function n(r, i) {
    return r.has(i);
  }
  return jo = n, jo;
}
var cP = rg(), lP = oP, dP = ig(), uP = 1, fP = 2;
function pP(n, r, i, o, l, d) {
  var p = i & uP, g = n.length, v = r.length;
  if (g != v && !(p && v > g))
    return !1;
  var m = d.get(n), y = d.get(r);
  if (m && y)
    return m == r && y == n;
  var h = -1, R = !0, P = i & fP ? new cP() : void 0;
  for (d.set(n, r), d.set(r, n); ++h < g; ) {
    var $ = n[h], F = r[h];
    if (o)
      var O = p ? o(F, $, h, r, n, d) : o($, F, h, n, r, d);
    if (O !== void 0) {
      if (O)
        continue;
      R = !1;
      break;
    }
    if (P) {
      if (!lP(r, function(M, L) {
        if (!dP(P, L) && ($ === M || l($, M, i, o, d)))
          return P.push(L);
      })) {
        R = !1;
        break;
      }
    } else if (!($ === F || l($, F, i, o, d))) {
      R = !1;
      break;
    }
  }
  return d.delete(n), d.delete(r), R;
}
var ag = pP;
function vP(n) {
  var r = -1, i = Array(n.size);
  return n.forEach(function(o, l) {
    i[++r] = [l, o];
  }), i;
}
var gP = vP, Bo, ap;
function Hc() {
  if (ap) return Bo;
  ap = 1;
  function n(r) {
    var i = -1, o = Array(r.size);
    return r.forEach(function(l) {
      o[++i] = l;
    }), o;
  }
  return Bo = n, Bo;
}
var sp = vr(), op = cv, AP = ci, hP = ag, _P = gP, yP = Hc(), bP = 1, mP = 2, wP = "[object Boolean]", CP = "[object Date]", xP = "[object Error]", RP = "[object Map]", EP = "[object Number]", kP = "[object RegExp]", SP = "[object Set]", $P = "[object String]", IP = "[object Symbol]", TP = "[object ArrayBuffer]", OP = "[object DataView]", cp = sp ? sp.prototype : void 0, Do = cp ? cp.valueOf : void 0;
function PP(n, r, i, o, l, d, p) {
  switch (i) {
    case OP:
      if (n.byteLength != r.byteLength || n.byteOffset != r.byteOffset)
        return !1;
      n = n.buffer, r = r.buffer;
    case TP:
      return !(n.byteLength != r.byteLength || !d(new op(n), new op(r)));
    case wP:
    case CP:
    case EP:
      return AP(+n, +r);
    case xP:
      return n.name == r.name && n.message == r.message;
    case kP:
    case $P:
      return n == r + "";
    case RP:
      var g = _P;
    case SP:
      var v = o & bP;
      if (g || (g = yP), n.size != r.size && !v)
        return !1;
      var m = p.get(n);
      if (m)
        return m == r;
      o |= mP, p.set(n, r);
      var y = hP(g(n), g(r), o, l, d, p);
      return p.delete(n), y;
    case IP:
      if (Do)
        return Do.call(n) == Do.call(r);
  }
  return !1;
}
var MP = PP, lp = Zv, FP = 1, LP = Object.prototype, zP = LP.hasOwnProperty;
function jP(n, r, i, o, l, d) {
  var p = i & FP, g = lp(n), v = g.length, m = lp(r), y = m.length;
  if (v != y && !p)
    return !1;
  for (var h = v; h--; ) {
    var R = g[h];
    if (!(p ? R in r : zP.call(r, R)))
      return !1;
  }
  var P = d.get(n), $ = d.get(r);
  if (P && $)
    return P == r && $ == n;
  var F = !0;
  d.set(n, r), d.set(r, n);
  for (var O = p; ++h < v; ) {
    R = g[h];
    var M = n[R], L = r[R];
    if (o)
      var J = p ? o(L, M, R, r, n, d) : o(M, L, R, n, r, d);
    if (!(J === void 0 ? M === L || l(M, L, i, o, d) : J)) {
      F = !1;
      break;
    }
    O || (O = R == "constructor");
  }
  if (F && !O) {
    var te = n.constructor, _e = r.constructor;
    te != _e && "constructor" in n && "constructor" in r && !(typeof te == "function" && te instanceof te && typeof _e == "function" && _e instanceof _e) && (F = !1);
  }
  return d.delete(n), d.delete(r), F;
}
var BP = jP, Wo = Ra, DP = ag, WP = MP, NP = BP, dp = vi, up = Je, fp = ur.exports, UP = Mc, qP = 1, pp = "[object Arguments]", vp = "[object Array]", la = "[object Object]", GP = Object.prototype, gp = GP.hasOwnProperty;
function HP(n, r, i, o, l, d) {
  var p = up(n), g = up(r), v = p ? vp : dp(n), m = g ? vp : dp(r);
  v = v == pp ? la : v, m = m == pp ? la : m;
  var y = v == la, h = m == la, R = v == m;
  if (R && fp(n)) {
    if (!fp(r))
      return !1;
    p = !0, y = !1;
  }
  if (R && !y)
    return d || (d = new Wo()), p || UP(n) ? DP(n, r, i, o, l, d) : WP(n, r, v, i, o, l, d);
  if (!(i & qP)) {
    var P = y && gp.call(n, "__wrapped__"), $ = h && gp.call(r, "__wrapped__");
    if (P || $) {
      var F = P ? n.value() : n, O = $ ? r.value() : r;
      return d || (d = new Wo()), l(F, O, i, o, d);
    }
  }
  return R ? (d || (d = new Wo()), NP(n, r, i, o, l, d)) : !1;
}
var KP = HP, YP = KP, Ap = Ft;
function sg(n, r, i, o, l) {
  return n === r ? !0 : n == null || r == null || !Ap(n) && !Ap(r) ? n !== n && r !== r : YP(n, r, i, o, sg, l);
}
var og = sg, VP = Ra, ZP = og, JP = 1, XP = 2;
function QP(n, r, i, o) {
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
      var h = new VP();
      if (o)
        var R = o(m, y, v, n, r, h);
      if (!(R === void 0 ? ZP(y, m, JP | XP, o, h) : R))
        return !1;
    }
  }
  return !0;
}
var eM = QP, tM = Nt;
function nM(n) {
  return n === n && !tM(n);
}
var cg = nM, rM = cg, iM = fi;
function aM(n) {
  for (var r = iM(n), i = r.length; i--; ) {
    var o = r[i], l = n[o];
    r[i] = [o, l, rM(l)];
  }
  return r;
}
var sM = aM;
function oM(n, r) {
  return function(i) {
    return i == null ? !1 : i[n] === r && (r !== void 0 || n in Object(i));
  };
}
var lg = oM, cM = eM, lM = sM, dM = lg;
function uM(n) {
  var r = lM(n);
  return r.length == 1 && r[0][2] ? dM(r[0][0], r[0][1]) : function(i) {
    return i === n || cM(i, n, r);
  };
}
var fM = uM, pM = Je, vM = mr, gM = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, AM = /^\w*$/;
function hM(n, r) {
  if (pM(n))
    return !1;
  var i = typeof n;
  return i == "number" || i == "symbol" || i == "boolean" || n == null || vM(n) ? !0 : AM.test(n) || !gM.test(n) || r != null && n in Object(r);
}
var Kc = hM, dg = $c, _M = "Expected a function";
function Yc(n, r) {
  if (typeof n != "function" || r != null && typeof r != "function")
    throw new TypeError(_M);
  var i = function() {
    var o = arguments, l = r ? r.apply(this, o) : o[0], d = i.cache;
    if (d.has(l))
      return d.get(l);
    var p = n.apply(this, o);
    return i.cache = d.set(l, p) || d, p;
  };
  return i.cache = new (Yc.Cache || dg)(), i;
}
Yc.Cache = dg;
var yM = Yc, bM = yM, mM = 500;
function wM(n) {
  var r = bM(n, function(o) {
    return i.size === mM && i.clear(), o;
  }), i = r.cache;
  return r;
}
var CM = wM, xM = CM, RM = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, EM = /\\(\\)?/g, kM = xM(function(n) {
  var r = [];
  return n.charCodeAt(0) === 46 && r.push(""), n.replace(RM, function(i, o, l, d) {
    r.push(l ? d.replace(EM, "$1") : o || i);
  }), r;
}), ug = kM, No, hp;
function Vc() {
  if (hp) return No;
  hp = 1;
  function n(r, i) {
    for (var o = -1, l = r == null ? 0 : r.length, d = Array(l); ++o < l; )
      d[o] = i(r[o], o, r);
    return d;
  }
  return No = n, No;
}
var _p = vr(), SM = Vc(), $M = Je, IM = mr, yp = _p ? _p.prototype : void 0, bp = yp ? yp.toString : void 0;
function fg(n) {
  if (typeof n == "string")
    return n;
  if ($M(n))
    return SM(n, fg) + "";
  if (IM(n))
    return bp ? bp.call(n) : "";
  var r = n + "";
  return r == "0" && 1 / n == -1 / 0 ? "-0" : r;
}
var TM = fg, OM = TM;
function PM(n) {
  return n == null ? "" : OM(n);
}
var pg = PM, MM = Je, FM = Kc, LM = ug, zM = pg;
function jM(n, r) {
  return MM(n) ? n : FM(n, r) ? [n] : LM(zM(n));
}
var vg = jM, BM = mr;
function DM(n) {
  if (typeof n == "string" || BM(n))
    return n;
  var r = n + "";
  return r == "0" && 1 / n == -1 / 0 ? "-0" : r;
}
var gi = DM, Uo, mp;
function Zc() {
  if (mp) return Uo;
  mp = 1;
  var n = vg, r = gi;
  function i(o, l) {
    l = n(l, o);
    for (var d = 0, p = l.length; o != null && d < p; )
      o = o[r(l[d++])];
    return d && d == p ? o : void 0;
  }
  return Uo = i, Uo;
}
var WM = Zc();
function NM(n, r, i) {
  var o = n == null ? void 0 : WM(n, r);
  return o === void 0 ? i : o;
}
var UM = NM;
function qM(n, r) {
  return n != null && r in Object(n);
}
var GM = qM, HM = vg, KM = Sa, YM = Je, VM = Ia, ZM = Pc, JM = gi;
function XM(n, r, i) {
  r = HM(r, n);
  for (var o = -1, l = r.length, d = !1; ++o < l; ) {
    var p = JM(r[o]);
    if (!(d = n != null && i(n, p)))
      break;
    n = n[p];
  }
  return d || ++o != l ? d : (l = n == null ? 0 : n.length, !!l && ZM(l) && VM(p, l) && (YM(n) || KM(n)));
}
var QM = XM, eF = GM, tF = QM;
function nF(n, r) {
  return n != null && tF(n, r, eF);
}
var rF = nF, iF = og, aF = UM, sF = rF, oF = Kc, cF = cg, lF = lg, dF = gi, uF = 1, fF = 2;
function pF(n, r) {
  return oF(n) && cF(r) ? lF(dF(n), r) : function(i) {
    var o = aF(i, n);
    return o === void 0 && o === r ? sF(i, n) : iF(r, o, uF | fF);
  };
}
var vF = pF;
function gF(n) {
  return function(r) {
    return r == null ? void 0 : r[n];
  };
}
var AF = gF, hF = Zc();
function _F(n) {
  return function(r) {
    return hF(r, n);
  };
}
var yF = _F, bF = AF, mF = yF, wF = Kc, CF = gi;
function xF(n) {
  return wF(n) ? bF(CF(n)) : mF(n);
}
var RF = xF, EF = fM, kF = vF, SF = yr, $F = Je, IF = RF;
function TF(n) {
  return typeof n == "function" ? n : n == null ? SF : typeof n == "object" ? $F(n) ? kF(n[0], n[1]) : EF(n) : IF(n);
}
var La = TF, OF = ng, PF = La, MF = 1;
function FF(n) {
  return PF(typeof n == "function" ? n : OF(n, MF));
}
var LF = FF, qo, wp;
function zF() {
  if (wp) return qo;
  wp = 1;
  var n = vr(), r = Sa, i = Je, o = n ? n.isConcatSpreadable : void 0;
  function l(d) {
    return i(d) || r(d) || !!(o && d && d[o]);
  }
  return qo = l, qo;
}
var Go, Cp;
function gg() {
  if (Cp) return Go;
  Cp = 1;
  var n = qc(), r = zF();
  function i(o, l, d, p, g) {
    var v = -1, m = o.length;
    for (d || (d = r), g || (g = []); ++v < m; ) {
      var y = o[v];
      l > 0 && d(y) ? l > 1 ? i(y, l - 1, d, p, g) : n(g, y) : p || (g[g.length] = y);
    }
    return g;
  }
  return Go = i, Go;
}
var Ho, xp;
function jF() {
  if (xp) return Ho;
  xp = 1;
  var n = gg();
  function r(i) {
    var o = i == null ? 0 : i.length;
    return o ? n(i, 1) : [];
  }
  return Ho = r, Ho;
}
var Ko, Rp;
function Ag() {
  if (Rp) return Ko;
  Rp = 1;
  var n = jF(), r = yv, i = Lc;
  function o(l) {
    return i(r(l, void 0, n), l + "");
  }
  return Ko = o, Ko;
}
var BF = Nc, DF = Ag(), WF = 256, NF = DF(function(n, r) {
  return BF(n, WF, void 0, void 0, void 0, r);
}), UF = NF, qF = Vc(), GF = li, HF = Je, KF = mr, YF = ug, VF = gi, ZF = pg;
function JF(n) {
  return HF(n) ? qF(n, VF) : KF(n) ? [n] : GF(YF(ZF(n)));
}
var XF = JF, QF = {
  ary: W$,
  assign: Hv,
  clone: NO,
  curry: GO,
  forEach: Ma,
  isArray: Je,
  isError: XO,
  isFunction: wa,
  isWeakMap: rP,
  iteratee: LF,
  keys: Ev,
  rearg: UF,
  toInteger: Gv,
  toPath: XF
}, eL = rk, tL = QF;
function nL(n, r, i) {
  return eL(tL, n, r, i);
}
var za = nL, Yo, Ep;
function rL() {
  if (Ep) return Yo;
  Ep = 1;
  function n(r) {
    for (var i = -1, o = r == null ? 0 : r.length, l = 0, d = []; ++i < o; ) {
      var p = r[i];
      p && (d[l++] = p);
    }
    return d;
  }
  return Yo = n, Yo;
}
var Vo, kp;
function iL() {
  return kp || (kp = 1, Vo = {
    cap: !1,
    curry: !1,
    fixed: !1,
    immutable: !1,
    rearg: !1
  }), Vo;
}
var aL = za, hg = aL("compact", rL(), iL());
hg.placeholder = pi();
var sL = hg, Zo, Sp;
function oL() {
  if (Sp) return Zo;
  Sp = 1;
  var n = Dc(), r = Ag(), i = Bc(), o = Lv(), l = Je, d = zv(), p = "Expected a function", g = 8, v = 32, m = 128, y = 256;
  function h(R) {
    return r(function(P) {
      var $ = P.length, F = $, O = n.prototype.thru;
      for (R && P.reverse(); F--; ) {
        var M = P[F];
        if (typeof M != "function")
          throw new TypeError(p);
        if (O && !L && o(M) == "wrapper")
          var L = new n([], !0);
      }
      for (F = L ? F : $; ++F < $; ) {
        M = P[F];
        var J = o(M), te = J == "wrapper" ? i(M) : void 0;
        te && d(te[0]) && te[1] == (m | g | v | y) && !te[4].length && te[9] == 1 ? L = L[o(te[0])].apply(L, te[3]) : L = M.length == 1 && d(M) ? L[J]() : L.thru(M);
      }
      return function() {
        var _e = arguments, ge = _e[0];
        if (L && _e.length == 1 && l(ge))
          return L.plant(ge).value();
        for (var pe = 0, oe = $ ? P[pe].apply(this, _e) : ge; ++pe < $; )
          oe = P[pe].call(this, oe);
        return oe;
      };
    });
  }
  return Zo = h, Zo;
}
var Jo, $p;
function cL() {
  if ($p) return Jo;
  $p = 1;
  var n = oL(), r = n();
  return Jo = r, Jo;
}
var lL = za, _g = lL("flow", cL());
_g.placeholder = pi();
var dL = _g, Xo, Ip;
function uL() {
  if (Ip) return Xo;
  Ip = 1;
  var n = Sv, r = _r;
  function i(o, l) {
    var d = -1, p = r(o) ? Array(o.length) : [];
    return n(o, function(g, v, m) {
      p[++d] = l(g, v, m);
    }), p;
  }
  return Xo = i, Xo;
}
var Qo, Tp;
function fL() {
  if (Tp) return Qo;
  Tp = 1;
  function n(r, i) {
    var o = r.length;
    for (r.sort(i); o--; )
      r[o] = r[o].value;
    return r;
  }
  return Qo = n, Qo;
}
var ec, Op;
function pL() {
  if (Op) return ec;
  Op = 1;
  var n = mr;
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
  return ec = r, ec;
}
var tc, Pp;
function vL() {
  if (Pp) return tc;
  Pp = 1;
  var n = pL();
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
  return tc = r, tc;
}
var nc, Mp;
function gL() {
  if (Mp) return nc;
  Mp = 1;
  var n = Vc(), r = Zc(), i = La, o = uL(), l = fL(), d = $a(), p = vL(), g = yr, v = Je;
  function m(y, h, R) {
    h.length ? h = n(h, function(F) {
      return v(F) ? function(O) {
        return r(O, F.length === 1 ? F[0] : F);
      } : F;
    }) : h = [g];
    var P = -1;
    h = n(h, d(i));
    var $ = o(y, function(F, O, M) {
      var L = n(h, function(J) {
        return J(F);
      });
      return { criteria: L, index: ++P, value: F };
    });
    return l($, function(F, O) {
      return p(F, O, R);
    });
  }
  return nc = m, nc;
}
var rc, Fp;
function AL() {
  if (Fp) return rc;
  Fp = 1;
  var n = gg(), r = gL(), i = mv, o = wv, l = i(function(d, p) {
    if (d == null)
      return [];
    var g = p.length;
    return g > 1 && o(d, p[0], p[1]) ? p = [] : g > 2 && o(p[0], p[1], p[2]) && (p = [p[0]]), r(d, n(p, 1), []);
  });
  return rc = l, rc;
}
var hL = za, yg = hL("sortBy", AL());
yg.placeholder = pi();
var _L = yg, ic, Lp;
function yL() {
  if (Lp) return ic;
  Lp = 1;
  function n(r, i, o) {
    for (var l = -1, d = r == null ? 0 : r.length; ++l < d; )
      if (o(i, r[l]))
        return !0;
    return !1;
  }
  return ic = n, ic;
}
var ac, zp;
function bL() {
  if (zp) return ac;
  zp = 1;
  var n = Jv(), r = Fv(), i = Hc(), o = 1 / 0, l = n && 1 / i(new n([, -0]))[1] == o ? function(d) {
    return new n(d);
  } : r;
  return ac = l, ac;
}
var sc, jp;
function mL() {
  if (jp) return sc;
  jp = 1;
  var n = rg(), r = Bv(), i = yL(), o = ig(), l = bL(), d = Hc(), p = 200;
  function g(v, m, y) {
    var h = -1, R = r, P = v.length, $ = !0, F = [], O = F;
    if (y)
      $ = !1, R = i;
    else if (P >= p) {
      var M = m ? null : l(v);
      if (M)
        return d(M);
      $ = !1, R = o, O = new n();
    } else
      O = m ? [] : F;
    e:
      for (; ++h < P; ) {
        var L = v[h], J = m ? m(L) : L;
        if (L = y || L !== 0 ? L : 0, $ && J === J) {
          for (var te = O.length; te--; )
            if (O[te] === J)
              continue e;
          m && O.push(J), F.push(L);
        } else R(O, J, y) || (O !== F && O.push(J), F.push(L));
      }
    return F;
  }
  return sc = g, sc;
}
var oc, Bp;
function wL() {
  if (Bp) return oc;
  Bp = 1;
  var n = La, r = mL();
  function i(o, l) {
    return o && o.length ? r(o, n(l)) : [];
  }
  return oc = i, oc;
}
var CL = za, bg = CL("uniqBy", wL());
bg.placeholder = pi();
var xL = bg, RL = Ea, EL = kv, kL = La;
function SL(n, r) {
  var i = {};
  return r = kL(r), EL(n, function(o, l, d) {
    RL(i, r(o, l, d), o);
  }), i;
}
var $L = SL, IL = {
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
}, TL = {
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
}, OL = {
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
}, PL = {
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
}, ML = {
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
}, FL = {
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
}, LL = {
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
}, zL = {
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
}, jL = {
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
}, BL = {
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
}, DL = {
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
}, WL = {
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
}, NL = {
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
}, UL = {
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
}, qL = {
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
}, GL = {
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
}, HL = {
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
}, KL = {
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
}, YL = {
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
}, VL = {
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
}, ZL = {
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
}, JL = {
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
}, XL = {
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
}, QL = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  cs_CZ: IL,
  da_DK: TL,
  de_DE: OL,
  en_US: PL,
  es_ES: ML,
  fi_FI: FL,
  fr_FR: LL,
  hu_HU: zL,
  id_ID: jL,
  it_IT: BL,
  ja_JP: DL,
  ko_KR: WL,
  nb_NO: NL,
  nl_NL: UL,
  pl_PL: qL,
  pt_BR: GL,
  ru_RU: HL,
  sv_SE: KL,
  tr_TR: YL,
  uk_UA: VL,
  vi_VN: ZL,
  zh_CN: JL,
  zh_TW: XL
});
ln("c2pa:selector:editsAndActivity");
$L(QL, (n, r) => r.replace("_", "-"));
dL(sL, xL((n) => n.id), _L((n) => n.label));
const ja = (...n) => n.filter((r) => r).join(" "), mg = (n, r) => {
  (n.key === "Enter" || n.key === " ") && (n.preventDefault(), r && r(n));
}, e3 = (n) => `https://verify.contentauthenticity.org/inspect?source=${n}`, Dp = "en", Dn = "en_US", cc = {
  en: "en_US",
  no: "no_NO",
  sv: "sv_SE"
}, t3 = {
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
}, n3 = {
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
}, r3 = {
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
}, wc = {
  en_US: t3,
  no_NO: n3,
  sv_SE: r3
}, i3 = (n = Dn) => n.split("_")[0], a3 = (n = Dp) => cc.hasOwnProperty(n) ? cc[n] : cc[Dp], s3 = (n = Dn) => {
  const r = i3(n);
  return a3(r);
}, wg = (n = Dn) => {
  let r;
  if (wc.hasOwnProperty(n))
    r = n;
  else {
    const i = s3(n);
    wc.hasOwnProperty(i) ? r = i : r = Dn;
  }
  return r;
}, o3 = (n = Dn) => {
  const r = wg(n);
  return wc[r];
}, c3 = (n = Dn, ...r) => o3(n)[r.join("_")], Cg = (n = Dn, r) => {
  const i = r ? new Date(r) : null;
  return i instanceof Date && isFinite(i.getTime()) ? i.toLocaleDateString(n.replace("_", "-"), {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  }) : null;
}, l3 = "https://cdn.jsdelivr.net/npm/@contentauth/c2pa-web/dist/resources/c2pa_bg.wasm", d3 = (n = {}) => ({
  wasmSrc: n.wasmSrc || l3
}), u3 = async (n, r) => {
  const o = await (await fetch(r)).blob(), l = await n.reader.fromBlob(o.type, o);
  return { manifestStore: await l.manifestStore(), reader: l };
}, ti = (n, r) => {
  var l, d;
  return ((d = (l = n == null ? void 0 : n.assertions) == null ? void 0 : l.find((p) => p.label === "stds.exif")) == null ? void 0 : d.data)[`exif:${r}`];
}, f3 = (n, r) => {
  var l, d;
  return ((d = (l = n == null ? void 0 : n.assertions) == null ? void 0 : l.find((p) => p.label.includes("stds.schema-org"))) == null ? void 0 : d.data)[r];
}, p3 = (n) => n == null ? void 0 : n.instance_id, v3 = (n) => f3(n, "author") ?? [], g3 = (n) => {
  var r;
  return n != null && n.claim_generator_info ? (r = n == null ? void 0 : n.claim_generator_info) == null ? void 0 : r.map(
    (i) => [i.name, i.version].filter((o) => o != null).join(" ")
  ).join(", ") : ti(n, "Make") || ti(n, "Model") ? (ti(n, "Make"), [ti(n, "Model")].join(" ")) : n != null && n.claim_generator ? n == null ? void 0 : n.claim_generator : null;
}, A3 = (n) => {
  var r;
  return (r = n == null ? void 0 : n.signature_info) == null ? void 0 : r.issuer;
}, h3 = (n, r) => {
  var i, o;
  if ((i = n == null ? void 0 : n.signature_info) != null && i.time)
    return new Date((o = n == null ? void 0 : n.signature_info) == null ? void 0 : o.time);
  {
    const d = ti(n, "DateTimeOriginal").split(/\D/);
    return new Date(
      d[0],
      d[1] - 1,
      d[2],
      d[3],
      d[4],
      d[5]
    );
  }
}, _3 = async (n, r) => {
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
}, y3 = (n) => `https://verify.contentauthenticity.org/inspect?source=${n}`, b3 = async ({ src: n, locale: r, manifest: i, reader: o }) => (wg(r), {
  id: p3(i),
  producer: v3(i),
  generator: g3(i),
  signator: A3(i),
  timestamp: h3(i),
  // ingredients: getIngredients(manifest),
  thumbnail: await _3(i, o),
  // location: getLocation(manifest),
  verifyUrl: y3(n)
}), xg = ha({
  c2pa: null
}), m3 = () => _a(xg), w3 = ({
  children: n
}) => {
  const [r, i] = ct(null);
  return wt(() => {
    (async () => {
      const l = await e2(d3());
      i(l);
    })();
  }, []), /* @__PURE__ */ fr.createElement(
    xg.Provider,
    {
      value: {
        c2pa: r
      }
    },
    n
  );
}, Rg = ha({
  src: null,
  alt: null,
  caption: null,
  byline: null,
  manifests: [],
  setManifests: () => !1
}), Ba = () => _a(Rg), C3 = ({
  src: n,
  alt: r,
  caption: i,
  byline: o,
  children: l
}) => {
  const [d, p] = ct([]);
  return /* @__PURE__ */ fr.createElement(
    Rg.Provider,
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
}, Eg = ha({
  locale: null,
  setLocale: () => null,
  dictionary: !1,
  getText: () => null
}), Un = () => _a(Eg), x3 = ({
  locale: n,
  children: r
}) => {
  const i = (...o) => c3(n, ...o);
  return /* @__PURE__ */ fr.createElement(
    Eg.Provider,
    {
      value: {
        locale: n,
        getText: i
      }
    },
    r
  );
}, R3 = "expand", E3 = [
  "producer",
  // 'producerSocials',
  "timestamp",
  "signator",
  // 'ingredients',
  "generator",
  // 'verify',
  "location"
], k3 = [
  "signator",
  "generator"
], kg = ha({
  elem: null,
  variant: R3,
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
}), Kt = () => _a(kg), S3 = ({
  variant: n,
  children: r
}) => {
  const [i, o] = ct(null), [l, d] = ct(!1), [p, g] = ct(!1), [v, m] = ct(!1), [y, h] = ct(null), [R, P] = ct(null), $ = Mt({}), F = Mt(null), O = (V, ie, ...ke) => {
    var Ne;
    typeof (ie == null ? void 0 : ie.persist) == "function" && ie.persist();
    const Ge = F.current, Lt = (ie == null ? void 0 : ie.nativeEvent) ?? ((Ne = ie == null ? void 0 : ie.detail) == null ? void 0 : Ne.originalEvent) ?? ie;
    typeof Ge == "function" && Ge(V, Lt, ...ke);
  }, M = (V) => {
    d(!0), O("image.hover", V);
  }, L = (V) => {
    d(!1), O("image.unhover", V);
  }, J = (V) => {
    g(!0), O("provenance.open", V);
  }, te = (V) => {
    g(!1), O("provenance.close", V);
  }, _e = (V) => {
    m(!0), O("explainer.open", V);
  }, ge = (V) => {
    m(!1), O("explainer.close", V);
  }, pe = (V, ie) => {
    const ke = Object.assign($.current, {});
    ke[ie.id] = ie, $.current = ke, O("manifest.open", V, ie);
  }, oe = (V, ie) => {
    const ke = Object.assign($.current, {});
    delete ke[ie.id], $.current = ke, O("manifest.close", V, ie);
  }, me = (V, ie) => {
    h(V), O("manifest.compareImage.add", ie);
  }, Ie = (V) => {
    h(null), O("manifest.compareImage.remove", V);
  }, We = (V) => {
    P(V);
  };
  return /* @__PURE__ */ fr.createElement(
    kg.Provider,
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
        hoverImage: M,
        unhoverImage: L,
        openProvenance: J,
        closeProvenance: te,
        // toggleProvenance,
        openExplainer: _e,
        closeExplainer: ge,
        // toggleExplainer,
        // setActiveManifests,
        openManifest: pe,
        closeManifest: oe,
        addCompareImage: me,
        removeCompareImage: Ie,
        updateComparePosition: We,
        eventHandler: F
      }
    },
    r
  );
}, $3 = "Syw-App", I3 = "Syw-App_hovered", T3 = "Syw-App_active", O3 = "Syw-App_expand", P3 = "Syw-App_modal", Xr = {
  App: $3,
  App_hovered: I3,
  App_active: T3,
  App_expand: O3,
  App_modal: P3
}, M3 = (n) => {
  const { c2pa: r } = m3(), [i, o] = ct(null), [l, d] = ct(null);
  return wt(() => {
    if (!n || !r) return;
    let p = !1;
    return (async () => {
      try {
        const { manifestStore: v, reader: m } = await u3(r, n);
        p || (o(m), d({ manifestStore: v }));
      } catch (v) {
        console.error(v);
      }
    })(), () => {
      p = !0;
    };
  }, [n, r]), { reader: i, provenance: l };
}, F3 = "Syw-Figure", L3 = {
  Figure: F3
};
var da = { exports: {} }, Qr = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Wp;
function z3() {
  if (Wp) return Qr;
  Wp = 1;
  var n = fr, r = Symbol.for("react.element"), i = Symbol.for("react.fragment"), o = Object.prototype.hasOwnProperty, l = n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, d = { key: !0, ref: !0, __self: !0, __source: !0 };
  function p(g, v, m) {
    var y, h = {}, R = null, P = null;
    m !== void 0 && (R = "" + m), v.key !== void 0 && (R = "" + v.key), v.ref !== void 0 && (P = v.ref);
    for (y in v) o.call(v, y) && !d.hasOwnProperty(y) && (h[y] = v[y]);
    if (g && g.defaultProps) for (y in v = g.defaultProps, v) h[y] === void 0 && (h[y] = v[y]);
    return { $$typeof: r, type: g, key: R, ref: P, props: h, _owner: l.current };
  }
  return Qr.Fragment = i, Qr.jsx = p, Qr.jsxs = p, Qr;
}
var ei = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Np;
function j3() {
  return Np || (Np = 1, process.env.NODE_ENV !== "production" && (function() {
    var n = fr, r = Symbol.for("react.element"), i = Symbol.for("react.portal"), o = Symbol.for("react.fragment"), l = Symbol.for("react.strict_mode"), d = Symbol.for("react.profiler"), p = Symbol.for("react.provider"), g = Symbol.for("react.context"), v = Symbol.for("react.forward_ref"), m = Symbol.for("react.suspense"), y = Symbol.for("react.suspense_list"), h = Symbol.for("react.memo"), R = Symbol.for("react.lazy"), P = Symbol.for("react.offscreen"), $ = Symbol.iterator, F = "@@iterator";
    function O(_) {
      if (_ === null || typeof _ != "object")
        return null;
      var T = $ && _[$] || _[F];
      return typeof T == "function" ? T : null;
    }
    var M = n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function L(_) {
      {
        for (var T = arguments.length, B = new Array(T > 1 ? T - 1 : 0), Z = 1; Z < T; Z++)
          B[Z - 1] = arguments[Z];
        J("error", _, B);
      }
    }
    function J(_, T, B) {
      {
        var Z = M.ReactDebugCurrentFrame, fe = Z.getStackAddendum();
        fe !== "" && (T += "%s", B = B.concat([fe]));
        var Ae = B.map(function(le) {
          return String(le);
        });
        Ae.unshift("Warning: " + T), Function.prototype.apply.call(console[_], console, Ae);
      }
    }
    var te = !1, _e = !1, ge = !1, pe = !1, oe = !1, me;
    me = Symbol.for("react.module.reference");
    function Ie(_) {
      return !!(typeof _ == "string" || typeof _ == "function" || _ === o || _ === d || oe || _ === l || _ === m || _ === y || pe || _ === P || te || _e || ge || typeof _ == "object" && _ !== null && (_.$$typeof === R || _.$$typeof === h || _.$$typeof === p || _.$$typeof === g || _.$$typeof === v || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      _.$$typeof === me || _.getModuleId !== void 0));
    }
    function We(_, T, B) {
      var Z = _.displayName;
      if (Z)
        return Z;
      var fe = T.displayName || T.name || "";
      return fe !== "" ? B + "(" + fe + ")" : B;
    }
    function V(_) {
      return _.displayName || "Context";
    }
    function ie(_) {
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
            var T = _;
            return V(T) + ".Consumer";
          case p:
            var B = _;
            return V(B._context) + ".Provider";
          case v:
            return We(_, _.render, "ForwardRef");
          case h:
            var Z = _.displayName || null;
            return Z !== null ? Z : ie(_.type) || "Memo";
          case R: {
            var fe = _, Ae = fe._payload, le = fe._init;
            try {
              return ie(le(Ae));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var ke = Object.assign, Ge = 0, Lt, Ne, Xe, dn, Yt, Qe, xn;
    function Ue() {
    }
    Ue.__reactDisabledLog = !0;
    function Vt() {
      {
        if (Ge === 0) {
          Lt = console.log, Ne = console.info, Xe = console.warn, dn = console.error, Yt = console.group, Qe = console.groupCollapsed, xn = console.groupEnd;
          var _ = {
            configurable: !0,
            enumerable: !0,
            value: Ue,
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
        Ge++;
      }
    }
    function N() {
      {
        if (Ge--, Ge === 0) {
          var _ = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: ke({}, _, {
              value: Lt
            }),
            info: ke({}, _, {
              value: Ne
            }),
            warn: ke({}, _, {
              value: Xe
            }),
            error: ke({}, _, {
              value: dn
            }),
            group: ke({}, _, {
              value: Yt
            }),
            groupCollapsed: ke({}, _, {
              value: Qe
            }),
            groupEnd: ke({}, _, {
              value: xn
            })
          });
        }
        Ge < 0 && L("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var z = M.ReactCurrentDispatcher, D;
    function G(_, T, B) {
      {
        if (D === void 0)
          try {
            throw Error();
          } catch (fe) {
            var Z = fe.stack.trim().match(/\n( *(at )?)/);
            D = Z && Z[1] || "";
          }
        return `
` + D + _;
      }
    }
    var X = !1, Te;
    {
      var He = typeof WeakMap == "function" ? WeakMap : Map;
      Te = new He();
    }
    function Le(_, T) {
      if (!_ || X)
        return "";
      {
        var B = Te.get(_);
        if (B !== void 0)
          return B;
      }
      var Z;
      X = !0;
      var fe = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var Ae;
      Ae = z.current, z.current = null, Vt();
      try {
        if (T) {
          var le = function() {
            throw Error();
          };
          if (Object.defineProperty(le.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(le, []);
            } catch (ze) {
              Z = ze;
            }
            Reflect.construct(_, [], le);
          } else {
            try {
              le.call();
            } catch (ze) {
              Z = ze;
            }
            _.call(le.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (ze) {
            Z = ze;
          }
          _();
        }
      } catch (ze) {
        if (ze && Z && typeof ze.stack == "string") {
          for (var se = ze.stack.split(`
`), Ke = Z.stack.split(`
`), Se = se.length - 1, Oe = Ke.length - 1; Se >= 1 && Oe >= 0 && se[Se] !== Ke[Oe]; )
            Oe--;
          for (; Se >= 1 && Oe >= 0; Se--, Oe--)
            if (se[Se] !== Ke[Oe]) {
              if (Se !== 1 || Oe !== 1)
                do
                  if (Se--, Oe--, Oe < 0 || se[Se] !== Ke[Oe]) {
                    var lt = `
` + se[Se].replace(" at new ", " at ");
                    return _.displayName && lt.includes("<anonymous>") && (lt = lt.replace("<anonymous>", _.displayName)), typeof _ == "function" && Te.set(_, lt), lt;
                  }
                while (Se >= 1 && Oe >= 0);
              break;
            }
        }
      } finally {
        X = !1, z.current = Ae, N(), Error.prepareStackTrace = fe;
      }
      var zt = _ ? _.displayName || _.name : "", Jt = zt ? G(zt) : "";
      return typeof _ == "function" && Te.set(_, Jt), Jt;
    }
    function it(_, T, B) {
      return Le(_, !1);
    }
    function et(_) {
      var T = _.prototype;
      return !!(T && T.isReactComponent);
    }
    function Ct(_, T, B) {
      if (_ == null)
        return "";
      if (typeof _ == "function")
        return Le(_, et(_));
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
            return Ct(_.type, T, B);
          case R: {
            var Z = _, fe = Z._payload, Ae = Z._init;
            try {
              return Ct(Ae(fe), T, B);
            } catch {
            }
          }
        }
      return "";
    }
    var Rn = Object.prototype.hasOwnProperty, xt = {}, Cr = M.ReactDebugCurrentFrame;
    function qn(_) {
      if (_) {
        var T = _._owner, B = Ct(_.type, _._source, T ? T.type : null);
        Cr.setExtraStackFrame(B);
      } else
        Cr.setExtraStackFrame(null);
    }
    function En(_, T, B, Z, fe) {
      {
        var Ae = Function.call.bind(Rn);
        for (var le in _)
          if (Ae(_, le)) {
            var se = void 0;
            try {
              if (typeof _[le] != "function") {
                var Ke = Error((Z || "React class") + ": " + B + " type `" + le + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof _[le] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw Ke.name = "Invariant Violation", Ke;
              }
              se = _[le](T, le, Z, B, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (Se) {
              se = Se;
            }
            se && !(se instanceof Error) && (qn(fe), L("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", Z || "React class", B, le, typeof se), qn(null)), se instanceof Error && !(se.message in xt) && (xt[se.message] = !0, qn(fe), L("Failed %s type: %s", B, se.message), qn(null));
          }
      }
    }
    var gt = Array.isArray;
    function Zt(_) {
      return gt(_);
    }
    function Gn(_) {
      {
        var T = typeof Symbol == "function" && Symbol.toStringTag, B = T && _[Symbol.toStringTag] || _.constructor.name || "Object";
        return B;
      }
    }
    function Da(_) {
      try {
        return un(_), !1;
      } catch {
        return !0;
      }
    }
    function un(_) {
      return "" + _;
    }
    function Ai(_) {
      if (Da(_))
        return L("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Gn(_)), un(_);
    }
    var fn = M.ReactCurrentOwner, pn = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, Hn, Kn;
    function xr(_) {
      if (Rn.call(_, "ref")) {
        var T = Object.getOwnPropertyDescriptor(_, "ref").get;
        if (T && T.isReactWarning)
          return !1;
      }
      return _.ref !== void 0;
    }
    function Rr(_) {
      if (Rn.call(_, "key")) {
        var T = Object.getOwnPropertyDescriptor(_, "key").get;
        if (T && T.isReactWarning)
          return !1;
      }
      return _.key !== void 0;
    }
    function Er(_, T) {
      typeof _.ref == "string" && fn.current;
    }
    function kr(_, T) {
      {
        var B = function() {
          Hn || (Hn = !0, L("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", T));
        };
        B.isReactWarning = !0, Object.defineProperty(_, "key", {
          get: B,
          configurable: !0
        });
      }
    }
    function Sr(_, T) {
      {
        var B = function() {
          Kn || (Kn = !0, L("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", T));
        };
        B.isReactWarning = !0, Object.defineProperty(_, "ref", {
          get: B,
          configurable: !0
        });
      }
    }
    var $r = function(_, T, B, Z, fe, Ae, le) {
      var se = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: r,
        // Built-in properties that belong on the element
        type: _,
        key: T,
        ref: B,
        props: le,
        // Record the component responsible for creating this element.
        _owner: Ae
      };
      return se._store = {}, Object.defineProperty(se._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(se, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: Z
      }), Object.defineProperty(se, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: fe
      }), Object.freeze && (Object.freeze(se.props), Object.freeze(se)), se;
    };
    function Ir(_, T, B, Z, fe) {
      {
        var Ae, le = {}, se = null, Ke = null;
        B !== void 0 && (Ai(B), se = "" + B), Rr(T) && (Ai(T.key), se = "" + T.key), xr(T) && (Ke = T.ref, Er(T, fe));
        for (Ae in T)
          Rn.call(T, Ae) && !pn.hasOwnProperty(Ae) && (le[Ae] = T[Ae]);
        if (_ && _.defaultProps) {
          var Se = _.defaultProps;
          for (Ae in Se)
            le[Ae] === void 0 && (le[Ae] = Se[Ae]);
        }
        if (se || Ke) {
          var Oe = typeof _ == "function" ? _.displayName || _.name || "Unknown" : _;
          se && kr(le, Oe), Ke && Sr(le, Oe);
        }
        return $r(_, se, Ke, fe, Z, fn.current, le);
      }
    }
    var Tr = M.ReactCurrentOwner, hi = M.ReactDebugCurrentFrame;
    function vn(_) {
      if (_) {
        var T = _._owner, B = Ct(_.type, _._source, T ? T.type : null);
        hi.setExtraStackFrame(B);
      } else
        hi.setExtraStackFrame(null);
    }
    var Yn;
    Yn = !1;
    function Vn(_) {
      return typeof _ == "object" && _ !== null && _.$$typeof === r;
    }
    function _i() {
      {
        if (Tr.current) {
          var _ = ie(Tr.current.type);
          if (_)
            return `

Check the render method of \`` + _ + "`.";
        }
        return "";
      }
    }
    function Wa(_) {
      return "";
    }
    var yi = {};
    function Na(_) {
      {
        var T = _i();
        if (!T) {
          var B = typeof _ == "string" ? _ : _.displayName || _.name;
          B && (T = `

Check the top-level render call using <` + B + ">.");
        }
        return T;
      }
    }
    function Or(_, T) {
      {
        if (!_._store || _._store.validated || _.key != null)
          return;
        _._store.validated = !0;
        var B = Na(T);
        if (yi[B])
          return;
        yi[B] = !0;
        var Z = "";
        _ && _._owner && _._owner !== Tr.current && (Z = " It was passed a child from " + ie(_._owner.type) + "."), vn(_), L('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', B, Z), vn(null);
      }
    }
    function bi(_, T) {
      {
        if (typeof _ != "object")
          return;
        if (Zt(_))
          for (var B = 0; B < _.length; B++) {
            var Z = _[B];
            Vn(Z) && Or(Z, T);
          }
        else if (Vn(_))
          _._store && (_._store.validated = !0);
        else if (_) {
          var fe = O(_);
          if (typeof fe == "function" && fe !== _.entries)
            for (var Ae = fe.call(_), le; !(le = Ae.next()).done; )
              Vn(le.value) && Or(le.value, T);
        }
      }
    }
    function Ua(_) {
      {
        var T = _.type;
        if (T == null || typeof T == "string")
          return;
        var B;
        if (typeof T == "function")
          B = T.propTypes;
        else if (typeof T == "object" && (T.$$typeof === v || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        T.$$typeof === h))
          B = T.propTypes;
        else
          return;
        if (B) {
          var Z = ie(T);
          En(B, _.props, "prop", Z, _);
        } else if (T.PropTypes !== void 0 && !Yn) {
          Yn = !0;
          var fe = ie(T);
          L("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", fe || "Unknown");
        }
        typeof T.getDefaultProps == "function" && !T.getDefaultProps.isReactClassApproved && L("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function qa(_) {
      {
        for (var T = Object.keys(_.props), B = 0; B < T.length; B++) {
          var Z = T[B];
          if (Z !== "children" && Z !== "key") {
            vn(_), L("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", Z), vn(null);
            break;
          }
        }
        _.ref !== null && (vn(_), L("Invalid attribute `ref` supplied to `React.Fragment`."), vn(null));
      }
    }
    var Zn = {};
    function mi(_, T, B, Z, fe, Ae) {
      {
        var le = Ie(_);
        if (!le) {
          var se = "";
          (_ === void 0 || typeof _ == "object" && _ !== null && Object.keys(_).length === 0) && (se += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var Ke = Wa();
          Ke ? se += Ke : se += _i();
          var Se;
          _ === null ? Se = "null" : Zt(_) ? Se = "array" : _ !== void 0 && _.$$typeof === r ? (Se = "<" + (ie(_.type) || "Unknown") + " />", se = " Did you accidentally export a JSX literal instead of a component?") : Se = typeof _, L("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", Se, se);
        }
        var Oe = Ir(_, T, B, fe, Ae);
        if (Oe == null)
          return Oe;
        if (le) {
          var lt = T.children;
          if (lt !== void 0)
            if (Z)
              if (Zt(lt)) {
                for (var zt = 0; zt < lt.length; zt++)
                  bi(lt[zt], _);
                Object.freeze && Object.freeze(lt);
              } else
                L("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              bi(lt, _);
        }
        if (Rn.call(T, "key")) {
          var Jt = ie(_), ze = Object.keys(T).filter(function(Va) {
            return Va !== "key";
          }), Mr = ze.length > 0 ? "{key: someKey, " + ze.join(": ..., ") + ": ...}" : "{key: someKey}";
          if (!Zn[Jt + Mr]) {
            var Ya = ze.length > 0 ? "{" + ze.join(": ..., ") + ": ...}" : "{}";
            L(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, Mr, Jt, Ya, Jt), Zn[Jt + Mr] = !0;
          }
        }
        return _ === o ? qa(Oe) : Ua(Oe), Oe;
      }
    }
    function Pr(_, T, B) {
      return mi(_, T, B, !0);
    }
    function Ga(_, T, B) {
      return mi(_, T, B, !1);
    }
    var Ha = Ga, Ka = Pr;
    ei.Fragment = o, ei.jsx = Ha, ei.jsxs = Ka;
  })()), ei;
}
var Up;
function B3() {
  return Up || (Up = 1, process.env.NODE_ENV === "production" ? da.exports = z3() : da.exports = j3()), da.exports;
}
var Sg = B3();
const U = Sg.jsx, Ze = Sg.jsxs, D3 = ({
  children: n
}) => /* @__PURE__ */ U("figure", {
  className: L3.Figure,
  children: n
}), W3 = "Syw-Image", N3 = "Syw-ImageImg", qp = {
  Image: W3,
  ImageImg: N3
}, U3 = () => {
  const {
    src: n,
    alt: r
  } = Ba(), {
    hoverImage: i,
    unhoverImage: o,
    openProvenance: l,
    closeProvenance: d,
    isOpenProvenance: p
  } = Kt(), g = jn((h) => p ? d(h) : l(h), [l, d, p]), v = jn((h) => mg(h, p ? d : l), [l, d, p]), m = jn((h) => i(h), [i]), y = jn((h) => o(h), [o]);
  return /* @__PURE__ */ U("div", {
    className: qp.Image,
    onClick: g,
    onKeyDown: v,
    onMouseEnter: m,
    onMouseLeave: y,
    tabIndex: 0,
    children: /* @__PURE__ */ U("img", {
      src: n,
      alt: r,
      className: qp.ImageImg
    })
  });
}, q3 = "Syw-Cutline", G3 = "Syw-CutlineToggles", Gp = {
  Cutline: q3,
  CutlineToggles: G3
}, H3 = "Syw-ProvenanceToggle", K3 = {
  ProvenanceToggle: H3
}, Y3 = () => {
  const {
    isOpenProvenance: n,
    openProvenance: r,
    closeProvenance: i
  } = Kt(), {
    getText: o
  } = Un(), l = (d) => n ? i(d) : r(d);
  return /* @__PURE__ */ U("button", {
    "aria-pressed": n,
    className: K3.ProvenanceToggle,
    onClick: l,
    children: o("toggle", "provenance")
  });
}, V3 = "Syw-ExplainerToggle", Z3 = {
  ExplainerToggle: V3
}, $g = () => {
  const {
    variant: n,
    isOpenExplainer: r,
    openExplainer: i,
    closeExplainer: o,
    openProvenance: l
  } = Kt(), {
    getText: d
  } = Un(), p = (g) => {
    r ? o(g) : i(g), n === "modal" && l(g);
  };
  return /* @__PURE__ */ U("button", {
    className: Z3.ExplainerToggle,
    "aria-pressed": r,
    onClick: p,
    children: d("toggle", "explain")
  });
}, J3 = ({
  caption: n,
  byline: r
}) => /* @__PURE__ */ U("div", {
  className: Gp.Cutline,
  children: /* @__PURE__ */ Ze("div", {
    className: Gp.CutlineToggles,
    children: [/* @__PURE__ */ U(Y3, {}), /* @__PURE__ */ U($g, {})]
  })
}), X3 = "Syw-Caption", Q3 = "Syw-CaptionInner", ez = "Syw-CaptionByline", lc = {
  Caption: X3,
  CaptionInner: Q3,
  CaptionByline: ez
}, tz = () => {
  const {
    caption: n,
    byline: r
  } = Ba();
  return n || r ? /* @__PURE__ */ U("figcaption", {
    className: lc.Caption,
    children: /* @__PURE__ */ Ze("div", {
      className: lc.CaptionInner,
      children: [n, " ", /* @__PURE__ */ U("em", {
        className: lc.CaptionByline,
        children: r
      })]
    })
  }) : null;
}, nz = "Syw-Explainer", rz = "Syw-ExplainerInner", iz = "Syw-ExplainerMore", az = "Syw-ExplainerClose", ua = {
  Explainer: nz,
  ExplainerInner: rz,
  ExplainerMore: iz,
  ExplainerClose: az
};
var sz = process.env.NODE_ENV === "production";
function oz(n, r) {
  if (!sz) {
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
var cz = class extends Error {
  constructor(n) {
    super(`react-collapsed: ${n}`);
  }
}, ga = (...n) => oz(n[0], `[react-collapsed] -- ${n[1]}`);
function Ig(n) {
  const r = Mt(n);
  return wt(() => {
    r.current = n;
  }), jn((...i) => {
    var o;
    return (o = r.current) == null ? void 0 : o.call(r, ...i);
  }, []);
}
function lz(n, r, i) {
  const [o, l] = ct(r), d = Mt(typeof n < "u"), p = d.current ? n : o, g = Ig(i), v = jn(
    (m) => {
      const h = typeof m == "function" ? m(p) : m;
      d.current || l(h), g == null || g(h);
    },
    [g, p]
  );
  return wt(() => {
    ga(
      !(d.current && n == null),
      "`isExpanded` state is changing from controlled to uncontrolled. useCollapse should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled collapse for the lifetime of the component. Check the `isExpanded` prop."
    ), ga(
      !(!d.current && n != null),
      "`isExpanded` state is changing from uncontrolled to controlled. useCollapse should not switch from uncontrolled to controlled (or vice versa). Decide between using a controlled or uncontrolled collapse for the lifetime of the component. Check the `isExpanded` prop."
    );
  }, [n]), [p, v];
}
var dz = "(prefers-reduced-motion: reduce)";
function uz() {
  const [n, r] = ct(!1);
  return wt(() => {
    if (typeof window > "u" || typeof window.matchMedia != "function")
      return;
    const i = window.matchMedia(dz);
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
var fz = ai.useId || (() => {
});
function pz() {
  return fz() ?? "";
}
var vz = typeof window < "u" ? ai.useLayoutEffect : ai.useEffect, dc = !1, gz = 0, Hp = () => ++gz;
function Az(n) {
  const r = n || (dc ? Hp() : null), [i, o] = ai.useState(r);
  return vz(() => {
    i === null && o(Hp());
  }, []), ai.useEffect(() => {
    dc === !1 && (dc = !0);
  }, []), i != null ? String(i) : void 0;
}
function hz(n) {
  const r = pz(), i = Az(n);
  return typeof n == "string" ? n : typeof r == "string" ? r : i;
}
function _z(n, r) {
  const i = performance.now(), o = {};
  function l() {
    o.id = requestAnimationFrame((d) => {
      d - i > r ? n() : l();
    });
  }
  return l(), o;
}
function Kp(n) {
  n.id && cancelAnimationFrame(n.id);
}
function Yp(n) {
  return n != null && n.current ? n.current.scrollHeight : (ga(
    !0,
    "Was not able to find a ref to the collapse element via `getCollapseProps`. Ensure that the element exposes its `ref` prop. If it exposes the ref prop under a different name (like `innerRef`), use the `refKey` property to change it. Example:\n\nconst collapseProps = getCollapseProps({refKey: 'innerRef'})"
  ), 0);
}
function yz(n) {
  if (!n || typeof n == "string")
    return 0;
  const r = n / 36;
  return Math.round((4 + 15 * r ** 0.25 + r / 5) * 10);
}
function bz(n, r) {
  if (n != null)
    if (typeof n == "function")
      n(r);
    else
      try {
        n.current = r;
      } catch {
        throw new cz(`Cannot assign value "${r}" to ref "${n}"`);
      }
}
function Vp(...n) {
  return n.every((r) => r == null) ? null : (r) => {
    n.forEach((i) => {
      bz(i, r);
    });
  };
}
function mz(n) {
  let r = (i) => {
  };
  r = (i) => {
    if (!(i != null && i.current))
      return;
    const { paddingTop: o, paddingBottom: l } = window.getComputedStyle(i.current);
    ga(
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
var wz = typeof window > "u" ? wt : Bw;
function Cz({
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
  const v = Ig(i), m = hz(p ? `${p}` : void 0), [y, h] = lz(
    o,
    l
  ), R = Mt(y), [P, $] = ct(!1), F = uz(), O = d ?? F, M = Mt(), L = Mt(), J = Mt(null), [te, _e] = ct(null);
  mz(J);
  const ge = `${g.collapsedHeight || 0}px`;
  function pe(oe) {
    if (!J.current)
      return;
    const me = J.current;
    for (const Ie in oe) {
      const We = oe[Ie];
      We ? me.style[Ie] = We : me.style.removeProperty(Ie);
    }
  }
  return wz(() => {
    if (!J.current || y === R.current)
      return;
    R.current = y;
    function me(V) {
      return O ? 0 : n ?? yz(V);
    }
    const Ie = (V) => `height ${me(V)}ms ${r}`, We = (V) => {
      function ie() {
        y ? (pe({
          height: "",
          overflow: "",
          transition: "",
          display: ""
        }), v("expandEnd")) : (pe({ transition: "" }), v("collapseEnd")), $(!1);
      }
      L.current && Kp(L.current), L.current = _z(ie, V);
    };
    return $(!0), y ? M.current = requestAnimationFrame(() => {
      v("expandStart"), pe({
        display: "block",
        overflow: "hidden",
        height: ge
      }), M.current = requestAnimationFrame(() => {
        v("expanding");
        const V = Yp(J);
        We(me(V)), J.current && (J.current.style.transition = Ie(V), J.current.style.height = `${V}px`);
      });
    }) : M.current = requestAnimationFrame(() => {
      v("collapseStart");
      const V = Yp(J);
      We(me(V)), pe({
        transition: Ie(V),
        height: `${V}px`
      }), M.current = requestAnimationFrame(() => {
        v("collapsing"), pe({
          height: ge,
          overflow: "hidden"
        });
      });
    }), () => {
      M.current && cancelAnimationFrame(M.current), L.current && Kp(L.current);
    };
  }, [
    y,
    ge,
    O,
    n,
    r,
    v
  ]), {
    isExpanded: y,
    setExpanded: h,
    getToggleProps(oe) {
      const { disabled: me, onClick: Ie, refKey: We, ...V } = {
        refKey: "ref",
        onClick() {
        },
        disabled: !1,
        ...oe
      }, ie = te ? te.tagName === "BUTTON" : void 0, ke = oe == null ? void 0 : oe[We || "ref"], Ge = {
        id: `react-collapsed-toggle-${m}`,
        "aria-controls": `react-collapsed-panel-${m}`,
        "aria-expanded": y,
        onClick(Xe) {
          me || (Ie == null || Ie(Xe), h((dn) => !dn));
        },
        [We || "ref"]: Vp(ke, _e)
      }, Lt = {
        type: "button",
        disabled: me ? !0 : void 0
      }, Ne = {
        "aria-disabled": me ? !0 : void 0,
        role: "button",
        tabIndex: me ? -1 : 0
      };
      return ie === !1 ? { ...Ge, ...Ne, ...V } : ie === !0 ? { ...Ge, ...Lt, ...V } : {
        ...Ge,
        ...Lt,
        ...Ne,
        ...V
      };
    },
    getCollapseProps(oe) {
      const { style: me, refKey: Ie } = { refKey: "ref", style: {}, ...oe }, We = oe == null ? void 0 : oe[Ie || "ref"];
      return {
        id: `react-collapsed-panel-${m}`,
        "aria-hidden": !y,
        "aria-labelledby": `react-collapsed-toggle-${m}`,
        role: "region",
        ...oe,
        [Ie || "ref"]: Vp(J, We),
        style: {
          boxSizing: "border-box",
          ...!P && !y ? {
            // collapsed and not animating
            display: ge === "0px" ? "none" : "block",
            height: ge,
            overflow: "hidden"
          } : {},
          // additional styles passed, e.g. getCollapseProps({style: {}})
          ...me
        }
      };
    }
  };
}
const xz = "Syw-Collapse", Rz = "Syw-Collapse_open", Ez = "Syw-CollapseInner", uc = {
  Collapse: xz,
  Collapse_open: Rz,
  CollapseInner: Ez
}, Jc = ({
  open: n = !1,
  children: r
}) => {
  const {
    getCollapseProps: i
  } = Cz({
    isExpanded: n,
    defaultExpanded: !1
  }), o = ya(() => ja(uc.Collapse, n ? uc.Collapse_open : !1), [n]);
  return /* @__PURE__ */ U("div", {
    ...i(),
    className: o,
    "aria-labelledby": null,
    id: null,
    children: /* @__PURE__ */ U("div", {
      className: uc.CollapseInner,
      children: r
    })
  });
}, Tg = () => {
  const {
    getText: n
  } = Un(), {
    isOpenExplainer: r,
    closeExplainer: i
  } = Kt(), o = i;
  return /* @__PURE__ */ U("div", {
    className: ua.Explainer,
    children: /* @__PURE__ */ U(Jc, {
      open: r,
      children: /* @__PURE__ */ Ze("div", {
        className: ua.ExplainerInner,
        children: [/* @__PURE__ */ U("button", {
          className: ua.ExplainerClose,
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
        }), /* @__PURE__ */ Ze("div", {
          className: ua.ExplainerMore,
          children: [n("explainer", "methods", "pre"), " ", /* @__PURE__ */ U("a", {
            href: n("explainer", "methods", "url"),
            children: n("explainer", "methods", "link")
          })]
        })]
      })
    })
  });
}, kz = "Syw-Provenance", Sz = "Syw-ProvenanceList", $z = "Syw-ProvenanceVerify", fc = {
  Provenance: kz,
  ProvenanceList: Sz,
  ProvenanceVerify: $z
}, Iz = "Syw-Manifest", Tz = "Syw-Manifest_open", Oz = "Syw-ManifestRow", Pz = "Syw-ManifestPreview", Mz = "Syw-ManifestPreviewCell", Fz = "Syw-ManifestPreviewCell_issuer", Lz = "Syw-ManifestPreviewCell_time", zz = "Syw-ManifestPreviewCell_thumb", jz = "Syw-ManifestPreviewCell_thumb_hover", Bz = "Syw-ManifestContent", Dz = "Syw-ManifestTable", Wz = "Syw-ManifestTableRow", Nz = "Syw-ManifestTableRowLabel", Uz = "Syw-ManifestTableRowValue", rt = {
  Manifest: Iz,
  Manifest_open: Tz,
  ManifestRow: Oz,
  ManifestPreview: Pz,
  ManifestPreviewCell: Mz,
  ManifestPreviewCell_issuer: Fz,
  ManifestPreviewCell_time: Lz,
  ManifestPreviewCell_thumb: zz,
  ManifestPreviewCell_thumb_hover: jz,
  ManifestContent: Bz,
  ManifestTable: Dz,
  ManifestTableRow: Wz,
  ManifestTableRowLabel: Nz,
  ManifestTableRowValue: Uz
};
function qz({
  manifest: n,
  toggled: r,
  onToggle: i,
  previewRef: o
}) {
  const {
    locale: l
  } = Un(), {
    compareImage: d,
    addCompareImage: p,
    removeCompareImage: g,
    updateComparePosition: v
  } = Kt(), m = n == null ? void 0 : n.thumbnail, y = ($) => {
    mg($, i);
  }, h = ($) => {
    v($);
  }, R = ($) => {
    p(m, $);
  }, P = ($) => {
    g($);
  };
  return /* @__PURE__ */ Ze("div", {
    ref: o,
    role: "button",
    tabIndex: 0,
    "aria-pressed": r,
    className: rt.ManifestPreview,
    onClick: i,
    onKeyDown: y,
    children: [/* @__PURE__ */ U("div", {
      className: `${rt.ManifestPreviewCell} ${rt.ManifestPreviewCell_issuer}`,
      children: k3.filter(($) => n[$]).map(($) => n[$]).join(" ")
    }), /* @__PURE__ */ U("div", {
      className: `${rt.ManifestPreviewCell} ${rt.ManifestPreviewCell_time}`,
      children: /* @__PURE__ */ U("span", {
        children: Cg(l, n.timestamp)
      })
    }), /* @__PURE__ */ U("div", {
      className: ja(rt.ManifestPreviewCell, rt.ManifestPreviewCell_thumb, m === d ? rt.ManifestPreviewCell_thumb_hover : null),
      onMouseMove: h,
      onMouseEnter: R,
      onMouseLeave: P,
      children: /* @__PURE__ */ U("img", {
        src: m
      })
    })]
  });
}
function Gz({
  type: n,
  value: r
}) {
  const {
    locale: i,
    getText: o
  } = Un(), l = ya(() => {
    switch (n) {
      case "producer":
        return r.map((d) => d.name).join(", ");
      case "timestamp":
        return Cg(i, r);
      case "location":
        return null;
      default:
        return r;
    }
  }, [n, r]);
  return /* @__PURE__ */ Ze("li", {
    className: rt.ManifestTableRow,
    children: [/* @__PURE__ */ U("div", {
      className: rt.ManifestTableRowLabel,
      children: o(n)
    }), /* @__PURE__ */ U("div", {
      className: rt.ManifestTableRowValue,
      children: l
    })]
  });
}
function Hz({
  manifest: n
}) {
  return /* @__PURE__ */ U("ul", {
    className: rt.ManifestTable,
    children: E3.map((r) => n[r] ? /* @__PURE__ */ U(Gz, {
      type: r,
      value: n[r]
    }, r) : null)
  });
}
function Kz({
  manifest: n,
  previewRef: r
}) {
  const [i, o] = ct(!1), {
    isOpenProvenance: l,
    openManifests: d,
    openManifest: p,
    closeManifest: g,
    removeCompareImage: v
  } = Kt(), m = ya(() => [rt.Manifest, i ? rt.Manifest_open : null].filter((h) => h).join(" "), [i]), y = jn((h) => {
    v(), o(!i), i ? g(h, n) : p(h, n);
  }, [i, n, p, g, d]);
  return wt(() => {
    l || o(!1);
  }, [l]), /* @__PURE__ */ U("li", {
    className: m,
    children: /* @__PURE__ */ Ze("div", {
      className: rt.ManifestRow,
      children: [/* @__PURE__ */ U(qz, {
        manifest: n,
        toggled: i,
        onToggle: y,
        previewRef: r
      }), /* @__PURE__ */ U(Jc, {
        open: i,
        children: /* @__PURE__ */ U("div", {
          className: rt.ManifestContent,
          children: /* @__PURE__ */ U(Hz, {
            manifest: n
          })
        })
      })]
    })
  });
}
function Og() {
  const n = Mt(null), r = Mt(null), {
    getText: i
  } = Un(), {
    src: o,
    manifests: l
  } = Ba(), {
    isOpenProvenance: d
  } = Kt(), p = e3(o);
  return wt(() => {
    var g;
    d && r.current && ((g = r.current) == null || g.focus());
  }, [r, d]), /* @__PURE__ */ Ze("div", {
    ref: n,
    className: fc.Provenance,
    children: [/* @__PURE__ */ U("ul", {
      className: fc.ProvenanceList,
      children: l ? l.map((g, v) => /* @__PURE__ */ U(Kz, {
        manifest: g,
        previewRef: v === 0 ? r : null
      }, v)) : null
    }), /* @__PURE__ */ Ze("div", {
      className: fc.ProvenanceVerify,
      children: [i("verify", "pre"), " ", /* @__PURE__ */ U("a", {
        href: p,
        target: "_blank",
        children: i("verify", "cc")
      })]
    })]
  });
}
const Yz = "Syw-ProvenanceModal", Vz = "Syw-ProvenanceModalExplainer", Zp = {
  ProvenanceModal: Yz,
  ProvenanceModalExplainer: Vz
}, Zz = "Syw-Modal", Jz = "Syw-Modal_open", Xz = "Syw-ModalOverlay", Qz = "Syw-ModalContent", ej = "Syw-ModalContentBox", tj = "Syw-ModalContentHeader", nj = "Syw-ModalClose", Ln = {
  Modal: Zz,
  Modal_open: Jz,
  ModalOverlay: Xz,
  ModalContent: Qz,
  ModalContentBox: ej,
  ModalContentHeader: tj,
  ModalClose: nj
};
let oi = null, ni = [], Aa = null, Cc = null, ri = null, xc = null;
function rj(n, r) {
  oi = n, xc = r, ij(), Mg(!0);
}
function Rc() {
  oi && (xc && xc(), typeof document < "u" && document.removeEventListener("keydown", Pg), ri && ri.focus && (ri.focus(), ri = null), oi = null, Mg(!1));
}
function Pg(n) {
  if (oi) {
    if (n.key === "Escape")
      return Rc();
    if (n.key === "Tab") {
      if (ni.length === 0) {
        n.preventDefault();
        return;
      }
      n.shiftKey ? typeof document < "u" && document.activeElement === Aa && (Cc.focus(), n.preventDefault()) : typeof document < "u" && document.activeElement === Cc && (Aa.focus(), n.preventDefault());
    }
  }
}
function ij() {
  typeof document < "u" && (ri = document.activeElement), ni = Array.from(
    oi.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])')
  ).filter((n) => n.tabIndex !== -1), Aa = ni[0], Cc = ni[ni.length - 1], Aa.focus(), typeof document < "u" && document.addEventListener("keydown", Pg);
}
function Mg(n) {
  typeof document < "u" && (document.body.style.overflow = n ? "hidden" : "");
}
const aj = ({
  open: n = !1,
  title: r,
  description: i,
  onOpenChange: o,
  children: l,
  className: d
}) => {
  const p = Mt(), g = Cu(), v = Cu(), m = (y) => {
    o(!1, y);
  };
  return wt(() => (n ? rj(p.current, o) : Rc(), () => {
    p.current && Rc();
  }), [n, p]), /* @__PURE__ */ Ze("div", {
    ref: p,
    className: ja(Ln.Modal, n ? Ln.Modal_open : null, d),
    children: [/* @__PURE__ */ U("div", {
      className: Ln.ModalOverlay,
      onClick: m
    }), /* @__PURE__ */ Ze("div", {
      role: "dialog",
      "aria-modal": "true",
      "aria-labelledby": g,
      "aria-describedby": v,
      className: Ln.ModalContent,
      children: [/* @__PURE__ */ Ze("div", {
        className: Ln.ModalContentBox,
        children: [r ? /* @__PURE__ */ Ze("hgroup", {
          className: Ln.ModalContentHeader,
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
        className: Ln.ModalClose
      })]
    })]
  });
}, sj = () => {
  const {
    isOpenExplainer: n,
    isOpenProvenance: r,
    openProvenance: i,
    closeProvenance: o,
    closeExplainer: l
  } = Kt();
  return /* @__PURE__ */ Ze(aj, {
    open: r,
    title: "Image Origin",
    description: "Explore the provenance of this image",
    onOpenChange: (p, g) => {
      const v = g;
      p ? i(v) : (o(v), l(v));
    },
    className: Zp.ProvenanceModal,
    children: [/* @__PURE__ */ Ze("div", {
      className: Zp.ProvenanceModalExplainer,
      children: [n ? null : /* @__PURE__ */ U($g, {}), /* @__PURE__ */ U(Tg, {})]
    }), /* @__PURE__ */ U(Og, {})]
  });
}, oj = "Syw-ImageCompare", Jp = {
  ImageCompare: oj
}, cj = () => {
  const {
    compareImage: n,
    comparePosition: r
  } = Kt();
  return /* @__PURE__ */ U("div", {
    className: Jp.ImageCompare,
    style: {
      left: `${r == null ? void 0 : r.clientX}px`,
      top: `${r == null ? void 0 : r.clientY}px`
    },
    children: /* @__PURE__ */ U("img", {
      src: n,
      alt: "",
      className: Jp.ImageCompareImg
    })
  });
};
function lj({
  onEvent: n
}) {
  const r = Mt(null), {
    src: i,
    setManifests: o
  } = Ba(), {
    locale: l
  } = Un(), {
    variant: d,
    compareImage: p,
    isHoverImage: g,
    isOpenProvenance: v,
    setElem: m,
    eventHandler: y
  } = Kt(), {
    reader: h,
    provenance: R
  } = M3(i), P = ya(() => ja(Xr.App, Xr[`App_${d}`], g ? Xr.App_hovered : !1, v ? Xr.App_active : !1), [d, g, v]);
  return wt(() => {
    m(r.current);
  }, [r]), wt(() => {
    (async () => {
      var O;
      const F = await Promise.all(Object.values(((O = R == null ? void 0 : R.manifestStore) == null ? void 0 : O.manifests) ?? {}).map((M) => b3({
        src: i,
        locale: l,
        manifest: M,
        reader: h
      })));
      o(F);
    })();
  }, [i, l, R, h]), wt(() => {
    y.current = n;
  }, [y, n]), /* @__PURE__ */ Ze("div", {
    ref: r,
    className: P,
    children: [/* @__PURE__ */ Ze(D3, {
      children: [/* @__PURE__ */ U(U3, {}), d === "expand" ? /* @__PURE__ */ U(Tg, {}) : null, /* @__PURE__ */ U(J3, {}), /* @__PURE__ */ U(tz, {})]
    }), d === "expand" ? /* @__PURE__ */ U(Jc, {
      open: v,
      className: Xr.ProvenanceModal,
      children: /* @__PURE__ */ U(Og, {})
    }) : null, d === "modal" ? /* @__PURE__ */ U(sj, {}) : null, p ? /* @__PURE__ */ U(cj, {}) : null]
  });
}
function Aj({
  locale: n,
  src: r,
  alt: i,
  caption: o,
  byline: l,
  variant: d,
  ...p
}) {
  return /* @__PURE__ */ U(w3, {
    children: /* @__PURE__ */ U(x3, {
      locale: n,
      children: /* @__PURE__ */ U(C3, {
        src: r,
        alt: i,
        caption: o,
        byline: l,
        children: /* @__PURE__ */ U(S3, {
          variant: d,
          children: /* @__PURE__ */ U(lj, {
            ...p
          })
        })
      })
    })
  });
}
export {
  Aj as default
};
