import requests
import json

API_BASE_URL = "https://www.renovaverde.com.br/api"

def fetch_articles():
    try:
        response = requests.get(f"{API_BASE_URL}/articles?published=true")
        response.raise_for_status()  # Raise an exception for HTTP errors
        articles = response.json()
        with open("articles.json", "w", encoding="utf-8") as f:
            json.dump(articles, f, ensure_ascii=False, indent=2)
        print(f"Fetched {len(articles)} articles and saved to articles.json")
    except requests.exceptions.RequestException as e:
        print(f"Error fetching articles: {e}")

if __name__ == "__main__":
    fetch_articles()


