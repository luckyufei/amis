;/*!node_modules/ooxml-viewer/lib/OpenXML.js*/
amis.define("node_modules/ooxml-viewer/lib/OpenXML",(function(e,t,r,n){"use strict";function u(e){return e.getAttribute("w:val")||e.getAttribute("w14:val")||""}function o(e,t){if(void 0===t&&(t=!1),"boolean"==typeof e)return e;if("string"==typeof e){switch(e){case"1":case"on":case"true":return!0;case"0":case"off":case"false":return!1}if("number"==typeof e)return 0!==e}return t}Object.defineProperty(t,"__esModule",{value:!0}),t.getAttrBoolean=function(e,t,r){return void 0===r&&(r=!0),o(e.getAttribute(t),r)},t.getAttrNumber=function(e,t,r){void 0===r&&(r=0);var n=e.getAttribute(t);return n?parseInt(n,10):r},t.getAttrPercentage=function(e,t){var r=e.getAttribute(t);return r?r.endsWith("%")?parseInt(r,10)/100:parseInt(r,10)/1e5:1},t.getVal=u,t.getValBoolean=function(e,t){return void 0===t&&(t=!0),o(u(e),t)},t.getValHex=function(e){return parseInt(u(e)||"0",16)},t.getValNumber=function(e){return parseInt(u(e),10)},t.normalizeBoolean=o}));
;/*!node_modules/ooxml-viewer/lib/openxml/word/Font.js*/
amis.define("node_modules/ooxml-viewer/lib/openxml/word/Font",(function(e,a,t,r){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var n=e("node_modules/tslib/tslib"),o=e("node_modules/ooxml-viewer/lib/OpenXML");var l=function(){function e(){}return e.fromXML=function(a,t){var r,l,s=new e;s.name=t.getAttribute("w:name")||"";try{for(var c=n.__values(t.children),i=c.next();!i.done;i=c.next()){var u=i.value,d=u.tagName;switch(d){case"w:family":s.family=o.getVal(u);break;case"w:altName":s.altName=o.getVal(u);break;case"w:panose1":case"w:charset":case"w:sig":case"w:pitch":break;case"w:embedRegular":case"w:embedBold":case"w:embedItalic":case"w:embedBoldItalic":case"w:embedSystemFonts":case"w:embedTrueTypeFonts":var w=u.getAttribute("r:id")||"",m=u.getAttribute("w:fontKey")||"",b=a.loadFont(w,m);b&&(s.url=b);break;default:console.warn("parse Font: Unknown key",d,u)}}}catch(e){r={error:e}}finally{try{i&&!i.done&&(l=c.return)&&l.call(c)}finally{if(r)throw r.error}}return s},e}();a.Font=l,a.deobfuscate=function(e,a){for(var t=a.replace(/{|}|-/g,""),r=new Array(16),n=0;n<16;n++)r[16-n-1]=parseInt(t.substr(2*n,2),16);for(n=0;n<32;n++)e[n]=e[n]^r[n%16];return e}}));
;/*!node_modules/ooxml-viewer/lib/openxml/word/FontTable.js*/
amis.define("node_modules/ooxml-viewer/lib/openxml/word/FontTable",(function(e,o,n,r){"use strict";Object.defineProperty(o,"__esModule",{value:!0});var t=e("node_modules/tslib/tslib"),l=e("node_modules/ooxml-viewer/lib/openxml/word/Font"),i=function(){function e(){this.fonts=[]}return e.fromXML=function(o,n){var r,i,a=Array.from(n.getElementsByTagName("w:font")),f=new e;try{for(var u=t.__values(a),s=u.next();!s.done;s=u.next()){var d=s.value,m=l.Font.fromXML(o,d);f.fonts.push(m)}}catch(e){r={error:e}}finally{try{s&&!s.done&&(i=u.return)&&i.call(u)}finally{if(r)throw r.error}}return f},e}();o.FontTable=i}));
;/*!node_modules/ooxml-viewer/lib/parse/parseRelationship.js*/
amis.define("node_modules/ooxml-viewer/lib/parse/parseRelationship",(function(e,t,r,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=e("node_modules/tslib/tslib");function n(e,t){return{id:e.getAttribute("Id")||"",type:e.getAttribute("Type")||"",target:e.getAttribute("Target")||"",targetMode:e.getAttribute("TargetMode")||"",part:t}}t.parseRelationship=n,t.parseRelationships=function(e,t){var r,i,o={},l=e.getElementsByTagName("Relationship");try{for(var s=a.__values(l),u=s.next();!u.done;u=s.next()){var d=n(u.value,t);o[d.id]=d}}catch(e){r={error:e}}finally{try{u&&!u.done&&(i=s.return)&&i.call(s)}finally{if(r)throw r.error}}return o}}));
;/*!node_modules/ooxml-viewer/lib/openxml/ContentType.js*/
amis.define("node_modules/ooxml-viewer/lib/openxml/ContentType",(function(e,t,r,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=e("node_modules/tslib/tslib");t.parseContentType=function(e){var t,r,n={overrides:[]},l=[].slice.call(e.getElementsByTagName("Override"));try{for(var a=o.__values(l),i=a.next();!i.done;i=a.next()){var s=i.value;n.overrides.push({partName:s.getAttribute("PartName"),contentType:s.getAttribute("ContentType")})}}catch(e){t={error:e}}finally{try{i&&!i.done&&(r=a.return)&&r.call(a)}finally{if(t)throw t.error}}return n}}));
;/*!node_modules/ooxml-viewer/lib/parse/parseSize.js*/
amis.define("node_modules/ooxml-viewer/lib/parse/parseSize",(function(e,t,n,u){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i={Dxa:{mul:.066665,unit:"px"},Emu:{mul:1.3333/12700,unit:"px"},FontSize:{mul:.66665,unit:"px"},Border:{mul:.1666625,unit:"px"},Point:{mul:1.3333,unit:"px"},Percent:{mul:.02,unit:"%"},LineHeight:{mul:1/240,unit:""},VmlEmu:{mul:1/12700,unit:""}};function r(e,t){return void 0===t&&(t=i.Dxa),null==e||/.+(p[xt]|[%])$/.test(e)?e:"".concat((parseInt(e)*t.mul).toFixed(2)).concat(t.unit)}t.LengthUsage=i,t.convertAngle=function(e){return e?parseInt(e)/6e4:0},t.convertLength=r,t.parseSize=function(e,t,n){void 0===n&&(n=i.Dxa);var u=e.getAttribute(t);return u?r(String(u),n):""}}));
;/*!node_modules/ooxml-viewer/lib/parse/parseCellMargin.js*/
amis.define("node_modules/ooxml-viewer/lib/parse/parseCellMargin",(function(e,a,r,i){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var t=e("node_modules/tslib/tslib"),s=e("node_modules/ooxml-viewer/lib/parse/parseSize");a.parseCellMargin=function(e,a){var r,i;try{for(var l=t.__values(e.children),o=l.next();!o.done;o=l.next()){var n=o.value;switch(n.tagName){case"w:left":case"w:start":a["padding-left"]=s.parseSize(n,"w:w");break;case"w:right":case"w:end":a["padding-right"]=s.parseSize(n,"w:w");break;case"w:top":a["padding-top"]=s.parseSize(n,"w:w");break;case"w:bottom":a["padding-bottom"]=s.parseSize(n,"w:w")}}}catch(e){r={error:e}}finally{try{o&&!o.done&&(i=l.return)&&i.call(l)}finally{if(r)throw r.error}}}}));
;/*!node_modules/ooxml-viewer/lib/parse/parseColor.js*/
amis.define("node_modules/ooxml-viewer/lib/parse/parseColor",(function(e,r,t,c){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var a=e("node_modules/ooxml-viewer/lib/OpenXML"),n=["black","blue","green","red","white","yellow"],u={cyan:"#00FFFF",magenta:"#FF00FF",darkBlue:"#00008B",darkCyan:"#008B8B",darkGray:"#A9A9A9",darkGreen:"#006400",darkMagenta:"#800080",darkRed:"#8B0000",darkYellow:"#808000",lightGray:"#D3D3D3",none:"transparent"};function s(e,r,t,c){void 0===t&&(t="w:color"),void 0===c&&(c="black");var a=r.getAttribute(t);if(a)return"auto"==a?c:n.includes(a)?a:a in u?u[a]:"#".concat(a);var s=r.getAttribute("w:themeColor");return s?e.getThemeColor(s):""}function o(e,r){var t=parseInt(e.substring(0,2),16),c=parseInt(e.substring(2,4),16),a=parseInt(e.substring(4,6),16);return"rgba(".concat(t,", ").concat(c,", ").concat(a,", ").concat(r,")")}r.colorNameMap=u,r.cssColors=n,r.parseColor=function(e,r){return s(e,r,"w:val")},r.parseColorAttr=s,r.parseShdColor=function(e,r){var t=r.getAttribute("w:fill")||"",c=a.getVal(r);if("auto"===t&&(t="000000"),6===t.length)switch(c){case"clear":return"#".concat(t);case"pct10":return o(t,.1);case"pct12":return o(t,.125);case"pct15":return o(t,.15);case"pct20":return o(t,.2);case"pct25":return o(t,.25);case"pct30":return o(t,.3);case"pct35":return o(t,.35);case"pct37":return o(t,.375);case"pct40":return o(t,.4);case"pct45":return o(t,.45);case"pct5":return o(t,.05);case"pct50":return o(t,.5);case"pct55":return o(t,.55);case"pct60":return o(t,.6);case"pct65":return o(t,.65);case"pct70":return o(t,.7);case"pct75":return o(t,.75);case"pct80":return o(t,.8);case"pct85":return o(t,.85);case"pct87":return o(t,.87);case"pct90":return o(t,.9);case"pct95":return o(t,.95);default:return console.warn("unsupport shd val",c),"#".concat(t)}return""}}));
;/*!node_modules/ooxml-viewer/lib/parse/parseBorder.js*/
amis.define("node_modules/ooxml-viewer/lib/parse/parseBorder",(function(e,r,o,a){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var t=e("node_modules/tslib/tslib"),l=e("node_modules/ooxml-viewer/lib/OpenXML"),s=e("node_modules/ooxml-viewer/lib/parse/parseColor"),n=e("node_modules/ooxml-viewer/lib/parse/parseSize");function i(e,r){var o=l.getVal(r);if("nil"===o||"none"===o)return"none";var a=s.parseColorAttr(e,r),t=n.parseSize(r,"w:sz",n.LengthUsage.Border);return"".concat(t," solid ").concat("auto"==a?"black":a)}r.parseBorder=i,r.parseBorders=function(e,r,o){var a,l;try{for(var s=t.__values(r.children),n=s.next();!n.done;n=s.next()){var d=n.value;switch(d.tagName){case"w:start":case"w:left":o["border-left"]=i(e,d);break;case"w:end":case"w:right":o["border-right"]=i(e,d);break;case"w:top":o["border-top"]=i(e,d);break;case"w:bottom":o["border-bottom"]=i(e,d)}}}catch(e){a={error:e}}finally{try{n&&!n.done&&(l=s.return)&&l.call(s)}finally{if(a)throw a.error}}}}));
;/*!node_modules/ooxml-viewer/lib/parse/parseTextDirection.js*/
amis.define("node_modules/ooxml-viewer/lib/parse/parseTextDirection",(function(e,r,t,c){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.parseTextDirection=function(e,r){switch(e.getAttribute("w:val")){case"lr":case"lrV":case"btLr":case"lrTb":case"lrTbV":case"tbLrV":r.direction="ltr";break;case"rl":case"rlV":case"tbRl":case"tbRlV":r.direction="rtl"}}}));
;/*!node_modules/ooxml-viewer/lib/parse/parseTblWidth.js*/
amis.define("node_modules/ooxml-viewer/lib/parse/parseTblWidth",(function(e,r,t,i){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var a=e("node_modules/ooxml-viewer/lib/parse/parseSize");r.parseTblWidth=function(e){var r=e.getAttribute("w:type");return r&&"dxa"!==r?"pct"===r?a.parseSize(e,"w:w",a.LengthUsage.Percent):"auto"===r?"auto":(console.warn("parseTblWidth: ignore type",r,e),""):a.parseSize(e,"w:w")}}));
;/*!node_modules/ooxml-viewer/lib/parse/parseInsideBorders.js*/
amis.define("node_modules/ooxml-viewer/lib/parse/parseInsideBorders",(function(e,r,s,i){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var o=e("node_modules/ooxml-viewer/lib/parse/parseBorder");r.parseInsideBorders=function(e,r){var s,i,a=r.getElementsByTagName("w:insideH").item(0);a&&(s=o.parseBorder(e,a));var d=r.getElementsByTagName("w:insideV").item(0);return d&&(i=o.parseBorder(e,d)),{H:s,V:i}}}));
;/*!node_modules/ooxml-viewer/lib/parse/parseTcPr.js*/
amis.define("node_modules/ooxml-viewer/lib/parse/parseTcPr",(function(e,r,a,o){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var l=e("node_modules/tslib/tslib"),s=e("node_modules/ooxml-viewer/lib/parse/parseCellMargin"),i=e("node_modules/ooxml-viewer/lib/parse/parseColor"),n=e("node_modules/ooxml-viewer/lib/OpenXML"),t=e("node_modules/ooxml-viewer/lib/parse/parseBorder"),c=e("node_modules/ooxml-viewer/lib/parse/parseTextDirection"),d=e("node_modules/ooxml-viewer/lib/parse/parseTblWidth"),p=e("node_modules/ooxml-viewer/lib/parse/parseInsideBorders");function b(e,r){switch(n.getVal(e)){case"bottom":r["vertical-align"]="bottom";break;case"center":r["vertical-align"]="middle";break;case"top":r["vertical-align"]="top"}}function w(e,r){var a=d.parseTblWidth(e);a&&(r.width=a)}r.parseTblCellSpacing=function(e,r){var a=d.parseTblWidth(e);a&&(r["cell-spacing"]=a)},r.parseTcPr=function(e,r){var a,o,d={},u={};d.cssStyle=u;try{for(var m=l.__values(r.children),v=m.next();!v.done;v=m.next()){var g=v.value,k=g.tagName;switch(k){case"w:tcMar":s.parseCellMargin(g,u);break;case"w:shd":u["background-color"]=i.parseShdColor(e,g);break;case"w:tcW":w(g,u);break;case"w:noWrap":n.getValBoolean(g)&&(u["white-space"]="nowrap");break;case"w:vAlign":b(g,u);break;case"w:tcBorders":t.parseBorders(e,g,u),d.insideBorder=p.parseInsideBorders(e,g);break;case"w:gridSpan":d.gridSpan=n.getValNumber(g);break;case"w:vMerge":d.vMerge=n.getVal(g)||"continue";break;case"w:textDirection":c.parseTextDirection(g,u);break;case"w:cnfStyle":break;case"w:hideMark":d.hideMark=n.getValBoolean(g,!0);break;default:console.warn("parseTcPr: ignore",k,g)}}}catch(e){a={error:e}}finally{try{v&&!v.done&&(o=m.return)&&o.call(m)}finally{if(a)throw a.error}}return d}}));
;/*!node_modules/ooxml-viewer/lib/util/color.js*/
amis.define("node_modules/ooxml-viewer/lib/util/color",(function(t,r,i,n){"use strict";function s(t,r,i){t/=255,r/=255,i/=255;var n,s=Math.max(t,r,i),e=Math.min(t,r,i),a=0,o=(s+e)/2;if(s==e)a=n=0;else{var h=s-e;switch(n=o>.5?h/(2-s-e):h/(s+e),s){case t:a=(r-i)/h+(r<i?6:0);break;case r:a=(i-t)/h+2;break;case i:a=(t-r)/h+4}a/=6}return{h:a,s:n,l:o}}function e(t,r,i){return i<0&&(i+=1),i>1&&(i-=1),i<1/6?t+6*(r-t)*i:i<.5?r:i<2/3?t+(r-t)*(2/3-i)*6:t}function a(t,r,i){var n,s,a;if(0==r)n=s=a=i;else{var o=i<.5?i*(1+r):i+r-i*r,h=2*i-o;n=e(h,o,t+1/3),s=e(h,o,t),a=e(h,o,t-1/3)}return{r:255*n,g:255*s,b:255*a}}function o(t){return 1==t.length?"0"+t:""+t}Object.defineProperty(r,"__esModule",{value:!0});var h=function(){function t(t){var r=t.match(/^#?([0-9a-f]{6})$/i);r&&(this.r=parseInt(r[1].substring(0,2),16),this.g=parseInt(r[1].substring(2,4),16),this.b=parseInt(r[1].substring(4,6),16),this.isValid=!0)}return t.prototype.lumMod=function(t){var r=s(this.r,this.g,this.b);r.l=r.l*t,r.l=Math.min(1,Math.max(0,r.l));var i=a(r.h,r.s,r.l);this.r=i.r,this.g=i.g,this.b=i.b},t.prototype.lumOff=function(t){var r=s(this.r,this.g,this.b);r.l+=r.l*t,r.l=Math.min(1,Math.max(0,r.l));var i=a(r.h,r.s,r.l);this.r=i.r,this.g=i.g,this.b=i.b},t.prototype.toHex=function(){return"#"+(t=this.r,r=this.g,i=this.b,[o(Math.round(t).toString(16)),o(Math.round(r).toString(16)),o(Math.round(i).toString(16))].join("").toUpperCase());var t,r,i},t}();r.Color=h}));
;/*!node_modules/ooxml-viewer/lib/parse/parseChildColor.js*/
amis.define("node_modules/ooxml-viewer/lib/parse/parseChildColor",(function(e,r,a,t){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var l=e("node_modules/tslib/tslib"),o=e("node_modules/ooxml-viewer/lib/OpenXML"),n=e("node_modules/ooxml-viewer/lib/util/color");function i(e,r){var a,t,i=new n.Color(r);if(i.isValid){try{for(var c=l.__values(e.children),u=c.next();!u.done;u=c.next()){var s=u.value;switch(s.tagName){case"a:lumMod":i.lumMod(o.getAttrPercentage(s,"val"));break;case"a:lumOff":i.lumOff(o.getAttrPercentage(s,"val"))}}}catch(e){a={error:e}}finally{try{u&&!u.done&&(t=c.return)&&t.call(c)}finally{if(a)throw a.error}}return i.toHex()}return r}function c(e,r){var a,t,i=new n.Color(r);if(i.isValid){try{for(var c=l.__values(e.children),u=c.next();!u.done;u=c.next()){var s=u.value;if("w14:alpha"===s.tagName){var f=o.getVal(s);if(f)return"rgba(".concat(i.r,", ").concat(i.g,", ").concat(i.b,", ").concat(parseInt(f,10)/1e5,")")}}}catch(e){a={error:e}}finally{try{u&&!u.done&&(t=c.return)&&t.call(c)}finally{if(a)throw a.error}}return i.toHex()}return r}r.parseChildColor=function(e,r){var a=r.firstElementChild;if(a){var t=a.tagName;switch(t){case"a:prstClr":return i(a,o.getVal(a)||"");case"a:srgbClr":case"w14:srgbClr":var l=i(a,"#"+o.getVal(a));return l=c(a,l);case"a:schemeClr":var n=a.getAttribute("val")||"";if(n)return i(a,e.getThemeColor(n));default:console.warn("parseOutline: Unknown color type ",t,a)}}return""}}));
;/*!node_modules/ooxml-viewer/lib/parse/parseInd.js*/
amis.define("node_modules/ooxml-viewer/lib/parse/parseInd",(function(e,i,r,n){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var a=e("node_modules/ooxml-viewer/lib/parse/parseSize");i.parseInd=function(e,i){var r=a.parseSize(e,"w:firstLine"),n=a.parseSize(e,"w:hanging"),t=a.parseSize(e,"w:left"),s=a.parseSize(e,"w:start"),o=a.parseSize(e,"w:right"),d=a.parseSize(e,"w:end");r&&(i["text-indent"]=r),n&&(i["text-indent"]="-".concat(n)),(t||s)&&(i["margin-left"]=t||s),(o||d)&&(i["margin-right"]=o||d)}}));
;/*!node_modules/ooxml-viewer/lib/parse/parseSpacing.js*/
amis.define("node_modules/ooxml-viewer/lib/parse/parseSpacing",(function(e,i,t,r){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var a=e("node_modules/ooxml-viewer/lib/parse/parseSize");i.parseSpacing=function(e,i,t){var r=a.parseSize(i,"w:before"),n=a.parseSize(i,"w:after"),o=i.getAttribute("w:lineRule");r&&(t["margin-top"]=r),n&&(t["margin-bottom"]=n);var s=i.getAttribute("w:line");if(s){if(e.renderOptions.forceLineHeight)return void(t["line-height"]=e.renderOptions.forceLineHeight);var p=parseInt(s,10),c=e.renderOptions.minLineHeight||1;switch(o){case"auto":var l=Math.max(c,p/240);t["line-height"]="".concat(l.toFixed(2));break;case"atLeast":break;default:var h=Math.max(c,p/20);t["line-height"]=t["min-height"]="".concat(h,"pt")}}}}));
;/*!node_modules/ooxml-viewer/lib/parse/parseFont.js*/
amis.define("node_modules/ooxml-viewer/lib/parse/parseFont",(function(e,a,s,r){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var t=e("node_modules/tslib/tslib");a.parseFont=function(e,a,s){var r,n,i=[],o=e.renderOptions.fontMapping;try{for(var c=t.__values(a.attributes),l=c.next();!l.done;l=c.next()){var u=l.value,f=u.name,d=u.value;switch(f){case"w:ascii":case"w:cs":case"w:eastAsia":o&&d in o&&(d=o[d]),-1===d.indexOf(" ")?i.push(d):i.push('"'+d+'"');break;case"w:asciiTheme":case"w:csTheme":case"w:eastAsiaTheme":i.push("var(--docx-theme-font-".concat(d,")"))}}}catch(e){r={error:e}}finally{try{l&&!l.done&&(n=c.return)&&n.call(c)}finally{if(r)throw r.error}}i.length&&(s["font-family"]=Array.from(new Set(i)).join(", "))}}));
;/*!node_modules/ooxml-viewer/lib/parse/parseTrHeight.js*/
amis.define("node_modules/ooxml-viewer/lib/parse/parseTrHeight",(function(e,i,t,r){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var a=e("node_modules/ooxml-viewer/lib/parse/parseSize");i.parseTrHeight=function(e,i){var t=a.parseSize(e,"w:val"),r=e.getAttribute("w:hRule");"exact"===r?i.height=t:"atLeast"===r&&(i.height=t,i["min-height"]=t)}}));
;/*!node_modules/ooxml-viewer/lib/parse/jcToTextAlign.js*/
amis.define("node_modules/ooxml-viewer/lib/parse/jcToTextAlign",(function(e,t,r,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.jcToTextAlign=function(e){switch(e){case"start":case"left":return"left";case"center":return"center";case"end":case"right":return"right";case"both":return"justify"}return e}}));
;/*!node_modules/ooxml-viewer/lib/parse/parsePr.js*/
amis.define("node_modules/ooxml-viewer/lib/parse/parsePr",(function(e,a,r,o){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var s=e("node_modules/tslib/tslib"),t=e("node_modules/ooxml-viewer/lib/parse/parseSize"),l=e("node_modules/ooxml-viewer/lib/OpenXML"),c=e("node_modules/ooxml-viewer/lib/parse/parseBorder"),n=e("node_modules/ooxml-viewer/lib/parse/parseColor"),i=e("node_modules/ooxml-viewer/lib/parse/parseChildColor"),w=e("node_modules/ooxml-viewer/lib/parse/parseInd"),d=e("node_modules/ooxml-viewer/lib/parse/parseSpacing"),p=e("node_modules/ooxml-viewer/lib/parse/parseFont"),b=e("node_modules/ooxml-viewer/lib/parse/parseTrHeight"),u=e("node_modules/ooxml-viewer/lib/parse/jcToTextAlign"),k=e("node_modules/ooxml-viewer/lib/parse/parseTextDirection");function g(e,a,r){var o=l.getVal(a);if(null!=o){switch(o){case"dash":case"dashDotDotHeavy":case"dashDotHeavy":case"dashedHeavy":case"dashLong":case"dashLongHeavy":case"dotDash":case"dotDotDash":r["text-decoration-style"]="dashed";break;case"dotted":case"dottedHeavy":r["text-decoration-style"]="dotted";break;case"double":r["text-decoration-style"]="double";break;case"single":case"thick":case"words":r["text-decoration"]="underline";break;case"wave":case"wavyDouble":case"wavyHeavy":r["text-decoration-style"]="wavy";break;case"none":r["text-decoration"]="none"}var s=n.parseColorAttr(e,a);s&&(r["text-decoration-color"]=s)}}function x(e,a){var r,o;try{for(var l=s.__values(e.attributes),c=l.next();!c.done;c=l.next()){var n=c.value,i=n.name,w=n.value;switch(i){case"w:dropCap":"drop"===w&&(a.float="left");break;case"w:h":"object"!=typeof w||Array.isArray(w)||(a.height=t.parseSize(w,"w:h"));break;case"w:w":"object"!=typeof w||Array.isArray(w)||(a.width=t.parseSize(w,"w:w"));break;case"w:hAnchor":case"w:vAnchor":case"w:lines":break;case"w:wrap":"around"!==w&&console.warn("parseFrame: w:wrap not support "+w);break;default:console.warn("parseFrame: unknown attribute "+i,n)}}}catch(e){r={error:e}}finally{try{c&&!c.done&&(o=l.return)&&o.call(l)}finally{if(r)throw r.error}}}function h(e,a){switch(e){case"dot":case"underDot":a["text-emphasis"]="filled",a["text-emphasis-position"]="under right";break;case"comma":a["text-emphasis"]="filled sesame";break;case"circle":a["text-emphasis"]="open"}}a.parsePr=function(e,a,r){var o,m,v={};try{for(var y=s.__values(a.children),f=y.next();!f.done;f=y.next()){var A=f.value,S=A.tagName;switch(S){case"w:sz":case"w:szCs":v["font-size"]=t.parseSize(A,"w:val",t.LengthUsage.FontSize);break;case"w:jc":v["text-align"]=u.jcToTextAlign(l.getVal(A));break;case"w:framePr":x(A,v);break;case"w:pBdr":c.parseBorders(e,A,v);break;case"w:ind":w.parseInd(A,v);break;case"w:color":v.color=n.parseColor(e,A);break;case"w:shd":"background-color"in v||(v["background-color"]=n.parseShdColor(e,A));break;case"w:spacing":d.parseSpacing(e,A,v);break;case"w:highlight":v["background-color"]=n.parseColorAttr(e,A,"w:val","yellow");break;case"w:vertAlign":var _=l.getVal(A);"superscript"===_?v["vertical-align"]="super":"subscript"===_&&(v["vertical-align"]="sub");break;case"w:position":v["vertical-align"]=t.parseSize(A,"w:val",t.LengthUsage.FontSize);break;case"w:trHeight":b.parseTrHeight(A,v);break;case"w:strike":case"w:dstrike":v["text-decoration"]=l.getValBoolean(A)?"line-through":"none";break;case"w:b":v["font-weight"]=l.getValBoolean(A)?"bold":"normal";break;case"w:adjustRightInd":case"w:bCs":case"w:iCs":case"w:kern":case"w:pStyle":case"w:lang":case"w:noProof":case"w:keepLines":case"w:keepNext":case"w:widowControl":case"w:pageBreakBefore":case"w:outlineLvl":case"w:contextualSpacing":case"w:numPr":case"w:rPr":case"w:rStyle":case"w:tabs":case"w:snapToGrid":case"w:cnfStyle":case"w:autoSpaceDE":case"w:autoSpaceDN":case"w:kinsoku":case"w:overflowPunct":break;case"w:i":v["font-style"]=l.getValBoolean(A)?"italic":"normal";break;case"w:caps":v["text-transform"]=l.getValBoolean(A)?"uppercase":"normal";break;case"w:smallCaps":v["text-transform"]=l.getValBoolean(A)?"lowercase":"normal";break;case"w:u":g(e,A,v);break;case"w:rFonts":p.parseFont(e,A,v);break;case"w:tblCellSpacing":v["border-spacing"]=t.parseSize(A,"w:w"),v["border-collapse"]="separate";break;case"w:bdr":v.border=c.parseBorder(e,A);break;case"w:vanish":l.getValBoolean(A)&&(v.display="none");break;case"w:webHidden":v.display="none";break;case"w:wordWrap":l.getValBoolean(A)&&(v["word-break"]="break-all");break;case"w:textAlignment":var C=l.getVal(A);"center"===C?v["vertical-align"]="middle":"auto"!==C&&(v["vertical-align"]=C);break;case"w:textDirection":k.parseTextDirection(A,v);break;case"w:bidi":l.getValBoolean(A,!0)&&console.warn("w:bidi is not supported.");break;case"w:em":h(l.getVal(A),v);break;case"w:w":var B=l.getValNumber(A);v.transform="scaleX(".concat(B/100,")"),v.display="inline-block";break;case"w:outline":v["text-shadow"]="-1px -1px 0 #AAA, 1px -1px 0 #AAA, -1px 1px 0 #AAA, 1px 1px 0 #AAA";break;case"w:shadown":case"w:imprint":l.getValBoolean(A,!0)&&(v["text-shadow"]="1px 1px 2px rgba(0, 0, 0, 0.6)");break;case"w14:shadow":var V=t.parseSize(A,"w14:blurRad",t.LengthUsage.Emu)||"2px",D="rgba(0, 0, 0, 0.6)",z=i.parseChildColor(e,A);z&&(D=z),v["text-shadow"]="1px 1px ".concat(V," ").concat(D);break;default:console.warn("parsePr Unknown tagName",S,A)}}}catch(e){o={error:e}}finally{try{f&&!f.done&&(m=y.return)&&m.call(y)}finally{if(o)throw o.error}}return v}}));
;/*!node_modules/ooxml-viewer/lib/openxml/word/Bookmark.js*/
amis.define("node_modules/ooxml-viewer/lib/openxml/word/Bookmark",(function(e,n,o,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var r=function(){function e(e){this.name=e}return e.fromXML=function(n,o){var t=o.getAttribute("w:name");return t?new e(t):(console.warn("Bookmark without name"),new e("unknown"))},e}();n.BookmarkStart=r}));
;/*!node_modules/ooxml-viewer/lib/openxml/word/Break.js*/
amis.define("node_modules/ooxml-viewer/lib/openxml/word/Break",(function(e,n,r,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var o=function(){function e(){this.type="textWrapping"}return e.fromXML=function(n,r){return new e},e}();n.Break=o}));
;/*!node_modules/ooxml-viewer/lib/openxml/word/drawing/Blip.js*/
amis.define("node_modules/ooxml-viewer/lib/openxml/word/drawing/Blip",(function(e,n,r,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var o=function(){function e(){}return e.fromXML=function(n,r){var t=new e,o=r.getAttribute("r:embed")||"",i=n.getDocumentRels(o);return i&&(t.embled=i,t.src=n.loadImage(t.embled)),t},e}();n.Blip=o}));
;/*!node_modules/ooxml-viewer/lib/openxml/word/drawing/BlipFill.js*/
amis.define("node_modules/ooxml-viewer/lib/openxml/word/drawing/BlipFill",(function(e,i,l,n){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var o=e("node_modules/ooxml-viewer/lib/openxml/word/drawing/Blip"),r=function(){function e(){}return e.fromXML=function(i,l){var n=new e,r=null==l?void 0:l.getElementsByTagName("a:blip").item(0);return r&&(n.blip=o.Blip.fromXML(i,r)),n},e}();i.BlipFill=r}));
;/*!node_modules/ooxml-viewer/lib/openxml/word/drawing/Transform.js*/
amis.define("node_modules/ooxml-viewer/lib/openxml/word/drawing/Transform",(function(e,r,t,n){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var a=e("node_modules/ooxml-viewer/lib/parse/parseSize"),o=function(){function e(){}return e.fromXML=function(r,t){var n=new e,o=t.getElementsByTagName("a:off").item(0);o&&(n.off={x:a.parseSize(o,"x",a.LengthUsage.Emu),y:a.parseSize(o,"y",a.LengthUsage.Emu)});var i=t.getElementsByTagName("a:ext").item(0);i&&(n.ext={cx:a.parseSize(i,"cx",a.LengthUsage.Emu),cy:a.parseSize(i,"cy",a.LengthUsage.Emu)});var s=t.getAttribute("rot");return s&&(n.rot=a.convertAngle(s)),n},e}();r.Transform=o}));
;/*!node_modules/ooxml-viewer/lib/openxml/word/drawing/Geom.js*/
amis.define("node_modules/ooxml-viewer/lib/openxml/word/drawing/Geom",(function(e,n,t,o){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var r=function(){function e(){}return e.fromXML=function(n,t,o){var r=new e;return r.type=t.getAttribute("prst"),r},e}();n.Geom=r}));
;/*!node_modules/ooxml-viewer/lib/openxml/word/drawing/ShapeProperties.js*/
amis.define("node_modules/ooxml-viewer/lib/openxml/word/drawing/ShapeProperties",(function(e,r,a,o){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var s=e("node_modules/tslib/tslib"),l=e("node_modules/ooxml-viewer/lib/openxml/word/drawing/Transform"),n=e("node_modules/ooxml-viewer/lib/parse/parseSize"),t=e("node_modules/ooxml-viewer/lib/openxml/word/drawing/Geom"),i=e("node_modules/ooxml-viewer/lib/parse/parseChildColor");function d(e){var r="solid";switch(e){case"dash":case"dashDot":case"lgDash":case"lgDashDot":case"lgDashDotDot":case"sysDash":case"sysDashDot":case"sysDashDotDot":r="dashed";break;case"dot":case"sysDot":r="dotted"}return r}function c(e,r,a){var o,l,t=n.parseSize(r,"w",n.LengthUsage.Emu);a["border-width"]=t,a["border-style"]="solid";try{for(var c=s.__values(r.children),u=c.next();!u.done;u=c.next()){var m=u.value,h=m.tagName;switch(h){case"a:solidFill":a["border-color"]=i.parseChildColor(e,m);break;case"a:noFill":a.border="none";break;case"a:round":a["border-radius"]="8%";break;case"a:prstDash":a["border-style"]=d(m.getAttribute("val"));break;default:console.warn("parseOutline: Unknown tag ",h,m)}}}catch(e){o={error:e}}finally{try{u&&!u.done&&(l=c.return)&&l.call(c)}finally{if(o)throw o.error}}}var u=function(){function e(){}return e.fromXML=function(r,a){var o,n,d=new e,u={};if(d.style=u,a)try{for(var m=s.__values(a.children),h=m.next();!h.done;h=m.next()){var b=h.value,f=b.tagName;switch(f){case"a:xfrm":d.xfrm=l.Transform.fromXML(r,b);break;case"a:prstGeom":d.prstGeom=t.Geom.fromXML(r,b,u);break;case"a:ln":c(r,b,u);break;case"a:noFill":break;case"a:solidFill":u["background-color"]=i.parseChildColor(r,b);break;default:console.warn("ShapePr: Unknown tag ",f,b)}}}catch(e){o={error:e}}finally{try{h&&!h.done&&(n=m.return)&&n.call(m)}finally{if(o)throw o.error}}return d},e}();r.ShapePr=u}));
;/*!node_modules/ooxml-viewer/lib/openxml/word/drawing/Pic.js*/
amis.define("node_modules/ooxml-viewer/lib/openxml/word/drawing/Pic",(function(e,i,l,o){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var n=e("node_modules/ooxml-viewer/lib/openxml/word/drawing/BlipFill"),r=e("node_modules/ooxml-viewer/lib/openxml/word/drawing/ShapeProperties"),m=function(){function e(){}return e.fromXML=function(i,l){var o=new e;return o.blipFill=n.BlipFill.fromXML(i,null==l?void 0:l.getElementsByTagName("pic:blipFill").item(0)),o.spPr=r.ShapePr.fromXML(i,null==l?void 0:l.getElementsByTagName("pic:spPr").item(0)),o},e}();i.Pic=m}));
;/*!node_modules/ooxml-viewer/lib/openxml/word/Table.js*/
amis.define("node_modules/ooxml-viewer/lib/openxml/word/Table",(function(e,i,t,o){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var r=function(){this.properties={},this.tblGrid=[],this.trs=[]};i.Table=r}));
;/*!node_modules/ooxml-viewer/lib/openxml/word/table/Tr.js*/
amis.define("node_modules/ooxml-viewer/lib/openxml/word/table/Tr",(function(e,i,o,t){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var r=function(){this.properties={},this.tcs=[]};i.Tr=r}));
;/*!node_modules/ooxml-viewer/lib/openxml/word/table/Tc.js*/
amis.define("node_modules/ooxml-viewer/lib/openxml/word/table/Tc",(function(e,i,t,n){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var o=function(){function e(){this.properties={},this.children=[]}return e.prototype.add=function(e){e&&this.children.push(e)},e}();i.Tc=o}));
;/*!node_modules/ooxml-viewer/lib/parse/parseTc.js*/
amis.define("node_modules/ooxml-viewer/lib/parse/parseTc",(function(e,r,o,a){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var i=e("node_modules/tslib/tslib"),n=e("node_modules/ooxml-viewer/lib/openxml/word/table/Tc"),l=e("node_modules/ooxml-viewer/lib/parse/parseTcPr"),p=e("node_modules/ooxml-viewer/lib/openxml/word/Paragraph"),s=e("node_modules/ooxml-viewer/lib/parse/parseTable");r.parseTc=function(e,r,o,a){var t,d,c=new n.Tc;try{for(var u=i.__values(r.children),w=u.next();!w.done;w=u.next()){var m=w.value;switch(m.tagName){case"w:tcPr":c.properties=l.parseTcPr(e,m);break;case"w:p":c.add(p.Paragraph.fromXML(e,m));break;case"w:tbl":c.add(s.parseTable(e,m))}}}catch(e){t={error:e}}finally{try{w&&!w.done&&(d=u.return)&&d.call(u)}finally{if(t)throw t.error}}var v=a[o.index];if(c.properties.vMerge){if("restart"===c.properties.vMerge)c.properties.rowSpan=1,a[o.index]=c;else if(v){if(v.properties&&v.properties.rowSpan){v.properties.rowSpan=v.properties.rowSpan+1;var b=c.properties.gridSpan||1;return o.index+=b,null}console.warn("Tc.fromXML: continue but not found lastCol",o.index,c,a)}}else delete a[o.index];var f=c.properties.gridSpan||1;return o.index+=f,c}}));
;/*!node_modules/ooxml-viewer/lib/parse/parseTablePr.js*/
amis.define("node_modules/ooxml-viewer/lib/parse/parseTablePr",(function(e,r,a,o){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var l=e("node_modules/tslib/tslib"),t=e("node_modules/ooxml-viewer/lib/OpenXML"),s=e("node_modules/ooxml-viewer/lib/parse/parseBorder"),n=e("node_modules/ooxml-viewer/lib/parse/parseInsideBorders"),i=e("node_modules/ooxml-viewer/lib/parse/parseTblWidth"),d=e("node_modules/ooxml-viewer/lib/parse/parseColor"),b=e("node_modules/ooxml-viewer/lib/parse/parseSize"),c=e("node_modules/ooxml-viewer/lib/parse/parseTcPr"),p=e("node_modules/ooxml-viewer/lib/parse/parseCellMargin");function w(e,r){switch(t.getVal(e)){case"left":case"start":break;case"right":case"end":r.float="right"}}function u(e,r){var a=i.parseTblWidth(e);a&&(r["margin-left"]=a)}function m(e,r){var a=i.parseTblWidth(e);a&&(r.width=a)}function f(e){var r={},a=t.getValHex(e);return(t.getAttrBoolean(e,"firstRow",!1)||32&a)&&(r.firstRow=!0),(t.getAttrBoolean(e,"lastRow",!1)||64&a)&&(r.lastRow=!0),(t.getAttrBoolean(e,"firstColumn",!1)||128&a)&&(r.firstColumn=!0),(t.getAttrBoolean(e,"lastColumn",!1)||256&a)&&(r.lastColumn=!0),t.getAttrBoolean(e,"noHBand",!1)||512&a?r.noHBand=!0:r.noHBand=!1,t.getAttrBoolean(e,"noVBand",!1)||1024&a?r.noVBand=!0:r.noVBand=!1,r}function g(e,r,a){if(void 0===e.renderOptions.padding){var o=b.parseSize(r,"w:tblpX"),l=b.parseSize(r,"w:tblpY");a.top=l,a.left=o}}function B(e,r){"fixed"===e.getAttribute("w:type")&&(r["table-layout"]="fixed")}r.parseTablePr=function(e,r){var a,o,i={},b={},k={};i.tblLook={},i.cssStyle=b,i.tcCSSStyle=k;try{for(var v=l.__values(r.children),S=v.next();!S.done;S=v.next()){var C=S.value,x=C.tagName;switch(x){case"w:tblBorders":s.parseBorders(e,C,b),i.insideBorder=n.parseInsideBorders(e,C);break;case"w:tcBorders":s.parseBorders(e,C,b);break;case"w:tblInd":u(C,b);break;case"w:jc":w(C,b);break;case"w:tblCellMar":case"w:tcMar":p.parseCellMargin(C,k);break;case"w:tblStyle":i.pStyle=t.getVal(C);break;case"w:tblW":m(C,b);break;case"w:shd":b["background-color"]=d.parseShdColor(e,C);break;case"w:tblCaption":i.tblCaption=t.getVal(C);break;case"w:tblCellSpacing":c.parseTblCellSpacing(C,b);break;case"w:tblLayout":B(C,b);break;case"w:tblLook":i.tblLook=f(C);break;case"w:tblStyleRowBandSize":i.rowBandSize=t.getValNumber(C);break;case"w:tblStyleColBandSize":i.colBandSize=t.getValNumber(C);break;case"w:tblpPr":g(e,C,b);break;default:console.warn("parseTableProperties unknown tag",x,C)}}}catch(e){a={error:e}}finally{try{S&&!S.done&&(o=v.return)&&o.call(v)}finally{if(a)throw a.error}}return i}}));
;/*!node_modules/ooxml-viewer/lib/parse/parseTrPr.js*/
amis.define("node_modules/ooxml-viewer/lib/parse/parseTrPr",(function(e,r,a,l){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var o=e("node_modules/tslib/tslib"),s=e("node_modules/ooxml-viewer/lib/OpenXML"),n=e("node_modules/ooxml-viewer/lib/parse/jcToTextAlign"),t=e("node_modules/ooxml-viewer/lib/parse/parseTablePr"),i=e("node_modules/ooxml-viewer/lib/parse/parseTcPr"),c=e("node_modules/ooxml-viewer/lib/parse/parseTrHeight");r.parseTrPr=function(e,r){var a,l,d={},b={};try{for(var p=o.__values(r.children),u=p.next();!u.done;u=p.next()){var w=u.value,m=w.tagName;switch(m){case"w:hidden":s.getValBoolean(w)&&(d.display="none");break;case"w:trHeight":c.parseTrHeight(w,d);break;case"w:jc":d["text-align"]=n.jcToTextAlign(s.getVal(w));break;case"w:cantSplit":case"w:cnfStyle":break;case"w:tblPrEx":var v=t.parseTablePr(e,w);Object.assign(d,v.cssStyle);break;case"w:tblCellSpacing":i.parseTblCellSpacing(w,b);break;default:console.warn("Tr: Unknown tag ",m,w)}}}catch(e){a={error:e}}finally{try{u&&!u.done&&(l=p.return)&&l.call(p)}finally{if(a)throw a.error}}return{cssStyle:d}}}));
;/*!node_modules/ooxml-viewer/lib/parse/mergeSdt.js*/
amis.define("node_modules/ooxml-viewer/lib/parse/mergeSdt",(function(e,r,t,a){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var l=e("node_modules/tslib/tslib");function n(e){var r,t,a=e.slice(),i=0,s=!1;try{for(var c=l.__values(e),d=c.next();!d.done;d=c.next()){var o=d.value;switch(o.tagName){case"w:smartTag":case"w:customXml":var m=[].slice.call(o.children);a.splice.apply(a,l.__spreadArray([i,1],l.__read(m),!1)),i+=m.length;continue;case"w:sdt":var u=o.getElementsByTagName("w:sdtContent").item(0);if(o.getElementsByTagName("w:sdt").item(0)&&(s=!0),u){var _=[].slice.call(u.children);a.splice.apply(a,l.__spreadArray([i,1],l.__read(_),!1)),i+=_.length;continue}}i+=1}}catch(e){r={error:e}}finally{try{d&&!d.done&&(t=c.return)&&t.call(c)}finally{if(r)throw r.error}}return s?n(a):a}r.mergeSdt=function(e){return n([].slice.call(e.children))}}));
;/*!node_modules/ooxml-viewer/lib/parse/parseTr.js*/
amis.define("node_modules/ooxml-viewer/lib/parse/parseTr",(function(e,r,o,a){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var s=e("node_modules/tslib/tslib"),l=e("node_modules/ooxml-viewer/lib/openxml/word/table/Tr"),t=e("node_modules/ooxml-viewer/lib/parse/parseTc"),n=e("node_modules/ooxml-viewer/lib/parse/parseTablePr"),i=e("node_modules/ooxml-viewer/lib/parse/parseTrPr"),d=e("node_modules/ooxml-viewer/lib/parse/mergeSdt");r.parseTr=function(e,r,o){var a,p,c=new l.Tr,m={index:0};try{for(var u=s.__values(d.mergeSdt(r)),b=u.next();!b.done;b=u.next()){var v=b.value,w=v.tagName;switch(w){case"w:tc":var x=t.parseTc(e,v,m,o);x&&c.tcs.push(x);break;case"w:trPr":c.properties=i.parseTrPr(e,v);break;case"w:tblPrEx":var T=n.parseTablePr(e,v);Object.assign(c.properties.cssStyle||{},T.cssStyle);break;default:console.warn("Tr: Unknown tag ",w,v)}}}catch(e){a={error:e}}finally{try{b&&!b.done&&(p=u.return)&&p.call(u)}finally{if(a)throw a.error}}return c}}));
;/*!node_modules/ooxml-viewer/lib/parse/parseTable.js*/
amis.define("node_modules/ooxml-viewer/lib/parse/parseTable",(function(e,r,a,l){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var o=e("node_modules/tslib/tslib"),n=e("node_modules/ooxml-viewer/lib/openxml/word/Table"),t=e("node_modules/ooxml-viewer/lib/parse/parseTr"),s=e("node_modules/ooxml-viewer/lib/parse/parseTablePr"),i=e("node_modules/ooxml-viewer/lib/parse/parseSize"),d=e("node_modules/ooxml-viewer/lib/parse/mergeSdt");function u(e){var r,a,l=[],n=e.getElementsByTagName("w:gridCol");try{for(var t=o.__values(n),s=t.next();!s.done;s=t.next()){var d=s.value,u=i.parseSize(d,"w:w");l.push({w:u})}}catch(e){r={error:e}}finally{try{s&&!s.done&&(a=t.return)&&a.call(t)}finally{if(r)throw r.error}}return l}r.parseTable=function(e,r){var a,l,i=new n.Table,b={};try{for(var m=o.__values(d.mergeSdt(r)),w=m.next();!w.done;w=m.next()){var p=w.value,v=p.tagName;switch(v){case"w:tblPr":i.properties=s.parseTablePr(e,p);break;case"w:tr":i.trs.push(t.parseTr(e,p,b));break;case"w:tblGrid":i.tblGrid=u(p);break;default:console.warn("Table.fromXML unknown tag",v,p)}}}catch(e){a={error:e}}finally{try{w&&!w.done&&(l=m.return)&&l.call(m)}finally{if(a)throw a.error}}return i}}));
;/*!node_modules/ooxml-viewer/lib/openxml/word/wps/WPS.js*/
amis.define("node_modules/ooxml-viewer/lib/openxml/word/wps/WPS",(function(e,r,a,o){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var t=e("node_modules/tslib/tslib"),n=e("node_modules/ooxml-viewer/lib/openxml/word/Paragraph"),l=e("node_modules/ooxml-viewer/lib/openxml/word/drawing/ShapeProperties"),i=e("node_modules/ooxml-viewer/lib/parse/parseTable"),s=e("node_modules/ooxml-viewer/lib/parse/parseSize"),c=e("node_modules/ooxml-viewer/lib/parse/parseChildColor");function d(e,r){var a,o;try{for(var n=t.__values(e.attributes),l=n.next();!l.done;l=n.next()){var i=l.value,c=i.name,d=i.value;switch(c){case"numCol":r["column-count"]=d;break;case"vert":switch(d){case"vert":r["writing-mode"]="vertical-rl",r["text-orientation"]="sideways";break;case"vert270":case"eaVert":r["writing-mode"]="vertical-rl",r["text-orientation"]="mixed"}break;case"rot":var u=s.convertAngle(d);u&&(r.transform="rotate(".concat(u,"deg)"))}}}catch(e){a={error:e}}finally{try{l&&!l.done&&(o=n.return)&&o.call(n)}finally{if(a)throw a.error}}}function u(e,r,a){var o,n;try{for(var l=t.__values(r.children),i=l.next();!i.done;i=l.next()){var s=i.value;if("a:fillRef"===s.tagName)a["background-color"]=c.parseChildColor(e,s)}}catch(e){o={error:e}}finally{try{i&&!i.done&&(n=l.return)&&n.call(l)}finally{if(o)throw o.error}}}var v=function(){function e(){this.style={}}return e.fromXML=function(r,a){var o,s,c,v,w=new e;w.txbxContent=[];try{for(var f=t.__values(a.children),m=f.next();!m.done;m=f.next()){var p=m.value,x=p.tagName;switch(x){case"wps:cNvSpPr":break;case"wps:spPr":w.spPr=l.ShapePr.fromXML(r,p);break;case"wps:txbx":var b=p.firstElementChild;if(b)try{for(var h=(c=void 0,t.__values(b.children)),y=h.next();!y.done;y=h.next()){var _=y.value;switch(_.tagName){case"w:p":w.txbxContent.push(n.Paragraph.fromXML(r,_));break;case"w:tbl":w.txbxContent.push(i.parseTable(r,_))}}}catch(e){c={error:e}}finally{try{y&&!y.done&&(v=h.return)&&v.call(h)}finally{if(c)throw c.error}}else console.warn("unknown wps:txbx",p);break;case"wps:style":u(r,p,w.style);break;case"wps:bodyPr":d(p,w.style);break;default:console.warn("WPS: Unknown tag ",x,p)}}}catch(e){o={error:e}}finally{try{m&&!m.done&&(s=f.return)&&s.call(f)}finally{if(o)throw o.error}}return w},e}();r.WPS=v}));
;/*!node_modules/ooxml-viewer/lib/openxml/word/drawing/Drawing.js*/
amis.define("node_modules/ooxml-viewer/lib/openxml/word/drawing/Drawing",(function(e,o,i,n){"use strict";Object.defineProperty(o,"__esModule",{value:!0});var r,t=e("node_modules/tslib/tslib"),a=e("node_modules/ooxml-viewer/lib/parse/parseSize"),s=e("node_modules/ooxml-viewer/lib/OpenXML"),l=e("node_modules/ooxml-viewer/lib/openxml/word/drawing/Pic"),p=e("node_modules/ooxml-viewer/lib/openxml/word/wps/WPS");o.Position=void 0,(r=o.Position||(o.Position={})).inline="inline",r.anchor="anchor";var c=function(){function e(){this.position=o.Position.inline}return e.fromXML=function(i,n){var r,c,u,m=new e,d={};m.containerStyle=d;var w=n.firstElementChild;if(w){if("wp:anchor"===w.tagName){m.position=o.Position.anchor,m.anchor=function(e){return{simplePos:s.getAttrBoolean(e,"simplePos",!1),hidden:s.getAttrBoolean(e,"hidden",!1),behindDoc:s.getAttrBoolean(e,"behindDoc",!1)}}(w);var g=s.getAttrNumber(w,"relativeHeight",1);d["z-index"]=g}try{for(var h=t.__values(w.children),f=h.next();!f.done;f=h.next()){var v=f.value,b=v.tagName;switch(b){case"wp:simplePos":(null===(u=m.anchor)||void 0===u?void 0:u.simplePos)&&(d.position="absolute",d.x=a.parseSize(v,"x",a.LengthUsage.Emu),d.y=a.parseSize(v,"y",a.LengthUsage.Emu));break;case"wp:positionH":var P=v.getAttribute("relativeFrom");if("column"===P||"page"===P){if(x=v.firstElementChild)"wp:posOffset"===(L=x.tagName)?(d.position="absolute",d.left=a.convertLength(x.innerHTML,a.LengthUsage.Emu)):console.warn("unsupport positionType",L)}else console.warn("unsupport relativeFrom",P);break;case"wp:positionV":var x,L,E=v.getAttribute("relativeFrom");if("paragraph"===E||"page"===E){if("paragraph"===E&&(m.relativeFromParagraph=!0),x=v.firstElementChild)"wp:posOffset"===(L=x.tagName)?(d.position="absolute",d.top=a.convertLength(x.innerHTML,a.LengthUsage.Emu)):console.warn("unsupport positionType",L)}else console.warn("unsupport relativeFrom",E);break;case"wp:docPr":case"wp:cNvGraphicFramePr":case"wp:effectExtent":case"wp:wrapNone":case"wp14:sizeRelH":case"wp14:sizeRelV":break;case"a:graphic":var y=v.firstElementChild,k=null==y?void 0:y.firstElementChild;if(k)switch(k.tagName){case"pic:pic":m.pic=l.Pic.fromXML(i,k);break;case"wps:wsp":m.wps=p.WPS.fromXML(i,k);break;default:console.warn("unknown graphicData child tag",k)}break;case"wp:extent":d.width=a.parseSize(v,"cx",a.LengthUsage.Emu),d.height=a.parseSize(v,"cy",a.LengthUsage.Emu);break;default:console.warn("drawing unknown tag",b)}}}catch(e){r={error:e}}finally{try{f&&!f.done&&(c=h.return)&&c.call(h)}finally{if(r)throw r.error}}}return m},e}();o.Drawing=c}));
;/*!node_modules/ooxml-viewer/lib/openxml/word/InstrText.js*/
amis.define("node_modules/ooxml-viewer/lib/openxml/word/InstrText",(function(e,t,n,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=function(e){this.text=e};t.InstrText=i}));
;/*!node_modules/ooxml-viewer/lib/openxml/word/NoBreakHyphen.js*/
amis.define("node_modules/ooxml-viewer/lib/openxml/word/NoBreakHyphen",(function(e,o,n,i){"use strict";Object.defineProperty(o,"__esModule",{value:!0});var r=function(){};o.NoBreakHyphen=r}));
;/*!node_modules/ooxml-viewer/lib/openxml/word/Pict.js*/
amis.define("node_modules/ooxml-viewer/lib/openxml/word/Pict",(function(e,t,i,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(){}return e.fromXML=function(t,i){var n=new e,r=i.getElementsByTagName("v:imagedata").item(0);if(r){var o=r.getAttribute("r:id")||"",a=t.getDocumentRels(o);a&&(n.src=t.loadImage(a))}return n},e}();t.Pict=r}));
;/*!node_modules/ooxml-viewer/lib/openxml/word/Ruby.js*/
amis.define("node_modules/ooxml-viewer/lib/openxml/word/Ruby",(function(r,e,n,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var t=r("node_modules/tslib/tslib"),a=r("node_modules/ooxml-viewer/lib/openxml/word/Run"),l=function(){function r(){}return r.fromXML=function(e,n){var o,l,u=new r;u.children=[];try{for(var i=t.__values(n.children),c=i.next();!c.done;c=i.next()){var f=c.value,s=f.tagName;if("w:r"===s){var d=a.Run.fromXML(e,f);d&&u.children.push(d)}else console.warn("parse Ruby: Unknown key",s,f)}}catch(r){o={error:r}}finally{try{c&&!c.done&&(l=i.return)&&l.call(i)}finally{if(o)throw o.error}}return u},r}();!function(r){function e(){return null!==r&&r.apply(this,arguments)||this}t.__extends(e,r)}(l);var u=function(){function r(){}return r.fromXML=function(e,n){var o,a,u=new r;try{for(var i=t.__values(n.children),c=i.next();!c.done;c=i.next()){var f=c.value,s=f.tagName;switch(s){case"w:rubyPr":break;case"w:rt":u.rt=l.fromXML(e,f);break;case"w:rubyBase":u.rubyBase=l.fromXML(e,f);break;default:console.warn("parse Ruby: Unknown key",s,f)}}}catch(r){o={error:r}}finally{try{c&&!c.done&&(a=i.return)&&a.call(i)}finally{if(o)throw o.error}}return u},r}();e.Ruby=u}));
;/*!node_modules/ooxml-viewer/lib/openxml/word/Separator.js*/
amis.define("node_modules/ooxml-viewer/lib/openxml/word/Separator",(function(e,o,r,i){"use strict";Object.defineProperty(o,"__esModule",{value:!0});var n=function(){};o.Separator=n}));
;/*!node_modules/ooxml-viewer/lib/openxml/word/SoftHyphen.js*/
amis.define("node_modules/ooxml-viewer/lib/openxml/word/SoftHyphen",(function(e,o,n,i){"use strict";Object.defineProperty(o,"__esModule",{value:!0});var t=function(){};o.SoftHyphen=t}));
;/*!node_modules/ooxml-viewer/lib/openxml/word/Sym.js*/
amis.define("node_modules/ooxml-viewer/lib/openxml/word/Sym",(function(e,t,n,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=function(){function e(){}return e.parseXML=function(t){var n=new e;return n.font=t.getAttribute("w:font")||"",n.char=t.getAttribute("w:char")||"",n},e}();t.Sym=o}));
;/*!node_modules/ooxml-viewer/lib/openxml/word/Tab.js*/
amis.define("node_modules/ooxml-viewer/lib/openxml/word/Tab",(function(e,o,r,n){"use strict";Object.defineProperty(o,"__esModule",{value:!0});var i=e("node_modules/ooxml-viewer/lib/OpenXML"),t=e("node_modules/ooxml-viewer/lib/parse/parseSize"),l=function(){function e(){}return e.fromXML=function(o,r){var n=new e;return n.pos=t.parseSize(r,"w:pos"),n.type=i.getVal(r),n.leader=r.getAttribute("w:leader"),n},e}();o.Tab=l}));
;/*!node_modules/ooxml-viewer/lib/openxml/word/Run.js*/
amis.define("node_modules/ooxml-viewer/lib/openxml/word/Run",(function(e,r,o,a){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n=e("node_modules/tslib/tslib"),d=e("node_modules/ooxml-viewer/lib/OpenXML"),l=e("node_modules/ooxml-viewer/lib/parse/parsePr"),t=e("node_modules/ooxml-viewer/lib/openxml/word/Break"),i=e("node_modules/ooxml-viewer/lib/openxml/word/drawing/Drawing"),s=e("node_modules/ooxml-viewer/lib/openxml/word/InstrText"),w=e("node_modules/ooxml-viewer/lib/openxml/word/NoBreakHyphen"),m=e("node_modules/ooxml-viewer/lib/openxml/word/Pict"),c=e("node_modules/ooxml-viewer/lib/openxml/word/Ruby"),u=e("node_modules/ooxml-viewer/lib/openxml/word/Separator"),p=e("node_modules/ooxml-viewer/lib/openxml/word/SoftHyphen"),b=e("node_modules/ooxml-viewer/lib/openxml/word/Sym"),h=e("node_modules/ooxml-viewer/lib/openxml/word/Tab"),x=function(e){this.preserveSpace=!1,this.text=String(e)},f=function(){function e(){this.properties={},this.children=[]}return e.prototype.addChild=function(e){e&&this.children.push(e)},e.parseRunPr=function(e,r){var o,a=l.parsePr(e,r),n=r.getElementsByTagName("w:rStyle").item(0);return n&&(o=d.getVal(n)),{cssStyle:a,rStyle:o}},e.fromXML=function(r,o){var a,d,l=new e;try{for(var f=n.__values(o.children),y=f.next();!y.done;y=f.next()){var v=y.value,k=v.tagName;switch(k){case"w:t":var C=v.textContent||"",_=new x(C);l.addChild(_);break;case"w:rPr":l.properties=e.parseRunPr(r,v);break;case"w:br":case"w:cr":l.addChild(t.Break.fromXML(r,v));break;case"w:drawing":l.addChild(i.Drawing.fromXML(r,v));break;case"w:tab":l.addChild(h.Tab.fromXML(r,v));break;case"w:fldChar":l.fldChar=v.getAttribute("w:fldCharType");break;case"w:instrText":l.addChild(new s.InstrText(v.textContent||""));break;case"w:lastRenderedPageBreak":case"w:continuationSeparator":break;case"w:pict":l.addChild(m.Pict.fromXML(r,v));break;case"w:ruby":l.addChild(c.Ruby.fromXML(r,v));break;case"w:sym":l.addChild(b.Sym.parseXML(v));break;case"mc:AlternateContent":var g=v.getElementsByTagName("w:drawing").item(0);g&&l.addChild(i.Drawing.fromXML(r,g));break;case"w:softHyphen":l.addChild(new p.SoftHyphen);break;case"w:noBreakHyphen":l.addChild(new w.NoBreakHyphen);break;case"w:separator":l.addChild(new u.Separator);break;default:console.warn("parse Run: Unknown key",k,v)}}}catch(e){a={error:e}}finally{try{y&&!y.done&&(d=f.return)&&d.call(f)}finally{if(a)throw a.error}}return l},e}();r.Run=f,r.Text=x}));
;/*!node_modules/ooxml-viewer/lib/openxml/word/Hyperlink.js*/
amis.define("node_modules/ooxml-viewer/lib/openxml/word/Hyperlink",(function(e,r,n,t){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var o=e("node_modules/tslib/tslib"),i=e("node_modules/ooxml-viewer/lib/openxml/word/Run"),l=function(){function e(){this.children=[]}return e.prototype.addChild=function(e){this.children.push(e)},e.fromXML=function(r,n){var t,l,a=new e,d=n.getAttribute("r:id");if(d){var u=r.getDocumentRels(d);u&&(a.relation=u)}var c=n.getAttribute("w:anchor");c&&(a.anchor=c);var s=n.getAttribute("w:tooltip");s&&(a.tooltip=s);try{for(var f=o.__values(n.children),h=f.next();!h.done;h=f.next()){var m=h.value,p=m.tagName;if("w:r"===p)a.addChild(i.Run.fromXML(r,m));else console.warn("parse Hyperlink: Unknown key",p,m)}}catch(e){t={error:e}}finally{try{h&&!h.done&&(l=f.return)&&l.call(f)}finally{if(t)throw t.error}}return a},e}();r.Hyperlink=l}));
;/*!node_modules/ooxml-viewer/lib/openxml/word/numbering/NumberProperties.js*/
amis.define("node_modules/ooxml-viewer/lib/openxml/word/numbering/NumberProperties",(function(e,n,r,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var i=e("node_modules/ooxml-viewer/lib/OpenXML"),m=function(){function e(){}return e.fromXML=function(n,r){var t=new e,m=r.getElementsByTagName("w:ilvl").item(0);m&&(t.ilvl=i.getVal(m));var o=r.getElementsByTagName("w:numId").item(0);return o&&(t.numId=i.getVal(o)),t},e}();n.NumberPr=m}));
;/*!node_modules/ooxml-viewer/lib/openxml/word/InlineText.js*/
amis.define("node_modules/ooxml-viewer/lib/openxml/word/InlineText",(function(e,o,r,n){"use strict";Object.defineProperty(o,"__esModule",{value:!0});var l=e("node_modules/tslib/tslib"),a=e("node_modules/ooxml-viewer/lib/openxml/word/Bookmark"),i=e("node_modules/ooxml-viewer/lib/openxml/word/Hyperlink"),d=e("node_modules/ooxml-viewer/lib/openxml/word/Run"),t=function(){function e(){this.children=[]}return e.prototype.addChild=function(e){this.children.push(e)},e.fromXML=function(o,r){var n,t,s=new e;try{for(var m=l.__values(r.children),c=m.next();!c.done;c=m.next()){var u=c.value,w=u.tagName;switch(w){case"w:r":s.addChild(d.Run.fromXML(o,u));break;case"w:hyperlink":s.addChild(i.Hyperlink.fromXML(o,u));break;case"w:bookmarkStart":s.addChild(a.BookmarkStart.fromXML(o,u));case"w:bookmarkEnd":case"w:proofErr":case"w:noProof":case"w:smartTagPr":case"w:del":break;default:console.warn("parse Inline: Unknown key",w,u)}}}catch(e){n={error:e}}finally{try{c&&!c.done&&(t=m.return)&&t.call(m)}finally{if(n)throw n.error}}return s},e}();o.InlineText=t}));
;/*!node_modules/ooxml-viewer/lib/openxml/word/FldSimple.js*/
amis.define("node_modules/ooxml-viewer/lib/openxml/word/FldSimple",(function(e,n,i,o){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var t=e("node_modules/ooxml-viewer/lib/openxml/word/InlineText"),r=function(){function e(){}return e.fromXML=function(n,i){var o=new e;return o.inlineText=t.InlineText.fromXML(n,i),o.instr=i.getAttribute("w:instr")||"",o},e}();n.FldSimple=r}));
;/*!node_modules/ooxml-viewer/lib/openxml/math/OMath.js*/
amis.define("node_modules/ooxml-viewer/lib/openxml/math/OMath",(function(e,n,t,o){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var r=function(){function e(){}return e.fromXML=function(n,t){var o=new e;return o.element=t,o},e}();n.OMath=r}));
;/*!node_modules/ooxml-viewer/lib/openxml/word/Paragraph.js*/
amis.define("node_modules/ooxml-viewer/lib/openxml/word/Paragraph",(function(e,r,o,a){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var l=e("node_modules/tslib/tslib"),t=e("node_modules/ooxml-viewer/lib/OpenXML"),n=e("node_modules/ooxml-viewer/lib/parse/parsePr"),m=e("node_modules/ooxml-viewer/lib/openxml/word/Bookmark"),i=e("node_modules/ooxml-viewer/lib/openxml/word/Hyperlink"),d=e("node_modules/ooxml-viewer/lib/openxml/word/numbering/NumberProperties"),s=e("node_modules/ooxml-viewer/lib/openxml/word/Run"),p=e("node_modules/ooxml-viewer/lib/openxml/word/Tab"),u=e("node_modules/ooxml-viewer/lib/openxml/word/FldSimple"),w=e("node_modules/ooxml-viewer/lib/openxml/math/OMath"),c=e("node_modules/ooxml-viewer/lib/parse/mergeSdt");var f=function(){function e(){this.properties={},this.children=[],this.fldSimples=[]}return e.prototype.addChild=function(e){this.children.push(e)},e.parseParagraphPr=function(e,r){var o,a,m,i,s=n.parsePr(e,r),u=r.getElementsByTagName("w:pStyle").item(0);u&&(m=t.getVal(u));var w=r.getElementsByTagName("w:numPr").item(0);w&&(i=d.NumberPr.fromXML(e,w));var c=[],f=r.getElementsByTagName("w:tab");try{for(var b=l.__values(f),h=b.next();!h.done;h=b.next()){var v=h.value;c.push(p.Tab.fromXML(e,v))}}catch(e){o={error:e}}finally{try{h&&!h.done&&(a=b.return)&&a.call(b)}finally{if(o)throw o.error}}var x=function(e){var r=e.getElementsByTagName("w:autoSpaceDE").item(0),o=e.getElementsByTagName("w:autoSpaceDN").item(0);return!!r||!!o}(r);return{cssStyle:s,pStyle:m,numPr:i,tabs:c,autoSpace:x}},e.fromXML=function(r,o){var a,t,n=new e;n.fldSimples=[],n.paraId=o.getAttribute("w14:paraId")||"";try{for(var d=l.__values(c.mergeSdt(o)),p=d.next();!p.done;p=d.next()){var f=p.value,b=f.tagName;switch(b){case"w:pPr":n.properties=e.parseParagraphPr(r,f);break;case"w:r":n.addChild(s.Run.fromXML(r,f));break;case"w:hyperlink":n.addChild(i.Hyperlink.fromXML(r,f));break;case"w:bookmarkStart":n.addChild(m.BookmarkStart.fromXML(r,f));case"w:bookmarkEnd":case"w:proofErr":case"w:noProof":case"w:del":case"w:moveTo":case"w:moveFrom":break;case"w:fldSimple":n.fldSimples.push(u.FldSimple.fromXML(r,f));break;case"m:oMathPara":case"m:oMath":n.addChild(w.OMath.fromXML(r,f));break;default:console.warn("parse Paragraph: Unknown key",b,f)}}}catch(e){a={error:e}}finally{try{p&&!p.done&&(t=d.return)&&t.call(d)}finally{if(a)throw a.error}}return n},e}();r.Paragraph=f}));
;/*!node_modules/ooxml-viewer/lib/openxml/Style.js*/
amis.define("node_modules/ooxml-viewer/lib/openxml/Style",(function(e,r,a,t){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var l=e("node_modules/tslib/tslib"),n=e("node_modules/ooxml-viewer/lib/parse/parseTcPr"),s=e("node_modules/ooxml-viewer/lib/OpenXML"),o=e("node_modules/ooxml-viewer/lib/openxml/word/Paragraph"),i=e("node_modules/ooxml-viewer/lib/openxml/word/Run"),c=e("node_modules/ooxml-viewer/lib/parse/parseTablePr"),u=e("node_modules/ooxml-viewer/lib/parse/parseTrPr");function w(e,r){var a,t,s={};try{for(var w=l.__values(r.children),d=w.next();!d.done;d=w.next()){var m=d.value;switch(m.tagName){case"w:rPr":s.rPr=i.Run.parseRunPr(e,m);break;case"w:pPr":s.pPr=o.Paragraph.parseParagraphPr(e,m);break;case"w:tblPr":s.tblPr=c.parseTablePr(e,m);break;case"w:tcPr":s.tcPr=n.parseTcPr(e,m);break;case"w:trPr":s.trPr=u.parseTrPr(e,m)}}}catch(e){a={error:e}}finally{try{d&&!d.done&&(t=w.return)&&t.call(w)}finally{if(a)throw a.error}}return s}function d(e,r){var a,t,n={};n.id=r.getAttribute("w:styleId")||"",n.type=r.getAttribute("w:type"),n.tblStylePr={},Object.assign(n,w(e,r));try{for(var o=l.__values(r.children),i=o.next();!i.done;i=o.next()){var c=i.value,u=c.tagName;switch(u){case"w:name":n.name=s.getVal(c);break;case"w:basedOn":n.basedOn=s.getVal(c);break;case"w:rPr":case"w:pPr":case"w:tblPr":case"w:tcPr":case"w:trPr":case"w:next":case"w:link":case"w:unhideWhenUsed":case"w:qFormat":case"w:rsid":case"w:uiPriority":case"w:semiHidden":case"w:autoRedefine":break;case"w:tblStylePr":var d=c.getAttribute("w:type");n.tblStylePr[d]=w(e,c);break;default:console.warn("parseStyle Unknown tag",u,c)}}}catch(e){a={error:e}}finally{try{i&&!i.done&&(t=o.return)&&t.call(o)}finally{if(a)throw a.error}}return n}r.parseStyles=function(e,r){var a,t,n={styleMap:{}},s=Array.from(r.getElementsByTagName("w:style"));try{for(var c=l.__values(s),u=c.next();!u.done;u=c.next()){var w=d(e,u.value);w.id&&(n.styleMap[w.id]=w)}}catch(e){a={error:e}}finally{try{u&&!u.done&&(t=c.return)&&t.call(c)}finally{if(a)throw a.error}}return n.defaultStyle=function(e,r){var a={};if(!r)return a;var t=r.getElementsByTagName("w:rPrDefault").item(0);if(t){var l=t.getElementsByTagName("w:rPr").item(0);l&&(a.rPr=i.Run.parseRunPr(e,l))}var n=r.getElementsByTagName("w:pPrDefault").item(0);if(n){var s=n.getElementsByTagName("w:pPr").item(0);s&&(a.pPr=o.Paragraph.parseParagraphPr(e,s))}return a}(e,r.getElementsByTagName("w:docDefaults").item(0)),n}}));
;/*!node_modules/ooxml-viewer/lib/openxml/Theme.js*/
amis.define("node_modules/ooxml-viewer/lib/openxml/Theme",(function(e,t,r,l){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=e("node_modules/tslib/tslib"),a=e("node_modules/ooxml-viewer/lib/parse/parseSize"),o=e("node_modules/ooxml-viewer/lib/OpenXML"),c=function(){this.colors={}};function m(e){var t={};return e&&(t.clrScheme=function(e){var t,r,l=new c;if(!e)return l;l.name=e.getAttribute("name")||"";try{for(var m=n.__values(e.children),s=m.next();!s.done;s=m.next()){var i=s.value,g=i.tagName.replace("a:",""),u=i.firstElementChild;if(u){var f=u.nodeName.replace("a:","");if("sysClr"===f)l.colors[g]=u.getAttribute("lastClr")||"";else if("srgbClr"===f)l.colors[g]="#"+u.getAttribute("val")||"";else if("scrgbClr"===f){var h=256*o.getAttrPercentage(i,"r"),v=256*o.getAttrPercentage(i,"g"),d=256*o.getAttrPercentage(i,"b");l.colors[g]="rgb(".concat(h,", ").concat(v,", ").concat(d,")")}else if("hslClr"===f){var b=a.convertAngle(i.getAttribute("hue")),y=100*o.getAttrPercentage(i,"sat"),A=100*o.getAttrPercentage(i,"lum");l.colors[g]="hsl(".concat(b,", ").concat(y,"%, ").concat(A,"%)")}else"prstClr"===f?l.colors[g]=o.getVal(i):console.error("unknown clr name",f)}}}catch(e){t={error:e}}finally{try{s&&!s.done&&(r=m.return)&&r.call(m)}finally{if(t)throw t.error}}return l}(e.getElementsByTagName("a:clrScheme").item(0)),t.fontScheme=(e.getElementsByTagName("a:fontScheme").item(0),{}),t.fmtScheme=(e.getElementsByTagName("a:fmtScheme").item(0),{})),t}t.parseTheme=function(e){var t={};return t.themeElements=m(e.getElementsByTagName("a:themeElements").item(0)),t}}));
;/*!node_modules/ooxml-viewer/lib/util/dom.js*/
amis.define("node_modules/ooxml-viewer/lib/util/dom",(function(e,n,t,a){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var l=e("node_modules/tslib/tslib");n.addClassName=function(e,n){e&&n&&e.classList.add(n)},n.addClassNames=function(e,n){var t;e&&n&&(t=e.classList).add.apply(t,l.__spreadArray([],l.__read(n),!1))},n.appendChild=function(e,n){e&&n&&e.appendChild(n)},n.applyStyle=function(e,n){if(n)for(var t in n){var a=n[t];null!=a&&""!==a&&e.style.setProperty(t,String(a))}},n.createElement=function(e){return document.createElement(e)},n.styleToText=function(e){void 0===e&&(e={});var n="";for(var t in e){var a=e[t];null!=a&&""!==a&&(n+="".concat(t,": ").concat(a,";\n"))}return n}}));
;/*!node_modules/ooxml-viewer/lib/render/renderBr.js*/
amis.define("node_modules/ooxml-viewer/lib/render/renderBr",(function(e,r,n,o){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var d=e("node_modules/ooxml-viewer/lib/util/dom");r.renderBr=function(e){return d.createElement("br")}}));
;/*!node_modules/ooxml-viewer/lib/render/renderStyle.js*/
amis.define("node_modules/ooxml-viewer/lib/render/renderStyle",(function(n,t,c,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n("node_modules/tslib/tslib"),a=n("node_modules/ooxml-viewer/lib/util/dom");function r(n,t,c){var e="",o=c.tblPr,r=c.tcPr;if(o){var l=a.styleToText(o.cssStyle),s=a.styleToText(o.tcCSSStyle);if(e+="\n .".concat(n," .").concat(t," {\n  border-collapse: collapse;\n  ").concat(l,"\n }\n\n .").concat(n," .").concat(t," > tbody > tr > td {\n  ").concat(s,"\n }\n "),o.insideBorder){var d=o.insideBorder;d.H&&(e+="\n      .".concat(n," .").concat(t," > tbody > tr > td {\n        border-top: ").concat(d.H,";\n      }")),d.V&&(e+="\n      .".concat(n," .").concat(t," > tbody > tr > td {\n        border-left: ").concat(d.V,";\n      }"))}}if(r){var i=a.styleToText(r.cssStyle);e+="\n    .".concat(n," .").concat(t," > tbody > tr > td {\n     ").concat(i,"\n    }\n    ")}return e}function l(n,t,c,e){var o,r,l,s,d,i,b="",y=a.styleToText(null===(o=e.trPr)||void 0===o?void 0:o.cssStyle),v="";switch(c){case"firstCol":v="enable-firstColumn";break;case"lastCol":v="enable-lastColumn";break;case"firstRow":v="enable-firstRow";break;case"lastRow":v="enable-lastRow";break;case"band1Horz":case"band2Horz":v="enable-hBand";break;case"band1Vert":case"band2Vert":v="enable-vBand"}y&&(b+="\n    ".concat(n,".").concat(v," > tbody > tr.").concat(c,"{\n       ").concat(y,"\n    }\n    "));var u=a.styleToText(null===(r=e.tcPr)||void 0===r?void 0:r.cssStyle);if(u&&(b+="\n    ".concat(n,".").concat(v," > tbody > tr > td.").concat(c," {\n       ").concat(u,"\n    }\n    "),null===(l=e.tcPr)||void 0===l?void 0:l.insideBorder)){var f=null===(s=e.tcPr)||void 0===s?void 0:s.insideBorder;f.H&&(b+="\n          ".concat(n,".").concat(v," > tbody > tr > td.").concat(c," {\n            border-top: ").concat(f.H,";\n          }")),f.V&&("none"===f.V?b+="\n          ".concat(n,".").concat(v," > tbody > tr > td.").concat(c," {\n            border-left: none;\n            border-right: none;\n          }"):b+="\n          ".concat(n,".").concat(v," > tbody > tr > td.").concat(c," {\n            border-left: ").concat(f.V,";\n          }"))}var T=a.styleToText(null===(d=e.pPr)||void 0===d?void 0:d.cssStyle);T&&(b+="\n    ".concat(n,".").concat(v," > tbody > tr > td.").concat(c," > .").concat(t,"-p {\n       ").concat(T,"\n    }\n    "));var p=a.styleToText(null===(i=e.rPr)||void 0===i?void 0:i.cssStyle);return p&&(b+="\n    ".concat(n,".").concat(v," > tbody > tr > td.").concat(c," > .").concat(t,"-p > .").concat(t,"-r {\n       ").concat(p,"\n    }\n    ")),b}var s=new Set(["wholeTable","band1Horz","band2Horz","band1Vert","band2Vert","firstCol","firstRow","lastCol","lastRow","neCell","nwCell","seCell","swCell"]);function d(n,t,c){var e,a;if(!c)return"";var r="",d=".".concat(n," .").concat(t);try{for(var i=o.__values(s),b=i.next();!b.done;b=i.next()){var y=b.value;if(y in c)r+=l(d,n,y,c[y])}}catch(n){e={error:n}}finally{try{b&&!b.done&&(a=i.return)&&a.call(i)}finally{if(e)throw e.error}}return r}t.generateTableStyle=r,t.renderStyle=function(n){var t=a.createElement("style"),c=function(n){var t=n.styles.defaultStyle,c="";(null==t?void 0:t.pPr)&&(c=a.styleToText(t.pPr.cssStyle));var e="";(null==t?void 0:t.rPr)&&(e=a.styleToText(t.rPr.cssStyle));var o=n.getClassPrefix();return"\n  .".concat(n.wrapClassName," {\n\n  }\n\n  .").concat(n.wrapClassName," > article > section {\n    background: white;\n  }\n\n  /** docDefaults **/\n\n  .").concat(o," p {\n    margin: 0;\n    padding: 0;\n    line-height: 1.5;\n  }\n\n  .").concat(o," table {\n    border-spacing: 0;\n  }\n\n  .").concat(o," .").concat(o,"-p {\n    ").concat(c,"\n  }\n\n  .").concat(o," .").concat(o,"-r {\n    white-space: pre-wrap;\n    overflow-wrap: break-word;\n    ").concat(e,"\n  }\n  ")}(n),e=function(n){var t=n.styles.styleMap,c=n.getClassPrefix(),e="";for(var o in t){var l=n.getStyleIdDisplayName(o),s=t[o],i=s.pPr,b="";if(i){var y=a.styleToText(i.cssStyle);b="\n      .".concat(c," .").concat(l," {\n        ").concat(y,"\n      }\n      ")}var v="";if(s.rPr){var u=a.styleToText(s.rPr.cssStyle);v="\n      .".concat(c," .").concat(l," > .").concat(c,"-r {\n        ").concat(u,"\n      }\n      ")}var f=r(c,l,s),T=d(c,l,s.tblStylePr);e+="\n    ".concat(b,"\n    ").concat(v,"\n    ").concat(f,"\n    ").concat(T,"\n    ")}return e}(n);return t.textContent="\n  ".concat(c,"\n\n  ").concat(e,"\n  "),t}}));
;/*!node_modules/ooxml-viewer/lib/render/setElementStyle.js*/
amis.define("node_modules/ooxml-viewer/lib/render/setElementStyle",(function(e,l,t,s){"use strict";Object.defineProperty(l,"__esModule",{value:!0});var a=e("node_modules/ooxml-viewer/lib/util/dom");l.setElementStyle=function(e,l,t){t&&(t.cssStyle&&a.applyStyle(l,t.cssStyle),t.pStyle&&a.addClassNames(l,e.getStyleClassName(t.pStyle)),t.rStyle&&a.addClassNames(l,e.getStyleClassName(t.rStyle)))}}));
;/*!node_modules/ooxml-viewer/lib/render/renderTable.js*/
amis.define("node_modules/ooxml-viewer/lib/render/renderTable",(function(e,a,l,r){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var t=e("node_modules/tslib/tslib"),n=e("node_modules/ooxml-viewer/lib/openxml/word/Paragraph"),o=e("node_modules/ooxml-viewer/lib/openxml/word/Table"),d=e("node_modules/ooxml-viewer/lib/util/dom"),s=e("node_modules/ooxml-viewer/lib/render/renderParagraph"),i=e("node_modules/ooxml-viewer/lib/render/renderStyle"),c=e("node_modules/ooxml-viewer/lib/render/setElementStyle");function p(e,a,l,r,t,n,o){0===e&&0===a&&t.classList.add("nwCell"),0===e&&a===r-1&&t.classList.add("neCell"),e===l-1&&0===a&&t.classList.add("swCell"),e===l-1&&a===r-1&&t.classList.add("seCell"),0===e&&t.classList.add("firstRow"),e===l-1&&t.classList.add("lastRow"),0===a&&t.classList.add("firstCol"),a===r-1&&t.classList.add("lastCol"),m(e+1)&&t.classList.add("band1Horz"),m(e+1)||t.classList.add("band2Horz"),m(a+1)&&t.classList.add("band1Vert"),m(a+1)||t.classList.add("band2Vert")}function m(e,a){return!(e%2)}a.default=function e(a,l){var r,m,u,v,b,f,y=document.createElement("table"),w=l.properties;if(w.tblCaption){var h=document.createElement("caption");h.textContent=w.tblCaption,y.appendChild(h)}if(w.tblLook)for(var C in w.tblLook)"noHBand"===C?w.tblLook[C]||d.addClassName(y,"enable-hBand"):"noVBand"===C?w.tblLook[C]||d.addClassName(y,"enable-vBand"):w.tblLook[C]&&d.addClassName(y,"enable-"+C);c.setElementStyle(a,y,w);var S=a.genClassName();y.classList.add(S),a.appendStyle(i.generateTableStyle(a.getClassPrefix(),S,{tblPr:w}));var L=document.createElement("tbody");y.appendChild(L);var x=0;try{for(var _=t.__values(l.trs),g=_.next();!g.done;g=_.next()){var E=g.value,k=document.createElement("tr");L.appendChild(k);var B=0;try{for(var P=(u=void 0,t.__values(E.tcs)),z=P.next();!z.done;z=P.next()){var N=z.value,T=document.createElement("td");k.appendChild(T),p(x,B,l.trs.length,E.tcs.length,T,w.rowBandSize,w.colBandSize),E.properties.tcStyle&&d.applyStyle(T,E.properties.tcStyle);var H=N.properties;c.setElementStyle(a,T,H),H.gridSpan&&(T.colSpan=H.gridSpan),H.rowSpan&&(T.rowSpan=H.rowSpan);var V=!0;H.hideMark&&(V=!1);try{for(var M=(b=void 0,t.__values(N.children)),R=M.next();!R.done;R=M.next()){var j=R.value;if(j instanceof n.Paragraph){var O=s.default(a,j,V);d.appendChild(T,O)}else j instanceof o.Table?(V=!1,d.appendChild(T,e(a,j))):console.warn("unknown child type: "+j)}}catch(e){b={error:e}}finally{try{R&&!R.done&&(f=M.return)&&f.call(M)}finally{if(b)throw b.error}}H.rowSpan?B+=H.rowSpan:B++}}catch(e){u={error:e}}finally{try{z&&!z.done&&(v=P.return)&&v.call(P)}finally{if(u)throw u.error}}x++}}catch(e){r={error:e}}finally{try{g&&!g.done&&(m=_.return)&&m.call(_)}finally{if(r)throw r.error}}return y}}));
;/*!node_modules/ooxml-viewer/lib/render/renderDrawing.js*/
amis.define("node_modules/ooxml-viewer/lib/render/renderDrawing",(function(e,r,l,t){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var o=e("node_modules/tslib/tslib"),n=e("node_modules/ooxml-viewer/lib/openxml/word/Paragraph"),i=e("node_modules/ooxml-viewer/lib/util/dom"),a=e("node_modules/ooxml-viewer/lib/render/renderParagraph"),d=e("node_modules/ooxml-viewer/lib/render/renderTable"),s=e("node_modules/ooxml-viewer/lib/openxml/word/Table");r.renderDrawing=function(e,r){var l,t,p=document.createElement("div");if("inline"===r.position?p.style.display="inline-block":r.position,r.pic&&i.appendChild(p,function(e,r,l){var t,o,n=null===(t=e.blipFill)||void 0===t?void 0:t.blip;if(n&&n.src){var i=document.createElement("img");i.style.position="relative",i.src=n.src;var a=null===(o=e.spPr)||void 0===o?void 0:o.xfrm;if(a){var d=a.off;d&&(i.style.left=d.x,i.style.top=d.y);var s=a.ext;s&&(i.style.width=s.cx,i.style.height=s.cy),a.rot&&(i.style.transform="rotate(".concat(a.rot,"deg)"))}return i}return null}(r.pic)),i.applyStyle(p,r.containerStyle),r.wps){var c=r.wps,m=c.spPr;if(i.applyStyle(p,c.style),i.applyStyle(p,null==m?void 0:m.style),null==m?void 0:m.xfrm){var u=m.xfrm.ext;u&&(p.style.width=u.cx,p.style.height=u.cy),m.xfrm.rot&&(p.style.transform="rotate(".concat(m.xfrm.rot,"deg)"))}var v=c.txbxContent;try{for(var y=o.__values(v),f=y.next();!f.done;f=y.next()){var x=f.value;x instanceof n.Paragraph?i.appendChild(p,a.default(e,x)):x instanceof s.Table&&i.appendChild(p,d.default(e,x))}}catch(e){l={error:e}}finally{try{f&&!f.done&&(t=y.return)&&t.call(y)}finally{if(l)throw l.error}}}return p}}));
;/*!node_modules/ooxml-viewer/lib/render/renderTab.js*/
amis.define("node_modules/ooxml-viewer/lib/render/renderTab",(function(e,o,r,n){"use strict";Object.defineProperty(o,"__esModule",{value:!0});var t=e("node_modules/ooxml-viewer/lib/util/dom");o.renderTab=function(e,o){var r=t.createElement("span");return r.style.display="inline-block",r.style.width=o.pos,r.innerHTML="&nbsp;","dot"===o.leader&&(r.style.borderBottom="1px dotted"),r}}));
;/*!node_modules/ooxml-viewer/lib/render/renderPict.js*/
amis.define("node_modules/ooxml-viewer/lib/render/renderPict",(function(e,r,n,t){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.renderPict=function(e,r){if(r.src){var n=document.createElement("img");return n.style.position="relative",n.src=r.src,n}return null}}));
;/*!node_modules/ooxml-viewer/lib/render/renderRuby.js*/
amis.define("node_modules/ooxml-viewer/lib/render/renderRuby",(function(e,r,n,l){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var t=e("node_modules/tslib/tslib"),a=e("node_modules/ooxml-viewer/lib/util/dom"),d=e("node_modules/ooxml-viewer/lib/render/renderRun");r.renderRuby=function(e,r){var n,l,i,o,u=a.createElement("ruby");if(r.rubyBase){try{for(var c=t.__values(r.rubyBase.children),f=c.next();!f.done;f=c.next()){var v=f.value;u.appendChild(d.default(e,v))}}catch(e){n={error:e}}finally{try{f&&!f.done&&(l=c.return)&&l.call(c)}finally{if(n)throw n.error}}if(r.rt){var s=a.createElement("rp");s.innerText="(",u.appendChild(s);var y=a.createElement("rt");try{for(var m=t.__values(r.rt.children),p=m.next();!p.done;p=m.next()){v=p.value;y.appendChild(d.default(e,v))}}catch(e){i={error:e}}finally{try{p&&!p.done&&(o=m.return)&&o.call(m)}finally{if(i)throw i.error}}u.appendChild(y);var b=a.createElement("rp");b.innerText=")",u.appendChild(b)}}return u}}));
;/*!node_modules/ooxml-viewer/lib/render/renderHyperLink.js*/
amis.define("node_modules/ooxml-viewer/lib/render/renderHyperLink",(function(e,r,n,o){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var l=e("node_modules/tslib/tslib"),t=e("node_modules/ooxml-viewer/lib/util/dom"),i=e("node_modules/ooxml-viewer/lib/openxml/word/Run"),a=e("node_modules/ooxml-viewer/lib/render/renderRun");r.renderHyperLink=function(e,r,n){var o,d,u=t.createElement("a");if(r.relation){var f=r.relation;f&&"External"===f.targetMode&&(u.href=f.target,u.target="_blank")}r.anchor&&(u.href="#"+r.anchor),r.tooltip&&(u.title=r.tooltip);try{for(var m=l.__values(r.children),s=m.next();!s.done;s=m.next()){var v=s.value;if(v instanceof i.Run){var c=a.default(e,v,n);t.appendChild(u,c)}}}catch(e){o={error:e}}finally{try{s&&!s.done&&(d=m.return)&&d.call(m)}finally{if(o)throw o.error}}return u}}));
;/*!node_modules/ooxml-viewer/lib/render/renderBookmark.js*/
amis.define("node_modules/ooxml-viewer/lib/render/renderBookmark",(function(e,r,n,o){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var i=e("node_modules/ooxml-viewer/lib/util/dom");r.renderBookmarkStart=function(e,r){var n=r.name;if(n){var o=i.createElement("a");return o.name=n,o.id=n,o}return null}}));
;/*!node_modules/ooxml-viewer/lib/render/renderInlineText.js*/
amis.define("node_modules/ooxml-viewer/lib/render/renderInlineText",(function(e,o,r,n){"use strict";Object.defineProperty(o,"__esModule",{value:!0});var l=e("node_modules/tslib/tslib"),d=e("node_modules/ooxml-viewer/lib/util/dom"),i=e("node_modules/ooxml-viewer/lib/openxml/word/Run"),a=e("node_modules/ooxml-viewer/lib/openxml/word/Bookmark"),m=e("node_modules/ooxml-viewer/lib/openxml/word/Hyperlink"),t=e("node_modules/ooxml-viewer/lib/render/renderRun"),u=e("node_modules/ooxml-viewer/lib/render/renderHyperLink"),s=e("node_modules/ooxml-viewer/lib/render/renderBookmark");o.default=function(e,o,r){var n,f;try{for(var v=l.__values(o.children),p=v.next();!p.done;p=v.next()){var x=p.value;if(x instanceof i.Run)d.appendChild(r,t.default(e,x));else if(x instanceof a.BookmarkStart)d.appendChild(r,s.renderBookmarkStart(e,x));else if(x instanceof m.Hyperlink){var _=u.renderHyperLink(e,x);d.appendChild(r,_)}}}catch(e){n={error:e}}finally{try{p&&!p.done&&(f=v.return)&&f.call(v)}finally{if(n)throw n.error}}}}));
;/*!node_modules/ooxml-viewer/lib/render/renderInstrText.js*/
amis.define("node_modules/ooxml-viewer/lib/render/renderInstrText",(function(e,r,n,t){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var l=e("node_modules/tslib/tslib"),i=e("node_modules/ooxml-viewer/lib/util/dom"),o=e("node_modules/ooxml-viewer/lib/render/renderInlineText");r.renderInstrText=function(e,r){var n,t,d,a=r.text,s=i.createElement("span"),u=null===(d=e.currentParagraph)||void 0===d?void 0:d.fldSimples;if(u)try{for(var f=l.__values(u),m=f.next();!m.done;m=f.next()){var v=m.value;if(v.instr===a.trim()||a.startsWith(v.instr+" ")){o.default(e,v.inlineText,s);break}}}catch(e){n={error:e}}finally{try{m&&!m.done&&(t=f.return)&&t.call(f)}finally{if(n)throw n.error}}return s}}));
;/*!node_modules/ooxml-viewer/lib/render/renderSym.js*/
amis.define("node_modules/ooxml-viewer/lib/render/renderSym",(function(e,n,r,o){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var t=e("node_modules/ooxml-viewer/lib/util/dom");n.renderSym=function(e,n){var r=t.createElement("span");return r.style.fontFamily=n.font,r.innerHTML="&#x".concat(n.char,";"),r}}));
;/*!node_modules/ooxml-viewer/lib/util/autoSpace.js*/
amis.define("node_modules/ooxml-viewer/lib/util/autoSpace",(function(t,e,n,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var u=/\p{Punctuation}/u,i=/\p{Separator}/u,a=/\p{Script=Han}|\p{Script=Katakana}|\p{Script=Hiragana}|\p{Script=Hangul}/u;e.cjkspace=function(t){var e,n,r=t.filter((function(t){return void 0!==t&&""!==t}));return n=function(t,e){return function(t,e){return a.test(t)?!(u.test(e)||i.test(e)||a.test(e)):a.test(e)&&!u.test(t)&&!i.test(t)}(t,e)?" ":""},(e=r).reduce((function(t,r,u){return t+(0!==u?n(r,e[u-1]):"")+r}),"")}}));
;/*!node_modules/ooxml-viewer/lib/render/renderSoftHyphen.js*/
amis.define("node_modules/ooxml-viewer/lib/render/renderSoftHyphen",(function(e,n,r,o){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var i=e("node_modules/ooxml-viewer/lib/util/dom");n.renderSoftHyphen=function(){var e=i.createElement("span");return e.innerHTML="&shy;",e}}));
;/*!node_modules/ooxml-viewer/lib/render/renderNoBreakHyphen.js*/
amis.define("node_modules/ooxml-viewer/lib/render/renderNoBreakHyphen",(function(e,n,r,o){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var d=e("node_modules/ooxml-viewer/lib/util/dom");n.renderNoBreakHyphen=function(){var e=d.createElement("span");return e.innerHTML="&ndash;",e}}));
;/*!node_modules/ooxml-viewer/lib/render/renderSeparator.js*/
amis.define("node_modules/ooxml-viewer/lib/render/renderSeparator",(function(e,r,o,d){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n=e("node_modules/ooxml-viewer/lib/util/dom");r.renderSeparator=function(){var e=n.createElement("hr");return e.style.borderTop="1px solid #bbb",e}}));
;/*!node_modules/ooxml-viewer/lib/render/renderRun.js*/
amis.define("node_modules/ooxml-viewer/lib/render/renderRun",(function(e,o,r,n){"use strict";Object.defineProperty(o,"__esModule",{value:!0});var l=e("node_modules/tslib/tslib"),d=e("node_modules/ooxml-viewer/lib/render/renderBr"),i=e("node_modules/ooxml-viewer/lib/util/dom"),t=e("node_modules/ooxml-viewer/lib/openxml/word/Run"),a=e("node_modules/ooxml-viewer/lib/openxml/word/Break"),s=e("node_modules/ooxml-viewer/lib/openxml/word/drawing/Drawing"),m=e("node_modules/ooxml-viewer/lib/render/renderDrawing"),p=e("node_modules/ooxml-viewer/lib/render/setElementStyle"),u=e("node_modules/ooxml-viewer/lib/openxml/word/Tab"),x=e("node_modules/ooxml-viewer/lib/render/renderTab"),v=e("node_modules/ooxml-viewer/lib/render/renderPict"),c=e("node_modules/ooxml-viewer/lib/openxml/word/Pict"),w=e("node_modules/ooxml-viewer/lib/openxml/word/Ruby"),b=e("node_modules/ooxml-viewer/lib/render/renderRuby"),f=e("node_modules/ooxml-viewer/lib/openxml/word/InstrText"),y=e("node_modules/ooxml-viewer/lib/render/renderInstrText"),_=e("node_modules/ooxml-viewer/lib/openxml/word/Sym"),h=e("node_modules/ooxml-viewer/lib/render/renderSym"),S=e("node_modules/ooxml-viewer/lib/util/autoSpace"),C=e("node_modules/ooxml-viewer/lib/render/renderSoftHyphen"),T=e("node_modules/ooxml-viewer/lib/openxml/word/SoftHyphen"),g=e("node_modules/ooxml-viewer/lib/openxml/word/NoBreakHyphen"),k=e("node_modules/ooxml-viewer/lib/render/renderNoBreakHyphen"),B=e("node_modules/ooxml-viewer/lib/openxml/word/Separator"),H=e("node_modules/ooxml-viewer/lib/render/renderSeparator"),P="variable";function R(e,o,r,n){var l;-1===r.indexOf("{{")?(null===(l=null==n?void 0:n.properties)||void 0===l?void 0:l.autoSpace)?e.textContent=S.cjkspace(r.split("")):e.textContent=r:(e.dataset.originText=r,e.classList.add(P),e.textContent=o.replaceText(r))}o.default=function(e,o,r,n){var S,P,E,D,I=i.createElement("span");if(e.addClass(I,"r"),p.setElementStyle(e,I,o.properties),null===(E=o.properties)||void 0===E?void 0:E.rStyle){var N=e.getStyle(o.properties.rStyle);(null===(D=null==N?void 0:N.rPr)||void 0===D?void 0:D.cssStyle)&&i.applyStyle(I,N.rPr.cssStyle)}if(1===o.children.length&&o.children[0]instanceof t.Text)R(I,e,o.children[0].text,r);else try{for(var j=l.__values(o.children),O=j.next();!O.done;O=j.next()){var q=O.value;if(q instanceof t.Text){var A=i.createElement("span");R(A,e,q.text,r),i.appendChild(I,A)}else if(q instanceof a.Break){var L=d.renderBr(q);i.appendChild(I,L)}else q instanceof s.Drawing?i.appendChild(I,m.renderDrawing(e,q)):q instanceof u.Tab?i.appendChild(I,x.renderTab(e,q)):q instanceof c.Pict?i.appendChild(I,v.renderPict(e,q)):q instanceof w.Ruby?i.appendChild(I,b.renderRuby(e,q)):q instanceof f.InstrText?i.appendChild(I,y.renderInstrText(e,q)):q instanceof _.Sym?i.appendChild(I,h.renderSym(e,q)):q instanceof T.SoftHyphen?i.appendChild(I,C.renderSoftHyphen()):q instanceof g.NoBreakHyphen?i.appendChild(I,k.renderNoBreakHyphen()):q instanceof B.Separator?i.appendChild(I,H.renderSeparator()):console.warn("unknown child",q)}}catch(e){S={error:e}}finally{try{O&&!O.done&&(P=j.return)&&P.call(j)}finally{if(S)throw S.error}}return I},o.updateVariableText=function(e){for(var o=e.rootElement.querySelectorAll(".".concat(P)),r=0;r<o.length;r++){var n=o[r],l=n.dataset.originText||"";n.textContent=e.replaceText(l)}}}));
;/*!node_modules/ooxml-viewer/lib/render/renderNumbering.js*/
amis.define("node_modules/ooxml-viewer/lib/render/renderNumbering",(function(e,r,n,t){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var l=e("node_modules/tslib/tslib"),i=e("node_modules/ooxml-viewer/lib/util/dom"),u=e("node_modules/ooxml-viewer/lib/render/setElementStyle");function a(e){var r={M:1e3,CM:900,D:500,CD:400,C:100,XC:90,L:50,XL:40,X:10,IX:9,V:5,IV:4,I:1},n="";for(var t in r)for(;e>=r[t];)n+=t,e-=r[t];return n}function s(e,r){switch(e){case"decimal":default:return r.toString();case"lowerLetter":return String.fromCharCode(96+r);case"upperLetter":return String.fromCharCode(64+r);case"lowerRoman":return a(r).toLowerCase();case"upperRoman":return a(r).toUpperCase();case"bullet":return"&bull;"}}r.renderNumbering=function(e,r,n){var t=r.numbering,a=n.numId;if(!a)return console.warn("renderNumbering: numId is empty"),null;if(!t)return console.warn("renderNumbering: numbering is empty"),null;var o=t.nums[a];if(!o)return console.warn("renderNumbering: num is empty"),null;var m=t.abstractNums[o.abstractNumId].lvls;o.lvlOverride&&(m=l.__assign(l.__assign({},m),o.lvlOverride.lvls));var d=m[n.ilvl];if(!d)return console.warn("renderNumbering: lvl is empty"),null;var f=n.ilvl,v=t.numData[a];if(v[f])for(var c in v[f]+=1,v)parseInt(c)>parseInt(f)&&(v[c]=0);else v[f]=d.start;for(var b=i.createElement("span"),p=d.lvlText,g=parseInt(f),w=[],C=0;C<=g;C++){var _=v[C];if(_){var I=s(m[C].numFmt,_);d.isLgl&&(I=String(_)),w.push(I)}}for(C=0;C<w.length;C++){var L=w[C];p=p.replace("%".concat(C+1),L)}if(u.setElementStyle(r,e,d.pPr),u.setElementStyle(r,b,d.rPr),"bullet"!==d.numFmt||r.renderOptions.bulletUseFont)b.innerText=p;else{var S="&bull;",y=p.charCodeAt(0).toString(16).padStart(4,"0");"f06e"===y?S="&#9632;":"f075"===y?S="&#9670;":"f0d8"===y&&(S="&#9658;"),b.innerHTML=S}return"space"===d.suff?b.innerHTML+=" ":"tab"===d.suff&&(b.innerHTML+="&emsp;"),b}}));
;/*!node_modules/ooxml-viewer/lib/util/xml.js*/
amis.define("node_modules/ooxml-viewer/lib/util/xml",(function(e,i,r,n){"use strict";Object.defineProperty(i,"__esModule",{value:!0}),i.buildXML=function(e){return(new XMLSerializer).serializeToString(e)},i.parseXML=function(e){return(new DOMParser).parseFromString(e,"application/xml")}}));
;/*!node_modules/ooxml-viewer/lib/openxml/math/xsl.js*/
amis.define("node_modules/ooxml-viewer/lib/openxml/math/xsl",(function(e,t,n,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l=e("node_modules/ooxml-viewer/lib/util/xml").parseXML('\n<?xml version="1.0" encoding="UTF-8" ?>\n<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:mml="http://www.w3.org/1998/Math/MathML"\n\txmlns:m="http://schemas.openxmlformats.org/officeDocument/2006/math">\n  <xsl:output method="xml" encoding="UTF-16" />\n\n  \x3c!-- %% Global Definitions --\x3e\n\n  \x3c!-- Every single unicode character that is recognized by OMML as an operator --\x3e\n  <xsl:variable name="sOperators"\n\t\tselect="concat(\n          \'&#x00A8;&#x0021;&#x0022;&#x0023;&#x0026;&#x0028;&#x0029;&#x002B;&#x002C;&#x002D;&#x002E;&#x002F;&#x003A;\',\n          \'&#x003B;&#x003C;&#x003D;&#x003E;&#x003F;&#x0040;&#x005B;&#x005C;&#x005D;&#x005E;&#x005F;&#x0060;&#x007B;\',\n          \'&#x007C;&#x007D;&#x007E;&#x00A1;&#x00A6;&#x00AC;&#x00AF;&#x00B0;&#x00B1;&#x00B2;&#x00B3;&#x00B4;&#x00B7;&#x00B9;&#x00BF;\',\n          \'&#x00D7;&#x007E;&#x00F7;&#x02C7;&#x02D8;&#x02D9;&#x02DC;&#x02DD;&#x0300;&#x0301;&#x0302;&#x0303;&#x0304;&#x0305;&#x0306;&#x0307;&#x0308;&#x0309;\',\n          \'&#x030A;&#x030B;&#x030C;&#x030D;&#x030E;&#x030F;&#x0310;&#x0311;&#x0312;&#x0313;&#x0314;&#x0315;\',\n          \'&#x0316;&#x0317;&#x0318;&#x0319;&#x031A;&#x031B;&#x031C;&#x031D;&#x031E;&#x031F;&#x0320;&#x0321;\',\n          \'&#x0322;&#x0323;&#x0324;&#x0325;&#x0326;&#x0327;&#x0328;&#x0329;&#x032A;&#x032B;&#x032C;&#x032D;\',\n          \'&#x032E;&#x032F;&#x0330;&#x0331;&#x0332;&#x0333;&#x0334;&#x0335;&#x0336;&#x0337;&#x0338;&#x033F;\',\n          \'&#x2000;&#x2001;&#x2002;&#x2003;&#x2004;&#x2005;&#x2006;&#x2009;&#x200A;&#x2010;&#x2012;&#x2013;\',\n          \'&#x2014;&#x2016;&#x2020;&#x2021;&#x2022;&#x2024;&#x2025;&#x2026;&#x2032;&#x2033;&#x2034;&#x203C;\',\n          \'&#x2040;&#x2044;&#x204E;&#x204F;&#x2050;&#x2057;&#x2061;&#x2062;&#x2063;&#x2070;&#x2074;&#x2075;\',\n          \'&#x2076;&#x2077;&#x2078;&#x2079;&#x207A;&#x207B;&#x207C;&#x207D;&#x207E;&#x2080;&#x2081;&#x2082;\',\n          \'&#x2083;&#x2084;&#x2085;&#x2086;&#x2087;&#x2088;&#x2089;&#x208A;&#x208B;&#x208C;&#x208D;&#x208E;\',\n          \'&#x20D0;&#x20D1;&#x20D2;&#x20D3;&#x20D4;&#x20D5;&#x20D6;&#x20D7;&#x20D8;&#x20D9;&#x20DA;&#x20DB;\',\n          \'&#x20DC;&#x20DD;&#x20DE;&#x20DF;&#x20E0;&#x20E1;&#x20E4;&#x20E5;&#x20E6;&#x20E7;&#x20E8;&#x20E9;\',\n          \'&#x20EA;&#x2140;&#x2146;&#x2190;&#x2191;&#x2192;&#x2193;&#x2194;&#x2195;&#x2196;&#x2197;&#x2198;&#x2199;\',\n          \'&#x219A;&#x219B;&#x219C;&#x219D;&#x219E;&#x219F;&#x21A0;&#x21A1;&#x21A2;&#x21A3;&#x21A4;&#x21A5;\',\n          \'&#x21A6;&#x21A7;&#x21A8;&#x21A9;&#x21AA;&#x21AB;&#x21AC;&#x21AD;&#x21AE;&#x21AF;&#x21B0;&#x21B1;\',\n          \'&#x21B2;&#x21B3;&#x21B6;&#x21B7;&#x21BA;&#x21BB;&#x21BC;&#x21BD;&#x21BE;&#x21BF;&#x21C0;&#x21C1;\',\n          \'&#x21C2;&#x21C3;&#x21C4;&#x21C5;&#x21C6;&#x21C7;&#x21C8;&#x21C9;&#x21CA;&#x21CB;&#x21CC;&#x21CD;\',\n          \'&#x21CE;&#x21CF;&#x21D0;&#x21D1;&#x21D2;&#x21D3;&#x21D4;&#x21D5;&#x21D6;&#x21D7;&#x21D8;&#x21D9;\',\n          \'&#x21DA;&#x21DB;&#x21DC;&#x21DD;&#x21DE;&#x21DF;&#x21E0;&#x21E1;&#x21E2;&#x21E3;&#x21E4;&#x21E5;\',\n          \'&#x21E6;&#x21E7;&#x21E8;&#x21E9;&#x21F3;&#x21F4;&#x21F5;&#x21F6;&#x21F7;&#x21F8;&#x21F9;&#x21FA;\',\n          \'&#x21FB;&#x21FC;&#x21FD;&#x21FE;&#x21FF;&#x2200;&#x2201;&#x2202;&#x2203;&#x2204;&#x2206;&#x2207;\',\n          \'&#x2208;&#x2209;&#x220A;&#x220B;&#x220C;&#x220D;&#x220F;&#x2210;&#x2211;&#x2212;&#x2213;&#x2214;\',\n          \'&#x2215;&#x2216;&#x2217;&#x2218;&#x2219;&#x221A;&#x221B;&#x221C;&#x221D;&#x2223;&#x2224;&#x2225;\',\n          \'&#x2226;&#x2227;&#x2228;&#x2229;&#x222A;&#x222B;&#x222C;&#x222D;&#x222E;&#x222F;&#x2230;&#x2231;\',\n          \'&#x2232;&#x2233;&#x2234;&#x2235;&#x2236;&#x2237;&#x2238;&#x2239;&#x223A;&#x223B;&#x223C;&#x223D;\',\n          \'&#x223E;&#x2240;&#x2241;&#x2242;&#x2243;&#x2244;&#x2245;&#x2246;&#x2247;&#x2248;&#x2249;&#x224A;\',\n          \'&#x224B;&#x224C;&#x224D;&#x224E;&#x224F;&#x2250;&#x2251;&#x2252;&#x2253;&#x2254;&#x2255;&#x2256;\',\n          \'&#x2257;&#x2258;&#x2259;&#x225A;&#x225B;&#x225C;&#x225D;&#x225E;&#x225F;&#x2260;&#x2261;&#x2262;\',\n          \'&#x2263;&#x2264;&#x2265;&#x2266;&#x2267;&#x2268;&#x2269;&#x226A;&#x226B;&#x226C;&#x226D;&#x226E;\',\n          \'&#x226F;&#x2270;&#x2271;&#x2272;&#x2273;&#x2274;&#x2275;&#x2276;&#x2277;&#x2278;&#x2279;&#x227A;\',\n          \'&#x227B;&#x227C;&#x227D;&#x227E;&#x227F;&#x2280;&#x2281;&#x2282;&#x2283;&#x2284;&#x2285;&#x2286;\',\n          \'&#x2287;&#x2288;&#x2289;&#x228A;&#x228B;&#x228C;&#x228D;&#x228E;&#x228F;&#x2290;&#x2291;&#x2292;\',\n          \'&#x2293;&#x2294;&#x2295;&#x2296;&#x2297;&#x2298;&#x2299;&#x229A;&#x229B;&#x229C;&#x229D;&#x229E;\',\n          \'&#x229F;&#x22A0;&#x22A1;&#x22A2;&#x22A3;&#x22A5;&#x22A6;&#x22A7;&#x22A8;&#x22A9;&#x22AA;&#x22AB;\',\n          \'&#x22AC;&#x22AD;&#x22AE;&#x22AF;&#x22B0;&#x22B1;&#x22B2;&#x22B3;&#x22B4;&#x22B5;&#x22B6;&#x22B7;\',\n          \'&#x22B8;&#x22B9;&#x22BA;&#x22BB;&#x22BC;&#x22BD;&#x22C0;&#x22C1;&#x22C2;&#x22C3;&#x22C4;&#x22C5;\',\n          \'&#x22C6;&#x22C7;&#x22C8;&#x22C9;&#x22CA;&#x22CB;&#x22CC;&#x22CD;&#x22CE;&#x22CF;&#x22D0;&#x22D1;\',\n          \'&#x22D2;&#x22D3;&#x22D4;&#x22D5;&#x22D6;&#x22D7;&#x22D8;&#x22D9;&#x22DA;&#x22DB;&#x22DC;&#x22DD;\',\n          \'&#x22DE;&#x22DF;&#x22E0;&#x22E1;&#x22E2;&#x22E3;&#x22E4;&#x22E5;&#x22E6;&#x22E7;&#x22E8;&#x22E9;\',\n          \'&#x22EA;&#x22EB;&#x22EC;&#x22ED;&#x22EE;&#x22EF;&#x22F0;&#x22F1;&#x22F2;&#x22F3;&#x22F4;&#x22F5;\',\n          \'&#x22F6;&#x22F7;&#x22F8;&#x22F9;&#x22FA;&#x22FB;&#x22FC;&#x22FD;&#x22FE;&#x22FF;&#x2305;&#x2306;\',\n          \'&#x2308;&#x2309;&#x230A;&#x230B;&#x231C;&#x231D;&#x231E;&#x231F;&#x2322;&#x2323;&#x2329;&#x232A;\',\n          \'&#x233D;&#x233F;&#x23B0;&#x23B1;&#x23DC;&#x23DD;&#x23DE;&#x23DF;&#x23E0;&#x2502;&#x251C;&#x2524;\',\n          \'&#x252C;&#x2534;&#x2581;&#x2588;&#x2592;&#x25A0;&#x25A1;&#x25AD;&#x25B2;&#x25B3;&#x25B4;&#x25B5;\',\n          \'&#x25B6;&#x25B7;&#x25B8;&#x25B9;&#x25BC;&#x25BD;&#x25BE;&#x25BF;&#x25C0;&#x25C1;&#x25C2;&#x25C3;\',\n          \'&#x25C4;&#x25C5;&#x25CA;&#x25CB;&#x25E6;&#x25EB;&#x25EC;&#x25F8;&#x25F9;&#x25FA;&#x25FB;&#x25FC;\',\n          \'&#x25FD;&#x25FE;&#x25FF;&#x2605;&#x2606;&#x2772;&#x2773;&#x27D1;&#x27D2;&#x27D3;&#x27D4;&#x27D5;\',\n          \'&#x27D6;&#x27D7;&#x27D8;&#x27D9;&#x27DA;&#x27DB;&#x27DC;&#x27DD;&#x27DE;&#x27DF;&#x27E0;&#x27E1;\',\n          \'&#x27E2;&#x27E3;&#x27E4;&#x27E5;&#x27E6;&#x27E7;&#x27E8;&#x27E9;&#x27EA;&#x27EB;&#x27F0;&#x27F1;\',\n          \'&#x27F2;&#x27F3;&#x27F4;&#x27F5;&#x27F6;&#x27F7;&#x27F8;&#x27F9;&#x27FA;&#x27FB;&#x27FC;&#x27FD;\',\n          \'&#x27FE;&#x27FF;&#x2900;&#x2901;&#x2902;&#x2903;&#x2904;&#x2905;&#x2906;&#x2907;&#x2908;&#x2909;\',\n          \'&#x290A;&#x290B;&#x290C;&#x290D;&#x290E;&#x290F;&#x2910;&#x2911;&#x2912;&#x2913;&#x2914;&#x2915;\',\n          \'&#x2916;&#x2917;&#x2918;&#x2919;&#x291A;&#x291B;&#x291C;&#x291D;&#x291E;&#x291F;&#x2920;&#x2921;\',\n          \'&#x2922;&#x2923;&#x2924;&#x2925;&#x2926;&#x2927;&#x2928;&#x2929;&#x292A;&#x292B;&#x292C;&#x292D;\',\n          \'&#x292E;&#x292F;&#x2930;&#x2931;&#x2932;&#x2933;&#x2934;&#x2935;&#x2936;&#x2937;&#x2938;&#x2939;\',\n          \'&#x293A;&#x293B;&#x293C;&#x293D;&#x293E;&#x293F;&#x2940;&#x2941;&#x2942;&#x2943;&#x2944;&#x2945;\',\n          \'&#x2946;&#x2947;&#x2948;&#x2949;&#x294A;&#x294B;&#x294C;&#x294D;&#x294E;&#x294F;&#x2950;&#x2951;\',\n          \'&#x2952;&#x2953;&#x2954;&#x2955;&#x2956;&#x2957;&#x2958;&#x2959;&#x295A;&#x295B;&#x295C;&#x295D;\',\n          \'&#x295E;&#x295F;&#x2960;&#x2961;&#x2962;&#x2963;&#x2964;&#x2965;&#x2966;&#x2967;&#x2968;&#x2969;\',\n          \'&#x296A;&#x296B;&#x296C;&#x296D;&#x296E;&#x296F;&#x2970;&#x2971;&#x2972;&#x2973;&#x2974;&#x2975;\',\n          \'&#x2976;&#x2977;&#x2978;&#x2979;&#x297A;&#x297B;&#x297C;&#x297D;&#x297E;&#x297F;&#x2980;&#x2982;\',\n          \'&#x2983;&#x2984;&#x2985;&#x2986;&#x2987;&#x2988;&#x2989;&#x298A;&#x298B;&#x298C;&#x298D;&#x298E;\',\n          \'&#x298F;&#x2990;&#x2991;&#x2992;&#x2993;&#x2994;&#x2995;&#x2996;&#x2997;&#x2998;&#x2999;&#x299A;\',\n          \'&#x29B6;&#x29B7;&#x29B8;&#x29B9;&#x29C0;&#x29C1;&#x29C4;&#x29C5;&#x29C6;&#x29C7;&#x29C8;&#x29CE;\',\n          \'&#x29CF;&#x29D0;&#x29D1;&#x29D2;&#x29D3;&#x29D4;&#x29D5;&#x29D6;&#x29D7;&#x29D8;&#x29D9;&#x29DA;\',\n          \'&#x29DB;&#x29DF;&#x29E1;&#x29E2;&#x29E3;&#x29E4;&#x29E5;&#x29E6;&#x29EB;&#x29F4;&#x29F5;&#x29F6;\',\n          \'&#x29F7;&#x29F8;&#x29F9;&#x29FA;&#x29FB;&#x29FC;&#x29FD;&#x29FE;&#x29FF;&#x2A00;&#x2A01;&#x2A02;\',\n          \'&#x2A03;&#x2A04;&#x2A05;&#x2A06;&#x2A07;&#x2A08;&#x2A09;&#x2A0A;&#x2A0B;&#x2A0C;&#x2A0D;&#x2A0E;\',\n          \'&#x2A0F;&#x2A10;&#x2A11;&#x2A12;&#x2A13;&#x2A14;&#x2A15;&#x2A16;&#x2A17;&#x2A18;&#x2A19;&#x2A1A;\',\n          \'&#x2A1B;&#x2A1C;&#x2A1D;&#x2A1E;&#x2A1F;&#x2A20;&#x2A21;&#x2A22;&#x2A23;&#x2A24;&#x2A25;&#x2A26;\',\n          \'&#x2A27;&#x2A28;&#x2A29;&#x2A2A;&#x2A2B;&#x2A2C;&#x2A2D;&#x2A2E;&#x2A2F;&#x2A30;&#x2A31;&#x2A32;\',\n          \'&#x2A33;&#x2A34;&#x2A35;&#x2A36;&#x2A37;&#x2A38;&#x2A39;&#x2A3A;&#x2A3B;&#x2A3C;&#x2A3D;&#x2A3E;\',\n          \'&#x2A3F;&#x2A40;&#x2A41;&#x2A42;&#x2A43;&#x2A44;&#x2A45;&#x2A46;&#x2A47;&#x2A48;&#x2A49;&#x2A4A;\',\n          \'&#x2A4B;&#x2A4C;&#x2A4D;&#x2A4E;&#x2A4F;&#x2A50;&#x2A51;&#x2A52;&#x2A53;&#x2A54;&#x2A55;&#x2A56;\',\n          \'&#x2A57;&#x2A58;&#x2A59;&#x2A5A;&#x2A5B;&#x2A5C;&#x2A5D;&#x2A5E;&#x2A5F;&#x2A60;&#x2A61;&#x2A62;\',\n          \'&#x2A63;&#x2A64;&#x2A65;&#x2A66;&#x2A67;&#x2A68;&#x2A69;&#x2A6A;&#x2A6B;&#x2A6C;&#x2A6D;&#x2A6E;\',\n          \'&#x2A6F;&#x2A70;&#x2A71;&#x2A72;&#x2A73;&#x2A74;&#x2A75;&#x2A76;&#x2A77;&#x2A78;&#x2A79;&#x2A7A;\',\n          \'&#x2A7B;&#x2A7C;&#x2A7D;&#x2A7E;&#x2A7F;&#x2A80;&#x2A81;&#x2A82;&#x2A83;&#x2A84;&#x2A85;&#x2A86;\',\n          \'&#x2A87;&#x2A88;&#x2A89;&#x2A8A;&#x2A8B;&#x2A8C;&#x2A8D;&#x2A8E;&#x2A8F;&#x2A90;&#x2A91;&#x2A92;\',\n          \'&#x2A93;&#x2A94;&#x2A95;&#x2A96;&#x2A97;&#x2A98;&#x2A99;&#x2A9A;&#x2A9B;&#x2A9C;&#x2A9D;&#x2A9E;\',\n          \'&#x2A9F;&#x2AA0;&#x2AA1;&#x2AA2;&#x2AA3;&#x2AA4;&#x2AA5;&#x2AA6;&#x2AA7;&#x2AA8;&#x2AA9;&#x2AAA;\',\n          \'&#x2AAB;&#x2AAC;&#x2AAD;&#x2AAE;&#x2AAF;&#x2AB0;&#x2AB1;&#x2AB2;&#x2AB3;&#x2AB4;&#x2AB5;&#x2AB6;\',\n          \'&#x2AB7;&#x2AB8;&#x2AB9;&#x2ABA;&#x2ABB;&#x2ABC;&#x2ABD;&#x2ABE;&#x2ABF;&#x2AC0;&#x2AC1;&#x2AC2;\',\n          \'&#x2AC3;&#x2AC4;&#x2AC5;&#x2AC6;&#x2AC7;&#x2AC8;&#x2AC9;&#x2ACA;&#x2ACB;&#x2ACC;&#x2ACD;&#x2ACE;\',\n          \'&#x2ACF;&#x2AD0;&#x2AD1;&#x2AD2;&#x2AD3;&#x2AD4;&#x2AD5;&#x2AD6;&#x2AD7;&#x2AD8;&#x2AD9;&#x2ADA;\',\n          \'&#x2ADB;&#x2ADC;&#x2ADD;&#x2ADE;&#x2ADF;&#x2AE0;&#x2AE2;&#x2AE3;&#x2AE4;&#x2AE5;&#x2AE6;&#x2AE7;\',\n          \'&#x2AE8;&#x2AE9;&#x2AEA;&#x2AEB;&#x2AEC;&#x2AED;&#x2AEE;&#x2AEF;&#x2AF0;&#x2AF2;&#x2AF3;&#x2AF4;\',\n          \'&#x2AF5;&#x2AF6;&#x2AF7;&#x2AF8;&#x2AF9;&#x2AFA;&#x2AFB;&#x2AFC;&#x2AFD;&#x2AFE;&#x2AFF;&#x2B04;\',\n          \'&#x2B06;&#x2B07;&#x2B0C;&#x2B0D;&#x3014;&#x3015;&#x3016;&#x3017;&#x3018;&#x3019;&#xFF01;&#xFF06;\',\n          \'&#xFF08;&#xFF09;&#xFF0B;&#xFF0C;&#xFF0D;&#xFF0E;&#xFF0F;&#xFF1A;&#xFF1B;&#xFF1C;&#xFF1D;&#xFF1E;\',\n          \'&#xFF1F;&#xFF20;&#xFF3B;&#xFF3C;&#xFF3D;&#xFF3E;&#xFF3F;&#xFF5B;&#xFF5C;&#xFF5D;\')" />\n\n  \x3c!-- A string of \'-\'s repeated exactly as many times as the operators above --\x3e\n  <xsl:variable name="sMinuses">\n    <xsl:call-template name="SRepeatChar">\n      <xsl:with-param name="cchRequired" select="string-length($sOperators)" />\n      <xsl:with-param name="ch" select="\'-\'" />\n    </xsl:call-template>\n  </xsl:variable>\n\n  \x3c!-- Every single unicode character that is recognized by OMML as a number --\x3e\n  <xsl:variable name="sNumbers" select="\'0123456789\'" />\n\n  \x3c!-- A string of \'0\'s repeated exactly as many times as the list of numbers above --\x3e\n  <xsl:variable name="sZeros">\n    <xsl:call-template name="SRepeatChar">\n      <xsl:with-param name="cchRequired" select="string-length($sNumbers)" />\n      <xsl:with-param name="ch" select="\'0\'" />\n    </xsl:call-template>\n  </xsl:variable>\n\n  \x3c!-- %%Template: SReplace\n\n\t\tReplace all occurences of sOrig in sInput with sReplacement\n\t\tand return the resulting string. --\x3e\n  <xsl:template name="SReplace">\n    <xsl:param name="sInput" />\n    <xsl:param name="sOrig" />\n    <xsl:param name="sReplacement" />\n\n    <xsl:choose>\n      <xsl:when test="not(contains($sInput, $sOrig))">\n        <xsl:value-of select="$sInput" />\n      </xsl:when>\n      <xsl:otherwise>\n        <xsl:variable name="sBefore" select="substring-before($sInput, $sOrig)" />\n        <xsl:variable name="sAfter" select="substring-after($sInput, $sOrig)" />\n        <xsl:variable name="sAfterProcessed">\n          <xsl:call-template name="SReplace">\n            <xsl:with-param name="sInput" select="$sAfter" />\n            <xsl:with-param name="sOrig" select="$sOrig" />\n            <xsl:with-param name="sReplacement" select="$sReplacement" />\n          </xsl:call-template>\n        </xsl:variable>\n\n        <xsl:value-of select="concat($sBefore, concat($sReplacement, $sAfterProcessed))" />\n      </xsl:otherwise>\n    </xsl:choose>\n  </xsl:template>\n\n  \x3c!-- Templates --\x3e\n  <xsl:template match="/">\n    <mml:math>\n      <xsl:apply-templates select="*" />\n    </mml:math>\n  </xsl:template>\n\n  <xsl:template match="m:borderBox">\n\n    \x3c!-- Get Lowercase versions of properties --\x3e\n    <xsl:variable name="sLowerCaseHideTop" select="translate(m:borderBoxPr[last()]/m:hideTop[last()]/@m:val, \'ABCDEFGHIJKLMNOPQRSTUVWXYZ\',\n\t\t                                                             \'abcdefghijklmnopqrstuvwxyz\')" />\n    <xsl:variable name="sLowerCaseHideBot" select="translate(m:borderBoxPr[last()]/m:hideBot[last()]/@m:val, \'ABCDEFGHIJKLMNOPQRSTUVWXYZ\',\n\t\t                                                             \'abcdefghijklmnopqrstuvwxyz\')" />\n    <xsl:variable name="sLowerCaseHideLeft" select="translate(m:borderBoxPr[last()]/m:hideLeft[last()]/@m:val, \'ABCDEFGHIJKLMNOPQRSTUVWXYZ\',\n\t\t                                                             \'abcdefghijklmnopqrstuvwxyz\')" />\n    <xsl:variable name="sLowerCaseHideRight" select="translate(m:borderBoxPr[last()]/m:hideRight[last()]/@m:val, \'ABCDEFGHIJKLMNOPQRSTUVWXYZ\',\n\t\t                                                             \'abcdefghijklmnopqrstuvwxyz\')" />\n    <xsl:variable name="sLowerCaseStrikeH" select="translate(m:borderBoxPr[last()]/m:strikeH[last()]/@m:val, \'ABCDEFGHIJKLMNOPQRSTUVWXYZ\',\n\t\t                                                             \'abcdefghijklmnopqrstuvwxyz\')" />\n    <xsl:variable name="sLowerCaseStrikeV" select="translate(m:borderBoxPr[last()]/m:strikeV[last()]/@m:val, \'ABCDEFGHIJKLMNOPQRSTUVWXYZ\',\n\t\t                                                             \'abcdefghijklmnopqrstuvwxyz\')" />\n    <xsl:variable name="sLowerCaseStrikeBLTR" select="translate(m:borderBoxPr[last()]/m:strikeBLTR[last()]/@m:val, \'ABCDEFGHIJKLMNOPQRSTUVWXYZ\',\n\t\t                                                             \'abcdefghijklmnopqrstuvwxyz\')" />\n    <xsl:variable name="sLowerCaseStrikeTLBR" select="translate(m:borderBoxPr[last()]/m:strikeTLBR[last()]/@m:val, \'ABCDEFGHIJKLMNOPQRSTUVWXYZ\',\n\t\t                                                             \'abcdefghijklmnopqrstuvwxyz\')" />\n    <xsl:variable name="fHideTop">\n      <xsl:call-template name="ForceTrueStrVal">\n        <xsl:with-param name="str" select="$sLowerCaseHideTop" />\n      </xsl:call-template>\n    </xsl:variable>\n    <xsl:variable name="fHideBot">\n      <xsl:call-template name="ForceTrueStrVal">\n        <xsl:with-param name="str" select="$sLowerCaseHideBot" />\n      </xsl:call-template>\n    </xsl:variable>\n    <xsl:variable name="fHideLeft">\n      <xsl:call-template name="ForceTrueStrVal">\n        <xsl:with-param name="str" select="$sLowerCaseHideLeft" />\n      </xsl:call-template>\n    </xsl:variable>\n    <xsl:variable name="fHideRight">\n      <xsl:call-template name="ForceTrueStrVal">\n        <xsl:with-param name="str" select="$sLowerCaseHideRight" />\n      </xsl:call-template>\n    </xsl:variable>\n    <xsl:variable name="fStrikeH">\n      <xsl:call-template name="ForceTrueStrVal">\n        <xsl:with-param name="str" select="$sLowerCaseStrikeH" />\n      </xsl:call-template>\n    </xsl:variable>\n    <xsl:variable name="fStrikeV">\n      <xsl:call-template name="ForceTrueStrVal">\n        <xsl:with-param name="str" select="$sLowerCaseStrikeV" />\n      </xsl:call-template>\n    </xsl:variable>\n    <xsl:variable name="fStrikeBLTR">\n      <xsl:call-template name="ForceTrueStrVal">\n        <xsl:with-param name="str" select="$sLowerCaseStrikeBLTR" />\n      </xsl:call-template>\n    </xsl:variable>\n    <xsl:variable name="fStrikeTLBR">\n      <xsl:call-template name="ForceTrueStrVal">\n        <xsl:with-param name="str" select="$sLowerCaseStrikeTLBR" />\n      </xsl:call-template>\n    </xsl:variable>\n\n    <xsl:choose>\n      <xsl:when test="$fHideTop=1\n                      and $fHideBot=1\n                      and $fHideLeft=1\n                      and $fHideRight=1\n                      and $fStrikeH=0\n                      and $fStrikeV=0\n                      and $fStrikeBLTR=0\n                      and $fStrikeTLBR=0">\n        <mml:mrow>\n          <xsl:apply-templates select="m:e[1]" />\n        </mml:mrow>\n      </xsl:when>\n      <xsl:otherwise>\n        <mml:menclose>\n          <xsl:call-template name="CreateMencloseNotationAttrFromBorderBoxAttr">\n            <xsl:with-param name="fHideTop" select="$fHideTop" />\n            <xsl:with-param name="fHideBot" select="$fHideBot" />\n            <xsl:with-param name="fHideLeft" select="$fHideLeft" />\n            <xsl:with-param name="fHideRight" select="$fHideRight" />\n            <xsl:with-param name="fStrikeH" select="$fStrikeH" />\n            <xsl:with-param name="fStrikeV" select="$fStrikeV" />\n            <xsl:with-param name="fStrikeBLTR" select="$fStrikeBLTR" />\n            <xsl:with-param name="fStrikeTLBR" select="$fStrikeTLBR" />\n          </xsl:call-template>\n          <xsl:apply-templates select="m:e[1]" />\n        </mml:menclose>\n      </xsl:otherwise>\n    </xsl:choose>\n  </xsl:template>\n\n  <xsl:template match="*">\n    <xsl:apply-templates select="*" />\n  </xsl:template>\n\n  \x3c!--\n      { Non-combining, Upper-combining, Lower-combining }\n      {U+02D8, U+0306, U+032E}, // BREVE\n      {U+00B8, U+0312, U+0327}, // CEDILLA\n      {U+0060, U+0300, U+0316}, // GRAVE ACCENT\n      {U+002D, U+0305, U+0332}, // HYPHEN-MINUS/OVERLINE\n      {U+2212, U+0305, U+0332}, // MINUS SIGN/OVERLINE\n      {U+002E, U+0305, U+0323}, // FULL STOP/DOT ABOVE\n      {U+02D9, U+0307, U+0323}, // DOT ABOVE\n      {U+02DD, U+030B, U+02DD}, // DOUBLE ACUTE ACCENT\n      {U+00B4, U+0301, U+0317}, // ACUTE ACCENT\n      {U+007E, U+0303, U+0330}, // TILDE\n      {U+02DC, U+0303, U+0330}, // SMALL TILDE\n      {U+00A8, U+0308, U+0324}, // DIAERESIS\n      {U+02C7, U+030C, U+032C}, // CARON\n      {U+005E, U+0302, U+032D}, // CIRCUMFLEX ACCENT\n      {U+00AF, U+0305, ::::::}, // MACRON\n      {U+005F, ::::::, U+0332}, // LOW LINE\n      {U+2192, U+20D7, U+20EF}, // RIGHTWARDS ARROW\n      {U+27F6, U+20D7, U+20EF}, // LONG RIGHTWARDS ARROW\n      {U+2190, U+20D6, U+20EE}, // LEFT ARROW\n  --\x3e\n  <xsl:template name="ToNonCombining">\n    <xsl:param name="ch" />\n    <xsl:choose>\n      \x3c!-- BREVE --\x3e\n      <xsl:when test="$ch=\'&#x0306;\' or $ch=\'&#x032e;\'">&#x02D8;</xsl:when>\n      \x3c!-- CEDILLA --\x3e\n      <xsl:when test="$ch=\'&#x0312;\' or $ch=\'&#x0327;\'">&#x00B8;</xsl:when>\n      \x3c!-- GRAVE ACCENT --\x3e\n      <xsl:when test="$ch=\'&#x0300;\' or $ch=\'&#x0316;\'">&#x0060;</xsl:when>\n      \x3c!-- HYPHEN-MINUS/OVERLINE --\x3e\n      <xsl:when test="$ch=\'&#x0305;\' or $ch=\'&#x0332;\'">&#x002D;</xsl:when>\n      \x3c!-- MINUS SIGN/OVERLINE --\x3e\n      <xsl:when test="$ch=\'&#x0305;\' or $ch=\'&#x0332;\'">&#x2212;</xsl:when>\n      \x3c!-- FULL STOP/DOT ABOVE --\x3e\n      <xsl:when test="$ch=\'&#x0305;\' or $ch=\'&#x0323;\'">&#x002E;</xsl:when>\n      \x3c!-- DOT ABOVE --\x3e\n      <xsl:when test="$ch=\'&#x0307;\' or $ch=\'&#x0323;\'">&#x02D9;</xsl:when>\n      \x3c!-- DOUBLE ACUTE ACCENT --\x3e\n      <xsl:when test="$ch=\'&#x030B;\' or $ch=\'&#x02DD;\'">&#x02DD;</xsl:when>\n      \x3c!-- ACUTE ACCENT --\x3e\n      <xsl:when test="$ch=\'&#x0301;\' or $ch=\'&#x0317;\'">&#x00B4;</xsl:when>\n      \x3c!-- TILDE --\x3e\n      <xsl:when test="$ch=\'&#x0303;\' or $ch=\'&#x0330;\'">&#x007E;</xsl:when>\n      \x3c!-- SMALL TILDE --\x3e\n      <xsl:when test="$ch=\'&#x0303;\' or $ch=\'&#x0330;\'">&#x02DC;</xsl:when>\n      \x3c!-- DIAERESIS --\x3e\n      <xsl:when test="$ch=\'&#x0308;\' or $ch=\'&#x0324;\'">&#x00A8;</xsl:when>\n      \x3c!-- CARON --\x3e\n      <xsl:when test="$ch=\'&#x030C;\' or $ch=\'&#x032C;\'">&#x02C7;</xsl:when>\n      \x3c!-- CIRCUMFLEX ACCENT --\x3e\n      <xsl:when test="$ch=\'&#x0302;\' or $ch=\'&#x032D;\'">&#x005E;</xsl:when>\n      \x3c!-- MACRON --\x3e\n      <xsl:when test="$ch=\'&#x0305;\'                   ">&#x00AF;</xsl:when>\n      \x3c!-- LOW LINE --\x3e\n      <xsl:when test="                   $ch=\'&#x0332;\'">&#x005F;</xsl:when>\n      \x3c!-- RIGHTWARDS ARROW --\x3e\n      <xsl:when test="$ch=\'&#x20D7;\' or $ch=\'&#x20EF;\'">&#x2192;</xsl:when>\n      \x3c!-- LONG RIGHTWARDS ARROW --\x3e\n      <xsl:when test="$ch=\'&#x20D7;\' or $ch=\'&#x20EF;\'">&#x27F6;</xsl:when>\n      \x3c!-- LEFT ARROW --\x3e\n      <xsl:when test="$ch=\'&#x20D6;\' or $ch=\'&#x20EE;\'">&#x2190;</xsl:when>\n      <xsl:otherwise>\n        <xsl:value-of select="$ch"/>\n      </xsl:otherwise>\n    </xsl:choose>\n  </xsl:template>\n\n  <xsl:template match="m:acc">\n    <mml:mover>\n      <xsl:attribute name="accent">true</xsl:attribute>\n      <mml:mrow>\n        <xsl:apply-templates select="m:e[1]" />\n      </mml:mrow>\n      <xsl:variable name="chAcc">\n        <xsl:choose>\n          <xsl:when test="not(m:accPr[last()]/m:chr)">\n            <xsl:value-of select="\'&#x0302;\'" />\n          </xsl:when>\n          <xsl:otherwise>\n            <xsl:value-of select="substring(m:accPr/m:chr/@m:val,1,1)" />\n          </xsl:otherwise>\n        </xsl:choose>\n      </xsl:variable>\n      <xsl:variable name="chNonComb">\n        <xsl:call-template name="ToNonCombining">\n          <xsl:with-param name="ch" select="$chAcc" />\n        </xsl:call-template>\n      </xsl:variable>\n      <xsl:choose>\n        <xsl:when test="string-length($chAcc)=0">\n          <mml:mo/>\n        </xsl:when>\n        <xsl:otherwise>\n          <xsl:call-template name="ParseMt">\n            <xsl:with-param name="sToParse" select="$chNonComb" />\n            <xsl:with-param name="scr" select="m:e[1]/*/m:rPr[last()]/m:scr/@m:val" />\n            <xsl:with-param name="sty" select="m:e[1]/*/m:rPr[last()]/m:sty/@m:val" />\n            <xsl:with-param name="nor">\n              <xsl:choose>\n                <xsl:when test="count(m:e[1]/*/m:rPr[last()]/m:nor) = 0">0</xsl:when>\n                <xsl:otherwise>\n                  <xsl:call-template name="ForceFalseStrVal">\n                    <xsl:with-param name="str" select="translate(m:e[1]/*/m:rPr[last()]/m:nor/@m:val,\n                                                                     \'ABCDEFGHIJKLMNOPQRSTUVWXYZ\',\n\t\t                                                                 \'abcdefghijklmnopqrstuvwxyz\')" />\n                  </xsl:call-template>\n                </xsl:otherwise>\n              </xsl:choose>\n            </xsl:with-param>\n          </xsl:call-template>\n        </xsl:otherwise>\n      </xsl:choose>\n    </mml:mover>\n  </xsl:template>\n\n  <xsl:template name="OutputScript">\n    <xsl:param name="ndCur" select="." />\n    <xsl:choose>\n      \x3c!-- Only output contents of $ndCur if $ndCur exists\n           and $ndCur has children --\x3e\n      <xsl:when test="count($ndCur/*) &gt; 0">\n        <mml:mrow>\n          <xsl:apply-templates select="$ndCur" />\n        </mml:mrow>\n      </xsl:when>\n      <xsl:otherwise>\n        <mml:none />\n      </xsl:otherwise>\n    </xsl:choose>\n  </xsl:template>\n\n  <xsl:template match="m:sPre">\n    <mml:mmultiscripts>\n      <mml:mrow>\n        <xsl:apply-templates select="m:e[1]" />\n      </mml:mrow>\n      <mml:mprescripts />\n      <xsl:call-template name="OutputScript">\n        <xsl:with-param name="ndCur" select="m:sub[1]"/>\n      </xsl:call-template>\n      <xsl:call-template name="OutputScript">\n        <xsl:with-param name="ndCur" select="m:sup[1]" />\n      </xsl:call-template>\n    </mml:mmultiscripts>\n  </xsl:template>\n\n  <xsl:template match="m:m">\n    <mml:mtable>\n      <xsl:call-template name="CreateMathMLMatrixAttr">\n        <xsl:with-param name="mcJc" select="m:mPr[last()]/m:mcs/m:mc/m:mcPr[last()]/m:mcJc/@m:val" />\n      </xsl:call-template>\n      <xsl:for-each select="m:mr">\n        <mml:mtr>\n          <xsl:for-each select="m:e">\n            <mml:mtd>\n              <xsl:apply-templates select="." />\n            </mml:mtd>\n          </xsl:for-each>\n        </mml:mtr>\n      </xsl:for-each>\n    </mml:mtable>\n  </xsl:template>\n\n  <xsl:template name="CreateMathMLMatrixAttr">\n    <xsl:param name="mcJc" />\n    <xsl:variable name="sLowerCaseMcjc" select="translate($mcJc, \'ABCDEFGHIJKLMNOPQRSTUVWXYZ\',\n\t\t                                                             \'abcdefghijklmnopqrstuvwxyz\')" />\n    <xsl:choose>\n      <xsl:when test="$sLowerCaseMcjc=\'left\'">\n        <xsl:attribute name="columnalign">left</xsl:attribute>\n      </xsl:when>\n      <xsl:when test="$sLowerCaseMcjc=\'right\'">\n        <xsl:attribute name="columnalign">right</xsl:attribute>\n      </xsl:when>\n    </xsl:choose>\n  </xsl:template>\n\n  <xsl:template match="m:phant">\n    <xsl:variable name="sLowerCaseZeroWidVal" select="translate(m:phantPr[last()]/m:zeroWid[last()]/@m:val,\n\t\t                                                       \'ABCDEFGHIJKLMNOPQRSTUVWXYZ\',\n\t\t                                                       \'abcdefghijklmnopqrstuvwxyz\')" />\n    <xsl:variable name="sLowerCaseZeroAscVal" select="translate(m:phantPr[last()]/m:zeroAsc[last()]/@m:val,\n\t\t                                                     \'ABCDEFGHIJKLMNOPQRSTUVWXYZ\',\n\t\t                                                     \'abcdefghijklmnopqrstuvwxyz\')" />\n    <xsl:variable name="sLowerCaseZeroDescVal" select="translate(m:phantPr[last()]/m:zeroDesc[last()]/@m:val,\n\t\t                                                     \'ABCDEFGHIJKLMNOPQRSTUVWXYZ\',\n\t\t                                                     \'abcdefghijklmnopqrstuvwxyz\')" />\n    <xsl:variable name="sLowerCaseShowVal" select="translate(m:phantPr[last()]/m:show[last()]/@m:val,\n\t\t                                                     \'ABCDEFGHIJKLMNOPQRSTUVWXYZ\',\n\t\t                                                     \'abcdefghijklmnopqrstuvwxyz\')" />\n\n\n    \x3c!-- The following properties default to \'yes\' unless the last value equals \'no\' or there isn\'t any node for\n         the property --\x3e\n\n    <xsl:variable name="fZeroWid">\n      <xsl:choose>\n        <xsl:when test="count(m:phantPr[last()]/m:zeroWid[last()]) = 0">0</xsl:when>\n        <xsl:otherwise>\n          <xsl:call-template name="ForceFalseStrVal">\n            <xsl:with-param name="str" select="$sLowerCaseZeroWidVal" />\n          </xsl:call-template>\n        </xsl:otherwise>\n      </xsl:choose>\n    </xsl:variable>\n    <xsl:variable name="fZeroAsc">\n      <xsl:choose>\n        <xsl:when test="count(m:phantPr[last()]/m:zeroAsc[last()]) = 0">0</xsl:when>\n        <xsl:otherwise>\n          <xsl:call-template name="ForceFalseStrVal">\n            <xsl:with-param name="str" select="$sLowerCaseZeroAscVal" />\n          </xsl:call-template>\n        </xsl:otherwise>\n      </xsl:choose>\n    </xsl:variable>\n    <xsl:variable name="fZeroDesc">\n      <xsl:choose>\n        <xsl:when test="count(m:phantPr[last()]/m:zeroDesc[last()]) = 0">0</xsl:when>\n        <xsl:otherwise>\n          <xsl:call-template name="ForceFalseStrVal">\n            <xsl:with-param name="str" select="$sLowerCaseZeroDescVal" />\n          </xsl:call-template>\n        </xsl:otherwise>\n      </xsl:choose>\n    </xsl:variable>\n\n    \x3c!-- The show property defaults to \'on\' unless there exists a show property and its value is \'off\' --\x3e\n\n    <xsl:variable name="fShow">\n      <xsl:call-template name="ForceFalseStrVal">\n        <xsl:with-param name="str" select="$sLowerCaseShowVal" />\n      </xsl:call-template>\n    </xsl:variable>\n\n    <xsl:choose>\n      \x3c!-- Show the phantom contents, therefore, just use mpadded. --\x3e\n      <xsl:when test="$fShow = 1">\n        <xsl:element name="mml:mpadded">\n          <xsl:call-template name="CreateMpaddedAttributes">\n            <xsl:with-param name="fZeroWid" select="$fZeroWid" />\n            <xsl:with-param name="fZeroAsc" select="$fZeroAsc" />\n            <xsl:with-param name="fZeroDesc" select="$fZeroDesc" />\n          </xsl:call-template>\n          <mml:mrow>\n            <xsl:apply-templates select="m:e" />\n          </mml:mrow>\n        </xsl:element>\n      </xsl:when>\n      \x3c!-- Don\'t show phantom contents, but don\'t smash anything, therefore, just\n           use mphantom --\x3e\n      <xsl:when test="$fZeroWid=0 and $fZeroAsc=0 and $fZeroDesc=0">\n        <xsl:element name="mml:mphantom">\n          <mml:mrow>\n            <xsl:apply-templates select="m:e" />\n          </mml:mrow>\n        </xsl:element>\n      </xsl:when>\n      \x3c!-- Combination --\x3e\n      <xsl:otherwise>\n        <xsl:element name="mml:mphantom">\n          <xsl:element name="mml:mpadded">\n            <xsl:call-template name="CreateMpaddedAttributes">\n              <xsl:with-param name="fZeroWid" select="$fZeroWid" />\n              <xsl:with-param name="fZeroAsc" select="$fZeroAsc" />\n              <xsl:with-param name="fZeroDesc" select="$fZeroDesc" />\n            </xsl:call-template>\n            <mml:mrow>\n              <xsl:apply-templates select="m:e" />\n            </mml:mrow>\n          </xsl:element>\n        </xsl:element>\n      </xsl:otherwise>\n    </xsl:choose>\n  </xsl:template>\n\n  <xsl:template name="CreateMpaddedAttributes">\n    <xsl:param name="fZeroWid" />\n    <xsl:param name="fZeroAsc" />\n    <xsl:param name="fZeroDesc" />\n\n    <xsl:if test="$fZeroWid=1">\n      <xsl:attribute name="width">0in</xsl:attribute>\n    </xsl:if>\n    <xsl:if test="$fZeroAsc=1">\n      <xsl:attribute name="height">0in</xsl:attribute>\n    </xsl:if>\n    <xsl:if test="$fZeroDesc=1">\n      <xsl:attribute name="depth">0in</xsl:attribute>\n    </xsl:if>\n  </xsl:template>\n\n\n\n  <xsl:template match="m:rad">\n    <xsl:variable name="fDegHide">\n      <xsl:choose>\n        <xsl:when test="count(m:radPr[last()]/m:degHide)=0">0</xsl:when>\n        <xsl:otherwise>\n          <xsl:call-template name="ForceFalseStrVal">\n            <xsl:with-param name="str" select="translate(m:radPr[last()]/m:degHide/@m:val,\n\t\t                                                          \'ABCDEFGHIJKLMNOPQRSTUVWXYZ\',\n\t\t                                                          \'abcdefghijklmnopqrstuvwxyz\')" />\n          </xsl:call-template>\n        </xsl:otherwise>\n      </xsl:choose>\n    </xsl:variable>\n    <xsl:choose>\n      <xsl:when test="$fDegHide=1">\n        <mml:msqrt>\n          <xsl:apply-templates select="m:e[1]" />\n        </mml:msqrt>\n      </xsl:when>\n      <xsl:otherwise>\n        <mml:mroot>\n          <mml:mrow>\n            <xsl:apply-templates select="m:e[1]" />\n          </mml:mrow>\n          <mml:mrow>\n            <xsl:apply-templates select="m:deg[1]" />\n          </mml:mrow>\n        </mml:mroot>\n      </xsl:otherwise>\n    </xsl:choose>\n  </xsl:template>\n\n  <xsl:template name="OutputNaryMo">\n    <xsl:param name="ndCur" select="." />\n    <xsl:param name="fGrow" select="0" />\n    <mml:mo>\n      <xsl:choose>\n        <xsl:when test="$fGrow=1">\n          <xsl:attribute name="stretchy">true</xsl:attribute>\n        </xsl:when>\n        <xsl:otherwise>\n          <xsl:attribute name="stretchy">false</xsl:attribute>\n        </xsl:otherwise>\n      </xsl:choose>\n      <xsl:choose>\n        <xsl:when test="not($ndCur/m:naryPr[last()]/m:chr/@m:val) or\n\t\t\t                            $ndCur/m:naryPr[last()]/m:chr/@m:val=\'\'">\n          <xsl:text>&#x222b;</xsl:text>\n        </xsl:when>\n        <xsl:otherwise>\n          <xsl:value-of select="$ndCur/m:naryPr[last()]/m:chr/@m:val" />\n        </xsl:otherwise>\n      </xsl:choose>\n    </mml:mo>\n  </xsl:template>\n\n  \x3c!-- %%Template match m:nary\n\t\tProcess an n-ary.\n\n\t\tDecides, based on which arguments are supplied, between\n\t\tusing an mo, msup, msub, or msubsup for the n-ary operator\n\t--\x3e\n  <xsl:template match="m:nary">\n    <xsl:variable name="sLowerCaseSubHide">\n      <xsl:choose>\n        <xsl:when test="count(m:naryPr[last()]/m:subHide) = 0">\n          <xsl:text>off</xsl:text>\n        </xsl:when>\n        <xsl:otherwise>\n          <xsl:value-of select="translate(m:naryPr[last()]/m:subHide/@m:val,\n\t                                  \'ABCDEFGHIJKLMNOPQRSTUVWXYZ\',\n\t                                  \'abcdefghijklmnopqrstuvwxyz\')" />\n        </xsl:otherwise>\n      </xsl:choose>\n    </xsl:variable>\n\n    <xsl:variable name="sLowerCaseSupHide">\n      <xsl:choose>\n        <xsl:when test="count(m:naryPr[last()]/m:supHide) = 0">\n          <xsl:text>off</xsl:text>\n        </xsl:when>\n        <xsl:otherwise>\n          <xsl:value-of select="translate(m:naryPr[last()]/m:supHide/@m:val,\n\t                                  \'ABCDEFGHIJKLMNOPQRSTUVWXYZ\',\n\t                                  \'abcdefghijklmnopqrstuvwxyz\')" />\n        </xsl:otherwise>\n      </xsl:choose>\n    </xsl:variable>\n\n    <xsl:variable name="sLowerCaseLimLoc">\n      <xsl:value-of select="translate(m:naryPr[last()]/m:limLoc/@m:val,\n\t                                  \'ABCDEFGHIJKLMNOPQRSTUVWXYZ\',\n\t                                  \'abcdefghijklmnopqrstuvwxyz\')" />\n    </xsl:variable>\n\n    <xsl:variable name="sLowerGrow">\n      <xsl:choose>\n        <xsl:when test="count(m:naryPr[last()]/m:grow)=0">off</xsl:when>\n        <xsl:otherwise>\n          <xsl:value-of select="translate(m:naryPr[last()]/m:grow/@m:val,\n\t                                  \'ABCDEFGHIJKLMNOPQRSTUVWXYZ\',\n\t                                  \'abcdefghijklmnopqrstuvwxyz\')" />\n        </xsl:otherwise>\n      </xsl:choose>\n    </xsl:variable>\n\n    <xsl:variable name="fLimLocSubSup">\n      <xsl:choose>\n        <xsl:when test="count(m:naryPr[last()]/m:limLoc)=0 or $sLowerCaseLimLoc=\'subsup\'">1</xsl:when>\n        <xsl:otherwise>0</xsl:otherwise>\n      </xsl:choose>\n    </xsl:variable>\n\n    <xsl:variable name="fGrow">\n      <xsl:call-template name="ForceFalseStrVal">\n        <xsl:with-param name="str" select="$sLowerGrow" />\n      </xsl:call-template>\n    </xsl:variable>\n\n    <xsl:variable name="fSupHide">\n      <xsl:call-template name="ForceFalseStrVal">\n        <xsl:with-param name="str" select="$sLowerCaseSupHide" />\n      </xsl:call-template>\n    </xsl:variable>\n\n    <xsl:variable name="fSubHide">\n      <xsl:call-template name="ForceFalseStrVal">\n        <xsl:with-param name="str" select="$sLowerCaseSubHide" />\n      </xsl:call-template>\n    </xsl:variable>\n\n    <mml:mrow>\n      <xsl:choose>\n        <xsl:when test="$fSupHide=1 and $fSubHide=1">\n          <xsl:call-template name="OutputNaryMo">\n            <xsl:with-param name="ndCur" select="." />\n            <xsl:with-param name="fGrow" select="$fGrow" />\n          </xsl:call-template>\n        </xsl:when>\n        <xsl:when test="$fSubHide=1">\n          <xsl:choose>\n            <xsl:when test="$fLimLocSubSup=1">\n              <mml:msup>\n                <xsl:call-template name="OutputNaryMo">\n                  <xsl:with-param name="ndCur" select="." />\n                  <xsl:with-param name="fGrow" select="$fGrow" />\n                </xsl:call-template>\n                <mml:mrow>\n                  <xsl:apply-templates select="m:sup[1]" />\n                </mml:mrow>\n              </mml:msup>\n            </xsl:when>\n            <xsl:otherwise>\n              <mml:mover>\n                <xsl:call-template name="OutputNaryMo">\n                  <xsl:with-param name="ndCur" select="." />\n                  <xsl:with-param name="fGrow" select="$fGrow" />\n                </xsl:call-template>\n                <mml:mrow>\n                  <xsl:apply-templates select="m:sup[1]" />\n                </mml:mrow>\n              </mml:mover>\n            </xsl:otherwise>\n          </xsl:choose>\n        </xsl:when>\n        <xsl:when test="$fSupHide=1">\n          <xsl:choose>\n            <xsl:when test="$fLimLocSubSup=1">\n              <mml:msub>\n                <xsl:call-template name="OutputNaryMo">\n                  <xsl:with-param name="ndCur" select="." />\n                  <xsl:with-param name="fGrow" select="$fGrow" />\n                </xsl:call-template>\n                <mml:mrow>\n                  <xsl:apply-templates select="m:sub[1]" />\n                </mml:mrow>\n              </mml:msub>\n            </xsl:when>\n            <xsl:otherwise>\n              <mml:munder>\n                <xsl:call-template name="OutputNaryMo">\n                  <xsl:with-param name="ndCur" select="." />\n                  <xsl:with-param name="fGrow" select="$fGrow" />\n                </xsl:call-template>\n                <mml:mrow>\n                  <xsl:apply-templates select="m:sub[1]" />\n                </mml:mrow>\n              </mml:munder>\n            </xsl:otherwise>\n          </xsl:choose>\n        </xsl:when>\n        <xsl:otherwise>\n          <xsl:choose>\n            <xsl:when test="$fLimLocSubSup=1">\n              <mml:msubsup>\n                <xsl:call-template name="OutputNaryMo">\n                  <xsl:with-param name="ndCur" select="." />\n                  <xsl:with-param name="fGrow" select="$fGrow" />\n                </xsl:call-template>\n                <mml:mrow>\n                  <xsl:apply-templates select="m:sub[1]" />\n                </mml:mrow>\n                <mml:mrow>\n                  <xsl:apply-templates select="m:sup[1]" />\n                </mml:mrow>\n              </mml:msubsup>\n            </xsl:when>\n            <xsl:otherwise>\n              <mml:munderover>\n                <xsl:call-template name="OutputNaryMo">\n                  <xsl:with-param name="ndCur" select="." />\n                  <xsl:with-param name="fGrow" select="$fGrow" />\n                </xsl:call-template>\n                <mml:mrow>\n                  <xsl:apply-templates select="m:sub[1]" />\n                </mml:mrow>\n                <mml:mrow>\n                  <xsl:apply-templates select="m:sup[1]" />\n                </mml:mrow>\n              </mml:munderover>\n            </xsl:otherwise>\n          </xsl:choose>\n        </xsl:otherwise>\n      </xsl:choose>\n      <mml:mrow>\n        <xsl:apply-templates select="m:e[1]" />\n      </mml:mrow>\n    </mml:mrow>\n  </xsl:template>\n\n  <xsl:template match="m:limLow">\n    <mml:munder>\n      <mml:mrow>\n        <xsl:apply-templates select="m:e[1]" />\n      </mml:mrow>\n      <mml:mrow>\n        <xsl:apply-templates select="m:lim[1]" />\n      </mml:mrow>\n    </mml:munder>\n  </xsl:template>\n\n  <xsl:template match="m:limUpp">\n    <mml:mover>\n      <mml:mrow>\n        <xsl:apply-templates select="m:e[1]" />\n      </mml:mrow>\n      <mml:mrow>\n        <xsl:apply-templates select="m:lim[1]" />\n      </mml:mrow>\n    </mml:mover>\n  </xsl:template>\n\n  <xsl:template match="m:sSub">\n    <mml:msub>\n      <mml:mrow>\n        <xsl:apply-templates select="m:e[1]" />\n      </mml:mrow>\n      <mml:mrow>\n        <xsl:apply-templates select="m:sub[1]" />\n      </mml:mrow>\n    </mml:msub>\n  </xsl:template>\n\n  <xsl:template match="m:sSup">\n    <mml:msup>\n      <mml:mrow>\n        <xsl:apply-templates select="m:e[1]" />\n      </mml:mrow>\n      <mml:mrow>\n        <xsl:apply-templates select="m:sup[1]" />\n      </mml:mrow>\n    </mml:msup>\n  </xsl:template>\n\n  <xsl:template match="m:sSubSup">\n    <mml:msubsup>\n      <mml:mrow>\n        <xsl:apply-templates select="m:e[1]" />\n      </mml:mrow>\n      <mml:mrow>\n        <xsl:apply-templates select="m:sub[1]" />\n      </mml:mrow>\n      <mml:mrow>\n        <xsl:apply-templates select="m:sup[1]" />\n      </mml:mrow>\n    </mml:msubsup>\n  </xsl:template>\n\n  <xsl:template match="m:groupChr">\n    <xsl:variable name="ndLastGroupChrPr" select="m:groupChrPr[last()]" />\n    <xsl:variable name="sLowerCasePos" select="translate($ndLastGroupChrPr/m:pos/@m:val,\n\t\t                                                     \'ABCDEFGHIJKLMNOPQRSTUVWXYZ\',\n\t\t                                                     \'abcdefghijklmnopqrstuvwxyz\')" />\n\n    <xsl:variable name="sLowerCaseVertJc" select="translate($ndLastGroupChrPr/m:vertJc/@m:val,\n\t\t                                                     \'ABCDEFGHIJKLMNOPQRSTUVWXYZ\',\n\t\t                                                     \'abcdefghijklmnopqrstuvwxyz\')" />\n    <xsl:variable name="ndLastChr" select="$ndLastGroupChrPr/m:chr" />\n\n    <xsl:variable name="chr">\n      <xsl:choose>\n        <xsl:when test="$ndLastChr and (not($ndLastChr/@m:val) or string-length($ndLastChr/@m:val) = 0)"></xsl:when>\n        <xsl:when test="string-length($ndLastChr/@m:val) &gt;= 1">\n          <xsl:value-of select="substring($ndLastChr/@m:val,1,1)" />\n        </xsl:when>\n        <xsl:otherwise>\n          <xsl:text>&#x023DF;</xsl:text>\n        </xsl:otherwise>\n      </xsl:choose>\n    </xsl:variable>\n    <xsl:choose>\n      <xsl:when test="$sLowerCasePos = \'top\'">\n        <xsl:choose>\n          <xsl:when test="$sLowerCaseVertJc = \'bot\'">\n            <mml:mover accent="false">\n              <mml:mrow>\n                <xsl:apply-templates select="m:e[1]" />\n              </mml:mrow>\n              <mml:mo>\n                <xsl:value-of select="$chr" />\n              </mml:mo>\n            </mml:mover>\n          </xsl:when>\n          <xsl:otherwise>\n            <mml:munder accentunder="false">\n              <mml:mo>\n                <xsl:value-of select="$chr" />\n              </mml:mo>\n              <mml:mrow>\n                <xsl:apply-templates select="m:e[1]" />\n              </mml:mrow>\n            </mml:munder>\n          </xsl:otherwise>\n        </xsl:choose>\n      </xsl:when>\n      <xsl:otherwise>\n        <xsl:choose>\n          <xsl:when test="$sLowerCaseVertJc = \'bot\'">\n            <mml:mover accent="false">\n              <mml:mo>\n                <xsl:value-of select="$chr" />\n              </mml:mo>\n              <mml:mrow>\n                <xsl:apply-templates select="m:e[1]" />\n              </mml:mrow>\n            </mml:mover>\n          </xsl:when>\n          <xsl:otherwise>\n            <mml:munder accentunder="false">\n              <mml:mrow>\n                <xsl:apply-templates select="m:e[1]" />\n              </mml:mrow>\n              <mml:mo>\n                <xsl:value-of select="$chr" />\n              </mml:mo>\n            </mml:munder>\n          </xsl:otherwise>\n        </xsl:choose>\n      </xsl:otherwise>\n    </xsl:choose>\n  </xsl:template>\n\n  <xsl:template name="fName">\n    <xsl:for-each select="m:fName/*">\n      <xsl:apply-templates select="." />\n    </xsl:for-each>\n  </xsl:template>\n\n  <xsl:template match="m:func">\n    <mml:mrow>\n      <mml:mrow>\n        <xsl:call-template name="fName" />\n      </mml:mrow>\n      <mml:mo>&#x02061;</mml:mo>\n      <mml:mrow>\n        <xsl:apply-templates select="m:e" />\n      </mml:mrow>\n    </mml:mrow>\n  </xsl:template>\n\n  \x3c!-- %%Template: match m:f\n\n\t\tm:f maps directly to mfrac.\n\t--\x3e\n  <xsl:template match="m:f">\n    <xsl:variable name="sLowerCaseType" select="translate(m:fPr[last()]/m:type/@m:val, \'ABCDEFGHIJKLMNOPQRSTUVWXYZ\', \'abcdefghijklmnopqrstuvwxyz\')" />\n    <xsl:choose>\n      <xsl:when test="$sLowerCaseType=\'lin\'">\n        <mml:mrow>\n          <mml:mrow>\n            <xsl:apply-templates select="m:num[1]" />\n          </mml:mrow>\n          <mml:mo>/</mml:mo>\n          <mml:mrow>\n            <xsl:apply-templates select="m:den[1]" />\n          </mml:mrow>\n        </mml:mrow>\n      </xsl:when>\n      <xsl:otherwise>\n        <mml:mfrac>\n          <xsl:call-template name="CreateMathMLFracProp">\n            <xsl:with-param name="type" select="$sLowerCaseType" />\n          </xsl:call-template>\n          <mml:mrow>\n            <xsl:apply-templates select="m:num[1]" />\n          </mml:mrow>\n          <mml:mrow>\n            <xsl:apply-templates select="m:den[1]" />\n          </mml:mrow>\n        </mml:mfrac>\n      </xsl:otherwise>\n    </xsl:choose>\n\n  </xsl:template>\n\n\n  \x3c!-- %%Template: CreateMathMLFracProp\n\n\t\t\tMake fraction properties based on supplied parameters.\n\t\t\tOMML differentiates between a linear fraction and a skewed\n\t\t\tone. For MathML, we write both as bevelled.\n\t--\x3e\n  <xsl:template name="CreateMathMLFracProp">\n    <xsl:param name="type" />\n    <xsl:variable name="sLowerCaseType" select="translate($type, \'ABCDEFGHIJKLMNOPQRSTUVWXYZ\', \'abcdefghijklmnopqrstuvwxyz\')" />\n\n    <xsl:if test="$sLowerCaseType=\'skw\' or $sLowerCaseType=\'lin\'">\n      <xsl:attribute name="bevelled">true</xsl:attribute>\n    </xsl:if>\n    <xsl:if test="$sLowerCaseType=\'nobar\'">\n      <xsl:attribute name="linethickness">0pt</xsl:attribute>\n    </xsl:if>\n    <xsl:choose>\n      <xsl:when test="sLowerCaseNumJc=\'right\'">\n        <xsl:attribute name="numalign">right</xsl:attribute>\n      </xsl:when>\n      <xsl:when test="sLowerCaseNumJc=\'left\'">\n        <xsl:attribute name="numalign">left</xsl:attribute>\n      </xsl:when>\n    </xsl:choose>\n    <xsl:choose>\n      <xsl:when test="sLowerCaseDenJc=\'right\'">\n        <xsl:attribute name="numalign">right</xsl:attribute>\n      </xsl:when>\n      <xsl:when test="sLowerCaseDenJc=\'left\'">\n        <xsl:attribute name="numalign">left</xsl:attribute>\n      </xsl:when>\n    </xsl:choose>\n  </xsl:template>\n\n  \x3c!-- %%Template: match m:e | m:den | m:num | m:lim | m:sup | m:sub\n\n\t\tThese element delinate parts of an expression (like the numerator).  --\x3e\n  <xsl:template match="m:e | m:den | m:num | m:lim | m:sup | m:sub">\n    <xsl:choose>\n\n      \x3c!-- If there is no scriptLevel specified, just call through --\x3e\n      <xsl:when test="not(m:argPr[last()]/m:scrLvl/@m:val)">\n        <xsl:apply-templates select="*" />\n      </xsl:when>\n\n      \x3c!-- Otherwise, create an mstyle and set the script level --\x3e\n      <xsl:otherwise>\n        <mml:mstyle>\n          <xsl:attribute name="scriptlevel">\n            <xsl:value-of select="m:argPr[last()]/m:scrLvl/@m:val" />\n          </xsl:attribute>\n          <xsl:apply-templates select="*" />\n        </mml:mstyle>\n      </xsl:otherwise>\n    </xsl:choose>\n  </xsl:template>\n\n  <xsl:template match="m:bar">\n    <xsl:variable name="sLowerCasePos" select="translate(m:barPr/m:pos/@m:val, \'ABCDEFGHIJKLMNOPQRSTUVWXYZ\',\n\t\t                                                                       \'abcdefghijklmnopqrstuvwxyz\')" />\n\n    <xsl:variable name="fTop">\n\n      <xsl:choose>\n        <xsl:when test="$sLowerCasePos=\'top\'">1</xsl:when>\n        <xsl:otherwise>0</xsl:otherwise>\n      </xsl:choose>\n    </xsl:variable>\n    <xsl:choose>\n      <xsl:when test="$fTop=1">\n        <mml:mover accent="false">\n          <mml:mrow>\n            <xsl:apply-templates select="m:e[1]" />\n          </mml:mrow>\n          <mml:mo>\n            <xsl:text>&#x00AF;</xsl:text>\n          </mml:mo>\n        </mml:mover>\n      </xsl:when>\n      <xsl:otherwise>\n        <mml:munder underaccent="false">\n          <mml:mrow>\n            <xsl:apply-templates select="m:e[1]" />\n          </mml:mrow>\n          <mml:mo>\n            <xsl:text>&#x005F;</xsl:text>\n          </mml:mo>\n        </mml:munder>\n      </xsl:otherwise>\n    </xsl:choose>\n  </xsl:template>\n\n  \x3c!-- %%Template match m:d\n\n\t\tProcess a delimiter.\n\t--\x3e\n  <xsl:template match="m:d">\n    <mml:mfenced>\n      \x3c!-- open: default is \'(\' for both OMML and MathML --\x3e\n      <xsl:if test="m:dPr[1]/m:begChr/@m:val and not(m:dPr[1]/m:begChr/@m:val =\'(\')">\n        <xsl:attribute name="open">\n          <xsl:value-of select="m:dPr[1]/m:begChr/@m:val" />\n        </xsl:attribute>\n      </xsl:if>\n\n      \x3c!-- close: default is \')\' for both OMML and MathML --\x3e\n      <xsl:if test="m:dPr[1]/m:endChr/@m:val and not(m:dPr[1]/m:endChr/@m:val =\')\')">\n        <xsl:attribute name="close">\n          <xsl:value-of select="m:dPr[1]/m:endChr/@m:val" />\n        </xsl:attribute>\n      </xsl:if>\n\n      \x3c!-- separator: the default is \',\' for MathML, and \'|\' for OMML --\x3e\n      <xsl:choose>\n        \x3c!-- Matches MathML default. Write nothing --\x3e\n        <xsl:when test="m:dPr[1]/m:sepChr/@m:val = \',\'" />\n\n        \x3c!-- OMML default: | --\x3e\n        <xsl:when test="not(m:dPr[1]/m:sepChr/@m:val)">\n          <xsl:attribute name="separators">\n            <xsl:value-of select="\'|\'" />\n          </xsl:attribute>\n        </xsl:when>\n\n        <xsl:otherwise>\n          <xsl:attribute name="separators">\n            <xsl:value-of select="m:dPr[1]/m:sepChr/@m:val" />\n          </xsl:attribute>\n        </xsl:otherwise>\n      </xsl:choose>\n\n      \x3c!-- now write all the children. Put each one into an mrow\n\t\t\tjust in case it produces multiple runs, etc --\x3e\n      <xsl:for-each select="m:e">\n        <mml:mrow>\n          <xsl:apply-templates select="." />\n        </mml:mrow>\n      </xsl:for-each>\n    </mml:mfenced>\n  </xsl:template>\n\n  <xsl:template match="m:r">\n    <xsl:variable name="fNor">\n      <xsl:choose>\n        <xsl:when test="count(child::m:rPr[last()]/m:nor) = 0">0</xsl:when>\n        <xsl:otherwise>\n          <xsl:call-template name="ForceFalseStrVal">\n            <xsl:with-param name="str" select="translate(child::m:rPr[last()]/m:nor/@m:val, \'ABCDEFGHIJKLMNOPQRSTUVWXYZ\',\n\t\t                                                                       \'abcdefghijklmnopqrstuvwxyz\')" />\n          </xsl:call-template>\n        </xsl:otherwise>\n      </xsl:choose>\n    </xsl:variable>\n\n    <xsl:choose>\n      <xsl:when test="$fNor=1">\n        <mml:mtext>\n          <xsl:variable name="sOutput" select="translate(.//m:t, \' \', \'&#xa0;\')" />\n          <xsl:value-of select="$sOutput" />\n        </mml:mtext>\n      </xsl:when>\n      <xsl:otherwise>\n        <xsl:for-each select=".//m:t">\n          <xsl:call-template name="ParseMt">\n            <xsl:with-param name="sToParse" select="text()" />\n            <xsl:with-param name="scr" select="../m:rPr[last()]/m:scr/@m:val" />\n            <xsl:with-param name="sty" select="../m:rPr[last()]/m:sty/@m:val" />\n            <xsl:with-param name="nor">0</xsl:with-param>\n          </xsl:call-template>\n        </xsl:for-each>\n      </xsl:otherwise>\n    </xsl:choose>\n  </xsl:template>\n\n\n  <xsl:template name="CreateTokenAttributes">\n    <xsl:param name="scr" />\n    <xsl:param name="sty" />\n    <xsl:param name="nor" />\n    <xsl:param name="nCharToPrint" />\n    <xsl:param name="sTokenType" />\n\n    <xsl:choose>\n      <xsl:when test="$nor=1">\n        <xsl:attribute name="mathvariant">normal</xsl:attribute>\n      </xsl:when>\n      <xsl:otherwise>\n        <xsl:variable name="mathvariant">\n          <xsl:choose>\n            \x3c!-- numbers don\'t care --\x3e\n            <xsl:when test="$sTokenType=\'mn\'" />\n\n            <xsl:when test="$scr=\'monospace\'">monospace</xsl:when>\n            <xsl:when test="$scr=\'sans-serif\' and $sty=\'i\'">sans-serif-italic</xsl:when>\n            <xsl:when test="$scr=\'sans-serif\' and $sty=\'b\'">bold-sans-serif</xsl:when>\n            <xsl:when test="$scr=\'sans-serif\' and $sty=\'bi\'">sans-serif-bold-italic</xsl:when>\n            <xsl:when test="$scr=\'sans-serif\'">sans-serif</xsl:when>\n            <xsl:when test="$scr=\'fraktur\' and ($sty=\'b\' or $sty=\'bi\')">bold-fraktur</xsl:when>\n            <xsl:when test="$scr=\'fraktur\'">fraktur</xsl:when>\n            <xsl:when test="$scr=\'double-struck\'">double-struck</xsl:when>\n            <xsl:when test="$scr=\'script\' and ($sty=\'b\' or $sty=\'bi\')">bold-script</xsl:when>\n            <xsl:when test="$scr=\'script\'">script</xsl:when>\n            <xsl:when test="($scr=\'roman\' or not($scr) or $scr=\'\') and $sty=\'b\'">bold</xsl:when>\n            <xsl:when test="($scr=\'roman\' or not($scr) or $scr=\'\') and $sty=\'i\'">italic</xsl:when>\n            <xsl:when test="($scr=\'roman\' or not($scr) or $scr=\'\') and $sty=\'p\'">normal</xsl:when>\n            <xsl:when test="($scr=\'roman\' or not($scr) or $scr=\'\') and $sty=\'bi\'">bold-italic</xsl:when>\n            <xsl:otherwise />\n          </xsl:choose>\n        </xsl:variable>\n        <xsl:variable name="fontweight">\n          <xsl:choose>\n            <xsl:when test="$sty=\'b\' or $sty=\'bi\'">bold</xsl:when>\n            <xsl:otherwise>normal</xsl:otherwise>\n          </xsl:choose>\n        </xsl:variable>\n        <xsl:variable name="fontstyle">\n          <xsl:choose>\n            <xsl:when test="$sty=\'p\' or $sty=\'b\'">normal</xsl:when>\n            <xsl:otherwise>italic</xsl:otherwise>\n          </xsl:choose>\n        </xsl:variable>\n\n        \x3c!-- Writing of attributes begins here --\x3e\n        <xsl:choose>\n          \x3c!-- Don\'t write mathvariant for operators unless they want to be normal --\x3e\n          <xsl:when test="$sTokenType=\'mo\' and $mathvariant!=\'normal\'" />\n\n          \x3c!-- A single character within an mi is already italics, don\'t write --\x3e\n          <xsl:when test="$sTokenType=\'mi\' and $nCharToPrint=1 and ($mathvariant=\'\' or $mathvariant=\'italic\')" />\n\n          <xsl:when test="$sTokenType=\'mi\' and $nCharToPrint &gt; 1 and ($mathvariant=\'\' or $mathvariant=\'italic\')">\n            <xsl:attribute name="mathvariant">\n              <xsl:value-of select="\'italic\'" />\n            </xsl:attribute>\n          </xsl:when>\n          <xsl:when test="$mathvariant!=\'italic\' and $mathvariant!=\'\'">\n            <xsl:attribute name="mathvariant">\n              <xsl:value-of select="$mathvariant" />\n            </xsl:attribute>\n          </xsl:when>\n          <xsl:otherwise>\n            <xsl:if test="not($sTokenType=\'mi\' and $nCharToPrint=1) and $fontstyle=\'italic\'">\n              <xsl:attribute name="fontstyle">italic</xsl:attribute>\n            </xsl:if>\n            <xsl:if test="$fontweight=\'bold\'">\n              <xsl:attribute name="fontweight">bold</xsl:attribute>\n            </xsl:if>\n          </xsl:otherwise>\n        </xsl:choose>\n      </xsl:otherwise>\n    </xsl:choose>\n  </xsl:template>\n\n  <xsl:template match="m:eqArr">\n    <mml:mtable>\n      <xsl:for-each select="m:e">\n        <mml:mtr>\n          <mml:mtd>\n            <xsl:choose>\n              <xsl:when test="m:argPr[last()]/m:scrLvl/@m:val!=\'0\' or\n\t\t\t\t\t            not(m:argPr[last()]/m:scrLvl/@m:val)  or\n\t\t\t\t\t            m:argPr[last()]/m:scrLvl/@m:val=\'\'">\n                <mml:mrow>\n                  <mml:maligngroup />\n                  <xsl:call-template name="CreateEqArrRow">\n                    <xsl:with-param name="align" select="1" />\n                    <xsl:with-param name="ndCur" select="*[1]" />\n                  </xsl:call-template>\n                </mml:mrow>\n              </xsl:when>\n              <xsl:otherwise>\n                <mml:mstyle>\n                  <xsl:attribute name="scriptlevel">\n                    <xsl:value-of select="m:argPr[last()]/m:scrLvl/@m:val" />\n                  </xsl:attribute>\n                  <mml:maligngroup />\n                  <xsl:call-template name="CreateEqArrRow">\n                    <xsl:with-param name="align" select="1" />\n                    <xsl:with-param name="ndCur" select="*[1]" />\n                  </xsl:call-template>\n                </mml:mstyle>\n              </xsl:otherwise>\n            </xsl:choose>\n          </mml:mtd>\n        </mml:mtr>\n      </xsl:for-each>\n    </mml:mtable>\n  </xsl:template>\n\n  <xsl:template name="CreateEqArrRow">\n    <xsl:param name="align" />\n    <xsl:param name="ndCur" />\n    <xsl:variable name="sAllMt">\n      <xsl:for-each select="$ndCur/m:t">\n        <xsl:value-of select="." />\n      </xsl:for-each>\n    </xsl:variable>\n    <xsl:choose>\n      <xsl:when test="$ndCur/self::m:r">\n        <xsl:call-template name="ParseEqArrMr">\n          <xsl:with-param name="sToParse" select="$sAllMt" />\n          <xsl:with-param name="scr" select="../m:rPr[last()]/m:scr/@m:val" />\n          <xsl:with-param name="sty" select="../m:rPr[last()]/m:sty/@m:val" />\n          <xsl:with-param name="nor">\n            <xsl:choose>\n              <xsl:when test="count($ndCur/m:rPr[last()]/m:nor) = 0">0</xsl:when>\n              <xsl:otherwise>\n                <xsl:call-template name="ForceFalseStrVal">\n                  <xsl:with-param name="str" select="translate($ndCur/m:rPr[last()]/m:nor/@m:val,\n                                                                     \'ABCDEFGHIJKLMNOPQRSTUVWXYZ\',\n\t\t                                                                 \'abcdefghijklmnopqrstuvwxyz\')" />\n                </xsl:call-template>\n              </xsl:otherwise>\n            </xsl:choose>\n          </xsl:with-param>\n          <xsl:with-param name="align" select="$align" />\n        </xsl:call-template>\n      </xsl:when>\n      <xsl:otherwise>\n        <xsl:apply-templates select="$ndCur" />\n      </xsl:otherwise>\n    </xsl:choose>\n    <xsl:if test="count($ndCur/following-sibling::*) &gt; 0">\n      <xsl:variable name="cAmp">\n        <xsl:call-template name="CountAmp">\n          <xsl:with-param name="sAllMt" select="$sAllMt" />\n          <xsl:with-param name="cAmp" select="0" />\n        </xsl:call-template>\n      </xsl:variable>\n      <xsl:call-template name="CreateEqArrRow">\n        <xsl:with-param name="align" select="($align+($cAmp mod 2)) mod 2" />\n        <xsl:with-param name="ndCur" select="$ndCur/following-sibling::*[1]" />\n      </xsl:call-template>\n    </xsl:if>\n  </xsl:template>\n\n  <xsl:template name="CountAmp">\n    <xsl:param name="sAllMt" />\n    <xsl:param name="cAmp" />\n    <xsl:choose>\n      <xsl:when test="string-length(substring-after($sAllMt, \'&amp;\')) &gt; 0 or\n\t\t\t                substring($sAllMt, string-length($sAllMt))=\'&#x0026;\'">\n        <xsl:call-template name="CountAmp">\n          <xsl:with-param name="sAllMt" select="substring-after($sAllMt, \'&#x0026;\')" />\n          <xsl:with-param name="cAmp" select="$cAmp+1" />\n        </xsl:call-template>\n      </xsl:when>\n      <xsl:otherwise>\n        <xsl:value-of select="$cAmp" />\n      </xsl:otherwise>\n    </xsl:choose>\n  </xsl:template>\n\n  \x3c!-- %%Template: ParseEqArrMr\n\n\t\t\tSimilar to ParseMt, but this one has to do more for an equation array.\n      In equation arrays &amp; is a special character which denotes alignment.\n\n      The &amp; in an equation works by alternating between meaning insert alignment spacing\n      and insert alignment mark.  For each equation in the equation array\n      there is an implied align space at the beginning of the equation.  Within each equation,\n      the first &amp; means alignmark, the second, align space, the third, alignmark, etc.\n\n      For this reason when parsing m:r\'s in equation arrays it is important to keep track of what\n      the next ampersand will mean.\n\n      $align=0 => Omml\'s align space, which is similar to MathML\'s maligngroup.\n      $align=1 => Omml\'s alignment mark, which is similar to MathML\'s malignmark.\n\t--\x3e\n  <xsl:template name="ParseEqArrMr">\n    <xsl:param name="sToParse" />\n    <xsl:param name="sty" />\n    <xsl:param name="scr" />\n    <xsl:param name="nor" />\n    <xsl:param name="align" />\n\n    <xsl:if test="string-length($sToParse) &gt; 0">\n      <xsl:choose>\n        <xsl:when test="substring($sToParse,1,1) = \'&amp;\'">\n          <xsl:choose>\n            <xsl:when test="$align=\'0\'">\n              <mml:maligngroup />\n            </xsl:when>\n            <xsl:when test="$align=\'1\'">\n              <mml:malignmark />\n            </xsl:when>\n          </xsl:choose>\n          <xsl:call-template name="ParseEqArrMr">\n            <xsl:with-param name="sToParse" select="substring($sToParse,2)" />\n            <xsl:with-param name="scr" select="$scr" />\n            <xsl:with-param name="sty" select="$sty" />\n            <xsl:with-param name="nor" select="$nor" />\n            <xsl:with-param name="align">\n              <xsl:choose>\n                <xsl:when test="$align=\'1\'">0</xsl:when>\n                <xsl:otherwise>1</xsl:otherwise>\n              </xsl:choose>\n            </xsl:with-param>\n          </xsl:call-template>\n        </xsl:when>\n        <xsl:otherwise>\n          <xsl:variable name="sRepNumWith0">\n            <xsl:call-template name="SReplaceNumWithZero">\n              <xsl:with-param name="sToParse" select="$sToParse" />\n            </xsl:call-template>\n          </xsl:variable>\n          <xsl:variable name="sRepOperWith-">\n            <xsl:call-template name="SReplaceOperWithMinus">\n              <xsl:with-param name="sToParse" select="$sRepNumWith0" />\n            </xsl:call-template>\n          </xsl:variable>\n\n          <xsl:variable name="iFirstOper" select="string-length($sRepOperWith-) - string-length(substring-after($sRepOperWith-, \'-\'))" />\n          <xsl:variable name="iFirstNum" select="string-length($sRepOperWith-) - string-length(substring-after($sRepOperWith-, \'0\'))" />\n          <xsl:variable name="iFirstAmp" select="string-length($sRepOperWith-) - string-length(substring-after($sRepOperWith-, \'&#x0026;\'))" />\n          <xsl:variable name="fNumAtPos1">\n            <xsl:choose>\n              <xsl:when test="substring($sRepOperWith-,1,1)=\'0\'">1</xsl:when>\n              <xsl:otherwise>0</xsl:otherwise>\n            </xsl:choose>\n          </xsl:variable>\n          <xsl:variable name="fOperAtPos1">\n            <xsl:choose>\n              <xsl:when test="substring($sRepOperWith-,1,1)=\'-\'">1</xsl:when>\n              <xsl:otherwise>0</xsl:otherwise>\n            </xsl:choose>\n          </xsl:variable>\n          <xsl:choose>\n\n            \x3c!-- Case I: The string begins with neither a number, nor an operator --\x3e\n            <xsl:when test="$fNumAtPos1=\'0\' and $fOperAtPos1=\'0\'">\n              <xsl:choose>\n                <xsl:when test="$nor = 0">\n                  <mml:mi>\n                    <xsl:call-template name="CreateTokenAttributes">\n                      <xsl:with-param name="scr" select="$scr" />\n                      <xsl:with-param name="sty" select="$sty" />\n                      <xsl:with-param name="nor" select="$nor" />\n                      <xsl:with-param name="nCharToPrint" select="1" />\n                      <xsl:with-param name="sTokenType" select="\'mi\'" />\n                    </xsl:call-template>\n                    <xsl:variable name="sOutput" select="translate(substring($sToParse, 1, 1), \' \', \'&#xa0;\')" />\n                    <xsl:value-of select="$sOutput" />\n                  </mml:mi>\n                </xsl:when>\n                <xsl:otherwise>\n                  <mml:mtext>\n                    <xsl:variable name="sOutput" select="translate(substring($sToParse, 1, 1), \' \', \'&#xa0;\')" />\n                    <xsl:value-of select="$sOutput" />\n                  </mml:mtext>\n                </xsl:otherwise>\n              </xsl:choose>\n              <xsl:call-template name="ParseEqArrMr">\n                <xsl:with-param name="sToParse" select="substring($sToParse, 2)" />\n                <xsl:with-param name="scr" select="$scr" />\n                <xsl:with-param name="sty" select="$sty" />\n                <xsl:with-param name="nor" select="$nor" />\n                <xsl:with-param name="align" select="$align" />\n              </xsl:call-template>\n            </xsl:when>\n\n            \x3c!-- Case II: There is an operator at position 1 --\x3e\n            <xsl:when test="$fOperAtPos1=\'1\'">\n              <xsl:choose>\n                <xsl:when test="$nor = 0">\n                  <mml:mo>\n                    <xsl:call-template name="CreateTokenAttributes">\n                      <xsl:with-param name="scr" />\n                      <xsl:with-param name="sty" />\n                      <xsl:with-param name="nor" select="$nor" />\n                      <xsl:with-param name="sTokenType" select="\'mo\'" />\n                    </xsl:call-template>\n                    <xsl:value-of select="substring($sToParse,1,1)" />\n                  </mml:mo>\n                </xsl:when>\n                <xsl:otherwise>\n                  <mml:mtext>\n                    <xsl:value-of select="substring($sToParse,1,1)" />\n                  </mml:mtext>\n                </xsl:otherwise>\n              </xsl:choose>\n              <xsl:call-template name="ParseEqArrMr">\n                <xsl:with-param name="sToParse" select="substring($sToParse, 2)" />\n                <xsl:with-param name="scr" select="$scr" />\n                <xsl:with-param name="sty" select="$sty" />\n                <xsl:with-param name="nor" select="$nor" />\n                <xsl:with-param name="align" select="$align" />\n              </xsl:call-template>\n            </xsl:when>\n\n            \x3c!-- Case III: There is a number at position 1 --\x3e\n            <xsl:otherwise>\n              <xsl:variable name="sConsecNum">\n                <xsl:call-template name="SNumStart">\n                  <xsl:with-param name="sToParse" select="$sToParse" />\n                  <xsl:with-param name="sPattern" select="$sRepNumWith0" />\n                </xsl:call-template>\n              </xsl:variable>\n              <xsl:choose>\n                <xsl:when test="$nor = 0">\n                  <mml:mn>\n                    <xsl:call-template name="CreateTokenAttributes">\n                      <xsl:with-param name="scr" />\n                      <xsl:with-param name="sty" select="\'p\'"/>\n                      <xsl:with-param name="nor" select="$nor" />\n                      <xsl:with-param name="sTokenType" select="\'mn\'" />\n                    </xsl:call-template>\n                    <xsl:value-of select="$sConsecNum" />\n                  </mml:mn>\n                </xsl:when>\n                <xsl:otherwise>\n                  <mml:mtext>\n                    <xsl:value-of select="$sConsecNum" />\n                  </mml:mtext>\n                </xsl:otherwise>\n              </xsl:choose>\n              <xsl:call-template name="ParseEqArrMr">\n                <xsl:with-param name="sToParse" select="substring-after($sToParse, $sConsecNum)" />\n                <xsl:with-param name="scr" select="$scr" />\n                <xsl:with-param name="sty" select="$sty" />\n                <xsl:with-param name="nor" select="$nor" />\n                <xsl:with-param name="align" select="$align" />\n              </xsl:call-template>\n            </xsl:otherwise>\n          </xsl:choose>\n        </xsl:otherwise>\n      </xsl:choose>\n    </xsl:if>\n  </xsl:template>\n\n  \x3c!-- %%Template: ParseMt\n\n\t\t\tProduce a run of text. Technically, OMML makes no distinction\n\t\t\tbetween numbers, operators, and other characters in a run. For\n\t\t\tMathML we need to break these into mi, mn, or mo elements.\n\n\t\t\tSee also ParseEqArrMr\n\t--\x3e\n  <xsl:template name="ParseMt">\n    <xsl:param name="sToParse" />\n    <xsl:param name="sty" />\n    <xsl:param name="scr" />\n    <xsl:param name="nor" />\n    <xsl:if test="string-length($sToParse) &gt; 0">\n      <xsl:variable name="sRepNumWith0">\n        <xsl:call-template name="SReplaceNumWithZero">\n          <xsl:with-param name="sToParse" select="$sToParse" />\n        </xsl:call-template>\n      </xsl:variable>\n      <xsl:variable name="sRepOperWith-">\n        <xsl:call-template name="SReplaceOperWithMinus">\n          <xsl:with-param name="sToParse" select="$sRepNumWith0" />\n        </xsl:call-template>\n      </xsl:variable>\n\n      <xsl:variable name="iFirstOper" select="string-length($sRepOperWith-) - string-length(substring-after($sRepOperWith-, \'-\'))" />\n      <xsl:variable name="iFirstNum" select="string-length($sRepOperWith-) - string-length(substring-after($sRepOperWith-, \'0\'))" />\n      <xsl:variable name="fNumAtPos1">\n        <xsl:choose>\n          <xsl:when test="substring($sRepOperWith-,1,1)=\'0\'">1</xsl:when>\n          <xsl:otherwise>0</xsl:otherwise>\n        </xsl:choose>\n      </xsl:variable>\n      <xsl:variable name="fOperAtPos1">\n        <xsl:choose>\n          <xsl:when test="substring($sRepOperWith-,1,1)=\'-\'">1</xsl:when>\n          <xsl:otherwise>0</xsl:otherwise>\n        </xsl:choose>\n      </xsl:variable>\n\n      <xsl:choose>\n\n        \x3c!-- Case I: The string begins with neither a number, nor an operator --\x3e\n        <xsl:when test="$fOperAtPos1=\'0\' and $fNumAtPos1=\'0\'">\n          <xsl:variable name="nCharToPrint">\n            <xsl:choose>\n              <xsl:when test="ancestor::m:fName">\n                <xsl:choose>\n                  <xsl:when test="($iFirstOper=$iFirstNum) and\n\t\t\t\t\t\t\t\t\t\t\t($iFirstOper=string-length($sToParse)) and\n\t\t\t\t\t\t\t                (substring($sRepOperWith-, string-length($sRepOperWith-))!=\'0\') and\n\t\t\t\t\t\t\t                (substring($sRepOperWith-, string-length($sRepOperWith-))!=\'-\')">\n                    <xsl:value-of select="string-length($sToParse)" />\n                  </xsl:when>\n                  <xsl:when test="$iFirstOper &lt; $iFirstNum">\n                    <xsl:value-of select="$iFirstOper - 1" />\n                  </xsl:when>\n                  <xsl:otherwise>\n                    <xsl:value-of select="$iFirstNum - 1" />\n                  </xsl:otherwise>\n                </xsl:choose>\n              </xsl:when>\n              <xsl:otherwise>1</xsl:otherwise>\n            </xsl:choose>\n          </xsl:variable>\n\n          <mml:mi>\n            <xsl:call-template name="CreateTokenAttributes">\n              <xsl:with-param name="scr" select="$scr" />\n              <xsl:with-param name="sty" select="$sty" />\n              <xsl:with-param name="nor" select="$nor" />\n              <xsl:with-param name="nCharToPrint" select="$nCharToPrint" />\n              <xsl:with-param name="sTokenType" select="\'mi\'" />\n            </xsl:call-template>\n            <xsl:variable name="sWrite" select="translate(substring($sToParse, 1, $nCharToPrint), \' \', \'&#xa0;\')" />\n            <xsl:value-of select="$sWrite" />\n          </mml:mi>\n          <xsl:call-template name="ParseMt">\n            <xsl:with-param name="sToParse" select="substring($sToParse, $nCharToPrint+1)" />\n            <xsl:with-param name="scr" select="$scr" />\n            <xsl:with-param name="sty" select="$sty" />\n            <xsl:with-param name="nor" select="$nor" />\n          </xsl:call-template>\n        </xsl:when>\n\n        \x3c!-- Case II: There is an operator at position 1 --\x3e\n        <xsl:when test="$fOperAtPos1=\'1\'">\n          <mml:mo>\n            <xsl:call-template name="CreateTokenAttributes">\n              <xsl:with-param name="scr" />\n              <xsl:with-param name="sty" />\n              <xsl:with-param name="nor" select="$nor" />\n              <xsl:with-param name="sTokenType" select="\'mo\'" />\n            </xsl:call-template>\n            <xsl:value-of select="substring($sToParse,1,1)" />\n          </mml:mo>\n          <xsl:call-template name="ParseMt">\n            <xsl:with-param name="sToParse" select="substring($sToParse, 2)" />\n            <xsl:with-param name="scr" select="$scr" />\n            <xsl:with-param name="sty" select="$sty" />\n            <xsl:with-param name="nor" select="$nor" />\n          </xsl:call-template>\n        </xsl:when>\n\n        \x3c!-- Case III: There is a number at position 1 --\x3e\n        <xsl:otherwise>\n          <xsl:variable name="sConsecNum">\n            <xsl:call-template name="SNumStart">\n              <xsl:with-param name="sToParse" select="$sToParse" />\n              <xsl:with-param name="sPattern" select="$sRepNumWith0" />\n            </xsl:call-template>\n          </xsl:variable>\n          <mml:mn>\n            <xsl:call-template name="CreateTokenAttributes">\n              <xsl:with-param name="scr" select="$scr" />\n              <xsl:with-param name="sty" select="\'p\'" />\n              <xsl:with-param name="nor" select="$nor" />\n              <xsl:with-param name="sTokenType" select="\'mn\'" />\n            </xsl:call-template>\n            <xsl:value-of select="$sConsecNum" />\n          </mml:mn>\n          <xsl:call-template name="ParseMt">\n            <xsl:with-param name="sToParse" select="substring-after($sToParse, $sConsecNum)" />\n            <xsl:with-param name="scr" select="$scr" />\n            <xsl:with-param name="sty" select="$sty" />\n            <xsl:with-param name="nor" select="$nor" />\n          </xsl:call-template>\n        </xsl:otherwise>\n      </xsl:choose>\n    </xsl:if>\n  </xsl:template>\n\n  \x3c!-- %%Template: SNumStart\n\n\t\tReturn the longest substring of sToParse starting from the\n\t\tstart of sToParse that is a number. In addition, it takes the\n\t\tpattern string, which is sToParse with all of its numbers\n\t\treplaced with a 0. sPattern should be the same length\n\t\tas sToParse\n\t--\x3e\n  <xsl:template name="SNumStart">\n    <xsl:param name="sToParse" select="\'\'" />\n    \x3c!-- if we don\'t get anything, take the string itself --\x3e\n    <xsl:param name="sPattern" select="\'$sToParse\'" />\n\n\n    <xsl:choose>\n      \x3c!-- the pattern says this is a number, recurse with the rest --\x3e\n      <xsl:when test="substring($sPattern, 1, 1) = \'0\'">\n        <xsl:call-template name="SNumStart">\n          <xsl:with-param name="sToParse" select="$sToParse" />\n          <xsl:with-param name="sPattern" select="substring($sPattern, 2)" />\n        </xsl:call-template>\n      </xsl:when>\n\n      \x3c!-- the pattern says we\'ve run out of numbers. Take as many\n\t\t\t\tcharacters from sToParse as we shaved off sPattern --\x3e\n      <xsl:otherwise>\n        <xsl:value-of select="substring($sToParse, 1, string-length($sToParse) - string-length($sPattern))" />\n      </xsl:otherwise>\n    </xsl:choose>\n  </xsl:template>\n\n  \x3c!-- %%Template SRepeatCharAcc\n\n\t\t\tThe core of SRepeatChar with an accumulator. The current\n\t\t\tstring is in param $acc, and we will double and recurse,\n\t\t\tif we\'re less than half of the required length or else just\n\t\t\tadd the right amount of characters to the accumulator and\n\t\t\treturn\n\t--\x3e\n  <xsl:template name="SRepeatCharAcc">\n    <xsl:param name="cchRequired" select="1" />\n    <xsl:param name="ch" select="\'-\'" />\n    <xsl:param name="acc" select="$ch" />\n\n    <xsl:variable name="cchAcc" select="string-length($acc)" />\n    <xsl:choose>\n      <xsl:when test="(2 * $cchAcc) &lt; $cchRequired">\n        <xsl:call-template name="SRepeatCharAcc">\n          <xsl:with-param name="cchRequired" select="$cchRequired" />\n          <xsl:with-param name="ch" select="$ch" />\n          <xsl:with-param name="acc" select="concat($acc, $acc)" />\n        </xsl:call-template>\n      </xsl:when>\n\n      <xsl:otherwise>\n        <xsl:value-of select="concat($acc, substring($acc, 1, $cchRequired - $cchAcc))" />\n      </xsl:otherwise>\n    </xsl:choose>\n  </xsl:template>\n\n\n  \x3c!-- %%Template SRepeatChar\n\n\t\t\tGenerates a string nchRequired long by repeating the given character ch\n\t--\x3e\n  <xsl:template name="SRepeatChar">\n    <xsl:param name="cchRequired" select="1" />\n    <xsl:param name="ch" select="\'-\'" />\n\n    <xsl:call-template name="SRepeatCharAcc">\n      <xsl:with-param name="cchRequired" select="$cchRequired" />\n      <xsl:with-param name="ch" select="$ch" />\n      <xsl:with-param name="acc" select="$ch" />\n    </xsl:call-template>\n  </xsl:template>\n\n  \x3c!-- %%Template SReplaceOperWithMinus\n\n\t\tGo through the given string and replace every instance\n\t\tof an operator with a minus \'-\'. This helps quickly identify\n\t\tthe first instance of an operator.\n\t--\x3e\n  <xsl:template name="SReplaceOperWithMinus">\n    <xsl:param name="sToParse" select="\'\'" />\n\n    <xsl:value-of select="translate($sToParse, $sOperators, $sMinuses)" />\n  </xsl:template>\n\n  \x3c!-- %%Template SReplaceNumWithZero\n\n\t\tGo through the given string and replace every instance\n\t\tof an number with a zero \'0\'. This helps quickly identify\n\t\tthe first occurence of a number.\n\n\t\tConsiders the \'.\' and \',\' part of a number iff they are sandwiched\n\t\tbetween two other numbers. 0.3 will be recognized as a number,\n\t\tx.3 will not be. Since these characters can also be an operator, this\n\t\tshould be called before SReplaceOperWithMinus.\n\t--\x3e\n  <xsl:template name="SReplaceNumWithZero">\n    <xsl:param name="sToParse" select="\'\'" />\n\n    \x3c!-- First do a simple replace. Numbers will all be come 0\'s.\n\t\t\tAfter this point, the pattern involving the . or , that\n\t\t\twe are looking for will become 0.0 or 0,0 --\x3e\n    <xsl:variable name="sSimpleReplace" select="translate($sToParse, $sNumbers, $sZeros)" />\n\n    \x3c!-- And then, replace 0.0 with just 000. This means that the . will\n\t\t\tbecome part of the number --\x3e\n    <xsl:variable name="sReplacePeriod">\n      <xsl:call-template name="SReplace">\n        <xsl:with-param name="sInput" select="$sSimpleReplace" />\n        <xsl:with-param name="sOrig" select="\'0.0\'" />\n        <xsl:with-param name="sReplacement" select="\'000\'" />\n      </xsl:call-template>\n    </xsl:variable>\n\n    \x3c!-- And then, replace 0,0 with just 000. This means that the , will\n\t\t\tbecome part of the number --\x3e\n    <xsl:call-template name="SReplace">\n      <xsl:with-param name="sInput" select="$sReplacePeriod" />\n      <xsl:with-param name="sOrig" select="\'0,0\'" />\n      <xsl:with-param name="sReplacement" select="\'000\'" />\n    </xsl:call-template>\n  </xsl:template>\n\n  \x3c!-- Template to translate Word\'s borderBox properties into the menclose notation attribute\n       The initial call to this SHOULD NOT pass an sAttribute.  Subsequent calls to\n       CreateMencloseNotationAttrFromBorderBoxAttr by CreateMencloseNotationAttrFromBorderBoxAttr will\n       update the sAttribute as appropriate.\n\n       CreateMencloseNotationAttrFromBorderBoxAttr looks at each attribute (fHideTop, fHideBot, etc.) one at a time\n       in the order they are listed and passes a modified sAttribute to CreateMencloseNotationAttrFromBorderBoxAttr.\n       Each successive call to CreateMencloseNotationAttrFromBorderBoxAttr knows which attribute to look at because\n       the previous call should have omitted passing the attribute it just analyzed.  This is why as you read lower\n       and lower in the template that each call to CreateMencloseNotationAttrFromBorderBoxAttr has fewer and fewer attributes.\n       --\x3e\n  <xsl:template name="CreateMencloseNotationAttrFromBorderBoxAttr">\n    <xsl:param name="fHideTop" />\n    <xsl:param name="fHideBot" />\n    <xsl:param name="fHideLeft" />\n    <xsl:param name="fHideRight" />\n    <xsl:param name="fStrikeH" />\n    <xsl:param name="fStrikeV" />\n    <xsl:param name="fStrikeBLTR" />\n    <xsl:param name="fStrikeTLBR" />\n    <xsl:param name="sAttribute" />\n\n    <xsl:choose>\n      <xsl:when test="string-length($sAttribute) = 0">\n        <xsl:choose>\n          <xsl:when test="string-length($fHideTop) &gt; 0\n                      and string-length($fHideBot) &gt; 0\n                      and string-length($fHideLeft) &gt; 0\n                      and string-length($fHideRight) &gt; 0">\n\n            <xsl:choose>\n              <xsl:when test="$fHideTop = 0\n                              and $fHideBot = 0\n                              and $fHideLeft = 0\n                              and $fHideRight = 0">\n                \x3c!-- We can use \'box\' instead of top, bot, left, and right.  Therefore,\n                  replace sAttribute with \'box\' and begin analyzing params fStrikeH\n                  and below. --\x3e\n                <xsl:call-template name="CreateMencloseNotationAttrFromBorderBoxAttr">\n                  <xsl:with-param name="fStrikeH" select="$fStrikeH" />\n                  <xsl:with-param name="fStrikeV" select="$fStrikeV" />\n                  <xsl:with-param name="fStrikeBLTR" select="$fStrikeBLTR" />\n                  <xsl:with-param name="fStrikeTLBR" select="$fStrikeTLBR" />\n                  <xsl:with-param name="sAttribute">\n                    <xsl:text>box</xsl:text>\n                  </xsl:with-param>\n                </xsl:call-template>\n              </xsl:when>\n              <xsl:otherwise>\n                \x3c!-- Can\'t use \'box\', theremore, must analyze all attributes --\x3e\n                <xsl:call-template name="CreateMencloseNotationAttrFromBorderBoxAttr">\n                  <xsl:with-param name="fHideTop" select="$fHideTop" />\n                  <xsl:with-param name="fHideBot" select="$fHideBot" />\n                  <xsl:with-param name="fHideLeft" select="$fHideLeft" />\n                  <xsl:with-param name="fHideRight" select="$fHideRight" />\n                  <xsl:with-param name="fStrikeH" select="$fStrikeH" />\n                  <xsl:with-param name="fStrikeV" select="$fStrikeV" />\n                  <xsl:with-param name="fStrikeBLTR" select="$fStrikeBLTR" />\n                  <xsl:with-param name="fStrikeTLBR" select="$fStrikeTLBR" />\n                  <xsl:with-param name="sAttribute">\n                    \x3c!-- Assume using all four (left right top bottom).  Subsequent calls\n                         will remove the sides which aren\'t to be includes. --\x3e\n                    <xsl:text>left right top bottom</xsl:text>\n                  </xsl:with-param>\n                </xsl:call-template>\n              </xsl:otherwise>\n            </xsl:choose>\n          </xsl:when>\n        </xsl:choose>\n      </xsl:when>\n      <xsl:otherwise>\n        <xsl:choose>\n          <xsl:when test="string-length($fHideTop) &gt; 0">\n            <xsl:choose>\n              <xsl:when test="$fHideTop=1">\n                <xsl:call-template name="CreateMencloseNotationAttrFromBorderBoxAttr">\n                  <xsl:with-param name="fHideBot" select="$fHideBot" />\n                  <xsl:with-param name="fHideLeft" select="$fHideLeft" />\n                  <xsl:with-param name="fHideRight" select="$fHideRight" />\n                  <xsl:with-param name="fStrikeH" select="$fStrikeH" />\n                  <xsl:with-param name="fStrikeV" select="$fStrikeV" />\n                  <xsl:with-param name="fStrikeBLTR" select="$fStrikeBLTR" />\n                  <xsl:with-param name="fStrikeTLBR" select="$fStrikeTLBR" />\n                  <xsl:with-param name="sAttribute">\n                    <xsl:call-template name="SReplace">\n                      <xsl:with-param name="sInput" select="$sAttribute" />\n                      <xsl:with-param name="sOrig" select="\'top\'" />\n                      <xsl:with-param name="sReplacement" select="\'\'" />\n                    </xsl:call-template>\n                  </xsl:with-param>\n                </xsl:call-template>\n              </xsl:when>\n              <xsl:otherwise>\n                <xsl:call-template name="CreateMencloseNotationAttrFromBorderBoxAttr">\n                  <xsl:with-param name="fHideBot" select="$fHideBot" />\n                  <xsl:with-param name="fHideLeft" select="$fHideLeft" />\n                  <xsl:with-param name="fHideRight" select="$fHideRight" />\n                  <xsl:with-param name="fStrikeH" select="$fStrikeH" />\n                  <xsl:with-param name="fStrikeV" select="$fStrikeV" />\n                  <xsl:with-param name="fStrikeBLTR" select="$fStrikeBLTR" />\n                  <xsl:with-param name="fStrikeTLBR" select="$fStrikeTLBR" />\n                  <xsl:with-param name="sAttribute" select="$sAttribute" />\n                </xsl:call-template>\n              </xsl:otherwise>\n            </xsl:choose>\n          </xsl:when>\n          <xsl:when test="string-length($fHideBot) &gt; 0">\n            <xsl:choose>\n              <xsl:when test="$fHideBot=1">\n                <xsl:call-template name="CreateMencloseNotationAttrFromBorderBoxAttr">\n                  <xsl:with-param name="fHideLeft" select="$fHideLeft" />\n                  <xsl:with-param name="fHideRight" select="$fHideRight" />\n                  <xsl:with-param name="fStrikeH" select="$fStrikeH" />\n                  <xsl:with-param name="fStrikeV" select="$fStrikeV" />\n                  <xsl:with-param name="fStrikeBLTR" select="$fStrikeBLTR" />\n                  <xsl:with-param name="fStrikeTLBR" select="$fStrikeTLBR" />\n                  <xsl:with-param name="sAttribute">\n                    <xsl:call-template name="SReplace">\n                      <xsl:with-param name="sInput" select="$sAttribute" />\n                      <xsl:with-param name="sOrig" select="\'bottom\'" />\n                      <xsl:with-param name="sReplacement" select="\'\'" />\n                    </xsl:call-template>\n                  </xsl:with-param>\n                </xsl:call-template>\n              </xsl:when>\n              <xsl:otherwise>\n                <xsl:call-template name="CreateMencloseNotationAttrFromBorderBoxAttr">\n                  <xsl:with-param name="fHideLeft" select="$fHideLeft" />\n                  <xsl:with-param name="fHideRight" select="$fHideRight" />\n                  <xsl:with-param name="fStrikeH" select="$fStrikeH" />\n                  <xsl:with-param name="fStrikeV" select="$fStrikeV" />\n                  <xsl:with-param name="fStrikeBLTR" select="$fStrikeBLTR" />\n                  <xsl:with-param name="fStrikeTLBR" select="$fStrikeTLBR" />\n                  <xsl:with-param name="sAttribute" select="$sAttribute" />\n                </xsl:call-template>\n              </xsl:otherwise>\n            </xsl:choose>\n          </xsl:when>\n          <xsl:when test="string-length($fHideLeft) &gt; 0">\n            <xsl:choose>\n              <xsl:when test="$fHideLeft=1">\n                <xsl:call-template name="CreateMencloseNotationAttrFromBorderBoxAttr">\n                  <xsl:with-param name="fHideRight" select="$fHideRight" />\n                  <xsl:with-param name="fStrikeH" select="$fStrikeH" />\n                  <xsl:with-param name="fStrikeV" select="$fStrikeV" />\n                  <xsl:with-param name="fStrikeBLTR" select="$fStrikeBLTR" />\n                  <xsl:with-param name="fStrikeTLBR" select="$fStrikeTLBR" />\n                  <xsl:with-param name="sAttribute">\n                    <xsl:call-template name="SReplace">\n                      <xsl:with-param name="sInput" select="$sAttribute" />\n                      <xsl:with-param name="sOrig" select="\'left\'" />\n                      <xsl:with-param name="sReplacement" select="\'\'" />\n                    </xsl:call-template>\n                  </xsl:with-param>\n                </xsl:call-template>\n              </xsl:when>\n              <xsl:otherwise>\n                <xsl:call-template name="CreateMencloseNotationAttrFromBorderBoxAttr">\n                  <xsl:with-param name="fHideRight" select="$fHideRight" />\n                  <xsl:with-param name="fStrikeH" select="$fStrikeH" />\n                  <xsl:with-param name="fStrikeV" select="$fStrikeV" />\n                  <xsl:with-param name="fStrikeBLTR" select="$fStrikeBLTR" />\n                  <xsl:with-param name="fStrikeTLBR" select="$fStrikeTLBR" />\n                  <xsl:with-param name="sAttribute" select="$sAttribute" />\n                </xsl:call-template>\n              </xsl:otherwise>\n            </xsl:choose>\n          </xsl:when>\n          <xsl:when test="string-length($fHideRight) &gt; 0">\n            <xsl:choose>\n              <xsl:when test="$fHideRight=1">\n                <xsl:call-template name="CreateMencloseNotationAttrFromBorderBoxAttr">\n                  <xsl:with-param name="fStrikeH" select="$fStrikeH" />\n                  <xsl:with-param name="fStrikeV" select="$fStrikeV" />\n                  <xsl:with-param name="fStrikeBLTR" select="$fStrikeBLTR" />\n                  <xsl:with-param name="fStrikeTLBR" select="$fStrikeTLBR" />\n                  <xsl:with-param name="sAttribute">\n                    <xsl:call-template name="SReplace">\n                      <xsl:with-param name="sInput" select="$sAttribute" />\n                      <xsl:with-param name="sOrig" select="\'right\'" />\n                      <xsl:with-param name="sReplacement" select="\'\'" />\n                    </xsl:call-template>\n                  </xsl:with-param>\n                </xsl:call-template>\n              </xsl:when>\n              <xsl:otherwise>\n                <xsl:call-template name="CreateMencloseNotationAttrFromBorderBoxAttr">\n                  <xsl:with-param name="fStrikeH" select="$fStrikeH" />\n                  <xsl:with-param name="fStrikeV" select="$fStrikeV" />\n                  <xsl:with-param name="fStrikeBLTR" select="$fStrikeBLTR" />\n                  <xsl:with-param name="fStrikeTLBR" select="$fStrikeTLBR" />\n                  <xsl:with-param name="sAttribute" select="$sAttribute" />\n                </xsl:call-template>\n              </xsl:otherwise>\n            </xsl:choose>\n          </xsl:when>\n          <xsl:when test="string-length($fStrikeH) &gt; 0">\n            <xsl:choose>\n              <xsl:when test="$fStrikeH=1">\n                <xsl:call-template name="CreateMencloseNotationAttrFromBorderBoxAttr">\n                  <xsl:with-param name="fStrikeV" select="$fStrikeV" />\n                  <xsl:with-param name="fStrikeBLTR" select="$fStrikeBLTR" />\n                  <xsl:with-param name="fStrikeTLBR" select="$fStrikeTLBR" />\n                  <xsl:with-param name="sAttribute" select="concat($sAttribute, \' horizontalstrike\')" />\n                </xsl:call-template>\n              </xsl:when>\n              <xsl:otherwise>\n                <xsl:call-template name="CreateMencloseNotationAttrFromBorderBoxAttr">\n                  <xsl:with-param name="fStrikeV" select="$fStrikeV" />\n                  <xsl:with-param name="fStrikeBLTR" select="$fStrikeBLTR" />\n                  <xsl:with-param name="fStrikeTLBR" select="$fStrikeTLBR" />\n                  <xsl:with-param name="sAttribute" select="$sAttribute" />\n                </xsl:call-template>\n              </xsl:otherwise>\n            </xsl:choose>\n          </xsl:when>\n          <xsl:when test="string-length($fStrikeV) &gt; 0">\n            <xsl:choose>\n              <xsl:when test="$fStrikeV=1">\n                <xsl:call-template name="CreateMencloseNotationAttrFromBorderBoxAttr">\n                  <xsl:with-param name="fStrikeBLTR" select="$fStrikeBLTR" />\n                  <xsl:with-param name="fStrikeTLBR" select="$fStrikeTLBR" />\n                  <xsl:with-param name="sAttribute" select="concat($sAttribute, \' verticalstrike\')" />\n                </xsl:call-template>\n              </xsl:when>\n              <xsl:otherwise>\n                <xsl:call-template name="CreateMencloseNotationAttrFromBorderBoxAttr">\n                  <xsl:with-param name="fStrikeBLTR" select="$fStrikeBLTR" />\n                  <xsl:with-param name="fStrikeTLBR" select="$fStrikeTLBR" />\n                  <xsl:with-param name="sAttribute" select="$sAttribute" />\n                </xsl:call-template>\n              </xsl:otherwise>\n            </xsl:choose>\n          </xsl:when>\n          <xsl:when test="string-length($fStrikeBLTR) &gt; 0">\n            <xsl:choose>\n              <xsl:when test="$fStrikeBLTR=1">\n                <xsl:call-template name="CreateMencloseNotationAttrFromBorderBoxAttr">\n                  <xsl:with-param name="fStrikeTLBR" select="$fStrikeTLBR" />\n                  <xsl:with-param name="sAttribute" select="concat($sAttribute, \' updiagonalstrike\')" />\n                </xsl:call-template>\n              </xsl:when>\n              <xsl:otherwise>\n                <xsl:call-template name="CreateMencloseNotationAttrFromBorderBoxAttr">\n                  <xsl:with-param name="fStrikeTLBR" select="$fStrikeTLBR" />\n                  <xsl:with-param name="sAttribute" select="$sAttribute" />\n                </xsl:call-template>\n              </xsl:otherwise>\n            </xsl:choose>\n          </xsl:when>\n          <xsl:when test="string-length($fStrikeTLBR) &gt; 0">\n            <xsl:choose>\n              <xsl:when test="$fStrikeTLBR=1">\n                <xsl:call-template name="CreateMencloseNotationAttrFromBorderBoxAttr">\n                  <xsl:with-param name="sAttribute" select="concat($sAttribute, \' downdiagonalstrike\')" />\n                </xsl:call-template>\n              </xsl:when>\n              <xsl:otherwise>\n                <xsl:call-template name="CreateMencloseNotationAttrFromBorderBoxAttr">\n                  <xsl:with-param name="sAttribute" select="$sAttribute" />\n                </xsl:call-template>\n              </xsl:otherwise>\n            </xsl:choose>\n          </xsl:when>\n          <xsl:otherwise>\n            <xsl:attribute name="notation">\n              <xsl:value-of select="normalize-space($sAttribute)" />\n            </xsl:attribute>\n          </xsl:otherwise>\n        </xsl:choose>\n      </xsl:otherwise>\n    </xsl:choose>\n  </xsl:template>\n\n  \x3c!-- Tristate (true, false, neither) from string value --\x3e\n  <xsl:template name="TFromStrVal">\n    <xsl:param name="str" />\n    <xsl:choose>\n      <xsl:when test="$str = \'on\' or $str = \'1\' or $str = \'true\'">1</xsl:when>\n      <xsl:when test="$str = \'off\' or $str = \'0\' or $str = \'false\'">0</xsl:when>\n      <xsl:otherwise>-1</xsl:otherwise>\n    </xsl:choose>\n  </xsl:template>\n\n  \x3c!-- Return 0 iff $str is explicitly set to a false value.\n       Return true otherwise --\x3e\n  <xsl:template name="ForceFalseStrVal">\n    <xsl:param name="str" />\n    <xsl:variable name="tValue">\n      <xsl:call-template name="TFromStrVal">\n        <xsl:with-param name="str" select="$str"/>\n      </xsl:call-template>\n    </xsl:variable>\n    <xsl:choose>\n      <xsl:when test="$tValue = \'0\'">0</xsl:when>\n      <xsl:otherwise>1</xsl:otherwise>\n    </xsl:choose>\n  </xsl:template>\n\n  \x3c!-- Return 1 iff $str is explicitly set to a true value.\n       Return false otherwise --\x3e\n  <xsl:template name="ForceTrueStrVal">\n    <xsl:param name="str" />\n    <xsl:variable name="tValue">\n      <xsl:call-template name="TFromStrVal">\n        <xsl:with-param name="str" select="$str"/>\n      </xsl:call-template>\n    </xsl:variable>\n    <xsl:choose>\n      <xsl:when test="$tValue = \'1\'">1</xsl:when>\n      <xsl:otherwise>0</xsl:otherwise>\n    </xsl:choose>\n  </xsl:template>\n</xsl:stylesheet>\n'.trim());t.xsl=l}));
;/*!node_modules/ooxml-viewer/lib/openxml/math/convertOOML.js*/
amis.define("node_modules/ooxml-viewer/lib/openxml/math/convertOOML",(function(e,o,n,r){"use strict";Object.defineProperty(o,"__esModule",{value:!0});var t=e("node_modules/ooxml-viewer/lib/openxml/math/xsl");o.convertOOXML=function(e){var o=new XSLTProcessor;return o.importStylesheet(t.xsl),o.transformToFragment(e,document)}}));
;/*!node_modules/ooxml-viewer/lib/render/renderMath.js*/
amis.define("node_modules/ooxml-viewer/lib/render/renderMath",(function(e,n,r,o){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var t=e("node_modules/ooxml-viewer/lib/openxml/math/convertOOML");n.renderOMath=function(e,n){return t.convertOOXML(n.element)}}));
;/*!node_modules/ooxml-viewer/lib/render/renderParagraph.js*/
amis.define("node_modules/ooxml-viewer/lib/render/renderParagraph",(function(e,r,n,o){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var l=e("node_modules/tslib/tslib"),d=e("node_modules/ooxml-viewer/lib/util/dom"),i=e("node_modules/ooxml-viewer/lib/openxml/word/Run"),a=e("node_modules/ooxml-viewer/lib/openxml/word/Bookmark"),t=e("node_modules/ooxml-viewer/lib/openxml/word/Hyperlink"),m=e("node_modules/ooxml-viewer/lib/render/renderRun"),s=e("node_modules/ooxml-viewer/lib/render/renderHyperLink"),u=e("node_modules/ooxml-viewer/lib/render/renderBookmark"),p=e("node_modules/ooxml-viewer/lib/render/renderNumbering"),v=e("node_modules/ooxml-viewer/lib/render/setElementStyle"),b=e("node_modules/ooxml-viewer/lib/render/renderTab"),f=e("node_modules/ooxml-viewer/lib/openxml/math/OMath"),x=e("node_modules/ooxml-viewer/lib/render/renderMath");r.default=function(e,r,n){var o,h,w,_;void 0===n&&(n=!0),e.currentParagraph=r;var c=d.createElement("p");e.addClass(c,"p");var y=r.properties;if(v.setElementStyle(e,c,y),y.numPr&&d.appendChild(c,p.renderNumbering(c,e,y.numPr)),y.tabs)try{for(var k=l.__values(y.tabs),C=k.next();!C.done;C=k.next()){var M=C.value;d.appendChild(c,b.renderTab(e,M))}}catch(e){o={error:e}}finally{try{C&&!C.done&&(h=k.return)&&h.call(k)}finally{if(o)throw o.error}}var g=!1;try{for(var H=l.__values(r.children),P=H.next();!P.done;P=H.next()){var B=P.value;if(B instanceof i.Run)"begin"===B.fldChar?g=!0:B&&(g=!1),d.appendChild(c,m.default(e,B,r,g));else if(B instanceof a.BookmarkStart)d.appendChild(c,u.renderBookmarkStart(e,B));else if(B instanceof t.Hyperlink){var L=s.renderHyperLink(e,B,r);d.appendChild(c,L)}else B instanceof f.OMath?d.appendChild(c,x.renderOMath(e,B)):console.warn("unknow pargraph type",B)}}catch(e){w={error:e}}finally{try{P&&!P.done&&(_=H.return)&&_.call(H)}finally{if(w)throw w.error}}return""===c.innerHTML&&n&&(c.innerHTML="&nbsp;"),c}}));
;/*!node_modules/ooxml-viewer/lib/render/renderSection.js*/
amis.define("node_modules/ooxml-viewer/lib/render/renderSection",(function(e,t,i,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=e("node_modules/ooxml-viewer/lib/util/dom");t.renderSection=function(e,t){var i=r.createElement("section");i.style.position="relative";var n=t.properties,d=n.pageSize;if(d&&(e.renderOptions.ignoreWidth||(i.style.width=d.width),e.renderOptions.ignoreHeight||(i.style.height=d.height)),e.renderOptions.padding)i.style.padding=e.renderOptions.padding;else{var o=n.pageMargin;o&&(i.style.paddingLeft=o.left||"0",i.style.paddingRight=o.right||"0",i.style.paddingTop=o.top||"0",i.style.paddingBottom=o.bottom||"0")}return i}}));
;/*!node_modules/ooxml-viewer/lib/render/renderBody.js*/
amis.define("node_modules/ooxml-viewer/lib/render/renderBody",(function(e,r,o,l){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n=e("node_modules/tslib/tslib"),d=e("node_modules/ooxml-viewer/lib/util/dom"),a=e("node_modules/ooxml-viewer/lib/openxml/word/Paragraph"),i=e("node_modules/ooxml-viewer/lib/openxml/word/Table"),t=e("node_modules/ooxml-viewer/lib/render/renderParagraph"),u=e("node_modules/ooxml-viewer/lib/render/renderSection"),s=e("node_modules/ooxml-viewer/lib/render/renderTable");r.default=function(e,r,o){var l,v,m,c;try{for(var f=n.__values(o.sections),p=f.next();!p.done;p=f.next()){var _=p.value,b=u.renderSection(e,_);d.appendChild(r,b);try{for(var h=(m=void 0,n.__values(_.children)),w=h.next();!w.done;w=h.next()){var x=w.value;if(x instanceof a.Paragraph){var y=t.default(e,x);d.appendChild(b,y)}else x instanceof i.Table?d.appendChild(b,s.default(e,x)):console.warn("unknown child",x)}}catch(e){m={error:e}}finally{try{w&&!w.done&&(c=h.return)&&c.call(h)}finally{if(m)throw m.error}}d.appendChild(r,b)}}catch(e){l={error:e}}finally{try{p&&!p.done&&(v=f.return)&&v.call(f)}finally{if(l)throw l.error}}}}));
;/*!node_modules/ooxml-viewer/lib/render/renderDocument.js*/
amis.define("node_modules/ooxml-viewer/lib/render/renderDocument",(function(e,o,r,d){"use strict";Object.defineProperty(o,"__esModule",{value:!0});var l=e("node_modules/ooxml-viewer/lib/util/dom"),n=e("node_modules/ooxml-viewer/lib/render/renderBody");o.default=function(e,o){var r=l.createElement("article");return n.default(e,r,o.body),r}}));
;/*!node_modules/ooxml-viewer/lib/util/blob.js*/
amis.define("node_modules/ooxml-viewer/lib/util/blob",(function(e,o,d,n){"use strict";Object.defineProperty(o,"__esModule",{value:!0}),o.downloadBlob=function(e,o){void 0===o&&(o="file.txt");var d=URL.createObjectURL(e),n=document.createElement("a");n.href=d,n.download=o,document.body.appendChild(n),n.dispatchEvent(new MouseEvent("click",{bubbles:!0,cancelable:!0,view:window})),document.body.removeChild(n)}}));
;/*!node_modules/ooxml-viewer/lib/openxml/word/numbering/Lvl.js*/
amis.define("node_modules/ooxml-viewer/lib/openxml/word/numbering/Lvl",(function(e,r,l,a){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var t=e("node_modules/tslib/tslib"),n=e("node_modules/ooxml-viewer/lib/openxml/word/Run"),o=e("node_modules/ooxml-viewer/lib/OpenXML"),s=e("node_modules/ooxml-viewer/lib/openxml/word/Paragraph"),i=function(){function e(){this.start=1,this.lvlText="%1.",this.isLgl=!1,this.lvlJc="start",this.suff="space"}return e.fromXML=function(r,l){var a,i,u=new e;u.ilvl=l.getAttribute("w:ilvl");try{for(var c=t.__values(l.children),v=c.next();!v.done;v=c.next()){var w=v.value,m=w.tagName;switch(m){case"w:start":u.start=o.getValNumber(w);break;case"w:numFmt":u.numFmt=o.getVal(w);break;case"w:lvlText":u.lvlText=o.getVal(w);break;case"w:lvlJc":u.lvlJc=o.getVal(w);break;case"w:legacy":case"w:pStyle":break;case"w:pPr":u.pPr=s.Paragraph.parseParagraphPr(r,w);break;case"w:rPr":u.rPr=n.Run.parseRunPr(r,w);break;case"w:isLgl":u.isLgl=o.getValBoolean(w);break;default:console.warn("Lvl: Unknown tag ",m,w)}}}catch(e){a={error:e}}finally{try{v&&!v.done&&(i=c.return)&&i.call(c)}finally{if(a)throw a.error}}return u},e}();r.Lvl=i}));
;/*!node_modules/ooxml-viewer/lib/openxml/word/numbering/AbstractNum.js*/
amis.define("node_modules/ooxml-viewer/lib/openxml/word/numbering/AbstractNum",(function(e,t,l,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=e("node_modules/tslib/tslib"),o=e("node_modules/ooxml-viewer/lib/openxml/word/numbering/Lvl"),i=e("node_modules/ooxml-viewer/lib/OpenXML"),u=function(){function e(){this.lvls={}}return e.fromXML=function(t,l){var r,u,m=new e;m.abstractNumId=l.getAttribute("w:abstractNumId")||"",m.multiLevelType=l.getAttribute("w:multiLevelType");var a=l.getElementsByTagName("w:lvl");try{for(var v=n.__values(a),s=v.next();!s.done;s=v.next()){var d=s.value,b=d.getAttribute("w:ilvl")||"";m.lvls[b]=o.Lvl.fromXML(t,d)}}catch(e){r={error:e}}finally{try{s&&!s.done&&(u=v.return)&&u.call(v)}finally{if(r)throw r.error}}var c=l.getElementsByTagName("w:multiLevelType").item(0);return c&&(m.multiLevelType=i.getVal(c)),m},e}();t.AbstractNum=u}));
;/*!node_modules/ooxml-viewer/lib/openxml/word/numbering/Num.js*/
amis.define("node_modules/ooxml-viewer/lib/openxml/word/numbering/Num",(function(e,r,l,t){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n=e("node_modules/tslib/tslib"),a=e("node_modules/ooxml-viewer/lib/OpenXML"),i=e("node_modules/ooxml-viewer/lib/openxml/word/numbering/Lvl"),o=function(){function e(){this.lvlOverride={lvls:{}}}return e.fromXML=function(r,l){var t,o,v=new e;v.numId=l.getAttribute("w:numId")||"";var u=l.getElementsByTagName("w:abstractNumId").item(0);u&&(v.abstractNumId=a.getVal(u));var d=l.getElementsByTagName("w:lvlOverride").item(0);if(d)try{for(var m=n.__values(d.children),s=m.next();!s.done;s=m.next()){var w=s.value,b=w.tagName;switch(b){case"w:lvl":var c=w.getAttribute("w:lvlId")||"";v.lvlOverride.lvls[c]=i.Lvl.fromXML(r,w);break;case"w:startOverride":var f=w.getAttribute("w:lvlId")||"";v.lvlOverride.lvls[f]&&(v.lvlOverride.lvls[f].start=a.getValNumber(w));break;default:console.warn("Num: Unknown tag ",b,w)}}}catch(e){t={error:e}}finally{try{s&&!s.done&&(o=m.return)&&o.call(m)}finally{if(t)throw t.error}}return v},e}();r.Num=o}));
;/*!node_modules/ooxml-viewer/lib/openxml/word/numbering/Numbering.js*/
amis.define("node_modules/ooxml-viewer/lib/openxml/word/numbering/Numbering",(function(e,r,n,t){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var o=e("node_modules/tslib/tslib"),u=e("node_modules/ooxml-viewer/lib/openxml/word/numbering/AbstractNum"),a=e("node_modules/ooxml-viewer/lib/openxml/word/numbering/Num"),m=function(){function e(){this.abstractNums={},this.nums={},this.numData={}}return e.fromXML=function(r,n){var t,m,l,i,s=new e;try{for(var d=o.__values(n.getElementsByTagName("w:abstractNum")),c=d.next();!c.done;c=d.next()){var b=c.value,f=u.AbstractNum.fromXML(r,b);s.abstractNums[f.abstractNumId]=f}}catch(e){t={error:e}}finally{try{c&&!c.done&&(m=d.return)&&m.call(d)}finally{if(t)throw t.error}}try{for(var v=o.__values(n.getElementsByTagName("w:num")),N=v.next();!N.done;N=v.next()){var w=N.value,y=a.Num.fromXML(r,w);s.nums[y.numId]=y,s.numData[y.numId]={}}}catch(e){l={error:e}}finally{try{N&&!N.done&&(i=v.return)&&i.call(v)}finally{if(l)throw l.error}}return s},e}();r.Numbering=m}));
;/*!node_modules/ooxml-viewer/lib/util/mergeRun.js*/
amis.define("node_modules/ooxml-viewer/lib/util/mergeRun",(function(e,r,t,n){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var a=e("node_modules/tslib/tslib"),l=e("node_modules/ooxml-viewer/lib/parse/parsePr");function o(e,r,t){var n=r?l.parsePr(e,r):{},a=t?l.parsePr(e,t):{};return JSON.stringify(n)===JSON.stringify(a)}function i(e,r){var t=e.getElementsByTagName("w:t")[0],n=r.getElementsByTagName("w:t")[0];if(t&&n){var a=n.textContent||"";t.textContent+=a||""}}function u(e){var r,t,n=e.tagName,l=e.children,o=!1,i=!1;try{for(var u=a.__values(l),f=u.next();!f.done;f=u.next()){var s=f.value;if("w:t"===s.tagName){o=!0,i="preserve"===s.getAttribute("xml:space");break}}}catch(e){r={error:e}}finally{try{f&&!f.done&&(t=u.return)&&t.call(u)}finally{if(r)throw r.error}}return"w:r"===n&&o&&!i}function f(e,r){var t,n,l,f,s=[],v=null;try{for(var c=a.__values(r.children),y=c.next();!y.done;y=c.next()){var m=y.value,d=m.tagName;if(u(m))if(v)o(e,v.getElementsByTagName("w:rPr")[0],m.getElementsByTagName("w:rPr")[0])?i(v,m):(v=m,s.push(m));else v=m,s.push(m);else"w:proofErr"!==d&&(v=null,s.push(m))}}catch(e){t={error:e}}finally{try{y&&!y.done&&(n=c.return)&&n.call(c)}finally{if(t)throw t.error}}r.innerHTML="";try{for(var g=a.__values(s),h=g.next();!h.done;h=g.next()){var p=h.value;r.appendChild(p)}}catch(e){l={error:e}}finally{try{h&&!h.done&&(f=g.return)&&f.call(g)}finally{if(l)throw l.error}}}r.canMerge=u,r.mergeRun=function(e,r){var t,n,l=r.getElementsByTagName("w:p");try{for(var o=a.__values(l),i=o.next();!i.done;i=o.next()){f(e,i.value)}}catch(e){t={error:e}}finally{try{i&&!i.done&&(n=o.return)&&n.call(o)}finally{if(t)throw t.error}}},r.mergeRunInP=f}));
;/*!node_modules/ooxml-viewer/lib/openxml/word/Section.js*/
amis.define("node_modules/ooxml-viewer/lib/openxml/word/Section",(function(e,r,t,i){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var a=e("node_modules/tslib/tslib"),o=e("node_modules/ooxml-viewer/lib/parse/parseSize"),n=e("node_modules/ooxml-viewer/lib/openxml/word/Paragraph"),l=function(){function e(){this.properties={},this.children=[]}return e.prototype.addChild=function(e){this.children.push(e)},e.parsePr=function(e,r,t){var i,l,s={};try{for(var d=a.__values(r.children),p=d.next();!p.done;p=d.next()){var u=p.value;switch(u.tagName){case"w:pgSz":s.pageSize={width:o.parseSize(u,"w:w"),height:o.parseSize(u,"w:h")};break;case"w:pgMar":s.pageMargin={left:o.parseSize(u,"w:left"),right:o.parseSize(u,"w:right"),top:o.parseSize(u,"w:top"),bottom:o.parseSize(u,"w:bottom"),header:o.parseSize(u,"w:header"),footer:o.parseSize(u,"w:footer"),gutter:o.parseSize(u,"w:gutter")};break;case"w:headerReference":var w=u.getAttribute("w:type"),h=u.getAttribute("r:id");if("default"===w&&h){var c=e.getDocumentRels(h);if(c){var f=e.getXML("/word/"+c.target).getElementsByTagName("w:p").item(0);if(f){var g=n.Paragraph.fromXML(e,f);t.addChild(g)}}}}}}catch(e){i={error:e}}finally{try{p&&!p.done&&(l=d.return)&&l.call(d)}finally{if(i)throw i.error}}return s},e}();r.Section=l}));
;/*!node_modules/ooxml-viewer/lib/openxml/word/Body.js*/
amis.define("node_modules/ooxml-viewer/lib/openxml/word/Body",(function(e,o,r,t){"use strict";Object.defineProperty(o,"__esModule",{value:!0});var n=e("node_modules/tslib/tslib"),i=e("node_modules/ooxml-viewer/lib/parse/mergeSdt"),a=e("node_modules/ooxml-viewer/lib/parse/parseTable"),s=e("node_modules/ooxml-viewer/lib/openxml/word/Paragraph"),d=e("node_modules/ooxml-viewer/lib/openxml/word/Section"),c=function(){function e(){this.sections=[],this.currentSection=new d.Section,this.sections.push(this.currentSection)}return e.prototype.addChild=function(e){this.currentSection.addChild(e)},e.prototype.addSection=function(e){this.currentSection.properties=e,this.currentSection=new d.Section,this.sections.push(this.currentSection)},e.fromXML=function(o,r){var t,c,l=new e;try{for(var u=n.__values(i.mergeSdt(r)),m=u.next();!m.done;m=u.next()){var h=m.value,p=h.tagName;switch(p){case"w:p":var w=s.Paragraph.fromXML(o,h);l.addChild(w);break;case"w:tbl":var b=a.parseTable(o,h);l.addChild(b);break;case"w:bookmarkStart":case"w:bookmarkEnd":break;case"w:sectPr":l.addSection(d.Section.parsePr(o,h,l));break;default:console.warn("Body.fromXML Unknown key",p,h)}}}catch(e){t={error:e}}finally{try{m&&!m.done&&(c=u.return)&&c.call(u)}finally{if(t)throw t.error}}return l},e}();o.Body=c}));
;/*!node_modules/ooxml-viewer/lib/openxml/word/WDocument.js*/
amis.define("node_modules/ooxml-viewer/lib/openxml/word/WDocument",(function(e,o,r,t){"use strict";Object.defineProperty(o,"__esModule",{value:!0});var l=e("node_modules/tslib/tslib"),a=e("node_modules/ooxml-viewer/lib/parse/parseColor"),n=e("node_modules/ooxml-viewer/lib/openxml/word/Body"),m=function(){function e(){}return e.fromXML=function(o,r){var t,m,i=new e,s=r.getElementsByTagName("w:body").item(0);s&&(i.body=n.Body.fromXML(o,s));var d=r.getElementsByTagName("w:background").item(0);if(d){var c={};try{for(var u=l.__values(d.attributes),w=u.next();!w.done;w=u.next()){switch(w.value.name){case"w:color":c.color=a.parseColorAttr(o,d,"w:color");break;case"w:themeColor":c.themeColor=a.parseColorAttr(o,d,"w:themeColor");break;case"w:themeShade":c.themeShade=a.parseColorAttr(o,d,"w:themeShade");break;case"w:themeTint":c.themeTint=a.parseColorAttr(o,d,"w:themeTint")}}}catch(e){t={error:e}}finally{try{w&&!w.done&&(m=u.return)&&m.call(u)}finally{if(t)throw t.error}}}return i},e}();o.WDocument=m}));
;/*!node_modules/fflate/lib/worker.cjs*/
amis.define('node_modules/fflate/lib/worker.cjs', function(require, exports, module, define) {

  "use strict";
  var ch2 = {};
  exports["default"] = (function (c, id, msg, transfer, cb) {
      var w = new Worker(ch2[id] || (ch2[id] = URL.createObjectURL(new Blob([
          c + ';addEventListener("error",function(e){e=e.error;postMessage({$e$:[e.message,e.code,e.stack]})})'
      ], { type: 'text/javascript' }))));
      w.onmessage = function (e) {
          var d = e.data, ed = d.$e$;
          if (ed) {
              var err = new Error(ed[0]);
              err['code'] = ed[1];
              err.stack = ed[2];
              cb(err, null);
          }
          else
              cb(null, d);
      };
      w.postMessage(msg, transfer);
      return w;
  });
  

});

;/*!node_modules/fflate/lib/index.cjs*/
amis.define('node_modules/fflate/lib/index.cjs', function(require, exports, module, define) {

  "use strict";
  // DEFLATE is a complex format; to read this code, you should probably check the RFC first:
  // https://tools.ietf.org/html/rfc1951
  // You may also wish to take a look at the guide I made about this program:
  // https://gist.github.com/101arrowz/253f31eb5abc3d9275ab943003ffecad
  // Some of the following code is similar to that of UZIP.js:
  // https://github.com/photopea/UZIP.js
  // However, the vast majority of the codebase has diverged from UZIP.js to increase performance and reduce bundle size.
  // Sometimes 0 will appear where -1 would be more appropriate. This is because using a uint
  // is better for memory in most engines (I *think*).
  var node_worker_1 = require("node_modules/fflate/lib/worker.cjs");
  // aliases for shorter compressed code (most minifers don't do this)
  var u8 = Uint8Array, u16 = Uint16Array, u32 = Uint32Array;
  // fixed length extra bits
  var fleb = new u8([0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0, /* unused */ 0, 0, /* impossible */ 0]);
  // fixed distance extra bits
  // see fleb note
  var fdeb = new u8([0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, /* unused */ 0, 0]);
  // code length index map
  var clim = new u8([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]);
  // get base, reverse index map from extra bits
  var freb = function (eb, start) {
      var b = new u16(31);
      for (var i = 0; i < 31; ++i) {
          b[i] = start += 1 << eb[i - 1];
      }
      // numbers here are at max 18 bits
      var r = new u32(b[30]);
      for (var i = 1; i < 30; ++i) {
          for (var j = b[i]; j < b[i + 1]; ++j) {
              r[j] = ((j - b[i]) << 5) | i;
          }
      }
      return [b, r];
  };
  var _a = freb(fleb, 2), fl = _a[0], revfl = _a[1];
  // we can ignore the fact that the other numbers are wrong; they never happen anyway
  fl[28] = 258, revfl[258] = 28;
  var _b = freb(fdeb, 0), fd = _b[0], revfd = _b[1];
  // map of value to reverse (assuming 16 bits)
  var rev = new u16(32768);
  for (var i = 0; i < 32768; ++i) {
      // reverse table algorithm from SO
      var x = ((i & 0xAAAA) >>> 1) | ((i & 0x5555) << 1);
      x = ((x & 0xCCCC) >>> 2) | ((x & 0x3333) << 2);
      x = ((x & 0xF0F0) >>> 4) | ((x & 0x0F0F) << 4);
      rev[i] = (((x & 0xFF00) >>> 8) | ((x & 0x00FF) << 8)) >>> 1;
  }
  // create huffman tree from u8 "map": index -> code length for code index
  // mb (max bits) must be at most 15
  // TODO: optimize/split up?
  var hMap = (function (cd, mb, r) {
      var s = cd.length;
      // index
      var i = 0;
      // u16 "map": index -> # of codes with bit length = index
      var l = new u16(mb);
      // length of cd must be 288 (total # of codes)
      for (; i < s; ++i) {
          if (cd[i])
              ++l[cd[i] - 1];
      }
      // u16 "map": index -> minimum code for bit length = index
      var le = new u16(mb);
      for (i = 0; i < mb; ++i) {
          le[i] = (le[i - 1] + l[i - 1]) << 1;
      }
      var co;
      if (r) {
          // u16 "map": index -> number of actual bits, symbol for code
          co = new u16(1 << mb);
          // bits to remove for reverser
          var rvb = 15 - mb;
          for (i = 0; i < s; ++i) {
              // ignore 0 lengths
              if (cd[i]) {
                  // num encoding both symbol and bits read
                  var sv = (i << 4) | cd[i];
                  // free bits
                  var r_1 = mb - cd[i];
                  // start value
                  var v = le[cd[i] - 1]++ << r_1;
                  // m is end value
                  for (var m = v | ((1 << r_1) - 1); v <= m; ++v) {
                      // every 16 bit value starting with the code yields the same result
                      co[rev[v] >>> rvb] = sv;
                  }
              }
          }
      }
      else {
          co = new u16(s);
          for (i = 0; i < s; ++i) {
              if (cd[i]) {
                  co[i] = rev[le[cd[i] - 1]++] >>> (15 - cd[i]);
              }
          }
      }
      return co;
  });
  // fixed length tree
  var flt = new u8(288);
  for (var i = 0; i < 144; ++i)
      flt[i] = 8;
  for (var i = 144; i < 256; ++i)
      flt[i] = 9;
  for (var i = 256; i < 280; ++i)
      flt[i] = 7;
  for (var i = 280; i < 288; ++i)
      flt[i] = 8;
  // fixed distance tree
  var fdt = new u8(32);
  for (var i = 0; i < 32; ++i)
      fdt[i] = 5;
  // fixed length map
  var flm = /*#__PURE__*/ hMap(flt, 9, 0), flrm = /*#__PURE__*/ hMap(flt, 9, 1);
  // fixed distance map
  var fdm = /*#__PURE__*/ hMap(fdt, 5, 0), fdrm = /*#__PURE__*/ hMap(fdt, 5, 1);
  // find max of array
  var max = function (a) {
      var m = a[0];
      for (var i = 1; i < a.length; ++i) {
          if (a[i] > m)
              m = a[i];
      }
      return m;
  };
  // read d, starting at bit p and mask with m
  var bits = function (d, p, m) {
      var o = (p / 8) | 0;
      return ((d[o] | (d[o + 1] << 8)) >> (p & 7)) & m;
  };
  // read d, starting at bit p continuing for at least 16 bits
  var bits16 = function (d, p) {
      var o = (p / 8) | 0;
      return ((d[o] | (d[o + 1] << 8) | (d[o + 2] << 16)) >> (p & 7));
  };
  // get end of byte
  var shft = function (p) { return ((p + 7) / 8) | 0; };
  // typed array slice - allows garbage collector to free original reference,
  // while being more compatible than .slice
  var slc = function (v, s, e) {
      if (s == null || s < 0)
          s = 0;
      if (e == null || e > v.length)
          e = v.length;
      // can't use .constructor in case user-supplied
      var n = new (v.BYTES_PER_ELEMENT == 2 ? u16 : v.BYTES_PER_ELEMENT == 4 ? u32 : u8)(e - s);
      n.set(v.subarray(s, e));
      return n;
  };
  /**
   * Codes for errors generated within this library
   */
  exports.FlateErrorCode = {
      UnexpectedEOF: 0,
      InvalidBlockType: 1,
      InvalidLengthLiteral: 2,
      InvalidDistance: 3,
      StreamFinished: 4,
      NoStreamHandler: 5,
      InvalidHeader: 6,
      NoCallback: 7,
      InvalidUTF8: 8,
      ExtraFieldTooLong: 9,
      InvalidDate: 10,
      FilenameTooLong: 11,
      StreamFinishing: 12,
      InvalidZipData: 13,
      UnknownCompressionMethod: 14
  };
  // error codes
  var ec = [
      'unexpected EOF',
      'invalid block type',
      'invalid length/literal',
      'invalid distance',
      'stream finished',
      'no stream handler',
      ,
      'no callback',
      'invalid UTF-8 data',
      'extra field too long',
      'date not in range 1980-2099',
      'filename too long',
      'stream finishing',
      'invalid zip data'
      // determined by unknown compression method
  ];
  ;
  var err = function (ind, msg, nt) {
      var e = new Error(msg || ec[ind]);
      e.code = ind;
      if (Error.captureStackTrace)
          Error.captureStackTrace(e, err);
      if (!nt)
          throw e;
      return e;
  };
  // expands raw DEFLATE data
  var inflt = function (dat, buf, st) {
      // source length
      var sl = dat.length;
      if (!sl || (st && st.f && !st.l))
          return buf || new u8(0);
      // have to estimate size
      var noBuf = !buf || st;
      // no state
      var noSt = !st || st.i;
      if (!st)
          st = {};
      // Assumes roughly 33% compression ratio average
      if (!buf)
          buf = new u8(sl * 3);
      // ensure buffer can fit at least l elements
      var cbuf = function (l) {
          var bl = buf.length;
          // need to increase size to fit
          if (l > bl) {
              // Double or set to necessary, whichever is greater
              var nbuf = new u8(Math.max(bl * 2, l));
              nbuf.set(buf);
              buf = nbuf;
          }
      };
      //  last chunk         bitpos           bytes
      var final = st.f || 0, pos = st.p || 0, bt = st.b || 0, lm = st.l, dm = st.d, lbt = st.m, dbt = st.n;
      // total bits
      var tbts = sl * 8;
      do {
          if (!lm) {
              // BFINAL - this is only 1 when last chunk is next
              final = bits(dat, pos, 1);
              // type: 0 = no compression, 1 = fixed huffman, 2 = dynamic huffman
              var type = bits(dat, pos + 1, 3);
              pos += 3;
              if (!type) {
                  // go to end of byte boundary
                  var s = shft(pos) + 4, l = dat[s - 4] | (dat[s - 3] << 8), t = s + l;
                  if (t > sl) {
                      if (noSt)
                          err(0);
                      break;
                  }
                  // ensure size
                  if (noBuf)
                      cbuf(bt + l);
                  // Copy over uncompressed data
                  buf.set(dat.subarray(s, t), bt);
                  // Get new bitpos, update byte count
                  st.b = bt += l, st.p = pos = t * 8, st.f = final;
                  continue;
              }
              else if (type == 1)
                  lm = flrm, dm = fdrm, lbt = 9, dbt = 5;
              else if (type == 2) {
                  //  literal                            lengths
                  var hLit = bits(dat, pos, 31) + 257, hcLen = bits(dat, pos + 10, 15) + 4;
                  var tl = hLit + bits(dat, pos + 5, 31) + 1;
                  pos += 14;
                  // length+distance tree
                  var ldt = new u8(tl);
                  // code length tree
                  var clt = new u8(19);
                  for (var i = 0; i < hcLen; ++i) {
                      // use index map to get real code
                      clt[clim[i]] = bits(dat, pos + i * 3, 7);
                  }
                  pos += hcLen * 3;
                  // code lengths bits
                  var clb = max(clt), clbmsk = (1 << clb) - 1;
                  // code lengths map
                  var clm = hMap(clt, clb, 1);
                  for (var i = 0; i < tl;) {
                      var r = clm[bits(dat, pos, clbmsk)];
                      // bits read
                      pos += r & 15;
                      // symbol
                      var s = r >>> 4;
                      // code length to copy
                      if (s < 16) {
                          ldt[i++] = s;
                      }
                      else {
                          //  copy   count
                          var c = 0, n = 0;
                          if (s == 16)
                              n = 3 + bits(dat, pos, 3), pos += 2, c = ldt[i - 1];
                          else if (s == 17)
                              n = 3 + bits(dat, pos, 7), pos += 3;
                          else if (s == 18)
                              n = 11 + bits(dat, pos, 127), pos += 7;
                          while (n--)
                              ldt[i++] = c;
                      }
                  }
                  //    length tree                 distance tree
                  var lt = ldt.subarray(0, hLit), dt = ldt.subarray(hLit);
                  // max length bits
                  lbt = max(lt);
                  // max dist bits
                  dbt = max(dt);
                  lm = hMap(lt, lbt, 1);
                  dm = hMap(dt, dbt, 1);
              }
              else
                  err(1);
              if (pos > tbts) {
                  if (noSt)
                      err(0);
                  break;
              }
          }
          // Make sure the buffer can hold this + the largest possible addition
          // Maximum chunk size (practically, theoretically infinite) is 2^17;
          if (noBuf)
              cbuf(bt + 131072);
          var lms = (1 << lbt) - 1, dms = (1 << dbt) - 1;
          var lpos = pos;
          for (;; lpos = pos) {
              // bits read, code
              var c = lm[bits16(dat, pos) & lms], sym = c >>> 4;
              pos += c & 15;
              if (pos > tbts) {
                  if (noSt)
                      err(0);
                  break;
              }
              if (!c)
                  err(2);
              if (sym < 256)
                  buf[bt++] = sym;
              else if (sym == 256) {
                  lpos = pos, lm = null;
                  break;
              }
              else {
                  var add = sym - 254;
                  // no extra bits needed if less
                  if (sym > 264) {
                      // index
                      var i = sym - 257, b = fleb[i];
                      add = bits(dat, pos, (1 << b) - 1) + fl[i];
                      pos += b;
                  }
                  // dist
                  var d = dm[bits16(dat, pos) & dms], dsym = d >>> 4;
                  if (!d)
                      err(3);
                  pos += d & 15;
                  var dt = fd[dsym];
                  if (dsym > 3) {
                      var b = fdeb[dsym];
                      dt += bits16(dat, pos) & ((1 << b) - 1), pos += b;
                  }
                  if (pos > tbts) {
                      if (noSt)
                          err(0);
                      break;
                  }
                  if (noBuf)
                      cbuf(bt + 131072);
                  var end = bt + add;
                  for (; bt < end; bt += 4) {
                      buf[bt] = buf[bt - dt];
                      buf[bt + 1] = buf[bt + 1 - dt];
                      buf[bt + 2] = buf[bt + 2 - dt];
                      buf[bt + 3] = buf[bt + 3 - dt];
                  }
                  bt = end;
              }
          }
          st.l = lm, st.p = lpos, st.b = bt, st.f = final;
          if (lm)
              final = 1, st.m = lbt, st.d = dm, st.n = dbt;
      } while (!final);
      return bt == buf.length ? buf : slc(buf, 0, bt);
  };
  // starting at p, write the minimum number of bits that can hold v to d
  var wbits = function (d, p, v) {
      v <<= p & 7;
      var o = (p / 8) | 0;
      d[o] |= v;
      d[o + 1] |= v >>> 8;
  };
  // starting at p, write the minimum number of bits (>8) that can hold v to d
  var wbits16 = function (d, p, v) {
      v <<= p & 7;
      var o = (p / 8) | 0;
      d[o] |= v;
      d[o + 1] |= v >>> 8;
      d[o + 2] |= v >>> 16;
  };
  // creates code lengths from a frequency table
  var hTree = function (d, mb) {
      // Need extra info to make a tree
      var t = [];
      for (var i = 0; i < d.length; ++i) {
          if (d[i])
              t.push({ s: i, f: d[i] });
      }
      var s = t.length;
      var t2 = t.slice();
      if (!s)
          return [et, 0];
      if (s == 1) {
          var v = new u8(t[0].s + 1);
          v[t[0].s] = 1;
          return [v, 1];
      }
      t.sort(function (a, b) { return a.f - b.f; });
      // after i2 reaches last ind, will be stopped
      // freq must be greater than largest possible number of symbols
      t.push({ s: -1, f: 25001 });
      var l = t[0], r = t[1], i0 = 0, i1 = 1, i2 = 2;
      t[0] = { s: -1, f: l.f + r.f, l: l, r: r };
      // efficient algorithm from UZIP.js
      // i0 is lookbehind, i2 is lookahead - after processing two low-freq
      // symbols that combined have high freq, will start processing i2 (high-freq,
      // non-composite) symbols instead
      // see https://reddit.com/r/photopea/comments/ikekht/uzipjs_questions/
      while (i1 != s - 1) {
          l = t[t[i0].f < t[i2].f ? i0++ : i2++];
          r = t[i0 != i1 && t[i0].f < t[i2].f ? i0++ : i2++];
          t[i1++] = { s: -1, f: l.f + r.f, l: l, r: r };
      }
      var maxSym = t2[0].s;
      for (var i = 1; i < s; ++i) {
          if (t2[i].s > maxSym)
              maxSym = t2[i].s;
      }
      // code lengths
      var tr = new u16(maxSym + 1);
      // max bits in tree
      var mbt = ln(t[i1 - 1], tr, 0);
      if (mbt > mb) {
          // more algorithms from UZIP.js
          // TODO: find out how this code works (debt)
          //  ind    debt
          var i = 0, dt = 0;
          //    left            cost
          var lft = mbt - mb, cst = 1 << lft;
          t2.sort(function (a, b) { return tr[b.s] - tr[a.s] || a.f - b.f; });
          for (; i < s; ++i) {
              var i2_1 = t2[i].s;
              if (tr[i2_1] > mb) {
                  dt += cst - (1 << (mbt - tr[i2_1]));
                  tr[i2_1] = mb;
              }
              else
                  break;
          }
          dt >>>= lft;
          while (dt > 0) {
              var i2_2 = t2[i].s;
              if (tr[i2_2] < mb)
                  dt -= 1 << (mb - tr[i2_2]++ - 1);
              else
                  ++i;
          }
          for (; i >= 0 && dt; --i) {
              var i2_3 = t2[i].s;
              if (tr[i2_3] == mb) {
                  --tr[i2_3];
                  ++dt;
              }
          }
          mbt = mb;
      }
      return [new u8(tr), mbt];
  };
  // get the max length and assign length codes
  var ln = function (n, l, d) {
      return n.s == -1
          ? Math.max(ln(n.l, l, d + 1), ln(n.r, l, d + 1))
          : (l[n.s] = d);
  };
  // length codes generation
  var lc = function (c) {
      var s = c.length;
      // Note that the semicolon was intentional
      while (s && !c[--s])
          ;
      var cl = new u16(++s);
      //  ind      num         streak
      var cli = 0, cln = c[0], cls = 1;
      var w = function (v) { cl[cli++] = v; };
      for (var i = 1; i <= s; ++i) {
          if (c[i] == cln && i != s)
              ++cls;
          else {
              if (!cln && cls > 2) {
                  for (; cls > 138; cls -= 138)
                      w(32754);
                  if (cls > 2) {
                      w(cls > 10 ? ((cls - 11) << 5) | 28690 : ((cls - 3) << 5) | 12305);
                      cls = 0;
                  }
              }
              else if (cls > 3) {
                  w(cln), --cls;
                  for (; cls > 6; cls -= 6)
                      w(8304);
                  if (cls > 2)
                      w(((cls - 3) << 5) | 8208), cls = 0;
              }
              while (cls--)
                  w(cln);
              cls = 1;
              cln = c[i];
          }
      }
      return [cl.subarray(0, cli), s];
  };
  // calculate the length of output from tree, code lengths
  var clen = function (cf, cl) {
      var l = 0;
      for (var i = 0; i < cl.length; ++i)
          l += cf[i] * cl[i];
      return l;
  };
  // writes a fixed block
  // returns the new bit pos
  var wfblk = function (out, pos, dat) {
      // no need to write 00 as type: TypedArray defaults to 0
      var s = dat.length;
      var o = shft(pos + 2);
      out[o] = s & 255;
      out[o + 1] = s >>> 8;
      out[o + 2] = out[o] ^ 255;
      out[o + 3] = out[o + 1] ^ 255;
      for (var i = 0; i < s; ++i)
          out[o + i + 4] = dat[i];
      return (o + 4 + s) * 8;
  };
  // writes a block
  var wblk = function (dat, out, final, syms, lf, df, eb, li, bs, bl, p) {
      wbits(out, p++, final);
      ++lf[256];
      var _a = hTree(lf, 15), dlt = _a[0], mlb = _a[1];
      var _b = hTree(df, 15), ddt = _b[0], mdb = _b[1];
      var _c = lc(dlt), lclt = _c[0], nlc = _c[1];
      var _d = lc(ddt), lcdt = _d[0], ndc = _d[1];
      var lcfreq = new u16(19);
      for (var i = 0; i < lclt.length; ++i)
          lcfreq[lclt[i] & 31]++;
      for (var i = 0; i < lcdt.length; ++i)
          lcfreq[lcdt[i] & 31]++;
      var _e = hTree(lcfreq, 7), lct = _e[0], mlcb = _e[1];
      var nlcc = 19;
      for (; nlcc > 4 && !lct[clim[nlcc - 1]]; --nlcc)
          ;
      var flen = (bl + 5) << 3;
      var ftlen = clen(lf, flt) + clen(df, fdt) + eb;
      var dtlen = clen(lf, dlt) + clen(df, ddt) + eb + 14 + 3 * nlcc + clen(lcfreq, lct) + (2 * lcfreq[16] + 3 * lcfreq[17] + 7 * lcfreq[18]);
      if (flen <= ftlen && flen <= dtlen)
          return wfblk(out, p, dat.subarray(bs, bs + bl));
      var lm, ll, dm, dl;
      wbits(out, p, 1 + (dtlen < ftlen)), p += 2;
      if (dtlen < ftlen) {
          lm = hMap(dlt, mlb, 0), ll = dlt, dm = hMap(ddt, mdb, 0), dl = ddt;
          var llm = hMap(lct, mlcb, 0);
          wbits(out, p, nlc - 257);
          wbits(out, p + 5, ndc - 1);
          wbits(out, p + 10, nlcc - 4);
          p += 14;
          for (var i = 0; i < nlcc; ++i)
              wbits(out, p + 3 * i, lct[clim[i]]);
          p += 3 * nlcc;
          var lcts = [lclt, lcdt];
          for (var it = 0; it < 2; ++it) {
              var clct = lcts[it];
              for (var i = 0; i < clct.length; ++i) {
                  var len = clct[i] & 31;
                  wbits(out, p, llm[len]), p += lct[len];
                  if (len > 15)
                      wbits(out, p, (clct[i] >>> 5) & 127), p += clct[i] >>> 12;
              }
          }
      }
      else {
          lm = flm, ll = flt, dm = fdm, dl = fdt;
      }
      for (var i = 0; i < li; ++i) {
          if (syms[i] > 255) {
              var len = (syms[i] >>> 18) & 31;
              wbits16(out, p, lm[len + 257]), p += ll[len + 257];
              if (len > 7)
                  wbits(out, p, (syms[i] >>> 23) & 31), p += fleb[len];
              var dst = syms[i] & 31;
              wbits16(out, p, dm[dst]), p += dl[dst];
              if (dst > 3)
                  wbits16(out, p, (syms[i] >>> 5) & 8191), p += fdeb[dst];
          }
          else {
              wbits16(out, p, lm[syms[i]]), p += ll[syms[i]];
          }
      }
      wbits16(out, p, lm[256]);
      return p + ll[256];
  };
  // deflate options (nice << 13) | chain
  var deo = /*#__PURE__*/ new u32([65540, 131080, 131088, 131104, 262176, 1048704, 1048832, 2114560, 2117632]);
  // empty
  var et = /*#__PURE__*/ new u8(0);
  // compresses data into a raw DEFLATE buffer
  var dflt = function (dat, lvl, plvl, pre, post, lst) {
      var s = dat.length;
      var o = new u8(pre + s + 5 * (1 + Math.ceil(s / 7000)) + post);
      // writing to this writes to the output buffer
      var w = o.subarray(pre, o.length - post);
      var pos = 0;
      if (!lvl || s < 8) {
          for (var i = 0; i <= s; i += 65535) {
              // end
              var e = i + 65535;
              if (e >= s) {
                  // write final block
                  w[pos >> 3] = lst;
              }
              pos = wfblk(w, pos + 1, dat.subarray(i, e));
          }
      }
      else {
          var opt = deo[lvl - 1];
          var n = opt >>> 13, c = opt & 8191;
          var msk_1 = (1 << plvl) - 1;
          //    prev 2-byte val map    curr 2-byte val map
          var prev = new u16(32768), head = new u16(msk_1 + 1);
          var bs1_1 = Math.ceil(plvl / 3), bs2_1 = 2 * bs1_1;
          var hsh = function (i) { return (dat[i] ^ (dat[i + 1] << bs1_1) ^ (dat[i + 2] << bs2_1)) & msk_1; };
          // 24576 is an arbitrary number of maximum symbols per block
          // 424 buffer for last block
          var syms = new u32(25000);
          // length/literal freq   distance freq
          var lf = new u16(288), df = new u16(32);
          //  l/lcnt  exbits  index  l/lind  waitdx  bitpos
          var lc_1 = 0, eb = 0, i = 0, li = 0, wi = 0, bs = 0;
          for (; i < s; ++i) {
              // hash value
              // deopt when i > s - 3 - at end, deopt acceptable
              var hv = hsh(i);
              // index mod 32768    previous index mod
              var imod = i & 32767, pimod = head[hv];
              prev[imod] = pimod;
              head[hv] = imod;
              // We always should modify head and prev, but only add symbols if
              // this data is not yet processed ("wait" for wait index)
              if (wi <= i) {
                  // bytes remaining
                  var rem = s - i;
                  if ((lc_1 > 7000 || li > 24576) && rem > 423) {
                      pos = wblk(dat, w, 0, syms, lf, df, eb, li, bs, i - bs, pos);
                      li = lc_1 = eb = 0, bs = i;
                      for (var j = 0; j < 286; ++j)
                          lf[j] = 0;
                      for (var j = 0; j < 30; ++j)
                          df[j] = 0;
                  }
                  //  len    dist   chain
                  var l = 2, d = 0, ch_1 = c, dif = (imod - pimod) & 32767;
                  if (rem > 2 && hv == hsh(i - dif)) {
                      var maxn = Math.min(n, rem) - 1;
                      var maxd = Math.min(32767, i);
                      // max possible length
                      // not capped at dif because decompressors implement "rolling" index population
                      var ml = Math.min(258, rem);
                      while (dif <= maxd && --ch_1 && imod != pimod) {
                          if (dat[i + l] == dat[i + l - dif]) {
                              var nl = 0;
                              for (; nl < ml && dat[i + nl] == dat[i + nl - dif]; ++nl)
                                  ;
                              if (nl > l) {
                                  l = nl, d = dif;
                                  // break out early when we reach "nice" (we are satisfied enough)
                                  if (nl > maxn)
                                      break;
                                  // now, find the rarest 2-byte sequence within this
                                  // length of literals and search for that instead.
                                  // Much faster than just using the start
                                  var mmd = Math.min(dif, nl - 2);
                                  var md = 0;
                                  for (var j = 0; j < mmd; ++j) {
                                      var ti = (i - dif + j + 32768) & 32767;
                                      var pti = prev[ti];
                                      var cd = (ti - pti + 32768) & 32767;
                                      if (cd > md)
                                          md = cd, pimod = ti;
                                  }
                              }
                          }
                          // check the previous match
                          imod = pimod, pimod = prev[imod];
                          dif += (imod - pimod + 32768) & 32767;
                      }
                  }
                  // d will be nonzero only when a match was found
                  if (d) {
                      // store both dist and len data in one Uint32
                      // Make sure this is recognized as a len/dist with 28th bit (2^28)
                      syms[li++] = 268435456 | (revfl[l] << 18) | revfd[d];
                      var lin = revfl[l] & 31, din = revfd[d] & 31;
                      eb += fleb[lin] + fdeb[din];
                      ++lf[257 + lin];
                      ++df[din];
                      wi = i + l;
                      ++lc_1;
                  }
                  else {
                      syms[li++] = dat[i];
                      ++lf[dat[i]];
                  }
              }
          }
          pos = wblk(dat, w, lst, syms, lf, df, eb, li, bs, i - bs, pos);
          // this is the easiest way to avoid needing to maintain state
          if (!lst && pos & 7)
              pos = wfblk(w, pos + 1, et);
      }
      return slc(o, 0, pre + shft(pos) + post);
  };
  // CRC32 table
  var crct = /*#__PURE__*/ (function () {
      var t = new Int32Array(256);
      for (var i = 0; i < 256; ++i) {
          var c = i, k = 9;
          while (--k)
              c = ((c & 1) && -306674912) ^ (c >>> 1);
          t[i] = c;
      }
      return t;
  })();
  // CRC32
  var crc = function () {
      var c = -1;
      return {
          p: function (d) {
              // closures have awful performance
              var cr = c;
              for (var i = 0; i < d.length; ++i)
                  cr = crct[(cr & 255) ^ d[i]] ^ (cr >>> 8);
              c = cr;
          },
          d: function () { return ~c; }
      };
  };
  // Alder32
  var adler = function () {
      var a = 1, b = 0;
      return {
          p: function (d) {
              // closures have awful performance
              var n = a, m = b;
              var l = d.length | 0;
              for (var i = 0; i != l;) {
                  var e = Math.min(i + 2655, l);
                  for (; i < e; ++i)
                      m += n += d[i];
                  n = (n & 65535) + 15 * (n >> 16), m = (m & 65535) + 15 * (m >> 16);
              }
              a = n, b = m;
          },
          d: function () {
              a %= 65521, b %= 65521;
              return (a & 255) << 24 | (a >>> 8) << 16 | (b & 255) << 8 | (b >>> 8);
          }
      };
  };
  ;
  // deflate with opts
  var dopt = function (dat, opt, pre, post, st) {
      return dflt(dat, opt.level == null ? 6 : opt.level, opt.mem == null ? Math.ceil(Math.max(8, Math.min(13, Math.log(dat.length))) * 1.5) : (12 + opt.mem), pre, post, !st);
  };
  // Walmart object spread
  var mrg = function (a, b) {
      var o = {};
      for (var k in a)
          o[k] = a[k];
      for (var k in b)
          o[k] = b[k];
      return o;
  };
  // worker clone
  // This is possibly the craziest part of the entire codebase, despite how simple it may seem.
  // The only parameter to this function is a closure that returns an array of variables outside of the function scope.
  // We're going to try to figure out the variable names used in the closure as strings because that is crucial for workerization.
  // We will return an object mapping of true variable name to value (basically, the current scope as a JS object).
  // The reason we can't just use the original variable names is minifiers mangling the toplevel scope.
  // This took me three weeks to figure out how to do.
  var wcln = function (fn, fnStr, td) {
      var dt = fn();
      var st = fn.toString();
      var ks = st.slice(st.indexOf('[') + 1, st.lastIndexOf(']')).replace(/\s+/g, '').split(',');
      for (var i = 0; i < dt.length; ++i) {
          var v = dt[i], k = ks[i];
          if (typeof v == 'function') {
              fnStr += ';' + k + '=';
              var st_1 = v.toString();
              if (v.prototype) {
                  // for global objects
                  if (st_1.indexOf('[native code]') != -1) {
                      var spInd = st_1.indexOf(' ', 8) + 1;
                      fnStr += st_1.slice(spInd, st_1.indexOf('(', spInd));
                  }
                  else {
                      fnStr += st_1;
                      for (var t in v.prototype)
                          fnStr += ';' + k + '.prototype.' + t + '=' + v.prototype[t].toString();
                  }
              }
              else
                  fnStr += st_1;
          }
          else
              td[k] = v;
      }
      return [fnStr, td];
  };
  var ch = [];
  // clone bufs
  var cbfs = function (v) {
      var tl = [];
      for (var k in v) {
          if (v[k].buffer) {
              tl.push((v[k] = new v[k].constructor(v[k])).buffer);
          }
      }
      return tl;
  };
  // use a worker to execute code
  var wrkr = function (fns, init, id, cb) {
      var _a;
      if (!ch[id]) {
          var fnStr = '', td_1 = {}, m = fns.length - 1;
          for (var i = 0; i < m; ++i)
              _a = wcln(fns[i], fnStr, td_1), fnStr = _a[0], td_1 = _a[1];
          ch[id] = wcln(fns[m], fnStr, td_1);
      }
      var td = mrg({}, ch[id][1]);
      return node_worker_1["default"](ch[id][0] + ';onmessage=function(e){for(var k in e.data)self[k]=e.data[k];onmessage=' + init.toString() + '}', id, td, cbfs(td), cb);
  };
  // base async inflate fn
  var bInflt = function () { return [u8, u16, u32, fleb, fdeb, clim, fl, fd, flrm, fdrm, rev, ec, hMap, max, bits, bits16, shft, slc, err, inflt, inflateSync, pbf, gu8]; };
  var bDflt = function () { return [u8, u16, u32, fleb, fdeb, clim, revfl, revfd, flm, flt, fdm, fdt, rev, deo, et, hMap, wbits, wbits16, hTree, ln, lc, clen, wfblk, wblk, shft, slc, dflt, dopt, deflateSync, pbf]; };
  // gzip extra
  var gze = function () { return [gzh, gzhl, wbytes, crc, crct]; };
  // gunzip extra
  var guze = function () { return [gzs, gzl]; };
  // zlib extra
  var zle = function () { return [zlh, wbytes, adler]; };
  // unzlib extra
  var zule = function () { return [zlv]; };
  // post buf
  var pbf = function (msg) { return postMessage(msg, [msg.buffer]); };
  // get u8
  var gu8 = function (o) { return o && o.size && new u8(o.size); };
  // async helper
  var cbify = function (dat, opts, fns, init, id, cb) {
      var w = wrkr(fns, init, id, function (err, dat) {
          w.terminate();
          cb(err, dat);
      });
      w.postMessage([dat, opts], opts.consume ? [dat.buffer] : []);
      return function () { w.terminate(); };
  };
  // auto stream
  var astrm = function (strm) {
      strm.ondata = function (dat, final) { return postMessage([dat, final], [dat.buffer]); };
      return function (ev) { return strm.push(ev.data[0], ev.data[1]); };
  };
  // async stream attach
  var astrmify = function (fns, strm, opts, init, id) {
      var t;
      var w = wrkr(fns, init, id, function (err, dat) {
          if (err)
              w.terminate(), strm.ondata.call(strm, err);
          else {
              if (dat[1])
                  w.terminate();
              strm.ondata.call(strm, err, dat[0], dat[1]);
          }
      });
      w.postMessage(opts);
      strm.push = function (d, f) {
          if (!strm.ondata)
              err(5);
          if (t)
              strm.ondata(err(4, 0, 1), null, !!f);
          w.postMessage([d, t = f], [d.buffer]);
      };
      strm.terminate = function () { w.terminate(); };
  };
  // read 2 bytes
  var b2 = function (d, b) { return d[b] | (d[b + 1] << 8); };
  // read 4 bytes
  var b4 = function (d, b) { return (d[b] | (d[b + 1] << 8) | (d[b + 2] << 16) | (d[b + 3] << 24)) >>> 0; };
  var b8 = function (d, b) { return b4(d, b) + (b4(d, b + 4) * 4294967296); };
  // write bytes
  var wbytes = function (d, b, v) {
      for (; v; ++b)
          d[b] = v, v >>>= 8;
  };
  // gzip header
  var gzh = function (c, o) {
      var fn = o.filename;
      c[0] = 31, c[1] = 139, c[2] = 8, c[8] = o.level < 2 ? 4 : o.level == 9 ? 2 : 0, c[9] = 3; // assume Unix
      if (o.mtime != 0)
          wbytes(c, 4, Math.floor(new Date(o.mtime || Date.now()) / 1000));
      if (fn) {
          c[3] = 8;
          for (var i = 0; i <= fn.length; ++i)
              c[i + 10] = fn.charCodeAt(i);
      }
  };
  // gzip footer: -8 to -4 = CRC, -4 to -0 is length
  // gzip start
  var gzs = function (d) {
      if (d[0] != 31 || d[1] != 139 || d[2] != 8)
          err(6, 'invalid gzip data');
      var flg = d[3];
      var st = 10;
      if (flg & 4)
          st += d[10] | (d[11] << 8) + 2;
      for (var zs = (flg >> 3 & 1) + (flg >> 4 & 1); zs > 0; zs -= !d[st++])
          ;
      return st + (flg & 2);
  };
  // gzip length
  var gzl = function (d) {
      var l = d.length;
      return ((d[l - 4] | d[l - 3] << 8 | d[l - 2] << 16) | (d[l - 1] << 24)) >>> 0;
  };
  // gzip header length
  var gzhl = function (o) { return 10 + ((o.filename && (o.filename.length + 1)) || 0); };
  // zlib header
  var zlh = function (c, o) {
      var lv = o.level, fl = lv == 0 ? 0 : lv < 6 ? 1 : lv == 9 ? 3 : 2;
      c[0] = 120, c[1] = (fl << 6) | (fl ? (32 - 2 * fl) : 1);
  };
  // zlib valid
  var zlv = function (d) {
      if ((d[0] & 15) != 8 || (d[0] >>> 4) > 7 || ((d[0] << 8 | d[1]) % 31))
          err(6, 'invalid zlib data');
      if (d[1] & 32)
          err(6, 'invalid zlib data: preset dictionaries not supported');
  };
  function AsyncCmpStrm(opts, cb) {
      if (!cb && typeof opts == 'function')
          cb = opts, opts = {};
      this.ondata = cb;
      return opts;
  }
  // zlib footer: -4 to -0 is Adler32
  /**
   * Streaming DEFLATE compression
   */
  var Deflate = /*#__PURE__*/ (function () {
      function Deflate(opts, cb) {
          if (!cb && typeof opts == 'function')
              cb = opts, opts = {};
          this.ondata = cb;
          this.o = opts || {};
      }
      Deflate.prototype.p = function (c, f) {
          this.ondata(dopt(c, this.o, 0, 0, !f), f);
      };
      /**
       * Pushes a chunk to be deflated
       * @param chunk The chunk to push
       * @param final Whether this is the last chunk
       */
      Deflate.prototype.push = function (chunk, final) {
          if (!this.ondata)
              err(5);
          if (this.d)
              err(4);
          this.d = final;
          this.p(chunk, final || false);
      };
      return Deflate;
  }());
  exports.Deflate = Deflate;
  /**
   * Asynchronous streaming DEFLATE compression
   */
  var AsyncDeflate = /*#__PURE__*/ (function () {
      function AsyncDeflate(opts, cb) {
          astrmify([
              bDflt,
              function () { return [astrm, Deflate]; }
          ], this, AsyncCmpStrm.call(this, opts, cb), function (ev) {
              var strm = new Deflate(ev.data);
              onmessage = astrm(strm);
          }, 6);
      }
      return AsyncDeflate;
  }());
  exports.AsyncDeflate = AsyncDeflate;
  function deflate(data, opts, cb) {
      if (!cb)
          cb = opts, opts = {};
      if (typeof cb != 'function')
          err(7);
      return cbify(data, opts, [
          bDflt,
      ], function (ev) { return pbf(deflateSync(ev.data[0], ev.data[1])); }, 0, cb);
  }
  exports.deflate = deflate;
  /**
   * Compresses data with DEFLATE without any wrapper
   * @param data The data to compress
   * @param opts The compression options
   * @returns The deflated version of the data
   */
  function deflateSync(data, opts) {
      return dopt(data, opts || {}, 0, 0);
  }
  exports.deflateSync = deflateSync;
  /**
   * Streaming DEFLATE decompression
   */
  var Inflate = /*#__PURE__*/ (function () {
      /**
       * Creates an inflation stream
       * @param cb The callback to call whenever data is inflated
       */
      function Inflate(cb) {
          this.s = {};
          this.p = new u8(0);
          this.ondata = cb;
      }
      Inflate.prototype.e = function (c) {
          if (!this.ondata)
              err(5);
          if (this.d)
              err(4);
          var l = this.p.length;
          var n = new u8(l + c.length);
          n.set(this.p), n.set(c, l), this.p = n;
      };
      Inflate.prototype.c = function (final) {
          this.d = this.s.i = final || false;
          var bts = this.s.b;
          var dt = inflt(this.p, this.o, this.s);
          this.ondata(slc(dt, bts, this.s.b), this.d);
          this.o = slc(dt, this.s.b - 32768), this.s.b = this.o.length;
          this.p = slc(this.p, (this.s.p / 8) | 0), this.s.p &= 7;
      };
      /**
       * Pushes a chunk to be inflated
       * @param chunk The chunk to push
       * @param final Whether this is the final chunk
       */
      Inflate.prototype.push = function (chunk, final) {
          this.e(chunk), this.c(final);
      };
      return Inflate;
  }());
  exports.Inflate = Inflate;
  /**
   * Asynchronous streaming DEFLATE decompression
   */
  var AsyncInflate = /*#__PURE__*/ (function () {
      /**
       * Creates an asynchronous inflation stream
       * @param cb The callback to call whenever data is deflated
       */
      function AsyncInflate(cb) {
          this.ondata = cb;
          astrmify([
              bInflt,
              function () { return [astrm, Inflate]; }
          ], this, 0, function () {
              var strm = new Inflate();
              onmessage = astrm(strm);
          }, 7);
      }
      return AsyncInflate;
  }());
  exports.AsyncInflate = AsyncInflate;
  function inflate(data, opts, cb) {
      if (!cb)
          cb = opts, opts = {};
      if (typeof cb != 'function')
          err(7);
      return cbify(data, opts, [
          bInflt
      ], function (ev) { return pbf(inflateSync(ev.data[0], gu8(ev.data[1]))); }, 1, cb);
  }
  exports.inflate = inflate;
  /**
   * Expands DEFLATE data with no wrapper
   * @param data The data to decompress
   * @param out Where to write the data. Saves memory if you know the decompressed size and provide an output buffer of that length.
   * @returns The decompressed version of the data
   */
  function inflateSync(data, out) {
      return inflt(data, out);
  }
  exports.inflateSync = inflateSync;
  // before you yell at me for not just using extends, my reason is that TS inheritance is hard to workerize.
  /**
   * Streaming GZIP compression
   */
  var Gzip = /*#__PURE__*/ (function () {
      function Gzip(opts, cb) {
          this.c = crc();
          this.l = 0;
          this.v = 1;
          Deflate.call(this, opts, cb);
      }
      /**
       * Pushes a chunk to be GZIPped
       * @param chunk The chunk to push
       * @param final Whether this is the last chunk
       */
      Gzip.prototype.push = function (chunk, final) {
          Deflate.prototype.push.call(this, chunk, final);
      };
      Gzip.prototype.p = function (c, f) {
          this.c.p(c);
          this.l += c.length;
          var raw = dopt(c, this.o, this.v && gzhl(this.o), f && 8, !f);
          if (this.v)
              gzh(raw, this.o), this.v = 0;
          if (f)
              wbytes(raw, raw.length - 8, this.c.d()), wbytes(raw, raw.length - 4, this.l);
          this.ondata(raw, f);
      };
      return Gzip;
  }());
  exports.Gzip = Gzip;
  exports.Compress = Gzip;
  /**
   * Asynchronous streaming GZIP compression
   */
  var AsyncGzip = /*#__PURE__*/ (function () {
      function AsyncGzip(opts, cb) {
          astrmify([
              bDflt,
              gze,
              function () { return [astrm, Deflate, Gzip]; }
          ], this, AsyncCmpStrm.call(this, opts, cb), function (ev) {
              var strm = new Gzip(ev.data);
              onmessage = astrm(strm);
          }, 8);
      }
      return AsyncGzip;
  }());
  exports.AsyncGzip = AsyncGzip;
  exports.AsyncCompress = AsyncGzip;
  function gzip(data, opts, cb) {
      if (!cb)
          cb = opts, opts = {};
      if (typeof cb != 'function')
          err(7);
      return cbify(data, opts, [
          bDflt,
          gze,
          function () { return [gzipSync]; }
      ], function (ev) { return pbf(gzipSync(ev.data[0], ev.data[1])); }, 2, cb);
  }
  exports.gzip = gzip;
  exports.compress = gzip;
  /**
   * Compresses data with GZIP
   * @param data The data to compress
   * @param opts The compression options
   * @returns The gzipped version of the data
   */
  function gzipSync(data, opts) {
      if (!opts)
          opts = {};
      var c = crc(), l = data.length;
      c.p(data);
      var d = dopt(data, opts, gzhl(opts), 8), s = d.length;
      return gzh(d, opts), wbytes(d, s - 8, c.d()), wbytes(d, s - 4, l), d;
  }
  exports.gzipSync = gzipSync;
  exports.compressSync = gzipSync;
  /**
   * Streaming GZIP decompression
   */
  var Gunzip = /*#__PURE__*/ (function () {
      /**
       * Creates a GUNZIP stream
       * @param cb The callback to call whenever data is inflated
       */
      function Gunzip(cb) {
          this.v = 1;
          Inflate.call(this, cb);
      }
      /**
       * Pushes a chunk to be GUNZIPped
       * @param chunk The chunk to push
       * @param final Whether this is the last chunk
       */
      Gunzip.prototype.push = function (chunk, final) {
          Inflate.prototype.e.call(this, chunk);
          if (this.v) {
              var s = this.p.length > 3 ? gzs(this.p) : 4;
              if (s >= this.p.length && !final)
                  return;
              this.p = this.p.subarray(s), this.v = 0;
          }
          if (final) {
              if (this.p.length < 8)
                  err(6, 'invalid gzip data');
              this.p = this.p.subarray(0, -8);
          }
          // necessary to prevent TS from using the closure value
          // This allows for workerization to function correctly
          Inflate.prototype.c.call(this, final);
      };
      return Gunzip;
  }());
  exports.Gunzip = Gunzip;
  /**
   * Asynchronous streaming GZIP decompression
   */
  var AsyncGunzip = /*#__PURE__*/ (function () {
      /**
       * Creates an asynchronous GUNZIP stream
       * @param cb The callback to call whenever data is deflated
       */
      function AsyncGunzip(cb) {
          this.ondata = cb;
          astrmify([
              bInflt,
              guze,
              function () { return [astrm, Inflate, Gunzip]; }
          ], this, 0, function () {
              var strm = new Gunzip();
              onmessage = astrm(strm);
          }, 9);
      }
      return AsyncGunzip;
  }());
  exports.AsyncGunzip = AsyncGunzip;
  function gunzip(data, opts, cb) {
      if (!cb)
          cb = opts, opts = {};
      if (typeof cb != 'function')
          err(7);
      return cbify(data, opts, [
          bInflt,
          guze,
          function () { return [gunzipSync]; }
      ], function (ev) { return pbf(gunzipSync(ev.data[0])); }, 3, cb);
  }
  exports.gunzip = gunzip;
  /**
   * Expands GZIP data
   * @param data The data to decompress
   * @param out Where to write the data. GZIP already encodes the output size, so providing this doesn't save memory.
   * @returns The decompressed version of the data
   */
  function gunzipSync(data, out) {
      return inflt(data.subarray(gzs(data), -8), out || new u8(gzl(data)));
  }
  exports.gunzipSync = gunzipSync;
  /**
   * Streaming Zlib compression
   */
  var Zlib = /*#__PURE__*/ (function () {
      function Zlib(opts, cb) {
          this.c = adler();
          this.v = 1;
          Deflate.call(this, opts, cb);
      }
      /**
       * Pushes a chunk to be zlibbed
       * @param chunk The chunk to push
       * @param final Whether this is the last chunk
       */
      Zlib.prototype.push = function (chunk, final) {
          Deflate.prototype.push.call(this, chunk, final);
      };
      Zlib.prototype.p = function (c, f) {
          this.c.p(c);
          var raw = dopt(c, this.o, this.v && 2, f && 4, !f);
          if (this.v)
              zlh(raw, this.o), this.v = 0;
          if (f)
              wbytes(raw, raw.length - 4, this.c.d());
          this.ondata(raw, f);
      };
      return Zlib;
  }());
  exports.Zlib = Zlib;
  /**
   * Asynchronous streaming Zlib compression
   */
  var AsyncZlib = /*#__PURE__*/ (function () {
      function AsyncZlib(opts, cb) {
          astrmify([
              bDflt,
              zle,
              function () { return [astrm, Deflate, Zlib]; }
          ], this, AsyncCmpStrm.call(this, opts, cb), function (ev) {
              var strm = new Zlib(ev.data);
              onmessage = astrm(strm);
          }, 10);
      }
      return AsyncZlib;
  }());
  exports.AsyncZlib = AsyncZlib;
  function zlib(data, opts, cb) {
      if (!cb)
          cb = opts, opts = {};
      if (typeof cb != 'function')
          err(7);
      return cbify(data, opts, [
          bDflt,
          zle,
          function () { return [zlibSync]; }
      ], function (ev) { return pbf(zlibSync(ev.data[0], ev.data[1])); }, 4, cb);
  }
  exports.zlib = zlib;
  /**
   * Compress data with Zlib
   * @param data The data to compress
   * @param opts The compression options
   * @returns The zlib-compressed version of the data
   */
  function zlibSync(data, opts) {
      if (!opts)
          opts = {};
      var a = adler();
      a.p(data);
      var d = dopt(data, opts, 2, 4);
      return zlh(d, opts), wbytes(d, d.length - 4, a.d()), d;
  }
  exports.zlibSync = zlibSync;
  /**
   * Streaming Zlib decompression
   */
  var Unzlib = /*#__PURE__*/ (function () {
      /**
       * Creates a Zlib decompression stream
       * @param cb The callback to call whenever data is inflated
       */
      function Unzlib(cb) {
          this.v = 1;
          Inflate.call(this, cb);
      }
      /**
       * Pushes a chunk to be unzlibbed
       * @param chunk The chunk to push
       * @param final Whether this is the last chunk
       */
      Unzlib.prototype.push = function (chunk, final) {
          Inflate.prototype.e.call(this, chunk);
          if (this.v) {
              if (this.p.length < 2 && !final)
                  return;
              this.p = this.p.subarray(2), this.v = 0;
          }
          if (final) {
              if (this.p.length < 4)
                  err(6, 'invalid zlib data');
              this.p = this.p.subarray(0, -4);
          }
          // necessary to prevent TS from using the closure value
          // This allows for workerization to function correctly
          Inflate.prototype.c.call(this, final);
      };
      return Unzlib;
  }());
  exports.Unzlib = Unzlib;
  /**
   * Asynchronous streaming Zlib decompression
   */
  var AsyncUnzlib = /*#__PURE__*/ (function () {
      /**
       * Creates an asynchronous Zlib decompression stream
       * @param cb The callback to call whenever data is deflated
       */
      function AsyncUnzlib(cb) {
          this.ondata = cb;
          astrmify([
              bInflt,
              zule,
              function () { return [astrm, Inflate, Unzlib]; }
          ], this, 0, function () {
              var strm = new Unzlib();
              onmessage = astrm(strm);
          }, 11);
      }
      return AsyncUnzlib;
  }());
  exports.AsyncUnzlib = AsyncUnzlib;
  function unzlib(data, opts, cb) {
      if (!cb)
          cb = opts, opts = {};
      if (typeof cb != 'function')
          err(7);
      return cbify(data, opts, [
          bInflt,
          zule,
          function () { return [unzlibSync]; }
      ], function (ev) { return pbf(unzlibSync(ev.data[0], gu8(ev.data[1]))); }, 5, cb);
  }
  exports.unzlib = unzlib;
  /**
   * Expands Zlib data
   * @param data The data to decompress
   * @param out Where to write the data. Saves memory if you know the decompressed size and provide an output buffer of that length.
   * @returns The decompressed version of the data
   */
  function unzlibSync(data, out) {
      return inflt((zlv(data), data.subarray(2, -4)), out);
  }
  exports.unzlibSync = unzlibSync;
  /**
   * Streaming GZIP, Zlib, or raw DEFLATE decompression
   */
  var Decompress = /*#__PURE__*/ (function () {
      /**
       * Creates a decompression stream
       * @param cb The callback to call whenever data is decompressed
       */
      function Decompress(cb) {
          this.G = Gunzip;
          this.I = Inflate;
          this.Z = Unzlib;
          this.ondata = cb;
      }
      /**
       * Pushes a chunk to be decompressed
       * @param chunk The chunk to push
       * @param final Whether this is the last chunk
       */
      Decompress.prototype.push = function (chunk, final) {
          if (!this.ondata)
              err(5);
          if (!this.s) {
              if (this.p && this.p.length) {
                  var n = new u8(this.p.length + chunk.length);
                  n.set(this.p), n.set(chunk, this.p.length);
              }
              else
                  this.p = chunk;
              if (this.p.length > 2) {
                  var _this_1 = this;
                  var cb = function () { _this_1.ondata.apply(_this_1, arguments); };
                  this.s = (this.p[0] == 31 && this.p[1] == 139 && this.p[2] == 8)
                      ? new this.G(cb)
                      : ((this.p[0] & 15) != 8 || (this.p[0] >> 4) > 7 || ((this.p[0] << 8 | this.p[1]) % 31))
                          ? new this.I(cb)
                          : new this.Z(cb);
                  this.s.push(this.p, final);
                  this.p = null;
              }
          }
          else
              this.s.push(chunk, final);
      };
      return Decompress;
  }());
  exports.Decompress = Decompress;
  /**
   * Asynchronous streaming GZIP, Zlib, or raw DEFLATE decompression
   */
  var AsyncDecompress = /*#__PURE__*/ (function () {
      /**
     * Creates an asynchronous decompression stream
     * @param cb The callback to call whenever data is decompressed
     */
      function AsyncDecompress(cb) {
          this.G = AsyncGunzip;
          this.I = AsyncInflate;
          this.Z = AsyncUnzlib;
          this.ondata = cb;
      }
      /**
       * Pushes a chunk to be decompressed
       * @param chunk The chunk to push
       * @param final Whether this is the last chunk
       */
      AsyncDecompress.prototype.push = function (chunk, final) {
          Decompress.prototype.push.call(this, chunk, final);
      };
      return AsyncDecompress;
  }());
  exports.AsyncDecompress = AsyncDecompress;
  function decompress(data, opts, cb) {
      if (!cb)
          cb = opts, opts = {};
      if (typeof cb != 'function')
          err(7);
      return (data[0] == 31 && data[1] == 139 && data[2] == 8)
          ? gunzip(data, opts, cb)
          : ((data[0] & 15) != 8 || (data[0] >> 4) > 7 || ((data[0] << 8 | data[1]) % 31))
              ? inflate(data, opts, cb)
              : unzlib(data, opts, cb);
  }
  exports.decompress = decompress;
  /**
   * Expands compressed GZIP, Zlib, or raw DEFLATE data, automatically detecting the format
   * @param data The data to decompress
   * @param out Where to write the data. Saves memory if you know the decompressed size and provide an output buffer of that length.
   * @returns The decompressed version of the data
   */
  function decompressSync(data, out) {
      return (data[0] == 31 && data[1] == 139 && data[2] == 8)
          ? gunzipSync(data, out)
          : ((data[0] & 15) != 8 || (data[0] >> 4) > 7 || ((data[0] << 8 | data[1]) % 31))
              ? inflateSync(data, out)
              : unzlibSync(data, out);
  }
  exports.decompressSync = decompressSync;
  // flatten a directory structure
  var fltn = function (d, p, t, o) {
      for (var k in d) {
          var val = d[k], n = p + k, op = o;
          if (Array.isArray(val))
              op = mrg(o, val[1]), val = val[0];
          if (val instanceof u8)
              t[n] = [val, op];
          else {
              t[n += '/'] = [new u8(0), op];
              fltn(val, n, t, o);
          }
      }
  };
  // text encoder
  var te = typeof TextEncoder != 'undefined' && /*#__PURE__*/ new TextEncoder();
  // text decoder
  var td = typeof TextDecoder != 'undefined' && /*#__PURE__*/ new TextDecoder();
  // text decoder stream
  var tds = 0;
  try {
      td.decode(et, { stream: true });
      tds = 1;
  }
  catch (e) { }
  // decode UTF8
  var dutf8 = function (d) {
      for (var r = '', i = 0;;) {
          var c = d[i++];
          var eb = (c > 127) + (c > 223) + (c > 239);
          if (i + eb > d.length)
              return [r, slc(d, i - 1)];
          if (!eb)
              r += String.fromCharCode(c);
          else if (eb == 3) {
              c = ((c & 15) << 18 | (d[i++] & 63) << 12 | (d[i++] & 63) << 6 | (d[i++] & 63)) - 65536,
                  r += String.fromCharCode(55296 | (c >> 10), 56320 | (c & 1023));
          }
          else if (eb & 1)
              r += String.fromCharCode((c & 31) << 6 | (d[i++] & 63));
          else
              r += String.fromCharCode((c & 15) << 12 | (d[i++] & 63) << 6 | (d[i++] & 63));
      }
  };
  /**
   * Streaming UTF-8 decoding
   */
  var DecodeUTF8 = /*#__PURE__*/ (function () {
      /**
       * Creates a UTF-8 decoding stream
       * @param cb The callback to call whenever data is decoded
       */
      function DecodeUTF8(cb) {
          this.ondata = cb;
          if (tds)
              this.t = new TextDecoder();
          else
              this.p = et;
      }
      /**
       * Pushes a chunk to be decoded from UTF-8 binary
       * @param chunk The chunk to push
       * @param final Whether this is the last chunk
       */
      DecodeUTF8.prototype.push = function (chunk, final) {
          if (!this.ondata)
              err(5);
          final = !!final;
          if (this.t) {
              this.ondata(this.t.decode(chunk, { stream: true }), final);
              if (final) {
                  if (this.t.decode().length)
                      err(8);
                  this.t = null;
              }
              return;
          }
          if (!this.p)
              err(4);
          var dat = new u8(this.p.length + chunk.length);
          dat.set(this.p);
          dat.set(chunk, this.p.length);
          var _a = dutf8(dat), ch = _a[0], np = _a[1];
          if (final) {
              if (np.length)
                  err(8);
              this.p = null;
          }
          else
              this.p = np;
          this.ondata(ch, final);
      };
      return DecodeUTF8;
  }());
  exports.DecodeUTF8 = DecodeUTF8;
  /**
   * Streaming UTF-8 encoding
   */
  var EncodeUTF8 = /*#__PURE__*/ (function () {
      /**
       * Creates a UTF-8 decoding stream
       * @param cb The callback to call whenever data is encoded
       */
      function EncodeUTF8(cb) {
          this.ondata = cb;
      }
      /**
       * Pushes a chunk to be encoded to UTF-8
       * @param chunk The string data to push
       * @param final Whether this is the last chunk
       */
      EncodeUTF8.prototype.push = function (chunk, final) {
          if (!this.ondata)
              err(5);
          if (this.d)
              err(4);
          this.ondata(strToU8(chunk), this.d = final || false);
      };
      return EncodeUTF8;
  }());
  exports.EncodeUTF8 = EncodeUTF8;
  /**
   * Converts a string into a Uint8Array for use with compression/decompression methods
   * @param str The string to encode
   * @param latin1 Whether or not to interpret the data as Latin-1. This should
   *               not need to be true unless decoding a binary string.
   * @returns The string encoded in UTF-8/Latin-1 binary
   */
  function strToU8(str, latin1) {
      if (latin1) {
          var ar_1 = new u8(str.length);
          for (var i = 0; i < str.length; ++i)
              ar_1[i] = str.charCodeAt(i);
          return ar_1;
      }
      if (te)
          return te.encode(str);
      var l = str.length;
      var ar = new u8(str.length + (str.length >> 1));
      var ai = 0;
      var w = function (v) { ar[ai++] = v; };
      for (var i = 0; i < l; ++i) {
          if (ai + 5 > ar.length) {
              var n = new u8(ai + 8 + ((l - i) << 1));
              n.set(ar);
              ar = n;
          }
          var c = str.charCodeAt(i);
          if (c < 128 || latin1)
              w(c);
          else if (c < 2048)
              w(192 | (c >> 6)), w(128 | (c & 63));
          else if (c > 55295 && c < 57344)
              c = 65536 + (c & 1023 << 10) | (str.charCodeAt(++i) & 1023),
                  w(240 | (c >> 18)), w(128 | ((c >> 12) & 63)), w(128 | ((c >> 6) & 63)), w(128 | (c & 63));
          else
              w(224 | (c >> 12)), w(128 | ((c >> 6) & 63)), w(128 | (c & 63));
      }
      return slc(ar, 0, ai);
  }
  exports.strToU8 = strToU8;
  /**
   * Converts a Uint8Array to a string
   * @param dat The data to decode to string
   * @param latin1 Whether or not to interpret the data as Latin-1. This should
   *               not need to be true unless encoding to binary string.
   * @returns The original UTF-8/Latin-1 string
   */
  function strFromU8(dat, latin1) {
      if (latin1) {
          var r = '';
          for (var i = 0; i < dat.length; i += 16384)
              r += String.fromCharCode.apply(null, dat.subarray(i, i + 16384));
          return r;
      }
      else if (td)
          return td.decode(dat);
      else {
          var _a = dutf8(dat), out = _a[0], ext = _a[1];
          if (ext.length)
              err(8);
          return out;
      }
  }
  exports.strFromU8 = strFromU8;
  ;
  // deflate bit flag
  var dbf = function (l) { return l == 1 ? 3 : l < 6 ? 2 : l == 9 ? 1 : 0; };
  // skip local zip header
  var slzh = function (d, b) { return b + 30 + b2(d, b + 26) + b2(d, b + 28); };
  // read zip header
  var zh = function (d, b, z) {
      var fnl = b2(d, b + 28), fn = strFromU8(d.subarray(b + 46, b + 46 + fnl), !(b2(d, b + 8) & 2048)), es = b + 46 + fnl, bs = b4(d, b + 20);
      var _a = z && bs == 4294967295 ? z64e(d, es) : [bs, b4(d, b + 24), b4(d, b + 42)], sc = _a[0], su = _a[1], off = _a[2];
      return [b2(d, b + 10), sc, su, fn, es + b2(d, b + 30) + b2(d, b + 32), off];
  };
  // read zip64 extra field
  var z64e = function (d, b) {
      for (; b2(d, b) != 1; b += 4 + b2(d, b + 2))
          ;
      return [b8(d, b + 12), b8(d, b + 4), b8(d, b + 20)];
  };
  // extra field length
  var exfl = function (ex) {
      var le = 0;
      if (ex) {
          for (var k in ex) {
              var l = ex[k].length;
              if (l > 65535)
                  err(9);
              le += l + 4;
          }
      }
      return le;
  };
  // write zip header
  var wzh = function (d, b, f, fn, u, c, ce, co) {
      var fl = fn.length, ex = f.extra, col = co && co.length;
      var exl = exfl(ex);
      wbytes(d, b, ce != null ? 0x2014B50 : 0x4034B50), b += 4;
      if (ce != null)
          d[b++] = 20, d[b++] = f.os;
      d[b] = 20, b += 2; // spec compliance? what's that?
      d[b++] = (f.flag << 1) | (c < 0 && 8), d[b++] = u && 8;
      d[b++] = f.compression & 255, d[b++] = f.compression >> 8;
      var dt = new Date(f.mtime == null ? Date.now() : f.mtime), y = dt.getFullYear() - 1980;
      if (y < 0 || y > 119)
          err(10);
      wbytes(d, b, (y << 25) | ((dt.getMonth() + 1) << 21) | (dt.getDate() << 16) | (dt.getHours() << 11) | (dt.getMinutes() << 5) | (dt.getSeconds() >>> 1)), b += 4;
      if (c != -1) {
          wbytes(d, b, f.crc);
          wbytes(d, b + 4, c < 0 ? -c - 2 : c);
          wbytes(d, b + 8, f.size);
      }
      wbytes(d, b + 12, fl);
      wbytes(d, b + 14, exl), b += 16;
      if (ce != null) {
          wbytes(d, b, col);
          wbytes(d, b + 6, f.attrs);
          wbytes(d, b + 10, ce), b += 14;
      }
      d.set(fn, b);
      b += fl;
      if (exl) {
          for (var k in ex) {
              var exf = ex[k], l = exf.length;
              wbytes(d, b, +k);
              wbytes(d, b + 2, l);
              d.set(exf, b + 4), b += 4 + l;
          }
      }
      if (col)
          d.set(co, b), b += col;
      return b;
  };
  // write zip footer (end of central directory)
  var wzf = function (o, b, c, d, e) {
      wbytes(o, b, 0x6054B50); // skip disk
      wbytes(o, b + 8, c);
      wbytes(o, b + 10, c);
      wbytes(o, b + 12, d);
      wbytes(o, b + 16, e);
  };
  /**
   * A pass-through stream to keep data uncompressed in a ZIP archive.
   */
  var ZipPassThrough = /*#__PURE__*/ (function () {
      /**
       * Creates a pass-through stream that can be added to ZIP archives
       * @param filename The filename to associate with this data stream
       */
      function ZipPassThrough(filename) {
          this.filename = filename;
          this.c = crc();
          this.size = 0;
          this.compression = 0;
      }
      /**
       * Processes a chunk and pushes to the output stream. You can override this
       * method in a subclass for custom behavior, but by default this passes
       * the data through. You must call this.ondata(err, chunk, final) at some
       * point in this method.
       * @param chunk The chunk to process
       * @param final Whether this is the last chunk
       */
      ZipPassThrough.prototype.process = function (chunk, final) {
          this.ondata(null, chunk, final);
      };
      /**
       * Pushes a chunk to be added. If you are subclassing this with a custom
       * compression algorithm, note that you must push data from the source
       * file only, pre-compression.
       * @param chunk The chunk to push
       * @param final Whether this is the last chunk
       */
      ZipPassThrough.prototype.push = function (chunk, final) {
          if (!this.ondata)
              err(5);
          this.c.p(chunk);
          this.size += chunk.length;
          if (final)
              this.crc = this.c.d();
          this.process(chunk, final || false);
      };
      return ZipPassThrough;
  }());
  exports.ZipPassThrough = ZipPassThrough;
  // I don't extend because TypeScript extension adds 1kB of runtime bloat
  /**
   * Streaming DEFLATE compression for ZIP archives. Prefer using AsyncZipDeflate
   * for better performance
   */
  var ZipDeflate = /*#__PURE__*/ (function () {
      /**
       * Creates a DEFLATE stream that can be added to ZIP archives
       * @param filename The filename to associate with this data stream
       * @param opts The compression options
       */
      function ZipDeflate(filename, opts) {
          var _this_1 = this;
          if (!opts)
              opts = {};
          ZipPassThrough.call(this, filename);
          this.d = new Deflate(opts, function (dat, final) {
              _this_1.ondata(null, dat, final);
          });
          this.compression = 8;
          this.flag = dbf(opts.level);
      }
      ZipDeflate.prototype.process = function (chunk, final) {
          try {
              this.d.push(chunk, final);
          }
          catch (e) {
              this.ondata(e, null, final);
          }
      };
      /**
       * Pushes a chunk to be deflated
       * @param chunk The chunk to push
       * @param final Whether this is the last chunk
       */
      ZipDeflate.prototype.push = function (chunk, final) {
          ZipPassThrough.prototype.push.call(this, chunk, final);
      };
      return ZipDeflate;
  }());
  exports.ZipDeflate = ZipDeflate;
  /**
   * Asynchronous streaming DEFLATE compression for ZIP archives
   */
  var AsyncZipDeflate = /*#__PURE__*/ (function () {
      /**
       * Creates a DEFLATE stream that can be added to ZIP archives
       * @param filename The filename to associate with this data stream
       * @param opts The compression options
       */
      function AsyncZipDeflate(filename, opts) {
          var _this_1 = this;
          if (!opts)
              opts = {};
          ZipPassThrough.call(this, filename);
          this.d = new AsyncDeflate(opts, function (err, dat, final) {
              _this_1.ondata(err, dat, final);
          });
          this.compression = 8;
          this.flag = dbf(opts.level);
          this.terminate = this.d.terminate;
      }
      AsyncZipDeflate.prototype.process = function (chunk, final) {
          this.d.push(chunk, final);
      };
      /**
       * Pushes a chunk to be deflated
       * @param chunk The chunk to push
       * @param final Whether this is the last chunk
       */
      AsyncZipDeflate.prototype.push = function (chunk, final) {
          ZipPassThrough.prototype.push.call(this, chunk, final);
      };
      return AsyncZipDeflate;
  }());
  exports.AsyncZipDeflate = AsyncZipDeflate;
  // TODO: Better tree shaking
  /**
   * A zippable archive to which files can incrementally be added
   */
  var Zip = /*#__PURE__*/ (function () {
      /**
       * Creates an empty ZIP archive to which files can be added
       * @param cb The callback to call whenever data for the generated ZIP archive
       *           is available
       */
      function Zip(cb) {
          this.ondata = cb;
          this.u = [];
          this.d = 1;
      }
      /**
       * Adds a file to the ZIP archive
       * @param file The file stream to add
       */
      Zip.prototype.add = function (file) {
          var _this_1 = this;
          if (!this.ondata)
              err(5);
          // finishing or finished
          if (this.d & 2)
              this.ondata(err(4 + (this.d & 1) * 8, 0, 1), null, false);
          else {
              var f = strToU8(file.filename), fl_1 = f.length;
              var com = file.comment, o = com && strToU8(com);
              var u = fl_1 != file.filename.length || (o && (com.length != o.length));
              var hl_1 = fl_1 + exfl(file.extra) + 30;
              if (fl_1 > 65535)
                  this.ondata(err(11, 0, 1), null, false);
              var header = new u8(hl_1);
              wzh(header, 0, file, f, u, -1);
              var chks_1 = [header];
              var pAll_1 = function () {
                  for (var _i = 0, chks_2 = chks_1; _i < chks_2.length; _i++) {
                      var chk = chks_2[_i];
                      _this_1.ondata(null, chk, false);
                  }
                  chks_1 = [];
              };
              var tr_1 = this.d;
              this.d = 0;
              var ind_1 = this.u.length;
              var uf_1 = mrg(file, {
                  f: f,
                  u: u,
                  o: o,
                  t: function () {
                      if (file.terminate)
                          file.terminate();
                  },
                  r: function () {
                      pAll_1();
                      if (tr_1) {
                          var nxt = _this_1.u[ind_1 + 1];
                          if (nxt)
                              nxt.r();
                          else
                              _this_1.d = 1;
                      }
                      tr_1 = 1;
                  }
              });
              var cl_1 = 0;
              file.ondata = function (err, dat, final) {
                  if (err) {
                      _this_1.ondata(err, dat, final);
                      _this_1.terminate();
                  }
                  else {
                      cl_1 += dat.length;
                      chks_1.push(dat);
                      if (final) {
                          var dd = new u8(16);
                          wbytes(dd, 0, 0x8074B50);
                          wbytes(dd, 4, file.crc);
                          wbytes(dd, 8, cl_1);
                          wbytes(dd, 12, file.size);
                          chks_1.push(dd);
                          uf_1.c = cl_1, uf_1.b = hl_1 + cl_1 + 16, uf_1.crc = file.crc, uf_1.size = file.size;
                          if (tr_1)
                              uf_1.r();
                          tr_1 = 1;
                      }
                      else if (tr_1)
                          pAll_1();
                  }
              };
              this.u.push(uf_1);
          }
      };
      /**
       * Ends the process of adding files and prepares to emit the final chunks.
       * This *must* be called after adding all desired files for the resulting
       * ZIP file to work properly.
       */
      Zip.prototype.end = function () {
          var _this_1 = this;
          if (this.d & 2) {
              this.ondata(err(4 + (this.d & 1) * 8, 0, 1), null, true);
              return;
          }
          if (this.d)
              this.e();
          else
              this.u.push({
                  r: function () {
                      if (!(_this_1.d & 1))
                          return;
                      _this_1.u.splice(-1, 1);
                      _this_1.e();
                  },
                  t: function () { }
              });
          this.d = 3;
      };
      Zip.prototype.e = function () {
          var bt = 0, l = 0, tl = 0;
          for (var _i = 0, _a = this.u; _i < _a.length; _i++) {
              var f = _a[_i];
              tl += 46 + f.f.length + exfl(f.extra) + (f.o ? f.o.length : 0);
          }
          var out = new u8(tl + 22);
          for (var _b = 0, _c = this.u; _b < _c.length; _b++) {
              var f = _c[_b];
              wzh(out, bt, f, f.f, f.u, -f.c - 2, l, f.o);
              bt += 46 + f.f.length + exfl(f.extra) + (f.o ? f.o.length : 0), l += f.b;
          }
          wzf(out, bt, this.u.length, tl, l);
          this.ondata(null, out, true);
          this.d = 2;
      };
      /**
       * A method to terminate any internal workers used by the stream. Subsequent
       * calls to add() will fail.
       */
      Zip.prototype.terminate = function () {
          for (var _i = 0, _a = this.u; _i < _a.length; _i++) {
              var f = _a[_i];
              f.t();
          }
          this.d = 2;
      };
      return Zip;
  }());
  exports.Zip = Zip;
  function zip(data, opts, cb) {
      if (!cb)
          cb = opts, opts = {};
      if (typeof cb != 'function')
          err(7);
      var r = {};
      fltn(data, '', r, opts);
      var k = Object.keys(r);
      var lft = k.length, o = 0, tot = 0;
      var slft = lft, files = new Array(lft);
      var term = [];
      var tAll = function () {
          for (var i = 0; i < term.length; ++i)
              term[i]();
      };
      var cbd = function (a, b) {
          mt(function () { cb(a, b); });
      };
      mt(function () { cbd = cb; });
      var cbf = function () {
          var out = new u8(tot + 22), oe = o, cdl = tot - o;
          tot = 0;
          for (var i = 0; i < slft; ++i) {
              var f = files[i];
              try {
                  var l = f.c.length;
                  wzh(out, tot, f, f.f, f.u, l);
                  var badd = 30 + f.f.length + exfl(f.extra);
                  var loc = tot + badd;
                  out.set(f.c, loc);
                  wzh(out, o, f, f.f, f.u, l, tot, f.m), o += 16 + badd + (f.m ? f.m.length : 0), tot = loc + l;
              }
              catch (e) {
                  return cbd(e, null);
              }
          }
          wzf(out, o, files.length, cdl, oe);
          cbd(null, out);
      };
      if (!lft)
          cbf();
      var _loop_1 = function (i) {
          var fn = k[i];
          var _a = r[fn], file = _a[0], p = _a[1];
          var c = crc(), size = file.length;
          c.p(file);
          var f = strToU8(fn), s = f.length;
          var com = p.comment, m = com && strToU8(com), ms = m && m.length;
          var exl = exfl(p.extra);
          var compression = p.level == 0 ? 0 : 8;
          var cbl = function (e, d) {
              if (e) {
                  tAll();
                  cbd(e, null);
              }
              else {
                  var l = d.length;
                  files[i] = mrg(p, {
                      size: size,
                      crc: c.d(),
                      c: d,
                      f: f,
                      m: m,
                      u: s != fn.length || (m && (com.length != ms)),
                      compression: compression
                  });
                  o += 30 + s + exl + l;
                  tot += 76 + 2 * (s + exl) + (ms || 0) + l;
                  if (!--lft)
                      cbf();
              }
          };
          if (s > 65535)
              cbl(err(11, 0, 1), null);
          if (!compression)
              cbl(null, file);
          else if (size < 160000) {
              try {
                  cbl(null, deflateSync(file, p));
              }
              catch (e) {
                  cbl(e, null);
              }
          }
          else
              term.push(deflate(file, p, cbl));
      };
      // Cannot use lft because it can decrease
      for (var i = 0; i < slft; ++i) {
          _loop_1(i);
      }
      return tAll;
  }
  exports.zip = zip;
  /**
   * Synchronously creates a ZIP file. Prefer using `zip` for better performance
   * with more than one file.
   * @param data The directory structure for the ZIP archive
   * @param opts The main options, merged with per-file options
   * @returns The generated ZIP archive
   */
  function zipSync(data, opts) {
      if (!opts)
          opts = {};
      var r = {};
      var files = [];
      fltn(data, '', r, opts);
      var o = 0;
      var tot = 0;
      for (var fn in r) {
          var _a = r[fn], file = _a[0], p = _a[1];
          var compression = p.level == 0 ? 0 : 8;
          var f = strToU8(fn), s = f.length;
          var com = p.comment, m = com && strToU8(com), ms = m && m.length;
          var exl = exfl(p.extra);
          if (s > 65535)
              err(11);
          var d = compression ? deflateSync(file, p) : file, l = d.length;
          var c = crc();
          c.p(file);
          files.push(mrg(p, {
              size: file.length,
              crc: c.d(),
              c: d,
              f: f,
              m: m,
              u: s != fn.length || (m && (com.length != ms)),
              o: o,
              compression: compression
          }));
          o += 30 + s + exl + l;
          tot += 76 + 2 * (s + exl) + (ms || 0) + l;
      }
      var out = new u8(tot + 22), oe = o, cdl = tot - o;
      for (var i = 0; i < files.length; ++i) {
          var f = files[i];
          wzh(out, f.o, f, f.f, f.u, f.c.length);
          var badd = 30 + f.f.length + exfl(f.extra);
          out.set(f.c, f.o + badd);
          wzh(out, o, f, f.f, f.u, f.c.length, f.o, f.m), o += 16 + badd + (f.m ? f.m.length : 0);
      }
      wzf(out, o, files.length, cdl, oe);
      return out;
  }
  exports.zipSync = zipSync;
  /**
   * Streaming pass-through decompression for ZIP archives
   */
  var UnzipPassThrough = /*#__PURE__*/ (function () {
      function UnzipPassThrough() {
      }
      UnzipPassThrough.prototype.push = function (data, final) {
          this.ondata(null, data, final);
      };
      UnzipPassThrough.compression = 0;
      return UnzipPassThrough;
  }());
  exports.UnzipPassThrough = UnzipPassThrough;
  /**
   * Streaming DEFLATE decompression for ZIP archives. Prefer AsyncZipInflate for
   * better performance.
   */
  var UnzipInflate = /*#__PURE__*/ (function () {
      /**
       * Creates a DEFLATE decompression that can be used in ZIP archives
       */
      function UnzipInflate() {
          var _this_1 = this;
          this.i = new Inflate(function (dat, final) {
              _this_1.ondata(null, dat, final);
          });
      }
      UnzipInflate.prototype.push = function (data, final) {
          try {
              this.i.push(data, final);
          }
          catch (e) {
              this.ondata(e, null, final);
          }
      };
      UnzipInflate.compression = 8;
      return UnzipInflate;
  }());
  exports.UnzipInflate = UnzipInflate;
  /**
   * Asynchronous streaming DEFLATE decompression for ZIP archives
   */
  var AsyncUnzipInflate = /*#__PURE__*/ (function () {
      /**
       * Creates a DEFLATE decompression that can be used in ZIP archives
       */
      function AsyncUnzipInflate(_, sz) {
          var _this_1 = this;
          if (sz < 320000) {
              this.i = new Inflate(function (dat, final) {
                  _this_1.ondata(null, dat, final);
              });
          }
          else {
              this.i = new AsyncInflate(function (err, dat, final) {
                  _this_1.ondata(err, dat, final);
              });
              this.terminate = this.i.terminate;
          }
      }
      AsyncUnzipInflate.prototype.push = function (data, final) {
          if (this.i.terminate)
              data = slc(data, 0);
          this.i.push(data, final);
      };
      AsyncUnzipInflate.compression = 8;
      return AsyncUnzipInflate;
  }());
  exports.AsyncUnzipInflate = AsyncUnzipInflate;
  /**
   * A ZIP archive decompression stream that emits files as they are discovered
   */
  var Unzip = /*#__PURE__*/ (function () {
      /**
       * Creates a ZIP decompression stream
       * @param cb The callback to call whenever a file in the ZIP archive is found
       */
      function Unzip(cb) {
          this.onfile = cb;
          this.k = [];
          this.o = {
              0: UnzipPassThrough
          };
          this.p = et;
      }
      /**
       * Pushes a chunk to be unzipped
       * @param chunk The chunk to push
       * @param final Whether this is the last chunk
       */
      Unzip.prototype.push = function (chunk, final) {
          var _this_1 = this;
          if (!this.onfile)
              err(5);
          if (!this.p)
              err(4);
          if (this.c > 0) {
              var len = Math.min(this.c, chunk.length);
              var toAdd = chunk.subarray(0, len);
              this.c -= len;
              if (this.d)
                  this.d.push(toAdd, !this.c);
              else
                  this.k[0].push(toAdd);
              chunk = chunk.subarray(len);
              if (chunk.length)
                  return this.push(chunk, final);
          }
          else {
              var f = 0, i = 0, is = void 0, buf = void 0;
              if (!this.p.length)
                  buf = chunk;
              else if (!chunk.length)
                  buf = this.p;
              else {
                  buf = new u8(this.p.length + chunk.length);
                  buf.set(this.p), buf.set(chunk, this.p.length);
              }
              var l = buf.length, oc = this.c, add = oc && this.d;
              var _loop_2 = function () {
                  var _a;
                  var sig = b4(buf, i);
                  if (sig == 0x4034B50) {
                      f = 1, is = i;
                      this_1.d = null;
                      this_1.c = 0;
                      var bf = b2(buf, i + 6), cmp_1 = b2(buf, i + 8), u = bf & 2048, dd = bf & 8, fnl = b2(buf, i + 26), es = b2(buf, i + 28);
                      if (l > i + 30 + fnl + es) {
                          var chks_3 = [];
                          this_1.k.unshift(chks_3);
                          f = 2;
                          var sc_1 = b4(buf, i + 18), su_1 = b4(buf, i + 22);
                          var fn_1 = strFromU8(buf.subarray(i + 30, i += 30 + fnl), !u);
                          if (sc_1 == 4294967295) {
                              _a = dd ? [-2] : z64e(buf, i), sc_1 = _a[0], su_1 = _a[1];
                          }
                          else if (dd)
                              sc_1 = -1;
                          i += es;
                          this_1.c = sc_1;
                          var d_1;
                          var file_1 = {
                              name: fn_1,
                              compression: cmp_1,
                              start: function () {
                                  if (!file_1.ondata)
                                      err(5);
                                  if (!sc_1)
                                      file_1.ondata(null, et, true);
                                  else {
                                      var ctr = _this_1.o[cmp_1];
                                      if (!ctr)
                                          file_1.ondata(err(14, 'unknown compression type ' + cmp_1, 1), null, false);
                                      d_1 = sc_1 < 0 ? new ctr(fn_1) : new ctr(fn_1, sc_1, su_1);
                                      d_1.ondata = function (err, dat, final) { file_1.ondata(err, dat, final); };
                                      for (var _i = 0, chks_4 = chks_3; _i < chks_4.length; _i++) {
                                          var dat = chks_4[_i];
                                          d_1.push(dat, false);
                                      }
                                      if (_this_1.k[0] == chks_3 && _this_1.c)
                                          _this_1.d = d_1;
                                      else
                                          d_1.push(et, true);
                                  }
                              },
                              terminate: function () {
                                  if (d_1 && d_1.terminate)
                                      d_1.terminate();
                              }
                          };
                          if (sc_1 >= 0)
                              file_1.size = sc_1, file_1.originalSize = su_1;
                          this_1.onfile(file_1);
                      }
                      return "break";
                  }
                  else if (oc) {
                      if (sig == 0x8074B50) {
                          is = i += 12 + (oc == -2 && 8), f = 3, this_1.c = 0;
                          return "break";
                      }
                      else if (sig == 0x2014B50) {
                          is = i -= 4, f = 3, this_1.c = 0;
                          return "break";
                      }
                  }
              };
              var this_1 = this;
              for (; i < l - 4; ++i) {
                  var state_1 = _loop_2();
                  if (state_1 === "break")
                      break;
              }
              this.p = et;
              if (oc < 0) {
                  var dat = f ? buf.subarray(0, is - 12 - (oc == -2 && 8) - (b4(buf, is - 16) == 0x8074B50 && 4)) : buf.subarray(0, i);
                  if (add)
                      add.push(dat, !!f);
                  else
                      this.k[+(f == 2)].push(dat);
              }
              if (f & 2)
                  return this.push(buf.subarray(i), final);
              this.p = buf.subarray(i);
          }
          if (final) {
              if (this.c)
                  err(13);
              this.p = null;
          }
      };
      /**
       * Registers a decoder with the stream, allowing for files compressed with
       * the compression type provided to be expanded correctly
       * @param decoder The decoder constructor
       */
      Unzip.prototype.register = function (decoder) {
          this.o[decoder.compression] = decoder;
      };
      return Unzip;
  }());
  exports.Unzip = Unzip;
  var mt = typeof queueMicrotask == 'function' ? queueMicrotask : typeof setTimeout == 'function' ? setTimeout : function (fn) { fn(); };
  function unzip(data, opts, cb) {
      if (!cb)
          cb = opts, opts = {};
      if (typeof cb != 'function')
          err(7);
      var term = [];
      var tAll = function () {
          for (var i = 0; i < term.length; ++i)
              term[i]();
      };
      var files = {};
      var cbd = function (a, b) {
          mt(function () { cb(a, b); });
      };
      mt(function () { cbd = cb; });
      var e = data.length - 22;
      for (; b4(data, e) != 0x6054B50; --e) {
          if (!e || data.length - e > 65558) {
              cbd(err(13, 0, 1), null);
              return tAll;
          }
      }
      ;
      var lft = b2(data, e + 8);
      if (lft) {
          var c = lft;
          var o = b4(data, e + 16);
          var z = o == 4294967295 || c == 65535;
          if (z) {
              var ze = b4(data, e - 12);
              z = b4(data, ze) == 0x6064B50;
              if (z) {
                  c = lft = b4(data, ze + 32);
                  o = b4(data, ze + 48);
              }
          }
          var fltr = opts && opts.filter;
          var _loop_3 = function (i) {
              var _a = zh(data, o, z), c_1 = _a[0], sc = _a[1], su = _a[2], fn = _a[3], no = _a[4], off = _a[5], b = slzh(data, off);
              o = no;
              var cbl = function (e, d) {
                  if (e) {
                      tAll();
                      cbd(e, null);
                  }
                  else {
                      if (d)
                          files[fn] = d;
                      if (!--lft)
                          cbd(null, files);
                  }
              };
              if (!fltr || fltr({
                  name: fn,
                  size: sc,
                  originalSize: su,
                  compression: c_1
              })) {
                  if (!c_1)
                      cbl(null, slc(data, b, b + sc));
                  else if (c_1 == 8) {
                      var infl = data.subarray(b, b + sc);
                      if (sc < 320000) {
                          try {
                              cbl(null, inflateSync(infl, new u8(su)));
                          }
                          catch (e) {
                              cbl(e, null);
                          }
                      }
                      else
                          term.push(inflate(infl, { size: su }, cbl));
                  }
                  else
                      cbl(err(14, 'unknown compression type ' + c_1, 1), null);
              }
              else
                  cbl(null, null);
          };
          for (var i = 0; i < c; ++i) {
              _loop_3(i);
          }
      }
      else
          cbd(null, {});
      return tAll;
  }
  exports.unzip = unzip;
  /**
   * Synchronously decompresses a ZIP archive. Prefer using `unzip` for better
   * performance with more than one file.
   * @param data The raw compressed ZIP file
   * @param opts The ZIP extraction options
   * @returns The decompressed files
   */
  function unzipSync(data, opts) {
      var files = {};
      var e = data.length - 22;
      for (; b4(data, e) != 0x6054B50; --e) {
          if (!e || data.length - e > 65558)
              err(13);
      }
      ;
      var c = b2(data, e + 8);
      if (!c)
          return {};
      var o = b4(data, e + 16);
      var z = o == 4294967295 || c == 65535;
      if (z) {
          var ze = b4(data, e - 12);
          z = b4(data, ze) == 0x6064B50;
          if (z) {
              c = b4(data, ze + 32);
              o = b4(data, ze + 48);
          }
      }
      var fltr = opts && opts.filter;
      for (var i = 0; i < c; ++i) {
          var _a = zh(data, o, z), c_2 = _a[0], sc = _a[1], su = _a[2], fn = _a[3], no = _a[4], off = _a[5], b = slzh(data, off);
          o = no;
          if (!fltr || fltr({
              name: fn,
              size: sc,
              originalSize: su,
              compression: c_2
          })) {
              if (!c_2)
                  files[fn] = slc(data, b, b + sc);
              else if (c_2 == 8)
                  files[fn] = inflateSync(data.subarray(b, b + sc), new u8(su));
              else
                  err(14, 'unknown compression type ' + c_2);
          }
      }
      return files;
  }
  exports.unzipSync = unzipSync;
  

});

;/*!node_modules/ooxml-viewer/lib/package/ZipPackageParser.js*/
amis.define("node_modules/ooxml-viewer/lib/package/ZipPackageParser",(function(e,t,r,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=e("node_modules/fflate/lib/index.cjs"),o=function(){function e(){}return e.prototype.load=function(e){this.zip=i.unzipSync(new Uint8Array(e))},e.prototype.getXML=function(e){var t=this.getFileByType(e,"string"),r=(new DOMParser).parseFromString(t,"application/xml"),n=r.getElementsByTagName("parsererror").item(0);if(n)throw new Error(n.textContent||"can't parse xml");return r},e.prototype.getFileByType=function(e,t){e=e.startsWith("/")?e.slice(1):e;var r=this.zip[e];if(r){if("string"===t)return i.strFromU8(r);if("blob"===t)return new Blob([r]);if("uint8array"===t)return r}return console.warn("getFileByType",e,"not found"),null},e.prototype.fileExists=function(e){return(e=e.startsWith("/")?e.slice(1):e)in this.zip},e.prototype.generateZip=function(e){return this.zip["word/document.xml"]=i.strToU8(e),new Blob([i.zipSync(this.zip)])},e}();t.default=o}));
;/*!node_modules/ooxml-viewer/lib/render/renderFont.js*/
amis.define("node_modules/ooxml-viewer/lib/render/renderFont",(function(e,n,r,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var l=e("node_modules/tslib/tslib"),o=e("node_modules/ooxml-viewer/lib/util/dom");n.renderFont=function(e){var n,r;if(!e)return null;var t=e.fonts;if(!t||!t.length)return null;var a=o.createElement("style"),i="/** embedded fonts **/";try{for(var u=l.__values(e.fonts),d=u.next();!d.done;d=u.next()){var f=d.value,c=f.name.replace(/['\\]/g,""),s=f.url;c&&s&&(i+="\n      @font-face {\n        font-family: '".concat(c,"';\n        src: url('").concat(s,"');\n      }\n      "))}}catch(e){n={error:e}}finally{try{d&&!d.done&&(r=u.return)&&r.call(u)}finally{if(n)throw n.error}}return a.innerHTML=i,a}}));
;/*!node_modules/ooxml-viewer/lib/util/createObject.js*/
amis.define("node_modules/ooxml-viewer/lib/util/createObject",(function(e,t,r,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var c=e("node_modules/tslib/tslib");function u(e,t){void 0===t&&(t=!0);var r=e&&e.__super?Object.create(e.__super,{__super:{value:e.__super,writable:!1,enumerable:!1}}):Object.create(Object.prototype);return t&&e&&Object.keys(e).forEach((function(t){return r[t]=e[t]})),r}function o(e){var t=typeof e;return e&&"string"!==t&&"number"!==t&&"boolean"!==t&&"function"!==t&&!Array.isArray(e)}t.cloneObject=u,t.createObject=function(e,t,r){e&&Object.isFrozen(e)&&(e=u(e));var n=e?Object.create(e,c.__assign(c.__assign({},r),{__super:{value:e,writable:!1,enumerable:!1}})):Object.create(Object.prototype,r);return t&&o(t)&&Object.keys(t).forEach((function(e){return n[e]=t[e]})),n},t.isObject=o}));
;/*!node_modules/ooxml-viewer/lib/util/replaceVar.js*/
amis.define("node_modules/ooxml-viewer/lib/util/replaceVar",(function(e,r,t,a){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n=e("node_modules/tslib/tslib"),l=e("node_modules/ooxml-viewer/lib/util/createObject");function o(e,r,t){var a=r.textContent||"",n=e.renderOptions.evalVar;if(a.startsWith("{{")){a=a.replace(/^{{/g,"").replace(/}}$/g,"");var l=String(n(a,t))||"";r.textContent=l}}function i(e,r){var t,a,i,v,f,u,d,y,s=e.renderOptions.evalVar,x=e.renderOptions.data,m=r.parentNode,h=r.getElementsByTagName("w:tc"),_=!1,g=[];try{for(var p=n.__values(h),w=p.next();!w.done;w=p.next()){var b=w.value.getElementsByTagName("w:t");try{for(var C=(i=void 0,n.__values(b)),N=C.next();!N.done;N=C.next()){var O=($=N.value).textContent||"";if(O.startsWith("{{#")){var E=/{{#([^\}]+)}}/.exec(O);if(E&&E.length>0){_=!0;var T=E[1],B=s(T,x);Array.isArray(B)&&(g=B),$.textContent=$.textContent.replace("{{#".concat(T,"}}"),"")}}O.indexOf("{{/}}")&&($.textContent=$.textContent.replace("{{/}}",""))}}catch(e){i={error:e}}finally{try{N&&!N.done&&(v=C.return)&&v.call(C)}finally{if(i)throw i.error}}}}catch(e){t={error:e}}finally{try{w&&!w.done&&(a=p.return)&&a.call(p)}finally{if(t)throw t.error}}if(_){try{for(var V=n.__values(g),j=V.next();!j.done;j=V.next()){var A=j.value,S=c(r),W=(b=S.getElementsByTagName("w:t"),l.createObject(x,A));try{for(var M=(d=void 0,n.__values(b)),P=M.next();!P.done;P=M.next()){var $;o(e,$=P.value,W)}}catch(e){d={error:e}}finally{try{P&&!P.done&&(y=M.return)&&y.call(M)}finally{if(d)throw d.error}}m.appendChild(S)}}catch(e){f={error:e}}finally{try{j&&!j.done&&(u=V.return)&&u.call(V)}finally{if(f)throw f.error}}m.removeChild(r)}}function c(e){var r,t,a,l,o,i=e.cloneNode(!0);v(i);var c=[].slice.call(i.getElementsByTagName("w:p"));try{for(var f=n.__values(c),u=f.next();!u.done;u=f.next()){v(u.value)}}catch(e){r={error:e}}finally{try{u&&!u.done&&(t=f.return)&&t.call(f)}finally{if(r)throw r.error}}var d=[].slice.call(i.getElementsByTagName("w:cnfStyle"));try{for(var y=n.__values(d),s=y.next();!s.done;s=y.next()){var x=s.value;null===(o=x.parentElement)||void 0===o||o.removeChild(x)}}catch(e){a={error:e}}finally{try{s&&!s.done&&(l=y.return)&&l.call(y)}finally{if(a)throw a.error}}return i}function v(e){for(;e.attributes.length>0;)e.removeAttributeNode(e.attributes[0])}r.replaceT=o,r.replaceVar=function(e,r){!function(e,r){var t,a;e.renderOptions.evalVar;var l=[].slice.call(r.getElementsByTagName("w:tr"));try{for(var o=n.__values(l),c=o.next();!c.done;c=o.next())i(e,c.value)}catch(e){t={error:e}}finally{try{c&&!c.done&&(a=o.return)&&a.call(o)}finally{if(t)throw t.error}}}(e,r)}}));
;/*!node_modules/ooxml-viewer/lib/openxml/word/Note.js*/
amis.define("node_modules/ooxml-viewer/lib/openxml/word/Note",(function(e,r,o,a){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n=e("node_modules/tslib/tslib"),l=e("node_modules/ooxml-viewer/lib/parse/parseTable"),t=e("node_modules/ooxml-viewer/lib/openxml/word/Paragraph"),i=function(){function e(){this.children=[]}return e.prototype.addChild=function(e){this.children.push(e)},e.fromXML=function(r,o){var a,i,d=new e;try{for(var s=n.__values(o.children),u=s.next();!u.done;u=s.next()){var c=u.value,f=c.tagName;switch(f){case"w:p":var h=t.Paragraph.fromXML(r,c);d.addChild(h);break;case"w:tbl":var m=l.parseTable(r,c);d.addChild(m);break;default:console.warn("Note.fromXML unknown tag",f,c)}}}catch(e){a={error:e}}finally{try{u&&!u.done&&(i=s.return)&&i.call(s)}finally{if(a)throw a.error}}return d},e}();r.Note=i}));
;/*!node_modules/ooxml-viewer/lib/parse/Footnotes.js*/
amis.define("node_modules/ooxml-viewer/lib/parse/Footnotes",(function(e,o,t,r){"use strict";Object.defineProperty(o,"__esModule",{value:!0});var l=e("node_modules/tslib/tslib"),n=e("node_modules/ooxml-viewer/lib/openxml/word/Note");o.parseFootnotes=function(e,o){var t,r,i={},a=[].slice.call(o.getElementsByTagName("w:footnote"));try{for(var s=l.__values(a),d=s.next();!d.done;d=s.next()){var u=d.value,f=n.Note.fromXML(e,u);i[u.getAttribute("w:id")]=f}}catch(e){t={error:e}}finally{try{d&&!d.done&&(r=s.return)&&r.call(s)}finally{if(t)throw t.error}}return i}}));
;/*!node_modules/ooxml-viewer/lib/parse/parseEndnotes.js*/
amis.define("node_modules/ooxml-viewer/lib/parse/parseEndnotes",(function(e,r,o,t){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n=e("node_modules/tslib/tslib"),l=e("node_modules/ooxml-viewer/lib/openxml/word/Note");r.parseEndnotes=function(e,r){var o,t,a={},i=[].slice.call(r.getElementsByTagName("w:endnote"));try{for(var s=n.__values(i),d=s.next();!d.done;d=s.next()){var u=d.value,m=l.Note.fromXML(e,u);a[u.getAttribute("w:id")]=m}}catch(e){o={error:e}}finally{try{d&&!d.done&&(t=s.return)&&t.call(s)}finally{if(o)throw o.error}}return a}}));
;/*!node_modules/ooxml-viewer/lib/render/renderNotes.js*/
amis.define("node_modules/ooxml-viewer/lib/render/renderNotes",(function(e,o,r,n){"use strict";Object.defineProperty(o,"__esModule",{value:!0});var l=e("node_modules/tslib/tslib"),d=e("node_modules/ooxml-viewer/lib/openxml/word/Paragraph"),a=e("node_modules/ooxml-viewer/lib/openxml/word/Table"),t=e("node_modules/ooxml-viewer/lib/util/dom"),i=e("node_modules/ooxml-viewer/lib/render/renderParagraph"),s=e("node_modules/ooxml-viewer/lib/render/renderTable");function u(e,o,r,n,u){var m,f,v=u.children,c=t.createElement("div"),b=t.createElement("a"),h=r+"-"+n;b.name=h,b.id=h,o.appendChild(c);try{for(var p=l.__values(v),w=p.next();!w.done;w=p.next()){var _=w.value;if(_ instanceof d.Paragraph){var x=i.default(e,_);t.appendChild(c,x)}else _ instanceof a.Table?t.appendChild(c,s.default(e,_)):console.warn("unknown child",_)}}catch(e){m={error:e}}finally{try{w&&!w.done&&(f=p.return)&&f.call(p)}finally{if(m)throw m.error}}}o.renderNotes=function(e){var o=t.createElement("div");for(var r in e.footNotes||{})u(e,o,"footnote",r,e.footNotes[r]);for(var r in e.endNotes||{})u(e,o,"endnote",r,e.endNotes[r]);return o.children.length?o:null}}));
;/*!node_modules/ooxml-viewer/lib/Word.js*/
amis.define("node_modules/ooxml-viewer/lib/Word",(function(e,t,r,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=e("node_modules/tslib/tslib"),n=e("node_modules/ooxml-viewer/lib/openxml/word/FontTable"),s=e("node_modules/ooxml-viewer/lib/parse/parseRelationship"),l=e("node_modules/ooxml-viewer/lib/openxml/ContentType"),a=e("node_modules/ooxml-viewer/lib/openxml/Style"),d=e("node_modules/ooxml-viewer/lib/openxml/Theme"),p=e("node_modules/ooxml-viewer/lib/render/renderDocument"),u=e("node_modules/ooxml-viewer/lib/util/blob"),h=e("node_modules/ooxml-viewer/lib/openxml/word/numbering/Numbering"),m=e("node_modules/ooxml-viewer/lib/util/dom"),c=e("node_modules/ooxml-viewer/lib/render/renderStyle"),v=e("node_modules/ooxml-viewer/lib/util/mergeRun"),f=e("node_modules/ooxml-viewer/lib/openxml/word/WDocument"),y=e("node_modules/ooxml-viewer/lib/render/renderRun"),b=e("node_modules/ooxml-viewer/lib/package/ZipPackageParser"),g=e("node_modules/ooxml-viewer/lib/util/xml"),x=e("node_modules/ooxml-viewer/lib/openxml/word/Font"),w=e("node_modules/ooxml-viewer/lib/render/renderFont"),_=e("node_modules/ooxml-viewer/lib/util/replaceVar"),T=e("node_modules/ooxml-viewer/lib/parse/Footnotes"),N=e("node_modules/ooxml-viewer/lib/parse/parseEndnotes"),L=e("node_modules/ooxml-viewer/lib/render/renderNotes"),M={classPrefix:"docx-viewer",inWrap:!0,bulletUseFont:!0,ignoreHeight:!0,ignoreWidth:!1,minLineHeight:1,enableVar:!1,debug:!1,printWaitTime:100,data:{},evalVar:function(e){return e}},C=function(){function e(t,r,o){void 0===o&&(o=new b.default),this.themes=[],this.styleIdMap={},this.styleIdNum=0,this.wrapClassName="docx-viewer-wrapper",this.footNotes={},this.endNotes={},this.inited=!1,o.load(t),this.id=e.globalId++,this.parser=o,this.renderOptions=i.__assign(i.__assign({},M),r)}return e.prototype.init=function(){this.inited||(this.initContentType(),this.initRelation(),this.initTheme(),this.initFontTable(),this.initStyle(),this.initNumbering(),this.initNotes(),this.inited=!0)},e.prototype.initTheme=function(){var e,t;try{for(var r=i.__values(this.conentTypes.overrides),o=r.next();!o.done;o=r.next()){var n=o.value;if(n.partName.startsWith("/word/theme")){var s=this.parser.getXML(n.partName);this.themes.push(d.parseTheme(s))}}}catch(t){e={error:t}}finally{try{o&&!o.done&&(t=r.return)&&t.call(r)}finally{if(e)throw e.error}}},e.prototype.initStyle=function(){var e,t;try{for(var r=i.__values(this.conentTypes.overrides),o=r.next();!o.done;o=r.next()){o.value.partName.startsWith("/word/styles.xml")&&(this.styles=a.parseStyles(this,this.parser.getXML("/word/styles.xml")))}}catch(t){e={error:t}}finally{try{o&&!o.done&&(t=r.return)&&t.call(r)}finally{if(e)throw e.error}}},e.prototype.initFontTable=function(){var e,t;try{for(var r=i.__values(this.conentTypes.overrides),o=r.next();!o.done;o=r.next()){o.value.partName.startsWith("/word/fontTable.xml")&&(this.fontTable=n.FontTable.fromXML(this,this.parser.getXML("/word/fontTable.xml")))}}catch(t){e={error:t}}finally{try{o&&!o.done&&(t=r.return)&&t.call(r)}finally{if(e)throw e.error}}},e.prototype.initRelation=function(){var e={};this.parser.fileExists("/_rels/.rels")&&(e=s.parseRelationships(this.parser.getXML("/_rels/.rels"),"root")),this.relationships=e;var t={};this.parser.fileExists("/word/_rels/document.xml.rels")&&(t=s.parseRelationships(this.parser.getXML("/word/_rels/document.xml.rels"),"word")),this.documentRels=t;var r={};this.parser.fileExists("/word/_rels/fontTable.xml.rels")&&(r=s.parseRelationships(this.parser.getXML("/word/_rels/fontTable.xml.rels"),"word")),this.fontTableRels=r},e.prototype.initContentType=function(){var e=this.parser.getXML("[Content_Types].xml");this.conentTypes=l.parseContentType(e)},e.prototype.initNumbering=function(){var e,t;try{for(var r=i.__values(this.conentTypes.overrides),o=r.next();!o.done;o=r.next()){var n=o.value;if(n.partName.startsWith("/word/numbering")){var s=this.parser.getXML(n.partName);this.numbering=h.Numbering.fromXML(this,s)}}}catch(t){e={error:t}}finally{try{o&&!o.done&&(t=r.return)&&t.call(r)}finally{if(e)throw e.error}}},e.prototype.initNotes=function(){var e,t;try{for(var r=i.__values(this.conentTypes.overrides),o=r.next();!o.done;o=r.next()){var n=o.value;if(n.partName.startsWith("/word/footnotes.xml")){var s=this.parser.getXML(n.partName);this.footNotes=T.parseFootnotes(this,s)}if(n.partName.startsWith("/word/endnotes.xml")){s=this.parser.getXML(n.partName);this.endNotes=N.parseEndnotes(this,s)}}}catch(t){e={error:t}}finally{try{o&&!o.done&&(t=r.return)&&t.call(r)}finally{if(e)throw e.error}}},e.prototype.getRelationship=function(e){return e&&this.relationships?this.relationships[e]:null},e.prototype.getDocumentRels=function(e){return e&&this.documentRels?this.documentRels[e]:null},e.prototype.getFontTableRels=function(e){return e&&this.fontTableRels?this.fontTableRels[e]:null},e.prototype.replaceText=function(e){if(!1===this.renderOptions.enableVar)return e;var t=this.renderOptions.data;if(-1!==e.indexOf("{{")){e=e.replace(/^{{/g,"").replace(/}}$/g,"");var r=this.renderOptions.evalVar(e,t);return void 0===r?"":String(r)}return e},e.prototype.loadImage=function(e){var t=e.target;"word"===e.part&&(t="word/"+t);var r=this.parser.getFileByType(t,"blob");return r?URL.createObjectURL(r):null},e.prototype.loadFont=function(e,t){var r=this.getFontTableRels(e);if(!r)return null;var o=r.target;"word"===r.part&&(o="word/"+o);var i=this.parser.getFileByType(o,"uint8array");return i?URL.createObjectURL(new Blob([x.deobfuscate(i,t)])):null},e.prototype.getXML=function(e){return this.parser.getXML(e)},e.prototype.getStyleIdDisplayName=function(e){return e.match(/^[a-zA-Z]+[a-zA-Z0-9\-\_]*$/)?this.getClassPrefix()+"-"+e:(e in this.styleIdMap||(this.styleIdMap[e]=this.genClassName()),this.styleIdMap[e])},e.prototype.genClassName=function(){return"docx-classname-"+this.styleIdNum++},e.prototype.appendStyle=function(e){void 0===e&&(e="");var t=m.createElement("style");t.textContent=e,this.rootElement.appendChild(t)},e.prototype.getStyleClassName=function(e){var t=this.styles.styleMap[e];if(!t)return[];var r=[this.getStyleIdDisplayName(e)];return t.basedOn&&r.unshift(this.getStyleIdDisplayName(t.basedOn)),r},e.prototype.getStyle=function(e){return this.styles.styleMap[e]},e.prototype.getClassPrefix=function(){return"".concat(this.renderOptions.classPrefix,"-").concat(this.id)},e.prototype.getThemeColor=function(e){var t,r,o;if(this.themes&&this.themes.length>0){var i=null===(o=null===(r=null===(t=this.themes[0].themeElements)||void 0===t?void 0:t.clrScheme)||void 0===r?void 0:r.colors)||void 0===o?void 0:o[e];if(i)return i;console.warn("unknown theme color: "+e)}return""},e.prototype.addClass=function(e,t){e.classList.add("".concat(this.getClassPrefix(),"-").concat(t))},e.prototype.updateVariable=function(){this.rootElement&&!1!==this.renderOptions.enableVar&&y.updateVariableText(this)},e.prototype.download=function(e){void 0===e&&(e="document.docx");var t=this.getXML("word/document.xml");if(this.renderOptions.enableVar){v.mergeRun(this,t),_.replaceVar(this,t);for(var r=t.getElementsByTagName("w:t"),o=0;o<r.length;o++)_.replaceT(this,r[o],this.renderOptions.data)}var i=this.parser.generateZip(g.buildXML(t));u.downloadBlob(i,e)},e.prototype.print=function(){var e,t;return i.__awaiter(this,void 0,void 0,(function(){var r;return i.__generator(this,(function(o){switch(o.label){case 0:return(r=document.createElement("iframe")).style.position="absolute",r.style.top="-10000px",document.body.appendChild(r),null===(e=r.contentDocument)||void 0===e||e.write('<div id="print"></div>'),[4,this.render(null===(t=r.contentDocument)||void 0===t?void 0:t.getElementById("print"))];case 1:return o.sent(),setTimeout((function(){var e,t;r.focus(),null===(e=r.contentWindow)||void 0===e||e.print(),null===(t=r.parentNode)||void 0===t||t.removeChild(r)}),this.renderOptions.printWaitTime||100),window.focus(),[2]}}))}))},e.prototype.render=function(e){return i.__awaiter(this,void 0,void 0,(function(){var t,r,o,n,s;return i.__generator(this,(function(i){return this.init(),t=this.renderOptions,(r=t.debug)&&console.log("init",this),this.rootElement=e,e.innerHTML="",o=this.getXML("word/document.xml"),r&&console.log("documentData",o),t.enableVar&&(v.mergeRun(this,o),_.replaceVar(this,o)),n=f.WDocument.fromXML(this,o),r&&console.log("document",n),s=p.default(this,n),e.classList.add(this.getClassPrefix()),t.inWrap&&e.classList.add(this.wrapClassName),m.appendChild(e,c.renderStyle(this)),m.appendChild(e,w.renderFont(this.fontTable)),m.appendChild(e,s),m.appendChild(e,L.renderNotes(this)),[2]}))}))},e.globalId=0,e}();t.default=C}));
;/*!node_modules/ooxml-viewer/lib/index.js*/
amis.define("node_modules/ooxml-viewer/lib/index",(function(e,d,o,l){"use strict";Object.defineProperty(d,"__esModule",{value:!0});var i=e("node_modules/ooxml-viewer/lib/Word"),r={Word:i.default};d.Word=i.default,d.default=r}));