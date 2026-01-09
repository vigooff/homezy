import { Logo } from "../atoms/Logo";
import { SocialIcon } from "../atoms/SocialIcon";
import { FooterData } from "../../types/footer";
import footerDataJson from "../../data/footer.json";

const footerData = (footerDataJson as unknown) as FooterData;

export const FooterBrand = () => {
  return (
    <div className="flex flex-col opacity-100" style={{ width: '358px', height: '208px', gap: '24px' }}>
      <div style={{ width: '190px', height: '50px' }}>
        <Logo />
      </div>
      
      <p className="font-hanken font-light text-base text-[#475467]" 
         style={{ width: '358px', height: '78px', lineHeight: '26px' }}>
        {footerData.brand.description}
      </p>

      <div className="flex items-center" style={{ width: '200px', height: '32px', gap: '24px' }}>
        {footerData.brand.socials.map((type: string) => (
          <SocialIcon key={type} type={type} />
        ))}
      </div>
    </div>
  );
};