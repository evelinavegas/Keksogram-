import { formSubmit } from "./server/sendForm.js"
import {uploudForm, imgPreview, textDescription} from "./validation.js";

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


export {sendingForm}