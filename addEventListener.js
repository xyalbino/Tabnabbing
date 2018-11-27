var buffer={}; // store the tabs
var Threshold=0.05;
var flag=true;
var thread=null;
var img=null;

chrome.tabs.onActivated.addListener(function (activeInfo) {
    stop_thread();
    chrome.tabs.get(activeInfo.tabId, function callback(tab){
        flag =true;
        var url = new URL(tab.url);
        try{
        getScreenshot(tab);    
        }catch(err){
            console.log("....")
        }

    })
});

chrome.tabs.onRemoved.addListener(function(tabId, removeInfo){
    if(removeInfo.isWindowClosing){
        stop_thread();
    }
    remove(tabId);
}); 
                                   
//chrome.tabs.onCreated.addListener(function(tab));

//chrome.tabs.onUpdated.addListener(function(tabId,changeInfo,tab));

                                  
        


                                     