let div = addDiv();
let svg = addSvg(div);

addTableScenario();

function addTableScenario() {
    let header = null;
    let dataRows = null;
    addTable(svg, "FortuneGlobal", { x: 50, y: 50 }, header, dataRows);
}

function addControlButtonScenario() {
    let rect = addRect(svg, { x: 10, y: 50 });
    let button = addRect(svg, { x: 100, y: 100 });
    button.style.cursor = "pointer";
    button.id = "controlButton";

    let logicalX = { val: 0 };
    button.addEventListener("click", () => {
        toggle(logicalX);
        let target = {
            x: 10 + logicalX.val * 50,
            y: 50,
        };
        animate(rect, target);
    });
}