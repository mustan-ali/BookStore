import { useEffect, useState } from "react"
import BackButton from '../components/BackButton'
import { useNavigate, useParams } from "react-router-dom"

export default function EditBook() {

    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [publishYear, setPublishYear] = useState('')
    const navigate = useNavigate()
    const { id } = useParams()

    useEffect(() => {
        const getBook = async () => {
            const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/${id}`)
            const data = await res.json()

            if (data) {
                setTitle(data.title)
                setAuthor(data.author)
                setPublishYear(data.publishYear)
            }
        }
        getBook()
    }, [])

    const handleEditBook = async () => {
        const data = { title, author, publishYear }

        const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/${id}`, {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        })
        const json = await res.json()

        if (json) {
            setTitle('')
            setAuthor('')
            setPublishYear('')
            navigate('/')
        }
    }

    return (
        <div className='p-4'>
            <BackButton />
            <h1 className='text-3xl my-4 font-bold'>Edit Book</h1>
            <div className='flex flex-col border-2 border-sky-400 rounded w-[600px] p-4 mx-auto'>
                <div className='my-4'>
                    <label className='text-xl mr-4 text-gray-500'>Title</label>
                    <input
                        type='text'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className='border-2 border-gray-500 px-4 py-2 w-full'
                    />
                </div>
                <div className='my-4'>
                    <label className='text-xl mr-4 text-gray-500'>Author</label>
                    <input
                        type='text'
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        className='border-2 border-gray-500 px-4 py-2 w-full'
                    />
                </div>
                <div className='my-4'>
                    <label className='text-xl mr-4 text-gray-500'>Publish Year</label>
                    <input
                        type='number'
                        value={publishYear}
                        onChange={(e) => setPublishYear(e.target.value)}
                        className='border-2 border-gray-500 px-4 py-2 w-full'
                    />
                </div>
                <button className='p-2 bg-sky-300 m-8' onClick={handleEditBook}>
                    Save
                </button>
            </div>
        </div>
    )
}