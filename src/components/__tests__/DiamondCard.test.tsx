import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { DiamondCard, type Diamond } from '../DiamondCard'

const mockDiamond: Diamond = {
  id: 1,
  carat: 1.5,
  cut: 'Excellent',
  color: 'D',
  clarity: 'VVS1',
  price: 12000,
}

describe('DiamondCard', () => {
  it('renders carat weight', () => {
    render(<DiamondCard diamond={mockDiamond} />)
    expect(screen.getByTestId('diamond-carat')).toHaveTextContent('1.5 ct')
  })

  it('renders cut grade', () => {
    render(<DiamondCard diamond={mockDiamond} />)
    expect(screen.getByTestId('diamond-cut')).toHaveTextContent('Excellent')
  })

  it('renders color grade', () => {
    render(<DiamondCard diamond={mockDiamond} />)
    expect(screen.getByTestId('diamond-color')).toHaveTextContent('D')
  })

  it('renders clarity grade', () => {
    render(<DiamondCard diamond={mockDiamond} />)
    expect(screen.getByTestId('diamond-clarity')).toHaveTextContent('VVS1')
  })

  it('renders formatted price', () => {
    render(<DiamondCard diamond={mockDiamond} />)
    expect(screen.getByTestId('diamond-price')).toHaveTextContent('12,000')
  })

  it('calls onSelect with diamond when clicked', async () => {
    const onSelect = vi.fn()
    render(<DiamondCard diamond={mockDiamond} onSelect={onSelect} />)
    await userEvent.click(screen.getByTestId('diamond-card'))
    expect(onSelect).toHaveBeenCalledOnce()
    expect(onSelect).toHaveBeenCalledWith(mockDiamond)
  })

  it('does not throw when clicked without onSelect', async () => {
    render(<DiamondCard diamond={mockDiamond} />)
    await userEvent.click(screen.getByTestId('diamond-card'))
  })
})
