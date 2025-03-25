import Product from '../models/Products.js';

/* Add products to the database - only admins */
export function addProducts(req, res) {

    if (req.user == null) {
        res.status(401).json({
            message: "Please login and try again"
        });
        return;
    }

    if (req.user.role != "admin") {
        res.status(403).json({
            message: "You are not allowed to add products"
        });
        return;
    }

    const productData = req.body;
    const newProduct = new Product(productData);

    newProduct.save()
        .then(() => {
            res.status(200).json("Product added successfully");
        })
        .catch((err) => {
            res.status(500).json("Cannot add product: " + err);
        });
}

/* Get products for customer dashboard */
export function getProducts(req, res) {

    Product.find()
        .then((products) => {
            res.status(200).json(products);
        })
        .catch((err) => {
            res.status(500).json("Cannot fetch products: " + err);
        });
}

/* Update products by admin */
export function updateProduct(req, res) {

    if (req.user == null) {
        res.status(401).json({
            message: "Please login and try again"
        });
        return;
    }

    if (req.user.role != "admin") {
        res.status(403).json({
            message: "You are not allowed to update products"
        });
        return;
    }

    const productId = req.params.id;
    const updatedData = req.body;

    Product.findByIdAndUpdate(productId, updatedData, { new: true })
        .then((updatedProduct) => {
            if (!updatedProduct) {
                res.status(404).json({
                    message: "Product not found"
                });
                return;
            }

            res.status(200).json({
                message: "Product updated successfully",
                product: updatedProduct
            });
        })
        .catch((err) => {
            res.status(500).json("Cannot update product: " + err);
        });
}

/* Delete products by admin */
export function deleteProduct(req, res) {

    if (req.user == null) {
        res.status(401).json({
            message: "Please login and try again"
        });
        return;
    }

    if (req.user.role != "admin") {
        res.status(403).json({
            message: "You are not allowed to delete products"
        });
        return;
    }

    const productId = req.params.id;

    Product.findByIdAndDelete(productId)
        .then((deletedProduct) => {
            if (!deletedProduct) {
                res.status(404).json({
                    message: "Product not found"
                });
                return;
            }

            res.status(200).json({
                message: "Product deleted successfully"
            });
        })
        .catch((err) => {
            res.status(500).json("Cannot delete product: " + err);
        });
}
