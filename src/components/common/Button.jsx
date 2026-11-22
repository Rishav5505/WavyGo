import React from 'react';
import { cn } from '../../utils/cn';

const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    className,
    type = 'button',
    ...props
}) => {
    const baseStyles = "inline-flex items-center justify-center gap-2 rounded-2xl font-semibold tracking-tight transition-all duration-300 ease-premium focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]";

    const variants = {
        primary: "bg-primary text-white shadow-premium-sm hover:bg-primary-light hover:shadow-premium",
        secondary: "bg-secondary text-slate-900 shadow-premium-sm hover:bg-secondary-light hover:shadow-premium",
        outline: "border border-primary/30 text-primary bg-transparent hover:bg-primary/5 hover:border-primary/60",
        ghost: "text-slate-600 hover:text-primary hover:bg-slate-100/70",
        white: "bg-white text-slate-900 ring-1 ring-slate-900/5 shadow-premium-sm hover:shadow-premium"
    };

    const sizes = {
        sm: "px-5 py-2.5 text-sm",
        md: "px-7 py-3.5 text-[15px]",
        lg: "px-9 py-4 text-base"
    };

    return (
        <button
            type={type}
            className={cn(baseStyles, variants[variant], sizes[size], className)}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
