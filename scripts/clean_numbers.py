"""
Убирает фейковые метрики, «запечённые» в скриншотах демо-кейсов:
  1. portfolio-assistpilot-ycRJK9zE.png — блок «10K+ / 500K+ / 98%»
  2. portfolio-cardmaster-WqCr9oT_.png  — блок «90% / 90%»
  3. portfolio-guthealth.webp           — плашка «Более 15 000 человек…» и бейдж «15k»

Метод: фон в зонах правки — плавный градиент/размытие, поэтому
  - vfill: по-колоночная вертикальная интерполяция между чистыми полосами
    сверху и снизу зоны (идеально для гладких градиентов);
  - clone: клон чистого участка с растушёванной маской (для карточки с текстурой).
Запускается из корня проекта: python3 scripts/clean_numbers.py
"""

from PIL import Image, ImageDraw, ImageFilter
import numpy as np

ASSETS = "/home/z/my-project/public/assets"


def smooth_rows(arr: np.ndarray, k: int = 21) -> np.ndarray:
    """Сглаживание выборки по горизонтали, чтобы не было ступенек между колонками."""
    if arr.shape[0] == 0:
        return arr
    pad = k // 2
    out = np.empty_like(arr)
    for c in range(arr.shape[1]):
        col = arr[:, c]
        col = np.convolve(np.pad(col, (pad, pad), mode="edge"), np.ones(k) / k, mode="valid")
        out[:, c] = col
    return out


def vfill(im: Image.Image, box, above_h: int = 22, below_h: int = 22, feather: int = 6) -> Image.Image:
    """Залить box вертикальным градиентом, интерполированным между чистыми полосами."""
    x1, y1, x2, y2 = box
    a = np.asarray(im).astype(np.float64)
    top = a[max(0, y1 - above_h):y1, x1:x2].mean(axis=0) if y1 > 0 else a[y2:y2 + below_h, x1:x2].mean(axis=0)
    bot = a[y2:min(im.height, y2 + below_h), x1:x2].mean(axis=0)
    top, bot = smooth_rows(top), smooth_rows(bot)
    h = y2 - y1
    t = np.linspace(0.0, 1.0, h)[:, None, None]
    fill_full = np.zeros_like(a)
    fill_full[y1:y2, x1:x2] = top[None, :, :] * (1 - t) + bot[None, :, :] * t
    mask = np.zeros((im.height, im.width), dtype=np.float64)
    mask[y1:y2, x1:x2] = 1.0
    m = Image.fromarray((mask * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(feather))
    m = np.asarray(m).astype(np.float64)[:, :, None] / 255.0
    out = (a * (1 - m) + fill_full * m).clip(0, 255).astype(np.uint8)
    return Image.fromarray(out)


def clone(im: Image.Image, src_box, dst_xy, feather: int = 5) -> Image.Image:
    """Клонировать чистый участок в целевую зону с растушёванной маской."""
    region = im.crop(src_box)
    mask = Image.new("L", region.size, 0)
    d = ImageDraw.Draw(mask)
    d.rectangle([feather, feather, region.size[0] - feather, region.size[1] - feather], fill=255)
    mask = mask.filter(ImageFilter.GaussianBlur(feather))
    im.paste(region, dst_xy, mask)
    return im


def main() -> None:
    # --- 1. «Второй пилот»: блок 10K+ / 500K+ / 98% (тёмный фиолетовый градиент) ---
    p = f"{ASSETS}/portfolio-assistpilot-ycRJK9zE.png"
    im = Image.open(p).convert("RGB")
    # блок метрик ~x340-860, y630-755 при 1920x1080; фон гладкий → vfill
    im = vfill(im, (330, 618, 880, 762), above_h=20, below_h=24, feather=8)
    im.save(p, optimize=True)
    print("cleaned:", p)

    # --- 2. CardMaker: блок 90% / 90% (тёмный фон с тёплым свечением) ---
    p = f"{ASSETS}/portfolio-cardmaster-WqCr9oT_.png"
    im = Image.open(p).convert("RGB")
    im = vfill(im, (275, 828, 750, 962), above_h=22, below_h=22, feather=8)
    im.save(p, optimize=True)
    print("cleaned:", p)

    # --- 3. GutHealth AI: плашка «15 000 человек» и бейдж «15k» (светлая карточка) ---
    p = f"{ASSETS}/portfolio-guthealth.webp"
    im = Image.open(p).convert("RGB")
    # 3а. плашка: клон чистой полосы между плашкой и заголовком (тайл 2 раза)
    band = (770, 240, 1180, 266)  # чистая зона высотой 26px
    im = clone(im, band, (770, 192), feather=4)
    im = clone(im, band, (770, 216), feather=4)
    # 3б. бейдж «15k»: клон чистой карточки справа от него
    im = clone(im, (1036, 134, 1096, 194), (972, 134), feather=5)
    im.save(p, "WEBP", quality=90, method=6)
    print("cleaned:", p)


if __name__ == "__main__":
    main()
