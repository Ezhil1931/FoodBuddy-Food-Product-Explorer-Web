import { useState, useRef, useEffect } from 'react'
import { copyToClipboard } from '../utils/clipboard'
import { CopyIcon, CheckIcon } from './icons'

/**
 * Button that copies `text` to the clipboard and shows a brief "Copied" state.
 */
export default function CopyButton({ text, label = 'Copy', copiedLabel = '✓ Copied', className = '' }) {
  const [copied, setCopied] = useState(false)
  const timer = useRef(null)

  useEffect(() => () => clearTimeout(timer.current), [])

  async function handleCopy() {
    const ok = await copyToClipboard(text)
    if (ok) {
      setCopied(true)
      clearTimeout(timer.current)
      timer.current = setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={`btn border border-line bg-surface-2 text-ink hover:border-line-strong hover:bg-surface-2 focus-visible:ring-brand-500 ${
        copied ? 'border-brand-500 text-brand-300' : ''
      } ${className}`}
      aria-live="polite"
    >
      {copied ? (
        <CheckIcon className="h-4 w-4" />
      ) : (
        <CopyIcon className="h-4 w-4" />
      )}
      {copied ? copiedLabel : label}
    </button>
  )
}