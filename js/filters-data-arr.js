// 5.1. Доступні фільтри:

// «За замовчуванням» — фотографії спочатку з сервера;

// «Випадкові» — 10 випадкових фотографій, що не повторюються;

// «Обговорювані» — фотографії, відсортовані в порядку 
// зменшення кількості коментарів.

// 5.2. Блок, за допомогою якого виконується фільтрація 
// фотографій, спочатку прихований і показується тільки після закінчення завантаження всіх фотографій.

// 5.3. При перемиканні фільтрів, малювання зображень, 
// що підходять під новий фільтр, повинна проводитися не частіше 
// ніж один раз 500 мс (усунення брязкоту).
import { start, end } from "./displayPhoto.js"
import { displayUsersPhotos } from "./displayPhoto.js"

const postsFilters = document.querySelector('.img-filters')
const buttons = document.querySelectorAll('.img-filters__button')

postsFilters.classList.remove('img-filters--inactive')

function filtersPostCreate(e, users) {
    buttons.forEach(e =>e.classList.remove('img-filters__button--active'))
    e.target.classList.add('img-filters__button--active') 
    let target =e.target.id
    removeFragment() 

    setTimeout(()=>{
        switch (target) {
            case  'filter-default':
                displayUsersPhotos(usersArr)
                break;
            case 'filter-random':
                filteringRandom(users)
                break;
            case 'filter-discussed':
                filteringDiscussed(users) 
                break;
            default:
                break;
        }
    }, 1000)
}
function removeFragment() {
    let node = start.nextSibling;
    while (node && node !== end) {
        const next = node.nextSibling;
        node.remove()
        node = next
    }
    start.remove()
    end.remove()
}

function filteringRandom(users) {
    let arr =[]
    for(let i=0; i<30; i++){
        arr.push(Math.floor(Math.random() * users.length))
    }
    let arrUniques = [...new Set(arr)]
    arrUniques= arrUniques.slice(0 , 10)
    const randomArr =[]
    arrUniques.forEach(e=>{
        randomArr.push(users[e])
    })
    arrUniques.length === 10 ? displayUsersPhotos(randomArr) : filteringRandom()
}
function filteringDiscussed(users) {
    const sorterArr = [...users].sort((a, b)=> b.comments.length - a.comments.length)
    displayUsersPhotos(sorterArr)
}

export {filtersPostCreate}
