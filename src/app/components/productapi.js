import api from "../apiConfig/axiosConfig";

const buildFormData = (products) => {
  const formData = new FormData();

  products.forEach((product, index) => {
    // Append product ID if exists (needed for update)
    if (product._id) {
      formData.append(`products[${index}][_id]`, product._id);
    }

    // Append other fields as before
    formData.append(
      `products[${index}][productName]`,
      product.productName || ""
    );
    formData.append(
      `products[${index}][productPrice]`,
      product.productPrice || ""
    );
    formData.append(
      `products[${index}][productType]`,
      product.productType || ""
    );
    formData.append(`products[${index}][hsnCode]`, product.hsnCode || "");
    formData.append(`products[${index}][gst]`, product.gst || "");
    formData.append(`products[${index}][units]`, product.units || "");
    formData.append(`products[${index}][category]`, product.category || "");
    formData.append(`products[${index}][discount]`, product.discount || null);
    // Append files with "productImages" key for Multer
    if (product.productImage instanceof File) {
      formData.append("productImages", product.productImage);
    } else if (
      typeof product.productImage === "string" &&
      product.productImage
    ) {
      formData.append(
        `products[${index}][productImageUrl]`,
        product.productImage
      );
    }
  });

  return formData;
};

export const addProducts = async (products) => {
  const token = localStorage.getItem("authToken");
  const formData = buildFormData(products);

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  };

  return api.post("/api/products-details", formData, config);
};

export const updateProductById = (productId, productData) => {
  console.log("Updating product:", productId, productData);
  const token = localStorage.getItem("authToken");
  const formData = buildFormData([productData]); // wrap in array if needed
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  };
  return api.put(`/api/products-details/${productId}`, formData, config);
};

export const deleteProductById = async (productId) => {
  const token = localStorage.getItem("authToken");
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  return api.delete(`/api/products-details/${productId}`, config);
};
