import { bind } from "size-sensor";

interface WaterPrinteOptions {
  zIndex?: number;
  rotate?: number;
  width?: number;
  height?: number;
  color?: string;
  font?: string;
}

/**
 * 处理 DOM 变更
 * @param node
 * @param canvas
 * @param context
 * @param options
 * @param text
 */
function handleSizeChange(
  node: any,
  canvas: any,
  context: any,
  options: any,
  text: string
) {
  return (element: any) => {
    fillCanvas(node, canvas, context, options, text);
  };
}

/**
 * 填充画布，将文字绘在画布上
 * @param node
 * @param canvas
 * @param context
 * @param options
 * @param text
 */
function fillCanvas(
  node: any,
  canvas: any,
  context: any,
  options: any,
  text: string
) {
  const { width, height } = window.getComputedStyle(node);
  const elWidth: number = parseInt(width);
  const elHeight: number = parseInt(height);
  canvas.width = elWidth;
  canvas.height = elHeight;

  if (context) {
    context.clearRect(0, 0, elWidth * 3, elHeight * 5);
    context.rotate((options.rotate * Math.PI) / 180);
    context.font = options.font;
    context.fillStyle = options.color;
    context.textAlign = "center";
    context.textBaseline = "middle";

    const { width: itemW, height: itemH } = options;
    let x = -(elWidth / 2);
    while (x < elWidth * 2) {
      let y = 0;
      while (y < elHeight * 4) {
        context.fillText(text, x, y);
        y += itemH;
      }
      x += itemW;
    }
  }
}

const defaultOptions: WaterPrinteOptions = {
  zIndex: 999999,
  rotate: -20,
  width: 200,
  height: 200,
  font: "14px Microsoft JhengHei",
  color: "rgba(0 , 0, 0, 0.15)"
};

export default function waterPrinte(
  text: string = "药研社",
  el: any = "body",
  options: WaterPrinteOptions = {}
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
  node.appendChild(canvas);
  const context: any = canvas.getContext("2d");

  fillCanvas(node, canvas, context, mergeOptions, text);
  canvas.style.top = 0;
  canvas.style.zIndex = 999999;
  canvas.style.position = "absolute";
  canvas.style.pointerEvents = "none";

  const unbind: any = bind(
    node,
    handleSizeChange(node, canvas, context, mergeOptions, text)
  );

  return () => {
    if (node) {
      node.removeChild(canvas);
      node.style.position = oldPosition;
      node.style.overflow = oldOverflow;
      if (unbind) {
        unbind();
      }
    }
  };
}
