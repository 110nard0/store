// HDR: Cart data
const cartData = [
  {
    id: 1,
    title: "Black Sweatshirt",
    price: 60000,
    stock: 20,
    quantity: 2,
  },
  {
    id: 2,
    title: "Yellow Sweatshirt",
    price: 30000,
    stock: 9,
    quantity: 2,
  },
  {
    id: 3,
    title: "Test Sweatshirt",
    price: 80000,
    stock: 80,
    quantity: 1,
  },
  {
    id: 4,
    title: "Black Sweatshirt 2",
    price: 60000,
    stock: 20,
    quantity: 5,
  },
  {
    id: 5,
    title: "Black shirt",
    price: 70000,
    stock: 2,
    quantity: 1,
  },
  {
    id: 6,
    title: "Sweatshirt",
    price: 20000,
    stock: 20,
    quantity: 1,
  },
  {
    id: 7,
    title: "Black Sweatshirt 3",
    price: 40000,
    stock: 30,
    quantity: 1,
  },
  {
    id: 8,
    title: "Black 1",
    price: 90000,
    stock: 29,
    quantity: 3,
  },
  {
    id: 9,
    title: "Black 3",
    price: 10000,
    stock: 18,
    quantity: 1,
  },
  {
    id: 10,
    title: "Black 4",
    price: 50000,
    stock: 10,
    quantity: 1,
  },
];

// HDR: CMS

// SUB: CMS All Products data
const productsData = [
  {
    key: "1",
    id: 1,
    product: "Wool Wicket",
    preference: "Streetwear",
    description:
      "This is a dummy product description text.Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum quas harum nostrum? Voluptatibus perspiciatis suscipit itaque commodi nobis tempora voluptas nisi dolorem, porro rem unde et quod consectetur, placeat culpa",
    category: "Tops",
    size: "XL",
    colour: "Sable : #B45309",
    price: 50000,
    stock: 25,
    show: true,
  },
  {
    key: "2",
    id: 2,
    product: "Black Sweater",
    preference: "Chic",
    description:
      "This is a dummy product description text.Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum quas harum nostrum? Voluptatibus perspiciatis suscipit itaque commodi nobis tempora voluptas nisi dolorem, porro rem unde et quod consectetur, placeat culpa",
    category: "Tops",
    size: "XS",
    colour: "Moon : #D0D5DD",
    price: 80000,
    stock: 30,
    show: false,
  },
  {
    key: "5",
    id: 5,
    product: "Orange Sweater",
    preference: "Casual",
    category: "Bottoms",
    size: "XS",
    description:
      "This is a dummy product description text.Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum quas harum nostrum? Voluptatibus perspiciatis suscipit itaque commodi nobis tempora voluptas nisi dolorem, porro rem unde et quod consectetur, placeat culpa",
    colour: "Soot : #323A46",
    price: 30000,
    stock: 15,
    show: true,
  },
  {
    key: "8",
    id: 8,
    product: "Blue Trouser, (In the case of a very long text)",
    preference: "Streetwear",
    category: "Bottoms",
    size: "S",
    description:
      "This is a dummy product description text.Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum quas harum nostrum? Voluptatibus perspiciatis suscipit itaque commodi nobis tempora voluptas nisi dolorem, porro rem unde et quod consectetur, placeat culpa",
    colour: "Moon : #D0D5DD",
    price: 30000,
    stock: 10,
    show: false,
  },
];

// SUB: CMS sizes data
const sizesData = [
  {
    sizename: "Extra small",
    sizevalue: "XS",
    key: "1",
    id: 1,
  },
  {
    sizename: "Small",
    sizevalue: "S",
    key: "2",
    id: 2,
  },
  {
    sizename: "Extra large",
    sizevalue: "XL",
    key: "3",
    id: 3,
  },
];

// SUB: CMS colours data
const colourData = [
  {
    colour: "Soot",
    hex: "#323A46",
    key: "1",
    id: 1,
  },
  {
    colour: "Sable",
    hex: "#B45309",
    key: "2",
    id: 2,
  },
  {
    colour: "Moon",
    hex: "#D0D5DD",
    key: "3",
    id: 3,
  },
];

// SUB: Prefernces colours data
const preferenceData = [
  {
    preference: "Streetwear",
    key: "1",
    id: 1,
  },
  {
    preference: "Chic",
    key: "2",
    id: 2,
  },
  {
    preference: "Casual",
    key: "3",
    id: 3,
  },
];

const categoryData = [
  {
    category: "Tops",
    key: "1",
    id: 1,
  },
  {
    category: "Bottoms",
    key: "2",
    id: 2,
  },
];

// HDR: Features page sizes data

// SUB: Tops Data
const topsData = [
  { size: "M", shoulder: "15-17", chest: "15-17", length: "24-29" },
  { size: "L", shoulder: "17-19", chest: "16-19", length: "24-29" },
  { size: "XL", shoulder: "19-21.5", chest: "19-21.5", length: "24-29" },
  { size: "XXL", shoulder: "21.5-24", chest: "21.5-24", length: "24-29" },
];

// SUB: Bottoms Data

const bottomsData = [
  { size: "M", shoulder: "31-33", chest: "16-18", length: "36-38" },
  { size: "L", shoulder: "33-36", chest: "18-20", length: "38-42" },
  { size: "XL", shoulder: "36-38", chest: "20-23", length: "39-43" },
  { size: "XL", shoulder: "38-40", chest: "23-25", length: "40-44" },
];

// HDR: Exports

export {
  sizesData,
  productsData,
  preferenceData,
  cartData,
  topsData,
  bottomsData,
  colourData,
  categoryData,
};
