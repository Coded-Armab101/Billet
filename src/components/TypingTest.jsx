import { useCallback, useEffect, useRef, useState } from 'react'
import { typingTest } from '../data/site'

const RUN_MS = 25000

export default function TypingTest() {
  const [phase, setPhase] = useState('intro')
  const [typed, setTyped] = useState('')
  const [left, setLeft] = useState(RUN_MS)
  const [result, setResult] = useState({ wpm: 0, accuracy: 0 })

  const areaRef = useRef(null)
  const timerRef = useRef(null)
  const startedAt = useRef(0)

  const prompt = typingTest.prompt

  const score = useCallback(
    (text) => {
      const clean = text.trim()
      const correct = [...clean].filter((ch, i) => ch === prompt[i]).length
      const wpm = Math.round(correct / 5 / (RUN_MS / 60000))
      const accuracy = clean.length ? Math.round((correct / clean.length) * 100) : 0
      return { wpm, accuracy }
    },
    [prompt],
  )

  useEffect(() => {
    if (phase !== 'running') return
    startedAt.current = Date.now() - (RUN_MS - left)
    timerRef.current = setInterval(() => {
      const remaining = RUN_MS - (Date.now() - startedAt.current)
      if (remaining <= 0) {
        clearInterval(timerRef.current)
        setLeft(0)
        setPhase('done')
        return
      }
      setLeft(remaining)
    }, 100)
    return () => clearInterval(timerRef.current)
  }, [phase]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (phase === 'running') areaRef.current?.focus()
  }, [phase])

  const start = () => {
    setTyped('')
    setLeft(RUN_MS)
    setResult({ wpm: 0, accuracy: 0 })
    setPhase('running')
  }

  const restart = () => {
    clearInterval(timerRef.current)
    setTyped('')
    setLeft(RUN_MS)
    setResult({ wpm: 0, accuracy: 0 })
    setPhase('intro')
  }

  const finish = () => {
    clearInterval(timerRef.current)
    setResult(score(typed))
    setPhase('done')
  }

  const seconds = (left / 1000).toFixed(1)
  const liveWpm = phase === 'done' ? result.wpm : score(typed).wpm

  return (
    <div className="tt-band" role="region" aria-label="Typing test">
      {phase === 'intro' && (
        <div className="tt-band__intro">
          <h2 className="tt-band__title">
            {`Are you faster than ${typingTest.recordName}?`}
          </h2>
          <p className="tt-band__copy">
            Test your typing skills against Billet&apos;s fastest.
          </p>
          <div className="tt-band__cta">
            <button type="button" className="btn btn-secondary btn-md" onClick={start}>
              Take the test
            </button>
          </div>
        </div>
      )}

      {phase === 'running' && (
        <div className="tt-band__game">
          <div className="tt__stats">
            <div className="tt__stat tt__stat--live">
              <span className="t-tiny t-muted">wpm</span>
              <b>{liveWpm}</b>
            </div>
            <div className="tt__stat tt__stat--live">
              <span className="t-tiny t-muted">target</span>
              <b>{typingTest.target}</b>
            </div>
            <div className="tt__stat tt__stat--live">
              <span className="t-tiny t-muted">seconds</span>
              <b>{seconds}</b>
            </div>
          </div>

          <p className="tt__prompt" style={{ marginTop: '1rem' }}>
            {[...prompt].map((ch, i) => (
              <span
                key={i}
                className={typed[i] === undefined ? '' : typed[i] === ch ? 'hit' : 'miss'}
              >
                {ch}
              </span>
            ))}
          </p>

          <label className="visually-hidden" htmlFor="tt-area">
            Type the passage
          </label>
          <textarea
            id="tt-area"
            ref={areaRef}
            className="tt__area"
            value={typed}
            spellCheck="false"
            autoComplete="off"
            onChange={(e) => setTyped(e.target.value)}
          />

          <div className="tt__actions">
            <button type="button" className="btn btn-secondary btn-md" onClick={finish}>
              Finish early
            </button>
            <button type="button" className="btn btn-outline btn-md" onClick={start}>
              Restart
            </button>
          </div>
        </div>
      )}

      {phase === 'done' && (
        <div className="tt-band__intro">
          <h2 className="tt-band__title">
            {liveWpm >= typingTest.target
              ? 'You beat the bench.'
              : `${liveWpm} wpm. ${typingTest.target} is the mark.`}
          </h2>
          <div className="tt__stats" style={{ width: '100%' }}>
            <div className="tt__stat">
              <span className="t-tiny t-muted">wpm</span>
              <b>{result.wpm}</b>
            </div>
            <div className="tt__stat">
              <span className="t-tiny t-muted">accuracy</span>
              <b>{result.accuracy}%</b>
            </div>
            <div className="tt__stat">
              <span className="t-tiny t-muted">record</span>
              <b>{typingTest.target}</b>
            </div>
          </div>
          <div className="tt__actions">
            <button type="button" className="btn btn-secondary btn-md" onClick={start}>
              Play again
            </button>
            <button type="button" className="btn btn-outline btn-md" onClick={restart}>
              Back to the start
            </button>
          </div>
        </div>
      )}
    </div>
  )
}