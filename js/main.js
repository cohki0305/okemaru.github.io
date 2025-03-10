/**
 * おけまる配送 - メインJavaScript
 * ポップでフレンドリーなサイト用にアニメーションを強化
 */

document.addEventListener('DOMContentLoaded', function() {
    // AOS (Animate On Scroll) 初期化 - よりポップな動きに調整
    AOS.init({
        duration: 800,
        easing: 'ease-out-back',
        once: false,
        offset: 100,
        delay: 100
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

    // 画像ホバーエフェクト強化
    initImageHoverEffects();

    // ボタンクリックエフェクト
    initButtonEffects();

    // カードのランダム回転
    initRandomRotation();
});

/**
 * Particles.js 初期化 - 水玉模様のアニメーションに変更
 */
function initParticles() {
    if (document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            "particles": {
                "number": {
                    "value": 60,  // 水玉の数を調整
                    "density": {
                        "enable": true,
                        "value_area": 1000
                    }
                },
                "color": {
                    "value": ["#ffffff", "#FFD166", "#4CB944", "#ffffff"]  // 水玉の色
                },
                "shape": {
                    "type": "circle",  // 円形のみに設定
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    }
                },
                "opacity": {
                    "value": 0.8,  // 不透明度を上げる
                    "random": true,
                    "anim": {
                        "enable": true,
                        "speed": 0.5,
                        "opacity_min": 0.4,
                        "sync": false
                    }
                },
                "size": {
                    "value": 15,  // 水玉のサイズを大きく
                    "random": true,
                    "anim": {
                        "enable": true,
                        "speed": 2,
                        "size_min": 5,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": false  // 線を無効化
                },
                "move": {
                    "enable": true,
                    "speed": 1.5,  // ゆっくり動く
                    "direction": "none",
                    "random": true,
                    "straight": false,
                    "out_mode": "bounce",  // 画面端で跳ね返る
                    "bounce": true,
                    "attract": {
                        "enable": false
                    }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "bubble"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"  // クリックで水玉を追加
                    },
                    "resize": true
                },
                "modes": {
                    "bubble": {
                        "distance": 150,
                        "size": 20,  // ホバー時に大きくなる
                        "duration": 2,
                        "opacity": 1,
                        "speed": 3
                    },
                    "push": {
                        "particles_nb": 3  // クリックで追加される水玉の数
                    }
                }
            },
            "retina_detect": true
        });
    }
}

/**
 * タイプライターエフェクト - よりフレンドリーな文言に変更
 */
