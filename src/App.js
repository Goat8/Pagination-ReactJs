import { useEffect, useState } from "react";
import "./styles.css";

export default function App() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const fetchProducts = async () => {
    const response = await fetch("https://dummyjson.com/products");
    const data = await response.json();

    if (data && data.products) {
      setProducts(data.products);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const selectPageHanlder = (index) => {
    if (index >= 1 && index < products.length / 10 && index !== page) {
      setPage(index);
    }
  };
  return (
    <div>
      {products.length > 0 ? (
        <div className="products">
          {products.slice(page * 10 - 10, page * 10).map((product) => {
            return (
              <span className="products__single" key={product.key}>
                <img src={product.thumbnail} alt={product.title} />
                <span>{product.title}</span>
              </span>
            );
          })}
        </div>
      ) : null}
      {products.length > 0 && (
        <div className="pagination">
          <span className="font-size">{`👈`}</span>
          {[...Array(products.length / 10)].map((_, index) => {
            return (
              <span
                className={page === index + 1 ? "active" : ""}
                onClick={() => selectPageHanlder(index + 1)}
              >
                {index + 1}
              </span>
            );
          })}
          <span className="font-size">{`👉`}</span>
        </div>
      )}
    </div>
  );
}
