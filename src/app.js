import express from "express";
import exphbs from 'express-handlebars';
import { Server } from "socket.io";
import path from 'path';
import { fileURLToPath } from 'url';

// Importar las rutas
import { productsRouter } from "./routes/products.router.js";
import { cartsRouter } from "./routes/carts.router.js";
import { viewsRouter } from "./routes/views.router.js";

// Importar la clase ProductManager y CartManager
import { ProductManager } from "./managers/productManager.js";
import { CartManager } from "./managers/cartManager.js";

// Crear instancias de ProductManager y CartManager
const productManager = new ProductManager();
const cartManager = new CartManager();

// Obtener la ruta del directorio actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuración de handlebars
const app = express();
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Rutas
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/", viewsRouter);

// Configuración del puerto
const PORT = process.env.PORT || 8080;

// Iniciar el servidor
const httpServer = app.listen(PORT, () => {
    console.log(`Escuchando en el puerto: ${PORT}`);
});

// Configuración de socket.io
const io = new Server(httpServer);

io.on("connection", async (socket) => {
    console.log("Un cliente se conectó");

    // Envía los productos al conectar
    const products = await productManager.getProducts();
    socket.emit("productos", products);

    socket.on("eliminarProducto", async (id) => {
        await productManager.deleteProduct(id);
        io.emit("productos", await productManager.getProducts());
    });
});

export { productManager, cartManager };