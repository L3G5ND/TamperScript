import Storage from "./Storage.js"
import Script from "./Script.js"

chrome.runtime.onMessage.addListener(async function(message, sender, respond) {
    (async function() {
        switch(message.id) {
            case "GetScript":
                respond(Script.GetScript(message.scriptId))
                break
            case "SetScript":
                console.log('abc')
                await Script.SetScript(message.scriptId, message.scriptCode)
            default:
        }
        respond()
    })()
    return true
})