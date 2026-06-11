
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
})();
