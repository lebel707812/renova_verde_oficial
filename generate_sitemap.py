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
        '  </url>',
        '  <url>',
        f'    <loc>{BASE_URL}/sobre</loc>',
        '    <lastmod>{datetime.now().strftime("%Y-%m-%d")}</lastmod>',
        '    <changefreq>monthly</changefreq>',
        '    <priority>0.8</priority>',
        '  </url>',
        '  <url>',
        f'    <loc>{BASE_URL}/contato</loc>',
        '    <lastmod>{datetime.now().strftime("%Y-%m-%d")}</lastmod>',
        '    <changefreq>monthly</changefreq>',
        '    <priority>0.7</priority>',
        '  </url>',
        '  <url>',
        f'    <loc>{BASE_URL}/politica-privacidade</loc>',
        '    <lastmod>{datetime.now().strftime("%Y-%m-%d")}</lastmod>',
        '    <changefreq>yearly</changefreq>',
        '    <priority>0.3</priority>',
        '  </url>',
        '  <url>',
        f'    <loc>{BASE_URL}/termos-uso</loc>',
        '    <lastmod>{datetime.now().strftime("%Y-%m-%d")}</lastmod>',
        '    <changefreq>yearly</changefreq>',
        '    <priority>0.3</priority>',
        '  </url>',
        '  <url>',
        f'    <loc>{BASE_URL}/artigos</loc>',
        '    <lastmod>{datetime.now().strftime("%Y-%m-%d")}</lastmod>',
        '    <changefreq>daily</changefreq>',
        '    <priority>0.9</priority>',
        '  </url>',
        '  <url>',
        f'    <loc>{BASE_URL}/categorias</loc>',
        '    <lastmod>{datetime.now().strftime("%Y-%m-%d")}</lastmod>',
        '    <changefreq>weekly</changefreq>',
        '    <priority>0.8</priority>',
        '  </url>',
        '  <url>',
        f'    <loc>{BASE_URL}/search</loc>',
        '    <lastmod>{datetime.now().strftime("%Y-%m-%d")}</lastmod>',
        '    <changefreq>monthly</changefreq>',
        '    <priority>0.6</priority>',
        '  </url>',
        '  <url>',
        f'    <loc>{BASE_URL}/calculadora</loc>',
        '    <lastmod>{datetime.now().strftime("%Y-%m-%d")}</lastmod>',
        '    <changefreq>monthly</changefreq>',
        '    <priority>0.7</priority>',
        '  </url>',
        '  <url>',
        f'    <loc>{BASE_URL}/calculadora/chuva</loc>',
        '    <lastmod>{datetime.now().strftime("%Y-%m-%d")}</lastmod>',
        '    <changefreq>monthly</changefreq>',
        '    <priority>0.7</priority>',
        '  </url>',
        '  <url>',
        f'    <loc>{BASE_URL}/calculadora/solar</loc>',
        '    <lastmod>{datetime.now().strftime("%Y-%m-%d")}</lastmod>',
        '    <changefreq>monthly</changefreq>',
        '    <priority>0.7</priority>',
        '  </url>',
        '  <url>',
        f'    <loc>{BASE_URL}/calculadora/tinta</loc>',
        '    <lastmod>{datetime.now().strftime("%Y-%m-%d")}</lastmod>',
        '    <changefreq>monthly</changefreq>',
        '    <priority>0.7</priority>',
        '  </url>',
    ]

    for article in articles:
        sitemap_content.append('  <url>')
        sitemap_content.append(f'    <loc>{BASE_URL}/artigos/{article["slug"]}</loc>')
        sitemap_content.append(f'    <lastmod>{article["updatedAt"].split("T")[0]}</lastmod>')
        sitemap_content.append('    <changefreq>weekly</changefreq>')
        sitemap_content.append('    <priority>0.7</priority>')
        sitemap_content.append('  </url>')

    categories = [
        'jardinagem',
        'energia-renovavel',
        'reformas-ecologicas',
        'reciclagem',
        'economia-domestica',
        'compostagem',
        'sustentabilidade',
        'economia-de-agua'
    ]

    for category in categories:
        sitemap_content.append('  <url>')
        sitemap_content.append(f'    <loc>{BASE_URL}/categoria/{category}</loc>')
        sitemap_content.append('    <lastmod>{datetime.now().strftime("%Y-%m-%d")}</lastmod>')
        sitemap_content.append('    <changefreq>weekly</changefreq>')
        sitemap_content.append('    <priority>0.6</priority>')
        sitemap_content.append('  </url>')

    sitemap_content.append('</urlset>')

    with open(output_file, 'w') as f:
        f.write('\n'.join(sitemap_content))

if __name__ == "__main__":
    generate_sitemap("/home/ubuntu/renova_verde_oficial/articles.json", "/home/ubuntu/renova_verde_oficial/public/sitemap.xml")


