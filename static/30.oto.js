"use strict";(self.webpackChunkmaterial=self.webpackChunkmaterial||[]).push([[30],{30:(e,t,n)=>{n.r(t),n.d(t,{default:()=>s});var r,o=n(789),i=n(802);function a(e){return a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},a(e)}function c(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function u(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function l(e,t){return l=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},l(e,t)}function f(e,t){if(t&&("object"===a(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function d(e){return d=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},d(e)}var b=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&l(e,t)}(p,e);var t,n,a,b,s=(a=p,b=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=d(a);if(b){var n=d(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return f(this,e)});function p(){return c(this,p),s.apply(this,arguments)}return t=p,(n=[{key:"render",value:function(){return(0,o.dy)(r||(e=['\n            <div class="md-grid">\n                <div class="md-grid__column md-grid__column--large12 md-grid__column--medium12 md-grid__column--small4">\n                    <md-data-table id="table" url="','/api/akuntansi/v1/laba-rugi"></md-data-table>\n                </div>\n            </div>\n        '],t||(t=e.slice(0)),r=Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(t)}}))),window.location.origin);var e,t}},{key:"firstUpdated",value:function(){table.columns=[[{name:"kode",label:"Kode"},{name:"nama",label:"Nama"},{name:"debit",label:"Debit",alignEnd:!0},{name:"kredit",label:"Kredit",alignEnd:!0}]],table.rows=[[{name:"kode"},{name:"nama"},{name:"debit",alignEnd:!0,convertLabel:i.E},{name:"kredit",alignEnd:!0,convertLabel:i.E}]]}}])&&u(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),p}(o.So);customElements.get("oto-laba-rugi")||customElements.define("oto-laba-rugi",b);const s=new b},802:(e,t,n)=>{function r(e){return new Intl.NumberFormat(["ban","id"],{style:"currency",currency:"IDR"}).format(e||0)}n.d(t,{E:()=>r})}}]);