const loading = document.body.querySelector("#loading")
const content = document.body.querySelector("#main-content")

const textInput = document.body.querySelector("#text-input")
const saveTextInput = document.body.querySelector("#save-text-input")
const saveChangesSpan = document.body.querySelector("#save-changes")

const replaceImagesInput = document.body.querySelector("#replaceImages-input")
const imageUrlInput = document.body.querySelector("#image-url-input")

const disableExtInput = document.body.querySelector("#disable-ext-input")

async function main() {
    config = await __peniExtensionCommon.getConfig()

    textInput.value = config.text
    replaceImagesInput.checked = config.replaceImages
    imageUrlInput.value = config.imageUrl
    disableExtInput.checked = config.disabled

    loading.style.display = "none"
    content.style.display = ""

    textInput.addEventListener('change', (event) => {
        config.text = event.target.value || __peniExtensionCommon.getDefaultText() || config.text
    })

    imageUrlInput.addEventListener('change', (event) => {
        config.imageUrl = event.target.value || __peniExtensionCommon.getDefaultImageUrl() || config.imageUrl
    })

    replaceImagesInput.addEventListener('change', (event) => {
        config.replaceImages = event.target.checked
    })

    disableExtInput.addEventListener('change', (event) => {
        config.disabled = event.target.checked
    })

    saveTextInput.addEventListener('click', (event) => {
        onChange()
    })

    function setConfig(items) {
        if (window.browser) {
            return browser.storage.sync.set(items)
        } else if (window.chrome) {
            return new Promise((resolve) => {
                chrome.storage.sync.set(items, () => resolve())
            })
        } else {
            console.error("Unknown storage type, unable to set config values")
            return Promise.resolve()
        }
    }

    // Keep chaining sync requests onto this promise so stuff happens in the right order
    // or else you might get race conditions
    let syncPromise = Promise.resolve()

    let resetSpanId = null

    function onChange() {
        syncPromise = syncPromise.then(setConfig(config)).then(() => {
            if (resetSpanId != null) {
                clearTimeout(resetSpanId)
            }

            saveChangesSpan.style.display = ""

            resetSpanId = setTimeout(() => {
                saveChangesSpan.style.display = "none"
            }, 1000)
        })
    }
}

main()
