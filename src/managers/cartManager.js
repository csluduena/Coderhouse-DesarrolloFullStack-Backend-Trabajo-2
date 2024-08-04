import { promises as fs } from 'fs';
import { v4 as uuidv4 } from 'uuid';

export class CartManager {
    constructor() {
        this.path = './src/data/carts.json';
    }

    newCart = async () => {
        const id = uuidv4();
        const newCart = { id, products: [] };
        const carts = await this.getCarts();
        carts.push(newCart);
        await fs.writeFile(this.path, JSON.stringify(carts, null, 2));
        return newCart;
    };

    getCarts = async () => {
        try {
            const response = await fs.readFile(this.path, 'utf8');
            return JSON.parse(response);
        } catch (error) {
            return [];
        }
    };

    getCartById = async (id) => {
        const carts = await this.getCarts();
        return carts.find(cart => cart.id === id);
    };

    addProductToCart = async (cartId, productId) => {
        const carts = await this.getCarts();
        const cart = carts.find(c => c.id === cartId);
        if (!cart) {
            throw new Error('Cart not found');
        }
        const cartProduct = cart.products.find(p => p.product === productId);
        if (cartProduct) {
            cartProduct.quantity += 1;
        } else {
            cart.products.push({ product: productId, quantity: 1 });
        }
        await fs.writeFile(this.path, JSON.stringify(carts, null, 2));
        return cart;
    };

    updateProductQuantity = async (cartId, productId, quantity) => {
        const carts = await this.getCarts();
        const cart = carts.find(c => c.id === cartId);
        if (!cart) {
            throw new Error('Cart not found');
        }
        const cartProduct = cart.products.find(p => p.product === productId);
        if (cartProduct) {
            cartProduct.quantity = quantity;
            await fs.writeFile(this.path, JSON.stringify(carts, null, 2));
            return cart;
        } else {
            throw new Error('Product not found in cart');
        }
    };

    deleteCart = async (id) => {
        let carts = await this.getCarts();
        carts = carts.filter(c => c.id !== id);
        await fs.writeFile(this.path, JSON.stringify(carts, null, 2));
    };
}
