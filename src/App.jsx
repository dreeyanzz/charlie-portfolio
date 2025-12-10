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
const Images = import.meta.glob("./assets/*.{png,jpg,jpeg,svg}", {
  eager: true,
  as: "url",
});

const Profile = Images["./assets/charlie-image.jpg"];

// --- DATA ---
const projects = [
  {
    id: 1,
    title: "Tagbo",
    category: "Digital",
    image: Images["./assets/Tagbo.jpeg"],
    thumbnail: Images["./assets/Tagbo-thumbnail.jpg"],
    year: "2025",
    status: "Completed",
    details:
      "“Tagbo” is a food village whose architectural concept is inspired by the form and dynamics of a paper plane. The design emphasizes lightness, direction, and openness, expressed through angular rooflines, overlapping planes, and airy structural frameworks that guide movement throughout the space. Wide spans and open layouts encourage natural ventilation, while strategic orientation maximizes daylight and creates a welcoming environment for communal dining. The folded, layered forms of the structure reflect the folds of a paper plane, symbolizing both simplicity and ingenuity in design. By combining functional circulation, climate-responsive strategies, and a playful yet purposeful form, “Tagbo” becomes not only a hub for food and community but also a contemporary architectural statement rooted in clarity, flow, and connection.",
  },
  {
    id: 2,
    title: "The Archdiocesan Museum of Cebu",
    category: "Photography",
    image: Images["./assets/the-archdiocesan-museum-of-cebu.jpeg"],
    thumbnail: Images["./assets/the-archdiocesan-museum-of-cebu-thumbnail.jpg"],
    year: "2025",
    status: "Completed",
    details:
      "This photography captures the character and historic charm of the Archdiocesan Museum of Cebu through a series of interior and architectural photographs that highlight its preserved heritage features. The images showcase the warm tones of the museum’s wooden floors, beams, and antique staircase, emphasizing the structure’s traditional balay na bato elements and its blend of coral-stone and timber materials. Display galleries featuring religious artifacts, liturgical items, and archival collections are presented with clarity, illustrating the museum’s role in preserving Cebu’s ecclesiastical history. The varied angles—ranging from close-up details to wider interior views—convey the building’s spatial depth, cultural significance, and careful restoration, offering a cohesive visual narrative that reflects both its architectural authenticity and its function as a heritage museum.",
  },
  {
    id: 3,
    title: "A Proposed Coffee Shop",
    category: "Digital",
    image: Images["./assets/a-proposed-coffee-shop.jpeg"],
    thumbnail: "",
    year: "2024",
    status: "Completed",
    details:
      "This proposed 3×6-meter coffee shop near Cebu’s Tops is designed to create a warm, stylish retreat that blends rustic charm with modern sophistication. Featuring natural stone textures, wooden-like accents, and extensive tempered glass walls, the structure offers unobstructed scenic views while harmonizing with its surrounding environment. The building is supported by a reinforced concrete foundation with steel beams, wood framing, and gabion walls, complemented by a clay-tile roofing system. Exterior works include applying a warm #E2D7A7 paint finish, sealing glass panels, and completing the clay-tile roof, while the interior features matte porcelain wood-look flooring, terrazzo wall tiles, and wood or laminate countertops. Site preparation consists of clearing, excavation, and grading to ensure a stable base for construction. Overall, the design aims to deliver a comfortable, contemporary, and nature-integrated coffee experience.",
  },
  {
    id: 4,
    title: "Line Drawing",
    category: "Manual",
    image: Images["./assets/line-drawing.jpg"],
    thumbnail: "",
    year: "2024",
    status: "Completed",
    details:
      "In this plate, we have the freedom to create any line drawing. I chose to illustrate a stylized chess knight, using intricate patterns and repetitive line work to give the subject depth, texture, and movement. The background and foreground are filled with different line-based motifs—such as waves, spirals, and geometric shapes—to create contrast and highlight the details of the central figure. This activity allowed me to explore how simple lines can form complex visual effects, teaching me patience, precision, and creativity in composing a unified artwork. Through this exercise, I learned how lines alone can communicate rhythm, form, and personality without relying on color or shading.",
  },
  {
    id: 5,
    title: "Perspective Drawing: Architect's Method",
    category: "Manual",
    image: Images["./assets/perspective-drawing-architects-method.jpg"],
    thumbnail: "",
    year: "2025",
    status: "Completed",
    details:
      "This plate demonstrates the architect’s method in perspective drawing, where a two-point perspective is constructed using precise reference lines and vanishing points. The drawing begins with the establishment of the picture plane (PP), ground line (GL), and horizon line (HL), followed by locating the station point (SP) to determine the viewer’s position. From the SP, projectors extend toward the left and right vanishing points (VPL and VPR), guiding the accurate convergence of lines that form the structure. The mass of the house is built using measuring points and projection lines to ensure proportional scaling in depth, height, and width. Red outlines highlight the edges of the final form, while underlying construction lines show the systematic process of defining volumes in proper perspective. This method ensures that the architectural form appears visually realistic and correctly oriented within the viewer’s field of vision.",
  },
  {
    id: 6,
    title: "Elevation",
    category: "Manual",
    image: Images["./assets/elevation.jpg"],
    thumbnail: "",
    year: "2024",
    status: "Completed",
    details: "No details provided...",
  },
  {
    id: 7,
    title: "Heart of Cebu",
    category: "Manual",
    image: Images["./assets/heart-of-cebu.jpg"],
    thumbnail: "",
    year: "2025",
    status: "Completed",
    details:
      "In this plate, we were tasked to use alcohol markers as our medium. It was my first time using them, and I was having a hard time mastering the blending, layering, and control required to create smooth transitions. Despite the challenge, the process taught me how to work patiently with the medium and experiment with different techniques such as hatching and scribbling, which I incorporated into the overall rendering. The artwork features the Sugbo Chinese Heritage Museum, illustrated with expressive colors and bold strokes to highlight its architectural character. Through this plate, I learned not only how to handle alcohol markers but also how to translate architectural forms into a vibrant, dynamic visual representation.",
  },
  {
    id: 8,
    title: "Section",
    category: "Manual",
    image: Images["./assets/section.jpg"],
    thumbnail: "",
    year: "2024",
    status: "Completed",
    details: "No details provided...",
  },
  {
    id: 9,
    title: "Shadows of a Plain Form on a Vertical Wall",
    category: "Manual",
    image: Images["./assets/shadows-of-a-plain-form-on-a-vertical-wall.jpg"],
    thumbnail: "",
    year: "2025",
    status: "Completed",
    details:
      "This plate demonstrates the projection of shadows cast by a plain form onto a vertical wall using precise construction lines and geometric analysis. The primary object, shown with curved and angular surfaces, is illuminated from an oblique light source, indicated by the diagonal light ray. Vertical and horizontal projection lines are used to track how the edges and curves of the form extend toward the wall, creating an accurate shadow outline. The resulting shadow is carefully constructed by transferring key points of the form onto the wall plane, ensuring correct alignment and proportion. Hatched areas highlight the shaded regions, while clear dimensional markings and guidelines maintain technical accuracy. The drawing shows how light interacts with basic forms and how shadows can be systematically projected onto vertical surfaces in architectural drafting.",
  },
  {
    id: 10,
    title: "9-Scale Tonal Values",
    category: "Manual",
    image: Images["./assets/tonal-values.jpg"],
    thumbnail: "",
    year: "2024",
    status: "Completed",
    details:
      "This plate demonstrates a 9-scale tonal value using four different shading techniques: hatching, cross-hatching, scribbling, and stippling. Each technique transitions from light to dark by gradually increasing the density and layering of lines, marks, or dots. In the hatching scale, the values progress by adding more parallel lines and decreasing the spaces between them. The cross-hatching section builds tone through intersecting lines that become denser in each box, creating richer and darker values. The scribbling scale uses overlapping loops and irregular strokes that grow tighter and heavier to achieve deeper shades. Lastly, the stippling scale shifts from light to dark through the controlled placement of dots—starting with sparse points and becoming densely packed in the darkest values. These four techniques show how varying mark density and repetition can create a complete tonal range from very light to solid dark.",
  },
  {
    id: 11,
    title: "WT Corporate Tower",
    category: "Photography",
    image: Images["./assets/wt-corporate-tower.jpeg"],
    thumbnail: Images["./assets/wt-corporate-tower-thumbnail.jpg"],
    year: "2025",
    status: "Completed",
    details:
      "This photography presents the WT Corporate Tower through a series of well-composed architectural photographs that highlight the building’s distinct modern character. The images emphasize its sleek blue-tinted glazing, strong geometric structural frames, and curved façade elements that define its visual identity. Close-up shots capture the tower’s reflective glass surfaces and vertical lines, while wider perspectives showcase its scale, massing, and integration within the urban setting. An upward interior view adds depth by revealing the building’s circular structural rhythm and layered forms. Together, the photographs create a cohesive visual narrative that illustrates the tower’s contemporary design, material palette, and prominent presence within Cebu Business Park.",
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

  // Add this useEffect to disable scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

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
          I am an aspiring architect. I believe architecture is not about
          filling space, but creating it.
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
        <span className="text-white text-sm font-mono">{project.title}</span>
        <button
          onClick={onClose}
          className="text-white hover:text-neutral-400 transition-colors"
        >
          <span className="sr-only">Back</span>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest">
            Back <X size={20} />
          </div>
        </button>
      </div>

      {/* Modal Content */}
      <div className="flex-1 w-full max-w-7xl mx-auto p-8 md:p-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-24">
          {/* Main Image */}
          <div className="md:col-span-12 bg-neutral-800 rounded-lg overflow-hidden mb-8">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Project Stats */}
          <div className="md:col-span-4 space-y-8 border-t border-white/20 pt-8">
            {/* Location and Area removed as requested */}
            <div>
              <h4 className="text-xs text-neutral-500 uppercase tracking-widest mb-2">
                Year
              </h4>
              <p className="text-white text-lg">{project.year}</p>
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
            <h2 className="text-4xl font-bold text-white mb-8">Description</h2>
            <p className="text-neutral-300 text-lg leading-relaxed mb-8">
              {project.details}
            </p>
          </div>
        </div>
      </div>
    </framerMotion.motion.div>
  );
};

