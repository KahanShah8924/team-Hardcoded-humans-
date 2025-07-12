import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { User, Mail, Phone, MapPin, Edit, Save, X } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import toast from "react-hot-toast";

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
      address: {
        street: user?.address?.street || "",
        city: user?.address?.city || "",
        state: user?.address?.state || "",
        zipCode: user?.address?.zipCode || "",
        country: user?.address?.country || "",
      },
    },
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    const success = await updateProfile(data);
    if (success) {
      setIsEditing(false);
      reset(data);
    }
    setIsLoading(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    reset();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
          <p className="text-gray-600">
            Manage your account information and preferences
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Information */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Account Information
                  </h2>
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="flex items-center space-x-2 text-primary-600 hover:text-primary-700"
                  >
                    {isEditing ? (
                      <X className="h-4 w-4" />
                    ) : (
                      <Edit className="h-4 w-4" />
                    )}
                    <span>{isEditing ? "Cancel" : "Edit"}</span>
                  </button>
                </div>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        {...register("name", { required: "Name is required" })}
                        disabled={!isEditing}
                        className={`input pl-10 ${
                          !isEditing ? "bg-gray-50" : ""
                        } ${errors.name ? "border-red-500" : ""}`}
                      />
                    </div>
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <input
                        type="email"
                        {...register("email", {
                          required: "Email is required",
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Invalid email address",
                          },
                        })}
                        disabled={!isEditing}
                        className={`input pl-10 ${
                          !isEditing ? "bg-gray-50" : ""
                        } ${errors.email ? "border-red-500" : ""}`}
                      />
                    </div>
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <input
                        type="tel"
                        {...register("phone")}
                        disabled={!isEditing}
                        className={`input pl-10 ${
                          !isEditing ? "bg-gray-50" : ""
                        }`}
                      />
                    </div>
                  </div>

                  {/* Street Address */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Street Address
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        {...register("address.street")}
                        disabled={!isEditing}
                        className={`input pl-10 ${
                          !isEditing ? "bg-gray-50" : ""
                        }`}
                      />
                    </div>
                  </div>

                  {/* City */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      City
                    </label>
                    <input
                      type="text"
                      {...register("address.city")}
                      disabled={!isEditing}
                      className={`input ${!isEditing ? "bg-gray-50" : ""}`}
                    />
                  </div>

                  {/* State */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      State
                    </label>
                    <input
                      type="text"
                      {...register("address.state")}
                      disabled={!isEditing}
                      className={`input ${!isEditing ? "bg-gray-50" : ""}`}
                    />
                  </div>

                  {/* ZIP Code */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      ZIP Code
                    </label>
                    <input
                      type="text"
                      {...register("address.zipCode")}
                      disabled={!isEditing}
                      className={`input ${!isEditing ? "bg-gray-50" : ""}`}
                    />
                  </div>

                  {/* Country */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Country
                    </label>
                    <input
                      type="text"
                      {...register("address.country")}
                      disabled={!isEditing}
                      className={`input ${!isEditing ? "bg-gray-50" : ""}`}
                    />
                  </div>
                </div>

                {isEditing && (
                  <div className="flex items-center justify-end space-x-4 mt-6 pt-6 border-t border-gray-200">
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="btn btn-outline"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="btn btn-primary"
                    >
                      {isLoading ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      ) : (
                        <>
                          <Save className="h-4 w-4 mr-2" />
                          Save Changes
                        </>
                      )}
                    </button>
                  </div>
                )}
              </form>
            </div>
          </div>

          {/* Account Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Account Summary
              </h3>

              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600">Member Since</p>
                  <p className="font-medium">
                    {new Date(user?.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-600">Account Type</p>
                  <p className="font-medium capitalize">{user?.role}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-600">Email Verified</p>
                  <p className="font-medium">
                    {user?.isVerified ? "Yes" : "No"}
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="font-medium text-gray-900 mb-3">
                  Quick Actions
                </h4>
                <div className="space-y-2">
                  <button className="w-full text-left text-sm text-primary-600 hover:text-primary-700">
                    View Order History
                  </button>
                  <button className="w-full text-left text-sm text-primary-600 hover:text-primary-700">
                    Manage Wishlist
                  </button>
                  <button className="w-full text-left text-sm text-primary-600 hover:text-primary-700">
                    Change Password
                  </button>
                  <button className="w-full text-left text-sm text-red-600 hover:text-red-700">
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
