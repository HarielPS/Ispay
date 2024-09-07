import { Badge } from "primereact/badge";

const itemRenderer = (item) => (
  <a className="flex align-items-center p-menuitem-link">
    <span className={item.icon} />
    <span className="mx-2">{item.label}</span>
    {item.badge && <Badge className="ml-auto" value={item.badge} />}
    {item.shortcut && (
      <span className="ml-auto border-1 surface-border border-round surface-100 text-xs p-1">
        {item.shortcut}
      </span>
    )}
  </a>
);

export const any = [
  {
    label: "Home",
    icon: "pi pi-home",
    route: '/',  // Ruta hacia la página principal
    sectionId: 'hero-section',  // ID de la sección del Hero
  },
  {
    label: "Features",
    icon: "pi pi-star",
    route: '/',  // Si estamos en la home, hacemos scroll a la sección Features
    sectionId: 'features-section',
  },
  {
    label: "Our Team",
    icon: "pi pi-users",
    route: '/',  // Si estamos en la home, hacemos scroll a la sección Our Team
    sectionId: 'team-section',
  },
  {
    label: "Testimonials",
    icon: "pi pi-comments",
    route: '/',  // Si estamos en la home, hacemos scroll a la sección Testimonials
    sectionId: 'testimonials-section',
  },
  {
    label: "FAQs",
    icon: "pi pi-question-circle",
    route: '/',  // Si estamos en la home, hacemos scroll a la sección FAQs
    sectionId: 'faq-section',
  },
  {
    label: "Contact Us",
    icon: "pi pi-envelope",
    route: '/',  // Si estamos en la home, hacemos scroll a la sección Footer
    sectionId: 'footer-section',
  },
];
