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
        e.find(".block-title").on("click", function(t, e) {
            this.parent().toggleClass("_toggled");
        });
    });
    //Evento de despliegue alternado del menu con efecto de empuje para dispositivos móviles
    $('#mobile-header').each(function(e){
        e.find(".col-mobile-menu-push").on("click", function(t, e) {
            this.toggleClass("show");
        });
    });
});