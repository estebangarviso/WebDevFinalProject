$(document).ready(function(){
    // Seleccionando elementos del DOM
    var backtotop = $("#back-to-top"),
    desktopHeaderHeight = document.getElementById('desktop-header-container').offsetHeight;
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
    $('#back-to-top').click(function(){
        window.scrollTo({top: 0, behavior: 'smooth'});
        return false;
    });
    
    //Evento de despliegue alternado en el footer para dispositivos móviles
    $('.js-block-toggle').each(function(e){
        e.find(".block-title").on("click", function() {
            this.parent().toggleClass("_toggled");
        });
    });
    //Evento de despliegue alternado del menu con efecto de empuje para dispositivos móviles
    $('#mobile-header').each(function(e){
        e.find(".col-mobile-menu-push").on("click", function() {
            this.toggleClass("show");
        });
    });
    contactForm.addEventListener('keyup', function(event) {
        const nodeName = event.target.nodeName;
        const inputProps = event.target;

        if(nodeName === 'INPUT') {
            validateForm(inputProps);
        }
    });
    //Validación de formulario de contacto
    $('.js-submit-contact').click(function(event) {
        event.preventDefault();
        manageState().validateState();
    });
    
});
// validationState es un nuevo conjunto que almacena de forma única los inputs
const validationState = new Set();
const contactForm = document.getElementById('contact');
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
// Función recibe un input con sus propiedades
function validateForm(inputProps) {
    const inputName = inputProps.name;
    const verifyInputName = {
        'firstname': validationRules().username,
        'lastname': validationRules().username,
        'email': validationRules().email,
        'phone': validationRules().phone,
        'phone_mobile': validationRules().phone,
    };

    return verifyInputName[inputName](inputProps)
}
// Reglas de validación para cada campo del formulario
function validationRules() {
    return {
        username: (inputProps) => {
            const usernameValidationRule = /[A-Za-z0-9]{6,}/;
            const inputValue = inputProps.value;
            const inputName = inputProps.name;
            const isInputValid = usernameValidationRule.test(inputValue);

            isInputValid ? manageState().removeFromState({inputProps, inputName}) : manageState().addToState({inputProps, inputName});

            return true;
        },
        email : (inputProps) => {
            const usernameValidationRule = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            const inputValue = inputProps.value;
            const inputName = inputProps.name;
            const isInputValid = usernameValidationRule.test(inputValue);

            isInputValid ? manageState().removeFromState({inputProps, inputName}) : manageState().addToState({inputProps, inputName});

            return true;
        },
        phone: (inputProps) => {
            const usernameValidationRule = /^(\+?56)?(\s?)(0?9)(\s?)[9876543]\d{7}$/;
            const inputValue = inputProps.value;
            const inputName = inputProps.name;
            const isInputValid = usernameValidationRule.test(inputValue);

            isInputValid ? manageState().removeFromState({inputProps, inputName}) : manageState().addToState({inputProps, inputName});

            return true;
        },
        emptyFields: () => {
            const formInputElems = [...contactForm.elements].filter(item => item.nodeName === 'INPUT');
            for(const inputProps of formInputElems) {
                const inputName = inputProps.name;
                const inputValue = inputProps.value;

                if(!inputValue) {
                    manageState().addToState({inputProps, inputName});
                } 
            }
        }
    }
}
// La función manipula los mensajes de validación alternándolos
function manipulateValidationMsg(validationData) {
    const { inputProps, action } = validationData;
    const elementValidationMsg = document.querySelector('#'+inputProps.id).parent().find('.error-message');
    const validationMsgClasses = elementValidationMsg.classList;
    const removeClass = () => {
        validationMsgClasses.remove('d-none');
    };

    const addClass = () => {
        validationMsgClasses.add('d-none');
    };
    
    return action === 'addClass' ? addClass() : removeClass();
}