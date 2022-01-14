const cors = require('cors')
const mysql = require('mysql')

console.log("Running");
const express = require('express');
// const mongoose = require('mongoose')

const app = express();
app.use(cors())
app.options('Access-Control-Allow-*', cors());
const bodyparser = require('body-parser')


require('dotenv/config')


// app.get('/', (req, res) => {

//     res.send('We are on home');

// }) 

let stock = [{
    skuID: 1,
    skuName: "Trifle",
    skuOHQ: 7,
    skuPrice: 3.5,
    skuDesc: "Naught but a Trifle.",
  },

  {
    skuID: 2,
    skuName: "Cake",
    skuOHQ: 5,
    skuPrice: 2,
    skuDesc: "It's a lie.",
  },
  {
    skuID: 3,
    skuName: "Pie",
    skuOHQ: 8,
    skuPrice: 3,
    skuDesc: "In the sky.",
  },]

app.get('/stock', (req, res) => {

res.send(stock);

})

app.get('/stock/update/:id/:op/:amount/', (req, res) => {

        let index = stock.findIndex(x => x.skuID === parseInt(req.params.id));
        console.log(index)
        let oper = req.params.op.toString();
        switch(oper){

            case "minus":
                stock[index].skuOHQ--;
                console.log(stock[index]);
                break;

            case "add":
                stock[index].skuOHQ++;
                console.log(stock[index]);
                break;

            default: 
            console.log("Hit default");
            break;

        }

        res.send("updated")
        

})

app.get('/sum', (req, res) => {

    res.send('We are on sum');

})

app.get('/sum/:num1/:num2/',
    (req, res) => {

        const num1 = parseInt(req.params.num1);
        const num2 = parseInt(req.params.num2);

        let data = num1 + num2;

        res.send(data.toString());

    })

app.get('/sub/:num1/:num2/',
    (req, res) => {

        const num1 = parseInt(req.params.num1);
        const num2 = parseInt(req.params.num2);

        let data = num1 - num2;

        res.send(data.toString());

    })

app.get('/div/:num1/:num2/',
    (req, res) => {

        const num1 = parseInt(req.params.num1);
        const num2 = parseInt(req.params.num2);

        let data = num1 / num2;

        res.send(data.toString());

    })


app.get('/mul/:num1/:num2/',
    (req, res) => {

        const num1 = parseInt(req.params.num1);
        const num2 = parseInt(req.params.num2);

        let data = num1 * num2;

        res.send(data.toString());

    })

    app.get('/per/:num1/:num2/',
    (req, res) => {

        const num1 = parseInt(req.params.num1);
        const num2 = parseInt(req.params.num2);

        let data = num1 * num2/100;

        res.send(data.toString());

    })



app.listen(5000);