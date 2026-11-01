import urllib.request
import re
import json

url = 'https://wiki.52poke.com/zh-hant/%E5%AE%9D%E5%8F%AF%E6%A2%A6%E5%88%97%E8%A1%A8%EF%BC%88%E6%8C%89%E5%85%A8%E5%9B%BD%E5%9B%BE%E9%89%B4%E7%BC%96%E5%8F%B7%EF%BC%89'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})

try:
    with urllib.request.urlopen(req, timeout=10) as resp:
        html = resp.read().decode('utf-8')
    print('Fetched 52poke page, length:', len(html))

    # Look for table rows in Gen 1 section
    # Usually contains #0001 or #001
    with open('tools/52poke_raw.html', 'w', encoding='utf-8') as f:
        f.write(html[:200000]) # First 200k chars has Gen 1
    print('Saved preview to tools/52poke_raw.html')
except Exception as e:
    print('Error:', e)
