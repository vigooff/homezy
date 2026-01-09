import { NavLink } from "../atoms/NavLink";

interface NavGroupProps {
  title: string;
  links: string[];
  columns?: number;
  width: string;
}

export const FooterNavGroup = ({ title, links, columns = 1, width }: NavGroupProps) => {
  return (
    <div className="flex flex-col opacity-100" style={{ width: width, height: '330px', gap: '32px' }}>
      <span className="font-hanken font-normal text-[#98A2B3] text-sm uppercase tracking-wider">
        {title}
      </span>
      
      <div 
        className={`grid opacity-100 ${columns === 2 ? 'grid-cols-2' : 'grid-cols-1'}`} 
        style={{ gap: columns === 2 ? '80px' : '16px' }}
      >
        <div className="flex flex-col" style={{ gap: '16px' }}>
          {links.slice(0, Math.ceil(links.length / columns)).map((link) => (
            <div key={link} style={{ height: '20px', maxWidth: '182px' }}>
              <NavLink label={link} href="#" />
            </div>
          ))}
        </div>
        
        {columns === 2 && (
          <div className="flex flex-col" style={{ gap: '16px' }}>
            {links.slice(Math.ceil(links.length / columns)).map((link) => (
              <div key={link} style={{ height: '20px', maxWidth: '149px' }}>
                <NavLink label={link} href="#" />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};