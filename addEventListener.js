var buffer={}; // store the tabs

chrome.tabs.onActivated.addListener(function (activeInfo) {
    chrome.tabs.get(activeInfo.tabId, function callback(tab){
        var url = new URL(tab.url);
        getScreenshot(tab);
    })
});

chrome.tabs.onRemoved.addListener(function(tabId, removeInfo)); 
                                   
chrome.tabs.onCreated.addListener(function(tab));

chrome.tabs.onUpdated.addListener(function(tabId,changeInfo,tab));
                                     