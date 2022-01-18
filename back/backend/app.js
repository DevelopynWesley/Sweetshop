const cors = require('cors')

console.log("Running");
const express = require('express');

const app = express();
app.use(cors())
app.options('Access-Control-Allow-*', cors());
const bodyParser = require('body-parser')
app.use(bodyParser.json());
require('dotenv/config')


app.get('/', (req, res) => {

    res.send('This is the root.');

})

let stock = [
    {
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
    }
]

app.get('/stock', (req, res) => {

    try {
        res.send({ data: stock, message: "200 OK Stock Data Sent" });

    }
    catch (err) {
        res.status(400).send({
            message: 'Stock GET failed' + err.message
        });
    }

})


app.delete('/stock/delete/', (req, res) => {

    try {
        console.log(req.body);
        let item = req.body;
        console.log(item);
        let index = stock.findIndex(x => x.skuID == parseInt(item.skuID));
        if (index > -1) {
            deleted = stock.splice(index, 1);
            res.send("200 OK Stock Item Deleted\n" + item.id)
        }
        else { res.send({ data: null, message: "Could Not Delete." }) }
    }
    catch (err) {
        res.status(400).send({
            message: 'Delete failed: ' + err.message
        });
    }

})

app.post('/stock/add/', (req, res) => {

    let item = req.body;


    let ids = stock.map(object => {
        return object.skuID;
    });

    try {
        let newId = Math.max(...ids) + 1;

        stock.push({
            skuID: parseInt(newId),
            skuName: item.name,
            skuDesc: item.desc,
            skuOHQ: parseInt(item.ohq),
            skuPrice: parseFloat(item.price)

        })

        res.send({ data: this.stock, message: "200 OK Stock Item added." })
    }

    catch (err) {
        res.status(400).send({
            message: 'Add failed: ' + err.message
        });
    }


})

app.put('/stock/update/', (req, res) => {

    let id = req.body.skuID;
    console.log(id);
    try {
        let index = stock.findIndex(x => x.skuID === parseInt(id));

        let oper = req.body.oper.toString();//req.body.oper.toString();
        let amount = parseInt(req.body.amount);
        switch (oper) {

            case "minus":
                stock[index].skuOHQ -= amount;

                break;

            case "add":
                stock[index].skuOHQ += amount;

                break;

            default:
                console.log("Hit default");
                break;

        }

        res.send({ data: stock[index], message: "200 OK Stock Updated" })
    }

    catch (err) {
        res.status(400).send({
            message: 'Update failed: ' + err.message
        });
    }


})

app.listen(5000);