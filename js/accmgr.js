export function renderAccount() {
    return `
        <h2>アカウント設定</h2>
        <p>Username: ${username}</p>
        <p>メールアドレス: ${email}</p>
        <button id="btn-logout">ログアウト</button>
    `;
}
