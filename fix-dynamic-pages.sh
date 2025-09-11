#!/bin/bash

# Fix all pages to use force-dynamic for S3 data loading

echo "Fixing dynamic rendering for all pages..."

# List of pages to update
pages=(
  "src/app/clients/page.tsx"
  "src/app/contact/page.tsx"
  "src/app/services/page.tsx"
  "src/app/impressum/page.tsx"
  "src/app/privacy/page.tsx"
)

for page in "${pages[@]}"; do
  if [ -f "$page" ]; then
    # Check if already has force-dynamic
    if grep -q "force-dynamic" "$page"; then
      echo "✓ $page already has force-dynamic"
    else
      echo "Updating $page..."
      # Add force-dynamic after the import statement
      sed -i '' '2a\
\
// Force dynamic rendering to ensure fresh data from S3\
export const dynamic = '"'"'force-dynamic'"'"';\
export const revalidate = 0;' "$page"
      echo "✓ Updated $page"
    fi
  else
    echo "⚠ $page not found"
  fi
done

echo "Done! All pages now use force-dynamic rendering."