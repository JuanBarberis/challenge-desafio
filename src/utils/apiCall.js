import axios from 'axios';

const getMarsPhotos = async (roverName, sol, apiKey, setPhotos, setLoading, setError) => {
    setLoading(true);
    setError(false);
  
    fetch(`https://mars-photos.herokuapp.com/api/v1/rovers/${roverName}/photos?sol=${sol}&api_key=${apiKey}`)
      .then(res => res.json())
      .then(response => {
        setPhotos(response.photos);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching Mars photos:', error);
        setError(true);
        setLoading(false);
      });
  };

export default getMarsPhotos;
