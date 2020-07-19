
const notice_home=document.getElementById('notice-home')
var html='<h3>Notice Board</h3>'
axios.get('/noticedata')
.then((res)=>{
    console.log(res)
    var i
    for (i = res.data.length-1; (i > res.data.length-6)&&(i>-1); i--) {
    html+=`<a href='notice/${res.data[i]._id}' ><li>`+res.data[i].front+'<a>'
}

 notice_home.innerHTML = html

}).catch((e)=>{
    console.log(e)
})


