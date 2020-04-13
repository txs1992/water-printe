interface WaterPrinteOptions {
  zIndex?: number;
  rotate?: number;
  width?: number;
  height?: number;
  color?: string;
  font?: string;
  id?: string;
}

const defaultOptions: WaterPrinteOptions = {
  zIndex: 999999,
  rotate: -30,
  width: 300,
  height: 200,
  font: "14px Microsoft JhengHei",
  color: "rgba(0 , 0, 0, 0.15)",
  id: "water-printe"
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

  const waterPrinteEL: any = document.createElement("div");

  // 设置水印元素相关样式与属性
  waterPrinteEL.id = mergeOptions.id;
  waterPrinteEL.style.position = "fixed";
  waterPrinteEL.style.top = 0;
  waterPrinteEL.style.left = 0;
  waterPrinteEL.style.right = 0;
  waterPrinteEL.style.bottom = 0;
  waterPrinteEL.style.zIndex = mergeOptions.zIndex;
  waterPrinteEL.style.pointerEvents = "none";

  const canvas: any = document.createElement("canvas");
  canvas.width = mergeOptions.width;
  canvas.height = mergeOptions.height;

  const context: any = canvas.getContext("2d");

  if (context) {
    context.rotate((mergeOptions.rotate * Math.PI) / 180);
    context.font = mergeOptions.font;
    context.fillStyle = mergeOptions.color;
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText(text, canvas.width / 3, canvas.height / 2);
  }

  waterPrinteEL.style.backgroundImage = `url(${canvas.toDataURL("image/png")})`;

  node.appendChild(waterPrinteEL);

  return () => {
    node.removeChild(waterPrinteEL);
  };
}
