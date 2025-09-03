export interface Params {
  q?: string; // search query
  limit?: number; // số sản phẩm trả về
  skip?: number; // offset cho phân trang
  select?: string; // chọn field (vd: "title,price")
}
