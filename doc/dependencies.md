# コンポーネント間の依存関係管理

このドキュメントは、モノレポ内の各コンポーネント間の依存関係と互換性を管理します。

## 現在のバージョン

| コンポーネント | バージョン | 最終更新日 | 備考 |
|-------------|----------|----------|------|
| Backend     | 0.0.1-SNAPSHOT | 2026-02-12 | 初期開発中 |
| Frontend    | 0.0.0    | 2026-02-12 | 初期開発中 |

## API バージョン互換性

### Backend v0.0.1-SNAPSHOT ⇔ Frontend v0.0.0

| API エンドポイント | メソッド | Status | 備考 |
|------------------|---------|--------|------|
| /api/pe-lines    | GET     | 🚧 計画中 | PEライン一覧取得 |
| /api/leaders     | GET     | 🚧 計画中 | リーダー一覧取得 |
| /api/recommendations | POST | 🚧 計画中 | 推奨セッティング検索 |

凡例:
- ✅ 実装済み・互換性確認済み
- 🚧 計画中・未実装
- ❌ 非互換・要対応

---

## 技術スタック依存関係

### Backend Dependencies

```xml
<!-- pom.xml より抜粋 -->
<parent>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-parent</artifactId>
  <version>4.0.2</version>
</parent>

主要依存:
- Java 21
- Spring Boot 4.0.2
- Spring Data JPA
- PostgreSQL Driver
- Lombok
```

### Frontend Dependencies

```json
{
  "dependencies": {
    "react": "^19.2.0",
    "react-dom": "^19.2.0"
  },
  "devDependencies": {
    "typescript": "~5.9.3",
    "vite": "^7.3.1"
  }
}

主要依存:
- Node.js 20
- React 19
- TypeScript 5.9
- Vite 7
```

### Infrastructure Dependencies

```yaml
# docker-compose.yml より抜粋
services:
  backend: eclipse-temurin:21-jre
  web: node:20-bullseye
  db: postgres:16
```

---

## Breaking Changes ポリシー

### バージョニングルール（セマンティックバージョニング）

```
MAJOR.MINOR.PATCH

MAJOR: API非互換な変更
MINOR: 後方互換性を保った機能追加
PATCH: 後方互換性を保ったバグ修正
```

### Breaking Changes の定義

以下の変更は Major バージョンアップが必要：

#### Backend
- [ ] APIエンドポイントのURL変更
- [ ] リクエスト/レスポンスの必須フィールド削除
- [ ] データ型の変更
- [ ] HTTPステータスコードの変更
- [ ] 認証・認可の仕様変更

#### Frontend
- [ ] 公開APIの引数・戻り値の変更
- [ ] 環境変数の必須化
- [ ] ビルド成果物の構造変更

### 後方互換性を保つための推奨事項

1. **APIフィールドの追加**
   - 新しいフィールドはオプショナルとする
   - デフォルト値を設定する

2. **APIエンドポイントの追加**
   - 新しいエンドポイントを追加し、古いエンドポイントは非推奨とする
   - 最低2バージョンは古いエンドポイントを維持

3. **データベーススキーマ変更**
   - カラム追加時は NULL許可またはデフォルト値を設定
   - カラム削除は段階的に（まず非推奨化、次のバージョンで削除）

---

## コンポーネント間の契約

### API契約

API契約は `doc/api/openapi.yaml` で定義します（今後作成予定）。

#### 現在の契約（口頭ベース・今後正式化）

**PEライン検索**
```
GET /api/pe-lines?ratingGou={号数}
Response: [{ id, name, manufacturer, ratingGou, diameterMm, strengthLb, price }]
```

**リーダー検索**
```
GET /api/leaders?ratingGou={号数}
Response: [{ id, name, manufacturer, material, ratingGou, diameterMm, strengthLb, price }]
```

**推奨セッティング検索**
```
POST /api/recommendations
Request: { peLineId?, leaderId?, speciesId?, fieldId? }
Response: [{ species, field, peLine, leader, fitStatus, notes }]
```

### データベース契約

DB契約は `doc/db-design.md` で定義されています。

---

## 依存関係の更新手順

### Backend依存パッケージの更新

```bash
cd backend

# 依存関係の確認
./mvnw dependency:tree

# パッケージの更新
./mvnw versions:display-dependency-updates

# Spring Bootバージョンアップ
# pom.xml の <parent><version> を変更してテスト
./mvnw clean test
```

### Frontend依存パッケージの更新

```bash
cd web

# 依存関係の確認
npm list

# パッケージの更新確認
npm outdated

# パッケージ更新
npm update

# メジャーバージョンアップは個別に
npm install react@latest
```

### 更新時のチェックリスト

- [ ] ローカルでビルドが通ることを確認
- [ ] ローカルでテストが通ることを確認
- [ ] Docker環境でも動作確認
- [ ] CHANGELOG.md に更新内容を記載
- [ ] このドキュメント（dependencies.md）を更新

---

## リリースフロー

### 開発フロー

```
feature branch → develop → main
     ↓             ↓         ↓
   (PR)        (PR+test)  (release)
```

### リリースタグ付けルール

#### コンポーネント別リリース

```bash
# Backend のみ変更
git tag v1.0.0-backend -m "Backend release: Add PE line search API"
git push origin v1.0.0-backend

# Frontend のみ変更
git tag v1.0.0-web -m "Frontend release: Add PE line search UI"
git push origin v1.0.0-web
```

#### 統合リリース

```bash
# Backend と Frontend を同時リリース
git tag v1.0.0 -m "Release v1.0.0: Initial MVP"
git push origin v1.0.0
```

---

## トラブルシューティング

### Backend と Frontend のバージョン不一致

**症状**: Frontend から API 呼び出しが失敗する

**確認方法**:
```bash
# Backend バージョン確認
cd backend
./mvnw help:evaluate -Dexpression=project.version -q -DforceStdout

# Frontend バージョン確認
cd web
node -e "console.log(require('./package.json').version)"
```

**対処**:
1. このドキュメントの「APIバージョン互換性」テーブルを確認
2. 互換性がない場合は、該当コンポーネントを更新
3. 両方を最新バージョンにする

### Docker イメージのバージョン不一致

**症状**: docker-compose up でエラーが発生

**対処**:
```bash
# イメージを強制再取得
docker compose down -v
docker compose pull
docker compose up -d
```

---

## 将来的な拡張

### マルチレポ移行時の対応

マルチレポに分割した場合、このドキュメントは以下のように分散管理：

1. **Backend リポジトリ**: `docs/api-contract.md` でAPI契約を公開
2. **Frontend リポジトリ**: `docs/dependencies.md` でBackend APIのバージョン依存を管理
3. **共通リポジトリ**: API仕様（OpenAPI）を npm package として公開

### API契約パッケージ化（案）

```bash
# 新しいリポジトリ: fishing-web-api-contracts
npm install @fishing/api-contracts

# Backend で利用
# Spring Boot で OpenAPI spec から自動生成

# Frontend で利用
import type { PeLine, Leader } from '@fishing/api-contracts';
```

---

## まとめ

- バージョンは各コンポーネントで独立管理
- API変更時は必ず互換性テーブルを更新
- Breaking Changes は慎重に、Major バージョンアップで対応
- リリースタグは `-backend` / `-web` サフィックスで区別
