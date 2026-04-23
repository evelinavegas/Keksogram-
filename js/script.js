// 17 Початок роботи (module1-task1)
// Структура кожного об'єкта має бути такою:
// id, число - ідентифікатор опису. Це число від 1 до 25. Ідентифікатори не повинні повторюватись.
// url, рядок - адреса картинки виду photos/{{i}}.jpg, де {{i}} - це число від 1 до 25. Адреси картинок не повинні повторюватися.
// description, рядок – опис фотографії. Опис вигадайте самостійно.
// likes, число – кількість лайків, поставлених фотографії. Випадкове число – від 15 до 200.

// import {descriotionsArr, comments, names} from "./data.js";
import {displayUsersPhotos} from "./displayPhoto.js";
import {fullSizeCreate} from "./full-size_photos.js";
import {hashtagsValidation, uploudForm, imgPreview} from "./validation.js";
import  {createEffectSlider, effectsList} from './efects-slider.js'
import { scalingImg, scaleValue} from "./scaling.js";
import { sendingForm } from "./form-sending.js";

async function getUsers(){
    try {
        const response = await fetch('http://localhost:8080/dataUsers')
        if(!response.ok) {
            throw new Error('Error server', response.status)
        }
        const usersArr = await response.json()

        return usersArr
    } catch (error) {
        console.log('error !!!', error)
        return 
    }
}

let usersArr = await getUsers()


//module1-task2

displayUsersPhotos(usersArr)

// //module1-task3

const bigPictureCancel= document.querySelector('.big-picture__cancel')
const bigPicture = document.querySelector('.big-picture') 
const pictureContainer = document.querySelectorAll('.picture')

pictureContainer.forEach(e=>{
    e.addEventListener('click', e =>{
        e.preventDefault()
        fullSizeCreate(e.target, bigPicture, usersArr)
    })
})


document.addEventListener('keydown', e => e.key == 'Escape' ? close(bigPicture) : null)
bigPictureCancel.addEventListener('click', e => close(bigPicture))
function close(element) {
    if (document.activeElement.tagName == "INPUT" || document.activeElement.tagName == "TEXTAREA") {
        return
    } else {
        element.classList.add('hidden')
        document.querySelector('body').classList.remove('modal-open')
        scaleValue.value = '100%'
        imgPreview.style = 0
    }
}

// // module1-task4

const hashtags = document.querySelector('.text__hashtags')
let hashtagsErr = 0

hashtags.addEventListener('input', () => hashtags.setCustomValidity(''))
hashtags.addEventListener('blur', ()=>{
    hashtagsErr = 0
    hashtagsErr = hashtagsValidation(hashtags.value, hashtags)  
})


// Close Form
document.addEventListener('keydown', e => e.key == 'Escape' ? close(uploudForm): null)
document.querySelector('.img-upload__cancel').addEventListener('click', e => close(uploudForm))

// module1-task5

effectsList.addEventListener('click', e=> {
    e.preventDefault()
    createEffectSlider(e)
})


// //  module1-task8

const smallerBtn = document.querySelector('.scale__control--smaller')
const biggerBtn = document.querySelector('.scale__control--bigger')
let scaleResult = 0 // data for add server 

const SCALE_RANG = {
    'step': 25,
    'min': 25,
    'max': 100,
}

smallerBtn.addEventListener('click', e=>{
    e.preventDefault()
    scaleResult = scalingImg(scaleValue.value.replace(/\D/g,""), SCALE_RANG, '-')
})
biggerBtn.addEventListener('click', e=>{
    e.preventDefault()
    scaleResult = scalingImg(scaleValue.value.replace(/\D/g,""), SCALE_RANG, '+')
})


// senden form 

const uplaudSubmit = document.querySelector('#upload-submit')

uplaudSubmit.addEventListener('click', e=> sendingForm(hashtagsErr, hashtags))


console.log(usersArr)