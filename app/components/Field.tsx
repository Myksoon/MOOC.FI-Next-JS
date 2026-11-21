export default function Field({
  label,
  name,
  error,
  ...input
}: { label: string; name: string; error?: string } & React.ComponentProps<"input">) {
  return (
    <div className="mb-3">
      <label htmlFor={name} className="mb-1 block font-medium">
        {label}
      </label>
      <input
        id={name}
        name={name}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${name}-error` : undefined}
        className="w-full rounded border border-slate-300 px-3 py-2 focus:border-blue-600 focus:outline-2 focus:outline-blue-600"
        {...input}
      />
      {error && (
        <p id={`${name}-error`} data-testid={`${name}-error`} className="mt-1 text-sm text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}
