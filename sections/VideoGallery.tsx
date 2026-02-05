import { useState, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Film } from 'lucide-react';
import type { Settings } from '@/types';

interface VideoGalleryProps {
  settings: Settings | null;
}

export function VideoGallery({ settings }: VideoGalleryProps) {
  const videos = settings?.media?.showcaseVideos || [];
  const [playingVideos, setPlayingVideos] = useState<Set<number>>(new Set());
  const [mutedVideos, setMutedVideos] = useState<Set<number>>(new Set([0, 1, 2, 3, 4, 5, 6, 7]));
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const togglePlay = (index: number) => {
    const video = videoRefs.current[index];
    if (video) {
      if (playingVideos.has(index)) {
        video.pause();
        setPlayingVideos(prev => {
          const newSet = new Set(prev);
          newSet.delete(index);
          return newSet;
        });
      } else {
        video.play();
        setPlayingVideos(prev => new Set(prev).add(index));
      }
    }
  };

  const toggleMute = (index: number) => {
    const video = videoRefs.current[index];
    if (video) {
      video.muted = !video.muted;
      setMutedVideos(prev => {
        const newSet = new Set(prev);
        if (newSet.has(index)) {
          newSet.delete(index);
        } else {
          newSet.add(index);
        }
        return newSet;
      });
    }
  };

  if (videos.length === 0) return null;

  return (
    <section id="videos" className="py-20 section-lavender">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-luxury mb-4">
            <Film size={16} className="text-[#F4A6B9]" />
            <span className="text-sm font-medium text-[#8B5A6B]">Behind the Scenes</span>
          </div>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Watch Our <span className="gradient-text">Story</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            See how our beautiful candles and decor pieces come to life. Each creation is crafted with love and attention to detail.
          </p>
        </div>

        {/* Featured Video (First one larger) */}
        {videos.length > 0 && (
          <div className="mb-8">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl group">
              <video
                ref={el => { videoRefs.current[0] = el; }}
                src={videos[0]}
                className="w-full aspect-video object-cover"
                loop
                playsInline
                onClick={() => togglePlay(0)}
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              {/* Play/Pause Button */}
              <button
                onClick={() => togglePlay(0)}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className={`w-20 h-20 rounded-full bg-white/90 flex items-center justify-center shadow-xl transition-all ${playingVideos.has(0) ? 'opacity-0 group-hover:opacity-100 scale-75' : 'opacity-100 scale-100'}`}>
                  {playingVideos.has(0) ? <Pause size={32} className="text-[#F4A6B9]" /> : <Play size={32} className="text-[#F4A6B9] ml-1" />}
                </div>
              </button>

              {/* Mute Button */}
              <button
                onClick={(e) => { e.stopPropagation(); toggleMute(0); }}
                className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-white/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all"
              >
                {mutedVideos.has(0) ? <VolumeX size={18} /> : <Volume2 size={18} />}
              </button>

              {/* Title */}
              <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="font-serif text-xl font-semibold">Our Crafting Process</p>
                <p className="text-sm text-white/80">See how we create magic</p>
              </div>
            </div>
          </div>
        )}

        {/* Video Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {videos.slice(1).map((video, idx) => {
            const index = idx + 1;
            return (
              <div key={index} className="relative rounded-2xl overflow-hidden shadow-lg group">
                <video
                  ref={el => { videoRefs.current[index] = el; }}
                  src={video}
                  className="w-full aspect-[4/5] object-cover"
                  loop
                  playsInline
                  muted
                  onClick={() => togglePlay(index)}
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                
                {/* Play/Pause Button */}
                <button
                  onClick={() => togglePlay(index)}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <div className={`w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-lg transition-all ${playingVideos.has(index) ? 'opacity-0 group-hover:opacity-100 scale-75' : 'opacity-100 scale-100'}`}>
                    {playingVideos.has(index) ? <Pause size={20} className="text-[#F4A6B9]" /> : <Play size={20} className="text-[#F4A6B9] ml-0.5" />}
                  </div>
                </button>

                {/* Mute Button */}
                <button
                  onClick={(e) => { e.stopPropagation(); toggleMute(index); }}
                  className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-white/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all"
                >
                  {mutedVideos.has(index) ? <VolumeX size={14} /> : <Volume2 size={14} />}
                </button>

                {/* Video Number */}
                <div className="absolute top-3 left-3 px-2 py-1 rounded-full bg-black/30 backdrop-blur-sm text-white text-xs font-medium">
                  {index + 1}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
