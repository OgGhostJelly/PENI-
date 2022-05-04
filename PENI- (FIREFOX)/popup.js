browser.storage.local.get(function(item) {
    document.getElementById('button-full').value = item.full
    document.getElementById('button-img').value = item.img
})
document.getElementById('button-enter').addEventListener('click',function(){
    if (!!document.getElementById('input-enter').value) {
        browser.storage.local.set( {
                specialtxt: document.getElementById('input-enter').value,
            }
        )
    } else {
        browser.storage.local.set( {
                specialtxt: 'peni-',
            }
        )
    }
})
document.getElementById('button-full').addEventListener('change',function(){
    browser.storage.local.set({
        full: parseInt(this.value)
    })
})
document.getElementById('button-img').addEventListener('change',function(){
    browser.storage.local.set({
        img: parseInt(this.value)
    })
})