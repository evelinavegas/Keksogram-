// module1-task3'
// Реалізувати сценарій перегляду фотографій у повнорозмірному режимі.
// У такому режимі користувач отримує кілька додаткових можливостей: 
// детально розглянути зображення, поставити лайк, почитати коментарі, 
// залишені іншими користувачами.
// Заведіть модуль, який буде відповідати за відображення вікна з 
// повнорозмірним зображенням.
// Для відображення вікна потрібно видаляти клас hidden у 
// елемента .big-picture і щоразу заповнювати його даними 
// про конкретну фотографію:
// Адреса url підставте як src зображення всередині блоку 
// .big-picture__img.
// Кількість лайків likes підставте як текстовий зміст елемента .likes-count.
// Кількість коментарів comments підставте як текстовий зміст елемента 
// .comments-count.
// Список коментарів під фотографією: коментарі повинні вставлятися до 
// блоку .social__comments. Розмітка кожного коментаря має виглядати 
// так:

// <li class="social__comment">
//    <img
//      class="social__picture"
//      src="{{аватар}}"
//      alt="{{ім'я коментатора}}"
//      width="35" height="35">
//    <p class="social__text">{{текст коментаря}}</p>
// </li>

// Опис фотографії description вставте рядком у блок .social__caption.
// Після відкриття вікна сховайте блоки лічильника коментарів.
// Після відкриття вікна додайте тегу <body> клас modal-open, 
// щоб контейнер із фотографіями позаду не прокручувався при скролі. 
// При закритті вікна не забудьте видалити цей клас.
// Напишіть код для закриття вікна, натиснувши клавішу Esc 
// та клацнувши на значок закриття.
// Підключіть модуль до проекту.

const commentsLoaderBtn = document.querySelector('.comments-loader')

function fullSizeCreate(target, element, arr){
    commentsLoaderBtn.classList.remove('hidden')
    if(target.classList == 'picture__img'){
        let count = 5
        let indexArr =target.id.replace(/\D/g,"")
        let arrElementTarget = arr[indexArr]
        const commentsLenght = arrElementTarget.comments.length

        document.querySelector('body').classList.add('modal-open')
        element.classList.remove('hidden')

        element.querySelector('.big-picture__img img').src= arrElementTarget.url
        
        element.querySelector('.likes-count').textContent = arrElementTarget.likes
        element.querySelector('.social__caption').textContent = arrElementTarget.description
        
        if(commentsLenght > 5){
            element.querySelector('.social__comment-count').textContent = `${count} з ${commentsLenght}` 
        }else{
            element.querySelector('.social__comment-count').classList.add('hidden')
            commentsLoaderBtn.classList.add('hidden')
        } 

        createCommentsPrewue(arrElementTarget.comments, count)
        commentsLoaderBtn.addEventListener('click', e=> {
            e.preventDefault()
            count = openComments(arrElementTarget.comments, count, commentsLoaderBtn)
            element.querySelector('.social__comment-count').textContent = `${count} з ${commentsLenght}` 

            createCommentsPrewue(arrElementTarget.comments, count)
        })
    }
}
function createCommentsPrewue(arr, count){
    const socialComments = document.querySelector('.social__comments')
    socialComments.innerHTML =''
    let comments = arr.slice(0, count)
    comments.forEach(e=>{
        let li = document.createElement('li')
        li.classList = 'social__comment'
        li.innerHTML = `
        <img
        class="social__picture"
        src="${e.avatar}"
        alt="${e.name}"
        width="35" height="35">
        <p class="social__text">${e.message}</p> `
        socialComments.appendChild(li)
    })
}

function openComments(arr, count, btn){
    if(arr.length >= count + 5){
        count+=5 
    } else {
        count = arr.length
        btn.classList.add('hidden')
    }
    return count
}
export {fullSizeCreate}