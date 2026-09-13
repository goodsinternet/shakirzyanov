#!/usr/bin/env python3
"""Подготовка скриншота ЛидПарсер для карточки портфолио:
обрезка однотонных краёв (если есть) + конвертация в WebP q82."""
from PIL import Image, ImageChops

SRC = "/home/z/my-project/upload/Screenshot_51.png"
DST = "/home/z/my-project/public/assets/portfolio-lidparser.webp"

im = Image.open(SRC).convert("RGB")
w, h = im.size
print("original:", im.size)

# Ищем однотонную рамку по краям (артефакты окон ОС): сравниваем с угловым цветом
bg = im.getpixel((2, 2))

def row_uniform(y):
    row = im.crop((0, y, w, y + 1))
    diff = ImageChops.difference(row, Image.new("RGB", (w, 1), bg))
    return diff.getbbox() is None

def col_uniform(x):
    col = im.crop((x, 0, x + 1, h))
    diff = ImageChops.difference(col, Image.new("RGB", (1, h), bg))
    return diff.getbbox() is None

top = 0
while top < h // 4 and row_uniform(top):
    top += 1
bottom = h
while bottom > 3 * h // 4 and row_uniform(bottom - 1):
    bottom -= 1
left = 0
while left < w // 4 and col_uniform(left):
    left += 1
right = w
while right > 3 * w // 4 and col_uniform(right - 1):
    right -= 1

if (left, top, right, bottom) != (0, 0, w, h):
    print("crop border:", (left, top, right, bottom))
    im = im.crop((left, top, right, bottom))
else:
    print("no uniform border found")

print("final:", im.size)
im.save(DST, "WEBP", quality=82, method=6)

import os
print("saved:", DST, os.path.getsize(DST) // 1024, "KB")
