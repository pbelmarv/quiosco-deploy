import { useRouter } from "next/router";

const pasos = [
    { paso: 1, nombre: "Menú", url: "/" },
    { paso: 2, nombre: "Resumen", url: "/resumen" },
    { paso: 3, nombre: "Datos & Total", url: "/total" },
];
const Pasos = () => {
    const router = useRouter();

    const calcularProgreso = () => {
        // return (paso / 3) * 100;
        let valor;
        if (router.pathname === "/") {
            valor = 2;
        } else if (router.pathname === "/resumen") {
            valor = 50;
        } else if (router.pathname === "/total") {
            valor = 100;
        }

        return valor;
    };

    return (
        <>
            <div className="flex justify-between mb-5">
                {pasos.map((paso) => (
                    <button
                        onClick={() => {
                            router.push(paso.url);
                        }}
                        className="text-2xl font-bold"
                        key={paso.paso}
                    >
                        {paso.nombre}
                    </button>
                ))}
            </div>

            {/* Contenedor */}
            <div className="bg-gray-400 mb-10">
                {/* Barra de Progreso */}
                <div
                    className="rounded-full bg-amber-500 text-xs leading-none h-2 text-center text-white w-10"
                    style={{ width: `${calcularProgreso()}%` }}
                ></div>
            </div>
        </>
    );
};

export default Pasos;
