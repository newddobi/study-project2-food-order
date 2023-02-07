import { useRef, useState } from "react";
import { useDaumPostcodePopup } from "react-daum-postcode";
import classes from "./Checkout.module.css";

const isEmpty = (value) => value.trim() === "";
const isFiveChars = (value) => value.trim().length === 5;

const Checkout = (props) => {
  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalCodeInputRef = useRef();
  const cityInputRef = useRef();

  const open = useDaumPostcodePopup();

  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }
    console.log({ fullAddress, data }); // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
    streetInputRef.current.value = fullAddress;
    postalCodeInputRef.current.value = data.zonecode;
  };

  const addressClickHandler = () => {
    open({ onComplete: handleComplete });
  };

  const [formInputsValidity, setFormInputsValidity] = useState({
    name: true,
    street: true,
    city: true,
    postalCode: true,
  });

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostalCode = postalCodeInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredCityIsValid = !isEmpty(enteredCity);
    const enteredPostalCodeIsValid = isFiveChars(enteredPostalCode);

    setFormInputsValidity({
      name: enteredNameIsValid,
      street: enteredStreetIsValid,
      city: enteredCityIsValid,
      postalCode: enteredPostalCodeIsValid,
    });

    const formIsValid =
      enteredNameIsValid &&
      enteredStreetIsValid &&
      enteredCityIsValid &&
      enteredPostalCodeIsValid;

    if (!formIsValid) {
      return;
    }

    props.onConfirm({
      name: enteredName,
      street: enteredStreet,
      city: enteredCity,
      postalCode: enteredPostalCode,
    });
  };

  const nameControlClasses = `${classes.control} ${
    formInputsValidity.name ? "" : classes.invalid
  }`;
  const streetControlClasses = `${classes.control} ${
    formInputsValidity.street ? "" : classes.invalid
  }`;
  const postalCodeControlClasses = `${classes.control} ${
    formInputsValidity.postalCode ? "" : classes.invalid
  }`;
  const cityControlClasses = `${classes.control} ${
    formInputsValidity.city ? "" : classes.invalid
  }`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameControlClasses}>
        <label htmlFor="name">받으시는 분</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!formInputsValidity.name && <p>받으시는 분을 입력해주세요</p>}
      </div>
      <div className={streetControlClasses} onClick={addressClickHandler}>
        <label htmlFor="street">주소</label>
        <input type="text" id="street" ref={streetInputRef} disabled />
        {!formInputsValidity.street && <p>주소를 입력해주세요</p>}
      </div>
      <div className={postalCodeControlClasses}>
        <label htmlFor="postal">우편번호</label>
        <input type="text" id="postal" ref={postalCodeInputRef} disabled />
        {!formInputsValidity.postalCode && (
          <p>유효한 우편번호를 입력해주세요 (5글자)!</p>
        )}
      </div>
      <div className={cityControlClasses}>
        <label htmlFor="city">상세주소</label>
        <input type="text" id="city" ref={cityInputRef} />
        {!formInputsValidity.city && <p>상세주소를 입력해주세요</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
