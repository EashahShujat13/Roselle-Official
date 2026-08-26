import {
  createContext,
  useContext,
  useState,
  useCallback,
} from "react";

import {
  Check,
  X,
  AlertCircle,
} from "lucide-react";

import {
  AnimatePresence,
  motion,
} from "framer-motion";

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toast, setToast] = useState(null);

  const showToast = useCallback(
    (message, type = "success") => {
      setToast({
        message,
        type,
      });

      setTimeout(() => {
        setToast(null);
      }, 3000);
    },
    []
  );

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{
              opacity: 0,
              y: -20,
              x: 20,
              scale: 0.96,
            }}
            animate={{
              opacity: 1,
              y: 0,
              x: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: -12,
              x: 20,
              scale: 0.96,
            }}
            transition={{
              duration: 0.35,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              fixed
              top-6
              right-5
              md:right-8
              z-[9999]
              w-[calc(100%-2.5rem)]
              max-w-[380px]
            "
          >
            <div
              className={`
                relative
                overflow-hidden
                flex
                items-center
                gap-4
                px-5
                py-4
                bg-white/95
                backdrop-blur-xl
                border
                shadow-[0_18px_50px_rgba(81,64,100,0.14)]
                ${
                  toast.type === "error"
                    ? "border-[#D9AFC0]"
                    : "border-[#DCCFE8]"
                }
              `}
            >
              {/* Luxury Accent */}
              <div
                className={`
                  absolute
                  left-0
                  top-0
                  bottom-0
                  w-[3px]
                  ${
                    toast.type === "error"
                      ? "bg-[#A45D76]"
                      : "bg-[#B48CF0]"
                  }
                `}
              />

              {/* Icon */}
              <div
                className={`
                  shrink-0
                  w-9
                  h-9
                  rounded-full
                  flex
                  items-center
                  justify-center
                  ${
                    toast.type === "error"
                      ? "bg-[#F8EDF2] text-[#A45D76]"
                      : "bg-[#F3ECFA] text-[#806298]"
                  }
                `}
              >
                {toast.type === "error" ? (
                  <AlertCircle size={16} strokeWidth={1.7} />
                ) : (
                  <Check size={16} strokeWidth={1.8} />
                )}
              </div>

              {/* Message */}
              <div className="min-w-0 flex-1">
                <p
                  className={`
                    text-[8px]
                    uppercase
                    tracking-[3px]
                    font-medium
                    mb-1
                    ${
                      toast.type === "error"
                        ? "text-[#A45D76]"
                        : "text-[#806298]"
                    }
                  `}
                >
                  {toast.type === "error"
                    ? "Something went wrong"
                    : "Roselle"}
                </p>

                <p
                  className={`
                    text-[11px]
                    leading-5
                    tracking-[0.2px]
                    ${
                      toast.type === "error"
                        ? "text-[#8F596D]"
                        : "text-[#655B75]"
                    }
                  `}
                >
                  {toast.message}
                </p>
              </div>

              {/* Close */}
              <button
                type="button"
                onClick={() => setToast(null)}
                aria-label="Close notification"
                className="
                  shrink-0
                  w-7
                  h-7
                  rounded-full
                  flex
                  items-center
                  justify-center
                  text-[#A49BAE]
                  hover:text-[#806298]
                  hover:bg-[#F7F1FC]
                  transition-all
                  duration-300
                "
              >
                <X size={13} strokeWidth={1.6} />
              </button>

              {/* Bottom Progress */}
              <motion.div
                initial={{ width: "100%" }}
                animate={{ width: "0%" }}
                transition={{
                  duration: 3,
                  ease: "linear",
                }}
                className={`
                  absolute
                  bottom-0
                  left-0
                  h-[2px]
                  ${
                    toast.type === "error"
                      ? "bg-[#A45D76]"
                      : "bg-[#B48CF0]"
                  }
                `}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}