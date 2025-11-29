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


function fullSizeCreate(target, element, arr){
    if(target.classList == 'picture__img'){
        let indexArr = target.id.split('')
        let arrElementTarget = arr[indexArr[indexArr.length-1]]
        document.querySelector('.social__comment-count').classList.add('hidden')
        document.querySelector('body').classList.add('modal-open')
        element.classList.remove('hidden')

        element.querySelector('.big-picture__img img').src= arrElementTarget.url
        element.querySelector('.likes-count').textContent = arrElementTarget.likes
        element.querySelector('.comments-count').textContent = arrElementTarget.comments.length
        element.querySelector('.social__caption').textContent = arrElementTarget.description

        createCommentsPrewue(arrElementTarget.comments)
    }
}
function createCommentsPrewue(arr){
    const socialComments = document.querySelector('.social__comments')
    socialComments.innerHTML =''
    
    arr.forEach(e=>{
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

// Close

export {fullSizeCreate}