chrome.storage.local.get(['full','img'],function(item) {
    document.getElementById('button-full').value = item.full
    document.getElementById('button-img').value = item.img
})
document.getElementById('button-enter').addEventListener('click',function(){
    if (!!document.getElementById('input-enter').value) {
        chrome.storage.local.set( {
                specialtxt: document.getElementById('input-enter').value,
            }
        )
    } else {
        chrome.storage.local.set( {
                specialtxt: 'peni-',
            }
        )
    }
})
document.getElementById('button-full').addEventListener('change',function(){
    chrome.storage.local.set({
        full: parseInt(this.value)
    })
})
document.getElementById('button-img').addEventListener('change',function(){
    chrome.storage.local.set({
        img: parseInt(this.value)
    })
})