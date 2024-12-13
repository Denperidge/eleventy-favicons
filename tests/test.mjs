import { cwd } from "process";
import test from "ava";
import { buildScenarios } from "eleventy-test"

console.log("1")
let results;

test.before("meow", async() => {
    return new Promise(async (resolve, reject) => {
        buildScenarios({
            projectRoot: cwd(),
            returnArray: false,
        }).then(results => {
            resolve(results);
        }).catch(e =>{ throw e; })
        
    })
})

console.log("2")

test("Eleventy v3, v2 & v1 work", async t =>{
    console.log(results)
})