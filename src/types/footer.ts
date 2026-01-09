export interface FooterSection {
  title: string;
  width: string;
  columns: number;
  links: string[];
}

export interface FooterBrandData {
  description: string;
  socials: string[];
}

export interface FooterData {
  brand: FooterBrandData;
  sections: FooterSection[];
}