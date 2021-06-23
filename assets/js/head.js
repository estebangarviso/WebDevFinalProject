/* Funcion para manipular el DOM */
var $ = (function () {

	'use strict';

	/**
	 * Constructor de la función
	 * @param {String} selector El selector a utilizar
	 */
	var Constructor = function (selector) {
		if (!selector) return;
        let els = [];
		if (selector === document || selector === 'document') {
			els = [document];
		} else if (selector === window || selector === 'window') {
			els = [window];
		} else {
			els = document.querySelectorAll(selector);
		}
        this.els = els;
        this.length = els.length;
	};

    // Para agregar compatibilidad en navegadores antiguos
    if (typeof Array.isArray === 'undefined') {
        Array.isArray = function(obj) {
          return Object.prototype.toString.call(obj) === '[object Array]';
        }
    };
	/**
	 * Ejecutar una devolución de llamada en cada elemento
	 * @param  {Function} callback La función de devolución de llamada a ejecutar
	 */
	Constructor.prototype.each = function (callback) {
		if (!callback || typeof callback !== 'function') return;
        let obj;
        if(typeof this.els !== 'undefined' && typeof this.els === "object"){
            obj = this.els;
        } else {
            obj = [this];
        }
		for (var i = 0; i < obj.length; i++) {
			callback(obj[i], i);
		}
		return this;
	};

    /**
     * Ejecutar función al hacer evento on
     * @param {Function} callback (opcional) retorna una función una vez terminada la ejecución
     */
     Constructor.prototype.ready = function (callback) {
        if (!callback || typeof callback !== 'function') return;
        if (document.readyState != "loading") callback();
        this.each(function (item) {
            item.addEventListener('DOMContentLoaded', callback);
        });
        return this;
    }

    /**
     * Ejecutar función al hacer evento on
     * @param {Function} callback (opcional) retorna una función una vez terminada la ejecución
     */
     Object.prototype.on = function (event, callback) {
        if (!callback || typeof callback !== 'function') return;
        if(typeof this.each === "function"){
            this.each(function (item) {
                item.addEventListener(event, callback);
            });
        }else{
            this.addEventListener(event, callback);
        }

        return this;
    }

	/**
	 * Agrega una clase a los elementos
	 * @param {String} className El nombre de la clase
	 */
	Constructor.prototype.addClass = function (className) {
		this.each(function (item) {
			item.classList.add(className);
		});
		return this;
	};

	/**
	 * Remueve una clase de los elementos
	 * @param {String} className El nombre de la clase
	 */
	Constructor.prototype.removeClass = function (className) {
		this.each(function (item) {
			item.classList.remove(className);
		});
		return this;
	};

	/**
	 * Alterna una clase de los elementos
	 * @param {String} className El nombre de la clase
	 */
    Object.prototype.toggleClass = function (className) {
		this.classList.toggle(className);
	};

    /**
     * Remueve elementos
     */
    Constructor.prototype.remove = function(){
        this.each(function (item) {
            item.remove();
        });
    }

    /**
     * Encuentra el primer elemento dentro de otro
     * @param {String} selector Es una selección
     */
    Object.prototype.find = function(selector){
        return this.querySelector(selector);
    }

    /**
     * Obtiene el elemento padre de una selección
     * @param {Function} callback retorna una función una vez terminada la ejecución
     */
    Object.prototype.parent = function() {
        return this.parentElement;
    }; 

    /**
     * Obtiene el valor de un atributo de un elemento seleccionado
     * @param {String} attribute nombre del atributo
     * @returns valor del atributo del elemento
     */
    Object.prototype.attr = function(attribute){
        return this.getAttribute(attribute);
    }
    /**
     * Oculta todos los elementos se una selección
     */
    Constructor.prototype.hide = function(){
        this.each(function (item) { 
            item.style.display = "none";
        });
        return this;
    }

    /**
     * Muestra todos los elementos se una selección
     */
    Constructor.prototype.show = function(){
        this.each(function (item) { 
            item.style.display = "block";
        });
        return this;
    }

    /**
     * Oculta todos los elementos se una selección
     */
     Constructor.prototype.hide = function(){
        this.each(function (item) { 
            item.style.display = "none";
        });
        return this;
    }

    /**
     * Efecto de aparición
     * @param {Number} duration Es la duración en milisegundos donde 1000 equivale a 1 segundo
     * @param {Function} callback (opcional) retorna una función una vez terminada la ejecución
     */
    Object.prototype.fadeIn = function(duration, callback) {
        this.each(function (item) {
            item.style.opacity = 0;
            let last = +new Date();
            let tick = function() {
                item.style.opacity = +item.style.opacity + ( new Date() - last ) / duration;
                last = +new Date();
                if ( +item.style.opacity < 1 )
                    ( window.requestAnimationFrame && requestAnimationFrame( tick ) ) || setTimeout( tick, 16 );
                else if (callback || typeof callback === 'function')
                    callback();
                else
                    return;
            };
            tick();
        });
    }

    /**
     * Efecto de desvanecer
     * @param {Number} duration Es la duración en milisegundos donde 1000 equivale a 1 segundo
     * @param {Function} callback (opcional) retorna una función una vez terminada la ejecución
     */
    Constructor.prototype.fadeOut = function(duration, callback) {
        this.each(function (item) {
            item.style.opacity = 1;
            let last = +new Date();
            let tick = function() {
                item.style.opacity = +item.style.opacity - ( new Date() - last ) / duration;
                last = +new Date();
                if ( +item.style.opacity > 0 )
                    ( window.requestAnimationFrame && requestAnimationFrame( tick ) ) || setTimeout( tick, 16 );
                else if (callback || typeof callback === 'function')
                    callback();
            };
            tick();
        });
    }
    /**
     * Detectar el scroll sobre la ventana
     * @params {Function} callback retorna una función una vez terminada la ejecución
     */
    Object.prototype.scroll = function(callback){
        if (typeof this.els[0] !== 'object' && this.els[0] !== window) return;
        return this.els[0].onscroll = callback;
    }

    /**
     * Obtener la coordenada del eje Y de la ventana
     */
    Object.prototype.scrollTop = function(){
        if (typeof this !== 'object' && this !== window) return;
        return this.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    }

    /**
     * Obtener la coordenada del eje X de la ventana
     */
    Object.prototype.scrollLeft = function(){
        if (typeof this !== 'object' && this !== window) return;
        return this.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0;
    }

    /**
     * Gatillador de evento al documento, ventana o elemento
     * @param {String} event Nombre del evento
     * @param {Function} callback 
     */
    Object.prototype.trigger = function(event, callback){
        if (!event || !callback || typeof callback !== 'function') return;
        if(this === document || this === window){
            this.dispatchEvent(new Event(event));
		} else {
            document.querySelector(this).dispatchEvent(new Event(event));
        }
    }

	/**
	 * Crear una instancia de un nuevo constructor
	 */
	var instancia = function (selector) {
		return new Constructor(selector);
	};

	/**
	 * Devuelve la instanciación del constructor
	 */
	return instancia;

})();
/*Clase Producto*/
class Product {
	constructor(id = 0, name = '', attr = '', price = 0, dcost = 0, dtime = '', lgdesc = '', imgs = [], vids = []){
    	this.id = id;
      	this.name = name;
        this.attr = attr;
        this.price = price;
        this.dcost = dcost;
        this.dtime = dtime;
        this.lgdesc = lgdesc;
        this.imgs = imgs;
        this.vids = vids;
    }
  	displayName(){
        if(typeof this.name !== 'string' || !(this.name instanceof String)) return;
    	return this.name;
    }
    displayAttribute(){
        if(typeof this.attr !== 'string' || !(this.attr instanceof String)) return;
    	return this.attr;
    }
    displayPrice(){
        let isInt = function (n){
            return Number(n) === n && n % 1 === 0;
        }
        if(!isInt(this.price)) return;
        if(this.price === 0){
            return 'Gratis';
        }
        var price = new Number(this.price).toLocaleString("es-CL");
    	return '<span class="price-sign">$ </span>' + price;
    }
    displayDeliveryCost(){
        let isInt = function (n){
            return Number(n) === n && n % 1 === 0;
        }
        if(!isInt(this.dcost)) return;
        if(this.dcost === 0){
            return 'Gratis';
        }
        var number = new Number(this.dcost).toLocaleString("es-CL");
    	return '<span class="price-sign">$ </span>' + number;
    }
    displayDeliveryTimeLap(){
        if(typeof this.name !== 'string' || !(this.name instanceof String)) return;
    	return this.name;
    }
    displayLongDescription(){
        if(typeof this.lgdesc !== 'string' || !(this.lgdesc instanceof String)) return;
    	return this.lgdesc;
    }
    displayImages(){
        if(!Array.isArray(this.imgs)) return;
    	return this.imgs;
    }
    displayVideos(){
        if(!Array.isArray(this.vids)) return;
    	return this.vids;
    }
}
/*Clase Carro de compras*/
class Cart {
	constructor(products={}, total = 0 , np = 0){
    	this.products = products;
        this.total = total;
        this.np = np;
    }

