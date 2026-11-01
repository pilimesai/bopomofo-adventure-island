import re

def main():
    with open('css/style.css', 'r', encoding='utf-8') as f:
        css = f.read()

    new_tab_css = '''.tab-navigation {
  max-width: 580px;
  margin: 14px auto 18px auto;
  padding: 4px 16px;
  display: flex;
  gap: 16px;
  justify-content: center;
}

.tab-btn {
  flex: 1 1 0;
  max-width: 260px;
  white-space: nowrap;
  background: #FFFFFF;
  border: 2px solid rgba(239, 68, 68, 0.18);
  padding: 13px 24px;
  border-radius: 999px;
  font-family: inherit;
  font-size: 18px;
  font-weight: 900;
  color: #EF4444;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  cursor: pointer;
  box-shadow: 0 5px 0 #CBD5E1;
  transition: all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
  position: relative;
}

.tab-btn .tab-icon {
  font-size: 22px;
}

.tab-btn:hover {
  transform: translateY(-2px);
  background: #FFF5F5;
  box-shadow: 0 7px 0 #CBD5E1;
}

.tab-btn.active {
  background: linear-gradient(135deg, #EF4444, #DC2626);
  color: #FFFFFF;
  border-color: #DC2626;
  box-shadow: 0 5px 0 #991B1B;
  transform: translateY(-2px);
}

.tab-btn.active:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 0 #991B1B;
}

.tab-btn:active {
  transform: translateY(2px);
  box-shadow: 0 2px 0 #991B1B;
}'''

    # Replace the existing .tab-navigation block
    pattern = re.compile(r'\.tab-navigation\s*\{[\s\S]*?\.tab-btn\.active\s*\{[\s\S]*?\}')
    if pattern.search(css):
        css = pattern.sub(new_tab_css, css)
        with open('css/style.css', 'w', encoding='utf-8') as f:
            f.write(css)
        print('Updated css/style.css successfully!')
    else:
        print('Pattern not matched in css/style.css')

if __name__ == '__main__':
    main()
