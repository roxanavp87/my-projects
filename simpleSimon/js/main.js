/**
 * Created by roxana on 5/1/17.
 */

$('document').ready(function () {

    var sequence = [], colors = [];
    var random;
    var index = 0, counter = 0, round = 1;
    var gameOver = false;
    var displayingColor = false;
    var on = false, off = true;
    var animateInterval = 1000; //to change the game level -> 1000 ms for easy, 600ms for medium and 300 ms for insane
    var index_seq = 0;
    var sounds = ['a_sharp.mp3', 'f_sharp.mp3', 'c_sharp.mp3', 'd_sharp.mp3', 'gameON.mp3', 'gameOFF.mp3'];

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
        $('.audio').attr('src', 'sounds/' + sounds[colors[index_seq]]).get(0).play();
        $('#' + sequence[index_seq]).animate({opacity: 0.2}, animateInterval).animate({opacity: 1}, 500, function () {
            index_seq++;
            if(index_seq < sequence.length) {
                animateBoxes();
            } else {
                displayingColor = false;
                $('#text').html('Repeat the sequence you just saw!');
            }
        });
    }

    function addColorToSequence() {
        // add a new color to the sequence randomly
        $('#text').html('Watch the sequence!');
        displayingColor = true;
        random = Math.round(Math.random()*3);
        colors[index] = random;
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
        colors = [];
        round = 1;
        displayingColor = false;
        on = false;
        off = true;
    }

    $('#start').click(function () {

        if(on && !off && !gameOver) {
            $('#start').prop('disabled', true);
            addColorToSequence();
            $('#round').val(round);
        }
        if(gameOver) {
            $('#start').removeClass('btn-warning').addClass('btn-danger').html('START').css('left','13%');
            $('#round').val(0).css('left', '57%');
            reset();
            $('#text').html('Click START to begin!');
            gameOver = false;
            on = true;
            off = false;
        }
    });

    $('.shapes').click(function () {

        if(on && !off && !displayingColor) {

            $(this).animate({opacity: 0.2}, animateInterval).animate({opacity: 1}, 500, function () {

                if (counter < index) {
                    if ($(this).attr('id') === sequence[counter]) {
                        counter++;
                        if (counter === index) {
                            // player put the right sequence
                            round++;
                            $('#round').val(round);
                            addColorToSequence();
                            counter = 0;
                        }

                    } else {
                        $('#text').html('GAME OVER!');
                        gameOver = true;
                        $('#round').val('!!').css('left', '63%');
                        reset();
                        $('#start').prop('disabled', false).removeClass('btn-danger').addClass('btn-warning').html('RESTART').css('left','8%');
                    }
                }
            });

        }

    });

    $('#on').click(function () {
        on = true;
        off = false;
        $('.audio').attr('src', 'sounds/' + sounds[4]).get(0).play();
        $('#text').html('Click START to begin!');
        $('#start').prop('disabled', false);
    });

    $('#off').click(function () {
        on = false;
        off = true;
        reset();
        $('#round').val(0);
        $('#text').html('Click ON to begin!');
    });

    $('.menu').click(function () {
        $(this).toggleClass('menu-click');
    });

    $('.easy').click(function (event) {
        event.preventDefault();
        $('.menu').html('Easy <span class="caret">');
        animateInterval = 1000;
    });

    $('.medium').click(function (event) {
        event.preventDefault();
        $('.menu').html('Medium <span class="caret">');
        animateInterval = 600;
    });

    $('.insane').click(function (event) {
        event.preventDefault();
        $('.menu').html('Insane <span class="caret">');
        animateInterval = 300;
    });

});