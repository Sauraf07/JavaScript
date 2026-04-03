import { useState, useEffect } from "react";
import { CheckCircle, XCircle, Info, X } from "lucide-react";

const ICONS = {
  success: <CheckCircle size={16} />,
  error: <XCircle size={16} />,
  info: <Info size={16} />,
};

export function Toast({ toasts, remove }) {
  return (
    <div className="toast-wrap">
      {toasts.map((t) => (
        <div key={t.id} className={`toast toast-${t.type}`}>
          {ICONS[t.type]}
          <span style={{ flex: 1 }}>{t.message}</span>
          <span
            style={{ cursor: "pointer", opacity: 0.7 }}
            onClick={() => remove(t.id)}
          >
            <X size={14} />
          </span>
        </div>
      ))}
    </div>
  );
}

export function useToast() {
  const [toasts, setToasts] = useState([]);

  const show = (message, type = "info") => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => remove(id), 4000);
  };

  const remove = (id) => setToasts((prev) => prev.filter((t) => t.id !== id));

  return { toasts, show, remove };
}
