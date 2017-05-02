/**
 * Created by roxana on 5/1/17.
 */

$('document').ready(function () {

    var sequence = [];
    var random;
    var index = 0, counter = 0, round = 1;
    // var gameOver = false;
    // var displayingSequence = false;
    // var displayingColor = false;
    var on = false, off = true;

    var index_seq = 0;

    function numToColor(number, index) {
        switch (number) {
            case 0:
                sequence[index] = 'red';
                break;
            case 1:
                sequence[index] = 'blue';
                break;
            case 2:
                sequence[index] = 'green';
                break;
            case 3:
                sequence[index] = 'yellow';
                break;
        }
    }

    function animateBoxes() {
        $('#' + sequence[index_seq]).animate({opacity: 0.2}, 600).animate({opacity: 1}, 400, function () {
            // console.log('animating box ' + sequence[index_seq]);
            index_seq++;
            if(index_seq < sequence.length) {
                animateBoxes();
            }
        });
    }

    function addColorToSequence() {
        // add a new color to the sequence randomly
        // displayingSequence = true;
        random = Math.round(Math.random()*3);
        numToColor(random, index);
        index++;
        console.log(sequence);
        index_seq = 0;
        animateBoxes();
    }

    function reset() {
        index = 0;
        counter = 0;
        sequence = [];
        round = 1;
    }

    $('#start').click(function () {
        if(on && !off) {
            addColorToSequence();
            $('#round').val(round);
        }
    });

    $('.shapes').click(function () {

        if(on && !off) {

            $(this).animate({opacity: 0.2}, 600).animate({opacity: 1}, 400, function () {
                console.log('animating box ' + $(this).attr('id'));

                if (counter < index) {
                    if ($(this).attr('id') === sequence[counter]) {
                        counter++;
                        if (counter === index) {
                            console.log('success');
                            round++;
                            $('#round').val(round);
                            addColorToSequence();
                            counter = 0;
                        }

                    } else {
                        console.log('game over');
                        $('#round').val('!!');
                        reset();
                    }
                }
            });

        }

    });

    $('#on').click(function () {
        on = true;
        off = false;
    });

    $('#off').click(function () {
        on = false;
        off = true;
        reset();
        $('#round').val(0);
    });

});