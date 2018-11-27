var buffer={}; // store the tabs
var Threshold=0.05;
var flag=true;
var thread=null;
var img=null;
var percent = 0.0;

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

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
    if(tab.active && changeInfo.status=="complete"){
    stop_thread();
    chrome.tabs.get(tabId, function callback(tab){
        flag = false;
        var url = new URL(tab.url);
        if(buffer[tab.id] != undefined){
				remove(tab.id);
			}
        try{
        getScreenshot(tab);    
        }catch(err){
            console.log("....")
        }

    });
    }
});
                       
        


                                     