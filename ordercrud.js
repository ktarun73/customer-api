const express = require('express');
const bodyParser = require('body-parser');
const order = require('./models/order');
const customer = require('./models/customer');

const app = express();

const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/',async (req,res) =>{
    res.send("Hello World");
});

app.post('/add',async(req,res)=>{
    try{
        const name=req.body.name;
    const custId=req.body.custId;

    // console.log(id+name+custId);
    
    await order.create({productName:name , customerId:custId});
    res.json(
        {
            "status" : "successful"
        }
    );

    }catch(err){
        res.status(404);
        // console.log(err);
        const js={
            "error":"error occurred"
        }
        res.json(JSON.stringify(js));
    }
});


app.get('/getAllOrders',async(req,res)=>{
    const allOrders = await order.findAll();
    //also send customer details
    const custIds = [];
    for(let i=0;i<allOrders.length;i++){
        const customerIdAtIndex = allOrders[i]["customerId"];
        const customerDetails = await customer.findByPk(customerIdAtIndex);

        allOrders[i]["customerId"] = customerDetails;
    }
    res.json(allOrders);    
});


app.get('/customer/:id/orders',async(req,res)=>{
    try{
        const customerId = req.params.id;
    const custDetail = await customer.findByPk(customerId);
    
    if(!custDetail){
        res.status(404);
        res.json({
            "error" : "customer not found"
        });
    }else{
        const orders = await order.findAll({
            where: { customerId }
          });
          if(orders.length==0){
            res.json({
                "error":"No order found"
            });
          }else{
              res.json(orders);
          }
    }

    }catch{
        // console.log(err);
        const js={
            "error":"error occurred"
        }
        res.json(JSON.stringify(js));

    }
});

app.delete('/delete', async(req,res)=>{
    const id=req.body.id;
    const orderDetails = await order.findByPk(id);
    console.log(orderDetails);
    orderDetails.destroy();
    const obj = {
        status: id+" deleted"
    }
    res.json(JSON.stringify(obj));
});


app.listen(port,()=>{
    console.log("http://localhost:3000");
});

