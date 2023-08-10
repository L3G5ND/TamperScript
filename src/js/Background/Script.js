import Storage from "./Storage.js"
import ScriptBuilder from "./ScriptBuilder.js"

let scriptCache = {}

function getScript(scriptId) {
    if (typeof(scriptId) == "string" && scriptId.toLowerCase() == "all") {
        return scriptCache
    } else if (scriptId) {
        return scriptCache[scriptId]
    }
}

async function setScript(scriptId, code) {
    let rawScripts = await Storage.get("Scripts", {})
    rawScripts[scriptId] = code
    await Storage.set("Scripts", rawScripts)
    await addScript(scriptId, code)
}

async function addScript(scriptId, rawCode) {
    await ScriptBuilder.BuildScript(scriptId, rawCode).then((script) => {
        scriptCache[scriptId] = script
    }).catch((message) => {
        console.error(message, rawCode)
    })
}

async function init() {
    let rawScripts = await Storage.get("Scripts")
    for (let scriptId in rawScripts) {
        await addScript(scriptId, rawScripts[scriptId])
    }
}
await init()

console.log(scriptCache)

export default {
    GetScript: getScript,
    SetScript: setScript
}