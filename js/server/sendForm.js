
function formSubmit(urlValue, hashtagsValue, descriptionValue, filterValue, scaleVal ){
    let obj = {}
   
    obj.id = 0;
    obj.url = `${urlValue}`;
    obj.description = `${descriptionValue}`;
    obj.likes = 0;
    obj.comments = [];
    obj.filter = `${filterValue}`;;
    obj.scaleVal = `${scaleVal}`;
    obj.hashtagsValue = `${hashtagsValue}`;

    sendForm(obj)
}

async function sendForm(obj){
    try{
        const response = await fetch('http://localhost:8080/gram', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        })
    } catch (error) {
        console.log('Error:', error)
    }
}
 
export {formSubmit}