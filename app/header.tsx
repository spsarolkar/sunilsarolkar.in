interface HeaderProps {
    title: string;
    subtitle?: string;
    eyebrow?: string;
}
export default function Header({ title, subtitle, eyebrow }: HeaderProps) {
    return (<header className="page-heading">
      {eyebrow && <p className="eyebrow rust">{eyebrow}</p>}
      <h1>{title}</h1>
      {subtitle && <p className="page-intro">{subtitle}</p>}
    </header>);
}
