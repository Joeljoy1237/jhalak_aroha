import toast, { Toast } from "react-hot-toast";

interface ConfirmToastProps {
  t: Toast;
  message: string;
  onConfirm: () => void;
  onCancel?: () => void;
}

export default function ConfirmToast({
  t,
  message,
  onConfirm,
  onCancel,
}: ConfirmToastProps) {
  return (
    <div
      className={`${
        t.visible ? "opacity-100 scale-100" : "opacity-0 scale-95"
      } max-w-md w-full bg-[#1A1A1A] shadow-lg rounded-xl pointer-events-auto flex flex-col border border-white/10 p-4 transition-all duration-300 transform`}
    >
      <div className="flex-1">
        <h3 className="text-white font-bold mb-2 font-unbounded">
          Confirm Action
        </h3>
        <p className="text-sm text-gray-400 leading-relaxed whitespace-pre-wrap">
          {message}
        </p>
      </div>
      <div className="mt-4 flex gap-3 justify-end">
        <button
          onClick={() => {
            toast.dismiss(t.id);
            if (onCancel) onCancel();
          }}
          className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-gray-400 hover:text-white transition-colors bg-white/5 hover:bg-white/10 rounded-lg text-center"
        >
          Cancel
        </button>
        <button
          onClick={() => {
            toast.dismiss(t.id);
            onConfirm();
          }}
          className="px-4 py-2 text-xs font-bold uppercase tracking-wider bg-[#BA170D] text-white rounded-lg hover:bg-red-700 transition-colors shadow-[0_0_15px_rgba(186,23,13,0.4)] text-center"
        >
          Confirm
        </button>
      </div>
    </div>
  );
}
