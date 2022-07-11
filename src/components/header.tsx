import Styles from "./header.module.css";
import Logo from "../../images/Logo.svg";

export function Header() {
  return (
    <div className={Styles.Header}>
      <img src={Logo} alt="Logo Todo" />
    </div>
  );
}
