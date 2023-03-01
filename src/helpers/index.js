export const formatearDinero = (cantidad) => {
    return cantidad.toLocaleString("es-CL", {
        style: "currency",
        currency: "CLP",
    });
};
