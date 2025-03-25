function Input({
    label,
    name,
    type = "text",
    value,
    onChange,
    placeholder = "",
    required = false,
    className = "",
    min,
    max,
    step
}) {
    return (
        <div className={`input-group ${className}`}>
            {label && <label htmlFor={name}>{label}</label>}
            <input
                id={name}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                min={min}
                max={max}
                step={step}
            />
        </div>
    );
}

export default Input;
