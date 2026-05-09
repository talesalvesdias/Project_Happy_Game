// Utilitários de segurança compartilhados pelos formulários do VictoryHub.
// Defesa em profundidade: o backend deve revalidar tudo, isto é só a primeira camada.

const SecurityUtils = (() => {
    const ESCAPE_MAP = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
        '/': '&#x2F;',
        '`': '&#x60;',
        '=': '&#x3D;'
    };

    function escapeHTML(value) {
        return String(value).replace(/[&<>"'`=\/]/g, (c) => ESCAPE_MAP[c]);
    }

    function isValidEmail(email) {
        if (typeof email !== 'string' || email.length > 254) return false;
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    // 8+ caracteres, ao menos 1 maiúscula, 1 minúscula, 1 dígito e 1 caractere especial.
    function isStrongPassword(password) {
        if (typeof password !== 'string' || password.length < 8 || password.length > 128) return false;
        return /[a-z]/.test(password)
            && /[A-Z]/.test(password)
            && /\d/.test(password)
            && /[^A-Za-z0-9]/.test(password);
    }

    function passwordStrength(password) {
        if (!password) return 0;
        let score = 0;
        if (password.length >= 8) score++;
        if (password.length >= 12) score++;
        if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
        if (/\d/.test(password)) score++;
        if (/[^A-Za-z0-9]/.test(password)) score++;
        return Math.min(score, 4);
    }

    function isValidCPF(cpf) {
        const digits = String(cpf).replace(/\D/g, '');
        if (digits.length !== 11 || /^(\d)\1{10}$/.test(digits)) return false;
        const calc = (slice, factor) => {
            let sum = 0;
            for (let i = 0; i < slice.length; i++) sum += parseInt(slice[i], 10) * (factor - i);
            const r = (sum * 10) % 11;
            return r === 10 ? 0 : r;
        };
        const d1 = calc(digits.slice(0, 9), 10);
        if (d1 !== parseInt(digits[9], 10)) return false;
        const d2 = calc(digits.slice(0, 10), 11);
        return d2 === parseInt(digits[10], 10);
    }

    function maskCPF(value) {
        return String(value)
            .replace(/\D/g, '')
            .slice(0, 11)
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    }

    function isValidUsername(name) {
        return typeof name === 'string'
            && name.length >= 3
            && name.length <= 30
            && /^[A-Za-z0-9_.-]+$/.test(name);
    }

    return { escapeHTML, isValidEmail, isStrongPassword, passwordStrength, isValidCPF, maskCPF, isValidUsername };
})();
