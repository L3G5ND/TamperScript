let esprima = require("esprima")
let escodegen = require("escodegen")
import { ScriptInfoTag, ScriptInfoProperties } from "Shared/Constants.js"

async function buildScript(scriptId, rawCode) {
	return new Promise(async (resolve, reject) => {
		let syntax = esprima.parse(rawCode, { raw: true })

		let hasScriptInfo = false
		for (let i = 0; i < syntax.body.length; i++) {
			let block = syntax.body[i]
			if (block.type == "VariableDeclaration") {
				let declaration = block.declarations && block.declarations[0]
				if (declaration &&
					declaration.id &&
					declaration.id.type == "Identifier" &&
					declaration.id.name == ScriptInfoTag
				) {
					hasScriptInfo = true
					for (let i = 0; i < syntax.body.length; i++) {
						syntax.body[i] = undefined
					}
					syntax.body.length = 1
					syntax.body[0] = block
					break
				}
			}
		}
	
		if (!hasScriptInfo) {
			reject(`Could not find "${ ScriptInfoTag }"`)
			return
		}
	
		let code = escodegen.generate(syntax, {
			format: {
				indent: {
					style: '\t'
				},
				quotes: 'double'
			}
		})
	
		try {
			let scriptInfo = new Function(code + `\nreturn ${ ScriptInfoTag }`)()
	
			let successOrMessage = assertProperties(scriptInfo, ScriptInfoProperties)
			if (successOrMessage != true) {
				reject(successOrMessage)
				return
			}
	
			scriptInfo.id = scriptId
			scriptInfo.rawCode = rawCode
			scriptInfo.code = await assembleCode(scriptInfo)
	
			resolve(scriptInfo)
		} catch(error) {
			reject(`Malformed ${ ScriptInfoTag }: ${ error }`)
		}
	})
}

function assertProperties(object, assertionObject) {
	if (assertionObject.all) {
		let newAssertionObject = {}
		for (const key in object) {
			newAssertionObject[key] = assertionObject.all
		}
		let successOrMessage = assertProperties(object, newAssertionObject)
		if (successOrMessage != true) {
			return successOrMessage
		}
	}
	for (const key in assertionObject) {
		if (key == "all") {
			continue
		}
		let propertyInfo = assertionObject[key]
		if (propertyInfo.required) {
			if (!object[key]) {
				return propertyInfo.errorMessage || false
			}
		}
		if (propertyInfo.default) {
			if (!object[key]) {
				object[key] = propertyInfo.default
			}
		}
		if (propertyInfo.type) {
			if (Array.isArray(propertyInfo.type)) {
				let matchesType = false
				for (let i = 0; i < propertyInfo.type.length; i++) {
					let type = propertyInfo.type[i]
					if (typeof(object[key]) == type) {
						matchesType = true
					}
				}
				if (!matchesType) {
					return propertyInfo.errorMessage || false
				}
			} else {
				if (typeof(object[key]) != propertyInfo.type) {
					return propertyInfo.errorMessage || false
				}
			}
		}
		if (propertyInfo.check) {
			if (!propertyInfo.check(object[key])) {
				return propertyInfo.errorMessage || false
			}
		}
		if (propertyInfo.properties) {
			let successOrMessage = assertProperties(object[key], propertyInfo.properties)
			if (successOrMessage != true) {
				return successOrMessage
			}
		}
		if (propertyInfo.foreach) {
			let successOrMessage = assertProperties(object[key], { all: propertyInfo.foreach })
			if (successOrMessage != true) {
				return successOrMessage
			}
		}
	}
	return true
}

async function assembleCode(script) {
	let code = ''
	for (let i = 0; i < script.dependencies.length; i++) {
		let dependency = script.dependencies[i]
		let dependencyCode = await (await fetch(dependency)).text()
		code += '{\n' + dependencyCode + '\n}'
	}
	code += '{\n' + script.rawCode + '\n}'
	return `window["${ script.id }"] = function() {\n${ code }\n}`
}

export default {
    BuildScript: buildScript,
}