/**
 * Created by roxana on 4/26/17.
 */


$('document').ready(function () {
    'use strict';

    var positionNotValid = [], Xpositions = [], Opositions =[];
    var counter = 0, countX = 0;
    var currentPosition, random, gameOver=false;
    var countOne, countTwo, countThree;  //countOne: total of "Xs" or "Os" in row 1 or col 1


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

    function count(arrayOfPositions, index1, index2) { //count "Xs" or "Os" in arrayOfPositions
        var p;
        countOne=0;
        countTwo=0;
        countThree=0;

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
    }

    function findIndexOfPositionToPlay(arrayOfPositionsPlayer1, arrayOfPositionsPlayer2, index1, count) {
        var position;
        for (var i = 1; i <= 3; i++) {
            if(index1 === 0) { //is a row
                position = count + i;
            } else {
                position = i + count;
            }
            if(findPosition(position, arrayOfPositionsPlayer1) === false) {
                //Check if the position is empty
                if(findPosition(position, arrayOfPositionsPlayer2) === false) {
                    // position empty, so return index
                    return decodePosToIndex(position);
                }
            }
        }
    }

    function check2(arrayOfPositionsPlayer1, arrayOfPositionsPlayer2, index1, index2) { //Check if there is 2 "Xs" or "Os" in a row or col

        count(arrayOfPositionsPlayer1, index1, index2);
        if(countOne === 2) {
            return findIndexOfPositionToPlay(arrayOfPositionsPlayer1, arrayOfPositionsPlayer2, index1, '1');
        } else if(countTwo === 2) {
            return findIndexOfPositionToPlay(arrayOfPositionsPlayer1, arrayOfPositionsPlayer2, index1, '2');
        } else if(countThree === 2) {
            return findIndexOfPositionToPlay(arrayOfPositionsPlayer1, arrayOfPositionsPlayer2, index1, '3');
        }

    }

    function changeBoxBackgroundIfCountIs3(index1, count) {
        var position;
        for(var i=1; i<=3 ; i++) {
            if(index1 === 0) { //is a row
                position = count + i;
            } else {
                position = i + count;
            }
            changeBoxBackground(position);
        }
    }

    function check3(arrayOfPositions, index1, index2) { //Check if there is 3 "Xs" or "Os" in a row or col
        var position;
        count(arrayOfPositions, index1, index2);

        if(countOne === 3 || countTwo === 3 || countThree === 3){
            console.log('You win');
            if(countOne === 3) {
                changeBoxBackgroundIfCountIs3(index1, '1');
            }
            if(countTwo === 3) {
                changeBoxBackgroundIfCountIs3(index1, '2');
            }
            if(countThree === 3) {
                changeBoxBackgroundIfCountIs3(index1, '3');
            }
            return true;
        } else {
            return false;
        }
    }


    function check2Diagonal(arrayOfPositionsPlayer1, arrayOfPositionsPlayer2, diagonal) {
        // Check if there is 2 "Xs" or "Os" in the diagonal ['11', '22', '33'] or ['31', '22', '13']

        if(findPosition(diagonal[0], arrayOfPositionsPlayer1) && findPosition(diagonal[1], arrayOfPositionsPlayer1)) {
            // check if position diagonal[2] is empty
            if(findPosition(diagonal[2], arrayOfPositionsPlayer2) === false) {
                // position empty, so return index
                return decodePosToIndex(diagonal[2]);
            }
        }
        if(findPosition(diagonal[0], arrayOfPositionsPlayer1) && findPosition(diagonal[2], arrayOfPositionsPlayer1)) {
            // check if position diagonal[1] is empty
            if(findPosition(diagonal[1], arrayOfPositionsPlayer2) === false) {
                // position empty, so return index
                return decodePosToIndex(diagonal[1]);
            }
        }
        if(findPosition(diagonal[1], arrayOfPositionsPlayer1) && findPosition(diagonal[2], arrayOfPositionsPlayer1)) {
            // check if position diagonal[0] is empty
            if(findPosition(diagonal[0], arrayOfPositionsPlayer2) === false) {
                // position empty, so return index
                return decodePosToIndex(diagonal[0]);
            }
        }

    }

    function check3Diagonal(arrayOfPositions, diagonal) {
        // Check if there is 3 "Xs" or "Os" in the diagonal ['11', '22', '33'] or ['31', '22', '13']
        if(findPosition(diagonal[0], arrayOfPositions) && findPosition(diagonal[1], arrayOfPositions) && findPosition(diagonal[2], arrayOfPositions)) {
            console.log('You win');
            diagonal.forEach(function (position) {
                changeBoxBackground(position)
            });
            return true;
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


    function checkConditionToWin(arrayOfPositions) {
        // Check if there is 3 "Xs" or "Os" in the diagonal ['11', '22', '33']
        if(check3Diagonal(arrayOfPositions, ['11', '22', '33'])) { return true;}

        // // Check if there is 3 "Xs" or "Os" in the diagonal ['31', '22', '13']
        if(check3Diagonal(arrayOfPositions, ['31', '22', '13'])) { return true;}

        // Check if there is 3 "Xs" or "Os" in one row or in one col
        if (check3(arrayOfPositions, 0, 1) || check3(arrayOfPositions, 1, 2)) {
            return true;
        }
    }


    function easy() {
        if (positionNotValid.length < 8) {
            do {
                random = Math.round(Math.random() * 8);
            } while (findPosition(random, positionNotValid) === true);
            putO(random);
        }
    }

    function decodePosToIndex(position) {
        var index;
        $('.box').each(function (i, element) {
            if($(element).attr('data-position') == position) {
                index = i;
            }
        });
        return index;
    }
    
    function check2Xs() {
        var indexOfPosition;
        // check if there is 2 "Xs" in the same Row
        indexOfPosition = check2(Xpositions, Opositions, 0, 1);

        if(indexOfPosition === undefined) {
            // check if there is 2 "Xs" in the same Col
            indexOfPosition = check2(Xpositions, Opositions, 1, 2);
        }

        if(indexOfPosition === undefined) {
            // check if there is 2 "Xs" in the diagonal ['11', '22', '33']
            indexOfPosition = check2Diagonal(Xpositions, Opositions, ['11', '22', '33']);
        }

        if(indexOfPosition === undefined) {
            // check if there is 2 "Xs" in the diagonal ['31', '22', '13']
            indexOfPosition = check2Diagonal(Xpositions, Opositions, ['31', '22', '13']);
        }
        return indexOfPosition;
    }

    function check2Os() {
        var indexOfPosition;
        // check if there is 2 "Xs" in the same Row
        indexOfPosition = check2(Opositions, Xpositions, 0, 1);

        if(indexOfPosition === undefined) {
            // check if there is 2 "Xs" in the same Col
            indexOfPosition = check2(Opositions, Xpositions, 1, 2);
        }

        if(indexOfPosition === undefined) {
            // check if there is 2 "Xs" in the diagonal ['11', '22', '33']
            indexOfPosition = check2Diagonal(Opositions, Xpositions, ['11', '22', '33']);
        }

        if(indexOfPosition === undefined) {
            // check if there is 2 "Xs" in the diagonal ['31', '22', '13']
            indexOfPosition = check2Diagonal(Opositions, Xpositions, ['31', '22', '13']);
        }
        return indexOfPosition;
    }

    function putO(index) {
        $('.box')[index].append('O');
        positionNotValid[counter] = index;
        counter++;
        Opositions[countX] = $('.box')[index].getAttribute('data-position');
        countX++;
    }

    function medium() {
        if (countX === 0) {
            easy();
        } else if (countX === 1) {
            // 1. check if there is 2 "Xs" and play in the 3rd position if the position if empty
            // 2. put an O randomly
            
            if(check2Xs() !== undefined) {
                // play in this position
                putO(check2Xs());
            } else {
                easy();
            }

        } else {
            // 1. check if there is 2 "Os" and play in the 3rd position if the position if empty
            // 2. check if there is 2 "Xs" and play in the 3rd position if the position if empty
            // 3. put an O randomly

            if(check2Os() !== undefined) {
                // play in this position
                putO(check2Os());
            } else if(check2Xs() !== undefined) {
                // play in this position
                putO(check2Xs());
            } else {
                easy();
            }
        }
    }
    
    function impossible() {
        console.log('impossible')
    }

    function checkIfTherIsAWinner() {
        if (Xpositions.length > 2) { // If there is at least 3 "Xs"
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

                checkIfTherIsAWinner();

                if(!gameOver) {
                    if($('.menu').text() === 'Easy ') {
                        easy();
                    } else if($('.menu').text() === 'Medium ') {
                        medium();
                    } else {
                        impossible();
                    }

                    checkIfTherIsAWinner();

                    console.log(positionNotValid);
                    console.log(Xpositions);
                    console.log(Opositions);
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

    $('.easy').click(function (event) {
        event.preventDefault();
        $('.menu').html('Easy <span class="caret">');
    });

    $('.medium').click(function (event) {
        event.preventDefault();
        $('.menu').html('Medium <span class="caret">');
    });

    $('.impossible').click(function (event) {
        event.preventDefault();
        $('.menu').html('Impossible <span class="caret">');
    });

});
