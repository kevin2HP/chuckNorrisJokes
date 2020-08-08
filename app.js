const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/',function (req,res) {
    res.sendFile(__dirname+"/index.html");
  })

app.post('/',function (req,res) {
    console.log('post recieved');
    category= req.body.a;
    const url ='https://api.chucknorris.io/jokes/random?category='+category;
    console.log(category);

    https.get(url,function(response){
        
        console.log(response.statusCode);
        response.on('data',function (data) {
            console.log(data);
            
            const jokeData = JSON.parse(data);
            console.log(jokeData);
            actualJoke = jokeData.value;
            dateMade =jokeData.created_at;
            console.log(actualJoke,dateMade);
            res.write(actualJoke);
            res.write(dateMade);
            res.send();
            

          })
        
    })
  })



app.listen(3000,function () {
    console.log('Server started on port 3000');
    
  })
