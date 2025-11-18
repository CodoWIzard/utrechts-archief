"use client";

import Image from "next/image";
import { useState, useRef } from "react";
import { panoramaPages, panoramaInfo, type PanoramaPage } from "./data/panorama-data";

export default function Home() {
  const [zoom, setZoom] = useState(0.6);
  const [selectedPage, setSelectedPage] = useState<PanoramaPage | null>(null);
  const [showInstructions, setShowInstructions] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.2, 3));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.2, 0.5));

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (containerRef.current?.offsetLeft || 0));
    setScrollLeft(containerRef.current?.scrollLeft || 0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    e.preventDefault();
    const x = e.pageX - (containerRef.current.offsetLeft || 0);
    const walk = (x - startX) * 2;
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => setIsDragging(false);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      setStartX(e.touches[0].pageX - (containerRef.current?.offsetLeft || 0));
      setScrollLeft(containerRef.current?.scrollLeft || 0);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 1 && isDragging && containerRef.current) {
      const x = e.touches[0].pageX - (containerRef.current.offsetLeft || 0);
      const walk = (x - startX) * 2;
      containerRef.current.scrollLeft = scrollLeft - walk;
    } else if (e.touches.length === 2) {
      e.preventDefault();
    }
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (e.ctrlKey) {
      e.preventDefault();
      if (e.deltaY < 0) handleZoomIn();
      else handleZoomOut();
    }
  };

  return (
    <div className="min-h-screen bg-amber-50">
      {/* Header */}
      <header className="bg-amber-900 text-white p-4 shadow-lg">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <Image
              src="/images/ualogo.png"
              alt="Het Utrechts Archief"
              width={60}
              height={60}
              className="rounded"
            />
            <div>
              <h1 className="text-2xl font-bold">Panorama van Utrecht 1859</h1>
              <p className="text-amber-200">Het Utrechts Archief - Interactieve Leporello</p>
            </div>
          </div>
          
          {/* Controls */}
          <div className="flex gap-2">
            <button
              onClick={() => setShowInstructions(true)}
              className="zoom-button bg-amber-700 hover:bg-amber-600 px-4 py-2 rounded text-sm font-semibold"
            >
              ?
            </button>
            <button
              onClick={handleZoomOut}
              className="zoom-button bg-amber-700 hover:bg-amber-600 px-4 py-2 rounded text-lg font-bold"
            >
              −
            </button>
            <span className="px-4 py-2 bg-amber-800 rounded">
              {Math.round((zoom / 0.6) * 100)}%
            </span>
            <button
              onClick={handleZoomIn}
              className="zoom-button bg-amber-700 hover:bg-amber-600 px-4 py-2 rounded text-lg font-bold"
            >
              +
            </button>
          </div>
        </div>
      </header>

      {/* Main Panorama Viewer */}
      <main className="relative">
        <div 
          ref={containerRef}
          className="panorama-container overflow-auto h-[calc(100vh-140px)] bg-amber-100 pb-6 select-none"
          style={{ 
            cursor: isDragging ? 'grabbing' : (zoom > 1 ? 'grab' : 'default'),
            touchAction: 'pan-x pinch-zoom',
            '--zoom-level': zoom,
            width: 'fit-content'
          } as React.CSSProperties}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={() => setIsDragging(false)}
          onWheel={handleWheel}
        >
          <div 
            className="relative"
            style={{ 
              transform: `scale(${zoom})`,
              transformOrigin: 'top left',
              width: 'fit-content'
            }}
          >
            {/* Panorama Images */}
            <div className="flex items-end">
              {/* Landing page */}
              <Image
                src="/images/landingpage.png"
                alt="Panorama van Utrecht 1859"
                width={1455}
                height={400}
                className="h-[400px] object-contain"
                title="Panorama van Utrecht 1859"
                priority
              />
              
              {panoramaPages.map((page, index) => {
                // Use available images in different formats
                const getImageSrc = (pageId: string) => {
                  const imageMap: { [key: string]: string } = {
                    'page10': '/images/page10-1.png',
                    'page27': '/images/page27.jpg',
                    'page12': '/images/page12.png',
                    'page23': '/images/page23.png',
                    'page24': '/images/page24.png',
                    'page26': '/images/page26.png',
                    'page31': '/images/page31.png',
                    'page32': '/images/page32.png'
                  };
                  return imageMap[pageId] || `/images/${pageId}.png`;
                };
                
                // Skip pages without images
                const missingPages = ['page4', 'page18'];
                if (missingPages.includes(page.id)) {
                  return null;
                }
                
                const elements = [
                  <Image
                    key={page.id}
                    src={getImageSrc(page.id)}
                    alt={page.title}
                    width={1455}
                    height={400}
                    className="h-[400px] object-contain cursor-pointer hover:opacity-90 transition-opacity"
                    onClick={() => setSelectedPage(page)}
                    title={page.title}
                  />
                ];
                
                return elements;
              })}
              
              {/* Endpage - properly contained within the flex container */}
              <Image
                key="endpage"
                src="/images/endpage.jpg"
                alt="Einde panorama"
                width={1455}
                height={400}
                className="h-[400px] object-contain cursor-pointer hover:opacity-90 transition-opacity"
                title="Einde panorama"
                onClick={() => setSelectedPage({
                  id: 'endpage',
                  catalogNumber: 'Eindpagina',
                  title: 'Einde panorama',
                  description: 'Dit markeert het einde van het panorama van Utrecht uit 1859.',
                  imageUrl: '/images/endpage.jpg'
                })}
              />
            </div>
          </div>
        </div>

      </main>

      {/* Instructions Modal */}
      {showInstructions && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-amber-900">
                  Instructies
                </h2>
                <button
                  onClick={() => setShowInstructions(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                    <span className="text-amber-700 font-bold">1</span>
                  </div>
                  <p className="text-gray-700">Scroll horizontaal door het panorama</p>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                    <span className="text-amber-700 font-bold">2</span>
                  </div>
                  <p className="text-gray-700">Gebruik + en − om in/uit te zoomen</p>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                    <span className="text-amber-700 font-bold">3</span>
                  </div>
                  <p className="text-gray-700">Klik op afbeeldingen voor historische informatie</p>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                    <span className="text-amber-700 font-bold">?</span>
                  </div>
                  <p className="text-gray-700">Klik op ? voor deze instructies</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Page Info Modal */}
      {selectedPage && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-amber-900">
                    {selectedPage.title}
                  </h2>
                  <p className="text-sm text-amber-600">Catalogusnummer: {selectedPage.catalogNumber}</p>
                </div>
                <button
                  onClick={() => setSelectedPage(null)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>
              
              <div className="mb-4">
                <Image
                  src={(() => {
                    const imageMap: { [key: string]: string } = {
                      'page10': '/images/page10-1.png',
                      'page27': '/images/page27.jpg',
                      'page12': '/images/page12.png',
                      'page23': '/images/page23.png',
                      'page24': '/images/page24.png',
                      'page26': '/images/page26.png',
                      'page31': '/images/page31.png',
                      'page32': '/images/page32.png',
                      'endpage': '/images/endpage.jpg'
                    };
                    return imageMap[selectedPage.id] || `/images/${selectedPage.id}.png`;
                  })()}
                  alt={selectedPage.title}
                  width={400}
                  height={200}
                  className="w-full max-w-md mx-auto rounded border object-contain"
                />
              </div>
              
              <p className="text-gray-700 leading-relaxed mb-4">
                {selectedPage.description}
              </p>
              
              {selectedPage.additionalInfo && (
                <div className="bg-amber-50 p-4 rounded border-l-4 border-amber-400 mb-4">
                  <h4 className="font-semibold text-amber-900 mb-2">Aanvullende informatie:</h4>
                  <p className="text-gray-700 text-sm">{selectedPage.additionalInfo}</p>
                </div>
              )}
              
              {selectedPage.additionalImages && selectedPage.additionalImages.length > 0 && (
                <div className="space-y-4">
                  <h4 className="font-semibold text-amber-900">Aanvullende afbeeldingen:</h4>
                  {selectedPage.additionalImages.map((img, index) => (
                    <div key={index} className="bg-gray-50 p-4 rounded">
                      <Image
                        src={img.url}
                        alt={img.description}
                        width={300}
                        height={200}
                        className="w-full max-w-sm mx-auto rounded border object-contain mb-2"
                      />
                      <p className="text-gray-700 text-sm mb-2">{img.description}</p>
                      <a 
                        href={img.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-amber-600 hover:text-amber-800 text-sm underline"
                      >
                        Bekijk afbeelding →
                      </a>
                    </div>
                  ))}
                </div>
              )}
              
              <div className="mt-4 pt-4 border-t">
                <a 
                  href={selectedPage.imageUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-amber-600 hover:text-amber-800 underline"
                >
                  Bekijk originele afbeelding in Het Utrechts Archief →
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
