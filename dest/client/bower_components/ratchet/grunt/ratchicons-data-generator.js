/*!
 * Ratchet Grunt task for Ratchicons data generation
 * http://goratchet.com
 * Original script from Bootstrap (http://getbootstrap.com).
 * Bootstrap is copyright 2014 Twitter, Inc. and licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE).
 */

var fs=require("fs");module.exports=function(){var t=fs.readFileSync("sass/ratchicons.scss","utf8"),n=t.split("\n"),r=/^\.(icon-[^\s]+)/,i="# This file is generated via Grunt task. **Do not edit directly.**\n# See the 'build-ratchicons-data' task in Gruntfile.js.\n\n";for(var s=0,o=n.length;s<o;s++){var u=n[s].match(r);u!==null&&(i+="- "+u[1]+"\n")}fs.existsSync("docs/_data")||fs.mkdirSync("docs/_data"),fs.writeFileSync("docs/_data/ratchicons.yml",i)}