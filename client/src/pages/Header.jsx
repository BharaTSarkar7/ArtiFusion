import React from 'react';
import { Link } from 'react-router-dom';

import { Fevicon } from '../assets/index';


const Header = () => {
    return (
        <header className=' flex justify-between p-3 sticky shadow-md z-50 top-0 bg-inherit'>

            {/* left */}

            <Link>
                <div className=' flex space-x-2 items-center'>
                    <img src={Fevicon} alt='ArtiFusion' height={50} width={50} />

                    <div>
                        <h1 className=' font-bold text-white'>
                            ArtiFusion <span className=' text-red-600'>AI </span>
                            Image
                            Generator
                        </h1>
                        <h2 className=' text-xs text-gray-300'>
                            Powered by DALL-E and ChatGPT
                        </h2>
                    </div>
                </div>
            </Link>

            {/* right */}
            <Link to='/create-post' className='font-inter font-medium text-white rounded-lg py-4 px-4 bg-red-600'>
                Create
            </Link>
        </header>
    )
}

export default Header;