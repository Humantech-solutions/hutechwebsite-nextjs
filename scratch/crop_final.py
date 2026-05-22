from PIL import Image

img = Image.open('public/images/media__1779183300714.png')
width, height = img.size

# Symmetric X columns:
# Card 1: [69, 345] (width 276)
# Card 2: [369, 645] (width 276)
# Card 3: [669, 945] (width 276)

# Crop Card 1: Oots partnership
# Fits standard card y-bounds: [188, 418]
card1 = img.crop((69, 188, 345, 418))
card1.save("public/images/partner-card-oots.png")
print("Saved Card 1 to public/images/partner-card-oots.png")

# Crop Card 2: Maconsus partnership
# Starts higher because of the text in the image: [145, 418]
card2 = img.crop((369, 145, 645, 418))
card2.save("public/images/partner-card-maconsus.png")
print("Saved Card 2 to public/images/partner-card-maconsus.png")

# Crop Card 3: Nasscom certificate
# Fits standard card y-bounds: [188, 418]
card3 = img.crop((669, 188, 945, 418))
card3.save("public/images/partner-card-nasscom.png")
print("Saved Card 3 to public/images/partner-card-nasscom.png")
