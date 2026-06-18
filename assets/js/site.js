
(function(){
  const $ = (sel, root=document) => root.querySelector(sel);
  const $$ = (sel, root=document) => Array.from(root.querySelectorAll(sel));
  const navBtn = $('.menu-btn');
  const navLinks = $('.nav-links');
  if(navBtn && navLinks) navBtn.addEventListener('click', () => navLinks.classList.toggle('open'));
  const modal = $('#catalog-modal');
  $$('.open-catalog').forEach(btn => btn.addEventListener('click', (e) => { e.preventDefault(); modal && modal.classList.add('open'); }));
  $$('.close-modal').forEach(btn => btn.addEventListener('click', () => modal && modal.classList.remove('open')));
  if(modal) modal.addEventListener('click', e => { if(e.target === modal) modal.classList.remove('open'); });
  $$('.lead-form').forEach(form => {
    form.addEventListener('submit', function(e) {
      const required = $$('[required]', form);
      const ok = required.every(input => String(input.value || '').trim().length > 1);
      if(!ok) return;
      e.preventDefault();
      const payload = Object.fromEntries(new FormData(form).entries());
      try { localStorage.setItem('customBackpackFactoryLead', JSON.stringify({...payload, time: new Date().toISOString()})); } catch(err) {}
      const msg = $('.success-msg', form);
      if(msg) msg.style.display = 'block';
      const link = document.createElement('a');
      link.href = (form.dataset.catalog || '/assets/catalog/custom-backpack-factory-catalog.pdf');
      link.download = 'custom-backpack-factory-catalog.pdf';
      document.body.appendChild(link);
      setTimeout(() => { link.click(); link.remove(); }, 120);
      setTimeout(() => { HTMLFormElement.prototype.submit.call(form); }, 700);
    });
  });
  const filter = $('#product-filter');
  if(filter) {
    filter.addEventListener('change', () => {
      const val = filter.value;
      $$('.product-card').forEach(card => { card.classList.toggle('hidden', val !== 'all' && card.dataset.category !== val); });
    });
  }

  const homepageGrid = $('#homepage-product-grid');
  if(homepageGrid && Array.isArray(window.CBF_PRODUCTS)) {
    const limit = 12;
    const categoryQuotas = {
      'Business Backpack': 3,
      'Laptop Backpack': 2,
      'Custom Backpack': 1,
      'Crossbody Bag': 1,
      'Kids Backpack': 1,
      'Foldable Backpack': 1,
      'Tactical Backpack': 1,
      'Hydration Vest': 1
    };
    const selected = [];
    const selectedSlugs = new Set();
    const categoryCounts = {};
    window.CBF_PRODUCTS.forEach(product => {
      if(selected.length >= limit || selectedSlugs.has(product.slug)) return;
      const quota = categoryQuotas[product.category] || 1;
      const count = categoryCounts[product.category] || 0;
      if(count >= quota) return;
      selected.push(product);
      selectedSlugs.add(product.slug);
      categoryCounts[product.category] = count + 1;
    });
    window.CBF_PRODUCTS.forEach(product => {
      if(selected.length >= limit || selectedSlugs.has(product.slug)) return;
      selected.push(product);
      selectedSlugs.add(product.slug);
    });

    const escapeHtml = value => String(value || '').replace(/[&<>"']/g, char => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    }[char]));
    const cardTags = product => {
      const model = product.specs && product.specs.Model;
      return model
        ? [model, product.category, 'OEM/ODM']
        : ['Custom Logo Available', 'OEM/ODM', 'Private Label'];
    };

    homepageGrid.innerHTML = selected.map(product => {
      const href = `pages/${product.slug}.html`;
      const model = product.specs && product.specs.Model;
      const label = model ? `Model ${model}` : 'Custom Logo Zone';
      return `<article class="card product-card" data-category="${escapeHtml(product.category)}"><a href="${escapeHtml(href)}"><div class="image-wrap"><img class="thumb" loading="lazy" src="${escapeHtml(product.hero_img)}" alt="${escapeHtml(product.title)} custom logo OEM ODM catalog page"><span class="logo-location-pill">${escapeHtml(label)}</span></div></a><div class="card-body"><div class="tags">${cardTags(product).map(tag => `<span class="tag">${escapeHtml(tag)}</span>`).join('')}</div><h3>${escapeHtml(product.title)}</h3><p>${escapeHtml(product.kicker)}</p><a class="btn btn-outline" href="${escapeHtml(href)}">View Details</a></div></article>`;
    }).join('');
  }
})();
