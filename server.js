const express = require('express');
const bodyParser = require('body-parser');  // Correct the typo: "bodyparser" -> "bodyParser"
const app = express();
const jwt = require('jsonwebtoken');
app.use(bodyParser.json());  // For parsing application/json
app.use(bodyParser.urlencoded({ extended: false }));

const users = require('./user.json');
const cars = require('./cors.json');




app.post('/login',(req,res)=>{
    const user = users.find((use)=>use.username === req.body.username);
    console.log("username",user.username);
    if(user){
        console.log(user.id);
        if(user.password === req.body.password)
        {
           const token = jwt.sign({userID:user.id},"wdfdfwdjdjwedmlwedlwdkmlwdmijdq2p3wje8230r02rj2 rp243'r9i249t-4v rtt9t4ttt");  //create the jwt 
           res.status(200).send({token:token});
        }
        else{
            res.status(401).send({message:"access denieed"});
        }
    }
    else{
        res.status(401).send({message:"access denieed"});
    }
});


app.get('/',(req,res)=>{
    res.send("hello elangkumaran");
});


const checktoken =(req,res,next)=>{
    const token = req.headers["authorization"];
    //console.log(token);
    if(token){
        jwt.verify(token,"wdfdfwdjdjwedmlwedlwdkmlwdmijdq2p3wje8230r02rj2 rp243'r9i249t-4v rtt9t4ttt",(err,decoded)=>{  
           if(err)
            {
                res.status(401).send({meaasge:"first access denied in verfi"})
                 return;//stop the page
                
            } 
            else{
               // console.log("decode ",decoded);
                req.userID = decoded.userID

                next();

            }
           
        })
    }
    else{
        res.status(401).send({meaasge:" secound access denied in verfi"});
    }
}

app.get("/data",checktoken, (req,res)=>{
    //checktoken();

 console.log("get method",req.userID);
const filtered = cars.filter((car) => car.userId === req.userID);
console.log(filtered);
res.status(200).send({data : filtered});
})

const port =4000;

app.listen(port,()=>{
    console.log(`port run server in ${port}`);
})
