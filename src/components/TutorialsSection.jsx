import React from 'react';

const TutorialsSection = () => {
  // Sample tutorials data - in a real app, this would likely come from an API or database
  const tutorials = [
    {
      id: 1,
      title: "Complete React.js for Beginners",
      level: "Beginner",
      duration: "4 hours",
      description: "Learn React.js from scratch and build your first web application.",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop",
      instructor: "John Doe",
      tags: ["React", "JavaScript", "Frontend"]
    },
    {
      id: 2,
      title: "Advanced CSS Techniques",
      level: "Intermediate",
      duration: "3.5 hours",
      description: "Master modern CSS layouts, animations, and responsive design patterns.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop",
      instructor: "Jane Smith",
      tags: ["CSS", "Design", "Frontend"]
    },
    {
      id: 3,
      title: "Node.js API Development",
      level: "Intermediate",
      duration: "5 hours",
      description: "Build robust and scalable RESTful APIs with Node.js and Express.",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=250&fit=crop",
      instructor: "Mike Johnson",
      tags: ["Node.js", "API", "Backend"]
    },
    {
      id: 4,
      title: "Python Data Science Fundamentals",
      level: "Beginner",
      duration: "6 hours",
      description: "Get started with data analysis and visualization using Python libraries.",
      image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=250&fit=crop",
      instructor: "Sarah Wilson",
      tags: ["Python", "Data Science", "Analytics"]
    },
    {
      id: 5,
      title: "Full Stack Development Masterclass",
      level: "Advanced",
      duration: "10 hours",
      description: "Comprehensive guide to building modern web applications from front to back.",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=250&fit=crop",
      instructor: "David Brown",
      tags: ["Full Stack", "JavaScript", "React", "Node.js"]
    },
    {
      id: 6,
      title: "Mobile App Development with Flutter",
      level: "Intermediate",
      duration: "7 hours",
      description: "Create beautiful cross-platform mobile apps with Flutter and Dart.",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=250&fit=crop",
      instructor: "Amanda White",
      tags: ["Flutter", "Dart", "Mobile"]
    }
  ];

  return (
    <section id="tutorials" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Popular Tutorials
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Enhance your coding skills with our comprehensive, step-by-step tutorials
            created by industry experts.
          </p>
        </div>

        {/* Filters - could be expanded with actual filtering functionality */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-full text-sm font-medium">
            All Tutorials
          </button>
          <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-300 transition-colors">
            Frontend
          </button>
          <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-300 transition-colors">
            Backend
          </button>
          <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-300 transition-colors">
            Mobile
          </button>
          <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-300 transition-colors">
            Data Science
          </button>
        </div>

        {/* Tutorials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tutorials.map((tutorial) => (
            <div 
              key={tutorial.id} 
              className="bg-white rounded-xl shadow-md overflow-hidden transition-transform hover:scale-105 hover:shadow-lg"
            >
              <div className="relative h-48">
                <img 
                  src={tutorial.image} 
                  alt={tutorial.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-0 right-0 bg-blue-600 text-white px-3 py-1 m-2 rounded-full text-xs font-medium">
                  {tutorial.level}
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{tutorial.title}</h3>
                  <span className="text-sm text-gray-500">{tutorial.duration}</span>
                </div>
                <p className="text-gray-600 mb-4">{tutorial.description}</p>
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mr-2">
                    <span className="text-xs font-medium">{tutorial.instructor.split(' ').map(n => n[0]).join('')}</span>
                  </div>
                  <span className="text-sm text-gray-700">{tutorial.instructor}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {tutorial.tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="px-2 py-1 bg-gray-100 text-gray-600 rounded-md text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <button className="mt-4 w-full py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:opacity-90 transition-opacity">
                  Start Learning
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button className="px-8 py-3 bg-white text-blue-600 border border-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors">
            View All Tutorials
          </button>
        </div>
      </div>
    </section>
  );
};

export default TutorialsSection;
