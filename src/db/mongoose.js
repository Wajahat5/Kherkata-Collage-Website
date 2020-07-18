const mongoose=require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/students',{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology: true
})

const candidate=mongoose.model('candidate',{
    name:{
        type:String
    },
    roll:{
        type:Number
    },
    No:{
        type:Number
    }
})
const a=new candidate({
    name:'a',
    roll:2,
    no:3
})
const b=new candidate({
    name:'b',
    roll:3,
    no:4
})
a.save().then(()=>{
    console.log(a)
}).catch((e)=>{
    console.log(e)
})
b.save().then(()=>{
    console.log(b)
}).catch((e)=>{
    console.log(e)
})