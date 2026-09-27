import React from "react";

export function SunIcon({ className = "w-6 h-6" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4" fill="currentColor" fillOpacity="0.2" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  );
}

export function MoonIcon({ className = "w-6 h-6" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" fill="currentColor" fillOpacity="0.2" />
    </svg>
  );
}

export function CloudIcon({ className = "w-6 h-6" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" fill="currentColor" fillOpacity="0.2" />
    </svg>
  );
}

export function CloudSunIcon({ className = "w-6 h-6" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2v2M4.93 4.93l1.41 1.41M20 12h2M19.07 4.93l-1.41 1.41M15.5 7.5A4.5 4.5 0 0 0 11 5a4.5 4.5 0 0 0-4.5 4.5" />
      <path d="M17 19a5 5 0 0 0 0-10h-.6A6.5 6.5 0 0 0 4 14.5a4.5 4.5 0 0 0 4.5 4.5h8.5Z" fill="currentColor" fillOpacity="0.2" />
    </svg>
  );
}

export function CloudMoonIcon({ className = "w-6 h-6" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 2a4.5 4.5 0 0 0 4 4.5 4.5 4.5 0 0 0 3-.5" />
      <path d="M17 19a5 5 0 0 0 0-10h-.6A6.5 6.5 0 0 0 4 14.5a4.5 4.5 0 0 0 4.5 4.5h8.5Z" fill="currentColor" fillOpacity="0.2" />
    </svg>
  );
}

export function RainIcon({ className = "w-6 h-6" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.5 17H9a6 6 0 1 1 5.71-8h1.79a3.5 3.5 0 1 1 0 7Z" fill="currentColor" fillOpacity="0.2" />
      <path d="M8 19v3M12 19v3M16 19v3" />
    </svg>
  );
}

export function ThunderIcon({ className = "w-6 h-6" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.5 16H9a6 6 0 1 1 5.71-8h1.79a3.5 3.5 0 1 1 0 7Z" fill="currentColor" fillOpacity="0.2" />
      <path d="m13 14-3 5h4l-1 5" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

export function SnowIcon({ className = "w-6 h-6" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M4.93 19.07 19.07 4.93" />
      <circle cx="12" cy="12" r="2" fill="currentColor" />
    </svg>
  );
}

export function MistIcon({ className = "w-6 h-6" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 8h16M2 12h20M6 16h12M8 20h8" />
    </svg>
  );
}

export function DropletIcon({ className = "w-5 h-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" fill="currentColor" fillOpacity="0.15" />
    </svg>
  );
}

export function WindIcon({ className = "w-5 h-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2M9.6 4.6A2 2 0 1 1 11 8H2M12.6 19.4A2 2 0 1 0 14 16H2" />
    </svg>
  );
}

export function PressureIcon({ className = "w-5 h-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 3" />
    </svg>
  );
}

export function EyeIcon({ className = "w-5 h-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

export function ThermometerIcon({ className = "w-5 h-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z" />
    </svg>
  );
}

export function SunriseIcon({ className = "w-5 h-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2v6M4.93 4.93l4.24 4.24M19.07 4.93l-4.24 4.24M2 18h20M20 18a8 8 0 1 0-16 0" />
    </svg>
  );
}

export function SunsetIcon({ className = "w-5 h-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 10v6M4.93 15.07l4.24-4.24M19.07 15.07l-4.24-4.24M2 18h20M20 18a8 8 0 1 0-16 0" />
    </svg>
  );
}

export function SearchIcon({ className = "w-5 h-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

export function LocationPinIcon({ className = "w-5 h-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

export function RefreshIcon({ className = "w-5 h-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 12a9 9 0 0 1 15-6.7L21 8M21 3v5h-5M21 12a9 9 0 0 1-15 6.7L3 16M3 21v-5h5" />
    </svg>
  );
}

export function CloseIcon({ className = "w-5 h-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}

/* Master weather icon resolver matching the reference style */
export function WeatherConditionIcon({ condition, isNight = false, className = "w-8 h-8" }) {
  const cond = (condition || "").toLowerCase();

  if (cond.includes("thunder")) {
    return <ThunderIcon className={className} />;
  }
  if (cond.includes("rain") || cond.includes("drizzle")) {
    return <RainIcon className={className} />;
  }
  if (cond.includes("snow")) {
    return <SnowIcon className={className} />;
  }
  if (cond.includes("cloud")) {
    if (cond.includes("few") || cond.includes("scattered")) {
      return isNight ? <CloudMoonIcon className={className} /> : <CloudSunIcon className={className} />;
    }
    return <CloudIcon className={className} />;
  }
  if (cond.includes("clear")) {
    return isNight ? <MoonIcon className={className} /> : <SunIcon className={className} />;
  }
  if (cond.includes("mist") || cond.includes("fog") || cond.includes("haze") || cond.includes("smoke")) {
    return <MistIcon className={className} />;
  }
  return <CloudIcon className={className} />;
}
