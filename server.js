const express = require('express')
const bodyParser = require('body-parser')
const { urlencoded } = require('express')
const calculate = require('../backend/index')
const path = require('path')
const cors = require('cors')
const app = express()

app.use(cors( { origin: ['http://localhost:3050', 'http://localhost:3000'] } ))
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
})

app.get('/download', (req, res) => {
    const file = path.join(__dirname, './Contabilidades.xlsx')

    res.download(file, (err) => {
        if(err) {
            console.log(err)
        }
    })
})

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log('Server Running!')
})