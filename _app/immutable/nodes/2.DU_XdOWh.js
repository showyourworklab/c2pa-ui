import{f as y,a as u}from"../chunks/BJoOsLR7.js";import"../chunks/BFCzBDDl.js";import{w as f,e,r as a,s as t,g as w}from"../chunks/DBIR0-es.js";import{s as v,S}from"../chunks/zwoDy3uG.js";import{b}from"../chunks/DNsCsKWt.js";import{s as x}from"../chunks/Bypi_2Fd.js";import{i as L}from"../chunks/-6F8dua1.js";const C=""+new URL("../assets/logo-dark.DBEfLK2W.svg",import.meta.url).href;var E=y('<header><a href="https://showyourworklab.org" target="_blank"><img alt="Show Your Work Lab logo" id="logo"/></a></header>');function U(p){var r=E(),o=e(r),n=e(o);a(o),a(r),f(()=>v(n,"src",C)),u(p,r)}var $=y("<h2><var> </var></h2>"),R=y('<hgroup><h1>The Show Your Work UI</h1> <!> <p><strong><a>React</a></strong> and <strong><a>Svelte</a></strong> component to embed images with their C2PA data in a user-friendly interface</p> <p><a href="https://github.com/showyourworklab/syw/" target="_blank" rel="noopener noreferrer" class="button" data-icon="github">View code</a></p></hgroup>');function j(p,r){var o=R(),n=t(e(o),2);{var l=i=>{var c=$(),m=e(c),k=e(m);a(m),a(c),f(()=>x(k,`syw-${r.type??""}`)),u(i,c)};L(n,i=>{r.type&&i(l)})}var g=t(n,2),s=e(g),d=e(s);a(s);var h=t(s,2),_=e(h);a(h),w(),a(g),w(2),a(o),f(()=>{v(d,"href",`${b??""}/react`),v(_,"href",`${b??""}/svelte`)}),u(p,o)}var D=y('<main><!> <!> <section><!></section> <section><h2>syw-svelte</h2> <code></code> <p><a class="button">Check out the demo</a> <a href="https://github.com/showyourworklab/syw/tree/development/packages/svelte" target="_blank" rel="noopener noreferrer" class="button" data-icon="github">View code</a></p></section> <section><h2>syw-react</h2> <code></code> <p><a class="button">Check out the demo</a> <a href="https://github.com/showyourworklab/syw/tree/development/packages/react" target="_blank" rel="noopener noreferrer" class="button" data-icon="github">View code</a></p></section></main>');function I(p){var r=D(),o=e(r);U(o);var n=t(o,2);j(n,{});var l=t(n,2),g=e(l);S(g,{locale:"en_US",src:"https://raw.githubusercontent.com/showyourworklab/c2pa-images/refs/heads/main/images/leica-nora-6.jpg",caption:"",byline:"Nora Savosnick"}),a(l);var s=t(l,2),d=t(e(s),2);d.textContent=`<script>
	import SywSvelte from "syw-react";
<\/script>

<SywSvelte
	locale="en-US"
	src="https://example.com/image.jpg"
	caption="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
	byline="Nulla Dignissim"
	onEvent={handleEvent}
/>`;var h=t(d,2),_=e(h);w(2),a(h),a(s);var i=t(s,2),c=t(e(i),2);c.textContent=`import SywReact from "syw-react";

return (
	<SywReact
		locale="en-US"
		src="https://example.com/image.jpg"
		caption="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
		byline="Nulla Dignissim"
		onEvent={handleEvent}
	/>
);`;var m=t(c,2),k=e(m);w(2),a(m),a(i),a(r),f(()=>{v(_,"href",`${b??""}/svelte`),v(k,"href",`${b??""}/react`)}),u(p,r)}export{I as component};
