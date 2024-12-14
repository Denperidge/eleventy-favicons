import { cwd } from "process";
import test from "ava";
import { buildScenarios } from "eleventy-test"

let results = await buildScenarios({
    projectRoot: cwd(),
    returnArray: false
});


test("Eleventy 3 works", t => {
    t.is(Object.keys(results["3--works"].files).length, 70);
});

async function getManifest(scenarioName) {
    return JSON.parse(
        await results[scenarioName].getFileContent("/manifest.webmanifest")
    );
}

test("Favicon options are passed", async t => {
    const manifestFaviconOptsPassed = await getManifest("3--favicon-options-passed");
    const manifestDefault = await getManifest("3--works");

    t.is(manifestFaviconOptsPassed.background_color, "#f4f6a2");
    t.is(manifestFaviconOptsPassed.theme_color, "#f4f6a3");
    t.is(manifestDefault.background_color, "#fff")
    t.is(manifestDefault.theme_color, "#fff")
});
