import { MouseEventHandler } from 'react';

export type ModalProp = {
  handler: (e: React.MouseEvent<HTMLParagraphElement>) => void;
};
