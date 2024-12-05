const fs = require("fs");
const path = require("path");

let alreadyBuilt = false;

async function write(response, property, outputDir) {
    Promise.all(
        response[property].map(
            async (file) => fs.writeFile(path.join(outputDir, file.name), file.contents, (err) => {
                if (err) { throw err };
            })
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
        throw new Error("options.image is undefined");
    }
    const response = await faviconsLibrary(image, faviconsOpts);
    
    eleventyConfig.addGlobalData("favicons", response.html.join(""));

    eleventyConfig.on("eleventy.after", async ({ dir, results, runMode, outputMode }) => {
        if(!alreadyBuilt) {
            await Promise.all([
                write(response, "images", eleventyConfig.dir.output),
                write(response, "files", eleventyConfig.dir.output)
            ]);
            alreadyBuilt = true;
        }
    });
}