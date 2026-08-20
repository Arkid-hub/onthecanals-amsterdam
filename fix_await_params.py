#!/usr/bin/env python3
"""
Fix missing 'const { locale } = await params' in all locale pages.
Run from project root.
"""
import os
import re

FILES_LOCALE_ONLY = [
    "app/[locale]/about/page.tsx",
    "app/[locale]/contact/page.tsx",
    "app/[locale]/privacy/page.tsx",
    "app/[locale]/terms/page.tsx",
    "app/[locale]/page.tsx",
    "app/[locale]/activities/page.tsx",
    "app/[locale]/blog/page.tsx",
]

FILES_LOCALE_SLUG = [
    "app/[locale]/activities/[slug]/page.tsx",
    "app/[locale]/blog/[slug]/page.tsx",
]

FILES_LAYOUT = [
    "app/[locale]/layout.tsx",
]

def fix_file(path, await_line):
    if not os.path.exists(path):
        print(f"Skipped (not found): {path}")
        return

    with open(path, 'r') as f:
        content = f.read()

    original = content

    # Check if await params already there
    if 'const { locale' in content and 'await params' in content:
        print(f"Already fixed: {path}")
        return

    # Insert await line after Promise<{ locale... }> }) {
    # Pattern: function signature ending with }) {\n  setRequestLocale
    content = re.sub(
        r'(params: Promise<\{[^}]+\}>\s*\}\)\s*\{)\n(\s+)(setRequestLocale)',
        lambda m: f'{m.group(1)}\n{m.group(2)}{await_line}\n{m.group(2)}setRequestLocale',
        content
    )

    # Also fix generateMetadata if it has params but no await
    content = re.sub(
        r'(async function generateMetadata\(\{ params \}[^{]+\{\n)(\s+)(?!const \{ locale \})',
        lambda m: f'{m.group(1)}{m.group(2)}const {{ locale }} = await params\n{m.group(2)}',
        content
    )

    if content != original:
        with open(path, 'w') as f:
            f.write(content)
        print(f"Fixed: {path}")
    else:
        print(f"No change (check manually): {path}")

for f in FILES_LOCALE_ONLY:
    fix_file(f, "const { locale } = await params")

for f in FILES_LOCALE_SLUG:
    fix_file(f, "const { locale, slug } = await params")

for f in FILES_LAYOUT:
    fix_file(f, "const { locale } = await params")

print("\nDone. Run: git add -A && git commit -m 'fix: add await params to all locale pages' && git push")
