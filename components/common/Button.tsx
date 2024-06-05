import React from 'react';

type ButtonProps = {
    onClick?: () => void;
    label: string;
    type?: "button" | "submit" | "reset";
    style?: "primary" | "secondary" | "danger";
    disabled?: boolean;
    className?: string; // Added className prop
};

const Button: React.FC<ButtonProps> = ({
    onClick,
    label,
    type = "button",
    style = "primary",
    disabled = false,
    className = "" // Default to an empty string if not provided
}) => {
    const getButtonClassName = (style: string, disabled: boolean) => {
        let baseStyle = "";
        switch (style) {
            case "secondary":
                baseStyle = "bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded";
                break;
            case "danger":
                baseStyle = "bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded";
                break;
            case "primary":
            default:
                baseStyle = "bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded";
                break;
        }
        if (disabled) {
            return `${baseStyle} opacity-50 cursor-not-allowed ${className}`; // Append className here
        }
        return `${baseStyle} transition-colors duration-300 ease-in-out ${className}`; // Append className here
    };

    return (
        <button
            onClick={onClick}
            type={type}
            className={getButtonClassName(style, disabled)}
            disabled={disabled}
        >
            {label}
        </button>
    );
};

export default Button;