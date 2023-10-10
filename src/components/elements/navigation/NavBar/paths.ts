import { ISubNav } from "../SubNav/SubNav";

const NAV_LINKS: ISubNav[] = [
  { label: "Home", href: "/" },
  {
    label: "MyCats",
    href: "/myCats",
    children: [
      {
        label: "Show",
        subLabel: "View all your cats at once",
        href: "/myCats/show",
      },
      {
        label: "Breed",
        subLabel: "Generate new cats from existing ones",
        href: "/myCats/breed",
      },
      {
        label: "Sell",
        subLabel: "Sell your cats on the marketplace",
        href: "/myCats/sell",
      },
    ],
  },
  {
    label: "Marketplace",
    href: "/marketplace",
  },
  {
    label: "Factory",
    href: "/factory",
  },
];

export default NAV_LINKS;
