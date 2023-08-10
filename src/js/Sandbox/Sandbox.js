import Bridge from 'Shared/Bridge.js'

Bridge.setBridgeId(bridgeId)
Bridge.listen((message) => {
    switch(message.id) {
        case "ExecuteScript":
            let scriptId = message.scriptId
            window[scriptId].call({})
            break
        default:
            console.warn('Invalid message.id')
    }
})
