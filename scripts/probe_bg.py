"""Пробник: печать цветов фона вдоль линий через зоны правки (по бэкапам)."""
from PIL import Image
import numpy as np

B = "/home/z/my-project/recon/img-backups"


def probe(path, desc, hline=None, vline=None):
    a = np.asarray(Image.open(path).convert("RGB")).astype(int)
    print("=" * 20, desc)
    if hline:
        y, xs, xe, st = hline
        row = a[y, xs:xe:st]
        print(f"H y={y}: ", " | ".join(f"x{x}:{tuple(c)}" for x, c in zip(range(xs, xe, st), row)))
    if vline:
        x, ys, ye, st = vline
        col = a[ys:ye:st, x]
        print(f"V x={x}: ", " | ".join(f"y{y}:{tuple(c)}" for y, c in zip(range(ys, ye, st), col)))


probe(f"{B}/portfolio-assistpilot-ycRJK9zE.png", "assistpilot",
      hline=(670, 240, 960, 40), vline=(560, 540, 820, 20))
probe(f"{B}/portfolio-cardmaster-WqCr9oT_.png", "cardmaster",
      hline=(885, 160, 880, 40), vline=(500, 760, 1020, 20))
probe(f"{B}/portfolio-guthealth.webp", "guthealth",
      hline=(222, 700, 1300, 50), vline=(950, 120, 300, 15))
