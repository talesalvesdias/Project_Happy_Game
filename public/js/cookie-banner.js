// Banner de consentimento de cookies (LGPD).
// Não usa innerHTML para evitar qualquer risco de injeção, mesmo com texto estático.

(() => {
    const STORAGE_KEY = 'vh_cookie_consent_v1';

    document.addEventListener('DOMContentLoaded', () => {
        let stored = null;
        try { stored = localStorage.getItem(STORAGE_KEY); } catch (_) {}
        if (stored) return;

        const banner = document.createElement('div');
        banner.id = 'cookie-banner';
        banner.setAttribute('role', 'dialog');
        banner.setAttribute('aria-live', 'polite');
        banner.setAttribute('aria-label', 'Consentimento de cookies');

        const text = document.createElement('div');
        text.className = 'cookie-text';
        text.textContent = 'Usamos cookies essenciais para o funcionamento da plataforma e cookies analíticos com sua autorização. Saiba mais na nossa Política de Privacidade.';

        const actions = document.createElement('div');
        actions.className = 'cookie-actions';

        const decline = document.createElement('button');
        decline.type = 'button';
        decline.className = 'cookie-btn cookie-decline';
        decline.textContent = 'Recusar';

        const accept = document.createElement('button');
        accept.type = 'button';
        accept.className = 'cookie-btn cookie-accept';
        accept.textContent = 'Aceitar';

        actions.appendChild(decline);
        actions.appendChild(accept);
        banner.appendChild(text);
        banner.appendChild(actions);
        document.body.appendChild(banner);

        function close(value) {
            try { localStorage.setItem(STORAGE_KEY, value); } catch (_) {}
            banner.remove();
        }

        accept.addEventListener('click', () => close('accepted'));
        decline.addEventListener('click', () => close('declined'));
    });
})();
