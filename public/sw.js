if(!self.define){let e,s={};const a=(a,n)=>(a=new URL(a+".js",n).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(n,i)=>{const c=e||("document"in self?document.currentScript.src:"")||location.href;if(s[c])return;let t={};const r=e=>a(e,c),d={module:{uri:c},exports:t,require:r};s[c]=Promise.all(n.map((e=>d[e]||r(e)))).then((e=>(i(...e),t)))}}define(["./workbox-7c2a5a06"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/AboutUs/AboutUsImg.png",revision:"bb85f99c546748b5ddaa765f2abd28bb"},{url:"/AboutUs/BautiImg.png",revision:"5f8a8d7ebc99701d762487c393381e87"},{url:"/AboutUs/BautyImg.png",revision:"bebcf112a351fd8dcd41355b5c762665"},{url:"/AboutUs/EnzoImg.png",revision:"f274fc667b4acb45b90f865adddfbc6f"},{url:"/AboutUs/FrancoImg.png",revision:"4fdfc26cbe0382737510a064b81e9ec9"},{url:"/AboutUs/LinkedinLogo.png",revision:"1d5c8cc8d948e08084773545918140e8"},{url:"/AboutUs/TopAbout.png",revision:"6050fb30111f9151abf7fbf77f585749"},{url:"/Carousel/Carousel1.png",revision:"0386f5f2b4bc031124c2d84bb7a18f66"},{url:"/Carousel/Carousel2.png",revision:"90018319b42a66cd9e5669ff19ecde97"},{url:"/Carousel/Carousel3.png",revision:"9b889c8ce43805622dfd89450dc45250"},{url:"/Carousel/Carousel4.png",revision:"ca08678029403c4b1355d99f45af36f5"},{url:"/Carousel/Carousel5.png",revision:"9d92880160ce5b8039bbc3fbcd76598e"},{url:"/ContactUs/ContactImg.png",revision:"8775ed98e6c7974f8c205dc52fe02edb"},{url:"/General/Logo.ico",revision:"841439dfdf828853b1e751f2894eb84c"},{url:"/General/Logo.png",revision:"7b045ff4a025814d89c28612c4676ffd"},{url:"/General/LogoGoogle.png",revision:"6ece6123e79ec081168f4e0b12166daa"},{url:"/Landing/DiscordLanding.png",revision:"2375e61c6f9459d7d85cbb35754732d7"},{url:"/Landing/FaceBookLanding.png",revision:"ff5a949c4f595dd63a7be4d3354a3205"},{url:"/Landing/HombreNubeTanto.png",revision:"b2511368322596f9948e158852ac30c8"},{url:"/Landing/Impresora.png",revision:"00a477d7b21a5299d291c8015ffb332f"},{url:"/Landing/InstagramLanding.png",revision:"5db5371f443c863010948aa5617b190c"},{url:"/Landing/Objetivo.png",revision:"c6edbaa644388093f9e886d7d43235ea"},{url:"/Landing/Proveedores.png",revision:"7d02d9fa34ef7b0d8cacd4effd00c83f"},{url:"/Landing/PuntodeImpresion.png",revision:"7f22298de40cd65d59a303abd12cec84"},{url:"/Landing/Servicio.png",revision:"434bfd0c04393080bf4bede6c342d599"},{url:"/Landing/TopLanding.png",revision:"a5e3b4c7de70d2f6488a2e1c8b461afd"},{url:"/Landing/TusNecesidades.png",revision:"c8c4b2d4812128243c7529eaa2d4dd08"},{url:"/Landing/UsoPrintItBlack.png",revision:"02bfe4609360df0348e3e8c8db41a0b4"},{url:"/Landing/UsoPrintItWhite.png",revision:"ebd083fe8de69cb5a129cbe3b9203dc1"},{url:"/LogoWhite.png",revision:"4b8c5a37f9e6aef0f052cd94fea1228b"},{url:"/PWA/LogoPWA.png",revision:"bbe3ddcd3bbddfd5262de05972feb6d3"},{url:"/PWA/MaskableLogoPWA.png",revision:"beecc7979afe979361e4b5f78971b40e"},{url:"/RecoverPassword/Recover.png",revision:"2f0e3ac6a6ed92c1007b452fdb134d7a"},{url:"/RecoverPassword/Recover_Token.png",revision:"ed6664125d2ca80527633e17eb5698e8"},{url:"/STLViewer/matcap-porcelain-white.jpg",revision:"1b992319e2d525cb67d6637996663716"},{url:"/UserAuth/SignIn.png",revision:"89241f6e5c4d96689abf96620b527625"},{url:"/UserAuth/SignUp.png",revision:"b570ddcd56567884419b3106900b0402"},{url:"/_next/static/chunks/11e07bb4.e21e200f90e93a2f.js",revision:"e21e200f90e93a2f"},{url:"/_next/static/chunks/126-bb91bf188656917d.js",revision:"bb91bf188656917d"},{url:"/_next/static/chunks/186-03a2c052eadb6f8f.js",revision:"03a2c052eadb6f8f"},{url:"/_next/static/chunks/2-c7c4a6f913c8f090.js",revision:"c7c4a6f913c8f090"},{url:"/_next/static/chunks/235-37c59e16e33f1b12.js",revision:"37c59e16e33f1b12"},{url:"/_next/static/chunks/2577d2cc-c31b1ecd0d8b7e6a.js",revision:"c31b1ecd0d8b7e6a"},{url:"/_next/static/chunks/261-eb60602a5f8fe8e8.js",revision:"eb60602a5f8fe8e8"},{url:"/_next/static/chunks/34-a080185b784adbe5.js",revision:"a080185b784adbe5"},{url:"/_next/static/chunks/35-d68e2e6e7df64aa3.js",revision:"d68e2e6e7df64aa3"},{url:"/_next/static/chunks/481-9ccad0d8f277614f.js",revision:"9ccad0d8f277614f"},{url:"/_next/static/chunks/532-38436d07fad7adb9.js",revision:"38436d07fad7adb9"},{url:"/_next/static/chunks/586-7126ad5ce7568b59.js",revision:"7126ad5ce7568b59"},{url:"/_next/static/chunks/610-b3e85c3d99e96802.js",revision:"b3e85c3d99e96802"},{url:"/_next/static/chunks/647-a378ab2995d78524.js",revision:"a378ab2995d78524"},{url:"/_next/static/chunks/664-6afa16b072d4aaf3.js",revision:"6afa16b072d4aaf3"},{url:"/_next/static/chunks/785-61f1d2360de3644a.js",revision:"61f1d2360de3644a"},{url:"/_next/static/chunks/837-6ff05a800ac71d70.js",revision:"6ff05a800ac71d70"},{url:"/_next/static/chunks/85-9f165caf7aa296ed.js",revision:"9f165caf7aa296ed"},{url:"/_next/static/chunks/857.91da0949c2900a73.js",revision:"91da0949c2900a73"},{url:"/_next/static/chunks/891-62e92cae63fbafa3.js",revision:"62e92cae63fbafa3"},{url:"/_next/static/chunks/917-b67582aaaa4dbcaf.js",revision:"b67582aaaa4dbcaf"},{url:"/_next/static/chunks/fb7d5399-8e69b852f2ee72d8.js",revision:"8e69b852f2ee72d8"},{url:"/_next/static/chunks/framework-2c79e2a64abdb08b.js",revision:"2c79e2a64abdb08b"},{url:"/_next/static/chunks/main-c2499a390161ab5c.js",revision:"c2499a390161ab5c"},{url:"/_next/static/chunks/pages/404-f8fffeff3cd9513d.js",revision:"f8fffeff3cd9513d"},{url:"/_next/static/chunks/pages/_app-8a9b8b0578336f2e.js",revision:"8a9b8b0578336f2e"},{url:"/_next/static/chunks/pages/_error-54de1933a164a1ff.js",revision:"54de1933a164a1ff"},{url:"/_next/static/chunks/pages/about-2b2a82e6b12fcbb6.js",revision:"2b2a82e6b12fcbb6"},{url:"/_next/static/chunks/pages/contact-us-e5410bcd62a7ccbf.js",revision:"e5410bcd62a7ccbf"},{url:"/_next/static/chunks/pages/dashboard-4aba69a267e72eff.js",revision:"4aba69a267e72eff"},{url:"/_next/static/chunks/pages/dashboard/elegirImpresora-ae68d2f8e78385d3.js",revision:"ae68d2f8e78385d3"},{url:"/_next/static/chunks/pages/dashboard/misImpresoras-08eacae5b80f93dd.js",revision:"08eacae5b80f93dd"},{url:"/_next/static/chunks/pages/dashboard/misPedidos-bcc0736f6f0d506e.js",revision:"bcc0736f6f0d506e"},{url:"/_next/static/chunks/pages/dashboard/misTrabajos-03a23f568d4c5bbe.js",revision:"03a23f568d4c5bbe"},{url:"/_next/static/chunks/pages/dashboard/subirArchivo-d9b0751daf79fbab.js",revision:"d9b0751daf79fbab"},{url:"/_next/static/chunks/pages/index-5aec21f1d8dc19bf.js",revision:"5aec21f1d8dc19bf"},{url:"/_next/static/chunks/pages/recoverPassword-01563ce55712dc8d.js",revision:"01563ce55712dc8d"},{url:"/_next/static/chunks/pages/recoverPassword/%5Btoken%5D-0746a7caa94ac471.js",revision:"0746a7caa94ac471"},{url:"/_next/static/chunks/pages/settings-109d0d7da564e01d.js",revision:"109d0d7da564e01d"},{url:"/_next/static/chunks/pages/signIn-d8b7fe3b370124ba.js",revision:"d8b7fe3b370124ba"},{url:"/_next/static/chunks/pages/signUp-1934d9407a8e686e.js",revision:"1934d9407a8e686e"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-9db6c6e2229efb28.js",revision:"9db6c6e2229efb28"},{url:"/_next/static/css/0b431db32f47bd88.css",revision:"0b431db32f47bd88"},{url:"/_next/static/css/d8843e0b6bbc2a57.css",revision:"d8843e0b6bbc2a57"},{url:"/_next/static/media/remixicon.81a0dd4a.woff2",revision:"81a0dd4a"},{url:"/_next/static/media/remixicon.87279a61.woff",revision:"87279a61"},{url:"/_next/static/media/remixicon.8ed2eb01.eot",revision:"8ed2eb01"},{url:"/_next/static/media/remixicon.d9d97fb2.ttf",revision:"d9d97fb2"},{url:"/_next/static/rcdcsU3WeTxTtYNsdh8pp/_buildManifest.js",revision:"107c211f5d6125f9dc236d805c6c0807"},{url:"/_next/static/rcdcsU3WeTxTtYNsdh8pp/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/manifest.json",revision:"872784f1fbd5ad0c608eea6bba2a1317"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:a,state:n})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
