# テーブル一覧

## 方針
- 推奨セッティングは「魚種×フィールド×PE×リーダー」で保持する。
- 検索入口は「PEまたはリーダー優先」。不明時は「魚種＆フィールド」。
- 初期データはCSV/Seed前提。
- PE/リーダーの必須項目は「号数」と「直径」。

## テーブル
- [pe_lines](tables/pe_lines.md)
- [leaders](tables/leaders.md)
- [species](tables/species.md)
- [fields](tables/fields.md)
- [recommended_settings](tables/recommended_settings.md)

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
