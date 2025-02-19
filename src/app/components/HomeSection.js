"use client"; // Next.js Client Component
import Image from 'next/image';

const HomeSection = ({ sections }) => {
    return (
        <div className="container mx-auto p-6">
            {sections.map((section, index) => (
                <div
                    className={`flex flex-col md:flex-row items-center mb-6 ${index % 2 === 0 ? '' : 'flex-row-reverse'}`}
                    key={index}
                >
                    {/* Left Side: Image */}
                    <div
                        className={`flex-1 p-4 ${index % 2 === 0 ? '' : 'order-2'}`}
                        style={{ flexBasis: '50%' }} 
                    >
                        <Image 
                            src={section.image} 
                            alt="Section" 
                            className="w-full h-auto rounded-lg"                   
                            width={500} 
                            height={500} 
                            layout="intrinsic"
                        />
                    </div>

                    {/* Right Side: Title, Description, and Button */}
                    <div
                        className={`flex-1 p-4 ${index % 2 === 0 ? '' : 'order-1'}`}
                        style={{ flexBasis: '50%', textAlign: 'left' }} 
                    >
                        <h2 className="text-2xl font-bold mb-4">{section.description.title}</h2>
                        <p className="text-gray-700 mb-4">{section.description.text}</p>
                        
                        {/* Fix: Wrap Button in <a> for redirection */}
                        <a 
                            href={section.link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                        >
                            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                                Learn More
                            </button>
                        </a>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default HomeSection;
