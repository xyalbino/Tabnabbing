function getScreenshot(tab){
    thread = setTimeout(function(){
        chrome.tabs.captureVisibleTab(function(dataUrl){
            if(buffer[tab.id]==undefined){
                buffer[tab.id]=dataUrl;
            }
            else{
                compare(dataUrl,tab.id);
            }
        })        
    },500);
}

function compare(dataUrl, id){
    resemble(dataUrl).compareTo(buffer[id]).onComplete(function(data){
        var percent=data.misMatchPercentage;
        if(percent < Threshold){
        }
        else{
            //draw
        }
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