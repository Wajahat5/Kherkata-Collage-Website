const back=document.querySelector('#back')
const front=document.querySelector('#front')
const result=document.querySelector('#result')
const inputForm=document.querySelector('#form2')
const removeForm=document.querySelector('#form3')
var upld=new FormData()
const notice_all=document.getElementById('all-notice')
const idNotice=document.querySelector('#idNotice')
var html=''
axios.get('/noticedata')
.then((res)=>{
    console.log(res)
    var i
    for (i = res.data.length-1; i > -1; i--) {
    html+=`<a href='notice/${res.data[i]._id}'><br>`+res.data[i].front+`</a> |  id: ${res.data[i]._id}`
}
 notice_all.innerHTML = html

}).catch((e)=>{
    console.log(e)
})
inputForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    upld.append('back',back.files[0])

    axios.post('/notice',{front: front.value})
    .then((res)=>{
        
        axios.post(`notice/${res.data._id}`,upld,{
            headers: {
                'Content-Type': 'multipart/form-data'
              }
        })
        result.textContent="successfully added"
    })
    .catch((e)=>{
        result.textContent="an error occured"
        
        
    })
})

removeForm.addEventListener('submit',(e)=>{
    //e.preventDefault()
    axios.delete(`/notice/${idNotice.value}`)
    .then((res)=>{
        
        result.textContent="successfully removed"
        console.log("successfully removed")
    })
    .catch((e)=>{
        result.textContent="an error occured"
        console.log(e)
        
    })
})


