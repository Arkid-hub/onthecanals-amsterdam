"""
Fix Next.js 15 params Promise migration.
Run from project root: python3 fix_next15.py
"""
import os
import re

FILES = [
    "app/[locale]/about/page.tsx",
    "app/[locale]/contact/page.tsx",
    "app/[locale]/privacy/page.tsx",
    "app/[locale]/terms/page.tsx",
    "app/[locale]/page.tsx",
    "app/[locale]/layout.tsx",
    "app/[locale]/activities/page.tsx",
    "app/[locale]/activities/[slug]/page.tsx",
    "app/[locale]/blog/page.tsx",
    "app/[locale]/blog/[slug]/page.tsx",
]

def fix_file(path):
    if not os.path.exists(path):
        print(f"Skipped (not found): {path}")
        return

    with open(path, 'r') as f:
        content = f.read()

    original = content

    # Fix type: { params: { locale: string } } -> Promise<{ locale: string }>
    content = re.sub(
        r'params:\s*\{\s*locale:\s*string\s*\}(?!\s*>)',
        'params: Promise<{ locale: string }>',
        content
    )

    # Fix type: { params: { locale: string; slug: string } }
    content = re.sub(
        r'params:\s*\{\s*locale:\s*string;\s*slug:\s*string\s*\}(?!\s*>)',
        'params: Promise<{ locale: string; slug: string }>',
        content
    )

    # Fix destructuring in function signature: { params: { locale } } -> { params }
    content = re.sub(
        r'\{\s*params:\s*\{\s*locale(?:,\s*slug)?\s*\}\s*\}(?=\s*[,:])',
        '{ params }',
        content
    )

    # Add await after function opens (before setRequestLocale or first use)
    # locale only
    content = re.sub(
        r'(async function \w+\(\{ params \}[^{]+\{\n)(\s+)(setRequestLocale\(locale\))',
        r'\1\2const { locale } = await params\n\2\3',
        content
    )

    # locale + slug
    content = re.sub(
        r'(async function \w+\(\{ params \}[^{]+\{\n)(\s+)(setRequestLocale\(locale\))',
        r'\1\2const { locale, slug } = await params\n\2\3',
        content
    )

    if content != original:
        with open(path, 'w') as f:
            f.write(content)
        print(f"Fixed: {path}")
    else:
        print(f"No changes: {path}")

for f in FILES:
    fix_file(f)

print("\nDone.")
