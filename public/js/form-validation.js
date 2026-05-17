// VictoryHub - Validação do Formulário de Contato.
// Depende de SecurityUtils (security-utils.js).

(() => {
    const MAX_NOME = 80;
    const MAX_MENSAGEM = 2000;
    const ASSUNTOS_VALIDOS = new Set([
        'suporte', 'torneio', 'conta', 'pagamento', 'sugestao', 'denuncia', 'outro'
    ]);

    document.addEventListener('DOMContentLoaded', () => {
        const form = document.getElementById('contact-form');
        if (!form) return;

        const fields = ['nome', 'email', 'assunto', 'mensagem'];
        fields.forEach((id) => {
            const el = document.getElementById(id);
            if (!el) return;
            const evt = (id === 'assunto') ? 'change' : 'input';
            el.addEventListener(evt, () => clearError(id, id + '-error'));
        });

        form.addEventListener('submit', (e) => {
            fields.forEach(id => clearError(id, id + '-error'));

            const nome = (document.getElementById('nome').value || '').trim();
            const email = (document.getElementById('email').value || '').trim();
            const assunto = document.getElementById('assunto').value;
            const mensagem = (document.getElementById('mensagem').value || '').trim();

            let isValid = true;

            if (!nome || nome.length > MAX_NOME) {
                showError('nome', 'nome-error');
                isValid = false;
            }
            if (!SecurityUtils.isValidEmail(email)) {
                showError('email', 'email-error');
                isValid = false;
            }
            if (!ASSUNTOS_VALIDOS.has(assunto)) {
                showError('assunto', 'assunto-error');
                isValid = false;
            }
            if (!mensagem || mensagem.length > MAX_MENSAGEM) {
                showError('mensagem', 'mensagem-error');
                isValid = false;
            }

            if (!isValid) {
                e.preventDefault();
                return;
            }

            e.preventDefault();

            // Sanitização defensiva — o backend deve validar e re-escapar antes de persistir/exibir.
            const payload = {
                nome: SecurityUtils.escapeHTML(nome),
                email: SecurityUtils.escapeHTML(email),
                assunto: SecurityUtils.escapeHTML(assunto),
                mensagem: SecurityUtils.escapeHTML(mensagem)
            };
            // TODO: enviar payload via fetch com header CSRF para endpoint HTTPS.
            void payload;

            // Token efêmero indica que o redirecionamento veio de um envio válido nesta sessão.
            try { sessionStorage.setItem('vh_contact_submitted', '1'); } catch (_) {}
            window.location.href = 'feedback.html';
        });
    });

    function showError(inputId, errorId) {
        const input = document.getElementById(inputId);
        const error = document.getElementById(errorId);
        if (input) {
            input.classList.add('error', 'is-invalid');
            input.setAttribute('aria-invalid', 'true');
        }
        if (error) {
            error.classList.add('visible');
            error.style.display = 'block';
        }
    }

    function clearError(inputId, errorId) {
        const input = document.getElementById(inputId);
        const error = document.getElementById(errorId);
        if (input) {
            input.classList.remove('error', 'is-invalid');
            input.removeAttribute('aria-invalid');
        }
        if (error) {
            error.classList.remove('visible');
            error.style.display = 'none';
        }
    }
})();
