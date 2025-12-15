import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroCarousel from "@/components/HeroCarousel";
import ProductSection from "@/components/ProductSection";
import CategoriesGrid from "@/components/CategoriesGrid";
import BrandsCarousel from "@/components/BrandsCarousel";
import EssentialsSection from "@/components/EssentialsSection";

// Helper function to create product with category
const createProduct = (id: number, name: string, price: string, originalPrice: string, discount: string, image: string, category: string) => ({
  id,
  name,
  price,
  originalPrice,
  save: `BDT ${parseInt(originalPrice.replace(/[BDT ,]/g, "")) - parseInt(price.replace(/[BDT ,]/g, ""))}`,
  discount,
  image,
  category,
});

const phones = [
  {
    id: 1,
    name: "Galaxy S22 Ultra",
    price: "BDT 32999",
    originalPrice: "BDT 74999",
    save: "BDT 32999",
    discount: "56%",
    image: "/Assets/oppo-a6-back-side-image.webp",
    category: "Mobile",
  },
  {
    id: 2,
    name: "Galaxy M13 (4GB | 64 GB )",
    price: "BDT 10499",
    originalPrice: "BDT 14999",
    save: "BDT 4500",
    discount: "56%",
    image: "/Assets/Galaxy-M13.webp",
    category: "Mobile",
  },
  {
    id: 3,
    name: "Galaxy M33 (4GB | 64 GB )",
    price: "BDT 16999",
    originalPrice: "BDT 24999",
    save: "BDT 8000",
    discount: "56%",
    image: "/Assets/samsung-galaxy-m33.webp",
    category: "Mobile",
  },
  {
    id: 4,
    name: "Galaxy M53 (4GB | 64 GB )",
    price: "BDT 31999",
    originalPrice: "BDT 40999",
    save: "BDT 9000",
    discount: "56%",
    image: "/Assets/Galaxy-M53.png",
    category: "Mobile",
  },
  {
    id: 5,
    name: "Galaxy S22 Ultra",
    price: "BDT 67999",
    originalPrice: "BDT 85999",
    save: "BDT 18000",
    discount: "56%",
    image: "/Assets/Galaxy-S22-Ultra.png",
    category: "Mobile",
  },
  {
    id: 6,
    name: "Galaxy A54 (8GB | 128 GB )",
    price: "BDT 28999",
    originalPrice: "BDT 34999",
    save: "BDT 6000",
    discount: "17%",
    image: "/Assets/Galaxy-A54.png",
    category: "Mobile",
  },
  {
    id: 7,
    name: "Galaxy A34 (6GB | 128 GB )",
    price: "BDT 22999",
    originalPrice: "BDT 27999",
    save: "BDT 5000",
    discount: "18%",
    image: "/Assets/Galaxy-A34.png",
    category: "Mobile",
  },
  {
    id: 8,
    name: "Galaxy S23 (8GB | 256 GB )",
    price: "BDT 54999",
    originalPrice: "BDT 69999",
    save: "BDT 15000",
    discount: "21%",
    image: "/Assets/Galaxy-S23.png",
    category: "Mobile",
  },
  {
    id: 9,
    name: "Galaxy Note 20 Ultra",
    price: "BDT 59999",
    originalPrice: "BDT 79999",
    save: "BDT 20000",
    discount: "25%",
    image: "/Assets/GalaxyNote20Ultra.png",
    category: "Mobile",
  },
  {
    id: 10,
    name: "Galaxy Z Fold 4",
    price: "BDT 124999",
    originalPrice: "BDT 149999",
    save: "BDT 25000",
    discount: "17%",
    image: "/Assets/Galaxy-Z-Fold.png",
    category: "Mobile",
  },
  {
    id: 11,
    name: "Galaxy A14 (4GB | 64 GB )",
    price: "BDT 11999",
    originalPrice: "BDT 15999",
    save: "BDT 4000",
    discount: "25%",
    image: "/Assets/Galaxy-A14.png",
    category: "Mobile",
  },
  {
    id: 12,
    name: "Galaxy A24 (6GB | 128 GB )",
    price: "BDT 18999",
    originalPrice: "BDT 22999",
    save: "BDT 4000",
    discount: "17%",
    image: "/Assets/Galaxy-A24.png",
    category: "Mobile",
  },
  {
    id: 13,
    name: "Galaxy S21 FE (8GB | 128 GB )",
    price: "BDT 39999",
    originalPrice: "BDT 49999",
    save: "BDT 10000",
    discount: "20%",
    image: "/Assets/Galaxy-S21FE.png",
    category: "Mobile",
  },
  {
    id: 14,
    name: "Galaxy M14 (4GB | 64 GB )",
    price: "BDT 12999",
    originalPrice: "BDT 17999",
    save: "BDT 5000",
    discount: "28%",
    image: "/Assets/Galaxy-M14.png",
    category: "Mobile",
  },
  {
    id: 15,
    name: "Galaxy A73 (8GB | 128 GB )",
    price: "BDT 34999",
    originalPrice: "BDT 42999",
    save: "BDT 8000",
    discount: "19%",
    image: "/Assets/Galaxy-A73.png",
    category: "Mobile",
  },
  {
    id: 16,
    name: "Galaxy S23 Ultra (12GB | 256 GB )",
    price: "BDT 94999",
    originalPrice: "BDT 119999",
    save: "BDT 25000",
    discount: "21%",
    image: "/Assets/Galaxy-S23.png",
    category: "Mobile",
  },
  {
    id: 17,
    name: "Galaxy M54 (8GB | 128 GB )",
    price: "BDT 26999",
    originalPrice: "BDT 32999",
    save: "BDT 6000",
    discount: "18%",
    image: "/Assets/Galaxy-M54.png",
    category: "Mobile",
  },
  {
    id: 18,
    name: "Galaxy A52s (8GB | 128 GB )",
    price: "BDT 24999",
    originalPrice: "BDT 29999",
    save: "BDT 5000",
    discount: "17%",
    image: "/Assets/Galaxy-A52s.png",
    category: "Mobile",
  },
  {
    id: 19,
    name: "Galaxy Z Flip 4",
    price: "BDT 79999",
    originalPrice: "BDT 99999",
    save: "BDT 20000",
    discount: "20%",
    image: "/Assets/Galaxy-Z-Flip-4.png",
    category: "Mobile",
  },
  {
    id: 20,
    name: "Galaxy A04 (3GB | 32 GB )",
    price: "BDT 7999",
    originalPrice: "BDT 9999",
    save: "BDT 2000",
    discount: "20%",
    image: "/Assets/Galaxy-A04.png",
    category: "Mobile",
  },
];

