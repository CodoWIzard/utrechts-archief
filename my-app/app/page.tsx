"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { panoramaPages, panoramaInfo, type PanoramaPage } from "./data/panorama-data";
import { panoramaTranslations } from "./data/panorama-translations";
import { useLanguage } from "./hooks/useLanguage";
import { translations } from "./translations";
import { useNotification } from "./hooks/useNotification";
import NotificationContainer from "./components/NotificationContainer";

export default function Home() {
  const [zoom, setZoom] = useState(0.6);
  const [selectedPage, setSelectedPage] = useState<PanoramaPage | null>(null);
  const [showInstructions, setShowInstructions] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const { language, toggleLanguage } = useLanguage();
  const t = translations[language];
  const { notifications, addNotification, removeNotification } = useNotification();

  const playSound = (type: 'click' | 'scroll') => {
    // Placeholder for sound functionality
    // You can add actual sound files later
  };

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.2, 3));
    playSound('click');
  };
  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.2, 0.5));
    playSound('click');
  };

  const startAutoPlay = () => {
    setIsAutoPlaying(true);
    playSound('click');
  };

  const stopAutoPlay = () => {
    setIsAutoPlaying(false);
    playSound('click');
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isAutoPlaying && containerRef.current) {
      interval = setInterval(() => {
        const container = containerRef.current;
        if (container) {
          const maxScroll = container.scrollWidth - container.clientWidth;
          if (container.scrollLeft >= maxScroll) {
            container.scrollLeft = 0;
          } else {
            container.scrollLeft += 2;
          }
        }
      }, 50);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying]);



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
              <h1 className="text-2xl font-bold">{t.title}</h1>
              <p className="text-amber-200">{t.subtitle}</p>
            </div>
          </div>
          
          {/* Controls */}
          <div className="flex gap-2">
            <button
              onClick={toggleLanguage}
              className="bg-amber-700 hover:bg-amber-600 px-3 py-2 rounded text-sm font-semibold"
              aria-label="Toggle language"
            >
              {language.toUpperCase()}
            </button>
            <button
              onClick={() => setShowInstructions(true)}
              className="zoom-button bg-amber-700 hover:bg-amber-600 px-4 py-2 rounded text-sm font-semibold"
              aria-label={t.instructions}
            >
              ?
            </button>
            <button
              onClick={isAutoPlaying ? stopAutoPlay : startAutoPlay}
              className="bg-amber-700 hover:bg-amber-600 px-3 py-2 rounded text-sm font-semibold"
              aria-label={isAutoPlaying ? t.stopAutoPlay : t.autoPlay}
            >
              {isAutoPlaying ? '⏸' : '▶'}
            </button>
            <button
              onClick={handleZoomOut}
              className="zoom-button bg-amber-700 hover:bg-amber-600 px-4 py-2 rounded text-lg font-bold"
              aria-label="Zoom out"
            >
              −
            </button>
            <span className="px-4 py-2 bg-amber-800 rounded">
              {Math.round((zoom / 0.6) * 100)}%
            </span>
            <button
              onClick={handleZoomIn}
              className="zoom-button bg-amber-700 hover:bg-amber-600 px-4 py-2 rounded text-lg font-bold"
              aria-label="Zoom in"
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
                const getImageSrc = (pageId: string) => {
                  const imageMap: { [key: string]: string } = {
                    'page10': '/images/page10-1.png',
                    'page27': '/images/page27.jpg'
                  };
                  return imageMap[pageId] || `/images/${pageId}.png`;
                };
                
                const missingPages = ['page4', 'page18'];
                if (missingPages.includes(page.id)) {
                  return null;
                }
                
                return (
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
                );
              })}
              

            </div>
          </div>
        </div>

      </main>

      <NotificationContainer 
        notifications={notifications} 
        onRemove={removeNotification} 
      />

      {/* Welcome Modal */}
      {showWelcome && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-lg w-full">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-amber-900">
                  {t.welcomeTitle}
                </h2>
                <button
                  onClick={() => setShowWelcome(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                  aria-label={t.close}
                >
                  ×
                </button>
              </div>
              
              <p className="text-gray-700 mb-6 leading-relaxed">
                {t.welcomeText}
              </p>
              
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">{t.howToUse}</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-amber-700 font-bold text-sm">1</span>
                    </div>
                    <p className="text-gray-700">{t.instruction1}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-amber-700 font-bold text-sm">2</span>
                    </div>
                    <p className="text-gray-700">{t.instruction2}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-amber-700 font-bold text-sm">3</span>
                    </div>
                    <p className="text-gray-700">{t.instruction3}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-amber-700 font-bold text-sm">4</span>
                    </div>
                    <p className="text-gray-700">{t.instruction4}</p>
                  </div>
                </div>
              </div>
              
              <button
                onClick={() => setShowWelcome(false)}
                className="w-full bg-amber-700 hover:bg-amber-600 text-white py-3 px-4 rounded-lg font-semibold transition-colors"
              >
                {t.startExploring}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Instructions Modal */}
      {showInstructions && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-amber-900">
                  {t.instructions}
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
                  <p className="text-gray-700">{t.instruction1}</p>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                    <span className="text-amber-700 font-bold">2</span>
                  </div>
                  <p className="text-gray-700">{t.instruction2}</p>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                    <span className="text-amber-700 font-bold">3</span>
                  </div>
                  <p className="text-gray-700">{t.instruction3}</p>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                    <span className="text-amber-700 font-bold">4</span>
                  </div>
                  <p className="text-gray-700">{t.instruction4}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Page Info Modal */}
      {selectedPage && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setSelectedPage(null)}>
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-amber-900">
                    {language === 'en' && panoramaTranslations.en[selectedPage.id as keyof typeof panoramaTranslations.en]?.title 
                      ? panoramaTranslations.en[selectedPage.id as keyof typeof panoramaTranslations.en].title 
                      : selectedPage.title}
                  </h2>
                  <p className="text-sm text-amber-600">{t.catalogNumber} {selectedPage.catalogNumber}</p>
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
                      'page27': '/images/page27.jpg'
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
                {language === 'en' && panoramaTranslations.en[selectedPage.id as keyof typeof panoramaTranslations.en]?.description 
                  ? panoramaTranslations.en[selectedPage.id as keyof typeof panoramaTranslations.en].description 
                  : selectedPage.description}
              </p>
              
              {selectedPage.additionalInfo && (
                <div className="bg-amber-50 p-4 rounded border-l-4 border-amber-400 mb-4">
                  <h4 className="font-semibold text-amber-900 mb-2">{t.additionalInfo}</h4>
                  <p className="text-gray-700 text-sm">
                    {language === 'en' && panoramaTranslations.en[selectedPage.id as keyof typeof panoramaTranslations.en]?.additionalInfo 
                      ? panoramaTranslations.en[selectedPage.id as keyof typeof panoramaTranslations.en].additionalInfo 
                      : selectedPage.additionalInfo}
                  </p>
                </div>
              )}
              
              {selectedPage.additionalImages && selectedPage.additionalImages.length > 0 && (
                <div className="space-y-4">
                  <h4 className="font-semibold text-amber-900">{t.additionalImages}</h4>
                  {selectedPage.additionalImages.map((img, index) => (
                    <div key={index} className="bg-gray-50 p-4 rounded">
                      <img
                        src={img.url}
                        alt={img.description}
                        className="w-full max-w-sm mx-auto rounded border object-contain mb-2"
                        style={{ maxHeight: '200px' }}
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                        }}
                      />
                      <p className="text-gray-700 text-sm mb-2">{img.description}</p>
                      <a 
                        href={img.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-amber-600 hover:text-amber-800 text-sm underline"
                      >
                        {t.viewImage}
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
                  {t.viewOriginal}
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}