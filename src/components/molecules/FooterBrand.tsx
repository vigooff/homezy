import { Logo } from "../atoms/Logo";
import { SocialIcon } from "../atoms/SocialIcon";
import { FooterData } from "../../types/footer";
import footerDataJson from "../../data/footer.json";

const footerData = (footerDataJson as unknown) as FooterData;

export const FooterBrand = () => {
  return (
    <div className="footer-brand-container flex flex-col opacity-100" style={{ width: '358px', gap: '24px' }}>
      <div className="footer-logo-wrapper" style={{ width: '190px', height: '50px' }}>
        <Logo />
      </div>
      
      <p className="footer-brand-desc font-hanken font-light text-base text-[#475467]" 
         style={{ width: '358px', lineHeight: '26px' }}>
        {footerData.brand.description}
      </p>

      <div className="footer-social-wrapper flex items-center" style={{ gap: '24px' }}>
        {footerData.brand.socials.map((type: string) => (
          <div key={type} className="footer-social-icon-item">
            <SocialIcon type={type} />
          </div>
        ))}
      </div>
    </div>
  );
};