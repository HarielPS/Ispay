import { Badge } from "primereact/badge";
import { Avatar } from "primereact/avatar";
import { useRouter } from "next/navigation";

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


export const company = [
  {
    label: "Home",
    icon: "pi pi-home",
    route: 'home',
  },
  {
    label: "new account",
    icon: "pi pi-plus",
    route: 'newAccount',
  },
  {
    label: "History",
    icon: "pi pi-home",
    route: '/',
  },
  {
    label: "Deposit money",
    icon: "pi pi-search",
  },
  {
    label: "withdraw money",
    icon: "pi pi-envelope",
    badge: 3,
    template: itemRenderer,
  },
];
