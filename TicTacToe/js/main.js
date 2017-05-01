/**
 * Created by roxana on 4/26/17.
 */


$('document').ready(function () {
    'use strict';

    var positionNotValid = [], Xpositions = [], Opositions =[];
    var counter = 0, countX = 0;
    var currentPosition, random, gameOver=false;
    var countOne, countTwo, countThree;  //countOne: total of "Xs" or "Os" in row 1 or col 1

    // Variables for impossible
    var corner = false; //"X" isn't in one of the followings positions: '11', '13', '31' or '33'
    var firstAndLastCorner = false; //"X" isn't in one of the followings positions: '11' or '33'
    var sort =false;
    var center = false; //"X" isn't in the position '22'
    var counterO = 0, counterEmpty = 0, emptyPos = [];

    var playEasy = true, playMedium = false, playImpossible = false;

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

    function find2emptyOneO(row, col, diagonal, fill_emptyPos) {
        // if row != null -> search by row
        // if col != null -> search by col
        // if diagonal != null -> search by diagonal
        var byRow = false, byCol = false, byDiag = false;
        counterO = 0;
        counterEmpty = 0;

        for(var j=1; j<=3; j++){
            if(row === null || byRow) {
                row = j.toString();
                byRow = true;
            }
            if(col === null || byCol) {
                col = j.toString();
                byCol = true;
            }
            if(diagonal !== null || byDiag) {
                row = diagonal[j-1].substring(0,1);
                col = diagonal[j-1].substring(1,2);
                byDiag = true;
            }

            if (findPosition(row + col, Xpositions) ) {
                // if there is one "X" in this position -> exit from col
                break;
            } else if(findPosition(row + col, Opositions) ) {
                // if there is one "O" in this position -> count it
                counterO++;
            } else {
                // position empty
                if(fill_emptyPos) {
                    emptyPos[counterEmpty] = row + col;
                }
                counterEmpty++;
            }
        }
    }

    function findAWinnerPosition(row, col) {

        for(var i=1; i<=3; i++) {
            var rowPos = null, colPos= null;
            //find 2 empty positions in a col or row with one "O"
            if(row[0]) { rowPos = i; }
            if(col[0]) { colPos = i; }
            find2emptyOneO(rowPos, colPos, null, true);

            //find 2 empty positions in a row or col with one "O"
            if(counterEmpty === 2 && counterO === 1) {
                for(var k =0; k<2; k++) {
                    rowPos = null;
                    colPos= null;
                    if(row[1]) { rowPos = emptyPos[k].substring(0, 1); }
                    if(col[1]) { colPos = emptyPos[k].substring(1, 2); }

                    find2emptyOneO(rowPos, colPos, null, false);

                    if(counterEmpty === 2 && counterO === 1) {
                        //play in this position
                        return decodePosToIndex(emptyPos[k]);
                    }
                }

                //find one "O" in the same diagonal with two empty pos
                for(var k =0; k<2; k++) {
                    var diagonal;
                    if(emptyPos[k] === '31' || emptyPos[k] === '22' || emptyPos[k] === '13') {
                        // check diagonal ['31', '22', '13']
                        diagonal = ['31', '22', '13'];
                    } else {
                        diagonal = ['11', '22', '33'];
                    }

                    find2emptyOneO(null, null, diagonal, false);

                    if(counterEmpty === 2 && counterO === 1) {
                        //play in this position
                        return decodePosToIndex(emptyPos[k]);
                    }
                }
            }
            counterO = 0;
            counterEmpty = 0;
            emptyPos = [];
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
        console.log('playing easy');
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
        console.log('playing medium');
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
        console.log('playing impossible');
        if (countX === 0) {
            //1. "X" is in the position '22'-> put "O" in '11'
            //2. "X" is in one of the followings positions: '11', '13', '31' or '33' -> put 'O' in '22'
            //3. "X" is in '21' or '23' -> put "O" in '23' or '21'
            //4. "X" is in '12' or '32' -> put "O" in '32' or '12'

            switch(Xpositions[0]) {
                case '22':
                    putO(decodePosToIndex('11'));
                    center = true;
                    break;
                case '11':
                case '13':
                case '31':
                case '33':
                    putO(decodePosToIndex('22'));
                    corner = true;
                    break;
                case '21':
                    putO(decodePosToIndex('23'));
                    sort = true;
                    break;
                case '23':
                    putO(decodePosToIndex('21'));
                    sort = true;
                    break;
                case '12':
                    putO(decodePosToIndex('32'));
                    break;
                default:
                    putO(decodePosToIndex('12'));
            }
        } else if (countX === 1) {
            //1. check if there is 2 "Xs" and play in the 3rd position if the position if empty
            if(check2Xs() !== undefined) {
                putO(check2Xs());
            } else {
                if(corner) {
                    //2. "Xs" are in one of the corners -> put "O" in row 2 and same col as the 2nd "X"
                    putO(decodePosToIndex('2' + Xpositions[1].substring(1,2)));
                    if(Xpositions[1] === '11' || Xpositions[1] === '33') { firstAndLastCorner = true;}
                    center = false;
                } else if(center && Xpositions[1] === '33') {
                    //3. "Xs" are in '22' & '33' -> put "O" in '31'
                    putO(decodePosToIndex('31'));
                    corner = false;
                } else {
                    //4. "Xs" are in the positions '12' & '21' -> "O" in '11'
                    //   "Xs" are in the positions '32' & '23' -> "O" in '33'
                    //   "Xs" are in the positions '32' & '21' -> "O" in '31'
                    //   "Xs" are in the positions '12' & '23' -> "O" in '13'
                    // algorithm: sort if it's needed and put "O" in the row of the 1st "X" and in the col of the 2nd "X"
                    if(sort) {
                        if(Xpositions[1] === '12') { Xpositions = Xpositions.sort(); }
                        if(Xpositions[1] === '32') { Xpositions = Xpositions.reverse()}
                        sort = false;
                    }
                    putO(decodePosToIndex(Xpositions[0].substring(0,1) + Xpositions[1].substring(1,2)));
                }
            }
        } else {
            // 1. check if there are 2 "Os" and play in the 3rd position if the position if empty
            // 2. check if there are 2 "Xs" and play in the 3rd position if the position if empty
            // 3. check if there are 2 "Xs" in the corners only when countX = 2

            if(check2Os() !== undefined) {
                putO(check2Os());

            } else if(check2Xs() !== undefined) {
                putO(check2Xs());

            } else if(findAWinnerPosition([false, true], [true, false]) !== undefined) {
                //1. find 2 empty positions in a col with one "O"
                //2. find 2 empty positions in a row with one "O"
                //3. find one "O" in the same diagonal with two empty pos
                putO(findAWinnerPosition([false, true], [true, false]));

            } else if(findAWinnerPosition([true, false], [false, true]) !== undefined) {
                //1. find 2 empty positions in a row with one "O"
                //2. find 2 empty positions in a col with one "O"
                //3. find one "O" in the same diagonal with two empty pos
                putO(findAWinnerPosition([true, false], [false, true]));

            } else {
                easy();
                console.log('easy in impossible');
            }
        }


    }

    function checkIfThereIsAWinner() {
        if (Xpositions.length > 2) { // If there is at least 3 "Xs"
            if (checkConditionToWin(Xpositions) || checkConditionToWin(Opositions)) {
                gameOver = true;
                if(checkConditionToWin(Xpositions)) {
                    $('#winner').text('X').next().next().html('WINNER!');
                } else {
                    $('#winner').text('O').next().next().html('WINNER!');
                }

                $('#game').delay(2000).slideToggle();
                $('.game-over').delay(2000).slideToggle();
            }
        }
    }

    function reset() {
        // Reset all
        positionNotValid = [];
        Xpositions = [];
        Opositions =[];
        counter = 0;
        countX = 0;
        gameOver=false;
        corner = false;
        firstAndLastCorner = false;
        sort =false;
        center = false;

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

                checkIfThereIsAWinner();

                if(!gameOver) {
                    console.log($('.menu').text());
                    if(playImpossible) {
                        impossible();
                    } else if(playMedium) {
                        medium();
                    } else {
                        easy();
                    }

                    checkIfThereIsAWinner();

                    console.log(positionNotValid);
                    console.log(Xpositions);
                    console.log(Opositions);
                }

                if (counter === 9) { // "X O" Draw
                    console.log(gameOver);
                    if(!gameOver) {
                        $('#winner').text('X O').next().next().html('DRAW!');
                        $('#game').delay(2000).slideToggle();
                        $('.game-over').delay(2000).slideToggle();
                        gameOver = true;
                    }
                }

            } else {
                console.log('Position not valid');
            }

        }

    });


    $('#start').click(reset);

    $('.menu').click(reset);

    $('.easy').click(function (event) {
        event.preventDefault();
        $('.menu').html('Easy <span class="caret">');
        playEasy = true;
        playMedium = false;
        playImpossible = false;
    });

    $('.medium').click(function (event) {
        event.preventDefault();
        $('.menu').html('Medium <span class="caret">');
        playEasy = false;
        playMedium = true;
        playImpossible = false;
    });

    $('.impossible').click(function (event) {
        event.preventDefault();
        $('.menu').html('Impossible <span class="caret">');
        playEasy = false;
        playMedium = false;
        playImpossible = true;
    });


});
