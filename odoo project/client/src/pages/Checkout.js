import React from "react";

const Checkout = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Checkout Page
          </h2>
          <p className="text-gray-600">
            This page will contain the checkout form and payment processing.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
