var _=require("lodash"),log=require("winston"),fs=require("fs"),path=require("canonical-path"),wordsToIgnore=[],propertiesToIgnore,areasToSearch,KEYWORD_REGEX=/^((ng:|[\$_a-z])[\w\-_]+)/;module.exports={name:"keywords",runAfter:["docs-processed"],runBefore:["adding-extra-docs"],description:"This processor extracts all the keywords from the document",init:function(e){if(e.processing.search&&e.processing.search.ignoreWordsFile){var t=path.resolve(e.basePath,e.processing.search.ignoreWordsFile);wordsToIgnore=fs.readFileSync(t,"utf8").toString().split(/[,\s\n\r]+/gm),log.debug('Loaded ignore words from "'+t+'"'),log.silly(wordsToIgnore)}areasToSearch=_.indexBy(e.get("processing.search.areasToSearch",["api","guide","misc","error","tutorial"])),propertiesToIgnore=_.indexBy(e.get("processing.search.propertiesToIgnore",[])),log.debug("Properties to ignore",propertiesToIgnore)},process:function(e){function n(e){var t=/ng([A-Z]\w*)/.exec(e);return t&&(e=e+" "+t[1].toLowerCase()),e}function r(e,t,n){var r=e.toLowerCase().split(/[\.\s,`'"#]+/mg);_.forEach(r,function(e){var r=e.match(KEYWORD_REGEX);r&&(key=r[1],n[key]||(n[key]=!0,t.push(key)))})}var t=_.indexBy(wordsToIgnore);e=_.filter(e,function(e){return areasToSearch[e.area]}),_.forEach(e,function(e){var i=[],s=_.clone(t);_.forEach(e,function(e,t){_.isString(e)&&!propertiesToIgnore[t]&&r(e,i,s)}),e.searchTerms={titleWords:n(e.name),keywords:_.sortBy(i).join(" ")}})}}