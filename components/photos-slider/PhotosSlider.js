// components/photos-slider/PhotosSlider.js
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import classes from '@/components/photos-slider/PhotosSlider.module.css';

// Dynamically import react-slick and extract the default export
const Slider = dynamic(() => import('react-slick').then(mod => mod.default), { ssr: false });

export default function PhotosSlider() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPhotos = async () => {
    try {
      const response = await fetch('/api/photos');
      const data = await response.json();
      if (data.photos) {
        setPhotos(data.photos);
      } else {
        console.error('No photos found');
      }
    } catch (error) {
      console.error('Error fetching photos:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: true,
    adaptiveHeight: true,
    accessibility: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    responsive: [
      // {
      //   breakpoint: 1024,
      //   settings: {
      //     slidesToShow: 3,
      //     slidesToScroll: 3,
      //   }
      // },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ],
    className: 'center',
  };

  let content;
  if (loading) {
    content = <div style={{ textAlign: 'center', padding: '50px' }}>טוען תמונות</div>;
  } else if (photos.length === 0) {
    content = <div style={{ textAlign: 'center', padding: '50px' }}>אין תמונות לתצוגה</div>;
  } else {
    content = (
      <div className="slider-container">
        <h1 style={{ textAlign: 'center' }}>גלריית תמונות</h1>
        <Slider {...settings}>
          {photos.map((photo) => (
            <div key={photo.id}>
              <img
                src={`${photo.baseUrl}=w1200-h900`}
                alt={photo.filename}
                style={{
                  width: '100%',
                  height: 'auto',
                  maxHeight: '100%',
                  borderRadius: '10px',
                  objectFit: 'contain',
                  aspectRatio: `${photo.mediaMetadata.width} / ${photo.mediaMetadata.height}`
                }}
              />
            </div>
          ))}
        </Slider>
      </div>
    );
  }

  return (
    <section id="photos" className={classes.section}>
      {content}
    </section>
  );
}