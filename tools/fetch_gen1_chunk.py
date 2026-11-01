import urllib.request

url = 'https://wiki.52poke.com/zh-hant/%E5%AE%9D%E5%8F%AF%E6%A2%A6%E5%88%97%E8%A1%A8%EF%BC%88%E6%8C%89%E5%85%A8%E5%9B%BD%E5%9B%BE%E9%89%B4%E7%BC%96%E5%8F%B7%EF%BC%89'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
with urllib.request.urlopen(req, timeout=12) as resp:
    # Read in chunks until we find 夢幻 / 0151
    chunks = []
    total = 0
    while True:
        chunk = resp.read(65536)
        if not chunk:
            break
        chunks.append(chunk)
        total += len(chunk)
        text = b''.join(chunks).decode('utf-8', errors='ignore')
        if '#0151' in text or '0151' in text:
            print("Found #0151 at bytes:", total)
            break

with open('tools/52poke_gen1.html', 'w', encoding='utf-8') as f:
    f.write(text)

print("Saved tools/52poke_gen1.html, length:", len(text))
