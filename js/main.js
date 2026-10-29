(() => {
  'use strict';
  const toggle = document.querySelector('.menu-toggle');
  const mobile = document.querySelector('.mobile-nav');
  toggle?.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
    mobile.hidden = !open;
  });
  mobile?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    mobile.hidden = true;
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Открыть меню');
  }));
  const buttons = [...document.querySelectorAll('[data-filter]')];
  const projects = [...document.querySelectorAll('[data-category]')];
  buttons.forEach(button => button.addEventListener('click', () => {
    const selected = button.dataset.filter;
    buttons.forEach(b => { const active = b === button; b.classList.toggle('is-active', active); b.setAttribute('aria-pressed', String(active)); });
    projects.forEach(card => { card.hidden = selected !== 'all' && card.dataset.category !== selected; });
  }));
  const year = document.querySelector('#year');
  if (year) year.textContent = new Date().getFullYear();
  document.querySelector('#contact-form')?.addEventListener('submit', event => {
    event.preventDefault();
    const fd = new FormData(event.currentTarget);
    const body = `Имя: ${fd.get('name')}\nКонтакт: ${fd.get('contact')}\nНаправление: ${fd.get('service')}\nЗадача: ${fd.get('message') || 'Не указана'}`;
    // Демонстрационный режим: адрес получателя задаётся после согласования контактов.
    // Не показываем ложное сообщение «заявка отправлена».
    const subject = encodeURIComponent('Заявка с сайта Электромонтаж');
    window.location.href = `mailto:?subject=${subject}&body=${encodeURIComponent(body)}`;
  });
})();
