"""Делает кропы проблемных зон из бэкапов с сеткой 50px для точной разметки."""
from PIL import Image, ImageDraw

ASSETS = "/home/z/my-project/recon/img-backups"
OUT = "/home/z/my-project/scripts/tmp"

import os
os.makedirs(OUT, exist_ok=True)


def grid_crop(src, box, out, step=50):
    im = Image.open(src).convert("RGB").crop(box)
    d = ImageDraw.Draw(im)
    x0, y0 = box[0], box[1]
    w, h = im.size
    # вертикальные линии: кратные step абсолютным координатам
    first_x = ((x0 // step) + 1) * step
    x = first_x
    while x < box[2]:
        d.line([(x - x0, 0), (x - x0, h)], fill=(255, 0, 0), width=1)
        d.text((x - x0 + 2, 2), str(x), fill=(255, 255, 0))
        x += step
    first_y = ((y0 // step) + 1) * step
    y = first_y
    while y < box[3]:
        d.line([(0, y - y0), (w, y - y0)], fill=(255, 0, 0), width=1)
        d.text((2, y - y0 + 2), str(y), fill=(255, 255, 0))
        y += step
    im.save(out)
    print(out, im.size)


grid_crop(f"{ASSETS}/portfolio-assistpilot-ycRJK9zE.png", (200, 520, 1050, 850), f"{OUT}/ap_zone.png")
grid_crop(f"{ASSETS}/portfolio-cardmaster-WqCr9oT_.png", (150, 740, 900, 1024), f"{OUT}/cm_zone.png")
grid_crop(f"{ASSETS}/portfolio-guthealth.webp", (600, 60, 1400, 300), f"{OUT}/gh_zone.png")
