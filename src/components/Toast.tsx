type ToastProps = {
  errMsg: string;
  closeMsg: () => void
};

function Toast({ errMsg, closeMsg }: ToastProps) {
  return (
    <div
      id="toast-danger"
      className="flex items-center w-full max-w-xs p-4 mb-4 bg-red-100 border border-red-200 text-red-700 text-sm rounded-lg shadow-lg"
      role="alert"
    >
     
      <div className="ml-3 text-sm font-normal">{errMsg}</div>
      <button
        type="button"
        onClick={closeMsg}
        className="ml-auto -mx-1.5 -my-1.5 bg-red-100 text-red-500 hover:text-red-700 rounded-lg focus:ring-2 focus:ring-red-300 p-1.5 hover:bg-red-200 inline-flex items-center justify-center h-8 w-8"
        aria-label="Close"
      >
        <span className="sr-only">Close</span>
        <svg
          className="w-3 h-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 14"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7L1 13"
          />
        </svg>
      </button>
    </div>
  );
}

export default Toast;