// --- ARCHIVE MODAL (Updated) ---
const ArchiveModal = ({ isOpen, onClose, projects, onOpenModal }) => {
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
            <div className="col-span-7">Project</div>{" "}
            {/* Expanded to fill space */}
            {/* Location column removed */}
            <div className="col-span-2">Category</div>
            <div className="col-span-2 text-right">Status</div>
          </div>

          {/* Table Rows */}
          <div className="space-y-4">
            {projects.map((project) => (
              <div
                key={project.id}
                onClick={() => {
                  onClose();
                  onOpenModal(project);
                }}
                className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 py-4 border-b border-white/5 hover:bg-white/5 transition-colors items-center group cursor-pointer"
              >
                <div className="col-span-1 font-mono text-sm text-neutral-400">
                  {project.year}
                </div>
                <div className="col-span-7 text-xl font-bold">
                  {project.title}
                </div>
                {/* Location column removed */}
                <div className="col-span-2 text-xs uppercase tracking-widest bg-white/10 w-fit px-2 py-1 rounded hidden md:block">
                  {project.category}
                </div>
                <div className="col-span-2 text-right text-sm text-neutral-400 hidden md:block">
                  {project.status}
                </div>
              </div>
            ))}
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
        {/* <p className="text-neutral-400 leading-relaxed max-w-md mb-8">
          {project.description}
        </p> */}
        <button
          onClick={() => onOpenModal(project)}
          className="flex items-center gap-2 text-white font-bold text-xs uppercase tracking-widest opacity-60 group-hover:opacity-100 transition-opacity translate-x-0 group-hover:translate-x-2 duration-300"
        >
          View Details <ArrowRight size={14} />
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
          <p className="text-neutral-500 text-sm">2024 — 2025</p>
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
                        src={project.thumbnail || project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/10" />
                    </framerMotion.motion.div>
                  )
              )}
            </framerMotion.AnimatePresence>

            {/* Overlay Info on Image - Location Removed */}
            <div className="absolute bottom-0 left-0 p-8 w-full bg-gradient-to-t from-black/80 to-transparent">
              {/* <p className="text-white text-xl font-light italic">
                "{projects.find((p) => p.id === activeProject)?.location}"
              </p> */}
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
          View Entire Projects
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
              src={Profile}
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
                <a
                  href="https://web.facebook.com/lie.0l"
                  className="hover:text-black hover:underline"
                >
                  Facebook
                </a>
                <a
                  href="https://www.instagram.com/_chaboie/"
                  className="hover:text-black hover:underline"
                >
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
            <a
              href="https://web.facebook.com/lie.0l"
              className="hover:text-neutral-400 transition-colors"
            >
              Facebook
            </a>
            <a href="#" className="hover:text-neutral-400 transition-colors">
              LinkedIn
            </a>
            <a
              href="https://www.instagram.com/_chaboie/"
              className="hover:text-neutral-400 transition-colors"
            >
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
  // Track where the project was opened from ('gallery' or 'archive')
  const [sourceView, setSourceView] = useState(null);

  // Disable body scroll when a modal is open
  useEffect(() => {
    if (selectedProject || isArchiveOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedProject, isArchiveOpen]);

  // Handler for opening from Gallery (Home)
  const handleOpenFromGallery = (project) => {
    setSelectedProject(project);
    setSourceView("gallery");
  };

  // Handler for opening from Archive
  const handleOpenFromArchive = (project) => {
    setSelectedProject(project);
    setSourceView("archive");
  };

  // Handler for closing the project modal
  const handleCloseProject = () => {
    setSelectedProject(null);
    // If it was opened from the archive, reopen the archive
    if (sourceView === "archive") {
      setIsArchiveOpen(true);
    }
  };

  return (
    <div className="font-sans antialiased selection:bg-white selection:text-black bg-neutral-900">
      <Navbar />
      <Hero />
      <ProjectsGallery
        onOpenModal={handleOpenFromGallery}
        onOpenArchive={() => setIsArchiveOpen(true)}
      />
      <About />
      <Contact />

      <framerMotion.AnimatePresence>
        {selectedProject && (
          <CaseStudyModal
            project={selectedProject}
            onClose={handleCloseProject}
          />
        )}
      </framerMotion.AnimatePresence>

      <framerMotion.AnimatePresence>
        {isArchiveOpen && (
          <ArchiveModal
            isOpen={isArchiveOpen}
            onClose={() => setIsArchiveOpen(false)}
            projects={projects}
            onOpenModal={handleOpenFromArchive}
          />
        )}
      </framerMotion.AnimatePresence>
    </div>
  );
}
