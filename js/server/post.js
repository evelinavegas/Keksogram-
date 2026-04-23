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
const hashtagsArr = ['#sunsetvibes', '#dailyinspo','#urbanexplorer','#mindfulmoments', '#techlife', '#creativeflow', '#weekendmood', '#natureescape', '#foodlover', '#goodtimesahead', '#simplepleasures', '#dreambigdaily', '#travelstories', '#staycurious', '#digitalworld', '#happyplace', '#livelifefully', '#cozycorner', '#newadventures', '#photodaily',]

let usersArr = []
function makeUsersArr(){
    const ID_RANGE ={
        min: 1, max: 25
    }
    for (let i= ID_RANGE.min; i <=ID_RANGE.max; i++) {
        const LIKES_RANGE ={
            min: 15, max: 2000,
        }
        let rand = getRandom(descriotionsArr.length)
        let likes = getRandom(LIKES_RANGE.max, LIKES_RANGE.min)

        let userObj = {
            'id': i, 'url': `photos/${i}.jpg`, 'description': descriotionsArr[rand], 'likes' : likes, 'comments' : makeCommentsArr(), 'hashtags': makeHashtagsarr(),
        }
        usersArr.push(userObj)
    }
    return usersArr
}

function makeHashtagsarr(){
    let arr = []
    for(let i=0; i<getRandom(5); i++){
        arr.push(hashtagsArr[getRandom(10)])
    }
    let uniqueArr=[...new Set(arr)]
    return uniqueArr.length<=5 ? uniqueArr : uniqueArr.slice(0, 5)
    
}

function makeCommentsArr(){
    let commentsArr = []
    let rand = getRandom(50)

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
        const response = await fetch('http://localhost:8080/dataUsers', {
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
