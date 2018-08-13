'use strict';

function CreateRequest() {
    var Request = false;

    if (window.XMLHttpRequest) {
        //Gecko-совместимые браузеры, Safari, Konqueror
        Request = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
        //Internet explorer
        try {
            Request = new ActiveXObject("Microsoft.XMLHTTP");
        } catch (CatchException) {
            Request = new ActiveXObject("Msxml2.XMLHTTP");
        }
    }

    if (!Request) {
        alert("Невозможно создать XMLHttpRequest");
    }

    return Request;
}

let xhr = CreateRequest();
xhr.open('GET', 'https://www.amazon.com/gp/cart/view.html?ref=nav_cart');
xhr.send();
xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
        var parser = new DOMParser();
        var doc = parser.parseFromString(xhr.responseText, "text/html");
        var elem = doc.getElementsByClassName("sc-product-title");
        var arrayText = [];
        for (var i = 0; i < elem.length; i++) {
            arrayText.push(elem[i].innerText.trim())
        }
    }
    chrome.tabs.onUpdated.addListener(update);

    function update(tabId, changeInfo, tab) {
        chrome.tabs.sendMessage(tab.id, arrayText);
    }
}
