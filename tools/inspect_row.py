import re

with open('tools/52poke_raw.html', 'r', encoding='utf-8') as f:
    html = f.read()

idx = html.find('class="rdexn-id">#0001')
end_idx = html.find('</tr>', idx)
print("Complete row for #0001:")
print(html[idx-50:end_idx+5])
