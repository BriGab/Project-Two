$(document).ready(function () {
    $("#mood").on("click", function () {
        $("#select-mood").on("change", bgChoice(event));
    });
    function bgChoice(event) {
        event.preventDefault();
        var value = $("#select-mood").val();
        if (value == "Sad") {
            console.log(value);
            granimInstance.changeState('sad-state');
        } else if (value == "Angry") {
            granimInstance.changeState('angry-state');
        } else {
            granimInstance.changeState('cheerful-state');
        }
    }
    var granimInstance = new Granim({
        element: '#canvas-basic',
        direction: 'radial',
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
                    ['#000000', '#738996'],
                    ['#485f6e', '#eeeeee']
                ],
                transitionSpeed: 8000
            },
            "angry-state": {
                gradients: [
                    ['#fb7925', '#b16a3d'],
                    ['#7b0004', '#b1174b']
            ],
                loop: false
            },
            "sad-state": {
                gradients: [
                    ['#29323c', '#485563'],
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