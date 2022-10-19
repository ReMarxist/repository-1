let svg = mkSvg();
document.body.appendChild(svg);

let rect = mkRect();
svg.appendChild(rect);

/**
 * Create svg rect
 */
function mkRect() {
    const ns = "http://www.w3.org/2000/svg";
    var rect = document.createElementNS(ns, "rect");
    rect.setAttribute("x", "20");
    rect.setAttribute("y", "20");
    rect.setAttribute("height", "50");
    rect.setAttribute("width", "50");
    rect.setAttribute("fill", "blue");
    rect.setAttribute("stroke", "green");
    rect.setAttribute("rx", "5");
    return rect;
}

/**
 * Create svg
 */
function mkSvg() {
    const ns = "http://www.w3.org/2000/svg";
    let svg = document.createElementNS(ns, "svg");
    return svg;
}