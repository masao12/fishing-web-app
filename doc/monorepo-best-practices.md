# モノレポ運用のベストプラクティス

このドキュメントは、現在のモノレポ構成を効率的に維持し、将来的なマルチレポへの移行を容易にするためのガイドラインです。

## 1. ディレクトリ構造の厳守

### 原則
各コンポーネントは独立したディレクトリに配置し、相互参照を禁止します。

```
fishing-web-app/
├── backend/              # バックエンド専用（Java/Spring Boot）
│   ├── src/
│   ├── pom.xml
│   └── README.md
├── web/                  # フロントエンド専用（React/TypeScript）
│   ├── src/
│   ├── package.json
│   └── README.md
├── doc/                  # 共通ドキュメント
│   ├── api/             # API仕様（OpenAPI/Swagger）
│   ├── db-design.md
│   └── architecture-review.md
├── .devcontainer/        # 開発環境設定
└── docker-compose.yml    # 統合環境構成
```

### 禁止事項
- ❌ `web/src/` から `backend/src/` の直接参照
- ❌ `backend/src/` から `web/src/` の直接参照
- ❌ 共通ライブラリを各ディレクトリに重複配置

### 推奨事項
- ✅ API仕様は `doc/api/` に OpenAPI形式で記述
- ✅ 共有される型定義がある場合は `doc/api/types.yaml` で定義
- ✅ 各コンポーネントに個別のREADME.mdを配置

---

## 2. CI/CDでの差分ビルド実装

### GitHub Actions 設定例

`.github/workflows/ci.yml` を作成し、変更があったコンポーネントのみビルド：

```yaml
name: CI

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main, develop ]

jobs:
  detect-changes:
    runs-on: ubuntu-latest
    outputs:
      backend: ${{ steps.changes.outputs.backend }}
      web: ${{ steps.changes.outputs.web }}
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 2
      
      - name: Detect changes
        id: changes
        run: |
          if git diff --name-only HEAD~1 HEAD | grep -q "^backend/"; then
            echo "backend=true" >> $GITHUB_OUTPUT
          else
            echo "backend=false" >> $GITHUB_OUTPUT
          fi
          
          if git diff --name-only HEAD~1 HEAD | grep -q "^web/"; then
            echo "web=true" >> $GITHUB_OUTPUT
          else
            echo "web=false" >> $GITHUB_OUTPUT
          fi

  backend-build:
    needs: detect-changes
    if: needs.detect-changes.outputs.backend == 'true'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Set up JDK 21
        uses: actions/setup-java@v4
        with:
          java-version: '21'
          distribution: 'temurin'
      
      - name: Build with Maven
        run: |
          cd backend
          ./mvnw clean package
      
      - name: Run tests
        run: |
          cd backend
          ./mvnw test

  web-build:
    needs: detect-changes
    if: needs.detect-changes.outputs.web == 'true'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
      
      - name: Install dependencies
        run: |
          cd web
          npm ci
      
      - name: Lint
        run: |
          cd web
          npm run lint
      
      - name: Build
        run: |
          cd web
          npm run build
```

### 全体ビルドの設定（main merge時）

```yaml
name: Release

on:
  push:
    branches: [ main ]

jobs:
  build-all:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      # Backend build
      - name: Set up JDK 21
        uses: actions/setup-java@v4
        with:
          java-version: '21'
          distribution: 'temurin'
      
      - name: Build Backend
        run: |
          cd backend
          ./mvnw clean package
      
      # Frontend build
      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
      
      - name: Build Frontend
        run: |
          cd web
          npm ci
          npm run build
```

---

## 3. バージョニング戦略

### 各コンポーネントに独立したバージョン

#### backend/pom.xml
```xml
<groupId>com.fishing</groupId>
<artifactId>backend</artifactId>
<version>1.0.0</version>
```

#### web/package.json
```json
{
  "name": "fishing-web-frontend",
  "version": "1.0.0"
}
```

### Gitタグ付けルール

コンポーネント別にタグを付与：

```bash
# バックエンドのリリース
git tag v1.0.0-backend
git push origin v1.0.0-backend

# フロントエンドのリリース
git tag v1.0.0-web
git push origin v1.0.0-web

# 全体リリース（両方を同時にリリース時）
git tag v1.0.0
git push origin v1.0.0
```

### CHANGELOG管理

各コンポーネントに個別のCHANGELOGを配置：

- `backend/CHANGELOG.md`
- `web/CHANGELOG.md`

---

## 4. API契約の明示

### OpenAPI仕様の配置

`doc/api/openapi.yaml` を作成し、API仕様を明文化：

