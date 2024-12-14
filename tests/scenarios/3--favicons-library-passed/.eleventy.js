const eleventyFavicons = require("../../../11tyFavicons");
const favicons = require("favicons6.2.2");

module.exports = async function (eleventyConfig) {
    eleventyConfig.addPlugin(eleventyFavicons, {
        image: "../../../tests/input/favicon.svg",
        faviconsLibrary: favicons
    });
}