'use client';

import { useEffect, useState } from 'react';
import { ProtectedRoute } from '@/context/protected-route';
import { Navbar } from '@/components/navbar';
import { SongCard } from '@/components/song-card';
import { SearchInput } from '@/components/search-input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2 } from 'lucide-react';

type Song = {
  id: number;
  title: string;
  artist: string;
  album?: string;
  coverImage?: string;
};

export default function Home() {
  const [songs, setSongs] = useState<Song[]>([]);
  const [filteredSongs, setFilteredSongs] = useState<Song[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('all');
  
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  // Fetch all songs
  useEffect(() => {
    setIsLoading(true);
    fetch(`${apiUrl}/songs`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch songs');
        return res.json();
      })
      .then((data) => {
        setSongs(data);
        setFilteredSongs(data);
      })
      .catch((err) => {
        console.error('Error fetching songs:', err);
        setError('Failed to load songs. Please try again later.');
      })
      .finally(() => setIsLoading(false));
  }, [apiUrl]);

  // Fetch user favorites
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    fetch(`${apiUrl}/songs/favorites`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch favorites');
        return res.json();
      })
      .then((data) => {
        setFavorites(data.map((song: Song) => song.id));
      })
      .catch((err) => {
        console.error('Error fetching favorites:', err);
      });
  }, [apiUrl]);

  // Handle search
  const handleSearch = async (query: string) => {
    if (!query) {
      setFilteredSongs(songs);
      return;
    }

    try {
      const res = await fetch(`${apiUrl}/songs/search?q=${encodeURIComponent(query)}`);
      if (!res.ok) throw new Error('Search failed');
      const data = await res.json();
      setFilteredSongs(data);
    } catch (err) {
      console.error('Error searching songs:', err);
      setError('Search failed. Please try again.');
    }
  };

  // Toggle favorite
  const toggleFavorite = async (songId: number) => {
    const token = localStorage.getItem('token');
    if (!token) return;

    const isFavorite = favorites.includes(songId);
    const method = isFavorite ? 'DELETE' : 'POST';
    
    try {
      const res = await fetch(`${apiUrl}/songs/${songId}/favorite`, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error('Failed to update favorite');
      
      setFavorites(prev => 
        isFavorite 
          ? prev.filter(id => id !== songId)
          : [...prev, songId]
      );
    } catch (err) {
      console.error('Error updating favorite:', err);
    }
  };

  // Filter songs based on active tab
  const displayedSongs = activeTab === 'favorites'
    ? filteredSongs.filter(song => favorites.includes(song.id))
    : filteredSongs;

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background text-foreground ">
        <Navbar />
        <main className="max-w-5xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
            <h1 className="text-3xl font-bold text-primary">Simplify Music</h1>
            <SearchInput onSearch={handleSearch} />
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="mb-6 w-auto">
              <TabsTrigger className='cursor-pointer' value="all">All Songs</TabsTrigger>
              <TabsTrigger className='cursor-pointer' value="favorites">Favorites</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all">
              {isLoading ? (
                <div className="flex justify-center items-center py-20">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : error ? (
                <div className="text-center py-10 text-destructive">{error}</div>
              ) : displayedSongs.length === 0 ? (
                <div className="text-center py-10 bg-secondary/20 rounded-lg">No songs found</div>
              ) : (
                <div className="space-y-2 divide-y divide-border/40 rounded-lg bg-card p-1">
                  {displayedSongs.map((song) => (
                    <SongCard
                      key={song.id}
                      song={song}
                      isFavorite={favorites.includes(song.id)}
                      onToggleFavorite={toggleFavorite}
                    />
                  ))}
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="favorites">
              {isLoading ? (
                <div className="flex justify-center items-center py-20">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : displayedSongs.length === 0 ? (
                <div className="text-center py-10 bg-secondary/20 rounded-lg">
                  No favorite songs yet. Click the heart icon to add songs to your favorites.
                </div>
              ) : (
                <div className="space-y-2 divide-y divide-border/40 rounded-lg bg-card p-1">
                  {displayedSongs.map((song) => (
                    <SongCard
                      key={song.id}
                      song={song}
                      isFavorite={true}
                      onToggleFavorite={toggleFavorite}
                    />
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </ProtectedRoute>
  );
}