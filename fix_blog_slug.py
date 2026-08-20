import os

path = "app/[locale]/blog/[slug]/page.tsx"

if not os.path.exists(path):
    print(f"Not found: {path}")
    exit(1)

with open(path, 'r') as f:
    content = f.read()

original = content

# Fix: const { locale } = await params -> const { locale, slug } = await params
content = content.replace(
    '  const { locale } = await params\n  setRequestLocale(locale)',
    '  const { locale, slug } = await params\n  setRequestLocale(locale)'
)

if content != original:
    with open(path, 'w') as f:
        f.write(content)
    print("Fixed blog slug page")
else:
    print("No change needed")
