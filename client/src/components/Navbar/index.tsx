import { useEffect, useState } from "react";
import logo from "../../images/logo.svg";
import dropdownBar from "../../images/bar.svg";
import "./navbar.scss";
import { Link } from "react-router-dom";
import { IoMdCloseCircle } from "react-icons/io";
import Select from "react-select";
import { locales, dynamicActivate } from "../../i18n";
import { Trans } from "@lingui/macro";
import useMediaQuery from "../../hooks/usemediaQuery";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const options = [
    { value: "en", label: locales.en },
    { value: "ar", label: locales.ar },
  ];
  const [currentLocale, setCurrentLocale] = useState(options[0]);

  const isDesktop = useMediaQuery("(min-width: 1250px)");

  function changeLanguage(selectedOption: any) {
    setCurrentLocale(selectedOption);
    dynamicActivate(selectedOption.value);
  }

  const customStyles = {
    option: (defaultStyles: any, state: any) => ({
      ...defaultStyles,
      padding: "12px 12px",
      color: state.isSelected ? "#ffff" : "#009985",
      backgroundColor: state.isSelected ? "#009985" : "#ffff",
      fontSize: "14px",
      cursor: "pointer",
      ":active": {
        ...defaultStyles[":active"],
        backgroundColor: "#ffff",
      },
    }),

    control: (defaultStyles: any) => ({
      ...defaultStyles,
      padding: "2px",
      border: "0.5px solid #009985",
      boxShadow: "none",
      borderRadius: "8px",
      width: "117px",
      cursor: "pointer",
      ":hover": {
        ...defaultStyles[":hover"],
        border: "0.5px solid #009985",
      },
    }),
    singleValue: (defaultStyles: any) => ({
      ...defaultStyles,
      color: "#009985",
    }),
    dropdownIndicator: (defaultStyles: any) => ({
      ...defaultStyles,
      color: "#009985 !important",
    }),
    menuList: (defaultStyles: any) => ({
      ...defaultStyles,
      padding: "0",
      borderRadius: "5px",
    }),
  };
  return (
    <>
      <header className="header">
        <Link to={"/"}>
          {" "}
          <img
            className="header__logo"
            src={logo}
            alt="Open source community Saudia Arabia logo"
          />
        </Link>

        {isDesktop || isOpen ? (
          <>
            <div
              className={
                !isOpen
                  ? "header__navbar-container"
                  : "header__sidebar-container"
              }
            >
              {isOpen && (
                <div className="sidebar-logo">
                  <Link to={"/"}>
                    {" "}
                    <img
                      className="sidebar-logo__image"
                      src={logo}
                      alt="Open source community Saudia Arabia logo"
                    />
                  </Link>
                  <button
                    aria-label="close"
                    onClick={() => {
                      setIsOpen(false);
                    }}
                    className="icon-button"
                  >
                    <IoMdCloseCircle className="sidebar-logo__close-icon" />
                  </button>
                </div>
              )}
              <nav className="navbar">
                <Link className="navlink" to="/">
                  <Trans>Home</Trans>
                </Link>
                <Link className="navlink" to="/">
                  <Trans>Courses</Trans>
                </Link>
                <Link className="navlink" to="/">
                  <Trans>About</Trans>
                </Link>
                <Link className="navlink" to="/">
                  <Trans>Faq</Trans>
                </Link>
                <Link className="navlink" to="/">
                  <Trans>Blog</Trans>
                </Link>
              </nav>

              <div className="auth-btn">
                <Select
                  onChange={changeLanguage}
                  defaultValue={currentLocale}
                  options={options}
                  styles={customStyles}
                  isSearchable={false}
                />

                <div className="btns">
                  <Link to="/login" className="auth-btn-login">
                    <Trans>Log In</Trans>
                  </Link>
                  <Link to="/signup" className="auth-btn-signup">
                    <Trans> Sign Up</Trans>
                  </Link>
                </div>
              </div>
            </div>
          </>
        ) : (
          <button
            aria-label="menu"
            onClick={() => {
              setIsOpen(true);
            }}
            className="icon-button"
          >
            <img src={dropdownBar} alt="menu" />
          </button>
        )}
      </header>
    </>
  );
}