    isFilled(e=this.products){
        if(typeof e === 'object' && !(e[0] instanceof Product)) return false;
        return true;
    }
    sendCart(){
        /*Se puede mejorar la experiencia con un modal*/
        if(main.cart.isFilled() !== true) return alert('No se puede enviar una cotización si no ha seleccionado los productos');
        return alert('Cotización enviada con éxito');
    }
    addQuantity(id, qty){
        let isInt = function (n){
            return Number(n) === n && n % 1 === 0;
        }

        if(!isInt(id)) return console.error('No se logra localizar el id del producto.');
        Object.entries(main.cart.products).forEach(product => {
            let idx = product[0],
            pd = product[1],
            img = pd.img[0], name = pd.name, attribute = pd.attr,
            price = pd.price, 
            content = '<div class="row align-items-center"><div class="col-md-5 divide-right mb-1"><div class="row no-gutters align-items-center"><div class="col-6 text-center product-image"><img src="{img}" class="img-fluid"> </div><div class="col col-info"> <div class="pb-1"> <span class="h3 product-name">{name}</span> </div><div class="product-attributes text-muted pb-1"> <div class="product-line-info">{attribute}</div></div><span class="text-muted qty">{qty}x</span> <span class="unit-price">{price}</span> </div></div></div><div class="col-md-7"> <div class="cart-content pt-3"> <p class="cart-products-count">Hay{np}artículos en su carro.</p><p> <strong>Total a pagar:</strong>&nbsp;{total}</p></div></div></div>';
            if(pd.id === id && qty > 0){
                pd.quantity += qty;
                main.cart.total += qty * (product.price + product.dcost);
                main.cart.np += qty;
                localStorage.setItem('main_quote_products', main.cart.products);
                localStorage.setItem('main_quote_total', main.cart.total);
                localStorage.setItem('main_quote_np', main.cart.np);
                alert('Agregaste ' + qty + ' de producto ' + name + ' a tu carro de compras. Tienes ' + main.cart.np + ' productos en el carrito. Total a pagar: $ ' + main.cart.total);
            }
        });
    }
};

