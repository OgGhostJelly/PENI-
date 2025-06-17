/* This script is injected into web pages when they load */

const ELEMENT_NODE = 1
const ATTRIBUTE_NODE = 2
const TEXT_NODE = 3

async function transform(config, node) {
    if (config.replaceImages) {
        transformImageNodes(config, node)
    }
    transformTextNodes(config, node)
}

async function transformImageNodes(config, node) {
    if (node.nodeType != ELEMENT_NODE) {
        return;
    }

    if (node.nodeName == "IMG") {
        node.width = node.width
        node.height = node.height
        node.src = config.imageUrl || __peniExtensionCommon.getDefaultImageUrl() || node.src
    }

    for (const child of node.childNodes) {
        transformImageNodes(config, child)
    }
}

async function transformTextNodes(config, node) {
    if (node.textContent.trim().length == 0) {
        return;
    }

    if (node.nodeType != ELEMENT_NODE && node.nodeType != TEXT_NODE) {
        return;
    }

    if (["SCRIPT", "STYLE"].includes(node.nodeName)) {
        return
    }

    if (node.nodeType == TEXT_NODE) {
        node.textContent = penifyText(config, node.textContent)
    }

    for (const child of node.childNodes) {
        transformTextNodes(config, child)
    }
}


function penifyText(config, text) {
    newText = config.text || __peniExtensionCommon.getDefaultText()
    if (!newText) {
        return text;
    }

    ret = ""
    counter = 0

    for (const i in text) {
        is_alphanumeric = text[i].match(/^[a-z0-9]+$/i)
        if (!is_alphanumeric) {
            ret += text[i]
            continue;
        }

        ret += newText[counter % newText.length]
        counter += 1
    }

    return ret
}

async function main() {
    // You can find the code for __peniExtensionCommon in `common.js`
    config = await __peniExtensionCommon.getConfig()
    if (config.disabled) {
        return;
    }

    // Transform the nodes of the entire document
    const title = document.head.querySelector("title")
    transform(config, document.body)
    if (title) transform(config, title)

    // Observe mutations and transform nodes
    const observer = new MutationObserver((mutationList, observer) => {
        for (const mutation of mutationList) {
            for (const node of mutation.addedNodes) {
                transformTextNodes(config, node)
            }
        }
    });

    const options = { subtree: true, childList: true, characterData: true }
    observer.observe(document.body, options)
    if (title) observer.observe(title, options)
}

main()
