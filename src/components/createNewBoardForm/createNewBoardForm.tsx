import React from 'react';
import { useForm } from 'react-hook-form';
import removeUserBtn from '../../assets/removeUserBtn.svg';
import { CreateBoardModalForm, CreacteNewBoardModalProps } from '../../types/modalType';
import cl from './creacteNewBoardModal.module.scss';
import { useTranslate } from '../../hooks/useTranslate';
import Spinner from '../UI/Spinner/Spinner';

export default function CreateNewBoardForm(props: CreacteNewBoardModalProps) {
  const {
    submitHandler,
    isLoading,
    clickHandler,
    handleChange,
    autoCompContent,
    filteredUsers,
    onClickChooseUser,
    invitedUsers,
    removeUserOnClick,
    isUserLoading,
  } = props;
  // Use Translate
  const T = useTranslate();
  //Use Ref
  // const inputEl = useRef<HTMLInputElement>(null);
  // function blurHandler() {
  //   // inputEl!.current!.value = '';
  // }
  // Use Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateBoardModalForm>({ criteriaMode: 'all', mode: 'onChange' });
  // Submit handler
  ///////////////////////////
  const onSubmit = handleSubmit(submitHandler);
  return (
    <div className={cl.modal__container} onClick={clickHandler}>
      {isUserLoading && <Spinner typeOfModalView="center"></Spinner>}
      {!isUserLoading && (
        <div className={cl.modal__content}>
          <form className={cl.form} onSubmit={onSubmit}>
            <div className={cl.form__group}>
              <input
                type="text"
                id={cl.title}
                className={cl.form__input}
                placeholder=" "
                autoComplete="off"
                defaultValue={''}
                {...register('title', {
                  required: { value: true, message: `${T('SignUpForm.formRequireMsg')}` },
                  pattern: {
                    value: /^[a-zA-Zа-я\s]+$/i,
                    message: `${T('SignUpForm.formOnlyLetter')}`,
                  },
                  minLength: { value: 2, message: `${T('SignUpForm.formMinLegthNameMsg')}` },
                })}
              ></input>
              <label htmlFor={cl.title} className={cl.form__label}>
                {T('Modal.title')}
              </label>
              {errors.title?.types &&
                Object.entries(errors.title?.types).map(([type, message]) => (
                  <p key={type} className={cl.error}>
                    {message}
                  </p>
                ))}
            </div>
            <div className={cl.form__buttons}>
              {isLoading && <Spinner></Spinner>}
              <input
                type="submit"
                className={cl.form__button}
                value={T('Modal.createBoardBtn')}
                disabled={isLoading ? true : false}
              ></input>
              <input
                type="button"
                id="cancelBtn"
                className={cl.form__button}
                value={T('Modal.cancelBtn')}
                disabled={isLoading ? true : false}
              ></input>
            </div>
          </form>
          <div className={cl.autocomplete__container}>
            <input
              type="text"
              id={cl.autoComplete}
              className={cl.form__input}
              placeholder=" "
              autoComplete="off"
              defaultValue={autoCompContent}
              onChange={handleChange}
              // ref={inputEl}
              // onBlur={blurHandler}
            ></input>
            <label htmlFor={cl.autoComplete} className={cl.form__label}>
              {T('Modal.inviteUser')}
            </label>
            {autoCompContent && filteredUsers!.length > 0 && (
              <div className={cl.usersContainer} onClick={onClickChooseUser}>
                {filteredUsers?.map((user) => {
                  return <p key={user._id}>{user.login}</p>;
                })}
              </div>
            )}
            {
              <div className={cl.invitedUsersContainer} onClick={removeUserOnClick}>
                {invitedUsers?.map((invitedUsers) => {
                  return (
                    <div key={invitedUsers} className={cl.invitedUser}>
                      <p>{invitedUsers}</p>
                      <img className="removeUserBtn" src={removeUserBtn}></img>
                    </div>
                  );
                })}
              </div>
            }
          </div>
        </div>
      )}
    </div>
  );
}
