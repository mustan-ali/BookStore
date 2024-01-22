import { useState } from 'react'
import BackButton from '../components/BackButton'
import { useNavigate, useParams } from 'react-router-dom'

export default function DeleteBook() {

    const navigate = useNavigate()
    const { id } = useParams()

    const handleDeleteBook = async () => {

        const res = await fetch(`http://localhost:${process.env.REACT_APP_BACKEND_PORT}/${id}`, {
            method: 'DELETE',
        })
        const json = await res.json()

        if (json) {
            navigate('/')
        }
    }

    return (
        <div className='p-4'>
            <BackButton />
            <h1 className='text-3xl my-4 font-bold'>Delete Book</h1>
            <div className='flex flex-col items-center border-2 border-sky-400 rounded w-[600px] p-8 mx-auto'>
                <h3 className='text-2xl'>Are You Sure You want to delete this book?</h3>
                <button className='p-4 bg-red-600 text-white m-8 w-full' onClick={handleDeleteBook} >Yes, Delete it</button>
            </div>
        </div>
    )
}