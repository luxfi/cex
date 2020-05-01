import React from 'react';
import IconCross from '../Icons/IconCross';
import s from './Content.module.css';

const Content = ({ movie, onClose }) => (
  <div className={s.content}>
    <div className={s.content__background}>
      <div className={s.content__background__shadow} />
      <div
        className={s.content__background__image}
        style={{ 'background-image': `url(${movie.imageBg})` }}
      />
    </div>
    <div className={s.content__area}>
      <div className={s.content__area__container}>
        <div className={s.content__title}>{movie.title}</div>
        <div className={s.content__description}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
          et euismod ligula. Morbi mattis pretium eros, ut mollis leo tempus
          eget. Sed in dui ac ipsum feugiat ultricies. Phasellus vestibulum enim
          quis quam congue, non fringilla orci placerat. Praesent sollicitudin
        </div>
      </div>
      <button className={s.content__close} onClick={onClose}>
        <IconCross />
      </button>
    </div>
  </div>
);

export default Content;
