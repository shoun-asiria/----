document.addEventListener('DOMContentLoaded', () => {
    
    /* =========================================
       1. スムーススクロール機能
       （固定ヘッダーの高さを考慮してスクロール位置を調整）
    ========================================= */
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    const header = document.getElementById('header');

    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // デフォルトのリンク挙動を無効化
            const targetId = this.getAttribute('href');
            
            // href="#" のみの場合はページトップへ
            if (targetId === '#') {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                return;
            }

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // ヘッダーの高さを取得して、その分だけスクロール位置をずらす
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    /* =========================================
       2. フォームバリデーション（簡易・ダミー送信）
    ========================================= */
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // 実際のフォーム送信をブロック
            
            // 入力要素の取得
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const message = document.getElementById('message');
            
            // エラーメッセージ表示用の要素取得
            const nameError = document.getElementById('nameError');
            const emailError = document.getElementById('emailError');
            const messageError = document.getElementById('messageError');
            
            let isValid = true;

            // エラー表示を初期化
            const clearError = (element) => {
                element.style.display = 'none';
                element.textContent = '';
            };
            clearError(nameError);
            clearError(emailError);
            clearError(messageError);

            // ① お名前のチェック（必須）
            if (name.value.trim() === '') {
                nameError.textContent = 'お名前を入力してください。';
                nameError.style.display = 'block';
                isValid = false;
            }

            // ② メールアドレスのチェック（必須 ＆ 形式）
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (email.value.trim() === '') {
                emailError.textContent = 'メールアドレスを入力してください。';
                emailError.style.display = 'block';
                isValid = false;
            } else if (!emailPattern.test(email.value.trim())) {
                emailError.textContent = '正しい形式のメールアドレスを入力してください。';
                emailError.style.display = 'block';
                isValid = false;
            }

            // ③ ご相談内容のチェック（必須）
            if (message.value.trim() === '') {
                messageError.textContent = 'ご相談内容を入力してください。';
                messageError.style.display = 'block';
                isValid = false;
            }

            // バリデーションクリア時の処理（ダミー送信）
            if (isValid) {
                // 高齢の方にも分かりやすいように完了のアラートを表示
                alert('【テスト送信完了】\nお問い合わせありがとうございます。\nご入力いただいた内容は正常に送信されました。\n（※これはダミー送信のため、実際には送信されていません）');
                
                // フォームの内容をリセット
                contactForm.reset();
            }
        });
    }
});
