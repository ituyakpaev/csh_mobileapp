(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-27483f67"],{"0b9b":function(e,t,n){},"0c537":function(e,t,n){"use strict";t["a"]={download:function(){return'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path fill="currentColor" d="M13.1,11.3c-0.3-0.3-0.8-0.3-1.1,0l-1.3,1.3V6c0-0.4-0.3-0.8-0.8-0.8S9.3,5.6,9.3,6v6.6l-1.3-1.3c-0.3-0.3-0.8-0.3-1.1,0s-0.3,0.8,0,1.1l2.6,2.6c0.1,0.1,0.3,0.2,0.5,0.2c0.2,0,0.4-0.1,0.5-0.2l2.6-2.6C13.4,12,13.4,11.5,13.1,11.3z"/></svg>'},faq_question:function(){return'<svg xmlns="http://www.w3.org/2000/svg" width="9" height="14" viewBox="0 0 9 14"><g><g><path fill="none" stroke="#ccc" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="20" stroke-width="2" d="M1.471 13v0l6-6v0l-6-6v0"/></g></g></svg>'}}},"1bf7":function(e,t,n){"use strict";var a=n("d2b7"),s=n.n(a);s.a},"2e9a":function(e,t,n){"use strict";var a=n("0b9b"),s=n.n(a);s.a},5861:function(e,t,n){},"67b6":function(e,t,n){"use strict";n.r(t);var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"inner faq-container"},[n("sidebar",{attrs:{faq:e.faq}}),n("div",{staticClass:"faq-width"},[n("faq",{attrs:{faq:e.faq}})],1)],1)},s=[],i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"faq-sidebar"},[n("input",{directives:[{name:"model",rawName:"v-model",value:e.search_string,expression:"search_string"}],staticClass:"faq-sidebar__input",style:{"background-image":"url("+e.basePath+"svg/search.svg)"},attrs:{placeholder:"Поиск по диалогам..."},domProps:{value:e.search_string},on:{input:function(t){t.target.composing||(e.search_string=t.target.value)}}}),n("div",{staticClass:"faq-sidebar__list"},e._l(e.faq_processed,(function(t,a){return n("div",{key:t.name+a,staticClass:"faq-sidebar__item faq-sidebar__item--active"},[e._v(" "+e._s(t.name)+" "),n("div",{staticClass:"faq-sidebar__question"},e._l(t.questions,(function(t,a){return n("div",{key:t.name+a},[e._v(" "+e._s(t.name)+" ")])})),0)])})),0)])},r=[],c=(n("c975"),n("a15b"),n("d81d"),n("b0c0"),n("ac1f"),n("1276"),{name:"sidebar",props:{faq:{type:Array,required:!0}},data:function(){return{search_string:""}},computed:{faq_processed:function(){if(this.search_string.length>2){var e=this.search_string,t=[];return this.faq.map((function(n){if(-1!==n.name.indexOf(e))n.name=n.name.split(e).join("<span>".concat(e,"</span>")),t.push(n);else{var a=[];n.questions.map((function(t){-1!==t.name.indexOf(e)&&(t.name=t.name.split(e).join("<span>".concat(e,"</span>")),a.push(t))})),n.questions=a,t.push(n)}})),t}return this.faq}}}),o=c,u=(n("6891"),n("2877")),l=Object(u["a"])(o,i,r,!1,null,"49bf4d9c",null),f=l.exports,d=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"faq-body"},e._l(e.faq,(function(e){return n("theme",{key:e.name,attrs:{theme:e}})})),1)},m=[],v=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"faq-theme"},[n("div",{staticClass:"faq-theme__title title"},[e._v(e._s(e.theme.name))]),n("div",e._l(e.theme.questions,(function(t){return n("div",{key:t.name},[n("div",{staticClass:"faq-theme__question",on:{click:function(n){return e.open(t)}}},[n("div",{staticClass:"faq-theme__question-icon",class:{"is-opened":t.name===e.opened},domProps:{innerHTML:e._s(e.icon)}}),e._v(" "+e._s(t.name)+" ")]),n("transition",{attrs:{name:"fade"}},[n("div",{directives:[{name:"show",rawName:"v-show",value:t.name===e.opened,expression:"question.name === opened"}],staticClass:"faq-theme__request"},[n("div",{staticClass:"faq-theme__text"},[e._v(e._s(t.request))]),t.files.documents?n("div",{staticClass:"faq-theme__document"},e._l(t.files.documents,(function(e){return n("doc",{key:e.link,attrs:{href:e.link,title:e.name}})})),1):e._e()])])],1)})),0)])},_=[],p=n("d4ca"),h=n("0c537"),q={name:"theme.vue",components:{doc:p["a"]},props:{theme:{type:Object,required:!0}},data:function(){return{opened:this.theme.questions[0].name}},computed:{icon:function(){return h["a"].faq_question()}},methods:{open:function(e){this.opened===e.name?this.opened="":this.opened=e.name}}},g=q,b=(n("c1c4"),Object(u["a"])(g,v,_,!1,null,null,null)),k=b.exports,w={name:"faq.vue",components:{theme:k},props:{faq:{type:Array,required:!0}},data:function(){return{}}},C=w,x=(n("95d3"),Object(u["a"])(C,d,m,!1,null,"2422e8e8",null)),y=x.exports,j={name:"index",components:{sidebar:f,faq:y},data:function(){return{faq:[{name:"Использование Cake School",questions:[{name:"Надо ли смазывать силиконовую форму для выпечки?",request:"Желатин (от лат. gelatus — замерзший, застывший) — белковое желирующее вещество из коллагена, который содержится в костях, хрящах, коже и жилах животных, которое доказывает, что даже в двадцатом веке ещё можно  придумать что-то интересное, простое и понятное, что захватит весь мир в сладкий плен. Их аромат чувствуешь издалека, а желание съесть парочку возникает практически мгновенно, как только видишь эти круглые пышные булочки.",files:{documents:[{volume:"3.3mv",name:"Имя документа",link:"drive.google.com"}]}},{name:"Почему опадает бисквит после выпечки?",request:"Товарищи! реализация намеченных плановых заданий представляет собой интересный эксперимент проверки соответствующий условий активизации. Не следует, однако забывать, что сложившаяся структура организации позволяет выполнять важные задания по разработке соответствующий условий активизации.",files:{}}]},{name:"Безопасность и вход",questions:[{name:"Как защищены мои персональные данные",request:"Желатин (от лат. gelatus — замерзший, застывший) — белковое желирующее вещество из коллагена, который содержится в костях, хрящах, коже и жилах животных, которое доказывает, что даже в двадцатом веке ещё можно  придумать что-то интересное, простое и понятное, что захватит весь мир в сладкий плен. Их аромат чувствуешь издалека, а желание съесть парочку возникает практически мгновенно, как только видишь эти круглые пышные булочки.",files:{documents:[{volume:"3.3mv",name:"Имя документа",link:"drive.google.com"}]}}]}]}}},O=j,S=(n("1bf7"),Object(u["a"])(O,a,s,!1,null,"6e97ca03",null));t["default"]=S.exports},6891:function(e,t,n){"use strict";var a=n("c8ff"),s=n.n(a);s.a},"7ead":function(e,t,n){},"95d3":function(e,t,n){"use strict";var a=n("7ead"),s=n.n(a);s.a},c1c4:function(e,t,n){"use strict";var a=n("5861"),s=n.n(a);s.a},c8ff:function(e,t,n){},d2b7:function(e,t,n){},d4ca:function(e,t,n){"use strict";var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"file-item"},[n("a",{staticClass:"file-inner",class:{"file-item__dark":e.isDark,"file-item__dark-background":e.backgroundDark},attrs:{href:e.href,target:"_blank"}},[n("div",{staticClass:"file-ext"},[e._v(" "+e._s(e.type)+" ")]),n("div",{staticClass:"file-name"},[e._v(" "+e._s(e.title)+" ")]),n("div",{staticClass:"file-weight"},[e._v(" "+e._s(e.weight)+" ")]),n("div",{staticClass:"file-icon",domProps:{innerHTML:e._s(e.icon)}})])])},s=[],i=n("0c537"),r={name:"document",props:{href:String,type:String,title:String,weight:String,isDark:{type:Boolean,default:!1},backgroundDark:{type:Boolean,default:!1}},computed:{icon:function(){return i["a"].download()}},methods:{}},c=r,o=(n("2e9a"),n("2877")),u=Object(o["a"])(c,a,s,!1,null,"9fb47d46",null);t["a"]=u.exports}}]);
//# sourceMappingURL=chunk-27483f67.ac8d4f6d.js.map