// Cosmetics products
const cosmetics = [
  createProduct(101, "L'Oreal Paris Foundation", "BDT 1299", "BDT 1999", "35%", "/Assets/image.png", "Cosmetics"),
  createProduct(102, "Maybelline Mascara", "BDT 599", "BDT 899", "33%", "/Assets/image.png", "Cosmetics"),
  createProduct(103, "MAC Lipstick Set", "BDT 2499", "BDT 3499", "29%", "/Assets/image.png", "Cosmetics"),
  createProduct(104, "Nivea Face Cream", "BDT 799", "BDT 1199", "33%", "/Assets/image.png", "Cosmetics"),
  createProduct(105, "Garnier Hair Mask", "BDT 699", "BDT 999", "30%", "/Assets/image.png", "Cosmetics"),
  createProduct(106, "Lakme Kajal", "BDT 199", "BDT 299", "33%", "/Assets/image.png", "Cosmetics"),
  createProduct(107, "Ponds Face Wash", "BDT 399", "BDT 599", "33%", "/Assets/image.png", "Cosmetics"),
  createProduct(108, "Revlon Nail Polish Set", "BDT 899", "BDT 1299", "31%", "/Assets/image.png", "Cosmetics"),
];

// Electronics products
const electronics = [
  createProduct(201, "Samsung 55\" 4K Smart TV", "BDT 89999", "BDT 119999", "25%", "/Assets/Galaxy-S22-Ultra.png", "Electronics"),
  createProduct(202, "LG Washing Machine", "BDT 44999", "BDT 59999", "25%", "/Assets/image.png", "Electronics"),
  createProduct(203, "Sony Soundbar", "BDT 15999", "BDT 21999", "27%", "/Assets/hero-headphone.png", "Electronics"),
  createProduct(204, "Panasonic Refrigerator", "BDT 54999", "BDT 69999", "21%", "/Assets/image.png", "Electronics"),
  createProduct(205, "Whirlpool Microwave", "BDT 12999", "BDT 17999", "28%", "/Assets/image.png", "Electronics"),
  createProduct(206, "Philips Air Fryer", "BDT 8999", "BDT 12999", "31%", "/Assets/image.png", "Electronics"),
  createProduct(207, "Bosch Mixer Grinder", "BDT 4999", "BDT 6999", "29%", "/Assets/image.png", "Electronics"),
  createProduct(208, "Canon DSLR Camera", "BDT 79999", "BDT 99999", "20%", "/Assets/Galaxy-S23.png", "Electronics"),
];

