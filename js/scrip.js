    var valorCuenta = 0, valorPorcentajeTip = 0, valorCantidadPersonas = 0, tipTotal = 0, cuentaTotal = 0,tipTotalxPersonas = 0, cuentaTotalxPersonas = 0; 


function iniciar () {

    const elementoInputCuenta = document.getElementById("cuenta");
    const elementoInputPorcentajeTipCustom = document.getElementById("porcentajeCustom");
    const elementoInputCantidadPersonas = document.getElementById("personas");


    const elementoResultadoTip = document.getElementById("span-tip");
    const elementoResultadoTotal = document.getElementById("span-total");

    const elementoBotonReset = document.getElementById("reset");
    const listaElementosBotonesPorcentaje = document.getElementsByClassName("botones-porcentaje");

    elementoInputCuenta.value = "";
    elementoInputPorcentajeTipCustom.value = "";
    elementoInputCantidadPersonas.value = "";

    elementoBotonReset.setAttribute("disabled", "");

    elementoResultadoTip.innerHTML = "$0.00";
    elementoResultadoTotal.innerHTML = "$0.00";


    // *******Código para hacer funcionar el Input al que se ingresa el monto de la cuenta.*******
    elementoInputCuenta.addEventListener("input", () => {

        valorCuenta = parseFloat(elementoInputCuenta.value);
    });

    elementoInputCuenta.addEventListener("input", reset);


    // *******Código para hacer funcionar los botones de los porcentajes de la propina.*******
    for (let i = 0; i < listaElementosBotonesPorcentaje.length; i++) {

        let ElementoBoton = listaElementosBotonesPorcentaje[i];

        // Código para pasar el resultado a la variable "valorPorcentajeTip" y para cambiarle los colores al ser seleccionados los botones.
        ElementoBoton.addEventListener("click", (e) => {

            var botonSeleccionado = e.target;

            valorPorcentajeTip = botonSeleccionado.value;
        

            for (let f = 0; f < listaElementosBotonesPorcentaje.length; f++) {

                listaElementosBotonesPorcentaje[f].style.background = "#00474B";
                listaElementosBotonesPorcentaje[f].style.color = "#fff";

                listaElementosBotonesPorcentaje[f].addEventListener("mouseover", ()=> {
                    listaElementosBotonesPorcentaje[f].style.background = "#00474B";
                });

                listaElementosBotonesPorcentaje[f].addEventListener("mouseout", ()=> {
                    listaElementosBotonesPorcentaje[f].style.background = "#00474B";
                })

                if (f == i) {

                    botonSeleccionado.style.background = "#26C2AD";
                    botonSeleccionado.style.color = "#004143";

                    botonSeleccionado.addEventListener("mouseover", () => {
                        botonSeleccionado.style.background = "#9FE8DF";
                    });

                    botonSeleccionado.addEventListener("mouseout", () => {
                        botonSeleccionado.style.background = "#26C2AD";
                    })
                }
            }


            elementoInputPorcentajeTipCustom.value = "";
        })

        

        //Listener para hacer el calculo de los resultados con los botones seleccionados.
        ElementoBoton.addEventListener("click", calcular);

        // Listener para hacer la activacion del boton reset
        ElementoBoton,addEventListener("click", reset);
    }




    // *******Código para hacer funcionar el Input del porcentaje personalizado de la propina.*******

    //Código para resetear los estilos de los botones de pocentaje al ser seelecionado el input
    //de pocentaje personalizado.

    elementoInputPorcentajeTipCustom.addEventListener("click", () =>{
        for (let i = 0; i < listaElementosBotonesPorcentaje.length; i++) {
            listaElementosBotonesPorcentaje[i].style.background = "#00474B";
            listaElementosBotonesPorcentaje[i].style.color = "#fff";
        }
    });

    // Codigo para pasar el valor ingresado en el input a la variable "valorPorcentajeTip".
    elementoInputPorcentajeTipCustom.addEventListener("input", () => {
        valorPorcentajeTip = parseFloat(elementoInputPorcentajeTipCustom.value) / 100;
    });

    // Listener para sacar la cuenta al ingresar el porcentaje de la propina en el Input.
    elementoInputPorcentajeTipCustom.addEventListener("input", calcular);

    // Listener para activar el botón reset con el input de porcentajeCustom.
    elementoInputPorcentajeTipCustom.addEventListener("input", reset);

    // *******Código para el funcionamiento del input de personas*******
    elementoInputCantidadPersonas.addEventListener("input", () => {

        valorCantidadPersonas = elementoInputCantidadPersonas.value;

        const elementoContenedorInputPersonas = document.getElementById("contenedor-inputPersonas");
        const ElementoMensajeError = document.getElementById("mensaje-error");

        if(valorCantidadPersonas == 0) {
            elementoContenedorInputPersonas.style.border = "1px solid #B47C6D";
            ElementoMensajeError.innerHTML = "Can't be zero";
        }else if(valorCantidadPersonas != 0) {

            elementoContenedorInputPersonas.style.border = "none";
            ElementoMensajeError.innerHTML = "";
        }


    })

    // Listener para calcular los totales luego de ingresar el número de personas. 
    elementoInputCantidadPersonas.addEventListener("input", calcular);

    // Listener para activar el botón reset al introducir la cantidad de personas.
    elementoInputCantidadPersonas.addEventListener("input", reset);



}

//Funcion para calcular el resultado.
function calcular() {
    const elementoResultadoTip = document.getElementById("span-tip");
    const elementoResultadoTotal = document.getElementById("span-total");

    tipTotal = valorCuenta * valorPorcentajeTip;
    cuentaTotal = valorCuenta + tipTotal;
            
    tipTotalxPersonas = tipTotal / valorCantidadPersonas;
    cuentaTotalxPersonas = cuentaTotal / valorCantidadPersonas;

    elementoResultadoTip.innerHTML = "$" + tipTotalxPersonas.toFixed(2);
    elementoResultadoTotal.innerHTML = "$" + cuentaTotalxPersonas.toFixed(2);

    

    if(valorCantidadPersonas == 0 || isNaN(tipTotalxPersonas)){
        elementoResultadoTip.innerHTML = "$0.00";
    }

    if(valorCantidadPersonas == 0 || isNaN(cuentaTotalxPersonas)){
        elementoResultadoTotal.innerHTML = "$0.00";
    }
}

//Función para el botón de reset.
function reset() {

    const elementoBotonReset = document.getElementById("reset");


    if(valorCuenta != 0 || valorPorcentajeTip != 0 || valorCantidadPersonas != 0){
        elementoBotonReset.style.background = "#26C2AD";
        elementoBotonReset.removeAttribute("disabled");
    }

    elementoBotonReset.addEventListener("mouseover", () => {
        elementoBotonReset.style.background = "#9FE8DF";
    });
    elementoBotonReset.addEventListener("mouseout", () => {
        elementoBotonReset.style.background = "#26C2AD";
    })

    elementoBotonReset.addEventListener("click", () => {
        location.reload();
    })

} 



addEventListener("load", iniciar);
