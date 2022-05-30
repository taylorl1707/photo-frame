export interface FilterObject {
  [x: string]: Array<FilterType>;
}

export interface FilterType {
  url: string;
  name: string;
}

export const Filters: FilterObject = {
  background: [
    { url: `${process.env.PUBLIC_URL}/assets/backgrounds/room1.jpg`, name: 'Room1' },
    { url: `${process.env.PUBLIC_URL}/assets/backgrounds/room2.jpg`, name: 'Room2' },
  ],
  frame: [
    { url: `${process.env.PUBLIC_URL}/assets/frames/frame1.png`, name: 'Frame1' },
    { url: `${process.env.PUBLIC_URL}/assets/frames/frame2.png`, name: 'Frame2' },
    { url: `${process.env.PUBLIC_URL}/assets/frames/frame3.png`, name: 'Frame3' },
    { url: `${process.env.PUBLIC_URL}/assets/frames/frame4.png`, name: 'Frame4' },
  ],
  style: [],
};
