const uploudFileBtn = document.querySelector('.img-upload__label')
const uploudForm = document.querySelector('.img-upload__overlay')

uploudFileBtn.addEventListener('click', e=>{
    e.preventDefault()
    uploudForm.classList.remove('hidden')
    document.querySelector('body').classList.add('modal-open')
    // slider.classList.add('hidden') --noUiSlider
})

// хеш-тег починається із символу # (решітка);
// рядок після ґрат має складатися з літер і чисел і не може містити прогалини, 
// спецсимволи (#, @, $ і т. п.), символи пунктуації (тире, дефіс, кома тощо), емодзі і т.д. ;
// хеш-тег не може складатися тільки з одного ґрат;
// максимальна довжина одного хеш-тегу 20 символів, включаючи ґрати;
// хеш-теги нечутливі до регістру: # Хеш Тег і # Хештег вважаються одним і тим же тегом;
// хеш-теги розділяються пробілами;
// один і той же хеш-тег не може бути використаний двічі;
// не можна вказати більше п'яти хеш-тегів;
// хеш-теги необов'язкові;
// якщо фокус знаходиться в полі введення хеш-тегу/коментаря, натискання Esc не повинно призводити 
// до закриття форми редагування зображення.
// Повідомлення про неправильний формат хештегу задаються за допомогою методу 
// setCustomValidity у відповідного поля.

function hashtagsValidation (value, input){
    let arr = value.split(' ').map(i => i.toLowerCase()).filter( it => it.trim() !== '')
    let err = 0
    let uniqueArr = [...new Set(arr)]

    uniqueArr.forEach(e => { 
        let hashtagArr = e.split('')
        if(hashtagArr[0] !== '#'){
            err = 'does not start with #';
        } else if(/^[a-zA-z0-9]+$/.test(e.slice(1)) === false){
            err = 'only letters and numbers';
        } else if(uniqueArr.length == 1 || uniqueArr.length > 5){
            err = uniqueArr.length == 1 ? 'at least 1 #' : 'no more 5 #'
        } else if(hashtagArr.length >20){
            err = 'no more 20 symbols'
        } else if(arr.length > uniqueArr.length){
            err = 'unique # only'
        }
        err !== 0 ? input.setCustomValidity(err) : 0
        input.reportValidity()
    })
}

export {hashtagsValidation, uploudForm}