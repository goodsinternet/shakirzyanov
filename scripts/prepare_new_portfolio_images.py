#!/usr/bin/env python3
"""Подготовка 4 новых скриншотов портфолио:
   1) обрезка служебных полос (кромка браузера);
   2) конвертация PNG → WebP (как у остальных ассетов);
   3) сохранение в public/assets/ с постоянными именами.
Имена на выходе:
   portfolio-bookingbot.webp  (Запись к специалисту — Telegram-бот)
   portfolio-bloombeauty.webp (Квиз-воронка BLOOM Beauty)
   portfolio-lumiere.webp     (Интернет-магазин LUMIÈRE)
   portfolio-morozovfit.webp  (Лендинг MOROZOV.FIT)
"""
from PIL import Image
import os

SRC = "/home/z/my-project/upload"
DST = "/home/z/my-project/public/assets"

# (исходник, выход, обрезка top, обрезка right)
JOBS = [
    ("Запись к специалисту.png", "portfolio-bookingbot.webp", 0, 0),
    ("Квиз воронка.png", "portfolio-bloombeauty.webp", 0, 0),
    ("И М.png", "portfolio-lumiere.webp", 35, 0),   # тёмная кромка сверху 35px
    ("Фитнес.png", "portfolio-morozovfit.webp", 3, 0),  # серая кромка сверху 3px
]

os.makedirs(DST, exist_ok=True)

for src_name, dst_name, crop_top, crop_right in JOBS:
    src_path = os.path.join(SRC, src_name)
    dst_path = os.path.join(DST, dst_name)
    im = Image.open(src_path).convert("RGB")
    w, h = im.size
    box = (0, crop_top, w - crop_right, h)
    im = im.crop(box)
    im.save(dst_path, "WEBP", quality=82, method=6)
    kb = os.path.getsize(dst_path) / 1024
    print(f"{src_name} {w}x{h} -> {dst_name} {im.size[0]}x{im.size[1]} ({kb:.0f} КБ)")

print("Готово.")
