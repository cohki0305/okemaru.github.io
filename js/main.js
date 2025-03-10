/**
 * おけまる配送 - メインJavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
    // AOS (Animate On Scroll) 初期化
    AOS.init({
        duration: 800,
        easing: 'ease',
        once: true,
        offset: 100
    });

    // Particles.js 初期化
    initParticles();

    // タイプライターエフェクト
    initTypewriter();

    // ヘッダースクロールエフェクト
    initHeaderScroll();

    // モバイルメニュー制御
    initMobileMenu();

    // スクロールトップボタン
    initScrollTopButton();

    // フォームバリデーション
    initFormValidation();
});

/**
 * Particles.js 初期化
 */
function initParticles() {
    if (document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            "particles": {
                "number": {
                    "value": 80,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": "#ffffff"
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    },
                    "polygon": {
                        "nb_sides": 5
                    }
                },
                "opacity": {
                    "value": 0.5,
                    "random": false,
                    "anim": {
                        "enable": false,
                        "speed": 1,
                        "opacity_min": 0.1,
                        "sync": false
                    }
                },
                "size": {
                    "value": 3,
                    "random": true,
                    "anim": {
                        "enable": false,
                        "speed": 40,
                        "size_min": 0.1,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#ffffff",
                    "opacity": 0.4,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 2,
                    "direction": "none",
                    "random": false,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                        "enable": false,
                        "rotateX": 600,
                        "rotateY": 1200
                    }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "grab"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 140,
                        "line_linked": {
                            "opacity": 1
                        }
                    },
                    "bubble": {
                        "distance": 400,
                        "size": 40,
                        "duration": 2,
                        "opacity": 8,
                        "speed": 3
                    },
                    "repulse": {
                        "distance": 200,
                        "duration": 0.4
                    },
                    "push": {
                        "particles_nb": 4
                    },
                    "remove": {
                        "particles_nb": 2
                    }
                }
            },
            "retina_detect": true
        });
    }
}

/**
 * タイプライターエフェクト
 */
function initTypewriter() {
    const typewriterElement = document.getElementById('typewriter');
    if (!typewriterElement) return;

    const phrases = [
        '乗りたいトラックがある？おけまる配送なら自由に選択できます！',
        '短い労働時間で、プライベートも充実。',
        '未経験でも安心のサポート体制。',
        'ホワイトな働き方を実現します。'
    ];

    let currentPhraseIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const currentPhrase = phrases[currentPhraseIndex];

        if (isDeleting) {
            // 削除中
            typewriterElement.textContent = currentPhrase.substring(0, currentCharIndex - 1);
            currentCharIndex--;
            typingSpeed = 50;
        } else {
            // タイピング中
            typewriterElement.textContent = currentPhrase.substring(0, currentCharIndex + 1);
            currentCharIndex++;
            typingSpeed = 100;
        }

        // 現在のフレーズが完成したら
        if (!isDeleting && currentCharIndex === currentPhrase.length) {
            // 一時停止してから削除開始
            isDeleting = true;
            typingSpeed = 1500;
        } else if (isDeleting && currentCharIndex === 0) {
            // 削除が完了したら次のフレーズへ
            isDeleting = false;
            currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
            typingSpeed = 500;
        }

        setTimeout(type, typingSpeed);
    }

    // タイプライター開始
    setTimeout(type, 1000);
}

/**
 * ヘッダースクロールエフェクト
 */
function initHeaderScroll() {
    const header = document.getElementById('header');
    if (!header) return;

    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

/**
 * モバイルメニュー制御
 */
function initMobileMenu() {
    const menuToggle = document.querySelector('.header__toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuLinks = document.querySelectorAll('.mobile-menu__link, .mobile-menu__cta');

    if (!menuToggle || !mobileMenu) return;

    // メニュー開閉
    menuToggle.addEventListener('click', function() {
        mobileMenu.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });

    // メニューリンククリック時に閉じる
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });

    // 画面外クリックで閉じる
    document.addEventListener('click', function(event) {
        if (!mobileMenu.contains(event.target) && !menuToggle.contains(event.target) && mobileMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    });
}

/**
 * スクロールトップボタン
 */
function initScrollTopButton() {
    const scrollTopButton = document.getElementById('scroll-top');
    if (!scrollTopButton) return;

    // スクロール位置に応じてボタン表示/非表示
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollTopButton.classList.add('active');
        } else {
            scrollTopButton.classList.remove('active');
        }
    });

    // トップへスクロール
    scrollTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/**
 * フォームバリデーション
 */
function initFormValidation() {
    const form = document.getElementById('application-form');
    if (!form) return;

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        // 必須項目チェック
        let isValid = true;
        const requiredFields = form.querySelectorAll('[required]');

        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.classList.add('error');
            } else {
                field.classList.remove('error');
            }
        });

        // メールアドレスの形式チェック
        const emailField = form.querySelector('#email');
        if (emailField && emailField.value.trim()) {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(emailField.value)) {
                isValid = false;
                emailField.classList.add('error');
            }
        }

        // 電話番号の形式チェック
        const phoneField = form.querySelector('#phone');
        if (phoneField && phoneField.value.trim()) {
            const phonePattern = /^[0-9\-\+]{10,15}$/;
            if (!phonePattern.test(phoneField.value.replace(/\s/g, ''))) {
                isValid = false;
                phoneField.classList.add('error');
            }
        }

        // バリデーション成功時の処理
        if (isValid) {
            // 実際の送信処理（ここではモックアップ）
            showFormSuccess();
        } else {
            // エラーメッセージ表示
            showFormError();
        }
    });

    // フィールドの入力時にエラー表示をリセット
    const formFields = form.querySelectorAll('input, select, textarea');
    formFields.forEach(field => {
        field.addEventListener('input', function() {
            this.classList.remove('error');
            const errorMessage = form.querySelector('.form-error-message');
            if (errorMessage) {
                errorMessage.remove();
            }
        });
    });
}

/**
 * フォーム送信成功時の処理
 */
function showFormSuccess() {
    const form = document.getElementById('application-form');
    if (!form) return;

    // 成功メッセージ
    const successMessage = document.createElement('div');
    successMessage.className = 'form-success-message';
    successMessage.innerHTML = '<p>応募が完了しました。担当者からのご連絡をお待ちください。</p>';

    // フォームを非表示にして成功メッセージを表示
    form.style.display = 'none';
    form.parentNode.appendChild(successMessage);

    // スクロール
    successMessage.scrollIntoView({ behavior: 'smooth' });
}

/**
 * フォームエラー時の処理
 */
function showFormError() {
    const form = document.getElementById('application-form');
    if (!form) return;

    // 既存のエラーメッセージを削除
    const existingError = form.querySelector('.form-error-message');
    if (existingError) {
        existingError.remove();
    }

    // エラーメッセージ
    const errorMessage = document.createElement('div');
    errorMessage.className = 'form-error-message';
    errorMessage.innerHTML = '<p>入力内容に誤りがあります。必須項目を確認してください。</p>';

    // エラーメッセージを表示
    form.querySelector('.form__submit').before(errorMessage);

    // スクロール
    errorMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
}
