const fs = require("fs");
const path = require("path");

async function write(response, property, outputDir) {
    Promise.all(
        response[property].map(
            async (file) => await fs.writeFile(path.join(outputDir, file.name), file.contents, ()=>{})
        )
    );
}

module.exports = async function(eleventyConfig, options) {
    const { image, favicons: faviconsOpts } = options;
    let faviconsLibrary;
    if (Object.keys(options).includes("faviconsLibrary")) {
        faviconsLibrary = options.faviconsLibrary;
    } else {
        faviconsLibrary = require("favicons").favicons;
    }
    if (!fs.existsSync(image)) {
        throw new Error("image is undefined")
    }
    const response = await faviconsLibrary(image, faviconsOpts);
    
    eleventyConfig.addGlobalData("favicons", response.html.join(""))

    await Promise.all([
        write(response, "images", eleventyConfig.dir.output),
        write(response, "files", eleventyConfig.dir.output)
    ]);
}