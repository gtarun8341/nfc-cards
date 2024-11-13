// src/app/components/Testimonials.js
"use client"; // Next.js Client Component

const Testimonials = ({ testimonials }) => {
    return (
        <section className="container mx-auto p-6">
            <h2 className="text-3xl font-bold text-center mb-4">See What People Have to Say About Us</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {testimonials.map((testimonial, index) => (
                    <div className="p-4 border rounded shadow-md" key={index}>
                        <div className="flex items-center mb-2">
                            <img src={testimonial.icon} alt={testimonial.name} className="w-12 h-12 rounded-full mr-3" />
                            <div>
                                <h3 className="font-semibold">{testimonial.name}</h3>
                                <p className="text-sm text-gray-600">{testimonial.designation}</p> {/* Designation below name */}
                            </div>
                        </div>
                        <h4 className="font-semibold mb-2">{testimonial.heading}</h4> {/* Heading above description */}
                        <p>{testimonial.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Testimonials;
