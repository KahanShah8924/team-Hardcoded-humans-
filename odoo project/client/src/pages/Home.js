import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ShoppingBag, Heart, Star } from "lucide-react";
import { useQuery } from "react-query";
import axios from "axios";

const Home = () => {
  const { data: featuredProducts } = useQuery("featuredProducts", async () => {
    const response = await axios.get(
      "/api/products?limit=8&sort=views&order=desc"
    );
    return response.data.products;
  });

  const categories = [
    {
      name: "Women",
      image:
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400",
      count: "2.5k items",
    },
    {
      name: "Men",
      image:
        "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=400",
      count: "1.8k items",
    },
    {
      name: "Accessories",
      image:
        "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=400",
      count: "950 items",
    },
    {
      name: "Home",
      image:
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400",
      count: "650 items",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Sustainable Fashion
                <span className="block text-green-400">For Everyone</span>
              </h1>
              <p className="text-xl mb-8 text-gray-100">
                Buy and sell pre-loved clothing and accessories. Join thousands
                of people making fashion more sustainable, one piece at a time.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/products"
                  className="btn bg-white text-primary-600 hover:bg-gray-100 px-8 py-3 text-lg"
                >
                  Shop Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  to="/sell"
                  className="btn border-2 border-white text-white hover:bg-white hover:text-primary-600 px-8 py-3 text-lg"
                >
                  Start Selling
                </Link>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="bg-white/10 rounded-lg p-4">
                    <ShoppingBag className="h-8 w-8 mb-2" />
                    <h3 className="font-semibold">Buy Pre-loved</h3>
                    <p className="text-sm text-gray-200">
                      Quality items at great prices
                    </p>
                  </div>
                  <div className="bg-white/10 rounded-lg p-4">
                    <Heart className="h-8 w-8 mb-2" />
                    <h3 className="font-semibold">Sustainable</h3>
                    <p className="text-sm text-gray-200">
                      Reduce fashion waste
                    </p>
                  </div>
                </div>
                <div className="space-y-4 pt-8">
                  <div className="bg-white/10 rounded-lg p-4">
                    <Star className="h-8 w-8 mb-2" />
                    <h3 className="font-semibold">Quality Assured</h3>
                    <p className="text-sm text-gray-200">All items verified</p>
                  </div>
                  <div className="bg-white/10 rounded-lg p-4">
                    <div className="h-8 w-8 mb-2 bg-green-400 rounded-full flex items-center justify-center">
                      <span className="text-green-900 font-bold">$</span>
                    </div>
                    <h3 className="font-semibold">Earn Money</h3>
                    <p className="text-sm text-gray-200">
                      Sell your unused items
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Shop by Category
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover thousands of pre-loved items across all categories. From
              designer clothing to everyday essentials.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link
                key={category.name}
                to={`/products?category=${category.name}`}
                className="group block"
              >
                <div className="relative overflow-hidden rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <h3 className="font-semibold text-lg">{category.name}</h3>
                    <p className="text-sm opacity-90">{category.count}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Featured Items
              </h2>
              <p className="text-gray-600">Handpicked items you'll love</p>
            </div>
            <Link
              to="/products"
              className="text-primary-600 hover:text-primary-700 font-medium flex items-center"
            >
              View All
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>

          {featuredProducts ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <div key={product._id} className="product-card group">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img
                      src={product.images[0]}
                      alt={product.title}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 right-2">
                      <button className="p-2 bg-white/80 rounded-full hover:bg-white transition-colors">
                        <Heart className="h-4 w-4 text-gray-600" />
                      </button>
                    </div>
                    <div className="absolute bottom-2 left-2">
                      <span className="px-2 py-1 bg-green-500 text-white text-xs rounded-full">
                        {product.condition}
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-gray-900 mb-1 truncate">
                      {product.title}
                    </h3>
                    <p className="text-sm text-gray-500 mb-2">
                      {product.brand}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-gray-900">
                        ${product.price}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">
                          ${product.originalPrice}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="product-card animate-pulse">
                  <div className="bg-gray-200 h-64 rounded-t-lg" />
                  <div className="p-4">
                    <div className="h-4 bg-gray-200 rounded mb-2" />
                    <div className="h-3 bg-gray-200 rounded mb-2" />
                    <div className="h-4 bg-gray-200 rounded w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Selling?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Turn your unused clothing into cash. Join thousands of sellers who
            are making money while helping the environment.
          </p>
          <Link
            to="/sell"
            className="btn bg-primary-600 hover:bg-primary-700 px-8 py-3 text-lg"
          >
            Start Selling Today
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
