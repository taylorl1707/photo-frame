import { useRef } from 'react';
import ImageCard from '../ImageCard';
import './style.scss';

type ImageListProps = {
  images: File[];
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  activeFile: number;
  setActiveFile: React.Dispatch<React.SetStateAction<number>>;
  onRemoveFile: (file: File) => void;
};

const ImageList = ({ images, onFileChange, activeFile, setActiveFile, onRemoveFile }: ImageListProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="image-list-container">
      <div className="image-list">
        {images.map((img, index) => (
          <ImageCard
            imgUrl={URL.createObjectURL(img)}
            key={img.name}
            active={activeFile === index}
            removeFile={() => {
              onRemoveFile(img);
              if (inputRef.current) {
                inputRef.current.files = null;
                inputRef.current.value = '';
              }
            }}
            setActive={() => {
              setActiveFile(index);
            }}
          />
        ))}

        <div>
          <input type="file" id="file-btn" onChange={onFileChange} hidden multiple ref={inputRef} />

          <label htmlFor="file-btn" className="file-add-btn">
            +
          </label>
        </div>
      </div>
    </div>
  );
};

export default ImageList;
