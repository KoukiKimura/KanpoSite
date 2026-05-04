(function () {
  document.querySelectorAll('[data-mobile-drawer]').forEach(function (drawer) {
    var overlay = drawer.querySelector('[data-drawer-overlay]');
    var navLinks = drawer.querySelectorAll('.mobile-drawer__nav a');

    if (overlay) {
      overlay.addEventListener('click', function () {
        drawer.open = false;
      });
    }

    navLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        drawer.open = false;
      });
    });
  });

  document.addEventListener('keydown', function (event) {
    if (event.key !== 'Escape') {
      return;
    }

    document.querySelectorAll('[data-mobile-drawer][open]').forEach(function (drawer) {
      drawer.open = false;
    });
  });

  function setActiveSlide(slides, index) {
    slides.forEach(function (slide, slideIndex) {
      slide.classList.toggle('is-active', slideIndex === index);
    });
  }

  document.querySelectorAll('[data-hero-slider]').forEach(function (slider) {
    var slides = Array.prototype.slice.call(slider.querySelectorAll('[data-hero-slide]'));
    if (slides.length <= 1) {
      return;
    }

    var current = 0;
    var section = slider.closest('[data-hero-section]');
    var prev = section ? section.querySelector('[data-hero-prev]') : null;
    var next = section ? section.querySelector('[data-hero-next]') : null;

    function move(direction) {
      current = (current + direction + slides.length) % slides.length;
      setActiveSlide(slides, current);
    }

    if (prev) {
      prev.addEventListener('click', function () {
        move(-1);
      });
    }

    if (next) {
      next.addEventListener('click', function () {
        move(1);
      });
    }

    window.setInterval(function () {
      move(1);
    }, 5200);
  });

  document.querySelectorAll('[data-product-form]').forEach(function (form) {
    var select = form.querySelector('[data-variant-select]');
    var price = form.querySelector('[data-current-price]');
    var stock = form.querySelector('[data-variant-stock]');
    var addButton = form.querySelector('[data-add-button]');
    var quantity = form.querySelector('[data-quantity-input]');

    if (!select) {
      return;
    }

    function syncVariant() {
      var option = select.options[select.selectedIndex];
      if (!option) {
        return;
      }

      var available = option.dataset.available === 'true';
      var max = Number(option.dataset.quantityMax || 9);

      if (price && option.dataset.price) {
        price.textContent = option.dataset.price;
      }

      if (stock && option.dataset.stockLabel) {
        stock.textContent = option.dataset.stockLabel;
        stock.classList.toggle('stock-label--sold-out', !available);
      }

      if (addButton) {
        addButton.disabled = !available;
      }

      if (quantity) {
        quantity.max = String(max);
        if (Number(quantity.value) > max) {
          quantity.value = String(max);
        }
      }
    }

    select.addEventListener('change', syncVariant);
    syncVariant();
  });
})();
