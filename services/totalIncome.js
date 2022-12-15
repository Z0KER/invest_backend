module.exports = (currentValue, monthlyInvestment, monthlyIncome, monthlyTime) => {
    if(currentValue >= 0 && monthlyInvestment >= 0 && monthlyIncome > 0 && monthlyTime > 0) {
        let totalIncome = 0
        const initialValue = currentValue
        monthlyIncome /= 100
        for(let i = 0; i <= monthlyTime; i++) {
            if(i === 0) {
                currentValue += currentValue * monthlyIncome
            } else {
                currentValue += monthlyInvestment + (currentValue + monthlyInvestment) * monthlyIncome
            }
        }
        totalIncome = currentValue - (initialValue + monthlyTime * monthlyInvestment) 
        return totalIncome.toFixed(2)
    }
    return 0
}