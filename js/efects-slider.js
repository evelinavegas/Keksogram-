// На зображення може накладатися лише один ефект.
// При зміні ефекту, вибором одного зі значень серед радіокнопок .effects__radio, 
// додати картинці всередині .img-upload__preview CSS-клас, що відповідає ефекту. 
// Наприклад, якщо вибрано ефект .effect-chrome, зображенню потрібно додати клас 
// effects__preview - chrome.

const effects = document.querySelectorAll('.effects__radio')
const effectsSpan = document.querySelectorAll('.effects__preview')
const effectsList = document.querySelector('.effects__list')
const slider = document.querySelector('.effect-level')
const imgPreview = document.querySelector('.img-upload__preview img')

effectsSpan.forEach((el, index) =>{
    el.dataset.uid = `${effects[index].value}`
})

noUiSlider.create(slider,{
    start: [0],
    content:true,
    range: {min:0, max:1, },
    tooltips: true
})

const efectsDataArr = {
    chrome : { min: 0, max: 1, step: 0.1, filter: 'grayscale'},
    sepia: { min: 0, max: 1, step: 0.1, filter: 'sepia'},
    marvin: { min: 0, max: 100, step: 1, filter: 'invert'},
    phobos: { min: 0, max: 3, step: 0.1, filter: 'blur'},
    heat: { min: 1, max: 3, step: 0.1, filter: 'brightness'},
}

function createEffectSlider(e){
    imgPreview.style.filter = 'none'

    effectsSpan.forEach(el=>{
        e.target== el ? el.classList.add('effect-checked') : el.classList.remove('effect-checked')
    })
    
    let targetEffect = e.target.dataset.uid
    let targetData = efectsDataArr[targetEffect]

    targetEffect !== 'none' ?  createEffect( targetData.min, targetData.max, targetData.step, targetData.filter ) : slider.classList.add('hidden')
}

function createEffect(minCount, maxCount, chengStep, filter){
    slider.classList.remove('hidden')

    slider.noUiSlider.set(0)
    slider.noUiSlider.updateOptions({
        range:{min: minCount, max: maxCount},
        step:chengStep,
        start:minCount
    })
  
    filter =='invert' ? slider.noUiSlider.on('change', values => imgPreview.style.filter = `${filter}(${values}%)`) : slider.noUiSlider.on('change', values => imgPreview.style.filter = `${filter}(${values})`)
}

export{createEffectSlider, effectsList, slider}