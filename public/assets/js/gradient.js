
$("#mood").on("click", function () {
    $("#select-mood").on("change", bgChoice(event));
});

function bgChoice(event) {
    event.preventDefault();
    var value = $("#select-mood").val();
    console.log(value);
    gradientSelection(value);
}

function gradientSelection(value) {
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
                ['#D19592', '#8E54E9']
            ],
            transitionSpeed: 2000
        },
        "angry-state": {
            gradients: [
                ['#FF4E50', '#F9D423'],
                ['#cf2941', '#C81F70']],
            transitionSpeed: 10000
        },
        "surprised-state": {
            gradients: [
                ['#B0F3F1', '#FFCFDF'],
                ['#FF6B6B', '#556270'],
                ['#C81F70', '#D19592']
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
                ['#FB7BA2', '#FCE043'],
                ['#FFDD00', '#FBB034']
            ],
            transitionSpeed: 10000
        }
    }
});