// Furniture products
const furniture = [
  createProduct(301, "Modern Sofa Set", "BDT 49999", "BDT 69999", "29%", "/Assets/image.png", "Furniture"),
  createProduct(302, "Wooden Dining Table", "BDT 29999", "BDT 39999", "25%", "/Assets/image.png", "Furniture"),
  createProduct(303, "Office Chair", "BDT 8999", "BDT 12999", "31%", "/Assets/image.png", "Furniture"),
  createProduct(304, "Queen Size Bed", "BDT 39999", "BDT 54999", "27%", "/Assets/image.png", "Furniture"),
  createProduct(305, "Bookshelf Unit", "BDT 14999", "BDT 19999", "25%", "/Assets/image.png", "Furniture"),
  createProduct(306, "Coffee Table", "BDT 7999", "BDT 10999", "27%", "/Assets/image.png", "Furniture"),
  createProduct(307, "Wardrobe Cabinet", "BDT 34999", "BDT 44999", "22%", "/Assets/image.png", "Furniture"),
  createProduct(308, "Study Desk", "BDT 11999", "BDT 15999", "25%", "/Assets/image.png", "Furniture"),
];

// Watches products
const watches = [
  createProduct(401, "Apple Watch Series 9", "BDT 49999", "BDT 59999", "17%", "/Assets/hero-smart-watch.png", "Watches"),
  createProduct(402, "Samsung Galaxy Watch", "BDT 29999", "BDT 39999", "25%", "/Assets/hero-smart-watch.png", "Watches"),
  createProduct(403, "Fossil Men's Watch", "BDT 8999", "BDT 12999", "31%", "/Assets/hero-smart-watch.png", "Watches"),
  createProduct(404, "Casio G-Shock", "BDT 5999", "BDT 8999", "33%", "/Assets/hero-smart-watch.png", "Watches"),
  createProduct(405, "Titan Analog Watch", "BDT 3999", "BDT 5999", "33%", "/Assets/hero-smart-watch.png", "Watches"),
  createProduct(406, "Rolex Classic", "BDT 299999", "BDT 399999", "25%", "/Assets/hero-smart-watch.png", "Watches"),
  createProduct(407, "Smart Fitness Band", "BDT 2999", "BDT 4999", "40%", "/Assets/hero-smart-watch.png", "Watches"),
  createProduct(408, "Seiko Automatic Watch", "BDT 19999", "BDT 24999", "20%", "/Assets/hero-smart-watch.png", "Watches"),
];

