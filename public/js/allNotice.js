const notice_all=document.getElementById('all-notice')
var html=''
axios.get('/noticedata')
.then((res)=>{
    console.log(res)
    var i
    for (i = res.data.length-1; i > -1; i--) {
    html+=`<a href='notice/${res.data[i]._id}'><li>`+res.data[i].front+'</a>'
}
 notice_all.innerHTML = html

}).catch((e)=>{
    console.log(e)
})
