// types/next-pwa.d.ts
declare module '@ducanh2912/next-pwa' {
    import { NextConfig } from 'next';
    import { PWAConfig } from 'next-pwa';
  
    function withPWA(config: PWAConfig): (nextConfig: NextConfig) => NextConfig;
  
    export default withPWA;
  }
  