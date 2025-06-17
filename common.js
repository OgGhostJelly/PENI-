__peniExtensionCommon = (() => {
    function getDefaultImageUrl() {
        gayBowser = (window.browser || window.chrome)
        if (gayBowser) {
            return gayBowser.runtime.getURL("icon.jpg")
        } else {
            console.error("Unknown browser type, unable to get default image url")
            return null
        }
    }

    function getDefaultText() {
        return "peni-"
    }

    /**
     * @returns The user configuration as a promise.
     */
    function getConfig() {
        const defaultValues = { text: getDefaultText(), replaceImages: true, imageUrl: getDefaultImageUrl() }
        if (window.browser) {
            return browser.storage.sync.get(defaultValues)
        } else if (window.chrome) {
            return new Promise((resolve) => {
                chrome.storage.sync.get(defaultValues, (result) => resolve(result))
            })
        } else {
            console.error("Unknown browser type, unable to get config values")
            return Promise.resolve(defaultValues)
        }
    }

    return { getConfig, getDefaultImageUrl, getDefaultText }
})()