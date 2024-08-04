import { promises as fs } from "fs";
import { v4 as uuidv4 } from "uuid";

export class ProductManager {
    constructor() {
        this.path = "./src/data/products.json";
        this.products = [];
    }

    addProduct = async (product) => {
        try {
            const products = await this.getProducts();
            product.id = uuidv4();
            // Solo asignar la imagen por defecto si no se proporciona una imagen
            if (!product.imagen) {
                product.imagen = "/img/carpiLoco.gif"; // Imagen por defecto
            }
            product.clase = "carpi"; // Establece la clase "carpi"
            products.push(product);
            await fs.writeFile(this.path, JSON.stringify(products, null, 2));
            return product;
        } catch (error) {
            throw new Error("No se pudo agregar el producto");
        }
    }

    getProducts = async () => {
        try {
            const response = await fs.readFile(this.path, "utf8");
            return JSON.parse(response);
        } catch (error) {
            throw new Error("Unable to retrieve the product list");
        }
    }

    getProductById = async (id) => {
        const products = await this.getProducts();
        return products.find(product => product.id === id);
    }

    updateProduct = async (id, data) => {
        const products = await this.getProducts();
        const index = products.findIndex(product => product.id === id);

        if (index !== -1) {
            products[index] = { id, ...data };
            await fs.writeFile(this.path, JSON.stringify(products, null, 2));
            return products[index];
        } else {
            throw new Error("Product Not Found");
        }
    }

    deleteProduct = async (id) => {
        const products = await this.getProducts();
        const index = products.findIndex(product => product.id === id);

        if (index !== -1) {
            products.splice(index, 1);
            await fs.writeFile(this.path, JSON.stringify(products, null, 2));
        } else {
            throw new Error("Product Not Found");
        }
    }
}
