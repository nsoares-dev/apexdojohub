export function Modal({ titulo, children, onClose }) {
    return <div className="overlay" role="presentation" onMouseDown={onClose}>
        <section className="modal" role="dialog" aria-modal="true" aria-label={titulo}
            onMouseDown={(event) => event.stopPropagation()}>
            <div className="modal-heading">
                <h3>{titulo}</h3>
                <button className="icon-button" onClick={onClose} aria-label="Fechar">×</button>
            </div>{children}</section></div>;
}
