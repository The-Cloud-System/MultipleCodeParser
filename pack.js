const minify = require('html-minifier').minify;
const fs = require('fs');
const css = fs.readFileSync("./src/styles.css").toString();
const js = fs.readFileSync("./src/main.js").toString();
var html = fs.readFileSync("./src/index.html").toString();
html = html.replace(/[^\n]*CSS IMPLANT HOOK[^\n]*/, css).replace(/[^\n]*JS IMPLANT HOOK[^\n]*/, js);
html = minify(html, {
    collapseBooleanAttributes: true,
    collapseInlineTagWhitespace: true,
    collapseWhitespace: true,
    minifyCSS: true,
    minifyJS: true,
    minifyURLs: true,
    removeAttributeQuotes: true,
    removeComments: true,
    removeEmptyAttributes: true,
    removeEmptyElements: true,
    removeOptionalTags: true,
    removeRedundantAttributes: true,
    removeScriptTypeAttributes: true,
    removeStyleLinkTypeAttributes: true,
    sortAttributes: true,
    sortClassName: true,
    useShortDoctype: true
});
fs.writeFileSync('./index.html', html);