#!/usr/bin/env python3
"""Remove incorrect globals.css import from locale layout"""
import os

path = "app/[locale]/layout.tsx"

if not os.path.exists(path):
    print(f"Not found: {path}")
    exit(1)

with open(path, 'r') as f:
    content = f.read()

fixed = content.replace("import './globals.css'\n", "")

if fixed != content:
    with open(path, 'w') as f:
        f.write(fixed)
    print(f"Fixed: {path}")
else:
    print("globals.css import not found, no changes made")
