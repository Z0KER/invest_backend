module.exports = (currentValue, monthlyInvestment, monthlyIncome, monthlyTime) => {
    const xl = require('excel4node')
    const wb = new xl.Workbook()
    const ws = wb.addWorksheet('Contabilidades')
    const totalValueService = require('./services/totalValue')
    const totalIncomeService = require('./services/totalIncome')

    const totalInvested = currentValue + monthlyTime * monthlyInvestment

    const totalValue = totalValueService(currentValue, monthlyInvestment, monthlyIncome, monthlyTime)
    const totalIncome = totalIncomeService(currentValue, monthlyInvestment, monthlyIncome, monthlyTime)
    

    const style = wb.createStyle({
        alignment: {
            wrapText: true,
            vertical: 'center'
        },
        font: {
            name: 'Arial',
            size: 12
        }
    })

    const headingRowName = [
        'Rendimento total',
        'Total em conta',
        'Total investido',
        'Duração do investimento (em meses)',
        'Rendimento mensal'
    ]

    const data = [
        parseFloat(totalIncome),
        parseFloat(totalValue),
        parseFloat(totalInvested),
        parseFloat(monthlyTime),
        parseFloat(monthlyIncome)
    ]

    for(let i = 1; i <= headingRowName.length; i++) {
        ws.cell(i, 1).string(headingRowName[i-1]).style(style)
        ws.cell(i, 2).number(data[i-1]).style(style)
    }

    ws.opts.sheetFormat.baseColWidth = 30
    ws.opts.sheetFormat.defaultRowHeight = 25

    wb.write('./Contabilidades.xlsx')
}