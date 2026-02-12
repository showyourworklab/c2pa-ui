import * as be from "react";
import ie, { createContext as Ie, useContext as Pe, useState as D, useEffect as $, useRef as Y, useCallback as ne, useLayoutEffect as Ot, useMemo as Oe, useId as vn } from "react";
const Bn = Symbol("transfer");
function At(e, n) {
  return {
    type: Bn,
    value: e,
    transfer: n ? Array.isArray(n) ? n : [n] : [e]
  };
}
function hn(e) {
  return !!(e && typeof e == "object" && Reflect.get(e, "type") === Bn);
}
function kn(e = "default") {
  return {
    createTx(n) {
      const r = /* @__PURE__ */ new Map(), o = n ?? self;
      return o.addEventListener("message", (a) => {
        const { data: i } = a;
        if (i.channelName !== e)
          return;
        const { id: c, result: u, error: l } = i, _ = r.get(c);
        _ && (l ? _.reject(l) : _.resolve(u), r.delete(c));
      }), new Proxy(
        {},
        {
          get(a, i) {
            return (...c) => {
              const u = Mt(), l = [], _ = [];
              return c.forEach((g) => {
                hn(g) ? (l.push(g.value), _.push(...g.transfer)) : l.push(g);
              }), o.postMessage(
                { method: i, args: l, id: u, channelName: e },
                { transfer: _ }
              ), new Promise((g, m) => {
                r.set(u, { resolve: g, reject: m });
              });
            };
          }
        }
      );
    },
    rx(n, r) {
      const o = r ?? self;
      o.addEventListener("message", async (a) => {
        const { data: i } = a;
        if (i.channelName !== e)
          return;
        const { method: c, args: u, id: l } = i;
        try {
          const _ = await n[c](...u);
          hn(_) ? o.postMessage(
            { result: _.value, id: l, channelName: e },
            { transfer: _.transfer }
          ) : o.postMessage({ result: _, id: l, channelName: e });
        } catch (_) {
          o.postMessage({ error: _, id: l, channelName: e });
        }
      });
    }
  };
}
function Mt() {
  return new Array(4).fill(0).map(() => Math.floor(Math.random() * Number.MAX_SAFE_INTEGER).toString(16)).join("-");
}
const xe = (e) => {
  if (typeof e == "object" && e !== null) {
    if (typeof Object.getPrototypeOf == "function") {
      const n = Object.getPrototypeOf(e);
      return n === Object.prototype || n === null;
    }
    return Object.prototype.toString.call(e) === "[object Object]";
  }
  return !1;
}, q = (...e) => e.reduce((n, r) => {
  if (r === void 0)
    return n;
  if (Array.isArray(r))
    throw new TypeError("Arguments provided to ts-deepmerge must be objects, not arrays.");
  return Object.keys(r).forEach((o) => {
    ["__proto__", "constructor", "prototype"].includes(o) || (Array.isArray(n[o]) && Array.isArray(r[o]) ? n[o] = q.options.mergeArrays ? q.options.uniqueArrayItems ? Array.from(new Set(n[o].concat(r[o]))) : [...n[o], ...r[o]] : r[o] : xe(n[o]) && xe(r[o]) ? n[o] = q(n[o], r[o]) : !xe(n[o]) && xe(r[o]) ? n[o] = q(r[o], void 0) : n[o] = r[o] === void 0 ? q.options.allowUndefinedOverrides ? r[o] : n[o] : r[o]);
  }), n;
}, {}), ze = {
  allowUndefinedOverrides: !0,
  mergeArrays: !0,
  uniqueArrayItems: !0
};
q.options = ze;
q.withOptions = (e, ...n) => {
  q.options = Object.assign(Object.assign({}, ze), e);
  const r = q(...n);
  return q.options = ze, r;
};
const { createTx: jt } = kn(), { rx: Ft } = kn("worker"), Un = '(function(){"use strict";let o;function S(n){const e=o.__externref_table_alloc();return o.__wbindgen_externrefs.set(e,n),e}const O=typeof FinalizationRegistry>"u"?{register:()=>{},unregister:()=>{}}:new FinalizationRegistry(n=>n.dtor(n.a,n.b));function j(n){const e=typeof n;if(e=="number"||e=="boolean"||n==null)return`${n}`;if(e=="string")return`"${n}"`;if(e=="symbol"){const _=n.description;return _==null?"Symbol":`Symbol(${_})`}if(e=="function"){const _=n.name;return typeof _=="string"&&_.length>0?`Function(${_})`:"Function"}if(Array.isArray(n)){const _=n.length;let c="[";_>0&&(c+=j(n[0]));for(let i=1;i<_;i++)c+=", "+j(n[i]);return c+="]",c}const t=/\\[object ([^\\]]+)\\]/.exec(toString.call(n));let r;if(t&&t.length>1)r=t[1];else return toString.call(n);if(r=="Object")try{return"Object("+JSON.stringify(n)+")"}catch{return"Object"}return n instanceof Error?`${n.name}: ${n.message}\n${n.stack}`:r}function v(n,e){return n=n>>>0,R().subarray(n/1,n/1+e)}let A=null;function m(){return(A===null||A.buffer.detached===!0||A.buffer.detached===void 0&&A.buffer!==o.memory.buffer)&&(A=new DataView(o.memory.buffer)),A}function y(n,e){return n=n>>>0,V(n,e)}let M=null;function R(){return(M===null||M.byteLength===0)&&(M=new Uint8Array(o.memory.buffer)),M}function d(n,e){try{return n.apply(this,e)}catch(t){const r=S(t);o.__wbindgen_exn_store(r)}}function w(n){return n==null}function N(n,e,t,r){const _={a:n,b:e,cnt:1,dtor:t},c=(...i)=>{_.cnt++;const s=_.a;_.a=0;try{return r(s,_.b,...i)}finally{_.a=s,c._wbg_cb_unref()}};return c._wbg_cb_unref=()=>{--_.cnt===0&&(_.dtor(_.a,_.b),_.a=0,O.unregister(_))},O.register(c,_,_),c}function u(n,e,t){if(t===void 0){const s=T.encode(n),b=e(s.length,1)>>>0;return R().subarray(b,b+s.length).set(s),a=s.length,b}let r=n.length,_=e(r,1)>>>0;const c=R();let i=0;for(;i<r;i++){const s=n.charCodeAt(i);if(s>127)break;c[_+i]=s}if(i!==r){i!==0&&(n=n.slice(i)),_=t(_,r,r=i+n.length*3,1)>>>0;const s=R().subarray(_+i,_+r),b=T.encodeInto(n,s);i+=b.written,_=t(_,r,i,1)>>>0}return a=i,_}function f(n){const e=o.__wbindgen_externrefs.get(n);return o.__externref_table_dealloc(n),e}let E=new TextDecoder("utf-8",{ignoreBOM:!0,fatal:!0});E.decode();const C=2146435072;let x=0;function V(n,e){return x+=e,x>=C&&(E=new TextDecoder("utf-8",{ignoreBOM:!0,fatal:!0}),E.decode(),x=e),E.decode(R().subarray(n,n+e))}const T=new TextEncoder;"encodeInto"in T||(T.encodeInto=function(n,e){const t=T.encode(n);return e.set(t),{read:n.length,written:t.length}});let a=0;function G(n,e,t){o.wasm_bindgen__convert__closures_____invoke__hfa979f81ae70afaa(n,e,t)}function P(n,e){o.wasm_bindgen__convert__closures_____invoke__h6743aa07e10cb0d4(n,e)}function $(n,e,t,r){o.wasm_bindgen__convert__closures_____invoke__h536d005b97d28fdb(n,e,t,r)}const J=["default","no-store","reload","no-cache","force-cache","only-if-cached"],H=["omit","same-origin","include"],X=["same-origin","no-cors","cors","navigate"],k=typeof FinalizationRegistry>"u"?{register:()=>{},unregister:()=>{}}:new FinalizationRegistry(n=>o.__wbg_wasmbuilder_free(n>>>0,1)),z=typeof FinalizationRegistry>"u"?{register:()=>{},unregister:()=>{}}:new FinalizationRegistry(n=>o.__wbg_wasmreader_free(n>>>0,1));typeof FinalizationRegistry>"u"||new FinalizationRegistry(n=>o.__wbg_wasmsigner_free(n>>>0,1));class h{static __wrap(e){e=e>>>0;const t=Object.create(h.prototype);return t.__wbg_ptr=e,k.register(t,t.__wbg_ptr,t),t}__destroy_into_raw(){const e=this.__wbg_ptr;return this.__wbg_ptr=0,k.unregister(this),e}free(){const e=this.__destroy_into_raw();o.__wbg_wasmbuilder_free(e,0)}addAction(e){const t=o.wasmbuilder_addAction(this.__wbg_ptr,e);if(t[1])throw f(t[0])}setIntent(e){const t=o.wasmbuilder_setIntent(this.__wbg_ptr,e);if(t[1])throw f(t[0])}toArchive(){const e=o.wasmbuilder_toArchive(this.__wbg_ptr);if(e[2])throw f(e[1]);return f(e[0])}static fromArchive(e,t){var r=w(t)?0:u(t,o.__wbindgen_malloc,o.__wbindgen_realloc),_=a;const c=o.wasmbuilder_fromArchive(e,r,_);if(c[2])throw f(c[1]);return h.__wrap(c[0])}setNoEmbed(e){o.wasmbuilder_setNoEmbed(this.__wbg_ptr,e)}addIngredient(e){const t=u(e,o.__wbindgen_malloc,o.__wbindgen_realloc),r=a,_=o.wasmbuilder_addIngredient(this.__wbg_ptr,t,r);if(_[1])throw f(_[0])}getDefinition(){const e=o.wasmbuilder_getDefinition(this.__wbg_ptr);if(e[2])throw f(e[1]);return f(e[0])}setRemoteUrl(e){const t=u(e,o.__wbindgen_malloc,o.__wbindgen_realloc),r=a;o.wasmbuilder_setRemoteUrl(this.__wbg_ptr,t,r)}addResourceFromBlob(e,t){const r=u(e,o.__wbindgen_malloc,o.__wbindgen_realloc),_=a,c=o.wasmbuilder_addResourceFromBlob(this.__wbg_ptr,r,_,t);if(c[1])throw f(c[0])}setThumbnailFromBlob(e,t){const r=u(e,o.__wbindgen_malloc,o.__wbindgen_realloc),_=a,c=o.wasmbuilder_setThumbnailFromBlob(this.__wbg_ptr,r,_,t);if(c[1])throw f(c[0])}addIngredientFromBlob(e,t,r){const _=u(e,o.__wbindgen_malloc,o.__wbindgen_realloc),c=a,i=u(t,o.__wbindgen_malloc,o.__wbindgen_realloc),s=a,b=o.wasmbuilder_addIngredientFromBlob(this.__wbg_ptr,_,c,i,s,r);if(b[1])throw f(b[0])}signAndGetManifestBytes(e,t,r){const _=u(t,o.__wbindgen_malloc,o.__wbindgen_realloc),c=a;return o.wasmbuilder_signAndGetManifestBytes(this.__wbg_ptr,e,_,c,r)}static new(e){var t=w(e)?0:u(e,o.__wbindgen_malloc,o.__wbindgen_realloc),r=a;const _=o.wasmbuilder_new(t,r);if(_[2])throw f(_[1]);return h.__wrap(_[0])}sign(e,t,r){const _=u(t,o.__wbindgen_malloc,o.__wbindgen_realloc),c=a;return o.wasmbuilder_sign(this.__wbg_ptr,e,_,c,r)}static fromJson(e,t){const r=u(e,o.__wbindgen_malloc,o.__wbindgen_realloc),_=a;var c=w(t)?0:u(t,o.__wbindgen_malloc,o.__wbindgen_realloc),i=a;const s=o.wasmbuilder_fromJson(r,_,c,i);if(s[2])throw f(s[1]);return h.__wrap(s[0])}}Symbol.dispose&&(h.prototype[Symbol.dispose]=h.prototype.free);class I{static __wrap(e){e=e>>>0;const t=Object.create(I.prototype);return t.__wbg_ptr=e,z.register(t,t.__wbg_ptr,t),t}__destroy_into_raw(){const e=this.__wbg_ptr;return this.__wbg_ptr=0,z.unregister(this),e}free(){const e=this.__destroy_into_raw();o.__wbg_wasmreader_free(e,0)}activeLabel(){const e=o.wasmreader_activeLabel(this.__wbg_ptr);let t;return e[0]!==0&&(t=y(e[0],e[1]).slice(),o.__wbindgen_free(e[0],e[1]*1,1)),t}manifestStore(){const e=o.wasmreader_manifestStore(this.__wbg_ptr);if(e[2])throw f(e[1]);return f(e[0])}activeManifest(){const e=o.wasmreader_activeManifest(this.__wbg_ptr);if(e[2])throw f(e[1]);return f(e[0])}resourceToBytes(e){const t=u(e,o.__wbindgen_malloc,o.__wbindgen_realloc),r=a,_=o.wasmreader_resourceToBytes(this.__wbg_ptr,t,r);if(_[2])throw f(_[1]);return f(_[0])}static fromBlobFragment(e,t,r,_){const c=u(e,o.__wbindgen_malloc,o.__wbindgen_realloc),i=a;var s=w(_)?0:u(_,o.__wbindgen_malloc,o.__wbindgen_realloc),b=a;return o.wasmreader_fromBlobFragment(c,i,t,r,s,b)}json(){let e,t;try{const r=o.wasmreader_json(this.__wbg_ptr);return e=r[0],t=r[1],y(r[0],r[1])}finally{o.__wbindgen_free(e,t,1)}}static fromBlob(e,t,r){const _=u(e,o.__wbindgen_malloc,o.__wbindgen_realloc),c=a;var i=w(r)?0:u(r,o.__wbindgen_malloc,o.__wbindgen_realloc),s=a;return o.wasmreader_fromBlob(_,c,t,i,s)}}Symbol.dispose&&(I.prototype[Symbol.dispose]=I.prototype.free);function Y(n){const e=u(n,o.__wbindgen_malloc,o.__wbindgen_realloc),t=a,r=o.loadSettings(e,t);if(r[1])throw f(r[0])}function K(){const n={};return n.wbg={},n.wbg.__wbg_Error_52673b7de5a0ca89=function(e,t){return Error(y(e,t))},n.wbg.__wbg_Number_2d1dcfcf4ec51736=function(e){return Number(e)},n.wbg.__wbg___wbindgen_bigint_get_as_i64_6e32f5e6aff02e1d=function(e,t){const r=t,_=typeof r=="bigint"?r:void 0;m().setBigInt64(e+8,w(_)?BigInt(0):_,!0),m().setInt32(e+0,!w(_),!0)},n.wbg.__wbg___wbindgen_boolean_get_dea25b33882b895b=function(e){const t=e,r=typeof t=="boolean"?t:void 0;return w(r)?16777215:r?1:0},n.wbg.__wbg___wbindgen_debug_string_adfb662ae34724b6=function(e,t){const r=j(t),_=u(r,o.__wbindgen_malloc,o.__wbindgen_realloc),c=a;m().setInt32(e+4,c,!0),m().setInt32(e+0,_,!0)},n.wbg.__wbg___wbindgen_in_0d3e1e8f0c669317=function(e,t){return e in t},n.wbg.__wbg___wbindgen_is_bigint_0e1a2e3f55cfae27=function(e){return typeof e=="bigint"},n.wbg.__wbg___wbindgen_is_function_8d400b8b1af978cd=function(e){return typeof e=="function"},n.wbg.__wbg___wbindgen_is_object_ce774f3490692386=function(e){const t=e;return typeof t=="object"&&t!==null},n.wbg.__wbg___wbindgen_is_string_704ef9c8fc131030=function(e){return typeof e=="string"},n.wbg.__wbg___wbindgen_is_undefined_f6b95eab589e0269=function(e){return e===void 0},n.wbg.__wbg___wbindgen_jsval_eq_b6101cc9cef1fe36=function(e,t){return e===t},n.wbg.__wbg___wbindgen_jsval_loose_eq_766057600fdd1b0d=function(e,t){return e==t},n.wbg.__wbg___wbindgen_number_get_9619185a74197f95=function(e,t){const r=t,_=typeof r=="number"?r:void 0;m().setFloat64(e+8,w(_)?0:_,!0),m().setInt32(e+0,!w(_),!0)},n.wbg.__wbg___wbindgen_string_get_a2a31e16edf96e42=function(e,t){const r=t,_=typeof r=="string"?r:void 0;var c=w(_)?0:u(_,o.__wbindgen_malloc,o.__wbindgen_realloc),i=a;m().setInt32(e+4,i,!0),m().setInt32(e+0,c,!0)},n.wbg.__wbg___wbindgen_throw_dd24417ed36fc46e=function(e,t){throw new Error(y(e,t))},n.wbg.__wbg__wbg_cb_unref_87dfb5aaa0cbcea7=function(e){e._wbg_cb_unref()},n.wbg.__wbg_abort_07646c894ebbf2bd=function(e){e.abort()},n.wbg.__wbg_abort_399ecbcfd6ef3c8e=function(e,t){e.abort(t)},n.wbg.__wbg_append_c5cbdf46455cc776=function(){return d(function(e,t,r,_,c){e.append(y(t,r),y(_,c))},arguments)},n.wbg.__wbg_arrayBuffer_c04af4fce566092d=function(){return d(function(e){return e.arrayBuffer()},arguments)},n.wbg.__wbg_byteLength_faa9938885bdeee6=function(e){return e.byteLength},n.wbg.__wbg_call_3020136f7a2d6e44=function(){return d(function(e,t,r){return e.call(t,r)},arguments)},n.wbg.__wbg_call_abb4ff46ce38be40=function(){return d(function(e,t){return e.call(t)},arguments)},n.wbg.__wbg_clearTimeout_7a42b49784aea641=function(e){return clearTimeout(e)},n.wbg.__wbg_crypto_574e78ad8b13b65f=function(e){return e.crypto},n.wbg.__wbg_done_62ea16af4ce34b24=function(e){return e.done},n.wbg.__wbg_entries_83c79938054e065f=function(e){return Object.entries(e)},n.wbg.__wbg_error_7534b8e9a36f1ab4=function(e,t){let r,_;try{r=e,_=t,console.error(y(e,t))}finally{o.__wbindgen_free(r,_,1)}},n.wbg.__wbg_fetch_74a3e84ebd2c9a0e=function(e){return fetch(e)},n.wbg.__wbg_fetch_90447c28cc0b095e=function(e,t){return e.fetch(t)},n.wbg.__wbg_from_29a8414a7a7cd19d=function(e){return Array.from(e)},n.wbg.__wbg_getRandomValues_1c61fac11405ffdc=function(){return d(function(e,t){globalThis.crypto.getRandomValues(v(e,t))},arguments)},n.wbg.__wbg_getRandomValues_38a1ff1ea09f6cc7=function(){return d(function(e,t){globalThis.crypto.getRandomValues(v(e,t))},arguments)},n.wbg.__wbg_getRandomValues_b8f5dbd5f3995a9e=function(){return d(function(e,t){e.getRandomValues(t)},arguments)},n.wbg.__wbg_getTime_ad1e9878a735af08=function(e){return e.getTime()},n.wbg.__wbg_get_6b7bd52aca3f9671=function(e,t){return e[t>>>0]},n.wbg.__wbg_get_af9dab7e9603ea93=function(){return d(function(e,t){return Reflect.get(e,t)},arguments)},n.wbg.__wbg_get_with_ref_key_1dc361bd10053bfe=function(e,t){return e[t]},n.wbg.__wbg_has_0e670569d65d3a45=function(){return d(function(e,t){return Reflect.has(e,t)},arguments)},n.wbg.__wbg_headers_654c30e1bcccc552=function(e){return e.headers},n.wbg.__wbg_instanceof_ArrayBuffer_f3320d2419cd0355=function(e){let t;try{t=e instanceof ArrayBuffer}catch{t=!1}return t},n.wbg.__wbg_instanceof_Map_084be8da74364158=function(e){let t;try{t=e instanceof Map}catch{t=!1}return t},n.wbg.__wbg_instanceof_Promise_eca6c43a2610558d=function(e){let t;try{t=e instanceof Promise}catch{t=!1}return t},n.wbg.__wbg_instanceof_Response_cd74d1c2ac92cb0b=function(e){let t;try{t=e instanceof Response}catch{t=!1}return t},n.wbg.__wbg_instanceof_Uint8Array_da54ccc9d3e09434=function(e){let t;try{t=e instanceof Uint8Array}catch{t=!1}return t},n.wbg.__wbg_isArray_51fd9e6422c0a395=function(e){return Array.isArray(e)},n.wbg.__wbg_isSafeInteger_ae7d3f054d55fa16=function(e){return Number.isSafeInteger(e)},n.wbg.__wbg_iterator_27b7c8b35ab3e86b=function(){return Symbol.iterator},n.wbg.__wbg_length_22ac23eaec9d8053=function(e){return e.length},n.wbg.__wbg_length_d45040a40c570362=function(e){return e.length},n.wbg.__wbg_msCrypto_a61aeb35a24c1329=function(e){return e.msCrypto},n.wbg.__wbg_new_0_23cedd11d9b40c9d=function(){return new Date},n.wbg.__wbg_new_1ba21ce319a06297=function(){return new Object},n.wbg.__wbg_new_25f239778d6112b9=function(){return new Array},n.wbg.__wbg_new_3c79b3bb1b32b7d3=function(){return d(function(){return new Headers},arguments)},n.wbg.__wbg_new_6421f6084cc5bc5a=function(e){return new Uint8Array(e)},n.wbg.__wbg_new_881a222c65f168fc=function(){return d(function(){return new AbortController},arguments)},n.wbg.__wbg_new_8a6f238a6ece86ea=function(){return new Error},n.wbg.__wbg_new_b546ae120718850e=function(){return new Map},n.wbg.__wbg_new_bd4ee84941f474fa=function(){return d(function(){return new FileReaderSync},arguments)},n.wbg.__wbg_new_df1173567d5ff028=function(e,t){return new Error(y(e,t))},n.wbg.__wbg_new_ff12d2b041fb48f1=function(e,t){try{var r={a:e,b:t},_=(i,s)=>{const b=r.a;r.a=0;try{return $(b,r.b,i,s)}finally{r.a=b}};return new Promise(_)}finally{r.a=r.b=0}},n.wbg.__wbg_new_from_slice_f9c22b9153b26992=function(e,t){return new Uint8Array(v(e,t))},n.wbg.__wbg_new_no_args_cb138f77cf6151ee=function(e,t){return new Function(y(e,t))},n.wbg.__wbg_new_with_length_aa5eaf41d35235e5=function(e){return new Uint8Array(e>>>0)},n.wbg.__wbg_new_with_str_and_init_c5748f76f5108934=function(){return d(function(e,t,r){return new Request(y(e,t),r)},arguments)},n.wbg.__wbg_next_138a17bbf04e926c=function(e){return e.next},n.wbg.__wbg_next_3cfe5c0fe2a4cc53=function(){return d(function(e){return e.next()},arguments)},n.wbg.__wbg_node_905d3e251edff8a2=function(e){return e.node},n.wbg.__wbg_now_69d776cd24f5215b=function(){return Date.now()},n.wbg.__wbg_process_dc0fbacc7c1c06f7=function(e){return e.process},n.wbg.__wbg_prototypesetcall_dfe9b766cdc1f1fd=function(e,t,r){Uint8Array.prototype.set.call(v(e,t),r)},n.wbg.__wbg_queueMicrotask_9b549dfce8865860=function(e){return e.queueMicrotask},n.wbg.__wbg_queueMicrotask_fca69f5bfad613a5=function(e){queueMicrotask(e)},n.wbg.__wbg_randomFillSync_ac0988aba3254290=function(){return d(function(e,t){e.randomFillSync(t)},arguments)},n.wbg.__wbg_readAsArrayBuffer_5a7ad12aa99daa2f=function(){return d(function(e,t){return e.readAsArrayBuffer(t)},arguments)},n.wbg.__wbg_require_60cc747a6bc5215a=function(){return d(function(){return module.require},arguments)},n.wbg.__wbg_resolve_fd5bfbaa4ce36e1e=function(e){return Promise.resolve(e)},n.wbg.__wbg_setTimeout_7bb3429662ab1e70=function(e,t){return setTimeout(e,t)},n.wbg.__wbg_set_169e13b608078b7b=function(e,t,r){e.set(v(t,r))},n.wbg.__wbg_set_3f1d0b984ed272ed=function(e,t,r){e[t]=r},n.wbg.__wbg_set_7df433eea03a5c14=function(e,t,r){e[t>>>0]=r},n.wbg.__wbg_set_body_8e743242d6076a4f=function(e,t){e.body=t},n.wbg.__wbg_set_cache_0e437c7c8e838b9b=function(e,t){e.cache=J[t]},n.wbg.__wbg_set_credentials_55ae7c3c106fd5be=function(e,t){e.credentials=H[t]},n.wbg.__wbg_set_efaaf145b9377369=function(e,t,r){return e.set(t,r)},n.wbg.__wbg_set_headers_5671cf088e114d2b=function(e,t){e.headers=t},n.wbg.__wbg_set_method_76c69e41b3570627=function(e,t,r){e.method=y(t,r)},n.wbg.__wbg_set_mode_611016a6818fc690=function(e,t){e.mode=X[t]},n.wbg.__wbg_set_signal_e89be862d0091009=function(e,t){e.signal=t},n.wbg.__wbg_signal_3c14fbdc89694b39=function(e){return e.signal},n.wbg.__wbg_size_82fbdb656de23326=function(e){return e.size},n.wbg.__wbg_slice_3518c924243cda3a=function(){return d(function(e,t,r){return e.slice(t,r)},arguments)},n.wbg.__wbg_stack_0ed75d68575b0f3c=function(e,t){const r=t.stack,_=u(r,o.__wbindgen_malloc,o.__wbindgen_realloc),c=a;m().setInt32(e+4,c,!0),m().setInt32(e+0,_,!0)},n.wbg.__wbg_static_accessor_GLOBAL_769e6b65d6557335=function(){const e=typeof global>"u"?null:global;return w(e)?0:S(e)},n.wbg.__wbg_static_accessor_GLOBAL_THIS_60cf02db4de8e1c1=function(){const e=typeof globalThis>"u"?null:globalThis;return w(e)?0:S(e)},n.wbg.__wbg_static_accessor_SELF_08f5a74c69739274=function(){const e=typeof self>"u"?null:self;return w(e)?0:S(e)},n.wbg.__wbg_static_accessor_WINDOW_a8924b26aa92d024=function(){const e=typeof window>"u"?null:window;return w(e)?0:S(e)},n.wbg.__wbg_status_9bfc680efca4bdfd=function(e){return e.status},n.wbg.__wbg_stringify_655a6390e1f5eb6b=function(){return d(function(e){return JSON.stringify(e)},arguments)},n.wbg.__wbg_subarray_845f2f5bce7d061a=function(e,t,r){return e.subarray(t>>>0,r>>>0)},n.wbg.__wbg_then_429f7caf1026411d=function(e,t,r){return e.then(t,r)},n.wbg.__wbg_then_4f95312d68691235=function(e,t){return e.then(t)},n.wbg.__wbg_url_b6d11838a4f95198=function(e,t){const r=t.url,_=u(r,o.__wbindgen_malloc,o.__wbindgen_realloc),c=a;m().setInt32(e+4,c,!0),m().setInt32(e+0,_,!0)},n.wbg.__wbg_valueOf_17c63ed1b225597a=function(e){return e.valueOf()},n.wbg.__wbg_value_57b7b035e117f7ee=function(e){return e.value},n.wbg.__wbg_versions_c01dfd4722a88165=function(e){return e.versions},n.wbg.__wbg_wasmreader_new=function(e){return I.__wrap(e)},n.wbg.__wbindgen_cast_0bcf4d5a20a2764c=function(e,t){return N(e,t,o.wasm_bindgen__closure__destroy__h9cd45bdf09c25ec5,P)},n.wbg.__wbindgen_cast_2241b6af4c4b2941=function(e,t){return y(e,t)},n.wbg.__wbindgen_cast_2ddd8a25ff58642a=function(e,t){return BigInt.asUintN(64,e)|t<<BigInt(64)},n.wbg.__wbindgen_cast_4625c577ab2ec9ee=function(e){return BigInt.asUintN(64,e)},n.wbg.__wbindgen_cast_77bc3e92745e9a35=function(e,t){var r=v(e,t).slice();return o.__wbindgen_free(e,t*1,1),r},n.wbg.__wbindgen_cast_815cc8b6fd6cc840=function(e,t){return N(e,t,o.wasm_bindgen__closure__destroy__h628fe959fcf32094,G)},n.wbg.__wbindgen_cast_9ae0607507abb057=function(e){return e},n.wbg.__wbindgen_cast_cb9088102bce6b30=function(e,t){return v(e,t)},n.wbg.__wbindgen_cast_d6cd19b81560fd6e=function(e){return e},n.wbg.__wbindgen_init_externref_table=function(){const e=o.__wbindgen_externrefs,t=e.grow(4);e.set(0,void 0),e.set(t+0,void 0),e.set(t+1,null),e.set(t+2,!0),e.set(t+3,!1)},n}function Q(n,e){return o=n.exports,A=null,M=null,o.__wbindgen_start(),o}function Z(n){if(o!==void 0)return o;typeof n<"u"&&(Object.getPrototypeOf(n)===Object.prototype?{module:n}=n:console.warn("using deprecated parameters for `initSync()`; pass a single object instead"));const e=K();n instanceof WebAssembly.Module||(n=new WebAssembly.Module(n));const t=new WebAssembly.Instance(n,e);return Q(t)}function D(){let n=0;const e=new Map;return{add(t){const r=n++;return e.set(r,t),r},get(t){const r=e.get(t);if(!r)throw new Error("Attempted to use an object that has been freed");return r},remove(t){return e.delete(t)}}}const L=Symbol("transfer");function F(n,e){return{type:L,value:n,transfer:e?Array.isArray(e)?e:[e]:[n]}}function U(n){return!!(n&&typeof n=="object"&&Reflect.get(n,"type")===L)}function q(n="default"){return{createTx(e){const t=new Map,r=e??self;return r.addEventListener("message",_=>{const{data:c}=_;if(c.channelName!==n)return;const{id:i,result:s,error:b}=c,l=t.get(i);l&&(b?l.reject(b):l.resolve(s),t.delete(i))}),new Proxy({},{get(_,c){return(...i)=>{const s=ee(),b=[],l=[];return i.forEach(B=>{U(B)?(b.push(B.value),l.push(...B.transfer)):b.push(B)}),r.postMessage({method:c,args:b,id:s,channelName:n},{transfer:l}),new Promise((B,re)=>{t.set(s,{resolve:B,reject:re})})}}})},rx(e,t){const r=t??self;r.addEventListener("message",async _=>{const{data:c}=_;if(c.channelName!==n)return;const{method:i,args:s,id:b}=c;try{const l=await e[i](...s);U(l)?r.postMessage({result:l.value,id:b,channelName:n},{transfer:l.transfer}):r.postMessage({result:l,id:b,channelName:n})}catch(l){r.postMessage({error:l,id:b,channelName:n})}})}}}function ee(){return new Array(4).fill(0).map(()=>Math.floor(Math.random()*Number.MAX_SAFE_INTEGER).toString(16)).join("-")}const{rx:te}=q(),{createTx:ne}=q("worker"),p=D(),g=D(),W=ne();te({async initWorker(n,e){Z({module:n}),e&&Y(e)},async reader_fromBlob(n,e,t){const r=await I.fromBlob(n,e,t);return p.add(r)},async reader_fromBlobFragment(n,e,t,r){const _=await I.fromBlobFragment(n,e,t,r);return p.add(_)},reader_activeLabel(n){return p.get(n).activeLabel()??null},reader_manifestStore(n){return p.get(n).manifestStore()},reader_activeManifest(n){return p.get(n).activeManifest()},reader_json(n){return p.get(n).json()},reader_resourceToBytes(n,e){const r=p.get(n).resourceToBytes(e);return F(r,r.buffer)},reader_free(n){p.get(n).free(),p.remove(n)},builder_new(n){const e=h.new(n);return g.add(e)},builder_fromJson(n,e){const t=h.fromJson(n,e);return g.add(t)},builder_fromArchive(n,e){const t=h.fromArchive(n,e);return g.add(t)},builder_setIntent(n,e){g.get(n).setIntent(e)},builder_addAction(n,e){g.get(n).addAction(e)},builder_setRemoteUrl(n,e){g.get(n).setRemoteUrl(e)},builder_setNoEmbed(n,e){g.get(n).setNoEmbed(e)},builder_setThumbnailFromBlob(n,e,t){g.get(n).setThumbnailFromBlob(e,t)},builder_addIngredient(n,e){g.get(n).addIngredient(e)},builder_addIngredientFromBlob(n,e,t,r){g.get(n).addIngredientFromBlob(e,t,r)},builder_addResourceFromBlob(n,e,t){g.get(n).addResourceFromBlob(e,t)},builder_getDefinition(n){return g.get(n).getDefinition()},builder_toArchive(n){const t=g.get(n).toArchive();return F(t,t.buffer)},async builder_sign(n,e,t,r,_){const i=await g.get(n).sign({reserveSize:t.reserveSize,alg:t.alg,sign:async s=>await W.sign(e,F(s,s.buffer),t.reserveSize)},r,_);return F(i,i.buffer)},async builder_signAndGetManifestBytes(n,e,t,r,_){const c=g.get(n),{manifest:i,asset:s}=await c.signAndGetManifestBytes({reserveSize:t.reserveSize,alg:t.alg,sign:async b=>await W.sign(e,F(b,b.buffer),t.reserveSize)},r,_);return F({manifest:i,asset:s},[i.buffer,s.buffer])},builder_free(n){g.get(n).free(),g.remove(n)}})})();\n', yn = typeof self < "u" && self.Blob && new Blob([Un], { type: "text/javascript;charset=utf-8" });
function Nt(e) {
  let n;
  try {
    if (n = yn && (self.URL || self.webkitURL).createObjectURL(yn), !n) throw "";
    const r = new Worker(n, {
      name: e == null ? void 0 : e.name
    });
    return r.addEventListener("error", () => {
      (self.URL || self.webkitURL).revokeObjectURL(n);
    }), r;
  } catch {
    return new Worker(
      "data:text/javascript;charset=utf-8," + encodeURIComponent(Un),
      {
        name: e == null ? void 0 : e.name
      }
    );
  } finally {
    n && (self.URL || self.webkitURL).revokeObjectURL(n);
  }
}
async function Lt(e) {
  const { wasm: n, settingsString: r } = e;
  let o = 0;
  const a = new Nt(), i = jt(a), c = /* @__PURE__ */ new Map();
  Ft(
    {
      sign: async (l, _, g) => {
        const m = c.get(l);
        if (c.delete(l), !m)
          throw new Error("No signer registered for request");
        const T = await m(_, g);
        return At(T, T.buffer);
      }
    },
    a
  );
  function u(l) {
    const _ = o++;
    return c.set(_, l), _;
  }
  return await i.initWorker(n, r), {
    tx: i,
    registerSignReceiver: u,
    terminate: () => a.terminate()
  };
}
class En extends Error {
  constructor(n) {
    super(
      `The provided asset was too large. Size: ${n} bytes. Maximum: ${qe}.`
    ), this.name = "AssetTooLargeError";
  }
}
class xn extends Error {
  constructor(n) {
    super(`Unsupported format: ${n}.`), this.name = "UnsupportedFormatError";
  }
}
const Dt = [
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
function Rn(e) {
  return Dt.includes(e);
}
const $n = {
  builder: {
    generateC2paArchive: !0
  }
};
async function ge(e) {
  const n = q($n, e), r = [];
  return n.trust && r.push(Ce(n.trust)), n.cawgTrust && r.push(Ce(n.cawgTrust)), await Promise.all(r), JSON.stringify(Ge(n));
}
async function Bt(e) {
  const n = q($n, e), r = [];
  return n.trust && r.push(Ce(n.trust)), n.cawgTrust && r.push(Ce(n.cawgTrust)), await Promise.all(r), JSON.stringify(Ge(n));
}
function Ge(e) {
  return Object.entries(e).reduce(
    (n, [r, o]) => (n[kt(r)] = typeof o == "object" ? Ge(o) : o, n),
    {}
  );
}
function kt(e) {
  return e.replace(/[A-Z]/g, (n) => `_${n.toLowerCase()}`);
}
async function Ce(e) {
  try {
    const n = Object.entries(e).map(async ([r, o]) => {
      if (Array.isArray(o)) {
        const a = o.map(async (c) => {
          const u = await (await fetch(c)).text();
          if (Cn(r) && !Tn(u))
            throw new Error(`Error parsing PEM file at: ${c}`);
          return u;
        }), i = (await Promise.all(a)).join("");
        e[r] = i;
      } else if (o && Ut(o)) {
        const a = await (await fetch(o)).text();
        if (Cn(r) && !Tn(a))
          throw new Error(`Error parsing PEM file at: ${o}`);
        e[r] = a;
      } else
        return o;
    });
    await Promise.all(n);
  } catch (n) {
    throw new Error("Failed to resolve trust settings.", { cause: n });
  }
}
const Cn = (e) => ["userAnchors", "trustAnchors"].includes(e), Tn = (e) => e.includes("-----BEGIN CERTIFICATE-----"), Ut = (e) => e.startsWith("http"), qe = 10 ** 9;
function $t(e) {
  const { tx: n } = e, r = new FinalizationRegistry(async (o) => {
    await n.reader_free(o);
  });
  return {
    async fromBlob(o, a, i) {
      if (!Rn(o))
        throw new xn(o);
      if (a.size > qe)
        throw new En(a.size);
      try {
        const c = i ? await ge(i) : void 0, u = await n.reader_fromBlob(o, a, c), l = In(e, u, () => {
          r.unregister(l);
        });
        return r.register(l, u, l), l;
      } catch (c) {
        return Sn(c);
      }
    },
    async fromBlobFragment(o, a, i, c) {
      if (!Rn(o))
        throw new xn(o);
      if (a.size > qe)
        throw new En(a.size);
      try {
        const u = c ? await ge(c) : void 0, l = await n.reader_fromBlobFragment(
          o,
          a,
          i,
          u
        ), _ = In(e, l, () => {
          r.unregister(_);
        });
        return r.register(_, l, _), _;
      } catch (u) {
        return Sn(u);
      }
    }
  };
}
function Sn(e) {
  if (e instanceof Error && e.message === "C2pa(JumbfNotFound)")
    return null;
  throw e;
}
function In(e, n, r) {
  const { tx: o } = e;
  return {
    async activeLabel() {
      return await o.reader_activeLabel(n);
    },
    async manifestStore() {
      return await o.reader_manifestStore(n);
    },
    async activeManifest() {
      return await o.reader_activeManifest(n);
    },
    async json() {
      const a = await o.reader_json(n);
      return JSON.parse(a);
    },
    async resourceToBytes(a) {
      return await o.reader_resourceToBytes(n, a);
    },
    async free() {
      r(), await o.reader_free(n);
    }
  };
}
let Xe;
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => e.dtor(e.a, e.b));
let Vt = new TextDecoder("utf-8", { ignoreBOM: !0, fatal: !0 });
Vt.decode();
const Ue = new TextEncoder();
"encodeInto" in Ue || (Ue.encodeInto = function(e, n) {
  const r = Ue.encode(e);
  return n.set(r), {
    read: e.length,
    written: r.length
  };
});
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Xe.__wbg_wasmbuilder_free(e >>> 0, 1));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Xe.__wbg_wasmreader_free(e >>> 0, 1));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Xe.__wbg_wasmsigner_free(e >>> 0, 1));
const Wt = "sha512-emM3xZBux5bBdEv6EFS+y5SmKnxnEVbNgsjbsOLnC/YYm55pviVrgdOxU8iQUisOISQvXrTj7H8vvsgYVlpeLg==";
async function Pn(e) {
  const { alg: n } = e;
  return {
    reserveSize: await e.reserveSize(),
    alg: n
  };
}
function zt(e) {
  const { tx: n } = e, r = new FinalizationRegistry((o) => {
    n.builder_free(o);
  });
  return {
    async new(o) {
      const a = o ? await ge(o) : void 0, i = await n.builder_new(a), c = $e(e, i, () => {
        r.unregister(c);
      });
      return r.register(c, i, c), c;
    },
    async fromDefinition(o, a) {
      const i = JSON.stringify(o), c = a ? await ge(a) : void 0, u = await n.builder_fromJson(i, c), l = $e(e, u, () => {
        r.unregister(l);
      });
      return r.register(l, u, l), l;
    },
    async fromArchive(o, a) {
      const i = a ? await ge(a) : void 0, c = await n.builder_fromArchive(o, i), u = $e(e, c, () => {
        r.unregister(u);
      });
      return r.register(u, c, u), u;
    }
  };
}
function $e(e, n, r) {
  const { tx: o } = e;
  return {
    async setIntent(a) {
      await o.builder_setIntent(n, a);
    },
    async addAction(a) {
      await o.builder_addAction(n, a);
    },
    async setRemoteUrl(a) {
      await o.builder_setRemoteUrl(n, a);
    },
    async setNoEmbed(a) {
      await o.builder_setNoEmbed(n, a);
    },
    async setThumbnailFromBlob(a, i) {
      await o.builder_setThumbnailFromBlob(n, a, i);
    },
    async addIngredient(a) {
      const i = JSON.stringify(a);
      await o.builder_addIngredient(n, i);
    },
    async addIngredientFromBlob(a, i, c) {
      const u = JSON.stringify(a);
      await o.builder_addIngredientFromBlob(n, u, i, c);
    },
    async addResourceFromBlob(a, i) {
      await o.builder_addResourceFromBlob(n, a, i);
    },
    async getDefinition() {
      return await o.builder_getDefinition(n);
    },
    async toArchive() {
      return await o.builder_toArchive(n);
    },
    async sign(a, i, c) {
      const u = await Pn(a), l = e.registerSignReceiver(a.sign);
      return await o.builder_sign(
        n,
        l,
        u,
        i,
        c
      );
    },
    async signAndGetManifestBytes(a, i, c) {
      const u = await Pn(a), l = e.registerSignReceiver(a.sign);
      return await o.builder_signAndGetManifestBytes(
        n,
        l,
        u,
        i,
        c
      );
    },
    async free() {
      r(), await o.builder_free(n);
    }
  };
}
async function qt(e) {
  const { wasmSrc: n, settings: r } = e, o = typeof n == "string" ? await Yt(n) : n, a = r ? await Bt(r) : void 0, i = await Lt({ wasm: o, settingsString: a });
  return {
    reader: $t(i),
    builder: zt(i),
    dispose: i.terminate
  };
}
async function Yt(e) {
  const n = await fetch(e, { integrity: Wt });
  return await WebAssembly.compileStreaming(n);
}
const p = (...e) => e.filter((n) => n).map((n) => `Syw-${n}`).join(" "), Vn = (e, n) => {
  (e.key === "Enter" || e.key === " ") && (e.preventDefault(), n && n(e));
}, Jt = (e) => `https://verify.contentauthenticity.org/inspect?source=${e}`, On = "en", te = "en_US", Ve = {
  en: "en_US",
  no: "no_NO",
  sv: "sv_SE"
}, Ht = {
  producer: "Produced by",
  generator: "Produced with",
  signator: "Issued by",
  timestamp: "Timestamp",
  location: "Location",
  ingredients: "Ingredients",
  provenance_toggle: "View Image Origin",
  explainer_toggle: "What is this?",
  explainer_toggle_close: "Close",
  explainer_methods_pre: "Read about",
  explainer_methods_link: "our methods",
  explainer_methods_url: "#",
  verify_pre: "Verify on",
  verify_cc: "Content Credentials"
}, Kt = {
  producer: "Produsent",
  generator: "Produsert med",
  signator: "Signert av",
  timestamp: "Tidsstempel",
  location: "Sted",
  ingredients: "Ingredienser",
  provenance_toggle: "Se bildeopprinnelse",
  explainer_toggle: "Hva er dette?",
  explainer_toggle_close: "Lukke",
  explainer_methods_pre: "Les om",
  explainer_methods_link: "våre metoder",
  explainer_methods_url: "#",
  verify_pre: "Verifiser på",
  verify_cc: "Content Credentials"
}, Gt = {
  producer: "Producent",
  generator: "Producerad med",
  signator: "Undertecknad av",
  timestamp: "Tidsstämpel",
  location: "Plats",
  ingredients: "Ingredienser",
  provenance_toggle: "Visa bildens ursprung",
  explainer_toggle: "Vad är det här?",
  explainer_toggle_close: "Stäng",
  explainer_methods_pre: "Läs om",
  explainer_methods_link: "våra metoder",
  explainer_methods_url: "#",
  verify_pre: "Verifiera på",
  verify_cc: "Content Credentials"
}, Ye = {
  en_US: Ht,
  no_NO: Kt,
  sv_SE: Gt
}, Xt = (e = te) => e.split("_")[0], Qt = (e = On) => Ve.hasOwnProperty(e) ? Ve[e] : Ve[On], Zt = (e = te) => {
  const n = Xt(e);
  return Qt(n);
}, Wn = (e = te) => {
  let n;
  if (Ye.hasOwnProperty(e))
    n = e;
  else {
    const r = Zt(e);
    Ye.hasOwnProperty(r) ? n = r : n = te;
  }
  return n;
}, er = (e = te) => {
  const n = Wn(e);
  return Ye[n];
}, nr = (e = te, ...n) => er(e)[n.join("_")], zn = (e = te, n) => {
  const r = n ? new Date(n) : null;
  return r instanceof Date && isFinite(r.getTime()) ? r.toLocaleDateString(e.replace("_", "-"), {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  }) : null;
}, tr = "https://cdn.jsdelivr.net/npm/@contentauth/c2pa-web/dist/resources/c2pa_bg.wasm", rr = (e = {}) => ({
  wasmSrc: e.wasmSrc || tr
}), or = async (e, n) => {
  const o = await (await fetch(n)).blob(), a = await e.reader.fromBlob(o.type, o);
  return { manifestStore: await a.manifestStore(), reader: a };
}, fe = (e, n) => {
  var a, i;
  return ((i = (a = e == null ? void 0 : e.assertions) == null ? void 0 : a.find((c) => c.label === "stds.exif")) == null ? void 0 : i.data)[`exif:${n}`];
}, ar = (e, n) => {
  var a, i;
  return ((i = (a = e == null ? void 0 : e.assertions) == null ? void 0 : a.find((c) => c.label.includes("stds.schema-org"))) == null ? void 0 : i.data)[n];
}, ir = (e) => e == null ? void 0 : e.instance_id, sr = (e) => ar(e, "author") ?? [], cr = (e) => {
  var n;
  return e != null && e.claim_generator_info ? (n = e == null ? void 0 : e.claim_generator_info) == null ? void 0 : n.map(
    (r) => [r.name, r.version].filter((o) => o != null).join(" ")
  ).join(", ") : fe(e, "Make") || fe(e, "Model") ? (fe(e, "Make"), [fe(e, "Model")].join(" ")) : e != null && e.claim_generator ? e == null ? void 0 : e.claim_generator : null;
}, lr = (e) => {
  var n;
  return (n = e == null ? void 0 : e.signature_info) == null ? void 0 : n.issuer;
}, ur = (e, n) => {
  var r, o;
  if ((r = e == null ? void 0 : e.signature_info) != null && r.time)
    return new Date((o = e == null ? void 0 : e.signature_info) == null ? void 0 : o.time);
  {
    const i = fe(e, "DateTimeOriginal").split(/\D/);
    return new Date(
      i[0],
      i[1] - 1,
      i[2],
      i[3],
      i[4],
      i[5]
    );
  }
}, fr = async (e, n) => {
  const r = e == null ? void 0 : e.thumbnail;
  if (!r || !n) return null;
  try {
    const o = await n.resourceToBytes(r.identifier);
    if (o) {
      const a = new Blob([o], { type: r.format });
      return URL.createObjectURL(a);
    }
    return null;
  } catch (o) {
    return console.error("Failed to get thumbnail URL:", o), null;
  }
}, _r = (e) => `https://verify.contentauthenticity.org/inspect?source=${e}`, dr = async ({ src: e, locale: n, manifest: r, reader: o }) => (Wn(n), {
  id: ir(r),
  producer: sr(r),
  generator: cr(r),
  signator: lr(r),
  timestamp: ur(r),
  // ingredients: getIngredients(manifest),
  thumbnail: await fr(r, o),
  // location: getLocation(manifest),
  verifyUrl: _r(e)
}), qn = Ie({
  c2pa: null
}), gr = () => Pe(qn), br = ({
  children: e
}) => {
  const [n, r] = D(null);
  return $(() => {
    (async () => {
      const a = await qt(rr());
      r(a);
    })();
  }, []), /* @__PURE__ */ ie.createElement(
    qn.Provider,
    {
      value: {
        c2pa: n
      }
    },
    e
  );
}, Yn = Ie({
  src: null,
  alt: null,
  caption: null,
  byline: null,
  manifests: [],
  setManifests: () => !1
}), Ae = () => Pe(Yn), wr = ({
  src: e,
  alt: n,
  caption: r,
  byline: o,
  children: a
}) => {
  const [i, c] = D([]);
  return /* @__PURE__ */ ie.createElement(
    Yn.Provider,
    {
      value: {
        src: e,
        alt: n,
        caption: r,
        byline: o,
        manifests: i,
        setManifests: c
      }
    },
    a
  );
}, Jn = Ie({
  locale: null,
  setLocale: () => null,
  dictionary: !1,
  getText: () => null
}), Q = () => Pe(Jn), pr = ({
  locale: e,
  children: n
}) => {
  const r = (...o) => nr(e, ...o);
  return /* @__PURE__ */ ie.createElement(
    Jn.Provider,
    {
      value: {
        locale: e,
        getText: r
      }
    },
    n
  );
}, Hn = "expand", mr = [
  "producer",
  // 'producerSocials',
  "timestamp",
  "signator",
  // 'ingredients',
  "generator",
  // 'verify',
  "location"
], vr = [
  "signator",
  "generator"
], Kn = Ie({
  variant: Hn,
  elem: null,
  isImageHover: !1,
  isProvenanceOpen: !1,
  isExplainerOpen: !1,
  openManifests: {},
  compareImage: null,
  setElem: () => !1,
  hoverImage: () => !1,
  unhoverImage: () => !1,
  openProvenance: () => !1,
  closeProvenance: () => !1,
  openExplainer: () => !1,
  closeExplainer: () => !1,
  openManifest: () => !1,
  closeManifest: () => !1,
  addCompareImage: () => !1,
  removeCompareImage: () => !1,
  updateComparePosition: () => !1,
  eventHandler: null
}), J = () => Pe(Kn), hr = ({
  variant: e = Hn,
  children: n
}) => {
  const [r, o] = D(null), [a, i] = D(!1), [c, u] = D(!1), [l, _] = D(!1), [g, m] = D(null), [T, V] = D(null), R = Y({}), G = Y(null), P = (w, h, ...F) => {
    var X;
    typeof (h == null ? void 0 : h.persist) == "function" && h.persist();
    const W = G.current, Z = (h == null ? void 0 : h.nativeEvent) ?? ((X = h == null ? void 0 : h.detail) == null ? void 0 : X.originalEvent) ?? h;
    typeof W == "function" && W(w, Z, ...F);
  }, M = (w) => {
    i(!0), P("image.hover", w);
  }, C = (w) => {
    i(!1), P("image.unhover", w);
  }, B = (w) => {
    u(!0), P("provenance.open", w);
  }, re = (w) => {
    u(!1), P("provenance.close", w);
  }, se = (w) => {
    _(!0), P("explainer.open", w);
  }, H = (w) => {
    _(!1), P("explainer.close", w);
  }, K = (w, h) => {
    const F = Object.assign(R.current, {});
    F[h.id] = h, R.current = F, P("manifest.open", w, h);
  }, O = (w, h) => {
    const F = Object.assign(R.current, {});
    delete F[h.id], R.current = F, P("manifest.close", w, h);
  }, A = (w, h) => {
    m(w), P("manifest.compareImage.add", h);
  }, j = (w) => {
    m(null), P("manifest.compareImage.remove", w);
  }, k = (w) => {
    V(w);
  };
  return /* @__PURE__ */ ie.createElement(
    Kn.Provider,
    {
      value: {
        elem: r,
        variant: e,
        isHoverImage: a,
        isProvenanceOpen: c,
        isExplainerOpen: l,
        openManifests: R.current,
        compareImage: g,
        comparePosition: T,
        setElem: o,
        hoverImage: M,
        unhoverImage: C,
        openProvenance: B,
        closeProvenance: re,
        openExplainer: se,
        closeExplainer: H,
        openManifest: K,
        closeManifest: O,
        addCompareImage: A,
        removeCompareImage: j,
        updateComparePosition: k,
        eventHandler: G
      }
    },
    n
  );
}, yr = (e) => {
  const { c2pa: n } = gr(), [r, o] = D(null), [a, i] = D(null);
  return $(() => {
    if (!e || !n) return;
    let c = !1;
    return (async () => {
      try {
        const { manifestStore: l, reader: _ } = await or(n, e);
        c || (o(_), i({ manifestStore: l }));
      } catch (l) {
        console.error(l);
      }
    })(), () => {
      c = !0;
    };
  }, [e, n]), { reader: r, provenance: a };
};
var Re = { exports: {} }, le = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var An;
function Er() {
  if (An) return le;
  An = 1;
  var e = ie, n = Symbol.for("react.element"), r = Symbol.for("react.fragment"), o = Object.prototype.hasOwnProperty, a = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, i = { key: !0, ref: !0, __self: !0, __source: !0 };
  function c(u, l, _) {
    var g, m = {}, T = null, V = null;
    _ !== void 0 && (T = "" + _), l.key !== void 0 && (T = "" + l.key), l.ref !== void 0 && (V = l.ref);
    for (g in l) o.call(l, g) && !i.hasOwnProperty(g) && (m[g] = l[g]);
    if (u && u.defaultProps) for (g in l = u.defaultProps, l) m[g] === void 0 && (m[g] = l[g]);
    return { $$typeof: n, type: u, key: T, ref: V, props: m, _owner: a.current };
  }
  return le.Fragment = r, le.jsx = c, le.jsxs = c, le;
}
var ue = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Mn;
function xr() {
  return Mn || (Mn = 1, process.env.NODE_ENV !== "production" && (function() {
    var e = ie, n = Symbol.for("react.element"), r = Symbol.for("react.portal"), o = Symbol.for("react.fragment"), a = Symbol.for("react.strict_mode"), i = Symbol.for("react.profiler"), c = Symbol.for("react.provider"), u = Symbol.for("react.context"), l = Symbol.for("react.forward_ref"), _ = Symbol.for("react.suspense"), g = Symbol.for("react.suspense_list"), m = Symbol.for("react.memo"), T = Symbol.for("react.lazy"), V = Symbol.for("react.offscreen"), R = Symbol.iterator, G = "@@iterator";
    function P(t) {
      if (t === null || typeof t != "object")
        return null;
      var s = R && t[R] || t[G];
      return typeof s == "function" ? s : null;
    }
    var M = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function C(t) {
      {
        for (var s = arguments.length, f = new Array(s > 1 ? s - 1 : 0), b = 1; b < s; b++)
          f[b - 1] = arguments[b];
        B("error", t, f);
      }
    }
    function B(t, s, f) {
      {
        var b = M.ReactDebugCurrentFrame, E = b.getStackAddendum();
        E !== "" && (s += "%s", f = f.concat([E]));
        var x = f.map(function(y) {
          return String(y);
        });
        x.unshift("Warning: " + s), Function.prototype.apply.call(console[t], console, x);
      }
    }
    var re = !1, se = !1, H = !1, K = !1, O = !1, A;
    A = Symbol.for("react.module.reference");
    function j(t) {
      return !!(typeof t == "string" || typeof t == "function" || t === o || t === i || O || t === a || t === _ || t === g || K || t === V || re || se || H || typeof t == "object" && t !== null && (t.$$typeof === T || t.$$typeof === m || t.$$typeof === c || t.$$typeof === u || t.$$typeof === l || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      t.$$typeof === A || t.getModuleId !== void 0));
    }
    function k(t, s, f) {
      var b = t.displayName;
      if (b)
        return b;
      var E = s.displayName || s.name || "";
      return E !== "" ? f + "(" + E + ")" : f;
    }
    function w(t) {
      return t.displayName || "Context";
    }
    function h(t) {
      if (t == null)
        return null;
      if (typeof t.tag == "number" && C("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof t == "function")
        return t.displayName || t.name || null;
      if (typeof t == "string")
        return t;
      switch (t) {
        case o:
          return "Fragment";
        case r:
          return "Portal";
        case i:
          return "Profiler";
        case a:
          return "StrictMode";
        case _:
          return "Suspense";
        case g:
          return "SuspenseList";
      }
      if (typeof t == "object")
        switch (t.$$typeof) {
          case u:
            var s = t;
            return w(s) + ".Consumer";
          case c:
            var f = t;
            return w(f._context) + ".Provider";
          case l:
            return k(t, t.render, "ForwardRef");
          case m:
            var b = t.displayName || null;
            return b !== null ? b : h(t.type) || "Memo";
          case T: {
            var E = t, x = E._payload, y = E._init;
            try {
              return h(y(x));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var F = Object.assign, W = 0, Z, X, pe, me, Ze, en, nn;
    function tn() {
    }
    tn.__reactDisabledLog = !0;
    function rt() {
      {
        if (W === 0) {
          Z = console.log, X = console.info, pe = console.warn, me = console.error, Ze = console.group, en = console.groupCollapsed, nn = console.groupEnd;
          var t = {
            configurable: !0,
            enumerable: !0,
            value: tn,
            writable: !0
          };
          Object.defineProperties(console, {
            info: t,
            log: t,
            warn: t,
            error: t,
            group: t,
            groupCollapsed: t,
            groupEnd: t
          });
        }
        W++;
      }
    }
    function ot() {
      {
        if (W--, W === 0) {
          var t = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: F({}, t, {
              value: Z
            }),
            info: F({}, t, {
              value: X
            }),
            warn: F({}, t, {
              value: pe
            }),
            error: F({}, t, {
              value: me
            }),
            group: F({}, t, {
              value: Ze
            }),
            groupCollapsed: F({}, t, {
              value: en
            }),
            groupEnd: F({}, t, {
              value: nn
            })
          });
        }
        W < 0 && C("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var Me = M.ReactCurrentDispatcher, je;
    function ve(t, s, f) {
      {
        if (je === void 0)
          try {
            throw Error();
          } catch (E) {
            var b = E.stack.trim().match(/\n( *(at )?)/);
            je = b && b[1] || "";
          }
        return `
` + je + t;
      }
    }
    var Fe = !1, he;
    {
      var at = typeof WeakMap == "function" ? WeakMap : Map;
      he = new at();
    }
    function rn(t, s) {
      if (!t || Fe)
        return "";
      {
        var f = he.get(t);
        if (f !== void 0)
          return f;
      }
      var b;
      Fe = !0;
      var E = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var x;
      x = Me.current, Me.current = null, rt();
      try {
        if (s) {
          var y = function() {
            throw Error();
          };
          if (Object.defineProperty(y.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(y, []);
            } catch (U) {
              b = U;
            }
            Reflect.construct(t, [], y);
          } else {
            try {
              y.call();
            } catch (U) {
              b = U;
            }
            t.call(y.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (U) {
            b = U;
          }
          t();
        }
      } catch (U) {
        if (U && b && typeof U.stack == "string") {
          for (var v = U.stack.split(`
`), L = b.stack.split(`
`), S = v.length - 1, I = L.length - 1; S >= 1 && I >= 0 && v[S] !== L[I]; )
            I--;
          for (; S >= 1 && I >= 0; S--, I--)
            if (v[S] !== L[I]) {
              if (S !== 1 || I !== 1)
                do
                  if (S--, I--, I < 0 || v[S] !== L[I]) {
                    var z = `
` + v[S].replace(" at new ", " at ");
                    return t.displayName && z.includes("<anonymous>") && (z = z.replace("<anonymous>", t.displayName)), typeof t == "function" && he.set(t, z), z;
                  }
                while (S >= 1 && I >= 0);
              break;
            }
        }
      } finally {
        Fe = !1, Me.current = x, ot(), Error.prepareStackTrace = E;
      }
      var ae = t ? t.displayName || t.name : "", ee = ae ? ve(ae) : "";
      return typeof t == "function" && he.set(t, ee), ee;
    }
    function it(t, s, f) {
      return rn(t, !1);
    }
    function st(t) {
      var s = t.prototype;
      return !!(s && s.isReactComponent);
    }
    function ye(t, s, f) {
      if (t == null)
        return "";
      if (typeof t == "function")
        return rn(t, st(t));
      if (typeof t == "string")
        return ve(t);
      switch (t) {
        case _:
          return ve("Suspense");
        case g:
          return ve("SuspenseList");
      }
      if (typeof t == "object")
        switch (t.$$typeof) {
          case l:
            return it(t.render);
          case m:
            return ye(t.type, s, f);
          case T: {
            var b = t, E = b._payload, x = b._init;
            try {
              return ye(x(E), s, f);
            } catch {
            }
          }
        }
      return "";
    }
    var ce = Object.prototype.hasOwnProperty, on = {}, an = M.ReactDebugCurrentFrame;
    function Ee(t) {
      if (t) {
        var s = t._owner, f = ye(t.type, t._source, s ? s.type : null);
        an.setExtraStackFrame(f);
      } else
        an.setExtraStackFrame(null);
    }
    function ct(t, s, f, b, E) {
      {
        var x = Function.call.bind(ce);
        for (var y in t)
          if (x(t, y)) {
            var v = void 0;
            try {
              if (typeof t[y] != "function") {
                var L = Error((b || "React class") + ": " + f + " type `" + y + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof t[y] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw L.name = "Invariant Violation", L;
              }
              v = t[y](s, y, b, f, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (S) {
              v = S;
            }
            v && !(v instanceof Error) && (Ee(E), C("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", b || "React class", f, y, typeof v), Ee(null)), v instanceof Error && !(v.message in on) && (on[v.message] = !0, Ee(E), C("Failed %s type: %s", f, v.message), Ee(null));
          }
      }
    }
    var lt = Array.isArray;
    function Ne(t) {
      return lt(t);
    }
    function ut(t) {
      {
        var s = typeof Symbol == "function" && Symbol.toStringTag, f = s && t[Symbol.toStringTag] || t.constructor.name || "Object";
        return f;
      }
    }
    function ft(t) {
      try {
        return sn(t), !1;
      } catch {
        return !0;
      }
    }
    function sn(t) {
      return "" + t;
    }
    function cn(t) {
      if (ft(t))
        return C("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", ut(t)), sn(t);
    }
    var ln = M.ReactCurrentOwner, _t = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, un, fn;
    function dt(t) {
      if (ce.call(t, "ref")) {
        var s = Object.getOwnPropertyDescriptor(t, "ref").get;
        if (s && s.isReactWarning)
          return !1;
      }
      return t.ref !== void 0;
    }
    function gt(t) {
      if (ce.call(t, "key")) {
        var s = Object.getOwnPropertyDescriptor(t, "key").get;
        if (s && s.isReactWarning)
          return !1;
      }
      return t.key !== void 0;
    }
    function bt(t, s) {
      typeof t.ref == "string" && ln.current;
    }
    function wt(t, s) {
      {
        var f = function() {
          un || (un = !0, C("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", s));
        };
        f.isReactWarning = !0, Object.defineProperty(t, "key", {
          get: f,
          configurable: !0
        });
      }
    }
    function pt(t, s) {
      {
        var f = function() {
          fn || (fn = !0, C("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", s));
        };
        f.isReactWarning = !0, Object.defineProperty(t, "ref", {
          get: f,
          configurable: !0
        });
      }
    }
    var mt = function(t, s, f, b, E, x, y) {
      var v = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: n,
        // Built-in properties that belong on the element
        type: t,
        key: s,
        ref: f,
        props: y,
        // Record the component responsible for creating this element.
        _owner: x
      };
      return v._store = {}, Object.defineProperty(v._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(v, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: b
      }), Object.defineProperty(v, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: E
      }), Object.freeze && (Object.freeze(v.props), Object.freeze(v)), v;
    };
    function vt(t, s, f, b, E) {
      {
        var x, y = {}, v = null, L = null;
        f !== void 0 && (cn(f), v = "" + f), gt(s) && (cn(s.key), v = "" + s.key), dt(s) && (L = s.ref, bt(s, E));
        for (x in s)
          ce.call(s, x) && !_t.hasOwnProperty(x) && (y[x] = s[x]);
        if (t && t.defaultProps) {
          var S = t.defaultProps;
          for (x in S)
            y[x] === void 0 && (y[x] = S[x]);
        }
        if (v || L) {
          var I = typeof t == "function" ? t.displayName || t.name || "Unknown" : t;
          v && wt(y, I), L && pt(y, I);
        }
        return mt(t, v, L, E, b, ln.current, y);
      }
    }
    var Le = M.ReactCurrentOwner, _n = M.ReactDebugCurrentFrame;
    function oe(t) {
      if (t) {
        var s = t._owner, f = ye(t.type, t._source, s ? s.type : null);
        _n.setExtraStackFrame(f);
      } else
        _n.setExtraStackFrame(null);
    }
    var De;
    De = !1;
    function Be(t) {
      return typeof t == "object" && t !== null && t.$$typeof === n;
    }
    function dn() {
      {
        if (Le.current) {
          var t = h(Le.current.type);
          if (t)
            return `

Check the render method of \`` + t + "`.";
        }
        return "";
      }
    }
    function ht(t) {
      return "";
    }
    var gn = {};
    function yt(t) {
      {
        var s = dn();
        if (!s) {
          var f = typeof t == "string" ? t : t.displayName || t.name;
          f && (s = `

Check the top-level render call using <` + f + ">.");
        }
        return s;
      }
    }
    function bn(t, s) {
      {
        if (!t._store || t._store.validated || t.key != null)
          return;
        t._store.validated = !0;
        var f = yt(s);
        if (gn[f])
          return;
        gn[f] = !0;
        var b = "";
        t && t._owner && t._owner !== Le.current && (b = " It was passed a child from " + h(t._owner.type) + "."), oe(t), C('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', f, b), oe(null);
      }
    }
    function wn(t, s) {
      {
        if (typeof t != "object")
          return;
        if (Ne(t))
          for (var f = 0; f < t.length; f++) {
            var b = t[f];
            Be(b) && bn(b, s);
          }
        else if (Be(t))
          t._store && (t._store.validated = !0);
        else if (t) {
          var E = P(t);
          if (typeof E == "function" && E !== t.entries)
            for (var x = E.call(t), y; !(y = x.next()).done; )
              Be(y.value) && bn(y.value, s);
        }
      }
    }
    function Et(t) {
      {
        var s = t.type;
        if (s == null || typeof s == "string")
          return;
        var f;
        if (typeof s == "function")
          f = s.propTypes;
        else if (typeof s == "object" && (s.$$typeof === l || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        s.$$typeof === m))
          f = s.propTypes;
        else
          return;
        if (f) {
          var b = h(s);
          ct(f, t.props, "prop", b, t);
        } else if (s.PropTypes !== void 0 && !De) {
          De = !0;
          var E = h(s);
          C("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", E || "Unknown");
        }
        typeof s.getDefaultProps == "function" && !s.getDefaultProps.isReactClassApproved && C("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function xt(t) {
      {
        for (var s = Object.keys(t.props), f = 0; f < s.length; f++) {
          var b = s[f];
          if (b !== "children" && b !== "key") {
            oe(t), C("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", b), oe(null);
            break;
          }
        }
        t.ref !== null && (oe(t), C("Invalid attribute `ref` supplied to `React.Fragment`."), oe(null));
      }
    }
    var pn = {};
    function mn(t, s, f, b, E, x) {
      {
        var y = j(t);
        if (!y) {
          var v = "";
          (t === void 0 || typeof t == "object" && t !== null && Object.keys(t).length === 0) && (v += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var L = ht();
          L ? v += L : v += dn();
          var S;
          t === null ? S = "null" : Ne(t) ? S = "array" : t !== void 0 && t.$$typeof === n ? (S = "<" + (h(t.type) || "Unknown") + " />", v = " Did you accidentally export a JSX literal instead of a component?") : S = typeof t, C("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", S, v);
        }
        var I = vt(t, s, f, E, x);
        if (I == null)
          return I;
        if (y) {
          var z = s.children;
          if (z !== void 0)
            if (b)
              if (Ne(z)) {
                for (var ae = 0; ae < z.length; ae++)
                  wn(z[ae], t);
                Object.freeze && Object.freeze(z);
              } else
                C("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              wn(z, t);
        }
        if (ce.call(s, "key")) {
          var ee = h(t), U = Object.keys(s).filter(function(Pt) {
            return Pt !== "key";
          }), ke = U.length > 0 ? "{key: someKey, " + U.join(": ..., ") + ": ...}" : "{key: someKey}";
          if (!pn[ee + ke]) {
            var It = U.length > 0 ? "{" + U.join(": ..., ") + ": ...}" : "{}";
            C(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, ke, ee, It, ee), pn[ee + ke] = !0;
          }
        }
        return t === o ? xt(I) : Et(I), I;
      }
    }
    function Rt(t, s, f) {
      return mn(t, s, f, !0);
    }
    function Ct(t, s, f) {
      return mn(t, s, f, !1);
    }
    var Tt = Ct, St = Rt;
    ue.Fragment = o, ue.jsx = Tt, ue.jsxs = St;
  })()), ue;
}
var jn;
function Rr() {
  return jn || (jn = 1, process.env.NODE_ENV === "production" ? Re.exports = Er() : Re.exports = xr()), Re.exports;
}
var Gn = Rr();
const d = Gn.jsx, N = Gn.jsxs, Cr = ({
  children: e
}) => /* @__PURE__ */ d("figure", {
  className: p("Figure"),
  children: e
}), Tr = () => {
  const {
    src: e,
    alt: n
  } = Ae(), {
    hoverImage: r,
    unhoverImage: o,
    openProvenance: a,
    closeProvenance: i,
    isProvenanceOpen: c
  } = J(), u = ne((m) => c ? i(m) : a(m), [a, i, c]), l = ne((m) => Vn(m, c ? i : a), [a, i, c]), _ = ne((m) => r(m), [r]), g = ne((m) => o(m), [o]);
  return /* @__PURE__ */ d("div", {
    className: p("Image"),
    onClick: u,
    onKeyDown: l,
    onMouseEnter: _,
    onMouseLeave: g,
    tabIndex: 0,
    children: /* @__PURE__ */ d("img", {
      src: e,
      alt: n,
      className: p("ImageImg")
    })
  });
}, Sr = () => {
  const {
    isProvenanceOpen: e,
    openProvenance: n,
    closeProvenance: r
  } = J(), {
    getText: o
  } = Q(), a = (i) => e ? r(i) : n(i);
  return /* @__PURE__ */ d("button", {
    "aria-pressed": e,
    className: p("ProvenanceToggle"),
    onClick: a,
    children: o("provenance", "toggle")
  });
}, Xn = ({
  className: e
}) => {
  const {
    variant: n,
    isExplainerOpen: r,
    openExplainer: o,
    closeExplainer: a,
    openProvenance: i
  } = J(), {
    getText: c
  } = Q(), u = (l) => {
    r ? a(l) : o(l), n === "modal" && i(l);
  };
  return /* @__PURE__ */ d("button", {
    className: p("ExplainerToggle", e),
    "aria-pressed": r,
    onClick: u,
    children: c("explainer", "toggle")
  });
}, Ir = ({
  caption: e,
  byline: n
}) => /* @__PURE__ */ d("div", {
  className: p("Cutline"),
  children: /* @__PURE__ */ N("div", {
    className: p("CutlineToggles"),
    children: [/* @__PURE__ */ d(Sr, {}), /* @__PURE__ */ d(Xn, {})]
  })
}), Pr = () => {
  const {
    caption: e,
    byline: n
  } = Ae();
  return e || n ? /* @__PURE__ */ d("figcaption", {
    className: p("Caption"),
    children: /* @__PURE__ */ N("div", {
      className: p("CaptionInner"),
      children: [e, " ", /* @__PURE__ */ d("div", {
        className: p("CaptionByline"),
        children: n
      })]
    })
  }) : null;
};
var Or = process.env.NODE_ENV === "production";
function Ar(e, n) {
  if (!Or) {
    if (e)
      return;
    var r = "Warning: " + n;
    typeof console < "u" && console.warn(r);
    try {
      throw Error(r);
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
var Mr = class extends Error {
  constructor(e) {
    super(`react-collapsed: ${e}`);
  }
}, Te = (...e) => Ar(e[0], `[react-collapsed] -- ${e[1]}`);
function Qn(e) {
  const n = Y(e);
  return $(() => {
    n.current = e;
  }), ne((...r) => {
    var o;
    return (o = n.current) == null ? void 0 : o.call(n, ...r);
  }, []);
}
function jr(e, n, r) {
  const [o, a] = D(n), i = Y(typeof e < "u"), c = i.current ? e : o, u = Qn(r), l = ne(
    (_) => {
      const m = typeof _ == "function" ? _(c) : _;
      i.current || a(m), u == null || u(m);
    },
    [u, c]
  );
  return $(() => {
    Te(
      !(i.current && e == null),
      "`isExpanded` state is changing from controlled to uncontrolled. useCollapse should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled collapse for the lifetime of the component. Check the `isExpanded` prop."
    ), Te(
      !(!i.current && e != null),
      "`isExpanded` state is changing from uncontrolled to controlled. useCollapse should not switch from uncontrolled to controlled (or vice versa). Decide between using a controlled or uncontrolled collapse for the lifetime of the component. Check the `isExpanded` prop."
    );
  }, [e]), [c, l];
}
var Fr = "(prefers-reduced-motion: reduce)";
function Nr() {
  const [e, n] = D(!1);
  return $(() => {
    if (typeof window > "u" || typeof window.matchMedia != "function")
      return;
    const r = window.matchMedia(Fr);
    n(r.matches);
    const o = (a) => {
      n(a.matches);
    };
    if (r.addEventListener)
      return r.addEventListener("change", o), () => {
        r.removeEventListener("change", o);
      };
    if (r.addListener)
      return r.addListener(o), () => {
        r.removeListener(o);
      };
  }, []), e;
}
var Lr = be.useId || (() => {
});
function Dr() {
  return Lr() ?? "";
}
var Br = typeof window < "u" ? be.useLayoutEffect : be.useEffect, We = !1, kr = 0, Fn = () => ++kr;
function Ur(e) {
  const n = e || (We ? Fn() : null), [r, o] = be.useState(n);
  return Br(() => {
    r === null && o(Fn());
  }, []), be.useEffect(() => {
    We === !1 && (We = !0);
  }, []), r != null ? String(r) : void 0;
}
function $r(e) {
  const n = Dr(), r = Ur(e);
  return typeof e == "string" ? e : typeof n == "string" ? n : r;
}
function Vr(e, n) {
  const r = performance.now(), o = {};
  function a() {
    o.id = requestAnimationFrame((i) => {
      i - r > n ? e() : a();
    });
  }
  return a(), o;
}
function Nn(e) {
  e.id && cancelAnimationFrame(e.id);
}
function Ln(e) {
  return e != null && e.current ? e.current.scrollHeight : (Te(
    !0,
    "Was not able to find a ref to the collapse element via `getCollapseProps`. Ensure that the element exposes its `ref` prop. If it exposes the ref prop under a different name (like `innerRef`), use the `refKey` property to change it. Example:\n\nconst collapseProps = getCollapseProps({refKey: 'innerRef'})"
  ), 0);
}
function Wr(e) {
  if (!e || typeof e == "string")
    return 0;
  const n = e / 36;
  return Math.round((4 + 15 * n ** 0.25 + n / 5) * 10);
}
function zr(e, n) {
  if (e != null)
    if (typeof e == "function")
      e(n);
    else
      try {
        e.current = n;
      } catch {
        throw new Mr(`Cannot assign value "${n}" to ref "${e}"`);
      }
}
function Dn(...e) {
  return e.every((n) => n == null) ? null : (n) => {
    e.forEach((r) => {
      zr(r, n);
    });
  };
}
function qr(e) {
  let n = (r) => {
  };
  n = (r) => {
    if (!(r != null && r.current))
      return;
    const { paddingTop: o, paddingBottom: a } = window.getComputedStyle(r.current);
    Te(
      !(o && o !== "0px" || a && a !== "0px"),
      `Padding applied to the collapse element will cause the animation to break and not perform as expected. To fix, apply equivalent padding to the direct descendent of the collapse element. Example:

Before:   <div {...getCollapseProps({style: {padding: 10}})}>{children}</div>

After:   <div {...getCollapseProps()}>
             <div style={{padding: 10}}>
                 {children}
             </div>
          </div>`
    );
  }, $(() => {
    n(e);
  }, [e]);
}
var Yr = typeof window > "u" ? $ : Ot;
function Jr({
  duration: e,
  easing: n = "cubic-bezier(0.4, 0, 0.2, 1)",
  onTransitionStateChange: r = () => {
  },
  isExpanded: o,
  defaultExpanded: a = !1,
  hasDisabledAnimation: i,
  id: c,
  ...u
} = {}) {
  const l = Qn(r), _ = $r(c ? `${c}` : void 0), [g, m] = jr(
    o,
    a
  ), T = Y(g), [V, R] = D(!1), G = Nr(), P = i ?? G, M = Y(), C = Y(), B = Y(null), [re, se] = D(null);
  qr(B);
  const H = `${u.collapsedHeight || 0}px`;
  function K(O) {
    if (!B.current)
      return;
    const A = B.current;
    for (const j in O) {
      const k = O[j];
      k ? A.style[j] = k : A.style.removeProperty(j);
    }
  }
  return Yr(() => {
    if (!B.current || g === T.current)
      return;
    T.current = g;
    function A(w) {
      return P ? 0 : e ?? Wr(w);
    }
    const j = (w) => `height ${A(w)}ms ${n}`, k = (w) => {
      function h() {
        g ? (K({
          height: "",
          overflow: "",
          transition: "",
          display: ""
        }), l("expandEnd")) : (K({ transition: "" }), l("collapseEnd")), R(!1);
      }
      C.current && Nn(C.current), C.current = Vr(h, w);
    };
    return R(!0), g ? M.current = requestAnimationFrame(() => {
      l("expandStart"), K({
        display: "block",
        overflow: "hidden",
        height: H
      }), M.current = requestAnimationFrame(() => {
        l("expanding");
        const w = Ln(B);
        k(A(w)), B.current && (B.current.style.transition = j(w), B.current.style.height = `${w}px`);
      });
    }) : M.current = requestAnimationFrame(() => {
      l("collapseStart");
      const w = Ln(B);
      k(A(w)), K({
        transition: j(w),
        height: `${w}px`
      }), M.current = requestAnimationFrame(() => {
        l("collapsing"), K({
          height: H,
          overflow: "hidden"
        });
      });
    }), () => {
      M.current && cancelAnimationFrame(M.current), C.current && Nn(C.current);
    };
  }, [
    g,
    H,
    P,
    e,
    n,
    l
  ]), {
    isExpanded: g,
    setExpanded: m,
    getToggleProps(O) {
      const { disabled: A, onClick: j, refKey: k, ...w } = {
        refKey: "ref",
        onClick() {
        },
        disabled: !1,
        ...O
      }, h = re ? re.tagName === "BUTTON" : void 0, F = O == null ? void 0 : O[k || "ref"], W = {
        id: `react-collapsed-toggle-${_}`,
        "aria-controls": `react-collapsed-panel-${_}`,
        "aria-expanded": g,
        onClick(pe) {
          A || (j == null || j(pe), m((me) => !me));
        },
        [k || "ref"]: Dn(F, se)
      }, Z = {
        type: "button",
        disabled: A ? !0 : void 0
      }, X = {
        "aria-disabled": A ? !0 : void 0,
        role: "button",
        tabIndex: A ? -1 : 0
      };
      return h === !1 ? { ...W, ...X, ...w } : h === !0 ? { ...W, ...Z, ...w } : {
        ...W,
        ...Z,
        ...X,
        ...w
      };
    },
    getCollapseProps(O) {
      const { style: A, refKey: j } = { refKey: "ref", style: {}, ...O }, k = O == null ? void 0 : O[j || "ref"];
      return {
        id: `react-collapsed-panel-${_}`,
        "aria-hidden": !g,
        "aria-labelledby": `react-collapsed-toggle-${_}`,
        role: "region",
        ...O,
        [j || "ref"]: Dn(B, k),
        style: {
          boxSizing: "border-box",
          ...!V && !g ? {
            // collapsed and not animating
            display: H === "0px" ? "none" : "block",
            height: H,
            overflow: "hidden"
          } : {},
          // additional styles passed, e.g. getCollapseProps({style: {}})
          ...A
        }
      };
    }
  };
}
const Qe = ({
  open: e = !1,
  children: n
}) => {
  const {
    getCollapseProps: r
  } = Jr({
    isExpanded: e,
    defaultExpanded: !1
  }), o = Oe(() => p("Collapse", e ? "Collapse_open" : !1), [e]);
  return /* @__PURE__ */ d("div", {
    ...r(),
    className: o,
    "aria-labelledby": null,
    id: null,
    children: /* @__PURE__ */ d("div", {
      className: p("CollapseInner"),
      children: n
    })
  });
}, Zn = () => {
  const {
    getText: e
  } = Q(), {
    isExplainerOpen: n,
    closeExplainer: r
  } = J(), o = r;
  return /* @__PURE__ */ d("div", {
    className: p("Explainer"),
    children: /* @__PURE__ */ d(Qe, {
      open: n,
      children: /* @__PURE__ */ N("div", {
        className: p("ExplainerInner"),
        children: [/* @__PURE__ */ d("button", {
          className: p("ExplainerClose"),
          "aria-pressed": n,
          onClick: o,
          children: e("explainer", "toggle", "close")
        }), /* @__PURE__ */ d("div", {
          children: /* @__PURE__ */ d("strong", {
            children: "Consectetur adipiscing elit"
          })
        }), /* @__PURE__ */ d("p", {
          children: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris enim nibh, rhoncus vel enim ac, luctus efficitur risus. Quisque viverra tellus vitae arcu consectetur tincidunt. Ut vel pharetra tellus. Nam posuere suscipit maximus."
        }), /* @__PURE__ */ d("div", {
          children: /* @__PURE__ */ d("strong", {
            children: "Cras sagittis erat"
          })
        }), /* @__PURE__ */ d("p", {
          children: "Suspendisse a neque nulla. Cras sagittis erat sed elit tristique, a efficitur ante malesuada. Quisque dapibus pharetra dictum."
        }), /* @__PURE__ */ N("div", {
          className: p("ExplainerMore"),
          children: [e("explainer", "methods", "pre"), " ", /* @__PURE__ */ d("a", {
            href: e("explainer", "methods", "url"),
            children: e("explainer", "methods", "link")
          })]
        })]
      })
    })
  });
};
function Hr({
  manifest: e,
  toggled: n,
  onToggle: r,
  previewRef: o
}) {
  const {
    locale: a
  } = Q(), {
    compareImage: i,
    addCompareImage: c,
    removeCompareImage: u,
    updateComparePosition: l
  } = J(), _ = e == null ? void 0 : e.thumbnail, g = (R) => {
    Vn(R, r);
  }, m = (R) => {
    l(R);
  }, T = (R) => {
    c(_, R);
  }, V = (R) => {
    u(R);
  };
  return /* @__PURE__ */ N("div", {
    ref: o,
    role: "button",
    tabIndex: 0,
    "aria-pressed": n,
    className: p("ManifestPreview"),
    onClick: r,
    onKeyDown: g,
    children: [/* @__PURE__ */ d("div", {
      className: p("ManifestPreviewCell", "ManifestPreviewCell_issuer"),
      children: vr.filter((R) => e[R]).map((R) => e[R]).join(" ")
    }), /* @__PURE__ */ d("div", {
      className: p("ManifestPreviewCell", "ManifestPreviewCell_time"),
      children: /* @__PURE__ */ d("span", {
        children: zn(a, e.timestamp)
      })
    }), /* @__PURE__ */ d("div", {
      className: p("ManifestPreviewCell", "ManifestPreviewCell_thumb", _ === i ? "ManifestPreviewCell_thumb_hover" : null),
      onMouseMove: m,
      onMouseEnter: T,
      onMouseLeave: V,
      children: /* @__PURE__ */ d("img", {
        src: _
      })
    })]
  });
}
function Kr({
  type: e,
  value: n
}) {
  const {
    locale: r,
    getText: o
  } = Q(), a = Oe(() => {
    switch (e) {
      case "producer":
        return n.map((i) => i.name).join(", ");
      case "timestamp":
        return zn(r, n);
      case "location":
        return null;
      default:
        return n;
    }
  }, [e, n]);
  return /* @__PURE__ */ N("li", {
    className: p("ManifestTableRow"),
    children: [/* @__PURE__ */ d("div", {
      className: p("ManifestTableRowLabel"),
      children: o(e)
    }), /* @__PURE__ */ d("div", {
      className: p("ManifestTableRowValue"),
      children: a
    })]
  });
}
function Gr({
  manifest: e
}) {
  return /* @__PURE__ */ d("ul", {
    className: p("ManifestTable"),
    children: mr.map((n) => e[n] ? /* @__PURE__ */ d(Kr, {
      type: n,
      value: e[n]
    }, n) : null)
  });
}
function Xr({
  manifest: e,
  previewRef: n
}) {
  const [r, o] = D(!1), {
    isProvenanceOpen: a,
    openManifests: i,
    openManifest: c,
    closeManifest: u,
    removeCompareImage: l
  } = J(), _ = Oe(() => p("Manifest", r ? "Manifest_open" : null), [r]), g = ne((m) => {
    l(), o(!r), r ? u(m, e) : c(m, e);
  }, [r, e, c, u, i]);
  return $(() => {
    a || o(!1);
  }, [a]), /* @__PURE__ */ d("li", {
    className: _,
    children: /* @__PURE__ */ N("div", {
      className: p("ManifestRow"),
      children: [/* @__PURE__ */ d(Hr, {
        manifest: e,
        toggled: r,
        onToggle: g,
        previewRef: n
      }), /* @__PURE__ */ d(Qe, {
        open: r,
        children: /* @__PURE__ */ d("div", {
          className: p("ManifestContent"),
          children: /* @__PURE__ */ d(Gr, {
            manifest: e
          })
        })
      })]
    })
  });
}
function et() {
  const e = Y(null), n = Y(null), {
    getText: r
  } = Q(), {
    src: o,
    manifests: a
  } = Ae(), {
    isProvenanceOpen: i
  } = J(), c = Jt(o);
  return $(() => {
    var u;
    i && n.current && ((u = n.current) == null || u.focus());
  }, [n, i]), /* @__PURE__ */ N("div", {
    ref: e,
    className: p("Provenance"),
    children: [/* @__PURE__ */ d("ul", {
      className: p("ProvenanceList"),
      children: a ? a.map((u, l) => /* @__PURE__ */ d(Xr, {
        manifest: u,
        previewRef: l === 0 ? n : null
      }, l)) : null
    }), /* @__PURE__ */ N("div", {
      className: p("ProvenanceVerify"),
      children: [r("verify", "pre"), " ", /* @__PURE__ */ d("a", {
        href: c,
        target: "_blank",
        children: r("verify", "cc")
      })]
    })]
  });
}
let we = null, _e = [], Se = null, Je = null, de = null, He = null;
function Qr(e, n) {
  we = e, He = n, Zr(), tt(!0);
}
function Ke() {
  we && (He && He(), typeof document < "u" && document.removeEventListener("keydown", nt), de && de.focus && (de.focus(), de = null), we = null, tt(!1));
}
function nt(e) {
  if (we) {
    if (e.key === "Escape")
      return Ke();
    if (e.key === "Tab") {
      if (_e.length === 0) {
        e.preventDefault();
        return;
      }
      e.shiftKey ? typeof document < "u" && document.activeElement === Se && (Je.focus(), e.preventDefault()) : typeof document < "u" && document.activeElement === Je && (Se.focus(), e.preventDefault());
    }
  }
}
function Zr() {
  typeof document < "u" && (de = document.activeElement), _e = Array.from(
    we.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])')
  ).filter((e) => e.tabIndex !== -1), Se = _e[0], Je = _e[_e.length - 1], Se.focus(), typeof document < "u" && document.addEventListener("keydown", nt);
}
function tt(e) {
  typeof document < "u" && (document.body.style.overflow = e ? "hidden" : "");
}
const eo = ({
  open: e = !1,
  title: n,
  description: r,
  onOpenChange: o,
  children: a,
  className: i
}) => {
  const c = Y(), u = vn(), l = vn(), _ = (g) => {
    o(!1, g);
  };
  return $(() => (e ? Qr(c.current, o) : Ke(), () => {
    c.current && Ke();
  }), [e, c]), /* @__PURE__ */ N("div", {
    ref: c,
    className: p("Modal", e ? "Modal_open" : null, i),
    children: [/* @__PURE__ */ d("div", {
      className: p("ModalOverlay"),
      onClick: _
    }), /* @__PURE__ */ N("div", {
      role: "dialog",
      "aria-modal": "true",
      "aria-labelledby": u,
      "aria-describedby": l,
      className: p("ModalContent"),
      children: [/* @__PURE__ */ N("div", {
        className: p("ModalContentBox"),
        children: [n ? /* @__PURE__ */ N("hgroup", {
          className: p("ModalContentHeader"),
          children: [n ? /* @__PURE__ */ d("h2", {
            id: u,
            children: n
          }) : null, r ? /* @__PURE__ */ d("p", {
            id: l,
            className: "syw-hidden",
            children: r
          }) : null]
        }) : null, a]
      }), /* @__PURE__ */ d("button", {
        onClick: _,
        className: p("ModalClose")
      })]
    })]
  });
}, no = () => {
  const {
    isExplainerOpen: e,
    isProvenanceOpen: n,
    openProvenance: r,
    closeProvenance: o,
    closeExplainer: a
  } = J(), {
    getText: i
  } = Q(), c = (u, l) => {
    const _ = l;
    u ? r(_) : (o(_), a(_));
  };
  return /* @__PURE__ */ N(eo, {
    open: n,
    title: i("provenance", "toggle"),
    onOpenChange: c,
    className: p("ProvenanceModal"),
    children: [/* @__PURE__ */ N("div", {
      className: p("ProvenanceModalExplainer"),
      children: [e ? null : /* @__PURE__ */ d(Xn, {}), /* @__PURE__ */ d(Zn, {})]
    }), /* @__PURE__ */ d(et, {})]
  });
}, to = () => {
  const {
    compareImage: e,
    comparePosition: n
  } = J();
  return /* @__PURE__ */ d("div", {
    className: p("ImageCompare"),
    style: {
      left: `${n == null ? void 0 : n.clientX}px`,
      top: `${n == null ? void 0 : n.clientY}px`
    },
    children: /* @__PURE__ */ d("img", {
      src: e,
      alt: "",
      className: p("ImageCompareImg")
    })
  });
};
function ro({
  onEvent: e
}) {
  const n = Y(null), {
    src: r,
    setManifests: o
  } = Ae(), {
    locale: a
  } = Q(), {
    variant: i,
    compareImage: c,
    isImageHover: u,
    isProvenanceOpen: l,
    setElem: _,
    eventHandler: g
  } = J(), {
    reader: m,
    provenance: T
  } = yr(r), V = Oe(() => p("App", `App_${i}`, u ? "App_hovered" : !1, l ? "App_active" : !1), [i, u, l]);
  return $(() => {
    _(n.current);
  }, [n]), $(() => {
    (async () => {
      var P;
      const G = await Promise.all(Object.values(((P = T == null ? void 0 : T.manifestStore) == null ? void 0 : P.manifests) ?? {}).map((M) => dr({
        src: r,
        locale: a,
        manifest: M,
        reader: m
      })));
      o(G);
    })();
  }, [r, a, T, m]), $(() => {
    g.current = e;
  }, [g, e]), /* @__PURE__ */ N("div", {
    ref: n,
    className: V,
    children: [/* @__PURE__ */ N(Cr, {
      children: [/* @__PURE__ */ d(Tr, {}), i === "expand" ? /* @__PURE__ */ d(Zn, {}) : null, /* @__PURE__ */ d(Ir, {}), /* @__PURE__ */ d(Pr, {})]
    }), i === "expand" ? /* @__PURE__ */ d(Qe, {
      open: l,
      className: p("ProvenanceModal"),
      children: /* @__PURE__ */ d(et, {})
    }) : null, i === "modal" ? /* @__PURE__ */ d(no, {}) : null, c ? /* @__PURE__ */ d(to, {}) : null]
  });
}
function ao({
  locale: e,
  src: n,
  alt: r,
  caption: o,
  byline: a,
  variant: i,
  ...c
}) {
  return /* @__PURE__ */ d(br, {
    children: /* @__PURE__ */ d(pr, {
      locale: e,
      children: /* @__PURE__ */ d(wr, {
        src: n,
        alt: r,
        caption: o,
        byline: a,
        children: /* @__PURE__ */ d(hr, {
          variant: i,
          children: /* @__PURE__ */ d(ro, {
            ...c
          })
        })
      })
    })
  });
}
export {
  ao as default
};
