const express=require('express')
const path=require('path')
const mongoose=require('mongoose')
const multer=require('multer')
mongoose.connect('mongodb+srv://Kherkata:Kherkata@123@cluster0.hdzhs.mongodb.net/test?retryWrites=true&w=majority',{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology: true
})
const app=express()
const port=process.env.PORT||3000
const publicDirPath=path.join(__dirname,'../public')
app.use(express.static(publicDirPath))
app.use(express.json())
const candidate=mongoose.model('candidate',{
    name:{type:String},
    roll:{type:String},
    no:{type:String},
    eng:{type:Number},
    sci:{type:Number},
    math:{type:Number},
    sst:{type:Number},
    mil:{type:Number},
    elective:{type:Number},
    marksheet:{type:Buffer}
})
const notice=mongoose.model('notice',{
    front:{type:String},
    back:{type:Buffer}
})

app.get('',(req,res)=>{
    res.render('notice',{})
})
app.get('/notice',(req,res)=>{
    res.render('notice',{})
})
const upload=multer({
    limits:{
        fileSize:2000
    }
})

app.post('/candidate',(req,res)=>{
    const stu=new candidate(req.body)
    stu.save().then(()=>{
        res.send(stu)
        console.log(stu)
    }).catch((e)=>{
        res.send(e)
    })
})
app.post('/candidate/:id',upload.single('marksheet'),async (req,res)=>{
    const _id=req.params.id
    const stu=await candidate.findById(_id)
    stu.marksheet=req.file.buffer
    stu.save().then(()=>{
        res.send(stu)
        console.log(stu)
    }).catch((e)=>{
        throw new Error()
    })
},(error,req,res,next)=>{
    res.status(400).send({error:error.message})
})
app.post('/notice',(req,res)=>{
    const ntc=new notice(req.body)
    ntc.save().then(()=>{
        res.send(ntc)
        console.log(ntc)
    }).catch((e)=>{
        res.send(e)
    })
})
app.post('/notice/:id',upload.single('back'),async (req,res)=>{
    const _id=req.params.id
    const ntc=await notice.findById(_id)
    ntc.back=req.file.buffer
    ntc.save().then(()=>{
        res.send(ntc)
     
    }).catch((e)=>{
        throw new Error()
    })
})
app.get('/notice/:id',async (req,res)=>{
    const ntc=await notice.findById(req.params.id)
    res.set('Content-Type',"application/pdf") 
    //res.set('Content-Type',"image") 
    res.send(ntc.back)
})
app.get('/noticedata',async (req,res)=>{
    const ntc=await notice.find({}) 
    //res.set('Content-Type',"image") 
    res.send(ntc)
})
app.get('/candidate/:id',async (req,res)=>{
    const stu=await candidate.findById(req.params.id)
    res.send(stu)
})
app.get('/candidate/marksheet/:id',async (req,res)=>{
    const stu=await candidate.findById(req.params.id)
    //res.set('Content-Type',"application/pdf") 
    res.set('Content-Type',"image") 
    res.send(stu.marksheet)
})

app.delete('/notice/:id',async (req,res)=>{
    console.log('remove')
    //notice.findByIdAndDelete(req.params.id)
    notice.deleteOne({ _id: req.params.id}, function (err) {
        if (err) return res.send(e);
        // deleted at most one tank document
      });
    res.send()
})
app.delete('/deleteAllStudents',async (req,res)=>{
    console.log('delete')
    
    candidate.deleteMany({}, function (err) {
        if (err) return res.send(e);
       
      });
    res.send()
})
app.listen(port,()=>{
    console.log('Server is up on port '+port)
})