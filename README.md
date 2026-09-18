# punto 1

el contexto solo tenia items, totalItems y addToCart, o sea lo unico que se podia hacer era agregar productos

Para el parcial le agregueslas operaciones que faltaban

- increaseQuantity suma una unidad
- decreaseQuantity resta una unidad y si la cantidad queda en 0 el producto se elimina solo
- removeFromCart saca un producto del carrito
- clearCart deja el carrito vacio

Para la parte d la inmutabilidad ninguna funcion modifica la lista original, todas usan setItems con la version de funcion (setItems(prev => ...)) y pór dentro uso map, filter o spread, que siempre devuelven un arreglo nuevo

# punto 2

totalItems y totalPrice los calculo con reduce sobre items cada vez que se renderiza el provider y los paso en el value del contexto

Lo hice asi porque son datos que ya salen de items, no son informacion nueva .Si los guardara en otro estado tendria que acordarme de actualizarlos en las 5 operaciones del carrito y es como mas facil que se desincronicen

Calculandolos items queda como la unica fuente de verdad.Ademas la lista del carrito es corta, recorrerla dos veces no afecta el rendimiento y loos subtotales dedcada producto los calculo donde se muestran multiplicando price por quantity

# punto 3

La pagina /checkout es un server component y solo arma la vista, lo interactivo esta en dos componentes del cliente, CheckoutSummary que muestra el resumen con los botones de mas, menos, eliminar y vaciar, y CheckoutForm que es el formulario

Los 4 campos estan controlados por React con un solo useState que guarda un objeto con el nombre, el correo, el metodo de pago y la aceptacion de terminos, el checkbox se maneja con checked.Tengo otro estado llamado touched que marca cuales campos ya se tocaron

Cuando se envia uso preventDefault para que no se recargue la pagina, prendo isSubmitting para que el botonbse bloquee y diga Procesando y asi no se manden pedidos repetidos, y hago un POST con fetch y async await a https://dummyjson.com/carts/add

No integre ninguna libreria externa!
