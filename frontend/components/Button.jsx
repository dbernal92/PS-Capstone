function Button({
    name,
    onClick,
    disabled = false,
    type = "button",
    className = ""
}) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            type={type}
            className={`btn ${className}`}>
            {name}
        </button>
    );
}

export default Button;
