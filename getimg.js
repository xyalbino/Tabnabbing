document.getElementById("res_img").src=chrome.extension.getBackgroundPage().img;
document.getElementById("per").innerHTML="difference:"+chrome.extension.getBackgroundPage().percent+"%";