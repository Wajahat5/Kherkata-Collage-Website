const result=document.getElementById('result')
const searchForm=document.querySelector('#form')
const candidate_id=document.querySelector('#candidate-id')
const image=document.getElementById('marksheet')
searchForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    axios.get(`/candidate/${candidate_id.value}`)
.then((res)=>{
    html=`name=${res.data.name}<br>roll=${res.data.roll}<br>no=${res.data.no}<br>eng=${res.data.eng}<br>sci=${res.data.sci}<br>math=${res.data.math}<br>sst=${res.data.sst}<br>mil=${res.data.mil}<br>elective=${res.data.elective}<br>`
    result.innerHTML = html
    image.innerHTML=`<img src="/candidate/marksheet/${candidate_id.value}" width="500" height="600">`
}).catch((e)=>{
    console.log(e)
})
})