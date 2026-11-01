import sys, re
sys.stdout.reconfigure(encoding='utf-8')

with open('js/app.js', 'r', encoding='utf-8') as f:
    text = f.read()

# Find renderAuthenticExamInteraction
idx = text.find('function renderAuthenticExamInteraction')
print("renderAuthenticExamInteraction block:")
print(text[idx:idx+3500])

