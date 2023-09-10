const express = require('express');
const bodyParser = require('body-parser');
const customer = require('./models/customer');

const app = express();

const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/',(req , res)=>{
    res.send("Hello")
});

app.post('/customer',(req,res)=>{
    const name=req.body.name;
    const email=req.body.email;
    customer.create({name: name, email: email});
    res.json({
        "res":"success"
    });
});

//get app customers
app.get('/getAllCustomer',async (req,res)=>{
    const customers = await customer.findAll();
    res.send(customers);
});


// app.patch
// app.delete

app.delete('/deleteCustomer',async (req,res)=>{
    const id = req.body.id;
    const cust =await customer.findByPk(id);
    if(!cust){
        res.status(404);
        res.json(
            {
                "status" : "unsuccessful"
            }
        );
    }
    else{
        cust.destroy();
        res.json(
            {
                "status" : "successful"
            }
        );
    }
});

app.patch('/updateCustomer',async(req,res)=>{
    const id = req.body.id;
    const cust =await customer.findByPk(id);

    if(!cust){
        res.status(404);
        res.json(
            {
                "status":"customer not found"
            }
        );
    }
    else{
        cust.name=req.body.name;
        cust.email=req.body.email;
        await cust.save();
        res.json(
            {
                "status":"updated successful"
            }
        );
    }
});










app.listen(port,()=>{
    console.log(`Server is listening at http://localhost:${port}`);
});