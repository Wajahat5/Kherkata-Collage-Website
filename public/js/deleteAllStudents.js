const deleteForm=document.querySelector('#form3')
deleteForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    axios.delete(`/deleteAllStudents`)
    .then((res)=>{
        
        result.textContent="successfully deleted"
        console.log("successfully deleted")
    })
    .catch((e)=>{
        result.textContent="an error occured"
        console.log(e)
        
    })
})