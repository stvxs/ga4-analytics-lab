'use strict';
// Google Tag устанавливается отдельно в head каждой HTML-страницы.
const leadForm = document.querySelector('#lead-form');

if (leadForm) {
  // Создаём ID заявки в формате, который проверяет Apps Script.
  const requestId = document.querySelector('#request-id');
  if (requestId) {
    requestId.value = 'REQ-' + crypto.randomUUID().toUpperCase();
  }

  // Сохраняем UTM-метки из адресной строки страницы.
  const params = new URLSearchParams(window.location.search);
  const utmSource = document.querySelector('#utm-source');
  const utmMedium = document.querySelector('#utm-medium');
  const utmCampaign = document.querySelector('#utm-campaign');

  if (utmSource) utmSource.value = params.get('utm_source') || 'direct';
  if (utmMedium) utmMedium.value = params.get('utm_medium') || 'none';
  if (utmCampaign) utmCampaign.value = params.get('utm_campaign') || 'not_set';

  leadForm.addEventListener('submit', () => {
    if (typeof gtag === 'function') {
      gtag('event', 'generate_lead', {
        lead_source: 'contact_form'
      });
    }

    const status = document.querySelector('#form-status');
    if (status) {
      status.textContent = 'Заявка отправляется…';
    }

    // Не отменяем стандартную отправку формы в Google Apps Script.
  });
}

const programCta = document.querySelector('#program-cta');
if (programCta) {
  programCta.addEventListener('click', () => {
    document.querySelector('#program-preview').hidden = false;
    if (typeof gtag === 'function') {
      gtag('event', 'cta_click', {
        button_name: 'program',
        page_section: 'hero'
      });
    }
  });
}
