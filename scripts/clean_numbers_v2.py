"""
v2: убирает фейковые метрики из скриншотов демо-кейсов (поверх бэкапов оригиналов).

Методы:
  - laplace_fill: заполняет зону решением уравнения Лапласа (сшивка со всеми
    4 сторонами) — для гладких градиентных фонов;
  - clone: копия чистого участка с растушёванной маской — для карточки GutHealth.

Перед работой восстанавливает оригиналы из recon/img-backups.
"""

import shutil
from PIL import Image, ImageDraw, ImageFilter
import numpy as np

ASSETS = "/home/z/my-project/public/assets"
BACKUPS = "/home/z/my-project/recon/img-backups"
TMP = "/home/z/my-project/scripts/tmp"


def laplace_fill(im: Image.Image, box, ring: int = 3, iters: int = 4000, feather: int = 5) -> Image.Image:
    """Заполнить box гармонической интерполяцией по кольцу границы (4 стороны)."""
    x1, y1, x2, y2 = box
    a = np.asarray(im).astype(np.float64)
    top_b = a[y1 - ring:y1, x1 - ring:x2 + ring].mean(axis=0)   # (w+2r, 3)
    bot_b = a[y2:y2 + ring, x1 - ring:x2 + ring].mean(axis=0)
    left_b = a[y1:y2, x1 - ring:x1].mean(axis=1)                # (h, 3)
    right_b = a[y1:y2, x2:x2 + ring].mean(axis=1)               # (h, 3)
    h, w = y2 - y1, x2 - x1
    top_i, bot_i = top_b[ring:ring + w], bot_b[ring:ring + w]
    t = np.linspace(0, 1, h)[:, None, None]
    s = np.linspace(0, 1, w)[None, :, None]
    f = (top_i[None] * (1 - t) + bot_i[None] * t + left_b[:, None] * (1 - s) + right_b[:, None] * s) / 2.0
    for _ in range(iters):
        f[1:-1, 1:-1] = 0.25 * (f[:-2, 1:-1] + f[2:, 1:-1] + f[1:-1, :-2] + f[1:-1, 2:])
    fill_full = a.copy()  # вне зоны — оригинал, чтобы маска не затемняла периметр
    fill_full[y1:y2, x1:x2] = f
    mask = np.zeros((im.height, im.width), dtype=np.float64)
    mask[y1:y2, x1:x2] = 1.0
    m = Image.fromarray((mask * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(feather))
    m = np.asarray(m).astype(np.float64)[:, :, None] / 255.0
    out = (a * (1 - m) + fill_full * m).clip(0, 255).astype(np.uint8)
    return Image.fromarray(out)


def clone(im: Image.Image, src_box, dst_xy, feather: int = 4) -> Image.Image:
    region = im.crop(src_box)
    mask = Image.new("L", region.size, 0)
    d = ImageDraw.Draw(mask)
    d.rectangle([feather, feather, region.size[0] - feather, region.size[1] - feather], fill=255)
    mask = mask.filter(ImageFilter.GaussianBlur(feather))
    im.paste(region, dst_xy, mask)
    return im


def main() -> None:
    # 0. восстановить оригиналы из бэкапов
    for f in ("portfolio-assistpilot-ycRJK9zE.png", "portfolio-cardmaster-WqCr9oT_.png", "portfolio-guthealth.webp"):
        shutil.copy(f"{BACKUPS}/{f}", f"{ASSETS}/{f}")

    # 1. «Второй пилот»: текст 10K+/500K+/98% в x345-805, y636-712 → лаплас
    p = f"{ASSETS}/portfolio-assistpilot-ycRJK9zE.png"
    im = Image.open(p).convert("RGB")
    im = laplace_fill(im, (330, 618, 820, 728), ring=3, iters=4000, feather=5)
    im.save(p, optimize=True)
    print("cleaned:", p)

    # 2. CardMaker: текст 90%/90% в x295-720, y840-940 → лаплас + webp-версия
    p = f"{ASSETS}/portfolio-cardmaster-WqCr9oT_.png"
    im = Image.open(p).convert("RGB")
    im = laplace_fill(im, (283, 826, 732, 948), ring=3, iters=4000, feather=5)
    im.save(f"{ASSETS}/portfolio-cardmaster.webp", "WEBP", quality=90, method=6)
    print("cleaned:", f"{ASSETS}/portfolio-cardmaster.webp")

    # 3. GutHealth: бейдж «15k» → клон; плашка «15 000 человек» → лаплас
    p = f"{ASSETS}/portfolio-guthealth.webp"
    im = Image.open(p).convert("RGB")
    # 3а. бейдж (x1012-1047, y148-184): клон чистой зоны правее
    im = clone(im, (1060, 138, 1112, 196), (1006, 138), feather=3)
    # 3б. плашка (x770-1148, y198-252): лаплас между аватарками и заголовком
    im = laplace_fill(im, (762, 193, 1160, 256), ring=3, iters=4000, feather=3)
    im.save(p, "WEBP", quality=90, method=6)
    print("cleaned:", p)

    # убрать старый png CardMaker (заменён на webp)
    import os
    old = f"{ASSETS}/portfolio-cardmaster-WqCr9oT_.png"
    if os.path.exists(old):
        os.remove(old)
        print("removed:", old)

    # 4. контрольные кропы для визуальной проверки
    Image.open(f"{ASSETS}/portfolio-assistpilot-ycRJK9zE.png").crop((150, 500, 1050, 850)).save(f"{TMP}/check_ap.png")
    Image.open(f"{ASSETS}/portfolio-cardmaster.webp").crop((150, 740, 900, 1024)).save(f"{TMP}/check_cm.png")
    Image.open(f"{ASSETS}/portfolio-guthealth.webp").crop((600, 60, 1400, 320)).save(f"{TMP}/check_gh.png")
    print("check crops saved")


if __name__ == "__main__":
    main()
