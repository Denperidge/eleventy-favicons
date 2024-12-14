const eleventyFavicons = require("../../../11tyFavicons");

module.exports = async function (eleventyConfig) {
    eleventyConfig.addPlugin(eleventyFavicons, { image: "../../../tests/input/favicon.svg"} );
}