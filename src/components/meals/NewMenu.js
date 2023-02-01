import React, { useRef } from "react";
import Button from "../UI/Button";
import Modal from "../UI/Modal";
import classes from "./NewMenu.module.css";

const NewMenu = (props) => {
  const nameInputRef = useRef();
  const descriptionInputRef = useRef();
  const amountInputRef = useRef();

  const submitHandler = () => {
    const enteredName = nameInputRef.current.value;
    const enteredDescription = descriptionInputRef.current.value;
    const enteredAmount = amountInputRef.current.value;

    if (!enteredName) {
      nameInputRef.current.focus();
      return;
    }
    if (!enteredDescription) {
      descriptionInputRef.current.focus();
      return;
    }
    if (enteredAmount.trim().length === 0) {
      amountInputRef.current.focus();
      return;
    }

    props.onAddClick({
      id: new Date().getTime(),
      name: enteredName,
      description: enteredDescription,
      price: +enteredAmount,
    });

    props.onClose();
  };

  return (
    <Modal onClose={props.onClose}>
      <div className={classes["new-menu"]}>
        <div className={classes.controls}>
          <div className={classes.control}>
            <label>메뉴명</label>
            <input type="text" ref={nameInputRef} />
          </div>
          <div className={classes.control}>
            <label>설명</label>
            <input type="text" ref={descriptionInputRef} />
          </div>
          <div className={classes.control}>
            <label>가격</label>
            <input type="number" ref={amountInputRef} />
          </div>
        </div>
        <div className={classes.actions}>
          <Button onClick={props.onClose}>취소</Button>
          <Button onClick={submitHandler}>등록</Button>
        </div>
      </div>
    </Modal>
  );
};

export default NewMenu;
