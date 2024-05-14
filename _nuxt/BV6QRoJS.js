import{j as $,k as B,l as _,m as H,q as N,s as R,v as W,x as J,y as k,h as v,z as T,A as I,u as q,B as L,C as U,c as F,a as V,b as m,D as C,o as G}from"./_WNnmATC.js";async function Z(e,t){return await Q(t).catch(i=>(console.error("Failed to get image meta for "+t,i+""),{width:0,height:0,ratio:0}))}async function Q(e){if(typeof Image>"u")throw new TypeError("Image not supported");return new Promise((t,s)=>{const i=new Image;i.onload=()=>{const n={width:i.width,height:i.height,ratio:i.width/i.height};t(n)},i.onerror=n=>s(n),i.src=e})}function M(e){return t=>t?e[t]||t:e.missingValue}function X({formatter:e,keyMap:t,joinWith:s="/",valueMap:i}={}){e||(e=(r,a)=>`${r}=${a}`),t&&typeof t!="function"&&(t=M(t));const n=i||{};return Object.keys(n).forEach(r=>{typeof n[r]!="function"&&(n[r]=M(n[r]))}),(r={})=>Object.entries(r).filter(([d,c])=>typeof c<"u").map(([d,c])=>{const l=n[d];return typeof l=="function"&&(c=l(r[d])),d=typeof t=="function"?t(d):d,e(d,c)}).join(s)}function h(e=""){if(typeof e=="number")return e;if(typeof e=="string"&&e.replace("px","").match(/^\d+$/g))return parseInt(e,10)}function Y(e=""){if(e===void 0||!e.length)return[];const t=new Set;for(const s of e.split(" ")){const i=parseInt(s.replace("x",""));i&&t.add(i)}return Array.from(t)}function K(e){if(e.length===0)throw new Error("`densities` must not be empty, configure to `1` to render regular size only (DPR 1.0)")}function ee(e){const t={};if(typeof e=="string")for(const s of e.split(/[\s,]+/).filter(i=>i)){const i=s.split(":");i.length!==2?t["1px"]=i[0].trim():t[i[0].trim()]=i[1].trim()}else Object.assign(t,e);return t}function te(e){const t={options:e},s=(n,r={})=>P(t,n,r),i=(n,r={},a={})=>s(n,{...a,modifiers:N(r,a.modifiers||{})}).url;for(const n in e.presets)i[n]=(r,a,d)=>i(r,a,{...e.presets[n],...d});return i.options=e,i.getImage=s,i.getMeta=(n,r)=>ie(t,n,r),i.getSizes=(n,r)=>re(t,n,r),t.$img=i,i}async function ie(e,t,s){const i=P(e,t,{...s});return typeof i.getMeta=="function"?await i.getMeta():await Z(e,i.url)}function P(e,t,s){var l,u;if(typeof t!="string"||t==="")throw new TypeError(`input must be a string (received ${typeof t}: ${JSON.stringify(t)})`);if(t.startsWith("data:"))return{url:t};const{provider:i,defaults:n}=se(e,s.provider||e.options.provider),r=ne(e,s.preset);if(t=$(t)?t:B(t),!i.supportsAlias)for(const w in e.options.alias)t.startsWith(w)&&(t=_(e.options.alias[w],t.substr(w.length)));if(i.validateDomains&&$(t)){const w=H(t).host;if(!e.options.domains.find(S=>S===w))return{url:t}}const a=N(s,r,n);a.modifiers={...a.modifiers};const d=a.modifiers.format;(l=a.modifiers)!=null&&l.width&&(a.modifiers.width=h(a.modifiers.width)),(u=a.modifiers)!=null&&u.height&&(a.modifiers.height=h(a.modifiers.height));const c=i.getImage(t,a,e);return c.format=c.format||d||"",c}function se(e,t){const s=e.options.providers[t];if(!s)throw new Error("Unknown provider: "+t);return s}function ne(e,t){if(!t)return{};if(!e.options.presets[t])throw new Error("Unknown preset: "+t);return e.options.presets[t]}function re(e,t,s){var g,b,x,j,z;const i=h((g=s.modifiers)==null?void 0:g.width),n=h((b=s.modifiers)==null?void 0:b.height),r=ee(s.sizes),a=(x=s.densities)!=null&&x.trim()?Y(s.densities.trim()):e.options.densities;K(a);const d=i&&n?n/i:0,c=[],l=[];if(Object.keys(r).length>=1){for(const f in r){const p=D(f,String(r[f]),n,d,e);if(p!==void 0){c.push({size:p.size,screenMaxWidth:p.screenMaxWidth,media:`(max-width: ${p.screenMaxWidth}px)`});for(const y of a)l.push({width:p._cWidth*y,src:A(e,t,s,p,y)})}}ae(c)}else for(const f of a){const p=Object.keys(r)[0];let y=D(p,String(r[p]),n,d,e);y===void 0&&(y={size:"",screenMaxWidth:0,_cWidth:(j=s.modifiers)==null?void 0:j.width,_cHeight:(z=s.modifiers)==null?void 0:z.height}),l.push({width:f,src:A(e,t,s,y,f)})}oe(l);const u=l[l.length-1],w=c.length?c.map(f=>`${f.media?f.media+" ":""}${f.size}`).join(", "):void 0,S=w?"w":"x",o=l.map(f=>`${f.src} ${f.width}${S}`).join(", ");return{sizes:w,srcset:o,src:u==null?void 0:u.src}}function D(e,t,s,i,n){const r=n.options.screens&&n.options.screens[e]||parseInt(e),a=t.endsWith("vw");if(!a&&/^\d+$/.test(t)&&(t=t+"px"),!a&&!t.endsWith("px"))return;let d=parseInt(t);if(!r||!d)return;a&&(d=Math.round(d/100*r));const c=i?Math.round(d*i):s;return{size:t,screenMaxWidth:r,_cWidth:d,_cHeight:c}}function A(e,t,s,i,n){return e.$img(t,{...s.modifiers,width:i._cWidth?i._cWidth*n:void 0,height:i._cHeight?i._cHeight*n:void 0},s)}function ae(e){var s;e.sort((i,n)=>i.screenMaxWidth-n.screenMaxWidth);let t=null;for(let i=e.length-1;i>=0;i--){const n=e[i];n.media===t&&e.splice(i,1),t=n.media}for(let i=0;i<e.length;i++)e[i].media=((s=e[i+1])==null?void 0:s.media)||""}function oe(e){e.sort((s,i)=>s.width-i.width);let t=null;for(let s=e.length-1;s>=0;s--){const i=e[s];i.width===t&&e.splice(s,1),t=i.width}}const de=X({keyMap:{format:"f",fit:"fit",width:"w",height:"h",resize:"s",quality:"q",background:"b"},joinWith:"&",formatter:(e,t)=>W(e)+"_"+W(t)}),ce=(e,{modifiers:t={},baseURL:s}={},i)=>{t.width&&t.height&&(t.resize=`${t.width}x${t.height}`,delete t.width,delete t.height);const n=de(t)||"_";return s||(s=_(i.options.nuxt.baseURL,"/_ipx")),{url:_(s,n,R(e))}},le=!0,me=!0,ue=Object.freeze(Object.defineProperty({__proto__:null,getImage:ce,supportsAlias:me,validateDomains:le},Symbol.toStringTag,{value:"Module"})),E={screens:{xs:320,sm:640,md:768,lg:1024,xl:1280,xxl:1536,"2xl":1536},presets:{},provider:"ipxStatic",domains:[],alias:{},densities:[1,2],format:["webp"]};E.providers={ipxStatic:{provider:ue,defaults:{}}};const O=()=>{const e=J(),t=k();return t.$img||t._img||(t._img=te({...E,nuxt:{baseURL:e.app.baseURL}}))};function fe(e){var t;(t=performance==null?void 0:performance.mark)==null||t.call(performance,"mark_feature_usage",{detail:{feature:e}})}const ge={src:{type:String,required:!0},format:{type:String,default:void 0},quality:{type:[Number,String],default:void 0},background:{type:String,default:void 0},fit:{type:String,default:void 0},modifiers:{type:Object,default:void 0},preset:{type:String,default:void 0},provider:{type:String,default:void 0},sizes:{type:[Object,String],default:void 0},densities:{type:String,default:void 0},preload:{type:Boolean,default:void 0},width:{type:[String,Number],default:void 0},height:{type:[String,Number],default:void 0},alt:{type:String,default:void 0},referrerpolicy:{type:String,default:void 0},usemap:{type:String,default:void 0},longdesc:{type:String,default:void 0},ismap:{type:Boolean,default:void 0},loading:{type:String,default:void 0,validator:e=>["lazy","eager"].includes(e)},crossorigin:{type:[Boolean,String],default:void 0,validator:e=>["anonymous","use-credentials","",!0,!1].includes(e)},decoding:{type:String,default:void 0,validator:e=>["async","auto","sync"].includes(e)},nonce:{type:[String],default:void 0}},he=e=>{const t=v(()=>({provider:e.provider,preset:e.preset})),s=v(()=>({width:h(e.width),height:h(e.height),alt:e.alt,referrerpolicy:e.referrerpolicy,usemap:e.usemap,longdesc:e.longdesc,ismap:e.ismap,crossorigin:e.crossorigin===!0?"anonymous":e.crossorigin||void 0,loading:e.loading,decoding:e.decoding,nonce:e.nonce})),i=O(),n=v(()=>({...e.modifiers,width:h(e.width),height:h(e.height),format:e.format,quality:e.quality||i.options.quality,background:e.background,fit:e.fit}));return{options:t,attrs:s,modifiers:n}},we={...ge,placeholder:{type:[Boolean,String,Number,Array],default:void 0}},pe=T({name:"NuxtImg",props:we,emits:["load","error"],setup:(e,t)=>{const s=O(),i=he(e),n=I(!1),r=v(()=>s.getSizes(e.src,{...i.options.value,sizes:e.sizes,densities:e.densities,modifiers:{...i.modifiers.value,width:h(e.width),height:h(e.height)}})),a=v(()=>{const o={...i.attrs.value,"data-nuxt-img":""};return(!e.placeholder||n.value)&&(o.sizes=r.value.sizes,o.srcset=r.value.srcset),o}),d=v(()=>{let o=e.placeholder;if(o===""&&(o=!0),!o||n.value)return!1;if(typeof o=="string")return o;const g=Array.isArray(o)?o:typeof o=="number"?[o,o]:[10,10];return s(e.src,{...i.modifiers.value,width:g[0],height:g[1],quality:g[2]||50,blur:g[3]||3},i.options.value)}),c=v(()=>e.sizes?r.value.src:s(e.src,i.modifiers.value,i.options.value)),l=v(()=>d.value?d.value:c.value);if(e.preload){const o=Object.values(r.value).every(g=>g);q({link:[{rel:"preload",as:"image",nonce:e.nonce,...o?{href:r.value.src,imagesizes:r.value.sizes,imagesrcset:r.value.srcset}:{href:l.value}}]})}const u=I(),S=k().isHydrating;return L(()=>{if(d.value){const o=new Image;o.src=c.value,e.sizes&&(o.sizes=r.value.sizes||"",o.srcset=r.value.srcset),o.onload=g=>{n.value=!0,t.emit("load",g)},fe("nuxt-image");return}u.value&&(u.value.complete&&S&&(u.value.getAttribute("data-error")?t.emit("error",new Event("error")):t.emit("load",new Event("load"))),u.value.onload=o=>{t.emit("load",o)},u.value.onerror=o=>{t.emit("error",o)})}),()=>U("img",{ref:u,src:l.value,...a.value,...t.attrs})}}),ve={class:"container"},ye=C('<h1 class="px-2">Job Demand - Data Science</h1><div class="flex flex-row flex-wrap"><div class="w-full md:w-1/2 p-2 shadow-md"><h3>Reference</h3><ul><li> 365 DataScience <a href="https://365datascience.com/career-advice/data-scientist-job-market/">The Data Scientist Job Market in 2024</a></li></ul><h3>Key Findings</h3><ul><li> 5% of the companies have explicitly set their location to ‘remote’. </li><li>47.4% of the roles require a data science degree.</li><li> Python was explicitly mentioned in 78% of data scientist job offers in 2023 and in 57% in 2024. </li><li>Machine learning appears in 69% of job postings.</li><li> The demand for natural language processing skills has increased from 5% in 2023 to 19% in 2024. </li><li> Some data science positions require cloud certification, such as AWS (19.7%). </li><li> The average salary range for a data scientist is $160,000–$200,000 annually. </li></ul></div><div class="w-full md:w-1/2 p-2 shadow-md"><h2>Sought-After Technical Skills for Data Scientists</h2></div></div>',2),Se={class:"w-full flex flex-row flex-wrap"},be={__name:"index",setup(e){return q({title:"DS-Job Demand",meta:[{name:"description",content:"Data Science:  Job Survey/Job Demand"}]}),(t,s)=>{const i=pe;return G(),F("div",ve,[ye,V("div",Se,[m(i,{src:"/images/demand/dem-001.jpeg",class:"w-full md:w-96 m-2 shadow-md"}),m(i,{src:"/images/demand/dem-002.jpeg",class:"w-full md:w-96 m-2 shadow-md"}),m(i,{src:"/images/demand/dem-003.jpeg",class:"w-full md:w-96 m-2 shadow-md"}),m(i,{src:"/images/demand/dem-004.jpeg",class:"w-full md:w-96 m-2 shadow-md"}),m(i,{src:"/images/demand/dem-005.jpeg",class:"w-full md:w-96 m-2 shadow-md"}),m(i,{src:"/images/demand/dem-006.jpeg",class:"w-full md:w-96 m-2 shadow-md"}),m(i,{src:"/images/demand/dem-007.jpeg",class:"w-full md:w-96 m-2 shadow-md"}),m(i,{src:"/images/demand/dem-008.jpeg",class:"w-full md:w-96 m-2 shadow-md"}),m(i,{src:"/images/demand/dem-009.jpeg",class:"w-full md:w-96 m-2 shadow-md"}),m(i,{src:"/images/demand/dem-010.jpeg",class:"w-full md:w-96 m-2 shadow-md"}),m(i,{src:"/images/demand/dem-011.jpeg",class:"w-full md:w-96 m-2 shadow-md"}),m(i,{src:"/images/demand/dem-012.jpeg",class:"w-full md:w-96 m-2 shadow-md"}),m(i,{src:"/images/demand/dem-013.jpeg",class:"w-full md:w-96 m-2 shadow-md"}),m(i,{src:"/images/demand/dem-014.jpeg",class:"w-full md:w-96 m-2 shadow-md"})])])}}};export{be as default};
