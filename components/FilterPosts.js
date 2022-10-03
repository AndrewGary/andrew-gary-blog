import React from 'react'
import { currentProjects } from '../utils/projects';
import { motion } from 'framer-motion';

const FilterPosts = (props) => {

    const handleChange = e => {
        console.log(e.target.value);

        if(e.target.value === 'AdamGaryGlass' || e.target.value === 'Slider Puzzle' || e.target.value === 'Andrew Gary Dev Blog'){
            console.log('filtering by project: ' + e.target.value);
            const filteredArray = props.posts.filter(post => post.project.name === e.target.value);

            props.setFilteredPosts(filteredArray);
            console.log('filteredArray: ', filteredArray);
        }
        if(e.target.value === 'newestFirst'){
            props.setFilteredPosts([]);
        }
        if(e.target.value === 'oldestFirst'){
            console.log('Yeahhhh')
            const returnArray = [];
            for(let i = props.posts.length - 1; i >= 0;i--){
                returnArray.push({...props.posts[i]})
            }
            props.setFilteredPosts(returnArray);
        }

    }

  return (
    <div className='w-full flex justify-center'>
        <select className='cursor-pointer border border-black bg-watermellon bg-opacity-40 active:bg-carbon' onChange={handleChange}>
            <option className='bg-carbon' value=''>-- Filter By --</option>
            <optgroup label='Project'>
                {currentProjects.map((project, index) => {
                    return <option className='bg-carbon' key={index} value={project.name}>{project.name}</option>
                })}
            </optgroup>
            <optgroup label='Upload Date'>
                <option className='bg-carbon' value='oldestFirst'>{'Old -> New'}</option>
                <option className='bg-carbon' value='newestFirst'>{'New -> Old'}</option>
            </optgroup>
        </select>
    </div>
  )
}

export default FilterPosts