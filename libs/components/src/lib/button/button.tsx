/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable-next-line */
export interface ButtonProps {}

export function Button({
  handleSubmit,
  action='submit',
  text='Submit',
}: any) {
  return(
    <button
        type={action}
        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 mt-10"
        onSubmit={handleSubmit}
    >
        {text}
    </button>
  )
}

export default Button;
