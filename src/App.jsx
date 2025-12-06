import React, { useState, useEffect, useRef } from "react";
import {
  Menu,
  X,
  ArrowRight,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  ArrowUp,
  ArrowDown,
  Maximize2,
  Grid,
} from "lucide-react";
import * as framerMotion from "framer-motion";

// --- DATA ---
const projects = [
  {
    id: 1,
    title: "Vertex House",
    category: "Residential",
    location: "Oslo, Norway",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1600",
    year: "2023",
    area: "450 sqm",
    status: "Completed",
    description:
      "A dialogue between sharp angles and soft nordic light, designed to capture the shifting seasons. The structure uses locally sourced timber and concrete to create a thermal mass that regulates the internal temperature naturally.",
    details:
      "The Vertex House challenges traditional cabin typology. By rotating the living volume 45 degrees, we maximized solar gain while minimizing wind exposure. The interior palette is stripped back to raw oak and exposed aggregate.",
  },
  {
    id: 2,
    title: "Aura Museum",
    category: "Cultural",
    location: "Berlin, Germany",
    image:
      "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&q=80&w=1600",
    year: "2022",
    area: "12,000 sqm",
    status: "Completed",
    description:
      "A space of silence and contemplation, featuring brutalist concrete forms softened by natural illumination.",
    details:
      "Designed to house a private collection of modern sculpture, the museum functions as a light trap. Roof apertures direct beams of sunlight that move across the concrete floor throughout the day, acting as a natural sundial.",
  },
  {
    id: 3,
    title: "Eco Hub",
    category: "Commercial",
    location: "Seattle, USA",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1600",
    year: "2023",
    area: "25,000 sqm",
    status: "Under Construction",
    description:
      "The future of workspace, integrating vertical forests and sustainable energy systems into the urban fabric.",
    details:
      "This project redefines the high-rise. Instead of a sealed glass box, we created a porous structure with breathing terraces on every third floor. The facade integrates algae-bio-reactive panels to generate energy.",
  },
  {
    id: 4,
    title: "Serenity Pavilion",
    category: "Landscape",
    location: "Kyoto, Japan",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Kiyomizu.jpg/1280px-Kiyomizu.jpg",
    year: "2021",
    area: "120 sqm",
    status: "Completed",
    description:
      "Merging traditional tea house techniques with modern steel construction to create a weightless sanctuary.",
    details:
      "Located in a private garden, the pavilion floats above a koi pond. We utilized 12mm thick steel plates for the roof, allowing for an impossibly thin edge profile that disappears against the tree canopy.",
  },
  {
    id: 5,
    title: "Urban Loft 42",
    category: "Interior",
    location: "New York, USA",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=1600",
    year: "2022",
    area: "300 sqm",
    status: "Completed",
    description:
      "Reimagining industrial heritage for modern living, preserving the raw history while adding warmth.",
    details:
      "A complete gut-renovation of a 1920s textile factory. We preserved the original brick walls and timber beams, contrasting them with sharp, white monolithic volumes that house the kitchen and bathrooms.",
  },
  {
    id: 6,
    title: "Boarding House",
    category: "Siomai-an",
    location: "Tisa, Cebu, Philippines",
    image:
      "https://storage.googleapis.com/cebuinsights-assets/2024/08/28284462-tisa-1.jpg",
    year: "2025",
    area: "200 sqm",
    status: "Completed",
    description:
      "Reimagining industrial heritage for modern living, preserving the raw history while adding warmth of siomai.",
    details: "ah basta siomai-an",
  },
];

