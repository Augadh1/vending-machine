const express = require("express");
const mongoose = require('mongoose');
const cors = require('cors');
const server = express();
const Schema = mongoose.Schema;
const bodyParser = require("body-parser")
mongoose.connect('mongodb+srv://online-quiz:mongod-50593@online-quiz-w4l7z.mongodb.net', {useNewUrlParser: true,dbName:'vending_machine'}).then(() => {
    console.log("Connected to database!");
  })
  .catch((error) => {
    console.log("Connection failed!");
    console.log(error);
  });

  const vm_data = new Schema({
        date : {type:Date,required:true},
        item : {
            name: {type:String,required:true},
            quantity: {type:Number,required:true},
            price: {type:Number,required:true}
        },
        totalprice : {type:Number,required:true},
        uid : {type:String,required:true},
        status : {type:String,required:true,default:"paid"},
        code :{type:Number,required:true}

    //feedbacks: [{
    //    username: {type:String,required:true},
    //    comment: {type:String,required:true}
    //}]
})

const userSchema = new Schema({
    username: {type:String,required:true},
    uid : {type:String,required:true},
    age : {type:Number,required:true},
    mobileno : {type:String,required:true},
    email : {type:String,required:true}
})

const vm = new Schema({
    orderid: {type:String,required:true},
    code: {type:Number,required:true,default:0000},
    status: {type:String,required:true}
})

const Vm = mongoose.model("Vm",vm);

const User = mongoose.model("User",userSchema);

const feedbacksSchema = new Schema({
    uid: {type:String,required:true},
    username: {type:String,required:true},
    comment: {type:String,required:true}
})

const Order = mongoose.model('Order', vm_data);
const Feedback = mongoose.model('Feedback', feedbacksSchema);

server.use(express.static('build'));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));
server.use(cors());

server.post('/feedback',function(req,res){
    console.log(req.body)
    let feedback = new Feedback;
    feedback.uid = req.body.uid;
    feedback.username = req.body.username;
    feedback.comment = req.body.comment;
    feedback.save(function(err,doc){
        if(!err){
            res.json(doc)
        }
        else{
            console.log("adduser")
        }
    })
})

server.get('/feeds',function(req,res){
    Feedback.find({},function(err,docs){
        if(err){
            res.json(err)
        }
        else{
            console.log(docs)
            res.json(docs);
        }
    })
})

server.post('/addUser',function(req,res){
    console.log(req.body)
    let user = new User;
    user.username = req.body.username;
    user.uid = req.body.uid;
    user.age = req.body.age;
    user.mobileno = req.body.mobileno;
    user.email = req.body.email;
    console.log("addUser")
    user.save(function(err,doc){
        if(!err){
            res.json(doc)
        }
        else{
            console.log("adduser")
        }
    })
})

server.put('/user',function(req,res){
    console.log(req.body.uid)
    User.findOne({uid:req.body.uid},function(err,docs){
        if(err){
            console.log("some error occure")
            //res.json("something went wrong");
        }
        else{
            console.log(docs)
            res.json(docs);
        }
    })
})


server.put("/user/Edit",function(req,res){
    console.log(req.body)
    User.findByIdAndUpdate(req.body._id,{$set:{
        username:req.body.username,
        age : req.body.age,
        mobileno: req.body.mobileno
    }},{new:true},function(err,docs){
        if(err){
            res.json("Something went wrong");
        }
        else{
            res.json(docs);
        }
    }
    )
})

server.post('/vmmachine',function(req,res){
    console.log(req.body)
    let vmdata = new Vm;
    vmdata.orderid = req.body.orderid,
    vmdata.code = req.body.code,
    vmdata.status = req.body.status
    vmdata.save(function(err,doc){
        if(!err){
            res.json(doc)
        }
        else{
            console.log("adduser")
        }
    })
})

server.post('/serve',function(req,res){
    console.log(req.body)
    Vm.findOneAndUpdate({code:req.body.code},{$set:{
        status:"completed"
    }},{new:true},function(err,docs){
        if(err){
            res.json("Something went wrong");
        }
        else{
            let data = {}
            console.log(docs.status)
            if(docs.status == "completed"){
                data.avail = true;
            }
            res.json(data);
        }
    })
})

server.put('/pastorder',function(req,res){
    console.log(req.body)
    Order.find({uid:req.body.uid},function(err,docs){
        if(err){
            console.log(err)
            res.json("Something went wrong");
        }
        else{
            res.json(docs);
        }
    }
    )
})

