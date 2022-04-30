console.log('pop')
chrome.storage.local.get(['full','img'],function(item) {
    document.getElementById('button-full').value = item.full
    document.getElementById('button-img').value = item.img
    console.log('set')
})
document.getElementById('button-enter').addEventListener('click',function(){
    if (!!document.getElementById('input').value) {
        chrome.storage.local.set( {
                specialtxt: document.getElementById('input').value,
            }
        )
    } else {
        chrome.storage.local.set( {
                specialtxt: 'peni-',
            }
        )
    }
    console.log('enter')
})
document.getElementById('button-full').addEventListener('change',function(){
    chrome.storage.local.set({
        full: parseInt(this.value)
    })
    console.log('full')
})
document.getElementById('button-img').addEventListener('change',function(){
    chrome.storage.local.set({
        img: parseInt(this.value)
    })
    console.log('img')
})
console.log('up')