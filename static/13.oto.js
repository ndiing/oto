"use strict";(self.webpackChunkmaterial=self.webpackChunkmaterial||[]).push([[13],{4013:(e,t,r)=>{r.r(t),r.d(t,{default:()=>m});var n,o,u,i=r(7374);function a(e){return a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},a(e)}function c(e,t){return t||(t=e.slice(0)),Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(t)}}))}function l(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function d(e,t){return d=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},d(e,t)}function f(e,t){if(t&&("object"===a(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function s(e){return s=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},s(e)}var b=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&d(e,t)}(p,e);var t,r,a,b,m=(a=p,b=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=s(a);if(b){var r=s(this).constructor;e=Reflect.construct(t,arguments,r)}else e=t.apply(this,arguments);return f(this,e)});function p(){var e;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,p),(e=m.call(this)).data=[{label:"Buku Besar",body:"Keterangan",buttons:[{label:"Buka",routerLink:"/buku-besar/buku-besar",filled:!0}]},{label:"Jurnal Umum",body:"Keterangan",buttons:[{label:"Buat",routerLink:"/buku-besar/jurnal-umum2"},{label:"Buka",routerLink:"/buku-besar/jurnal-umum",filled:!0}]}],e}return t=p,(r=[{key:"render",value:function(){return(0,i.dy)(n||(n=c(['\n            <div class="md-grid">\n                ',"\n            </div>\n        "])),this.data.map((function(e){return(0,i.dy)(o||(o=c(['\n                    <div class="md-grid__column md-grid__column--large3 md-grid__column--medium3 md-grid__column--small4">\n                        <div class="md-card md-card--filled">\n                            <div class="md-card__header">\n                                <div class="md-card__label"><div class="md-card__label-primary">','</div></div>\n                            </div>\n                            <div class="md-card__body">','</div>\n                            <div class="md-card__footer">\n                                <div class="md-card__spacer"></div>\n                                ',"\n                            </div>\n                        </div>\n                    </div>\n                "])),e.label,e.body,e.buttons.map((function(e){return(0,i.dy)(u||(u=c(['\n                                    <md-button \n                                        .label="','" \n                                        .routerLink="','" \n                                        .filled="','"></md-button>\n                                '])),e.label,e.routerLink,e.filled)})))})))}}])&&l(t.prototype,r),Object.defineProperty(t,"prototype",{writable:!1}),p}(i.So);customElements.get("oto-buku-besar")||customElements.define("oto-buku-besar",b);const m=new b}}]);