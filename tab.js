function stop_thread(){
    clearInterval(thread);
    thread=null;
}

function remove(tabId) {
    delete buffer[tabId];
}

function getScreenshot(tab){
    thread = setInterval(function(){
        chrome.tabs.captureVisibleTab({format : "png"}, function(dataUrl){
            if(chrome.runtime.lastError) return;
            if(buffer[tab.id]==undefined){
                buffer[tab.id]=dataUrl;
                //console.log(buffer[tab.id]);
            }
            else{
                if(flag==true){
                //console.log(dataUrl);
                compare(dataUrl,tab.id);
                flag=false;
                } 
                buffer[tab.id]=dataUrl;
                //console.log("asadada");
            }
        })        
    },1000);
}

function compare(dataUrl, id){
    resemble(dataUrl).compareTo(buffer[id]).onComplete(function(data){
        var percent=data.misMatchPercentage;
        img = data.getImageDataUrl();
        //console.log(img);
        var icon;
        //console.log(data.misMatchPercentage);
        //console.log(data.getImageDataUrl());
        if(percent > Threshold){
            //var diffImage = document.getElementById('res_img');
		    //img = data.getImageDataUrl();
            icon={tabId:id, path:"image/unsafe.png"};
        }
        else{
            //var diffImage = document.getElementById('res_img');
		    //img = data.getImageDataUrl();
            icon={tabId:id, path:"image/safe.png"};
        }
        chrome.pageAction.setIcon(icon);
        chrome.pageAction.show(id);
        //buffer[id]=dataUrl;
        
    })
    

    

    
}