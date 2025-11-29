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
export {fullSizeCreate}