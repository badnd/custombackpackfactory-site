(function(){
  const $ = (selector, root=document) => root.querySelector(selector);
  const $$ = (selector, root=document) => Array.from(root.querySelectorAll(selector));

  const navButton = $('.menu-btn');
  const navLinks = $('.nav-links');
  if(navButton && navLinks){
    navButton.setAttribute('aria-expanded', 'false');
    navButton.addEventListener('click', ()=>{
      const open = navLinks.classList.toggle('open');
      navButton.setAttribute('aria-expanded', String(open));
    });
  }

  const modal = $('#catalog-modal');
  const openModal = ()=>{
    if(!modal) return;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
    $('.close-modal', modal)?.focus();
  };
  const closeModal = ()=>{
    if(!modal) return;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
  };
  $$('.open-catalog').forEach(button=>button.addEventListener('click', event=>{
    event.preventDefault();
    openModal();
  }));
  $$('.close-modal').forEach(button=>button.addEventListener('click', closeModal));
  modal?.addEventListener('click', event=>{ if(event.target === modal) closeModal(); });
  document.addEventListener('keydown', event=>{ if(event.key === 'Escape') closeModal(); });

  $$('.lead-form').forEach(form=>{
    if(!form.querySelector('[name="_honey"]')){
      form.insertAdjacentHTML('afterbegin', '<input class="form-honey" type="text" name="_honey" tabindex="-1" autocomplete="off" aria-hidden="true">');
    }
    if(!form.querySelector('.privacy-consent')){
      const actions = form.querySelector('button[type="submit"]')?.parentElement;
      const privacyPath = location.pathname.includes('/pages/') ? '../privacy.html' : 'privacy.html';
      actions?.insertAdjacentHTML(
        'beforebegin',
        `<label class="privacy-consent"><input type="checkbox" required> <span>I agree that my contact and project information may be used to answer this inquiry. See the <a href="${privacyPath}">Privacy Policy</a>.</span></label>`
      );
    }

    form.addEventListener('submit', async event=>{
      event.preventDefault();
      const required = $$('[required]', form);
      const valid = required.every(input=>input.type === 'checkbox' ? input.checked : String(input.value || '').trim().length > 1);
      if(!valid){
        form.reportValidity();
        return;
      }
      if(form.querySelector('[name="_honey"]')?.value) return;

      const button = $('button[type="submit"]', form);
      const originalText = button?.textContent || 'Submit';
      let status = $('.form-status', form);
      if(!status){
        status = document.createElement('div');
        status.className = 'form-status';
        status.setAttribute('role', 'status');
        status.setAttribute('aria-live', 'polite');
        form.appendChild(status);
      }
      if(button){
        button.disabled = true;
        button.textContent = 'Sending...';
      }
      status.className = 'form-status';
      status.textContent = 'Sending your request securely...';

      try{
        const endpoint = form.action.replace('formsubmit.co/', 'formsubmit.co/ajax/');
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: { Accept: 'application/json' },
          body: new FormData(form)
        });
        const result = await response.json().catch(()=>({}));
        if(!response.ok || result.success === false) throw new Error('Submission failed');

        status.className = 'form-status success';
        status.textContent = 'Thank you. Your request was sent successfully.';
        form.reset();
        if(form.dataset.catalog){
          const link = document.createElement('a');
          link.href = form.dataset.catalog;
          link.download = 'custom-backpack-factory-catalog.pdf';
          document.body.appendChild(link);
          link.click();
          link.remove();
        }
      }catch(error){
        status.className = 'form-status error';
        status.innerHTML = 'We could not confirm delivery. Please email <a href="mailto:annawei@nameerbag.com">annawei@nameerbag.com</a> or contact us on <a href="https://wa.me/8615102249548" target="_blank" rel="noopener">WhatsApp</a>.';
      }finally{
        if(button){
          button.disabled = false;
          button.textContent = originalText;
        }
      }
    });
  });

  const productSpecs = $('.product-grid .spec-table');
  if (productSpecs && !$('.procurement-terms')) {
    productSpecs.insertAdjacentHTML('afterend', `
      <section class="procurement-terms" aria-label="Typical order process">
        <h2>Typical Order Terms</h2>
        <div class="procurement-terms__grid">
          <div><strong>MOQ</strong><span>Usually 500 pieces per style, subject to materials and construction.</span></div>
          <div><strong>Sampling</strong><span>Timing is confirmed after artwork, materials and specifications are reviewed.</span></div>
          <div><strong>Production</strong><span>Lead time is quoted with the approved sample and final order quantity.</span></div>
          <div><strong>Quality</strong><span>Material, workmanship, dimensions, logo and packing are checked before shipment.</span></div>
        </div>
      </section>`);
  }

  const filter = $('#product-filter');
  filter?.addEventListener('change', ()=>{
    const value = filter.value;
    $$('.product-card').forEach(card=>{
      card.classList.toggle('hidden', value !== 'all' && card.dataset.category !== value);
    });
  });
})();