function initTypewriter() {
    const typewriterElement = document.getElementById('typewriter');
    if (!typewriterElement) return;

    const phrases = [
        '乗りたいトラックがある？おけまる配送なら自由に選択できます！',
        '短い労働時間で、プライベートも充実♪',
        '未経験でも安心！社長自らサポートします！',
        'アットホームな職場で楽しく働こう！',
        'トラック好きにはたまらない環境です！'
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
 * フォーム送信成功時の処理 - よりフレンドリーなメッセージに
 */
function showFormSuccess() {
    const form = document.getElementById('application-form');
    if (!form) return;

    // 成功メッセージ
    const successMessage = document.createElement('div');
    successMessage.className = 'form-success-message';
    successMessage.innerHTML = `
        <div style="text-align: center; padding: 20px;">
            <span style="font-size: 5rem; display: block;">🎉</span>
            <h3 style="margin-bottom: 15px; color: #FF6B35; font-size: 2.4rem;">応募ありがとうございます！</h3>
            <p>応募が完了しました。社長から直接ご連絡させていただきます！</p>
            <p style="margin-top: 10px; font-size: 1.4rem;">（通常3営業日以内にご連絡いたします）</p>
        </div>
    `;

    // フォームを非表示にして成功メッセージを表示
    form.style.display = 'none';
    form.parentNode.appendChild(successMessage);

    // スクロール
    successMessage.scrollIntoView({ behavior: 'smooth' });

    // 紙吹雪エフェクト
    createConfetti();
}

/**
 * 紙吹雪エフェクト
 */
function createConfetti() {
    const confettiCount = 200;
    const container = document.querySelector('.recruit-form');

    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';

        // ランダムな色
        const colors = ['#FF6B35', '#FFD166', '#4CB944', '#ffffff'];
        const color = colors[Math.floor(Math.random() * colors.length)];

        // ランダムな位置と大きさ
        const left = Math.random() * 100;
        const width = Math.random() * 10 + 5;
        const height = width * 0.4;

        // スタイル設定
        confetti.style.cssText = `
            position: absolute;
            left: ${left}%;
            top: -20px;
            width: ${width}px;
            height: ${height}px;
            background-color: ${color};
            opacity: ${Math.random() * 0.6 + 0.4};
            transform: rotate(${Math.random() * 360}deg);
            animation: fall ${Math.random() * 3 + 2}s linear forwards;
        `;

        container.appendChild(confetti);

        // アニメーション終了後に削除
        setTimeout(() => {
            confetti.remove();
        }, 5000);
    }

    // CSSアニメーション
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fall {
            to {
                transform: translateY(500px) rotate(${Math.random() * 360 + 180}deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

/**
 * フォームエラー時の処理 - よりフレンドリーなメッセージに
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
    errorMessage.innerHTML = `
        <div style="padding: 15px; background-color: rgba(255, 107, 53, 0.1); border-radius: 10px; margin-bottom: 20px;">
            <p style="display: flex; align-items: center;">
                <span style="font-size: 2rem; margin-right: 10px;">😅</span>
                あれれ？入力内容に不足があるようです。赤い「必須」の項目を確認してみてください！
            </p>
        </div>
    `;

    // エラーメッセージを表示
    form.querySelector('.form__submit').before(errorMessage);

    // 必須項目を強調
    const requiredFields = form.querySelectorAll('[required]');
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.style.borderColor = '#FF6B35';
            field.style.backgroundColor = 'rgba(255, 107, 53, 0.05)';

            // ラベルを強調
            const label = form.querySelector(`label[for="${field.id}"]`);
            if (label) {
                label.style.color = '#FF6B35';
            }
        }
    });

    // スクロール
    errorMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });

    // シェイクエフェクト
    errorMessage.style.animation = 'shake 0.5s ease-in-out';

    // CSSアニメーション
    const style = document.createElement('style');
    style.textContent = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            20%, 60% { transform: translateX(-10px); }
            40%, 80% { transform: translateX(10px); }
        }
    `;
    document.head.appendChild(style);
}

/**
 * 画像ホバーエフェクト強化
 */
function initImageHoverEffects() {
    // 会社画像のホバーエフェクト強化
    const companyImages = document.querySelectorAll('.company__image');
    companyImages.forEach(image => {
        image.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        });
    });

    // 社員の声カードのホバーエフェクト
    const voiceCards = document.querySelectorAll('.voice-card');
    voiceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // 引用符のアニメーション
            const quote = document.createElement('span');
            quote.textContent = '"';
            quote.style.cssText = `
                position: absolute;
                top: 20px;
                right: 20px;
                font-size: 8rem;
                color: rgba(255, 107, 53, 0.2);
                font-family: serif;
                transform: rotate(180deg);
                opacity: 0;
                transition: all 0.5s ease;
            `;
            this.appendChild(quote);

            setTimeout(() => {
                quote.style.opacity = '1';
                quote.style.top = '10px';
            }, 10);

            card.addEventListener('mouseleave', function() {
                quote.style.opacity = '0';
                setTimeout(() => {
                    quote.remove();
                }, 500);
            });
        });
    });
}

/**
 * ボタンクリックエフェクト
 */
function initButtonEffects() {
    const buttons = document.querySelectorAll('.btn');

    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // クリック位置を基準にしたリップルエフェクト
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();

            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            ripple.style.cssText = `
                position: absolute;
                top: ${y}px;
                left: ${x}px;
                width: 0;
                height: 0;
                background-color: rgba(255, 255, 255, 0.4);
                border-radius: 50%;
                transform: translate(-50%, -50%);
                pointer-events: none;
            `;

            this.style.position = this.style.position || 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);

            // アニメーション
            const animation = ripple.animate([
                { width: '0', height: '0', opacity: 1 },
                { width: '400px', height: '400px', opacity: 0 }
            ], {
                duration: 600,
                easing: 'ease-out'
            });

            animation.onfinish = () => ripple.remove();
        });
    });
}

/**
 * カードのランダム回転
 */
function initRandomRotation() {
    // 仕事カードにランダムな回転を適用
    const workCards = document.querySelectorAll('.work-card');
    workCards.forEach(card => {
        const rotation = (Math.random() * 2 - 1) * 1.5; // -1.5度から1.5度
        card.style.transform = `rotate(${rotation}deg)`;

        // ホバー時に回転をリセット
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02) rotate(0deg)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = `rotate(${rotation}deg)`;
        });
    });
}
