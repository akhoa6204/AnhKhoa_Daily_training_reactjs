export const ENDPOINT = {
  PRODUCTS: "/products",
  PRODUCT_DETAIL: (id: number | string) => `/products/${id}`,
  PRODUCT_SEARCH: "/products/search",
  PRODUCT_CATEGORIES: "/products/categories",
  PRODUCT_BY_CATEGORY: (category: string) => `/products/category/${category}`,
};
