class QueryInput {
    static create() {
        let query = new QueryInput();
        query.addQuerySvg();
        query.addCaret();
        query.addMeasurementText();
        query.animateCaret();
        query.addQuery();
        query.addShadowInput();
    }

    constructor() {
        /** @type {SVGSVGElement} */
        this.svg = null;
        /** @type {SVGLineElement} */
        this.caret = null;
        this.caretPosition = 0;
        /** @type {HTMLInputElement} */
        this.shadowInput = null;
        /**
         * `<text>` containing query 
         * @type {SVGTextElement}
         */
        this.query = null;
        /**
         * `<text>` for measurement text width
         * @type {SVGTextElement}
         */
        this.measurementText = null;
    }

    addQuerySvg() {
        this.svg = createSvgElement("svg");
        restyle(this.svg, {
            position: "fixed",
            left: "0",
            bottom: "0",
            width: "100%",
            height: "100px",
            backgroundColor: "white",
            borderTop: "3px #eaeaea solid",
            font: "18px system-ui",
        });
        document.body.appendChild(this.svg);
    }

    /**
     * Add editing caret to query input
     */
    addCaret() {
        const caretHeight = 30;
        this.caret = addLine(this.svg);
        let x = this.svg.clientWidth / 2;
        let middle = this.svg.clientHeight / 2;
        setAttributes(this.caret, {
            "x1": x,
            "y1": middle - caretHeight / 2,
            "x2": x,
            "y2": middle + caretHeight / 2,
            "stroke": "black",
        });
    }

    addMeasurementText() {
        this.measurementText = addText(this.svg, "");
    }

    /**
     * Add blinking animation to caret
     */
    animateCaret() {
        let animate = addAnimate(this.caret);
        setAttributes(animate, {
            "attributeName": "stroke-opacity",
            "values": "1;1;1;0;0;0",
            "dur": "1s",
            "repeatCount": "indefinite",
        });
    }

    /**
     * Add `<text>` containing user query
     */
    addQuery() {
        this.query = addText(this.svg, "");
    }

    /**
     * Add invisible `<input>` to read user input
     */
    addShadowInput() {
        this.shadowInput = document.createElement("input");
        document.body.appendChild(this.shadowInput);
        this.shadowInput.style.opacity = "0";
        this.shadowInput.focus();
        this.shadowInput.addEventListener("input", event => {
            this.onInput();
        });
        this.shadowInput.addEventListener("blur", () => {
            this.shadowInput.focus();
        })
    }

    onInput() {
        this.updateQuery();
        this.updateCaret();
    }

    /**
     * Update query content
     */
    updateQuery() {
        this.query.textContent = this.shadowInput.value;
        place(this.query, {
            x: this.inputX,
            y: (this.svg.clientHeight / 2),
        });
    }

    updateCaret() {
        let textBeforeCaret = this.shadowInput.value.substring(0, this.caretPosition);
        this.measurementText.textContent = textBeforeCaret;
        let widthBeforeCaret = getWidth(this.measurementText);
        let x = this.inputX + widthBeforeCaret;
        setAttributes(this.caret, {
            "x1": x,
            "x2": x,
        });
    }

    get inputX() {
        return (this.svg.clientWidth - getWidth(this.query)) / 2;
    }
}