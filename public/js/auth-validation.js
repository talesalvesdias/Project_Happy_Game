// Validação dos modais de Login e Cadastro.
// Depende de SecurityUtils (security-utils.js).

(() => {
    document.addEventListener('DOMContentLoaded', () => {
        setupLoginForm();
        setupCadastroForm();
    });

    function getError(id) {
        return document.getElementById(id);
    }

    function setError(input, errorEl, message) {
        if (!input) return;
        input.classList.add('is-invalid');
        input.setAttribute('aria-invalid', 'true');
        if (errorEl) {
            errorEl.textContent = message;
            errorEl.classList.add('visible');
        }
    }

    function clearError(input, errorEl) {
        if (!input) return;
        input.classList.remove('is-invalid');
        input.removeAttribute('aria-invalid');
        if (errorEl) {
            errorEl.textContent = '';
            errorEl.classList.remove('visible');
        }
    }

    function bindClearOnInput(input, errorElId, eventName = 'input') {
        if (!input) return;
        input.addEventListener(eventName, () => clearError(input, getError(errorElId)));
    }

    function setupLoginForm() {
        const form = document.getElementById('login-form');
        if (!form) return;

        const usuario = document.getElementById('login-usuario');
        const senha = document.getElementById('login-senha');

        bindClearOnInput(usuario, 'login-usuario-error');
        bindClearOnInput(senha, 'login-senha-error');

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            let valid = true;

            const usuarioVal = usuario.value.trim();
            if (!usuarioVal || usuarioVal.length > 254) {
                setError(usuario, getError('login-usuario-error'), 'Informe usuário ou e-mail.');
                valid = false;
            }
            if (!senha.value || senha.value.length > 128) {
                setError(senha, getError('login-senha-error'), 'Informe a senha.');
                valid = false;
            }

            if (!valid) return;

            // TODO: substituir por fetch ao endpoint HTTPS com token CSRF e tratamento de erro genérico
            // (não diferenciar "usuário não existe" de "senha incorreta" para evitar enumeração).
            form.reset();
        });
    }

    function setupCadastroForm() {
        const form = document.getElementById('cadastro-form');
        if (!form) return;

        const usuario = document.getElementById('cad-usuario');
        const senha = document.getElementById('cad-senha');
        const email = document.getElementById('cad-email');
        const cpf = document.getElementById('cad-cpf');
        const consent = document.getElementById('cad-consent');
        const strengthBar = document.getElementById('cad-senha-strength');

        bindClearOnInput(usuario, 'cad-usuario-error');
        bindClearOnInput(email, 'cad-email-error');
        bindClearOnInput(consent, 'cad-consent-error', 'change');

        cpf.addEventListener('input', () => {
            cpf.value = SecurityUtils.maskCPF(cpf.value);
            clearError(cpf, getError('cad-cpf-error'));
        });

        senha.addEventListener('input', () => {
            clearError(senha, getError('cad-senha-error'));
            if (strengthBar) {
                strengthBar.dataset.score = String(SecurityUtils.passwordStrength(senha.value));
            }
        });

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            let valid = true;

            if (!SecurityUtils.isValidUsername(usuario.value.trim())) {
                setError(usuario, getError('cad-usuario-error'),
                    'Use 3 a 30 caracteres: letras, números, ponto, hífen ou underscore.');
                valid = false;
            }
            if (!SecurityUtils.isValidEmail(email.value.trim())) {
                setError(email, getError('cad-email-error'), 'E-mail inválido.');
                valid = false;
            }
            if (!SecurityUtils.isStrongPassword(senha.value)) {
                setError(senha, getError('cad-senha-error'),
                    'Mínimo 8 caracteres com maiúscula, minúscula, número e símbolo.');
                valid = false;
            }
            if (!SecurityUtils.isValidCPF(cpf.value)) {
                setError(cpf, getError('cad-cpf-error'), 'CPF inválido.');
                valid = false;
            }
            if (!consent.checked) {
                setError(consent, getError('cad-consent-error'),
                    'É necessário aceitar a Política de Privacidade.');
                valid = false;
            }

            if (!valid) return;

            // TODO: enviar via fetch ao endpoint HTTPS com token CSRF; nunca logar a senha.
            form.reset();
            if (strengthBar) strengthBar.dataset.score = '0';
        });
    }
})();
