let SandboxCommunicationId

function listen(callback) {
    window.addEventListener(SandboxCommunicationId, (event) => {
        callback(event.detail)
    })
}

function send(message) {
	window.dispatchEvent(new CustomEvent(SandboxCommunicationId, { detail: message }))
}

function setCommunicationId(id) {
    SandboxCommunicationId = id
}

export default {
    listen: listen,
    send: send,
    setBridgeId: setCommunicationId
}