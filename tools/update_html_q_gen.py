with open('index.html', 'r', encoding='utf-8') as f:
    text = f.read()

text = text.replace('?v=52', '?v=53')
old_snippet = '<script src="js/audio_manifest.js?v=53"></script>'
new_snippet = '<script src="js/question_generator.js?v=53"></script>\n  <script src="js/audio_manifest.js?v=53"></script>'

assert old_snippet in text, 'old snippet not found'
text = text.replace(old_snippet, new_snippet)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(text)

print('Updated index.html with question_generator.js and bumped to v=53')
