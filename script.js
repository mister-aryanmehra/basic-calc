class Calculator{
    constructor(previousOperandTextElement, currentOperandTextElement){
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
    }
    
    clear(){
        this.currentOperand=''
        this.previousOperand=''
        this.operation= undefined
    }

    appendNumber(number){
        if(number==='.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()

    }

    chooseOperation(operation){
        if (this.currentOperand==='') return
        if (this.previousOperand !== ''){
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
        
    }

    compute(){
        let computation
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if(isNaN(prev)||isNaN(current)) return
        switch(this.operation){
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '÷':
                computation = prev / current
                break
            case '×':
                computation = prev * current
                break
            default :
                return    
        }
        this.currentOperand=computation
        console.log(computation)
        this.operation=undefined
        this.previousOperand=''
    }

    getDisplayNumber(number){
        const stringNum = number.toString()
        const integerDigits = parseFloat(stringNum.split('.')[0])
        const decimalDigits =  stringNum.split('.')[1]
        let integerDisplay 
        if(isNaN(integerDigits)){
            integerDisplay = ''      
        } else {
            integerDisplay = integerDigits.toLocaleString('en',{
                maximumFractionDigits:0})
        }
        if (decimalDigits != null){
            return `${integerDisplay}.${decimalDigits}`
        }else{
            return integerDisplay
        }
    }

    updateDisplay(){
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand)
        if(this.operation != null){
            this.previousOperandTextElement.innerText =
            `${this.previousOperand} ${this.operation}`
        }else{
            this.previousOperandTextElement.innerText=''
        }
        
    }
    
}


const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operators]')
const clearOptn = document.querySelector('[data-allClear]')
const equalBtn = document.querySelector('[data-equal]')
const previousOperandTextElement = document.querySelector('[data-previousOperand]')
const currentOperandTextElement = document.querySelector('[data-currentOperand]')


const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button=>{
    button.addEventListener('click',()=>{
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button=>{
    button.addEventListener('click',()=>{
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalBtn.addEventListener('click', button=>{
    calculator.compute()
    calculator.updateDisplay()
})

clearOptn.addEventListener('click', button=>{
    calculator.clear()
    calculator.updateDisplay()
})

document.addEventListener('keydown', (event) => {
    const key = event.key;

    if (key >= '0' && key <= '9') {
        const numberButton = document.querySelector(`button[data-number="${key}"]`);
        if (numberButton) {
            numberButton.click();
        }
    }

    if (key === '.') {
        const decimalButton = document.querySelector(`button[data-number="."]`);
        if (decimalButton) {
            decimalButton.click();
        }
    }

    if (key === '+') {
        const addButton = document.querySelector(`button[data-operators="+"]`);
        if (addButton) {
            addButton.click();
        }
    }
    if (key === '-') {
        const subButton = document.querySelector(`button[data-operators="-"]`);
        if (subButton) {
            subButton.click();
        }
    }
    if (key === '*') {
        const mulButton = document.querySelector(`button[data-operators="×"]`);
        if (mulButton) {
            mulButton.click();
        }
    }
    if (key === '/') {
        const divButton = document.querySelector(`button[data-operators="÷"]`);
        if (divButton) {
            divButton.click();
        }
    }

    if (key === 'Enter' || key === '=') {
        const equalButton = document.querySelector('button[data-equal]');
        if (equalButton) {
            equalButton.click();
        }
    }
});

