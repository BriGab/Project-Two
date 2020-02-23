$(document).ready(function () {
    $("#mood").on("click", function () {
        $("#select-mood").on("change", bgChoice(event));
    });

    function bgChoice(event) {
        event.preventDefault();
        var value = $("#select-mood").val();
        if (value == "Happy") {
            granimInstance.changeState('cheerful-state');
        } else if (value == "Sad") {
            granimInstance.changeState('sad-state');
        } else if (value == "Angry") {
            granimInstance.changeState('angry-state');
        } else if (value == "Scared") {
            granimInstance.changeState('scared-state');
        } else if (value == "Surprised") {
            granimInstance.changeState('surprised-state');
        } else {
            granimInstance.changeState('cheerful-state');
        }
    }

    var granimInstance = new Granim({
        element: '#canvas-basic',
        direction: 'left-right',
        isPausedWhenNotInView: true,
        states: {
            "default-state": {
                gradients: [
                    ['#B3FFAB', '#12FFF7'],
                    ['#ADD100', '#7B920A'],
                    ['#1A2980', '#26D0CE']
                ],
                transitionSpeed: 10000
            },
            "sad-state": {
                gradients: [
                    ['#9D50BB', '#6E48AA'],
                    ['#4776E6', '#8E54E9']
                ],
                transitionSpeed: 2000
            },
            "angry-state": {
                gradients: [['#FF4E50', '#F9D423']],
                loop: false
            },
            "surprised-state": {
                gradients: [
                    ['#29323c', '#485563'],
                    ['#FF6B6B', '#556270'],
                    ['#f0ab51', '#eceba3']
                ],
                transitionSpeed: 10000
            },
            "scared-state": {
                gradients: [
                    ['#FF6B6B', '#556270'],
                    ['#80d3fe', '#7ea0c4'],
                    ['#f0ab51', '#eceba3']
                ],
                transitionSpeed: 7000
            },
            "cheerful-state": {
                gradients: [
                    [
                        { color: '#833ab4', pos: .2 },
                        { color: '#fd1d1d', pos: .8 },
                        { color: '#38ef7d', pos: 1 }
                    ], [
                        { color: '#40e0d0', pos: 0 },
                        { color: '#ff8c00', pos: .2 },
                        { color: '#ff0080', pos: .75 }
                    ],
                ]
            }
        }
    });
});