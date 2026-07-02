import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import App from '../App'

describe('App A smoke', () => {
  it('renders without crash and shows h1 with TAQAT Academy', () => {
    render(<App />)
    const headings = screen.getAllByRole('heading', { name: /TAQAT Academy/i })
    expect(headings.length).toBeGreaterThan(0)
  })

  it('renders language toggle button', () => {
    render(<App />)
    const btn = screen.getByRole('button', { name: /Toggle language/i })
    expect(btn).toBeDefined()
  })

  it('sidebar contains hosting link', () => {
    render(<App />)
    const links = screen.getAllByRole('link')
    const hrefs = links.map(l => l.getAttribute('href'))
    expect(hrefs.some(h => h?.includes('hosting'))).toBe(true)
  })
})
