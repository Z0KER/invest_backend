const express = require('express')
const bodyParser = require('body-parser')
const { urlencoded } = require('express')
const calculate = require('./index')
const cors = require('cors')
const app = express()
const fs = require('fs')

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})

app.post('/', (req, res) => {
    const { currentValue, monthlyInvestment, monthlyIncome, monthlyTime } = req.body
    calculate(Number(currentValue), Number(monthlyInvestment), Number(monthlyIncome), Number(monthlyTime))
    return
})

app.get('/download', (req, res) => {
    const sleep = ms => new Promise(r => setTimeout(r, ms));

    res.download('Contabilidades.xlsx', (err) => {
        if(err) {
            console.log(err)
        }
    })
    
    sleep(100).then(() => {
        fs.unlink('Contabilidades.xlsx', () => {})
    })


})

app.listen(process.env.PORT || 8080, function(){
    console.log('Server Running!')
});