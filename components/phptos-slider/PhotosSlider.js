// pages/index.js
import { useState, useEffect } from 'react';
import Slider from 'react-slick';
import classes from "@/components/phptos-slider/PhotosSlider.module.css";

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
    slidesToShow: 2,
    slidesToScroll: 2,
    autoplay: false,
    adaptiveHeight: true,
    accessibility: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    // initialSlide: 0,
    // centerMode: true,
    responsive: [
      {
        breakpoint: 1024,
        // settings: {
        //   slidesToShow: 3,
        //   slidesToScroll: 3,
        //   infinite: true,
        //   dots: true
        // }
      },
      {
        breakpoint: 600,
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

  let div;
  if (loading) {
    div = <div style={{ textAlign: 'center', padding: '50px' }}>Loading photos...</div>;
  }

  if (photos.length === 0) {
    div = <div style={{ textAlign: 'center', padding: '50px' }}>No photos to display.</div>;
  }

  return (
    <section id="photos" className={classes.section}>
      {div ? div :
        <div className="slider-container">
          <h1 style={{ textAlign: 'center' }}>גלריית תמונות</h1>
          <Slider {...settings}>
            {photos.map((photo) => (
              <div key={photo.id}>
                <img
                  src={`${photo.baseUrl}=w1200-h900`}
                  alt={photo.filename}
                  style={{ width: '100%', height: 'auto', maxHeight: '100%', borderRadius: '10px', objectFit: 'contain', aspectRatio: `${photo.mediaMetadata.width} / ${photo.mediaMetadata.height}` }}
                />
              </div>
            ))}
          </Slider>
        </div>
      }
    </section>
  );
}