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

        input.setAttribute(
            'aria-invalid',
            'true'
        );

        if (errorEl) {

            errorEl.textContent = message;

            errorEl.classList.add(
                'visible'
            );
        }
    }


    function clearError(input, errorEl) {

        if (!input) return;

        input.classList.remove(
            'is-invalid'
        );

        input.classList.add(
            'is-valid'
        );

        input.removeAttribute(
            'aria-invalid'
        );

        if (errorEl) {

            errorEl.textContent = '';

            errorEl.classList.remove(
                'visible'
            );
        }
    }


    function bindClearOnInput(
        input,
        errorElId,
        eventName = 'input'
    ) {

        if (!input) return;

        input.addEventListener(
            eventName,
            () =>
                clearError(
                    input,
                    getError(errorElId)
                )
        );
    }


    // LOGIN

    function setupLoginForm() {

    const form =
        document.getElementById(
            'login-form'
        );

    if (!form) return;


    const usuario =
        document.getElementById(
            'login-usuario'
        );

    const senha =
        document.getElementById(
            'login-senha'
        );


    form.addEventListener(
        'submit',
        (e) => {

            e.preventDefault();

            let valid = true;


            if (
                usuario.value.trim() === ''
            ) {

                setError(
                    usuario,
                    getError(
                        'login-usuario-error'
                    ),
                    'Informe o usuário.'
                );

                valid = false;
            }

            if (
                senha.value.trim() === ''
            ) {

                setError(
                    senha,
                    getError(
                        'login-senha-error'
                    ),
                    'Informe a senha.'
                );

                valid = false;
            }

            if (!valid) return;


            // PEGA USUÁRIOS

            let usuarios =
                JSON.parse(
                    localStorage.getItem(
                        'usuarios'
                    )
                ) || [];


            // PROCURA LOGIN

            const usuarioEncontrado =
                usuarios.find(
                    user =>

                        (
                            user.email ===
                            usuario.value ||

                            user.usuario ===
                            usuario.value
                        )

                        &&

                        user.senha ===
                        senha.value
                );


            // LOGIN INVÁLIDO

            if (!usuarioEncontrado) {

                setError(
                    usuario,
                    getError(
                        'login-usuario-error'
                    ),
                    'Usuário ou senha incorretos.'
                );

                setError(
                    senha,
                    getError(
                        'login-senha-error'
                    ),
                    'Usuário ou senha incorretos.'
                );

                return;
            }


            alert(
                'Login realizado com sucesso!'
            );

            form.reset();
        }
    );
}
    // CADASTRO

    function setupCadastroForm() {

    const form =
        document.getElementById(
            'cadastro-form'
        );

    if (!form) return;

    const usuario =
        document.getElementById(
            'cad-usuario'
        );

    const senha =
        document.getElementById(
            'cad-senha'
        );

    const email =
        document.getElementById(
            'cad-email'
        );

    const cpf =
        document.getElementById(
            'cad-cpf'
        );

    const consent =
        document.getElementById(
            'cad-consent'
        );


    cpf.addEventListener(
        'input',
        () => {

            cpf.value = cpf.value
                .replace(/\D/g, '')
                .replace(/(\d{3})(\d)/, '$1.$2')
                .replace(/(\d{3})(\d)/, '$1.$2')
                .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
        }
    );

    form.addEventListener(
        'submit',
        (e) => {

            e.preventDefault();

            let valid = true;


            // VALIDAÇÕES

            if (
                usuario.value.trim().length < 3
            ) {

                setError(
                    usuario,
                    getError(
                        'cad-usuario-error'
                    ),
                    'Usuário inválido.'
                );

                valid = false;
            }

            if (
                !SecurityUtils.isValidEmail(
                    email.value
                )
            ) {

                setError(
                    email,
                    getError(
                        'cad-email-error'
                    ),
                    'E-mail inválido.'
                );

                valid = false;
            }

            if (
                senha.value.length < 8
            ) {

                setError(
                    senha,
                    getError(
                        'cad-senha-error'
                    ),
                    'Senha muito curta.'
                );

                valid = false;
            }

            if (
                !SecurityUtils.isValidCPF(
                    cpf.value
                )
            ) {

                setError(
                    cpf,
                    getError(
                        'cad-cpf-error'
                    ),
                    'CPF inválido.'
                );

                valid = false;
            }

            if (!consent.checked) {

                setError(
                    consent,
                    getError(
                        'cad-consent-error'
                    ),
                    'Aceite os termos.'
                );

                valid = false;
            }

            if (!valid) return;


            // ARRAY DE USUÁRIOS

            let usuarios =
                JSON.parse(
                    localStorage.getItem(
                        'usuarios'
                    )
                ) || [];


            // VERIFICA EMAIL REPETIDO

            const existe =
                usuarios.find(
                    user =>
                        user.email ===
                        email.value
                );

            if (existe) {

                setError(
                    email,
                    getError(
                        'cad-email-error'
                    ),
                    'Este e-mail já existe.'
                );

                return;
            }


            // SALVA USUÁRIO

            usuarios.push({

                usuario:
                    usuario.value,

                email:
                    email.value,

                senha:
                    senha.value,

                cpf:
                    cpf.value
            });


            localStorage.setItem(
                'usuarios',
                JSON.stringify(
                    usuarios
                )
            );


            alert(
                'Cadastro realizado com sucesso!'
            );

            form.reset();
        }
    );
}

})();