```yaml
openapi: 3.0.0
info:
  title: Fishing Web App API
  version: 1.0.0
  description: 釣りセッティング支援API

servers:
  - url: http://localhost:8080
    description: 開発環境

paths:
  /api/pe-lines:
    get:
      summary: PEライン一覧取得
      responses:
        '200':
          description: 成功
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/PeLine'

components:
  schemas:
    PeLine:
      type: object
      required:
        - id
        - ratingGou
        - diameterMm
      properties:
        id:
          type: integer
          format: int64
        name:
          type: string
        manufacturer:
          type: string
        ratingGou:
          type: number
          format: double
        diameterMm:
          type: number
          format: double
        strengthLb:
          type: number
          format: double
        price:
          type: integer
```

### API仕様の利用

#### バックエンド
- OpenAPIドキュメントをSwagger UIで公開
- SpringDocを利用してコードからAPI仕様を自動生成

#### フロントエンド
- OpenAPIドキュメントから型定義を自動生成
- `openapi-typescript` を利用

```bash
# web/package.json
"scripts": {
  "generate-api-types": "openapi-typescript ../doc/api/openapi.yaml -o src/types/api.ts"
}
```

---

## 5. 依存関係の管理

### doc/dependencies.md を作成

```markdown
# コンポーネント間の依存関係

## API バージョン互換性

| Backend Version | Frontend Version | 互換性 | 備考 |
|----------------|------------------|--------|------|
| 1.0.0          | 1.0.0            | ✅     | 初回リリース |
| 1.1.0          | 1.0.0            | ✅     | 後方互換 |
| 2.0.0          | 1.0.0            | ❌     | Breaking Change |
| 2.0.0          | 2.0.0            | ✅     | 同時リリース |

## Breaking Changes ポリシー

- API v2リリース時はフロントエンドも同時更新が必要
- 非互換変更は major version を上げる
- 後方互換性のある変更は minor version を上げる
```

---

## 6. テスト戦略

### ユニットテスト
各コンポーネントで独立して実行：

```bash
# Backend
cd backend && ./mvnw test

# Frontend
cd web && npm test
```

### 統合テスト（E2E）
docker-compose環境で実行：

```yaml
# .github/workflows/e2e.yml
name: E2E Tests

on: [pull_request]

jobs:
  e2e:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Start services
        run: docker compose up -d
      
      - name: Wait for services
        run: |
          timeout 60 bash -c 'until curl -s http://localhost:8080/actuator/health; do sleep 2; done'
          timeout 60 bash -c 'until curl -s http://localhost:5173; do sleep 2; done'
      
      - name: Run E2E tests
        run: |
          # Cucumber/RestAssured tests
          cd backend
          ./mvnw verify -P integration-tests
      
      - name: Cleanup
        run: docker compose down
```

---

## 7. ドキュメント管理

### ディレクトリ構成

```
doc/
├── architecture-review.md        # アーキテクチャレビュー
├── monorepo-best-practices.md   # このドキュメント
├── db-design.md                  # DB設計
├── api/
│   ├── openapi.yaml             # API仕様
│   └── api-contract.md          # API契約書
└── deployment/
    ├── backend-deployment.md    # バックエンドデプロイ手順
    └── frontend-deployment.md   # フロントエンドデプロイ手順
```

### ドキュメント更新ルール

1. API変更時は必ず `doc/api/openapi.yaml` を更新
2. DB変更時は必ず `doc/db-design.md` を更新
3. アーキテクチャ変更時は必ず `doc/architecture-review.md` を更新
4. PRには関連ドキュメントの更新を含める

---

## 8. マルチレポへの移行準備

将来的にマルチレポへ移行する場合の準備：

### 移行スクリプト（例）

```bash
#!/bin/bash
# 将来のマルチレポ移行用スクリプト（参考）

# Backend repository
git clone fishing-web-app fishing-web-backend
cd fishing-web-backend
git filter-branch --subdirectory-filter backend -- --all
git remote set-url origin https://github.com/masao12/fishing-web-backend.git

# Frontend repository
git clone fishing-web-app fishing-web-frontend
cd fishing-web-frontend
git filter-branch --subdirectory-filter web -- --all
git remote set-url origin https://github.com/masao12/fishing-web-frontend.git
```

### 移行時のチェックリスト

- [ ] 各リポジトリのCI/CD設定を作成
- [ ] API契約の管理方法を決定（npm package化など）
- [ ] 共通ドキュメントの配置場所を決定
- [ ] バージョン互換性管理の仕組みを構築
- [ ] 統合テストの実行方法を再設計

---

## まとめ

このベストプラクティスに従うことで：

1. ✅ モノレポの利点を最大化
2. ✅ コンポーネント間の独立性を維持
3. ✅ CI/CDパフォーマンスを最適化
4. ✅ 将来のマルチレポ移行を容易に

モノレポは適切に管理すれば、小〜中規模プロジェクトで非常に効率的です。
上記のプラクティスを守りつつ、プロジェクトの成長に応じて柔軟に対応していきましょう。
