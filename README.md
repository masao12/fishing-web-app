# fishing-web-app
釣りの便利アプリの集合体

## プロジェクト概要
釣り初心者向けのセッティング支援Webアプリ（MVP開発中）

**主要機能**:
- PEラインから適切なリーダーを推薦
- リーダーから適切なPEラインを推薦
- 対象魚種とフィールドから推奨セッティングを表示

**技術スタック**:
- Backend: Java 21, Spring Boot 4, JPA, PostgreSQL
- Frontend: React 19, TypeScript, Vite
- Infrastructure: Docker Compose

## ドキュメント
- [アーキテクチャレビュー](doc/architecture-review.md) - モノレポ vs マルチレポの分析
- [モノレポ運用ベストプラクティス](doc/monorepo-best-practices.md) - CI/CD、バージョニング戦略
- [依存関係管理](doc/dependencies.md) - コンポーネント間の互換性管理
- [DB設計](doc/db-design.md) - データベーススキーマ

## 開発環境セットアップ（初回のみ）
1. Docker Desktop をインストールして起動する（WSL2有効化）。
2. VS Code でこのリポジトリを開く。
3. コマンドパレットで `Dev Containers: Rebuild and Reopen in Container` を実行。
4. DevContainer 内のターミナルで以下を実行。
	- `docker compose up -d`
	- `docker compose pull web`
	- `docker compose run --rm --workdir /app web npm install`
	- `docker compose up -d web`

## 日々の起動手順
1. VS Code で `Dev Containers: Reopen in Container` を実行。
2. DevContainer 内のターミナルで以下を実行。
	- `docker compose up -d`

## 停止
- `docker compose down`

## 動作確認
- Frontend: http://localhost:5173
- Backend: http://localhost:8080

## Web コンテナが落ちる場合の復旧手順
`vite: not found` が出る場合は、`node_modules` が壊れている可能性が高いです。

1. `docker compose down -v --remove-orphans`
2. `docker compose up -d db backend dev`
3. `docker compose run --rm --workdir /app web npm install`
4. `docker compose up -d web`
5. `docker compose logs --tail=100 web`
