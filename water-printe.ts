interface WaterPrinteOptions {
  zIndex?: number;
  rotate?: number;
  width?: number;
  height?: number;
  color?: string;
  font?: string;
}

const defaultOptions: WaterPrinteOptions = {
  zIndex: 999999,
  rotate: -20,
  width: 150,
  height: 80,
  font: "14px Microsoft JhengHei",
  color: "rgba(0 , 0, 0, 0.2)",
};

export default function waterPrinte(
  text: string,
  el: any = "body",
  options = {} as WaterPrinteOptions
) {
  const mergeOptions: any = { ...defaultOptions, ...options };
  let node: any;
  if (typeof el === "object") {
    node = el;
  } else if (typeof el === "string") {
    node = window.document.querySelector(el);
  }

  if (!node) {
    console.error("[WaterPrinte warn]: No nodes found.");
    return;
  }

  // 记录上一次 position overflow 属性
  const oldPosition: string = node.style.position;
  const oldOverflow: string = node.style.overflow;
  node.style.position = "relative";
  node.style.overflow = "hidden";

  const canvas: any = document.createElement("canvas");
  const { width, height } = window.getComputedStyle(node);
  const elWidth: number = parseInt(width);
  const elHeight: number = parseInt(height);
  node.appendChild(canvas);
  const context: any = canvas.getContext("2d");

  canvas.style.top = 0;
  canvas.style.zIndex = 999999;
  canvas.style.position = "absolute";
  canvas.style.pointerEvents = "none";

  canvas.width = elWidth;
  canvas.height = elHeight;

  if (context) {
    context.rotate((mergeOptions.rotate * Math.PI) / 180);
    context.font = mergeOptions.font;
    context.fillStyle = mergeOptions.color;
    context.textAlign = "center";
    context.textBaseline = "middle";

    const { width: itemW, height: itemH } = mergeOptions;
    let x = -(elWidth / 2);
    while (x < elWidth) {
      let y = 0;
      while (y < elHeight * 2) {
        context.fillText(text, x, y);
        y += itemH;
      }
      x += itemW;
    }
  }

  return () => {
    node.removeChild(canvas);
    node.style.position = oldPosition;
    node.style.overflow = oldOverflow;
  };
}
