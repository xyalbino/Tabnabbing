/*
Minzhi He & Yuqing Wang
URL: https://github.com/xyalbino/Tabnabbing
*/
var buffer={}; // store the tabs
var Threshold=0.30; // threshold for difference
var flag=true; //flag for compare
var thread=null;
var img=null; //dataUrl
var percent = 0.0; //difference

//events for activated tabs
chrome.tabs.onActivated.addListener(function (activeInfo) {
    stop_thread(); //clear the thread
    chrome.tabs.get(activeInfo.tabId, function callback(tab){
        flag =true;
        var url = new URL(tab.url);
        try{
        getScreenshot(tab); //make a new thread
        }catch(err){
            console.log("err");
        }
    })
});

//events for removed tabs
chrome.tabs.onRemoved.addListener(function(tabId, removeInfo){
    if(removeInfo.isWindowClosing){
        stop_thread();
    }
    remove(tabId); //clear the buffer
}); 
                                   
//events for updated tabs
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
    if(tab.active && changeInfo.status=="complete"){
    stop_thread();
    chrome.tabs.get(tabId, function callback(tab){
        flag = false; //updated tabs do not need compare
        var url = new URL(tab.url);
        if(buffer[tab.id] != undefined){
				remove(tab.id);
			}
        try{
        getScreenshot(tab);    
        }catch(err){
            console.log("err");
        }
    });
    }
});
                       
        


                                     