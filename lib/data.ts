import { Category, Product } from "./types";

export const categories: Category[] = [
  {
    id: "cat-1",
    name: "Buttons",
    description: "High-quality buttons in various materials, sizes, and designs",
    image: "https://images.pexels.com/photos/6447067/pexels-photo-6447067.jpeg",
    slug: "buttons",
  },
  {
    id: "cat-2",
    name: "Zippers",
    description: "Durable zippers for all types of garments and accessories",
    image: "https://images.pexels.com/photos/7580865/pexels-photo-7580865.jpeg",
    slug: "zippers",
  },
  {
    id: "cat-3",
    name: "Hooks & Clasps",
    description: "Reliable hooks and clasps for secure closures",
    image: "https://images.pexels.com/photos/10282805/pexels-photo-10282805.jpeg",
    slug: "hooks",
  },
  {
    id: "cat-4",
    name: "Lace & Trims",
    description: "Elegant lace and trims to add a touch of sophistication",
    image: "https://images.pexels.com/photos/5695880/pexels-photo-5695880.jpeg",
    slug: "lace",
  },
  {
    id: "cat-5",
    name: "Fabric Patches",
    description: "Creative fabric patches to personalize your garments",
    image: "https://images.pexels.com/photos/6971903/pexels-photo-6971903.jpeg",
    slug: "patches",
  }
];

