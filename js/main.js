'use strict'

var gImgs = [
];
var gNextId;
var gMeme = {
    selectedImgId: 5,
    txts: [{
        line: 'I never eat Falafel',
        size: 20,
        align: 'left',
    }]
}
var gCurrImg;

function init() {
    gNextId = 1;
    addImg('img/1.jpg', ['Lala']);
    addImg('img/2.jpg', ['happy', 'sad']);
    addImg('img/3.jpg', ['happy', 'sad']);
}



function renderGallery(imgs) {
    var elGrid = document.querySelector('.gallery-grid'); var strHtml = '';
    var strHtml = '';
    imgs.forEach(function (img, idx) {
        strHtml += `<div 
        style="background-image:url(${img.url})" 
        data-id="${img.id}" onclick="chooseImg(${img.id}); openGallery();" class="meme-pic"
        ></div>
        `
    });
    elGrid.innerHTML = strHtml;
}


function addImg(url, keywords) {

    var img = {
        id: gNextId++,
        url: url,
        keywords: keywords
    }
    gImgs.push(img);
    renderGallery(gImgs);
}
function filterImages(event) {
    var elSearch = document.querySelector('#search');
    var keyword = elSearch.value;
    if (!keyword) return renderGallery(gImgs);
    var imgs = gImgs.filter(function (img) {
        return img.keywords.some(function (imgKeyword) {
            return imgKeyword.indexOf(keyword) !== -1;
        })
    });
    renderGallery(imgs);
}

function openGallery() {
    var elpage1 = document.querySelectorAll('.page1');
    var elpage2 = document.querySelector('.page2');
    elpage2.classList.toggle('hide');
    elpage1.forEach(function (elpage) {
        elpage.classList.toggle('hide');
    });
    var pos = getPosImg(gImgs);
    drawImg(gImgs[pos]);
}


function drawImg(img) {
    if (!img) {
        var pos = gImgs.findIndex(function (img) {
            return img.id === gMeme.selectedImgId
        })
        img = gImgs[pos];
    }
    var canvas = document.getElementById("my-canvas"),
        ctx = canvas.getContext("2d");

    var background = new Image();
    background.src = img.url;
    console.log(background.height)
    canvas.height = background.height;
    canvas.width = background.width;
    // Make sure the image is loaded first otherwise nothing will draw.
    background.onload = function () {
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
        addText();
    }
}

function addText() {
    var elInput = document.querySelector('.text-pic');
    var canvas = document.getElementById('my-canvas');
    var ctx = canvas.getContext('2d');
    ctx.font = "48px serif";
    ctx.fillStyle = '#fff';
    ctx.fillText(elInput.value, 50, 100);
}

function chooseImg(id) {
    console.log(id);
    gMeme['selectedImgId'] = id;
}

function getPosImg(gImgs){
    return gImgs.findIndex(function (img) {
        return img.id === gMeme.selectedImgId
    })
}