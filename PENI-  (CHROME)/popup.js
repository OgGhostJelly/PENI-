document.getElementById('button').addEventListener('click',function(){
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
})