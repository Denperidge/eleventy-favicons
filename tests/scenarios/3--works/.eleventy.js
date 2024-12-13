const eleventyFavicons = require("../../../11tyFavicons");

module.exports = function (eleventyConfig) {
    eleventyConfig.addPlugin(eleventyFavicons, { image: "../../../tests/input/favicon.svg"} );
}