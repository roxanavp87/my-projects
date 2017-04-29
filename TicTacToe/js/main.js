/**
 * Created by roxana on 4/26/17.
 */


$('document').ready(function () {
    'use strict';

    var positionNotValid = [], Xpositions = [], Opositions =[];
    var counter = 0, countX = 0;
    var currentPosition, random, gameOver=false;


    function findPosition(position, arrayOfPositions) {
        var match = false;
        for(var i=0; i< arrayOfPositions.length; i++) {
            if(position == arrayOfPositions[i]) {
                match = true;
                break;
            } else {
            }
        }
        return match;
    }


    function check3(arrayOfPositions, index1, index2) { //Check if there is 3 "Xs" or "Os" in a row or col
        var p, countOne=0, countTwo=0, countThree=0;
        arrayOfPositions.forEach(function (position) {
            p = position.substring(index1,index2);
            switch (p) {
                case '1':
                    countOne++;
                    break;
                case '2':
                    countTwo++;
                    break;
                case '3':
                    countThree++;
                    break;
            }
        });
        if(countOne === 3 || countTwo === 3 || countThree === 3){
            console.log('You win');
            if(countOne === 3) {
                for(var i=1; i<=3 ; i++) {
                    if(index1 === 0) { //is a row
                        p = '1' + i;
                    } else {
                        p = i + '1';
                    }
                    changeBoxBackground(p);
                }
            }
            if(countTwo === 3) {
                for(var i=1; i<=3 ; i++) {
                    if(index1 === 0) { //is a row
                        p = '2' + i;
                    } else {
                        p = i + '2';
                    }
                    changeBoxBackground(p);
                }
            }
            if(countThree === 3) {
                for(var i=1; i<=3 ; i++) {
                    if(index1 === 0) { //is a row
                        p = '3' + i;
                    } else {
                        p = i + '3';
                    }
                    changeBoxBackground(p);
                }
            }
            return true;
        } else {
            return false;
        }
    }


    function changeBoxBackground(position) {
        $('.box').each(function (index, element) {
            if(element.getAttribute('data-position') == position) {
                $(element).css({
                    'background-color': 'white',
                    'border': '2px solid black'
                });
            }
        });
    }

//        console.log(changeBoxBackground('11'));

    function checkConditionToWin(arrayOfPositions) {
        // Check if there is 3 "Xs" or "Os" in the diagonal 11, 22 & 33
        if(findPosition('11', arrayOfPositions)) {
            if(findPosition('22', arrayOfPositions)) {
                if(findPosition('33', arrayOfPositions)) {
                    console.log('You win');
                    changeBoxBackground('11');
                    changeBoxBackground('22');
                    changeBoxBackground('33');
                    return true;
                }
            }
        }

        // Check if there is 3 "Xs" or "Os" in the diagonal 31, 22 & 13
        if(findPosition('31', arrayOfPositions)) {
            if(findPosition('22', arrayOfPositions)) {
                if(findPosition('13', arrayOfPositions)) {
                    console.log('You win');
                    changeBoxBackground('31');
                    changeBoxBackground('22');
                    changeBoxBackground('13');
                    return true;
                }
            }
        }

        // Check if there is 3 "Xs" or "Os" in one row or in one col
        if (check3(arrayOfPositions, 0, 1) || check3(arrayOfPositions, 1, 2)) {
            return true;
        }
    }


    $('.box').click(function () {

        if(!gameOver) {
            currentPosition = parseInt($(this).attr('data-index'));

            if (findPosition(currentPosition, positionNotValid) === false) { // if the position is valid
                $(this).text('X');
                $(this).css('color', 'green');
                positionNotValid[counter] = currentPosition;
                counter++;
                Xpositions[countX] = $(this).attr('data-position');
                if (positionNotValid.length < 8) {
                    do {
                        random = Math.round(Math.random() * 8);
                    } while (findPosition(random, positionNotValid) === true);
                    console.log(random);
                    $('.box')[random].append('O');
                    positionNotValid[counter] = random;
                    counter++;
                    Opositions[countX] = document.getElementsByClassName('box')[random].getAttribute('data-position');
                    countX++;
                }

                console.log(positionNotValid);
                console.log(Xpositions);
                console.log(Opositions);

                if (positionNotValid.length > 2) { // If there is at least 3 "Xs" or 3 "Os"
                    if (checkConditionToWin(Xpositions) || checkConditionToWin(Opositions)) {
                        gameOver = true;
                        if(checkConditionToWin(Xpositions)) {
                            $('#winner').text('X');
                        } else {
                            $('#winner').text('O');
                        }

                        $('#game').delay(2000).slideToggle();
                        $('.game-over').delay(2000).slideToggle();
                    }
                }

            } else {
                console.log('Position not valid');
            }

        }

    });


    $('#start').click(function () {
        // Reset all
        positionNotValid = [];
        Xpositions = [];
        Opositions =[];
        counter = 0;
        countX = 0;
        gameOver=false;

        $('#game').show();
        $('.game-over').hide();

        $('.box').css({
            'background-color': 'black',
            'color': 'red',
            border: '2px solid white'
        });

        $('.box').each(function (index, element) {
            $(this).text('');
        });

    });

});
