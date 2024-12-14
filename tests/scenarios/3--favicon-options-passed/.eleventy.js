const eleventyFavicons = require("../../../11tyFavicons");

module.exports = async function (eleventyConfig) {
    eleventyConfig.addPlugin(eleventyFavicons, {
        image: "../../../tests/input/favicon.svg",
        favicons: {
            background: "#f4f6a2",
            theme_color: "#f4f6a3",
        }
    });
}