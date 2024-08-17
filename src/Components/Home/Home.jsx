import axios from "axios";
import { useEffect, useState } from "react";

const Home = () => {
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [filters, setFilters] = useState({
        brandName: '',
        category: '',
        minPrice: '',
        maxPrice: '',
        search: '',
        sortBy: '',
        sortOrder: 'asc'
    });

    useEffect(() => {
        fetchProducts();
    }, [page, filters]);

    const fetchProducts = async () => {
        const { data } = await axios.get('http://localhost:5000/api/products', {
            params: {
                page,
                ...filters
            }
        });
        setProducts(data.products);
        setTotalPages(data.totalPages);
    };

    const handleFilterChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
        setPage(1); // Reset to the first page when filters change
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4 text-center">Products</h1>

            {/* Filters */}
            <div className="mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <input
                        name="search"
                        placeholder="Search by name"
                        onChange={handleFilterChange}
                        className="input input-bordered w-full"
                    />
                    <input
                        name="brandName"
                        placeholder="Filter by brand"
                        onChange={handleFilterChange}
                        className="input input-bordered w-full"
                    />
                    <input
                        name="category"
                        placeholder="Filter by category"
                        onChange={handleFilterChange}
                        className="input input-bordered w-full"
                    />
                    <input
                        name="minPrice"
                        placeholder="Min price"
                        onChange={handleFilterChange}
                        className="input input-bordered w-full"
                    />
                    <input
                        name="maxPrice"
                        placeholder="Max price"
                        onChange={handleFilterChange}
                        className="input input-bordered w-full"
                    />
                    <select
                        name="sortBy"
                        onChange={handleFilterChange}
                        className="select select-bordered w-full"
                    >
                        <option value="">Sort by</option>
                        <option value="price">Price</option>
                        <option value="dateAdded">Date Added</option>
                    </select>
                    <select
                        name="sortOrder"
                        onChange={handleFilterChange}
                        className="select select-bordered w-full"
                    >
                        <option value="asc">Ascending</option>
                        <option value="desc">Descending</option>
                    </select>
                </div>
            </div>

            {/* Product List */}
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                    <li key={product._id} className="card bg-base-100 shadow-md p-4">
                        <h2 className="card-title">{product.productName}</h2>
                        <p className="text-sm text-gray-500">Brand: {product.brandName}</p>
                        <p className="text-sm text-gray-500">Category: {product.category}</p>
                        <p className="text-xl font-semibold">${product.price}</p>
                    </li>
                ))}
            </ul>

            {/* Pagination */}
            <div className="flex justify-between items-center mt-6">
                <button
                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                    disabled={page === 1}
                    className="btn btn-primary"
                >
                    Previous
                </button>
                <span className="text-lg">
                    Page {page} of {totalPages}
                </span>
                <button
                    onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={page === totalPages}
                    className="btn btn-primary"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Home;
