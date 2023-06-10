let draggers = []

Array.from(document.querySelectorAll('.handler')).forEach((el, i) => {

    draggers[i] = new dragHandler({
        area: document.querySelector('svg'),
        handler: el,
        handlerClick: true,
        customCallback: (ev) => {
            let data = bezier.getAttribute('d').matchAll(/(?<mod>M|C)?(?<x>[\d|\.]+),(?<y>[\d|\.]+)/g)
            data = Array.from(data);

            data[1 + i]['groups']['x'] = el.getAttribute('cx')
            data[1 + i]['groups']['y'] = el.getAttribute('cy')

            el.previousElementSibling.setAttribute('x2', el.getAttribute('cx'))
            el.previousElementSibling.setAttribute('y2', el.getAttribute('cy'))

            let string = ''

            data.forEach((el) => {
                string += ` ${el.groups.mod || ''}${el.groups.x},${el.groups.y} `
            })

            bezier.setAttribute('d', string)

            window.setTimeout(updateInput)
        }
    })
})


function updateInput() {
    const x1 = Math.round(draggers[0].get().localPositionClamped.x) / 200
    const y1 = (400 - Math.round(draggers[0].get().localPositionClamped.y) - 100) / 200
    const x2 = Math.round(draggers[1].get().localPositionClamped.x) / 200
    const y2 = (400 - Math.round(draggers[1].get().localPositionClamped.y) - 100) / 200

    const cssString = `cubic-bezier(${x1}, ${y1}, ${x2}, ${y2})`

    output.value = cssString

    let customDisplay = document.querySelector('.customDisplay')

    customDisplay.style.transitionTimingFunction = `cubic-bezier(${x1}, ${y1}, ${x2}, ${y2})`
    customDisplay.setAttribute('style', 'animation-timing-function: ' + cssString)
}

draggers[0].set({
    x: 30,
    y: 130,
    mode: 'relative',
})
draggers[1].set({
    x: 170,
    y: 270,
    mode: 'relative',
})

const length = 60
const presets = [
    {
        name: 'linear',
        x1: 0,
        y1: 0,
        x2: 1,
        y2: 1,
    },
    {
        name: 'ease',
        x1: 0.25,
        y1: 0.1,
        x2: 0.25,
        y2: 1,
    },
    {
        name: 'ease-in',
        x1: 0.42,
        y1: 0,
        x2: 1,
        y2: 1,
    },
    {
        name: 'ease-out',
        x1: 0,
        y1: 0,
        x2: 0.58,
        y2: 1,
    },
    {
        name: 'ease-in-out',
        x1: 0.42,
        y1: 0,
        x2: 0.58,
        y2: 1,
    },
/*     {
        name: 'Slingshot',
        x1: 0.45,
        y1: -0.22,
        x2: 0.85,
        y2: 0,
    }, */
]

// cubic-bezier(0.45, -0.22, 0.85, 0.15)

for (const preset of presets) {
    let x1 = preset.x1 * length
    let y1 = length - preset.y1 * length
    let x2 = preset.x2 * length
    let y2 = length - preset.y2 * length

    document.querySelector('.presets').innerHTML += `
    <button class="preset preset${preset.name}" onclick="setByPreset('${preset.name}')">
        <h3>${preset.name}</h3>
        <svg width="${length}" height="${length}">
            <path d="M0,${length} C${x1},${y1} ${x2},${y2} ${length},0" fill="none"></path>
        </svg>
    </button>
    `
}


function setByPreset(name) {

    for (const preset of presets) {
        if (preset.name == name) {

            x1 = preset.x1 * 200
            y1 = (1 - preset.y1) * 400 - 100
            x2 = preset.x2 * 200
            y2 = (1 - preset.y2) * 400 + 100

            draggers[0].set({
                x: x1,
                y: y1,
                mode: 'relative',
            })
            draggers[1].set({
                x: x2,
                y: y2,
                mode: 'relative',
            })
        }

    }
}