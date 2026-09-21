// Minimal inline SVG icon set (avoids extra dependencies).

function Icon({ d, className = 'h-5 w-5', ...rest }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...rest}
    >
      <path d={d} />
    </svg>
  )
}

export const SearchIcon = (p) => (
  <Icon
    {...p}
    d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
  />
)

export const MenuIcon = (p) => (
  <Icon {...p} d="M4 6h16M4 12h16M4 18h16" />
)

export const CloseIcon = (p) => (
  <Icon {...p} d="M6 6l12 12M18 6L6 18" />
)

export const ChevronDownIcon = (p) => (
  <Icon {...p} d="M6 9l6 6 6-6" />
)

export const ChevronLeftIcon = (p) => (
  <Icon {...p} d="M15 6l-6 6 6 6" />
)

export const ChevronRightIcon = (p) => (
  <Icon {...p} d="M9 6l6 6-6 6" />
)

export const ArrowRightIcon = (p) => (
  <Icon {...p} d="M5 12h14M13 6l6 6-6 6" />
)

export const CheckIcon = (p) => (
  <Icon {...p} d="M20 6L9 17l-5-5" />
)

export const CopyIcon = (p) => (
  <Icon
    {...p}
    d="M8 8h11a2 2 0 012 2v9a2 2 0 01-2 2H10a2 2 0 01-2-2v-9zM16 8V6a2 2 0 00-2-2H6a2 2 0 00-2 2v8a2 2 0 002 2h2"
  />
)

export const FilterIcon = (p) => (
  <Icon {...p} d="M3 5h18l-7 8v6l-4-2v-4L3 5z" />
)

export const StarIcon = ({ filled = true, className = 'h-4 w-4', ...p }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill={filled ? 'currentColor' : 'none'}
    stroke="currentColor"
    strokeWidth="1.6"
    className={className}
    aria-hidden="true"
    {...p}
  >
    <path d="M12 3l2.9 5.88 6.49.94-4.7 4.58 1.11 6.47L12 17.9l-5.8 3.05 1.1-6.47L2.6 9.82l6.5-.94L12 3z" />
  </svg>
)

export const LeafIcon = (p) => (
  <Icon
    {...p}
    d="M4 20c0-9 5-15 16-16-1 11-7 16-16 16zM4 20c3-5 6-8 10-10"
  />
)

export const LinkIcon = (p) => (
  <Icon
    {...p}
    d="M10 14a5 5 0 007.07 0l3.53-3.53a5 5 0 00-7.07-7.07L11.3 5.64M14 10a5 5 0 00-7.07 0l-3.53 3.53a5 5 0 007.07 7.07l2.17-2.17"
  />
)

export const InfoIcon = (p) => (
  <Icon
    {...p}
    d="M12 22c5.52 0 10-4.48 10-10S17.52 2 12 2 2 6.48 2 12s4.48 10 10 10zM12 16v-4M12 8h.01"
  />
)

export const MailIcon = (p) => (
  <Icon
    {...p}
    d="M4 4h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm0 2l8 5 8-5"
  />
)

export const PhoneIcon = (p) => (
  <Icon
    {...p}
    d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.12.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.34 1.85.58 2.81.7A2 2 0 0122 16.92z"
  />
)

export const MapPinIcon = (p) => (
  <Icon
    {...p}
    d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0zM12 13a3 3 0 100-6 3 3 0 000 6z"
  />
)

export const ClockIcon = (p) => (
  <Icon
    {...p}
    d="M12 22a10 10 0 100-20 10 10 0 000 20zM12 6v6l4 2"
  />
)

export const HomeIcon = (p) => (
  <Icon
    {...p}
    d="M3 10.5L12 3l9 7.5M5 9.5V21h14V9.5"
  />
)

export const BasketIcon = (p) => (
  <Icon
    {...p}
    d="M4 8h16l-1.5 12a2 2 0 01-2 1.8h-9a2 2 0 01-2-1.8L4 8zM9 8a3 3 0 116 0"
  />
)

export const AlertIcon = (p) => (
  <Icon
    {...p}
    d="M12 9v4M12 17h.01M10.3 3.9L1.8 18a2 2 0 001.7 3h17a2 2 0 001.7-3L13.7 3.9a2 2 0 00-3.4 0z"
  />
)

export const PackageIcon = (p) => (
  <Icon
    {...p}
    d="M21 8.5l-9-5-9 5v7l9 5 9-5v-7zM3.2 8.6L12 13.5l8.8-4.9M12 13.5V21.5M7.5 6.2l8.8 4.9"
  />
)

export const GlobeIcon = (p) => (
  <Icon
    {...p}
    d="M12 22a10 10 0 100-20 10 10 0 000 20zM2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"
  />
)

export const ListIcon = (p) => (
  <Icon {...p} d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />
)

export const ChartIcon = (p) => (
  <Icon
    {...p}
    d="M3 3v18h18M7 16v-5M12 16V8M17 16v-3"
  />
)

export const TagIcon = (p) => (
  <Icon
    {...p}
    d="M20.6 13.4L13.4 20.6a2 2 0 01-2.8 0L3 13V3h10l7.6 7.6a2 2 0 010 2.8zM7.5 7.5h.01"
  />
)

export const CompareIcon = (p) => (
  <Icon
    {...p}
    d="M12 3v18M8 7h8M5 12h14M8 17h8M5 5l4 3M15 16l4 3"
  />
)