/**
 * Colección de productos
 */
const products = [
    new Product(
        /*ID*/
        1,
        /*Name*/
        'Cafetera Moka Espresso 1 Taza Italiana de Aluminio para Cocina con Hornillos',
        /*Attribute*/
        '50ML PARA 1 TAZAS',
        /*Price*/
        4800,
        /*Delivery Cost*/
        0,
        /*Delivery Time Lap*/
        '3-12 días hábiles',
        /*Long Description*/
        '<p><strong> Cafetera Moka Espresso Italiana de Aluminio para Cocina con Hornillos – Rendimiento 1/3/6/9/12 tazas </strong></p><p><strong> [ </strong> <strong> Características </strong> <strong> ] </strong></p><p>La Cafetera Moka Espresso es una herramienta para extraer café espresso en Europa y países de América Latina, en los Estados Unidos conocido como la "Cafetera Italiana por Goteo". La Cafetera Moka tiene una estructura de dos pisos, arreglada en una porción inferior para hervir el agua, está equipado con un café en polvo del filtro de malla en la mitad superior. Aunque no se utiliza en una presión de inyección de agua caliente, puede utilizar café en polvo finamente molido, pero estrictamente hablando no es extracción de espresso, sino más cerca del reloj de arena, pero esta cafetera moka todavía tiene esta concentración italiana y sabor a café espresso tan peculiar.</p><p><strong> [ </strong> <strong> Especificaciones </strong> <strong> ] </strong></p><p>Tamaño: 1Cup (50 ml)(130*60mm) 3 taza (150 ml)(150*77mm) 6 taza (300 ml)(185*90mm) 9 taza (450 ml)(215*120mm) 12 taza (600 ml)(240*120mm) (Color: color original). Material: Aluminio</p><p><strong> [ </strong> <strong> Como usar </strong> <strong> ] </strong></p><ol><li>Llenar de agua en la parte inferior, evitando que el agua supere la válvula de seguridad.</li><li>Coloque el café molido dentro del embudo con un poco de presión. No use Malta o café con otras sustancias, que pueden condensarse y filtrar aberturas.</li><li>Limpie el anillo de rosca, anillo de goma y embudo. Cualquier partícula de café sobrante puede afectar el sellado del vapor y producir filtraciones.</li><li>Mantenga el café en posición vertical al atornillar las dos piezas. Esto evitará que se humedezca el café.</li><li>Retire la cafetera del fuego tan pronto como pueda comprobar que la infusión de café desaparece por completo en la parte superior.</li><li>La parte superior del cuerpo y el tubo para los que la infusión de café es necesaria para limpiar periódicamente. Recuerde que para limpiar el anillo de goma y filtro nunca utilice jabón ni detergente.</li></ol>',
        /*Images*/
        ['/media/img/p/1/1cup.jpg','/media/img/p/1/pic1.jpg','/media/img/p/1/pic2.jpg','/media/img/p/1/pic3.jpg'],
        /*Videos*/
        ['/media/vid/p/1/vid1.mp4']
    ),
    new Product(
        /*ID*/
        2,
        /*Name*/
        'Cafetera Moka Espresso 3 Taza Italiana de Aluminio para Cocina con Hornillos',
        /*Attribute*/
        '150ML PARA 3 TAZAS',
        /*Price*/
        6500,
        /*Delivery Cost*/
        0,
        /*Delivery Time Lap*/
        '3-12 días hábiles',
        /*Long Description*/
        '<p><strong> Cafetera Moka Espresso Italiana de Aluminio para Cocina con Hornillos – Rendimiento 1/3/6/9/12 tazas </strong></p><p><strong> [ </strong> <strong> Características </strong> <strong> ] </strong></p><p>La Cafetera Moka Espresso es una herramienta para extraer café espresso en Europa y países de América Latina, en los Estados Unidos conocido como la "Cafetera Italiana por Goteo". La Cafetera Moka tiene una estructura de dos pisos, arreglada en una porción inferior para hervir el agua, está equipado con un café en polvo del filtro de malla en la mitad superior. Aunque no se utiliza en una presión de inyección de agua caliente, puede utilizar café en polvo finamente molido, pero estrictamente hablando no es extracción de espresso, sino más cerca del reloj de arena, pero esta cafetera moka todavía tiene esta concentración italiana y sabor a café espresso tan peculiar.</p><p><strong> [ </strong> <strong> Especificaciones </strong> <strong> ] </strong></p><p>Tamaño: 1Cup (50 ml)(130*60mm) 3 taza (150 ml)(150*77mm) 6 taza (300 ml)(185*90mm) 9 taza (450 ml)(215*120mm) 12 taza (600 ml)(240*120mm) (Color: color original). Material: Aluminio</p><p><strong> [ </strong> <strong> Como usar </strong> <strong> ] </strong></p><ol><li>Llenar de agua en la parte inferior, evitando que el agua supere la válvula de seguridad.</li><li>Coloque el café molido dentro del embudo con un poco de presión. No use Malta o café con otras sustancias, que pueden condensarse y filtrar aberturas.</li><li>Limpie el anillo de rosca, anillo de goma y embudo. Cualquier partícula de café sobrante puede afectar el sellado del vapor y producir filtraciones.</li><li>Mantenga el café en posición vertical al atornillar las dos piezas. Esto evitará que se humedezca el café.</li><li>Retire la cafetera del fuego tan pronto como pueda comprobar que la infusión de café desaparece por completo en la parte superior.</li><li>La parte superior del cuerpo y el tubo para los que la infusión de café es necesaria para limpiar periódicamente. Recuerde que para limpiar el anillo de goma y filtro nunca utilice jabón ni detergente.</li></ol>',
        /*Images*/
        ['/media/img/p/1/3cup.jpg','/media/img/p/1/pic1.jpg','/media/img/p/1/pic2.jpg','/media/img/p/1/pic3.jpg'],
        /*Videos*/
        ['/media/vid/p/1/vid1.mp4']
    ),
    new Product(
        /*ID*/
        3,
        /*Name*/
        'Cafetera Moka Espresso 6 Taza Italiana de Aluminio para Cocina con Hornillos',
        /*Attribute*/
        '300ML PARA 6 TAZAS',
        /*Price*/
        8100,
        /*Delivery Cost*/
        0,
        /*Delivery Time Lap*/
        '3-12 días hábiles',
        /*Long Description*/
        '<p><strong> Cafetera Moka Espresso Italiana de Aluminio para Cocina con Hornillos – Rendimiento 1/3/6/9/12 tazas </strong></p><p><strong> [ </strong> <strong> Características </strong> <strong> ] </strong></p><p>La Cafetera Moka Espresso es una herramienta para extraer café espresso en Europa y países de América Latina, en los Estados Unidos conocido como la "Cafetera Italiana por Goteo". La Cafetera Moka tiene una estructura de dos pisos, arreglada en una porción inferior para hervir el agua, está equipado con un café en polvo del filtro de malla en la mitad superior. Aunque no se utiliza en una presión de inyección de agua caliente, puede utilizar café en polvo finamente molido, pero estrictamente hablando no es extracción de espresso, sino más cerca del reloj de arena, pero esta cafetera moka todavía tiene esta concentración italiana y sabor a café espresso tan peculiar.</p><p><strong> [ </strong> <strong> Especificaciones </strong> <strong> ] </strong></p><p>Tamaño: 1Cup (50 ml)(130*60mm) 3 taza (150 ml)(150*77mm) 6 taza (300 ml)(185*90mm) 9 taza (450 ml)(215*120mm) 12 taza (600 ml)(240*120mm) (Color: color original). Material: Aluminio</p><p><strong> [ </strong> <strong> Como usar </strong> <strong> ] </strong></p><ol><li>Llenar de agua en la parte inferior, evitando que el agua supere la válvula de seguridad.</li><li>Coloque el café molido dentro del embudo con un poco de presión. No use Malta o café con otras sustancias, que pueden condensarse y filtrar aberturas.</li><li>Limpie el anillo de rosca, anillo de goma y embudo. Cualquier partícula de café sobrante puede afectar el sellado del vapor y producir filtraciones.</li><li>Mantenga el café en posición vertical al atornillar las dos piezas. Esto evitará que se humedezca el café.</li><li>Retire la cafetera del fuego tan pronto como pueda comprobar que la infusión de café desaparece por completo en la parte superior.</li><li>La parte superior del cuerpo y el tubo para los que la infusión de café es necesaria para limpiar periódicamente. Recuerde que para limpiar el anillo de goma y filtro nunca utilice jabón ni detergente.</li></ol>',
        /*Images*/
        ['/media/img/p/1/6cup.jpg','/media/img/p/1/pic1.jpg','/media/img/p/1/pic2.jpg','/media/img/p/1/pic3.jpg'],
        /*Videos*/
        ['/media/vid/p/1/vid1.mp4']
    ),
    new Product(
        /*ID*/
        4,
        /*Name*/
        'Cafetera Moka Espresso 9 Taza Italiana de Aluminio para Cocina con Hornillos',
        /*Attribute*/
        '450ML PARA 9 TAZAS',
        /*Price*/
        9800,
        /*Delivery Cost*/
        0,
        /*Delivery Time Lap*/
        '3-12 días hábiles',
        /*Long Description*/
        '<p><strong> Cafetera Moka Espresso Italiana de Aluminio para Cocina con Hornillos – Rendimiento 1/3/6/9/12 tazas </strong></p><p><strong> [ </strong> <strong> Características </strong> <strong> ] </strong></p><p>La Cafetera Moka Espresso es una herramienta para extraer café espresso en Europa y países de América Latina, en los Estados Unidos conocido como la "Cafetera Italiana por Goteo". La Cafetera Moka tiene una estructura de dos pisos, arreglada en una porción inferior para hervir el agua, está equipado con un café en polvo del filtro de malla en la mitad superior. Aunque no se utiliza en una presión de inyección de agua caliente, puede utilizar café en polvo finamente molido, pero estrictamente hablando no es extracción de espresso, sino más cerca del reloj de arena, pero esta cafetera moka todavía tiene esta concentración italiana y sabor a café espresso tan peculiar.</p><p><strong> [ </strong> <strong> Especificaciones </strong> <strong> ] </strong></p><p>Tamaño: 1Cup (50 ml)(130*60mm) 3 taza (150 ml)(150*77mm) 6 taza (300 ml)(185*90mm) 9 taza (450 ml)(215*120mm) 12 taza (600 ml)(240*120mm) (Color: color original). Material: Aluminio</p><p><strong> [ </strong> <strong> Como usar </strong> <strong> ] </strong></p><ol><li>Llenar de agua en la parte inferior, evitando que el agua supere la válvula de seguridad.</li><li>Coloque el café molido dentro del embudo con un poco de presión. No use Malta o café con otras sustancias, que pueden condensarse y filtrar aberturas.</li><li>Limpie el anillo de rosca, anillo de goma y embudo. Cualquier partícula de café sobrante puede afectar el sellado del vapor y producir filtraciones.</li><li>Mantenga el café en posición vertical al atornillar las dos piezas. Esto evitará que se humedezca el café.</li><li>Retire la cafetera del fuego tan pronto como pueda comprobar que la infusión de café desaparece por completo en la parte superior.</li><li>La parte superior del cuerpo y el tubo para los que la infusión de café es necesaria para limpiar periódicamente. Recuerde que para limpiar el anillo de goma y filtro nunca utilice jabón ni detergente.</li></ol>',
        /*Images*/
        ['/media/img/p/1/9cup.jpg','/media/img/p/1/pic1.jpg','/media/img/p/1/pic2.jpg','/media/img/p/1/pic3.jpg'],
        /*Videos*/
        ['/media/vid/p/1/vid1.mp4']
    ),
    new Product(
        /*ID*/
        5,
        /*Name*/
        'Cafetera Moka Espresso 12 Taza Italiana de Aluminio para Cocina con Hornillos',
        /*Attribute*/
        '600ML PARA 12 TAZAS',
        /*Price*/
        11400,
        /*Delivery Cost*/
        0,
        /*Delivery Time Lap*/
        '3-12 días hábiles',
        /*Long Description*/
        '<p><strong> Cafetera Moka Espresso Italiana de Aluminio para Cocina con Hornillos – Rendimiento 1/3/6/9/12 tazas </strong></p><p><strong> [ </strong> <strong> Características </strong> <strong> ] </strong></p><p>La Cafetera Moka Espresso es una herramienta para extraer café espresso en Europa y países de América Latina, en los Estados Unidos conocido como la "Cafetera Italiana por Goteo". La Cafetera Moka tiene una estructura de dos pisos, arreglada en una porción inferior para hervir el agua, está equipado con un café en polvo del filtro de malla en la mitad superior. Aunque no se utiliza en una presión de inyección de agua caliente, puede utilizar café en polvo finamente molido, pero estrictamente hablando no es extracción de espresso, sino más cerca del reloj de arena, pero esta cafetera moka todavía tiene esta concentración italiana y sabor a café espresso tan peculiar.</p><p><strong> [ </strong> <strong> Especificaciones </strong> <strong> ] </strong></p><p>Tamaño: 1Cup (50 ml)(130*60mm) 3 taza (150 ml)(150*77mm) 6 taza (300 ml)(185*90mm) 9 taza (450 ml)(215*120mm) 12 taza (600 ml)(240*120mm) (Color: color original). Material: Aluminio</p><p><strong> [ </strong> <strong> Como usar </strong> <strong> ] </strong></p><ol><li>Llenar de agua en la parte inferior, evitando que el agua supere la válvula de seguridad.</li><li>Coloque el café molido dentro del embudo con un poco de presión. No use Malta o café con otras sustancias, que pueden condensarse y filtrar aberturas.</li><li>Limpie el anillo de rosca, anillo de goma y embudo. Cualquier partícula de café sobrante puede afectar el sellado del vapor y producir filtraciones.</li><li>Mantenga el café en posición vertical al atornillar las dos piezas. Esto evitará que se humedezca el café.</li><li>Retire la cafetera del fuego tan pronto como pueda comprobar que la infusión de café desaparece por completo en la parte superior.</li><li>La parte superior del cuerpo y el tubo para los que la infusión de café es necesaria para limpiar periódicamente. Recuerde que para limpiar el anillo de goma y filtro nunca utilice jabón ni detergente.</li></ol>',
        /*Images*/
        ['/media/img/p/1/12cup.jpg','/media/img/p/1/pic1.jpg','/media/img/p/1/pic2.jpg','/media/img/p/1/pic3.jpg'],
        /*Videos*/
        ['/media/vid/p/1/vid1.mp4']
    ),
];

var main = {
    'products': products,
    // 'cart': new Cart(products),
    'cart': new Cart(),
};