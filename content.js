'use strict';



chrome.runtime.onMessage.addListener(receiver);
function receiver(words, sender, sendResponse) {

    function alreadyExists(words) {
        let divElem = document.body.getElementsByClassName('s-item-container');
        let nameProduct = document.body.getElementsByClassName('s-access-title');
        for (var i = 0; i < nameProduct.length; i++) {
            for (var j = 0; j < words.length; j++) {
                if (nameProduct[i].childNodes[0].nodeValue == words[j] && nameProduct[i].parentNode.parentNode.lastChild.className != 'addCart') {
                    let divWarning = document.createElement('div');
                    divWarning.className = 'addCart';
                    divWarning.style.border = '1px solid red';
                    divWarning.innerHTML = 'Данный товар уже есть у вас в корзине!';
                    nameProduct[i].parentNode.parentNode.appendChild(divWarning);
                    break;
                } else if (nameProduct[i].lastChild.nodeValue == words[j] && nameProduct[i].parentNode.parentNode.lastChild.className != 'addCart') {
                    let divWarning = document.createElement('div');
                    divWarning.className = 'addCart';
                    divWarning.style.border = '1px solid red';
                    divWarning.style.maxWidth = '300px';
                    divWarning.innerHTML = 'Данный товар уже есть у вас в корзине!';
                    nameProduct[i].parentNode.parentNode.appendChild(divWarning);
                    break;
                }
            }
        }
    }

    alreadyExists(words);

    var target = document.body;
    var observer = new MutationObserver(function(mutations) {

    });

    var config = { childList: true, characterData: true };

    observer.observe(target, config);
}