export const products: Product[] = [
  {
    id: "prod-1",
    name: "Classic Metal Button Set",
    description: "Set of 10 premium metal buttons with an antique brass finish. Perfect for jackets, coats, and formal wear. Each button features a unique embossed design that adds sophistication to any garment.",
    price: 12.99,
    images: [
      "https://images.pexels.com/photos/5695831/pexels-photo-5695831.jpeg",
      "https://images.pexels.com/photos/6447067/pexels-photo-6447067.jpeg"
    ],
    category: "cat-1",
    categoryName: "Buttons",
    colors: [
      { name: "Brass", value: "#b5a642" },
      { name: "Silver", value: "#c0c0c0" },
      { name: "Bronze", value: "#cd7f32" }
    ],
    sizes: ["15mm", "20mm", "25mm"],
    materials: ["Metal", "Brass"],
    featured: true,
    bestseller: true,
    inStock: true,
    rating: 4.8,
    reviews: 124
  },
  {
    id: "prod-2",
    name: "Wooden Button Collection",
    description: "Set of 12 natural wooden buttons in various shapes and sizes. Eco-friendly and perfect for adding a rustic touch to your handmade projects.",
    price: 9.99,
    images: [
      "https://images.pexels.com/photos/6046989/pexels-photo-6046989.jpeg",
      "https://images.pexels.com/photos/6046226/pexels-photo-6046226.jpeg"
    ],
    category: "cat-1",
    categoryName: "Buttons",
    colors: [
      { name: "Natural", value: "#deb887" },
      { name: "Walnut", value: "#5c4033" },
      { name: "Ebony", value: "#3d2b1f" }
    ],
    sizes: ["12mm", "18mm", "22mm"],
    materials: ["Wood", "Natural"],
    featured: true,
    bestseller: false,
    inStock: true,
    rating: 4.5,
    reviews: 86
  },
  {
    id: "prod-3",
    name: "Metal Zipper - Heavy Duty",
    description: "Durable metal zipper designed for heavy-duty applications. Ideal for jackets, bags, and outdoor gear where strength and reliability are essential.",
    price: 7.99,
    images: [
      "https://images.pexels.com/photos/7580865/pexels-photo-7580865.jpeg",
      "https://images.pexels.com/photos/14016564/pexels-photo-14016564.jpeg"
    ],
    category: "cat-2",
    categoryName: "Zippers",
    colors: [
      { name: "Black", value: "#000000" },
      { name: "Silver", value: "#c0c0c0" },
      { name: "Gunmetal", value: "#2c3539" }
    ],
    sizes: ["15cm", "20cm", "30cm", "45cm"],
    materials: ["Metal", "Nylon"],
    featured: false,
    bestseller: true,
    inStock: true,
    rating: 4.9,
    reviews: 203
  },
  {
    id: "prod-4",
    name: "Invisible Zipper Set",
    description: "Set of 5 invisible zippers perfect for dresses, skirts, and other fine garments where you want the closure to be hidden.",
    price: 11.99,
    images: [
      "https://images.pexels.com/photos/6185642/pexels-photo-6185642.jpeg",
      "https://images.pexels.com/photos/8801195/pexels-photo-8801195.jpeg"
    ],
    category: "cat-2",
    categoryName: "Zippers",
    colors: [
      { name: "White", value: "#ffffff" },
      { name: "Black", value: "#000000" },
      { name: "Beige", value: "#f5f5dc" }
    ],
    sizes: ["20cm", "30cm", "40cm"],
    materials: ["Nylon", "Polyester"],
    featured: true,
    bestseller: false,
    inStock: true,
    rating: 4.6,
    reviews: 97
  },
  {
    id: "prod-5",
    name: "Metal Hook and Eye Clasps",
    description: "Set of 20 pairs of hook and eye clasps, perfect for lingerie, blouses, and other garments requiring secure but discrete closures.",
    price: 5.99,
    images: [
      "https://images.pexels.com/photos/10282805/pexels-photo-10282805.jpeg"
    ],
    category: "cat-3",
    categoryName: "Hooks & Clasps",
    colors: [
      { name: "Silver", value: "#c0c0c0" },
      { name: "Black", value: "#000000" }
    ],
    sizes: ["8mm", "10mm"],
    materials: ["Metal"],
    featured: false,
    bestseller: true,
    inStock: true,
    rating: 4.4,
    reviews: 62
  },
  {
    id: "prod-6",
    name: "Decorative Lace Trim",
    description: "Beautiful floral lace trim, perfect for adding elegance to garments, home decor, and craft projects. Sold by the yard.",
    price: 8.49,
    images: [
      "https://images.pexels.com/photos/5695880/pexels-photo-5695880.jpeg",
      "https://images.pexels.com/photos/6045028/pexels-photo-6045028.jpeg"
    ],
    category: "cat-4",
    categoryName: "Lace & Trims",
    colors: [
      { name: "White", value: "#ffffff" },
      { name: "Ivory", value: "#fffff0" },
      { name: "Black", value: "#000000" }
    ],
    sizes: ["1.5cm", "2.5cm", "4cm"],
    materials: ["Cotton", "Polyester"],
    featured: true,
    bestseller: true,
    inStock: true,
    rating: 4.8,
    reviews: 156
  },
  {
    id: "prod-7",
    name: "Embroidered Floral Patches",
    description: "Set of 3 iron-on embroidered floral patches. Perfect for personalizing denim, jackets, bags, and more.",
    price: 14.99,
    images: [
      "https://images.pexels.com/photos/6971903/pexels-photo-6971903.jpeg",
      "https://images.pexels.com/photos/6046194/pexels-photo-6046194.jpeg"
    ],
    category: "cat-5",
    categoryName: "Fabric Patches",
    colors: [
      { name: "Multi", value: "#ffffff" }
    ],
    sizes: ["Small", "Medium", "Large"],
    materials: ["Cotton", "Polyester"],
    featured: true,
    bestseller: false,
    inStock: true,
    rating: 4.7,
    reviews: 89
  },
  {
    id: "prod-8",
    name: "Pearl Button Collection",
    description: "Set of 15 elegant pearl-effect buttons in various sizes. Perfect for wedding dresses, formal wear, and delicate garments.",
    price: 15.99,
    images: [
      "https://images.pexels.com/photos/3735149/pexels-photo-3735149.jpeg",
      "https://images.pexels.com/photos/10013067/pexels-photo-10013067.jpeg"
    ],
    category: "cat-1",
    categoryName: "Buttons",
    colors: [
      { name: "White", value: "#ffffff" },
      { name: "Cream", value: "#fffdd0" },
      { name: "Blush", value: "#ffcccb" }
    ],
    sizes: ["10mm", "15mm", "20mm"],
    materials: ["Plastic", "Pearl Effect"],
    featured: false,
    bestseller: true,
    inStock: true,
    rating: 4.9,
    reviews: 112
  },
  {
    id: "prod-9",
    name: "Vintage Button Assortment",
    description: "Mixed collection of 25 vintage-style buttons in various materials, colors, and designs. Perfect for adding character to your creations.",
    price: 19.99,
    images: [
      "https://images.pexels.com/photos/6447067/pexels-photo-6447067.jpeg",
      "https://images.pexels.com/photos/5695831/pexels-photo-5695831.jpeg"
    ],
    category: "cat-1",
    categoryName: "Buttons",
    colors: [
      { name: "Assorted", value: "#ffffff" }
    ],
    sizes: ["Assorted"],
    materials: ["Metal", "Wood", "Plastic"],
    featured: true,
    bestseller: true,
    inStock: true,
    rating: 4.7,
    reviews: 175
  },
  {
    id: "prod-10",
    name: "Satin Ribbon Trim",
    description: "Luxurious satin ribbon trim, perfect for adding elegant finishing touches to garments, accessories, and home decor projects. Sold by the yard.",
    price: 6.99,
    images: [
      "https://images.pexels.com/photos/5706427/pexels-photo-5706427.jpeg",
      "https://images.pexels.com/photos/5705490/pexels-photo-5705490.jpeg"
    ],
    category: "cat-4",
    categoryName: "Lace & Trims",
    colors: [
      { name: "Ivory", value: "#fffff0" },
      { name: "Black", value: "#000000" },
      { name: "Navy", value: "#000080" },
      { name: "Burgundy", value: "#800020" }
    ],
    sizes: ["1cm", "2cm", "3cm"],
    materials: ["Polyester", "Satin"],
    featured: false,
    bestseller: false,
    inStock: true,
    rating: 4.5,
    reviews: 83
  },
  {
    id: "prod-11",
    name: "Denim Patch Set",
    description: "Set of 5 iron-on denim patches in various shapes and sizes. Ideal for repairing or customizing jeans and other denim items.",
    price: 12.49,
    images: [
      "https://images.pexels.com/photos/6046378/pexels-photo-6046378.jpeg",
      "https://images.pexels.com/photos/5706501/pexels-photo-5706501.jpeg"
    ],
    category: "cat-5",
    categoryName: "Fabric Patches",
    colors: [
      { name: "Denim Blue", value: "#6f8faf" },
      { name: "Dark Denim", value: "#4a6b8a" }
    ],
    sizes: ["Small", "Medium", "Large"],
    materials: ["Denim", "Cotton"],
    featured: false,
    bestseller: true,
    inStock: true,
    rating: 4.6,
    reviews: 97
  },
  {
    id: "prod-12",
    name: "Plastic Snap Buttons",
    description: "Set of 50 durable plastic snap buttons in various colors. Perfect for children's clothing, crafts, and quick fastenings.",
    price: 8.99,
    images: [
      "https://images.pexels.com/photos/5705454/pexels-photo-5705454.jpeg",
      "https://images.pexels.com/photos/6046226/pexels-photo-6046226.jpeg"
    ],
    category: "cat-1",
    categoryName: "Buttons",
    colors: [
      { name: "White", value: "#ffffff" },
      { name: "Black", value: "#000000" },
      { name: "Red", value: "#ff0000" },
      { name: "Blue", value: "#0000ff" }
    ],
    sizes: ["10mm", "12mm"],
    materials: ["Plastic"],
    featured: false,
    bestseller: false,
    inStock: true,
    rating: 4.3,
    reviews: 68
  }
];