// import { useState } from 'react';
import classNames from 'classnames';
import React, { useMemo, useState } from 'react';
import { Filters, FilterType } from '../../constants/filters';
import ImageCard from '../ImageCard';
import './style.scss';

type ImageEditProps = {
  image: File | null;
  onDownload: () => void;
  onDownloadAll: () => void;
};

const filterTabs = [
  { tab: 'background', name: 'Background' },
  { tab: 'frame', name: 'Frame' },
  { tab: 'style', name: 'Style' },
];

type ImageFilterType = {
  [x: string]: number;
};

const ImageEdit = React.forwardRef<HTMLDivElement, ImageEditProps>(({ image, onDownload, onDownloadAll }, ref) => {
  const [filters, setFilters] = useState<ImageFilterType>({ background: 0, frame: 0 });
  const [activeFilter, setActiveFilter] = useState(filterTabs[0].tab);

  const { backgroundUrl, frameUrl } = useMemo(() => {
    return { backgroundUrl: Filters.background[filters.background]?.url, frameUrl: Filters.frame[filters.frame]?.url };
  }, [filters]);

  return (
    <div className="image-edit-view">
      <div className="actions">
        <button
          className="action"
          onClick={() => {
            image && onDownload();
          }}
        >
          SAVE
        </button>
        <button className="action" onClick={onDownloadAll}>
          SAVE ALL
        </button>
      </div>
      <div className="image-preview" style={{ backgroundImage: `url(${backgroundUrl})` }} ref={ref}>
        <div className="images">
          {image && <img src={URL.createObjectURL(image)} alt="selfie" className="photo" />}
          {frameUrl && <img src={frameUrl} alt="frame" className="frame-image" />}
        </div>
      </div>
      <div className="image-toolbar">
        <div className="tab-control">
          {filterTabs.map((tab) => {
            return (
              <div
                className={classNames('tab', { active: activeFilter === tab.tab })}
                key={tab.tab}
                onClick={() => setActiveFilter(tab.tab)}
              >
                {tab.name}
              </div>
            );
          })}
        </div>
        <div className="filters-container">
          <div className="filters">
            {Filters[activeFilter].map((filter: FilterType, index) => (
              <ImageCard
                imgUrl={filter.url}
                key={filter.name}
                active={filters[activeFilter] === index}
                setActive={() => {
                  setFilters({ ...filters, [activeFilter]: index });
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});

export default ImageEdit;
