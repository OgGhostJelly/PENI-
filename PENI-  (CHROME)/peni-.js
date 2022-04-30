chrome.storage.local.get(
    ['specialtxt'],
    function(item) {
        specialtxt = item.specialtxt
        peni = document.getElementsByTagName('*')
        //set functions
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
        function peniantitag(i) {
            switch(peni[i].tagName) {
                default:
                    return true
                case 'STYLE':
                case 'SCRIPT':
                    return false
            }
        }
        //run main code
        for (let i=0;i<peni.length;i++) {
            if (!peni[i].children.length) {
                if (!!peni[i].firstChild) {
                    if (peni[i].firstChild.nodeType === Node.TEXT_NODE) {
                        if (peniantitag(i)) {
                            peni[i].innerHTML = penichain(peni[i].innerHTML)
                        }
                    }
                }
            }
        }
    }
)