// 17 Початок роботи (module1-task1)
// Структура кожного об'єкта має бути такою:
// id, число - ідентифікатор опису. Це число від 1 до 25. Ідентифікатори не повинні повторюватись.
// url, рядок - адреса картинки виду photos/{{i}}.jpg, де {{i}} - це число від 1 до 25. Адреси картинок не повинні повторюватися.
// description, рядок – опис фотографії. Опис вигадайте самостійно.
// likes, число – кількість лайків, поставлених фотографії. Випадкове число – від 15 до 200.

// import {descriotionsArr, comments, names} from "./data.js";
import {displayUsersPhotos} from "./displayPhoto.js";
import {fullSizeCreate} from "./full-size_photos.js";
import {hashtagsValidation, uploudForm} from "./validation.js";
import  {createEffectSlider, effectsList} from './efects-slider.js'
import { scalingImg, SIZE_RANG, scaleValue} from "./scaling.js";

// let usersArr = []
// function makeUsersArr(){
//     const ID_RANGE ={
//         min: 1, max: 25
//     }
//     for (let i= ID_RANGE.min; i <=ID_RANGE.max; i++) {
//         const LIKES_RANGE ={
//             min: 15, max: 200,
//         }
//         let rand = getRandom(descriotionsArr.length)
//         let likes = getRandom(LIKES_RANGE.max, LIKES_RANGE.min)

//         let userObj = {
//             'id': i, 'url': `photos/${i}.jpg`, 'description': descriotionsArr[rand], 'likes' : likes, 'comments' : makeCommentsArr(),
//         }
//         usersArr.push(userObj)
//     }
// }

// function makeCommentsArr(){
//     let commentsArr = []
//     let rand = getRandom(15)

//     let arrId = []
//     let uniqueId =[]
//     for( let i=0; i<100; i++){
//         let idRand = getRandom(200,1)
//         arrId.push(idRand)
//         uniqueId = [...new Set(arrId)];
//         if(uniqueId.length == 15) break
//     }
//     for(let i=0; i<=rand; i++){
//         let comment = {
//             'id': uniqueId[i], 
//             'avatar' : `img/avatar-${getRandom(6,1)}.svg`,
//             'message' : comments[getRandom(comments.length)],
//             'name' : names[getRandom(names.length)],
//         }
//         commentsArr.push(comment)
//     }
//     return commentsArr
// }
// function getRandom(max, min){
//     return min ? Math.floor(Math.random() * (max - min + 1)) + min : Math.floor(Math.random() * max)
// }

// makeUsersArr()

async function getUsers(){
    try {
        const response = await fetch('http://localhost:8080')
        if(!response.ok) {
            throw new Error('Error server', response.status)
        }
        const usersArr = await response.json()
        // console.log(usersArr)
        return usersArr
    } catch (error) {
        console.log('error !!!', error)
        return 
    }
}

let usersArr = await getUsers()


//module1-task2

displayUsersPhotos(usersArr)

//module1-task3

const bigPictureCancel= document.querySelector('.big-picture__cancel')
const bigPicture = document.querySelector('.big-picture') 
const pictureContainer = document.querySelector('.pictures')

pictureContainer.addEventListener('click', e =>{
    e.preventDefault()
    fullSizeCreate(e.target, bigPicture, usersArr)
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
    }
}

// module1-task4

const uplaudSubmit = document.querySelector('#upload-submit')

uplaudSubmit.addEventListener('click', e=>{
    e.preventDefault()

    let hashtags = document.querySelector('.text__hashtags')
    
    // hashtags validation
    hashtagsValidation(hashtags.value, hashtags)    
})

// Close Form
document.addEventListener('keydown', e => e.key == 'Escape' ? close(uploudForm): null)
document.querySelector('.img-upload__cancel').addEventListener('click', e => close(uploudForm))

// module1-task5

effectsList.addEventListener('click', e=> {
    e.preventDefault()
    createEffectSlider(e)
})


//  module1-task8

// uploudForm.classList.remove('hidden')

const smallerBtn = document.querySelector('.scale__control--smaller')
const biggerBtn = document.querySelector('.scale__control--bigger')

smallerBtn.addEventListener('click', e=>{
    e.preventDefault()
    scalingImg(scaleValue.value.replace(/\D/g,""), SIZE_RANG, '-')
})
biggerBtn.addEventListener('click', e=>{
    e.preventDefault()
    scalingImg(scaleValue.value.replace(/\D/g,""), SIZE_RANG, '+')
})
// const uploudForm = document.querySelector('.img-upload__overlay')



