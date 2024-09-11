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


export const employ = [
  {
    label: "Get Pay",
    icon: "pi pi-home",
    route: 'getpay',
  },
  {
    label: "Make Pay",
    icon: "pi pi-plus",
    route: 'makepay',
  },
];