// Decor products
const decor = [
  createProduct(501, "Wall Art Canvas Set", "BDT 2999", "BDT 4999", "40%", "/Assets/hero-groceries.png", "Decor"),
  createProduct(502, "Decorative Vase Set", "BDT 1999", "BDT 2999", "33%", "/Assets/hero-groceries.png", "Decor"),
  createProduct(503, "LED String Lights", "BDT 799", "BDT 1299", "38%", "/Assets/image.png", "Decor"),
  createProduct(504, "Photo Frame Collection", "BDT 1499", "BDT 2499", "40%", "/Assets/image.png", "Decor"),
  createProduct(505, "Indoor Plants Set", "BDT 2499", "BDT 3999", "38%", "/Assets/hero-groceries.png", "Decor"),
  createProduct(506, "Candle Holder Set", "BDT 999", "BDT 1599", "38%", "/Assets/image.png", "Decor"),
  createProduct(507, "Wall Clock Modern", "BDT 3999", "BDT 5999", "33%", "/Assets/image.png", "Decor"),
  createProduct(508, "Throw Pillow Set", "BDT 1999", "BDT 2999", "33%", "/Assets/image.png", "Decor"),
];

// Accessories products
const accessories = [
  createProduct(601, "Leather Wallet", "BDT 1999", "BDT 2999", "33%", "/Assets/image.png", "Accessories"),
  createProduct(602, "Sunglasses Aviator", "BDT 2999", "BDT 4999", "40%", "/Assets/image.png", "Accessories"),
  createProduct(603, "Leather Belt", "BDT 1499", "BDT 2299", "35%", "/Assets/image.png", "Accessories"),
  createProduct(604, "Backpack Travel", "BDT 3999", "BDT 5999", "33%", "/Assets/image.png", "Accessories"),
  createProduct(605, "Phone Case Set", "BDT 799", "BDT 1299", "38%", "/Assets/hero-headphone.png", "Accessories"),
  createProduct(606, "Watch Strap Collection", "BDT 999", "BDT 1599", "38%", "/Assets/hero-smart-watch.png", "Accessories"),
  createProduct(607, "Keychain Set", "BDT 499", "BDT 799", "38%", "/Assets/image.png", "Accessories"),
  createProduct(608, "Hair Accessories Set", "BDT 699", "BDT 1099", "36%", "/Assets/image.png", "Accessories"),
];

// Combine all products
const allProducts = [...phones, ...cosmetics, ...electronics, ...furniture, ...watches, ...decor, ...accessories];

const categories = [
  {
    name: "Mobile",
    image: "https://api.builder.io/api/v1/image/assets/TEMP/aee14e932c123a9f58f27f324d2238ccea1c37fe?width=104",
  },
  {
    name: "Cosmetics",
    image: "https://api.builder.io/api/v1/image/assets/TEMP/03091a57fd844d51962052e5a33c4a48e3eb7d24?width=104",
  },
  {
    name: "Electronics",
    image: "https://api.builder.io/api/v1/image/assets/TEMP/54a2cb0acfdead3550f2554ab3c5a027d97618df?width=264",
  },
  {
    name: "Furniture",
    image: "https://api.builder.io/api/v1/image/assets/TEMP/64007f3d07f04a7b57f18cbef39ac33428206cd4?width=248",
  },
  {
    name: "Watches",
    image: "https://api.builder.io/api/v1/image/assets/TEMP/14cf08b369828c3ef7b0d63c25ac5e156c270b00?width=184",
  },
  {
    name: "Decor",
    image: "https://api.builder.io/api/v1/image/assets/TEMP/23bcf8808f618775370d3f397742293dc84fd0cb?width=236",
  },
  {
    name: "Accessories",
    image: "https://api.builder.io/api/v1/image/assets/TEMP/38422b0fe2b00de0ecc59c901b13f38b6057cfa7?width=248",
  },
];

