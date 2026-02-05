# recommended_settings（推奨セッティング）

## 概要
- 魚種/フィールド/PE/リーダーの推奨組み合わせを保持。

| 物理名 | 論理名 | Notnull | 説明 |
| --- | --- | --- | --- |
| id | ID (PK) | 〇 | 一意識別子 |
| species_id | 魚種ID (FK) | 〇 | speciesへの参照 |
| field_id | フィールドID (FK) | 〇 | fieldsへの参照 |
| pe_line_id | PEラインID (FK) | 〇 | pe_linesへの参照 |
| leader_id | リーダーID (FK) | 〇 | leadersへの参照 |
| fit_status | 適合ステータス | 〇 | 適合度の分類 |
| notes | メモ | × | 備考 |
| created_at | 作成日時 | 〇 | レコード作成日時 |
| updated_at | 更新日時 | 〇 | レコード更新日時 |

## 制約
- (species_id, field_id, pe_line_id, leader_id) をユニーク

## 適合ステータス例
- perfect（完全に適合）
- knot_dependent（ノット次第で適合）
- acceptable（概ね適合）
