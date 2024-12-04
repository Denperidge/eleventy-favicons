const fs = require("fs");
const path = require("path");

async function write(response, property, outputDir) {
    Promise.all(
        response[property].map(
            async (file) => await fs.writeFile(path.join(outputDir, file.name), file.contents, ()=>{})
        )
    );
}

module.exports = async function(eleventyConfig, pathToImage, faviconOpts, faviconsLibrary=undefined) {
    if (faviconsLibrary == undefined) {
        faviconsLibrary = require("favicons").favicons;
    }
    if (!fs.existsSync(pathToImage)) {
        throw new Error("pathToImage is undefined")
    }
    const response = await faviconsLibrary(pathToImage, faviconOpts);
    eleventyConfig.addGlobalData("favicons", response.html.join(""))
    write(response, "images", eleventyConfig.dir.output);
    write(response, "files", eleventyConfig.dir.output);
}