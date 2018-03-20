'use strict'

var gImgs = 
[{ id: 1, url: 'img/1.jpg', keywords: ['happy'] },

{ id: 1, url: 'img/1.jpg', keywords: ['happy'] }, 
{ id: 1, url: 'img/1.jpg', keywords: ['happy'] }];
var gNextId;
var gMeme = {
    selectedImgId: 5,
    txts: [
        {
            line: 'I never eat Falafel',
            size: 20,
            align: 'left',
            color: 'red'
        }
    ]
}

function init() {
    gNextId = 1;
    renderGallery();
    addImg('img/2.jpg',['happy','sad']);
    addImg('img/3.jpg',['happy','sad']);
}



function renderGallery() {
    var elGrid = document.querySelector('.gallery-grid');
    var strHtml = '';
    gImgs.forEach(function (img, idx) {
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
        keywords: keywords
    }
    gImgs.push(img);
    renderGallery();
}

function openGallery(){
    var elpage1=document.querySelectorAll('.page1');
    var elpage2=document.querySelector('.page2');
    elpage2.classList.toggle('hide');
    elpage1.forEach(function(elpage){
        elpage.classList.toggle('hide');
    })
    
}