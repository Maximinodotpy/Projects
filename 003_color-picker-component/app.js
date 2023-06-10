class colorPicker extends HTMLElement {
    connectedCallback() {
        const shadow = this.attachShadow({ mode: 'open' });
        shadow.innerHTML = template.innerHTML

        this.panel = shadow.querySelector('.panel');
        this.colorGradient = shadow.querySelector('.colorGradient canvas');
        this.colorGradientSelector = shadow.querySelector('.colorGradientSelector');
        this.mainButton = shadow.querySelector('.mainButton');
        this.huePicker = shadow.querySelector('.huePicker');
        this.huePickerSelector = shadow.querySelector('.huePickerSelector');

        this.ctx = 

        this.currentHue
        this.position = { x: 0, y: 0 }
        this.currentColor = this.getAttribute('value') || 'rgb(248, 79, 106)'

        this.mainButton.setAttribute('value', this.currentColor);

        this.setColor()

        this.panel.style.display = 'flex'

        this.dragHandler(
            this.colorGradient,
            this.colorGradientSelector,
            (data) => {
                this.position = data
                this.getColor()
            }
        )

        this.dragHandler(
            this.huePicker,
            this.huePickerSelector,
            (data) => {
                const heightPercent = data.y / data.areaHeight
                this.currentHue = 360 * heightPercent

                this.resetCanvas();
                this.getColor();
            },
            true
        )

        this.panel.style.display = 'none'

        this.mainButton.onkeyup = () => { this.setColor() }

        this.mainButton.addEventListener('pointerdown', () => {
            this.panel.style.display = 'flex'
        })
        document.addEventListener('pointerdown', (ev) => {
            if (!this.contains(ev.target)) this.panel.style.display = 'none';
        })
    }

    setColor() {
        try {
            const tempCol = new Color(this.mainButton.value);

            // Set the Hue Range
            this.currentHue = tempCol.hwb[0] || 0;

            const degPercent = tempCol.hwb[0] / 360;

            const { height } = this.huePicker.getBoundingClientRect();

            const heightPerc = height * degPercent;
            this.huePickerSelector.style.top = heightPerc + 'px';

            this.resetCanvas();

            // Set the Gradient Position
            const data = this.colorGradient.getContext('2d').getImageData(
                0, 0,
                this.colorGradient.width,
                this.colorGradient.height,
            ).data


            let distance = 1000

            let r1 = tempCol.r * 255
            let g1 = tempCol.g * 255
            let b1 = tempCol.b * 255

            let x = 0
            let y = 0

            console.log('Searching for ...', r1, g1, b1);

            for (let i = 0; i < data.length; i += 4) {
                /* console.log(data[i]); */

                let r2 = data[i]
                let g2 = data[i + 1]
                let b2 = data[i + 2]

                const calculatedDistance = Math.sqrt((r2 - r1) ** 2 + (g2 - g1) ** 2 + (b2 - b1) ** 2)

                if (calculatedDistance < distance) {
                    /* console.log('Found smaller match ...', r2, g2, b2); */
                    distance = calculatedDistance;
                    x = (i / 4) % this.colorGradient.width;
                    y = Math.floor((i / 4) / this.colorGradient.width);
                }
            }

            this.position.x = x;
            this.position.y = y;

            this.colorGradientSelector.style.left = (x - 5) + 'px'
            this.colorGradientSelector.style.top = (y - 5) + 'px'

            this.getColor()

            console.log(this.colorGradient.width);
            console.log(this.colorGradient.height);


            // Calculate distance of the colors
            //https://en.wikipedia.org/wiki/Color_difference
            "https://stackoverflow.com/questions/9018016/how-to-compare-two-colors-for-similarity-difference"

        } catch (error) {
            console.log(error);
        }

    }

    clamp(value, min, max) {
        if (value < min) return min
        if (value > max) return max
        return value
    }

    getColor() {
        var ctx = this.colorGradient.getContext("2d");

        const x = this.clamp(this.position.x, 0, this.colorGradient.width)
        const y = this.clamp(this.position.y, 0, this.colorGradient.height)

        let data = ctx.getImageData(x, y, 1, 1).data
        let colorString = `rgb(${data[0]}, ${data[1]}, ${data[2]})`

        const median = (data[0] + data[1] + data[3]) / 3
        this.mainButton.style.color = median > 160 ? 'black' : 'white'

        if (document.activeElement != this) this.mainButton.value = colorString;
        this.mainButton.style.backgroundColor = colorString;

        this.currentColor = new Color(colorString)
    }

    resetCanvas() {
        var ctx = this.colorGradient.getContext("2d");

        const { width, height } = ctx.canvas

        const color = `hwb(${this.currentHue} 0% 0%)`;
        const tr = 'rgba(0, 0, 0, 0)'

        // Clear Canvas
        ctx.clearRect(0, 0, width, height)

        // Create Light Gradient
        let vGradient = ctx.createLinearGradient(0, 0, width, 0);
        vGradient.addColorStop(1 / 255, "white");
        vGradient.addColorStop(0.739, color);

        ctx.fillStyle = vGradient;
        ctx.fillRect(0, 0, width, height);

        // Create Dark Gradient
        let hGradient = ctx.createLinearGradient(0, 0, 0, height);
        hGradient.addColorStop(1 / 255, tr);
        hGradient.addColorStop(1, "black");

        ctx.fillStyle = hGradient;
        ctx.fillRect(0, 0, width, height);
    }

    dragHandler(area, handler, extraCallback, lockX) {

        const setCallback = (ev) => {
            if (!clicked) return

            let { x, y, width, height } = area.getBoundingClientRect()


            const relx = ev.x - x;
            const rely = ev.y - y;

            console.log(relx);

            x = this.clamp(relx - handlerWidth / 2, -handlerWidth / 2, width - handlerWidth / 2);
            y = this.clamp(rely - handlerHeight / 2, -handlerHeight / 2, height - handlerHeight / 2);

            console.log(x);
            console.log(-handlerWidth / 2);

            if (lockX) x = 0

            handler.style.left = x + 'px';
            handler.style.top = y + 'px';

            extraCallback({
                x: this.clamp(relx, 0, width - handlerWidth / 2),
                y: area.tagName == 'CANVAS' ? this.clamp(rely / height, 0, 1) * area.height : this.clamp(rely, 0, height - handlerHeight / 2),
                areaHeight: height,
                areaWidth: width,
            })
        }

        let clicked = false;
        const { width: handlerWidth, height: handlerHeight } = handler.getBoundingClientRect()

        document.addEventListener('pointermove', setCallback)

        area.addEventListener('pointerdown', (ev) => {
            clicked = true
            document.body.style.userSelect = 'none';
            setCallback(ev)
        })

        document.addEventListener('pointerup', () => {
            clicked = false;
            document.body.style.userSelect = 'unset';
        })
    }
}

customElements.define('color-picker', colorPicker);