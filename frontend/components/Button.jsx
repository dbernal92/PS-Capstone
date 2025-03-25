function Button({ name, onClick, disabled, type = "button", className = "" }) {
    return (
        <button onClick={onClick} disabled={disabled} type={type} className={className}>
            {name}
        </button>
    );
}

export default Button;
