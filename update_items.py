import re

with open("items.html", "r", encoding="utf-8") as f:
    html = f.read()

# 1. Update title
html = html.replace("<title>Daughter Spoon — Wholesome Homemade Meals & Artisanal Snacks</title>", "<title>Items — Daughter Spoon</title>")

# 2. Remove Hero Section
html = re.sub(r'<!-- ========== HERO SECTION ========== -->.*?<!-- ========== MENU SECTION ========== -->', '<!-- ========== ITEMS SECTION ========== -->', html, flags=re.DOTALL)

# 3. Remove Catering and Our Story sections
html = re.sub(r'<!-- ========== OUR STORY SECTION ========== -->.*?<!-- ========== FOOTER ========== -->', '<!-- ========== FOOTER ========== -->', html, flags=re.DOTALL)

# 4. Change "Our Menu" text to "Our Items"
html = html.replace('id="menu"', 'id="items"')
html = html.replace('Our Menu', 'Our Items')
html = html.replace('id="menu-grid"', 'id="items-grid"')

# 5. Update JS to load items instead of menu
html = html.replace('const menuGrid = document.getElementById(\'menu-grid\');', 'const menuGrid = document.getElementById(\'items-grid\');')
html = html.replace('const menuArray = (data && data.menu && data.menu.length > 0) ? data.menu : defaultMenuData;', 'const menuArray = (data && data.items && data.items.length > 0) ? data.items : defaultMenuData;')

# 6. Add defaultItemsData to JS and replace defaultMenuData usage
default_items = """
            const defaultMenuData = [
                {
                    id: 'item-1',
                    image: 'spices.png',
                    name: 'Premium Spices Set',
                    price: '$35',
                    desc: 'A curated box of our finest hand-ground spices used in all our signature dishes.',
                    label: 'Pantry'
                },
                {
                    id: 'item-2',
                    image: 'hero-bg.jpg',
                    name: 'Gift Card',
                    price: '$50',
                    desc: 'Give the gift of homemade meals. Can be used for catering or daily orders.',
                    label: 'Gift'
                }
            ];
"""
html = re.sub(r'const defaultMenuData = \[.*?\];', default_items.strip(), html, flags=re.DOTALL)

# 7. Remove text/images replacement logic since items.html doesn't have those specific IDs anymore (except maybe footer)
# It's fine to leave it, document.getElementById will just return null and skip.

with open("items.html", "w", encoding="utf-8") as f:
    f.write(html)
