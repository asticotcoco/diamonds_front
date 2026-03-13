import type { Diamond } from './DiamondCard'
import { DiamondCard } from './DiamondCard'

interface DiamondListProps {
  diamonds: Diamond[]
  onSelect?: (diamond: Diamond) => void
}

export function DiamondList({ diamonds, onSelect }: DiamondListProps) {
  if (diamonds.length === 0) {
    return <p data-testid="empty-message">No diamonds available.</p>
  }

  return (
    <ul className="diamond-list" data-testid="diamond-list">
      {diamonds.map((diamond) => (
        <li key={diamond.id}>
          <DiamondCard diamond={diamond} onSelect={onSelect} />
        </li>
      ))}
    </ul>
  )
}
