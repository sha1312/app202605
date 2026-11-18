# onePro

## 活動データ（PostgreSQL）

活動ページでは、活動名とタイム（秒）をPostgreSQLに登録し、一覧取得・削除ができます。トップページのRecent ACTIVITYには最新の活動名とタイムが表示されます。

### 起動方法

1. PostgreSQLに `usdata` データベースがあることを確認します。
2. `.env.example` を `.env` にコピーし、`DATABASE_URL` のユーザー名・パスワードをローカルPostgreSQLの接続情報に置き換えます。
3. 依存関係をインストールしてサーバーを起動します。

```sh
npm install
npm start
```

ブラウザーで `http://localhost:3000/activities.html` を開きます。サーバー起動時に `usdata` 内の `activities` テーブルが存在しない場合は自動作成されます。既存のテーブルには `time_seconds` 列を追加します。DBユーザーにはテーブル作成・変更権限が必要です。

`DATABASE_URL` はサーバーだけが読み込みます。接続文字列をブラウザーのコードに記載したり、`.env` を共有・コミットしたりしないでください。

### API

- `GET /api/activities` — 活動一覧を取得
- `GET /api/activities/latest` — 最新の活動を取得
- `POST /api/activities` — `{ "name": "活動名", "timeSeconds": 16.1 }` を登録
- `DELETE /api/activities/:id` — IDで活動を削除
