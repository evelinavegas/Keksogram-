
import { errorMessageCreate } from "../form-sending.js"
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
        errorMessageCreate()
    }
}
 
export {sendForm}