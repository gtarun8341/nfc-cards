import Image from "next/image";
import api from "../../apiConfig/axiosConfig"; // Ensure you have the right API config

const ViewBlog = ({ blog }) => {
  const renderContent = (content) => {
    return content.map((item, index) => {
      switch (item.type) {
        case "image":
          return (
            <div key={index} className="relative w-full h-64 mb-6">
              <Image
                src={`${api.defaults.baseURL}/uploads/${item.data}`}
                alt={`Image for ${blog.title}`}
                fill
                className="rounded-md"
              />
            </div>
          );
        case "text":
          return (
            <p key={index} className="text-gray-700 mb-6">
              {item.data}
            </p>
          );
        case "heading":
          return (
            <h3 key={index} className="text-3xl font-bold text-black mb-4">
              {item.data}
            </h3>
          );
        case "subheading":
          return (
            <h4
              key={index}
              className="text-2xl font-semibold text-gray-800 mb-4"
            >
              {item.data}
            </h4>
          );
        case "sideheading":
          return (
            <h5 key={index} className="text-xl font-medium text-gray-600 mb-3">
              {item.data}
            </h5>
          );
        case "points":
          return (
            <ul key={index} className="list-disc pl-6 text-gray-700 mb-6">
              {item.data.map((point, i) => (
                <li key={i} className="text-lg">
                  {point}
                </li>
              ))}
            </ul>
          );
        case "important":
          return (
            <div key={index} className="bg-yellow-200 p-4 rounded-md mb-6">
              <strong className="text-lg font-semibold">{item.data}</strong>
            </div>
          );
        default:
          return null;
      }
    });
  };

  return (
    <div className="mb-8 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-2">{blog.title}</h2>
      <h3 className="text-xl text-gray-600 mb-4">{blog.subtitle}</h3>
      <div className="relative w-full h-64 mb-6">
        <Image
          src={`${api.defaults.baseURL}/uploads/${blog.previewImage}`}
          alt={`Image for ${blog.title}`}
          fill
          className="rounded-md"
        />
      </div>
      {blog.content && renderContent(blog.content)}
    </div>
  );
};

export default ViewBlog;
