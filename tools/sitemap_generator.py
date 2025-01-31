'''
The following script is used to generate a sitemap
'''

from pathlib import Path
import re

IMAGE_EXTENSIONS = {'.png', '.jpg', '.jpeg', '.gif', '.bmp', '.tiff', '.webp'}
WEBSITE_URL = "https://ericgong2005.github.io/"
WEBSITE_IMAGE_DIRECTORY = Path(__file__).parent.parent / "docs" / "assets" / "images"
WEBSITE_BUILD_DIRECTORY = Path(__file__).parent.parent / "docs" / "_site"
SITEMAP_FILE = Path(__file__).parent.parent / "docs" / "sitemap.xml"

def xml_header():
    return """<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
    xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
                        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
"""

def xml_page_entry(page, image_entry, change):
    return f"""    <url>
        <loc>{WEBSITE_URL}{page}</loc>
        <changefreq>{change}</changefreq>
{image_entry}    </url>
"""

def xml_image_entry(url, title=None):
    format_title = ""
    if title != None:
        format_title = f"\n\t\t\t<image:title>{title}</image:title>"
    return f"""        <image:image>
            <image:loc>{WEBSITE_URL}{url}</image:loc>{format_title}
        </image:image>
"""

def image_sitemap(page_path):
    image_dict = {}

    page_path = WEBSITE_BUILD_DIRECTORY / page_path
    search_directory = WEBSITE_IMAGE_DIRECTORY / (page_path.stem)

    # Find all images in the website
    for file in search_directory.rglob("*"):
        if file.suffix.lower() in IMAGE_EXTENSIONS:
            file_path = "assets/images/" / file.relative_to(WEBSITE_IMAGE_DIRECTORY) 
            image_dict[str(file_path)] = None

    # Use the built website in _site to update image titles with the img alt description
    with open(page_path, "r", encoding="utf-8") as file:
        html = file.read()

    pattern = r'<img src="/(.*?)" alt="(.*?)"(?:\s[^>]*)?>'
    matches = re.findall(pattern, html)

    for path,description in matches:
        image_dict[path] = description

    # Format the images into the sitemap format
    image_data = ""

    image_list = sorted(image_dict.items(), key=lambda x: x[1] is None) # Prioritize images with descriptions

    for path, description in image_list:
        image_data = image_data + "\n" + xml_image_entry(path, description)
    
    return image_data

def page_sitemap():
    page_list = []

    for image in WEBSITE_BUILD_DIRECTORY.rglob("*"):
        if image.suffix.lower() == ".html":
            file_path = image.relative_to(WEBSITE_BUILD_DIRECTORY) 
            page_list.append(file_path)
    
    document_list = []

    for image in WEBSITE_BUILD_DIRECTORY.rglob("*"):
        if image.suffix.lower() == ".pdf":
            file_path = image.relative_to(WEBSITE_BUILD_DIRECTORY) 
            document_list.append(file_path)
    
    with open(SITEMAP_FILE, 'w') as f:
        f.write(xml_header())
        for page in page_list:
            if page.stem == "404":
                continue
            image_data = image_sitemap(page)
            f.write(xml_page_entry(page, image_data, "weekly"))
        for document in document_list:
            f.write(xml_page_entry(document, "", "monthly"))
        f.write('</urlset>')
    
page_sitemap()
