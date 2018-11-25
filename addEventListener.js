var buffer={}; // store the tabs
var Threshold=0.4;

chrome.tabs.onActivated.addListener(function (activeInfo) {
    chrome.tabs.get(activeInfo.tabId, function callback(tab){
        var url = new URL(tab.url);
        var result = getScreenshot(tab);
        chrome.tabs.sendMessage(tab.id,{image : result} function(response) {
            console.log(response.confirmation);
        });
    })
});

chrome.tabs.onRemoved.addListener(function(tabId, removeInfo){
    if(removeInfo.isWindowClosing){
        stop_thread();
    }
    removeTab(tabId);
}); 
                                   
chrome.tabs.onCreated.addListener(function(tab));

chrome.tabs.onUpdated.addListener(function(tabId,changeInfo,tab));

                                  
        

/*chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.requested == "image"){
            var overlay = document.createElement('div');
            overlay.setAttribute("style","width:100%;height:100%");
            //Code to create the div
            sendResponse({confirmation: "Successfully created div"});
        }
    });*/
                                     