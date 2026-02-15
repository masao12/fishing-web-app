# 開発スナップショット（現時点）

## 目的
ローカルで編集し、フロント/バックエンドはコンテナで動かす方針に合わせて、現状の知識と手順をまとめる。

## 現状の構成
- Backend: Spring Boot 3 / Java 21 / Maven
- Frontend: Vite + React + TypeScript
- DB: PostgreSQL 16
- Infra: Docker Compose

## 実施済みの変更点
- Compose
  - web は Node 20 イメージを使用。
  - web の node_modules は名前付きボリュームで管理。
- DevContainer
  - Java 21 付きの devcontainer イメージに変更。
  - Node 20 をインストール。
- Backend
  - Spring Initializr で生成済み。
  - DB 接続は application.yml で設定。
- Frontend
  - 既存の Vite デモ画面は削除し、最小 UI を App.tsx / App.css / index.css に反映済み。

## 重要ファイル
- Compose: docker-compose.yml
- DevContainer: .devcontainer/Dockerfile
- Backend 設定: backend/src/main/resources/application.yml
- Frontend UI: web/src/App.tsx, web/src/App.css, web/src/index.css
- 手順まとめ: README.md

## 初回セットアップ（成功手順）
1. Docker Desktop を起動。
2. VS Code でリポジトリをローカルで開く。
3. ターミナルで以下を実行:
  - docker compose up -d db backend dev
  - docker compose run --rm --workdir /app web npm install
  - docker compose up -d web
4. 動作確認: http://localhost:5173/

## 日々の起動手順
- docker compose up -d

## Web が落ちる場合の復旧手順
`vite: not found` が出る場合は node_modules が壊れている可能性が高い。

1. docker compose down -v --remove-orphans
2. docker compose up -d db backend dev
3. docker compose run --rm --workdir /app web npm install
4. docker compose up -d web
5. docker compose logs --tail=100 web

## 現状の懸念点
- App.tsx は更新済みだが、ブラウザで Vite デモ画面が表示されることがある。
  - 原因は HMR 停止、別サーバー参照、キャッシュの可能性。
  - 対処は `docker compose logs --tail=50 web` で稼働確認後、リロードまたは web 再起動。

## 次にやること（候補）
- UI を日本語化する。
- フォーム入力を state に接続する。
- API 連携の仮実装を追加する。
