import { ErrorMessageProps } from "../types"

function ErrorMessage({errMsg}: ErrorMessageProps) {
  return (
    <section className="relative">
      <p aria-live="assertive" className={errMsg ? "bg-red-100 border border-red-100 text-red-700 text-sm px-4 py-3 rounded-lg shadow relative mb-2" : "hidden"}>
        {errMsg}
      </p>
    </section>
  )
}

export default ErrorMessage
