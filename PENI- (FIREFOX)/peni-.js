browser.storage.local.get().then(
    function(item) {
        specialtxt = item.specialtxt
        function peniantitag(parentnode) {
            switch(parentnode.tagName) {
                default:
                    return true
                case 'STYLE':
                case 'SCRIPT':
                    return false
            }
        }
        if(!item.full) {
            function penichain(penich) {
                let str = ''
                var di=0
                for(let i=0;i<penich.length;i++) {
                    str += specialtxt[di]
                    di+=1
                    if (di>specialtxt.length-1) {
                        di=0
                    }
                }
                return(str)
            }
        } else {
            function penichain(penich) {
                let str = ''
                if(Math.round(penich.length/specialtxt.length)) {
                    for(let i=0;i<Math.round(penich.length/specialtxt.length);i++) {
                        str += specialtxt
                    }
                } else {
                    str = specialtxt
                }
                return(str)
            }
        }
        function findtext(peni) {
            for (let i=0;i<peni.childNodes.length;i++) {
                node = peni.childNodes[i]
                if (node.nodeType === Node.TEXT_NODE) {
                    nodevalue = node.nodeValue.replace(/\s/g, '')
                    if (nodevalue!=='') {
                        if (peniantitag(node.parentNode)) {
                            node.nodeValue = penichain(nodevalue)
                        }
                    }
                } else {
                    findtext(node)
                }
            }
        }
        findtext(document.body)
        if (item.img) {
            peni = document.body.getElementsByTagName('*')
            for(let i=0;i<peni.length;i++) {
                if (peni[i].tagName == 'IMG') {
                    peni[i].setAttribute('width',peni[i].width)
                    peni[i].setAttribute('height',peni[i].height)
                    peni[i].setAttribute('src',browser.runtime.getURL("icon.jpg"))
                }
            }
        }
    }
,
    function(err) {
        console.log(err)
    }
)