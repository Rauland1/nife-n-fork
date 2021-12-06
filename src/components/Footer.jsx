import Link from "next/link";
import footerStyles from "../../styles/Footer.module.scss";
const Footer = () => {
  return (
    <footer className={footerStyles.footer} id="footer">
      <div className={footerStyles.footerCentre}>
        <div>&copy; {new Date().getFullYear()} Nife & Fork</div>
        <div className={footerStyles.links}>
          <Link href="/">Privacy Policy</Link>
          <div className={footerStyles.divider}> | </div>
          <Link href="/">Terms and Conditions</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
