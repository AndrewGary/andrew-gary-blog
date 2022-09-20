import React from 'react'

const DeleteConfirmation = ({deleteConfirmation, setDeleteConfirmation, id, posts, setPosts}) => {
  
    const handleDelete = async e => {
        const options = {
            method: 'DELETE'
        }

        const resp = await fetch(`/api/blogPost/${id}`, options)

        const newArray = posts.filter(p => p._id !== id);

        setPosts(newArray);

        setDeleteConfirmation(!deleteConfirmation)
    }

    const handleCancel = async e => {
        setDeleteConfirmation(!deleteConfirmation);
    }
  
    return (
    <div className='py-3 px-3 mt-3 border rounded-lg border-watermellon flex flex-col justify-center items-center'>
        <span>Confirm Delete?</span>
        <button className='border border-watermellon rounded-md py-1 px-2 mb-1' onClick={handleDelete}>Delete</button>
        <button className='border border-watermellon rounded-md py-1 px-2' onClick={handleCancel}>Cancel</button>
    </div>
  )
}

export default DeleteConfirmation