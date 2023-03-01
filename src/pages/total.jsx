import { useEffect, useCallback } from "react";
import Layout from "../layout/Layout";
import useQuiosco from "@/hooks/useQuiosco";
import { formatearDinero } from "@/helpers";

export default function Total() {
    const { pedido, nombre, setNombre, colocarOrden, total } = useQuiosco();

    const comprobarPedido = useCallback(() => {
        // COmprobamos si pedido esta vacio o no al igual que el nombre  retornando true o false
        return pedido.length === 0 || nombre === "" || nombre.length < 3;
    }, [pedido, nombre]);

    // Verificamos que pedido no se encuentre vacio en cada cambio
    useEffect(() => {
        comprobarPedido();
    }, [pedido, comprobarPedido]);

    return (
        <Layout pagina="Total & Confirmar Pedido">
            <h1 className="text-4xl font-black">Total & Confirmar Pedido</h1>
            <p className="text-2xl my-10">Confirma tu pedido a continuación</p>

            <form onSubmit={colocarOrden}>
                <div>
                    <label
                        className="block uppercase text-slate-800 font-bold text-xl"
                        htmlFor="nombre"
                    >
                        Nombre
                    </label>

                    <input
                        id="nombre"
                        type="text"
                        className="bg-gray-200 w-full lg:w-1/3 mt-3 p-2 rounded-md"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                    />
                </div>

                <div className="mt-10">
                    <p className="text-2xl">
                        Total a pagar:{" "}
                        <span className="font-bold">
                            {formatearDinero(total)}
                        </span>
                    </p>
                </div>

                <div className="mt-5">
                    <input
                        type="submit"
                        value="confirmar pedido"
                        className={`${
                            comprobarPedido()
                                ? "bg-indigo-100"
                                : "bg-indigo-600 hover:bg-indigo-800"
                        }  w-full lg:w-auto px-5 py-2 rounde uppercase font-bold text-white text-center`}
                        disabled={comprobarPedido()}
                    />
                </div>
            </form>
        </Layout>
    );
}
