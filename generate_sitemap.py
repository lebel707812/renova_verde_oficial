import json
from datetime import datetime

BASE_URL = "https://www.renovaverde.com.br"

def generate_sitemap(articles_file, output_file):
    with open(articles_file, 'r') as f:
        articles = json.load(f)

    sitemap_content = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
        '  <url>',
        f'    <loc>{BASE_URL}</loc>',
        '    <lastmod>{datetime.now().strftime("%Y-%m-%d")}</lastmod>',
        '    <changefreq>daily</changefreq>',
        '    <priority>1.0</priority>',
        '  </url>'
    ]

    for article in articles:
        sitemap_content.append('  <url>')
        sitemap_content.append(f'    <loc>{BASE_URL}/blog/{article["slug"]}</loc>')
        sitemap_content.append(f'    <lastmod>{article["updatedAt"].split("T")[0]}</lastmod>')
        sitemap_content.append('    <changefreq>weekly</changefreq>')
        sitemap_content.append('    <priority>0.8</priority>')
        sitemap_content.append('  </url>')

    sitemap_content.append('</urlset>')

    with open(output_file, 'w') as f:
        f.write('\n'.join(sitemap_content))

if __name__ == "__main__":
    generate_sitemap("/home/ubuntu/renova_verde_oficial/articles.json", "/home/ubuntu/renova_verde_oficial/public/sitemap.xml")


