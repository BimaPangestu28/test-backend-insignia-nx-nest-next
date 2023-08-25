/* eslint-disable-next-line */
export interface AlertErrorProps {}

export function AlertError({ error }: any) {
  return (
    <div
      className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-2"
      role="alert"
    >
      <strong className="font-bold">Error! </strong>
      <span className="block sm:inline">{error}</span>
    </div>
  );
}

export default AlertError;
