(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6e5d6d88"],{"0633":function(e,t,r){"use strict";r.r(t);var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"inner"},[r("div",{staticClass:"calc white-wrapper"},[r("h2",{staticClass:"title"},[e._v("Калькулятор перерасчета ингредиентов при выпечке")]),r("p",{staticClass:"calc__text"},[e._v("Как перерасчитать количество ингредиентов в зависимости от формы.")]),r("div",{staticClass:"calc__in-recipe"},[r("p",{staticClass:"calc__title"},[e._v("1. В рецепте используется")]),r("div",{staticClass:"calc__form"},[r("checkbox",{staticClass:"calc__check",attrs:{label:"Круглая форма",type:"radio",name:"in-recipe-type",val:"round"},model:{value:e.inRecipe.type,callback:function(t){e.$set(e.inRecipe,"type",t)},expression:"inRecipe.type"}}),r("checkbox",{staticClass:"calc__check",attrs:{label:"Прямоугольная форма",type:"radio",name:"in-recipe-type",val:"square"},model:{value:e.inRecipe.type,callback:function(t){e.$set(e.inRecipe,"type",t)},expression:"inRecipe.type"}})],1),r("div",{staticClass:"calc__row"},e._l(e.inRecipe[e.inRecipe.type],(function(t,a){return r("input_box",{key:a,attrs:{type:"number",label:t.label,isError:t.isError},on:{enter:function(t){return e.count()}},model:{value:t.value,callback:function(r){e.$set(t,"value","string"===typeof r?r.trim():r)},expression:"field.value"}})})),1)]),r("div",{},[r("p",{staticClass:"calc__title"},[e._v("2. У меня имеется")]),r("div",{staticClass:"calc__form"},[r("checkbox",{staticClass:"calc__check",attrs:{label:"Круглая форма",type:"radio",name:"in-use-type",val:"round"},model:{value:e.inUse.type,callback:function(t){e.$set(e.inUse,"type",t)},expression:"inUse.type"}}),r("checkbox",{staticClass:"calc__check",attrs:{label:"Прямоугольная форма",type:"radio",name:"in-use-type",val:"square"},model:{value:e.inUse.type,callback:function(t){e.$set(e.inUse,"type",t)},expression:"inUse.type"}})],1),r("div",{staticClass:"calc__row"},e._l(e.inUse[e.inUse.type],(function(t,a){return r("input_box",{key:a,attrs:{type:"number",label:t.label,isError:t.isError},on:{enter:function(t){return e.count()}},model:{value:t.value,callback:function(r){e.$set(t,"value","string"===typeof r?r.trim():r)},expression:"field.value"}})})),1)]),r("div",{staticClass:"calc__buttons"},[r("button_box",{staticClass:"calc__btn",attrs:{title:"Рассчитать",color:"Yellow"},on:{click:e.count}}),e._v(" "),r("button_box",{staticClass:"calc__btn",attrs:{title:"Очистить форму",color:"Grey"},on:{click:e.clear}})],1)]),r("div",{directives:[{name:"show",rawName:"v-show",value:e.result.performed,expression:"result.performed"}],staticClass:"result"},[r("p",{staticClass:"result__number"},[e._v("КОЭФФИЦИЕНТ = "+e._s(e.result.value))]),r("p",{staticClass:"result__explain"},[e._v("Для того, чтобы мой бисквит был "+e._s(e.result.toBe)+" и такой же высоты как в исходном рецепте, мне следует вес всех ингредиентов умножить на "),r("span",[e._v(e._s(e.result.value))])])]),r("div",{directives:[{name:"show",rawName:"v-show",value:!e.result.performed,expression:"!result.performed"}],staticClass:"result"},[r("p",{staticClass:"result__number"},[e._v("Введите данные для рассчета")])])])},i=[],n=(r("99af"),r("d81d"),r("a9e3"),r("b680"),r("b64b"),r("ac1f"),r("5319"),{name:"calculator1",data:function(){return{inRecipe:{type:"round",round:{diameter:{label:"Диаметром, см",value:"",isError:!1,errorText:null}},square:{length:{label:"Длиной, см",value:"",isError:!1,errorText:null},width:{label:"Шириной, см",value:"",isError:!1,errorText:null}}},inUse:{type:"round",round:{diameter:{label:"Диаметром, см",value:"",isError:!1,errorText:null}},square:{length:{label:"Длиной, см",value:"",isError:!1,errorText:null},width:{label:"Шириной, см",value:"",isError:!1,errorText:null}}},result:{value:0,performed:!1,toBe:""}}},methods:{count:function(){var e,t,r=this,a=!1,i=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;return Number(String(e).replace(/[^,\d]/g,"")||0)},n=function(e){return""!==e&&0!==i(e)||(a=!0,!1)},s=function(e){var t=0;if("round"===r[e].type){var a=i(r[e].round.diameter.value||0);r[e].round.diameter.isError=!n(r[e].round.diameter.value),r[e].round.diameter.value=r[e].round.diameter.isError?"":String(a),t=Math.PI*Math.pow(a/2,2)}else if("square"===r[e].type){var s=i(r[e].square.length.value||0),l=i(r[e].square.width.value||0);r[e].square.length.isError=!n(r[e].square.length.value),r[e].square.width.isError=!n(r[e].square.width.value),r[e].square.length.value=r[e].square.length.isError?"":String(s),r[e].square.width.value=r[e].square.width.isError?"":String(l),t=s*l}return t||0};e=s("inUse"),t=s("inRecipe"),a||(this.result.value=(e/t).toFixed(2),this.result.performed=!0,"round"===this.inUse.type?this.result.toBe="диаметром ".concat(this.inUse.round.diameter.value||0," см"):this.result.toBe="площадью ".concat(this.inUse.square.length.value||0," на ").concat(this.inUse.square.width.value||0," см"))},clear:function(){var e=this;["inUse","inRecipe"].map((function(t){["round","square"].map((function(r){Object.keys(e[t][r]).map((function(a){e[t][r][a].value=""}))}))})),this.result.performed=!1}}}),s=n,l=(r("a200"),r("2877")),c=Object(l["a"])(s,a,i,!1,null,"1df78f66",null);t["default"]=c.exports},1148:function(e,t,r){"use strict";var a=r("a691"),i=r("1d80");e.exports="".repeat||function(e){var t=String(i(this)),r="",n=a(e);if(n<0||n==1/0)throw RangeError("Wrong number of repetitions");for(;n>0;(n>>>=1)&&(t+=t))1&n&&(r+=t);return r}},"408a":function(e,t,r){var a=r("c6b6");e.exports=function(e){if("number"!=typeof e&&"Number"!=a(e))throw TypeError("Incorrect invocation");return+e}},a200:function(e,t,r){"use strict";var a=r("b8a3"),i=r.n(a);i.a},b680:function(e,t,r){"use strict";var a=r("23e7"),i=r("a691"),n=r("408a"),s=r("1148"),l=r("d039"),c=1..toFixed,o=Math.floor,u=function(e,t,r){return 0===t?r:t%2===1?u(e,t-1,r*e):u(e*e,t/2,r)},p=function(e){var t=0,r=e;while(r>=4096)t+=12,r/=4096;while(r>=2)t+=1,r/=2;return t},d=c&&("0.000"!==8e-5.toFixed(3)||"1"!==.9.toFixed(0)||"1.25"!==1.255.toFixed(2)||"1000000000000000128"!==(0xde0b6b3a7640080).toFixed(0))||!l((function(){c.call({})}));a({target:"Number",proto:!0,forced:d},{toFixed:function(e){var t,r,a,l,c=n(this),d=i(e),v=[0,0,0,0,0,0],f="",h="0",_=function(e,t){var r=-1,a=t;while(++r<6)a+=e*v[r],v[r]=a%1e7,a=o(a/1e7)},b=function(e){var t=6,r=0;while(--t>=0)r+=v[t],v[t]=o(r/e),r=r%e*1e7},m=function(){var e=6,t="";while(--e>=0)if(""!==t||0===e||0!==v[e]){var r=String(v[e]);t=""===t?r:t+s.call("0",7-r.length)+r}return t};if(d<0||d>20)throw RangeError("Incorrect fraction digits");if(c!=c)return"NaN";if(c<=-1e21||c>=1e21)return String(c);if(c<0&&(f="-",c=-c),c>1e-21)if(t=p(c*u(2,69,1))-69,r=t<0?c*u(2,-t,1):c/u(2,t,1),r*=4503599627370496,t=52-t,t>0){_(0,r),a=d;while(a>=7)_(1e7,0),a-=7;_(u(10,a,1),0),a=t-1;while(a>=23)b(1<<23),a-=23;b(1<<a),_(1,1),b(2),h=m()}else _(0,r),_(1<<-t,0),h=m()+s.call("0",d);return d>0?(l=h.length,h=f+(l<=d?"0."+s.call("0",d-l)+h:h.slice(0,l-d)+"."+h.slice(l-d))):h=f+h,h}})},b8a3:function(e,t,r){}}]);
//# sourceMappingURL=chunk-6e5d6d88.45fa8a69.js.map