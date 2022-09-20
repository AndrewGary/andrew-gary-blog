import React from 'react'
import { currentProjects } from '../utils/projects';

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
        <select className='border border-black' onChange={handleChange}>
            <option value=''>-- Filter By --</option>
            <optgroup label='Project'>
                {currentProjects.map((project, index) => {
                    return <option key={index} value={project.name}>{project.name}</option>
                })}
            </optgroup>
            <optgroup label='Upload Date'>
                <option value='oldestFirst'>{'Old -> New'}</option>
                <option value='newestFirst'>{'New -> Old'}</option>
            </optgroup>
        </select>
    </div>
  )
}

export default FilterPosts