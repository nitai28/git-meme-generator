'use strict'

var gImgs = [];
var gNextId;
var gMeme = {
    selectedImgId: 5,
    texts: [{
        line: 'I never eat Falafel',
        size: 10,
        align: 'left',
        color: 'black',
        shadow: false
    }]
}
var gCurrImg;

function init() {
    gNextId = 1;
    addImg('img/1.jpg', ['Lala']);
    addImg('img/2.jpg', ['happy', 'sad']);
    addImg('img/3.jpg', ['happy', 'sad']);
    addImg('img/3.jpg', ['happy', 'sad']);
    addImg('img/itay.jpg', ['Nahum', 'sad']);
    addImg('img/nitai.jpg', ['Nahum', 'sad']);
    addImg('img/3.jpg', ['Ugly', 'sad']);
    addImg('img/3.jpg', ['happy', 'sad']);
    addImg('img/3.jpg', ['happy', 'sad']);
    renderKeywords();
}
// addimage // add to the model
// render //  take the model and render it


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
        keywords: keywords,
    }
    gImgs.push(img);
    renderGallery(gImgs);
}

// ###### SEARCH by Keywords #####

function filterImages(keyword, elSearchValue) {
    if (!keyword && !elSearchValue) return renderGallery(gImgs);
    if (!keyword) keyword = elSearchValue.toLowerCase();
    var imgs = gImgs.filter(function (img) {
        return img.keywords.some(function (imgKeyword) {
            imgKeyword = imgKeyword.toLowerCase();
            return imgKeyword.indexOf(keyword.toLowerCase()) !== -1;
        })
    });
    renderGallery(imgs);
}

function mapKeywords() {
    var allKeywords = gImgs.reduce(function (acc, img) {
        return acc.concat(img.keywords);
    }, [])

    return allKeywords.reduce(function (acc, keyword) {
        (!acc[keyword]) ? acc[keyword] = 1: acc[keyword]++;
        return acc;
    }, {});
}

function renderKeywords() {
    var elKeywordsBox = document.querySelector('.keywords-box');
    var keywordsMap = mapKeywords();
    var strHtml = '';
    for (var key in keywordsMap) {
        strHtml += `<span style="font-size: calc(1em + ${+keywordsMap[key]*10}px)" onclick="filterImages(this.innerHTML)">${key}</span> `
    }
    elKeywordsBox.innerHTML += strHtml;
}

function toggleKeywordsModal() {
    var elKeywordsModal = document.querySelector('.keywords-modal');
    elKeywordsModal.classList.toggle('hide');
}

// ##### Meme Editor #####

function openGallery() {
    var elpage1 = document.querySelectorAll('.page1');
    var elpage2 = document.querySelector('.page2');
    elpage2.classList.toggle('hide');
    elpage1.forEach(function (elpage) {
        elpage.classList.toggle('hide');
    });
    renderMeme();
}

function renderMeme(){
    var img=gImgs[getPosImg()];
    var canvas = document.getElementById("meme-canvas");
    var ctx = canvas.getContext("2d");
    var memeImg = new Image();
    memeImg.src = img.url;
    canvas.height = memeImg.height;
    canvas.width = memeImg.width;
    memeImg.onload = function () {
        ctx.drawImage(memeImg, 0, 0, canvas.width, canvas.height);
        ctx.font = gMeme.texts[0].size+'px'+' serif';
        ctx.fillStyle = '' + gMeme.texts[0].color;
        if (gMeme.texts[0].shadow) {
            ctx.shadowBlur = 15;
            ctx.shadowColor = '#898';
        } else ctx.shadowBlur = 0;
        ctx.textAlign = gMeme.texts[0].align;
        var posX;
        if(ctx.textAlign === 'left') posX = 50;
        else if(ctx.textAlign === 'center') posX = canvas.width/2;
        else if(ctx.textAlign === 'right') posX = canvas.width-50;
        ctx.fillText(gMeme.texts[0].line, posX, 100);
    }
}

function editMemeText() {
    var inputText = document.querySelector('.meme-text-input').value;
    console.log(inputText);
    gMeme.texts[0].line = inputText;
    renderMeme();

}

function changeColorText() {
    var textColor = document.querySelector('.btn-color-change').value;
    gMeme.texts[0].color = textColor;
    renderMeme();
}

function chooseImg(id) {
    gMeme['selectedImgId'] = id;
}

function getPosImg() {
    return gImgs.findIndex(function (img) {
        return img.id === gMeme.selectedImgId
    })
}

function toggleMemeShadow() {
    (gMeme.texts[0].shadow) ? gMeme.texts[0].shadow = false : gMeme.texts[0].shadow = true;
    renderMeme();
}

function renderKeywords() {
    var elKeywordsBox = document.querySelector('.keywords-box');
    var keywordsMap = mapKeywords();
    var strHtml = '';
    for (var key in keywordsMap) {
        strHtml += `<span style="font-size: calc(1em + ${+keywordsMap[key] * 10}px)" onclick="filterImages(this.innerHTML)">${key}</span> `
    }
    elKeywordsBox.innerHTML += strHtml;
}

function toggleKeywordsModal() {
    var elKeywordsModal = document.querySelector('.keywords-modal');
    elKeywordsModal.classList.toggle('hide');
}

function incDecFontSize(inc){
    (inc)?  gMeme.texts[0].size+=4: gMeme.texts[0].size-=4;
    renderMeme();
}

function changeTextAlign(event, align) {
    if(align === 'left') {
        gMeme.texts[0].align = 'left';
    }
    else if(align === 'right') {
        gMeme.texts[0].align = 'right';
    }
    else if(align === 'center') {
        gMeme.texts[0].align = 'center';
    }
    renderMeme();
}
