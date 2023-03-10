import React, { useRef, useState } from "react";
import { useDaumPostcodePopup } from "react-daum-postcode";
import { userType } from "../../types/order";
import classes from "./Checkout.module.css";

type DaumPostCodeType = {
  address: string;
  addressType: string;
  bname: string;
  buildingName: string;
  zonecode: string;
};

const isEmpty = (value: string) => value.trim() === "";
const isFiveChars = (value: string) => value.trim().length === 5;

const Checkout: React.FC<{
  onConfirm: (userData: userType) => void;
  onCancel: () => void;
}> = (props) => {
  const nameInputRef = useRef<HTMLInputElement>(null);
  const streetInputRef = useRef<HTMLInputElement>(null);
  const postalCodeInputRef = useRef<HTMLInputElement>(null);
  const cityInputRef = useRef<HTMLInputElement>(null);

  const open = useDaumPostcodePopup();

  const handleComplete = (data: DaumPostCodeType) => {
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

    streetInputRef.current!.value = fullAddress;
    postalCodeInputRef.current!.value = data.zonecode;
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

  const confirmHandler = (event: React.FormEvent) => {
    event.preventDefault();

    const enteredName = nameInputRef.current!.value;
    const enteredStreet = streetInputRef.current!.value;
    const enteredPostalCode = postalCodeInputRef.current!.value;
    const enteredCity = cityInputRef.current!.value;

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
        <label htmlFor="name">???????????? ???</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!formInputsValidity.name && <p>???????????? ?????? ??????????????????</p>}
      </div>
      <div className={streetControlClasses} onClick={addressClickHandler}>
        <label htmlFor="street">??????</label>
        <input type="text" id="street" ref={streetInputRef} disabled />
        {!formInputsValidity.street && <p>????????? ??????????????????</p>}
      </div>
      <div className={postalCodeControlClasses}>
        <label htmlFor="postal">????????????</label>
        <input type="text" id="postal" ref={postalCodeInputRef} disabled />
        {!formInputsValidity.postalCode && (
          <p>????????? ??????????????? ?????????????????? (5??????)!</p>
        )}
      </div>
      <div className={cityControlClasses}>
        <label htmlFor="city">????????????</label>
        <input type="text" id="city" ref={cityInputRef} />
        {!formInputsValidity.city && <p>??????????????? ??????????????????</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          ??????
        </button>
        <button className={classes.submit}>????????????</button>
      </div>
    </form>
  );
};

export default Checkout;
