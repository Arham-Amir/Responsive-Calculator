main_calc = document.querySelectorAll('.main__calc')[0]
display = document.querySelectorAll('.main__calc__display__result')[0]
pointbtn = document.querySelectorAll('.main__calc__numbers__point')[0]

prev = 0
operator = null
point = false

main_calc.addEventListener('click', btnPress);
function btnPress(event) {
    operators = ["+", '-', 'x', '/', '=']
    nums = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.']
    input = event.target.innerHTML
    if (input == 'C') {
        display.innerHTML = "0";
        prev = 0
        operator = null
    }
    if (nums.includes(input)) {
        if (display.innerHTML == "0") {
            display.innerHTML = input
        }
        else if (prev == display.innerHTML) {
            display.innerHTML = input;
        }
        else {
            if (input == '.') {
                point = true
                pointbtn.innerHTML = ""
            }
            console.log(input);
            display.innerHTML += input
        }
    }
    if (operators.includes(input)) {
        if (operator == null) {
            operator = input
            prev = Number(display.innerHTML);
            display.innerHTML = "0"
            point = true
        }
        else if (input == '=') {
            prev = calc(Number(display.innerHTML), operator);
            display.innerHTML = prev
            operator = null
        }
        else {
            prev = calc(Number(display.innerHTML), operator);
            display.innerHTML = prev
            operator = input
        }
        if (point == true) {
            pointbtn.innerHTML = "."
        }
    }

}
function calc(curr, oper) {
    switch (oper) {
        case '+':
            return (prev + curr).toFixed(2)
        case '-':
            return (prev - curr).toFixed(2)
        case 'x':
            return (prev * curr).toFixed(2)
        case '/':
            return (prev / curr).toFixed(2)
    }
}