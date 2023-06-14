main_calc = document.querySelectorAll('.main__calc')[0]
display = document.querySelectorAll('.main__calc__display__result')[0]
pointbtn = document.querySelectorAll('.main__calc__numbers__point')[0]

prev = 0
operator = null
point = false
flag = false
activeOper = null
first = true

main_calc.addEventListener('click', btnPress);
function btnPress(event) {
    operators = ["+", '-', '*', '/', '=']
    nums = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.']
    input = event.target.innerHTML
    if (input == 'x' && display.innerHTML != "0") {
        if (display.innerHTML.length == 1) {
            display.innerHTML = "0"
        } else if (display.innerHTML == 'Infinity') {
            display.innerHTML = "0"
        }
        else {
            display.innerHTML = display.innerHTML.slice(0, display.innerHTML.length - 1)
        }
    }
    if (input == 'C') {
        display.innerHTML = "0";
        prev = 0
        operator = null
        point = false
    }
    if (nums.includes(input)) {
        if (activeOper != null) {
            document.getElementsByClassName('main__calc__operations')[0].querySelectorAll('button').forEach(element => {
                element.style.color = 'black';    
            });
                
        }
        if (display.innerHTML == "0") {
            display.innerHTML = input
        }
        else if (prev == display.innerHTML && flag && first) {
            display.innerHTML = input;
            flag = false
        }
        else {
            if (input == '.') {
                point = true
                pointbtn.innerHTML = ""
            }
            display.innerHTML += input
        }
    }
    if (operators.includes(input)) {
        if (operator == null) {
            operator = input
            prev = Number(display.innerHTML);
            display.innerHTML = "0"
            point = true
            activeOper = document.getElementsByClassName(input)[0]
            activeOper.style.color = 'gold'
            first = false
        }
        else if (input == '=') {
            first = true
            prev = calc(Number(display.innerHTML), operator);
            display.innerHTML = prev
            operator = null
        }
        else {
            first = true
            activeOper = document.getElementsByClassName(input)[0]
            activeOper.style.color = 'gold'
            prev = calc(Number(display.innerHTML), operator);
            if (isNaN(prev) || prev === Infinity) {
            }
            else {
                display.innerHTML = prev
                operator = input
            }
        }
        if (point == true) {
            pointbtn.innerHTML = "."
        }
        flag = true
    }

}
function calc(curr, oper) {
    const precision = Math.max(getDecimalPlaces(curr), getDecimalPlaces(prev));
    switch (oper) {
        case '+':
            return Number((prev + curr).toFixed(precision));
        case '-':
            return Number((prev - curr).toFixed(precision));
        case '*':
            return Number((prev * curr).toFixed(precision));
        case '/':
            if (curr == 0) { // Division by zero
                alert("Division by zero is not allowed.");
                return Infinity;
            }
            if (precision == 0) {
                return Number((prev / curr).toFixed(2));
            }
            return Number((prev / curr).toFixed(precision));
    }
}


function getDecimalPlaces(num) {
    if (Number.isInteger(num)) {
        return 0;
    }
    const decimalPart = String(num).split('.')[1];
    return decimalPart ? decimalPart.length : 0;
}



//      N i g ht   M o d e  

const nightModeBtn = document.getElementById('night-mode-btn');
const body = document.body;

nightModeBtn.addEventListener('click', toggleNightMode);

function toggleNightMode() {
    body.classList.toggle('night-mode');
}



//      K e y b o a r d      I n p u t

window.addEventListener('keydown', keyDownInput);

function keyDownInput(event) {
    key = event.key;
    if (key === 'Backspace') {
        key = 'x'
    }
    if (key === 'Enter') {
        key = '='
    }
    if (key == 'C' || key == 'c') {
        key = 'C'
    }
    keyHtml = document.getElementsByClassName(key)[0];
    if (keyHtml) {
        keyHtml.click();
    }
}