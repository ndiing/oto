"use strict";(self.webpackChunkmaterial=self.webpackChunkmaterial||[]).push([[658],{658:(e,t,n)=>{n.r(t),n.d(t,{default:()=>f});var r,o=n(789);function l(e){return l="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},l(e)}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function d(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function u(e,t){return u=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},u(e,t)}function a(e,t){if(t&&("object"===l(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function c(e){return c=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},c(e)}var m=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&u(e,t)}(s,e);var t,n,l,m,f=(l=s,m=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=c(l);if(m){var n=c(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return a(this,e)});function s(){return i(this,s),f.apply(this,arguments)}return t=s,(n=[{key:"render",value:function(){return(0,o.dy)(r||(e=['\n            <div class="md-grid">\n                \x3c!-- <div class="md-grid__column md-grid__column--large2 md-grid__column--medium2 md-grid__column--small4">\n                    <md-text-field type="datetime-local" label="Tanggal"></md-text-field>\n                </div>\n                <div class="md-grid__column md-grid__column--large2 md-grid__column--medium2 md-grid__column--small4">\n                    <md-text-field type="text" label="Bukti"></md-text-field>\n                </div>\n                <div class="md-grid__column md-grid__column--large2 md-grid__column--medium2 md-grid__column--small4">\n                    <md-text-field type="text" label="Keterangan"></md-text-field>\n                </div> --\x3e\n\n                <div class="md-grid__column md-grid__column--large12 md-grid__column--medium12 md-grid__column--small4">\n                    <md-data-table id="table"></md-data-table>\n                </div>\n\n                \x3c!-- <div class="md-grid__column md-grid__column--large12 md-grid__column--medium12 md-grid__column--small4" style="display:flex;gap:8px;">\n                    <div style="flex:1;"></div>\n                    <md-button label="Batal"></md-button>\n                    <md-button label="Simpan" tonal></md-button>\n                </div> --\x3e\n            </div>\n        '],t||(t=e.slice(0)),r=Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(t)}}))));var e,t}},{key:"firstUpdated",value:function(){table.columns=[[{name:"kode_akun",label:"Akun",flex:4},{name:"debit",label:"Debit",alignEnd:!0,flex:1},{name:"kredit",label:"Kredit",alignEnd:!0,flex:1},{actions:[],flex:1}]],table.rows=[[{name:"kode_akun"},{name:"debit",alignEnd:!0},{name:"kredit",alignEnd:!0},{actions:["remove"]}]],table.data=Array.from({length:8},(function(){return{kode_akun:"",debit:"0",kredit:"0"}}))}}])&&d(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),s}(o.So);customElements.get("oto-jurnal-umum")||customElements.define("oto-jurnal-umum",m);const f=new m}}]);