import Injector from "./Injecter.js"
import { SandboxUrl } from  "Shared/Constants.js"
import UUID from 'Shared/UUID.js'
import API from 'Shared/API.js'
import Bridge from 'Shared/Bridge.js'
import "urlpattern-polyfill"

let bridgeId = UUID.generate()
Bridge.setBridgeId(bridgeId)
await Injector.InjectSandbox(SandboxUrl, bridgeId)


await API.SetScript("f042e410-d7b3-4383-8d0b-5f354b741390", `let ScriptInfo = {
	name: 'TamperScript1',
	description: 'This is a test script',
	version: '1.0.0',
	author: 'L3G5ND',
	website: 'https://www.roblox.com/users/721686115/profile',
	icon: 'https://www.google.com/s2/favicons?domain=krunker.io',
	runs: {
		matches: [
			{
				protocol: "*",
				username: "*",
				password: "*",
				hostname: "*",
				port: "*",
				pathname: "*",
				search: "*",
				hash: "*",
			}
		],
		runsAt: 'start'
	},
	dependencies: [
		
	]
}

console.log(ScriptInfo.name, ScriptInfo.runs.matches[0])`)

await API.SetScript("fb09a42e-3570-4c8e-95a7-6e2a914d646d", `let ScriptInfo = {
	name: 'TamperScript2',
	description: 'This is a test script',
	version: '1.0.0',
	author: 'L3G5ND',
	website: 'https://www.roblox.com/users/721686115/profile',
	icon: 'https://www.google.com/s2/favicons?domain=krunker.io',
	runs: {
		matches: [
			'all'
		],
		runsAt: 'start'
	},
	dependencies: [
		
	]
}

console.log(ScriptInfo.name, ScriptInfo.runs.matches[0])`)

await API.SetScript("e0c08337-279a-4e4e-b75f-8f82657a11ff", `let ScriptInfo = {
	name: 'TamperScript3',
	description: 'This is a test script',
	version: '1.0.0',
	author: 'L3G5ND',
	website: 'https://www.roblox.com/users/721686115/profile',
	icon: 'https://www.google.com/s2/favicons?domain=krunker.io',
	runs: {
		matches: [
			'*://*/*'
		],
		runsAt: 'start'
	},
	dependencies: [
		
	]
}

console.log(ScriptInfo.name, ScriptInfo.runs.matches[0])`)

await API.SetScript("b987ba79-fea5-4116-b40a-ed553b8cec5d", `let ScriptInfo = {
	name: 'TamperScript4',
	description: 'This is a test script',
	version: '1.0.0',
	author: 'L3G5ND',
	website: 'https://www.roblox.com/users/721686115/profile',
	icon: 'https://www.google.com/s2/favicons?domain=krunker.io',
	runs: {
		matches: [
			'*://*/*'
		],
		runsAt: 'start'
	},
	dependencies: [
		
	]
}

console.log(ScriptInfo.name, ScriptInfo.runs.matches[0])`)


let scripts = await API.GetScript("all")
for (let scriptId in scripts) {
	let script = scripts[scriptId]
	
	let matches = script.runs.matches
	if (matches != "all") {
		if (Array.isArray(matches)) {
			let noMatch = true
			for (let key in matches) {
				const pattern = new URLPattern(matches[key])
				if (pattern.test(location.href)) {
					noMatch = false
				}
			}
			if (noMatch) {
				continue
			}
		} else {
			const pattern = new URLPattern(matches)
			if (!pattern.test(location.href)) {
				continue
			}
		}
	}
	
	Injector.InjectScript(scripts[scriptId])
}
