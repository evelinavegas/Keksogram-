const scaleValue = document.querySelector('.scale__control--value')
const imgUpload = document.querySelector('.img-upload__preview img')

const SIZE_RANG = {
    'step': 25,
    'min': 25,
    'max': 100,
}
function scalingImg(valueAk, obj, operation){
    let result = 0 // data for add server 
    if(operation==='+' && valueAk <=75){
        result= +valueAk + obj.step
        scaleValue.value = `${result}%`
        console.log(operation, result)
        imgUpload.style.transform = result !== 100 ? `scale(0.${result})`: `scale(1)`
    } else if(operation==='-' && valueAk > 25){
        result = +valueAk - obj.step
        scaleValue.value = `${result}%`
        console.log(result)
        imgUpload.style.transform = `scale(0.${result})`
    } 
    return result
}
// transform: scale(0.75).

export { scalingImg,  SIZE_RANG, scaleValue}