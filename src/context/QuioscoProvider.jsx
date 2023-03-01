import { useState, useEffect, createContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const QuioscoContext = createContext();

const QuioscoProvider = ({ children }) => {
    const [categorias, setCategorias] = useState([]);
    const [categoriaActual, setCategoriaActual] = useState({});
    const [producto, setProducto] = useState({});
    const [modal, setModal] = useState(false);
    const [pedido, setPedido] = useState([]);
    const [nombre, setNombre] = useState("");
    const [total, setTotal] = useState(0);

    const router = useRouter();

    const obtenerCategorias = async () => {
        const { data } = await axios("/api/categorias");
        setCategorias(data);
    };

    useEffect(() => {
        obtenerCategorias();
    }, []);

    // Se ejecuta solo cuando categorias cambia de valor
    useEffect(() => {
        setCategoriaActual(categorias[0]);
    }, [categorias]);

    // Calculamos el total cada vez que cambie el pedido
    useEffect(() => {
        const nuevoTotal = pedido.reduce(
            (total, producto) => producto.precio * producto.cantidad + total,
            0
        );

        setTotal(nuevoTotal);
    }, [pedido]);

    const handleClickCategoria = (id) => {
        const categoria = categorias.filter((cat) => cat.id === id);
        setCategoriaActual(categoria[0]);
        // Forzamos la redirección desde cualquier parte de la app
        router.push("/");
    };

    const handleSetProducto = (producto) => {
        setProducto(producto);
    };

    const handleChangeModal = () => {
        setModal(!modal);
    };

    const colocarOrden = async (e) => {
        e.preventDefault();

        try {
            await axios.post("/api/ordenes", {
                pedido,
                nombre,
                total,
                fecha: Date.now().toString(),
            });

            // Resetear la app
            setCategoriaActual(categorias[0]);
            setPedido([]);
            setNombre("");
            setTotal(0);

            // Mostramos un mensaje al usuario
            toast.success("Pedido realizado correctamenet");

            // Redicreccionamos a la página de inicio
            setTimeout(() => {
                router.push("/");
            }, 3000);
        } catch (error) {
            console.log(error);
        }
    };

    const handleAgregarPedido = ({ categoriaId, ...producto }) => {
        // Evitar productos repetidos
        // .some = Itera en todos los elementos del arreglo y retorna true o false si un elemento cumple con la condición
        if (pedido.some((productoState) => productoState.id === producto.id)) {
            // Actualizar la cantidad del producto
            const pedidoActualizado = pedido.map((productoState) =>
                productoState.id === producto.id ? producto : productoState
            );

            setPedido(pedidoActualizado);
            toast.success("Guardado correctamente");
        } else {
            // Agregamos el pedido
            setPedido([...pedido, producto]);
            toast.success("Agregado al pedido");
        }

        setModal(false);
    };

    // Editar las cantidades en la sección de resumen
    const handleEditarCantidades = (id) => {
        const productoActualizar = pedido.filter(
            (producto) => producto.id === id
        );

        setProducto(productoActualizar[0]);
        setModal(!modal);
    };

    // Eliminar el producto seleccionado
    const handleEliminarProducto = (id) => {
        const pedidoActualizado = pedido.filter(
            (producto) => producto.id !== id
        );

        setPedido(pedidoActualizado);
    };

    return (
        <QuioscoContext.Provider
            value={{
                categorias,
                categoriaActual,
                handleClickCategoria,
                producto,
                handleSetProducto,
                handleChangeModal,
                modal,
                handleAgregarPedido,
                pedido,
                handleEditarCantidades,
                handleEliminarProducto,
                nombre,
                setNombre,
                colocarOrden,
                total,
            }}
        >
            {children}
        </QuioscoContext.Provider>
    );
};

export { QuioscoProvider };

export default QuioscoContext;
