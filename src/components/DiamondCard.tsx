export interface Diamond {
  id: number
  carat: number
  cut: 'Fair' | 'Good' | 'Very Good' | 'Ideal' | 'Excellent'
  color: string
  clarity: string
  price: number
}

interface DiamondCardProps {
  diamond: Diamond
  onSelect?: (diamond: Diamond) => void
}

export function DiamondCard({ diamond, onSelect }: DiamondCardProps) {
  return (
    <div
      className="diamond-card"
      data-testid="diamond-card"
      onClick={() => onSelect?.(diamond)}
    >
      <h3 data-testid="diamond-carat">{diamond.carat} ct</h3>
      <p data-testid="diamond-cut">Cut: {diamond.cut}</p>
      <p data-testid="diamond-color">Color: {diamond.color}</p>
      <p data-testid="diamond-clarity">Clarity: {diamond.clarity}</p>
      <p data-testid="diamond-price">${diamond.price.toLocaleString()}</p>
    </div>
  )
}
