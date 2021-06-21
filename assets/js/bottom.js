$(document).ready(function(){
    // Variables a utilizar una vez cargado el sitio
    var backtotop = $("#back-to-top"),
    desktopHeaderHeight = document.getElementById('desktop-header-container').offsetHeight,
    screenHeight = window.screen.height * window.devicePixelRatio,
    screenWidth = window.screen.width * window.devicePixelRatio;
    window.onload = function () {
        //Esperar que todo el DOM este cargado para eliminar el elemento del precargador
        $('#page-preloader').fadeOut(1000, function(){
            $('#page-preloader').remove();
        });
        //Verificar si la ventana está arriba, si no, entonces mostrar botón
        $(window).scroll(function(){
            var scrollTop = this.scrollTop();
            // Mostrar botón luego de bajar 300px
            if( scrollTop > 300){
                backtotop.addClass("-back-to-top-visible")
            }else{
                backtotop.removeClass("-back-to-top-visible")
            }
            //Fijar header al bajar bajar el scroll
            if(scrollTop > desktopHeaderHeight){
                document.querySelector('#header .sticky-desktop-wrapper').style.height = desktopHeaderHeight + 'px';
                $('#desktop-header').addClass('stuck-header');
            }else{
                $('#desktop-header').removeClass('stuck-header');
                document.querySelector('#header .sticky-desktop-wrapper').style.height = null;
            }
        });
    }

    //Evento de click para volver arriba con comportamiento suave
    $('#back-to-top').on("click", function() {
        window.scrollTo({top: 0, behavior: 'smooth'});
        return false;
    });
    
    //Evento de despliegue alternado en el footer para dispositivos móviles
    $('.js-block-toggle').each(function(e){
        e.find(".block-title").on("click", function() {
            this.parent().toggleClass("_toggled");
        });
    });
    /*
    *   Evento de despliegue alternado del menu.
    *   Efecto de empuje (de izquierda a derecha) para dispositivos móviles
    */
    $('#mobile-header').each(function(e){
        e.find(".col-mobile-menu-push").on("click", function() {
            this.toggleClass("show");
        });
    });
    /*
    *   Validación de formulario de contacto
    *        1.- Agregar evento keyup en campos
    *        2.- Validar al momento de hacer click
    */
    $('#contact-form').on("keyup", function(event) {
        const nodeName = event.target.nodeName;
        const inputProps = event.target;

        if(nodeName === 'INPUT' || nodeName === 'TEXTAREA') {
            validateForm(inputProps);
        }
    });
    $('.js-submit-contact').on("click", function(event) {
        event.preventDefault();
        let formIsValid = manageState().validateState();
        if(formIsValid === true){
            this.parent().find('.contact-form-notification').innerHTML = '<div class="alert alert-success alert-dismissible"  role="alert"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a><ul><li>Mensaje enviado con exito!</li></ul></div>';
        }else{
            this.parent().find('.contact-form-notification').innerHTML = '<div class="alert alert-danger alert-dismissible"  role="alert"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a><ul><li>Debe completar los campos antes de enviar un mensaje</li></ul></div>';
        }
        this.parent().find('.contact-form-notification .alert .close').on('click', function(e){
            e.preventDefault();
            this.parent().remove();
        });
    });
});
// validationState es un nuevo conjunto que almacena de forma única los inputs
const validationState = new Set();
// Colección de funciones para la gestión del estados del formulario
function manageState() {
    return {
        addToState: (inputData) => {
            const action = 'removeClass';
            const { inputProps, inputName } = inputData;

            validationState.add(inputName);
            manipulateValidationMsg({ inputProps, action });
        },
        removeFromState: (inputData) => {
            const action = 'addClass';
            const { inputProps, inputName } = inputData;

            validationState.delete(inputName);
            manipulateValidationMsg({ inputProps, action})
        },
        validateState: () => {
            if(validationState.size > 0) {
                return false;
            }

            if(validationState.size === 0) {
                validationRules().emptyFields();
                return true;
            }
        }
    }
};
// Función que recibe un input con sus propiedades
function validateForm(inputProps) {
    const inputName = inputProps.name;
    const verifyInputName = {
        'firstname': validationRules().name,
        'lastname': validationRules().name,
        'email': validationRules().email,
        'phone': validationRules().phone,
        'phone_mobile': validationRules().phone,
        'message': validationRules().message,
    };

    return verifyInputName[inputName](inputProps)
}
// Reglas de validación para cada campo del formulario
function validationRules() {
    return {
        name: (inputProps) => {
            const nameValidationRule = /^(?=.{3,50}$)[a-z]+(?:['_.\s][a-z]+)*$/i;
            const inputValue = inputProps.value;
            const inputName = inputProps.name;
            const isInputValid = nameValidationRule.test(inputValue);

            isInputValid ? manageState().removeFromState({inputProps, inputName}) : manageState().addToState({inputProps, inputName});

            return true;
        },
        email : (inputProps) => {
            const nameValidationRule = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            const inputValue = inputProps.value;
            const inputName = inputProps.name;
            const isInputValid = nameValidationRule.test(inputValue);

            isInputValid ? manageState().removeFromState({inputProps, inputName}) : manageState().addToState({inputProps, inputName});

            return true;
        },
        /* Validación de teléfono en formato chileno */
        phone: (inputProps) => {
            const nameValidationRule = /^(\+?56)?(\s?)(0?9)(\s?)[9876543]\d{7}$/;
            const inputValue = inputProps.value;
            const inputName = inputProps.name;
            const isInputValid = nameValidationRule.test(inputValue);

            isInputValid ? manageState().removeFromState({inputProps, inputName}) : manageState().addToState({inputProps, inputName});

            return true;
        },
        message: (inputProps) => {
            const nameValidationRule = /^[A-Za-z0-9.]{5,1000}$/;
            const inputValue = inputProps.value;
            const inputName = inputProps.name;
            const isInputValid = nameValidationRule.test(inputValue);

            isInputValid ? manageState().removeFromState({inputProps, inputName}) : manageState().addToState({inputProps, inputName});

            return true;
        },
        emptyFields: () => {
                var isEmpty = false;
                $('#contact-form input, #contact-form textarea').each(function(inputProps) {
                    const inputName = inputProps.name;
                    const inputValue = inputProps.value;
    
                    if(!inputValue) {
                        manageState().addToState({inputProps, inputName});
                    } 
                });
        }
    }
}
// La función manipula los mensajes de validación alternándolos
function manipulateValidationMsg(validationData) {
    const { inputProps, action } = validationData;
    const element = document.querySelector('#'+inputProps.id);
    const elementClasses = element.classList;
    const elementValidationMsg = element.parent().find('.error-message');
    const validationMsgClasses = elementValidationMsg.classList;

    /** Es Valido */
    const removeClass = () => {
        if (elementClasses.contains('is-valid')) elementClasses.remove('is-valid');
        if (elementClasses.contains('is-invalid') || elementClasses.length === 1) elementClasses.add('is-invalid');
        validationMsgClasses.remove('d-none');
    };
    /** Es Invalido */
    const addClass = () => {
        if (elementClasses.contains('is-invalid')) elementClasses.remove('is-invalid');
        if (elementClasses.contains('is-valid') || elementClasses.length === 1) elementClasses.add('is-valid');
        validationMsgClasses.add('d-none');
    };
    return action === 'addClass' ? addClass() : removeClass();
}