const { json } = require("stream/consumers")

const descriotionsArr = [
    'Ловлю момент тут і зараз',
    'Відчуваю магію миті',
    'Живу кольорами дня',
    'Трохи сонця всередині',
    'Де серце — там дім',
    'Мій маленький всесвіт',
    'Щастя в простих речах',
    'Атмосфера говорить сама',
    'Легкість у кожному русі',
    'День, створений для мрій',
]
const comments = [
    'Загалом все непогано. Але не всі.',
    'Коли ви робите фотографію, добре б прибирати палець із кадру. Зрештою, це просто непрофесійно.',
    'Моя бабуся випадково чхнула з фотоапаратом у руках і у неї вийшла фотографія краща.',
    'Я послизнувся на банановій шкірці і впустив фотоапарат на кота і у мене вийшла фотографія краще.',
    'Обличчя людей на фотці перекошені, ніби їх побивають. Як можна було зловити такий невдалий момент?',
]
const names = ['Марко', 'Софія', 'Даніель', 'Аліса', 'Тимофій', 'Мія', 'Назар', 'Емма', 'Артем', 'Ліна', 'Ілля', 'Вікторія', 'Олексій', 'Даша', 'Кирило']
let usersArr = []
function makeUsersArr(){
    const ID_RANGE ={
        min: 1, max: 25
    }
    for (let i= ID_RANGE.min; i <=ID_RANGE.max; i++) {
        const LIKES_RANGE ={
            min: 15, max: 200,
        }
        let rand = getRandom(descriotionsArr.length)
        let likes = getRandom(LIKES_RANGE.max, LIKES_RANGE.min)

        let userObj = {
            'id': i, 'url': `photos/${i}.jpg`, 'description': descriotionsArr[rand], 'likes' : likes, 'comments' : makeCommentsArr(),
        }
        usersArr.push(userObj)
    }
    return usersArr
}

function makeCommentsArr(){
    let commentsArr = []
    let rand = getRandom(15)

    let arrId = []
    let uniqueId =[]
    for( let i=0; i<100; i++){
        let idRand = getRandom(200,1)
        arrId.push(idRand)
        uniqueId = [...new Set(arrId)];
        if(uniqueId.length == 15) break
    }
    for(let i=0; i<=rand; i++){
        let comment = {
            'id': uniqueId[i], 
            'avatar' : `img/avatar-${getRandom(6,1)}.svg`,
            'message' : comments[getRandom(comments.length)],
            'name' : names[getRandom(names.length)],
        }
        commentsArr.push(comment)
    }
    return commentsArr
}
function getRandom(max, min){
    return min ? Math.floor(Math.random() * (max - min + 1)) + min : Math.floor(Math.random() * max)
}

let dataArr= makeUsersArr()


async function sendData(){
    try{
        const response = await fetch('http://localhost:8080', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataArr)
        })
        
        const result = await response.json()
        
    } catch (error) {
        console.log('Error:', error)
    }
}
sendData()
