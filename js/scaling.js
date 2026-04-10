let scaleValue = document.querySelector('.scale__control--value')

const SIZE_RANG = {
    'step': 25,
    'min': 25,
    'max': 100,
}
function scalingImg(valueAk, obj, operation){
    if(operation==='+' && valueAk <100){
        scaleValue.value = `${+valueAk + obj.step}%`
    } else if(operation==='-' && valueAk >25){
        scaleValue.value = `${+valueAk - obj.step}%`
    }
}

export { scalingImg,  SIZE_RANG, scaleValue}