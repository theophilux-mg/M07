import React, { useState } from 'react';
import { dataService } from '../services/dataService';
import { GalleryItem } from '../types';
import { X, ZoomIn, Camera } from 'lucide-react';

export const GalleryPage: React.FC = () => {
  const gallery = dataService.getGallery();
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  const categories = ['All', 'Fleet', 'VIP', 'Airport Transfer', 'Safari', 'Mombasa'];

  const filtered = activeCategory === 'All'
    ? gallery
    : gallery.filter(g => g.category === activeCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">
          Visual Elegance
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
          M07 Fleet & Coastal Journey Gallery
        </h1>
        <p className="text-xs sm:text-sm text-neutral-400">
          A glimpse into our executive automotive collection, scenic Mombasa routes, VIP airport transfers, and savannah safari expeditions.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              activeCategory === cat
                ? 'bg-gradient-to-r from-[#D4AF37] to-[#AA820A] text-black shadow-md'
                : 'text-neutral-400 hover:text-white bg-neutral-900 border border-neutral-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Masonry-Style Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(item => (
          <div
            key={item.id}
            onClick={() => setSelectedImage(item)}
            className="group relative h-72 rounded-2xl overflow-hidden bg-neutral-950 border border-neutral-800 hover:border-[#D4AF37]/50 transition-all cursor-pointer shadow-xl"
          >
            <img
              src={item.imageUrl}
              alt={item.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity"></div>

            <div className="absolute top-3 left-3">
              <span className="px-2.5 py-0.5 rounded bg-black/60 backdrop-blur-md text-[10px] font-bold text-[#D4AF37] border border-[#D4AF37]/30 uppercase">
                {item.category}
              </span>
            </div>

            <div className="absolute bottom-4 left-4 right-4 space-y-1">
              <h3 className="text-sm font-bold text-white group-hover:text-[#D4AF37] transition-colors leading-snug">
                {item.title}
              </h3>
              <p className="text-[11px] text-neutral-300 line-clamp-2">
                {item.caption}
              </p>
            </div>

            <div className="absolute top-3 right-3 p-1.5 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity">
              <ZoomIn className="w-4 h-4 text-[#D4AF37]" />
            </div>
          </div>
        ))}
      </div>

      {/* Fullscreen Lightbox Modal */}
      {selectedImage && (
        <div 
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-[#0F141D] border border-neutral-800 rounded-2xl max-w-4xl w-full overflow-hidden shadow-2xl relative"
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-10 p-2 bg-black/60 hover:bg-black text-white rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="max-h-[75vh] overflow-hidden bg-black flex items-center justify-center">
              <img
                src={selectedImage.imageUrl}
                alt={selectedImage.title}
                className="w-full h-auto max-h-[75vh] object-contain"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="p-6 bg-[#0F141D] border-t border-neutral-800 flex items-center justify-between">
              <div>
                <span className="text-xs text-[#D4AF37] font-semibold uppercase">{selectedImage.category}</span>
                <h3 className="text-base font-bold text-white mt-0.5">{selectedImage.title}</h3>
                <p className="text-xs text-neutral-400 mt-1">{selectedImage.caption}</p>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
