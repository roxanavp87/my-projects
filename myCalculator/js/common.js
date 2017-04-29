/**
 * Created by roxana on 4/18/17.
 */

(function () {
    'use strict';

    //------------------------------------------------------------------------------------------------------------------
    // Variable declarations
    //------------------------------------------------------------------------------------------------------------------

    var input = document.getElementById('input');
    var btnNumbers = document.getElementsByClassName('btn-numbers');
    var btnOperations = document.getElementsByClassName('btn-operations');
    var btnResult = document.getElementById('btn-result');
    var btnC = document.getElementById('btnC');
    var btnPoint = document.getElementById('btn-point');
    var btnSign = document.getElementById('btn-sign');
    var btnFunctions = document.getElementsByClassName('btn-functions');
    var btnRadDeg = document.getElementById('btn-rad_deg');
    var radians = false;
    var btn2nd = document.getElementById('2nd-functions');
    var btn2ndfunctions = document.getElementsByClassName('btn-2nd-functions');
    var change2ndfunctions = true;
    var counter = 0;
    var currentOperation = {
        number: 0,
        operation: '',
        counter: 0  // currentOperation.counter = -1 : One operation was made, for example, a sum of two numbers.
    };


    //------------------------------------------------------------------------------------------------------------------
    // Function declarations
    //------------------------------------------------------------------------------------------------------------------

    function calculate(operation, number1, number2) {
        var result;
        if(operation === 'sin' || operation === 'cos' || operation === 'tan') {
            if(!radians) {
                number1 = degreesToRadians(number1);
            }
        }

        switch (operation) {
            case '+':
                result = number1 + number2;
                break;
            case '-':
                result = number1 - number2;
                break;
            case 'x':
            case '*':
                result = number1 * number2;
                break;
            case '÷':
            case '/':
                result = number1 / number2;
                break;
            case '%':
                result = number1 / 100;
                break;
            case 'x<sup>2</sup>':
                result = Math.pow(number1,2);
                break;
            case 'x<sup>3</sup>':
                result = Math.pow(number1,3);
                break;
            case 'e<sup>x</sup>':
                result = Math.exp(number1);
                break;
            case '10<sup>x</sup>':
            case '2<sup>x</sup>':
                if(change2ndfunctions) {
                    result = Math.pow(10,number1);
                } else {
                    result = Math.pow(2,number1);
                }
                break;
            case '<sup>1</sup>⁄<sub>x</sub>':
                result = 1 / number1;
                break;
            case '<sup>2</sup>√x':
                result = Math.sqrt(number1);
                break;
            case '<sup>3</sup>√x':
                result = Math.pow(number1, 1/3);
                break;
            case 'ln':
                result = Math.log(number1);
                break;
            case 'log<sub>10</sub>':
            case 'log<sub>2</sub>':
                if(change2ndfunctions) {
                    result = Math.log10(number1);
                } else {
                    result = Math.log2(number1);
                }
                break;
            case 'x!':
                result = factorial(number1);
                break;
            case 'sin':
            case 'sin<sup>-1</sup>':
                if(change2ndfunctions) {
                    result = Math.sin(number1);
                } else {
                    if(!radians) {
                        result = radiansToDegrees(Math.asin(number1));
                    } else {
                        result = Math.asin(number1);
                    }
                }
                break;
            case 'cos':
            case 'cos<sup>-1</sup>':
                if(change2ndfunctions) {
                    result = Math.cos(number1);
                } else {
                    if(!radians) {
                        result = radiansToDegrees(Math.acos(number1));
                    } else {
                        result = Math.acos(number1);
                    }
                }
                break;
            case 'tan':
            case 'tan<sup>-1</sup>':
                if(change2ndfunctions) {
                    result = Math.tan(number1);
                } else {
                    if(!radians) {
                        result = radiansToDegrees(Math.atan(number1));
                    } else {
                        result = Math.atan(number1);
                    }
                }
                break;
            case 'sinh':
            case 'sinh<sup>-1</sup>':
                if(change2ndfunctions) {
                    result = Math.sinh(number1);
                } else {
                    result = Math.asinh(number1);
                }
                break;
            case 'cosh':
            case 'cosh<sup>-1</sup>':
                if(change2ndfunctions) {
                    result = Math.cosh(number1);
                } else {
                    result = Math.acosh(number1);
                }
                break;
            case 'tanh':
            case 'tanh<sup>-1</sup>':
                if(change2ndfunctions) {
                    result = Math.tanh(number1);
                } else {
                    result = Math.tanh(number1);
                }
                break;
            case 'e':
                result = Math.E;
                break;
            case 'π':
                result = Math.PI;
                break;
            case 'Rand':
                result = Math.random();
                break;
            case 'EE':
                result = number1 + 'e0';
                break;
            case 'x<sup>y</sup>':
            case 'y<sup>x</sup>':
                if(change2ndfunctions) {
                    result = Math.pow(number1, number2);
                } else {
                    result = Math.pow(number2, number1);
                }
                break;
            case '<sup>y</sup>√x':
            case 'log<sub>y</sub>':
                if(change2ndfunctions) {
                    result = Math.pow(number1, 1/number2);
                } else {
                    result = Math.log10(number1) / Math.log10(number2);
                }
                break;
            default:
                result = '';
        }
        return result;
    }

    function updateCurrentOperation(stringNumber, operation, counter) {
        currentOperation.number = parseFloat(stringNumber);
        currentOperation.operation = operation;
        currentOperation.counter = counter;
    }

    function clear() {
        currentOperation.number = 0;
        currentOperation.operation = '';
        currentOperation.counter = 0;
        input.value = 0;
        counter = 0;
    }

    function factorial(x) {
        if(x === 0) {
            return 1;
        } else {
            return x * factorial(x-1);
        }
    }

    function degreesToRadians(degrees) {
        return degrees * Math.PI/180;
    }

    function radiansToDegrees(radians) {
        return radians * 180/Math.PI;
    }


    //------------------------------------------------------------------------------------------------------------------
    // Adding .addEventListener('click'...
    //------------------------------------------------------------------------------------------------------------------

    // Display numbers
    function displayNumbers(numbers) {

        if(input.value.indexOf('e') !== -1) {
            var afterE = input.value.substring(input.value.indexOf('e')+1, input.value.length);
            if(afterE === '0') {
                afterE = numbers;
            } else {
                afterE += numbers;
            }
            input.value = input.value.substring(0,input.value.indexOf('e')+1) + afterE;
            return;
        }

        if(currentOperation.counter === counter || input.value ==='0' || currentOperation.counter === -1) {
            //I have a number or input.value = 0 (Never show 0 to the right) or an operation was made
            input.value = '';
            currentOperation.counter = counter;

            console.log('clear input');
        }
        input.value += numbers;
        counter++;

        console.log('counter: ' + counter);
    }

    for (var i = 0; i < btnNumbers.length; i++) {
        btnNumbers[i].addEventListener('click', function () {
            displayNumbers(this.innerHTML);
        }, false);
    }


    // 2nd functions ( When I click in the button 2nd: change buttons.innerHTML
    btn2nd.addEventListener('click', function () {
        var array2ndfunctions_1 = ['x<sup>y</sup>', '10<sup>x</sup>', '<sup>y</sup>√x', 'log<sub>10</sub>', 'sin', 'cos', 'tan', 'sinh', 'cosh', 'tanh'];
        var array2ndfunctions_2 = ['y<sup>x</sup>', '2<sup>x</sup>', 'log<sub>y</sub>', 'log<sub>2</sub>', 'sin<sup>-1</sup>', 'cos<sup>-1</sup>', 'tan<sup>-1</sup>', 'sinh<sup>-1</sup>', 'cosh<sup>-1</sup>', 'tanh<sup>-1</sup>'];

        change2ndfunctions = !change2ndfunctions;
        for(var i=0; i<btn2ndfunctions.length; i++) {
            if(change2ndfunctions) {
                btn2ndfunctions[i].innerHTML = array2ndfunctions_1[i];
            } else {
                btn2ndfunctions[i].innerHTML = array2ndfunctions_2[i];
            }
        }
        console.log(change2ndfunctions);

    }, false);


    // Operations that requires 2 numbers, for example, arithmetic operations
    function operations(operator) {
        console.log(operator);

        if(currentOperation.operation === '' || currentOperation.counter === -1) {
            //currentOperation.operation is empty or an operation was made
            updateCurrentOperation(parseFloat(input.value), operator, counter);

            console.log('currentOperation.operation is empty or last operation was press =');
        } else {
            if(currentOperation.counter === counter) {  //I have one number... I need other
                currentOperation.operation = operator; // always update operation (it's possible select other operation)

                console.log('I have 1 number');
            } else { //I have 2 numbers
                input.value = calculate(currentOperation.operation, currentOperation.number, parseFloat(input.value));
                updateCurrentOperation(parseFloat(input.value), operator, -1);

                console.log('I have 2 numbers');
            }
        }

        console.log(currentOperation);
        console.log('counter: ' + counter);

    }


    for (var i = 0; i < btnOperations.length; i++) {
        btnOperations[i].addEventListener('click', function(){
            operations(this.innerHTML);
        }, false);
    }


    // Functions that only requires one number, for example, log10
    for (var i = 0; i < btnFunctions.length; i++) {
        btnFunctions[i].addEventListener('click', function () {

            input.value = calculate(this.innerHTML, parseFloat(input.value), 0);
            currentOperation.counter = -1; //To clear input if I press a number next time

        }, false);
    }


    // = button
    function result() {

        if(input.value.indexOf('e') !== -1) {
            var afterE = input.value.substring(input.value.indexOf('e')+1, input.value.length);
            input.value = input.value.substring(0,input.value.indexOf('e')) * Math.pow(10, afterE);
            return;
        }

        if(currentOperation.operation !== '') {
            if(currentOperation.counter !== -1) {
                currentOperation.counter = -1; // If you press several times =: always make the last operation
                var temp = input.value;
                input.value = calculate(currentOperation.operation, parseFloat(currentOperation.number), parseFloat(input.value));
                currentOperation.number = temp;
            } else {
                input.value = calculate(currentOperation.operation, parseFloat(input.value), parseFloat(currentOperation.number));
            }
        } else {
            currentOperation.counter = -1;
        }

        console.log(currentOperation);
        console.log('counter: ' + counter);

    }

    btnResult.addEventListener('click',result , false);


    // Clear button
    btnC.addEventListener('click', clear, false);

    // . button
    btnPoint.addEventListener('click', function () {
        if(currentOperation.counter === -1) { // an operation was made
            clear();
            input.value = '0.';
            counter++;
        } else if(input.value.indexOf('.') === -1) {
            input.value += this.innerHTML;
            counter++;
        } else if(currentOperation.operation !== '') {
            input.value = '0.';
            counter++;
        }

    }, false);


    // +/- button
    btnSign.addEventListener('click', function () {
        input.value *= -1;
    }, false);


    // Rad button: Radians or Degrees
    btnRadDeg.addEventListener('click', function () {
        if(this.innerHTML === 'Rad') {
            this.innerHTML = 'Deg';
            document.getElementById('rad-deg').style.display = 'block';
            radians = true;
        } else {
            this.innerHTML = 'Rad';
            document.getElementById('rad-deg').style.display = 'none';
            radians = false;
        }
    }, false);


    //------------------------------------------------------------------------------------------------------------------
    // Adding .addEventListener('keyup'...
    //------------------------------------------------------------------------------------------------------------------

    window.addEventListener('keyup', function (e) {
        if(e.key === '*' || e.key === '-' || e.key === '+' || e.key === '/') {
            operations(e.key);
        } else if(e.key === '0' || e.key === '1' || e.key === '2' || e.key === '3' || e.key === '4'
                || e.key === '5' || e.key === '6' || e.key === '7' || e.key === '8' || e.key === '9') {
            displayNumbers(e.key);
        } else if (e.key === '=') {
            result();
        }

    }, false);


})();