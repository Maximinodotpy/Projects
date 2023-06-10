async function getData() {
    let d = await fetch("css.json");
    d = await d.json();
    return d;
}


async function quiz() {

    // Edit Data
    const DATA = await getData()

    let dataPool = { ...DATA }

    let rightAnswer = ''

    // Get Elements
    const input = document.querySelector('.inputContainer input')
    const description = document.querySelector('.description')
    const inputContainer = document.querySelector('.inputContainer')
    const docLink = document.querySelector('.docLink')
    const continueButton = document.querySelector('button')

    // Connect Events
    document.body.addEventListener('keyup', keyCallBack)
    continueButton.addEventListener('click', keyCallBack)


    // Colors
    const normalColor = 'rgb(40, 40, 40)'
    const wrongColor = 'rgb(164, 46, 46)'
    const rightColor = 'rgb(46, 164, 54)'

    const continueKeys = ['Enter', 'ArrowRight']

    let keys = Object.keys(dataPool)
    shuffleArray(keys)

    next()


    function checkAnswer() {
        /* if (input.value == '') return */

        input.disabled = true;
        document.body.focus()

        if (input.value == rightAnswer) {
            inputContainer.style.backgroundColor = rightColor
        } else {
            inputContainer.style.backgroundColor = wrongColor;
            input.value = input.value + ' -> ' + rightAnswer;

        }

        docLink.setAttribute('href', DATA[rightAnswer]['link'])
        docLink.style.visibility = 'visible'

    }

    function next() {
        input.disabled = false
        input.focus()
        input.value = ''
        inputContainer.style.backgroundColor = normalColor

        docLink.style.visibility = 'hidden'

        // Refill the key Pool once it dries up.
        if (keys.length == 0) {
            keys = Object.keys(dataPool)
            shuffleArray(keys)
        }

        rightAnswer = keys.splice(0, 1)[0]

        console.log(`length, ${keys.length}`);
        console.log(Object.keys(dataPool).length);

        description.innerHTML = DATA[rightAnswer]['description']
    }

    function keyCallBack(ev) {
        input.focus()

        if (continueKeys.includes(ev.key) || ev.type == 'click') {
            console.log(input.disabled);
            if (input.disabled) {
                next()
            } else {
                checkAnswer()
            }

        }
    }

    function shuffleArray(arr) {
        for (let i = arr.length - 1; i >= 1; i--) {
            let j = Math.floor(Math.random() * (i + 1)); // 0 <= j <= i
            let temp = arr[j];
            arr[j] = arr[i];
            arr[i] = temp;
        }
    }
}

quiz()