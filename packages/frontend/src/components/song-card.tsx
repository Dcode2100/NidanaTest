import { Heart } from "lucide-react"
import { Button } from "./ui/button"
import { Music } from "lucide-react"

interface SongCardProps {
  song: {
    id: number
    title: string
    artist: string
    album?: string
    coverImage?: string
  }
  isFavorite: boolean
  onToggleFavorite: (id: number) => void
}

export function SongCard({ song, isFavorite, onToggleFavorite }: SongCardProps) {
  return (
    <div className="group flex items-center gap-4 p-3 rounded-lg hover:bg-secondary/50 transition-colors">
      <div className="h-12 w-12 rounded-md bg-secondary flex-shrink-0 overflow-hidden">
        
    
          <div className="h-full w-full bg-primary/10 flex items-center justify-center">
            <Music className="h-6 w-6 text-primary" />
          </div>
        
      </div>
      
      <div className="flex-1 min-w-0">
        <h3 className="font-medium truncate">{song.title}</h3>
        <p className="text-sm text-muted-foreground truncate">
          {song.artist} {song.album && `• ${song.album}`}
        </p>
      </div>

      <Button
        variant="ghost"
        size="icon"
        className={`transition-colors ${
          isFavorite ? 'text-primary' : 'hover:text-primary'
        }`}
        onClick={() => onToggleFavorite(song.id)}
      >
        <Heart className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`} />
      </Button>
    </div>
  )
}