// Categories are catalog tags (e.g. 'en:snacks').
// Each category page lists the products that carry the tag.

export const categories = [
  {
    tag: 'en:snacks',
    name: 'Snacks',
    description: 'Chips, bites and quick treats.',
    image: '/images/photo-1566478989037-eec170784d0b.jpg',
  },
  {
    tag: 'en:beverages',
    name: 'Beverages',
    description: 'Soft drinks, juices and packaged drinks.',
    image: '/images/photo-1544787219-7f47ccb76574.jpg',
  },
  {
    tag: 'en:dairy',
    name: 'Dairy',
    description: 'Milk, cheese, yogurt and dairy products.',
    image: '/images/photo-1550583724-b2692b85b150.jpg',
  },
  {
    tag: 'en:biscuits-and-cakes',
    name: 'Biscuits & Cakes',
    description: 'Cookies, biscuits, cakes and pastries.',
    image: '/images/photo-1509440159596-0249088772ff.jpg',
  },
  {
    tag: 'en:sweets',
    name: 'Sweets',
    description: 'Candies, jellies and confectionery.',
    image: '/images/photo-1542838132-92c53300491e.jpg',
  },
  {
    tag: 'en:cereals-and-potatoes',
    name: 'Cereals & Potatoes',
    description: 'Breakfast cereals, oats and potato products.',
    image: '/images/photo-1523821741446-edb2b68bb7a0.jpg',
  },
  {
    tag: 'en:breads',
    name: 'Breads',
    description: 'Loaves, buns and packaged bread.',
    image: '/images/photo-1509440159596-0249088772ff.jpg',
  },
  {
    tag: 'en:pastas',
    name: 'Pastas',
    description: 'Dry pastas, noodles and convenience pasta.',
    image: '/images/photo-1586201375761-83865001e31c.jpg',
  },
  {
    tag: 'en:sauces',
    name: 'Sauces',
    description: 'Tomato, dressing and cooking sauces.',
    image: '/images/photo-1497034825429-c343d7c6a68f.jpg',
  },
  {
    tag: 'en:meats',
    name: 'Meats',
    description: 'Processed meats, ham and sausages.',
    image: '/images/photo-1603133872878-684f208fb84b.jpg',
  },
]

export function getCategory(tag) {
  return categories.find((c) => c.tag === tag)
}

export function getCategoryByTag(tag) {
  return getCategory(tag)
}