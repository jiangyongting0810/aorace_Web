import { useEffect, useState } from "react";

export function ReelQuickAddModal({ product, reelsCopy, open, onClose, onConfirm }) {
  const [hand, setHand] = useState("");
  const [size, setSize] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!product || !open) return;
    setHand("");
    setSize("");
    setError("");
  }, [open, product]);

  if (!product) {
    return null;
  }

  const confirm = () => {
    if (!hand || !size) {
      setError(reelsCopy.quickAddChoose);
      return;
    }

    onConfirm({ hand, size });
  };

  return (
    <div className={open ? "reel-quick-add-modal open" : "reel-quick-add-modal"} onClick={onClose}>
      <div className="reel-quick-add-panel" onClick={(event) => event.stopPropagation()}>
        <button
          type="button"
          className="reel-quick-add-close"
          aria-label={reelsCopy.quickAddCancel}
          onClick={onClose}
        >
          ×
        </button>
        <p className="reel-quick-add-kicker">{reelsCopy.quickAddTitle}</p>
        <h2>{product.name}</h2>
        <p className="reel-quick-add-copy">{reelsCopy.quickAddBody}</p>

        <div className="reel-quick-add-group">
          <strong>{reelsCopy.quickAddHandLabel}</strong>
          <div className="reel-quick-add-options">
            {product.handOptions.map((option) => (
              <button
                type="button"
                key={option}
                className={hand === option ? "reel-choice active" : "reel-choice"}
                onClick={() => {
                  setHand(option);
                  setError("");
                }}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div className="reel-quick-add-group">
          <strong>{reelsCopy.quickAddSizeLabel}</strong>
          <div className="reel-quick-add-options">
            {product.sizeOptions.map((option) => (
              <button
                type="button"
                key={option}
                className={size === option ? "reel-choice active" : "reel-choice"}
                onClick={() => {
                  setSize(option);
                  setError("");
                }}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {error && <p className="reel-quick-add-error">{error}</p>}

        <div className="reel-quick-add-actions">
          <button type="button" className="reel-modal-secondary" onClick={onClose}>
            {reelsCopy.quickAddCancel}
          </button>
          <button type="button" className="checkout-button" onClick={confirm}>
            {reelsCopy.quickAddConfirm}
          </button>
        </div>
      </div>
    </div>
  );
}
