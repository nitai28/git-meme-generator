'use strict'

var gImgs = [];
var gNextId;
var gMeme = {
    selectedImgId: 5,
    selectedTextIdx: 0,
    texts: [{
        posY: 100,
        line: 'I never eat Falafel',
        size: 25,
        align: 'left',
        color: 'white',
        shadow: false,
        font: 'impact',
    }, {
        posY: 150,
        line: 'I never eat Falafel',
        size: 20,
        align: 'left',
        color: 'white',
        shadow: false,
        font: 'impact',
    }]
}
var gCurrImg;
var gCurrUploadImg;

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
    var elGrid = document.querySelector('.gallery-grid');
    var strHtml = '';
    var strHtml = '<button onclick="toggleUploadModal()"><i class="far fa-plus-square fa-11x"></i></button></div>';
    imgs.forEach(function (img, idx) {
        strHtml += `
        <div 
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
        (!acc[keyword]) ? acc[keyword] = 1 : acc[keyword]++;
        return acc;
    }, {});
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

function toggleUploadModal() {
    var elUploadModal = document.querySelector('.upload-modal');
    elUploadModal.classList.toggle('hide');
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

function renderMeme() {
    var img = gImgs[getPosImg()];
    var canvas = document.getElementById("meme-canvas");
    var ctx = canvas.getContext("2d");
    var memeImg = new Image();
    memeImg.src = img.url;
    canvas.height = memeImg.height;
    canvas.width = memeImg.width;
    memeImg.onload = function () {
        ctx.drawImage(memeImg, 0, 0, canvas.width, canvas.height);
        gMeme.texts.forEach(function (text, idx) {
            ctx.font = text.size + 'px' + ' ' + text.font;
            ctx.fillStyle = '' + text.color;
            if (text.shadow) {
                ctx.shadowBlur = 15;
                ctx.shadowColor = '#000';
            } else ctx.shadowBlur = 0;

            ctx.textAlign = text.align;
            var posX;
            if (ctx.textAlign === 'left') posX = 50;
            else if (ctx.textAlign === 'center') posX = canvas.width / 2;
            else if (ctx.textAlign === 'right') posX = canvas.width - 50;
            ctx.fillText(text.line, posX, text.posY);
        });
    }
}

function editMemeText() {
    var textIdx = gMeme.selectedTextIdx;
    var inputText = document.querySelectorAll('.meme-text-input');
    gMeme.texts[textIdx].line = inputText[textIdx].value;
    renderMeme();

}

function changeColorText() {
    var textIdx = gMeme.selectedTextIdx;
    var textColor = document.querySelector('.btn-color-change').value;
    gMeme.texts[textIdx].color = textColor;
    renderMeme();
}

function chooseImg(id) {
    gMeme['selectedImgId'] = id;
}

function chooseText(idx) {
    gMeme['selectedTextIdx'] = idx;
}

function getPosImg() {
    return gImgs.findIndex(function (img) {
        return img.id === gMeme.selectedImgId
    })
}

function toggleMemeShadow() {
    var textIdx = gMeme.selectedTextIdx;
    gMeme.texts[textIdx].shadow = (gMeme.texts[textIdx].shadow) ? false : true;
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

function incDecFontSize(inc) {
    var textIdx = gMeme.selectedTextIdx;
    (inc) ? gMeme.texts[textIdx].size += 4 : gMeme.texts[textIdx].size -= 4;
    renderMeme();
}

function changeTextAlign(event, align) {
    var textIdx = gMeme.selectedTextIdx;
    if (align === 'left') {
        gMeme.texts[textIdx].align = 'left';
    } else if (align === 'right') {
        gMeme.texts[textIdx].align = 'right';
    } else if (align === 'center') {
        gMeme.texts[textIdx].align = 'center';
    }
    renderMeme();
}

function fontChoose() {
    var textIdx = gMeme.selectedTextIdx;
    var font = document.querySelector('.font-choose').value;
    gMeme.texts[textIdx].font = font;
    renderMeme();
}

function download() {
    var download = document.getElementById("download");
    var image = document.getElementById("meme-canvas").toDataURL("image/png")
        .replace("image/png", "image/octet-stream");
    download.setAttribute("href", image);

}

function sendEmail() {
    var email = document.querySelector('.email').value;
    var subject = document.querySelector('.subject').value;
    var name = document.querySelector('.input-name').value;
    var message = document.querySelector('.text-message').value;
    subject += ' ' + email + ' ' + name;
    var strUrl = 'https://mail.google.com/mail/?view=cm&fs=1&to=Taytay884@yahoo.com&su=' + subject + '&body=' + message + '';
    window.open(strUrl);
}

function toggleMenu() {
    var elNavbar = document.querySelector('.navbar-container');
    elNavbar.classList.toggle('show');
    var elHeader = document.querySelector('header');
    elHeader.classList.toggle('menu-opened');
}

function addLine() {

    var lastPosY = (gMeme.texts[gMeme.texts.length - 1].posY) + 50;
    if (gMeme.texts.length < 4) {
        gMeme.texts.push({
            line: 'I never eat Falafel',
            size: 20,
            align: 'left',
            color: 'white',
            shadow: false,
            font: 'impact',
            posY: lastPosY
        });
        renderInputLine();
    }
}

function renderInputLine() {
    var input = document.querySelector('.input-add');
    var strHtml = '';
    for (var i = 2; i < gMeme.texts.length; i++) {
        strHtml += `
        <div class="flex justify-content align-center">
            <button class="remove" onclick="removeLine(${i},this)"><i class="far fa-trash-alt fa-2x"></i></button>
            <input class="meme-text-input" value="${gMeme.texts[i].line}" type="text" onkeyup="editMemeText()" placeholder="Enter text" onfocus="chooseText(${i})">
        </div>
        `;
    }
    input.innerHTML = strHtml;
}

function removeLine(index, button) {
    gMeme.texts.splice(index, 1);
    renderInputLine();
}

function previewImage() {
    var preview = document.querySelector('img'); //selects the query named img
    var file = document.querySelector('input[type=file]').files[0]; //sames as here
    var reader = new FileReader();

    reader.onloadend = function () {
        gCurrUploadImg = reader.result;
        preview.src = gCurrUploadImg;
    }

    if (file) {
        reader.readAsDataURL(file);
    } else {
        preview.src = "";
    }
}

function uploadImage() {
    if (!gCurrUploadImg) return;
    addImg(gCurrUploadImg);
    renderGallery(gImgs);
    toggleUploadModal();
    gCurrUploadImg = '';
}

function moveLineVertical(dirction) {
    var textIdx = gMeme.selectedTextIdx;
    if (dirction === 'up') gMeme.texts[textIdx].posY -= 5;
    else gMeme.texts[textIdx].posY += 5;
    renderMeme();
}