server.post('/Order',function(req,res){
    console.log(req.body)
    let order = new Order;
    console.log(req.body.pastorder)
    order.date = req.body.pastorder.date;
    order.item = req.body.pastorder.item;
    order.totalprice = req.body.pastorder.totalprice;
    order.uid = req.body.pastorder.uid;
    order.code = req.body.pastorder.code;
    order.save(function(err,doc){
        if(err){
            //console.log(err)
          res.json("somthing wrong with input");
      }
        else{
          res.json(doc);
        }})
})

/*server.get('/new/:username/:comment',function(req,res){
    let feedback = new Feedback;
    feedback.username = req.params.username;
    feedback.comment = req.params.comment;
    console.log(req.params.username,req.params.comment)
    feedback.save(function(err,doc){
        if(err){
          res.json("somthing wrong with input");
      }
        else{
          res.json(doc);
        }})
})*/


server.get('/pastorder?:id',function(req,res){
    console.log(req.params.id)
    Order.find({uid:req.params.id},function(err,docs){
        if(err){
            res.json(err)
        }
        else{
            res.json(docs);
        }
    })
})


server.get('/sumary',function(req,res){
    Order.find({
        date : {
            $gt: '2019-12-01T00:00:00.000Z'
        }
    },function(err,docs){
        if(err){
            res.json(err)
        }
        else{
            console.log(docs.length)
            var i,sum=0,coffee=0,tea=0,water=0;
            for(i=0;i<docs.length;i++){
                sum = sum + docs[i].totalprice
                if(docs[i].item.name=="Coffee"){
                    coffee = coffee + docs[i].totalprice
                }
                if(docs[i].item.name=="Tea"){
                    tea = tea + docs[i].totalprice
                }
                if(docs[i].item.name=="Water"){
                    water = water + docs[i].totalprice
                }
            }
            console.log(sum)
            res.json({sum:sum,coffee:coffee,tea:tea,water:water});
        }
    })
})

server.get('/sumarydays',function(req,res){
    Order.find({
        date : {
            $gt: '2019-12-04T00:00:00.000Z'
        }
    },function(err,docs){
        if(err){
            res.json(err)
        }
        else{
            console.log(docs.length)
            var i,sum=0,coffee=0,tea=0,water=0;
            for(i=0;i<docs.length;i++){
                sum = sum + docs[i].totalprice
                if(docs[i].item.name=="Coffee"){
                    coffee = coffee + docs[i].totalprice
                }
                if(docs[i].item.name=="Tea"){
                    tea = tea + docs[i].totalprice
                }
                if(docs[i].item.name=="Water"){
                    water = water + docs[i].totalprice
                }
            }
            console.log(sum)
            res.json({sum:sum,coffee:coffee,tea:tea,water:water});
        }
    })
})

server.post('/payment' ,(req, res, next) =>{
    // const product={
    //     name:req.body.name,
    //     price:req.body.price
    // };
    // res.status(201).json({pk_test_D6pAJaZtZge3mjdv01Y6btQ100vVOe9FIz
    //     message:'helling post for product',
    //     createdProduct:product
    // });
 var status=false;
console.log("hello");
console.log(req.body.data);
const stripe = require("stripe")("sk_test_WflBW00YpPBYGH3TdU4RSalL00x8TNUzBp");
stripe.charges.create({
    amount: req.body.amount,
    currency: "in",
    source: req.body.data, // obtained with Stripe.js
    description: "Charge for jenny.rosen@example.com"
  }, function(err, charge) {
    // asynchronously called
    if(err)
    {
        console.log(err);
    }
    //console.log("hello1",charge.status,"bye1");

    /*if(charge.status=='succeeded'){
      var val = Math.floor(10000 + Math.random() * 90000);
      var obj={};
      obj['code']=val;
      console.log(val);
    }*/
    var val = Math.floor(10000 + Math.random() * 90000);
    var obj={};
      obj['code']=val;
    console.log("qwertyuioasdfghjkl");
    res.send(obj);
// if(status)

  });
  console.log("-------------------------------------------------");
  stripe.balance.retrieve(function(err, balance) {
   if(err)
   console.log(err);
   console.log("hello",balance,"qwerty");
  //  res.send("card authetication fail");

  });
});

const path = require("path")
server.get('*', function(req, res) {
    res.sendFile('index.html', {root: path.join(__dirname, './build/')});
  });

server.listen(process.env.PORT,function(){
    console.log("server started")
})

