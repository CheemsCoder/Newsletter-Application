const express= require("express")
const bodyParser = require("body-parser")
const request = require("request")

const app= express()
app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended:true}))

app.get("/", (req,res)=>{
  res.sendFile(__dirname+"/signup.html")
})

app.post("/", (req,res)=>{
  const firstName=req.body.fname
  const lastName= req.body.lname
  const email=req.body.email

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  }

  const jsonData= JSON.stringify(data)

  const options = {
    url:'https://us1.api.mailchimp.com/3.0/lists/9c817a4256',
    method: "POST",
    headers: {
      "Authorization": "dutta1 d50843a8002ee439640b48aafaf50341-us1"
    },
    body: jsonData
  }
  request(options, (error,response,body)=>{
    if(error) {
      res.sendFile(__dirname+"/failure.html")
    } else {
      if(response.statusCode===200) {
        res.sendFile(__dirname+"/sucess.html")
      }
      else {
        res.sendFile(__dirname+"/failure.html")
      }
    }
  })


})

app.post("/failure",(req,res)=>{
  res.redirect("/")
})


app.listen(process.env.PORT || 3000, ()=>{
  console.log("server is running o port 3000")
})


// API Key
// d50843a8002ee439640b48aafaf50341-us1
// List Id
// 9c817a4256
