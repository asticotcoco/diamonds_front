import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { DiamondList } from '../DiamondList'
import type { Diamond } from '../DiamondCard'

const mockDiamonds: Diamond[] = [
  {
    id: 1,
    carat: 0.5,
    cut: 'Good',
    color: 'G',
    clarity: 'SI1',
    price: 1500,
  },
  {
    id: 2,
    carat: 1.0,
    cut: 'Ideal',
    color: 'E',
    clarity: 'VS2',
    price: 5000,
  },
]

describe('DiamondList', () => {
  it('renders all diamonds', () => {
    render(<DiamondList diamonds={mockDiamonds} />)
    expect(screen.getAllByTestId('diamond-card')).toHaveLength(2)
  })

  it('shows empty message when no diamonds', () => {
    render(<DiamondList diamonds={[]} />)
    expect(screen.getByTestId('empty-message')).toHaveTextContent(
      'No diamonds available.'
    )
  })

  it('does not render list when empty', () => {
    render(<DiamondList diamonds={[]} />)
    expect(screen.queryByTestId('diamond-list')).not.toBeInTheDocument()
  })

  it('renders list container when diamonds exist', () => {
    render(<DiamondList diamonds={mockDiamonds} />)
    expect(screen.getByTestId('diamond-list')).toBeInTheDocument()
  })

  it('passes onSelect to each DiamondCard', async () => {
    const onSelect = vi.fn()
    render(<DiamondList diamonds={mockDiamonds} onSelect={onSelect} />)
    const cards = screen.getAllByTestId('diamond-card')
    await userEvent.click(cards[0])
    expect(onSelect).toHaveBeenCalledWith(mockDiamonds[0])
  })
})
