# Copilot 指示書

## プロジェクト概要
- 釣り初心者向けのセッティング支援Webアプリ。
- MVP機能:
  - PEラインから適切なリーダーを推薦
  - リーダーから適切なPEラインを推薦
  - 対象魚種とフィールドから推奨セッティングを表示
- 収益化はアフィリエイト優先（広告は後回し）。

## 技術スタック
- Backend: Java 21, Spring Boot 3, JPA
- DB: PostgreSQL
- Frontend: React, Vite, TypeScript
- Infra: Docker, Docker Compose
- テスト: JUnit 5（ATDDはCucumber + RestAssuredを予定）

## 開発環境（Docker）
- DevContainerは開発用コンテナ（service: dev）に接続する。
- コンテナ構成は dev / backend / web / db の4サービス。
- devはJava 21 + Node 18入りで、IDE作業用。
- backendは実行用の単一責任コンテナとし、DBのヘルスチェック完了後に起動する。
- webはViteを0.0.0.0で起動し、ホストブラウザから動作確認する。
- dbはPostgreSQL 16、tmpfsで毎回クリーン。必要ならマイグレーションで状態を定義する。
- 既定ポート: FE=5173, BE=8080, DB=5432。

## アーキテクチャ/設計
- Clean Architecture寄りのレイヤ分離を優先。
- ドメインロジックはUseCase/Serviceに置き、Controllerに寄せない。
- 永続化はJPA Entity、API境界はDTOを使う。

## コーディング規約
- ひねった書き方より、明確な命名を優先。
- ロジックが自明でない時のみ、短いコメントを追加。
- 既存が非ASCIIでない限り、ファイルはASCIIを維持。
- 不要なリファクタは避け、変更は最小限にする。
- 可読性とパフォーマンスを最重視する。
- JUnitではカバレッジだけを満たすテストは作成せず、ふるまいを検証する。

## 進め方
- 大きな構造変更は事前に相談。
- 振る舞い変更時はテスト更新/追加を行う。
- TODOは短く具体的に。

## フロントUI
- まずは最小構成のUIを作り、後で改善する。
- シンプルな関数コンポーネントを優先。
- 状態管理は軽量に保つ。

## 注意
- 環境によってはgitが使えないため、必要ならGitHub Desktopを使う。

## その他
- このファイルが読み込めた場合は、「読み込めたンゴ」と言ってください
- 生成、回答は必ず事実ベースで行い、不明点は必ず確認すること。