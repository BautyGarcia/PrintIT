if(!self.define){let e,s={};const n=(n,a)=>(n=new URL(n+".js",a).href,s[n]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=s,document.head.appendChild(e)}else e=n,importScripts(n),s()})).then((()=>{let e=s[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(a,c)=>{const i=e||("document"in self?document.currentScript.src:"")||location.href;if(s[i])return;let t={};const r=e=>n(e,i),o={module:{uri:i},exports:t,require:r};s[i]=Promise.all(a.map((e=>o[e]||r(e)))).then((e=>(c(...e),t)))}}define(["./workbox-80ca14c3"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/AboutUs/AboutUsImg.png",revision:"bb85f99c546748b5ddaa765f2abd28bb"},{url:"/AboutUs/BautiImg.png",revision:"5f8a8d7ebc99701d762487c393381e87"},{url:"/AboutUs/BautyImg.png",revision:"bebcf112a351fd8dcd41355b5c762665"},{url:"/AboutUs/EnzoImg.png",revision:"f274fc667b4acb45b90f865adddfbc6f"},{url:"/AboutUs/FrancoImg.png",revision:"4fdfc26cbe0382737510a064b81e9ec9"},{url:"/AboutUs/LinkedinLogo.png",revision:"1d5c8cc8d948e08084773545918140e8"},{url:"/AboutUs/TopAbout.png",revision:"6050fb30111f9151abf7fbf77f585749"},{url:"/Carousel/Carousel1.png",revision:"0386f5f2b4bc031124c2d84bb7a18f66"},{url:"/Carousel/Carousel2.png",revision:"90018319b42a66cd9e5669ff19ecde97"},{url:"/Carousel/Carousel3.png",revision:"9b889c8ce43805622dfd89450dc45250"},{url:"/Carousel/Carousel4.png",revision:"ca08678029403c4b1355d99f45af36f5"},{url:"/Carousel/Carousel5.png",revision:"9d92880160ce5b8039bbc3fbcd76598e"},{url:"/ContactUs/ContactImg.png",revision:"8775ed98e6c7974f8c205dc52fe02edb"},{url:"/General/Logo.ico",revision:"841439dfdf828853b1e751f2894eb84c"},{url:"/General/Logo.png",revision:"7b045ff4a025814d89c28612c4676ffd"},{url:"/General/LogoGoogle.png",revision:"6ece6123e79ec081168f4e0b12166daa"},{url:"/Landing/DiscordLanding.png",revision:"2375e61c6f9459d7d85cbb35754732d7"},{url:"/Landing/FaceBookLanding.png",revision:"ff5a949c4f595dd63a7be4d3354a3205"},{url:"/Landing/HombreNubeTanto.png",revision:"b2511368322596f9948e158852ac30c8"},{url:"/Landing/Impresora.png",revision:"00a477d7b21a5299d291c8015ffb332f"},{url:"/Landing/InstagramLanding.png",revision:"5db5371f443c863010948aa5617b190c"},{url:"/Landing/Objetivo.png",revision:"c6edbaa644388093f9e886d7d43235ea"},{url:"/Landing/Proveedores.png",revision:"7d02d9fa34ef7b0d8cacd4effd00c83f"},{url:"/Landing/PuntodeImpresion.png",revision:"7f22298de40cd65d59a303abd12cec84"},{url:"/Landing/Servicio.png",revision:"434bfd0c04393080bf4bede6c342d599"},{url:"/Landing/TopLanding.png",revision:"a5e3b4c7de70d2f6488a2e1c8b461afd"},{url:"/Landing/TusNecesidades.png",revision:"c8c4b2d4812128243c7529eaa2d4dd08"},{url:"/Landing/UsoPrintItBlack.png",revision:"02bfe4609360df0348e3e8c8db41a0b4"},{url:"/Landing/UsoPrintItWhite.png",revision:"ebd083fe8de69cb5a129cbe3b9203dc1"},{url:"/LogoWhite.png",revision:"4b8c5a37f9e6aef0f052cd94fea1228b"},{url:"/PWA/LogoPWA.png",revision:"bbe3ddcd3bbddfd5262de05972feb6d3"},{url:"/PWA/MaskableLogoPWA.png",revision:"beecc7979afe979361e4b5f78971b40e"},{url:"/RecoverPassword/Recover.png",revision:"2f0e3ac6a6ed92c1007b452fdb134d7a"},{url:"/RecoverPassword/Recover_Token.png",revision:"ed6664125d2ca80527633e17eb5698e8"},{url:"/STLViewer/matcap-porcelain-white.jpg",revision:"1b992319e2d525cb67d6637996663716"},{url:"/UserAuth/SignIn.png",revision:"89241f6e5c4d96689abf96620b527625"},{url:"/UserAuth/SignUp.png",revision:"b570ddcd56567884419b3106900b0402"},{url:"/_next/static/chunks/18-18d45f5217164a16.js",revision:"18d45f5217164a16"},{url:"/_next/static/chunks/192-4c77c32f35e35d21.js",revision:"4c77c32f35e35d21"},{url:"/_next/static/chunks/258-26176ba6fb14fc70.js",revision:"26176ba6fb14fc70"},{url:"/_next/static/chunks/259-c4d0157ec5d01910.js",revision:"c4d0157ec5d01910"},{url:"/_next/static/chunks/293-827fcd43a4641912.js",revision:"827fcd43a4641912"},{url:"/_next/static/chunks/295-703fed5609da9e8f.js",revision:"703fed5609da9e8f"},{url:"/_next/static/chunks/412-597ec3c00e78c77b.js",revision:"597ec3c00e78c77b"},{url:"/_next/static/chunks/425-70feeadd0a508b0c.js",revision:"70feeadd0a508b0c"},{url:"/_next/static/chunks/495-94cc55a95a73591e.js",revision:"94cc55a95a73591e"},{url:"/_next/static/chunks/5186a68d.07aeba6f5e3be215.js",revision:"07aeba6f5e3be215"},{url:"/_next/static/chunks/519-293701a91bfb0b99.js",revision:"293701a91bfb0b99"},{url:"/_next/static/chunks/581-f8a7260f1c76f296.js",revision:"f8a7260f1c76f296"},{url:"/_next/static/chunks/60-af872f6b13650516.js",revision:"af872f6b13650516"},{url:"/_next/static/chunks/676-51231117ff43aaaa.js",revision:"51231117ff43aaaa"},{url:"/_next/static/chunks/713-e72256aaa34e3a6d.js",revision:"e72256aaa34e3a6d"},{url:"/_next/static/chunks/726-de72e1deec0e290b.js",revision:"de72e1deec0e290b"},{url:"/_next/static/chunks/737-94ccf0c2b8a65693.js",revision:"94ccf0c2b8a65693"},{url:"/_next/static/chunks/825.58098bb285735f11.js",revision:"58098bb285735f11"},{url:"/_next/static/chunks/91d71a29-32092ff1fe7ff1a6.js",revision:"32092ff1fe7ff1a6"},{url:"/_next/static/chunks/926-94ecb978f7cc5c36.js",revision:"94ecb978f7cc5c36"},{url:"/_next/static/chunks/961-cbe9ae3e2cfdceba.js",revision:"cbe9ae3e2cfdceba"},{url:"/_next/static/chunks/a560505e-d89af004c8a87567.js",revision:"d89af004c8a87567"},{url:"/_next/static/chunks/framework-a4b9f4216022cc2d.js",revision:"a4b9f4216022cc2d"},{url:"/_next/static/chunks/main-fc6e1c606b899b19.js",revision:"fc6e1c606b899b19"},{url:"/_next/static/chunks/pages/404-65893526956ea15a.js",revision:"65893526956ea15a"},{url:"/_next/static/chunks/pages/_app-033facfcf2f36174.js",revision:"033facfcf2f36174"},{url:"/_next/static/chunks/pages/_error-12a18ebe1cf9d279.js",revision:"12a18ebe1cf9d279"},{url:"/_next/static/chunks/pages/about-696c8fe655f72b79.js",revision:"696c8fe655f72b79"},{url:"/_next/static/chunks/pages/contact-us-bb23e759fa15b884.js",revision:"bb23e759fa15b884"},{url:"/_next/static/chunks/pages/dashboard-e63fcc1dda109d9a.js",revision:"e63fcc1dda109d9a"},{url:"/_next/static/chunks/pages/dashboard/elegirImpresora-34f7e5b5a294358c.js",revision:"34f7e5b5a294358c"},{url:"/_next/static/chunks/pages/dashboard/misImpresoras-d130171da845e0e4.js",revision:"d130171da845e0e4"},{url:"/_next/static/chunks/pages/dashboard/misPedidos-290ee976b7bca578.js",revision:"290ee976b7bca578"},{url:"/_next/static/chunks/pages/dashboard/misTrabajos-30c1c2449fe675b1.js",revision:"30c1c2449fe675b1"},{url:"/_next/static/chunks/pages/dashboard/subirArchivo-e66cad5a33f8d7b0.js",revision:"e66cad5a33f8d7b0"},{url:"/_next/static/chunks/pages/index-07c0b1038d356691.js",revision:"07c0b1038d356691"},{url:"/_next/static/chunks/pages/recoverPassword-ae73d69fee96693a.js",revision:"ae73d69fee96693a"},{url:"/_next/static/chunks/pages/recoverPassword/%5Btoken%5D-56d5bd6111f81e49.js",revision:"56d5bd6111f81e49"},{url:"/_next/static/chunks/pages/settings-feda8e705360bee7.js",revision:"feda8e705360bee7"},{url:"/_next/static/chunks/pages/signIn-58d7842d062fe513.js",revision:"58d7842d062fe513"},{url:"/_next/static/chunks/pages/signUp-4842375722af542a.js",revision:"4842375722af542a"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-f58449417e21e41d.js",revision:"f58449417e21e41d"},{url:"/_next/static/css/110216c4e0e0758c.css",revision:"110216c4e0e0758c"},{url:"/_next/static/css/6dc6c0267cb21236.css",revision:"6dc6c0267cb21236"},{url:"/_next/static/media/remixicon.227bf528.eot",revision:"227bf528"},{url:"/_next/static/media/remixicon.26f18b51.woff",revision:"26f18b51"},{url:"/_next/static/media/remixicon.5d6b0a13.woff2",revision:"5d6b0a13"},{url:"/_next/static/media/remixicon.7cc5770e.ttf",revision:"7cc5770e"},{url:"/_next/static/r91URejsu01e1eXeTYRPc/_buildManifest.js",revision:"4c7f0883393ab3a94178dd84ae08ac3d"},{url:"/_next/static/r91URejsu01e1eXeTYRPc/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/manifest.json",revision:"e566a0f5d78155c19ef07968166f5b95"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:n,state:a})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
