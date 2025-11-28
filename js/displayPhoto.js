// module1-task2
// Відобразити фотографії інших користувачів.
// Заведіть модуль, який відповідатиме за малювання мініатюр.
// На основі тимчасових даних для розробки та шаблону #picture створіть DOM-елементи, 
// що відповідають фотографіям, та заповніть їх даними:
// Адреса url підставте як src зображення.
// Кількість лайків likes підставте як текстове зміст елемента .picture__likes.
// Кількість коментарів comments підставте як текстовий зміст елемента .picture__comments.
// Малюйте згенеровані DOM-елементи в блок .pictures. Щоб вставити елементи,
// використовуйте DocumentFragment.
// Підключіть модуль до проекту.

// const pictureContainer = document.querySelector('.pictures')
const picture = document.querySelector('#picture')
const pictureContainer = document.querySelector('.pictures')

const fragment =new DocumentFragment()

function displayUsersPhotos (arr) {
    arr.forEach(e=>{
        const cloneElement = picture.content.cloneNode(true);
    
        cloneElement.querySelector('.picture__img').src = e.url
        cloneElement.querySelector('.picture__img').id = `picture-${arr.indexOf(e)}`
        cloneElement.querySelector('.picture__likes').textContent = e.likes
        cloneElement.querySelector('.picture__comments').textContent = e.comments.length
        fragment.appendChild(cloneElement)
    })
    pictureContainer.appendChild(fragment)

}


export {displayUsersPhotos}