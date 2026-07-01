import json

def get_card_html(item, index):
    delay = 0.1 * ((index % 4) + 1)
    esc_name = item['name'].replace("'", "\\'")
    
    return f'''                <article class="menu-card bg-white rounded-3xl overflow-hidden shadow-sm border border-warm-100 reveal visible" style="transition-delay: {delay}s;">
                    <div class="relative overflow-hidden">
                        <img src="{item['image']}" alt="{item['name']}" class="w-full h-56 object-cover transition-transform duration-700 hover:scale-110" loading="lazy">
                        <div class="price-badge absolute top-4 right-4 w-16 h-16 rounded-full flex flex-col items-center justify-center text-white shadow-lg">
                            <span class="text-[10px] font-medium uppercase leading-none">Price</span>
                            <span class="text-lg font-bold leading-tight">{item['price']}</span>
                        </div>
                    </div>
                    <div class="p-4 sm:p-5">
                        <div class="flex items-center gap-1 mb-2">
                            <span class="star-filled text-sm">★</span>
                            <span class="star-filled text-sm">★</span>
                            <span class="star-filled text-sm">★</span>
                            <span class="star-filled text-sm">★</span>
                            <span class="star-filled text-sm">★</span>
                            <span class="text-xs text-charcoal-500 ml-1">4.9</span>
                        </div>
                        <span class="text-xs font-semibold text-olive-500 uppercase tracking-wider">{item['label']}</span>
                        <h3 class="font-serif text-xl font-bold text-charcoal-800 mt-1 mb-2">{item['name']}</h3>
                        <p class="text-sm text-charcoal-500 leading-relaxed mb-3 sm:mb-4">{item['desc']}</p>
                        <button onclick="addToCart('{esc_name}')" class="w-full btn-primary text-white font-semibold py-3 rounded-full text-sm flex items-center justify-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
                            </svg>
                            Add to Cart
                        </button>
                    </div>
                </article>'''

index_items = [
    { "id": "menu-1", "image": "snack-box.png", "name": "Signature Snack Box", "price": "$24", "desc": "A curated selection of crispy samosas, spring rolls, spiced pakoras, and three artisanal chutneys.", "label": "Bestseller" },
    { "id": "menu-2", "image": "comfort-meal.png", "name": "Comfort Meal of the Day", "price": "$18", "desc": "Aromatic chicken biryani with fragrant spices, creamy raita, and warm naan bread on the side.", "label": "Chef's Pick" },
    { "id": "menu-3", "image": "cookies.png", "name": "Artisanal Cookies", "price": "$12", "desc": "A dozen handmade cookies — chocolate chip, buttery shortbread, and crunchy almond. Pure bliss.", "label": "Sweet Treats" },
    { "id": "menu-4", "image": "lemonade.png", "name": "Fresh Lemonade", "price": "$6", "desc": "Freshly squeezed lemonade with a hint of mint and honey. The perfect companion to any meal.", "label": "Refreshing" }
]

items_page_items = [
    { "id": "item-1", "image": "spices.png", "name": "Premium Spices Set", "price": "$35", "desc": "A curated box of our finest hand-ground spices used in all our signature dishes.", "label": "Pantry" },
    { "id": "item-2", "image": "hero-bg.jpg", "name": "Gift Card", "price": "$50", "desc": "Give the gift of homemade meals. Can be used for catering or daily orders.", "label": "Gift" },
    { "id": "item-3", "image": "snack-box.png", "name": "Spoon Merchandise Tote", "price": "$15", "desc": "A heavy-duty canvas tote bag featuring our classic logo. Perfect for groceries.", "label": "Merch" },
    { "id": "item-4", "image": "cookies.png", "name": "Custom Catering Consultation", "price": "Free", "desc": "Book a 30-minute session with our chef to plan your next event menu.", "label": "Service" },
    { "id": "item-5", "image": "catering-spread.png", "name": "Family Feast Bundle", "price": "$85", "desc": "A complete meal for 4-6 people including mains, sides, and dessert.", "label": "Bundle" },
    { "id": "item-6", "image": "comfort-meal.png", "name": "Weekly Meal Prep (5 Days)", "price": "$120", "desc": "Fresh, healthy homemade lunches prepared and delivered for your work week.", "label": "Subscription" },
    { "id": "item-7", "image": "snack-box.png", "name": "Artisan Chutney Trio", "price": "$22", "desc": "Three jars of our signature homemade chutneys: Mango, Mint-Coriander, and Tamarind.", "label": "Pantry" },
    { "id": "item-8", "image": "lemonade.png", "name": "Signature Marinade Bottle", "price": "$14", "desc": "Our secret family marinade recipe, perfect for grilling chicken or vegetables.", "label": "Pantry" },
    { "id": "item-9", "image": "hero-bg.jpg", "name": "Cooking Masterclass (Virtual)", "price": "$45", "desc": "Join a 2-hour live virtual cooking class with our head chef.", "label": "Event" },
    { "id": "item-10", "image": "cookies.png", "name": "Seasonal Dessert Box", "price": "$30", "desc": "A rotating selection of seasonal sweets and pastries.", "label": "Sweet Treats" }
]

import re

# Update index.html
with open('index.html', 'r') as f:
    index_html = f.read()

index_cards_html = '\n'.join([get_card_html(item, i) for i, item in enumerate(index_items)])
index_html = re.sub(
    r'(<div id="menu-grid"[^>]*>).*?(</div>)',
    f'\\1\n{index_cards_html}\n            \\2',
    index_html,
    flags=re.DOTALL
)

# Update index JS logic to NOT render defaultMenuData if empty
index_html = re.sub(
    r'const menuArray = \(data && data\.menu && data\.menu\.length > 0\) \? data\.menu : defaultMenuData;.*?if \(menuGrid\) \{',
    r'if (menuGrid && data && data.menu && data.menu.length > 0) {\n                menuGrid.innerHTML = "";\n                const menuArray = data.menu;',
    index_html,
    flags=re.DOTALL
)

with open('index.html', 'w') as f:
    f.write(index_html)

# Update items.html
with open('items.html', 'r') as f:
    items_html = f.read()

items_cards_html = '\n'.join([get_card_html(item, i) for i, item in enumerate(items_page_items)])
items_html = re.sub(
    r'(<div id="items-grid"[^>]*>).*?(</div>)',
    f'\\1\n{items_cards_html}\n            \\2',
    items_html,
    flags=re.DOTALL
)

# Update items JS logic to NOT render defaultMenuData if empty
items_html = re.sub(
    r'const menuArray = \(data && data\.items && data\.items\.length > 0\) \? data\.items : defaultMenuData;.*?if \(menuGrid\) \{',
    r'if (menuGrid && data && data.items && data.items.length > 0) {\n                menuGrid.innerHTML = "";\n                const menuArray = data.items;',
    items_html,
    flags=re.DOTALL
)

with open('items.html', 'w') as f:
    f.write(items_html)

print("Done")
