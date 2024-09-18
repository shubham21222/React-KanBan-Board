import requests
import pandas as pd
import json
from time import sleep

# Your store's URL and OAuth access token
store_url = "demo-store-controlf5.myshopify.com"
api_version = "2024-07"
access_token = "7b5e9ac9bae599f3441cbac3b386f594"  # This is the OAuth access token
product_image_url = "https://cdn.shopify.com/s/files/1/1861/6627/files/dummy.png?v=1726209449"
def fetch_existing_products(url, headers):
    products = []
    while url:
        response = requests.get(url, headers=headers)
        if response.status_code == 200:
            data = response.json()
            products.extend(data.get('products', []))
            # Check if there's a next page
            if 'next' in response.links:
                url = response.links['next']['url']
            else:
                url = None
        else:
            print(f"Failed to fetch products: {response.status_code}, {response.text}")
            url = None
    return products
def read_csv(file_path):
    return pd.read_csv(file_path)
def check_duplicate(product, existing_products):
    # Check by title; extend with other identifiers as needed
    for existing_product in existing_products:
        if existing_product['title'].lower() == product['title'].lower():
            return True
    return False
def upload_product(product, headers):
    create_url = f"https://{store_url}/admin/api/{api_version}/products.json"
    response = requests.post(create_url, headers=headers, json={"product": product})
    if response.status_code == 201:
        print(f"Successfully uploaded product: {product['title']}")
    else:
        print(f"Failed to upload product {product['title']}: {response.status_code}, {response.text}")
def process_csv_and_upload(csv_file_path, existing_products):
    # Read the CSV file
    products_df = read_csv(csv_file_path)
    # Process each row in the CSV
    for index, row in products_df.iterrows():
        # Construct the product data from the CSV row
        product = {
            "title": row.get("title"),
            "body_html": row.get("body_html", ""),
            "vendor": row.get("vendor", ""),
            "product_type": row.get("product_type", ""),
            "variants": [{
                "price": row.get("price", "0.00"),
                "sku": row.get("sku", "")
            }],
            "images": [{
                "src": product_image_url
            }]
        }
        if not check_duplicate(product, existing_products):
            upload_product(product, headers)
            # Sleep to handle rate limits (adjust as needed)
            sleep(1)
        else:
            print(f"Product '{product['title']}' already exists and will not be uploaded.")
    print("Product upload process completed.")
# Load existing products
fetch_url = f"https://{store_url}/admin/api/{api_version}/products.json"
headers = {
    "X-Shopify-Access-Token": access_token
}
existing_products = fetch_existing_products(fetch_url, headers)
# File path to your CSV file
csv_file_path = 'next5000.csv'
# Process CSV and upload products
process_csv_and_upload(csv_file_path, existing_products)









# 1) create a new jira type board for manages task of to-do,in progress, completed
# 2) Assist sumit sir for replace all images of shopify products with python script 
# 3) integrate cretae task api in to-do board 
# 4) learn about how componets render in typescript