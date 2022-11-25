export type ModalProp = {
  handler: (e: React.MouseEvent<HTMLParagraphElement>) => void;
};

export type CreateBoardModalForm = {
  title: string;
  owner?: string;
  users?: string[];
};

export type CreacteNewBoardModalProps = {
  submitHandler: (data: CreateBoardModalForm) => void;
  clickHandler: (e: React.MouseEvent<HTMLInputElement>) => void;
  isLoading: boolean;
};
