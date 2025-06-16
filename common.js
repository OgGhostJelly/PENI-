__peniExtensionCommon = (() => {
    /**
     * @returns The user configuration as a promise.
     */
    function getConfig() {
        const defaultValues = { text: "peni-", replaceImages: true, imageUrl: null }
        if (window.browser) {
            return browser.storage.sync.get(defaultValues)
        } else if (window.chrome) {
            return new Promise((resolve) => {
                chrome.storage.sync.get(defaultValues, (result) => resolve(result))
            })
        } else {
            console.error("Unknown storage type, unable to get config values")
            return Promise.resolve(defaultValues)
        }
    }

    return { getConfig }
})()