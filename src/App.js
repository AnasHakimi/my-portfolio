import React, { useState, useEffect, useRef } from "react";

import emailjs from '@emailjs/browser';
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Github, Linkedin, ExternalLink, Code, Sun, Moon, Menu, X, ChevronDown, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";

const ProjectCard = ({ project, index, accent }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = (e) => {
    e.stopPropagation();
    setCurrentSlide((prev) => (prev + 1) % project.images.length);
  };

  const prevSlide = (e) => {
    e.stopPropagation();
    setCurrentSlide((prev) => (prev - 1 + project.images.length) % project.images.length);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative overflow-hidden rounded-2xl backdrop-blur-lg bg-white bg-opacity-5 border border-opacity-10 hover:border-opacity-30 transition-all duration-500 hover:scale-105 flex flex-col"
    >
      {/* Image Carousel */}
      <div className="relative h-48 w-full overflow-hidden bg-black/20">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentSlide}
            src={project.images[currentSlide]}
            alt={project.title}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full h-full object-cover"
          />
        </AnimatePresence>

        {project.images.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-2 top-1/2 -translate-y-1/2 p-1 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors z-10"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors z-10"
            >
              <ChevronRight size={20} />
            </button>

            {/* Dots */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-10">
              {project.images.map((_, idx) => (
                <div
                  key={idx}
                  className={`w-1.5 h-1.5 rounded-full transition-colors ${idx === currentSlide ? 'bg-white' : 'bg-white/50'}`}
                />
              ))}
            </div>
          </>
        )}

        {project.featured && (
          <div className="absolute top-4 right-4 z-10">
            <span className="px-3 py-1 rounded-full text-xs font-semibold shadow-lg" style={{ background: accent, color: 'white' }}>
              Featured
            </span>
          </div>
        )}
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-semibold mb-3">{project.title}</h3>
        <p className="opacity-80 mb-4 leading-relaxed flex-grow">{project.desc}</p>

        <div className="flex flex-wrap gap-2 mb-6">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 rounded-full text-sm border border-opacity-20"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex gap-4 mt-auto">
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-opacity-20 hover:border-opacity-40 transition-all hover:scale-105 w-full justify-center"
          >
            <Github size={16} /> GitHub
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default function Portfolio() {
  const [dark, setDark] = useState(true);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const form = useRef();

  const accent = "#fd7337";
  const gradient = dark
    ? `linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)`
    : `linear-gradient(135deg, #ffffff 0%, #f8fafc 50%, #f1f5f9 100%)`;

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "projects", "contact"];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const projects = [
    {
      id: 1,
      title: "SSM CSI Intelligence Assistant",
      desc: "Developed an AI assistant chatbot for SSM’s CSI data using an LLM model from GROQ as part of my internship project at Suruhanjaya Syarikat Malaysia.",
      tech: ["React.js", "Python", "FastAPI", "GROQ", "Supabase", "Vercel", "Render"],
      images: ["https://github.com/AnasHakimi/my-portfolio/blob/main/src/image/1/home.png?raw=true", "https://github.com/AnasHakimi/my-portfolio/blob/main/src/image/1/chat.png?raw=true"],
      github: "https://github.com/AnasHakimi/habibiCSI",
      featured: true
    },
    {
      id: 2,
      title: "Waste Recycling AR Educational Game",
      desc: "Developed an AR educational game for primary school students to learn about waste recycling using Unity and the Vuforia engine as part of my final year project at university.",
      tech: ["Unity", "Vuforia", "Blender", "Adobe Illustrator"],
      images: ["https://github.com/AnasHakimi/my-portfolio/blob/main/src/image/2/home.jpg?raw=true", "https://github.com/AnasHakimi/my-portfolio/blob/main/src/image/2/1.jpg?raw=true", "https://github.com/AnasHakimi/my-portfolio/blob/main/src/image/2/2.jpg?raw=true", "https://github.com/AnasHakimi/my-portfolio/blob/main/src/image/2/4.jpg?raw=true", "https://github.com/AnasHakimi/my-portfolio/blob/main/src/image/2/3.jpg?raw=true"],
      github: "https://github.com/AnasHakimi/AR_waste_recyclinggame",
      featured: true
    },
    {
      id: 3,
      title: "Kitchenware Classification System",
      desc: "Developed a Kitchenware Classification System using Convolutional Neural Networks (CNNs) in Python, with model training conducted in MATLAB.",
      tech: ["Python", "MATLAB"],
      images: ["https://github.com/AnasHakimi/my-portfolio/blob/main/src/image/6/home3.png?raw=true", "https://github.com/AnasHakimi/my-portfolio/blob/main/src/image/6/home1.png?raw=true", "https://github.com/AnasHakimi/my-portfolio/blob/main/src/image/6/home2.png?raw=true"],
      github: "https://github.com/AnasHakimi/Kitchenware_classify"
    },
    {
      id: 4,
      title: "Food Preference Analysis System",
      desc: "Developed an intelligent prediction system using the K-Nearest Neighbors (KNN) algorithm to determine whether Malaysians prefer local or international cuisine",
      tech: ["Anaconda", "Python", "Jupyter Notebook"],
      images: ["https://github.com/AnasHakimi/my-portfolio/blob/main/src/image/5/home1.png?raw=true", "https://github.com/AnasHakimi/my-portfolio/blob/main/src/image/5/home3.png?raw=true", "https://github.com/AnasHakimi/my-portfolio/blob/main/src/image/5/home2.png?raw=true"],
      github: "https://github.com/AnasHakimi/Food_preferences_system"
    },
    {
      id: 5,
      title: "Virtual Shopping Simulation 3D Game",
      desc: "Developed a virtual shopping simulation game using Unity as part of a group project for the Virtual Reality (CSC573) course in Semester 5.",
      tech: ["Unity", "C#", "Blender", "Canva"],
      images: ["https://github.com/AnasHakimi/First_Person_Shopping_Simulator/blob/main/Preview/home.png?raw=true", "https://github.com/AnasHakimi/First_Person_Shopping_Simulator/blob/main/Preview/coin.png?raw=true", "https://github.com/AnasHakimi/Shopping_Simulation/raw/main/Preview/2.png", "https://github.com/AnasHakimi/Shopping_Simulation/raw/main/Preview/1.png"],
      github: "https://github.com/AnasHakimi/Shopping_Simulation",
    },
    {
      id: 6,
      title: "Car Rental Mobile Application",
      desc: "Developed a car rental mobile application using Android Studio as part of a group project for the Mobile Programming (CSC557) course in Semester 4.",
      tech: ["Kotlin", "Android Studio", "Prostige", "Canva"],
      images: ["https://github.com/AnasHakimi/my-portfolio/blob/main/src/image/4/7.png?raw=true", "https://github.com/AnasHakimi/my-portfolio/blob/main/src/image/4/8.png?raw=true", "https://github.com/AnasHakimi/my-portfolio/blob/main/src/image/4/9.png?raw=true"],
      github: "https://github.com/AnasHakimi/Car_Rental"
    },
    {
      id: 7,
      title: "Courier Management System",
      desc: "Developed a courier management system using Eclipse IDE and XAMPP as part of a group project for the Enterprise Programming (CSC584) course in Semester 4. The system features a real-time API integrated from www.tracking.my.",
      tech: ["Eclipse IDE", "Apache Tomcat", "phpMyAdmin", "Java"],
      images: ["https://github.com/AnasHakimi/Package_Tracking/raw/main/PackageTracking/AIO%20package%20tracking/login.png", "https://github.com/AnasHakimi/Courier_Management_System/blob/main/PackageTracking/AIO%20package%20tracking/1.png?raw=true", "https://github.com/AnasHakimi/Courier_Management_System/blob/main/PackageTracking/AIO%20package%20tracking/dashboard.png?raw=true", "https://github.com/AnasHakimi/Courier_Management_System/blob/main/PackageTracking/AIO%20package%20tracking/admin%20dashboard.png?raw=true"],
      github: "https://github.com/AnasHakimi/Courier_Management_System"
    },
    {
      id: 8,
      title: "Sneakers.Co Ecommerse Website",
      desc: "Developed an e-commerce website for sneakers shopping using Html, Css, Php and XAMPP as part of a group project for the Introduction to Web and Mobile Development (CSC264) course in my diploma Semester 5.",
      tech: ["Html", "Css", "Php", "XAMPP"],
      images: ["https://github.com/AnasHakimi/my-portfolio/blob/main/src/image/3/home.png?raw=true", "https://github.com/AnasHakimi/my-portfolio/blob/main/src/image/3/productpage.png?raw=true", "https://github.com/AnasHakimi/my-portfolio/blob/main/src/image/3/page.png?raw=true", "https://github.com/AnasHakimi/my-portfolio/blob/main/src/image/3/about.png?raw=true"],
      github: "https://github.com/AnasHakimi/Sneakers_Co_Ecommerce"
    }
  ];

  const skills = [
    { name: "Frontend", items: ["Html", "Css", "React.js", "Figma"] },
    { name: "Mobile & Web Dev", items: ["Kotlin", "JavaEE", "Xampp", "PhpMyAdmin"] },
    { name: "AI & Machine Learning", items: ["Python", "Jupyter Notebook", "MATLAB", "GROQ"] },
    { name: "Tools", items: ["Blender", "Figma", "Adobe Illustrator", "Canva"] }
  ];

  const contact = {
    name: "Muhammad Anas Hakimi",
    tagline: "Tech Enthusiast & Creative Developer",
    bio: "A passionate developer with a strong interest in frontend and backend development. I enjoy turning ideas into functional, user-friendly digital experiences and constantly explore new technologies to improve my craft. Always eager to learn, build, and create meaningful solutions.",
    email: "hakimi11102@gmail.com",
    github: "https://github.com/AnasHakimi",
    linkedin: "https://www.linkedin.com/in/anashakimi/",
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setOpen(false);
    }
  };

  const sendEmail = (e) => {
    e.preventDefault();

    // REPLACE THESE WITH YOUR ACTUAL EMAILJS CREDENTIALS
    // Sign up at https://www.emailjs.com/
    const SERVICE_ID = 'service_chdxijn';
    const TEMPLATE_ID = 'template_1fa8rpr';
    const PUBLIC_KEY = 'xUpJMP6C-pqC24Lyh';

    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.current, PUBLIC_KEY)
      .then((result) => {
        console.log(result.text);
        alert("Message sent successfully!");
        e.target.reset();
      }, (error) => {
        console.log(error.text);
        alert("Failed to send message. Please check your EmailJS credentials.");
      });
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${dark ? "dark bg-gray-900 text-white" : "bg-white text-gray-900"
        }`}
      style={{ background: gradient }}
    >
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute -inset-10 ${dark ? 'opacity-20' : 'opacity-60'} transition-opacity duration-700`}>
          <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full blur-3xl animate-pulse" style={{ background: accent, animationDuration: '4s' }}></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse" style={{ background: dark ? '#6366f1' : '#93c5fd', animationDuration: '7s' }}></div>
        </div>
      </div>

      <div className="relative max-w-6xl mx-auto px-4 py-6 z-10">
        {/* Enhanced NAV */}
        <header className="flex items-center justify-between py-4">
          <a
            href="#"
            className="font-bold text-xl bg-clip-text text-transparent"
            style={{ backgroundImage: `linear-gradient(45deg, ${accent}, ${dark ? '#818cf8' : '#3b82f6'})` }}
          >
            {contact.name.split(' ')[1]}
            <span className="ml-1 opacity-70">/ Kimi</span>
          </a>

          <nav className="hidden md:flex gap-8 items-center">
            {["home", "projects", "skills", "contact"].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className={`px-3 py-2 rounded-lg transition-all duration-200 ${activeSection === item
                  ? "text-white font-semibold scale-110"
                  : "opacity-70 hover:opacity-100"
                  }`}
                style={{
                  background: activeSection === item ? accent : 'transparent',
                  transform: activeSection === item ? 'translateY(-2px)' : 'none'
                }}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </button>
            ))}

            <button
              onClick={() => setDark(!dark)}
              className="p-2 rounded-lg border border-opacity-20 hover:border-opacity-40 transition-all duration-200 hover:scale-110"
              aria-label="Toggle theme"
            >
              {dark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </nav>

          <div className="md:hidden flex items-center gap-3">
            <button
              onClick={() => setDark(!dark)}
              className="p-2 rounded-lg border border-opacity-20"
            >
              {dark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              onClick={() => setOpen(!open)}
              className="p-2 rounded-lg border border-opacity-20"
              aria-label="Toggle menu"
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </header>

        {/* Enhanced MOBILE MENU */}
        {open && (
          <div className="md:hidden mt-4 p-4 rounded-xl backdrop-blur-lg bg-white bg-opacity-10 border border-white border-opacity-20">
            {["home", "projects", "skills", "contact"].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className="block w-full text-left py-3 px-4 rounded-lg hover:bg-white hover:bg-opacity-10 transition-colors"
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </button>
            ))}
          </div>
        )}

        {/* Enhanced HERO */}
        <section id="home" className="min-h-[80vh] flex items-center pt-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6 order-2 lg:order-1 text-center lg:text-left"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-opacity-20 text-sm">
                <Sparkles size={16} />
                <span>Available for employment opportunities</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                Hi, I'm{" "}
                <span className="bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(45deg, ${accent}, ${dark ? '#818cf8' : '#3b82f6'})` }}>
                  {contact.name.split(' ')[1]}
                </span>
              </h1>

              <p className="text-xl sm:text-2xl font-medium opacity-90" style={{ color: accent }}>
                {contact.tagline}
              </p>

              <p className="text-lg opacity-80 leading-relaxed">{contact.bio}</p>

              <div className="flex flex-wrap gap-4 pt-4 justify-center lg:justify-start">
                <a
                  href={contact.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-3 px-6 py-3 rounded-xl border border-opacity-20 hover:border-opacity-40 transition-all duration-200 hover:scale-105 hover:shadow-lg"
                >
                  <Github size={20} /> GitHub
                </a>

                <a
                  href={contact.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-3 px-6 py-3 rounded-xl border border-opacity-20 hover:border-opacity-40 transition-all duration-200 hover:scale-105 hover:shadow-lg"
                >
                  <Linkedin size={20} /> LinkedIn
                </a>

                <a
                  href={`mailto:${contact.email}`}
                  className="inline-flex items-center gap-3 px-6 py-3 rounded-xl text-white transition-all duration-200 hover:scale-105 hover:shadow-lg"
                  style={{ background: accent }}
                >
                  <Mail size={20} /> Get In Touch
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="flex justify-center lg:justify-end order-1 lg:order-2"
            >
              <div
                className="relative w-72 h-auto py-10 sm:py-0 sm:w-80 sm:h-80 rounded-3xl border-4 border-opacity-20 flex items-center justify-center overflow-hidden group"
                style={{ borderColor: accent }}
              >
                <div
                  className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-300"
                  style={{ background: accent }}
                ></div>

                <div className="text-center relative z-10 sm:p-8">
                  <div className="mb-4 relative w-32 h-32 mx-auto">
                    <img
                      src={`${process.env.PUBLIC_URL}/profile.png`}
                      alt="Anas Hakimi"
                      className="w-full h-full object-cover rounded-full border-4 border-white border-opacity-20 shadow-lg"
                    />
                  </div>
                  <div className="font-semibold text-lg">Anas Hakimi</div>
                  <div className="mt-2 text-sm opacity-70">Frontend • Mobile • Game Dev</div>

                  <div className="mt-6 flex justify-center gap-2">
                    {["Python", "React", "Java"].map((tech) => (
                      <span key={tech} className="text-xs px-2 py-1 rounded-full border border-opacity-20">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Floating elements */}
                <div className="absolute top-4 right-4 w-3 h-3 rounded-full animate-pulse" style={{ background: accent }}></div>
                <div className="absolute bottom-6 left-6 w-2 h-2 rounded-full animate-pulse delay-300" style={{ background: accent }}></div>
              </div>
            </motion.div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <button
              onClick={() => scrollToSection('projects')}
              className="p-2 rounded-full border border-opacity-20 hover:border-opacity-40 transition-all"
            >
              <ChevronDown size={24} />
            </button>
          </div>
        </section>

        {/* SKILLS SECTION */}
        <section id="skills" className="py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Skills & Technologies</h2>
            <p className="text-lg opacity-70 max-w-2xl mx-auto">Here are the technologies and tools I work with to bring ideas to life</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.map((skillGroup, index) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                key={skillGroup.name}
                className="p-6 rounded-2xl backdrop-blur-lg bg-white bg-opacity-5 border border-opacity-10 hover:border-opacity-30 transition-all duration-300 hover:scale-105"
              >
                <h3 className="font-semibold text-lg mb-4" style={{ color: accent }}>{skillGroup.name}</h3>
                <div className="space-y-2">
                  {skillGroup.items.map((item) => (
                    <div key={item} className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full" style={{ background: accent }}></div>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Enhanced PROJECTS */}
        <section id="projects" className="py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Featured Projects</h2>
            <p className="text-lg opacity-70 max-w-2xl mx-auto">A collection of projects that showcase my skills and passion for development</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} accent={accent} />
            ))}
          </div>
        </section>

        {/* Enhanced CONTACT */}
        <section id="contact" className="py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Let's Work Together</h2>
            <p className="text-lg opacity-70 max-w-2xl mx-auto">Have a project in mind? I'd love to hear about it</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <div className="p-6 rounded-2xl backdrop-blur-lg bg-white bg-opacity-5 border border-opacity-10">
                <h3 className="font-semibold text-lg mb-4">Get in touch</h3>
                <div className="space-y-4">
                  <a href={`mailto:${contact.email}`} className="flex items-center gap-3 p-3 rounded-lg hover:bg-white hover:bg-opacity-5 transition-colors">
                    <Mail size={20} />
                    <div>
                      <div className="font-medium">Email</div>
                      <div className="opacity-80">{contact.email}</div>
                    </div>
                  </a>

                  <a href={contact.github} target="_blank" rel="noreferrer" className="flex items-center gap-3 p-3 rounded-lg hover:bg-white hover:bg-opacity-5 transition-colors">
                    <Github size={20} />
                    <div>
                      <div className="font-medium">GitHub</div>
                      <div className="opacity-80">@{contact.github.split('/').pop()}</div>
                    </div>
                  </a>

                  <a href={contact.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-3 p-3 rounded-lg hover:bg-white hover:bg-opacity-5 transition-colors">
                    <Linkedin size={20} />
                    <div>
                      <div className="font-medium">LinkedIn</div>
                      <div className="opacity-80">Connect professionally</div>
                    </div>
                  </a>
                </div>
              </div>
            </motion.div>

            <motion.form
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              ref={form}
              className="space-y-4"
              onSubmit={sendEmail}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="user_name"
                  placeholder="Your name"
                  className="p-4 rounded-xl backdrop-blur-lg bg-white bg-opacity-5 border border-opacity-10 focus:border-opacity-40 transition-all focus:scale-105"
                  required
                />
                <input
                  type="email"
                  name="user_email"
                  placeholder="Your email"
                  className="p-4 rounded-xl backdrop-blur-lg bg-white bg-opacity-5 border border-opacity-10 focus:border-opacity-40 transition-all focus:scale-105"
                  required
                />
              </div>
              <textarea
                name="message"
                placeholder="Your message"
                rows={6}
                className="p-4 rounded-xl backdrop-blur-lg bg-white bg-opacity-5 border border-opacity-10 focus:border-opacity-40 transition-all focus:scale-105 w-full"
              />
              <button
                type="submit"
                className="w-full py-4 rounded-xl font-semibold text-white transition-all duration-200 hover:scale-105 hover:shadow-xl"
                style={{ background: accent }}
              >
                Send Message
              </button>
            </motion.form>
          </div>
        </section>

        {/* Enhanced FOOTER */}
        <footer className="py-8 border-t border-opacity-10 text-center opacity-70">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div>© {new Date().getFullYear()} {contact.name}</div>
            <div className="flex gap-4">
              <a href={contact.github} className="hover:opacity-100 transition-opacity">GitHub</a>
              <a href={contact.linkedin} className="hover:opacity-100 transition-opacity">LinkedIn</a>
              <a href={`mailto:${contact.email}`} className="hover:opacity-100 transition-opacity">Email</a>
            </div>
            <div>Built with React & Tailwind</div>
          </div>
        </footer>
      </div>
    </div>
  );
}