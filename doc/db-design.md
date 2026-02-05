# DB Design (Draft)

## 方針
- 推奨セッティングは「魚種×フィールド×PE×リーダー」で保持する。
- 検索入口は「PEまたはリーダー優先」。不明時は「魚種＆フィールド」。
- 初期データはCSV/Seed前提。
- PE/リーダーの必須項目は「号数」と「直径」。

## テーブル一覧

### pe_lines（PEライン）
| 物理名 | 論理名 | Notnull |
| --- | --- | --- |
| id | ID (PK) | 〇 |
| name | 商品名 | × |
| manufacturer | メーカー | × |
| rating_gou | 号数 | 〇 |
| diameter_mm | 直径(mm) | 〇 |
| strength_lb | 強度(lb) | × |
| price | 価格 | × |
| created_at | 作成日時 | 〇 |
| updated_at | 更新日時 | 〇 |

### leaders（リーダー）
| 物理名 | 論理名 | Notnull |
| --- | --- | --- |
| id | ID (PK) | 〇 |
| name | 商品名 | × |
| manufacturer | メーカー | × |
| material | 材質 | × |
| rating_gou | 号数 | 〇 |
| diameter_mm | 直径(mm) | 〇 |
| strength_lb | 強度(lb) | × |
| price | 価格 | × |
| created_at | 作成日時 | 〇 |
| updated_at | 更新日時 | 〇 |

### species（魚種）
| 物理名 | 論理名 | Notnull |
| --- | --- | --- |
| id | ID (PK) | 〇 |
| name | 魚種名 | 〇 |
| alias | 別名 | × |
| created_at | 作成日時 | 〇 |
| updated_at | 更新日時 | 〇 |

### fields（フィールド）
| 物理名 | 論理名 | Notnull |
| --- | --- | --- |
| id | ID (PK) | 〇 |
| name | フィールド名 | 〇 |
| region | 地域 | × |
| created_at | 作成日時 | 〇 |
| updated_at | 更新日時 | 〇 |

### recommended_settings（推奨セッティング）
| 物理名 | 論理名 | Notnull |
| --- | --- | --- |
| id | ID (PK) | 〇 |
| species_id | 魚種ID (FK) | 〇 |
| field_id | フィールドID (FK) | 〇 |
| pe_line_id | PEラインID (FK) | 〇 |
| leader_id | リーダーID (FK) | 〇 |
| fit_status | 適合ステータス | 〇 |
| notes | メモ | × |
| created_at | 作成日時 | 〇 |
| updated_at | 更新日時 | 〇 |

#### 制約
- (species_id, field_id, pe_line_id, leader_id) をユニーク

#### 適合ステータス例
- perfect（完全に適合）
- knot_dependent（ノット次第で適合）
- acceptable（概ね適合）

## リレーション
- species 1..* recommended_settings
- fields 1..* recommended_settings
- pe_lines 1..* recommended_settings
- leaders 1..* recommended_settings

## 検索方針（アプリ側）
- PEまたはリーダーが指定されれば、recommended_settingsをキーで絞る。
- PE/リーダーが不明な場合は、魚種＆フィールドで絞る。

## Seed/CSV方針（案）
- pe_lines.csv, leaders.csv, species.csv, fields.csv, recommended_settings.csv
- recommended_settingsはID参照で紐付ける。
