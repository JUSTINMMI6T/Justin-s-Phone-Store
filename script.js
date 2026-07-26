const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle?.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealElements.forEach(el => revealObserver.observe(el));

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    const element = entry.target;
    const target = parseFloat(element.dataset.target);
    const duration = 1500;
    const start = performance.now();

    const updateCounter = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const value = target * progress;

      if (target % 1 !== 0) {
        element.textContent = value.toFixed(1);
      } else {
        element.textContent = Math.floor(value).toLocaleString('id-ID');
      }

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      }
    };

    requestAnimationFrame(updateCounter);
    counterObserver.unobserve(element);
  });
}, { threshold: 0.5 });

document.querySelectorAll('[data-target]').forEach(el => counterObserver.observe(el));

const searchInput = document.getElementById('searchInput');
const productCards = document.querySelectorAll('.product-card');
const filterChips = document.querySelectorAll('.filter-chip');

let activeFilter = 'all';

function filterProducts() {
  const query = searchInput.value.toLowerCase();

  productCards.forEach(card => {
    const category = card.dataset.category;
    const text = card.textContent.toLowerCase();

    const matchesFilter = activeFilter === 'all' || category === activeFilter;
    const matchesSearch = text.includes(query);

    card.style.display = matchesFilter && matchesSearch ? 'block' : 'none';
  });
}

searchInput.addEventListener('input', filterProducts);

filterChips.forEach(chip => {
  chip.addEventListener('click', () => {
    filterChips.forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
    activeFilter = chip.dataset.filter;
    filterProducts();
  });
});

const wishlistButtons = document.querySelectorAll('.wishlist-btn');

wishlistButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    btn.classList.toggle('active');
    btn.textContent = btn.classList.contains('active') ? '♥' : '♡';
  });
});

let cartCount = 3;
const cartCountElement = document.querySelector('.cart-count');

document.querySelectorAll('.add-cart').forEach(button => {
  button.addEventListener('click', () => {
    cartCount += 1;
    cartCountElement.textContent = cartCount;

    button.textContent = 'Ditambahkan ✓';
    button.disabled = true;

    setTimeout(() => {
      button.textContent = 'Tambah';
      button.disabled = false;
    }, 1600);
  });
});

document.querySelectorAll('.faq-question').forEach(question => {
  question.addEventListener('click', () => {
    const item = question.parentElement;
    item.classList.toggle('active');
    question.querySelector('span').textContent = item.classList.contains('active') ? '−' : '+';
  });
});

const backToTop = document.querySelector('.back-to-top');

window.addEventListener('scroll', () => {
  backToTop.classList.toggle('show', window.scrollY > 500);
});

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

document.querySelector('.newsletter-form')?.addEventListener('submit', (event) => {
  event.preventDefault();

  const button = event.target.querySelector('button');
  const originalText = button.textContent;

  button.textContent = 'Berhasil ✓';
  button.disabled = true;

  setTimeout(() => {
    button.textContent = originalText;
    button.disabled = false;
    event.target.reset();
  }, 2000);
});
