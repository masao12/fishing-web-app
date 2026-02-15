import { useState } from 'react'
import amazonLogo from './assets/amazon-logo.webp'
import rakutenLogo from './assets/rakuten-logo.svg'
import './App.css'

function App() {
  const [startMode, setStartMode] = useState<'pe' | 'leader' | 'species'>('pe')
  const [species, setSpecies] = useState('')
  const [field, setField] = useState('')
  const [peUnit, setPeUnit] = useState('go')
  const [leaderUnit, setLeaderUnit] = useState('lb')
  const peUnitLabel = peUnit === 'go' ? '号（PE#）' : 'mm'
  const leaderUnitLabel = leaderUnit === 'lb' ? 'lb' : 'kg'
  const multiResults = [
    {
      field: '港湾',
      items: [{ pe: '0.6 号', leader: '14 lb', note: '汎用バランス' }],
    },
    {
      field: 'サーフ',
      items: [{ pe: '1.0 号', leader: '22 lb', note: '飛距離重視' }],
    },
    {
      field: '磯・ゴロタ',
      items: [{ pe: '1.0 号', leader: '22 lb', note: '擦れ対策' }],
    },
  ]
  const singleResult = {
    pe: '0.8 号',
    leader: '16 lb フロロ',
    note: '潮と地形に合わせて調整。まずはシンプルに。',
  }

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
        <h1>ベストな結束バランスを、もっとスピーディーに。</h1>
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
          {startMode === 'species' ? (
            <div className="result">
              <div>
                <div className="label">おすすめリーダー</div>
                <div className="value">{singleResult.leader}</div>
                <details className="shop-details">
                  <summary className="shop-label">このセッティングで買い物に行く</summary>
                  <div className="shop-actions">
                    <button className="shop-button" type="button">
                      <img src={rakutenLogo} alt="楽天" />
                      楽天
                    </button>
                    <button className="shop-button" type="button">
                      <img src={amazonLogo} alt="Amazon" />
                      Amazon
                    </button>
                  </div>
                </details>
              </div>
              <div>
                <div className="label">おすすめPE</div>
                <div className="value">{singleResult.pe}</div>
                <details className="shop-details">
                  <summary className="shop-label">このセッティングで買い物に行く</summary>
                  <div className="shop-actions">
                    <button className="shop-button" type="button">
                      <img src={rakutenLogo} alt="楽天" />
                      楽天
                    </button>
                    <button className="shop-button" type="button">
                      <img src={amazonLogo} alt="Amazon" />
                      Amazon
                    </button>
                  </div>
                </details>
              </div>
              <div>
                <div className="label">メモ</div>
                <div className="value small">{singleResult.note}</div>
              </div>
            </div>
          ) : (
            <div className="result-list">
              {multiResults.map((group) => (
                <div className="result-group" key={group.field}>
                  <div className="group-title">{group.field}</div>
                  <div className="group-items">
                    {group.items.map((item, index) => (
                      <div className="result-card" key={`${group.field}-${index}`}>
                        <div>
                          <div className="label">候補 {index + 1}</div>
                          <div className="value">PE {item.pe}</div>
                          <details className="shop-details">
                            <summary className="shop-label">このセッティングで買い物に行く</summary>
                            <div className="shop-actions">
                              <button className="shop-button" type="button">
                                <img src={rakutenLogo} alt="楽天" />
                                楽天
                              </button>
                              <button className="shop-button" type="button">
                                <img src={amazonLogo} alt="Amazon" />
                                Amazon
                              </button>
                            </div>
                          </details>
                        </div>
                        <div>
                          <div className="label">リーダー</div>
                          <div className="value">{item.leader}</div>
                          <details className="shop-details">
                            <summary className="shop-label">このセッティングで買い物に行く</summary>
                            <div className="shop-actions">
                              <button className="shop-button" type="button">
                                <img src={rakutenLogo} alt="楽天" />
                                楽天
                              </button>
                              <button className="shop-button" type="button">
                                <img src={amazonLogo} alt="Amazon" />
                                Amazon
                              </button>
                            </div>
                          </details>
                        </div>
                        <div>
                          <div className="label">メモ</div>
                          <div className="value small">{item.note}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
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
