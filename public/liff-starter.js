window.onload = function() {
    const useNodeJS = true; 
    const defaultLiffId = "";
    let myLiffId = "";

    if (useNodeJS) {
        fetch('/send-id')
            .then(function(reqResponse) {
                return reqResponse.json();
            })
            .then(function(jsonResponse) {
                myLiffId = jsonResponse.id;
                initializeLiff(myLiffId);
            })
            .catch(function(error) {
                console.log(error.message, error.code);
            });
    } else {
        myLiffId = defaultLiffId;
        initializeLiff(myLiffId);
    }
};

function initializeLiff(myLiffId) {
    liff
        .init({
            liffId: myLiffId
        })
        .then(() => {
            sendLiff();
        })
        .catch((err) => {
            console.log(err);
        });
}

function sendLiff(){
    var tipe = getParameterByName('type');
    if (tipe === 'text') {
        liff.sendMessages([{
            type: 'text',
            text: getParameterByName('text'),
            sentBy: {
                label: "© Psychopumpum™ 2021",
                iconUrl: "https://psychopumpum.com/assets/img/psychopumpum.png",
                linkUrl: "https://line.me/ti/p/~psychopumpum_"
            }
        }]).then(function () {
            liff.closeWindow();
        });
    } else if (tipe === 'image') {
        liff.sendMessages([{
            type: 'image',
            originalContentUrl: getParameterByName('link'),
            previewImageUrl: getParameterByName('link'),
            sentBy: {
                label: "© Psychopumpum™ 2021",
                iconUrl: "https://psychopumpum.com/assets/img/psychopumpum.png",
                linkUrl: "https://line.me/ti/p/~psychopumpum_"
            }
        }]).then(function () {
            liff.closeWindow();
        });
    } else if (tipe === 'video') {
        prev = getParameterByName('img');
        if(prev !== null && prev !== '') {
            dura = prev;
        } else {
            dura = "https://s6.gifyu.com/images/2d02a745c078f037322f577fa25b7c38.gif";
        }
        liff.sendMessages([{
            type: 'video',
            originalContentUrl: getParameterByName('vid'),
            previewImageUrl: dura
        }]).then(function () {
            liff.closeWindow();
        });
    } else if (tipe === 'audio') {
        duration = getParameterByName('duration');
        if(duration !== null && duration !== '') {
            dura = parseInt(duration);
        } else {
            dura = 60000;
        }
        liff.sendMessages([{
            type: 'audio',
            originalContentUrl: getParameterByName('link'),
            duration: dura
        }]).then(function () {
            liff.closeWindow();
        });
    }
}

function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}