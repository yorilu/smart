var _=require("lodash"),fs=require("fs"),semver=require("semver"),path=require("canonical-path");module.exports=function(e){var t=e.get("basePath"),n=e.get("rendering.outputFolder"),r=e.get("currentVersion"),i=path.resolve(t,n,"docs"),s=fs.readdirSync(i).filter(semver.valid).sort(semver.rcompare);!_.contains(s,r)&&s.unshift(r),!_.contains(s,"nightly")&&s.unshift("nightly");var o=_.find(s,semver.valid);return s=s.map(function(e){var t=e==o?"":e;return{href:path.join("/docs",t),folder:t,name:e}}),{list:s,current:_.find(s,{name:r}),latest:_.find(s,{name:o})||_.first(s)}}