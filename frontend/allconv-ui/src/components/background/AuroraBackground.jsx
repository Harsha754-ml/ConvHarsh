import React from 'react';

const AuroraBackground = () => {
  return (
    <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
      <div className="relative w-full h-full">
        {/* These are the aurora "blobs" */}
        <div
          className="absolute top-[-10%] left-[10%] w-[500px] h-[500px] bg-accent/20 rounded-full filter blur-3xl animate-aurora"
          style={{ animationDelay: '0s' }}
        />
        <div
          className="absolute top-[20%] left-[50%] w-[400px] h-[400px] bg-accent-dark/20 rounded-full filter blur-3xl animate-aurora"
          style={{ animationDelay: '3s' }}
        />
        <div
          className="absolute bottom-[-5%] right-[20%] w-[600px] h-[600px] bg-bg-main/50 rounded-full filter blur-3xl animate-aurora"
          style={{ animationDelay: '6s' }}
        />
         <div
          className="absolute bottom-[10%] left-[30%] w-[300px] h-[300px] bg-accent/10 rounded-full filter blur-3xl animate-aurora"
          style={{ animationDelay: '9s' }}
        />
      </div>
    </div>
  );
};

export default AuroraBackground;
