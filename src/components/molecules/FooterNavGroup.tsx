import { NavLink } from "../atoms/NavLink";

interface NavGroupProps {
  title: string;
  links: string[];
  columns?: number;
  width: string;
}

export const FooterNavGroup = ({ title, links, columns = 1, width }: NavGroupProps) => {
  return (
    <div className="footer-nav-group-container flex flex-col opacity-100" style={{ width: width, gap: '32px' }}>
      <span className="footer-nav-title font-hanken font-normal text-[#98A2B3] text-sm uppercase tracking-wider">
        {title}
      </span>
      
      <div 
        className={`footer-nav-grid grid opacity-100 ${columns === 2 ? 'grid-cols-2' : 'grid-cols-1'}`} 
        style={{ gap: columns === 2 ? '80px' : '16px' }}
      >
        <div className="flex flex-col footer-nav-col" style={{ gap: '16px' }}>
          {links.slice(0, Math.ceil(links.length / columns)).map((link) => (
            <div key={link} className="footer-nav-link-item" style={{ height: '20px', maxWidth: '182px' }}>
              <NavLink label={link} href="#" />
            </div>
          ))}
        </div>
        
        {columns === 2 && (
          <div className="flex flex-col footer-nav-col" style={{ gap: '16px' }}>
            {links.slice(Math.ceil(links.length / columns)).map((link) => (
              <div key={link} className="footer-nav-link-item" style={{ height: '20px', maxWidth: '149px' }}>
                <NavLink label={link} href="#" />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};