// --- COMPONENTS ---

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <framerMotion.motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-8 md:px-12 py-6 transition-colors duration-300 ${
          scrolled
            ? "bg-neutral-900/80 backdrop-blur-md border-b border-white/10"
            : "bg-transparent"
        }`}
      >
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="text-2xl font-bold tracking-tighter text-white z-50 mix-blend-difference"
        >
          LIE<span className="text-neutral-500">ARCH</span>
        </a>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="group flex items-center gap-3 text-white z-50 mix-blend-difference"
        >
          <span className="hidden md:block text-xs font-bold uppercase tracking-widest group-hover:text-neutral-400 transition-colors">
            {isMenuOpen ? "Close" : "Menu"}
          </span>
          <div className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center bg-neutral-900 group-hover:bg-white group-hover:text-black transition-all duration-300">
            {isMenuOpen ? <X size={16} /> : <Menu size={16} />}
          </div>
        </button>
      </framerMotion.motion.nav>

      <framerMotion.AnimatePresence>
        {isMenuOpen && (
          <framerMotion.motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 bg-neutral-900 flex items-center justify-center"
          >
            <div className="flex flex-col items-center space-y-8">
              {["Projects", "About", "Contact"].map((item, i) => (
                <framerMotion.motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 + i * 0.1 }}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-500 hover:to-white transition-all cursor-pointer tracking-tight"
                >
                  {item}
                </framerMotion.motion.a>
              ))}
            </div>
          </framerMotion.motion.div>
        )}
      </framerMotion.AnimatePresence>
    </>
  );
};

const Hero = () => {
  return (
    <section className="relative h-screen flex flex-col justify-between p-8 md:p-12 bg-neutral-900 text-white overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-40">
        <img
          src="https://images.unsplash.com/photo-1486718448742-163732cd1544?auto=format&fit=crop&q=80&w=2000"
          alt="Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/50 to-transparent" />
      </div>

      <div className="relative z-10 pt-32">
        <framerMotion.motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400 mb-6"
        >
          Established 2025
        </framerMotion.motion.p>
        <framerMotion.motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-6xl md:text-9xl font-bold tracking-tighter leading-none max-w-4xl"
        >
          Form <br /> Follows <br />{" "}
          <span className="text-neutral-500">Fiction.</span>
        </framerMotion.motion.h1>
      </div>

      <div className="relative z-10 flex justify-between items-end border-t border-white/10 pt-8">
        <p className="max-w-md text-sm text-neutral-400 leading-relaxed hidden md:block">
          I am an avant-garde architect based in Mandaue and Cebu, dedicated to
          challenging the boundaries of physical space.
        </p>
        <framerMotion.motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest"
        >
          Scroll to Explore <ArrowDown size={14} />
        </framerMotion.motion.div>
      </div>
    </section>
  );
};

// --- CASE STUDY MODAL ---
const CaseStudyModal = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <framerMotion.motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] bg-neutral-900 flex flex-col overflow-y-auto"
    >
      {/* Modal Header */}
      <div className="sticky top-0 w-full flex justify-between items-center p-8 bg-neutral-900/90 backdrop-blur-md z-50 border-b border-white/10">
        <span className="text-white text-sm font-mono">
          {project.title} — Case Study
        </span>
        <button
          onClick={onClose}
          className="text-white hover:text-neutral-400 transition-colors"
        >
          <span className="sr-only">Close</span>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest">
            Close <X size={20} />
          </div>
        </button>
      </div>

      {/* Modal Content */}
      <div className="flex-1 w-full max-w-7xl mx-auto p-8 md:p-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-24">
          {/* Main Image */}
          <div className="md:col-span-12 h-[60vh] bg-neutral-800 rounded-lg overflow-hidden mb-8">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Project Stats */}
          <div className="md:col-span-4 space-y-8 border-t border-white/20 pt-8">
            <div>
              <h4 className="text-xs text-neutral-500 uppercase tracking-widest mb-2">
                Location
              </h4>
              <p className="text-white text-lg">{project.location}</p>
            </div>
            <div>
              <h4 className="text-xs text-neutral-500 uppercase tracking-widest mb-2">
                Year
              </h4>
              <p className="text-white text-lg">{project.year}</p>
            </div>
            <div>
              <h4 className="text-xs text-neutral-500 uppercase tracking-widest mb-2">
                Area
              </h4>
              <p className="text-white text-lg">{project.area}</p>
            </div>
            <div>
              <h4 className="text-xs text-neutral-500 uppercase tracking-widest mb-2">
                Status
              </h4>
              <p className="text-white text-lg">{project.status}</p>
            </div>
          </div>

          {/* Detailed Description */}
          <div className="md:col-span-8 border-t border-white/20 pt-8">
            <h2 className="text-4xl font-bold text-white mb-8">
              Architectural Narrative
            </h2>
            <p className="text-neutral-300 text-lg leading-relaxed mb-8">
              {project.details}
            </p>
            <p className="text-neutral-300 text-lg leading-relaxed">
              The project represents a pivotal moment in our exploration of
              material honesty. By exposing the structural elements, we allow
              the building to tell its own story of construction and permanence.
            </p>
          </div>
        </div>

        {/* Image Grid (Placeholders for Gallery) */}
        <div className="mb-24">
          <h3 className="text-2xl text-white font-bold mb-8">
            Visual Documentation
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="aspect-square bg-neutral-800 flex items-center justify-center text-neutral-600">
              <span className="text-xs uppercase tracking-widest">
                [ Interior Detail 01 ]
              </span>
            </div>
            <div className="aspect-square bg-neutral-800 flex items-center justify-center text-neutral-600">
              <span className="text-xs uppercase tracking-widest">
                [ Site Plan ]
              </span>
            </div>
            <div className="aspect-video md:col-span-2 bg-neutral-800 flex items-center justify-center text-neutral-600">
              <span className="text-xs uppercase tracking-widest">
                [ Elevation Drawing ]
              </span>
            </div>
          </div>
        </div>
      </div>
    </framerMotion.motion.div>
  );
};

// --- ARCHIVE MODAL ---
const ArchiveModal = ({ isOpen, onClose, projects }) => {
  if (!isOpen) return null;

  return (
    <framerMotion.motion.div
      initial={{ opacity: 0, y: "100%" }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: "100%" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-[70] bg-neutral-900 text-white flex flex-col"
    >
      <div className="flex justify-between items-center p-8 border-b border-white/10">
        <h2 className="text-4xl font-bold tracking-tighter">Project Archive</h2>
        <button
          onClick={onClose}
          className="group flex items-center gap-2 text-xs font-bold uppercase tracking-widest hover:text-neutral-400 transition-colors"
        >
          Close <X size={20} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-8">
        <div className="w-full max-w-7xl mx-auto">
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-4 pb-4 border-b border-white/20 text-xs font-bold uppercase tracking-widest text-neutral-500 mb-4 md:grid">
            <div className="col-span-1">Year</div>
            <div className="col-span-4">Project</div>
            <div className="col-span-3">Location</div>
            <div className="col-span-2">Category</div>
            <div className="col-span-2 text-right">Status</div>
          </div>

          {/* Table Rows */}
          <div className="space-y-4">
            {projects.map((project) => (
              <div
                key={project.id}
                className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 py-4 border-b border-white/5 hover:bg-white/5 transition-colors items-center group cursor-default"
              >
                <div className="col-span-1 font-mono text-sm text-neutral-400">
                  {project.year}
                </div>
                <div className="col-span-4 text-xl font-bold">
                  {project.title}
                </div>
                <div className="col-span-3 text-neutral-300 hidden md:block">
                  {project.location}
                </div>
                <div className="col-span-2 text-xs uppercase tracking-widest bg-white/10 w-fit px-2 py-1 rounded hidden md:block">
                  {project.category}
                </div>
                <div className="col-span-2 text-right text-sm text-neutral-400 hidden md:block">
                  {project.status}
                </div>
              </div>
            ))}
            {/* Simulated Archive Entries */}
            {/* {projects.map((project) => (
                    <div key={`dup-${project.id}`} className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 py-4 border-b border-white/5 hover:bg-white/5 transition-colors items-center group cursor-default opacity-50">
                        <div className="col-span-1 font-mono text-sm text-neutral-400">{parseInt(project.year) - 2}</div>
                        <div className="col-span-4 text-xl font-bold">{project.title} II (Concept)</div>
                        <div className="col-span-3 text-neutral-300 hidden md:block">{project.location}</div>
                        <div className="col-span-2 text-xs uppercase tracking-widest bg-white/10 w-fit px-2 py-1 rounded hidden md:block">{project.category}</div>
                        <div className="col-span-2 text-right text-sm text-neutral-400 hidden md:block">Unbuilt</div>
                    </div>
                ))} */}
          </div>
        </div>
      </div>
    </framerMotion.motion.div>
  );
};

const ProjectItem = ({ project, setActiveProject, onOpenModal }) => {
  const ref = useRef(null);
  const isInView = framerMotion.useInView(ref, { margin: "-50% 0px -50% 0px" });

  useEffect(() => {
    if (isInView) setActiveProject(project.id);
  }, [isInView, project.id, setActiveProject]);

  return (
    <div
      ref={ref}
      className="group min-h-[50vh] md:min-h-[70vh] flex flex-col justify-center cursor-pointer py-12"
    >
      {/* Mobile Image */}
      <div className="md:hidden w-full aspect-video mb-6 overflow-hidden rounded-lg">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="border-l border-neutral-800 pl-8 transition-all duration-500 group-hover:border-white">
        <span className="text-neutral-500 font-mono text-xs mb-4 block">
          0{project.id}
        </span>
        <h3 className="text-4xl md:text-6xl font-bold text-white mb-6 transition-colors group-hover:text-neutral-400">
          {project.title}
        </h3>
        <div className="flex items-center gap-4 text-neutral-400 text-sm uppercase tracking-widest mb-6">
          <span>{project.category}</span>
          <span className="w-1 h-1 bg-neutral-600 rounded-full" />
          <span>{project.year}</span>
        </div>
        <p className="text-neutral-400 leading-relaxed max-w-md mb-8">
          {project.description}
        </p>
        <button
          onClick={() => onOpenModal(project)}
          className="flex items-center gap-2 text-white font-bold text-xs uppercase tracking-widest opacity-60 group-hover:opacity-100 transition-opacity translate-x-0 group-hover:translate-x-2 duration-300"
        >
          View Case Study <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
};

const ProjectsGallery = ({ onOpenModal, onOpenArchive }) => {
  const [activeProject, setActiveProject] = useState(projects[0].id);

  return (
    <section id="projects" className="bg-neutral-900 py-32 px-8 md:px-12">
      <div className="mb-24 flex flex-col md:flex-row justify-between md:items-end">
        <div>
          <h2 className="text-5xl md:text-8xl font-bold text-white mb-8">
            Selected
            <br />
            Works
          </h2>
          <div className="h-px w-24 bg-white/20" />
        </div>
        <div className="mt-8 md:mt-0 text-right">
          <p className="text-white text-lg font-light">Index of Projects</p>
          <p className="text-neutral-500 text-sm">2021 — 2023</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-12 lg:gap-24 relative">
        {/* Sticky Image Section (Showcase) */}
        <div className="hidden md:block w-1/2 h-[80vh] sticky top-32">
          <div className="relative w-full h-full overflow-hidden bg-neutral-800 rounded-lg shadow-2xl">
            <framerMotion.AnimatePresence mode="popLayout">
              {projects.slice(0, 5).map(
                (project) =>
                  project.id === activeProject && (
                    <framerMotion.motion.div
                      key={project.id}
                      initial={{ opacity: 0, scale: 1.1 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.6 }}
                      className="absolute inset-0 w-full h-full"
                    >
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/10" />
                    </framerMotion.motion.div>
                  )
              )}
            </framerMotion.AnimatePresence>

            {/* Overlay Info on Image */}
            <div className="absolute bottom-0 left-0 p-8 w-full bg-gradient-to-t from-black/80 to-transparent">
              <p className="text-white text-xl font-light italic">
                "{projects.find((p) => p.id === activeProject)?.location}"
              </p>
            </div>
          </div>
        </div>

        {/* Scrollable List Section (Portfolio) */}
        <div className="w-full md:w-1/2 flex flex-col gap-0 md:pb-[20vh]">
          {projects.slice(0, 5).map((project) => (
            <ProjectItem
              key={project.id}
              project={project}
              setActiveProject={setActiveProject}
              onOpenModal={onOpenModal}
            />
          ))}
        </div>
      </div>

      <div className="mt-32 flex justify-center border-t border-white/10 pt-12">
        <button
          onClick={onOpenArchive}
          className="border border-white/20 text-white px-12 py-4 text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all"
        >
          View Entire Archive
        </button>
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="bg-white text-black py-32 px-8 md:px-12">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24">
        {/* Title & Portrait */}
        <div className="md:col-span-5 flex flex-col">
          <h2 className="text-5xl md:text-8xl font-bold tracking-tighter mb-12">
            About <br /> Me.
          </h2>
          <div className="w-full aspect-[3/4] bg-neutral-100 overflow-hidden relative">
            <img
              src="src\assets\charlie-image.jpg"
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              alt="Portrait"
            />
          </div>
        </div>

        {/* Bio Content */}
        <div className="md:col-span-7 flex flex-col justify-center pt-12 md:pt-32">
          <h3 className="text-2xl md:text-4xl font-light leading-tight mb-8">
            "I believe architecture is not about filling space, but creating
            it."
          </h3>
          <div className="h-px w-24 bg-black/10 mb-8" />

          <div className="space-y-6 text-lg text-neutral-600 leading-relaxed">
            <p>
              Hi, I’m Charlie. I’m an architecture student drawn to how spaces
              shape the way people move and feel.
            </p>
            <p>
              My work sits between curiosity and craft. I study how light, form,
              and texture guide experience, and I aim to design spaces that feel
              purposeful, grounded, and human.
            </p>
          </div>

          {/* Stats/Resume Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8 mt-16 border-t border-black/10 pt-12">
            <div>
              <h4 className="font-bold text-sm uppercase tracking-widest mb-4">
                Focus
              </h4>
              <ul className="space-y-2 text-sm text-neutral-500">
                <li>Residential Design</li>
                <li>Interior Design</li>
                {/* <li>Cultural Restoration</li> */}
                {/* <li>Sustainable Systems</li> */}
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-sm uppercase tracking-widest mb-4">
                Education
              </h4>
              <ul className="space-y-2 text-sm text-neutral-500">
                {/* <li>M.Arch, AHO Oslo</li> */}
                <li>BS.Arch, CIT - University</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-sm uppercase tracking-widest mb-4">
                Contact
              </h4>
              <p className="text-sm text-neutral-500">
                charlie.jadormeo@cit.edu
              </p>
            </div>
            <div>
              <h4 className="font-bold text-sm uppercase tracking-widest mb-4">
                Social
              </h4>
              <div className="flex gap-4 text-sm text-neutral-500">
                <a href="#" className="hover:text-black hover:underline">
                  Facebook
                </a>
                <a href="#" className="hover:text-black hover:underline">
                  Instagram
                </a>
                <a href="#" className="hover:text-black hover:underline">
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <footer
      id="contact"
      className="bg-neutral-900 text-white py-24 px-8 md:px-12 border-t border-white/10"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24">
        <h2 className="text-6xl md:text-9xl font-bold tracking-tighter text-white/90">
          Get in <br /> Touch.
        </h2>
        <a
          href="mailto:charlie.jadormeo@cit.edu"
          className="mt-12 md:mt-0 text-xl md:text-3xl border-b border-white/30 pb-2 hover:text-neutral-400 hover:border-white transition-all"
        >
          charlie.jadormeo@cit.edu
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-white/10 pt-12">
        <div>
          <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-6">
            Socials
          </h4>
          <div className="flex flex-col gap-4">
            <a href="#" className="hover:text-neutral-400 transition-colors">
              Facebook
            </a>
            <a href="#" className="hover:text-neutral-400 transition-colors">
              LinkedIn
            </a>
            <a href="#" className="hover:text-neutral-400 transition-colors">
              Instagram
            </a>
          </div>
        </div>
        <div>
          <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-6">
            Location
          </h4>
          <address className="not-italic text-neutral-300 leading-relaxed">
            <a
              href="https://maps.app.goo.gl/kSoCYPAfZBadRPAe7"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              Katipunan Street,
              <br />
              Doña Esperanza Village, Tisa
              <br />
              Cebu City, Cebu 6000
            </a>
          </address>
        </div>
        <div className="flex items-end justify-start md:justify-end">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="group flex items-center gap-2 text-xs font-bold uppercase tracking-widest"
          >
            Back to Top
            <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
              <ArrowUp size={14} />
            </div>
          </button>
        </div>
      </div>

      <div className="mt-24 text-center md:text-left">
        <p className="text-xs text-neutral-600 font-bold uppercase tracking-widest">
          © 2025 Charlie Jadormeo. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default function App() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isArchiveOpen, setIsArchiveOpen] = useState(false);

  return (
    <div className="font-sans antialiased selection:bg-white selection:text-black bg-neutral-900">
      <Navbar />
      <Hero />
      <ProjectsGallery
        onOpenModal={setSelectedProject}
        onOpenArchive={() => setIsArchiveOpen(true)}
      />
      <About />
      <Contact />

      <framerMotion.AnimatePresence>
        {selectedProject && (
          <CaseStudyModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </framerMotion.AnimatePresence>

      <framerMotion.AnimatePresence>
        {isArchiveOpen && (
          <ArchiveModal
            isOpen={isArchiveOpen}
            onClose={() => setIsArchiveOpen(false)}
            projects={projects}
          />
        )}
      </framerMotion.AnimatePresence>
    </div>
  );
}
