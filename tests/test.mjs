import { cwd } from "process";
import test from "ava";
import { buildScenarios } from "eleventy-test"
console.log("1")

let results = await buildScenarios({
    projectRoot: cwd(),
    returnArray: false,
    enableDebug: true
})

console.log("2")

test("Eleventy v3, v2 & v1 work", async t =>{
    Object.entries(results).forEach(([scenarioName, scenarioOutput]) => {
        t.is(Object.keys(scenarioOutput.files).length, 70);
    })
})