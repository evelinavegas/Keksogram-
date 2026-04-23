import {uploudForm, imgPreview, textDescription} from "./validation.js";
import { sendForm } from "./server/sendForm.js";

function formSubmit(urlValue, hashtagsValue, descriptionValue, filterValue, scaleVal ){
    let obj = {}
   
    obj.id = 0;
    obj.url = `${urlValue}`;
    obj.description = `${descriptionValue}`;
    obj.likes = 0;
    obj.comments = [];
    obj.filter = `${filterValue}`;;
    obj.scaleVal = `${scaleVal}`;
    obj.hashtagsValue = `${hashtagsValue}`;

    sendForm(obj)
}
// success sending 

const successButton = document.querySelector('.success__button')
const success = document.querySelector('.success')

function sendingForm(hashtagsErr, hashtags){
    if(hashtagsErr === 0){
        formSubmit(imgPreview.src, hashtags.value, textDescription.value, imgPreview.style.filter, imgPreview.style.transform)
        uploudForm.classList.add('hidden')
        success.classList.remove('hidden')
    } else {
        alert('error')
    }
}

successButton.addEventListener('click', e=>{
    success.classList.add('hidden')
    location.reload()
})

// error sending
const errorBlock = document.querySelector('.error')
const errorButton = document.querySelector('.error__button').addEventListener('click', e=> {
    errorBlock.classList.add('hidden')
})


function errorMessageCreate() {
    errorBlock.classList.remove('hidden')
}


export {sendingForm, errorMessageCreate}