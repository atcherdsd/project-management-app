import React from 'react';
import ReactDOM from 'react-dom';

const modalRoot = document.getElementById('modal-root') as HTMLElement;
type Props = {
  [key: string]: JSX.Element;
};
export default class Modal extends React.Component<Props> {
  el: HTMLDivElement;
  constructor(props: Props) {
    super(props);
    this.el = document.createElement('div');
  }

  componentDidMount() {
    modalRoot.appendChild(this.el);
    document.body.style.overflow = 'hidden';
  }

  componentWillUnmount() {
    modalRoot.removeChild(this.el);
    document.body.style.overflow = '';
  }

  render() {
    return ReactDOM.createPortal(this.props.children, this.el);
  }
}
