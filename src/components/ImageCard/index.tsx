import classNames from 'classnames';
import './style.scss';

type ImageCardProps = {
  imgUrl: string;
  active?: boolean;
  setActive?: () => void;
  removeFile?: () => void;
};

const ImageCard = ({ imgUrl, active, setActive, removeFile }: ImageCardProps) => {
  return (
    <div className={classNames('image-card', { active })} onClick={setActive} onDoubleClick={removeFile}>
      <img src={imgUrl} alt="img" />
    </div>
  );
};

export default ImageCard;
