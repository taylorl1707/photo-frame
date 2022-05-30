import React, { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import downloadjs from 'downloadjs';
import './styles/App.scss';

import ImageEdit from './components/ImageEdit';
import ImageList from './components/ImageList';

function App() {
  const imageRef = useRef<HTMLDivElement>(null);

  const [fileArray, setFileArray] = useState<File[]>([]);
  const [activeFile, setActiveFile] = useState(0);

  const uploadMultipleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newFileArray = Array.from(fileArray);

    for (let i = 0; i < files.length; i++) {
      if (fileArray.filter((file) => file.name === files[i].name && file.size === files[i].size).length === 0) {
        newFileArray.push(files[i]);
      }
    }

    setFileArray(newFileArray);
  };

  const removeFile = (file: File) => {
    const index = fileArray.indexOf(file);

    if (index !== -1) {
      const newFileArray = Array.from(fileArray);
      newFileArray.splice(index, 1);
      setFileArray(newFileArray);

      if (index === activeFile) {
        setActiveFile(0);
      }
    }
  };

  const handleDownload = async () => {
    if (!imageRef?.current) return;
    const canvas = await html2canvas(imageRef?.current);
    const dataURL = canvas.toDataURL('image/jpeg');
    downloadjs(dataURL, `${new Date().toString()}.jpeg`, 'image/jpeg');
  };

  const onDownload = async () => {
    await handleDownload();
  };

  const onDownloadAll = () => {};

  return (
    <div className="App">
      <ImageEdit
        image={activeFile === -1 ? null : fileArray[activeFile]}
        onDownload={onDownload}
        onDownloadAll={onDownloadAll}
        ref={imageRef}
      />
      <ImageList
        images={fileArray}
        onFileChange={uploadMultipleFiles}
        onRemoveFile={removeFile}
        activeFile={activeFile}
        setActiveFile={setActiveFile}
      />
    </div>
  );
}

export default App;
