import React from 'react';
import cl from './Searchbar.module.scss';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { SearchbarSlice } from '../../../store/reducers/SearchbarReducer';

const Searchbar = () => {
  const { searchbar } = useAppSelector((state) => state.SearchbarReducer);
  const { setSearchbar } = SearchbarSlice.actions;
  const dispatch = useAppDispatch();

  return (
    <form
      className={cl.searchbar}
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <input className={cl.searchbar__submit} type="submit" value="" />
      <input
        className={cl.searchbar__line}
        type="search"
        onInput={(e) => dispatch(setSearchbar(e.currentTarget.value))}
        value={searchbar}
        placeholder="Search"
        autoComplete="off"
        autoFocus
      />
    </form>
  );
};

export default Searchbar;
