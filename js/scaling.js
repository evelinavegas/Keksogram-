const scaleValue = document.querySelector('.scale__control--value')
const imgUpload = document.querySelector('.img-upload__preview img')

function scalingImg(valueAk, obj, operation){
    let result = 0 // data for add server 
    if(operation==='+' && valueAk < obj.max){
        result= +valueAk + obj.step
        scaleValue.value = `${result}%`
        imgUpload.style.transform = result !== 100 ? `scale(0.${result})`: `scale(1)`
    } else if(operation==='-' && valueAk > obj.min){
        result = +valueAk - obj.step
        scaleValue.value = `${result}%`
        imgUpload.style.transform = `scale(0.${result})`
    } 
    return result
}

export { scalingImg, scaleValue}