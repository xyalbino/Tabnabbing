function stop_thread(){
    clearInterval(thread);
    thread=null;
}

function remove(tabId) {
    delete buffer[tabId];
}
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.requested == "greeting"){
            var result = document.createElement('div');
            result.id="result";
            result.style.width = "100%";
            result.style.height = "100%";
            result.style.backgroundImage=img;
            result.addEventListener("click", function(){
                var temp = document.getElementById('result')
                    temp.parentNode.removeChild(temp);
            });
            
            sendResponse({confirmation: "Successfully created div"});
            document.body.appendChild(result);
        }
    });
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
    },500);
}

function compare(dataUrl, id){
    resemble(dataUrl).compareTo(buffer[id]).onComplete(function(data){
        var percent=data.misMatchPercentage;
        img = data.getImageDataUrl();
        console.log(img);
        var icon;
        console.log(data.misMatchPercentage);
        console.log(data.getImageDataUrl());
        if(percent > Threshold){
            //var diffImage = document.getElementById('res_img');
		    //img = data.getImageDataUrl();
            chrome.tabs.sendMessage(id,{greeting: "hello"}, function(response){
            console.log('111');
            icon={tabId:id, path:"image/unsafe.png"};
            chrome.pageAction.setIcon(icon);
        });

        }
        else{
            //var diffImage = document.getElementById('res_img');
		    //img = data.getImageDataUrl();
            icon={tabId:id, path:"image/safe.png"};
             chrome.pageAction.setIcon(icon);
        }
       
        chrome.pageAction.show(id);
        //buffer[id]=dataUrl;
        
    })
}
