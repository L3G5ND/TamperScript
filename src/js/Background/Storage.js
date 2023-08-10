export default {
    get: async (key, defaultValue) => {
        return new Promise((resolve) => {
            chrome.storage.local.get(key, (result) => {
                if (!result[key]) {
                    resolve(defaultValue)
                }
                resolve(result[key])
            })  
        })
    },
    set: async (key, value) => {
        return new Promise((resolve) => {
            chrome.storage.local.set({ [key]: value }, () => {
                resolve()
            })
        })
    },
    remove: async (key) => {
        return new Promise((resolve) => {
            chrome.storage.local.remove(key, () => {
                resolve()
            })
        })
    },
    clear: async () => {
        return new Promise((resolve) => {
            chrome.storage.local.clear(() => {
                resolve()
            })
        })
    }
}