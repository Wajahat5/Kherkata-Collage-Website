const eng=document.querySelector('#eng')
const name=document.querySelector('#name')
const roll=document.querySelector('#roll')
const no=document.querySelector('#no')
const sci=document.querySelector('#sci')
const math=document.querySelector('#math')
const sst=document.querySelector('#sst')
const mil=document.querySelector('#mil')
const elective=document.querySelector('#elective')
const  admissionForm=document.querySelector('#form')
const  sheet=document.querySelector('#sheet')
const message=document.querySelector('#admission-confermation')


var marks={
     eng:0,
     sci:0,
    math:0,
    sst:0,
    mil:0,
    elective:0,
    
}
var upld=new FormData()
admissionForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    
    upld.append('marksheet',sheet.files[0])
    marks={
        name:name.value,
        roll:roll.value,
        no:no.value,
        eng:eng.value,
        sci:sci.value,
        math:math.value,
        sst:sst.value,
        mil:mil.value,
        elective:elective.value,
       marsksheet:sheet.files[0]
    }
    console.log(marks)
    if(sheet.files[0].size>300000){
        return message.textContent='File size should be below 3kb'
    }
    axios.post('/candidate', marks)
    .then((res)=>{
        
        
        axios.post(`candidate/${res.data._id}`,upld,{
            headers: {
                'Content-Type': 'multipart/form-data'
              }
        })
        message.textContent=`${res.data._id}  please note this code. you will require it at the time of admission`
    })
    .catch((e)=>{
        message.textContent=`An error occured`
        console.log(e)
        
        
    })
})
