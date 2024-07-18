import React, { useState, ChangeEvent } from 'react';

const ImageUpload: React.FC = () => {
  const [image, setImage] = useState<File | null>(null);
  const [propertyId, setPropertyId] = useState<string>('');
  const [uploadedImagePath, setUploadedImagePath] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  const handlePropertyIdChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPropertyId(e.target.value);
  };

  const handleUpload = async () => {
    if (!image || !propertyId) {
      setError('Selecione uma imagem e informe o ID da propriedade.');
      return;
    }

    const formData = new FormData();
    formData.append('image', image);
    formData.append('propertyId', propertyId); // Enviar o ID da propriedade
    

    try {
      const response = await fetch('http://localhost:5000/properties/upload', {
        method: 'POST',
        body: formData,
        headers: {
            'property-id': propertyId,
          },
      });

      if (!response.ok) {
        throw new Error('Erro ao enviar imagem');
      }

      const data = await response.json();
      console.log('Imagem enviada:', data.imgUrl);
      console.log('Imagem enviada front:', data);
      setUploadedImagePath(data.imagePath);

      // Limpar campos após o upload
      setImage(null);
      setPropertyId('');
      setError('');
    } catch (error) {
      console.error('Erro ao enviar imagem:', error);
      setError('Erro ao enviar imagem. Verifique o console para mais detalhes.');
    }
  };

  return (
    <div>
      <h2>Upload de Imagem</h2>
      <div>
        <input type="file" onChange={handleFileChange} />
      </div>
      <div>
        <input type="text" placeholder="ID da Propriedade" value={propertyId} onChange={handlePropertyIdChange} />
      </div>
      <div>
        <button onClick={handleUpload}>Enviar Imagem</button>
      </div>
      {uploadedImagePath && (
        <div>
          <h3>Imagem Enviada:</h3>
          <img src={`http://localhost:5000${uploadedImagePath}`} alt="Imagem Enviada" style={{ maxWidth: '100%' }} />
        </div>
      )}
      {error && (
        <div style={{ color: 'red' }}>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
