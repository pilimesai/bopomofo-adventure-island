import re

with open('tools/52poke_raw.html', 'r', encoding='utf-8') as f:
    html = f.read()

ids = re.findall(r'<td class="rdexn-id">#0*(\d{1,4})', html)
print('IDs count:', len(ids), 'max ID:', max([int(x) for x in ids]) if ids else 0)
