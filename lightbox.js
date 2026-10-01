(function () {
    const box = document.getElementById('lightbox');
    const img = box.querySelector('.lightbox-img');
    const contador = box.querySelector('.lightbox-contador');
    let fotos = [];
    let atual = 0;

    function mostrar() {
        img.src = encodeURI(fotos[atual]);
        contador.textContent = (atual + 1) + ' / ' + fotos.length;
    }

    function abrir(capa) {
        const extras = (capa.dataset.galeria || '').split('|').filter(Boolean);
        fotos = [capa.getAttribute('src')].concat(extras);
        atual = 0;
        img.alt = capa.alt;
        box.classList.toggle('sem-navegacao', fotos.length < 2);
        mostrar();
        box.hidden = false;
        document.body.style.overflow = 'hidden';
    }

    function fechar() {
        box.hidden = true;
        img.src = '';
        document.body.style.overflow = '';
    }

    function mover(passo) {
        if (fotos.length < 2) return;
        atual = (atual + passo + fotos.length) % fotos.length;
        mostrar();
    }

    document.querySelectorAll('.projetos-imagem').forEach(function (capa) {
        capa.addEventListener('click', function () { abrir(capa); });
    });

    box.querySelector('.lightbox-fechar').addEventListener('click', fechar);
    box.querySelector('.lightbox-anterior').addEventListener('click', function () { mover(-1); });
    box.querySelector('.lightbox-proximo').addEventListener('click', function () { mover(1); });

    box.addEventListener('click', function (e) {
        if (e.target === box) fechar();
    });

    document.addEventListener('keydown', function (e) {
        if (box.hidden) return;
        if (e.key === 'Escape') fechar();
        else if (e.key === 'ArrowLeft') mover(-1);
        else if (e.key === 'ArrowRight') mover(1);
    });

    // Deslizar com o dedo no telemóvel
    let inicioX = null;
    box.addEventListener('touchstart', function (e) { inicioX = e.touches[0].clientX; }, { passive: true });
    box.addEventListener('touchend', function (e) {
        if (inicioX === null) return;
        const dx = e.changedTouches[0].clientX - inicioX;
        if (Math.abs(dx) > 50) mover(dx < 0 ? 1 : -1);
        inicioX = null;
    });
})();
