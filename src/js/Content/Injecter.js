import { ExtensionUrl } from "Shared/Constants.js"
import Bridge from "Shared/Bridge.js"

let injectedScripts = []

function getScriptNameCount(name) {
	let scriptNameCount = 0
	for (let i = 0; i < injectedScripts.length; i++) {
		let script = injectedScripts[i]
		if (script.name == name) {
			scriptNameCount += 1
		}
	}
	return scriptNameCount
}

async function injectSandbox(url, bridgeId) {
	let sandboxCode = await (await fetch(url)).text()
	inject({
		name: 'Sandbox',
		code: `(function(bridgeId) {\n${ sandboxCode }\n})("${ bridgeId }")`
	})
}

function injectScript(script) {
	inject(script)
	Bridge.send({
		id: "ExecuteScript",
		scriptId: script.id
	})
}

function inject(script) {
	injectedScripts.push(script)

	let divElement = document.createElement("div")
	divElement.attachShadow({ mode: 'closed' })

	let scriptElement = document.createElementNS("http://www.w3.org/1999/xhtml", "script")
	scriptElement.textContent = script.code + `\n//# sourceURL=${ ExtensionUrl }${ script.name }.js#${ getScriptNameCount(script.name) }`

	divElement.appendChild(scriptElement)
	document.getElementsByTagName('*')[0].appendChild(divElement)

	scriptElement.remove()
	divElement.remove()
}

export default {
	InjectSandbox: injectSandbox,
	InjectScript: injectScript,
	Inject: inject,
}