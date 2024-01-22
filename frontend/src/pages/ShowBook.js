import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import BackButton from "../components/BackButton"

export default function ShowBook() {

    const [book, setBooks] = useState({})
    const { id } = useParams()

    useEffect(() => {
        const getBooks = async () => {
            const res = await fetch(`http://localhost:${process.env.REACT_APP_BACKEND_PORT}/${id}`)
            const data = await res.json()

            if (data) {
                setBooks(data)
            }
        }
        getBooks()
    }, [])

    return (
        <div className='p-4'>
            <BackButton />
            <h1 className='text-3xl my-4 font-bold'>Show Book</h1>
            <div className='flex flex-col border-2 border-sky-400 rounded w-fit p-4'>
                <div className='my-4'>
                    <span className='text-xl mr-4 text-gray-500'>Id</span>
                    <span>{book._id}</span>
                </div>
                <div className='my-4'>
                    <span className='text-xl mr-4 text-gray-500'>Title</span>
                    <span>{book.title}</span>
                </div>
                <div className='my-4'>
                    <span className='text-xl mr-4 text-gray-500'>Author</span>
                    <span>{book.author}</span>
                </div>
                <div className='my-4'>
                    <span className='text-xl mr-4 text-gray-500'>Publish Year</span>
                    <span>{book.publishYear}</span>
                </div>
                <div className='my-4'>
                    <span className='text-xl mr-4 text-gray-500'>Create Time</span>
                    <span>{new Date(book.createdAt).toString()}</span>
                </div>
                <div className='my-4'>
                    <span className='text-xl mr-4 text-gray-500'>Last Update Time</span>
                    <span>{new Date(book.updatedAt).toString()}</span>
                </div>
            </div>
        </div>
    )
}