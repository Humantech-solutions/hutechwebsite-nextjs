from PIL import Image

img = Image.open('public/images/media__1779183300714.png')
width, height = img.size
print(f"Image size: {width}x{height}")

rgb_img = img.convert('RGB')

# Let's find columns containing non-white pixels in the range y=180 to height-5
non_white_cols = []
for x in range(width):
    has_non_white = False
    for y in range(180, height - 5):
        r, g, b = rgb_img.getpixel((x, y))
        # if pixel is not white
        if r < 253 or g < 253 or b < 253:
            has_non_white = True
            break
    if has_non_white:
        non_white_cols.append(x)

# Group consecutive columns
cards = []
if non_white_cols:
    start = non_white_cols[0]
    for i in range(1, len(non_white_cols)):
        if non_white_cols[i] - non_white_cols[i-1] > 10:
            cards.append((start, non_white_cols[i-1]))
            start = non_white_cols[i]
    cards.append((start, non_white_cols[-1]))

for i, (x_start, x_end) in enumerate(cards):
    print(f"Detected Card {i+1}: x_start={x_start}, x_end={x_end}")

# Now let's crop and save each card
# Let's also scan the y range for each card to crop it tightly
for i, (x_start, x_end) in enumerate(cards):
    # Find y start and y end for this card
    y_coords = []
    for y in range(150, height):
        has_content = False
        for x in range(x_start, x_end + 1):
            r, g, b = rgb_img.getpixel((x, y))
            if r < 253 or g < 253 or b < 253:
                has_content = True
                break
        if has_content:
            y_coords.append(y)
    
    if y_coords:
        y_start = y_coords[0]
        y_end = y_coords[-1]
        print(f"Card {i+1} vertical range: y_start={y_start}, y_end={y_end}")
        
        # Crop card with a tiny padding
        cropped_img = img.crop((max(0, x_start - 2), max(0, y_start - 2), min(width, x_end + 2), min(height, y_end + 2)))
        cropped_img.save(f"public/images/partner-showcase-card-{i+1}.png")
        print(f"Saved card {i+1} as public/images/partner-showcase-card-{i+1}.png")
