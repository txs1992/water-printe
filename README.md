<h1 align="center">
	WaterPrinte
</h1>

> 一个基于 canvas 实现的简单文本水印工具

## npm 使用示例

```js
import waterPrinte from 'water-printe'

waterPrinte('哀木涕 Y009527')
```

## CDN 使用示例

```html
<!-- 记得修改最新的版本号 -->
<script src="https://unpkg.com/water-printe@1.1.2/lib/water-printe.min.js"></script>
<script>
  window.WaterPrinte('哀木涕 Y009527')
</script>
```
> 下图是工具效果

![demo](http://chuantu.xyz/t6/727/1586409738x1031866013.png)


## WaterPrinte 配置

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| ---- | ---- | ---- | ---- | ---- |
| `text` | 显示在水印中的文本 | string | - | `药研社` |
| `el` | 水印需要插入的位置,可以传入 DOM 或者 CSS 选择器 | string/HTMLDOM | - |  | `body` |
| `options` | 水印工具的一些设置项，用于修改样式文字大小密度等 | - | - | - |

## options 选项


| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| ---- | ---- | ---- | ---- | ---- |
| `zIndex` | 水印的层级 | number | - | `999999` |
| `rotate` | 水印文字旋转角度 | number | - | `-20` |
| `width` | 每个文字的区块的宽度，（注意文字是居中的） | number | - | 200 |
| `height` | 每个文字的区块的高度，（注意文字是居中的） | number | - | 200 |
| `font` | 水印文字的字体样式 | string | - | `14px Microsoft JhengHei` |
| `color` | 水印文字的颜色 | string | - | `rgba(0 , 0, 0, 0.15)` |