const brands = [
  {
    name: "Apple",
    label: "IPHONE",
    discount: "UP to 80% OFF",
    bgColor: "#313131",
    labelBg: "#494949",
    image: "https://api.builder.io/api/v1/image/assets/TEMP/b942449d6878d7232a3a5a4afb80c0def6ca0b9f?width=208",
  },
  {
    name: "Realme",
    label: "REALME",
    discount: "UP to 80% OFF",
    bgColor: "#FFF3CC",
    labelBg: "#F6DE8D",
    textColor: "#222",
    image: "https://api.builder.io/api/v1/image/assets/TEMP/6998239222019aa2c0c036217fb88756cd0da01b?width=316",
  },
  {
    name: "Xiaomi",
    label: "XIAOMI",
    discount: "UP to 80% OFF",
    bgColor: "#FFECDF",
    labelBg: "#FFD1B0",
    textColor: "#222",
    image: "https://api.builder.io/api/v1/image/assets/TEMP/8c8aad1162536c22ade365fa70c7bd2dbe0deb5c?width=304",
  },
  {
    name: "Samsung",
    label: "SAMSUNG",
    discount: "UP to 75% OFF",
    bgColor: "#E3F2FD",
    labelBg: "#90CAF9",
    textColor: "#1565C0",
    image: "https://api.builder.io/api/v1/image/assets/TEMP/b942449d6878d7232a3a5a4afb80c0def6ca0b9f?width=208",
  },
  {
    name: "OnePlus",
    label: "ONEPLUS",
    discount: "UP to 70% OFF",
    bgColor: "#F3E5F5",
    labelBg: "#CE93D8",
    textColor: "#7B1FA2",
    image: "https://api.builder.io/api/v1/image/assets/TEMP/6998239222019aa2c0c036217fb88756cd0da01b?width=316",
  },
  {
    name: "Oppo",
    label: "OPPO",
    discount: "UP to 65% OFF",
    bgColor: "#E8F5E9",
    labelBg: "#A5D6A7",
    textColor: "#2E7D32",
    image: "https://api.builder.io/api/v1/image/assets/TEMP/8c8aad1162536c22ade365fa70c7bd2dbe0deb5c?width=304",
  },
];

const essentials = [
  {
    name: "Daily Essentials",
    discount: "UP to 50% OFF",
    image: "https://api.builder.io/api/v1/image/assets/TEMP/6f6b806f5e8110d474a8ab02a320eadcb7a25363?width=290",
  },
  {
    name: "Vegetables",
    discount: "UP to 50% OFF",
    image: "https://api.builder.io/api/v1/image/assets/TEMP/01586b6d6bbfa6367c94b38677f42e248cc75741?width=366",
  },
  {
    name: "Fruits",
    discount: "UP to 50% OFF",
    image: "https://api.builder.io/api/v1/image/assets/TEMP/2cee438911892447d476c37a657669f40c4f98a0?width=352",
  },
  {
    name: "Strawberry",
    discount: "UP to 50% OFF",
    image: "https://api.builder.io/api/v1/image/assets/TEMP/86edb31296d6f71e36ec26b7f3af0e8eff525bc4?width=332",
  },
  {
    name: "Mango",
    discount: "UP to 50% OFF",
    image: "https://api.builder.io/api/v1/image/assets/TEMP/f7f533832b978034699f0a49cb63462aa6d658c1?width=336",
  },
  {
    name: "Cherry",
    discount: "UP to 50% OFF",
    image: "https://api.builder.io/api/v1/image/assets/TEMP/d12e46a5a9a023192cc4a9b41424b89864f53f0c?width=264",
  },
];

export default function Index() {
  return (
    <div className="w-full bg-white">
      <Header />
      <main className="bg-white">
        <HeroCarousel />
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-12 md:py-16">
          <ProductSection title="Best deal on" highlight="Smartphones" products={phones} />
          <CategoriesGrid categories={categories} allProducts={allProducts} />
          <BrandsCarousel brands={brands} />
          <EssentialsSection items={essentials} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
