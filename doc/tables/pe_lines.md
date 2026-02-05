# pe_lines（PEライン）

## 概要
- PEラインのマスタ。

| 物理名 | 論理名 | Notnull | 説明 |
| --- | --- | --- | --- |
| id | ID (PK) | 〇 | 一意識別子 |
| name | 商品名 | × | 商品の名称 |
| manufacturer | メーカー | × | 企業/ブランド名 |
| rating_gou | 号数 | 〇 | PEラインの号数 |
| diameter_mm | 直径(mm) | 〇 | 直径(ミリ) |
| strength_lb | 強度(lb) | × | 破断強度(lb) |
| price | 価格 | × | 参考価格 |
| created_at | 作成日時 | 〇 | レコード作成日時 |
| updated_at | 更新日時 | 〇 | レコード更新日時 |
