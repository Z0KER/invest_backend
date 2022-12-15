module.exports = (currentValue, monthlyInvestment, monthlyIncome, monthlyTime) => {
    if(currentValue >= 0 && monthlyInvestment >= 0 && monthlyIncome > 0 && monthlyTime > 0) {
        monthlyIncome /= 100
        monthlyIncome = monthlyIncome.toFixed(6)
        for(let i = 0; i <= monthlyTime; i++) {
            if(i === 0) {
                currentValue += currentValue * monthlyIncome
            } else {
                currentValue += monthlyInvestment + (currentValue + monthlyInvestment) * monthlyIncome
            }
        }
        return currentValue.toFixed(2)
    }
    return 0
}