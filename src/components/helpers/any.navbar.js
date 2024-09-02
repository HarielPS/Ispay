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
  },
  {
    label: "Dashboard",
    icon: "pi pi-star",
    route: '/company/dashboard/home',
  },
  {
    label: "Projects",
    icon: "pi pi-search",
    items: [
      {
        label: "Core",
        icon: "pi pi-bolt",
        shortcut: "⌘+S",
        template: itemRenderer,
      },
      {
        label: "Blocks",
        icon: "pi pi-server",
        shortcut: "⌘+B",
        template: itemRenderer,
      },
      {
        label: "UI Kit",
        icon: "pi pi-pencil",
        shortcut: "⌘+U",
        template: itemRenderer,
      },
      {
        separator: true,
      },
      {
        label: "Templates",
        icon: "pi pi-palette",
        items: [
          {
            label: "Apollo",
            icon: "pi pi-palette",
            badge: 2,
            template: itemRenderer,
          },
          {
            label: "Ultima",
            icon: "pi pi-palette",
            badge: 3,
            template: itemRenderer,
          },
        ],
      },
    ],
  },
  {
    label: "Contact",
    icon: "pi pi-envelope",
    badge: 3,
    template: itemRenderer,
  },
];
