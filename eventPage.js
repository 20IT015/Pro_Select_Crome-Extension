let menuItem = {
    "id": "Speak",
    "title": "Speak",
    "contexts": ["selection"]
};

let menuItem2 = {
    "id": "Wikit",
    "title": "Wikit",
    "contexts": ["selection"]
};

chrome.contextMenus.create(menuItem);
chrome.contextMenus.create(menuItem2);

chrome.contextMenus.onClicked.addListener(function(clickData){ 
    if (clickData.menuItemId == "Speak" && clickData.selectionText){        
       chrome.tts.speak(clickData.selectionText,
                        {
                            'rate': 0.7
                        });         
    }
});



function fixedEncodeURI (str) {
    return encodeURI(str).replace(/%5B/g, '[').replace(/%5D/g, ']');
}

chrome.contextMenus.onClicked.addListener(function(clickData){   
    if (clickData.menuItemId == "Wikit" && clickData.selectionText){    
        var wikiUrl = "https://en.wikipedia.org/wiki/" + fixedEncodeURI(clickData.selectionText);
        var createData = {
            "url": wikiUrl,
            "type": "popup",
            "top": 5,
            "left": 5,
            "width": screen.availWidth/2,
            "height": screen.availHeight/2
        };              
        chrome.windows.create(createData, function(){});        
    }
});