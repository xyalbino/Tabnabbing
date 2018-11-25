function getScreenshot(tab){
    thread = setTimeout(function(){
        chrome.tabs.captureVisibleTab(function(dataUrl){
            if(buffer[tab.id]==undefined){
                buffer[tab.id]=dataUrl;
            }
            else{
                if(flag==true){
                compare(dataUrl,tab.id);
                flag=false;
                }    
            }
        })        
    },500);
}

function compare(dataUrl, id){
    resemble(dataUrl).compareTo(buffer[id]).onComplete(function(data){
        var percent=data.misMatchPercentage;
        var icon;
        if(percent > Threshold){
            var diffImage = document.getElementById('res_img');
		    diffImage.src = data.getImageDataUrl();
            icon={tabId:id, path:image/unsafe.jpg};
        }
        else{
            icon={tabId:id, path:image/safe.jpg};
        }
        chrome.pageAction.setIcon(icon);
        chrome.pageAction.show(id);
        buffer[id]=dataUrl;
        
    })
    
function remove(tabId) {
    delete buffer[tabId];
}
    
function stop_thread(){
    clearTimeout(thread);
    thread=null;
}
    
}