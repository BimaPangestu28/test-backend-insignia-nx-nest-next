'use client';

import {
  AlertError,
  Input,
} from '@test-backend-insignia-nx-nest-next/components';
import Link from 'next/link';

/* eslint-disable-next-line */
export interface TableProps {}

export function Table({
  title,
  fields,
  records,
  typeShow,
  handleClickAdd,
  handleClickSave,
  handleClickCancel,
  handleClickEdit,
  handleClickDelete,
  showTable,
  loading,

  formFields,
  userState,
  handleChange,
  handleSubmit,
  errorsState,
}: any) {
  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <h1>{title}</h1>

        {handleClickAdd && typeShow === 'table' && (
          <button
            onClick={() => handleClickAdd()}
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-100 transition"
          >
            Add
          </button>
        )}

        {typeShow === 'form' && (
          <div>
            <button
              onClick={() => handleClickCancel()}
              className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-100 transition mr-3"
            >
              Cancel
            </button>

            <button
              onClick={() => handleClickSave()}
              className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-100 transition"
            >
              Save
            </button>
          </div>
        )}
      </div>

      <hr />
      {errorsState && errorsState.map((error) => <AlertError error={error} />)}

      {typeShow === 'table' && (
        <table className="min-w-full text-left text-sm font-light table-fixed">
          <thead className="border-b bg-white font-medium dark:border-neutral-500 dark:bg-neutral-600">
            <tr>
              {fields.map((field: any) => (
                <th
                  scope="col"
                  className="px-6 py-4 text-white"
                  key={field.field}
                >
                  {field.label}
                </th>
              ))}
              <th scope="col" className="px-6 py-4 text-white">
                Action
              </th>
            </tr>
          </thead>
          {loading && (
            <tbody>
              <tr>
                <td colSpan={fields.length} className="text-center">
                  Loading...
                </td>
              </tr>
            </tbody>
          )}
          {!loading && (
            <tbody>
              {records.map((record: any) => (
                <tr
                  className="border-b bg-white dark:border-neutral-500 dark:bg-neutral-600"
                  key={record.id}
                >
                  {fields.map((field: any) => (
                    <td
                      className="px-6 py-4 text-white"
                      key={record.id + record[field.field]}
                    >
                      {!field.type && record[field.field]}

                      {field.type === 'object' &&
                        record[field.field][field.key]}

                      {field.type === 'array' &&
                        record[field.field] &&
                        record[field.field].map((item: any) => (
                          <li key={record.id + item[field.key]}>{item[field.key]}</li>
                        ))}
                    </td>
                  ))}
                  <td className="whitespace-nowrap px-6 py-4 text-white">
                    {handleClickEdit && (
                      <button
                        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-100 transition mr-3"
                        onClick={() => handleClickEdit(record)}
                      >
                        Edit
                      </button>
                    )}

                    {handleClickDelete && (
                      <button
                        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-100 transition"
                        onClick={() => handleClickDelete(record.id)}
                      >
                        Delete
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      )}

      {typeShow === 'form' && (
        <form onSubmit={() => handleSubmit()}>
          {formFields.map((field) => (
            <Input
              key={field.id}
              handleChange={handleChange}
              value={userState[field.id]}
              labelText={field.labelText}
              labelFor={field.labelFor}
              id={field.id}
              name={field.name}
              type={field.type}
              isRequired={field.isRequired}
              placeholder={field.placeholder}
              options={field.options}
            />
          ))}
        </form>
      )}
    </div>
  );
}

export default Table;
