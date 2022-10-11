switch (window.location.pathname) {
    case '/login.html': {
        //! Events for Login page

        let inputPhone = document.querySelector('.login-form-input-phone')
        let inputPassword = document.querySelector('.login-form-input-password')
        document.querySelector('.form-btn-login').addEventListener('click', e => {
            e.preventDefault()
            if (inputPhone.value && inputPassword.value) {
                window.location.pathname = '/content.html'
                inputPassword.value = ''
                inputPhone.value = ''
            } else if (!inputPhone.value || !inputPassword.value) {
                let html = `<span class="info-message" style="color: red;  font-size: 14px; font-family: sans-serif">Please enter your phone number and password</span>`
                if (!document.querySelector('.info-message')) {
                    document
                        .querySelector('.login-form-container')
                        .insertAdjacentHTML('beforeend', html)
                }
            }
        })

        inputPhone.addEventListener('keyup', e => {
            let infoMessage = document.querySelector('.info-message')
            if (infoMessage) {
                infoMessage.remove()
            }
        })

        inputPassword.addEventListener('keyup', e => {
            let infoMessage = document.querySelector('.info-message')
            if (infoMessage) {
                infoMessage.remove()
            }
        })
        break
    }

    case '/content.html':
    {
        //!Content page events
        document
            .querySelector('.inner-content-exit-btn')
            .addEventListener('click', () => {
                document.querySelector('.inner-content').style.cssText =
                    'transform: scale(0);'
                document.querySelector('.inner-content-container').style.cssText =
                    'visibility: hidden; opacity: 0;'
            })

        document.querySelectorAll('.main-content-item').forEach(el => {
            el.addEventListener('click', e => {
                let id = el.children[0].children[1].textContent
                let date = el.children[0].children[0].textContent
                let number = el.children[1].textContent
                let sum = el.children[2].children[0].textContent
                let ball = el.children[2].children[1].textContent

                document.querySelector('.inner-content-id').textContent = id
                document.querySelector(
                    '.inner-content-body-number'
                ).textContent = number
                document.querySelector('.inner-content-body-sum').textContent = sum
                // document.querySelector('.inner-content-paid-bonus').textContent = bonus;
                // document.querySelector('.inner-content-body-cashier').textContent = id;

                document.querySelector('.inner-content-container').style.cssText =
                    'visibility: visible; opacity: 1;'
                document.querySelector('.inner-content').style.cssText =
                    'transform: scale(1);'
            })
        })

        document.querySelector('.plus-icon').addEventListener('click', () => {
            window.location.pathname = '/client-contact.html';
        });
        document.querySelector('.content-exit-button').addEventListener('click', () => {
            window.location.pathname = '/login.html';
        })
    }
        break
    case '/client-contact.html':
    {
        let inputClient = document.querySelector('.client-contact-input')
        document
            .querySelector('.form-btn-client')
            .addEventListener('click', e => {
                e.preventDefault()
                if (inputClient.value) {
                    inputClient.value = ''
                    window.location.pathname = '/balance.html'
                } else if (!inputClient.value) {
                    let html = `<span class="info-message" style="color: red; margin-left: 10px;  font-size: 14px; font-family: sans-serif">Please enter your phone number</span>`
                    if (!document.querySelector('.info-message')) {
                        inputClient.insertAdjacentHTML('afterend', html)
                    }
                }
            })
        inputClient.addEventListener('keyup', e => {
            let infoMessage = document.querySelector('.info-message')
            if (infoMessage) {
                infoMessage.remove()
            }
        })
    }
        break
    case '/balance.html': {
        let inputSum = document.querySelector('.login-form-input-sum')
        let inputBalance = document.querySelector('.login-form-input-balance')
        document
            .querySelector('.form-btn-balance-page')
            .addEventListener('click', e => {
                e.preventDefault()

                if (inputSum.value && inputBalance.value) {
                    window.location.pathname = '/info.html'
                    inputSum.value = ''
                    inputBalance.value = ''
                } else if (!inputSum.value || !inputBalance.value) {
                    let html = `<span class="info-message" style="color: red;  font-size: 14px; font-family: sans-serif">Please enter your phone number and password</span>`
                    if (!document.querySelector('.info-message')) {
                        document
                            .querySelector('.login-form-container')
                            .insertAdjacentHTML('beforeend', html)
                    }
                }

                inputSum.addEventListener('keyup', e => {
                    let infoMessage = document.querySelector('.info-message')
                    if (infoMessage) {
                        infoMessage.remove()
                    }
                })

                inputBalance.addEventListener('keyup', e => {
                    let infoMessage = document.querySelector('.info-message')
                    if (infoMessage) {
                        infoMessage.remove()
                    }
                })
            })
    }
    case '/info.html': {
        document.querySelector('.form-btn-info').addEventListener('click', e => {
            e.preventDefault();
            window.location.pathname='/qr-code-page.html';
        })
    }
        break;
    case '/qr-code-page.html': {
        document.querySelector('.form-qr-code-btn').addEventListener('click', (e) => {
            window.location.pathname='/content.html';
        })
    }


}
