'use strict'

var gImgs = [];
var gNextId;
var gMeme = {
    selectedImgId: 5,
    txts: [{
        line: 'I never eat Falafel',
        size: 20,
        align: 'left',
        color: 'red'
    }]
}

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



function renderGallery(imgs) {
    var elGrid = document.querySelector('.gallery-grid');
    var strHtml = '';
    imgs.forEach(function (img, idx) {
        strHtml += `<div 
        style="background-image:url(${img.url})" 
        data-id="${img.id}" onclick="openGallery()" class="meme-pic"
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

function openGallery() {
    var elpage1 = document.querySelectorAll('.page1');
    var elpage2 = document.querySelector('.page2');
    elpage2.classList.toggle('hide');
    elpage1.forEach(function (elpage) {
        elpage.classList.toggle('hide');
    });
}

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
