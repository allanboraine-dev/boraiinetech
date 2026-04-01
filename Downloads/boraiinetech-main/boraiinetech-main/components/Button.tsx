import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'glass';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  children, 
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-boraine-900 text-white hover:bg-boraine-800 focus:ring-boraine-900 shadow-lg hover:shadow-xl hover:-translate-y-0.5",
    secondary: "bg-boraine-100 text-boraine-900 hover:bg-boraine-200 focus:ring-boraine-500",
    outline: "border-2 border-boraine-900 text-boraine-900 hover:bg-boraine-50 focus:ring-boraine-900",
    glass: "glass-panel-dark text-white hover:bg-white/10 border-white/20"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};