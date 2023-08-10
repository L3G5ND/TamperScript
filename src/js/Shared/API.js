function get(message) {
    return new Promise(resolve => {
        chrome.runtime.sendMessage(message,
            function(response) {
                resolve(response)
            }
        )
    })
}

async function getScript(scriptId, location) {
    return await get({
        id: "GetScript",
        scriptId: scriptId,
        location: location
    })
}

async function setScript(scriptId, scriptCode) {
    return await get({
        id: "SetScript",
        scriptId: scriptId,
        scriptCode: scriptCode
    })
}

export default {
    GetScript: getScript,
    SetScript: setScript
}