function stop_thread(){
    clearInterval(thread);
    thread=null;
}

function remove(tabId) {
    delete buffer[tabId];
}

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {

        if (request.greeting == "hello"){
            var result = document.createElement('div');
            result.id="result";
            result.style.width = "100%";
            result.style.height = "100%";
            result.style.top = "0px";
            result.style.left = "0px";
            result.style.backgroundImage = "url(" + request.data + ")";
            result.style.backgroundSize = "100% 100%"
            result.style.position = "fixed";
          //  result.style.overflow = "hidden";
            
            result.addEventListener("click", function(){
                var temp = document.getElementById('result')
                    temp.parentNode.removeChild(temp);
             });
            document.body.appendChild(result);
            console.log(request.data);
            sendResponse({confirmation: "Successfully created div"});

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
    },1000);
}

function compare(dataUrl, id){
    resemble(dataUrl).compareTo(buffer[id]).onComplete(function(data){
        percent=data.misMatchPercentage;
        img = data.getImageDataUrl();
       // console.log(img);
        var icon;
      //  console.log(data.misMatchPercentage);
      //  console.log(data.getImageDataUrl());
        if(percent > Threshold){
            //var diffImage = document.getElementById('res_img');
		    //img = data.getImageDataUrl();
              chrome.tabs.query({
                active: true,
                currentWindow: true
            }, function(tabs) {

                 chrome.tabs.sendMessage(id, 
                  { greeting: "hello",data: img }, function(response) {
                     console.log('111');
            icon={tabId:id, path:"image/unsafe.png"};
            chrome.pageAction.setIcon(icon);
               });
            });
        }
        else{
            //var diffImage = document.getElementById('res_img');
		    //img = data.getImageDataUrl();
            icon={tabId:id, path:"image/safe.png"};
             chrome.pageAction.setIcon(icon);
        }
  /*      chrome.tabs.query({active: true, windowId: windowId}, function (tabs) {
        chrome.tabs.get(tabs[0].id, function (tab) {
            if (tab.active) {
                chrome.browserAction.setBadgeText({
                    text: percent
                });
            }
        });
    });*/
       
        chrome.pageAction.show(id);
        //buffer[id]=dataUrl;
        
    })
}
