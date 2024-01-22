import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { AiOutlineEdit } from 'react-icons/ai'
import { BsInfoCircle } from 'react-icons/bs'
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md'

export default function Home() {

    const [books, setBooks] = useState([])

    useEffect(() => {
        const getBooks = async () => {
            const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/`)
            const data = await res.json()

            if (data) {
                setBooks(data)
            }
        }
        getBooks()
    }, [])

    return (
        <div className="p-4">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl my-8 font-bold">Book List</h1>
                <Link to="/create">
                    <MdOutlineAddBox className="text-sky-800 text-4xl" />
                </Link>
            </div>
            <table className='w-full border-separate border-spacing-2'>
                <thead>
                    <tr>
                        <th className='border border-slate-600 rounded'>No</th>
                        <th className='border border-slate-600 rounded'>Title</th>
                        <th className='border border-slate-600 rounded max-md:hidden'>
                            Author
                        </th>
                        <th className='border border-slate-600 rounded max-md:hidden'>
                            Publish Year
                        </th>
                        <th className='border border-slate-600 rounded'>Operations</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map((book, index) => (
                        <tr key={book._id} className='h-8'>
                            <td className='border border-slate-700 rounded text-center'>
                                {index + 1}
                            </td>
                            <td className='border border-slate-700 rounded text-center'>
                                {book.title}
                            </td>
                            <td className='border border-slate-700 rounded text-center max-md:hidden'>
                                {book.author}
                            </td>
                            <td className='border border-slate-700 rounded text-center max-md:hidden'>
                                {book.publishYear}
                            </td>
                            <td className='border border-slate-700 rounded text-center'>
                                <div className='flex justify-center gap-x-4'>
                                    <Link to={`/detail/${book._id}`}>
                                        <BsInfoCircle className='text-2xl text-green-800' />
                                    </Link>
                                    <Link to={`/edit/${book._id}`}>
                                        <AiOutlineEdit className='text-2xl text-yellow-600' />
                                    </Link>
                                    <Link to={`/delete/${book._id}`}>
                                        <MdOutlineDelete className='text-2xl text-red-600' />
                                    </Link>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}