'''
The following script is used to generate a report on all images contained within the website,
including the size of each image and its dimensions
'''

from pathlib import Path
from PIL import Image

IMAGE_EXTENSIONS = {'.png', '.jpg', '.jpeg', '.gif', '.bmp', '.tiff', '.webp'}

WEBSITE_DIRECTORY = Path(__file__).parent.parent / "docs"

REPORT_FILE = Path(__file__).parent / "Image_Report.txt"

# Decompression Warning for large images
Image.MAX_IMAGE_PIXELS = 200000000

def find_images():
    image_list = []
    total_size = 0
    total_size_units = "KB"

    for image in WEBSITE_DIRECTORY.rglob("*"):
        # Do not check the _site directory or the image original directory
        if ("_site" not in image.parts) and (image.suffix.lower() in IMAGE_EXTENSIONS):
            file_path = image.relative_to(WEBSITE_DIRECTORY)  
            file_size = image.stat().st_size

            #kB size
            display_size = file_size / 1024
            size_units = "KB"

            total_size = total_size + display_size
            
            if display_size > 1024:
                display_size = display_size / 1024
                size_units = "MB"
            
            # Get image dimensions
            try:
                with Image.open(image) as img:
                    width, height = img.size
            except Exception as e:
                width, height = 0, 0

            image_list.append({"Path" : file_path, 
                               "Display": f"Size: {display_size:.3f} {size_units}", 
                               "Size": file_size,
                               "Dimensions":  f"{width} x {height}"
                               })
    image_list = sorted(image_list, key=lambda x: x["Size"], reverse=True)

    if total_size > 1024:
        total_size = total_size / 1024
        total_size_units = "MB"

    with open(REPORT_FILE, 'w') as f:
        f.write("Image File Report\n")
        f.write(f"Total size: {total_size:.3f} {total_size_units}\n")
        f.write("=" * 50 + "\n")
        for image in image_list:
            f.write(f"Path: {image['Path']}\n")
            f.write(image["Display"] + f'\t{image["Dimensions"]}\n')
            f.write("-" * 50 + "\n")
    
find_images()
