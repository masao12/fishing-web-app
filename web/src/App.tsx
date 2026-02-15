import './App.css'

function App() {
  return (
    <div className="app">
      <header className="hero">
        <div className="brand">Fishing Setup Lab</div>
        <h1>初心者向けのセッティングを、素早く。</h1>
        <p className="subtitle">
          PEライン・リーダーから始めるか、魚種とフィールドを選んでおすすめを
          <span className="no-break">すぐ</span>確認できます。
        </p>
        <div className="hero-actions">
          <button className="primary" type="button">
            おすすめを見る
          </button>
          <button className="ghost" type="button">
            プリセットを見る
          </button>
        </div>
      </header>

      <main className="layout">
        <section className="panel">
          <h2>かんたん入力</h2>
          <div className="grid">
            <label className="field" htmlFor="peLine">
              <span>PEライン（号）</span>
              <input id="peLine" placeholder="0.8" type="text" />
            </label>
            <label className="field" htmlFor="leader">
              <span>リーダー（lb）</span>
              <input id="leader" placeholder="16" type="text" />
            </label>
            <label className="field" htmlFor="species">
              <span>対象魚</span>
              <select id="species" defaultValue="">
                <option value="" disabled>
                  選択してください
                </option>
                <option value="ajing">アジ</option>
                <option value="mebaru">メバル</option>
                <option value="seabass">シーバス</option>
              </select>
            </label>
            <label className="field" htmlFor="field">
              <span>フィールド</span>
              <select id="field" defaultValue="">
                <option value="" disabled>
                  選択してください
                </option>
                <option value="harbor">港湾</option>
                <option value="surf">サーフ</option>
                <option value="rock">磯・ゴロタ</option>
              </select>
            </label>
          </div>
          <div className="actions">
            <button className="primary" type="button">
              おすすめ
            </button>
            <button className="ghost" type="button">
              リセット
            </button>
          </div>
          <p className="hint">MVP データ投入後に詳細ルールを追加します。</p>
        </section>

        <section className="panel highlight">
          <div className="panel-head">
            <h2>プレビュー</h2>
            <span className="tag">MVP</span>
          </div>
          <div className="result">
            <div>
              <div className="label">おすすめリーダー</div>
              <div className="value">16-20 lb フロロ</div>
            </div>
            <div>
              <div className="label">おすすめPE</div>
              <div className="value">0.8-1.0 号</div>
            </div>
            <div>
              <div className="label">メモ</div>
              <div className="value small">
                潮と地形に合わせて調整。まずはシンプルに。
              </div>
            </div>
          </div>
          <div className="links">
            <button className="ghost" type="button">
              共有
            </button>
            <button className="primary" type="button">
              保存
            </button>
          </div>
        </section>
      </main>

      <footer className="footer">釣り場で素早く決めるためのセット。</footer>
    </div>
  )
}

export default App
