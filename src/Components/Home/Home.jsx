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
        sortOrder: 'asc',
        dateSort: 'desc' // Default to descending for date sorting
    });
    const [brands, setBrands] = useState([]);
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchProducts();
        fetchBrands();
        fetchCategories(); // Fetch categories on component mount
    }, [page, filters]);

    const fetchProducts = async () => {
        try {
            const { data } = await axios.get('http://localhost:5000/api/products', {
                params: {
                    page,
                    ...filters
                }
            });
            setProducts(data.products);
            setTotalPages(data.totalPages);
        } catch (error) {
            console.error("Error fetching products", error);
            setError('Error fetching products.');
        }
    };

    const fetchBrands = async () => {
        try {
            const { data } = await axios.get('http://localhost:5000/api/brands');
            setBrands(data.brands);
        } catch (error) {
            console.error("Error fetching brands", error);
            setError('Error fetching brands.');
        }
    };

    const fetchCategories = async () => {
        try {
            const { data } = await axios.get('http://localhost:5000/api/categories');
            setCategories(data.categories);
        } catch (error) {
            console.error("Error fetching categories", error);
            setError('Error fetching categories.');
        }
    };

    const handleFilterChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
        setPage(1); // Reset to the first page when filters change
    };

    return (
        <div className="">
            <div className="bg-red-500">
                <h1 className="text-3xl font-bold mb-4 text-center">Search Products</h1>

                {error && <p className="text-red-500 text-center mb-4">{error}</p>}

                {/* Filters */}
                <div className="mb-6 container mx-auto p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <input
                            name="search"
                            placeholder="Search by name"
                            onChange={handleFilterChange}
                            className="input input-bordered w-full"
                        />
                        <select
                            name="brandName"
                            onChange={handleFilterChange}
                            className="select select-bordered w-full"
                        >
                            <option value="">Select brand</option>
                            {brands.map((brand) => (
                                <option key={brand} value={brand}>
                                    {brand}
                                </option>
                            ))}
                        </select>
                        <select
                            name="category"
                            onChange={handleFilterChange}
                            className="select select-bordered w-full"
                        >
                            <option value="">Select category</option>
                            {categories.map((category) => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
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
                            <option value="date">Date Added</option>
                        </select>
                        {filters.sortBy === 'price' && (
                            <select
                                name="sortOrder"
                                onChange={handleFilterChange}
                                className="select select-bordered w-full"
                            >
                                <option value="asc">Price: Low to High</option>
                                <option value="desc">Price: High to Low</option>
                            </select>
                        )}
                        {filters.sortBy === 'date' && (
                            <select
                                name="dateSort"
                                onChange={handleFilterChange}
                                className="select select-bordered w-full"
                            >
                                <option value="desc">Newest</option>
                                <option value="asc">Oldest</option>
                            </select>
                        )}
                    </div>
                </div>
            </div>

            {/* Product List */}
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6 container mx-auto p-4">
                {products.map((product) => (
                    <li key={product._id} className="card bg-base-100 shadow-md p-4">
                        <img className="" src={product.productImage} alt="" />
                        <h2 className="card-title">{product.productName}</h2>
                        <p className="text-sm text-gray-500">Brand: {product.brandName}</p>
                        <p className="text-sm text-gray-500">Category: {product.category}</p>
                        <p className="text-sm text-gray-500">Created: {new Date(product.productCreationDateTime).toLocaleDateString()}</p>
                        <p className="text-xl font-semibold">${product.price}</p>
                    </li>
                ))}
            </ul>

            {/* Pagination */}
            <div className="flex justify-between items-center mt-6 mb-6 container mx-auto p-4">
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
