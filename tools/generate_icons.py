from pathlib import Path
from PIL import Image, ImageDraw

root = Path(r"d:\projects\coffee\public")
root.mkdir(exist_ok=True)


def make_icon(size, background=(18, 12, 10, 255), cream=(245, 235, 221, 255), accent=(231, 180, 123, 255), bean=(28, 18, 13, 255)):
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    pad = int(size * 0.12)
    radius = int(size * 0.28)
    draw.rounded_rectangle((pad, pad, size - pad, size - pad), radius=radius, fill=background)

    inner = int(size * 0.18)
    draw.ellipse((inner, inner, size - inner, size - inner), fill=cream)

    draw.ellipse((int(size * 0.28), int(size * 0.28), int(size * 0.72), int(size * 0.72)), fill=bean)
    draw.arc((int(size * 0.37), int(size * 0.34), int(size * 0.63), int(size * 0.66)), start=180, end=360, fill=cream, width=max(2, size // 26))

    for x, start in [(size * 0.36, 190), (size * 0.5, 210), (size * 0.64, 190)]:
        draw.arc((x - 26, int(size * 0.15), x + 26, int(size * 0.15) + 62), start=start, end=360, fill=accent, width=max(3, size // 44))

    draw.arc((int(size * 0.38), int(size * 0.52), int(size * 0.62), int(size * 0.68)), start=200, end=340, fill=accent, width=max(2, size // 40))
    return img

for size in [16, 32, 48]:
    make_icon(size).save(root / f"favicon-{size}x{size}.png")

make_icon(180).save(root / "apple-touch-icon.png")
make_icon(512).save(root / "maskable-icon.png")

icons = [make_icon(size) for size in [16, 32, 48]]
icons[0].save(root / "favicon.ico", format="ICO", sizes=[(16, 16), (32, 32), (48, 48)])
print("Icons generated:")
for path in sorted(root.glob("*")):
    if "favicon" in path.name or "apple" in path.name or "maskable" in path.name:
        print(path.name)
