'''
The following script is used for two purposes:
First, to generate a report of website image sizes, so that I may find and reduce large images
Second, to generate an image sitemap to support Google Search
'''

from pathlib import Path
from PIL import Image

IMAGE_EXTENSIONS = {'.png', '.jpg', '.jpeg', '.gif', '.bmp', '.tiff', '.webp'}

WEBSITE_URL = "https://ericgong2005.github.io/"

WEBSITE_DIRECTORY = Path(__file__).parent.parent / "docs"

REPORT_FILE = Path(__file__).parent / "Image_Report.txt"

SITEMAP_FILE = Path(__file__).parent.parent / "docs" / "image_sitemap.xml"

# Decompression Warning for large images
Image.MAX_IMAGE_PIXELS = 200000000

def xml_header():
    return """<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
    xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
                        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
"""

def xml_image_entry(url):
    return f"""    <url>
        <loc>{WEBSITE_URL}{url}</loc>
        <changefreq>daily</changefreq>
        <image:image>
            <image:loc>{WEBSITE_URL}{url}</image:loc>
        </image:image>
    </url>
"""

def find_images():
    image_list = []
    for image in WEBSITE_DIRECTORY.rglob("*"):
        # Do not check the _site directory or the image original directory
        if ("_site" not in image.parts) and ("original" not in image.parts) and (image.suffix.lower() in IMAGE_EXTENSIONS):
            file_path = image.relative_to(WEBSITE_DIRECTORY)  
            file_size = image.stat().st_size

            #kB size
            display_size = file_size / 1024
            size_units = "KB"
            
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

    with open(REPORT_FILE, 'w') as f:
        f.write("Image File Report\n")
        f.write("=" * 50 + "\n")
        for image in image_list:
            f.write(f"Path: {image['Path']}\n")
            f.write(image["Display"] + f'\t{image["Dimensions"]}\n')
            f.write("-" * 50 + "\n")
    
    with open(SITEMAP_FILE, 'w') as f:
        f.write(xml_header())
        for image in image_list:
            f.write(xml_image_entry(image["Path"]))
        f.write('</urlset>')
    
find_images()
