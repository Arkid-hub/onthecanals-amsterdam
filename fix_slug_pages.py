#!/usr/bin/env python3
"""
Fix generateMetadata in [slug] pages for Next.js 15.
params.slug -> (await params).slug
"""
import os
import re

FILES = [
    "app/[locale]/activities/[slug]/page.tsx",
    "app/[locale]/blog/[slug]/page.tsx",
]

def fix_file(path):
    if not os.path.exists(path):
        print(f"Skipped (not found): {path}")
        return

    with open(path, 'r') as f:
        content = f.read()

    original = content

    # Fix type Props if it has old style
    content = re.sub(
        r'type Props = \{ params: \{ locale: string; slug: string \} \}',
        'type Props = { params: Promise<{ locale: string; slug: string }> }',
        content
    )

    # Fix params.slug -> (await params).slug in generateMetadata
    content = re.sub(
        r'(async function generateMetadata\(\{ params \}: Props\)[^{]*\{)\n(\s+)(const activity = await getActivityBySlug\(params\.slug\))',
        r'\1\n\2const { locale, slug } = await params\n\2const activity = await getActivityBySlug(slug)',
        content
    )
    
    # Same for blog
    content = re.sub(
        r'(async function generateMetadata\(\{ params \}: Props\)[^{]*\{)\n(\s+)(const post = await getBlogPostBySlug\(params\.slug\))',
        r'\1\n\2const { locale, slug } = await params\n\2const post = await getBlogPostBySlug(slug)',
        content
    )

    # Fix any remaining params.slug or params.locale references
    content = re.sub(r'\bparams\.slug\b', 'slug', content)
    content = re.sub(r'\bparams\.locale\b', 'locale', content)

    if content != original:
        with open(path, 'w') as f:
            f.write(content)
        print(f"Fixed: {path}")
    else:
        print(f"No change: {path}")

for f in FILES:
    fix_file(f)

print("\nDone. Run: git add -A && git commit -m 'fix: await params in generateMetadata slug pages' && git push")
