(function () {
    const header = document.querySelector('header');
    const boton = document.querySelector('.menu-toggle');
    const nav = header ? header.querySelector('nav[aria-label="Navegación principal"]') : null;

    if (!header || !boton || !nav) {
        return;
    }

    function estaAbierto() {
        return nav.classList.contains('menu-abierto');
    }

    function abrir(estado) {
        nav.classList.toggle('menu-abierto', estado);
        boton.setAttribute('aria-expanded', String(estado));
        boton.setAttribute('aria-label', estado ? 'Cerrar menú de navegación' : 'Abrir menú de navegación');
    }

    boton.addEventListener('click', function () {
        abrir(!estaAbierto());
    });

    nav.addEventListener('click', function (evento) {
        if (evento.target.closest('a')) {
            abrir(false);
        }
    });

    document.addEventListener('click', function (evento) {
        if (estaAbierto() && !header.contains(evento.target)) {
            abrir(false);
        }
    });

    document.addEventListener('keydown', function (evento) {
        if (evento.key === 'Escape' && estaAbierto()) {
            abrir(false);
            boton.focus();
        }
    });

    window.addEventListener('resize', function () {
        if (window.innerWidth > 768 && estaAbierto()) {
            abrir(false);
        }
    });
})();

(function () {
    const aside = document.getElementById('filtros');
    const boton = document.querySelector('.filtros-toggle');
    const lista = document.getElementById('filtros-lista');

    if (!aside || !boton || !lista) {
        return;
    }

    function estaAbierto() {
        return aside.classList.contains('filtros-abierto');
    }

    function abrir(estado) {
        aside.classList.toggle('filtros-abierto', estado);
        boton.setAttribute('aria-expanded', String(estado));
    }

    boton.addEventListener('click', function () {
        abrir(!estaAbierto());
    });

    lista.addEventListener('click', function (evento) {
        const etiqueta = evento.target.closest('label[for]');
        if (!etiqueta) {
            return;
        }

        const control = document.getElementById(etiqueta.getAttribute('for'));
        if (control && control.classList.contains('cat-padre')) {
            return;
        }

        if (window.innerWidth <= 768) {
            abrir(false);
        }
    });

    window.addEventListener('resize', function () {
        if (window.innerWidth > 768 && estaAbierto()) {
            abrir(false);
        }
    });
})();
