import re
import json

with open('tools/52poke_raw.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Let's inspect rows with #0001
pattern = re.compile(r'<tr>\s*<td[^>]*>#?0*([1-9][0-9]*)</td>[\s\S]*?</tr>')
rows = pattern.findall(html)
print(f"Found {len(rows)} matching rows")

# Let's see some sample rows
sample = re.findall(r'(<tr>\s*<td[^>]*>#?0*0*1\s*</td>[\s\S]*?</tr>)', html)
if sample:
    print("Sample 001 row:\n", sample[0][:800])
else:
    print("No sample 001 row found, searching for 妙蛙種子")
    idx = html.find('妙蛙種子')
    print("Context around 妙蛙種子:\n", html[idx-200:idx+300])
