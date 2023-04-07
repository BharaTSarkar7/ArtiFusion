import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const CreatePost = () => {
    const Navigate = useNavigate();

    const [form, setForm] = useState({
        name: '',
        prompt: '',
        photo: '',
    });

    const [generatingImg, setGeneratingImg] = useState(false);
    const [loading, setLoading] = useState(false);
    const [generatingPrompt, setGeneratingPrompt] = useState(false);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const generatePrompt = async () => {
        setGeneratingPrompt(true);
        try {
            const response = await fetch('http://localhost:8080/api/v1/chatgpt', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.text();
            const parsedDate = JSON.parse(data);
            setForm({ ...form, prompt: parsedDate.prompt });
        } catch (error) {
            alert(error);
        } finally {
            setGeneratingPrompt(false);
        }
    }

    const generateImage = async () => {
        if (form.prompt) {
            try {
                setGeneratingImg(true);
                const response = await fetch('http://localhost:8080/api/v1/dalle', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        prompt: form.prompt,
                    }),
                });

                const data = await response.json();

                setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` });
            } catch (error) {
                alert(error);
            } finally {
                setGeneratingImg(false);
            }
        } else {
            alert('Please provide a valid prompt');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (form.prompt && form.photo) {
            setLoading(true);
            try {
                const response = await fetch('http://localhost:8080/api/v1/post', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ ...form }),
                });

                await response.json();
                alert('Success');
                Navigate('/');
            } catch (error) {
                alert(error);
            } finally {
                setLoading(false);
            }
        } else {
            alert('Please generate an image with proper details');
        }
    };



    return (
        <section >
            <div className='max-w-7xl mx-auto  px-4 py-4'>
                <h1 className=' text-white font-medium text-lg'>Create</h1>
                <p className=' pt-2 text-gray-300'>Generate an imaginative image through DALL-E AI and share it with the community.</p>
            </div>

            <div className='mt-4 p-4'>
                <form className=' flex flex-col shadow-md' onSubmit={handleSubmit} >

                    <textarea className='outline-none bg-[#191919] resize-none text-white w-[50%] pt-5 pr-5 pl-5'
                        placeholder='Enter your name'
                        value={form.name}
                        onChange={handleChange}
                        name='name'
                    />

                    <div className=' flex flex-col md:flex-row mt-2'>
                        <textarea name="prompt"
                            placeholder="Enter a prompt..."
                            value={form.prompt}
                            onChange={handleChange}
                            className='flex-1 outline-none bg-[#191919] p-4 resize-none text-white '
                        />
                        <button className=' bg-[#C84B31] p-4 text-[#f1faee] font-bold transition-colors duration-200 disabled:text-gray-300 disabled:cursor-not-allowed ' type='button'
                            disabled={!form.prompt}
                            onClick={generateImage}
                        >{generatingImg ? "Generating" : "Generate"}</button>

                        <button className=' bg-[#f1faee] p-4 text-[#C84B31] font-bold transition-colors duration-200' type='button'
                            onClick={generatePrompt}
                        >{generatingPrompt ? "Thinking" : "New Suggestion"}</button>
                    </div>


                    <div className=' w-64 h-64  bg-slate-400 mt-2 '>
                        {form.photo ?
                            <img src={form.photo} alt={form.prompt} className=' object-contain' /> : <img src="https://plus.unsplash.com/premium_photo-1674599002342-1cd5aed7e615?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGxhaW58ZW58MHx8MHx8&auto=format&fit=crop&w=1000&q=60" alt="d"
                                className='object-contain' />
                        }
                    </div>

                    <div className=' mt-5'>
                        <p className=' mt-2 text-[14px] text-gray-300'>** Once you have created the image you want, you can share it with others in the community **</p>
                        <button
                            className="mt-3 text-black bg-[#f1faee] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                            type='submit'
                        >
                            {loading ? 'Sharing...' : 'Share with the Community'}
                        </button>
                    </div>

                </form>
            </div>
        </section>
    )
}

export default CreatePost;