import { cwd } from "process";
import test from "ava";
import { buildScenarios } from "eleventy-test"

let results = await buildScenarios({
    projectRoot: cwd(),
    returnArray: false
});

function hasTheCorrectAmountOfFiles(t, scenarioName, expected) {
    t.is(Object.keys(results[scenarioName].files).length, expected);
}


test("Eleventy 3 works", t => {
    hasTheCorrectAmountOfFiles(t, "3--works", 70)
});

async function getManifest(scenarioName) {
    return JSON.parse(
        await results[scenarioName].getFileContent("/manifest.webmanifest")
    );
}

test("Favicon options are passed", async t => {
    const manifestFaviconOptsPassed = await getManifest("3--favicon-options-passed");
    const manifestDefault = await getManifest("3--works");
    
    hasTheCorrectAmountOfFiles(
        t, 
        "3--favicon-options-passed", 
        70
    )

    t.is(manifestFaviconOptsPassed.background_color, "#f4f6a2");
    t.is(manifestFaviconOptsPassed.theme_color, "#f4f6a3");
    t.is(manifestDefault.background_color, "#fff")
    t.is(manifestDefault.theme_color, "#fff")
});

test("Favicon library is passed", async t => {
    hasTheCorrectAmountOfFiles(t, "3--favicons-library-passed", 63)
    console.log(Object.keys(results["3--favicons-library-passed"].files))
    const uniqueFilesForFavicons6 = ["/firefox_app_60x60.png", "/firefox_app_128x128.png", "/firefox_app_512x512.png"];
    for (let i=0; i < uniqueFilesForFavicons6.length; i++) {
        const uniqueFilename = uniqueFilesForFavicons6[i];
        t.false(Object.keys(results["3--works"].files).includes(uniqueFilename))
        t.true(Object.keys(results["3--favicons-library-passed"].files).includes(uniqueFilename))
    }
})
