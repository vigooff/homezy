import React from "react";

interface NavLinkProps {
  href: string;
  label: string;
  hasDropdown?: boolean;
  className?: string;
  noPadding?: boolean;
}

export const NavLink = ({
  href,
  label,
  hasDropdown,
  className = "",
  noPadding = false,
}: NavLinkProps) => {
  return (
    <div
      className={`flex items-center gap-2 cursor-pointer group whitespace-nowrap ${noPadding ? '' : 'px-6'} ${className}`}
      style={noPadding ? { paddingLeft: 0, paddingRight: 0 } : {}}
    >
      <a
        href={href}
        className="text-[16px] font-hanken font-medium text-[#101828] group-hover:text-purple-600 transition-colors no-underline"
      >
        {label}
      </a>

      {hasDropdown && (
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          className="group-hover:text-purple-600 transition-colors flex-shrink-0"
        >
          <path
            d="M3 4.5L6 7.5L9 4.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </div>
  );
};