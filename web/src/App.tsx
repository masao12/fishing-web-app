import { useState } from 'react'
import './App.css'

function App() {
  const [startMode, setStartMode] = useState<'pe' | 'leader' | 'species'>('pe')
  const [species, setSpecies] = useState('')
  const [field, setField] = useState('')
  const [peUnit, setPeUnit] = useState('go')
  const [leaderUnit, setLeaderUnit] = useState('lb')
  const peUnitLabel = peUnit === 'go' ? '号（PE#）' : 'mm'
  const leaderUnitLabel = leaderUnit === 'lb' ? 'lb' : 'kg'

  const handleStartMode = (mode: 'pe' | 'leader' | 'species') => {
    setStartMode(mode)
    if (mode !== 'species') {
      setSpecies('')
      setField('')
    }
  }

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
          <div className="toggle" role="radiogroup" aria-label="入力の起点">
            <label className={startMode === 'pe' ? 'toggle-item active' : 'toggle-item'}>
              <input
                type="radio"
                name="startMode"
                value="pe"
                checked={startMode === 'pe'}
                onChange={() => handleStartMode('pe')}
              />
              PEラインから
            </label>
            <label className={startMode === 'leader' ? 'toggle-item active' : 'toggle-item'}>
              <input
                type="radio"
                name="startMode"
                value="leader"
                checked={startMode === 'leader'}
                onChange={() => handleStartMode('leader')}
              />
              リーダーから
            </label>
            <label className={startMode === 'species' ? 'toggle-item active' : 'toggle-item'}>
              <input
                type="radio"
                name="startMode"
                value="species"
                checked={startMode === 'species'}
                onChange={() => handleStartMode('species')}
              />
              対象魚から
            </label>
          </div>
          <div className="grid">
            <label className="field" htmlFor="peLine">
              <span className="field-label">
                PEライン（{peUnitLabel}）
                <span
                  className="info"
                  tabIndex={0}
                  role="img"
                  aria-label="mm入力の推奨"
                >
                  ?
                  <span className="tooltip" role="tooltip">
                    <span className="tooltip-title">なぜ「太さ(mm)」がおすすめなの？</span>
                    <span className="tooltip-body">
                      実は釣り糸は、同じ「1号」でも
                      <span className="tooltip-emphasis">メーカーによって太さが微妙に違います。</span>
                      <strong>パッケージの「mm（直径）」</strong>を入力いただくと、結束トラブルが最も少ない、
                      あなただけの黄金比を計算できます！
                      <br />
                      （※わからない場合は「号数」でも診断可能です💡）
                    </span>
                  </span>
                </span>
              </span>
              <input
                id="peLine"
                placeholder="0.8"
                type="text"
                disabled={startMode !== 'pe'}
              />
              <select
                className="unit-select"
                aria-label="PEラインの単位"
                value={peUnit}
                onChange={(event) => setPeUnit(event.target.value)}
                disabled={startMode !== 'pe'}
              >
                <option value="go">号（PE#）</option>
                <option value="mm">mm</option>
              </select>
            </label>
            <label className="field" htmlFor="leader">
              <span>リーダー（{leaderUnitLabel}）</span>
              <input
                id="leader"
                placeholder="16"
                type="text"
                disabled={startMode !== 'leader'}
              />
              <select
                className="unit-select"
                aria-label="リーダーの単位"
                value={leaderUnit}
                onChange={(event) => setLeaderUnit(event.target.value)}
                disabled={startMode !== 'leader'}
              >
                <option value="lb">lb</option>
                <option value="kg">kg</option>
              </select>
            </label>
            <label className="field" htmlFor="species">
              <span>
                対象魚
                {startMode === 'species' && <span className="required">必須</span>}
              </span>
              <select
                id="species"
                value={species}
                required={startMode === 'species'}
                disabled={startMode !== 'species'}
                onChange={(event) => setSpecies(event.target.value)}
              >
                <option value="" disabled>
                  選択してください
                </option>
                <option value="ajing">アジ</option>
                <option value="mebaru">メバル</option>
                <option value="seabass">シーバス</option>
              </select>
            </label>
            <label className="field" htmlFor="field">
              <span>
                フィールド
                {startMode === 'species' && <span className="required">必須</span>}
              </span>
              <select
                id="field"
                value={field}
                required={startMode === 'species'}
                disabled={startMode !== 'species'}
                onChange={(event) => setField(event.target.value)}
              >
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
